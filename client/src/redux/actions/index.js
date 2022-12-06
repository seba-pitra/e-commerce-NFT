import axios from 'axios';
import * as controllers from '../../utils';
export const GET_ALL_NFTS = "GET_ALL_NFTS";
export const GET_NFT_DETAIL = "GET_NFT_DETAIL";
export const CREATE_NFT = "CREATE_NFT";
export const DELETE_NFT = "DELETE_NFT";
export const SEARCH_NFT = "SEARCH_NFT";
export const RESET_FILTERS = "RESET_FILTERS";
export const ORDER_NFTS = "ORDER_NFTS";
export const SELECT_PAGE = "SELECT_PAGE";
export const PREV_PAGE = "PREV_PAGE";
export const NEXT_PAGE = "NEXT_PAGE";
export const SET_NFTS_PER_PAGE = "SET_GAMES_PER_PAGE";
export const SET_ORDER_TYPE = "SET_ORDER_TYPE";
export const REVERSE_ORDER = "REVERSE_ORDER";
export const LOADING = "LOADING";



export const getAllNFTS = () => dispatch => {
    dispatch({type : LOADING})
    return axios.get(/*ruta del back que hace referencia a todos los nft*/)
        .then(response => response.data)
        .then(data => controllers.orderNFTByName(data, 'asc'))
        .then(json => {
                dispatch({
                    type: GET_ALL_NFTS,
                    payload: json
                })
        })
};

export const getNFTDetail = (id) => dispatch => {
    dispatch({type : LOADING})
    return axios.get(/*ruta del back al detalle del nft*/)
        .then(response => response.data)
        .then(json => {
            dispatch({
                type: GET_NFT_DETAIL,
                payload: json
            });
        });
};


export const createNFT = (payload) => dispatch => { 
    return axios.post(/*Ruta del back donde se postea el nft nuevo */'ruta',  payload)
        .then(response => response.data)
        .then(json => {
            dispatch({
                type : CREATE_NFT,
                payload : json
            })
        })
        .catch(err => console.log(err.response))
};

export const resetFilters = () => {
    return {
        type : RESET_FILTERS,
        payload : []
    }
}

export const searchNFT = (searchQuery) => {
    return {
        type : SEARCH_NFT,
        payload : searchQuery
    }
}

export const orderNfts = () => {
    return {
        type : ORDER_NFTS,
    }
}

export const reverseOrder = (currentOrder) => {
    return {
        type : REVERSE_ORDER,
        payload : currentOrder
    }
}

export const setOrderType = (payload) => {
    return {
        type : SET_ORDER_TYPE,
        payload: payload
    }
}

export const selectPage = (pageNumber) => {
    return {
        type : SELECT_PAGE,
        payload : pageNumber
    }
}

export const previousPage = () => {
    return {
        type : PREV_PAGE,
    }
}

export const nextPage = () => {
    return {
        type : NEXT_PAGE,
    }
}

export const setNftsPerPage = (gamesPerPage) => {
    return {
        type : SET_NFTS_PER_PAGE,
        payload : gamesPerPage,
    }
}
