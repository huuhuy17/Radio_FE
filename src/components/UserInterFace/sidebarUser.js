import React, {useContext} from 'react';
import {Button, Col, Row} from "antd";
import styled from "styled-components";
import {AppContext} from "../../Context/AppProvider";
import TheLoaiList from "./TheLoaiList";
import {useHistory} from 'react-router-dom'


const SidebarStyled = styled.div`
  background-color: #445760;
  color: #1a1b1b;
  height: 100vh;

  .Tl {
    width: 100%;
    margin-bottom: 3px;
  }
`;
const MessListStyle = styled.div`
  max-height: 30%;
  overflow-y: auto;
`;

export default function SidebarUser() {
    const history = useHistory()
    const {setDangXuat, setKenhYt, setListviewChanel, setLichsuNghe} = useContext(AppContext);


    const dangXuat = () => {
        setDangXuat(true)
    }
    const KenhyeuThic = () => {
        setKenhYt(true)
        setListviewChanel(false)
        setLichsuNghe(false)
    }
    const LichSuNghe = () => {
        setLichsuNghe(true)
        setKenhYt(false)
        setListviewChanel(false)
    }

    return (
        <SidebarStyled>
            <Row>
                <Col span={24}>
                    <Button className={"Tl"} onClick={dangXuat}>Đăng xuất</Button>
                </Col>
                <Col span={24}>
                    <Button className={"Tl"} onClick={KenhyeuThic}>Kênh yêu thích</Button>
                </Col>
                <Col span={24}>
                    <Button className={"Tl"} onClick={LichSuNghe}>Lịch sử nghe</Button>
                </Col>
                <MessListStyle>
                    <Col span={24}>
                        <TheLoaiList/>
                    </Col>
                </MessListStyle>

            </Row>
        </SidebarStyled>
    );

}

