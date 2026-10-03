import React, { useState } from 'react';
import { HotelProvider, useHotel } from './context/HotelContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { RoomsSection } from './components/RoomsSection';
import { RoomModal } from './components/RoomModal';
import { DiningSection } from './components/DiningSection';
import { ToursSection } from './components/ToursSection';
import { ConferenceSection } from './components/ConferenceSection';
import { AboutSection } from './components/AboutSection';
import { ReservationModal } from './components/ReservationModal';
import { AdminPortal } from './components/AdminPortal';
import { Footer } from './components/Footer';
import { Room, TourPackage } from './types';

const HotelMainContent: React.FC = () => {
  const {
    isAdminOpen,
    setIsAdminOpen,
    selectedRoomForBooking,
    setSelectedRoomForBooking,
    selectedRoomForDetail,
    setSelectedRoomForDetail,
    selectedTourForBooking,
    setSelectedTourForBooking,
    hotelInfo
  } = useHotel();

  const [activeSection, setActiveSection] = useState<string>('rooms');
  const [isReservationOpen, setIsReservationOpen] = useState<boolean>(false);

  const handleOpenBooking = (room?: Room) => {
    if (room) {
      setSelectedRoomForBooking(room);
    }
    setIsReservationOpen(true);
  };

  const handleBookTour = (tour: TourPackage) => {
    // Open room reservation with pre-filled note or open booking
    setSelectedTourForBooking(tour);
    setIsReservationOpen(true);
  };

  const handleCheckAvailability = () => {
    // Scroll smoothly to rooms section and open booking
    const roomsEl = document.getElementById('rooms');
    if (roomsEl) {
      roomsEl.scrollIntoView({ behavior: 'smooth' });
    }
    setIsReservationOpen(true);
  };

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col font-sans text-stone-900 selection:bg-amber-600 selection:text-white">
      
      {/* Navigation */}
      <Navbar
        onBookClick={() => handleOpenBooking()}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Main Page Layout */}
      <main className="flex-1">
        {/* 1. Hero Section with Reservation Search */}
        <HeroSection onCheckAvailability={handleCheckAvailability} />

        {/* 2. Rooms & Suites Section */}
        <RoomsSection
          onSelectRoomForBooking={(room) => handleOpenBooking(room)}
          onSelectRoomForDetail={(room) => setSelectedRoomForDetail(room)}
        />

        {/* 3. Dining, Lake Fish & Traditional Coffee Ceremony */}
        <DiningSection />

        {/* 4. Arba Minch Safaris & Excursions */}
        <ToursSection onBookTour={handleBookTour} />

        {/* 5. Conferences & Meeting Halls */}
        <ConferenceSection />

        {/* 6. About Tourist Hotel & Arba Minch */}
        <AboutSection />
      </main>

      {/* Footer */}
      <Footer onNavClick={(sec) => {
        setActiveSection(sec);
        const el = document.getElementById(sec);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }} />

      {/* MODALS */}
      
      {/* Room Detail Modal */}
      <RoomModal
        room={selectedRoomForDetail}
        onClose={() => setSelectedRoomForDetail(null)}
        onBook={(room) => {
          setSelectedRoomForDetail(null);
          handleOpenBooking(room);
        }}
      />

      {/* Room & Stay Reservation Modal */}
      {isReservationOpen && (
        <ReservationModal
          initialRoom={selectedRoomForBooking}
          onClose={() => {
            setIsReservationOpen(false);
            setSelectedRoomForBooking(null);
          }}
        />
      )}

      {/* System Admin Content Management Portal (Answering Question 2) */}
      <AdminPortal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />

    </div>
  );
};

export default function App() {
  return (
    <HotelProvider>
      <HotelMainContent />
    </HotelProvider>
  );
}
