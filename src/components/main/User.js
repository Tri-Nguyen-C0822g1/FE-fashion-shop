import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Space, theme} from 'antd';
import CustomTable from "../common/Table";

function Users(){

  const {
    token: { colorBgContainer },
  } = theme.useToken();  



    const [users, setUsers] = useState([]);

   const token = localStorage.getItem("accessToken");
   console.log("token 3: " + token);


   const config = {
    'headers': {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  };

    const columns = [
        {
          title: 'ID',
          dataIndex: 'id',
          key: 'id'
        },
        {
            title: 'Avatar',
            dataIndex: 'photo',
            key: 'photo',
            render: (photo) => (
              <img
                src={photo}
                alt="Avatar"
                style={{ width: '70px', height: '70px' }}
              />
            ),
          },
        {
          title: 'Full name',
          dataIndex: 'fullname',
          key: 'fullname',
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
        },
        {
          title: 'Position',
          dataIndex: ['roles', 0, 'description'],
          key: 'role',
        },
        {
          title: 'Username',
          dataIndex: 'username',
          key: 'username',
        },
        {
          title: 'Action',
          key: 'action',
          render: (_, user) => (
            <Space wrap size="middle">
              <a href={`edit-user/${user.id}`}>
                <Button danger>Update</Button>
              </a>
              <a href={`user-detail/${user.id}`}>
                <Button type="primary" ghost>Detail</Button>
              </a>
            </Space>
          ),
        },
      ];
      

    useEffect(() => {
        if (users.length === 0) {
            loadUsers();
        }
    },[users]);

    const loadUsers = async () => {
      console.log(config);
        const result = await axios.get("http://localhost:8080/api/v1/users",  config);
        setUsers(result.data);
        console.log(result.data);
    };

    
    return (
      <div theme='dark'
      style={{
        padding: 24,
        textAlign: 'center',
        background: colorBgContainer,
        marginTop:'10%'
        
      }}
    >
     <CustomTable theme= "dark" data = {users} columns={columns}/>
     </div>

    );
};

export default Users;
