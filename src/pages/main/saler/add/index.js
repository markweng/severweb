import React from "react";
import { connect } from "react-redux";
import KCCard from "@/components/card";
import BaseComponent from "@/components/baseComponent";
import { Button, Input, Upload, Icon, message, DatePicker } from "antd";
import EditCertificateInfoItem from "./editCertificateInfoItem/index.jsx";
import CertificateList from "./certificateList.js";
import SelectArea from "@/components/selectArea";
import http from "@/utils/http";
import history from "@/utils/history";
import "./index.less";
import { url_request } from "@/utils/methods";

@connect()
class AddUser extends BaseComponent {
  constructor(props) {
    super(props);
    this.titleName = ["商家管理", "商家列表", "新增商家"];
    this.state = {
      shopInfo: {
        qualification: {}
      },
      selectedArea: []
    };
  }

  componentDidMount() {
    super.componentDidMount();
    this.initShop();
  }

  initShop() {
    const store_id = url_request("store_id");
    if (store_id) {
      // 如果存在 store_id 表示是编辑店铺
      this.getShopInfo();
    }
  }

  //获取店铺信息
  getShopInfo() {
    const store_id = url_request("store_id");
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

  //保存店铺信息
  editShopInfo() {
    const { shopInfo, selectedArea } = this.state;

    if (selectedArea.length === 0) {
      message.error("请选择地区");
      return;
    }
    this.setState({ loading: true });
    //省市区名称和id
    let province = selectedArea[0] ? selectedArea[0].label : "";
    let province_id = selectedArea[0] ? selectedArea[0].code : "";
    let city = selectedArea[1] ? selectedArea[1].label : "";
    let city_id = selectedArea[1] ? selectedArea[1].code : "";
    let county = selectedArea[2] ? selectedArea[2].label : "";
    let county_id = selectedArea[2] ? selectedArea[2].code : 0;

    const { name, linkman, phone, logo, nickname } = shopInfo;
    let data = {
      name,
      linkman,
      phone,
      logo,
      province,
      city,
      county,
      province_id,
      city_id,
      county_id,
      nickname,
      ...shopInfo.qualification
    };

    let url = "";
    if (url_request("store_id")) {
      // 如果存在 store_id 表示是编辑店铺
      url = "/seller/edit";
      data.id = url_request("store_id");
    } else {
      // 新增
      url = "/seller/add";
    }

    http({
      url: url,
      method: "post",
      data
    })
      .then(res => {
        history.push("/saler/list");
      })
      .catch(err => {
        this.setState({
          loading: false
        });
      });
  }

  //修改店铺基本信息
  changeValue(type, value) {
    const { shopInfo } = this.state;
    shopInfo[type] = value;
    this.setState({ shopInfo });
  }

  //修改店铺资质信息
  changeQualification = (filed, value) => {
    const { shopInfo } = this.state;
    shopInfo.qualification[filed] = value;
    this.setState({ shopInfo });
  };

  render() {
    const { history } = this.props;
    const { shopInfo } = this.state;
    const type = url_request("type");
    if (type === "edit" && !shopInfo.province) {
      // 编辑页面，需等数据返回再显示
      return null;
    }
    return (
      <div className="--add-saler">
        <div style={{ textAlign: "right" }}>
          <Button
            onClick={() => {
              history.go(-1);
            }}
          >
            返回
          </Button>
          <Button
            type="primary"
            style={{ marginLeft: "16px" }}
            onClick={() => {
              this.editShopInfo();
            }}
          >
            保存
          </Button>
        </div>
        <KCCard title="基本信息">
          <div className="row">
            <div>
              <span className="label">用户名称：</span>
              <Input
                placeholder="请输入用户名称"
                onChange={e => {
                  this.changeValue("nickname", e.target.value);
                }}
                value={shopInfo.nickname || ""}
              />
            </div>
            <div>
              <span className="label">手机号：</span>
              <Input
                placeholder="请输入手机号"
                onChange={e => {
                  this.changeValue("phone", e.target.value);
                }}
                value={shopInfo.phone || ""}
              />
            </div>
          </div>
          <div className="row">
            <div>
              <span className="label">企业名称：</span>
              <Input
                placeholder="请输入企业名称"
                onChange={e => {
                  this.changeValue("name", e.target.value);
                }}
                value={shopInfo.name || ""}
              />
            </div>
            <div>
              <span className="label">所属地区：</span>
              <SelectArea
                style={{ flex: 1 }}
                onChange={(value, selectedArea) => {
                  this.setState({ selectedArea });
                }}
                defaultValue={[
                  shopInfo.province,
                  shopInfo.city,
                  shopInfo.county
                ]}
              />
            </div>
          </div>
          <div className="row">
            <div>
              <span className="label">联系人：</span>
              <Input
                placeholder="请输入联系人"
                onChange={e => {
                  this.changeValue("linkman", e.target.value);
                }}
                value={shopInfo.linkman || ""}
              />
            </div>
          </div>
        </KCCard>

        <KCCard title="资质信息">
          <div style={{ flex: 1, display: "flex", flexWrap: "wrap" }}>
            {CertificateList.map(item => (
              <EditCertificateInfoItem
                key={item.title}
                {...item}
                qualification={shopInfo.qualification}
                changeQualification={this.changeQualification}
              />
            ))}
          </div>
        </KCCard>
      </div>
    );
  }
}

export default AddUser;
