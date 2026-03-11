import http from 'http';
import { ImageResponse } from '@vercel/og';

const handler = async (req, res) => {
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

  const imageResponse = new ImageResponse(
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
    }
  );

  res.setHeader('Content-Type', 'image/png');
  const image = await imageResponse.arrayBuffer();
  res.end(Buffer.from(image));
};

const server = http.createServer(handler);
const port = 4000;

server.listen(port, () => {
  console.log(`Countdown server running at http://localhost:${port}`);
});
