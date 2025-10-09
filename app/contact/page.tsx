import Link from 'next/link';
import { MapPin, Phone, Mail, Clock, Send, MessageSquare, HelpCircle } from 'lucide-react';

export const metadata = {
  title: 'Contact - Haguenau.pro',
  description: 'Contactez l\'équipe de Haguenau.pro pour toute question ou suggestion.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Contactez-Nous
            </h1>
            <p className="text-xl md:text-2xl text-blue-100">
              Une question ? Une suggestion ? Nous sommes là pour vous aider
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Informations de Contact</h2>
              
              <div className="space-y-6 mb-12">
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <Phone className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Téléphone</h3>
                      <a href="tel:0367310201" className="text-blue-600 hover:text-blue-700 text-xl font-medium">
                        03 67 31 02 01
                      </a>
                      <p className="text-gray-600 text-sm mt-1">Lun-Sam: 09:00-12:00 / 14:00-18:00</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                  <div className="flex items-start space-x-4">
                    <div className="bg-green-100 p-3 rounded-lg">
                      <Mail className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Email</h3>
                      <a href="mailto:contact@netzinformatique.fr" className="text-blue-600 hover:text-blue-700 text-lg font-medium break-all">
                        contact@netzinformatique.fr
                      </a>
                      <p className="text-gray-600 text-sm mt-1">Réponse sous 24-48h</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                  <div className="flex items-start space-x-4">
                    <div className="bg-purple-100 p-3 rounded-lg">
                      <MapPin className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Localisation</h3>
                      <p className="text-gray-700 text-lg">Haguenau, France</p>
                      <p className="text-gray-600 text-sm mt-1">Service local de proximité</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                  <div className="flex items-start space-x-4">
                    <div className="bg-orange-100 p-3 rounded-lg">
                      <Clock className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Horaires d'Ouverture</h3>
                      <div className="text-gray-700">
                        <p className="mb-1"><span className="font-medium">Lundi - Samedi:</span></p>
                        <p>09:00 - 12:00</p>
                        <p>14:00 - 18:00</p>
                        <p className="mt-2 text-gray-600 text-sm">Fermé le dimanche</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Liens Rapides</h3>
                <div className="space-y-3">
                  <Link href="/" className="block text-blue-600 hover:text-blue-700 font-medium">
                    → Retour à l'Annuaire
                  </Link>
                  <Link href="/about" className="block text-blue-600 hover:text-blue-700 font-medium">
                    → À Propos de Haguenau.pro
                  </Link>
                  <a href="https://www.netzinformatique.fr" target="_blank" rel="noopener noreferrer" className="block text-blue-600 hover:text-blue-700 font-medium">
                    → NETZ Informatique
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form & FAQ */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Envoyez-nous un Message</h2>
              
              {/* Contact Form */}
              <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 mb-12">
                <form className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-400"
                      placeholder="Votre nom"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-400"
                      placeholder="votre.email@exemple.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-400"
                      placeholder="06 12 34 56 78"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Sujet *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900"
                    >
                      <option value="">Sélectionnez un sujet</option>
                      <option value="question">Question générale</option>
                      <option value="suggestion">Suggestion d'amélioration</option>
                      <option value="business">Ajouter mon entreprise</option>
                      <option value="error">Signaler une erreur</option>
                      <option value="other">Autre</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-400 resize-none"
                      placeholder="Décrivez votre demande en détail..."
                    ></textarea>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-gray-700">
                      <strong>Note:</strong> Ce formulaire est actuellement en mode démonstration. 
                      Pour nous contacter, veuillez utiliser l'email ou le téléphone ci-dessus.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => window.location.href = 'mailto:contact@netzinformatique.fr'}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg flex items-center justify-center space-x-2"
                  >
                    <Send className="w-5 h-5" />
                    <span>Envoyer par Email</span>
                  </button>
                </form>
              </div>

              {/* FAQ Section */}
              <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
                <div className="flex items-center space-x-3 mb-6">
                  <HelpCircle className="w-6 h-6 text-blue-600" />
                  <h3 className="text-2xl font-bold text-gray-900">Questions Fréquentes</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="border-b border-gray-200 pb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Comment ajouter mon entreprise ?</h4>
                    <p className="text-gray-600 text-sm">
                      Contactez-nous par email ou téléphone avec les informations de votre entreprise. 
                      Nous l'ajouterons gratuitement à l'annuaire.
                    </p>
                  </div>

                  <div className="border-b border-gray-200 pb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Comment modifier les informations d'une entreprise ?</h4>
                    <p className="text-gray-600 text-sm">
                      Envoyez-nous un email avec les modifications souhaitées et nous mettrons à jour 
                      les informations rapidement.
                    </p>
                  </div>

                  <div className="border-b border-gray-200 pb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Le service est-il gratuit ?</h4>
                    <p className="text-gray-600 text-sm">
                      Oui, Haguenau.pro est entièrement gratuit pour les utilisateurs et les entreprises 
                      référencées.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">À quelle fréquence les données sont-elles mises à jour ?</h4>
                    <p className="text-gray-600 text-sm">
                      Notre base de données est mise à jour régulièrement pour garantir des informations 
                      fiables et actuelles.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

