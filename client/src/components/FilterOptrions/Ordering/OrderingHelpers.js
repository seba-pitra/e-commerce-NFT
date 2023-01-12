import *  as actions from '../../../redux/actions'

const NAME = "name";
const PRICE = "price";
const RARITY = "rarity";
const FAVS = "favs";
const STARS = "stars";
const LASTBUY = "lastbuy"
const CREATEDTS = "createdts"

    export const orderOptionDispatcher = (dispatch, option) => {
        console.log(option)
    switch (option) {
        case NAME:
            dispatch(actions.orderName());
            break;
        case PRICE:
            dispatch(actions.orderPrice());
            break;
        case RARITY:
            dispatch(actions.orderRarity());
            break;
        case FAVS:
            dispatch(actions.orderFavs());
            break;
        case STARS:
            dispatch(actions.orderStars());
            break;
        case LASTBUY:
            dispatch(actions.orderLastBuy());
            break;
        case CREATEDTS:
            dispatch(actions.orderCreatedTs());
            break;
        }
}
