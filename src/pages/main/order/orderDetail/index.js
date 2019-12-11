import React from "react";
import { Icon, Input, Button, Table, message, Spin, Modal } from "antd";
import { connect } from "react-redux";
import {
  getOrderDetail,
  getOrderRecord
  // confirmOrder,
  // payOrder,
  // removeOrder,
  // remarkOrder
} from "@/store/actions/orderList";
import qs from "qs";
import "./index.less";
import OrderDetailCard from "../card";
import CancelOrderModal from "../cancelOrderModal";
import OrderInfo from "../orderInfo";
import moment from "moment";
// import OperationRecord from "../operationRecord/index.js";

import BaseComponent from "@/components/baseComponent";
import history from "@/utils/history";
const confirm = Modal.confirm;
const Column = Table.Column;
const { TextArea } = Input;

const OPERATION = {
  0: "未知",
  1: "待确认",
  2: "已确认",
  3: "确认取消",
  4: "部分分单",
  5: "全部分单"
};
const IS_PAY = { 0: "未付款", 1: "已付款" };
const STATUS = {
  1: "未发货",
  2: "部分发货",
  3: "全部发货",
  4: "确认收货",
  5: "已完成",
  6: "订单取消"
};

const payType = { 1: "货到付款", 2: "支付宝", 3: "微信" };
const delivery = { 1: "自提", 2: "快递", 3: "同城快送" };
const origin = { 1: "PC端商城", 0: "数据错误" };

const goodsStatus = {
  0: "",
  1: "查看",
  2: "生成发货单",
  3: "去发货",
  4: "售后处理中",
  5: "售后已完成"
};

const apiList = {
  confirm: "order/confirm", //确认
  remove: "order/removeorder", //移除
  remark: "order/record", //备注
  createExpress: "order/createorderexpress", //生成发货单
  createGoodsExpress: "order/creategoodsexpress", //商品生成发货单
  cancel: "order/cancelorder", //取消
  send: "express/send",
  is_pay: "order/paymentorder",
  expressList: "express/paginate",
  recordlist: "order/recordlist"
};

class OrderList extends BaseComponent {
  constructor(props) {
    super(props);
    this.titleName = ["订单管理", "详情"];
    this.state = {
      remark: "",
      showCancelOrderModal: false,
      orderId: ""
    };
  }

  componentDidMount() {
    super.componentDidMount();
    const orderId = qs.parse(window.location.search.split("?")[1]);
    const { dispatch } = this.props;
    this.setState({ orderId: orderId.id });
    dispatch(getOrderDetail({ id: orderId.id }));
    dispatch(getOrderRecord({ id: orderId.id }));
  }

  //发货
  deliverGoods() {
    if (this.hasAuth("send")) {
      const { detail } = this.props;
      history.push(`/shippingList?number=${detail.number}`);
    }
  }

  orderOperation(type) {
    const { dispatch, detail, authsList } = this.props;
    const { remark } = this.state;
    if (!this.hasAuth(type)) {
      return;
    }
    if (!remark && type === "remark") {
      message.error("请输入操作备注");
      return;
    }
    switch (type) {
      case "remove":
        // dispatch(removeOrder({ id: detail.id, remark })); //移除
        return;
      case "is_pay":
        // confirm({
        //   title: "确认订单已支付?",
        //   onOk: () => {
        //     dispatch(payOrder({ id: detail.id, remark })); //已付款
        //   }
        // });
        return;
      case "remark":
        // dispatch(remarkOrder({ id: detail.id, remark })); //备注
        return;
      case "confirm":
        // dispatch(confirmOrder({ id: detail.id, remark })); //确认
        return;
    }
  }

  goodsOperation(goods) {
    const { history, detail } = this.props;
    let statusOperation = {
      1: "expressList",
      2: "createGoodsExpress",
      3: "send"
    };
    if (!this.hasAuth(statusOperation[goods.status])) {
      return;
    }
    if (goods.status == 2) {
      history.push(
        `/generatingInvoices?id=${goods.order_id}&goods_id=${goods.goods_id}`
      );
    } else {
      history.push(`/shippingList?number=${detail.number}`);
    }
  }

  doCancel() {
    if (this.hasAuth("cancel")) {
      this.setState({ showCancelOrderModal: true });
    }
  }

  doCreateExpress(detail) {
    if (this.hasAuth("createExpress")) {
      history.push(`/generatingInvoices?id=${detail.id}`);
    }
  }

  hasAuth(type) {
    const { authsList } = this.props;
    let hasAuth = true;
    if (!authsList.find(item => item.name === apiList[type])) {
      message.error("没有权限");
      hasAuth = false;
    }
    return hasAuth;
  }

  render() {
    const { remark, showCancelOrderModal, orderId } = this.state;
    const {
      detail,
      loadDetail,
      orderRecordList,
      history
      // confirmOrder,
      // payOrder,
      // removeOrder,
      // remarkOrder,
    } = this.props;
    let commodityList = [];
    if (detail && detail.goods) {
      commodityList = detail.goods;
    }
    return (
      <div className="order-detail-container">
        <div className="topLay">
          <div />
          <Button
            onClick={() => {
              history.goBack();
            }}
          >
            返回
          </Button>
        </div>

        <Spin spinning={loadDetail}>
          {/*<OrderDetailCard title="操作信息">*/}
          {/*<div style={{ margin: "16px 0" }}>*/}
          {/*<Icon*/}
          {/*type="exclamation-circle"*/}
          {/*style={{ color: "rgb(255, 171, 52)", marginRight: "3px" }}*/}
          {/*/>*/}
          {/*<span>当前订单状态：</span>*/}
          {/*{detail && (*/}
          {/*<span style={{ color: "#000" }}>*/}
          {/*<span*/}
          {/*style={{ color: detail.operation === 3 ? "red" : "#000" }}*/}
          {/*>*/}
          {/*{OPERATION[detail.operation]}*/}
          {/*</span>*/}
          {/*、<span>{IS_PAY[detail.is_pay]}</span>、*/}
          {/*<span>{STATUS[detail.status]}</span>*/}
          {/*</span>*/}
          {/*)}*/}
          {/*</div>*/}
          {/*<div>*/}
          {/*<div style={{ display: "flex" }}>*/}
          {/*<div style={{ width: "70px", flexShrink: 0 }}>操作备注：</div>*/}
          {/*<TextArea*/}
          {/*value={remark}*/}
          {/*placeholder="请填写操作备注"*/}
          {/*style={{ height: "120px" }}*/}
          {/*onChange={e => {*/}
          {/*this.setState({ remark: e.target.value });*/}
          {/*}}*/}
          {/*/>*/}
          {/*</div>*/}
          {/*<div*/}
          {/*style={{*/}
          {/*paddingLeft: "70px",*/}
          {/*marginTop: "16px",*/}
          {/*display: "flex",*/}
          {/*justifyContent: "flex-end"*/}
          {/*}}*/}
          {/*>*/}
          {/*<div className="button-container">*/}
          {/*{detail.operation === 1 && (*/}
          {/*<Button*/}
          {/*type="primary"*/}
          {/*onClick={this.orderOperation.bind(this, "confirm")}*/}
          {/*// loading={confirmOrder}*/}
          {/*>*/}
          {/*确认*/}
          {/*</Button>*/}
          {/*)}*/}

          {/*{[1, 2, 4].indexOf(detail.operation) !== -1 && (*/}
          {/*<Button*/}
          {/*type="primary"*/}
          {/*onClick={() => {*/}
          {/*this.doCreateExpress(detail);*/}
          {/*}}*/}
          {/*>*/}
          {/*生成发货单*/}
          {/*</Button>*/}
          {/*)}*/}
          {/*{[4, 5].indexOf(detail.operation) !== -1 &&*/}
          {/*[1, 2].indexOf(detail.status) !== -1 && (*/}
          {/*<Button*/}
          {/*type="primary"*/}
          {/*style={{ margin: "0 8px" }}*/}
          {/*onClick={this.deliverGoods.bind(this)}*/}
          {/*>*/}
          {/*去发货*/}
          {/*</Button>*/}
          {/*)}*/}
          {/*{[3, 4, 5].indexOf(detail.status) !== -1 && (*/}
          {/*<Button*/}
          {/*onClick={this.orderOperation.bind(this, "remark")}*/}
          {/*// loading={remarkOrder}*/}
          {/*>*/}
          {/*备注*/}
          {/*</Button>*/}
          {/*)}*/}
          {/*{detail.is_pay === 0 && detail.operation !== 3 && (*/}
          {/*<Button*/}
          {/*onClick={this.orderOperation.bind(this, "is_pay")}*/}
          {/*type="primary"*/}
          {/*// loading={payOrder}*/}
          {/*>*/}
          {/*已付款*/}
          {/*</Button>*/}
          {/*)}*/}
          {/*{detail.operation === 1 && (*/}
          {/*<Button*/}
          {/*onClick={() => {*/}
          {/*this.doCancel();*/}
          {/*}}*/}
          {/*>*/}
          {/*取消*/}
          {/*</Button>*/}
          {/*)}*/}
          {/*{detail.operation === 3 && (*/}
          {/*<Button*/}
          {/*onClick={this.orderOperation.bind(this, "remove")}*/}
          {/*// loading={removeOrder}*/}
          {/*>*/}
          {/*移除*/}
          {/*</Button>*/}
          {/*)}*/}
          {/*</div>*/}
          {/*</div>*/}
          {/*</div>*/}
          {/*/!*{orderId &&*!/*/}
          {/*/!*authsList.find(item => item.name === apiList.recordlist) && (*!/*/}
          {/*/!*<OperationRecord id={orderId} />*!/*/}
          {/*/!*)}*!/*/}
          {/*</OrderDetailCard>*/}

          <OrderDetailCard title="操作信息">
            <Table
              rowKey="id"
              dataSource={orderRecordList}
              pagination={false}
              loading={false}
              style={{ marginTop: "32px" }}
            >
              <Column align="center" title="操作者" dataIndex="seller_name" />
              <Column
                align="center"
                title="操作时间"
                dataIndex="create_time"
                render={text => moment.unix(text).format("YYYY-MM-DD HH:mm:ss")}
              />
              <Column
                align="center"
                title="订单状态"
                dataIndex="operation"
                render={(text, record) => OPERATION[text]}
              />
              <Column
                align="center"
                title="付款状态"
                dataIndex="is_pay"
                render={text => IS_PAY[text]}
              />
              <Column
                align="center"
                title="发货状态"
                dataIndex="status"
                render={text => STATUS[text]}
              />
              <Column align="center" title="备注" dataIndex="remark" />
            </Table>
          </OrderDetailCard>

          <OrderInfo detail={detail} />

          <OrderDetailCard title="商品信息">
            <Table
              rowKey="id"
              dataSource={commodityList}
              pagination={false}
              loading={false}
              style={{ marginTop: "32px" }}
            >
              <Column
                title="商品名称"
                dataIndex="name"
                render={(text, record) => (
                  <div className="order-name">
                    <img src={record.image} alt="" className="order-img" />
                    <div>
                      <div className="name-ellipsis">
                        <div>{record.name}</div>
                      </div>
                      <div className="order-number">
                        货号：{record.custom_no}
                      </div>
                    </div>
                  </div>
                )}
              />
              <Column
                align="center"
                title="价格"
                dataIndex="money"
                width={100}
                render={text => `￥${text}`}
              ></Column>
              <Column
                align="center"
                title="数量"
                dataIndex="count"
                width={100}
              ></Column>
              <Column
                align="center"
                title="库存"
                dataIndex="onhand"
                render={text => text}
                width={100}
              ></Column>
              <Column
                align="center"
                title="小计"
                dataIndex="subtotal"
                render={text => (text ? `￥${text}` : "")}
                width={100}
              ></Column>

              {/*<Column*/}
              {/*align="center"*/}
              {/*title="操作"*/}
              {/*dataIndex="status"*/}
              {/*width={150}*/}
              {/*render={(text, record) =>*/}
              {/*text ? (*/}
              {/*<div>*/}
              {/*{[4, 5].indexOf(text) !== -1 ? (*/}
              {/*<div style={{ color: "#F5222D" }}>*/}
              {/*{goodsStatus[text]}*/}
              {/*</div>*/}
              {/*) : (*/}
              {/*<Button*/}
              {/*size="small"*/}
              {/*style={{ background: "#F3F3F3", color: "#333" }}*/}
              {/*onClick={this.goodsOperation.bind(this, record)}*/}
              {/*>*/}
              {/*{goodsStatus[text]}*/}
              {/*</Button>*/}
              {/*)}*/}
              {/*{[4, 5].indexOf(text) === -1 && (*/}
              {/*<div style={{ fontSize: "12px", lineHeight: "30px" }}>*/}
              {/*{text === 2*/}
              {/*? `已发${record.number}件`*/}
              {/*: "发货单已生成"}*/}
              {/*</div>*/}
              {/*)}*/}
              {/*</div>*/}
              {/*) : null*/}
              {/*}*/}
              {/*></Column>*/}
            </Table>
          </OrderDetailCard>

          <OrderDetailCard title="费用信息" contentClass="pay-info">
            <div>
              <span style={{ marginRight: "60px" }}>
                商品总金额： ￥
                {Number(detail.total_money) - Number(detail.freight)} +
                配送费用： ￥{detail.freight}
              </span>
              <span>
                <span className="label">=订单总金额：</span>
                <span className="price">￥{detail.total_money}</span>
              </span>
            </div>
            <div></div>
            <div>
              <span style={{ marginRight: "60px" }}>
                - 使用优惠券： ￥0.00 - 已付款金额： ￥0.00
              </span>
              <span>
                <span className="label">=应付款金额：</span>
                <span className="price">￥{detail.pay_money}</span>
              </span>
            </div>
            <div></div>
          </OrderDetailCard>
        </Spin>
        {showCancelOrderModal && (
          <CancelOrderModal
            detail={detail}
            closeModal={() => {
              this.setState({ showCancelOrderModal: false });
            }}
          />
        )}
      </div>
    );
  }
}

OrderList.propTypes = {};

export default connect(state => ({
  loadDetail: state.orderList.loadDetail,
  detail: state.orderList.detail,
  orderRecordList: state.orderList.orderRecordList
  // confirmOrder: state.orderList.confirmOrder,
  // payOrder: state.orderList.payOrder,
  // removeOrder: state.orderList.removeOrder,
  // remarkOrder: state.orderList.remarkOrder,
  // authsList: state.main.authsList
}))(OrderList);
