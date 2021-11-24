import "./Login.css";
import axios from "axios";
import {useHistory} from "react-router-dom";
import 'antd/dist/antd.css';
import {Button, Checkbox, Col, Form, Input, Row} from 'antd';
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import accountIcon from '../../Icon/user_account_icon.png'
import radioIcon from "../../Icon/Circle-icons-radio.svg"
import {useState} from "react";
import api from "../api";

function Login() {
  const history = useHistory();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const getUsername = (e) => {
    setUsername(e.target.value)
  }
  const getPassword = (e) => {
    setPassword(e.target.value)
  }
  const Submit = () => {
    const loginChatApp = async () => {
      const data = {
        username: username,
        password: password,
      };
      return await axios.post(api + "/login", data);
    };
    loginChatApp().then((res) => {
      if(res.data != null){
        const type = res.data.acc_type;
        document.cookie = res.data.id;
        if (type === 1) {
          history.push("/admin");
          alert("Bạn đã đăng nhập thành công với tư cách quản trị viên!");
        } else if(type === 0){
          history.push("/client");
          alert("Bạn đã đăng nhập thành công với tư cách người dùng!");
        }
      }
      else {
        alert("Tài khoản hoặc mật khẩu không đúng!")
      }
    }).catch((error) =>{
      alert("Xảy ra lỗi. Vui lòng thử lại!")
    });
  };

  return (
      <div className='login-components'>
        <div className='container-login'>
          <div style={{marginTop: 20}}>
            <img src={radioIcon} style={{width: 50}}/>
            <span className="radio-title">
            RADIO ONLINE
          </span>
          </div>

          <div>
            <img src={accountIcon} style={{width: 50, height: 50, marginBottom: 20}} alt="account-icon"/>
          </div>
          <span>
            Đăng nhập
          </span>
          <Row justify={"center"}>
            <Col span={10}>
              <Form
                  name="normal_login"
                  className="login-form"
                  initialValues={{
                    remember: true,
                  }}
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
                  <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username"
                         onChange={getUsername}
                         required
                  />
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
                  <Input.Password
                      prefix={<LockOutlined className="site-form-item-icon" />}
                      type="password"
                      placeholder="Password"
                      onChange={getPassword}
                      required
                  />
                </Form.Item>
                <Form.Item>
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                  </Form.Item>

                  <a className="login-form-forgot" href="" onClick={()=>{history.push('/forgot')}}>
                    Forgot password
                  </a>
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit" className="login-form-button" onClick={()=>Submit()}>
                    Log in
                  </Button>
                  Or <a href="" onClick={()=>{history.push('/register')}}>register now!</a>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </div>
      </div>
  );
}

export default Login;
