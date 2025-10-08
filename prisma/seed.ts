import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const categories = [
  {
    slug: 'restaurants',
    nameFr: 'Restaurants',
    nameEn: 'Restaurants',
    nameDe: 'Restaurants',
    nameTr: 'Restoranlar',
    icon: 'utensils',
    color: '#FF6B6B',
    osmTags: { amenity: ['restaurant', 'fast_food', 'food_court'] },
    displayOrder: 1,
  },
  {
    slug: 'cafes',
    nameFr: 'Cafés & Bars',
    nameEn: 'Cafes & Bars',
    nameDe: 'Cafés & Bars',
    nameTr: 'Kafeler & Barlar',
    icon: 'coffee',
    color: '#8B4513',
    osmTags: { amenity: ['cafe', 'bar', 'pub', 'biergarten'] },
    displayOrder: 2,
  },
  {
    slug: 'shops',
    nameFr: 'Magasins',
    nameEn: 'Shops',
    nameDe: 'Geschäfte',
    nameTr: 'Mağazalar',
    icon: 'shopping-bag',
    color: '#4ECDC4',
    osmTags: { shop: ['*'] },
    displayOrder: 3,
  },
  {
    slug: 'services',
    nameFr: 'Services',
    nameEn: 'Services',
    nameDe: 'Dienstleistungen',
    nameTr: 'Hizmetler',
    icon: 'briefcase',
    color: '#95E1D3',
    osmTags: { office: ['*'], craft: ['*'] },
    displayOrder: 4,
  },
  {
    slug: 'health',
    nameFr: 'Santé',
    nameEn: 'Health',
    nameDe: 'Gesundheit',
    nameTr: 'Sağlık',
    icon: 'heart-pulse',
    color: '#FF6B9D',
    osmTags: { amenity: ['pharmacy', 'doctors', 'dentist', 'hospital', 'clinic'] },
    displayOrder: 5,
  },
  {
    slug: 'education',
    nameFr: 'Éducation',
    nameEn: 'Education',
    nameDe: 'Bildung',
    nameTr: 'Eğitim',
    icon: 'graduation-cap',
    color: '#6C5CE7',
    osmTags: { amenity: ['school', 'kindergarten', 'college', 'university', 'library'] },
    displayOrder: 6,
  },
  {
    slug: 'tourism',
    nameFr: 'Tourisme',
    nameEn: 'Tourism',
    nameDe: 'Tourismus',
    nameTr: 'Turizm',
    icon: 'map-pin',
    color: '#FD79A8',
    osmTags: { tourism: ['*'] },
    displayOrder: 7,
  },
  {
    slug: 'sports',
    nameFr: 'Sports & Loisirs',
    nameEn: 'Sports & Leisure',
    nameDe: 'Sport & Freizeit',
    nameTr: 'Spor & Eğlence',
    icon: 'dumbbell',
    color: '#00B894',
    osmTags: { leisure: ['*'], sport: ['*'] },
    displayOrder: 8,
  },
  {
    slug: 'other',
    nameFr: 'Autres',
    nameEn: 'Other',
    nameDe: 'Andere',
    nameTr: 'Diğer',
    icon: 'more-horizontal',
    color: '#95A5A6',
    osmTags: {},
    displayOrder: 99,
  },
];

async function main() {
  console.log('🌱 Seeding database...');

  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: category,
      create: category,
    });
    console.log(`✅ Category: ${category.slug}`);
  }

  console.log('✨ Seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
