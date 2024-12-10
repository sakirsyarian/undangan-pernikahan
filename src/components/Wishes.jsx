import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { useWishes } from '../hooks/useWishes';
import { useGuestName } from '../hooks/useGuestName';

export default function Wishes() {
  const guestName = useGuestName('');
  const [message, setMessage] = useState('');
  const [name, setName] = useState(guestName);
  const [showConfirm, setShowConfirm] = useState(false);
  const { wishes, loading, error, isSubmitting, addWish } = useWishes();

  // Update name when guestName changes
  useEffect(() => {
    setName(guestName);
  }, [guestName]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowConfirm(true);
  };

  const confirmSubmit = async () => {
    if (isSubmitting) return;

    try {
      await addWish({ name, message });
      setMessage('');
      setName('');
      setShowConfirm(false);
    } catch (error) {
      alert('Failed to submit wish. Please try again.');
    }
  };

  return (
    <>
      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl"
            >
              <h3 className="text-xl font-medium text-gray-900 mb-4">Confirm Your Wish</h3>
              <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <p className="text-gray-600 mb-2">{message}</p>
                <p className="text-sm text-accent">- {name}</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={confirmSubmit}
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-2 bg-button text-white rounded-xl hover:bg-button/90 transition-colors disabled:bg-gray-300"
                >
                  {isSubmitting ? 'Submitting...' : 'Confirm'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Image */}
      <div className='bg-primary'>
        <img
          src="/img/wish.jpg"
          alt="Wedding Decoration"
          className="lg:max-w-4xl mx-auto object-cover object-center"
        />
      </div>
      <section id="wishes" className="py-20 px-10 md:px-4 bg-primary">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-wish text-4xl text-center text-title mb-8"
          >
            Wishes and Prayers
          </motion.h2>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="max-w-2xl mx-auto mb-16"
          >
            <div className="space-y-4">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
                required
                className="w-full px-4 py-2 border border-accent rounded-xl transition-colors focus:ring-1  focus:ring-button focus:border-button"
              />
              <div className="relative">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your wishes..."
                  required
                  maxLength={280}
                  rows="4"
                  className="w-full px-4 py-2 border border-accent rounded-xl transition-colors focus:ring-1 focus:ring-button focus:border-button"
                />
                <span className="absolute bottom-2 right-2 text-sm text-gray-500">
                  {message.length}/280
                </span>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex items-center justify-center gap-2 px-6 py-3 border-2 border-button ${isSubmitting ? 'bg-gray-100 text-gray-400 border-gray-300' : 'bg-transparent text-button'
                  } rounded-full transition-colors`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-t-2 border-b-2 border-current rounded-full animate-spin"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit
                  </>
                )}
              </button>
            </div>
          </motion.form>

          <div className="max-h-[600px] overflow-y-auto pr-4 space-y-6 scrollbar-thin scrollbar-thumb-accent scrollbar-track-gray-100">
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="w-8 h-8 border-t-2 border-b-2 border-accent rounded-full animate-spin"></div>
              </div>
            ) : error ? (
              <div className="text-center text-red-500">
                Error loading wishes. Please refresh the page.
              </div>
            ) : wishes.length === 0 ? (
              <div className="text-center text-gray-500">
                No wishes yet. Be the first to send your wishes!
              </div>
            ) : (
              wishes.map((wish, index) => (
                <motion.div
                  key={wish.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-6 rounded-lg shadow-sm"
                >
                  <div className="flex gap-1 items-center text-sm">
                    <p className="text-accent font-medium">{wish.name}</p>
                    <p className='text-gray-400'>-</p>
                    <p className="text-gray-400">
                      {formatDistanceToNow(new Date(wish.datetime), { addSuffix: true })}
                    </p>
                  </div>
                  <p className="mt-4 text-lg">{wish.message}</p>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
}