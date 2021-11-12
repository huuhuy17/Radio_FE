import React, {useState} from 'react';

export const AppContext = React.createContext();
export default function AppProvider({children}) {
    const [selectedTabChanel, setSelectedTabChanel] = useState(false);
    const [selectedTabAcc, setSelectedTabAcc] = useState(false);
    const [isAddChanel, setIsAddChanel] = useState(false);
    const [isAddAcc, setIsAddAcc] = useState(false);
    const [editchanel, setEditchanel] = useState(false);
    const [dangXuat, setDangXuat] = useState(false);
    const [theloai, setTheloai] = useState(false);
    const [xoaAcc, setXoaAcc] = useState(false)
    const [xoaChanel, setXoachanel] = useState(false);
    const [editAcc, setEditAcc] = useState(false);
    const [isresult, setIsresult] = useState(false)
    const [isKenhyt, setIskenhyt] = useState(false)
    const [kenhYt, setKenhYt] = useState(false)
    const [listviewChanel, setListviewChanel] = useState(false)
    const [lichsuNghe, setLichsuNghe] = useState(false)


    return (
        <AppContext.Provider value={{
            selectedTabChanel, setSelectedTabChanel, selectedTabAcc, setSelectedTabAcc,
            isAddChanel, setIsAddChanel, isAddAcc, setIsAddAcc, editchanel, setEditchanel,
            dangXuat, setDangXuat, theloai, setTheloai, xoaAcc, setXoaAcc, xoaChanel, setXoachanel,
            editAcc, setEditAcc,isresult, setIsresult, isKenhyt, setIskenhyt, kenhYt, setKenhYt,
            listviewChanel, setListviewChanel, lichsuNghe, setLichsuNghe
        }}>
            {children}
        </AppContext.Provider>
    );
}

