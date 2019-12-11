import React, { Fragment } from "react";
import { connect } from "react-redux";
import KCCard from "@/components/card";
import BaseComponent from "@/components/baseComponent";
import CertificateInfoItem from "./certificateInfoItem/index.jsx";
import CertificateList from "@/pages/main/saler/add/certificateList.js";
import { Button, Radio, message } from "antd";
import { url_request } from "@/utils/methods";
import http from "@/utils/http";
import "./index.less";
import history from "@/utils/history";

@connect()
class AddSaler extends BaseComponent {
  constructor(props) {
    super(props);
    this.titleName = ["商家管理", "商家列表", "商家详情"];
    this.state = {
      shopInfo: {
        qualification: {}
      },
      status: 1 // 商家启用状态
    };
  }

  componentDidMount() {
    super.componentDidMount();
    this.getShopInfo();
  }

  //获取店铺信息
  getShopInfo() {
    let store_id = url_request("store_id");
    this.setState({ loading: true });
    http({
      url: "/merchant.user.get",
      params: {
        store_id
      }
    })
      .then(res => {
        const shopInfo = res.data.data;

        //初始化省市区数据
        const selectedArea = [
          {
            value: shopInfo.province,
            label: shopInfo.province,
            code: shopInfo.province_id
          },
          {
            value: shopInfo.city,
            label: shopInfo.city,
            code: shopInfo.city_id
          },
          {
            value: shopInfo.county,
            label: shopInfo.county,
            code: shopInfo.county_id
          }
        ];
        this.setState({
          loading: false,
          shopInfo,
          selectedArea
        });
      })
      .catch(err => {
        this.setState({
          loading: false
        });
      });
  }

  onChange = e => {
    let { shopInfo } = this.state;
    shopInfo.status = e.target.value;
    this.setState({
      shopInfo
    });
  };

  handleSaveShopStatus() {
    let id = url_request("id");
    let { status } = this.state.shopInfo;

    http({
      url: "/seller/check",
      method: "post",
      data: {
        id,
        status
      }
    }).then(() => {
      message.success("保存成功！");
      history.push("/saler/list");
    });
  }

  render() {
    const { history } = this.props;
    const { shopInfo } = this.state;

    return (
      <div className="--saler-detail">
        <div style={{ textAlign: "right" }}>
          <Button
            onClick={() => {
              history.go(-1);
            }}
          >
            返回
          </Button>
          <Button
            onClick={() => this.handleSaveShopStatus()}
            type="primary"
            style={{ marginLeft: "16px" }}
          >
            保存
          </Button>
        </div>
        <div>
          <span className="label">商家状态：</span>
          <span>
            <Radio.Group onChange={this.onChange} value={shopInfo.status}>
              <Radio value={1}>启用</Radio>
              <Radio value={0}>禁用</Radio>
            </Radio.Group>
          </span>
        </div>
        <KCCard title="基本信息">
          {shopInfo && (
            <Fragment>
              <div className="row">
                <div>
                  <span className="label">用户名称：</span>
                  <span style={{ lineHeight: "32px" }}>
                    {shopInfo.nickname}
                  </span>
                </div>
                <div>
                  <span className="label">手机号：</span>
                  <span style={{ lineHeight: "32px" }}>{shopInfo.phone}</span>
                </div>
              </div>
              <div className="row">
                <div>
                  <span className="label">企业名称：</span>
                  <span style={{ lineHeight: "32px" }}>{shopInfo.name}</span>
                </div>
                <div>
                  <span className="label">所属地区：</span>

                  <span style={{ lineHeight: "32px" }}>
                    {`${shopInfo.province}/${shopInfo.city}/${shopInfo.county}`}
                  </span>
                </div>
              </div>
              <div className="row">
                <div>
                  <span className="label">联系人：</span>
                  <span style={{ lineHeight: "32px" }}>{shopInfo.linkman}</span>
                </div>
              </div>
            </Fragment>
          )}
        </KCCard>

        <KCCard title="资质信息">
          <div style={{ flex: 1, display: "flex", flexWrap: "wrap" }}>
            {CertificateList.map(item => (
              <CertificateInfoItem
                key={item.title}
                {...item}
                qualification={shopInfo.qualification}
              />
            ))}
          </div>
        </KCCard>
      </div>
    );
  }
}

export default AddSaler;
