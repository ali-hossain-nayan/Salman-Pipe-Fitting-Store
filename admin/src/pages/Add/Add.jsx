
import React, { useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

const initialData = {
    name: '',
    description: '',
    price: '',
    category: 'Salad',
}

const Add = ({ baseURL }) => {
    const [image, setImage] = useState(null)
    const [data, setData] = useState(initialData)
    const [loading, setLoading] = useState(false)

    const onChangeHandler = (e) => {
        const { name, value } = e.target

        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!data.name.trim()) {
            toast.error('Please enter a product name.')
            return
        }

        if (data.price === '' || Number(data.price) < 0) {
            toast.error('Please enter a valid price.')
            return
        }

        if (!image) {
            toast.error('Please select a product image.')
            return
        }

        const formData = new FormData()
        formData.append('name', data.name.trim())
        formData.append('description', data.description)
        formData.append('price', Number(data.price))
        formData.append('category', data.category)
        formData.append('image', image)

        try {
            setLoading(true)

            const response = await axios.post(
                `${baseURL}/api/food/add`,
                formData
            )

            if (response.data.success) {
                toast.success(
                    response.data.message || 'Product added successfully.'
                )

                setData(initialData)
                setImage(null)

                // Reset the file input
                const fileInput = document.getElementById('image')
                if (fileInput) fileInput.value = ''
            } else {
                toast.error(
                    response.data.message || 'Failed to add product.'
                )
            }
        } catch (error) {
            console.error(
                'Add product error:',
                error.response?.data || error.message
            )

            toast.error(
                error.response?.data?.message ||
                'Unable to add product. Please try again.'
            )
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="add">
            <form className="flex-col" onSubmit={handleSubmit}>
                <div className="add-img-upload flex-col">
                    <p>Upload Image</p>

                    <label htmlFor="image">
                        <img
                            src={
                                image
                                    ? URL.createObjectURL(image)
                                    : assets.upload_area
                            }
                            alt={image ? image.name : 'Upload product'}
                        />
                    </label>

                    <input
                        onChange={(e) =>
                            setImage(e.target.files?.[0] || null)
                        }
                        type="file"
                        id="image"
                        accept="image/*"
                        hidden
                        required
                    />
                </div>

                <div className="add-product-name flex-col">
                    <p>Product Name</p>
                    <input
                        onChange={onChangeHandler}
                        value={data.name}
                        type="text"
                        name="name"
                        placeholder="Enter product name"
                        required
                    />
                </div>

                <div className="add-category-description flex-col">
                    <p>Product Description</p>
                    <textarea
                        onChange={onChangeHandler}
                        value={data.description}
                        name="description"
                        rows="4"
                        placeholder="Write product description"
                    />
                </div>

                <div className="add-category-price">
                    <div className="add-category flex-col">
                        <p>Product Category</p>

                        <select
                            name="category"
                            value={data.category}
                            onChange={onChangeHandler}
                            required
                        >
                            <option value="Salad">Salad</option>
                            <option value="Rolls">Rolls</option>
                            <option value="Deserts">Deserts</option>
                            <option value="Sandwich">Sandwich</option>
                            <option value="Cake">Cake</option>
                            <option value="Pure Veg">Pure Veg</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Noodles">Noodles</option>
                        </select>
                    </div>

                    <div className="add-price flex-col">
                        <p>Sell Price</p>
                        <input
                            onChange={onChangeHandler}
                            value={data.price}
                            type="number"
                            name="price"
                            placeholder="20 TK"
                            min="0"
                            step="0.01"
                            required
                        />
                    </div>
                </div>

                <button
                    className="add-btn"
                    type="submit"
                    disabled={loading}
                >
                    {loading ? 'ADDING...' : 'ADD'}
                </button>
            </form>
        </div>
    )
}

export default Add
