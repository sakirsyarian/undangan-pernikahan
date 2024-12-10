import { motion } from 'framer-motion';
import data from '../data';

export default function Footer() {
  return (
    <>
      {/* Top Image */}
      <div className='bg-primary'>
        <img
          src="/img/footer-top.jpg"
          alt="Wedding Decoration"
          className="lg:max-w-4xl mx-auto object-cover object-center"
        />
      </div>

      <footer className="bg-primary py-16 px-10 md:px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <p className="max-w-lg mx-auto">
              We are deeply grateful for your presence and warm wishes on our special day.
              Your love and support mean the world   to us as we begin this beautiful journey together.
            </p>

            <p className="text-lg text-title">
              With Love,
            </p>

            <div className="text-3xl ">
              <span className="text-title">{data.welcome.groom}</span>
              <span className="text-accent italic font-thin font-heading mx-1">and</span>
              <span className="text-title">{data.welcome.bride}</span>
            </div>
          </motion.div>
        </div>
      </footer>

      {/* Bottom Image */}
      <div className='bg-primary'>
        <img
          src="/img/footer-bot.jpg"
          alt="Wedding Decoration"
          className="lg:max-w-4xl mx-auto object-cover object-center"
        />
      </div>

      <div className='bg-secondary py-10 text-center'>
        <p>Created by <span className='font-semibold'>Name</span></p>
      </div>
    </>
  );
}