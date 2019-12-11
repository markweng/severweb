import React from "react";
import { Tabs } from "antd";
import OrderListTab from "../orderListTab/index.jsx";
import "./index.less";

const TabPane = Tabs.TabPane;

class OrderList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: "orderList"
    };
  }

  changeActivekey(key) {
    this.setState({ activeKey: key });
  }

  render() {
    const { activeKey } = this.state;
    return (
      <div className="--orderListPage">
        <Tabs
          activeKey={activeKey}
          onChange={this.changeActivekey.bind(this)}
          style={{ background: "#fff", padding: "0 34px 34px 34px" }}
          animated={false}
        >
          <TabPane tab="订单列表" key="orderList">
            {activeKey === "orderList" && <OrderListTab />}
          </TabPane>
        </Tabs>
      </div>
    );
  }
}
OrderList.propTypes = {};
export default OrderList;
