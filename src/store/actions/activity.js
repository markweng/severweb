import { message } from "antd";
import http from "@/utils/http";
import history from "@/utils/history";

//获取活动列表
export const GET_AVTIVITY_LIST_REQUEST = "GET_AVTIVITY_LIST_REQUEST";
export const GET_AVTIVITY_LIST_SUCCESS = "GET_AVTIVITY_LIST_SUCCESS";
export const GET_AVTIVITY_LIST_FAILED = "GET_AVTIVITY_LIST_FAILED";
//活动商品列表
export const GET_AVTIVITY_GOODS_LIST_REQUEST = "GET_AVTIVITY_GOODS_LIST_REQUEST";
export const GET_AVTIVITY_GOODS_LIST_SUCCESS = "GET_AVTIVITY_GOODS_LIST_SUCCESS";
export const GET_AVTIVITY_GOODS_LIST_FAILED = "GET_AVTIVITY_GOODS_LIST_FAILED";
//秒杀商品列表
export const GET_SECOND_KILL_GOODS_LIST_REQUEST = "GET_SECOND_KILL_GOODS_LIST_REQUEST";
export const GET_SECOND_KILL_GOODS_LIST_SUCCESS = "GET_SECOND_KILL_GOODS_LIST_SUCCESS";
export const GET_SECOND_KILL_GOODS_LIST_FAILED = "GET_SECOND_KILL_GOODS_LIST_FAILED";
//满减商品列表
export const GET_MONEY_OFF_GOODS_LIST_REQUEST = "GET_MONEY_OFF_GOODS_LIST_REQUEST";
export const GET_MONEY_OFF_GOODS_LIST_SUCCESS = "GET_MONEY_OFF_GOODS_LIST_SUCCESS";
export const GET_MONEY_OFFL_GOODS_LIST_FAILED = "GET_MONEY_OFF_GOODS_LIST_FAILED";
export function getActivityList(params) {
    return dispatch => {
    //   dispatch({ type: GET_AVTIVITY_LIST_REQUEST });
    //   http({
    //     url: "",
    //     params
    //   })
    //     .then(res => {
    //       dispatch({
    //         type: GET_AVTIVITY_LIST_SUCCESS,
    //         data: res.data.data
    //       });
    //     })
    //     .catch(err => {
    //       dispatch({ type: GET_AVTIVITY_LIST_FAILED });
    //     });
    dispatch({
        type: GET_AVTIVITY_LIST_SUCCESS,
        data: {
            "code": 1000,
            "url": "/ordinary.user.paginate",
            "time": "2019-07-18T11:37:03+08:00",
            "msg": "操作成功",
            "data": {
                "total": 5,
                "per_page": 10,
                "current_page": 1,
                "last_page": 2,
                "data": [{id:1,activity_name:"促销活动1",activity_code:1001,activity_start_time:1563272204,activity_end_time:1563273000,activity_state:1,creater:'laowang',create_time:1563292204,operationer:'laowang',last_operation_time:1563252204},
                {id:2,activity_name:"促销活动1",activity_code:1002,activity_start_time:1563272204,activity_end_time:1563273000,activity_state:2,creater:'laowang',create_time:1563292204,operationer:'laowang',last_operation_time:1563252204},
                {id:3,activity_name:"促销活动1",activity_code:1003,activity_start_time:1563272204,activity_end_time:1566273000,activity_state:3,creater:'laowang',create_time:1563392204,operationer:'laowang',last_operation_time:1563252204},
                {id:4,activity_name:"促销活动1",activity_code:1004,activity_start_time:1563272204,activity_end_time:1564273000,activity_state:3,creater:'laowang',create_time:1563492204,operationer:'laowang',last_operation_time:1563252204},
                {id:5,activity_name:"促销活动1",activity_code:1005,activity_start_time:1563272204,activity_end_time:1565273000,activity_state:1,creater:'laowang',create_time:1563592204,operationer:'laowang',last_operation_time:1563252204}]
            }
        }
      });
    };
  }

  export function getActivityGoodsList(params) {
    return dispatch => {
    //   dispatch({ type: GET_AVTIVITY_GOODS_LIST_REQUEST });
    //   http({
    //     url: "",
    //     params
    //   })
    //     .then(res => {
    //       dispatch({
    //         type: GET_AVTIVITY_GOODS_LIST_SUCCESS,
    //         data: res.data.data
    //       });
    //     })
    //     .catch(err => {
    //       dispatch({ type: GET_AVTIVITY_LIST_FAILED });
    //     });
    dispatch({
        type: GET_AVTIVITY_GOODS_LIST_SUCCESS,
        data: {
            "code": 1000,
            "url": "/ordinary.user.paginate",
            "time": "2019-07-18T11:37:03+08:00",
            "msg": "操作成功",
            "data": {
                "total": 1,
                "per_page": 20,
                "current_page": 1,
                "last_page": 2,
                "data": [{id:1,activity_name:"http://img2.imgtn.bdimg.com/it/u=3026101701,3242477403&fm=26&gp=0.jpg",activity_code:1001,goods_id:10001,goods_name:"神油",goods_current_price:100.00,goods_inventory:100,sales_price:100.00,coupon_id:10001},
                {id:2,goods_main_image:"http://img2.imgtn.bdimg.com/it/u=3026101701,3242477403&fm=26&gp=0.jpg",activity_code:1002,goods_id:10002,goods_name:"神油",goods_current_price:100.00,goods_inventory:10000,sales_price:100.00,coupon_id:10001},
                {id:3,goods_main_image:"http://img2.imgtn.bdimg.com/it/u=3026101701,3242477403&fm=26&gp=0.jpg",activity_code:1003,goods_id:10003,goods_name:"神油",goods_current_price:100.00,goods_inventory:1000,sales_price:100.00,coupon_id:10001,},
                {id:4,goods_main_image:"http://img2.imgtn.bdimg.com/it/u=3026101701,3242477403&fm=26&gp=0.jpg",activity_code:1004,goods_id:10004,goods_name:"神油",goods_current_price:100.00,goods_inventory:10009,sales_price:100.00,coupon_id:10001},
                {id:5,goods_main_image:"http://img2.imgtn.bdimg.com/it/u=3026101701,3242477403&fm=26&gp=0.jpg",activity_code:1005,goods_id:10005,goods_name:"神油",goods_current_price:100.00,goods_inventory:99,sales_price:100.00,coupon_id:10001}]
            }
        }
      });
    };
  }
  export function getSecondKillGoodsList(params) {
    return dispatch => {
    //   dispatch({ type: GET_SECOND_KILL_GOODS_LIST_REQUEST });
    //   http({
    //     url: "",
    //     params
    //   })
    //     .then(res => {
    //       dispatch({
    //         type: GET_SECOND_KILL_GOODS_LIST_SUCCESS,
    //         data: res.data.data
    //       });
    //     })
    //     .catch(err => {
    //       dispatch({ type: GET_AVTIVITY_LIST_FAILED });
    //     });
    dispatch({
        type: GET_SECOND_KILL_GOODS_LIST_SUCCESS,
        data: {
            "code": 1000,
            "url": "/ordinary.user.paginate",
            "time": "2019-07-18T11:37:03+08:00",
            "msg": "操作成功",
            "data": {
                "total": 1,
                "per_page": 20,
                "current_page": 1,
                "last_page": 2,
                "data": [{id:1,start_time:1563272204,end_time:1001,activity_state:1,activity_goods_count:100,operationer:"李卡卡",last_operation_time:1563272204},
                        {id:2,start_time:1563272204,end_time:1001,activity_state:3,activity_goods_count:100,operationer:"李卡卡",last_operation_time:1563272204},
                        {id:3,start_time:1563272204,end_time:1001,activity_state:3,activity_goods_count:100,operationer:"李卡卡",last_operation_time:1563272204},
                        {id:4,start_time:1563272204,end_time:1001,activity_state:2,activity_goods_count:100,operationer:"李卡卡",last_operation_time:1563272204},
                        {id:5,start_time:1563272204,end_time:1001,activity_state:1,activity_goods_count:100,operationer:"李卡卡",last_operation_time:1563272204}]
            }
        }
      });
    };
  }

  export function getMoneyOffGoodsList(params) {
    return dispatch => {
    //   dispatch({ type: GET_SECOND_KILL_GOODS_LIST_REQUEST });
    //   http({
    //     url: "",
    //     params
    //   })
    //     .then(res => {
    //       dispatch({
    //         type: GET_SECOND_KILL_GOODS_LIST_SUCCESS,
    //         data: res.data.data
    //       });
    //     })
    //     .catch(err => {
    //       dispatch({ type: GET_AVTIVITY_LIST_FAILED });
    //     });
    dispatch({
        type: GET_SECOND_KILL_GOODS_LIST_SUCCESS,
        data: {
            "code": 1000,
            "url": "/ordinary.user.paginate",
            "time": "2019-07-18T11:37:03+08:00",
            "msg": "操作成功",
            "data": {
                "total": 1,
                "per_page": 20,
                "current_page": 1,
                "last_page": 2,
                "data": [{id:1,start_time:1563272204,end_time:1001,activity_state:1,activity_goods_count:100,operationer:"李卡卡",last_operation_time:1563272204},
                        {id:2,start_time:1563272204,end_time:1001,activity_state:3,activity_goods_count:100,operationer:"李卡卡",last_operation_time:1563272204},
                        {id:3,start_time:1563272204,end_time:1001,activity_state:3,activity_goods_count:100,operationer:"李卡卡",last_operation_time:1563272204},
                        {id:4,start_time:1563272204,end_time:1001,activity_state:2,activity_goods_count:100,operationer:"李卡卡",last_operation_time:1563272204},
                        {id:5,start_time:1563272204,end_time:1001,activity_state:1,activity_goods_count:100,operationer:"李卡卡",last_operation_time:1563272204}]
            }
        }
      });
    };
  }