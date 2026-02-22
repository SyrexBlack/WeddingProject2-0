'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useCountdown } from '@/hooks/useCountdown';
import { pluralize } from '@/lib/pluralize';
import { countdownData } from '@/lib/constants';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Container } from '@/components/ui/Container';

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
 */
function CountdownCard({ value, labels }: TimeUnit) {
  return (
    <motion.div
      variants={cardVariants}
      className="bg-white/80 rounded-card shadow-sm p-6 border border-alexandrite-light flex flex-col items-center justify-center min-w-0"
    >
      {/* Число с fade-анимацией при смене */}
      <div className="text-4xl sm:text-5xl font-calmius text-alexandrite font-semibold leading-none">
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
function ExpiredMessage() {
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
 * - Stagger entrance animation (по очереди при скролле)
 * - AnimatePresence fade на смене цифр
 * - Русские подписи через pluralize
 * - Expired state с праздничным сообщением
 * - SSR-safe через isHydrated
 */
export function CountdownSection() {
  const { days, hours, minutes, seconds, isExpired, isHydrated } =
    useCountdown(countdownData.weddingDate);

  const timeUnits: TimeUnit[] = [
    { value: days, labels: ['день', 'дня', 'дней'] },
    { value: hours, labels: ['час', 'часа', 'часов'] },
    { value: minutes, labels: ['минута', 'минуты', 'минут'] },
    { value: seconds, labels: ['секунда', 'секунды', 'секунд'] },
  ];

  return (
    <section id="countdown" className="py-16">
      <Container>
        <SectionHeading>До нашего дня</SectionHeading>

        <div className="mt-8">
          {isExpired ? (
            <ExpiredMessage />
          ) : (
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
                />
              ))}
            </motion.div>
          )}
        </div>
      </Container>
    </section>
  );
}
