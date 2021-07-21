import React from 'react'
import Slider from "../components/Slider"
import Image from 'next/image'
import fruits from "../images/fruits_&_vegetables.png";
import eggs from "../images/dairy_&_eggs.png"
import drinks from "../images/beverages.png"
import moduleCss from "../styles/test.module.css"

const test = () => {
    return (
        <div style={{ maxWidth: 1200, marginLeft: 'auto', marginRight: 'auto', marginTop: 64 }}>
            <Slider>
                <div className={moduleCss.vege}><Image src={fruits} width="100px" height="100px"></Image><div><div>Fresh Vegetables</div><div>Get Up To 40% OFF</div></div></div>
                <Image src={eggs} width="100px" height="100px"></Image>
                <Image src={drinks} width="100px" height="100px"></Image>
            </Slider>
        </div>
    )
}

export default test
