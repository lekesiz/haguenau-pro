import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Updating categories...');

  // Mevcut kategorileri temizle
  await prisma.category.deleteMany({});

  // İyileştirilmiş kategoriler
  const categories = [
    { slug: 'restaurants', name: 'Restaurants', icon: '🍽️', color: '#EF4444' },
    { slug: 'cafes', name: 'Cafés & Salons de Thé', icon: '☕', color: '#F59E0B' },
    { slug: 'bars', name: 'Bars & Pubs', icon: '🍺', color: '#8B5CF6' },
    { slug: 'fast-food', name: 'Fast Food', icon: '🍔', color: '#F97316' },
    { slug: 'boulangeries', name: 'Boulangeries & Pâtisseries', icon: '🥖', color: '#D97706' },
    { slug: 'supermarches', name: 'Supermarchés & Épiceries', icon: '🛒', color: '#10B981' },
    { slug: 'pharmacies', name: 'Pharmacies', icon: '💊', color: '#06B6D4' },
    { slug: 'banques', name: 'Banques & Assurances', icon: '🏦', color: '#3B82F6' },
    { slug: 'hotels', name: 'Hôtels & Hébergements', icon: '🏨', color: '#6366F1' },
    { slug: 'magasins', name: 'Magasins & Boutiques', icon: '🛍️', color: '#EC4899' },
    { slug: 'sante', name: 'Santé & Bien-être', icon: '⚕️', color: '#14B8A6' },
    { slug: 'education', name: 'Éducation & Formation', icon: '📚', color: '#8B5CF6' },
    { slug: 'divertissement', name: 'Divertissement & Loisirs', icon: '🎭', color: '#F43F5E' },
    { slug: 'sports', name: 'Sports & Fitness', icon: '⚽', color: '#EF4444' },
    { slug: 'services', name: 'Services Professionnels', icon: '💼', color: '#6B7280' },
  ];

  for (const category of categories) {
    await prisma.category.create({
      data: category,
    });
  }

  console.log(`✅ ${categories.length} categories created successfully!`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

