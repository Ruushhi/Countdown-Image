import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',
};

export default async function handler(request) {
  try {
    const endDate = new Date("2026-03-13T23:59:59");
    const now = new Date();

    const diff = endDate - now;

    let days = 0, hours = 0, minutes = 0, seconds = 0;

    if (diff > 0) {
      days = Math.floor(diff / (1000 * 60 * 60 * 24));
      hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      minutes = Math.floor((diff / (1000 * 60)) % 60);
      seconds = Math.floor((diff / 1000) % 60);
    }

    const timer = `${String(days).padStart(2,"0")} : ${String(hours).padStart(2,"0")} : ${String(minutes).padStart(2,"0")} : ${String(seconds).padStart(2,"0")}`;

    return new ImageResponse(
      {
        type: 'div',
        props: {
          style: {
            fontSize: 60,
            background: '#3f5f44',
            width: '100%',
            height: '100%',
            display: 'flex',
            color: 'white',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column'
          },
          children: [
            {
              type: 'div',
              props: {
                children: timer
              }
            },
            {
              type: 'div',
              props: {
                style: {fontSize:20, marginTop:10},
                children: 'DAYS     HOURS     MINUTES     SECONDS'
              }
            }
          ]
        }
      },
      {
        width: 600,
        height: 120,
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0'
        }
      }
    );
  } catch (e) {
    return new Response('Error: ' + e.message, { status: 500 });
  }
}