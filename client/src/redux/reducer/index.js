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
  SET_CATEGORY_SPECIES,
  SET_CATEGORY_SPECIES2,
  SET_CATEGORY_ART,
  SET_CATEGORY_TYPE,
  SET_CATEGORY_STYLE,
  SET_CATEGORY_REST,
  SET_CATEGORY_BACKG,
  FILTER_NFT_CATEGORY,
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
  GET_ACTIVE_USER,
  LOCAL_STORAGE_CART,
  DELETE_NFT_ON_SIGNOUT,
} from "../actions";
import * as controllers from "../../utils";

const initialState = {
  nfts: [],
  filteredNfts: [],
  collections: [],
  categorySpecies: [],
  categorySpecies2: [], 
  categoryArt: [],
  categoryType: [],
  categoryStyle: [],
  categoryRest: [], 
  categoryBackg: [],
  users: [],
  userNfts: [],
  nftDetail: {},
  isLoading: false,
  orderDirection: "up-down",
  activePage: 1,
  nftsPerPage: 100,
  msj: "",
  ethPrice: {},
  activeUser: {},
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return { ...state, isLoading: true };
    
    // --- GETTERS ---
    case GET_ALL_NFTS:
      return { ...state, nfts: action.payload, filteredNfts: action.payload, nftDetail: {}, isLoading: false, categorySpecies: [],
      categorySpecies2: [], categoryArt: [], categoryType: [], categoryStyle: [], categoryRest: [], categoryBackg: [], };   
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

    // --- SETTERS ---
    case SET_CATEGORY_SPECIES:
      return { ...state, categorySpecies: action.payload };
    case SET_CATEGORY_SPECIES2:
      return { ...state, categorySpecies2: action.payload };
    case SET_CATEGORY_ART:
      return { ...state, categoryArt: action.payload };
    case SET_CATEGORY_TYPE:
      return { ...state, categoryType: action.payload };
    case SET_CATEGORY_STYLE:
      return { ...state, categoryStyle: action.payload };
    case SET_CATEGORY_REST:
      return { ...state, categoryRest: action.payload };
    case SET_CATEGORY_BACKG:
      return { ...state, categoryBackg: action.payload };

    // --- FILTERS ---
    case FILTER_NFT_CATEGORY:
      console.log("------------------------------------------------------------------------------------------------")
      console.log("1 - Species", state.categorySpecies)
      console.log("2 - Species2", state.categorySpecies2)
      console.log("3 - Art", state.categoryArt)
      console.log("4 - Type", state.categoryType)
      console.log("5 - Style", state.categoryStyle)
      console.log("6 - Rest", state.categoryRest)
      console.log("7 - Backg", state.categoryBackg)
      return { ...state }

    case RESET_FILTERS:
      return { ...state, filteredNfts: state.nfts, categories: [], activePage: 1, categorySpecies: [], categorySpecies2: [], 
      categoryArt: [], categoryType: [], categoryStyle: [], categoryRest: [], categoryBackg: [] };

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
    
    // --- ORDERS ---
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
    
    // --- PAGINATION ---
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

    // --- LOCAL STORAGE ---
    case GET_ACTIVE_USER:
      return {
      ...state,
      activeUser: action.payload,	
      };
    case LOCAL_STORAGE_CART:
      return {
      ...state,
      userNfts: action.payload,
      }
    case DELETE_NFT_ON_SIGNOUT:
      return {
      ...state,
      userNfts: [],
      }

    // --- CART ---
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
