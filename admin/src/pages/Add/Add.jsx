import React, { useEffect, useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'
const Add = ({baseURL}) => {
  const [image, setImage] = useState(false)
  const [data, setData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Salad'
  })
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((prevData) => ({ ...prevData, [name]: value }))
  }

  // const takeURL = 'http://localhost:4000'
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('description', data.description)
    formData.append('price', Number(data.price))
    formData.append('category', data.category)
    formData.append('image', image)
    const response = await axios.post(`${baseURL}/api/food/add`, formData)
    if (response.data.success) {
      setData({
        name: '',
        description: '',
        price: '',
        category: ''
      })
      setImage(false)
      toast.success(response.data.message)
    } else {
      toast.error(response.data.message)
    }
  }
  useEffect(() => {
    console.log(data)
  }, [data])



  return (
    <div className="add">
      <form className="flex-col" onSubmit={handleSubmit}>

        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
          </label>
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden required />
        </div>

        <div className="add-product-name flex-col" >
          <p>Product Description</p>
          <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='type here' />
        </div>

        {/* <div className="add-category-description flex-col">
          <textarea onChange={onChangeHandler} value={data.description} name="description" rows='6' placeholder='write content' required></textarea>
        </div> */}


        <div className="add-category-price">
          {/* <div className="add-category flex-col">
            <p>Product category</p>
            <select name="category" onChange={onChangeHandler}  >
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Ver">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div> */}
          <div className="add-price flex-col">
            <p>Sell price</p>
            <input onChange={onChangeHandler} value={data.price} type="Number" name='price' placeholder='$20' />
          </div>
        </div>

        <button className='add-btn' type='submit'>ADD</button>
      </form>
    </div>

  )
}

export default Add