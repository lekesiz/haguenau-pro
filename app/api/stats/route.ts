import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Toplam işletme sayısı
    const totalBusinesses = await prisma.business.count({
      where: { isActive: true },
    });
    
    // Kategorilere göre sayılar
    const categories = await prisma.category.findMany({
      where: { isActive: true },
      include: {
        _count: {
          select: {
            businesses: {
              where: { isActive: true },
            },
          },
        },
      },
    });
    
    const categoryCounts: Record<string, number> = {};
    categories.forEach((category) => {
      categoryCounts[category.slug] = category._count.businesses;
    });
    
    // Son güncelleme zamanı
    const lastSync = await prisma.syncLog.findFirst({
      where: { status: 'success' },
      orderBy: { completedAt: 'desc' },
    });
    
    return NextResponse.json({
      totalBusinesses,
      categoryCounts,
      lastUpdate: lastSync?.completedAt?.toISOString() || null,
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}
