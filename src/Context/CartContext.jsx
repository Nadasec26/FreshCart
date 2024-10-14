import axios from "axios";
import { createContext, useEffect, useState } from "react";




export let CartContext = createContext();

export default function CartContextProvider(props){

    const [cartId, setcartId] = useState(0)
    const [numberItems, setnumberItems] = useState(0)
    const [count, setcount] = useState(0)

    let headers = {
        token : localStorage.getItem("userToken"),
    };

    function addProdToCart(productId){
        return  axios.post(`https://ecommerce.routemisr.com/api/v1/cart` , {productId : productId}, {
            headers,
        }).then((res) => res).catch((err) => err);
    }

    function getLoggedCart(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {headers})
        .then((res) => {
            // console.log(res.data.numOfCartItems);
            setnumberItems(res.data.numOfCartItems)
            setcartId(res.data.data._id)
            return res
        }).catch((err) => err );
    }

    function updateCartProduct(productId, newCount){
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { count : newCount } , {headers})
        .then((res) => res ).catch((err) => err );
    }

    function deleteCartItems(productId){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{headers})
        .then((res) => res).catch((err) => err);
    }
    function checkout(cardId , url , formData) {
        return axios
            .post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cardId}?url=${url}`,
                {
                    shippingAddress : formData
                }, { headers })
            .then((res) => res)
            .catch((err) => err)
    }

    function addProdToWishList(productId){
        return  axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist` , {productId : productId}, {
            headers,
        }).then((res) => res).catch((err) => err);
    }
    function getLoggedWishList(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {headers})
        .then((res) => {
            // console.log(res.data.numOfCartItems);
            setcount(res.data.count)
            return res
        }).catch((err) => err );
    }
    function deleteWishListItems(productId){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,{headers})
        .then((res) => res).catch((err) => err);
    }

    useEffect(()=>{
        getLoggedCart()
    },[])



    return <CartContext.Provider value={  {deleteCartItems,updateCartProduct, addProdToCart, getLoggedCart,checkout,cartId,numberItems,setnumberItems,addProdToWishList,getLoggedWishList,deleteWishListItems,count,setcount} }>
        {props.children}
    </CartContext.Provider>
}