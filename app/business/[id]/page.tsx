import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MapPin, Phone, Mail, Globe, Clock, ArrowLeft, Star, Edit } from 'lucide-react';

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
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://haguenau-pro.vercel.app';
    const res = await fetch(`${baseUrl}/api/businesses/${id}`, {
      cache: 'no-store',
    });
    
    if (!res.ok) return null;
    
    return res.json();
  } catch (error) {
    console.error('Error fetching business:', error);
    return null;
  }
}

export default async function BusinessPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const business = await getBusiness(id);
  
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Retour */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour à l'annuaire
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Colonne principale */}
          <div className="lg:col-span-2 space-y-6">
            {/* En-tête */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
                <div className="flex-1">
                  <h1 className="text-4xl font-bold text-gray-900 mb-3">{business.name}</h1>
                  {business.category && (
                    <span className="inline-block text-sm bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 px-4 py-2 rounded-full font-medium">
                      {business.category}
                    </span>
                  )}
                </div>
                {business.rating && (
                  <div className="flex items-center gap-3 bg-gradient-to-r from-yellow-50 to-orange-50 px-6 py-4 rounded-xl border border-yellow-200">
                    <Star className="w-8 h-8 fill-yellow-400 text-yellow-400" />
                    <div>
                      <div className="text-2xl font-bold text-gray-900">{business.rating.toFixed(1)}</div>
                      {business.reviewCount && (
                        <div className="text-xs text-gray-600">{business.reviewCount} avis</div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {business.description && (
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <p className="text-gray-700 leading-relaxed text-lg">{business.description}</p>
                </div>
              )}

              {/* Note pour les utilisateurs */}
              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Edit className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-1">Vous êtes le propriétaire ?</h3>
                    <p className="text-sm text-blue-700">
                      Contactez-nous pour ajouter plus d'informations, des photos et gérer votre fiche entreprise.
                    </p>
                    <Link href="/contact" className="inline-block mt-2 text-sm font-medium text-blue-600 hover:text-blue-700 underline">
                      Nous contacter →
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Horaires d'ouverture */}
            {business.openingHours && (
              <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Clock className="w-6 h-6 text-blue-600" />
                  </div>
                  Horaires d'ouverture
                </h2>
                {'raw' in business.openingHours ? (
                  <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                    <p className="text-gray-700 text-lg">{business.openingHours.raw}</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {Object.entries(business.openingHours).map(([day, hours]) => (
                      <div key={day} className="flex justify-between items-center py-3 px-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <span className="font-semibold text-gray-800">{dayNames[day]}</span>
                        <span className={`font-medium ${hours === 'closed' ? 'text-red-600' : 'text-green-600'}`}>
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
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact</h2>
              <div className="space-y-5">
                {business.address && (
                  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="bg-blue-100 p-2 rounded-lg flex-shrink-0">
                      <MapPin className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{business.address}</div>
                      {(business.postalCode || business.city) && (
                        <div className="text-gray-600 mt-1">
                          {business.postalCode} {business.city}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {business.phone && (
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="bg-green-100 p-2 rounded-lg flex-shrink-0">
                      <Phone className="w-5 h-5 text-green-600" />
                    </div>
                    <a
                      href={`tel:${business.phone}`}
                      className="font-medium text-gray-900 hover:text-blue-600 transition-colors"
                    >
                      {business.phone}
                    </a>
                  </div>
                )}

                {business.email && (
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="bg-purple-100 p-2 rounded-lg flex-shrink-0">
                      <Mail className="w-5 h-5 text-purple-600" />
                    </div>
                    <a
                      href={`mailto:${business.email}`}
                      className="font-medium text-gray-900 hover:text-blue-600 transition-colors truncate"
                    >
                      {business.email}
                    </a>
                  </div>
                )}

                {business.website && (
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="bg-orange-100 p-2 rounded-lg flex-shrink-0">
                      <Globe className="w-5 h-5 text-orange-600" />
                    </div>
                    <a
                      href={business.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-gray-900 hover:text-blue-600 transition-colors truncate"
                    >
                      Visiter le site web
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Carte */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Localisation</h2>
              <div className="aspect-video bg-gray-100 rounded-xl overflow-hidden shadow-inner">
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
                className="block mt-4 text-center text-sm font-medium text-blue-600 hover:text-blue-700 bg-blue-50 py-3 rounded-lg hover:bg-blue-100 transition-colors"
              >
                Voir sur OpenStreetMap →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

