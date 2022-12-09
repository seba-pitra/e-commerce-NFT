import axios from 'axios';

export const GET_ALL_NFTS = "GET_ALL_NFTS";
export const GET_NFT_DETAIL = "GET_NFT_DETAIL";
export const CREATE_NFT = "CREATE_NFT";
export const DELETE_NFT = "DELETE_NFT";
export const UPDATE_NFT = "UPDATE_NFT";

export const RESET_FILTERS = "RESET_FILTERS";
export const FILTER_NFT_COLLECTION = "FILTER_NFT_COLLECTION"; 
export const FILTER_NFT_CATEGORY = "FILTER_NFT_CATEGORY"; 
export const FILTER_NFT_STATE = "FILTER_NFT_STATE";
export const FILTER_NFT_PRICE = "FILTER_NFT_PRICE"; 
export const ORDER_NFT_NAME = "ORDER_NFT_NAME"; 
export const ORDER_NFT_PRICE = "ORDER_NFT_PRICE"; 
export const ORDER_NFT_AMOUNT = "ORDER_NFT_AMOUNT"; 
export const ORDER_NFT_CREATED_AT = "ORDER_NFT_CREATED_AT"; 

export const LOADING = "LOADING";

export const getAllNfts = () => {
    return async (dispatch) => {
        dispatch({type : LOADING}) // set loading > settear en null en reducer
        try {
            const allNfts = await axios.get("/nft") // add ruta
            dispatch({type: GET_ALL_NFTS, payload: allNfts.data})
        }
        catch (e) {
            alert("There was a connection error, please try again later")
        }
}
};

export const getNftDetail = (id) => {
  return async (dispatch) => {
    dispatch({type : LOADING})
    try{
      const nftId = await axios.get(`/nft/${id}`)
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
  return { type: FILTER_NFT_COLLECTION, payload }
};

export const filterCategory = (payload) => {
  return { type: FILTER_NFT_CATEGORY, payload }
};

export const filterPrice = (payload) => {
  return { type: FILTER_NFT_PRICE, payload }
};

export const filterState = (payload) => {
  return { type: FILTER_NFT_STATE, payload } // compra o subasta FALTA EDITAR TYPE BACK
};

// --- ORDERS ---

export const orderName = (payload) => {
  return { type: ORDER_NFT_NAME, payload }
};

export const orderPrice = (payload) => {
  return { type: ORDER_NFT_PRICE, payload }
};

export const orderAmount = (payload) => {
  return { type: ORDER_NFT_AMOUNT, payload } // cantidad 1 o 100 unidades FALTA
};

export const orderCreatedAt = (payload) => {
  return { type: ORDER_NFT_CREATED_AT, payload } // mas nuevos, mas antiguos FALTA
};




// --- ADMIN ONLY --- 

export const createNft = (payload) => {
  return async (dispatch) => {
    try {
      const createdNft = await axios.post(`/nft`, payload)
      dispatch({type: CREATE_NFT, payload: createdNft.data}) // msj desde el back
      alert("NFT created successfully");
      window.location.href = "ruta al home";
    } catch (e) {
      alert(e.response.data)
    }
  }
}

export const deleteNft = (id) => {
  return async (dispatch) => {
    try {
      const deletedNft = await axios.delete(`/nft/${id}`)
      dispatch({type: DELETE_NFT, payload: deletedNft.data}) // msj desde el back
      alert("NFT deleted successfully");
    } catch (e) {
      alert(e.response.data)
    }
  }
}

export const updateNft = (atribute, payload) => { // mmh?
  return async (dispatch) => {
    try {
      const updateNft = await axios.put(`/nft/${atribute}`, payload)
      dispatch({type: UPDATE_NFT, payload: updateNft.data}) // msj desde el back
      alert("NFT updated successfully");
    } catch (e) {
      alert(e.response.data)
    } 
  }
}

// --- ADMIN ONLY --- 









// export const SEARCH_NFT = "SEARCH_NFT";
// export const SELECT_PAGE = "SELECT_PAGE";
// export const PREV_PAGE = "PREV_PAGE";
// export const NEXT_PAGE = "NEXT_PAGE";
// export const SET_NFTS_PER_PAGE = "SET_GAMES_PER_PAGE";

// export const searchNFT = (searchQuery) => {
//     return {
//         type : SEARCH_NFT,
//         payload : searchQuery
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
