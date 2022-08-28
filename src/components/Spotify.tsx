import { useEffect, useState } from 'react'
import Marquee from 'react-fast-marquee'

export default function Spotify() {
  const [status, setStatus] = useState('Loading...')

  useEffect(() => {
    async function update() {
      const val = await (
        await fetch('https://possums.xyz/nowplaying/song')
      ).json()
      setStatus(val)
    }
    update()
    const interval = setInterval(update, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center gap-3 text-green">
      <p></p>
      {status != 'Loading...' &&
      status != 'No song playing' &&
      status.length > 30 ? (
          <Marquee
            className="bottom-[1px] max-w-[150px]"
            gradient={false}
            speed={60}
          >
            {status}&nbsp;
          </Marquee>
        ) : (
          <p>
            {status != 'Loading...' && status != 'No song playing'
              ? status.substring(0, status.length - 2)
              : status}
          </p>
        )}
    </div>
  )
}
