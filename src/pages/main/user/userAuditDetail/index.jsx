import React from "react";
import { connect } from "react-redux";
import qs from "qs";
import http from "@/utils/http";
import BaseComponent from "@/components/baseComponent";
import KCCard from "@/components/card";
import { Button, Spin, Modal, Input, message, Table } from "antd";
import { renderBigImg } from "@/utils/methods";
import moment from "moment";
import "./index.less";

const { Column } = Table;

const STATUS_LIST = {
  0: "未认证",
  1: "待认证",
  2: "已通过",
  3: "已拒绝",
  4: "证件到期",
  5: "证件即将到期"
};

const USER_TYPE = {
  1: "单体药店",
  2: "连锁药店",
  3: "医院",
  4: "诊所",
  5: "商业公司"
};

@connect(state => ({
  userDetail: state.user.userDetail,
  loadUserDetail: state.user.loadUserDetail
}))
class UserAuditDetail extends BaseComponent {
  constructor(props) {
    super(props);
    this.titleName = ["用户管理", "用户审核", "详情"];
    this.state = {
      showModal: false,
      review_reason: "",
      userDetail: {},
      loadUserDetail: false
    };
  }

  componentDidMount() {
    super.componentDidMount();
    this.getUserDetail();
  }

  getUserDetail() {
    const id = qs.parse(window.location.search.split("?")[1]).id;
    this.setState({ loadUserDetail: true });
    http({
      url: "/userAudit/get",
      params: { id }
    })
      .then(res => {
        this.setState({ userDetail: res.data.data, loadUserDetail: false });
      })
      .catch(err => {
        this.setState({ loadUserDetail: false });
      });
  }

  userCheck = is_passed => {
    const id = qs.parse(window.location.search.split("?")[1]).id;
    const { review_reason } = this.state;
    if (!is_passed && !review_reason) {
      message.error("请填写审核拒绝原因");
      return;
    }
    const data = { id, is_passed, review_reason };
    http({
      url: "/user/check",
      data,
      method: "post"
    }).then(res => {
      this.setState({ review_reason: "", showModal: false });
      this.getUserDetail();
    });
  };

  render() {
    const { showModal, userDetail, loadUserDetail } = this.state;
    const { history } = this.props;
    return (
      <div className="--user-audit-detail">
        <div style={{ textAlign: "right" }}>
          <Button
            onClick={() => {
              history.go(-1);
            }}
          >
            返回
          </Button>
          {userDetail.qualification_status === 1 && (
            <Button
              type="danger"
              style={{ margin: "0 16px" }}
              onClick={() => {
                this.setState({ showModal: true });
              }}
            >
              拒绝
            </Button>
          )}
          {userDetail.qualification_status === 1 && (
            <Button type="primary" onClick={this.userCheck.bind(this, 1)}>
              审核
            </Button>
          )}
        </div>
        <Spin spinning={loadUserDetail}>
          <KCCard title="基本信息">
            <div className="row">
              <div>
                <span className="label">用户类型：</span>
                {USER_TYPE[userDetail.type]}
              </div>
              <div>
                <span className="label">用户状态：</span>
                {STATUS_LIST[userDetail.qualification_status]}
              </div>
            </div>

            <div className="row">
              <div>
                <span className="label">企业名称：</span>
                {userDetail.company}
              </div>
              <div>
                <span className="label">所属地区：</span>
                {userDetail.province} / {userDetail.city}{" "}
                {userDetail.county ? ` / ${userDetail.county}` : ""}
              </div>
            </div>
            <div className="row">
              <div>
                <span className="label">联系人：</span>
                {userDetail.linkman}
              </div>
              <div>
                <span className="label">手机号：</span>
                {userDetail.phone}
              </div>
            </div>
          </KCCard>

          <KCCard title="资质信息">
            <div className="cer-info">
              {/* 营业执照 */}
              <div className="card-content">
                <div className="card-content-title">营业执照：</div>
                <div>
                  <img
                    onClick={() => {
                      renderBigImg(userDetail.business_license_image);
                    }}
                    src={userDetail.business_license_image}
                  />
                  <div className="info">
                    <div>
                      <span className="label">营业执照单位名称：</span>
                      {userDetail.business_license_name}
                    </div>
                    <div>
                      <span className="label">营业执照编号：</span>
                      {userDetail.business_license}
                    </div>
                    <div>
                      <span>
                        <span className="label">有效期：</span>
                        {userDetail.business_license_end_time
                          ? moment
                              .unix(userDetail.business_license_end_time)
                              .format("YYYY-MM-DD")
                          : null}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* GSP */}
              {[1, 2, 5].indexOf(userDetail.type) !== -1 && (
                <div className="card-content">
                  <div className="card-content-title">GSP：</div>
                  <div>
                    <img
                      onClick={() => {
                        renderBigImg(userDetail.drug_quality_certificate_image);
                      }}
                      src={userDetail.drug_quality_certificate_image}
                    />
                    <div className="info">
                      <div>
                        <span className="label">GSP编号：</span>
                        {userDetail.drug_quality_certificate}
                      </div>
                      <div>
                        <span>
                          <span className="label">有效期：</span>
                          {userDetail.drug_quality_certificate_end_time
                            ? moment
                                .unix(
                                  userDetail.drug_quality_certificate_end_time
                                )
                                .format("YYYY-MM-DD")
                            : null}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 药品经营许可证 */}
              {[1, 2, 5].indexOf(userDetail.type) !== -1 && (
                <div className="card-content">
                  <div className="card-content-title">药品经营许可证：</div>
                  <div>
                    <img
                      onClick={() => {
                        renderBigImg(userDetail.drug_trading_license_image);
                      }}
                      src={userDetail.drug_trading_license_image}
                    />
                    <div className="info">
                      <div>
                        <span className="label">药品经营许可证编号：</span>
                        {userDetail.drug_trading_license}
                      </div>
                      <div>
                        <span className="label">有效期：</span>
                        {userDetail.drug_trading_license_end_time
                          ? moment
                              .unix(userDetail.drug_trading_license_end_time)
                              .format("YYYY-MM-DD")
                          : null}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 开户许可证 */}
              {[1, 2, 5].indexOf(userDetail.type) !== -1 && (
                <div className="card-content">
                  <div className="card-content-title">开户许可证：</div>
                  <div>
                    <img
                      onClick={() => {
                        renderBigImg(userDetail.opening_accounts_license_image);
                      }}
                      src={userDetail.opening_accounts_license_image}
                    />
                    <div className="info">
                      <div>
                        <span className="label">开户许可证编号：</span>
                        {userDetail.opening_accounts_license}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 医疗机构执业许可证 */}

              {[3, 4].indexOf(userDetail.type) !== -1 && (
                <div className="card-content">
                  <div className="card-content-title">医疗机构执业许可证：</div>
                  <div>
                    <img
                      onClick={() => {
                        renderBigImg(userDetail.purchase_authorize_image);
                      }}
                      src={userDetail.purchase_authorize_image}
                    />
                    <div className="info">
                      <div>
                        <span className="label">医疗机构名称：</span>
                        医疗机构执业许可证名称
                      </div>
                      <div>
                        <span className="label">编号：</span>
                        医疗机构执业许可证编号
                      </div>
                      <div>
                        <span className="label">有效期：</span>
                        {userDetail.purchase_authorize_end_time
                          ? moment
                              .unix(userDetail.purchase_authorize_end_time)
                              .format("YYYY-MM-DD")
                          : null}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 采购委托书 */}

              <div className="card-content">
                <div className="card-content-title">采购委托书：</div>
                <div>
                  <img
                    onClick={() => {
                      renderBigImg(userDetail.purchase_authorize_image);
                    }}
                    src={userDetail.purchase_authorize_image}
                  />
                  <div className="info">
                    <div>
                      <span className="label">委托人：</span>
                      {userDetail.purchase_authorize_name}
                    </div>
                    <div>
                      <span className="label">有效期：</span>
                      {userDetail.purchase_authorize_end_time
                        ? moment
                            .unix(userDetail.purchase_authorize_end_time)
                            .format("YYYY-MM-DD")
                        : null}
                    </div>
                  </div>
                </div>
              </div>
              {/* 委托人身份证 */}

              <div className="card-content">
                <div className="card-content-title">委托人身份证：</div>
                <div>
                  <img
                    onClick={() => {
                      renderBigImg(userDetail.mandator_id_card_image);
                    }}
                    src={userDetail.mandator_id_card_image}
                  />
                  <img
                    onClick={() => {
                      renderBigImg(userDetail.mandator_id_card_reverse_image);
                    }}
                    src={userDetail.mandator_id_card_reverse_image}
                  />
                </div>
              </div>
            </div>
          </KCCard>
          <KCCard title="操作记录">
            <Table
              dataSource={userDetail.record}
              rowKey="id"
              pagination={false}
              bordered
              style={{ marginTop: "20px" }}
            >
              <Column title="操作人" dataIndex="operator" />
              <Column
                title="操作时间"
                dataIndex="create_time"
                render={value =>
                  moment.unix(value).format("YYYY-MM-DD HH:mm:ss")
                }
              />
              <Column title="操作状态" dataIndex="target_state" />
              <Column title="原因" dataIndex="remark" />
            </Table>
          </KCCard>
        </Spin>

        {showModal && (
          <Modal
            title="审核拒绝原因"
            visible
            onOk={this.userCheck.bind(this, 0)}
            onCancel={() => {
              this.setState({ showModal: false, review_reason: "" });
            }}
          >
            <Input.TextArea
              placeholder="请填写审核拒绝原因"
              rows="6"
              onChange={e => {
                this.setState({ review_reason: e.target.value });
              }}
            />
          </Modal>
        )}
      </div>
    );
  }
}

export default UserAuditDetail;
