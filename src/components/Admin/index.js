import React from 'react';
import Header from "./header";
import Sidebar from "./sidebar"
import {Row, Col} from 'antd'
import Menu from "./menu";

export default function Index() {
    return (
        <div>
            <Header/>
            <div>
                <Row>
                    <Col span={5}>
                        <Sidebar/>
                    </Col>
                    <Col span={19}>
                        <Menu/>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

