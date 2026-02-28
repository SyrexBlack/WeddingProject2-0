'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import emailjs from '@emailjs/browser';
import { motion, AnimatePresence } from 'framer-motion';
import { rsvpConfig } from '@/lib/constants';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { Card } from '@/components/ui/Card';
import { Check, Loader2, Send } from 'lucide-react';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';
type AttendanceOption = 'attending' | 'not-attending';

interface RSVPSectionProps {
  guestName?: string;
}

interface InitialSubmissionState {
  alreadySubmitted: boolean;
  savedName: string;
  formStatus: FormStatus;
}

function getInitialSubmissionState(): InitialSubmissionState {
  if (typeof window === 'undefined') {
    return {
      alreadySubmitted: false,
      savedName: '',
      formStatus: 'idle',
    };
  }

  const submitted = localStorage.getItem('rsvp_submitted');
  const storedName = localStorage.getItem('rsvp_name') || '';

  if (submitted === 'true') {
    return {
      alreadySubmitted: true,
      savedName: storedName,
      formStatus: 'success',
    };
  }

  return {
    alreadySubmitted: false,
    savedName: '',
    formStatus: 'idle',
  };
}

/**
 * RSVP section — "Ждём вашего ответа" with form, EmailJS, localStorage tracking.
 */
export function RSVPSection({ guestName = '' }: RSVPSectionProps) {
  const initialSubmissionState = useMemo(() => getInitialSubmissionState(), []);

  const [name, setName] = useState(guestName || '');
  const [attendance, setAttendance] = useState<AttendanceOption>('attending');
  const [plusOne, setPlusOne] = useState(false);
  const [wishes, setWishes] = useState('');
  const [formStatus, setFormStatus] = useState<FormStatus>(initialSubmissionState.formStatus);
  const [errorMessage, setErrorMessage] = useState('');
  const [alreadySubmitted, setAlreadySubmitted] = useState(initialSubmissionState.alreadySubmitted);
  const [showConfirmResubmit, setShowConfirmResubmit] = useState(false);
  const [nameError, setNameError] = useState('');
  const [savedName, setSavedName] = useState(initialSubmissionState.savedName);

  useEffect(() => {
    if (formStatus === 'error') {
      const timer = setTimeout(() => {
        setFormStatus('idle');
        setErrorMessage('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [formStatus]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setNameError('');

      if (name.trim().length < 2) {
        setNameError('Пожалуйста, введите ваше имя (минимум 2 символа)');
        return;
      }

      if (alreadySubmitted && !showConfirmResubmit) {
        setShowConfirmResubmit(true);
        return;
      }

      setFormStatus('loading');
      setErrorMessage('');

      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        setFormStatus('error');
        setErrorMessage(
          'Сервис отправки не настроен. Пожалуйста, свяжитесь с нами напрямую.'
        );
        return;
      }

      try {
        await emailjs.send(
          serviceId,
          templateId,
          {
            from_name: name.trim(),
            status: attendance === 'not-attending' ? 'Не смогу прийти' : 'Приду',
            plus_one: attendance === 'attending' && plusOne ? 'Да' : 'Нет',
            wishes: wishes.trim() || '(без пожеланий)',
          },
          { publicKey }
        );

        setFormStatus('success');
        if (typeof window !== 'undefined') {
          localStorage.setItem('rsvp_submitted', 'true');
          localStorage.setItem('rsvp_name', name.trim());
        }
        setSavedName(name.trim());
        setAlreadySubmitted(true);
        setShowConfirmResubmit(false);
      } catch {
        setFormStatus('error');
        setErrorMessage(
          'Не удалось отправить ответ. Попробуйте ещё раз или свяжитесь с нами напрямую.'
        );
      }
    },
    [name, attendance, plusOne, wishes, alreadySubmitted, showConfirmResubmit]
  );

  const isLoading = formStatus === 'loading';

  return (
    <AnimatedSection id="rsvp" className="py-20 md:py-28">
      <Container>
        <SectionHeading subtitle="Пожалуйста, подтвердите ваше присутствие">Ждём вашего ответа</SectionHeading>

        <Card className="mt-10 max-w-lg mx-auto">
          <AnimatePresence mode="wait">
            {formStatus === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="py-8 text-center"
              >
                <Check
                  size={56}
                  className="text-alexandrite mx-auto mb-5 animate-pulse"
                  strokeWidth={1.5}
                />
                <p className="text-xl font-calmius text-chocolate">
                  Спасибо, {savedName || name}!
                </p>
                <p className="text-chocolate/75 mt-3">Ваш ответ принят</p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={false}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                <div>
                  <label
                    htmlFor="rsvp-name"
                    className="block text-sm font-calmius text-chocolate/80 mb-1.5"
                  >
                    Ваше имя
                  </label>
                  <input
                    id="rsvp-name"
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (nameError) setNameError('');
                    }}
                    disabled={isLoading}
                    placeholder="Как к вам обращаться?"
                    className="w-full px-4 py-3 rounded-lg border border-chocolate/10 bg-white/60 font-calmius text-base text-chocolate focus:outline-none focus:ring-2 focus:ring-alexandrite/30 focus:border-alexandrite transition-colors disabled:opacity-50"
                  />
                  {guestName && name.trim() === guestName && (
                    <p className="text-xs text-chocolate/60 mt-1.5">
                      Имя подставлено из персонального приглашения ({guestName})
                    </p>
                  )}
                  {nameError && (
                    <p className="text-error text-sm mt-1">{nameError}</p>
                  )}
                </div>

                <div>
                  <p className="block text-sm font-calmius text-chocolate/80 mb-2">
                    Сможете прийти?
                  </p>
                  <div className="flex flex-col gap-2">
                    <label
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                        attendance === 'attending'
                          ? 'border-alexandrite bg-alexandrite/5 text-chocolate'
                          : 'border-chocolate/10 bg-white/40 text-chocolate/70 hover:border-chocolate/20'
                      } ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}
                    >
                      <input
                        type="radio"
                        name="attendance"
                        value="attending"
                        checked={attendance === 'attending'}
                        onChange={() => setAttendance('attending')}
                        disabled={isLoading}
                        className="sr-only"
                      />
                      <span
                        className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${
                          attendance === 'attending' ? 'border-alexandrite' : 'border-chocolate/20'
                        }`}
                      >
                        {attendance === 'attending' && (
                          <span className="w-2 h-2 rounded-full bg-alexandrite" />
                        )}
                      </span>
                      <span className="font-calmius text-sm tracking-wide">Да, приду</span>
                    </label>

                    <label
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                        attendance === 'not-attending'
                          ? 'border-alexandrite bg-alexandrite/5 text-chocolate'
                          : 'border-chocolate/10 bg-white/40 text-chocolate/70 hover:border-chocolate/20'
                      } ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}
                    >
                      <input
                        type="radio"
                        name="attendance"
                        value="not-attending"
                        checked={attendance === 'not-attending'}
                        onChange={() => {
                          setAttendance('not-attending');
                          setPlusOne(false);
                        }}
                        disabled={isLoading}
                        className="sr-only"
                      />
                      <span
                        className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${
                          attendance === 'not-attending' ? 'border-alexandrite' : 'border-chocolate/20'
                        }`}
                      >
                        {attendance === 'not-attending' && (
                          <span className="w-2 h-2 rounded-full bg-alexandrite" />
                        )}
                      </span>
                      <span className="font-calmius text-sm tracking-wide">Нет, не смогу</span>
                    </label>
                  </div>
                </div>

                {attendance === 'attending' && (
                  <div>
                    <p className="block text-sm font-calmius text-chocolate/80 mb-2">Будете с парой (+1)?</p>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <label
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg border cursor-pointer transition-all duration-200 flex-1 ${
                          plusOne
                            ? 'border-alexandrite bg-alexandrite/5 text-chocolate'
                            : 'border-chocolate/10 bg-white/40 text-chocolate/70 hover:border-chocolate/20'
                        } ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}
                      >
                        <input
                          type="radio"
                          name="plusOne"
                          value="yes"
                          checked={plusOne}
                          onChange={() => setPlusOne(true)}
                          disabled={isLoading}
                          className="sr-only"
                        />
                        <span
                          className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${
                            plusOne ? 'border-alexandrite' : 'border-chocolate/20'
                          }`}
                        >
                          {plusOne && <span className="w-2 h-2 rounded-full bg-alexandrite" />}
                        </span>
                        <span className="font-calmius text-sm tracking-wide">Да</span>
                      </label>

                      <label
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg border cursor-pointer transition-all duration-200 flex-1 ${
                          !plusOne
                            ? 'border-alexandrite bg-alexandrite/5 text-chocolate'
                            : 'border-chocolate/10 bg-white/40 text-chocolate/70 hover:border-chocolate/20'
                        } ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}
                      >
                        <input
                          type="radio"
                          name="plusOne"
                          value="no"
                          checked={!plusOne}
                          onChange={() => setPlusOne(false)}
                          disabled={isLoading}
                          className="sr-only"
                        />
                        <span
                          className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${
                            !plusOne ? 'border-alexandrite' : 'border-chocolate/20'
                          }`}
                        >
                          {!plusOne && <span className="w-2 h-2 rounded-full bg-alexandrite" />}
                        </span>
                        <span className="font-calmius text-sm tracking-wide">Нет</span>
                      </label>
                    </div>
                  </div>
                )}

                <div>
                  <label
                    htmlFor="rsvp-wishes"
                    className="block text-sm font-calmius text-chocolate/80 mb-1.5"
                  >
                    Пожелания{' '}
                    <span className="text-chocolate/50">(необязательно)</span>
                  </label>
                  <textarea
                    id="rsvp-wishes"
                    value={wishes}
                    onChange={(e) => setWishes(e.target.value)}
                    disabled={isLoading}
                    placeholder="Напишите пожелания паре..."
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg border border-chocolate/10 bg-white/60 font-calmius text-base text-chocolate focus:outline-none focus:ring-2 focus:ring-alexandrite/30 focus:border-alexandrite transition-colors resize-none disabled:opacity-50"
                  />
                </div>

                {showConfirmResubmit && (
                  <div className="bg-alexandrite/10 border border-alexandrite/30 rounded-card p-4 text-center">
                    <p className="text-sm font-calmius text-chocolate mb-3">
                      Вы уже отправляли ответ. Отправить новый?
                    </p>
                    <div className="flex flex-wrap gap-3 justify-center">
                      <button
                        type="submit"
                        className="px-3 py-2 rounded-card bg-alexandrite text-white font-calmius text-xs md:text-sm transition-colors hover:bg-alexandrite/85"
                      >
                        Да, отправить
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowConfirmResubmit(false)}
                        className="px-3 py-2 rounded-card border border-alexandrite/30 text-chocolate/70 font-calmius text-xs md:text-sm transition-colors hover:border-alexandrite/50"
                      >
                        Отмена
                      </button>
                    </div>
                  </div>
                )}

                {!showConfirmResubmit && (
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full mt-1 py-3.5 px-8 text-base tracking-wide inline-flex items-center justify-center rounded-lg font-calmius transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-alexandrite/50 focus:ring-offset-2 bg-alexandrite text-white hover:bg-alexandrite/90 border border-transparent shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <Loader2
                          size={20}
                          className="mr-2 animate-spin"
                          strokeWidth={1.5}
                        />
                        Отправка...
                      </>
                    ) : (
                      <>
                        <Send
                          size={18}
                          className="mr-2"
                          strokeWidth={1.5}
                        />
                        Отправить
                      </>
                    )}
                  </button>
                )}

                <p className="text-sm text-center mt-2 text-chocolate/55">
                  Или напишите нам:{' '}
                  <a
                    href={rsvpConfig.contact.telegramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-alexandrite underline hover:text-alexandrite/80 transition-colors"
                  >
                    Telegram
                  </a>
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </Card>
      </Container>

      <AnimatePresence>
        {formStatus === 'error' && errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 max-w-sm w-[calc(100%-2rem)]"
          >
            <div className="bg-error text-white px-5 py-3 rounded-lg shadow-xl text-center font-calmius text-sm">
              {errorMessage}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </AnimatedSection>
  );
}
