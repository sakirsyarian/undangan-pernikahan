import { motion } from 'framer-motion';
import { useGuest } from '../hooks/useGuest';
import data from '../data';

export default function WelcomeScreen() {
  const params = new URLSearchParams(window.location.search);
  const guestName = params.get('guest') || '';
  const { guestData, loading, recordStats } = useGuest(guestName);

  const handleOpen = async () => {
    console.log("hello");
  };

  return (
    <section id="invitation">
      {/* Background Image with Overlay */}
      <img
        loading='lazy'
        src="/img/couple.jpg"
        alt="Wedding Background"
        className="lg:max-w-4xl mx-auto object-cover object-center"
      />

      {/* Content Container */}
      <div className="lg:max-w-4xl mx-auto relative -top-20 py-16 pt-24 px-8 bg-cover lg:bg-center"
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
    </section>
  );
}