/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let CartContext = createContext()

export default function CartContextProvider(props) {
    const [cardId, setcardId] = useState(0)
    const [numderItems, setnumderItems] = useState(0)
    
    let headers = {
        token: localStorage.getItem("userToken"),
    };

    function addProductToCard(productId) {
        return axios
            .post(`https://ecommerce.routemisr.com/api/v1/cart`,
                {
                    productId: productId,
                },
                {
                    headers,
                }
            )
            .then((res) => res)
            .catch((res) => res);
    }

    function getLoggedUserCard() {
        return axios
        .get(`https://ecommerce.routemisr.com/api/v1/cart`,{ headers })
            .then((res) => {
                console.log(res.data.numOfCartItems)
                setnumderItems(res.data.numOfCartItems);
                setcardId(res.data.data._id)
                return res;
            })
        .catch((err)=>err)
    }

    function updataProductToCard(productId ,newCount) {
        return axios
            .put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
            {
                count:newCount
            }
            ,{ headers })
            .then((res) => res)
            .catch((err) => err)
    }

    function deleteProductToCard(productId) {
        return axios
            .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{ headers })
            .then((res) => res)
            .catch((err) => err)
    }

    function chekout(cardId , url , formData) {
        return axios
            .post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cardId}?url=${url}`,
                {
                    shippingAddress : formData
                }, { headers })
            .then((res) => res)
            .catch((err) => err)
    }

    useEffect(() => {
        getLoggedUserCard();
    },[])

    return <CartContext.Provider value={{
        addProductToCard,
        getLoggedUserCard,
        updataProductToCard,
        deleteProductToCard,
        chekout,
        cardId,
        numderItems,
        setnumderItems,
    }}>
        {props.children}
    </CartContext.Provider>
}