import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion';

import Hero from './components/Hero';
import Couple from './components/Couple';
import EventDetails from './components/EventDetails';
import RSVP from './components/RSVP';
import Gallery from './components/Gallery';
import Wishes from './components/Wishes';
import GiftRegistry from './components/GiftRegistry';
import Footer from './components/Footer';
import Invitation from './components/Invitation';
import WelcomeScreen from './components/WelcomeScreen';
import MusicControl from './components/MusicControl';

import { useAudio } from './hooks/useAudio';

function App() {
  const { isPlaying, toggle } = useAudio();
  const [isOpen, setIsOpen] = useState(false)

  return (
    <AnimatePresence mode="wait">
      {!isOpen ? (
        <WelcomeScreen
          key="welcome"
          onOpen={() => setIsOpen(true)}
          onToggle={toggle}
        />
      ) : (
        <motion.div
          key="main"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <MusicControl isPlaying={isPlaying} onToggle={toggle} />
          <main className="bg-primary text-main font-body">
            <Invitation />
            <Hero />
            <Couple />
            <EventDetails />
            <RSVP />
            <Gallery />
            <GiftRegistry />
            <Wishes />
            <Footer />
          </main>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default App;