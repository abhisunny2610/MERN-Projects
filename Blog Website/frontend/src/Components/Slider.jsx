import React, { useEffect, useState } from 'react'
import img1 from '../Assests/pexels-andrew-neel-3178744.jpg'
import img2 from '../Assests/pexels-matheus-bertelli-3856039.jpg'
import img3 from '../Assests/pexels-plann-4549414.jpg'

const Slider = () => {

  const images = [
    {
      image: img1,
      caption: "Make the world a better place with camera"
    },
    {
      image: img2,
      caption: "Make the world a better place with camera"
    },
    {
      image: img3,
      caption: "Make the world a better place with camera"
    }
  ]

  const [index, setIndex] = useState(0)

  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  useEffect(() => {
    const interval = setInterval(handleNext, 3000)

    return () => {
      clearInterval(interval)
    }

  }, [])

  const containerStyle = {
    display: 'flex',
    width: `${images.length * 100}%`,
    transition: 'transform 0.5s ease-in-out',
    transform: `translateX(-${index * (100 / images.length)}%)`,
  };

  return (
    <div style={containerStyle}>
      {images.map((img, i) => (
        <div key={i} style={{ width: '100%' }}>
          <img src={img.image} alt="" width="100%" />
          <p className='text-light'>{img.caption}</p>
        </div>
      ))}
    </div>
  )
}

export default Slider