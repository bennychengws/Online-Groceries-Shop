import moduleCss from '../styles/Slider.module.css'
import { useEffect, useState, useRef } from 'react'


const Slider = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [length, setLength] = useState(children.length)
  const [touchPosition, setTouchPosition] = useState(null)
  const timeoutRef = useRef(null);
  const delay = 3000;

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }

  useEffect(() => {
    setLength(children.length)
  }, [{ children }])

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setCurrentIndex((prevState) =>
          prevState === length - 1 ? 0 : prevState + 1
        ),
      delay
    );

    return () => { 
      resetTimeout();
     };
  }, [{ currentIndex }]);



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
        {/* {
          currentIndex > 0 &&
          <button onClick={prev} className={moduleCss.leftArrow}>
            &lt;
          </button>
        } */}
        <div className={moduleCss.carouselContentWrapper} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove}>
          <div className={moduleCss.carouselContent} style={{ transform: `translate3d(-${currentIndex * 100}%, 0, 0)` }}
          >
            {children}
          </div>
        </div>
        {/* {
          currentIndex < (length - 1) &&
          <button onClick={next} className={moduleCss.rightArrow}>
            &gt;
          </button>
        } */}
        <div className={moduleCss.slideshowDots}>
          {children.map((_, idx) => (
            <div key={idx} className={`${moduleCss.slideshowDot} ${currentIndex === idx ? moduleCss.active : ""}`} onClick={() => {
              setCurrentIndex(idx);
            }}></div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Slider
