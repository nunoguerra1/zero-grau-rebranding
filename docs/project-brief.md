# Zero Grau Rebranding: Project Brief

## Context

Concept redesign of the Conti "Zero Grau" beer website, built as a pitch to
show the potential of a full rebranding of all Conti landing pages.
The current site is a very simple Spanish-only page. The goal is to keep the
brand identity (blues, yellow, ice texture, lettering style) while delivering
a professional, cinematic, animation-driven experience.

## Audience

Adults 35+. Priorities: legibility, comfortable type sizes, strong contrast,
elegant (not chaotic) motion, fully responsive.

## Languages

Spanish (default) and Portuguese (pt-BR), switchable.

## Routes

- `/` Home: hero, product highlight, triple filtration story
- `/productos` Product line with the signature product switcher animation
- `/retornables` Returnable bottles in 3 animated steps
- `/casa-di-conti` Brand heritage (since 1947)
- `/donde-comprar` Where to buy
- `/contacto` Contact (WhatsApp, SAC)

## Motion direction

Reference: Red Bull product switching. Product (2D PNG) changes with a
coordinated transition: background tone, ice/mist layer, product, and text.
Extras: preloader, text reveals, parallax ice, magnetic buttons, grain/ice
texture. No custom cursor. Full animations on mobile.
Respect `prefers-reduced-motion`.

## Stack

Next.js (App Router) + TypeScript + Tailwind CSS, Framer Motion (component
motion), GSAP ScrollTrigger (scroll storytelling), Lenis (smooth scroll).
