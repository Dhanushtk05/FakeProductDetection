import {  useState } from "react";
import QrReader from "react-qr-scanner";
import { useNavigate } from "react-router-dom";
import CryptoJS  from 'crypto-js'

const Qrcode = () => {
  const [selected, setSelected] = useState("environment");
  const [startScan, setStartScan] = useState(false);
  const [loadingScan, setLoadingScan] = useState(false);
  const [data, setData] = useState("");
  const secretPass = "XkhZG4fW2t2W"
 
  const navigate = useNavigate();
  const handleScan =  (scanData) => {
    setLoadingScan(true);
    console.log(`loaded data data`, scanData);
    if (scanData && scanData !== "") {
      console.log(`loaded >>>`, scanData);
      setStartScan(false);
      setLoadingScan(false);
      const bytes = CryptoJS.AES.decrypt(scanData.text, secretPass);
      const dedata = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      setData(dedata);
      console.log(data);
    }
  };
  const handleError = (err) => {
    console.error(err);
  };

  return (
    <div>
      <button
        onClick={() => {
          setStartScan(!startScan);
        }}
        className="qr_btn"
      >
        {startScan ? "Stop Scan" : "Scan QR"}
      </button>
      {startScan && (
        <>
          <select className= "qr_btn" onChange={(e) => setSelected(e.target.value)}>
            <option value={"environment"}>Back Camera</option>
            <option value={"user"}>Front Camera</option>
          </select>
          <QrReader
            
            facingMode={selected}
            delay={1000}
            onError={handleError}
            onScan={handleScan}
            // chooseDeviceId={()=>selected}
            style={{ width: "300px" }}
          />
        </>
      )}
      {loadingScan}
      {data !== "" &&  navigate(`/productdetails/${data}`)}
    </div>
  );
};

export default Qrcode;
