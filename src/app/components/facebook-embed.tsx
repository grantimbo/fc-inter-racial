"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    FB?: {
      XFBML: {
        parse: (node?: HTMLElement) => void;
      };
    };
  }
}

export default function FacebookEmbed() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const attemptParse = (retries: number) => {
      if (window.FB?.XFBML && containerRef.current) {
        window.FB.XFBML.parse(containerRef.current);
        return;
      }
      if (retries > 0) {
        setTimeout(() => attemptParse(retries - 1), 200);
      }
    };

    attemptParse(20);
  }, [pathname]);

  return (
    <div ref={containerRef}>
      <div
        className="fb-page"
        data-href="https://www.facebook.com/fcinterracial"
        data-tabs="timeline"
        data-width="300px"
        data-height="600px"
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
