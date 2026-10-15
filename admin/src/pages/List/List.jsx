
import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios'
import { toast } from 'react-toastify'

const List = ({ baseURL }) => {
    const [listItem, setListItem] = useState([])
    const [searchTerm, setSearchTerm] = useState('')

    // Fetch all products from the backend
    const fetchFoodList = async () => {
        try {
            const callApi = await axios.get(
                `${baseURL}/api/food/list`
            )

            if (callApi.data.success) {
                setListItem(callApi.data.data)
            } else {
                toast.error('Something went wrong!')
            }
        } catch (error) {
            console.error('Fetch products error:', error)
            toast.error('Failed to fetch products!')
        }
    }

    useEffect(() => {
        fetchFoodList()
    }, [])

    // Delete a product
    const removeFood = async (foodId) => {
        try {
            const callApi = await axios.post(
                `${baseURL}/api/food/remove`,
                { id: foodId }
            )

            if (callApi.data.success) {
                toast.success(callApi.data.message)
                await fetchFoodList()
            } else {
                toast.error('Failed to delete product!')
            }
        } catch (error) {
            console.error('Delete product error:', error)
            toast.error('Failed to delete product!')
        }
    }

    // Filter products by name
    const filteredItems = listItem.filter((item) =>
        item.name
            ?.toLowerCase()
            .includes(searchTerm.trim().toLowerCase())
    )

    return (
        <div className="list add flex-col">

            {/* Page heading */}
            <p className="list-heading">All Menu List</p>

            {/* Search section */}
            <div className="list-search">
                <div className="search-input-wrapper">
                    <input
                        type="text"
                        placeholder="Search product by name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        aria-label="Search products by name"
                    />

                    <span className="search-icon" aria-hidden="true">
                        &#128269;
                    </span>
                </div>

                <button
                    type="button"
                    className="search-btn"
                    onClick={() => setSearchTerm(searchTerm.trim())}
                >
                    Search
                </button>

                {searchTerm && (
                    <button
                        type="button"
                        className="clear-btn"
                        onClick={() => setSearchTerm('')}
                    >
                        Clear
                    </button>
                )}
            </div>

            {/* Product list */}
            <div className="list-table">

                {/* Table heading */}
                <div className="list-table-format title">
                    <b>Image</b>
                    <b>Description</b>
                    <b>Sell Price</b>
                    <b>Action</b>
                </div>

                {/* Filtered products */}
                {filteredItems.length > 0 ? (
                    filteredItems.map((item) => (
                        <div
                            key={item._id}
                            className="list-table-format"
                        >
                            <img
                                src={`${baseURL}/images/${item.image}`}
                                alt={item.name}
                            />

                            <p className="product-name">
                                {item.name}
                            </p>

                            <p className="product-price">
                                {item.price} TK
                            </p>

                            <button
                                type="button"
                                className="cursor delete-btn"
                                onClick={() => removeFood(item._id)}
                                aria-label={`Delete ${item.name}`}
                                title="Delete product"
                            >
                                &times;
                            </button>
                        </div>
                    ))
                ) : (
                    <div className="no-products">
                        {searchTerm.trim()
                            ? `No products found for "${searchTerm}".`
                            : 'No products available.'}
                    </div>
                )}

            </div>

            {/* Product count */}
            <p className="product-count">
                Showing {filteredItems.length} of {listItem.length} products
            </p>

        </div>
    )
}

export default List
