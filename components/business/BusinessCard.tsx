import Link from 'next/link';
import { MapPin, Phone, Globe, Star } from 'lucide-react';

interface Business {
  id: number;
  name: string;
  category?: string;
  location: {
    lat: number;
    lng: number;
  };
  address?: string;
  city?: string;
  phone?: string;
  website?: string;
  rating?: number;
  distance: number;
}

interface BusinessCardProps {
  business: Business;
}

export default function BusinessCard({ business }: BusinessCardProps) {
  return (
    <Link href={`/business/${business.

id}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 cursor-pointer border border-gray-200">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900 hover:text-primary-600 transition-colors">
            {business.name}
          </h3>
          {business.rating && (
            <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{business.rating.toFixed(1)}</span>
            </div>
          )}
        </div>
        
        {business.category && (
          <span className="inline-block text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded mb-2">
            {business.category}
          </span>
        )}
        
        <div className="space-y-1 text-sm text-gray-600">
          {business.address && (
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>{business.address}{business.city && `, ${business.city}`}</span>
            </div>
          )}
          
          {business.phone && (
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 flex-shrink-0" />
              <span>{business.phone}</span>
            </div>
          )}
          
          {business.website && (
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">{business.website}</span>
            </div>
          )}
        </div>
        
        <div className="mt-3 pt-3 border-t border-gray-100">
          <span className="text-xs text-gray-500">
            📍 {(business.distance / 1000).toFixed(1)} km
          </span>
        </div>
      </div>
    </Link>
  );
}
