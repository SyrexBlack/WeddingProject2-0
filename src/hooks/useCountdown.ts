'use client';

import { useState, useEffect } from 'react';
import { differenceInSeconds } from 'date-fns';

interface CountdownState {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
  isHydrated: boolean;
}

/**
 * Хук обратного отсчёта до указанной даты.
 *
 * Возвращает days/hours/minutes/seconds, isExpired (дата прошла),
 * и isHydrated (false на SSR, true после первого useEffect).
 *
 * Обновляется каждую секунду через setInterval.
 */
export function useCountdown(targetDate: string): CountdownState {
  const [state, setState] = useState<CountdownState>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
    isHydrated: false,
  });

  useEffect(() => {
    const target = new Date(targetDate);

    function calculate() {
      const totalSeconds = differenceInSeconds(target, new Date());

      if (totalSeconds <= 0) {
        setState({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isExpired: true,
          isHydrated: true,
        });
        return;
      }

      setState({
        days: Math.floor(totalSeconds / 86400),
        hours: Math.floor((totalSeconds % 86400) / 3600),
        minutes: Math.floor((totalSeconds % 3600) / 60),
        seconds: totalSeconds % 60,
        isExpired: false,
        isHydrated: true,
      });
    }

    // Initial calculation
    calculate();

    // Update every second
    const interval = setInterval(calculate, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return state;
}
