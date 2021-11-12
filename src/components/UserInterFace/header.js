import React from 'react';
import {Col} from 'antd'
import styled from "styled-components";

const HeaderStyle = styled.div`
  background-color: antiquewhite;
  height: 100px;
  
  .home{
    font-weight: bold;
    font-size: 20px;
    margin-left: 20px;
    padding: 20px;
  }
`;


export default function Header() {

    return (
        <HeaderStyle>
            <Col span={24}>
                <p className={"home"}>Home</p>
            </Col>
        </HeaderStyle>
    );

}
