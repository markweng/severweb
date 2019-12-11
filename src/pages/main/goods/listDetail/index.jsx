import React from "react";
import http from "@/utils/http";
import qs from "qs";
import { Button } from "antd";
import GoodsDetail from "../goodsDetail";
import LowerShelfModal from "./lowerShelfModal";

class ListDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      goodsDetail: {},
      loading: false,
      goodsStatus:""
    };
  }

  componentDidMount() {
    this.getGoodsDetail();
  }

  //保存商品修改
  saveGoods  = () => {
    const { goodsDetail, goodsStatus } = this.state;
    console.log(goodsDetail.id,goodsStatus)
  }

  //获取商品详情
  getGoodsDetail() {
    const data = qs.parse(window.location.search.split("?")[1]);
    this.setState({ loading: true });
    http({
      url: "/audit/goodsDetail",
      data,
      method: "post"
    })
      .then(res => {
        this.setState({
          loading: false,
          goodsDetail: res.data.data,
          goodsStatus:res.data.data.status
        });
      })
      .catch(err => {
        this.setState({ loading: false });
      });
  }

  delGoods = () => {
    const data = qs.parse(window.location.search.split("?")[1]);
    http({
      url: "/audit/delete",
      data,
      method: "post"
    }).then(res => {
      this.getGoodsDetail();
    });
  };

  //改变商品状态值
  onChangeStatus = (value) =>{
    console.log(value)
  }


  render() {
    const { goodsDetail, loading, showModal } = this.state;
    return (
      <GoodsDetail
        titleName={["商品管理", "商品列表", "详情"]}
        goodsDetail={goodsDetail}
        loading={loading}
        onChangeStatus = {this.onChangeStatus}
        onGoBack = { ()=> {
          this.props.history.go(-1)}
        }
        onSave = {
          this.saveGoods
        }
      >
        <Button
          onClick={() => {
            this.props.history.go(-1);
          }}
        >
          返回
        </Button>

        {showModal && (
          <LowerShelfModal
            onClose={reload => {
              if (reload) this.getGoodsDetail();
              this.setState({ showModal: false });
            }}
          />
        )}
      </GoodsDetail>
    );
  }
}

export default ListDetail;
