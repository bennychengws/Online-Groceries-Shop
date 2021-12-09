import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import ReactDOM from "react-dom";
import moduleCss from "../styles/Notice.module.scss";

const Notice = ({show, order, onClose}) => {
  const [isBrowser, setIsBrowser] = useState(false);
  const [showLoginNotice, setShowLoginNotice] = useState(false);
  const [showPaymentNotice, setShowPaymentNotice] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  useEffect(() => {
    const path = router.pathname
    switch(path) {
      case "/cart":
        setShowPaymentNotice(true)
        break;
      default:
        setShowLoginNotice(true)
        break;
    }
  }, [])

  const handleCloseClick = (e) => {
    e.preventDefault();
    onClose();
  };

  const modalContent = show ? (
    <div className={moduleCss.styledModalOverlay}>
      <style jsx global>{`
        body {
          overflow: hidden;
        }
      `}
      </style>
      <div className={moduleCss.styledModal}>
        <button className={moduleCss.closeButton} onClick={handleCloseClick}>x</button>
        {showPaymentNotice ? 
        <div>
          <div className={moduleCss.title}>Notice</div>
          <div className={moduleCss.paypalInstructionContainer}>
            <div style={{marginBottom: "1vh"}}>Please use the following Paypal sandbox account for checkout.</div>
            <div>Account: sb-tfbim8386247@personal.example.com</div>
            <div>Password: /v)7OLL+</div>          
          </div>
        </div>          
        :
        <div>
          <div className={moduleCss.title}>Notice</div>
          <div className={moduleCss.loginInstructionContainer}>
            <div>Please use the autofilled account to login for test if you do not want to sign up a new account.</div>
          </div>
        </div>
        }     
      </div>
    </div>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById("cancel-root")
    );
  } else {
    return null;
  }
};

export default Notice;
