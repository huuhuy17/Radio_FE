import React from 'react';
import {Col, Row} from "antd";
import ListChanelUser from "./ListChanelUser";
import RadioPlay from "./RadioPlay";
import styled from "styled-components";
import {HistoryOutlined} from '@ant-design/icons'
import axios from "axios";

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
export default function LichSuNghe() {

    let id = localStorage.getItem("id")
    const [listlsNghe, setListlsNghe] = React.useState([])
    React.useEffect(() => {
        const requetlsNghe = async () => {
            const par = {
                idUser: id,
            }
            const result = await axios.post('http://127.0.0.1:5000/getchanelhistory', par)
            return result
        }

        requetlsNghe().then(res => {
            console.log(res.data.chanel_history)
            setListlsNghe(res.data.chanel_history)
        })
    }, [id])
    console.log({listlsNghe})
    return (
        <div>
            <HeaderStyle>
                <div className={"header_info"}>
                    <p className={"header_title"}><HistoryOutlined/> Lịch Sử Nghe </p>
                </div>
            </HeaderStyle>
            <Row>
                <Col span={15}>
                    {
                        listlsNghe.map(value =>
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

