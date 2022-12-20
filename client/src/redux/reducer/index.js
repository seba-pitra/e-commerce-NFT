import {
  GET_ALL_NFTS,
  GET_ALL_COLLECTIONS,
  GET_ALL_USERS,
  GET_NFT_DETAIL,
  CREATE_NFT,
  DELETE_NFT,
  UPDATE_NFT,
  LOADING,
  RESET_FILTERS,
  FILTER_NFT_COLLECTION,
  FILTER_NFT_CATEGORY,
  FILTER_NFT_STATE,
  FILTER_NFT_PRICE,
  FILTER_NFT_NAME,
  ORDER_NFT_NAME,
  ORDER_NFT_PRICE,
  GET_ETH_PRICE,
  // ORDER_NFT_AMOUNT,
  // ORDER_NFT_CREATED_AT,
  CHANGE_ORDER_DIRECTION,
  SELECT_PAGE,
  PREV_PAGE,
  NEXT_PAGE,
  SET_NFTS_PER_PAGE,
  ADD_NFT_ON_SHOOPING_CART,
  REMOVE_NFT_OF_SHOOPING_CART,
  BUY_NFT_ON_SHOOPING_CART,
} from "../actions";
import * as controllers from "../../utils";

const initialState = {
  nfts: [],
  filteredNfts: [],
  collections: [],
  categories: [],
  users: [],
  userNfts: [],
  nftDetail: {},
  isLoading: false,
  orderDirection: "up-down",
  activePage: 1,
  nftsPerPage: 100,
  msj: "",
  ethPrice: {},
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return { ...state, isLoading: true };
    case GET_ALL_NFTS:
      return {
        ...state,
        nfts: action.payload,
        filteredNfts: controllers.orderNFTByName(
          state.orderDirection,
          action.payload
        ),
        nftDetail: {},
        isLoading: false,
        categories: [],
      };
    case GET_ALL_COLLECTIONS:
      return { ...state, collections: action.payload, isLoading: false };
    case GET_ALL_USERS:
      return { ...state, users: action.payload };
    case GET_NFT_DETAIL:
      return { ...state, nftDetail: action.payload, isLoading: false };
    case CREATE_NFT:
      return { ...state, msj: action.payload };
    case DELETE_NFT:
      return { ...state, msj: action.payload };
    case UPDATE_NFT:
      return { ...state, msj: action.payload };
    case RESET_FILTERS:
      return {
        ...state,
        filteredNfts: state.nfts,
        categories: [],
        activePage: 1,
      };
    case FILTER_NFT_COLLECTION:
      let filterByCollection = [];
      filterByCollection = state.nfts.filter(
        (e) => e.collectionId === action.payload
      );
      return { ...state, filteredNfts: filterByCollection, activePage: 1 };
    case FILTER_NFT_NAME:
      let filterByName = [];
      filterByName = state.nfts.filter((e) =>
        e.name.toUpperCase().includes(action.payload.toUpperCase())
      );
      return { ...state, filteredNfts: filterByName };
    case FILTER_NFT_CATEGORY:
      let filterByCategory = state.nfts;
      if (!state.categories.includes(action.payload))
        state.categories = [...state.categories, action.payload];
      else
        state.categories = state.categories.filter((e) => e !== action.payload);
      state.categories.map((e) => {
        return (filterByCategory = filterByCategory.filter((nft) =>
          nft.category.includes(e)
        ));
      });
      return { ...state, filteredNfts: filterByCategory, activePage: 1 };
    case FILTER_NFT_PRICE:
      let filterByPrice = []; // enviar error if max < min front?
      filterByPrice = state.nfts.filter((e) => e.price !== 0); // sin max o min no filtra? resetea si se borra alguno?
      if (action.payload.currency === "ETH") {
        if (action.payload.min !== 0)
          filterByPrice = state.nfts.filter(
            (e) => e.price > action.payload.min
          );
        if (action.payload.max !== 0)
          filterByPrice = filterByPrice.filter(
            (e) => e.price < action.payload.max
          );
      } else if (action.payload.currency === "USD") {
        if (action.payload.min !== 0)
          filterByPrice = state.nfts.filter(
            (e) => e.price * state.ethPrice.USD > action.payload.min
          );
        if (action.payload.max !== 0)
          filterByPrice = filterByPrice.filter(
            (e) => e.price * state.ethPrice.USD < action.payload.max
          );
      } else {
        if (action.payload.min !== 0)
          filterByPrice = state.nfts.filter(
            (e) => e.price * state.ethPrice.ARS > action.payload.min
          );
        if (action.payload.max !== 0)
          filterByPrice = filterByPrice.filter(
            (e) => e.price * state.ethPrice.ARS < action.payload.max
          );
      }
      return { ...state, filteredNfts: filterByPrice, activePage: 1 };
    case FILTER_NFT_STATE:
      let filterByState = [];
      if (action.payload === "auction")
        filterByState = state.nfts.filter((e) => e.type === "auction");
      else if (action.payload === "buynow")
        filterByState = state.nfts.filter((e) => e.type === "buynow");
      else
        filterByState = state.nfts.filter(
          (e) => e.type === "buynow" || e.type === "auction"
        ); // boton all que elimine este filtrado > funcionara?
      return { ...state, filteredNfts: filterByState, activePage: 1 };
    case CHANGE_ORDER_DIRECTION:
      let newOrder;
      if (state.orderDirection === "up-down") newOrder = "down-up";
      else if (state.orderDirection === "down-up") newOrder = "up-down";
      return { ...state, orderDirection: newOrder, activePage: 1 };
    case ORDER_NFT_NAME:
      let orderedByName = controllers.orderNFTBy(
        "name",
        state.orderDirection,
        state.filteredNfts
      );
      return { ...state, filteredNfts: orderedByName, activePage: 1 };
    case ORDER_NFT_PRICE:
      let orderedbyPrice = controllers.orderNFTBy(
        "price",
        state.orderDirection,
        state.filteredNfts
      );
      return { ...state, filteredNfts: orderedbyPrice, activePage: 1 };
    // case ORDER_NFT_AMOUNT:
    //   let orderedByAmount = controllers.orderNFTBy( "amount", state.orderDirection, state.filteredNfts );
    //   return { ...state, filteredNfts: orderedByAmount, activePage: 1 };
    // case ORDER_NFT_CREATED_AT:
    //   let orderedByCreation = controllers.orderNFTBy( "creationDate", state.orderDirection, state.filteredNfts );
    //   return { ...state, filteredNfts: orderedByCreation, activePage: 1 };
    case SELECT_PAGE:
      return { ...state, activePage: action.payload };
    case SET_NFTS_PER_PAGE:
      return { ...state, gamesPerPage: action.payload, activePage: 1 };
    case NEXT_PAGE:
      return { ...state, activePage: state.activePage + 1 };
    case PREV_PAGE:
      return { ...state, activePage: state.activePage - 1 };
    case GET_ETH_PRICE:
      return { ...state, ethPrice: action.payload };
    case ADD_NFT_ON_SHOOPING_CART:
      const foundNft = state.userNfts.find(
        (nft) => nft.id === action.payload.id
      );
      if (foundNft) return { ...state };

      return {
        ...state,
        userNfts: [...state.userNfts, action.payload],
      };
    case REMOVE_NFT_OF_SHOOPING_CART:
      return {
        ...state,
        userNfts: state.userNfts.filter((nft) => nft.id !== action.payload),
      };
    case BUY_NFT_ON_SHOOPING_CART:
      return {
        ...state,
        redirectMercadoPago: action.payload,
      };
    default:
      return { ...state };
  }
};

export default rootReducer;
