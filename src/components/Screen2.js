import React, { useState, useEffect } from "react";
import Loader  from "../assets/loader.PNG";
import Button from "@mui/material/Button";

function Screen2() {
  const [verificationStatus, setVerificationStatus] = useState("verifying");
  const [receivedAmount, setReceivedAmount] = useState(null);

  useEffect(() => {
    const verificationTimeout = setTimeout(() => {
      setVerificationStatus("verified"); 
    }, 3000);

    return () => clearTimeout(verificationTimeout);
  }, []);

  const handleConfirmation = (received) => {
    setReceivedAmount(received);
  };

  return (
    <div className="container">
      <h1>Bank Account Verification</h1>

      {verificationStatus === "verifying" && (
        <div>
          <p>Verifying your account... Please wait.</p>
          <div className="penny-drop-animation">
          <img src={Loader} alt="...Loading" />
           </div>
        </div>
      )}

      {verificationStatus === "verified" && (
        <div>
          <p>Verification successful. Bank account is verified.</p>
          <p>Did you receive the amount in your bank account?</p>
          <Button onClick={() => handleConfirmation(true)}>Yes</Button>
          <Button onClick={() => handleConfirmation(false)}>No</Button>
        </div>
      )}

      {receivedAmount !== null && (
        <div>
          {receivedAmount ? (
            <p>Thank you for confirming. Bank account details are saved.</p>
          ) : (
            <p>
              We apologize for the inconvenience. Please check your bank account
              details and try again.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default Screen2;
