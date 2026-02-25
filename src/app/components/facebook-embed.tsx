"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    FB?: {
      init: (params: { appId: string; xfbml: boolean; version: string }) => void;
      XFBML: {
        parse: (node?: HTMLElement) => void;
      };
    };
  }
}

export default function FacebookEmbed() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();
  const [width, setWidth] = useState(270); // Default to desktop width

  useEffect(() => {
    // Function to update width based on window size
    const updateWidth = () => {
      // Check if window width is less than md breakpoint (768px)
      // or check specifically for mobile screens
      if (window.innerWidth < 640) {
        setWidth(230);
      } else {
        setWidth(270);
      }
    };

    // Set initial width
    updateWidth();

    // Add resize listener
    window.addEventListener('resize', updateWidth);

    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  useEffect(() => {
    const initAndParse = (retries: number) => {
      if (window.FB) {
        // Ensure FB is initialized
        // We check for XFBML existence, but re-initializing is generally safe 
        // if the previous init was incomplete or invalid.
        // However, standard practice is just to call init if not yet ready.
        // But since we see "init not called with valid version", we force an init here.
        try {
            window.FB.init({
                appId: '250706382314503',
                xfbml: true,
                version: 'v22.0'
            });
        } catch (e) {
            // Ignore if already initialized
        }

        if (window.FB.XFBML && containerRef.current) {
          window.FB.XFBML.parse(containerRef.current);
          return;
        }
      }

      if (retries > 0) {
        setTimeout(() => initAndParse(retries - 1), 200);
      }
    };

    initAndParse(20);
  }, [pathname, width]); // Re-parse when width changes

  return (
    <div ref={containerRef} key={width}>
      <div
        className="fb-page"
        data-href="https://www.facebook.com/fcinterracial"
        data-tabs="timeline"
        data-width={width}
        data-height="800"
        data-small-header="false"
        data-adapt-container-width="true"
        data-hide-cover="true"
        data-show-facepile="true"
      >
        <blockquote cite="https://www.facebook.com/fcinterracial" className="fb-xfbml-parse-ignore">
          <a href="https://www.facebook.com/fcinterracial">FC Inter Racial</a>
        </blockquote>
      </div>
    </div>
  );
}
