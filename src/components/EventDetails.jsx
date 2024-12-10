import { motion } from 'framer-motion';
import data from '../data';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

export default function EventDetails() {
  return (
    <section id="event" className="lg:max-w-4xl mx-auto py-20 px-10 md:px-4 bg-cover bg-center" style={{ backgroundImage: 'url("/img/couple.jpg")' }}>
      <div className="max-w-3xl mx-auto space-y-8">

        <div className='p-5 bg-white/40'>
          <motion.div
            {...fadeInUp}
            className="bg-white/80 backdrop-blur-sm p-8 text-center shadow-lg space-y-4"
          >
            <div className="mb-6">
              <h2 className="font-heading text-4xl text-title mb-6">Holy Matrimony</h2>
              <p className="font-sub-heading text-xl">{data.event.matrimony.date}</p>
              <p className="font-sub-heading text-xl mt-2">{data.event.matrimony.time}</p>
            </div>
            <div>
              <h3 className="mb-2 text-xl">{data.event.matrimony.location.name}</h3>
              <p>{data.event.matrimony.location.street}</p>
              <p>{data.event.matrimony.location.district}</p>
              <p className='mb-4'>{data.event.matrimony.location.province}</p>
            </div>
            <button onClick={() => window.open(data.event.matrimony.map, '_blank')} className="w-full px-6 py-3 border-2 border-button rounded-full text-button transition-colors">
              Open Map
            </button>
          </motion.div>
        </div>

        <div className='p-5 bg-white/40'>
          <motion.div
            {...fadeInUp}
            className="bg-white/80 backdrop-blur-sm p-8 text-center shadow-lg space-y-4"
          >
            <div className="mb-6">
              <h2 className="font-heading text-4xl text-title mb-6">Wedding Reception</h2>
              <p className="font-sub-heading text-xl">{data.event.reception.date}</p>
              <p className="font-sub-heading text-xl mt-2">{data.event.reception.time}</p>
            </div>
            <div>
              <h3 className="mb-2 text-xl">{data.event.reception.location.name}</h3>
              <p>{data.event.reception.location.street}</p>
              <p>{data.event.reception.location.district}</p>
              <p className='mb-4'>{data.event.reception.location.province}</p>
            </div>
            <button onClick={() => window.open(data.event.reception.map, '_blank')} className="w-full px-6 py-3 border-2 border-button rounded-full text-button transition-colors">
              Open Map
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}