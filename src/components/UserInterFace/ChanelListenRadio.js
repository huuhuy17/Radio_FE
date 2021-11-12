import React from 'react';
import {Col, Row} from "antd";
import ListChanelUser from "./ListChanelUser";
import RadioPlay from "./RadioPlay";
import {AppContextChanel} from "../../Context/AppChanel";
import styled from "styled-components";
import {AppContext} from "../../Context/AppProvider";
import KenhYt from "./KenhYt";
import LichSuNghe from "./LichSuNghe";

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
export default function ChanelListenRadio() {
    const {arrayChanel, tenTheloai, list} = React.useContext(AppContextChanel)
    const {kenhYt, listviewChanel, lichsuNghe} = React.useContext(AppContext)


    return (
        <>

            {
                kenhYt ? (
                    <KenhYt/>
                ) : null
            }
            {
                listviewChanel ? (
                    <>
                        <HeaderStyle>
                            <div className={"header_info"}>
                                <p className={"header_title"}>Thể loại : {tenTheloai}</p>
                            </div>
                        </HeaderStyle>
                        <Row>
                            <Col span={15}>
                                {
                                    list.map(val => <ListChanelUser name={val.chanel_name} url1={val.Url} id={val.id}/>)
                                }
                            </Col>
                            <Col span={9}>
                                <RadioPlay/>
                            </Col>
                        </Row>
                    </>
                ) : null
            }
            {
                lichsuNghe ? (
                    <LichSuNghe/>
                ) : null
            }


        </>
    );
}