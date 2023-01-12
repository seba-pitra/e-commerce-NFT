import { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../redux/actions";
import starlogo from "../../images/stars-logo.png"
import './StarRating.css'
import { useLoggedUser } from "../../customHooks/useLoggedUser";
// A MODIFICAR.
export default function StarRating({nftId}) {
    const dispatch = useDispatch();
    const [loggedUser, updateLoggedUser, handleLogOut] = useLoggedUser()
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const stars = new Array(5);
    stars.fill(starlogo)

    return (
    <div className="single-input-container">
        <div className='star-rating'>
        {stars.map((star, index) => {
            index += 1;
            return (
                <button
                id="star-rating-star"
                type="button"
                key={index}
                value={index}
                onClick={() => {
                    setRating(index)
                    dispatch(actions.addReview({
                        userId : loggedUser.id,
                        nftId : nftId,
                        value : index
                    }))
                }}
                onMouseEnter={() => setHover(index)}
                onMouseLeave={() => setHover(rating)}
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