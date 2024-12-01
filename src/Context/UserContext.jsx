/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export let UserContext = createContext()

export default function UserContextProdiver(props) {
    
    const [userLogin, setuserLogin] = useState(
        localStorage.getItem("userToken") ? localStorage.getItem("userToken") : null
    )


    return (
        <UserContext.Provider value={ {userLogin , setuserLogin} }>
            {props.children}
        </UserContext.Provider>
    );
}