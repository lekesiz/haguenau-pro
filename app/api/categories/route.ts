import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        displayOrder: 'asc',
      },
    });
    
    // Her kategori için işletme sayısını hesapla
    const categoriesWithCount = await Promise.all(
      categories.map(async (category) => {
        const count = await prisma.business.count({
          where: {
            categoryId: category.id,
            isActive: true,
          },
        });
        
        return {
          id: category.id,
          slug: category.slug,
          name: category.nameFr, // Varsayılan olarak Fransızca
          icon: category.icon,
          color: category.color,
          count,
        };
      })
    );
    
    return NextResponse.json({
      data: categoriesWithCount,
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}
