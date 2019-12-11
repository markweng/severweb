import React, { Component } from "react";
import { connect } from "react-redux";
import { Tabs } from "antd";
import Banner from "@/pages/main/setting/mall/banner";
import HotGoods from "@/pages/main/setting/mall/hotGoods";
import SearchKey from "@/pages/main/setting/mall/searchKey";
import Classify from "@/pages/main/setting/mall/classify";
import PopModal from "@/pages/main/setting/mall/popModal";

import * as titleName from "@/store/actions/titleName";
import "./index.less";

const { TabPane } = Tabs;

@connect(state => ({
  ...state.titleName
}))
class MallSetting extends Component {
  componentDidMount() {
    this.props.dispatch(titleName.name(["商城管理", "商城配置"]));
  }

  render() {
    return (
      <div className="--mall-setting">
        <Tabs defaultActiveKey="1" animated={false} className="setting-tabs">
          <TabPane tab="Banner设置" key="1">
            <Banner />
          </TabPane>
          <TabPane tab="弹窗设置" key="2">
            <PopModal />
          </TabPane>
          <TabPane tab="推荐商品" key="3">
            <HotGoods />
          </TabPane>
          <TabPane tab="分类设置" key="4">
            <Classify />
          </TabPane>
          <TabPane tab="搜索设置" key="5">
            <SearchKey />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default MallSetting;
