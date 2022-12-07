// branch
import axios from 'axios';
// import * as controllers from '../../utils';
export const GET_ALL_NFTS = "GET_ALL_NFTS";
export const GET_NFT_DETAIL = "GET_NFT_DETAIL";
export const CREATE_NFT = "CREATE_NFT";
export const DELETE_NFT = "DELETE_NFT";
export const UPDATE_NFT = "UPDATE_NFT";

export const RESET_FILTERS = "RESET_FILTERS";
export const FILTER_NFT_COLLECTION = "FILTER_NFT_COLLECTION"; 
export const FILTER_NFT_CATEGORY = "FILTER_NFT_CATEGORY"; 
export const FILTER_NFT_STATE = "FILTER_NFT_STATE";
export const ORDER_NFT_PRICE = "ORDER_NFT_PRICE"; 
export const ORDER_NFT_AMOUNT = "ORDER_NFT_AMOUNT";
export const ORDER_NFT_CREATED_AT = "ORDER_NFT_CREATED_AT"; 

// export const SEARCH_NFT = "SEARCH_NFT";
// export const SELECT_PAGE = "SELECT_PAGE";
// export const PREV_PAGE = "PREV_PAGE";
// export const NEXT_PAGE = "NEXT_PAGE";
// export const SET_NFTS_PER_PAGE = "SET_GAMES_PER_PAGE";
// export const SET_ORDER_TYPE = "SET_ORDER_TYPE";

export const LOADING = "LOADING";

export const getAllNfts = () => {
  return async (dispatch) => {
      dispatch({type : LOADING}) // set loading > settear en null en reducer
      try {
          const allNfts = await axios.get("ruta") // add ruta
          dispatch({type: GET_ALL_NFTS, payload: allNfts.data})
      }
      catch (e) {
          alert("There was a connection error, please try again later")
      }
  }
};

export const getNftDetail = (id) => {
  return async (dispatch) => {
    dispatch({type : LOADING}) // set loading > settear en null en reducer
      try{
      const nftId = await axios.get(`ruta`) // add ruta http://localhost:3001/recipes/${id}
      dispatch({type: GET_NFT_DETAIL, payload: nftId.data})
      }
      catch (e) {
      alert(e.response.data)
      }
  }
};

export const resetFilters = (payload) => {
  return { type: RESET_FILTERS, payload } // reset all > copy nft on nftFilters
};

// --- FILTERS ---

export const filterCollection = (payload) => {
  return { type: FILTER_NFT_COLLECTION, payload } // creadores
};

export const filterCategory = (payload) => {
  return { type: FILTER_NFT_CATEGORY, payload } // autos - monos - perros - etc
};

export const filterState = (payload) => {
  return { type: FILTER_NFT_STATE, payload } // compra o subasta
};

// --- ORDERS ---

export const orderName = (payload) => {
  return { type: ORDER_NFT_NAME, payload } // nombre asc o des ??? pa que... 
};

export const orderPrice = (payload) => {
  return { type: ORDER_NFT_PRICE, payload } // precio mayor a menor ... precio de $x a $xxx
};

export const orderAmount = (payload) => {
  return { type: ORDER_NFT_AMOUNT, payload } // cantidad 1 o 100 unidades
};

export const orderCreatedAt = (payload) => {
  return { type: ORDER_NFT_CREATED_AT, payload } // mas nuevos, mas antiguos
};





// --- ADMIN ONLY --- 

export const createNft = (payload) => {
  return async (dispatch) => {
    try {
      await axios.post(`ruta`, payload)
      dispatch({type: CREATE_NFT }) // no hace nada actualmente 
      alert("NFT created successfully");
      window.location.href = "ruta al home";
    } catch (e) {
      alert(e.response.data)
    }
  }
}

export const deleteNft = (id) => {
  return async (dispatch) => {
    const deletedNft = await axios.delete(`ruta delete o borrado logico??`) // http://localhost:3001/recipes/delete/${id}
    dispatch({type: DELETE_NFT, payload: deletedNft.data}) // no hace nada actualmente 
  }
}

export const updateNft = (payload) => { // que se puede updatear? 
  return async (dispatch) => {
    try {
      await axios.put(`ruta update`, payload)
      dispatch({type: UPDATE_NFT}) // no hace nada actualmente 
      alert("NFT updated successfully");
    } catch (e) {
      alert(e.response.data)
    } 
  }
}

// --- ADMIN ONLY --- 
























// export const getAllNFTS = () => dispatch => {
//     dispatch({type : LOADING})
//     return axios.get(/*ruta del back que hace referencia a todos los nft*/)
//         .then(response => response.data)
//         .then(data => controllers.orderNFTByName(data, 'asc'))
//         .then(json => {
//                 dispatch({
//                     type: GET_ALL_NFTS,
//                     payload: json
//                 })
//         })
// };

// export const getNFTDetail = (id) => dispatch => {
//     dispatch({type : LOADING})
//     return axios.get(/*ruta del back al detalle del nft*/)
//         .then(response => response.data)
//         .then(json => {
//             dispatch({
//                 type: GET_NFT_DETAIL,
//                 payload: json
//             });
//         });
// };


// export const createNFT = (payload) => dispatch => { 
//     return axios.post(/*Ruta del back donde se postea el nft nuevo */route,  payload)
//         .then(response => response.data)
//         .then(json => {
//             dispatch({
//                 type : CREATE_NFT,
//                 payload : json
//             })
//         })
//         .catch(err => console.log(err.response))
// };

// export const resetFilters = () => {
//     return {
//         type : RESET_FILTERS,
//         payload : []
//     }
// }

// export const searchNFT = (searchQuery) => {
//     return {
//         type : SEARCH_NFT,
//         payload : searchQuery
//     }
// }

// export const orderNfts = () => {
//     return {
//         type : ORDER_NFTS,
//     }
// }

// export const reverseOrder = (currentOrder) => {
//     return {
//         type : REVERSE_ORDER,
//         payload : currentOrder
//     }
// }

// export const setOrderType = (payload) => {
//     return {
//         type : SET_ORDER_TYPE,
//         payload: payload
//     }
// }

// export const selectPage = (pageNumber) => {
//     return {
//         type : SELECT_PAGE,
//         payload : pageNumber
//     }
// }

// export const previousPage = () => {
//     return {
//         type : PREV_PAGE,
//     }
// }

// export const nextPage = () => {
//     return {
//         type : NEXT_PAGE,
//     }
// }

// export const setNftsPerPage = (gamesPerPage) => {
//     return {
//         type : SET_NFTS_PER_PAGE,
//         payload : gamesPerPage,
//     }
// }
