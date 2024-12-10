import { motion } from 'framer-motion';
import { useGuest } from '../hooks/useGuest';
import data from '../data';

export default function WelcomeScreen({ onOpen, onToggle, onSkip }) {
  const params = new URLSearchParams(window.location.search);
  const guestName = params.get('guest') || '';
  const { guestData, loading, recordStats } = useGuest(guestName);

  const handleOpen = async () => {
    try {
      if (guestName) {
        await recordStats(); // Record that invitation was opened
      }

      await onToggle(); // Play music
      onOpen();

      // Add small delay to ensure components are rendered
      setTimeout(() => {
        const heroSection = document.getElementById('hero');
        if (heroSection) {
          heroSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 600);
    } catch (err) {
      console.error('Failed to play audio:', err);
      onOpen();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed inset-0 z-50 bg-white overflow-hidden"
    >
      <div className="relative h-full w-full">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            loading='lazy'
            src="/img/couple.jpg"
            alt="Wedding Background"
            className="w-full lg:h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/10" />
        </div>

        {/* Content Container */}
        <div id="hero" className="absolute bottom-0 left-0 right-0 py-16 pt-24 px-8 bg-cover lg:bg-center"
          style={{ backgroundImage: 'url("/img/assets/paper-landing.png")' }}>
          <div className="max-w-md mx-auto text-center space-y-6 text-main font-body">
            <div className="space-y-2">
              <p className="uppercase tracking-wider text-sm">
                THE WEDDING OF
              </p>
              <h1 className="text-2xl">
                <span className="font-normal text-title">{data.welcome.groom}</span>
                <span className="font-heading text-accent italic font-thin mx-1">and</span>
                <span className="font-normal text-title">{data.welcome.bride}</span>
              </h1>
            </div>

            <div className="space-y-2">
              <p>Dear,</p>
              <p className="italic">
                {!guestName ? 'Guest Name' : (
                  guestData ?
                    `${guestData.honorific} ${guestData.guest_name} ${guestData.partner === "true" ? 'and Partner' : ''}` :
                    'Guest'
                )}
              </p>
            </div>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              onClick={handleOpen}
              className="w-full px-8 py-3 border-2 border-button rounded-full
                       text-button font-medium tracking-wide
                       hover:bg-gray-50 transition-colors"
            >
              Open Invitation
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}