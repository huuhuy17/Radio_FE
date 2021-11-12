import React from 'react';
import Header from "../UserInterFace/header";
import {Col, Row} from "antd";
import SidebarUser from "./sidebarUser";
import ChanelListenRadio from "./ChanelListenRadio";

export default function UserITF() {

    return (
        <div>
            <Header/>
            <div>
                <Row>
                    <Col span={5}>
                        <SidebarUser/>
                    </Col>
                    <Col span={19}>
                        <ChanelListenRadio/>
                    </Col>
                </Row>
            </div>
        </div>
    );

}

