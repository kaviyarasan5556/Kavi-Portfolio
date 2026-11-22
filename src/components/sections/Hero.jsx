import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Download } from 'lucide-react';
import { useRef } from 'react';
import { CoreStage } from '@/components/three/CoreStage';
import { buttonClass } from '@/components/ui/Button';
import { Magnetic } from '@/components/ui/Magnetic';
import { RotatingLine } from '@/components/ui/RotatingLine';
import { SplitText } from '@/components/ui/SplitText';
import { hero, profile } from '@/data/profile';
import { cn } from '@/lib/cn';
import { scrollToId } from '@/lib/scroll';

const delay = (ms) => ({ '--d': `${ms}ms` });

export function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const stageY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  const goToOrders = (event) => {
    event.preventDefault();
    scrollToId('orders');
  };

  return (
    <section
      ref={ref}
      id="top"
      aria-labelledby="hero-title"
      className="relative flex min-h-[100svh] flex-col overflow-hidden pt-14 sm:pt-16"
    >
      <div className="hero-glow" aria-hidden="true" />

      <div className="shell relative flex flex-1 flex-col justify-center py-4 sm:py-6 lg:py-8">
        {/* 3D centrepiece. On large screens it sits behind and to the right of the copy. */}
        <motion.div
          style={{ y: stageY }}
            className="pointer-events-none order-2 mt-3 sm:mt-4 lg:absolute lg:inset-y-0 lg:right-0 lg:order-none lg:mt-0 lg:flex lg:w-[46%] lg:items-center xl:right-4 xl:w-[48%]"
        >
          <div style={delay(250)} className="intro-fade w-full">
            <CoreStage className="pointer-events-auto mx-auto aspect-square w-full max-w-[16rem] sm:max-w-[24rem] lg:max-w-none" />
          </div>
        </motion.div>

        <motion.div
          style={{ y: copyY, opacity: copyOpacity }}
          className="pointer-events-none relative z-10 order-1 max-w-3xl lg:max-w-[60%] xl:max-w-[50rem]"
        >
          <p className="label intro-fade">{hero.eyebrow}</p>

          <h1
            id="hero-title"
            className="mt-3 font-display text-[clamp(2.15rem,7vw,5.75rem)] leading-[0.96] font-semibold tracking-[-0.035em] sm:mt-4"
          >
            <SplitText parts={hero.headline} />
          </h1>

          <div className="intro-fade mt-3 sm:mt-5" style={delay(420)}>
            <RotatingLine items={hero.rotating} />
          </div>

          <p
            className="intro-fade mt-3 max-w-xl text-[0.9375rem] text-muted sm:mt-4 sm:text-lg"
            style={delay(520)}
          >
            {hero.lede}
          </p>

          <div
            className="intro-fade pointer-events-auto mt-5 flex w-full flex-col gap-3 sm:mt-6 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center"
            style={delay(620)}
          >
            <Magnetic className="w-full sm:w-auto">
              <a
                href="#orders"
                onClick={goToOrders}
                className={buttonClass('primary', 'w-full sm:w-auto')}
              >
                View projects
                <ArrowDown
                  size={16}
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover/btn:translate-y-0.5"
                />
              </a>
            </Magnetic>
            <Magnetic className="w-full sm:w-auto">
              <a
                href={profile.resume.href}
                download={profile.resume.downloadName}
                className={buttonClass('ghost', 'w-full sm:w-auto')}
              >
                <Download
                  size={16}
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover/btn:translate-y-0.5"
                />
                Download CV
              </a>
            </Magnetic>
          </div>
        </motion.div>
      </div>

      {/* System readouts */}
      <div className="intro-fade relative border-t border-line" style={delay(760)}>
        <dl className="shell grid grid-cols-2 lg:grid-cols-4">
          {hero.readouts.map((item, index) => (
            <div
              key={item.label}
              className={cn(
                'border-line py-2.5 pr-3 sm:py-3 sm:pr-4 lg:py-4',
                index % 2 === 1 && 'border-l pl-3 sm:pl-4',
                index >= 2 && 'border-t lg:border-t-0',
                index > 0 && 'lg:border-l lg:pl-6',
              )}
            >
              <dt className="label">{item.label}</dt>
              <dd className="mt-1 text-xs text-ink sm:mt-1.5 sm:text-sm">{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
