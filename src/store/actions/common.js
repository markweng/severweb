import http from "@/utils/http";

//拍照订单列表
export const PAGE_REQUEST_START = "REQUEST_START";
export const PAGE_REQUEST_END = "REQUEST_END";

export const PAGE_REFRESH_ON = "PAGE_REFRESH_ON";
export const PAGE_REFRESH_OFF = "PAGE_REFRESH_OFF";

//获取拍照订单列表
export function pageRequestStart() {
  return { type: PAGE_REQUEST_START };
}

export function pageRequestEnd() {
  return { type: PAGE_REQUEST_END };
}

export function pageRequestRefreshOn() {
  return { type: PAGE_REFRESH_ON };
}

export function pageRequestRefreshOff() {
  return { type: PAGE_REFRESH_OFF };
}
