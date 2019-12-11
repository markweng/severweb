import React from "react";
import { connect } from "react-redux";
import { Button, Input, message } from "antd";
import BaseComponent from "@/components/baseComponent";
import http from "@/utils/http";
import qs from "qs";
import "./index.less";

@connect(state => ({}))
class GoodsFeedbackDetail extends BaseComponent {
  constructor(props) {
    super(props);
    this.titleName = ["商品管理", "商品纠错", "详情"];
    this.state = {
      goodsInfo: {},
      remark: ""
    };
  }

  componentDidMount() {
    super.componentDidMount();
    this.getGoodsDetail();
  }

  getGoodsDetail() {
    const params = qs.parse(window.location.search.split("?")[1]);
    http({
      url: "/correction/detail",
      params
    }).then(res => {
      this.setState({ goodsInfo: res.data.data });
    });
  }

  doSave = () => {
    const { remark } = this.state;
    if (!remark) {
      message.error("请输入处理结果");
      return;
    }
    const data = {
      processing_results: remark,
      id: qs.parse(window.location.search.split("?")[1]).id
    };
    http({
      url: "/correction/edit",
      data,
      method: "post"
    }).then(res => {
      this.getGoodsDetail();
    });
  };

  render() {
    const { goodsInfo } = this.state;
    const { remark, status, processing_results } = goodsInfo;
    const GoodsInfo = ({ className, is_origin }) => (
      <div className={className}>
        <div>
          <span>商品名称：</span>
          {is_origin ? goodsInfo.origin_name : goodsInfo.name}
        </div>
        <div>
          <span>生产厂家：</span>
          {is_origin ? goodsInfo.origin_manufacturer : goodsInfo.manufacturer}
        </div>
        <div>
          <span>规格：</span>
          {is_origin ? goodsInfo.origin_specification : goodsInfo.specification}
        </div>
        <div>
          <span>批准文号：</span>
          {is_origin ? goodsInfo.origin_license : goodsInfo.license}
        </div>
        <div>
          <span>药品类型：</span>
          {is_origin
            ? goodsInfo.origin_is_otc
              ? "OTC"
              : "处方药"
            : goodsInfo.is_otc
            ? "OTC"
            : "处方药"}
        </div>
        <div>
          <span>剂型：</span>
          {is_origin ? goodsInfo.origin_form : goodsInfo.form}
        </div>
        <div style={{ display: "flex" }}>
          <span style={{ flexShrink: 0 }}>商品图片：</span>
          <div>
            {is_origin
              ? goodsInfo.origin_images &&
                goodsInfo.origin_images.map((item, index) => (
                  <img
                    src={item}
                    key={index}
                    style={{
                      width: "90px",
                      height: "90px",
                      margin: "0 10px 10px 0"
                    }}
                  />
                ))
              : goodsInfo.images &&
                goodsInfo.images.map((item, index) => (
                  <img
                    src={item}
                    key={index}
                    style={{
                      width: "90px",
                      height: "90px",
                      margin: "0 10px 10px 0"
                    }}
                  />
                ))}
          </div>
        </div>
      </div>
    );
    return (
      <div className="--goods-feedback-detail">
        <div style={{ textAlign: "right" }}>
          <Button
            onClick={() => {
              this.props.history.go(-1);
            }}
          >
            返回
          </Button>

          {status === 0 && (
            <Button
              type="primary"
              onClick={this.doSave}
              style={{ marginLeft: "16px" }}
            >
              保存
            </Button>
          )}
        </div>

        <div className="goods-info-header">
          <div>商品反馈的具体内容</div>
          <div>商品反馈的产品</div>
        </div>

        {/* 商品信息 */}
        <div className="goods-info">
          <GoodsInfo className="feedback-info" />
          {goodsInfo.drug_id === 0 ? (
            <div className='old-info' style={{textAlign:'center',marginTop:'30px'}}>用户新增</div>
          ) : (
            <GoodsInfo className="old-info" is_origin />
          )}
        </div>

        <div className="remark">
          <span>备注：</span>
          <div>{remark}</div>
        </div>
        <div className="operation">
          <span>处理结果：</span>
          {status === 0 ? (
            <Input.TextArea
              style={{ width: "500px" }}
              rows="6"
              onChange={e => {
                this.setState({ remark: e.target.value });
              }}
              placeholder="请输入处理结果"
            />
          ) : (
            <div>{processing_results}</div>
          )}
        </div>
      </div>
    );
  }
}
export default GoodsFeedbackDetail;
