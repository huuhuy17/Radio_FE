import React from 'react';
import {Col} from 'antd'
import styled from "styled-components";

const HeaderStyle = styled.div`
  background-color: antiquewhite;
  height: 50px;
  
  .home{
    font-size: 20px;
    font-weight: bold;
    margin-left: 20px;
    padding: 10px;
  }
`;


export default function Header() {
    return (
        <HeaderStyle>
            <Col span={24}>
                <p className={"home"}>Home Admin</p>
            </Col>
        </HeaderStyle>
    );
}
