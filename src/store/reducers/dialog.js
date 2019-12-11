import * as actions from "../actions/dialog";
import {
  MARKET_DIALOG_SHOW,
  MARKET_DIALOG_CLOSE,
  MARKET_DIALOG_SELECT,
  GOODS_DIALOG_SHOW,
  GOODS_DIALOG_CLOSE,
  GOODS_DIALOG_SELECT,
  CATEGORY_DIALOG_SHOW,
  CATEGORY_DIALOG_CLOSE,
  CATEGORY_DIALOG_SELECT,
  OCR_DIALOG_SHOW,
  OCR_DIALOG_CLOSE,
} from "../actions/dialog";

const initialState = {
  showMarket: false,
  // marketList: [],
  marketItem: {},

  showGoods: false,
  goodsItem: {},
  multiSelect: false, //为true时，goodsList有值
  goodsList: [],

  showCategory: false,
  categoryList: [],

  showOCR: false,
  imgUrl: "",
};

const defaultAction = {
  type: "doNothing"
};

const banner = (state = initialState, action = defaultAction) => {
  switch (action.type) {
    case actions.MARKET_DIALOG_SHOW:
      return Object.assign({}, state, {
        showMarket: true
      });
    case actions.MARKET_DIALOG_CLOSE:
      return Object.assign({}, state, {
        showMarket: false
      });
    case actions.MARKET_DIALOG_SELECT:
      // return Object.assign({}, state, {
      let a = Object.assign({}, state, {
        // marketList: action.data
        marketItem: action.data
      });
      return a;

    case actions.GOODS_DIALOG_SHOW:
      return Object.assign({}, state, {
        showGoods: true,
        multiSelect: action.data
      });
    case actions.GOODS_DIALOG_CLOSE:
      return Object.assign({}, state, {
        showGoods: false
      });
    case actions.GOODS_DIALOG_SELECT:
      return Object.assign({}, state, {
        goodsItem: action.data
      });
    case actions.GOODS_DIALOG_LIST_SELECT:
      return Object.assign({}, state, {
        goodsList: action.data
      });

    case CATEGORY_DIALOG_SHOW:
      return Object.assign({}, state, {
        showCategory: true
      });
      break;
    case CATEGORY_DIALOG_CLOSE:
      return Object.assign({}, state, {
        showCategory: false
      });
      break;
    case CATEGORY_DIALOG_SELECT:
      return Object.assign({}, state, {
        // categoryList: action.data
        categoryList: action.data
      });
      break;

    case OCR_DIALOG_SHOW:
      return Object.assign({}, state, {
        showOCR: true,
        imgUrl: action.data,
      });
      break;
    case OCR_DIALOG_CLOSE:
      return Object.assign({}, state, {
        showOCR: false,
        imgUrl: "",
      });
      break;

    default:
      return state;
  }
};

export default banner;
