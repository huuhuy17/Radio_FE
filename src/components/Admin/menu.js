import React, {useContext} from 'react';
import Chanel from "./chanel";
import {AppContext} from "../../Context/AppProvider";
import AccountManager from "./accountManager";


export default function Menu() {
    const {selectedTabChanel, selectedTabAcc} = useContext(AppContext);
    console.log({selectedTabChanel})
    return (
        <div>
            {
                selectedTabChanel ? (
                    <Chanel/>
                ) : null
            }
            {
                selectedTabAcc ? (
                    <AccountManager/>
                ) : null
            }

        </div>
    );
}

