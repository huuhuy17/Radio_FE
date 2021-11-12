import React, {useContext} from 'react';
import {Modal} from 'antd'
import {AppContext} from "../../Context/AppProvider";
import {useHistory} from "react-router-dom"


export default function EditChanel() {
    const history = useHistory();
    const {dangXuat, setDangXuat} = useContext(AppContext);
    const handleOK = () => {
        setDangXuat(false)
        localStorage.removeItem("id")
        history.push('/login')
    }
    const handleCancel = () => {
        setDangXuat(false)
    }

    return (
        <div>
            <Modal
                title={"Bạn có muốn đăng xuất"}
                visible={dangXuat}
                onOk={handleOK}
                onCancel={handleCancel}
            >
            </Modal>
        </div>
    );

}
