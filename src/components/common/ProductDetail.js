import axios from "axios";
import React, { useEffect,useState } from "react";
import { Link, useParams } from "react-router-dom";
import logo from "../../img/logo.PNG";
import { Form, Input, Button } from "antd";

export default function ProductDetail() {
  const [product, setProduct] = useState({
    name: "",
    price: "",
  });

  const { id } = useParams();

  useEffect(() => {
    loadProduct();
  }, []);

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
            <h1 style={{ textAlign: "center", marginTop: 5, color:"rgb(240, 227, 121)"}}>Product detail</h1>
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
                <div style={{textAlign:'center', paddingBottom:15}}>
                  <Button style={{width: 90,backgroundColor: "rgb(28, 28, 52)", color: "rgb(240, 227, 121)"}}  onClick={getProducts}  type="primary" danger>Back</Button>
               </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
