import React, { useEffect, useState } from 'react'
import QRcode from 'react-qr-code'
import './Qrgenerator.css'
import { useParams } from 'react-router-dom';
import CryptoJS  from 'crypto-js'
import LayoutFooter from '../Layouts/LayoutFooter';
import LayoutHead from '../Layouts/LayoutHead';
const Qrgenerator = () => {
    const {id:productID} = useParams();
    const [encrptedData, setEncrptedData] = useState("");
    const secretPass = "XkhZG4fW2t2W";
    useEffect(()=>{
      const encryptData = (id) => {
        const data = CryptoJS.AES.encrypt(
          JSON.stringify(id),
          secretPass
        ).toString();
        setEncrptedData(data);
      }
      encryptData(productID)
    },[productID,secretPass])
  return (
    <div>
        <div className='homeheader'>
            <LayoutHead/>
       </div>
        <div className='product_qr'>
           <h1>QR CODE FOR THE PRODUCT</h1>
            <QRcode value={encrptedData}/>
        </div>
        <div className='qrfooter'>
          <LayoutFooter/>
       </div>
    </div>
    
  )
}

export default Qrgenerator
