import { ADD_NEW_PRODUCT, ALL_PRODUCTS,UPDATE_PRODUCT, DELETE_PRODUCT, FETCH_PRODUCTS_BY_USER, FETCH_CLIENT, START_LOADING, END_LOADING } from '../actions/constants'

const productReducer = (state = { isLoading: true, products: [] }, action) => {
    switch (action.type) {
      case START_LOADING:
        return { ...state, isLoading: true };
      case END_LOADING:
        return { ...state, isLoading: false };
      case ALL_PRODUCTS:
        return {
          ...state,
          products: action.payload.data,
          currentPage: action.payload.currentPage,
          numberOfPages: action.payload.numberOfPages,
        };
      case FETCH_PRODUCTS_BY_USER:
        return { ...state, products: action.payload };

      case FETCH_CLIENT:
        return { ...state, client: action.payload.client };
      case ADD_NEW_PRODUCT:
        return { ...state, products: [...state.products, action.payload] };
      case UPDATE_PRODUCT:
        return { ...state, products: state.products.map((product) => (product._id === action.payload._id ? action.payload : product)) };
      case DELETE_PRODUCT:
        return { ...state, products: state.products.filter((product) => product._id !== action.payload) };
      default:
        return state;
    }
  };

export default productReducer;



