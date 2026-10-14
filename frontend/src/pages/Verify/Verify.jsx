import React, { useContext, useEffect, useState } from 'react'
import './Verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const Verify = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get('success');
  const orderId = searchParams.get('orderId');
  const { baseURL } = useContext(StoreContext);
  // console.log(success,orderId)
  const navigate = useNavigate();
  const verifyPayment = async () => {
    const callAPI = await axios.post(baseURL + "/api/order/verify", { success, orderId });
    if (callAPI.data.success) {
      navigate('/myorders');
    } else {
      navigate('/')
    }
  }
  useEffect(() => {
    verifyPayment()
  }, [])
  return (
    <div className="verify">
      <div className="spinner">


      </div>
    </div>
  )
}

export default Verify