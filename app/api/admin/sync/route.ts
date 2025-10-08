import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import {
  fetchBusinessesFromOverpass,
  determineCategory,
  extractAddress,
  extractContact,
  extractCoordinates,
} from '@/lib/overpass';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const syncType = body.type || 'full';
    
    // Sync log oluştur
    const syncLog = await prisma.syncLog.create({
      data: {
        syncType,
        status: 'running',
        startedAt: new Date(),
      },
    });
    
    try {
      console.log('🔄 Starting data sync...');
      
      // Overpass API'den veri çek
      const elements = await fetchBusinessesFromOverpass();
      console.log(`📥 Fetched ${elements.length} elements from Overpass API`);
      
      let added = 0;
      let updated = 0;
      
      // Her element için
      for (const element of elements) {
        if (!element.tags) continue;
        
        const coords = extractCoordinates(element);
        if (!coords) continue;
        
        const { mainCategory, subcategory } = determineCategory(element.tags);
        const address = extractAddress(element.tags);
        const contact = extractContact(element.tags);
        
        // Kategoriyi bul
        const category = await prisma.category.findUnique({
          where: { slug: mainCategory },
        });
        
        // İşletme verisi
        const businessData = {
          osmId: BigInt(element.id),
          osmType: element.type,
          name: element.tags.name,
          nameFr: element.tags['name:fr'],
          nameEn: element.tags['name:en'],
          nameDe: element.tags['name:de'],
          categoryId: category?.id,
          subcategory,
          latitude: coords.lat,
          longitude: coords.lng,
          address: address.address,
          postalCode: address.postalCode,
          city: address.city,
          phone: contact.phone,
          email: contact.email,
          website: contact.website,
          openingHours: element.tags.opening_hours,
          description: element.tags.description,
          tags: element.tags,
          isActive: true,
          lastVerifiedAt: new Date(),
        };
        
        // Upsert (insert veya update)
        const result = await prisma.business.upsert({
          where: { osmId: BigInt(element.id) },
          update: {
            ...businessData,
            updatedAt: new Date(),
          },
          create: businessData,
        });
        
        if (result.createdAt.getTime() === result.updatedAt.getTime()) {
          added++;
        } else {
          updated++;
        }
      }
      
      // Sync log'u güncelle
      await prisma.syncLog.update({
        where: { id: syncLog.id },
        data: {
          status: 'success',
          completedAt: new Date(),
          businessesAdded: added,
          businessesUpdated: updated,
        },
      });
      
      console.log(`✅ Sync completed: ${added} added, ${updated} updated`);
      
      return NextResponse.json({
        syncId: syncLog.id,
        status: 'success',
        businessesAdded: added,
        businessesUpdated: updated,
      });
    } catch (error) {
      // Hata durumunda sync log'u güncelle
      await prisma.syncLog.update({
        where: { id: syncLog.id },
        data: {
          status: 'failed',
          completedAt: new Date(),
          errorMessage: error instanceof Error ? error.message : 'Unknown error',
        },
      });
      
      throw error;
    }
  } catch (error) {
    console.error('Sync error:', error);
    return NextResponse.json(
      { error: 'Sync failed', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
