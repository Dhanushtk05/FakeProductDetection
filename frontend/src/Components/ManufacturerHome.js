import React from 'react'
import LayoutFooter from './Layouts/LayoutFooter'
import './Home.css'
import ManLayout from './Layouts/ManLayout'
import { useNavigate } from 'react-router-dom'

const ManufacturerHome = () => {
  var abi =[
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "id",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "brand",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "mem",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "store",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "processor",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "graphics",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "battery",
          "type": "string"
        }
      ],
      "name": "addCertificate",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getAllCertificates",
      "outputs": [
        {
          "internalType": "string[]",
          "name": "",
          "type": "string[]"
        },
        {
          "internalType": "string[]",
          "name": "",
          "type": "string[]"
        },
        {
          "internalType": "string[]",
          "name": "",
          "type": "string[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "id",
          "type": "string"
        }
      ],
      "name": "getOneCertificate",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]
  
  var contractAddress = '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4';
  
  function add_details() 
{ 
	var myContract = new web3.eth.Contract(abi,contractAddress, {from: account});
	var ds1 = document.getElementById("Productid").value;
	var ds2 = document.getElementById("brandname").value;
    var ds3= document.getElementById("memory").value;
	var ds4= document.getElementById("storage").value;
	var ds5= document.getElementById("processor").value;
	var ds6 = document.getElementById("graphics").value;
	var ds7 = document.getElementById("battery").value;
	
    if (ds1 === "" || ds2 === "" || ds3 === "" || ds4 === "" || ds5=== "" || ds6=== "" || ds7 === "") 
    {
        event.preventDefault();
        alert("All fields must be filled");
      return 
    }	
	else{
	alert("Click OK to add data to blockchain");
		
	}		
	var result = myContract.methods.addCertificate(ds1,ds2,ds3,ds4,ds5,ds6,ds7).send(function (err, result) 
    {
		if (err) { console.log(err); }
                if (result) { document.getElementById("result").innerHTML = result; }
               
    });		
  }  
  
  const navigate = useNavigate();
  return (
    <div className='homepage'>
       <div className='homeheader'>
        <ManLayout/>
       </div>
       <div className='homecontainer'>
       <div className='homesearch'>
            <button onClick={()=>navigate('/addproduct')} 
              className='pro_btn'>
               ADD PRODUCT
            </button>
        </div>
       </div>
       <div className='homefooter'>
        <LayoutFooter/>
       </div>
    </div>
  )
}

export default ManufacturerHome
