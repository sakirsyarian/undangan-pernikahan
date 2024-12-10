import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

export default function MusicControl({ isPlaying, onToggle }) {

  return (
    <AnimatePresence>
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        onClick={onToggle}
        className="fixed top-6 right-6 z-40 w-12 h-12 bg-white/90 backdrop-blur-sm 
                   rounded-full shadow-lg flex items-center justify-center
                   hover:bg-white transition-all duration-300"
      >
        {isPlaying ? (
          <Volume2 className="w-6 h-6 text-title" />
        ) : (
          <VolumeX className="w-6 h-6 text-title" />
        )}
      </motion.button>
    </AnimatePresence>
  );
}