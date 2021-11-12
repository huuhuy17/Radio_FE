import React, {useContext} from 'react';
import {Form, Input, Modal, Select} from 'antd'
import {AppContext} from "../../Context/AppProvider";
import axios from "axios";
import {AppContextChanel} from "../../Context/AppChanel";

const Option = Select
// var arrayTl = []
var idtheloai

// const requetLogin = async () => {
//     const result = await axios.post('http://127.0.0.1:5000/getTheloai')
//     console.log({result})
//     return result
// }
// requetLogin().then(res => {
//     let data = res.data.TheLoai
//     console.log("getTheloai")
//     console.log(data)
//     for (let i = 0; i < res.data.TheLoai.length; i++) {
//         console.log(res.data.TheLoai[i])
//         arrayTl.push(res.data.TheLoai[i])
//     }
// })


export default function AddChanels() {
    const {isAddChanel, setIsAddChanel} = useContext(AppContext);
    const {arrayTl, setListChanel, listTheLoai} = useContext(AppContextChanel)
    const handleOK = () => {
        let tenkenh = form.getFieldsValue().tenkenh;
        let linkPhat = form.getFieldsValue().linkPhat;

        const requetAddchanel = async () => {
            const par = {
                chanel_name: tenkenh,
                idtheLoai: idtheloai,
                Url: linkPhat
            }
            const result = await axios.post('http://127.0.0.1:5000/addChanel', par)
            return result
        }
        requetAddchanel().then(res => {
            console.log("Thêm kênh ok")
            const requetLogin = async () => {
                const result = await axios.post('http://127.0.0.1:5000/getchanel')
                return result
            }

            requetLogin().then(res => {
                console.log(res.data.chanel[0])
                for (let i = 0; i < res.data.chanel.length; i++) {
                    console.log(res.data.chanel[i])
                    setListChanel(res.data.chanel)
                }
            })
        })
        form.resetFields()
        setIsAddChanel(false)


    }
    const handleCancel = () => {
        form.resetFields()
        setIsAddChanel(false)
    }

    function onChange(value) {
        console.log({value});
        idtheloai = value;
    }

    const [form] = Form.useForm();
    return (
        <div>
            <Modal
                title={"Tao Phong"}
                visible={isAddChanel}
                onOk={handleOK}
                onCancel={handleCancel}
            >
                <Form form={form} layout={'vertical'}>
                    <Form.Item label={"Tên Kênh"} name={'tenkenh'}>
                        <Input placeholder={"Nhập tên Kênh"}/>
                    </Form.Item>
                    <Form.Item label={"Link Phát"} name={'linkPhat'}>
                        <Input.TextArea placeholder={"Nhập Link Phát"}/>
                    </Form.Item>
                    <Form.Item label={"Thể Loại"} name={'Theloai'}>
                        <Input.Group>
                            <Select defaultValue="" style={{width: '30%'}} onChange={onChange}>
                                {
                                    listTheLoai.map(value =>
                                        <Option value={value.id}>{value.TenTheLoai}</Option>
                                    )
                                }
                            </Select>
                        </Input.Group>
                    </Form.Item>
                    <Form.Item label={"icon"} name={'icom'}>
                        <Input.TextArea placeholder={"link ảnh"}/>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );

}
