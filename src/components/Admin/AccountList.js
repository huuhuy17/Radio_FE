import React, {useContext} from 'react';
import {Avatar, Button, Col, Row, Typography} from "antd";
import styled from "styled-components";
import {AppContext} from "../../Context/AppProvider";
import {AppContextChanel} from "../../Context/AppChanel";
import EditAcc from "../Modals/EditAcc";


const ChanelStyle = styled.div`
  margin-top: 10px;
  margin-left: 10px;

`;

export default function AccountList({accName, AccPass, AccQuyen, accid}) {
    const {setEditAcc, setXoaAcc} = useContext(AppContext)
    const {setAccId} = useContext(AppContextChanel)
    const onClickxoaAcc = () => {
        setXoaAcc(true)
        setAccId(accid)
    }
    const onClickEditAcc = () => {
        setEditAcc(true)
        setAccId(accid)
    }
    return (
        <div>
            <ChanelStyle>
                <Row>
                    <Col span={4}><Avatar>{accName?.charAt(0).toUpperCase()}</Avatar></Col>
                    <Col span={4}><Typography.Text>{accName}</Typography.Text></Col>
                    <Col span={4}><Typography.Text>{AccPass}</Typography.Text></Col>
                    <Col span={4}><Typography.Text>{AccQuyen}</Typography.Text></Col>
                    <Col span={2}> <Button onClick={onClickEditAcc}>Edit</Button></Col>
                    <Col span={2}> <Button onClick={onClickxoaAcc}>Detele</Button></Col>
                </Row>
                <hr/>
            </ChanelStyle>

        </div>
    );
}

