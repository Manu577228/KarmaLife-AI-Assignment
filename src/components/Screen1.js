import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";  

const Screen1 = () => {
  const [accountNumber, setAccountNumber] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [error, setError] = useState("");
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  const navigate = useNavigate();

  const progressBarVariants = {
    hidden: {
      opacity: 0,
      width: "0%",
    },
    visible: {
      opacity: 1,
      width: "100%",
      transition: {
        duration: 2, 
      },
    },
  };

  const handleVerify = () => {
    if (!/^\d+$/.test(accountNumber) || accountNumber.length !== 10) {
      setError("Invalid account number");
    } else {
      axios
        .get(`http://ifsc.razorpay.com/${ifscCode}`)
        .then((response) => {
          const data = response.data;
          if (data.IFSC) {
            setVerificationSuccess(true);
            setTimeout(() => {
              navigate("/screen2");
            }, 1000);
          } else {
            setError("Invalid IFSC code");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          setError("An error occurred while validating IFSC code");
        });
    }
  };

  return (
    <div className="container">
      <div>
        <Typography style={{ marginBottom: "35px" }} variant="h4">
          <u>Enter Your Bank Details</u>
        </Typography>
      </div>
      <div className="helper-text">
        <Typography variant="caption" sx={{ fontSize: "16px" }}>
          Enter Your Bank Account Number :
        </Typography>
      </div>
      <TextField
        label="Bank Account Number"
        variant="outlined"
        value={accountNumber}
        onChange={(e) => setAccountNumber(e.target.value)}
        sx={{ margin: "8px 0" }}
      />
      <div className="helper-text">
        <Typography variant="caption" sx={{ fontSize: "16px" }}>
          Enter Your IFSC Code :
        </Typography>
      </div>
      <TextField
        label="IFSC Code"
        variant="outlined"
        value={ifscCode}
        onChange={(e) => setIfscCode(e.target.value)}
        sx={{ margin: "8px 0" }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleVerify}
        sx={{ marginTop: "16px" }}
      >
        Verify
      </Button>
      {error && <Typography color="error">{error}</Typography>}
      {verificationSuccess && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={progressBarVariants}
          style={{
            backgroundColor: "green",
            height: "4px",
            marginTop: "16px",
          }}
        ></motion.div>
      )}
    </div>
  );
};

export default Screen1;
