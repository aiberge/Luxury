'use client'

/* eslint-disable react/no-unescaped-entities */

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Clock, Phone, Mail, Menu, X, ChevronLeft, ChevronRight, Instagram, Facebook } from 'lucide-react'

const carTypes = ['Tous', 'Économique', 'Luxe', 'SUV', 'Sport']

interface CarDetails {
  name: string;
  image: string;
  type: string;
  transmission: string;
  seats: number;
  luggage: number;
  airConditioning: boolean;
  fuel: string;
  maxSpeed: string;
  trunkSize: string;
}

const cars: CarDetails[] = [
  {
    name: 'Lamborghini Aventador',
    image: '/lamb.webp',
    type: 'Sport',
    transmission: 'Automatique',
    seats: 2,
    luggage: 1,
    airConditioning: true,
    fuel: 'Essence',
    maxSpeed: '350 km/h',
    trunkSize: '150 L'
  },
  {
    name: 'Ferrari 488 GTB',
    image: '/fra.jpeg',
    type: 'Sport',
    transmission: 'Automatique',
    seats: 2,
    luggage: 2,
    airConditioning: true,
    fuel: 'Essence',
    maxSpeed: '330 km/h',
    trunkSize: '230 L'
  },
  {
    name: 'Rolls-Royce Phantom',
    image: '/rose.avif',
    type: 'Luxe',
    transmission: 'Automatique',
    seats: 5,
    luggage: 4,
    airConditioning: true,
    fuel: 'Essence',
    maxSpeed: '250 km/h',
    trunkSize: '548 L'
  },
  {
    name: 'Bentley Continental GT',
    image: '/bent.jpeg',
    type: 'Luxe',
    transmission: 'Automatique',
    seats: 4,
    luggage: 3,
    airConditioning: true,
    fuel: 'Essence',
    maxSpeed: '333 km/h',
    trunkSize: '358 L'
  },
  {
    name: 'Mercedes-Benz S-Class',
    image: '/benz.jpeg',
    type: 'Luxe',
    transmission: 'Automatique',
    seats: 5,
    luggage: 3,
    airConditioning: true,
    fuel: 'Hybride',
    maxSpeed: '250 km/h',
    trunkSize: '550 L'
  },
  {
    name: 'BMW X7',
    image: '/x7.jpg',
    type: 'SUV',
    transmission: 'Automatique',
    seats: 7,
    luggage: 4,
    airConditioning: true,
    fuel: 'Diesel',
    maxSpeed: '250 km/h',
    trunkSize: '750 L'
  },
  {
    name: 'Audi e-tron',
    image: '/e-tron.jpeg',
    type: 'SUV',
    transmission: 'Automatique',
    seats: 5,
    luggage: 3,
    airConditioning: true,
    fuel: 'Électrique',
    maxSpeed: '200 km/h',
    trunkSize: '660 L'
  },
  {
    name: 'Tesla Model 3',
    image: '/mod3.jpg',
    type: 'Économique',
    transmission: 'Automatique',
    seats: 5,
    luggage: 2,
    airConditioning: true,
    fuel: 'Électrique',
    maxSpeed: '261 km/h',
    trunkSize: '425 L'
  }
]

type ScrollDirection = 'left' | 'right';

export function Page() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState('home')
  const [selectedCarType, setSelectedCarType] = useState('Tous')
  const carouselRef = useRef<HTMLDivElement>(null)
  const [selectedCar, setSelectedCar] = useState<CarDetails | null>(null);
  const [showReservationModal, setShowReservationModal] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const filteredCars = selectedCarType === 'Tous'
    ? cars
    : cars.filter(car => car.type === selectedCarType)

  const scrollCarousel = (direction: ScrollDirection) => {
    if (carouselRef.current) {
      const { scrollLeft, clientWidth } = carouselRef.current
      const scrollTo = direction === 'left'
        ? scrollLeft - clientWidth
        : scrollLeft + clientWidth

      carouselRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' })
    }
  }

  useEffect(() => {
    const handleResize = () => {
      if (carouselRef.current) {
        carouselRef.current.scrollLeft = 0
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const changePage = (page: string) => {
    setCurrentPage(page)
    setIsMenuOpen(false)
    window.scrollTo(0, 0)
  }

  const handleCatalogScroll = () => {
    const catalogSection = document.getElementById('catalog');
    if (catalogSection) {
      catalogSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  const closeModal = () => setSelectedCar(null);

  const mapContainerStyle = {
    height: '600px',
    width: '100%',
    position: 'relative' as const
  };

  const handleReservation = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowReservationModal(true);
  };

  const closeReservationModal = () => {
    setShowReservationModal(false);
    closeModal();
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap');
        body {
          font-family: 'Playfair Display', serif;
        }
        .luxury-gold {
          color: #D4AF37;
        }
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .scroll-container:hover .scroll-content {
          animation-play-state: paused;
        }
      `}</style>

      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-50 py-2">
        <div className="container mx-auto flex justify-between items-center px-4">
          <Link href="/" onClick={() => changePage('home')} className="relative w-64 h-28">
            <Image
              src="/logo.png"
              alt="Luxury Cars"
              layout="fill"
              objectFit="contain"
              className="cursor-pointer"
              priority
            />
          </Link>
          <div className="hidden md:flex space-x-4">
            <button onClick={() => changePage('home')} className="hover:text-[#D4AF37] transition duration-300">
              Accueil
            </button>
            <button onClick={() => changePage('about')} className="hover:text-[#D4AF37] transition duration-300">
              À Propos
            </button>
          </div>
          <button className="md:hidden text-white" onClick={toggleMenu}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-90 flex flex-col items-center justify-center">
          <button onClick={() => changePage('home')} className="text-2xl mb-4 hover:text-gold transition duration-300">
            Accueil
          </button>
          <button onClick={() => changePage('about')} className="text-2xl hover:text-gold transition duration-300">
            À Propos
          </button>
        </div>
      )}

      {/* Home Page */}
      {currentPage === 'home' && (
        <div className="">
          {/* Hero Section */}
          <section className="relative h-screen flex items-center justify-center">
            <Image
              src="/showroome.jpeg"
              alt="Luxury Car"
              layout="fill"
              objectFit="cover"
              quality={100}
              className="absolute inset-0"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50" />
            <div className="relative z-10 text-center">
              <h1 className="text-5xl md:text-7xl font-bold mb-4 animate-fade-in-down">
                Bienvenue chez <span className="luxury-gold font-bold italic">Luxury Cars</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 animate-fade-in-up">
                L&apos;excellence au service de votre expérience de conduite
              </p>
              <button
                onClick={handleCatalogScroll}
                className="bg-[#D4AF37] text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-opacity-80 transition duration-300 animate-pulse"
              >
                Découvrir nos véhicules
              </button>
            </div>
          </section>

          {/* Catalog Section */}
          <section id="catalog" className="py-20 bg-gray-900">
            <div className="container mx-auto px-4">
              <h2 className="text-4xl font-bold mb-12 text-center text-gold">Notre Collection</h2>
              
              {/* Car Type Filter */}
              <div className="flex justify-center mb-8">
                {carTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedCarType(type)}
                    className={`mx-2 px-4 py-2 rounded-full ${
                      selectedCarType === type ? 'bg-gold text-black' : 'bg-gray-800 text-white'
                    } transition duration-300`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              {/* Scrollable Car Catalog */}
              <div className="relative">
                <button
                  onClick={() => scrollCarousel('left')}
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full z-10"
                >
                  <ChevronLeft className="text-gold" size={32} />
                </button>
                <div
                  ref={carouselRef}
                  className="flex overflow-x-auto scrollbar-hide space-x-6 py-6"
                  style={{ scrollSnapType: 'x mandatory' }}
                >
                  {filteredCars.map((car, index) => (
                    <div
                      key={index}
                      className="flex-none w-80 md:w-[500px] group relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 cursor-pointer"
                      style={{ scrollSnapAlign: 'start' }}
                      onClick={() => setSelectedCar(car)}
                    >
                      <div className="relative">
                        <div className="aspect-[16/10]">
                          <Image
                            src={car.image}
                            alt={car.name}
                            layout="fill"
                            objectFit="cover"
                            className="w-full transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="text-center">
                          <h3 className="text-2xl font-semibold text-white mb-2">
                            {car.name}
                          </h3>
                          <span className="text-lg text-gold">{car.type}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => scrollCarousel('right')}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full z-10"
                >
                  <ChevronRight className="text-gold" size={32} />
                </button>
              </div>
            </div>
          </section>

          {/* Location Section */}
          <section className="py-20 bg-black">
            <div className="container mx-auto px-4">
              <h2 className="text-4xl font-bold mb-12 text-center text-gold">Notre Emplacement</h2>
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="w-full md:w-1/2 mb-8 md:mb-0" style={mapContainerStyle}>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d108702.95904082737!2d-8.090425455415463!3d31.63474103915867!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdafee8d96179e51%3A0x5950b6534f87adb8!2sMarrakech!5e0!3m2!1sfr!2sma!4v1730469581279!5m2!1sfr!2sma"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
                <div className="w-full md:w-1/2 md:pl-12">
                  <div className="space-y-6">
                    <div className="flex items-center">
                      <MapPin className="text-gold mr-4" size={24} />
                      <p>123 Avenue Mohammed V, Marrakech, Maroc</p>
                    </div>
                    <div className="flex items-center">
                      <Clock className="text-gold mr-4" size={24} />
                      <p>Lun - Sam: 9h00 - 20h00 | Dim: 10h00 - 18h00</p>
                    </div>
                    <div className="flex items-center">
                      <Phone className="text-gold mr-4" size={24} />
                      <p>+212 717-121888</p>
                    </div>
                    <div className="flex items-center">
                      <Mail className="text-gold mr-4" size={24} />
                      <p>contact@luxurycars.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* About Page */}
      {currentPage === 'about' && (
        <div className="bg-black min-h-screen">
          <div className="h-20"></div>
          <div className="container mx-auto px-4 py-20">
            <h2 className="text-5xl font-bold italic mb-16 text-center">
              À Propos de <span className="luxury-gold font-bold italic">Luxury Cars</span>
            </h2>
            
            {/* Company History - increased margin bottom */}
            <div className="mb-32">
              <h3 className="text-3xl font-semibold mb-10 luxury-gold">Notre Histoire</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                  <p className="text-lg mb-6">
                    Fondée en 1995, <span className="luxury-gold font-bold italic">Luxury Cars</span> est née de la passion de deux frères pour les voitures d&apos;exception. Ce qui a commencé comme un petit garage dans le cœur de Marrakech s&apos;est transformé en l&apos;une des entreprises de location de voitures de luxe les plus réputées du Maroc.
                  </p>
                  <p className="text-lg">
                    Aujourd'hui, avec plus de 25 ans d'expérience, nous continuons à offrir une expérience de conduite inégalée, en alliant l'élégance du luxe marocain à la puissance de l'ingénierie automobile mondiale.
                  </p>
                </div>
                <div className="relative h-96 md:h-[500px] rounded-lg overflow-hidden shadow-2xl">
                  <Image
                    src="/small.jpg"
                    alt="Luxury Cars History"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg transform scale-110 hover:scale-125 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>

            {/* Our Fleet - increased margin bottom */}
            <div className="mb-32">
              <h3 className="text-3xl font-semibold mb-10 luxury-gold">Notre Flotte</h3>
              <p className="text-lg mb-8">
                Chez <span className="luxury-gold font-bold italic">Luxury Cars</span>, nous sommes fiers de proposer une sélection des véhicules les plus prestigieux et performants du marché. Notre flotte est constamment mise à jour pour inclure les derniers modèles et innovations de l'industrie automobile.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {carTypes.filter(type => type !== 'Tous').map((type) => (
                  <div key={type} className="bg-gray-800 rounded-lg p-4 text-center">
                    <h4 className="text-xl font-semibold mb-2">{type}</h4>
                    <p>{cars.filter(car => car.type === type).length} véhicules</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Our Services - increased margin bottom */}
            <div className="mb-32">
              <h3 className="text-3xl font-semibold mb-10 luxury-gold">Nos Services</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div 
                  className="bg-gray-800 rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 cursor-pointer"
                  onClick={() => window.open('https://wa.me/212717121888?text=Je suis intéressé par votre service de location courte durée', '_blank')}
                >
                  <div className="relative h-64">
                    <Image
                      src="/short.jpeg"
                      alt="Location Courte Durée"
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-semibold mb-4 luxury-gold">Location Courte Durée</h4>
                    <p className="text-lg">
                      Parfait pour les week-ends de luxe ou les événements spéciaux. Profitez de nos véhicules haut de gamme pour quelques jours et créez des souvenirs inoubliables.
                    </p>
                  </div>
                </div>

                <div 
                  className="bg-gray-800 rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 cursor-pointer"
                  onClick={() => window.open('https://wa.me/212717121888?text=Je suis intéressé par votre service de location longue durée', '_blank')}
                >
                  <div className="relative h-64">
                    <Image
                      src="/long.jpeg"
                      alt="Location Longue Durée"
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-semibold mb-4 luxury-gold">Location Longue Durée</h4>
                    <p className="text-lg">
                      Pour ceux qui recherchent une expérience prolongée, notre service de location longue durée offre flexibilité et confort, avec des tarifs adaptés à vos besoins.
                    </p>
                  </div>
                </div>

                <div 
                  className="bg-gray-800 rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 cursor-pointer"
                  onClick={() => window.open('https://wa.me/212717121888?text=Je suis intéressé par votre service de chauffeur', '_blank')}
                >
                  <div className="relative h-64">
                    <Image
                      src="/chof.jpeg"
                      alt="Service de Chauffeur"
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-semibold mb-4 luxury-gold">Service de Chauffeur</h4>
                    <p className="text-lg">
                      Laissez-vous conduire par nos chauffeurs professionnels et profitez pleinement du luxe et du confort de nos véhicules.
                    </p>
                  </div>
                </div>

                <div 
                  className="bg-gray-800 rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 cursor-pointer"
                  onClick={() => window.open('https://wa.me/212717121888?text=Je suis intéressé par vos services pour événements spéciaux', '_blank')}
                >
                  <div className="relative h-64">
                    <Image
                      src="/event.jpeg"
                      alt="Événements Spéciaux"
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-semibold mb-4 luxury-gold">Événements Spéciaux</h4>
                    <p className="text-lg">
                      Mariages, galas, tournages... Nous fournissons des véhicules d'exception pour tous vos événements spéciaux, avec un service sur mesure.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonials - with proper spacing */}
            <div className="mb-16">
              <h3 className="text-3xl font-semibold mb-10 luxury-gold">Ce Que Disent Nos Clients</h3>
              
              {/* Scrolling testimonials container */}
              <div className="overflow-hidden scroll-container">
                <div 
                  className="scroll-content flex gap-8 whitespace-nowrap"
                  style={{
                    animation: 'scroll 20s linear infinite',
                    width: 'fit-content'
                  }}
                >
                  {/* First set of testimonials */}
                  <div className="inline-block min-w-[300px] md:min-w-[400px] bg-gray-800 p-8 rounded-lg">
                    <p className="text-lg italic mb-6 whitespace-normal">
                      "Une expérience incroyable ! La Ferrari 488 GTB était en parfait état et le service client de <span className="luxury-gold font-bold italic">Luxury Cars</span> a été exceptionnel du début à la fin."
                    </p>
                    <p className="font-semibold">- Jean D., Marrakech</p>
                  </div>

                  <div className="inline-block min-w-[300px] md:min-w-[400px] bg-gray-800 p-8 rounded-lg">
                    <p className="text-lg italic mb-6 whitespace-normal">
                      "<span className="luxury-gold font-bold italic">Luxury Cars</span> a rendu notre mariage encore plus spécial avec leur Rolls-Royce Phantom. Un grand merci à toute l'équipe !"
                    </p>
                    <p className="font-semibold">- Marie et Pierre L., Casablanca</p>
                  </div>

                  <div className="inline-block min-w-[300px] md:min-w-[400px] bg-gray-800 p-8 rounded-lg">
                    <p className="text-lg italic mb-6 whitespace-normal">
                      "Service impeccable ! La Bentley Continental GT était magnifique et le processus de location était très simple. Je recommande vivement <span className="luxury-gold font-bold italic">Luxury Cars</span>."
                    </p>
                    <p className="font-semibold">- Ahmed M., Rabat</p>
                  </div>

                  {/* Duplicate testimonials for seamless scrolling */}
                  <div className="inline-block min-w-[300px] md:min-w-[400px] bg-gray-800 p-8 rounded-lg">
                    <p className="text-lg italic mb-6 whitespace-normal">
                      "Une expérience incroyable ! La Ferrari 488 GTB était en parfait état et le service client de <span className="luxury-gold font-bold italic">Luxury Cars</span> a été exceptionnel du début à la fin."
                    </p>
                    <p className="font-semibold">- Jean D., Marrakech</p>
                  </div>

                  <div className="inline-block min-w-[300px] md:min-w-[400px] bg-gray-800 p-8 rounded-lg">
                    <p className="text-lg italic mb-6 whitespace-normal">
                      "<span className="luxury-gold font-bold italic">Luxury Cars</span> a rendu notre mariage encore plus spécial avec leur Rolls-Royce Phantom. Un grand merci à toute l'équipe !"
                    </p>
                    <p className="font-semibold">- Marie et Pierre L., Casablanca</p>
                  </div>

                  <div className="inline-block min-w-[300px] md:min-w-[400px] bg-gray-800 p-8 rounded-lg">
                    <p className="text-lg italic mb-6 whitespace-normal">
                      "Service impeccable ! La Bentley Continental GT était magnifique et le processus de location était très simple. Je recommande vivement <span className="luxury-gold font-bold italic">Luxury Cars</span>."
                    </p>
                    <p className="font-semibold">- Ahmed M., Rabat</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p>&copy; 2023 <span className="luxury-gold font-bold italic">Luxury Cars</span>. Tous droits réservés.</p>
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex space-x-4 ml-6">
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:scale-110 transition-transform duration-300"
                >
                  <Instagram className="luxury-gold" size={24} />
                </a>
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:scale-110 transition-transform duration-300"
                >
                  <Facebook className="luxury-gold" size={24} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Car Details Modal */}
      {selectedCar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70"
             onClick={closeModal}>
          <div className="relative bg-gray-900 rounded-xl max-w-6xl w-full p-8 shadow-2xl"
               onClick={e => e.stopPropagation()}>
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-white z-10"
            >
              <X size={24} />
            </button>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative h-[500px]">
                <Image
                  src={selectedCar.image}
                  alt={selectedCar.name}
                  layout="fill"
                  objectFit="contain"
                  className="rounded-lg"
                />
              </div>
              
              <div className="space-y-6">
                <h3 className="text-3xl font-bold luxury-gold">{selectedCar.name}</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <h4 className="luxury-gold font-semibold mb-1">Type</h4>
                    <p>{selectedCar.type}</p>
                  </div>
                  
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <h4 className="luxury-gold font-semibold mb-1">Transmission</h4>
                    <p>{selectedCar.transmission}</p>
                  </div>
                  
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <h4 className="luxury-gold font-semibold mb-1">Sièges</h4>
                    <p>{selectedCar.seats}</p>
                  </div>
                  
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <h4 className="luxury-gold font-semibold mb-1">Bagages</h4>
                    <p>{selectedCar.luggage}</p>
                  </div>
                  
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <h4 className="luxury-gold font-semibold mb-1">Climatisation</h4>
                    <p>{selectedCar.airConditioning ? 'Oui' : 'Non'}</p>
                  </div>
                  
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <h4 className="luxury-gold font-semibold mb-1">Carburant</h4>
                    <p>{selectedCar.fuel}</p>
                  </div>
                  
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <h4 className="luxury-gold font-semibold mb-1">Vitesse max</h4>
                    <p>{selectedCar.maxSpeed}</p>
                  </div>
                  
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <h4 className="luxury-gold font-semibold mb-1">Taille du coffre</h4>
                    <p>{selectedCar.trunkSize}</p>
                  </div>
                </div>
                
                <button 
                  onClick={handleReservation}
                  className="w-full bg-gold text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition duration-300"
                >
                  Réserver maintenant
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reservation Confirmation Modal */}
      {showReservationModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black bg-opacity-70"
             onClick={closeReservationModal}>
          <div 
            className="relative bg-gray-900 rounded-xl max-w-md w-full p-8 shadow-2xl border border-gold"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={closeReservationModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X size={24} />
            </button>

            <div className="text-center space-y-6">
              <h3 className="text-2xl font-bold text-gold">
                Confirmation de réservation
              </h3>
              
              <p className="text-lg text-gray-300">
                Merci d&apos;avoir choisi <span className="luxury-gold font-bold italic">Luxury Cars</span> pour votre location de voiture.
              </p>
              
              <p className="text-gray-300">
                Pour finaliser votre réservation, veuillez nous contacter par l'un des moyens suivants :
              </p>

              <div className="space-y-4 pt-4">
                <a 
                  href="https://wa.me/212717121888"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-300"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Contacter sur WhatsApp
                </a>
                
                <a 
                  href="tel:+212717121888"
                  className="flex items-center justify-center gap-2 bg-gold text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition duration-300"
                >
                  <Phone className="w-5 h-5" />
                  +212 717-121888
                </a>

                <button 
                  onClick={() => {navigator.clipboard.writeText('+212717121888')}}
                  className="flex items-center justify-center gap-2 bg-gray-700 text-white py-3 rounded-lg font-semibold hover:bg-gray-600 transition duration-300 w-full"
                >
                  Copier le numéro
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}