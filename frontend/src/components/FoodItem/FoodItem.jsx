import React, { useContext, useState } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
const FoodItem = ({ id, name, price, description, image }) => {
    // const [itemCount, setItemCount] = useState(0)
    const { cartItems, addToCart, removeCart, baseURL } = useContext(StoreContext)
    return (
        <div className='food-item'>
            <div className="food-item-img-container">
                <img src={baseURL + '/images/' + image} alt="img" className="food-item-image" />
                {
                    !cartItems[id]
                        ? <img className='add' onClick={() => addToCart(id)} src={assets.add_icon_white} alt='add-icon-white' />
                        : <div className="food-item-counter">
                            <img onClick={() => removeCart(id)} src={assets.remove_icon_red} alt="remove-icon" />
                            <p>{cartItems[id]}</p>
                            <img onClick={() => addToCart(id)} src={assets.add_icon_green} alt="add-icon" />
                        </div>
                }
            </div>
            <div className="food-item-info">
                <div className="food-item-name-rating">
                    <p>{name}</p>
                    <img src={assets.rating_starts} alt="rating-img" />
                </div>
                <p className="food-item-desc">
                    {description}
                </p>
                <p className="food-item-price">
                    ${price}
                </p>
            </div>
        </div>
    )
}

export default FoodItem