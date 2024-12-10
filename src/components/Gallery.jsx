import { motion } from 'framer-motion';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import data from '../data';
import 'react-photo-view/dist/react-photo-view.css';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

export default function Gallery() {
  return (
    <section id="gallery" className="py-20 px-10 md:px-4 bg-primary">
      <div className="max-w-6xl mx-auto space-y-4">
        <motion.h2
          {...fadeInUp}
          className="text-4xl text-center text-title mb-16"
        >
          Gallery
        </motion.h2>

        <PhotoProvider>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {data.gallery.photoOne.map((photo, index) => (
              <motion.div
                key={index}
                {...fadeInUp}
                transition={{ delay: index * 0.1 }}
                className="aspect-square overflow-hidden rounded-lg cursor-pointer"
              >
                <PhotoView src={photo}>
                  <img
                    src={photo}
                    alt={`Gallery image ${index + 1}`}
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </PhotoView>
              </motion.div>
            ))}
          </div>
        </PhotoProvider>

        <PhotoProvider>
          <div className="grid grid-cols-3 gap-4">
            {data.gallery.photoTwo.map((photo, index) => (
              <motion.div
                key={index}
                {...fadeInUp}
                transition={{ delay: index * 0.1 }}
                className="aspect-square overflow-hidden rounded-lg cursor-pointer"
              >
                <PhotoView src={photo}>
                  <img
                    src={photo}
                    alt={`Gallery image ${index + 1}`}
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </PhotoView>
              </motion.div>
            ))}
          </div>
        </PhotoProvider>

        {/* YouTube Video Container */}
        <motion.div
          className="relative aspect-video col-span-1 md:col-span-2 lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative w-full h-0 pb-[56.25%] rounded-lg overflow-hidden">
            <iframe
              className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
              src={`https://www.youtube.com/embed/${data.gallery.video.id}?rel=0&modestbranding=1`}
              title={data.gallery.video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}