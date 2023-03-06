import axios from "axios";
import { Checkbox,Button,Form, Input, Select} from 'antd';
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import logo from "../../img/logo.PNG";

export default function ProductEditForm() {
  let navigate = useNavigate();

  const { productId } = useParams();

  const [productSizes, setProductSize] = useState([]);
  const [productColors, setProductColor] = useState([]);
  const [categories, setCategory] = useState([]);

  const [product, setProduct] = useState({
    id:'',
    nameProduct: '',
    price: '', 
    fabricMaterial: '',
    detailedDescription: '', 
    photo: '', 
    productSizeDtos: [], 
    productColorDtos: [], 
    categoryDto: []
  });

  const onInputChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadProduct();
    loadProductSizes();
    loadProductColors();
    loadCategories();
  }, []);

  const addproductSizeDtos = (id) => {
    if(!product.setProductSize.includes(id)) {
      setProduct(prevState => ({
        ...prevState,
        productSizeDtos: [...product.productSizeDtos, id] 
      }));
    }
  }

  const addCategory = (id) => {
    if(!product.categoryDto.includes(id)) {
      setProduct(prevState => ({
        ...prevState,
        categoryDto: [...product.categoryDto, id] 
      }));
    }
  }

  const addproductcolorDtos = (id) => {
    if(!product.productColorDtos.includes(id)) {
      setProduct(prevState => ({
        ...prevState,
        productColorDtos: [...product.productColorDtos, id] 
      }));
    }
  }
  
  const loadProductSizes = async () => {
    const result = await axios.get("http://localhost:8080/api/v1/product-sizes");
    setProductSize(result.data);
  };
  const loadProductColors = async () => {
    const result = await axios.get("http://localhost:8080/api/v1/product-colors");
    setProductColor(result.data);
  };
  const loadCategories = async () => {
    const result = await axios.get("http://localhost:8080/api/v1/categories");
    setCategory(result.data);
  };
  const loadProduct = async () => {
    const result = await axios.get(`http://localhost:8080/api/v1/products/${productId}`);
    setProduct(result.data);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8080/api/v1/products/edit`, product);
    navigate("/");
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
              <h1 style={{ textAlign: "center", marginTop: 5, color:"rgb(240, 227, 121)"}}>Edit product</h1>
              <Form.Item label="Product name">
                <Input
                  className="form-control"
                  type="text"
                  onChange={onInputChange}
                  value={product.name}
                  name="name" /> 
                </Form.Item>
                <Form.Item label="Price">
                <Input
                  className="form-control"
                  type="text"
                  onChange={onInputChange}
                  value={product.price}
                  name="price" /> 
                </Form.Item>
                <Form.Item label="Fabric Material">
                <Input
                  className="form-control"
                  type="text"
                  onChange={onInputChange}
                  value={product.fabricMaterial}
                  name="fabricMaterial" /> 
                </Form.Item>
                <Form.Item label="Description">
                <Input
                  className="form-control"
                  type="text"
                  onChange={onInputChange}
                  value={product.detailedDescription}
                  name="detailedDescription" /> 
                </Form.Item>
                <Form.Item label="Photo">
                <Input
                  className="form-control"
                  type="text"
                  onChange={onInputChange}
                  value={product.photo}
                  name="photo" /> 
                </Form.Item>
                 <Form.Item label="Size">
                   <Select onChange={(value)=>{
                           addproductSizeDtos(value)}}>
                           {productSizes.map((size) => ( 
                      <Select.Option key={size.id} value={size.id}>{size.size}</Select.Option>
                     ))}
                   </Select>
                 </Form.Item>
                <Form.Item label="Color">
                  <Select onChange={(value)=>{
                      addproductcolorDtos(value)}}>
                    {productColors.map((color) => ( 
                  <Select.Option key={color.id} value={color.id}>{color.color}</Select.Option>
                ))}
                   </Select>
                </Form.Item>      
                <Form.Item label="Category">
                  <Select  onChange={(value)=>{
                      addCategory(value)}}>     
                    {categories.map((category) => ( 
                      <Select.Option key={category.id} value={category.id}>{category.name}</Select.Option>
                    ))}
                  </Select>
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
