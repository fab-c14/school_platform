"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function HomeKinetics() {
  useGSAP(() => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;

      gsap.fromTo(
        "[data-hero-reveal]",
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.08, ease: "power3.out" },
      );

      gsap.utils.toArray<HTMLElement>("[data-kinetic-image]").forEach((image) => {
        gsap.fromTo(
          image,
          { opacity: 0.6 },
          {
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: image,
              start: "top 88%",
              end: "bottom 18%",
              scrub: 1,
            },
          },
        );
      });

      const pinned = document.querySelector<HTMLElement>("[data-pinned-story]");
      const story = document.querySelector<HTMLElement>("[data-story-copy]");
      if (pinned && story) {
        gsap.to(story, {
          yPercent: -18,
          ease: "none",
          scrollTrigger: {
            trigger: pinned,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
          },
        });
      }
    });

  return null;
}
