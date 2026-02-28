import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
  const heroImageUrl = new URL('/images/hero-gemini.png?v=20260302', request.url).toString();

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'serif',
          position: 'relative',
          overflow: 'hidden',
          background: '#1f2d24',
        }}
      >
        <img
          src={heroImageUrl}
          alt=""
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />

        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            background: 'linear-gradient(180deg, rgba(0,0,0,0.22) 0%, rgba(0,0,0,0.14) 40%, rgba(0,0,0,0.48) 100%)',
          }}
        />

        <div
          style={{
            position: 'absolute',
            top: 24,
            left: 24,
            right: 24,
            bottom: 24,
            border: '1.5px solid rgba(255, 255, 255, 0.45)',
            borderRadius: 18,
            display: 'flex',
          }}
        />

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            color: 'white',
            padding: '56px 72px',
            position: 'relative',
          }}
        >
          <div
            style={{
              fontSize: 22,
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              opacity: 0.88,
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.35)',
            }}
          >
            16 мая 2026
          </div>

          <div
            style={{
              fontSize: 72,
              fontWeight: 500,
              letterSpacing: '0.04em',
              lineHeight: 1.1,
              marginTop: 22,
              textShadow: '0 4px 22px rgba(0, 0, 0, 0.38)',
            }}
          >
            Григорий & Полина
          </div>

          <div
            style={{
              width: 120,
              height: 1,
              background: 'rgba(255, 255, 255, 0.6)',
              marginTop: 24,
              display: 'flex',
            }}
          />

          <div
            style={{
              fontSize: 28,
              marginTop: 26,
              opacity: 0.96,
              textShadow: '0 2px 12px rgba(0, 0, 0, 0.35)',
            }}
          >
            Приглашение на свадьбу
          </div>

          <div
            style={{
              fontSize: 24,
              marginTop: 18,
              opacity: 0.9,
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.32)',
            }}
          >
            База отдыха «Ёлки»
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
