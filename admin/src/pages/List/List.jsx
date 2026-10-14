import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios'
import { toast } from 'react-toastify';
const List = ({ baseURL }) => {
    // const takeUrl = "http://localhost:4000";
    const [listItem, setListItem] = useState([])


    const fetchFoodList = async () => {
        const callApi = await axios.get(`${baseURL}/api/food/list`)
        console.log(callApi.data)
        if (callApi.data.success) {
            setListItem(callApi.data.data)
        } else {
            toast.error("something went wrong!")
        }
    }



    useEffect(() => {
        fetchFoodList();
    }, [])



    const removeFood = async (foodId) => {
        // console.log(foodId)
        const callApi = await axios.post(`${baseURL}/api/food/remove`, { id: foodId });
        //after deleting the food item here we call fetchFoodList function again for updating list and show it
        await fetchFoodList();
        if (callApi.data.success) {
            toast.success(callApi.data.message);
        } else {
            toast.error("something went wrong!")
        }

    }


    return (
        <div className="list add flex-col">
            <p>All Menu List</p>
            <div className="list-table">
                <div className="list-table-format title">
                    <b>
                        Image
                    </b>
                    <b>
                        Description
                    </b>
                    {/* <b>
                        Category
                    </b> */}
                    <b>
                        Sell Price
                    </b>
                    {/* <b>
                        Action
                    </b> */}
                </div>
                {
                    listItem.map((item, index) => {
                        return (
                            <div key={index} className="list-table-format">
                                <img src={`${baseURL}/images/` + item.image} alt={item.image} />
                                <p>{item.name}</p>
                                {/* <p>{item.category}</p> */}
                                <p>{item.price} TK</p>
                                < p onClick={() => removeFood(item._id)} className='cursor'>x</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default List