// import { useState } from "react";
import {
    getAuth,
    RecaptchaVerifier,
    signInWithPhoneNumber,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import accountIcon from "../../Icon/user_account_icon.png";
import {Button, Col, Form, Row, Input} from "antd";
import {LockOutlined, PhoneOutlined, UserOutlined} from "@ant-design/icons";
import axios from "axios";
import {useHistory} from "react-router-dom";
import api from "../api";

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
    let phone = ""
    let username = ""
    let password = ""
    let otp = ""
    const history = useHistory();
    const onFinish = (values) => {
        console.log('Success:', values);
        phone = values.phone
        username = values.username
        password = values.password
        console.log(phone, username, password)
        onSignInSubmit();
    };

    const onFinish1 = (values) => {
        console.log(values)
        otp = values.otp
        console.log(otp)
        onSubmitOTP()
    }

    const changePass = () => {
        const request = async () => {
            const data = {
                username: username,
                newpassword: password,
            };
            return await axios.post(api + "/forgotpassword", data);
        }
        request().then((res) => {
            console.log(res.data)
            if(res.data === "DONE") {
                alert("Xác thực thành công! Tài khoản của bạn đã được đặt mật khẩu mới!")
                history.push('/login')
            }
        }).catch((error) =>{
            console.log(error)
            alert("Xảy ra lỗi! Vui lòng thử lại!")
        })
    }

    const auth = getAuth(app);
    const configureCaptcha = () => {
        // console.log("auth", auth);
        auth.settings.appVerificationDisabledForTesting = false;
        window.recaptchaVerifier = new RecaptchaVerifier(
            "sign-in-button",
            {
                size: "visible",
                defaultCountry: "VN"
            },
            auth
        );
    };

    const onSignInSubmit = (e)=>{
        // e.preventDefault();
        configureCaptcha();
        // auth.settings.appVerificationDisabledForTesting = false;
        let phoneNumber = phone - "0" ;
        phoneNumber = "+84" + phoneNumber
        console.log(phoneNumber);
        const appVerifier = window.recaptchaVerifier;
        signInWithPhoneNumber(auth,phoneNumber, appVerifier)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
                alert("OTP đã được gửi!");
            })
            .catch((error) => {
                alert("Lỗi gửi OTP!");
                console.log(error);

            });
    };
    function onSubmitOTP(e){
        let code = otp;
        console.log("OTP typed is: ",code)
        window.confirmationResult.confirm(code).then((result) => {
            changePass();
        }).catch((error) =>{
            console.log(error)
            alert("Xác thực thất bại!")
        })
    }
    return (
        <div className="App">
            <div className='login-components'>
            <div className='container-login'>
                <div>
                    <img src={accountIcon} style={{width: 50, height: 50, marginTop: 10}} alt=""/>
                </div>
                <span>
                    Quên mật khẩu
                </span>
                <Row justify={"center"}>
                    <Col span={10}>
                        <Form
                            name="normal_login"
                            className="login-form"
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
                                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username"
                                       // onChange={getUsername}
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
                                />
                            </Form.Item>
                            <Form.Item
                                name="phone"
                                type="number"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Phone number!',
                                    },
                                ]}
                            >
                                <Input prefix={<PhoneOutlined />} placeholder="Nhập số điện thoại"
                                       name="mobile"
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

                        <Form onFinish={onFinish1}>
                            <Form.Item
                                name="otp"
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
            <div style={{display: 'flex',justifyContent: 'center'}}>
                <div id="sign-in-button" />
            </div>
        </div>
    );
}