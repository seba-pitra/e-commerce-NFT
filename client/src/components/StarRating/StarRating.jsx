import { useState } from 'react';
import starlogo from "../../images/stars-logo.png"
import './StarRating.css'
// A MODIFICAR.
export default function StarRating({rating, setRating}) {
    const [hover, setHover] = useState(0);
    const stars = new Array(5);
    stars.fill(starlogo)

    return (
    <div className="single-input-container">
        <label
            className='add-game-form-label'
            htmlFor="rating">Rating: </label>

        <div className='star-rating'>
        {stars.map((star, index) => {
            index += 1;
            return (
                <button
                id="star-rating-star"
                type="button"
                key={index}
                onClick={() => setRating({
                    ...rating,
                    value : index,
                    valid : true
                })}
                onMouseEnter={() => setHover(index)}
                onMouseLeave={() => setHover(rating.value)}
                >
                    <span className="star">
                        <img 
                            id="img-btn"
                            className={index <= ((hover) || rating) ? "img-btn-on" : "img-btn-off"}
                            src={star} 
                            alt="Star" />
                    </span>
                </button>
        );
        })}
        </div>
    </div>
    );
};