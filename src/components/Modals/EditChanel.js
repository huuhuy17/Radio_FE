import React, {useContext} from 'react';
import {Form, Input, message, Modal, Select} from 'antd'
import {AppContext} from "../../Context/AppProvider";
import {AppContextChanel} from "../../Context/AppChanel";
import axios from "axios";

const Option = Select
const a = ['a', 'c']
var idTl;

export default function EditChanel() {
    const {editchanel, setEditchanel} = useContext(AppContext);
    const {arrayTl, setListChanel} = useContext(AppContextChanel)
    const {ChanelId} = useContext(AppContextChanel)
    const handleOK = () => {

        console.log({formData: form.getFieldsValue()});

        let name = form.getFieldsValue().tenkenh;
        let linkPhat = form.getFieldsValue().linkPhat
        const requetLogin = async () => {
            const par = {
                name: name,
                idtheloai: idTl,
                Url: linkPhat,
                idChanel: ChanelId
            }
            const result = await axios.post('http://127.0.0.1:5000/editChanel', par)
            console.log({result})
            return result
        }

        requetLogin().then(res => {
            console.log("sửa ok")
            message.success(`successfully`);
            const requetLogin3 = async () => {
                const result = await axios.post('http://127.0.0.1:5000/getchanel')
                return result
            }

            requetLogin3().then(res => {
                console.log(res.data.chanel[0])
                for (let i = 0; i < res.data.chanel.length; i++) {
                    console.log(res.data.chanel[i])
                    setListChanel(res.data.chanel)
                }
            })
        })
        form.resetFields()
        setEditchanel(false)
    }
    const handleCancel = () => {
        form.resetFields()
        setEditchanel(false)
    }
    const [form] = Form.useForm();

    function onChange(value) {
        console.log({value});
        idTl = value;
    }

    return (
        <div>
            <Modal
                title={"Edit Chanel"}
                visible={editchanel}
                onOk={handleOK}
                onCancel={handleCancel}
            >
                <Form form={form} layout={'vertical'}>
                    <Form.Item label={"Tên Kênh"} name={'tenkenh'}>
                        <Input placeholder={"tên kênh"}/>
                    </Form.Item>
                    <Form.Item label={"link phát"} name={'linkPhat'}>
                        <Input placeholder={"Email"}/>
                    </Form.Item>
                    <Form.Item label={"thể loại"} name={'theloai'}>
                        <Input.Group>
                            <Select defaultValue="" style={{width: '30%'}} onChange={onChange}>
                                {
                                    arrayTl.map(val =>
                                        <Option value={val.id}>{val.TenTheLoai}</Option>
                                    )
                                }
                            </Select>
                        </Input.Group>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );

}
