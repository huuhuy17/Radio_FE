import React, {useContext} from 'react';
import {Button, Collapse} from "antd";
import styled from "styled-components";
import {AppContextChanel} from "../../Context/AppChanel";
import {AppContext} from "../../Context/AppProvider";

const {Panel} = Collapse
const PanelStyle = styled(Panel)`
  &&& {
    .ant-collapse-header, p {
      color: azure;
    }

    .ant-collapse-content-box {
      padding: 0px 40px;
    }

    .add-room {
      color: azure;
      padding: 0px;
    }
  }
`;

export default function TheLoaiList() {
    const {setKenhYt, kenhYt, setListviewChanel, setLichsuNghe} = React.useContext(AppContext)
    const {arrayTl, setIdtheLoai, Idtheloai, setTenTheLoai, arrayChanel, listTheLoai} = useContext(AppContextChanel);
    console.log(Idtheloai)
    return (
        <div>
            <Collapse ghost defaultActivekey={['1']}>
                <PanelStyle header={"Danh sách thể loại"} key={'1'}>
                    {
                        listTheLoai.map(val => <Button className={"Tl"}
                                                       onClick={() => {
                                                           setIdtheLoai(val.id)
                                                           setTenTheLoai(val.TenTheLoai)
                                                           setKenhYt(false)
                                                           setListviewChanel(true)
                                                           setLichsuNghe(false)
                                                       }}

                        >{val.TenTheLoai}</Button>)
                    }
                </PanelStyle>
            </Collapse>
        </div>
    );
}

