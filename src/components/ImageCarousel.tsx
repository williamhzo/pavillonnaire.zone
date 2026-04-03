'use client';

import { FC, useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/utils';
import useMediaQuery from '@/hooks/useMediaQuery';
import { useSwipe } from '@/hooks/useSwipe';

const MOBILE_QUERY = '(max-width: 767px)';
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

function useCarousel(images: string[], initialIndex = 0) {
  const [current, setCurrent] = useState(initialIndex);

  usePreloadImages(images);

  const prev = useCallback(() => {
    setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
  }, [images.length]);

  const next = useCallback(() => {
    setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));
  }, [images.length]);

  return { current, prev, next };
}

const CurrentImage: FC<{
  src: string;
  alt?: string;
  variant: 'thumbnail' | 'fullscreen';
  onClick?: () => void;
}> = ({ src, alt, variant, onClick }) => {
  const loaded = useImageLoader(src);
  const isFullscreen = variant === 'fullscreen';

  return (
    <div className="relative flex h-full w-full items-center justify-center">
      {!loaded && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/icon-maison-transp.gif"
            alt=""
            className={isFullscreen ? 'h-32 w-32' : 'h-24 w-24'}
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
            ? 'max-h-full max-w-full object-contain'
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
  const { current, prev, next } = useCarousel(images, startIndex);
  const isMobile = useMediaQuery(MOBILE_QUERY);
  const swipeRef = useSwipe<HTMLDivElement>({
    onSwipeLeft: next,
    onSwipeRight: prev,
    enabled: isMobile && images.length > 1,
  });
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
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
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
        <CurrentImage
          src={images[current]}
          alt={alt ? `${alt} ${current + 1}/${images.length}` : undefined}
          variant="fullscreen"
        />

        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute inset-y-[5%] left-0 z-10 hidden w-1/2 cursor-w-resize md:block"
              aria-label="Image précédente"
            />
            <button
              onClick={next}
              className="absolute inset-y-[5%] right-0 z-10 hidden w-1/2 cursor-e-resize md:block"
              aria-label="Image suivante"
            />
            <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-white/60">
              {current + 1}/{images.length}
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export const ImageCarousel: FC<{
  images: string[];
  alt?: string;
  onClose?: () => void;
}> = ({ images, alt, onClose }) => {
  const { current, prev, next } = useCarousel(images);
  const isMobile = useMediaQuery(MOBILE_QUERY);
  const swipeRef = useSwipe<HTMLDivElement>({
    onSwipeLeft: next,
    onSwipeRight: prev,
    enabled: isMobile && images.length > 1,
  });
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const closeLightbox = useCallback(() => setLightboxOpen(false), []);
  const hasMultiple = images.length > 1;

  return (
    <>
      <div ref={swipeRef} className="flex h-[55%] w-full flex-col md:h-[42%]">
        <div className="min-h-0 flex-1 overflow-hidden">
          <CurrentImage
            src={images[current]}
            alt={alt ? `${alt} ${current + 1}/${images.length}` : undefined}
            variant="thumbnail"
            onClick={() => setLightboxOpen(true)}
          />
        </div>

        <div className="flex items-center justify-between px-2 py-1.5">
          <span className="min-w-[3rem] text-xs text-black">
            {hasMultiple ? `${current + 1}/${images.length}` : '\u00A0'}
          </span>

          <div className="hidden items-center gap-3 md:flex">
            {hasMultiple && (
              <>
                <button
                  onClick={prev}
                  className="cursor-pointer px-1 py-0.5 text-sm hover:opacity-60"
                  aria-label="Image précédente"
                >
                  &#8249;
                </button>
                <button
                  onClick={next}
                  className="cursor-pointer px-1 py-0.5 text-sm hover:opacity-60"
                  aria-label="Image suivante"
                >
                  &#8250;
                </button>
              </>
            )}
          </div>

          {onClose ? (
            <button
              onClick={onClose}
              className="min-w-[3rem] cursor-pointer text-right text-xl leading-none"
              aria-label="Fermer"
            >
              &times;
            </button>
          ) : (
            <span className="min-w-[3rem]" />
          )}
        </div>
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
