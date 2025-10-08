/**
 * Overpass API entegrasyonu
 * OpenStreetMap verilerini çekmek için kullanılır
 */

const OVERPASS_API_URL = 'https://overpass-api.de/api/interpreter';
const HAGUENAU_LAT = 48.82;
const HAGUENAU_LNG = 7.79;
const DEFAULT_RADIUS = 30000; // 30 km

export interface OverpassElement {
  type: 'node' | 'way' | 'relation';
  id: number;
  lat?: number;
  lon?: number;
  center?: { lat: number; lon: number };
  tags?: Record<string, string>;
}

export interface OverpassResponse {
  version: number;
  generator: string;
  osm3s: {
    timestamp_osm_base: string;
    copyright: string;
  };
  elements: OverpassElement[];
}

/**
 * Overpass API sorgusu oluşturur
 */
export function buildOverpassQuery(
  lat: number = HAGUENAU_LAT,
  lng: number = HAGUENAU_LNG,
  radius: number = DEFAULT_RADIUS
): string {
  return `
[out:json][timeout:300];
(
  // Tüm shop'lar
  node["shop"](around:${radius},${lat},${lng});
  way["shop"](around:${radius},${lat},${lng});
  
  // Tüm amenity'ler (restoranlar, kafeler vb.)
  node["amenity"](around:${radius},${lat},${lng});
  way["amenity"](around:${radius},${lat},${lng});
  
  // Turizm noktaları
  node["tourism"](around:${radius},${lat},${lng});
  way["tourism"](around:${radius},${lat},${lng});
  
  // Ofisler
  node["office"](around:${radius},${lat},${lng});
  way["office"](around:${radius},${lat},${lng});
  
  // Zanaatkarlar
  node["craft"](around:${radius},${lat},${lng});
  way["craft"](around:${radius},${lat},${lng});
);
out body;
>;
out skel qt;
`;
}

/**
 * Overpass API'den veri çeker
 */
export async function fetchFromOverpass(
  query: string
): Promise<OverpassResponse> {
  const response = await fetch(OVERPASS_API_URL, {
    method: 'POST',
    body: query,
    headers: {
      'Content-Type': 'text/plain',
    },
  });

  if (!response.ok) {
    throw new Error(`Overpass API error: ${response.statusText}`);
  }

  return response.json();
}

/**
 * İşletmeleri Overpass API'den çeker
 */
export async function fetchBusinessesFromOverpass(
  lat: number = HAGUENAU_LAT,
  lng: number = HAGUENAU_LNG,
  radius: number = DEFAULT_RADIUS
): Promise<OverpassElement[]> {
  const query = buildOverpassQuery(lat, lng, radius);
  const data = await fetchFromOverpass(query);
  
  // Sadece tag'leri olan ve isim içeren elemanları filtrele
  return data.elements.filter(
    (element) => element.tags && element.tags.name
  );
}

/**
 * OSM element'inden kategori belirler
 */
export function determineCategory(tags: Record<string, string>): {
  mainCategory: string;
  subcategory?: string;
} {
  // Shop kategorisi
  if (tags.shop) {
    return {
      mainCategory: 'shops',
      subcategory: tags.shop,
    };
  }

  // Amenity kategorisi
  if (tags.amenity) {
    const amenity = tags.amenity;
    
    // Yemek-içecek
    if (['restaurant', 'fast_food', 'food_court'].includes(amenity)) {
      return { mainCategory: 'restaurants', subcategory: amenity };
    }
    if (['cafe', 'bar', 'pub', 'biergarten'].includes(amenity)) {
      return { mainCategory: 'cafes', subcategory: amenity };
    }
    
    // Sağlık
    if (['pharmacy', 'doctors', 'dentist', 'hospital', 'clinic'].includes(amenity)) {
      return { mainCategory: 'health', subcategory: amenity };
    }
    
    // Eğitim
    if (['school', 'kindergarten', 'college', 'university', 'library'].includes(amenity)) {
      return { mainCategory: 'education', subcategory: amenity };
    }
    
    return { mainCategory: 'services', subcategory: amenity };
  }

  // Tourism kategorisi
  if (tags.tourism) {
    return {
      mainCategory: 'tourism',
      subcategory: tags.tourism,
    };
  }

  // Office kategorisi
  if (tags.office) {
    return {
      mainCategory: 'services',
      subcategory: `office_${tags.office}`,
    };
  }

  // Craft kategorisi
  if (tags.craft) {
    return {
      mainCategory: 'services',
      subcategory: `craft_${tags.craft}`,
    };
  }

  // Leisure/Sport kategorisi
  if (tags.leisure || tags.sport) {
    return {
      mainCategory: 'sports',
      subcategory: tags.leisure || tags.sport,
    };
  }

  // Varsayılan
  return {
    mainCategory: 'other',
  };
}

/**
 * OSM element'inden adres bilgisi çıkarır
 */
export function extractAddress(tags: Record<string, string>): {
  address?: string;
  postalCode?: string;
  city?: string;
} {
  const address = tags['addr:street']
    ? `${tags['addr:housenumber'] || ''} ${tags['addr:street']}`.trim()
    : undefined;

  return {
    address,
    postalCode: tags['addr:postcode'],
    city: tags['addr:city'],
  };
}

/**
 * OSM element'inden iletişim bilgisi çıkarır
 */
export function extractContact(tags: Record<string, string>): {
  phone?: string;
  email?: string;
  website?: string;
} {
  return {
    phone: tags.phone || tags['contact:phone'],
    email: tags.email || tags['contact:email'],
    website: tags.website || tags['contact:website'],
  };
}

/**
 * OSM element'inden koordinat çıkarır
 */
export function extractCoordinates(element: OverpassElement): {
  lat: number;
  lng: number;
} | null {
  if (element.lat && element.lon) {
    return { lat: element.lat, lng: element.lon };
  }
  
  if (element.center) {
    return { lat: element.center.lat, lng: element.center.lon };
  }
  
  return null;
}
