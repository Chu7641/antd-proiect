import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import axios from "axios";
import React from 'react';
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";

function Login(props) { 
    let history = useHistory();
    const goToSignup=()=>{
        history.push("/signup")
    }
   
    const [cookies,setCookie]=useCookies(['access_token','user_info','user_name']);
    function onFinish  (values) {
        const data = {
            email: values.username,
            password: values.password,
          };
        const config = {
            headers: {
              Accept: "application/json",
              "Content-type": "application/json",
              "X-Requested-With": "XMLHttpRequest",
            },
          };
          let url ='http://api.thuematbang24h.com/api/auth/login';
          try {
            return axios(url, {
              method: "POST",
              data: data,
              config,
            })
              .then((res) => {
                if (res.status === 200) {
                  setCookie("access_token", res.data.access_token, { path: "/" });
                  setCookie("user_info", res.data.user, { path: "/" });
                  setCookie("user_name",res.data.user.name);
                  history.push("/");
                } else {
                  alert("tài khoản hoặc mật khẩu không đúng");
                }
              })
              .catch((err) => {
                alert("tài khoản hoặc mật khẩu không đúng");
                console.log(err);
              });
          } catch (err) {
            alert("tài khoản hoặc mật khẩu không đúng");
            console.log(err);
          }
        console.log('Received values of form: ', values.username);
    };
    return (
        <div>
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
            >
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Username!',
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Password!',
                            
                        },
                    ]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <a className="login-form-forgot" href="">
                        Forgot password
        </a>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
        </Button>
        Or <a onClick={goToSignup} href="">register now!</a>
                </Form.Item>
            </Form>
        </div>
    );
}

export default Login;