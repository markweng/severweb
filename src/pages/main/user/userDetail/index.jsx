import React from "react";
import { connect } from "react-redux";
import qs from "qs";
import http from "@/utils/http";
import BaseComponent from "@/components/baseComponent";
import KCCard from "@/components/card";
import { Button, Spin, Modal, Input, message } from "antd";
import { renderBigImg } from "@/utils/methods";
import * as actions from "@/store/actions/user";
import moment from "moment";
import "./index.less";

const STATUS_LIST = {
  0: "未认证",
  1: "待认证",
  2: "已通过",
  3: "已拒绝",
  4: "证件到期",
  5: "证件即将到期"
};

@connect(state => ({
  userDetail: state.user.userDetail,
  loadUserDetail: state.user.loadUserDetail
}))
class UserDetail extends BaseComponent {
  constructor(props) {
    super(props);
    this.titleName = ["用户管理", "用户列表", "详情"];
    this.state = {
      showModal: false,
      review_reason: ""
    };
  }

  componentDidMount() {
    super.componentDidMount();
    this.getUserDetail();
  }

  getUserDetail() {
    const id = qs.parse(window.location.search.split("?")[1]).id;
    this.props.dispatch(actions.getUserDetail({ id }));
  }

  render() {
    const { showModal } = this.state;
    const { history, userDetail, loadUserDetail } = this.props;
    let {
      id,
      nickname,
      phone,
      register_time,
      realname,
      identity_card_number,
      register_address,
      last_login_time,
      gender_name,
      age,
      register_system_name,
      register_channel_name,
      status_name,
      succeed_order_count,
      succeed_order_money
    } = userDetail;

    return (
      <div className="--user-detail">
        <div style={{ textAlign: "right" }}>
          <Button
            onClick={() => {
              history.go(-1);
            }}
          >
            返回
          </Button>
        </div>
        <Spin spinning={loadUserDetail}>
          <KCCard title="基本信息">
            <div className="row">
              <div>
                <span className="label">用户ID：</span>
                {id}
              </div>
              <div>
                <span className="label">用户昵称：</span>
                {nickname}
              </div>
              <div>
                <span className="label">手机号：</span>
                {phone}
              </div>
              <div>
                <span className="label">注册时间：</span>
                {moment(register_time * 1000).format("YYYY-MM-DD HH:mm:ss")}
              </div>
            </div>

            <div className="row">
              <div>
                <span className="label">用户名称：</span>
                {realname}
              </div>
              <div>
                <span className="label">身份证号：</span>
                {identity_card_number}
              </div>
              <div>
                <span className="label">所属地区：</span>
                {register_address}
              </div>
              <div>
                <span className="label">最近活跃：</span>
                {moment(last_login_time * 1000).format("YYYY-MM-DD HH:mm:ss")}
              </div>
            </div>
            <div className="row">
              <div>
                <span className="label">用户性别：</span>
                {gender_name}
              </div>
              <div>
                <span className="label">用户年龄：</span>
                {age}
              </div>
              <div>
                <span className="label">系统类型：</span>
                {register_system_name}
              </div>
              <div>
                <span className="label">注册渠道：</span>
                {register_channel_name}
              </div>
            </div>
            <div className="row">
              <div>
                <span className="label">账号状态：</span>
                {status_name}
              </div>
              <div>
                <span className="label">成交单数：</span>
                {succeed_order_count}
              </div>
              <div>
                <span className="label">成交金额：</span>
                {succeed_order_money}
              </div>
              <div>
                <span className="label"></span>
              </div>
            </div>
          </KCCard>
        </Spin>
      </div>
    );
  }
}

export default UserDetail;
