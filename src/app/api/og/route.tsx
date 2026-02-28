import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #598c74 0%, #D4C5A9 50%, #E8D5C4 100%)',
          fontFamily: 'serif',
          position: 'relative',
        }}
      >
        {/* Decorative border frame */}
        <div
          style={{
            position: 'absolute',
            top: 20,
            left: 20,
            right: 20,
            bottom: 20,
            border: '2px solid rgba(255, 255, 255, 0.4)',
            borderRadius: 12,
            display: 'flex',
          }}
        />

        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            color: 'white',
            padding: '40px',
          }}
        >
          {/* Names */}
          <div
            style={{
              fontSize: 64,
              fontWeight: 300,
              letterSpacing: '0.05em',
              lineHeight: 1.2,
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
            }}
          >
            Григорий & Полина
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: 26,
              fontWeight: 300,
              marginTop: 24,
              opacity: 0.9,
              textShadow: '0 1px 4px rgba(0, 0, 0, 0.1)',
            }}
          >
            Приглашение на свадьбу
          </div>

          {/* Date + Venue */}
          <div
            style={{
              fontSize: 22,
              fontWeight: 300,
              marginTop: 20,
              opacity: 0.85,
              textShadow: '0 1px 4px rgba(0, 0, 0, 0.1)',
            }}
          >
            16 мая 2026 · База отдыха «Ёлки»
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: {
        'Cache-Control': 'public, max-age=0, s-maxage=0, must-revalidate',
      },
    },
  );
}
