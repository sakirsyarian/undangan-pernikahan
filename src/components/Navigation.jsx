import { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { Home, Users, Calendar, Mail, Image, MessageCircle, Gift } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { id: 'home', icon: Home, label: 'Home' },
  { id: 'couple', icon: Users, label: 'Couple' },
  { id: 'event', icon: Calendar, label: 'Event' },
  { id: 'rsvp', icon: Mail, label: 'RSVP' },
  { id: 'gallery', icon: Image, label: 'Gallery' },
  { id: 'wishes', icon: MessageCircle, label: 'Wishes' },
  { id: 'gifts', icon: Gift, label: 'Gifts' }
];

export default function Navigation() {
  const [active, setActive] = useState('home');
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(lastScrollY > currentScrollY || currentScrollY < 100);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-gray-200 h-16 z-50"
        >
          <div className="max-w-screen-lg mx-auto px-4">
            <div className="flex justify-between items-center h-full">
              {navItems.map(({ id, icon: Icon, label }) => (
                <Link
                  key={id}
                  to={id}
                  spy={true}
                  smooth={true}
                  offset={-64}
                  duration={500}
                  onSetActive={() => setActive(id)}
                  className="relative group"
                >
                  <div className={`flex flex-col items-center transition-colors
                    ${active === id ? 'text-accent' : 'text-title hover:text-accent'}`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-xs mt-1">{label}</span>
                    {active === id && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent"
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}