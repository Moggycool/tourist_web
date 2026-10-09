import React, { useState } from 'react';
import { HotelProvider, useHotel } from './context/HotelContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { RoomsSection } from './components/RoomsSection';
import { RoomModal } from './components/RoomModal';
import { DiningSection } from './components/DiningSection';
import { ToursSection } from './components/ToursSection';
import { EventsSection } from './components/EventsSection';
import { EventMediaModal } from './components/EventMediaModal';
import { ConferenceSection } from './components/ConferenceSection';
import { AboutSection } from './components/AboutSection';
import { ReservationModal } from './components/ReservationModal';
import { RoomCompareModal } from './components/RoomCompareModal';
import { GuestPortalModal } from './components/GuestPortalModal';
import { AdminPortal } from './components/AdminPortal';
import { Footer } from './components/Footer';
import { Room, TourPackage } from './types';

const HotelMainContent: React.FC = () => {
  const {
    isAdminOpen,
    setIsAdminOpen,
    isGuestPortalOpen,
    setIsGuestPortalOpen,
    isCompareOpen,
    setIsCompareOpen,
    selectedRoomForBooking,
    setSelectedRoomForBooking,
    selectedRoomForDetail,
    setSelectedRoomForDetail,
    selectedTourForBooking,
    setSelectedTourForBooking,
    selectedEventForMedia,
    setSelectedEventForMedia,
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
    setSelectedTourForBooking(tour);
    setIsReservationOpen(true);
  };

  const handleCheckAvailability = () => {
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

        {/* 5. Recent Events & Media Gallery (Photos and Small Videos) */}
        <EventsSection
          onSelectEvent={(evt) => setSelectedEventForMedia(evt)}
        />

        {/* 6. Conferences & Meeting Halls */}
        <ConferenceSection />

        {/* 7. About Tourist Hotel & Arba Minch */}
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

      {/* Event Photo/Video Fullscreen Lightbox Modal */}
      <EventMediaModal
        event={selectedEventForMedia}
        onClose={() => setSelectedEventForMedia(null)}
      />

      {/* Side-by-Side Room Comparison Modal */}
      <RoomCompareModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        onSelectRoomForBooking={(room) => {
          setIsCompareOpen(false);
          handleOpenBooking(room);
        }}
        onSelectRoomForDetail={(room) => {
          setIsCompareOpen(false);
          setSelectedRoomForDetail(room);
        }}
      />

      {/* Guest Self-Service Portal (Manage Booking, Receipts & Vouchers) */}
      <GuestPortalModal
        isOpen={isGuestPortalOpen}
        onClose={() => setIsGuestPortalOpen(false)}
      />

      {/* System Admin Content Management Portal */}
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
