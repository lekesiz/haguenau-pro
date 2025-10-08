import Link from 'next/link';
import { MapPin, Mail, Phone } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* À propos */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-6 h-6 text-primary-400" />
              <h3 className="text-white font-bold text-lg">Haguenau.pro</h3>
            </div>
            <p className="text-sm">
              Annuaire complet des entreprises de Haguenau et ses environs (30 km). 
              Trouvez facilement les commerces, restaurants, services et plus encore.
            </p>
          </div>
          
          {/* Liens rapides */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Liens rapides</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-primary-400 transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary-400 transition-colors">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <a href="mailto:contact@netzinformatique.fr" className="hover:text-primary-400 transition-colors">
                  contact@netzinformatique.fr
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <a href="tel:+33367310201" className="hover:text-primary-400 transition-colors">
                  03 67 31 02 01
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>
            © {currentYear} Haguenau.pro - Un service de{' '}
            <a 
              href="https://netzinformatique.fr" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary-400 hover:text-primary-300 transition-colors"
            >
              Netz Informatique
            </a>
          </p>
          <p className="mt-2 text-gray-500">
            Données fournies par OpenStreetMap contributors
          </p>
        </div>
      </div>
    </footer>
  );
}
