import { useState } from 'react';

const BACKDROP_IMAGE_URL =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS57hOKziU4Af9xghl3rKqv_eu1BtNAkfN-ocYPCX6sug&s';

export function BackgroundBackdrop() {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <div
      className="fixed inset-0 -z-10 pointer-events-none overflow-hidden bg-sky-100"
      aria-hidden="true"
    >
      {!imageFailed && (
        <img
          src={BACKDROP_IMAGE_URL}
          alt=""
          referrerPolicy="no-referrer"
          onError={() => setImageFailed(true)}
          className="w-full h-full object-cover object-center opacity-100 brightness-105 contrast-105 saturate-110"
        />
      )}

      {/* Light, bright translucent veil so the background artwork stays crisp while foreground cards read cleanly */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-sky-50/20 to-white/40" />
    </div>
  );
}
