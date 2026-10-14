import { Component } from '@angular/core';

/**
 * ELGHAD globe logo: wordmark across the equator, overflowing the sphere, with an orbit.
 * Inline SVG so it follows the theme tokens. Size it from the parent (`app-logo { height }`);
 * it reacts to hover and focus of the closest link or button.
 */
@Component({
  selector: 'app-logo',
  template: `
    <svg viewBox="0 0 156 56" aria-hidden="true" focusable="false">
      <ellipse class="orbit" cx="78" cy="28" rx="56" ry="12" transform="rotate(-14 78 28)" />
      <circle class="sphere" cx="78" cy="28" r="25" />
      <g class="grid">
        <ellipse cx="78" cy="28" rx="10" ry="25" />
        <ellipse cx="78" cy="28" rx="18.5" ry="25" />
        <path d="M78 3v50M56.1 16h43.8M56.1 40h43.8" />
      </g>
      <circle class="node" cx="23.7" cy="41.5" r="3" />
      <circle class="node" cx="132.3" cy="14.5" r="3" />
      <text class="word" x="78" y="34.5" text-anchor="middle">ELGHAD</text>
    </svg>
  `,
  styles: `
    :host {
      display: inline-block;
      height: 2.9rem;
      aspect-ratio: 156 / 56;
    }

    svg {
      display: block;
      width: 100%;
      height: 100%;
      overflow: visible;
      transition: filter 200ms ease;
    }

    .sphere {
      fill: var(--accent-soft);
      stroke: var(--accent);
      stroke-width: 1.6;
    }

    .grid {
      fill: none;
      stroke: color-mix(in srgb, var(--accent) 55%, transparent);
      stroke-width: 0.8;
    }

    .orbit {
      fill: none;
      stroke: color-mix(in srgb, var(--accent) 70%, transparent);
      stroke-width: 1;
    }

    .node {
      fill: var(--accent-text);
    }

    .word {
      fill: var(--text);
      stroke: var(--bg);
      stroke-width: 3.5;
      stroke-linejoin: round;
      paint-order: stroke;
      font-family: 'Inter Variable', Inter, sans-serif;
      font-size: 17px;
      font-weight: 850;
      letter-spacing: 1.4px;
      transition: fill 200ms ease;
    }

    :host-context(a:hover) svg,
    :host-context(a:focus-visible) svg {
      filter: drop-shadow(0 0 10px color-mix(in srgb, var(--accent) 45%, transparent));
    }

    :host-context(a:hover) .word {
      fill: var(--accent-text);
    }

    @media (prefers-reduced-motion: reduce) {
      svg,
      .word {
        transition: none;
      }
    }
  `,
})
export class LogoComponent {}
