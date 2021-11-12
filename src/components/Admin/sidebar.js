import React, {useContext} from 'react';
import {Row, Col, Button} from "antd";
import styled from "styled-components";
import {AppContext} from "../../Context/AppProvider";
import {useHistory} from 'react-router-dom'

const SidebarStyled = styled.div`
  background-color: #445760;
  color: #1a1b1b;
  height: 100vh;

  .chanel {
    width: 100%;
    margin-bottom: 3px;
  }
`;


export default function Sidebar() {
    const history = useHistory();
    const {setSelectedTabChanel, setSelectedTabAcc, setDangXuat} = useContext(AppContext);

    const dangXuat = () => {
        setDangXuat(true)
    }

    function handleOnSb() {
        setSelectedTabChanel(false)
        setSelectedTabAcc(true)
    }

    function handleOnSb1() {
        setSelectedTabChanel(true)
        setSelectedTabAcc(false)
    }

    return (
        <SidebarStyled>
            <Row>
                <Col span={24}>
                    <Button className={"chanel"} onClick={() => {
                        handleOnSb1()
                    }}>Quản lý Kênh</Button>
                </Col>
                <Col span={24}>
                    <Button className={"chanel"} onClick={() => {
                        handleOnSb()
                    }}>Quản tài khoản</Button>
                </Col>

                <Col span={24}>
                    <Button className={"chanel"} onClick={dangXuat}>Đăng xuất</Button>
                </Col>
            </Row>
        </SidebarStyled>
    );
}

