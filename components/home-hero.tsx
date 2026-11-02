"use client";

import { ArrowUpRightIcon, PhoneIcon } from "@phosphor-icons/react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import Link from "next/link";
import { useRef } from "react";
import { Photo } from "@/components/photo";

type LinkItem = { href: string; label: string };
type ImageItem = { src: string; alt: string };

const ease = [0.22, 1, 0.36, 1] as const;

const copyGroup = {
  hidden: {},
  visible: {
    transition: { delayChildren: 0.08, staggerChildren: 0.09 },
  },
};

const copyItem = {
  hidden: { y: 26 },
  visible: {
    y: 0,
    transition: { duration: 0.8, ease },
  },
};

export function HomeHero({
  eyebrow,
  headline,
  lede,
  primaryCta,
  secondaryCta,
  heroImage,
  heroGallery,
  phoneDisplay,
  phoneHref,
  location,
}: {
  eyebrow: string;
  headline: string[];
  lede: string;
  primaryCta: LinkItem;
  secondaryCta: LinkItem;
  heroImage: ImageItem;
  heroGallery: ImageItem[];
  phoneDisplay: string;
  phoneHref: string;
  location: string;
}) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const rawImageY = useTransform(scrollYProgress, [0, 1], ["0%", "9%"]);
  const rawSideY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const rawFootY = useTransform(scrollYProgress, [0, 1], ["0%", "7%"]);
  const rawCopyY = useTransform(scrollYProgress, [0, 1], ["0%", "5%"]);
  const imageY = useSpring(rawImageY, { stiffness: 90, damping: 24, mass: 0.4 });
  const sideY = useSpring(rawSideY, { stiffness: 90, damping: 24, mass: 0.4 });
  const footY = useSpring(rawFootY, { stiffness: 90, damping: 24, mass: 0.4 });
  const copyY = useSpring(rawCopyY, { stiffness: 90, damping: 24, mass: 0.4 });

  const firstCut = heroGallery[0] ?? heroImage;
  const secondCut = heroGallery[1] ?? heroGallery[0] ?? heroImage;

  return (
    <section ref={sectionRef} className="relative isolate overflow-hidden border-b border-line bg-paper">
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <div className="absolute -right-32 -top-36 size-[34rem] rounded-full bg-[#f6ebe4] blur-3xl" />
        <div className="absolute -bottom-40 -left-36 size-[26rem] rounded-full bg-[#f3d5c9]/80 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-px bg-line" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-[1400px] items-center gap-12 px-5 py-12 md:px-8 md:py-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:py-20">
        <motion.div
          className="relative max-w-xl"
          style={{ y: reduce ? 0 : copyY }}
          variants={copyGroup}
          initial={reduce ? false : "hidden"}
          animate="visible"
        >
          <motion.p variants={copyItem} className="flex items-center gap-3 text-sm text-accent">
            <span className="h-px w-8 bg-accent" aria-hidden />
            {eyebrow}
          </motion.p>

          <motion.h1
            variants={copyItem}
            className="mt-5 max-w-[11ch] font-serif text-[clamp(3.25rem,7vw,6.4rem)] leading-[0.94] tracking-[-0.065em] text-ink"
          >
            <span className="block">{headline[0]}</span>
            <span className="relative mt-1 block w-fit text-accent">
              {headline[1]}
              <span className="absolute -bottom-2 left-0 h-1 w-14 bg-accent/70" aria-hidden />
            </span>
          </motion.h1>

          <motion.p variants={copyItem} className="mt-7 max-w-[37ch] text-base leading-relaxed text-muted md:text-lg">
            {lede}
          </motion.p>

          <motion.div variants={copyItem} className="mt-8 flex flex-wrap gap-3">
            <Link
              href={primaryCta.href}
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-accent px-5 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-[#ab3a21] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent active:scale-[0.98]"
            >
              {primaryCta.label}
              <ArrowUpRightIcon size={16} weight="bold" />
            </Link>
            <Link
              href={secondaryCta.href}
              className="inline-flex min-h-12 items-center rounded-full border border-ink/25 bg-paper/70 px-5 text-sm font-medium text-ink backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-ink hover:bg-ink hover:text-paper focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent active:scale-[0.98]"
            >
              {secondaryCta.label}
            </Link>
          </motion.div>

          <motion.div
            variants={copyItem}
            className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line pt-5 text-sm"
          >
            <a href={phoneHref} className="inline-flex items-center gap-2 text-ink transition hover:text-accent">
              <PhoneIcon size={16} weight="bold" />
              {phoneDisplay}
            </a>
            <span className="text-muted">{location}</span>
          </motion.div>
        </motion.div>

        <motion.div
          className="relative mx-auto w-full max-w-[43rem] lg:max-w-none"
          initial={reduce ? false : { x: 34 }}
          animate={{ x: 0 }}
          transition={{ duration: 1, delay: 0.18, ease }}
        >
          <div className="relative aspect-[4/5] min-h-[27rem] sm:aspect-[5/4] lg:aspect-[6/5] lg:min-h-[36rem]">
            <motion.div
              className="hero-cut-main absolute inset-y-0 left-0 right-[17%] overflow-hidden bg-line shadow-[0_34px_80px_-42px_rgb(29_43_56_/_0.65)]"
              style={{ y: reduce ? 0 : imageY }}
            >
              <Photo
                src={heroImage.src}
                alt={heroImage.alt}
                fill
                priority
                sizes="(min-width: 1024px) 54vw, 100vw"
                className="object-cover object-[center_58%]"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-deep/35 via-transparent to-transparent" aria-hidden />
            </motion.div>

            <motion.div
              className="hero-cut-side absolute right-0 top-[4%] hidden h-[45%] w-[40%] bg-paper p-1.5 shadow-[0_24px_50px_-34px_rgb(29_43_56_/_0.55)] sm:block"
              style={{ y: reduce ? 0 : sideY }}
            >
              <div className="relative size-full overflow-hidden bg-line">
                <Photo
                  src={firstCut.src}
                  alt={firstCut.alt}
                  fill
                  sizes="(min-width: 1024px) 20vw, 34vw"
                  className="object-cover object-[center_38%]"
                />
              </div>
            </motion.div>

            <motion.div
              className="hero-cut-foot absolute bottom-[2%] right-[2%] h-[37%] w-[47%] bg-paper p-1.5 shadow-[0_26px_54px_-34px_rgb(29_43_56_/_0.55)]"
              style={{ y: reduce ? 0 : footY }}
            >
              <div className="relative size-full overflow-hidden bg-line">
                <Photo
                  src={secondCut.src}
                  alt={secondCut.alt}
                  fill
                  sizes="(min-width: 1024px) 24vw, 42vw"
                  className="object-cover object-[center_42%]"
                />
              </div>
            </motion.div>

            <motion.span
              className="absolute left-[56%] top-[7%] z-20 h-[84%] w-[5px] origin-top -rotate-6 bg-accent/90"
              initial={reduce ? false : { scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 0.5, duration: 0.9, ease }}
              aria-hidden
            />

            <div className="absolute bottom-[6%] left-[4%] z-20 hidden items-center gap-2 bg-paper px-3 py-2 text-xs font-medium text-ink shadow-[0_16px_30px_-20px_rgb(29_43_56_/_0.55)] md:flex">
              <span className="size-1.5 rounded-full bg-accent" aria-hidden />
              Learning with purpose
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
