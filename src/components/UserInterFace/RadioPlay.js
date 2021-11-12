import React from 'react';
import {Avatar, Button, Col, Typography} from "antd";
import styled from "styled-components";
import {AppContextChanel} from "../../Context/AppChanel";
import {HeartOutlined, PauseCircleOutlined, PlayCircleOutlined} from '@ant-design/icons'
import {AppContext} from "../../Context/AppProvider";
import axios from "axios";


const StyleRadio = styled.div`
  margin-top: 30px;
  text-align: center;
  border: 1px solid black;
  width: 70%;
  height: 300px;
  background-color: aliceblue;
  border-radius: 30px;

  .Chanel {
    text-align: center;
    justify-content: center;
    margin-top: 20px;
    margin-left: 50px;
  }

  .avatarChanel {
    width: 100px;
    height: 100px;
    text-align: center;
  }

  .NameChanel {
    font-weight: bold;
    font-size: 20px;
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .btn {
    width: 100px;
    height: 40px;
    margin-top: 20px;
    font-size: 20px;
  }

  .btn:hover {
    background-color: azure;
  }

  .kyt {
    margin-top: 20px;
    font-size: 30px;
  }
`;


export default function RadioPlay() {
    const {url, nameChanel, setIdChanel} = React.useContext(AppContextChanel)
    const {setIskenhyt} = React.useContext(AppContext)
    const [audioStatus, setAudioStatus] = React.useState(false)
    const {idChanel} = React.useContext(AppContextChanel)
    const myRef = React.useRef()


    const startAudio = () => {
        myRef.current.play()
        setAudioStatus(true)
        let id = localStorage.getItem("id")
        const requeHistory = async () => {
            const par = {
                id_user: id,
                id_chanel: idChanel
            }
            const result = await axios.post('http://127.0.0.1:5000/addHistory', par)
            return result
        }
        requeHistory().then(res => {
            console.log("thêm lịch sử")
        })
    }

    const pauseAudio = () => {
        myRef.current.pause();
        setAudioStatus(false)
    }

    const onClickKyt = () => {
        console.log("ádsadasdasd");
        setIskenhyt(true)
    }
    return (
        <StyleRadio>
            <Col span={20}>
                <div className={"Chanel"}>
                    <Avatar className={"avatarChanel"}>{nameChanel?.charAt(0).toUpperCase()}</Avatar> <br/>
                    <Typography.Text className={"NameChanel"}>{nameChanel}</Typography.Text><br/>

                    <audio
                        ref={myRef}
                        // src={"http://streaming.tdiradio.com:8000/house.mp3"}
                        src={url}
                    />
                    {
                        audioStatus ? (
                            <Button className={"btn"} onClick={pauseAudio}><PauseCircleOutlined/></Button>
                        ) : (
                            <Button className={"btn"} onClick={startAudio}><PlayCircleOutlined/></Button>
                        )
                    }
                    <br/>
                    <HeartOutlined className={"kyt"} onClick={() => onClickKyt()}/>
                </div>
            </Col>
        </StyleRadio>
    );

}