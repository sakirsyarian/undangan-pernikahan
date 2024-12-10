export default function Hero() {
  return (
    <section id="hero" className="relative">
      <img
        src="/img/hero.jpg"
        alt="Wedding Decoration"
        className="lg:max-w-4xl mx-auto object-cover object-center"
      />

      <div className="relative lg:max-w-4xl mx-auto">
        {/* Background Image */}
        <img
          src="/img/assets/paper-up.png"
          alt="Wedding Decoration"
          className="absolute md:static top-[-2rem] object-cover object-center"
        />

        <div className='bg-cover' style={{ backgroundImage: 'url("/img/assets/paper.png")' }}>
          <p className="md:p-8 px-8 pb-8 pt-16 text-center text-gray-700 leading-relaxed">
            With hearts full of love and gratitude to God, we joyfully
            invite you to join us as we celebrate the blessing of our
            union. Surrounded by the warmth of family and friends, we
            will exchange vows and begin this sacred journey together.
          </p>
        </div>

        <img
          src="/img/assets/paper-bottom.png"
          alt="Wedding Decoration"
          className="object-cover object-center"
        />
      </div>
    </section>
  );
}