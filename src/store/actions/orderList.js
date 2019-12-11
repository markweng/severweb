import http from "@/utils/http";

export const GET_ORDER_LIST_REQUEST = "GET_ORDER_LIST_REQUEST";
export const GET_ORDER_LIST_SUCCESS = "GET_ORDER_LIST_SUCCESS";
export const GET_ORDER_LIST_FAILED = "GET_ORDER_LIST_REQUEST";

export const GET_ORDER_DETAIL_REQUEST = "GET_ORDER_DETAIL_REQUEST";
export const GET_ORDER_DETAIL_SUCCESS = "GET_ORDER_DETAIL_SUCCESS";
export const GET_ORDER_DETAIL_FAILED = "GET_ORDER_DETAIL_REQUEST";

export const GET_ORDER_RECORD_SUCCESS = "GET_ORDER_RECORD_SUCCESS";

export const CONFIRM_ORDER_LOADING = "CONFIRM_ORDER_LOADING";
export const CONFIRM_ORDER_OVER = "CONFIRM_ORDER_OVER";

//获取订单列表
export function getOrderList(data) {
  return dispatch => {
    dispatch({
      type: GET_ORDER_LIST_REQUEST
    });
    http({
      url: "/order/paginate",
      method: "post",
      data
    })
      .then(res => {
        dispatch({
          type: GET_ORDER_LIST_SUCCESS,
          data: res.data.data
        });
      })
      .catch(err => {
        dispatch({
          type: GET_ORDER_LIST_FAILED
        });
      });
  };
}

//获取订单详情
export function getOrderDetail(data, callback) {
  return dispatch => {
    dispatch({
      type: GET_ORDER_DETAIL_REQUEST
    });
    http({
      url: "/order/get",
      method: "post",
      data
    })
      .then(res => {
        dispatch({
          type: GET_ORDER_DETAIL_SUCCESS,
          data: res.data.data
        });
        if (callback) {
          callback(res.data.data);
        }
      })
      .catch(err => {
        dispatch({
          type: GET_ORDER_DETAIL_FAILED
        });
      });
  };
}

//获取订单操作记录
export function getOrderRecord(params) {
  return dispatch => {
    http({
      url: "/order/records",
      params
    })
      .then(res => {
        dispatch({
          type: GET_ORDER_RECORD_SUCCESS,
          data: res.data.data
        });
      })
      .catch(err => {});
  };
}

// //确认订单
// export function confirmOrder (data) {
//   return (dispatch) => {
//     dispatch({
//       type: CONFIRM_ORDER_LOADING
//     });
//     http({
//       url: '/order/confirm',
//       method: 'post',
//       data
//     })
//         .then(res => {
//           dispatch({
//             type: CONFIRM_ORDER_OVER
//           });
//           dispatch(getOrderDetail({ id: data.id }));
//           dispatch(getRecordList({ id: data.id }));
//         })
//         .catch(err => {
//           dispatch({
//             type: CONFIRM_ORDER_OVER
//           });
//         });
//   };
// }
