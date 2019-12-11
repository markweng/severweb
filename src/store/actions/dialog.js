export const MARKET_DIALOG_SHOW = "MARKET_DIALOG_SHOW";
export const MARKET_DIALOG_CLOSE = "MARKET_DIALOG_CLOSE";
export const MARKET_DIALOG_SELECT = "MARKET_DIALOG_SELECT";

export const GOODS_DIALOG_SHOW = "GOODS_DIALOG_SHOW";
export const GOODS_DIALOG_CLOSE = "GOODS_DIALOG_CLOSE";
export const GOODS_DIALOG_SELECT = "GOODS_DIALOG_SELECT";
export const GOODS_DIALOG_LIST_SELECT = "GOODS_DIALOG_LIST_SELECT";

export const CATEGORY_DIALOG_SHOW = "CATEGORY_DIALOG_SHOW";
export const CATEGORY_DIALOG_CLOSE = "CATEGORY_DIALOG_CLOSE";
export const CATEGORY_DIALOG_SELECT = "CATEGORY_DIALOG_SELECT";

export const OCR_DIALOG_SHOW = "OCR_DIALOG_SHOW";
export const OCR_DIALOG_CLOSE = "OCR_DIALOG_CLOSE";

//推荐专题
export function showMarket() {
  return {
    type: MARKET_DIALOG_SHOW
  };
}

export function closeMarket() {
  return {
    type: MARKET_DIALOG_CLOSE
  };
}

export function onMarketSelect(data) {
  return {
    type: MARKET_DIALOG_SELECT,
    data
  };
}

//推荐商品
export function showGoods(data) {
  return {
    type: GOODS_DIALOG_SHOW,
    data
  };
}

export function closeGoods() {
  return {
    type: GOODS_DIALOG_CLOSE
  };
}

export function onGoodsSelect(data) {
  return {
    type: GOODS_DIALOG_SELECT,
    data
  };
}

export function onGoodsListSelect(data) {
  return {
    type: GOODS_DIALOG_LIST_SELECT,
    data
  };
}

//商品分类
export function showCategory() {
  return {
    type: CATEGORY_DIALOG_SHOW
  };
}

export function closeCategory() {
  return {
    type: CATEGORY_DIALOG_CLOSE
  };
}

export function onCategorySelect(data) {
  return {
    type: CATEGORY_DIALOG_SELECT,
    data
  };
}

//OCR
export function showOCRView(imgUrl) {
  return {
    type: OCR_DIALOG_SHOW,
    data: imgUrl
  };
}

export function closeOCRView() {
  return {
    type: OCR_DIALOG_CLOSE
  };
}
