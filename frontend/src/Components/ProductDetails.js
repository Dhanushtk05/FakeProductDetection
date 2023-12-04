import React, { useEffect, useState } from 'react'
import LayoutHead from './Layouts/LayoutHead'
import LayoutFooter from './Layouts/LayoutFooter'
import './ProductDetails.css'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { useSelector } from 'react-redux'


const ProductDetails = () => {
  const navigate = useNavigate();
  const {id:productID} = useParams();
  const [product , setProduct] = useState("");
  const { user }  = useSelector(state => state.authState);
  useEffect(()=>{
      async function getproduct(id){
         console.log(id);
         const data2 = await axios.get(`/api/v1/getProduct/${id}`)
         if(data2.data.product === null){
          window.alert("Product is Fake and don't Buy it !!!")
         }
         else{
          setProduct(data2.data.product);
         } 
     }
     getproduct(productID);
   },[productID])
   const reviews = product.verified
   const verifyhandler = async()=>{
   const status = 'verified'
   const formData = new FormData();
    formData.append('pid',product._id);
    formData.append('uid',user._id);
    formData.append('status',status);
    const config = {
        headers : {
            'Content-type': 'application/json'
        }
    }
    await axios.put(`/api/v1/putverify`,formData, config)
    window.alert("Product is verified by you");
    navigate('/home');
    }

  return (
    <div>
       <div className='homeheader'>
          <LayoutHead/>
       </div>

       <div className='productContainer'>
            <h2>PRODUCT DETAILS</h2>
           <div className='product-card'>
              <h3>PRODUCT ID    : <span>{product.productid}</span></h3>
              <h3>BRAND NAME    : <span>{product.brandname}</span></h3>
              <h3>MEMORY ID     : <span>{product.memory}</span></h3>
              <h3>STORAGE ID    : <span>{product.storage}</span></h3>
              <h3>PROCESSOR ID  : <span>{product.processor}</span></h3>
              <h3>GRAPHICS ID   : <span>{product.graphics}</span></h3>
              <h3>BATTERY ID    : <span>{product.battery}</span></h3>
              <div>
                <h3>Product Verified BY:</h3>
                   {reviews && reviews.map(review=>(
                      <div key={review._id} className='review'>
                         <p>|--- {review.user}-{review.role}</p>
                         <hr/>
                       </div>
                   ))}
                
              </div>

           </div>
           <button className='verify-btn'onClick={verifyhandler}>VERIFY</button>
       </div>
       <div className='adminfooter'><LayoutFooter/></div>
    </div>
  )
}

export default ProductDetails
