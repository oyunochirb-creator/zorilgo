import { useEffect, useRef } from 'react';

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260826_041744_63efcd78-bf7d-4039-99e2-2461e8a61903.mp4';
const SENSITIVITY = 0.8;

/**
 * BackgroundVideo - Хулганы хэвтээ хөдөлгөөнөөр (mouse scrubbing) бичлэгийн хугацааг
 * урагш хойш удирддаг бүтэн дэлгэцийн суурь видео компонент.
 */
export function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const targetTimeRef = useRef<number>(0);
  const isSeekingRef = useRef<boolean>(false);
  const prevXRef = useRef<number | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const video = videoRef.current;
      if (!video || !video.duration || Number.isNaN(video.duration)) {
        prevXRef.current = e.clientX;
        return;
      }

      if (prevXRef.current === null) {
        prevXRef.current = e.clientX;
        return;
      }

      const currentX = e.clientX;
      const delta = currentX - prevXRef.current;
      prevXRef.current = currentX;

      const timeOffset = (delta / window.innerWidth) * SENSITIVITY * video.duration;
      let nextTarget = targetTimeRef.current + timeOffset;

      // Clamp between 0 and video.duration
      if (nextTarget < 0) nextTarget = 0;
      if (nextTarget > video.duration) nextTarget = video.duration;

      targetTimeRef.current = nextTarget;

      // Хэрэв одоо видео seek хийгдээгүй бол шинэ хугацааг тохируулна
      if (!isSeekingRef.current) {
        isSeekingRef.current = true;
        video.currentTime = targetTimeRef.current;
      }
    };

    const handleMouseLeave = () => {
      prevXRef.current = null;
    };

    // Touch төхөөрөмжүүдэд зориулсан дэмжлэг
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        prevXRef.current = e.touches[0].clientX;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      const video = videoRef.current;
      if (!video || !video.duration || Number.isNaN(video.duration) || e.touches.length === 0) {
        return;
      }

      const currentX = e.touches[0].clientX;
      if (prevXRef.current === null) {
        prevXRef.current = currentX;
        return;
      }

      const delta = currentX - prevXRef.current;
      prevXRef.current = currentX;

      const timeOffset = (delta / window.innerWidth) * SENSITIVITY * video.duration;
      let nextTarget = targetTimeRef.current + timeOffset;

      if (nextTarget < 0) nextTarget = 0;
      if (nextTarget > video.duration) nextTarget = video.duration;

      targetTimeRef.current = nextTarget;

      if (!isSeekingRef.current) {
        isSeekingRef.current = true;
        video.currentTime = targetTimeRef.current;
      }
    };

    const handleTouchEnd = () => {
      prevXRef.current = null;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  /**
   * onSeeked - Бичлэг тухайн хугацаанд очсоны дараа дуудагдана.
   * Хэрэв бичлэг seek хийх явцад targetTime дахин өөрчлөгдсөн бол
   * дараагийн seek-ийг дараалалд оруулж (queue) үргэлжлүүлнэ.
   * Энэ нь seek-flooding (хэт олон хүсэлт очиж гацах)-аас сэргийлнэ.
   */
  const handleSeeked = () => {
    const video = videoRef.current;
    if (!video) {
      isSeekingRef.current = false;
      return;
    }

    if (Math.abs(video.currentTime - targetTimeRef.current) > 0.04) {
      video.currentTime = targetTimeRef.current;
    } else {
      isSeekingRef.current = false;
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      targetTimeRef.current = videoRef.current.currentTime || 0;
    }
  };

  return (
    <video
      ref={videoRef}
      src={VIDEO_URL}
      muted
      playsInline
      preload="auto"
      onSeeked={handleSeeked}
      onLoadedMetadata={handleLoadedMetadata}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: '70% center',
        pointerEvents: 'none',
      }}
    />
  );
}
