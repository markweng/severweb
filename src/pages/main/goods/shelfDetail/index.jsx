import React from "react";
import { Button } from "antd";
import http from "@/utils/http";
import qs from "qs";
import GoodsDetail from "../goodsDetail";
import AuditFailedModal from "./auditFailedModal";

class ShelfDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAuditFailedModal: false,
      goodsDetail: {},
      loading: false
    };
  }

  componentDidMount() {
    this.getGoodsDetail();
  }

  //获取商品详情
  getGoodsDetail() {
    const data = qs.parse(window.location.search.split("?")[1]);
    this.setState({ loading: true });
    http({
      url: "/audit/detail",
      data,
      method: "post"
    })
      .then(res => {
        this.setState({
          loading: false,
          goodsDetail: res.data.data
        });
      })
      .catch(err => {
        this.setState({ loading: false });
      });
  }

  //审核通过
  doAudit = () => {
    const { goodsDetail } = this.state;
    http({
      url: "/audit/batch",
      data: { id: [goodsDetail.id] },
      method: "post"
    }).then(res => {
      this.getGoodsDetail();
    });
  };

  render() {
    const { showAuditFailedModal, goodsDetail, loading } = this.state;
    return (
      <GoodsDetail
        goodsDetail={goodsDetail}
        titleName={["商品管理", "上架审核", "详情"]}
        loading={loading}
      >
        <Button
          onClick={() => {
            this.props.history.go(-1);
          }}
        >
          返回
        </Button>
        {goodsDetail.status === 0 && (
          <Button
            type="danger"
            onClick={() => {
              this.setState({ showAuditFailedModal: true });
            }}
          >
            拒绝
          </Button>
        )}
        {goodsDetail.status === 0 && (
          <Button type="primary" onClick={this.doAudit}>
            通过
          </Button>
        )}
        {showAuditFailedModal && (
          <AuditFailedModal
            onClose={reload => {
              if (reload) this.getGoodsDetail();
              this.setState({ showAuditFailedModal: false });
            }}
          />
        )}
      </GoodsDetail>
    );
  }
}

export default ShelfDetail;
