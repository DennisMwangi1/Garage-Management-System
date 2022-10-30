import React,{useState} from 'react'
import {AiFillCar, AiFillSetting} from "react-icons/ai"
import {RiTimerFlashFill} from "react-icons/ri"
import Overview from '../OverView/Overview';
import "./partItem.css"

const PartItem = ({part}) => {
    const {name, image, condition, price,model,serial_number}= part;
    const [show, setShow] = useState(false);
    const [item, setItem] = useState();
  return (
    <>
    <div className="car__item">
    <div className="car__img">
    <img src={image ? image : "https://via.placeholder.com/400"} alt={name}/>
    </div>

    <div className="car__item-content">
      <h4 className="section__title">{name}</h4>
      <h6 className="rent__price">
        ${price}.00 <span>/ VAT</span>
      </h6>

      <div className="car__item-info">
        <span>
          <AiFillCar/> {model}
        </span>
        <span>
          <AiFillSetting/> {serial_number}
        </span>
        <span>
          <RiTimerFlashFill/> {condition}
        </span>
      </div>
        <div className='car__btn-action'>
        <button className="car__btn-rent">
        Buy Now
      </button>
      <button className="car__btn-details"
        onClick={() => {
            setShow(true);
             setItem(part);
         }}
      >
        Details
      </button>
        </div>
    </div>
  </div>
        <Overview show={show} part={item} onClose={() => setShow(false)} />
        </>
  )
}
export default PartItem