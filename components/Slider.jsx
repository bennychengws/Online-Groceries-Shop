import moduleCss from '../styles/Slider.module.css'
import { useEffect, useState } from 'react'

const Slider = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [length, setLength] = useState(children.length)
  const [touchPosition, setTouchPosition] = useState(null)


  useEffect(() => {
    setLength(children.length)
  }, [{ children }])

  const next = () => {
    if (currentIndex < (length - 1)) {
      setCurrentIndex(prevState => prevState + 1)
    }
  }

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prevState => prevState - 1)
    }
  }

  const handleTouchStart = (e) => {
    const touchDown = e.touches[0].clientX
    setTouchPosition(touchDown)
  }

  const handleTouchMove = (e) => {
    const touchDown = touchPosition

    if (touchDown === null) {
      return
    }

    const currentTouch = e.touches[0].clientX
    const diff = touchDown - currentTouch

    if (diff > 5) {
      next()
    }

    if (diff < -5) {
      prev()
    }

    setTouchPosition(null)
  }

  return (
    <div className={moduleCss.carouselContainer}>
      <div className={moduleCss.carouselWrapper}>
        {
          currentIndex > 0 &&
          <button onClick={prev} className={moduleCss.leftArrow}>
            &lt;
          </button>
        }
        <div className={moduleCss.carouselContentWrapper} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove}>
          <div className={moduleCss.carouselContent} style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {children}
          </div>
        </div>
        {
          currentIndex < (length - 1) &&
          <button onClick={next} className={moduleCss.rightArrow}>
            &gt;
          </button>
        }
      </div>
    </div>
  )
}

export default Slider
