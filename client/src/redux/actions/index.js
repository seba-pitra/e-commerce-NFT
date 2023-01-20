import axios from "axios";
import { toast } from "react-toastify";

// -- USER ACTIONS --
export const GET_ALL_USERS = "GET_ALL_USERS";
export const GET_ALL_ADMIN_USERS = "GET_ALL_ADMIN_USERS";
export const GET_USER_BY_ID = "GET_USER_BY_ID";
export const REGISTER_USER = "REGISTER_USER";
export const SIGN_IN_WITH_GOOGLE = "SIGN_IN_WITH_GOOGLE";
export const LOG_IN = "LOG_IN";
export const LOG_OUT = "LOG_OUT";
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS";
export const ASKED_FOR_VERIFICATION = "ASKED_FOR_VERIFICATION";
export const UPDATE_LOGGED_USER = "UPDATE_LOGGED_USER";
export const LOGOUT_USER = "LOGOUT_USER";

// -- GETTERS --
export const GET_ALL_NFTS = "GET_ALL_NFTS";
export const GET_NFT_DETAIL = "GET_NFT_DETAIL";
export const GET_ALL_ADMIN_NFTS = "GET_ALL_ADMIN_NFTS";
export const GET_ALL_COLLECTIONS = "GET_ALL_COLLECTIONS";
export const GET_COLLECTION_DETAIL = "GET_COLLECTION_DETAIL";

// -- ADMIN ACTIONS --
export const CREATE_NFT = "CREATE_NFT";
export const DELETE_NFT = "DELETE_NFT";
export const UPDATE_NFT = "UPDATE_NFT";
export const CREATE_COLLECTION = "CREATE_COLLECTION";

// -- SETTERS --
export const SET_COLLECTIONS = "SET_COLLECTIONS";
export const SET_CATEGORY_SPECIES = "SET_CATEGORY_SPECIES";
export const SET_CATEGORY_SPECIES2 = "SET_CATEGORY_SPECIES2";
export const SET_CATEGORY_ART = "SET_CATEGORY_ART";
export const SET_CATEGORY_TYPE = "SET_CATEGORY_TYPE";
export const SET_CATEGORY_STYLE = "SET_CATEGORY_STYLE";
export const SET_CATEGORY_REST = "SET_CATEGORY_REST";
export const SET_CATEGORY_BACKG = "SET_CATEGORY_BACKG";

export const SET_VIEW_CARDS = "SET_VIEW_CARDS";

// -- FILTERS --
export const RESET_FILTERS = "RESET_FILTERS";
export const FILTER_NFTS = "FILTER_NFTS";
export const SET_NFTS_PRICE = "SET_NFTS_PRICE";
export const SEARCH_NFT_NAME = "SEARCH_NFT_NAME";
export const SEARCH_COLLECTION_NAME = "SEARCH_COLLECTION_NAME";
export const ORDER_NFT_NAME = "ORDER_NFT_NAME";
export const ORDER_NFT_PRICE = "ORDER_NFT_PRICE";
export const ORDER_NFT_RARITY = "ORDER_NFT_RARITY";
export const ORDER_NFT_FAVS = "ORDER_NFT_FAVS";
export const ORDER_NFT_STARS = "ORDER_NFT_STARS";
export const ORDER_NFT_LASTBUY = "ORDER_NFT_LASTBUY";
export const ORDER_NFT_CREATEDTS = "ORDER_NFT_CREATEDTS";
export const ORDER_NFT_AMOUNT = "ORDER_NFT_AMOUNT";
export const ORDER_NFT_CREATED_AT = "ORDER_NFT_CREATED_AT";
export const CHANGE_ORDER_DIRECTION = "CHANGE_ORDER_DIRECTION";

// -- HELPERS --
export const LOADING = "LOADING";
export const GET_ETH_PRICE = "GET_ETH_PRICE";
export const SHOULD_UPDATE = "SHOULD_UPDATE";

// -- PAGINATION --
export const SET_ACTIVE_PAGE = "SET_ACTIVE_PAGE";
export const SELECT_PAGE = "SELECT_PAGE";
export const PREV_PAGE = "PREV_PAGE";
export const NEXT_PAGE = "NEXT_PAGE";
export const SET_NFTS_PER_PAGE = "SET_NFTS_PER_PAGE";

// -- LOCALSTORAGE --
export const GET_ACTIVE_USER = "GET_ACTIVE_USER";
export const LOCAL_STORAGE_CART = "LOCAL_STORAGE_CART";
export const LOCAL_STORAGE_FAVS = "LOCAL_STORAGE_FAVS";
// -- SHOPPING KART --
export const ADD_NFT_ON_SHOOPING_CART = "ADD_NFT_ON_SHOOPING_CART";
export const REMOVE_NFT_OF_SHOOPING_CART = "REMOVE_NFT_OF_SHOOPING_CART";
export const DELETE_NFT_ON_SIGNOUT = "DELETE_NFT_ON_SIGNOUT";
export const ADD_BUY_AT_HISTORY_BUYS = "ADD_BUY_AT_HISTORY_BUYS";

// -- FAVS --
export const ADD_FAV = "ADD_FAV";
export const DEL_FAV = "DEL_FAV";
export const REMOVE_FROM_FAVS = "REMOVE_FROM_FAVS";
export const DELETE_FAVS_ON_SIGN_OUT = "DELETE_FAVS_ON_SIGN_OUT";

// -- THEMES SWITCH
export const TOGGLE_THEME = "TOGGLE_THEME";
export const LOCAL_STORAGE_THEME = "LOCAL_STORAGE_THEME";

// -- GETTERS --

export const getAllAdminNfts = () => {
  return async (dispatch) => {
    try {
      const allNfts = await axios.get("/nft?deleted=include");
      dispatch({ type: GET_ALL_ADMIN_NFTS, payload: allNfts.data });
    } catch (error) {
      toast.error("Something was wrong. Try again later");
    }
  };
};

export const getAllNfts = () => {
  return async (dispatch) => {
    dispatch({ type: LOADING });
    try {
      const allNfts = await axios.get("/nft");
      dispatch({ type: GET_ALL_NFTS, payload: allNfts.data });
    } catch (e) {
      toast.error("Something was wrong. Try again later", {
        position: "bottom-left",
      });
    }
  };
};

export const getEthPrice = () => {
  return async (dispatch) => {
    try {
      const ethPrice = await axios.get(
        "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD,ARS"
      );
      dispatch({ type: GET_ETH_PRICE, payload: ethPrice.data });
    } catch (e) {
      toast.error("Something was wrong. Try again later", {
        position: "bottom-left",
      });
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
      toast.error("Something was wrong. Try again later", {
        position: "bottom-left",
      });
    }
  };
};

export const getCollectionById = (id) => {
  return async (dispatch) => {
    dispatch({ type: LOADING });
    try {
      const collectionDetail = await axios.get(`/collection/${id}`);
      dispatch({ type: GET_COLLECTION_DETAIL, payload: collectionDetail.data });
    } catch (error) {
      toast.error("Something was wrong. Try again later", {
        position: "bottom-left",
      });
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
      toast.error("Something was wrong. Try again later");
    }
  };
};

export const getAllAdminUsers = () => {
  return async (dispatch) => {
    try {
      const allUsers = await axios.get("/user?deleted=include");
      dispatch({ type: GET_ALL_ADMIN_USERS, payload: allUsers.data });
    } catch (error) {
      toast.error("Something was wrong. Try again later", {
        position: "bottom-left",
      });
    }
  };
};

// Esta funcion no la esta usando nadie.
export const getAllUsers = () => {
  return async (dispatch) => {
    try {
      const allUsers = await axios.get("/user");
      dispatch({ type: GET_ALL_USERS, payload: allUsers.data });
    } catch (e) {
      toast.error("Something was wrong. Try again later", {
        position: "bottom-left",
      });
    }
  };
};
export const getUserByID = (id) => {
  return async (dispatch) => {
    dispatch({ type: LOADING });
    try {
      const user = await axios.get(`/user/${id}`);
      dispatch({ type: GET_USER_BY_ID, payload: user.data });
    } catch (e) {
      toast.error("Something was wrong. Try again later", {
        position: "bottom-left",
      });
    }
  };
};

export const updateUser = (body) => {
  return async (dispatch) => {
    try {
      console.log(body)
      const update = await axios.put(`/user/${body.id}`, body);
      dispatch({ type: GET_USER_BY_ID, payload: update.data });
      dispatch({ type: SHOULD_UPDATE });
    } catch (error) {
      toast.error("Something was wrong. Try again later", {
        position: "bottom-left",
      });
    }
  };
};
export const registerUser = (userData) => {
  return async (dispatch) => {
    try {
      const newUser = await axios.post("/user/register", userData);
      dispatch({ type: REGISTER_USER });
    } catch (error) {
      toast.error("Something was wrong. Try again later");
    }
  };
};
export const signInWithGoogle = (userData) => {
  return async (dispatch) => {
    try {
      const newUser = await axios.post("user/google/signin", userData);
      dispatch({ type: SIGN_IN_WITH_GOOGLE, payload: newUser.data });
    } catch (error) {
      throw new Error(error.message);
    }
  };
};
export const logOutUser = () => {
  return { type: LOG_OUT };
};
export const logInUser = (id) => {
  return async (dispatch) => {
    dispatch({ type: LOADING });
    try {
      const loggedUser = await axios.get(`/user/${id}`);
      dispatch({ type: LOG_IN, payload: loggedUser.data });
    } catch (error) {
      toast.error("Can't get user data from back. Try again later", {
        position: "bottom-left",
      });
    }
  };
};
export const successfulLogin = () => {
  return { type: LOG_IN_SUCCESS };
};

export const succesfulLogOut = () => {
  return { type: LOG_OUT_SUCCESS };
};

export const askForVerification = (userData) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(
        `/user/ask/${userData.userId}`,
        userData
      );
      dispatch({
        type: ASKED_FOR_VERIFICATION,
        payload: response.data.message,
      });
      dispatch({ type: SHOULD_UPDATE });
      toast.success(
        "Your info has been sent successfully. This proccess could take 2 or 3 working days",
        {
          position: "bottom-left",
          autoClose: false,
        }
      );
    } catch (error) {
      toast.error("Something went wrong with verification request", {
        position: "bottom-left",
      });
    }
  };
};

export const verifyUser = (userId) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(`/user/verify/${userId}`);
      dispatch({ type: SHOULD_UPDATE });
    } catch (error) {
      toast.error("Something went wrong with verification request", {
        position: "bottom-left",
      });
    }
  };
};

export const rejectVerification = (userId) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(`/user/reject/${userId}`);
      dispatch({ type: SHOULD_UPDATE });
    } catch (error) {
      toast.error("Something went wrong with verification request", {
        position: "bottom-left",
      });
    }
  };
};

// actions.js

// Acción para actualizar el estado y almacenamiento local del usuario
export function updateLoggedUser(userData) {
  return { type: UPDATE_LOGGED_USER, payload: userData };
}

// --- SETTERS ---

export const setCollections = (payload) => {
  return { type: SET_COLLECTIONS, payload };
};

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

export const setViewCards = (payload) => {
  return { type: SET_VIEW_CARDS, payload };
};

// --- FILTERS ---

export const resetFilters = () => {
  return { type: RESET_FILTERS };
};

export const filterNfts = () => {
  return { type: FILTER_NFTS };
};

export const setPrice = (payload) => {
  return { type: SET_NFTS_PRICE, payload };
};

export const filterName = (payload) => {
  return { type: SEARCH_NFT_NAME, payload };
};

export const filterCollectionName = (payload) => {
  return { type: SEARCH_COLLECTION_NAME, payload };
};

// --- ORDERS ---

export const orderName = (payload) => {
  return { type: ORDER_NFT_NAME, payload };
};

export const orderPrice = (payload) => {
  return { type: ORDER_NFT_PRICE, payload };
};

export const orderRarity = (payload) => {
  return { type: ORDER_NFT_RARITY, payload };
};

export const orderFavs = (payload) => {
  return { type: ORDER_NFT_FAVS, payload };
};

export const orderStars = (payload) => {
  return { type: ORDER_NFT_STARS, payload };
};

export const orderLastBuy = (payload) => {
  return { type: ORDER_NFT_LASTBUY, payload };
};

export const orderCreatedTs = (payload) => {
  return { type: ORDER_NFT_CREATEDTS, payload };
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

// --- VERIFIED USERS ONLY ---

export const createNft = (payload) => {
  return async (dispatch) => {
    try {
      const createdNft = await axios.post(`/nft/create`, payload);
      dispatch({ type: CREATE_NFT, payload: createdNft.data }); // msj desde el back
      toast.success("NFT created successfully", {
        position: "bottom-left",
      });
      dispatch({ type: SHOULD_UPDATE });
      // window.location.href = "/marketplace";
    } catch (e) {
      toast.error("Something was wrong. Try again later", {
        position: "bottom-left",
      });
    }
  };
};

export const createCollection = (payload) => {
  return async (dispatch) => {
    try {
      const createdNft = await axios.post(`/collection/create`, payload);
      dispatch({ type: CREATE_COLLECTION, payload: createdNft.data }); // el back devuelve la collection creada

      toast.success("Collection created successfully", {
        position: "bottom-left",
      });
      dispatch({ type: SHOULD_UPDATE });
      // window.location.href = "/marketplace";
    } catch (e) {
      toast.error("Something was wrong. Try again later", {
        position: "bottom-left",
      });
    }
  };
};

export const deleteNft = (id) => {
  return async (dispatch) => {
    try {
      const deletedNft = await axios.delete(`/nft/${id}`);
      dispatch({ type: DELETE_NFT, payload: deletedNft.data }); // msj desde el back
      toast.success("NFT deleted successfully", { position: "bottom-left" });
      dispatch({ type: SHOULD_UPDATE });
    } catch (e) {
      toast.error("Something was wrong. Try again later", {
        position: "bottom-left",
      });
    }
  };
};

// --- UPDATES NFTS
export const updateNft = (id, payload) => {
  // mmh?
  return async (dispatch) => {
    try {
      const updateNft = await axios.put(`/nft/${id}`, payload);
      dispatch({ type: UPDATE_NFT, payload: updateNft.data }); // msj desde el back
      toast.success("NFT updated successfully", { position: "bottom-left" });
      dispatch({ type: SHOULD_UPDATE });
    } catch (error) {
      toast.error(error.response.data, { position: "bottom-left" });
    }
  };
};

export const addViewNft = (id) => {
  return async () => {
    try {
      await axios.put(`/nft/addView/${id}`);
    } catch (error) {
      toast.error(error.response.data, { position: "bottom-left" });
    }
  };
};

export const addReview = (payload) => {
  return async (dispatch) => {
    try {
      const { userId, nftId, value } = payload;
      const response = await axios.post(`/review/create`, {
        userId: userId,
        nftId: nftId,
        value: value,
      });
      console.log(response);
      dispatch({ type: SHOULD_UPDATE });
      // Falta el dispatch ya sea para setear el value fijo o para mostrar un mensaje.
    } catch (error) {
      console.error(error.response.data);
      toast.error(error.response.data, { position: "bottom-left" });
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

export const nftsxpage = (payload) => {
  return { type: SET_NFTS_PER_PAGE, payload };
};

export const addNftOnShoppingCart = (nft) => {
  return { type: ADD_NFT_ON_SHOOPING_CART, payload: nft };
};

export const removeNftOfShoppingCart = (nftId) => {
  return { type: REMOVE_NFT_OF_SHOOPING_CART, payload: nftId };
};

export const injectLocalStorageCart = (payload) => {
  return { type: LOCAL_STORAGE_CART, payload };
};

export const freeShoppingCartState = () => {
  return { type: DELETE_NFT_ON_SIGNOUT };
};

export const buyNftOnShoppingCart = (nftsOnShoppingCart) => {
  return async (dispatch) => {
    const buyApi = await axios.post(`/payment`, nftsOnShoppingCart);
    console.log(buyApi);
    window.location.replace(buyApi.data.sandbox_init_point); // => prueba
    //
	  //window.location.replace(buyApi.data.init_point);
  };
};

/*
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
        //window.location.replace(data.init_point);
window.location.replace(data.sandbox_init_point);
      });
  };
};
*/






export const addBuyAtHistoryBuys = (buyData) => {
  return async (dispatch) => {
    const buy = await axios.post(`/buy`, buyData);
    dispatch({ type: ADD_BUY_AT_HISTORY_BUYS, payload: buy.data });
  };
};

// Email
export const sendFungibleMail = (sendData) => {
  return async (dispatch) => {
    await axios.post(`/fungiblemail`, sendData);
  };
};

// --- FAVS ---
export const addToFav = (payload) => {
  return { type: ADD_FAV, payload };
};

export const delToFav = (payload) => {
  return { type: DEL_FAV, payload };
};

export const removeFromFav = (nftId) => {
  return { type: REMOVE_FROM_FAVS, payload: nftId };
};

export const freeUserFavsState = () => {
  return { type: DELETE_FAVS_ON_SIGN_OUT };
};
export const injectLocalStorageFavs = (payload) => {
  return { type: LOCAL_STORAGE_FAVS, payload };
};

// --- THEME THINGS ---

export const toggleTheme = () => {
  return { type: TOGGLE_THEME };
};

export const injectLocalStorageTheme = (payload) => {
  return { type: LOCAL_STORAGE_THEME, payload };
};
