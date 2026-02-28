import { calendarData, countdownData } from '@/lib/constants';

const CALENDAR_CONTENT_TYPE = 'text/calendar; charset=utf-8';

function toIcsDate(value: Date): string {
  return value.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
}

function escapeIcsText(value: string): string {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\r?\n/g, '\\n');
}

export async function GET(request: Request) {
  const start = new Date(countdownData.weddingDate);
  const end = new Date(start.getTime() + calendarData.durationHours * 60 * 60 * 1000);
  const now = new Date();

  const uid = `wedding-anna-mikhail-${start.getTime()}@wedding-project2-0`;
  const sourceUrl = `${new URL(request.url).origin}/`;

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Wedding 2.0//Invitation Calendar//RU',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${toIcsDate(now)}`,
    `DTSTART:${toIcsDate(start)}`,
    `DTEND:${toIcsDate(end)}`,
    `SUMMARY:${escapeIcsText(calendarData.eventTitle)}`,
    `DESCRIPTION:${escapeIcsText(calendarData.description)}`,
    `LOCATION:${escapeIcsText(calendarData.location)}`,
    `URL:${escapeIcsText(sourceUrl)}`,
    'END:VEVENT',
    'END:VCALENDAR',
    '',
  ];

  const body = lines.join('\r\n');

  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': CALENDAR_CONTENT_TYPE,
      'Content-Disposition': 'attachment; filename="wedding-invitation.ics"',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
