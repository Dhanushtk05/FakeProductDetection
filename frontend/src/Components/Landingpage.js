import React from 'react'
import './Landingpage.css'
import { useNavigate } from 'react-router-dom'
const Landingpage = () => {
  const navigate = useNavigate();
  return (
    <div className='load'>
        <div className='lhead'>
                <img width="40px" alt="logo" src="/logo1.png"/>
                <u1 className='list'>
                    <a href='#titlepage'><li>HOME</li></a>
                    <a href='#about'><li>ABOUT US</li></a>
                    <a href='#services'><li>SERVICES</li></a>
                    <a href='#contacts'><li>CONTACT</li></a>
                </u1>
        </div>
        <div className='loadheader'>
            <div className='title'id='titlepage'>
                <h1 id='titletext'>Fake Product Detection, Minimize Counterfiet Products And Ensure Product Saftey</h1>
                <div id='credentials'>
                    <button onClick={()=>navigate('/login')} id='btn1'>LOGIN</button>
                    <button onClick={()=>navigate('/register')} id='btn2'>SIGNUP</button>
                </div>
            </div>
        </div>
        <div className='abt' id='about'>
            <p >As online retailers and marketplaces aggressively add thousands of
                merchants to their platform, unauthorized white-labeling,fake product listing and images theft have 
                emerged as e-commerce risks
            </p>
            <p >
                So we are providing solutions to prevent counterfeit products and help you to maximize your revenue.
                Identify and act on fake products and replicas to protect your brand and your customers by our proven 
                solutions for manfacturers and also we help consumers to buy a original product.
            </p>
        </div>
        <div className='serv1' id='services'>
            <img src='/limg1.png' alt='servives'></img>
            <div className='serv1exp'>
                <h2>Safeguard customer loyalty and brand equity</h2>
                <p>Studies show that one in four customers unknowingly purchases fake products online.</p>
                <p>Identify fraudulent products across marketplaces so you can reach out to the unauthorized sellers eroding your brand equity by using our trusted counterfeit detection solution.</p>
                <p>Get fake products delisted to prevent customer churn and unflattering reviews that harm your brand.</p>
            </div>
        </div>
        <div className='serv2' >
            <div className='serv2exp'>
                <h2>Maximize your revenue</h2>
                <p>Counterfeit goods represent a $300 billion market each year. Fake merchandise can hurt your bottom line and tarnish your brand image.</p>
                <p>Identify and report counterfeit listings to prevent counterfeits from harming your brand.</p>
            </div>
            <img src='/limg2.png' alt='servives'></img>
        </div>
        <div className='Contacts' id='contacts'>
            <h2>Improve your Brand Revenue</h2>
            <button onClick={()=>navigate('/contact')}>Let's Start</button>
            <div className='contactpage'>
                 <h3><span>Email : </span> <a href='#blank'>abcfakeproduct@gmail.com</a></h3>
                 <h3><span>Phone :</span> +91 7634563789</h3>
            </div>
        </div>
      
    </div>
  )
}

export default Landingpage
