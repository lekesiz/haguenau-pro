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
        { error: 'Invalid sync ID' },
        { status: 400 }
      );
    }
    
    const syncLog = await prisma.syncLog.findUnique({
      where: { id },
    });
    
    if (!syncLog) {
      return NextResponse.json(
        { error: 'Sync log not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      id: syncLog.id,
      status: syncLog.status,
      startedAt: syncLog.startedAt.toISOString(),
      completedAt: syncLog.completedAt?.toISOString() || null,
      businessesAdded: syncLog.businessesAdded,
      businessesUpdated: syncLog.businessesUpdated,
      businessesRemoved: syncLog.businessesRemoved,
      errorMessage: syncLog.errorMessage,
    });
  } catch (error) {
    console.error('Error fetching sync log:', error);
    return NextResponse.json(
      { error: 'Failed to fetch sync log' },
      { status: 500 }
    );
  }
}
