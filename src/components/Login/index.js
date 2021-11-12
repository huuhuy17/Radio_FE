import React, {useState} from 'react';
import {Button, Checkbox, Col, Form, Input, Row, Typography} from 'antd';
import {useHistory} from 'react-router-dom'
import axios from 'axios'
import {AppContextChanel} from "../../Context/AppChanel";

const {Title} = Typography;


export default function Login() {
    const [inputValue, setInputValue] = useState()
    const [password, setPassword] = useState()
    const {setIdAcc} = React.useContext(AppContextChanel)
    const history = useHistory()
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };
    const handleInputChange1 = (e) => {
        setPassword(e.target.value);
    };

    const logIn = () => {
        const requetLogin = async () => {
            const param = {
                username: inputValue,
                password: password
            }
            const result = await axios.post('http://127.0.0.1:5000/logIn', param)
            console.log({result})
            return result
        }

        requetLogin().then(res => {
            console.log(res.data.quyen)
            console.log(res.data.id)
            setIdAcc(res.data.id)
            localStorage.setItem("id", res.data.id)
            let Q = res.data.quyen
            if (Q === "Admin") {
                history.push('/admin')
            } else if (Q === "User") {
                history.push('/user')
            } else {
                history.push('/')
            }
        })
    }

    console.log({inputValue})
    console.log({password})
    return (
        <div>
            <Row justify={"center"} style={{height: 800}}>
                <Col span={8}>
                    <Title style={{textAlign: 'center'}} level={3}>Radio Online</Title>
                    <Form name="basic" labelCol={{span: 8,}} wrapperCol={{span: 16,}} initialValues={{remember: true,}}>
                        <Form.Item
                            label="Username"
                            name="username"
                            rules={[{required: true, message: 'Please input your username!',},]}
                        >
                            <Input onChange={handleInputChange}/>
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{required: true, message: 'Please input your password!',},]}
                        >
                            <Input.Password onChange={handleInputChange1}/>
                        </Form.Item>

                        <Form.Item
                            name="remember"
                            valuePropName="checked"
                            wrapperCol={{offset: 8, span: 16,}}
                        >
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <Form.Item wrapperCol={{offset: 8, span: 16,}}>
                            <Button onClick={() => {
                                logIn()
                            }}>Log In</Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>


            {'>'}
        </div>
    );
}

