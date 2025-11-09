import { useMemo, useState, type MouseEvent, type PointerEvent as ReactPointerEvent } from "react";
import { AnimatePresence, motion, useAnimation } from "framer-motion";

interface ExpandableGalleryProps {
  images: string[];
  className?: string;
}

const ExpandableGallery = ({ images, className = "" }: ExpandableGalleryProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [startIndex, setStartIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);

  const rowControls = useAnimation();

  const visibleCount = Math.min(5, images.length);

  const visibleImages = useMemo(() => {
    if (images.length === 0) return [] as Array<{ src: string; actualIndex: number }>;

    return Array.from({ length: visibleCount }, (_, offset) => {
      const actualIndex = (startIndex + offset) % images.length;
      return { src: images[actualIndex], actualIndex };
    });
  }, [images, startIndex, visibleCount]);

  const openImage = (index: number) => {
    setSelectedIndex(index);
  };

  const closeImage = () => {
    setSelectedIndex(null);
  };

  const goToNext = (event?: MouseEvent<HTMLButtonElement>) => {
    event?.stopPropagation();
    setSelectedIndex((prev) => {
      if (prev === null) return prev;
      return (prev + 1) % images.length;
    });
  };

  const goToPrev = (event?: MouseEvent<HTMLButtonElement>) => {
    event?.stopPropagation();
    setSelectedIndex((prev) => {
      if (prev === null) return prev;
      return (prev - 1 + images.length) % images.length;
    });
  };

  const slideWindow = async (direction: number) => {
    if (images.length <= visibleCount || isTransitioning) return;

    setIsTransitioning(true);

    await rowControls.start({
      x: direction === 1 ? "-6%" : "6%",
      scale: 0.985,
      transition: { duration: 0.26, ease: [0.2, 0.8, 0.2, 1] },
    });

    setStartIndex((prev) => (prev + direction + images.length) % images.length);
    setHoveredIndex(null);

    await rowControls.start({
      x: 0,
      scale: 1,
      transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] },
    });

    setIsTransitioning(false);
  };

  const getFlexValue = (actualIndex: number) => {
    if (hoveredIndex === null) return 1;
    return hoveredIndex === actualIndex ? 2.1 : 0.45;
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (images.length <= visibleCount || isTransitioning) return;
    setIsDragging(true);
    setStartX(event.clientX);
    setDragOffset(0);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const offset = event.clientX - startX;
    setDragOffset(offset);
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);

    if (Math.abs(dragOffset) > 80) {
      slideWindow(dragOffset < 0 ? 1 : -1);
    } else {
      rowControls.start({ x: 0, transition: { duration: 0.3, ease: [0.33, 1, 0.68, 1] } });
    }

    setDragOffset(0);
  };

  if (images.length === 0) {
    return null;
  }

  return (
    <div className={className}>
      <motion.div
        className="relative flex h-96 w-full select-none gap-3 overflow-hidden rounded-[32px] border border-[#e0d2c1]/70 bg-[#f8f1e7]/40 p-4 max-md:h-72 max-sm:h-60"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onPointerCancel={handlePointerUp}
        role="list"
        aria-label="Galeria interativa de imagens"
        animate={rowControls}
        initial={{ x: 0, scale: 1 }}
        transition={{ duration: 0.32, ease: [0.33, 1, 0.68, 1] }}
      >
        <AnimatePresence initial={false} mode="popLayout">
          {visibleImages.map(({ src, actualIndex }) => (
            <motion.div
              key={`${src}-${actualIndex}`}
              layout
              className="relative cursor-pointer overflow-hidden rounded-3xl"
              style={{ flex: 1 }}
              initial={{ opacity: 0.4, scale: 0.96 }}
              animate={{
                flex: getFlexValue(actualIndex),
                x: isDragging ? dragOffset / visibleCount : 0,
                opacity: 1,
                scale: hoveredIndex === actualIndex ? 1.03 : 1,
              }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              whileTap={{ scale: 0.98 }}
              onMouseEnter={() => setHoveredIndex(actualIndex)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => openImage(actualIndex)}
              role="listitem"
              aria-label={`Abrir imagem ${actualIndex + 1} de ${images.length}`}
            >
              <motion.img
                key={`${src}-${actualIndex}-img`}
                src={src}
                alt={`Imagem ${actualIndex + 1} da galeria`}
                className="h-full w-full object-cover"
                loading="lazy"
                initial={{ scale: 1.02, opacity: 0.85 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              />
              <motion.div
                className="absolute inset-0 bg-black"
                initial={{ opacity: 0.2 }}
                animate={{ opacity: hoveredIndex === actualIndex ? 0 : 0.35 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </motion.div>
          ))}
        </AnimatePresence>

        {images.length > visibleCount && (
          <>
            <motion.button
              type="button"
              aria-label="Imagem anterior"
              className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-[#2f1b12]/70 p-3 text-[#f6efe6] transition-all duration-200 hover:bg-[#2f1b12]/90"
              onClick={() => slideWindow(-1)}
              disabled={isTransitioning}
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
              </svg>
            </motion.button>
            <motion.button
              type="button"
              aria-label="Próxima imagem"
              className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-[#2f1b12]/70 p-3 text-[#f6efe6] transition-all duração-200 hover:bg-[#2f1b12]/90"
              onClick={() => slideWindow(1)}
              disabled={isTransitioning}
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 6l6 6-6 6" />
              </svg>
            </motion.button>
          </>
        )}
      </motion.div>

      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            className="fixed inset-0 z-[120] flex items-center justify-center bg-black/80 p-6 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-label="Imagem ampliada"
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onClick={closeImage}
          >
            <motion.button
              className="absolute right-6 top-6 z-10 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
              onClick={closeImage}
              aria-label="Fechar galeria"
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
            >
              <svg
                className="h-8 w-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </motion.button>

            {images.length > 1 && (
              <motion.button
                className="absolute left-6 z-10 rounded-full bg-black/50 p-3 text-white transition-colors hover:bg-black/70"
                onClick={(event) => goToPrev(event)}
                aria-label="Imagem anterior"
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.08 }}
              >
                <svg
                  className="h-8 w-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </motion.button>
            )}

            <motion.div
              className="relative max-h-[90vh] w-full max-w-5xl"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.12}
              dragTransition={{ bounceStiffness: 160, bounceDamping: 24 }}
              onClick={(event) => event.stopPropagation()}
            >
              <motion.img
                key={selectedIndex}
                src={images[selectedIndex]}
                alt={`Imagem ${selectedIndex + 1} expandida`}
                className="h-full w-full rounded-3xl object-contain"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              />
            </motion.div>

            {images.length > 1 && (
              <motion.button
                className="absolute right-6 z-10 rounded-full bg-black/50 p-3 text-white transition-colors hover:bg-black/70"
                onClick={(event) => goToNext(event)}
                aria-label="Próxima imagem"
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.08 }}
              >
                <svg
                  className="h-8 w-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </motion.button>
            )}

            <motion.div
              className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-5 py-2 text-sm font-medium text-white"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.25, ease: [0.33, 1, 0.68, 1] }}
            >
              {selectedIndex + 1} / {images.length}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ExpandableGallery;

export function GalleryDemo() {
  const images = [
    "https://images.unsplash.com/photo-1709884735646-897b57461d61?q=80&w=3628&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=3870&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=3870&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1502085671122-2d218cd434e6?q=80&w=3626&auto=format&fit=crop",
  ];

  return (
    <div className="flex min-h-screen items-center justify-center bg-white p-8 dark:bg-black">
      <ExpandableGallery images={images} className="w-3/4 max-w-7xl" />
    </div>
  );
}
