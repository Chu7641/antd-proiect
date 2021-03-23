import {
  HomeOutlined,
  LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined,
  UnorderedListOutlined, UserOutlined, ShoppingCartOutlined
} from '@ant-design/icons';
import { Avatar, Layout, Badge, Menu } from 'antd';
import React, { useState } from 'react';
import { useCookies } from "react-cookie";
import { useHistory } from 'react-router';


const { Header, Sider, Content, Footer } = Layout;

function Main(props) {

  const [cookies, setCookie] = useCookies(['access_token', 'user_info', 'user_name']);
  let history = useHistory();
  const [collapsed, setCoolapsed] = useState(false);
  const { active,count } = props;

  function handleToggle() {
    setCoolapsed(!collapsed)
  }
  const goToLogin = () => {
    history.push("/login")
  }
  const goToListData = () => {
    history.push("/listdata")
  }
  const goToHome = () => {
    history.push("/home")
  }
  const goToPokemon = () => {
    history.push("/pokemon")
  }

  return (
    <Layout >
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={active}>
            <Menu.Item key="1" icon={<HomeOutlined />} onClick={goToHome} >
              Home
          </Menu.Item>
            <Menu.Item key="2" icon={<UnorderedListOutlined />} onClick={goToListData}>
              List Data
          </Menu.Item>
            <Menu.Item key="4" icon={<UnorderedListOutlined />} onClick={goToPokemon}>
              Pokemon
          </Menu.Item>
            <Menu.Item key="3" icon={<LogoutOutlined />} onClick={goToLogin} >
              Logout
          </Menu.Item>
          </Menu>
        </Sider>

        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement({ collapsed } ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger', onClick: handleToggle
            })}
            <div className='cart-pokemon'> <Badge count={count}>
              <a><Avatar style={{ backgroundColor: '#87d068' }} icon={<ShoppingCartOutlined />} /></a>
            </Badge></div>
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            {props.children}
          </Content>
        </Layout>
      </Layout>
      <Layout>
        <Footer style={{ backgroundColor: '#000000', color: '#ffffff' }}>Footer</Footer>
      </Layout>

    </Layout>
  );
}

export default Main;