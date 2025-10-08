import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    // Query parametreleri
    const lat = parseFloat(searchParams.get('lat') || '48.82');
    const lng = parseFloat(searchParams.get('lng') || '7.79');
    const radius = parseInt(searchParams.get('radius') || '30000');
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 100);
    
    // Filtreleme koşulları
    const where: any = {
      isActive: true,
    };
    
    // Kategori filtresi
    if (category) {
      const categoryData = await prisma.category.findUnique({
        where: { slug: category },
      });
      if (categoryData) {
        where.categoryId = categoryData.id;
      }
    }
    
    // Arama filtresi
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { address: { contains: search, mode: 'insensitive' } },
        { city: { contains: search, mode: 'insensitive' } },
      ];
    }
    
    // Toplam sayı
    const total = await prisma.business.count({ where });
    
    // Sayfalama
    const skip = (page - 1) * limit;
    
    // Verileri çek
    const businesses = await prisma.business.findMany({
      where,
      include: {
        category: true,
      },
      skip,
      take: limit,
      orderBy: {
        name: 'asc',
      },
    });
    
    // Mesafe hesaplama (basit Haversine formülü)
    const businessesWithDistance = businesses.map((business) => {
      const distance = calculateDistance(
        lat,
        lng,
        business.latitude,
        business.longitude
      );
      
      return {
        id: business.id,
        name: business.name,
        category: business.category?.slug,
        location: {
          lat: business.latitude,
          lng: business.longitude,
        },
        address: business.address,
        city: business.city,
        phone: business.phone,
        website: business.website,
        rating: business.rating,
        distance: Math.round(distance),
      };
    });
    
    // Mesafeye göre sırala
    businessesWithDistance.sort((a, b) => a.distance - b.distance);
    
    return NextResponse.json({
      data: businessesWithDistance,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching businesses:', error);
    return NextResponse.json(
      { error: 'Failed to fetch businesses' },
      { status: 500 }
    );
  }
}

/**
 * Haversine formülü ile iki nokta arası mesafe (metre)
 */
function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371e3; // Dünya yarıçapı (metre)
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}
