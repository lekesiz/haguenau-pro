import Link from 'next/link';
import { MapPin, Phone, Mail, Clock, Award, Users, TrendingUp, Shield } from 'lucide-react';

export const metadata = {
  title: 'À Propos - Haguenau.pro',
  description: 'Découvrez Haguenau.pro, l\'annuaire local des entreprises de Haguenau. Un service de NETZ Informatique.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              À Propos de Haguenau.pro
            </h1>
            <p className="text-xl md:text-2xl text-blue-100">
              Votre annuaire local des entreprises de Haguenau
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Mission Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Notre Mission</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                <strong>Haguenau.pro</strong> est l'annuaire local de référence pour découvrir les entreprises, commerces et services de Haguenau. Notre mission est de faciliter la connexion entre les habitants et les professionnels locaux, en offrant une plateforme moderne, intuitive et complète.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                Que vous recherchiez un restaurant, un artisan, un commerce de proximité ou un service professionnel, Haguenau.pro vous permet de trouver rapidement l'entreprise qu'il vous faut, avec toutes les informations nécessaires : coordonnées, horaires, localisation sur carte interactive et bien plus encore.
              </p>
            </div>
          </section>

          {/* Features Grid */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Nos Atouts</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <MapPin className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Carte Interactive</h3>
                    <p className="text-gray-600">
                      Visualisez toutes les entreprises sur une carte interactive et trouvez facilement celles proches de vous.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Données À Jour</h3>
                    <p className="text-gray-600">
                      Base de données régulièrement mise à jour pour vous garantir des informations fiables et actuelles.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Communauté Locale</h3>
                    <p className="text-gray-600">
                      Soutenez l'économie locale en découvrant et en favorisant les commerces de proximité.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="bg-orange-100 p-3 rounded-lg">
                    <Shield className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Gratuit & Sans Pub</h3>
                    <p className="text-gray-600">
                      Service entièrement gratuit, sans publicité intrusive, pour une expérience utilisateur optimale.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* NETZ Informatique Section */}
          <section className="mb-16 bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-2xl border border-blue-100">
            <div className="flex items-center space-x-3 mb-6">
              <Award className="w-8 h-8 text-blue-600" />
              <h2 className="text-3xl font-bold text-gray-900">Un Service NETZ Informatique</h2>
            </div>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                <strong>Haguenau.pro</strong> est développé et maintenu par <strong>NETZ Informatique</strong>, votre partenaire technologique à Haguenau depuis plus de 20 ans.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                Spécialisés dans la transformation digitale, le développement web et les solutions informatiques, nous mettons notre expertise au service de la communauté locale avec cet annuaire moderne et performant.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="flex items-center space-x-3 mb-4">
                    <Phone className="w-5 h-5 text-blue-600" />
                    <h3 className="font-semibold text-gray-900">Téléphone</h3>
                  </div>
                  <a href="tel:0367310201" className="text-blue-600 hover:text-blue-700 text-lg font-medium">
                    03 67 31 02 01
                  </a>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="flex items-center space-x-3 mb-4">
                    <Mail className="w-5 h-5 text-blue-600" />
                    <h3 className="font-semibold text-gray-900">Email</h3>
                  </div>
                  <a href="mailto:contact@netzinformatique.fr" className="text-blue-600 hover:text-blue-700 text-lg font-medium break-all">
                    contact@netzinformatique.fr
                  </a>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="flex items-center space-x-3 mb-4">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    <h3 className="font-semibold text-gray-900">Localisation</h3>
                  </div>
                  <p className="text-gray-700 text-lg">Haguenau, France</p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="flex items-center space-x-3 mb-4">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <h3 className="font-semibold text-gray-900">Horaires</h3>
                  </div>
                  <p className="text-gray-700">Lun-Sam: 09:00-12:00</p>
                  <p className="text-gray-700">14:00-18:00</p>
                </div>
              </div>

              <div className="mt-8 text-center">
                <a 
                  href="https://www.netzinformatique.fr" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
                >
                  Découvrir NETZ Informatique
                </a>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Prêt à découvrir les entreprises locales ?
            </h2>
            <p className="text-gray-600 mb-6 text-lg">
              Explorez notre annuaire et trouvez les professionnels qu'il vous faut à Haguenau.
            </p>
            <Link 
              href="/"
              className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
            >
              Explorer l'Annuaire
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
}

