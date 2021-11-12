import React from 'react';
import {Modal} from "antd";
import {AppContext} from "../../Context/AppProvider";
import {AppContextChanel} from "../../Context/AppChanel";
import axios from "axios";

export default function AddKenhYt() {
    const {isKenhyt, setIskenhyt} = React.useContext(AppContext)
    const {idChanel} = React.useContext(AppContextChanel)
    let idAcc = localStorage.getItem("id")
    const handleOK = () => {
        console.log({idAcc})
        console.log({idChanel})
        const requetAddKyt = async () => {
            const par = {
                id_user: idAcc,
                id_chanel: idChanel
            }
            const result = await axios.post('http://127.0.0.1:5000/addchanelYT', par)
            return result
        }
        requetAddKyt().then(res => {
            console.log({res})
        })
        setIskenhyt(false)
    }
    const handleCancel = () => {
        setIskenhyt(false)
    }
    return (
        <div>
            <Modal
                title={"Thêm kênh hiện tại vào danh sách yêu thích"}
                visible={isKenhyt}
                onOk={handleOK}
                onCancel={handleCancel}
            >
            </Modal>
        </div>
    );

}
