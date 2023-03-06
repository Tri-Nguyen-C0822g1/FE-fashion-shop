import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, Space, theme } from "antd";
import CustomTable from "../common/Table";

export default function Products() {
 
  const [products, setProducts] = useState([]);

  const {
    token: { colorBgContainer },
  } = theme.useToken();  

  const columns = [
    {
      title: "ID",
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'Product name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Fabric Material',
      dataIndex: 'fabricMaterial',
      key: 'fabricMaterial'
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price'
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category'
    },
    {
      title: 'Size',
      dataIndex: ['productSizeDtos', 0, 'size'],
      key: 'type'
    },
    {
      title: 'Color',
      dataIndex: ['productColorDtos', 0, 'color'],
      key: 'color'
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, product) => (
        <Space wrap size="middle">
          <a href={`edit-product`}>
            <Button danger>Update</Button>
          </a>
          <a href={`view-product/${product.id}`}>
            <Button type="primary" ghost>View</Button>
          </a>
          <a href={`delete-product/${product.id}`}>
            <Button type="primary" ghost>Delete</Button>
          </a>
        </Space>
      ),
    },
  ]
 
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const result = await axios.get("http://localhost:8001/api/v1/products ");
    setProducts(result.data);
  };

  return (

    <div theme='dark'
    style={{
      padding: 24,
      textAlign: 'center',
      background: colorBgContainer,
      
    }}
  >
   <CustomTable theme= "dark" data = {products} columns={columns}/>
   </div>
  );
  
}
