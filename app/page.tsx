'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Search, Filter, Loader2 } from 'lucide-react';
import BusinessCard from '@/components/business/BusinessCard';

// Dinamik import (SSR'yi devre dışı bırak)
const Map = dynamic(() => import('@/components/map/Map'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center bg-gray-100 rounded-lg">
      <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
    </div>
  ),
});

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

interface Category {
  id: number;
  slug: string;
  name: string;
  icon?: string;
  color?: string;
  count: number;
}

const HAGUENAU_CENTER: [number, number] = [48.82, 7.79];

export default function Home() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [mapCenter, setMapCenter] = useState<[number, number]>(HAGUENAU_CENTER);

  // Kategorileri yükle
  useEffect(() => {
    fetch('/api/categories')
      .then((res) => res.json())
      .then((data) => setCategories(data.data))
      .catch((err) => console.error('Error loading categories:', err));
  }, []);

  // İşletmeleri yükle
  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (selectedCategory) params.append('category', selectedCategory);
    if (searchTerm) params.append('search', searchTerm);
    params.append('limit', '100');

    fetch(`/api/businesses?${params}`)
      .then((res) => res.json())
      .then((data) => {
        setBusinesses(data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading businesses:', err);
        setLoading(false);
      });
  }, [selectedCategory, searchTerm]);

  const handleBusinessClick = (business: Business) => {
    setMapCenter([business.location.lat, business.location.lng]);
  };

  return (
    <div className="h-[calc(100vh-180px)]">
      <div className="container mx-auto px-4 py-6 h-full">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Découvrez les entreprises locales
          </h2>
          <p className="text-gray-600">
            Haguenau - {businesses.length} entreprises
          </p>
        </div>

        {/* Filtres */}
        <div className="mb-6 space-y-4">
          {/* Recherche */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Rechercher une entreprise..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent placeholder:text-gray-500"
            />
          </div>

          {/* Catégories */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <Filter className="w-5 h-5 text-gray-500 flex-shrink-0" />
            <button
              onClick={() => setSelectedCategory('')}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === ''
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Tous
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.slug)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === category.slug
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>

        {/* Contenu principal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100%-200px)]">
          {/* Liste */}
          <div className="overflow-y-auto space-y-4 pr-2">
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
              </div>
            ) : businesses.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">Aucune entreprise trouvée</p>
              </div>
            ) : (
              businesses.map((business) => (
                <BusinessCard key={business.id} business={business} />
              ))
            )}
          </div>

          {/* Carte */}
          <div className="h-full rounded-lg overflow-hidden shadow-lg">
            <Map
              businesses={businesses}
              center={mapCenter}
              zoom={12}
              onBusinessClick={handleBusinessClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
