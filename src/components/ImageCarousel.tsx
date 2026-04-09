'use client';

import { FC, useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/utils';
import useMediaQuery from '@/hooks/useMediaQuery';
import { useSwipe } from '@/hooks/useSwipe';

const MOBILE_QUERY = '(max-width: 767px)';

const decodeCache = new Map<string, Promise<void>>();
const verifiedImages = new Set<string>();

function loadAndDecode(src: string): Promise<void> {
  const cached = decodeCache.get(src);
  if (cached) return cached;

  const promise = new Promise<void>((resolve, reject) => {
    const img = new Image();
    img.src = src;

    const done = () => {
      verifiedImages.add(src);
      resolve();
    };

    if (img.complete && img.naturalWidth > 0) {
      img.decode().then(done, done);
      return;
    }

    img.onload = () => {
      img.decode().then(done, done);
    };
    img.onerror = () => {
      decodeCache.delete(src);
      reject();
    };
  });

  decodeCache.set(src, promise);
  return promise;
}

function useImageLoader(src: string) {
  const [loadedSrc, setLoadedSrc] = useState('');

  useEffect(() => {
    let cancelled = false;

    loadAndDecode(src).then(
      () => {
        if (!cancelled) setLoadedSrc(src);
      },
      () => {},
    );

    return () => {
      cancelled = true;
    };
  }, [src]);

  return loadedSrc === src;
}

function usePreloadAdjacent(images: string[], current: number) {
  const currentLoaded = useImageLoader(images[current]);

  useEffect(() => {
    if (!currentLoaded || images.length <= 1) return;

    const indices = [
      (current + 1) % images.length,
      (current - 1 + images.length) % images.length,
    ];

    indices.forEach((i) => loadAndDecode(images[i]));
  }, [images, current, currentLoaded]);
}

function usePreloadAll(images: string[], isMobile: boolean): boolean {
  const [allLoaded, setAllLoaded] = useState(
    () => isMobile || images.every((src) => verifiedImages.has(src)),
  );

  useEffect(() => {
    if (isMobile || images.every((src) => verifiedImages.has(src))) {
      setAllLoaded(true);
      return;
    }
    setAllLoaded(false);
    Promise.all(images.map((src) => loadAndDecode(src).catch(() => {}))).then(
      () => setAllLoaded(true),
    );
  }, [images, isMobile]);

  return allLoaded;
}

function useCarousel(images: string[], initialIndex = 0) {
  const [current, setCurrent] = useState(initialIndex);

  usePreloadAdjacent(images, current);

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
  skipLoader?: boolean;
  onClick?: () => void;
}> = ({ src, alt, variant, skipLoader, onClick }) => {
  const [displaySrc, setDisplaySrc] = useState(() =>
    verifiedImages.has(src) ? src : '',
  );
  const [domLoadedSrc, setDomLoadedSrc] = useState('');
  const imgRef = useRef<HTMLImageElement>(null);
  const isMobile = useMediaQuery(MOBILE_QUERY);
  const isFullscreen = variant === 'fullscreen';
  const isMobileLightbox = isFullscreen && isMobile;

  useEffect(() => {
    if (skipLoader) return;
    if (verifiedImages.has(src)) {
      setDisplaySrc(src);
      return;
    }
    let cancelled = false;
    loadAndDecode(src).then(
      () => {
        if (!cancelled) setDisplaySrc(src);
      },
      () => {},
    );
    return () => {
      cancelled = true;
    };
  }, [src, skipLoader]);

  const handleImgLoad = useCallback(() => {
    setDomLoadedSrc((prev) => (prev === src ? prev : src));
  }, [src]);

  useEffect(() => {
    if (
      isMobile &&
      imgRef.current?.complete &&
      imgRef.current.naturalWidth > 0
    ) {
      setDomLoadedSrc(imgRef.current.getAttribute('src') || '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);

  const effectiveSrc = skipLoader ? src : displaySrc;
  const loading = isMobile
    ? domLoadedSrc !== src
    : skipLoader
    ? false
    : displaySrc !== src;
  const showMobileLightboxLoader = loading && isMobileLightbox;
  const showLoader = (loading && !isFullscreen) || showMobileLightboxLoader;
  const showImage = effectiveSrc && (!loading || isMobile);

  return (
    <div className="relative flex h-full w-full items-center justify-center">
      {showLoader && (
        <div
          className={cn(
            'pointer-events-none absolute inset-0 flex items-center justify-center',
            showMobileLightboxLoader && 'z-10',
          )}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/icon-maison-transp.gif"
            alt=""
            className={cn(
              'object-contain',
              isFullscreen ? 'h-20 w-20' : 'h-24 w-24',
            )}
          />
        </div>
      )}
      {showImage && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={isMobile ? imgRef : undefined}
          src={effectiveSrc}
          alt={alt}
          onClick={onClick}
          onLoad={isMobile ? handleImgLoad : undefined}
          className={cn(
            isFullscreen
              ? 'max-h-full max-w-full object-contain'
              : 'h-full cursor-pointer object-cover',
            showMobileLightboxLoader && 'blur-sm brightness-50',
            showLoader && !isFullscreen && 'invisible',
          )}
        />
      )}
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

  const allLoaded = usePreloadAll(images, isMobile);

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
        className="absolute right-4 top-4 z-20 cursor-pointer text-3xl text-white hover:text-white/70"
        aria-label="Fermer"
      >
        &times;
      </button>

      <div
        ref={swipeRef}
        className="relative flex h-full w-full items-center justify-center px-2 pb-8 pt-8 md:px-8"
        onClick={(e) => e.stopPropagation()}
      >
        {allLoaded ? (
          <CurrentImage
            src={images[current]}
            alt={alt ? `${alt} ${current + 1}/${images.length}` : undefined}
            variant="fullscreen"
            skipLoader={allLoaded && !isMobile}
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src="/icon-maison-transp.gif"
            alt=""
            className="h-20 w-20 object-contain"
          />
        )}

        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute bottom-16 left-0 top-14 z-10 w-1/2 [-webkit-tap-highlight-color:transparent] md:inset-y-[5%] md:cursor-w-resize"
              aria-label="Image précédente"
            />
            <button
              onClick={next}
              className="absolute bottom-16 right-0 top-14 z-10 w-1/2 [-webkit-tap-highlight-color:transparent] md:inset-y-[5%] md:cursor-e-resize"
              aria-label="Image suivante"
            />
            <span className="absolute left-4 top-4 z-20 text-sm text-white">
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

  const allLoaded = usePreloadAll(images, isMobile);

  return (
    <>
      <div ref={swipeRef} className="flex h-[55%] w-full flex-col md:h-[42%]">
        <div className="min-h-0 flex-1 overflow-hidden">
          <CurrentImage
            src={images[current]}
            alt={alt ? `${alt} ${current + 1}/${images.length}` : undefined}
            variant="thumbnail"
            skipLoader={allLoaded && !isMobile}
            onClick={() => setLightboxOpen(true)}
          />
        </div>

        <div className="flex items-center justify-between py-1.5">
          <span className="min-w-[3rem] text-xs text-black">
            {hasMultiple ? `${current + 1}/${images.length}` : '\u00A0'}
          </span>

          <div className="flex items-center gap-8">
            {hasMultiple && (
              <>
                <button
                  onClick={prev}
                  className="cursor-pointer px-1 py-0.5 text-xs hover:opacity-60"
                  aria-label="Image précédente"
                >
                  <span className="inline-block -scale-x-100">▸</span>
                </button>
                <button
                  onClick={next}
                  className="cursor-pointer px-1 py-0.5 text-xs hover:opacity-60"
                  aria-label="Image suivante"
                >
                  ▸
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
