
import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios'
import { toast } from 'react-toastify'

const List = ({ baseURL }) => {
    const [listItem, setListItem] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [loading, setLoading] = useState(true)

    // Fetch all products from the backend
    const fetchFoodList = async () => {
        try {
            setLoading(true)

            const response = await axios.get(
                `${baseURL}/api/food/list`
            )

            if (response.data.success) {
                setListItem(response.data.data || [])
            } else {
                toast.error('Failed to load products.')
            }
        } catch (error) {
            console.error(
                'Fetch products error:',
                error.response?.data || error.message
            )
            toast.error('Failed to fetch products. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchFoodList()
    }, [baseURL])

    // Delete a product
    const removeFood = async (foodId) => {
        try {
            const response = await axios.post(
                `${baseURL}/api/food/remove`,
                { id: foodId }
            )

            if (response.data.success) {
                toast.success(
                    response.data.message || 'Product deleted successfully.'
                )
                await fetchFoodList()
            } else {
                toast.error(
                    response.data.message || 'Failed to delete product.'
                )
            }
        } catch (error) {
            console.error(
                'Delete product error:',
                error.response?.data || error.message
            )
            toast.error('Failed to delete product.')
        }
    }

    // Filter products by name
    const filteredItems = listItem.filter((item) =>
        item.name?.toLowerCase().includes(searchTerm.trim().toLowerCase())
    )

    return (
        <div className="list add flex-col">
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
                <div className="list-table-format title">
                    <b>Image</b>
                    <b>Description</b>
                    <b>Sell Price</b>
                    <b>Action</b>
                </div>

                {loading ? (
                    <div className="no-products">Loading products...</div>
                ) : filteredItems.length > 0 ? (
                    filteredItems.map((item) => (
                        <div
                            key={item._id}
                            className="list-table-format"
                        >
                            <img
                                src={`${baseURL}/images/${item.image}`}
                                alt={item.name || 'Product'}
                                onError={(e) => {
                                    e.currentTarget.onerror = null
                                    e.currentTarget.style.visibility = 'hidden'
                                }}
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

            <p className="product-count">
                Showing {filteredItems.length} of {listItem.length} products
            </p>
        </div>
    )
}

export default List
