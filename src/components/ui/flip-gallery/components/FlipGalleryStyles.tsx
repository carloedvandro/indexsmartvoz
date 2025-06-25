
import React from 'react';

export const FlipGalleryStyles: React.FC = () => {
  return (
    <style>{`
      #flip-gallery::after {
        content: '';
        position: absolute;
        background-color: black;
        width: 100%;
        height: 4px;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
      }

      #flip-gallery::before {
        content: attr(data-title);
        color: rgba(255 255 255 / 0.75);
        font-size: 0.75rem;
        left: -0.5rem;
        position: absolute;
        top: calc(100% + 1rem);
        line-height: 2;
        opacity: var(--title-opacity, 0);
        transform: translateY(var(--title-y, 0));
        transition: opacity 500ms ease-in-out, transform 500ms ease-in-out;
      }

      #flip-gallery > * {
        position: absolute;
        width: 100%;
        height: 50%;
        overflow: hidden;
        background-size: 240px 400px;
      }

      @media (min-width: 600px) {
        #flip-gallery > * {
          background-size: 300px 500px;
        }
      }

      .top,
      .overlay-top {
        top: 0;
        transform-origin: bottom;
        background-position: top;
      }

      .bottom,
      .overlay-bottom {
        bottom: 0;
        transform-origin: top;
        background-position: bottom;
      }
    `}</style>
  );
};
