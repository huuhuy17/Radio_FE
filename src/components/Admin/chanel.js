import React from 'react';
import {Button} from "antd";
import {PlusSquareOutlined} from "@ant-design/icons";
import styled from "styled-components";
import {AppContext} from "../../Context/AppProvider";
import ChanelList from "./ChanelList";
import axios from "axios";
import EditChanel from "../Modals/EditChanel";
import {AppContextChanel} from "../../Context/AppChanel";


var array2 = []
var obj;
const HeaderStyle = styled.div`
  display: flex;
  justify-content: space-between;
  height: 56px;
  padding: 0 16px;
  align-items: center;
  border-bottom: 1px solid rgb(230, 230, 230);

  .header {
    &_info {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    &_title {
      margin: 0;
      font-weight: bold;
    }

    &_decr {
      font-size: 12px;
    }
  }
`;
const ButtonGroupStyle = styled.div`
  align-items: center;
  float: right;
`;
const requetLogin = async () => {
    const result = await axios.post('http://127.0.0.1:5000/getchanel')
    return result
}

requetLogin().then(res => {
    console.log(res.data.chanel[0])
    for (let i = 0; i < res.data.chanel.length; i++) {
        console.log(res.data.chanel[i])
        array2.push(res.data.chanel[i])
    }
})

export default function Chanel() {
    const {setIsAddChanel, setTheloai} = React.useContext(AppContext)
    const {listChanel} = React.useContext(AppContextChanel)
    const handleAddChanel = () => {

        setIsAddChanel(true)
    }
    const handleAddTL = () => {
        setTheloai(true)
    }
    return (
        <div>
            <HeaderStyle>
                <ButtonGroupStyle>
                    <Button type={"text"} onClick={() => {
                        handleAddChanel()
                    }} icon={<PlusSquareOutlined></PlusSquareOutlined>}
                    >Add Chanel</Button>
                    <Button type={"text"} onClick={() => {
                        handleAddTL()
                    }} icon={<PlusSquareOutlined></PlusSquareOutlined>}
                    >Thêm thể loại</Button>
                </ButtonGroupStyle>
            </HeaderStyle>

            {
                listChanel.map(val =>
                    <ChanelList name={val.chanel_name} idChanel={val.id}/>
                )
            }
            <EditChanel/>
        </div>
    );

}

