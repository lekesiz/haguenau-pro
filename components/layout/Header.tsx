import Link from 'next/link';
import { MapPin } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <MapPin className="w-8 h-8 text-primary-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Haguenau.pro</h1>
              <p className="text-xs text-gray-600">Annuaire des entreprises locales</p>
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
              Accueil
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
              À propos
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
