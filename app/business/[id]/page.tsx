import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MapPin, Phone, Mail, Globe, Clock, ArrowLeft, Star } from 'lucide-react';

interface Business {
  id: number;
  name: string;
  category?: string;
  location: {
    lat: number;
    lng: number;
  };
  address?: string;
  postalCode?: string;
  city?: string;
  phone?: string;
  email?: string;
  website?: string;
  openingHours?: Record<string, string> | { raw: string };
  description?: string;
  rating?: number;
  reviewCount?: number;
  photos?: string[];
  tags?: Record<string, string>;
}

async function getBusiness(id: string): Promise<Business | null> {
  try {
    const res = await fetch(`http://localhost:3000/api/businesses/${id}`, {
      cache: 'no-store',
    });
    
    if (!res.ok) return null;
    
    return res.json();
  } catch (error) {
    console.error('Error fetching business:', error);
    return null;
  }
}

export default async function BusinessPage({ params }: { params: { id: string } }) {
  const business = await getBusiness(params.id);
  
  if (!business) {
    notFound();
  }

  const dayNames: Record<string, string> = {
    monday: 'Lundi',
    tuesday: 'Mardi',
    wednesday: 'Mercredi',
    thursday: 'Jeudi',
    friday: 'Vendredi',
    saturday: 'Samedi',
    sunday: 'Dimanche',
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Retour */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Retour à la liste
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Colonne principale */}
        <div className="lg:col-span-2 space-y-6">
          {/* En-tête */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{business.name}</h1>
                {business.category && (
                  <span className="inline-block text-sm bg-primary-100 text-primary-700 px-3 py-1 rounded">
                    {business.category}
                  </span>
                )}
              </div>
              {business.rating && (
                <div className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-lg">
                  <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                  <div>
                    <div className="text-xl font-bold">{business.rating.toFixed(1)}</div>
                    {business.reviewCount && (
                      <div className="text-xs text-gray-600">{business.reviewCount} avis</div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {business.description && (
              <p className="text-gray-700 leading-relaxed">{business.description}</p>
            )}
          </div>

          {/* Horaires d'ouverture */}
          {business.openingHours && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2

 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Horaires d'ouverture
              </h2>
              {'raw' in business.openingHours ? (
                <p className="text-gray-700">{business.openingHours.raw}</p>
              ) : (
                <div className="space-y-2">
                  {Object.entries(business.openingHours).map(([day, hours]) => (
                    <div key={day} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                      <span className="font-medium text-gray-700">{dayNames[day]}</span>
                      <span className={hours === 'closed' ? 'text-red-600' : 'text-gray-900'}>
                        {hours === 'closed' ? 'Fermé' : hours}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Colonne latérale */}
        <div className="space-y-6">
          {/* Informations de contact */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact</h2>
            <div className="space-y-4">
              {business.address && (
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-gray-900">{business.address}</div>
                    {(business.postalCode || business.city) && (
                      <div className="text-gray-600">
                        {business.postalCode} {business.city}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {business.phone && (
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary-600 flex-shrink-0" />
                  <a
                    href={`tel:${business.phone}`}
                    className="text-gray-900 hover:text-primary-600 transition-colors"
                  >
                    {business.phone}
                  </a>
                </div>
              )}

              {business.email && (
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary-600 flex-shrink-0" />
                  <a
                    href={`mailto:${business.email}`}
                    className="text-gray-900 hover:text-primary-600 transition-colors truncate"
                  >
                    {business.email}
                  </a>
                </div>
              )}

              {business.website && (
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-primary-600 flex-shrink-0" />
                  <a
                    href={business.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-900 hover:text-primary-600 transition-colors truncate"
                  >
                    Visiter le site web
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Carte */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Localisation</h2>
            <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ border: 0 }}
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${business.location.lng - 0.01},${business.location.lat - 0.01},${business.location.lng + 0.01},${business.location.lat + 0.01}&layer=mapnik&marker=${business.location.lat},${business.location.lng}`}
                allowFullScreen
              />
            </div>
            <a
              href={`https://www.openstreetmap.org/?mlat=${business.location.lat}&mlon=${business.location.lng}#map=16/${business.location.lat}/${business.location.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-3 text-sm text-primary-600 hover:text-primary-700 text-center"
            >
              Voir sur OpenStreetMap
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
