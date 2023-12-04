import React, { useState  } from 'react'
import LayoutFooter from '../Layouts/LayoutFooter'
import '../Home.css'
import LayoutHead from '../Layouts/LayoutHead'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'



const AddBook = () => {
    const navigate = useNavigate();
    const [productId , setProductId] = useState("")
    const [brand , setBrand] = useState("")
    const [memory , setMemory] = useState("")
    const [storage , setStorage] = useState("")
    const [processor , setProcessor] = useState("")
    const [graphics, setGraphics] = useState("");
    const [battery, setBattery] = useState("");
    
    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('productid' , productId);
        formData.append(' brandname' , brand);
        formData.append('memory' , memory);
        formData.append('storage',storage);
        formData.append(' processor',processor);
        formData.append('graphics',graphics);
        formData.append('battery',battery);
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        await axios.post(`/api/v1//addproduct/manufaturer`, formData, config);
        window.alert("Product added to metamask successfully!")
        console.log("")
        navigate(`/product/${productId}`)
  }
  return (
    <div className="homepage">
       <div className='homeheader'>
          <LayoutHead/>
       </div>
        <div className="row wrapper" id='update'>
            <div className="col-10 col-lg-5">  
                <form  className="shadow-lg" onSubmit={submitHandler}>
                    <h1 className="mb-3">Add Product</h1>
                    <div className="form-group">
                        <label htmlFor="email_field">Product ID</label>
                        <input
                            keyword='book'
                            id="book_field"
                            className="form-control"
                            placeholder="Enter Product ID"
                            value={productId}
                            onChange = {e=>setProductId(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email_field">Brand name</label>
                        <input
                            name='author'
                            id="author_field"
                            className="form-control"
                            placeholder="Enter Brand Name"
                            value={brand}
                            onChange = { e=>setBrand(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email_field">Memory</label>
                        <input
                            name='Publisher'
                            id="publisher_field"
                            className="form-control"
                            placeholder="Enter Memory ID"
                            value={memory}
                            onChange = {e=>setMemory(e.target.value)}
                        />
                    </div>                    
                    <div className="form-group">
                        <label htmlFor="email_field">Storage</label>
                        <input
                            name='year'
                            id="year_field"
                            className="form-control"
                            placeholder="Enter Storage"
                            value={storage}
                            onChange = {e=>setStorage(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email_field">Processor</label>
                        <input
                            keyword='book'
                            id="book_field"
                            className="form-control"
                            placeholder="Enter Processor"
                            value={processor}
                            onChange = {e=>setProcessor(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                                <label htmlFor="price_field">Graphics</label>
                                <input
                                type="text"
                                id="price_field"
                                className="form-control"
                                placeholder='Enter the Graphics'
                                onChange={e => setGraphics(e.target.value)}
                                value={graphics}
                                />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email_field">Battery</label>
                        <input
                            name='Publisher'
                            id="publisher_field"
                            className="form-control"
                            placeholder="Enter Battery ID"
                            value={battery}
                            onChange = {e=>setBattery(e.target.value)}
                        />
                    </div>

                    <button
                        id="search_button"
                        type="submit"
                        className="btn btn-block py-3"
                        >
                        ADD product
                    </button>

                </form>
            </div>
         
        </div>
        <div className='adminfooter'><LayoutFooter/></div>
    </div>
  )
}

export default AddBook
