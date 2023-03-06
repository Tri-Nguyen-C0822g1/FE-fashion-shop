import { Layout, Menu, theme } from 'antd';
import {  UsergroupAddOutlined, UserSwitchOutlined } from '@ant-design/icons';
const { Header} = Layout;

const items = [
    {
        text:'About us',
        icon:<UsergroupAddOutlined/>,
        children:[
            {
                text:'Thanh',
                icon:<UserSwitchOutlined/>,
                link:'https://www.facebook.com/vuthanhvps'
            },
            {
                text: 'Tri',
                icon:<UserSwitchOutlined/>,
                link:'https://www.facebook.com/profile.php?id=100004737004508'
            },
            {
                text: 'Tín',
                icon:<UserSwitchOutlined/>,
                link:''
            },
            {
                text: 'Quân',
                icon:<UserSwitchOutlined/>,
                link:''
            }
        ]
    }
]




const NavBar = () => {

  return (
      <Header  style={{float:"right"}}>
         <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
      {items.map((item, index) => (
        <Menu.SubMenu key={`${index}`} icon={item.icon} title={item.text}>
          {item.children.map((child, childIndex) => (
            <Menu.Item 
              key={`${index}-${childIndex}`} 
              icon={child.icon}
              onClick={() => {
                window.location.href=(`${child.link}`)
              }}  
            >
              {child.text}
            </Menu.Item>
          ))}
        </Menu.SubMenu>
      ))}
    </Menu>
      </Header>
      
  );
};
export default NavBar;

