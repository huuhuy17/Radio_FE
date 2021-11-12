import React, {useState} from 'react';
import axios from "axios";

export const AppContextChanel = React.createContext();
var arrayTl = []
var arrayChanel = []
var aray3 = []
const requetLogin = async () => {
    const result = await axios.post('http://127.0.0.1:5000/getTheloai')
    console.log({result})
    return result
}
requetLogin().then(res => {
    let data = res.data.TheLoai
    console.log(data)
    for (let i = 0; i < res.data.TheLoai.length; i++) {
        console.log(res.data.TheLoai[i])
        arrayTl.push(res.data.TheLoai[i])
    }
})


export default function AppChanel({children}) {
    const [AccId, setAccId] = useState('')
    const [ChanelId, setChanelId] = useState('')
    const [Idtheloai, setIdtheLoai] = useState('')
    const [tenTheloai, setTenTheLoai] = useState('')
    const [list, setList] = React.useState([])
    const [listAcc, setListAcc] = React.useState([])
    const [listChanel, setListChanel] = React.useState([])
    const [listTheLoai, setListTheLoai] = React.useState([])
    const [nameChanel, setNameChanel] = useState('')
    const [url, setUrl] = useState('')
    const [idAcc, setIdAcc] = useState('')
    const [idChanel, setIdChanel] = useState('')
    // console.log({arrayChanel})
    // while (arrayChanel.length) {
    //     arrayChanel.pop()
    // }

    React.useEffect(() => {
        const requetChanel = async () => {
            const par = {
                idTl: Idtheloai
            }
            const result = await axios.post('http://127.0.0.1:5000/getchanelbytl', par)
            return result
        }
        requetChanel().then(res => {
            let data = res.data.chanelbyTl
            console.log(data)
            setList(res.data.chanelbyTl)
        })
    }, [Idtheloai])
    console.log({list})

    return (
        <AppContextChanel.Provider value={{
            AccId,
            setAccId, ChanelId, setChanelId, arrayTl, Idtheloai,
            setIdtheLoai, arrayChanel, tenTheloai, setTenTheLoai, list,
            nameChanel, setNameChanel, url, setUrl, idAcc, setIdAcc,
            idChanel, setIdChanel, aray3, listAcc, setListAcc, listChanel,
            setListChanel, listTheLoai, setListTheLoai
        }}>
            {children}
        </AppContextChanel.Provider>
    );
}

