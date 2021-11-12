import React, {useContext} from 'react';
import {Form, Input, message, Modal, Select} from 'antd'
import {AppContext} from "../../Context/AppProvider";
import axios from "axios";
import {useHistory} from 'react-router-dom'
import {AppContextChanel} from "../../Context/AppChanel";

const Option = Select
var quyen;

export default function AddAccount() {
    const {isAddAcc, setIsAddAcc} = useContext(AppContext);
    const {aray3, setListAcc, listAcc} = useContext(AppContextChanel)
    const history = useHistory()
    const handleOK = () => {
        console.log({formData: form.getFieldsValue()});
        let user = form.getFieldsValue().username;
        let email = form.getFieldsValue().email;
        let password = form.getFieldsValue().matKhau;
        console.log({quyen})
        console.log({email})
        console.log({password})
        console.log({user})
        const requetLogin = async () => {
            const par = {
                username: user,
                password: password,
                email: email,
                quyen: quyen
            }
            const result = await axios.post('http://127.0.0.1:5000/signUp', par)
            console.log({result})
            return result
        }

        requetLogin().then(res => {
            console.log("vào đấy")
            let daat = res.data
            if (daat === 1) {
                message.success(`successfully added account ${user}`);
                const requetLogin1 = async () => {
                    const result = await axios.post('http://127.0.0.1:5000/getAcc')
                    return result
                }

                requetLogin1().then(res => {
                    console.log(res.data.Acc[0])
                    for (let i = 0; i < res.data.Acc.length; i++) {
                        console.log(res.data.Acc[i])
                        setListAcc(res.data.Acc)
                    }
                })
            }
        })
        console.log({listAcc})
        //resset


        // const requetLogin1 = async () => {
        //     const result = await axios.post('http://127.0.0.1:5000/getAcc')
        //     return result
        // }
        //
        // requetLogin1().then(res => {
        //     console.log(res.data.Acc[0])
        //     for (let i = 0; i < res.data.Acc.length; i++) {
        //         console.log(res.data.Acc[i])
        //         setListAcc(res.data.Acc)
        //     }
        // })
        // console.log(listAcc)

        form.resetFields()
        setIsAddAcc(false)
    }
    const handleCancel = () => {
        form.resetFields()
        setIsAddAcc(false)
    }

    function onChange(value) {
        console.log({value});
        quyen = value;
    }

    const [form] = Form.useForm();
    return (
        <div>
            <Modal
                title={"Add Account"}
                visible={isAddAcc}
                onOk={handleOK}
                onCancel={handleCancel}
            >
                <Form form={form} layout={'vertical'}>
                    <Form.Item label={"Tên Đăng Nhập"} name={'username'}>
                        <Input placeholder={"tên đăng nhập"}/>
                    </Form.Item>
                    <Form.Item label={"Email"} name={'email'}>
                        <Input placeholder={"Email"}/>
                    </Form.Item>
                    <Form.Item label={"Mật Khẩu"} name={'matKhau'}>
                        <Input.Password placeholder={"Mật Khẩu"}/>
                    </Form.Item>
                    <Form.Item label={"Quyền"} name={'quyen'}>
                        <Input.Group>
                            <Select defaultValue="Người dùng" style={{width: '30%'}} onChange={onChange}>
                                <Option value="Admin">Quản Trị</Option>
                                <Option value="User">Người Dùng</Option>
                            </Select>
                        </Input.Group>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );

}
