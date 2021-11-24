// Incompleted, to be optimised
import React, { useState } from "react";
import { useRouter } from 'next/router'
import Image from "next/image";
import {NotificationContainer, NotificationManager} from "react-notifications";
import moduleCss from "../styles/EditPayment.module.css";
import payment from "../images/paymentMethod.png";


const EditPayment = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    // email: paymentAcctInfo.email,
    cardNumberBlock1: "",
    cardNumberBlock2: "",
    cardNumberBlock3: "",
    cardNumberBlock4: "",
    nameOnCard: "",
    ExpirationMonth: "",
    ExpirationYear: "",
  });
  // console.log(formData);

  const handleSubmit = async(e) => {
    e.preventDefault();
    // console.log(formData)
    // if(isChangingAddress) {
    //   // const res = await fetchWrapper.put(`api/user/${accountInfo.email}`, formData) 
    //   const res = await fetch(`api/user/${paymentAcctInfo.email}/info/address`, {
    //     method: 'PUT',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({
    //       formData
    //     }),
    //   });
    //   if(res.ok) {
    //     createNotification("success")
    //     await new Promise(resolve => setTimeout(resolve, 3000));
    //     console.log("updated address")
    //     router.reload()
    //   } else if(res.status === 401) {
    //     createNotification("error", "Sorry you are not authenticated")
    //     router.push("/")
    //   } else {
    //     createNotification("error", "Some errors occur, please try again")
    //   }
    // }
  }

  const createNotification = (type, message) => {
    switch (type) {
      case "success":
        return NotificationManager.success(`You have succefully updated your registered payment method`, "Successful Change", 10000);
      case "error":
        return NotificationManager.error(message, 'Ooops', 3000);
    }
  }

  return (
    <div className={moduleCss.container}>
      <div className={moduleCss.pageTitleWithIcon} >
        <Image src={payment} width="16.81px" height="20.17px"></Image>
        <div className={moduleCss.pageTitle}>Edit Payment Method</div>
      </div>
      <div className={moduleCss.optionalButtonWrapper}><input type="radio" className="form-radio text-indigo-600" name="radio-colors2" value={1} defaultChecked></input><span className="ml-2">Mastercard</span></div>
      <form className={moduleCss.paymentContent} onSubmit={handleSubmit}>
        <div className={moduleCss.inputWrapper} >
          <div>Card No.:</div>
          <input className={moduleCss.inputField} onChange={(e) => setFormData({ ...formData, country: e.target.value })} value={formData.country}></input>
        </div>
        <div className={moduleCss.inputWrapper} >
          <div>Name on card:</div>
          <input className={moduleCss.inputField} onChange={(e) => setFormData({ ...formData, region: e.target.value })} value={formData.region}></input>
        </div>
        <div className={moduleCss.inputWrapper} >
          <div>City:</div>
          <input className={moduleCss.inputField} onChange={(e) => setFormData({ ...formData, city: e.target.value })} value={formData.city}></input>
        </div>
        <div className={moduleCss.inputWrapper} >
          <div>Expiration date:</div>
          <input className={moduleCss.inputField} onChange={(e) => setFormData({ ...formData, streetAddressLine1: e.target.value })} value={formData.streetAddressLine1}></input>
        </div>
        <div className={moduleCss.submitCancelRow}>
          <button className={moduleCss.submit}>Submit</button>
          <div className={moduleCss.cancel} onClick={() => {setFormData({ ...formData, country: "", region: "", city: "", streetAddressLine1: "", streetAddressLine2: "" }) }}>Reset</div>
        </div>
      </form>
    </div>
  )
}

export default EditPayment
