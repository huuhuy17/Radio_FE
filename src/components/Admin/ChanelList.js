import React, {useContext} from 'react';
import {Avatar, Button, Col, Row, Typography} from "antd";
import styled from "styled-components";
import {AppContext} from "../../Context/AppProvider";
import {AppContextChanel} from "../../Context/AppChanel";
import EditChanel from "../Modals/EditChanel";

const ChanelStyle = styled.div`
  margin-top: 10px;
  margin-left: 50px;
`;
export default function ChanelList({name, idChanel}) {
    const {setXoachanel, setEditchanel} = useContext(AppContext)
    const {setChanelId} = useContext(AppContextChanel)
    const onClickxoaChanel = () => {
        setXoachanel(true)
        setChanelId(idChanel)
    }
    const onClickEditChanel = () => {
        setEditchanel(true)
        setChanelId(idChanel)
    }

    return (
        <div>
            <ChanelStyle>
                <Row>
                    <Col span={4}><Avatar>{name?.charAt(0).toUpperCase()}</Avatar></Col>
                    <Col span={4}><Typography.Text>{name}</Typography.Text></Col>
                    <Col span={2}> <Button onClick={onClickEditChanel}>Edit</Button></Col>
                    <Col span={2}> <Button onClick={onClickxoaChanel}>Detele</Button></Col>
                </Row>
                <hr/>
            </ChanelStyle>

        </div>
    );

}
