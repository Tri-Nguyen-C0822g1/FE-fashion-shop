import axios from "axios";
import React, { useEffect, useState } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import { Button,Form, Input} from 'antd';
import logo from "../../img/logo.PNG";

export default function ProductDeleteForm() {
  let navigate = useNavigate();

  const { id } = useParams();

  const [product, setProduct] = useState({});


  const onInputChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadProduct();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:3001/products/${id}`, product);
    navigate("/");
  };

  const loadProduct = async () => {
    const result = await axios.get(`http://localhost:3001/products/${id}`);
    setProduct(result.data);
  };

  function getProducts() {
    window.location.href = "/home/products";
}

  return (
    <div className="container">
    <div className ="form-wrapper" > 
      <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
        <Form
           labelCol={{ span: 6 }}
           wrapperCol={{ span: 12 }}
           layout="horizontal"
           style={{width:'40%',height:'20%',
             margin: 'auto',border:'solid' }}
               >
                <div style={{paddingTop: 10, display: 'flex', justifyContent: 'center', alignItems: "center"}}>
            <img
            
              alt="logo GMS"
              src={logo}
              style={{ marginBottom: 20, borderRadius:20}}
              width={150}
            />
            </div>
            <h1 style={{ textAlign: "center", marginTop: 5, color:"rgb(240, 227, 121)"}}>Delete product</h1>
            <Form.Item label="ID">
                <Input
                readOnly
                  className="form-control"
                  type="text"
                  value={product.id}
                  name="id" /> 
                </Form.Item>
                <Form.Item label="Product name">
                <Input
                readOnly
                  className="form-control"
                  type="text"
                  value={product.name}
                  name="name" /> 
                </Form.Item>
                <Form.Item label="Price">
                <Input
                readOnly
                  className="form-control"
                  type="text"
                  value={product.price}
                  name="price" /> 
                </Form.Item>
                <div style={{textAlign:'center', paddingBottom:10}}>
                  <Button style={{width:90,backgroundColor: "rgb(28, 28, 52)", color: "rgb(240, 227, 121)"}} onClick={onSubmit} type="primary" >Submit</Button>        
                  <Button style={{width: 90,backgroundColor: "rgb(28, 28, 52)", color: "rgb(240, 227, 121)",marginLeft:10}}  onClick={getProducts}  type="primary" danger>Back</Button>
                </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
