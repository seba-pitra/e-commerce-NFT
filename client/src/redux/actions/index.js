import axios from "axios";
import { toast } from "react-toastify";

// -- USER ACTIONS --
export const GET_ALL_USERS = "GET_ALL_USERS"; // moved
export const GET_USER_BY_ID = "GET_USER_BY_ID";// moved
export const GET_LOGGED_USER = "GET_LOGGED_USER";// moved
export const REMOVE_LOGGED_USER = "REMOVE_LOGGED_USER";// moved
export const REGISTER_USER = "REGISTER_USER";// moved
export const SIGN_IN_WITH_GOOGLE = "SIGN_IN_WITH_GOOGLE";// moved

// -- GETTERS --
export const GET_ALL_NFTS = "GET_ALL_NFTS";
export const GET_ALL_COLLECTIONS = "GET_ALL_COLLECTIONS";
export const GET_NFT_DETAIL = "GET_NFT_DETAIL";

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

// -- PAGINATION --
export const SET_ACTIVE_PAGE = "SET_ACTIVE_PAGE";
export const SELECT_PAGE = "SELECT_PAGE";
export const PREV_PAGE = "PREV_PAGE";
export const NEXT_PAGE = "NEXT_PAGE";
export const SET_NFTS_PER_PAGE = "SET_NFTS_PER_PAGE";

// -- LOCALSTORAGE --
export const GET_ACTIVE_USER = "GET_ACTIVE_USER";
export const LOCAL_STORAGE_CART = "LOCAL_STORAGE_CART";

// -- SHOPPING KART --
export const ADD_NFT_ON_SHOOPING_CART = "ADD_NFT_ON_SHOOPING_CART";
export const REMOVE_NFT_OF_SHOOPING_CART = "REMOVE_NFT_OF_SHOOPING_CART";
export const BUY_NFT_ON_SHOOPING_CART = "BUY_NFT_ON_SHOOPING_CART";
export const DELETE_NFT_ON_SIGNOUT = "DELETE_NFT_ON_SIGNOUT";
export const ADD_BUY_AT_HISTORY_BUYS = "ADD_BUY_AT_HISTORY_BUYS";

export const ADD_FAV = "ADD_FAV";

// -- GETTERS --

export const getAllNfts = () => {
  return async (dispatch) => {
    dispatch({ type: LOADING });
    try {
      const allNfts = await axios.get("/nft");
      console.log(allNfts.data.length);
      dispatch({ type: GET_ALL_NFTS, payload: allNfts.data });
    } catch (e) {
      toast.error("Something was wrong. Try again later");
      // console.log(e.message);
    }
  };
};

export const getEthPrice = () => {
  return async (dispatch) => {
    try {
      const ethPrice = await axios.get(
        "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD,ARS"
      );
      // console.log(ethPrice.data);
      dispatch({ type: GET_ETH_PRICE, payload: ethPrice.data });
    } catch (e) {
      toast.error("Something was wrong. Try again later");
      // console.log(e.message);
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
      toast.error("Something was wrong. Try again later");
      console.log(e.message);
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
      // console.log(e.response.data);
    }
  };
};

// --- USER ACTIONS ---

export const getAllUsers = () => {
  return async (dispatch) => {
    try {
      const allUsers = await axios.get("/user");
      console.log(allUsers.data);
      dispatch({ type: GET_ALL_USERS, payload: allUsers.data });
    } catch (e) {
      toast.error("Something was wrong. Try again later");
      // console.log(e.message);
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
      toast.error("Something was wrong. Try again later");
      // console.log("There was a connection error, please try again later user");
    }
  };
};

export const updateUser = (id, body) => {
  return async (dispatch) => {
    try {
      const update = await axios.put(`/user/${id}`, body);
      dispatch({ type: GET_USER_BY_ID, payload: update.data });
    } catch (error) {
      toast.error("Something was wrong. Try again later");
    }
  };
};

export const registerUser = (userData) => {
  return async (dispatch) => {
    try {
      const newUser = await axios.post("/user/register", userData);
      console.log("REGISTER", newUser);
      dispatch({ type: REGISTER_USER });
    } catch (error) {
      throw new Error(error.message);
    }
  };
};

export const signInWithGoogle = (userData) => {
  return async (dispatch) => {
    try {
      const newUser = await axios.post("user/google/signin", userData);
      console.log("SIGN WITH GOOGLE", newUser);
      dispatch({ type: SIGN_IN_WITH_GOOGLE });
    } catch (error) {
      throw new Error(error.message);
    }
  };
};

export const getLoggedUser = (id) => {
  return async (dispatch) => {
    try {
      const loggedUser = await axios.get(`/user/${id}`);
      dispatch({ type: GET_LOGGED_USER, payload: loggedUser.data });
    } catch (error) {
      toast.error("Logged user doesn exist");
      // console.warn(error.message);
    }
  };
};

export const removeLoggedUser = () => {
  return { type: REMOVE_LOGGED_USER };
};

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
      toast.success("Collection created successfully");
      // window.location.href = "/marketplace";
    } catch (e) {
      toast.error("Something was wrong. try again later");
    }
  };
};

export const createCollection = (payload) => {
  return async (dispatch) => {
    try {
      const createdNft = await axios.post(`/collection/create`, payload);
      dispatch({ type: CREATE_COLLECTION, payload: createdNft.data }); // msj desde el back

      toast.success("Collection created successfully");
      // window.location.href = "/marketplace";
    } catch (e) {
      toast.error("Something was wrong. try again later");
    }
  };
};

export const deleteNft = (id) => {
  return async (dispatch) => {
    try {
      const deletedNft = await axios.delete(`/nft/${id}`);
      dispatch({ type: DELETE_NFT, payload: deletedNft.data }); // msj desde el back
      toast.success("NFT deleted successfully");
    } catch (e) {
      toast.error("Something was wrong. try again later");
      console.log(e.response.data);
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
      toast.success("NFT updated successfully");
    } catch (e) {
      toast.error(e.response.data);
      // console.log(e.response.data);
    }
  };
};

export const addViewNft = (id) => {
  return async () => {
    try {
      await axios.put(`/nft/addView/${id}`);
    } catch (e) {
      alert(e.response.data);
    }
  };
};

export const addStars = (payload) => {
  return async () => {
    try {
      console.log("id", payload.id);
      console.log("rating", payload.rating);
      await axios.put(`/nft/addStar/${payload.id}`, {rating: payload.rating});
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

export const nftsxpage = (payload) => {
  return { type: SET_NFTS_PER_PAGE, payload };
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
    const buyApi = await axios.post(`/payment`, nftsOnShoppingCart);

    window.location.replace(buyApi.data.sandbox_init_point); // => prueba
    // window.location.replace(buyApi.data.init_point);
  };
};

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
  return { type: ADD_FAV, payload};
};
