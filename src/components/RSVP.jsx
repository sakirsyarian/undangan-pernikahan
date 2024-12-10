import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useGuest } from '../hooks/useGuest';
import { useState } from 'react';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

const ATTENDANCE_OPTIONS = [
  { value: 'All', label: 'All Day' },
  { value: 'Morning', label: 'Morning Only' },
  { value: 'Night', label: 'Evening Only' },
  { value: 'No', label: 'Unable to Attend' }
];

export default function RSVP() {
  const params = new URLSearchParams(window.location.search);
  const guestName = params.get('guest') || '';
  const { guestData, loading, submitAttendance } = useGuest(guestName);
  const [showSuccess, setShowSuccess] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({
    defaultValues: {
      name: guestName,
      attendees: '1',
      attendance: 'All'
    }
  });

  const onSubmit = async (data) => {
    try {
      const success = await submitAttendance(
        data.attendance,
        parseInt(data.attendees, 10)
      );

      if (success) {
        reset();
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000); // Hide after 3 seconds
      }
    } catch (error) {
      alert('Failed to submit RSVP. Please try again.');
    }
  };

  const getAttendeeOptions = () => {
    const maxGuests = guestData?.guest_count || 2;
    return Array.from({ length: maxGuests }, (_, i) => i + 1);
  };

  return (
    <section id="rsvp" className="py-20 px-10 md:px-4 bg-secondary">
      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="max-w-md w-full mx-4 bg-white/90 backdrop-blur p-8 rounded-3xl shadow-xl text-center space-y-6"
            >
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-semibold text-gray-800">Thank You!</h3>
                <p className="text-gray-600">Your RSVP has been successfully submitted.</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-md mx-auto">
        <motion.div
          {...fadeInUp}
          className="bg-primary rounded-[40px] shadow-lg overflow-hidden relative"
        >
          {/* Header Image */}
          <div className="relative p-8 h-72 w-full overflow-hidden bg-primary">
            <img
              src="/img/rsvp.jpg"
              alt="Wedding couple at sunset"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>

          {/* Form Content */}
          <div className="p-8 space-y-6">
            <motion.div {...fadeInUp} className="text-center space-y-4">
              <h2 className="text-4xl text-title">RSVP</h2>
              <p className="text-sm leading-relaxed">
                Please kindly help us make our celebration even more special by confirming your attendance through the RSVP form below.
              </p>
            </motion.div>

            <motion.form
              {...fadeInUp}
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <div className="space-y-2">
                <label className="block text-sm">Name</label>
                <input
                  required
                  type="text"
                  {...register("name")}
                  className="w-full px-4 py-3 rounded-xl border border-accent focus:border-button focus:ring-1 focus:ring-button transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm">Attendance</label>
                <select
                  {...register("attendance", { required: "Please select your attendance" })}
                  className="w-full bg-white px-4 py-3 rounded-xl border border-accent focus:border-button focus:ring-1 focus:ring-button transition-colors"
                >
                  {ATTENDANCE_OPTIONS.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.attendance && (
                  <span className="text-red-500 text-xs">{errors.attendance.message}</span>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm">Number of Attendees</label>
                <select
                  {...register("attendees", { required: "Please select number of attendees" })}
                  className="w-full bg-white px-4 py-3 rounded-xl border border-accent focus:border-button focus:ring-1 focus:ring-button transition-colors"
                >
                  {getAttendeeOptions().map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
                {errors.attendees && (
                  <span className="text-red-500 text-xs">{errors.attendees.message}</span>
                )}
              </div>

              <button
                type="submit"
                className="w-full px-8 py-3 border-2 border-button text-button rounded-full
                          transition-colors"
              >
                Submit
              </button>
            </motion.form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}