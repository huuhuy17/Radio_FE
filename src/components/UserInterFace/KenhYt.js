import React from 'react';
import {Col, Row} from "antd";
import ListChanelUser from "./ListChanelUser";
import RadioPlay from "./RadioPlay";
import axios from "axios";
import {HeartOutlined} from "@ant-design/icons";
import styled from "styled-components";


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
      font-size: 15px;
    }

    &_decr {
      font-size: 12px;
    }
  }
`;
const ListStlyle = styled.div`
  overflow: auto;
`;
export default function KenhYt() {
    let id = localStorage.getItem("id")
    const [listYt, setListYt] = React.useState([])

    React.useEffect(() => {
        const requetChanelYT = async () => {
            const par = {
                idUser: id,
            }
            const result = await axios.post('http://127.0.0.1:5000/getchanelYt', par)
            return result
        }

        requetChanelYT().then(res => {
            console.log("yêu thích")
            console.log(res.data.ChanelYT)
            setListYt(res.data.ChanelYT)
        })
    }, [id])
    console.log({listYt})


    return (
        <div>
            <HeaderStyle>
                <div className={"header_info"}>
                    <p className={"header_title"}><HeartOutlined/> Kênh Yêu Thích </p>
                </div>
            </HeaderStyle>

                <Row>
                    <Col span={15}>
                        {
                            listYt.map(value =>
                                <ListChanelUser id={value.id} name={value.chanel_name} url1={value.Url}/>
                            )
                        }
                    </Col>
                    <Col span={9}>
                        <RadioPlay/>
                    </Col>
                </Row>

        </div>
    );

}
