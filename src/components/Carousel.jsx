import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CarouselAmenidades = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  const getSlideIndex = (offset) => {
    return (currentSlide + offset + slides.length) % slides.length;
  };

  return (
    <div className="relative w-full h-auto mx-auto py-6 lg:py-12">
      {/* Contenedor principal del carrusel */}
      <div className="relative h-[400px] lg:h-[720px] flex items-center justify-center gap-2 md:gap-4">

        {/* Slide Izquierdo (preview) - Oculto en móvil */}
        <div
          className="hidden lg:block w-1/6 h-full md:rounded-tr-3xl md:rounded-br-3xl overflow-hidden opacity-60 transition-all duration-500 cursor-pointer hover:opacity-80"
          onClick={prevSlide}
        >
          <img
            src={slides[getSlideIndex(-1)].image}
            alt={slides[getSlideIndex(-1)].title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Slide Central (activo) */}
        <div className="relative w-full lg:w-4/6 h-full md:rounded-tr-3xl md:rounded-br-3xl overflow-hidden shadow-2xl transition-all duration-500">
          <img
            src={slides[currentSlide].image}
            alt={slides[currentSlide].title}
            className="w-full h-full object-cover"
          />

          <div className="absolute bottom-0 left-0 w-full h-32 pointer-events-none z-10"
            style={{
              background: "linear-gradient(to top, #025157 0%, rgba(0,0,0,0.3) 80%, transparent 100%)"
            }}
          />

          {/* Content - Visible solo en desktop */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 z-10">
            <h2 className="hidden lg:block text-3xl font-acummin-light uppercase text-center tracking-[1em] text-nowrap text-white">
              {slides[currentSlide].title}
            </h2>
            <img
              src={slides[currentSlide].icon}
              alt="icon"
              className="w-10 h-10"
            />
          </div>

          {/* Navigation Arrows */}
          {/* <button
            onClick={prevSlide}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 md:p-3 rounded-full shadow-lg transition-all z-20"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-4 h-4 md:w-6 md:h-6 text-gray-800" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 md:p-3 rounded-full shadow-lg transition-all z-20"
            aria-label="Siguiente"
          >
            <ChevronRight className="w-4 h-4 md:w-6 md:h-6 text-gray-800" />
          </button> */}
        </div>

        {/* Slide Derecho (preview) - Oculto en móvil */}
        <div
          className="hidden md:block w-1/6 h-full md:rounded-tr-3xl md:rounded-br-3xl overflow-hidden opacity-60 transition-all duration-500 cursor-pointer hover:opacity-80"
          onClick={nextSlide}
        >
          <img
            src={slides[getSlideIndex(1)].image}
            alt={slides[getSlideIndex(1)].title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Información del slide actual - Visible en mobile/tablet */}
      {/* <div className="lg:hidden mt-6 text-center px-4 flex items-center justify-center gap-3">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          {slides[currentSlide].title}
        </h2>
        <img
          src={slides[currentSlide].icon}
          alt="icon"
          className="w-7 h-7"
        />
      </div> */}

      {/* Dots Navigation */}
      <div className="flex justify-center gap-2 md:gap-3 mt-6 md:mt-8">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all ${
              index === currentSlide
                ? "w-8 md:w-10 h-2 md:h-3 bg-teal-500"
                : "w-2 md:w-3 h-2 md:h-3 bg-gray-400 hover:bg-gray-600"
            } rounded-full`}
            aria-label={`Ir a slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default CarouselAmenidades;
