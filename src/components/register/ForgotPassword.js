import { useState } from "react";
import {
    getAuth,
    RecaptchaVerifier,
    signInWithPhoneNumber,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import accountIcon from "../../Icon/user_account_icon.png";
import {Button, Col, Form, Input, Row, Select} from "antd";
import {LockOutlined, PhoneOutlined, UserOutlined} from "@ant-design/icons";
import axios from "axios";

const firebaseConfig = {
    apiKey: "AIzaSyBNjZlL8ZKCWiBqjtIlvQp1v2iIwXb6-dU",
    authDomain: "auth-phone-number-f18bd.firebaseapp.com",
    projectId: "auth-phone-number-f18bd",
    storageBucket: "auth-phone-number-f18bd.appspot.com",
    messagingSenderId: "337191262973",
    appId: "1:337191262973:web:0cad9f03d989343561fc94"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default function App() {
    const [state, setState] = useState();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const getUsername = (e) => {
        setUsername(e.target.value)
    }
    const getPassword = (e) => {
        setPassword(e.target.value)
    }

    const [phone, setPhone] = useState()
    const getPhone = (e) => {
        setPhone(e.target.value)
    }
    // const handelChange = (e) => {
    //     const { name, value } = e.target;
    //     setState({
    //         [name]: value
    //     });
    // };

    const changePass = () => {
        const request = async () => {
            const data = {
                username: username,
                newpassword: password,
            };
            return await axios.post("http://127.0.0.1:5000/forgotpassword", data);
        }
    }

    const auth = getAuth(app);
    const configureCaptcha = () => {
        // const auth = getAuth()
        console.log("auth", auth);

        auth.settings.appVerificationDisabledForTesting = true;
        window.recaptchaVerifier = new RecaptchaVerifier(
            "sign-in-button",
            {
                size: "invisible",
                defaultCountry: "VN"
            },
            auth
        );
    };

    const onSignInSubmit = (e)=>{
        e.preventDefault();
        configureCaptcha();
        auth.settings.appVerificationDisabledForTesting = false;
        let phoneNumber = phone - "0" ;
        phoneNumber = "+84" + phoneNumber
        console.log(phoneNumber);
        const appVerifier = window.recaptchaVerifier;

        console.log("appVerifier", appVerifier);

        signInWithPhoneNumber(auth,phoneNumber, appVerifier)
            .then((confirmationResult) => {

                window.confirmationResult = confirmationResult;
                alert("OTP has been sent");

            })
            .catch((error) => {

                alert("sms not send");

                console.log(error);

            });
    };
    function onSubmitOTP(e){
        e.preventDefault();
        let code = state.otp;
        console.log("OTP typed is: ",code)
        window.confirmationResult.confirm(code).then((result) => {
            const user = result.user;
            console.log(JSON.stringify(user))
            alert("Đã xác minh!")

        }).catch((error) =>{
            console.log(error)
            alert("Lỗi xác minh!")
        })
    }
    return (
        <div className="App">
            {/*<h2>Forgot Password</h2>*/}
            {/*<form onSubmit={onSignInSubmit}>*/}
            {/*    <div id="sign-in-button"/>*/}
            {/*    <input*/}
            {/*        type="number"*/}
            {/*        name="mobile"*/}
            {/*        placeholder="Mobile number"*/}
            {/*        required*/}
            {/*        onChange={handelChange}*/}
            {/*    />*/}
            {/*    <button type="submit" >*/}
            {/*        submit*/}
            {/*    </button>*/}
            {/*</form>*/}

            {/*<h2>Enter OTP </h2>*/}
            {/*<form onSubmit={onSubmitOTP}>*/}
            {/*    <input type="number" name="otp" placeholder="OTP number" required onChange={handelChange}/>*/}
            {/*    <button type="submit">submit</button>*/}
            {/*</form>*/}
            <div className='login-components'>
            <div className='container-login'>
                <div>
                    <img src={accountIcon} style={{width: 50, height: 50, marginTop: 10}}/>
                </div>
                <span>
                    Quên mật khẩu
                </span>
                <Row justify={"center"}>
                    <Col span={10}>
                        <Form
                            name="normal_login"
                            className="login-form"
                            initialValues={{
                                remember: true,
                            }}
                            onSubmit={onSignInSubmit}
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
                                        message: 'Please input your new password!',
                                    },
                                ]}
                            >
                                <Input.Password
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="New password"
                                    onChange={getPassword}
                                    required
                                />
                            </Form.Item>
                            <Form.Item
                                name="mobile"
                                type="number"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Phone number!',
                                    },
                                ]}
                            >
                                <Input prefix={<PhoneOutlined />} placeholder="Nhập số điện thoại"
                                       onChange={getPhone}
                                       required
                                />
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    htmlType="submit"
                                >
                                    Nhận OTP
                                </Button>
                            </Form.Item>
                        </Form>

                        <Form>
                            <Form.Item
                                name="role"
                                label="OTP"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input OTP!',
                                    },
                                ]}
                            >
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="text"
                                    placeholder="Nhập mã OTP"
                                    // onChange={getPassword}
                                    required
                                />
                            </Form.Item>

                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="login-form-button"
                                >
                                    Xác minh
                                </Button>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </div>
             </div>
        </div>
    );
}