import React from 'react';
import {Avatar, Col, Typography} from "antd";
import styled from "styled-components";
import {AppContextChanel} from "../../Context/AppChanel";
import {AppContext} from "../../Context/AppProvider";


const ListChanelStyle = styled.div`
  display: inline-block;
  margin-top: 30px;
  margin-left: 30px;
  overflow: auto;

  .boxChanel {
    border: 1px solid black;
    width: 100px;
    height: 100px;
    border-radius: 20px;
    text-align: center;
    justify-content: center;
  }

  .boxChanel:hover {
    background-color: #d9f6f7;
    box-shadow: 5px 5px 5px #666;
    -moz-box-shadow: 5px 5px 5px #666;
    -webkit-box-shadow: 5px 5px 5px #666;
  }

  .avatarChanel {
    margin-top: 10px;
  }

  .nameChanel {
    margin-top: 10px;
  }
`;


export default function ListChanelUser({name, url1, id}) {

    const {nameChanel, setNameChanel, url, setUrl, setIdChanel} = React.useContext(AppContextChanel)
    const onClickChanel = () => {
        setNameChanel(name)
        setUrl(url1)
        setIdChanel(id)
        console.log({nameChanel})
        console.log({url})
    }

    return (
        <ListChanelStyle>
            <Col span={3}>
                <div className={"boxChanel"} onClick={onClickChanel}>
                    <Avatar className={"avatarChanel"}>{name?.charAt(0).toUpperCase()}</Avatar> <br/>
                    <Typography.Text className={"nameChanel"}>{name}</Typography.Text>
                </div>
            </Col>
        </ListChanelStyle>
    );
}
