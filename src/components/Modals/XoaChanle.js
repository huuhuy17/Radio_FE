import React, {useContext} from 'react';
import {message, Modal} from "antd";
import {AppContext} from "../../Context/AppProvider";
import {AppContextChanel} from "../../Context/AppChanel";
import axios from "axios";

export default function XoaChanle() {
    const {xoaChanel, setXoachanel} = useContext(AppContext);
    const {ChanelId, setListChanel} = useContext(AppContextChanel)
    const handleOK = () => {
        setXoachanel(false)
        console.log({ChanelId})

        const requetDELchanelyt = async () => {
            const par = {
                idChanel: ChanelId,
            }
            const result = await axios.post('http://127.0.0.1:5000/xoaChanelyt', par)
            return result
        }

        requetDELchanelyt().then(res => {
            const requetDelChanel = async () => {
                const par = {
                    idChanel: ChanelId,
                }
                const result = await axios.post('http://127.0.0.1:5000/xoaChanel', par)
                return result
            }
            requetDelChanel().then(res => {
                console.log(res.data)
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
        })

    }
    const handleCancel = () => {
        setXoachanel(false)
    }
    return (
        <div>
            <Modal
                title={"Bạn có muốn xóa kênh này"}
                visible={xoaChanel}
                onOk={handleOK}
                onCancel={handleCancel}
            >
            </Modal>
        </div>
    );

}

