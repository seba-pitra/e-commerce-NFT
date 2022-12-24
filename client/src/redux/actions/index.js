import axios from "axios";

// -- GETTERS --
export const GET_ALL_NFTS = "GET_ALL_NFTS";
export const GET_ALL_COLLECTIONS = "GET_ALL_COLLECTIONS";
export const GET_ALL_USERS = "GET_ALL_USERS";
export const GET_NFT_DETAIL = "GET_NFT_DETAIL";
export const GET_USER_BY_ID = "GET_USER_BY_ID";

// -- ADMIN ACTIONS --
export const CREATE_NFT = "CREATE_NFT";
export const DELETE_NFT = "DELETE_NFT";
export const UPDATE_NFT = "UPDATE_NFT";

// -- SETTERS --
export const SET_CATEGORY_SPECIES = "SET_CATEGORY_SPECIES";
export const SET_CATEGORY_SPECIES2 = "SET_CATEGORY_SPECIES2";
export const SET_CATEGORY_ART = "SET_CATEGORY_ART";
export const SET_CATEGORY_TYPE = "SET_CATEGORY_TYPE";
export const SET_CATEGORY_STYLE = "SET_CATEGORY_STYLE";
export const SET_CATEGORY_REST = "SET_CATEGORY_REST";
export const SET_CATEGORY_BACKG = "SET_CATEGORY_BACKG";

// -- FILTERS --
export const RESET_FILTERS = "RESET_FILTERS";
export const FILTER_NFT_COLLECTION = "FILTER_NFT_COLLECTION"; 
export const FILTER_NFT_CATEGORY = "FILTER_NFT_CATEGORY"; 
export const FILTER_NFT_PRICE = "FILTER_NFT_PRICE";
export const FILTER_NFT_NAME = "FILTER_NFT_NAME";
export const ORDER_NFT_NAME = "ORDER_NFT_NAME";
export const ORDER_NFT_PRICE = "ORDER_NFT_PRICE";
export const ORDER_NFT_AMOUNT = "ORDER_NFT_AMOUNT";
export const ORDER_NFT_CREATED_AT = "ORDER_NFT_CREATED_AT";
export const CHANGE_ORDER_DIRECTION = "CHANGE_ORDER_DIRECTION";

// -- HELPERS --
export const LOADING = "LOADING";
export const GET_ETH_PRICE = "GET_ETH_PRICE";

// -- PAGINATION --
export const SET_ACTIVE_PAGE = "SET_ACTIVE_PAGE";
export const SELECT_PAGE = "SELECT_PAGE";
export const PREV_PAGE = "PREV_PAGE";
export const NEXT_PAGE = "NEXT_PAGE";
export const SET_NFTS_PER_PAGE = "SET_GAMES_PER_PAGE";

// -- LOCALSTORAGE --
export const GET_ACTIVE_USER = "GET_ACTIVE_USER";
export const LOCAL_STORAGE_CART = "LOCAL_STORAGE_CART";

// -- SHOPPING KART --
export const ADD_NFT_ON_SHOOPING_CART = "ADD_NFT_ON_SHOOPING_CART";
export const REMOVE_NFT_OF_SHOOPING_CART = "REMOVE_NFT_OF_SHOOPING_CART";
export const BUY_NFT_ON_SHOOPING_CART = "BUY_NFT_ON_SHOOPING_CART";
export const DELETE_NFT_ON_SIGNOUT = "DELETE_NFT_ON_SIGNOUT"; 

// -- GETTERS --

export const getAllNfts = () => {
  return async (dispatch) => {
    dispatch({ type: LOADING });
    try {
      const allNfts = await axios.get("/nft");
      console.log(allNfts.data.length);
      dispatch({ type: GET_ALL_NFTS, payload: allNfts.data });
    } catch (e) {
      alert("There was a connection error, please try again later NFT");
    }
  };
};

export const getEthPrice = () => {
  return async (dispatch) => {
    try {
      const ethPrice = await axios.get(
        "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD,ARS"
      );
      console.log(ethPrice.data);
      dispatch({ type: GET_ETH_PRICE, payload: ethPrice.data });
    } catch (e) {
      alert("There was a error whit the API, please try again later");
    }
  };
};

export const getAllCollections = () => {
  return async (dispatch) => {
    dispatch({ type: LOADING });
    try {
      const allCollections = await axios.get("/collection");
      dispatch({ type: GET_ALL_COLLECTIONS, payload: allCollections.data });
    } catch (e) {
      alert("There was a connection error, please try again later collections");
    }
  };
};

export const getAllUsers = () => {
  return async (dispatch) => {
    try {
      const allUsers = await axios.get("ruta");
      dispatch({ type: GET_ALL_USERS, payload: allUsers.data });
    } catch (e) {
      alert("There was a connection error, please try again later user");
    }
  };
};

export const getUserByID = (id) => {
  return async (dispatch) => {
    dispatch({ type: LOADING });
    try {
      const user = await axios.get("ruta");
      dispatch({ type: GET_USER_BY_ID, payload: user.data });
    } catch (e) {
      alert("There was a connection error, please try again later user");
    }
  };
};

export const getNftDetail = (id) => {
  return async (dispatch) => {
    dispatch({ type: LOADING });
    try {
      const nftId = await axios.get(`/nft/${id}`);
      dispatch({ type: GET_NFT_DETAIL, payload: nftId.data });
    } catch (e) {
      alert(e.response.data);
    }
  };
};

// --- SETTERS ---

export const setCategorySpecies = (payload) => {
  return { type: SET_CATEGORY_SPECIES, payload };
};

export const setCategorySpecies2 = (payload) => {
  return { type: SET_CATEGORY_SPECIES2, payload };
};

export const setCategoryArt = (payload) => {
  return { type: SET_CATEGORY_ART, payload };
};

export const setCategoryType = (payload) => {
  return { type: SET_CATEGORY_TYPE, payload };
};

export const setCategoryStyle = (payload) => {
  return { type: SET_CATEGORY_STYLE, payload };
};

export const setCategoryRest = (payload) => {
  return { type: SET_CATEGORY_REST, payload };
};

export const setCategoryBackg = (payload) => {
  return { type: SET_CATEGORY_BACKG, payload };
};

// --- FILTERS ---

export const resetFilters = () => {
  return { type: RESET_FILTERS };
}; 

export const filterCollection = (payload) => {
  return { type: FILTER_NFT_COLLECTION, payload };
}; 

export const filterCategory = () => {
  return { type: FILTER_NFT_CATEGORY };
};

export const filterPrice = (payload) => {
  return { type: FILTER_NFT_PRICE, payload };
};

export const filterName = (payload) => {
  return { type: FILTER_NFT_NAME, payload };
};

// --- ORDERS ---

export const orderName = (payload) => {
  return { type: ORDER_NFT_NAME, payload };
};

export const orderPrice = (payload) => {
  return { type: ORDER_NFT_PRICE, payload };
};

export const orderAmount = (payload) => {
  return { type: ORDER_NFT_AMOUNT, payload }; // cantidad 1 o 100 unidades FALTA
};

export const orderCreatedAt = (payload) => {
  return { type: ORDER_NFT_CREATED_AT, payload }; // mas nuevos, mas antiguos FALTA
};

export const changeOrderDirection = () => {
  return { type: CHANGE_ORDER_DIRECTION };
};

// --- ADMIN ONLY ---

export const createNft = (payload) => {
  return async (dispatch) => {
    try {
      const createdNft = await axios.post(`/nft`, payload);
      dispatch({ type: CREATE_NFT, payload: createdNft.data }); // msj desde el back
      alert("NFT created successfully");
      window.location.href = "/";
    } catch (e) {
      alert(e.response.data);
    }
  };
};

export const deleteNft = (id) => {
  return async (dispatch) => {
    try {
      const deletedNft = await axios.delete(`/nft/${id}`);
      dispatch({ type: DELETE_NFT, payload: deletedNft.data }); // msj desde el back
      alert("NFT deleted successfully");
    } catch (e) {
      alert(e.response.data);
    }
  };
};

export const updateNft = (id, payload) => {
  // mmh?
  return async (dispatch) => {
    try {
      const updateNft = await axios.put(`/nft/${id}`, payload);
      dispatch({ type: UPDATE_NFT, payload: updateNft.data }); // msj desde el back
      alert("NFT updated successfully");
    } catch (e) {
      alert(e.response.data);
    }
  };
};

// --- PAGINATION ---

export const selectPage = (pageNumber) => {
  return { type: SELECT_PAGE, payload: pageNumber };
};

export const previousPage = () => {
  return { type: PREV_PAGE };
};

export const nextPage = () => {
  return { type: NEXT_PAGE };
};

export const setNftsPerPage = (gamesPerPage) => {
  return { type: SET_NFTS_PER_PAGE, payload: gamesPerPage };
};

export const addNftOnShoppingCart = (nftData) => {
  return { type: ADD_NFT_ON_SHOOPING_CART, payload: nftData };
};

export const removeNftOfShoppingCart = (nftId) => {
  return { type: REMOVE_NFT_OF_SHOOPING_CART, payload: nftId };
};

export const gettingActiveUserToState = (payload) => {
  return { type: GET_ACTIVE_USER, payload };
};
export const injectLocalStorageCart = (payload) => {
  return { type: LOCAL_STORAGE_CART, payload };
};

export const freeShoppingCartState = () => {
  return { type: DELETE_NFT_ON_SIGNOUT };
};

export const buyNftOnShoppingCart = (nftsOnShoppingCart) => {
  return async (dispatch) => {
    await fetch(`http://localhost:3001/payment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      body: JSON.stringify(nftsOnShoppingCart),
    })
      .then((res) => res.json())
      .then((data) => {
        // window.location.replace(data.sandbox_init_point) // => prueba
        window.location.replace(data.init_point);
      });
  };
};

export const addBuyAtHistoryBuys = (buyData) => {
  return async (dispatch) => {
    await fetch(`http://localhost:3001/buy`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(buyData),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: ADD_BUY_AT_HISTORY_BUYS, payload: data });
      });
  };
};

// export const searchNFT = (searchQuery) => {
//     return {
//         type : SEARCH_NFT,
//         payload : searchQuery
//     }
// }
