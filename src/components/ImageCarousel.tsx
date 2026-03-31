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

function usePreloadAdjacentImages(images: string[], current: number) {
  useEffect(() => {
    if (images.length <= 1) return;

    const toPreload = [
      images[(current + 1) % images.length],
      images[(current - 1 + images.length) % images.length],
    ].filter((src) => !loadedImages.has(src));

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
  }, [images, current]);
}

function useSwipe(
  ref: React.RefObject<HTMLElement | null>,
  onSwipeLeft: () => void,
  onSwipeRight: () => void,
) {
  const swipedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let startX = 0;
    let startY = 0;

    const onTouchStart = (e: TouchEvent) => {
      if (!e.touches[0]) return;
      swipedRef.current = false;
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (!e.changedTouches[0]) return;
      const dx = e.changedTouches[0].clientX - startX;
      const dy = e.changedTouches[0].clientY - startY;
      if (Math.abs(dx) < 40 || Math.abs(dy) > Math.abs(dx)) return;
      swipedRef.current = true;
      if (dx < 0) onSwipeLeft();
      else onSwipeRight();
    };

    // Prevent click from firing after a swipe
    const onClickCapture = (e: MouseEvent) => {
      if (swipedRef.current) {
        e.stopPropagation();
        e.preventDefault();
        swipedRef.current = false;
      }
    };

    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchend', onTouchEnd, { passive: true });
    el.addEventListener('click', onClickCapture, true);
    return () => {
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchend', onTouchEnd);
      el.removeEventListener('click', onClickCapture, true);
    };
  }, [ref, onSwipeLeft, onSwipeRight]);
}

function useCarousel(images: string[], startIndex = 0) {
  const [current, setCurrent] = useState(startIndex);
  const loaded = useImageLoader(images[current]);

  usePreloadAdjacentImages(images, current);

  const prev = useCallback(
    () => setCurrent((i) => (i === 0 ? images.length - 1 : i - 1)),
    [images.length],
  );
  const next = useCallback(
    () => setCurrent((i) => (i === images.length - 1 ? 0 : i + 1)),
    [images.length],
  );

  return { current, loaded, prev, next };
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

const CarouselImage: FC<{
  src: string;
  alt?: string;
  loaded: boolean;
  variant: 'thumbnail' | 'fullscreen';
  onClick?: () => void;
}> = ({ src, alt, loaded, variant, onClick }) => {
  const isFullscreen = variant === 'fullscreen';
  return (
    <>
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
            : 'cursor-pointer object-cover',
        )}
      />
    </>
  );
};

const Lightbox: FC<{
  images: string[];
  alt?: string;
  startIndex: number;
  onClose: () => void;
}> = ({ images, alt, startIndex, onClose }) => {
  const { current, loaded, prev, next } = useCarousel(images, startIndex);
  const swipeRef = useRef<HTMLDivElement>(null);
  useSwipe(swipeRef, next, prev);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  const handleClose = useCallback(() => onCloseRef.current(), []);

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
        ref={swipeRef}
        className="relative flex h-full w-full items-center justify-center px-8 pb-16 pt-8"
        onClick={(e) => e.stopPropagation()}
      >
        <CarouselImage
          src={images[current]}
          alt={alt ? `${alt} ${current + 1}/${images.length}` : undefined}
          loaded={loaded}
          variant="fullscreen"
        />

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
  const { current, loaded, prev, next } = useCarousel(images);
  const swipeRef = useRef<HTMLDivElement>(null);
  useSwipe(swipeRef, next, prev);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const closeLightbox = useCallback(() => setLightboxOpen(false), []);

  return (
    <>
      <div className="flex h-[36%] w-full flex-col">
        <div
          ref={swipeRef}
          className="relative flex h-full w-full justify-center"
        >
          <CarouselImage
            src={images[current]}
            alt={alt ? `${alt} ${current + 1}/${images.length}` : undefined}
            loaded={loaded}
            variant="thumbnail"
            onClick={() => setLightboxOpen(true)}
          />

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
