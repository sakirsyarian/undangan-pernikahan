import { motion } from 'framer-motion';
import { CountdownTimer } from './CountdownTimer';
import data from '../data';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

export default function Couple() {
  return (
    <section id="couple" className="py-20 px-10 md:px-4">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div {...fadeInUp} className="mb-12">
          <h2 className="text-sm uppercase tracking-widest mb-4">
            THE WEDDING OF
          </h2>
          <div className="text-4xl mb-6">
            <span className="text-title">{data.welcome.groom}</span>
            <span className="font-heading text-accent italic font-thin mx-1">and</span>
            <span className="text-title">{data.welcome.bride}</span>
          </div>
          <p className="text-lg">
            {data.couple.date}
          </p>
        </motion.div>

        <motion.div {...fadeInUp} className="mb-16">
          <CountdownTimer date={data.couple.countdown} />
        </motion.div>

        <motion.div
          {...fadeInUp}
          className="relative max-w-lg mx-auto p-8 rounded-3xl border border-button"
        >
          <div className="absolute -right-8 -top-3">
            <img
              src="/img/assets/leaf-bottom.png"
              alt="Floral decoration"
              className="w-24 opacity-50"
            />
          </div>

          <div className="mb-12">
            <h3 className="text-4xl text-title mb-2">GROOM</h3>
            <p>{data.couple.men.name}</p>
            <div className="text-sm mt-4 space-y-1">
              <p>Son of</p>
              <p> Mr. {data.couple.men.father}</p>
              <p> and Mrs. {data.couple.men.mother}</p>
            </div>
          </div>

          <div className="text-accent font-heading text-4xl my-8">and</div>

          <div>
            <h3 className="text-4xl text-title mb-2">BRIDE</h3>
            <p>{data.couple.female.name}</p>
            <div className="text-sm mt-4 space-y-1">
              <p>Daughter of</p>
              <p> Mr. {data.couple.female.father}</p>
              <p> and Mrs. {data.couple.female.mother}</p>
            </div>
          </div>

          <div className="absolute -left-8 -bottom-3">
            <img
              src="/img/assets/leaf-up.png"
              alt="Floral decoration"
              className="w-24 opacity-50"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}