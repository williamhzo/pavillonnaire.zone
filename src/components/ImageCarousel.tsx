'use client';

import { FC, useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/utils';

const loadedImages = new Set<string>();

function useImageLoader(src: string) {
  const [loaded, setLoaded] = useState(() => loadedImages.has(src));

  useEffect(() => {
    if (loadedImages.has(src)) {
      setLoaded(true);
      return;
    }

    let cancelled = false;
    setLoaded(false);
    const img = new Image();
    img.src = src;
    img.onload = () => {
      loadedImages.add(src);
      if (!cancelled) setLoaded(true);
    };
    return () => {
      cancelled = true;
      img.onload = null;
    };
  }, [src]);

  return loaded;
}

function usePreloadImages(images: string[]) {
  useEffect(() => {
    const toPreload = images.filter((src) => !loadedImages.has(src));

    const preloaded = toPreload.map((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => loadedImages.add(src);
      return img;
    });

    return () => {
      preloaded.forEach((img) => {
        img.onload = null;
      });
    };
  }, [images]);
}

function useScrollCarousel(images: string[]) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);

  usePreloadImages(images);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let timeout: ReturnType<typeof setTimeout>;
    const onScroll = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        const index = Math.round(el.scrollLeft / el.clientWidth);
        setCurrent(index);
      }, 50);
    };

    el.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      el.removeEventListener('scroll', onScroll);
      clearTimeout(timeout);
    };
  }, []);

  const currentRef = useRef(current);
  currentRef.current = current;

  const scrollTo = useCallback((index: number) => {
    scrollRef.current?.scrollTo({
      left: index * (scrollRef.current?.clientWidth ?? 0),
      behavior: 'smooth',
    });
  }, []);

  const prev = useCallback(() => {
    const i = currentRef.current === 0 ? images.length - 1 : currentRef.current - 1;
    scrollTo(i);
  }, [images.length, scrollTo]);

  const next = useCallback(() => {
    const i = currentRef.current === images.length - 1 ? 0 : currentRef.current + 1;
    scrollTo(i);
  }, [images.length, scrollTo]);

  return { scrollRef, current, prev, next, scrollTo };
}

const CarouselNav: FC<{
  onPrev: () => void;
  onNext: () => void;
  fullscreen?: boolean;
}> = ({ onPrev, onNext, fullscreen }) => (
  <>
    <button
      onClick={onPrev}
      className={cn(
        'absolute left-2 top-1/2 z-10 -translate-y-1/2 cursor-pointer',
        fullscreen
          ? 'px-3 py-2 text-2xl text-white/60 hover:text-white'
          : 'bg-white/80 px-2 py-1 text-sm hover:bg-white',
      )}
      aria-label="Image précédente"
    >
      &#8249;
    </button>
    <button
      onClick={onNext}
      className={cn(
        'absolute right-2 top-1/2 z-10 -translate-y-1/2 cursor-pointer',
        fullscreen
          ? 'px-3 py-2 text-2xl text-white/60 hover:text-white'
          : 'bg-white/80 px-2 py-1 text-sm hover:bg-white',
      )}
      aria-label="Image suivante"
    >
      &#8250;
    </button>
  </>
);

const SlideImage: FC<{
  src: string;
  alt?: string;
  variant: 'thumbnail' | 'fullscreen';
  onClick?: () => void;
}> = ({ src, alt, variant, onClick }) => {
  const loaded = useImageLoader(src);
  const isFullscreen = variant === 'fullscreen';

  return (
    <div
      className={cn(
        'relative flex w-full flex-shrink-0 snap-start items-center justify-center h-full',
      )}
    >
      {!loaded && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div
            className={cn(
              'animate-spin rounded-full',
              isFullscreen
                ? 'h-6 w-6 border-2 border-white/20 border-t-white'
                : 'h-5 w-5 border border-black/10 border-t-black',
            )}
          />
        </div>
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        onClick={onClick}
        className={cn(
          'transition-opacity duration-300',
          loaded ? 'opacity-100' : 'opacity-0',
          isFullscreen
            ? 'pointer-events-none max-h-full max-w-full object-contain'
            : 'h-full cursor-pointer object-cover',
        )}
      />
    </div>
  );
};

const Lightbox: FC<{
  images: string[];
  alt?: string;
  startIndex: number;
  onClose: () => void;
}> = ({ images, alt, startIndex, onClose }) => {
  const { scrollRef, current, prev, next } = useScrollCarousel(images);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  const handleClose = useCallback(() => onCloseRef.current(), []);

  useEffect(() => {
    if (startIndex > 0) {
      scrollRef.current?.scrollTo({
        left: startIndex * (scrollRef.current?.clientWidth ?? 0),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startIndex]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        e.preventDefault();
        onCloseRef.current();
      }
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    document.addEventListener('keydown', handleKey, true);
    return () => document.removeEventListener('keydown', handleKey, true);
  }, [prev, next]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={handleClose}
    >
      <button
        onClick={handleClose}
        className="absolute right-4 top-4 z-10 cursor-pointer text-3xl text-white hover:text-white/70"
        aria-label="Fermer"
      >
        &times;
      </button>

      <div
        className="relative flex h-full w-full flex-col items-center justify-center px-8 pb-16 pt-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          ref={scrollRef}
          className="flex h-full w-full snap-x snap-mandatory overflow-x-auto scrollbar-hide"
        >
          {images.map((src, i) => (
            <SlideImage
              key={src}
              src={src}
              alt={alt ? `${alt} ${i + 1}/${images.length}` : undefined}
              variant="fullscreen"
            />
          ))}
        </div>

        {images.length > 1 && (
          <>
            <CarouselNav onPrev={prev} onNext={next} fullscreen />
            <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-white/60">
              {current + 1}/{images.length}
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export const ImageCarousel: FC<{ images: string[]; alt?: string }> = ({
  images,
  alt,
}) => {
  const { scrollRef, current, prev, next } = useScrollCarousel(images);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const closeLightbox = useCallback(() => setLightboxOpen(false), []);

  return (
    <>
      <div className="flex h-[36%] w-full flex-col">
        <div className="relative h-full w-full">
          <div
            ref={scrollRef}
            className="flex h-full w-full snap-x snap-mandatory overflow-x-auto scrollbar-hide"
          >
            {images.map((src, i) => (
              <SlideImage
                key={src}
                src={src}
                alt={alt ? `${alt} ${i + 1}/${images.length}` : undefined}
                variant="thumbnail"
                onClick={() => setLightboxOpen(true)}
              />
            ))}
          </div>

          {images.length > 1 && (
            <CarouselNav onPrev={prev} onNext={next} />
          )}
        </div>

        {images.length > 1 && (
          <span className="mt-1 block text-center text-xs text-black/50">
            {current + 1}/{images.length}
          </span>
        )}
      </div>

      {lightboxOpen &&
        createPortal(
          <Lightbox
            images={images}
            alt={alt}
            startIndex={current}
            onClose={closeLightbox}
          />,
          document.body,
        )}
    </>
  );
};
