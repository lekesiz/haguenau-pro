import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid business ID' },
        { status: 400 }
      );
    }
    
    const business = await prisma.business.findUnique({
      where: { id },
      include: {
        category: true,
      },
    });
    
    if (!business || !business.isActive) {
      return NextResponse.json(
        { error: 'Business not found' },
        { status: 404 }
      );
    }
    
    // Opening hours parse etme
    let openingHours = null;
    if (business.openingHours) {
      try {
        openingHours = parseOpeningHours(business.openingHours);
      } catch (e) {
        // Parse edilemezse raw string olarak bırak
        openingHours = { raw: business.openingHours };
      }
    }
    
    return NextResponse.json({
      id: business.id,
      name: business.name,
      category: business.category?.slug,
      location: {
        lat: business.latitude,
        lng: business.longitude,
      },
      address: business.address,
      postalCode: business.postalCode,
      city: business.city,
      phone: business.phone,
      email: business.email,
      website: business.website,
      openingHours,
      description: business.description,
      rating: business.rating,
      reviewCount: business.reviewCount,
      photos: business.photos,
      tags: business.tags,
    });
  } catch (error) {
    console.error('Error fetching business:', error);
    return NextResponse.json(
      { error: 'Failed to fetch business' },
      { status: 500 }
    );
  }
}

/**
 * OSM opening_hours formatını parse eder
 * Örnek: "Mo-Fr 08:00-19:00; Sa 08:00-13:00"
 */
function parseOpeningHours(hoursString: string): Record<string, string> {
  const result: Record<string, string> = {
    monday: 'closed',
    tuesday: 'closed',
    wednesday: 'closed',
    thursday: 'closed',
    friday: 'closed',
    saturday: 'closed',
    sunday: 'closed',
  };
  
  const dayMap: Record<string, string[]> = {
    'Mo': ['monday'],
    'Tu': ['tuesday'],
    'We': ['wednesday'],
    'Th': ['thursday'],
    'Fr': ['friday'],
    'Sa': ['saturday'],
    'Su': ['sunday'],
    'Mo-Fr': ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
    'Mo-Sa': ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
    'Mo-Su': ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
  };
  
  // Basit parse (gerçek OSM opening_hours daha karmaşık olabilir)
  const parts = hoursString.split(';');
  
  for (const part of parts) {
    const trimmed = part.trim();
    const match = trimmed.match(/^([A-Za-z-]+)\s+(.+)$/);
    
    if (match) {
      const [, dayPart, timePart] = match;
      const days = dayMap[dayPart] || [];
      
      for (const day of days) {
        result[day] = timePart;
      }
    }
  }
  
  return result;
}
