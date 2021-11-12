import React, {useContext} from 'react';
import {Form, Input, message, Modal} from 'antd'

import axios from "axios";
import {AppContext} from "../../Context/AppProvider";
import {AppContextChanel} from "../../Context/AppChanel";


export default function Addtheloai() {
    const {theloai, setTheloai, setSelectedTabChanel} = useContext(AppContext)
    const {setListTheLoai} = useContext(AppContextChanel)
    const handleOK = () => {

        console.log({formData: form.getFieldsValue()});
        let tenTl = form.getFieldsValue().tehTL
        console.log({tenTl})
        const par = {
            theloai: tenTl
        }

        const requetLogin = async () => {
            const result = await axios.post('http://127.0.0.1:5000/addtheloai', par)
            console.log({result})
            return result
        }
        requetLogin().then(res => {
            console.log("thêm thành công")
            let daat = res.data
            if (daat === 1) {
                message.success(`successfully added account ${tenTl}`);
                const requetLogin1 = async () => {
                    const result = await axios.post('http://127.0.0.1:5000/getTheloai')
                    console.log({result})
                    return result
                }
                requetLogin1().then(res => {
                    let data = res.data.TheLoai
                    console.log(data)
                    for (let i = 0; i < res.data.TheLoai.length; i++) {
                        console.log(res.data.TheLoai[i])
                        setListTheLoai(res.data.TheLoai)
                    }
                })
            }
        })
        form.resetFields()
        setTheloai(false)
    }
    const handleCancel = () => {
        form.resetFields()
        setTheloai(false)
    }
    const [form] = Form.useForm();
    return (
        <div>
            <Modal
                title={"Thêm thể loại"}
                visible={theloai}
                onOk={handleOK}
                onCancel={handleCancel}
            >
                <Form form={form} layout={'vertical'}>
                    <Form.Item label={"Tên thể loại"} name={'tehTL'}>
                        <Input placeholder={"Nhập tên Kênh"}/>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );

}
