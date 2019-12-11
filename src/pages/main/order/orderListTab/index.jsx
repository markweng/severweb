import React from "react";
import {
  Input,
  Button,
  Checkbox,
  Switch,
  Radio,
  Spin,
  DatePicker,
  Select,
  message,
  Icon
} from "antd";
import { connect } from "react-redux";
import _ from "lodash";
import moment from "moment";

import history from "@/utils/history";
import PaginationView from "@/components/paginationView";
import * as actions from "@/store/actions/orderList";
import BaseComponent from "@/components/baseComponent";
//打印发货单
// import ReactToPrint from "react-to-print";
// import ComponentToPrint from "../printOrder/index.js";

import "./index.less";
const Search = Input.Search;
const Option = Select.Option;

const apiList = {
  detail: "order/get"
};

const titleList = [
  {
    title: "编号",
    dataIndex: "id",
    style: { width: "80px", textAlign: "center" }
  },
  {
    title: "商品信息",
    dataIndex: "name",
    style: { flex: 1, textAlign: "left", paddingLeft: "23px" }
  },
  {
    title: "供应商",
    dataIndex: "store_name",
    style: { width: "150px", textAlign: "center" }
  },
  {
    title: "收货人",
    dataIndex: "money",
    style: { width: "150px", textAlign: "center" }
  },
  {
    title: "订单总金额",
    dataIndex: "number",
    style: { width: "10%", textAlign: "center" }
  },
  {
    title: "订单状态",
    dataIndex: "upper_shelf",
    style: { width: "10%", textAlign: "center" }
  },
  {
    title: "操作",
    dataIndex: "operation",
    style: { width: "200px", textAlign: "center" }
  }
];

const statusList = [
  { name: "全部", status: -1 },
  { name: "待确认", status: 1 },
  { name: "待付款", status: 2 },
  { name: "待发货", status: 3 },
  { name: "待收货", status: 4 },
  { name: "已完成", status: 5 }
];

const payType = { 1: "货到付款", 2: "支付宝", 3: "微信" };
const delivery = { 1: "自提", 2: "快递", 3: "同城快送" };
const origin = { 1: "经七纬五", 2: "电商平台", 3: "医鹿康" };
const commodityType = { 1: "药", 2: "商" };

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

const TYPE_SELECT = "select";
const TYPE_INPUT = "input";

class OrderListTab extends BaseComponent {
  titleName = ["订单管理", "订单列表"];
  constructor(props) {
    super(props);
    this.state = {
      selectedList: [],
      selectAll: false,
      status: -1,

      limit: 10,
      page: 1,

      target: "number",
      keyword: "",
      searchParams: {},
      showCancelOrderModal: false,

      currentId: ""
    };
  }

  componentDidMount() {
    super.componentDidMount();
    this.getOrderList();
  }

  getOrderList() {
    this.setState({ selectedList: [], selectAll: false });
    const { dispatch } = this.props;
    const { page, limit, status, searchParams } = this.state;
    const data = { page, limit, status, ...searchParams };
    dispatch(actions.getOrderList(data));
  }

  changeSelectList(id) {
    const { selectedList } = this.state;
    const { orderList } = this.props;
    const allids = orderList.map(item => item.id);
    if (selectedList.indexOf(id) !== -1) {
      _.remove(selectedList, item => item === id);
    } else {
      selectedList.push(id);
    }
    let difList = _.difference(allids, selectedList);
    this.setState({ selectedList, selectAll: difList.length === 0 });
  }

  selectAll() {
    const { selectAll } = this.state;
    const { orderList } = this.props;
    let selectedList = [];
    if (!selectAll) {
      orderList.map(item => {
        selectedList.push(item.id);
      });
    }
    this.setState({ selectedList, selectAll: !selectAll });
  }

  changeStatus(e) {
    this.setState({ status: e.target.value, page: 1 }, () => {
      this.getOrderList();
    });
  }

  changeValue(type, value) {
    switch (type) {
      case TYPE_SELECT:
        this.setState({ target: value });
        break;
      case TYPE_INPUT:
        this.setState({ keyword: value });
        break;
    }
  }

  doSearch() {
    const { target, keyword } = this.state;
    const searchParams = { target, keyword };
    this.setState({ searchParams, page: 1 }, () => {
      this.getOrderList();
    });
  }

  changePage(page) {
    this.setState({ page }, () => {
      this.getOrderList();
    });
  }

  batchOperation(type) {
    const { selectedList } = this.state;
    if (selectedList.length === 0) {
      message.error("请选择要操作的订单");
      return;
    }
  }

  callback() {
    this.setState({ selectAll: false, selectedList: [] });
    this.getOrderList();
  }

  printOrder(id) {
    this.setState({ currentId: id });
    const { dispatch } = this.props;
    dispatch(actions.getOrderDetail({ id }, this.triggerPrint));
  }

  triggerPrint() {
    document.getElementById("trigger-print").click();
  }

  toDetailPage(item) {
    history.push(`/order/orderDetail?id=${item.id}`);
  }

  render() {
    const {
      selectedList,
      status,
      keyword,
      page,
      limit,
      selectAll,
      target,
      showCancelOrderModal,
      currentId
    } = this.state;
    const {
      orderList,
      loading,
      total,
      loadRecordList,
      batchConfirm,
      batchRemove,
      detail,
      loadDetail
    } = this.props;
    return (
      <div className="order-list-tab-container">
        <div className="header">
          <div style={{ marginBottom: "20px" }}>
            <Select
              value={target}
              style={{ width: 120 }}
              onChange={value => {
                this.changeValue(TYPE_SELECT, value);
              }}
            >
              <Option value="number">订单号</Option>
              <Option value="custom_no">货号</Option>
              <Option value="accept_name">收货人</Option>
              <Option value="name">商品名</Option>
            </Select>
            <Input
              placeholder="请输入关键字"
              style={{ width: "250px", marginRight: "30px" }}
              value={keyword}
              onChange={e => {
                this.changeValue(TYPE_INPUT, e.target.value);
              }}
            />
            <Button type="primary" onClick={this.doSearch.bind(this)}>
              搜索
            </Button>
          </div>
          <Radio.Group
            value={status}
            onChange={this.changeStatus.bind(this)}
            buttonStyle="solid"
          >
            {statusList.map(item => (
              <Radio.Button
                value={item.status}
                key={item.status}
                style={{ padding: "0 32px" }}
              >
                {item.name}
              </Radio.Button>
            ))}
          </Radio.Group>
        </div>

        {/* 表格部分 */}
        <div>
          <div>
            <div className="table-title">
              {titleList.map(item => (
                <div key={item.dataIndex} style={item.style}>
                  {item.title}
                </div>
              ))}
            </div>
            <Spin spinning={loading}>
              {orderList && orderList.length > 0 ? (
                orderList.map(item => (
                  <div className="order-item" key={item.id}>
                    <div className="title">
                      <div>
                        <span>订单号：{item.number}</span>
                        <span>
                          下单时间：
                          {item.time
                            ? moment
                              .unix(item.time)
                              .format("YYYY-MM-DD HH:mm:ss")
                            : ""}
                        </span>
                      </div>
                    </div>

                    <div style={{ display: "flex" }} className="column">
                      {/* 编号 */}
                      <div style={{ width: "80px", textAlign: "center" }}>
                        {item.id}
                      </div>
                      {/* 商品信息 */}
                      <div className="orders">
                        {item.goods.slice(0, 5).map(orderItem => (
                          <div className="order-name" key={orderItem.id}>
                            <img
                              src={orderItem.image}
                              alt=""
                              className="order-img"
                            />
                            <div>
                              <div className="name-ellipsis">
                                <div>
                                  {orderItem.alias ? `${orderItem.alias}-` : ""}
                                  {orderItem.name}
                                </div>
                              </div>
                              <div className="detail">
                                <div>
                                  <span style={{ marginRight: "20px" }}>
                                    ￥{`${orderItem.money}*${orderItem.count}`}
                                  </span>
                                  <span>{`【规格：${orderItem.specification}】`}</span>
                                </div>
                                {orderItem.type === 1 && (
                                  <div className="commodity-type">药</div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      {/* 供应商 */}
                      <div
                        style={{
                          width: "150px",
                          textAlign: "center",
                          borderRight: "1px solid #E8E8E8"
                        }}
                      >
                        {item.store_name}
                      </div>
                      {/* 收货人 */}
                      <div
                        style={{
                          width: "150px",
                          textAlign: "center",
                          borderRight: "1px solid #E8E8E8"
                        }}
                      >
                        {item.accept_name}
                      </div>
                      {/* 订单总金额 */}
                      <div
                        style={{
                          width: "10%",
                          textAlign: "center",
                          borderRight: "1px solid #E8E8E8",
                          flexDirection: "column",
                          lineHeight: "30px"
                        }}
                      >
                        <div style={{ color: "red" }}>￥{item.money}</div>
                      </div>
                      {/* 订单状态 */}
                      <div
                        style={{
                          width: "10%",
                          textAlign: "center",
                          borderRight: "1px solid #E8E8E8",
                          flexDirection: "column",
                          lineHeight: "30px"
                        }}
                      >
                        <div>{OPERATION[item.operation]}</div>
                        <div>{IS_PAY[item.is_pay]}</div>
                        <div>{STATUS[item.status]}</div>
                      </div>
                      <div style={{ width: "200px", textAlign: "center" }}>
                        <Button
                          type="primary"
                          size="small"
                          onClick={() => {
                            this.toDetailPage(item);
                          }}
                        >
                          订单详情
                        </Button>
                      </div>
                    </div>

                    <div className="order-footer">
                      {item.goods.length > 5 && (
                        <div style={{ float: "left" }}>
                          共{item.goods.length}种商品，可查看
                          <span
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              this.toDetailPage(item);
                            }}
                          >
                            订单详情
                          </span>
                        </div>
                      )}
                      <div style={{ float: "right" }}>
                        <span style={{ marginRight: "40px" }}>
                          支付方式：
                          <span style={{ color: "red" }}>
                            {payType[item.pay_type]
                              ? payType[item.pay_type]
                              : "暂无"}
                          </span>
                        </span>
                        <span style={{ marginRight: "30px" }}>
                          配送方式：{delivery[item.delivery]}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty">没有数据</div>
              )}
            </Spin>
          </div>
          <div />
        </div>
        {/* 表格部分 */}
        {orderList && orderList.length > 0 && (
          <div className="footer">
            <div className="button-container" />
            <div style={{ lineHeight: "32px", display: "flex" }}>
              <span style={{ marginRight: "16px" }}>
                共{total}条记录，每页{limit}
              </span>
              <PaginationView
                currentPage={page}
                total={total}
                pageSize={limit}
                onChange={this.changePage.bind(this)}
                style={{ padding: 0 }}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default connect(state => ({
  ...state.orderList
}))(OrderListTab);
