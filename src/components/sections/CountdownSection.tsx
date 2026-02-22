'use client';

import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useCountdown } from '@/hooks/useCountdown';
import { pluralize } from '@/lib/pluralize';
import { countdownData } from '@/lib/constants';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Container } from '@/components/ui/Container';
import { ParallaxSection } from '@/components/ui/ParallaxSection';

/** Stagger container — дочерние элементы появляются по очереди */
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

/** Card entrance animation */
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
};

/** Единица времени для карточки */
interface TimeUnit {
  value: number;
  labels: [string, string, string]; // one, few, many
}

/**
 * Карточка обратного отсчёта — число + подпись.
 * Число анимируется через AnimatePresence при каждом изменении.
 * When prefers-reduced-motion: renders static elements without animation.
 */
function CountdownCard({ value, labels, reducedMotion }: TimeUnit & { reducedMotion: boolean }) {
  if (reducedMotion) {
    return (
      <div className="bg-white/80 rounded-card shadow-sm p-4 md:p-6 border border-alexandrite-light flex flex-col items-center justify-center min-w-0">
        <div className="text-3xl md:text-5xl font-calmius text-alexandrite font-semibold leading-none">
          <span className="inline-block" suppressHydrationWarning>
            {value}
          </span>
        </div>
        <span className="text-sm text-chocolate/60 mt-1">
          {pluralize(value, ...labels)}
        </span>
      </div>
    );
  }

  return (
    <motion.div
      variants={cardVariants}
      className="bg-white/80 rounded-card shadow-sm p-4 md:p-6 border border-alexandrite-light flex flex-col items-center justify-center min-w-0"
    >
      {/* Число с fade-анимацией при смене */}
      <div className="text-3xl md:text-5xl font-calmius text-alexandrite font-semibold leading-none">
        <AnimatePresence mode="wait">
          <motion.span
            key={value}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="inline-block"
            suppressHydrationWarning
          >
            {value}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Подпись — русская плюрализация */}
      <span className="text-sm text-chocolate/60 mt-1">
        {pluralize(value, ...labels)}
      </span>
    </motion.div>
  );
}

/**
 * Праздничное сообщение после наступления даты свадьбы.
 */
function ExpiredMessage({ reducedMotion }: { reducedMotion: boolean }) {
  if (reducedMotion) {
    return (
      <div className="text-center py-8">
        <p className="text-2xl sm:text-3xl font-calmius text-alexandrite">
          {countdownData.expiredMessage}
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="text-center py-8"
    >
      <p className="text-2xl sm:text-3xl font-calmius text-alexandrite">
        {countdownData.expiredMessage}
      </p>
    </motion.div>
  );
}

/**
 * Секция обратного отсчёта до свадьбы.
 *
 * 4 карточки (дни, часы, минуты, секунды) с:
 * - Parallax depth effect on background (~50% speed)
 * - Stagger entrance animation (по очереди при скролле)
 * - AnimatePresence fade на смене цифр
 * - Русские подписи через pluralize
 * - Expired state с праздничным сообщением
 * - SSR-safe через isHydrated
 * - Full reduced-motion support: all animations disabled
 */
export function CountdownSection() {
  const { days, hours, minutes, seconds, isExpired, isHydrated } =
    useCountdown(countdownData.weddingDate);
  const prefersReducedMotion = useReducedMotion();
  const reducedMotion = !!prefersReducedMotion;

  const timeUnits: TimeUnit[] = [
    { value: days, labels: ['день', 'дня', 'дней'] },
    { value: hours, labels: ['час', 'часа', 'часов'] },
    { value: minutes, labels: ['минута', 'минуты', 'минут'] },
    { value: seconds, labels: ['секунда', 'секунды', 'секунд'] },
  ];

  return (
    <ParallaxSection id="countdown" className="py-16" speed={0.5}>
      <Container>
        <SectionHeading>До нашего дня</SectionHeading>

        <div className="mt-8">
          {isExpired ? (
            <ExpiredMessage reducedMotion={reducedMotion} />
          ) : reducedMotion ? (
            /* Reduced motion: plain div grid, no stagger, no animation */
            <div className="grid grid-cols-2 gap-3 sm:flex sm:justify-center sm:gap-6">
              {timeUnits.map((unit) => (
                <CountdownCard
                  key={unit.labels[0]}
                  value={isHydrated ? unit.value : 0}
                  labels={unit.labels}
                  reducedMotion={reducedMotion}
                />
              ))}
            </div>
          ) : (
            /* Normal: animated stagger container */
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="grid grid-cols-2 gap-3 sm:flex sm:justify-center sm:gap-6"
            >
              {timeUnits.map((unit) => (
                <CountdownCard
                  key={unit.labels[0]}
                  value={isHydrated ? unit.value : 0}
                  labels={unit.labels}
                  reducedMotion={reducedMotion}
                />
              ))}
            </motion.div>
          )}
        </div>
      </Container>
    </ParallaxSection>
  );
}
