import 'antd/dist/antd.css';
import {Button, Col, Form, Input, Row, Select,} from 'antd';
import axios from "axios";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import {useHistory} from "react-router-dom";
import {useState} from "react";
import accountIcon from "../../Icon/user_account_icon.png";

const { Option } = Select;
const Register = () => {
    const history = useHistory();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [acctype, setType] = useState()
    const getUsername = (e) => {
        setUsername(e.target.value)
    }
    const getPassword = (e) => {
        setPassword(e.target.value)
    }
    const add_account = () => {
        let user = username;
        let pass = password;
        let type = acctype;

        const add_toDB = async () => {
            const data = {
                username: user,
                password: pass,
                acc_type: type,
            };
            return await axios.post(
                "http://127.0.0.1:5000/addAccount",
                data
            );
        };
        add_toDB().then((res) => {
            console.log(res);
            alert("Thêm tài khoản thành công!");
            history.push('/login')
        });
    };

    return (
        <div className='login-components'>
            <div className='container-login'>
                <div>
                    <img src={accountIcon} style={{width: 50, height: 50, marginTop: 60, marginBottom: 20}}/>
                </div>
                <span>
                    Đăng ký tài khoản
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
                                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username or Phone number"
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

                            <Form.Item
                                name="role"
                                label="Role"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please select role!',
                                    },
                                ]}
                            >
                                <Select
                                    placeholder="Select your role"
                                    onChange={(value) => {setType(value)}}
                                >
                                    <Option value="1">Admin</Option>
                                    <Option value="0">User</Option>
                                </Select>
                            </Form.Item>

                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="login-form-button"
                                    onClick={() => {add_account()}}
                                >
                                    Register
                                </Button>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default Register;