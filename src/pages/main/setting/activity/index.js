import React, { Component } from "react";
import { connect } from "react-redux";
import { Tabs } from "antd";
import * as titleName from "@/store/actions/titleName";
import ActivityList from "@/pages/main/setting/activity/activityList";
import ActivityGoodsList from "@/pages/main/setting/activity/activityGoodsList";
import SecondKillGoodsConf from "@/pages/main/setting/activity/secondKillGoodsConf";
import MoneyOffGoodsConf from "@/pages/main/setting/activity/moneyOffGoodsConf";
import NewUserGoodsConf from "@/pages/main/setting/activity/newUserGoodsConf";

import "./index.less";

const { TabPane } = Tabs;
@connect(state => ({
  ...state.titleName
}))

 class ActivitySetting extends Component {

  componentDidMount() {
    this.props.dispatch(titleName.name(["商城管理", "活动配置"]));
  }

  render() {
    return (
      <div className="--mall-setting">
        <Tabs defaultActiveKey="1" animated={false} className="setting-tabs">
          <TabPane tab="活动列表" key="1">
            <ActivityList/>
          </TabPane>
          <TabPane tab="活动商品列表" key="2">
            <ActivityGoodsList/>
          </TabPane>
          <TabPane tab="秒杀商品配置" key="3">
            <SecondKillGoodsConf/>
          </TabPane>
          <TabPane tab="满减商品配置" key="4">
            <MoneyOffGoodsConf/>
          </TabPane>
          <TabPane tab="新人专享商品配置" key="5">
            <NewUserGoodsConf/>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default ActivitySetting;