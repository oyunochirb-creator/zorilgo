import { useState, useEffect } from 'react';
import { useTypewriter } from '../hooks/useTypewriter';

const TYPEWRITER_TEXT =
  'Glad you stopped in. Good taste tends to find us. Now, what are we building?';

const PILL_BUTTONS = [
  'Pitch us an idea',
  'Come work here',
  'Send a brief hello',
  'See how we operate',
];

const CONTACT_EMAIL = 'hello@mainframe.co';

/**
 * Hero - Хуудасны гол агуулга (A.R.I.A танилцуулга, бичигдэх текст, үйлдэл хийх товчнууд)
 */
export function Hero() {
  const { displayed, done } = useTypewriter(TYPEWRITER_TEXT, {
    speed: 38,
    startDelay: 600,
  });

  // Товчнууд хуудас ачаалснаас хойш 400ms дараа гарч ирнэ (typewriter-ийг хүлээхгүй)
  const [pillsVisible, setPillsVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPillsVisible(true);
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Хэрэв clipboard эрхгүй бол fallback
      const textArea = document.createElement('textarea');
      textArea.value = CONTACT_EMAIL;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <main className="relative z-[1] w-full h-screen flex flex-col justify-end pb-12 md:justify-center md:pb-0 px-5 sm:px-8 md:px-10 overflow-hidden">
      <div className="max-w-xl relative z-10">
        {/* 1. Бүүдгэр тайлбар (Blurred intro label) */}
        <div
          className="pointer-events-none select-none mb-5 sm:mb-6"
          style={{
            fontSize: 'clamp(18px, 4vw, 26px)',
            lineHeight: 1.3,
            fontWeight: 400,
            color: '#fff',
            filter: 'blur(4px)',
          }}
          aria-hidden="true"
        >
          Hey there, meet A.R.I.A,
          <br />
          Mainframe&apos;s Adaptive Response Interface Agent
        </div>

        {/* 2. Машинкаар бичигдэх текст (Typewriter text) */}
        <p
          className="text-white mb-5 sm:mb-6"
          style={{
            fontSize: 'clamp(18px, 4vw, 26px)',
            lineHeight: 1.35,
            fontWeight: 400,
            minHeight: '54px',
          }}
        >
          {displayed}
          {!done && (
            <span
              className="inline-block w-[2px] h-[1.1em] bg-white align-middle ml-[2px] animate-blink"
              aria-hidden="true"
            />
          )}
        </p>

        {/* 3. Үйлдэл хийх товчнууд (Action pill buttons) */}
        <div
          className="flex flex-wrap gap-y-1 transition-all duration-400 ease-out"
          style={{
            opacity: pillsVisible ? 1 : 0,
            transform: pillsVisible ? 'translateY(0)' : 'translateY(8px)',
          }}
        >
          {PILL_BUTTONS.map((label) => (
            <button
              key={label}
              type="button"
              className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer focus:outline-none"
            >
              {label}
            </button>
          ))}

          {/* 1 хүрээтэй товч (Outline pill with copy icon) */}
          <button
            type="button"
            onClick={handleCopyEmail}
            title={copied ? 'Имэйл хаяг хуулагдлаа!' : 'Имэйл хаяг хуулах'}
            className="inline-flex items-center justify-center text-white bg-transparent border border-white rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap gap-2 sm:gap-3 hover:bg-white hover:text-black transition-colors duration-200 cursor-pointer focus:outline-none group"
          >
            <span>
              Reach us:{' '}
              <span className="underline underline-offset-1">
                {copied ? 'Copied to clipboard!' : CONTACT_EMAIL}
              </span>
            </span>

            {/* 12x12 inline SVG icon: 2 overlapping rectangles */}
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="shrink-0 transition-transform duration-150 group-active:scale-90"
              aria-hidden="true"
            >
              {/* Back rectangle */}
              <rect
                x="3.5"
                y="1.5"
                width="6.5"
                height="6.5"
                rx="1"
                stroke="currentColor"
                strokeWidth="1.1"
              />
              {/* Front rectangle */}
              <rect
                x="1.5"
                y="3.5"
                width="6.5"
                height="6.5"
                rx="1"
                fill="currentColor"
                fillOpacity="0.2"
                stroke="currentColor"
                strokeWidth="1.1"
              />
            </svg>
          </button>
        </div>
      </div>
    </main>
  );
}
