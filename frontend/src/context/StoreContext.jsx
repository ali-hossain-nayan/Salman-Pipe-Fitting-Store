import { createContext, useEffect, useState } from "react";
// import { food_list } from "../assets/assets";
import axios from 'axios'

export const StoreContext = createContext(null)
const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({})
    const baseURL = "http://localhost:4000";
    const [token, setToken] = useState('');
    const [food_list, setFoodList] = useState([])


    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
        } else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }
        //after has the token add to cart added also in database
        if (token) {
            await axios.post(baseURL + "/api/cart/add", { itemId }, { headers: { token } })
        }
    }



    const removeCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
        if (token) {
            await axios.post(baseURL + "/api/cart/remove", { itemId }, { headers: { token } })
        }

    }

    //If load the page cart data dispear thats why get api call
    const loadCartData = async (token) => {
        const callAPI = await axios.post(baseURL + "/api/cart/get", {}, { headers: { token } })
        setCartItems(callAPI.data.cartData);
    }



    const getTotalCartAmount = () => {
        let totalCartAmount = 0;
        for (let item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                totalCartAmount += itemInfo.price * cartItems[item]
            }
        }
        return totalCartAmount;
    }

    // useEffect(() => {
    //     console.log(cartItems)
    // }, [cartItems])




    //access database foodList by accessing api
    const fetchFoodList = async () => {
        const callAPI = await axios.get(baseURL + '/api/food/list');
        setFoodList(callAPI.data.data);
    }

    //So that after refresh the web page user can still loged in and every refresh foodList data will be loaded
    useEffect(() => {
        async function loadFoodData() {
            await fetchFoodList()
            if (localStorage.getItem('token')) {
                setToken(localStorage.getItem('token'))
                //call the loader function here
                await loadCartData(localStorage.getItem('token'));
            }
        }
        loadFoodData();

    }, [])

    const contextValue = {
        food_list,
        addToCart,
        removeCart,
        cartItems,
        setCartItems,
        getTotalCartAmount,
        baseURL,
        token,
        setToken,
        // fetchFoodList
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}</StoreContext.Provider>
    )
}
export default StoreContextProvider 