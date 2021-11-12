import React, {useContext} from 'react';
import {Modal} from "antd";
import {useHistory} from "react-router-dom";
import {AppContext} from "../../Context/AppProvider";
import {AppContextChanel} from "../../Context/AppChanel";
import axios from "axios";

export default function XoaAcc() {
    const history = useHistory();
    const {xoaAcc, setXoaAcc} = useContext(AppContext);
    const {AccId, setListAcc} = useContext(AppContextChanel)
    const handleOK = () => {
        setXoaAcc(false)
        console.log({AccId})
        const requetDelAcc = async () => {
            const par = {
                idAcc: AccId,
            }
            const result = await axios.post('http://127.0.0.1:5000/xoaAcc', par)
            return result
        }

        requetDelAcc().then(res => {
            console.log(res.data)
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
    }
    const handleCancel = () => {
        setXoaAcc(false)
    }

    return (
        <div>
            <Modal
                title={"Bạn có muốn xóa tài khoản này"}
                visible={xoaAcc}
                onOk={handleOK}
                onCancel={handleCancel}
            >
            </Modal>
        </div>
    );
}

