import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import moduleCss from "../styles/Failed.module.css";
import Image from "next/image";
import bag from "../images/bag.png";
import Link from "next/link";

const Failed = ({ show, onClose }) => {
  //   const elementRef = useRef();
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    // const divElement = elementRef.current;
    // console.log(divElement)
    setIsBrowser(true);
  }, []);

  const handleCloseClick = (e) => {
    e.preventDefault();
    onClose();
  };

  const modalContent = show ? (
    <div className={moduleCss.styledModalOverlay}>
      <div className={moduleCss.styledModal}>
        <div>
          <Link href="#">
            <a
              onClick={handleCloseClick}
              className={moduleCss.styledModalHeader}
            >
              x
            </a>
          </Link>
          <div className={moduleCss.bagImage}>
            <Image src={bag} width="180vw" height="180vh"></Image>
          </div>
        </div>
        <div className={moduleCss.textContainer}>
          <div className={moduleCss.oops}>Oops! Order Failed</div>
          <div className={moduleCss.wrong}>Something went terribly wrong.</div>
        </div>
        <div className={moduleCss.buttonContainer}>
          <Link href="#">
            <button className={moduleCss.try} onClick={handleCloseClick}>Please try again</button>
          </Link>
          <Link href="../home">
            <div className={moduleCss.back}>Back to home</div>
          </Link>
        </div>
      </div>
    </div>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      //   <div ref={elementRef}>Hello from modal</div>,
      modalContent,
      document.getElementById("failed-root")
    );
  } else {
    return null;
  }
};

export default Failed;
