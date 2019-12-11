import React from "react";
import { connect } from "react-redux";
import { Button } from "antd";
import BaseComponent from "@/components/baseComponent";
import http from "@/utils/http";
import qs from "qs";
import "./index.less";

const IS_OPEN = { 0: "上架", 1: "已下架", 2: "已删除" };

@connect()
class SigningGoodsDetail extends BaseComponent {
  constructor(props) {
    super(props);
    this.titleName = ["用户管理", "用户列表", "签约商品", "商品详情"];
    this.state = {
      goodsDetail: {}
    };
  }

  componentDidMount() {
    super.componentDidMount();
    this.getGoodsDetail();
  }

  getGoodsDetail = () => {
    const params = qs.parse(window.location.search.split("?")[1]);
    http({
      url: "/signGoods/get",
      params
    }).then(res => {
      this.setState({ goodsDetail: res.data.data });
    });
  };

  render() {
    const { history } = this.props;
    const { goodsDetail } = this.state;
    const {
      name,
      category_name, //分类
      manufacturer, //生产厂家
      specification, //规格
      license, //批准文号
      is_otc, //是否处方药
      form, //剂型
      store_name, //商家名称
      expire_times, //商品有效期
      price, //会员价
      market_price, //建议零售价
      freight, //运费
      loadage, //件装量
      is_split, //是否支持拆零
      minimum, //最小起订量
      images //图片
    } = goodsDetail;
    return (
      <div className="--signing-goods-detail">
        <div style={{ textAlign: "right" }}>
          <Button
            onClick={() => {
              history.go(-1);
            }}
          >
            返回
          </Button>
        </div>
        <div className="goods-info">
          <div>
            <span>商品名称：</span>
            {name}
          </div>
          <div>
            <span>商品分类：</span>
            {category_name}
          </div>
          <div>
            <span>生产厂家：</span>
            {manufacturer}
          </div>
          <div>
            <span>规格：</span>
            {specification}
          </div>
          <div>
            <span>批准文号：</span>
            {license}
          </div>
          <div>
            <span>药品类型：</span>
            {is_otc ? "OTC" : "处方药"}
          </div>
          <div>
            <span>剂型：</span>
            {form}
          </div>
          <div>
            <span>商家名称：</span>
            {store_name}
          </div>
          <div style={{ display: "flex" }}>
            <span style={{ flexShrink: 0 }}>商品有效期：</span>
            <div>{expire_times}</div>
          </div>

          <div>
            <span>会员价格：</span>
            {price}
          </div>
          <div>
            <span>建议零售价：</span>
            {market_price}
          </div>
          <div>
            <span>商品运费：</span>
            {freight}
          </div>
          <div>
            <span>件装：</span>
            {loadage}
          </div>
          <div>
            <span>是否支持拆零：</span>
            {is_split === 0 ? "否" : "是"}
          </div>
          <div>
            <span>起购数量：</span>
            {minimum}
          </div>
          <div style={{ width: "100%", display: "flex" }}>
            <span> 商品图片：</span>
            <div>
              {images &&
                images.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    style={{
                      width: "90px",
                      height: "90px",
                      marginRight: "16px"
                    }}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SigningGoodsDetail;
