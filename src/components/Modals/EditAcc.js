import React, {useContext} from 'react';
import {Form, Input, message, Modal, Select} from "antd";
import {AppContext} from "../../Context/AppProvider";
import {AppContextChanel} from "../../Context/AppChanel";
import axios from "axios";

const Option = Select
var quyen;
export default function EditAcc() {
    const [form] = Form.useForm();
    const {AccId, setListAcc} = useContext(AppContextChanel)
    const {setEditAcc, editAcc} = useContext(AppContext);
    const handleOK = () => {
        console.log({formData: form.getFieldsValue()});
        console.log("id acc")
        console.log({AccId})
        let user = form.getFieldsValue().username;
        let email = form.getFieldsValue().email;
        let password = form.getFieldsValue().password;

        const requetLogin = async () => {
            const par = {
                username: user,
                password: password,
                email: email,
                quyen: quyen,
                idAcc : AccId
            }
            const result = await axios.post('http://127.0.0.1:5000/editAcc', par)
            console.log({result})
            return result
        }

        requetLogin().then(res => {
            console.log("sửa ok")
            message.success(`successfully`);

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
        })

        form.resetFields()
        setEditAcc(false)
    }
    const handleCancel = () => {
        form.resetFields()
        setEditAcc(false)
    }
    function onChange(value) {
        console.log({value});
        quyen = value;
    }
    return (
        <div>
            <Modal
                title={"Edit Account"}
                visible={editAcc}
                onOk={handleOK}
                onCancel={handleCancel}
            >
                <Form form={form} layout={'vertical'}>
                    <Form.Item label={"Username"} name={'username'}>
                        <Input placeholder={"Username"} />
                    </Form.Item>
                    <Form.Item label={"password"} name={'password'}>
                        <Input placeholder={"password"} />
                    </Form.Item>
                    <Form.Item label={"Email"} name={'email'}>
                        <Input placeholder={"Email"} />
                    </Form.Item>
                    <Form.Item label={"quyền"} name={'quyen'}>
                        <Input.Group>
                            <Select defaultValue='' style={{width: '30%'}} onChange={onChange}>
                                <Option value={"Admin"}>Admin</Option>
                                <Option value={"User"}>Người dùng</Option>
                            </Select>
                        </Input.Group>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );

}

