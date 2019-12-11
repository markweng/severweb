import React from "react";
import { connect } from "react-redux";
import BaseComponent from "@/components/baseComponent";
import http from "@/utils/http";
import qs from "qs";
import { Input, Table, Button } from "antd";
import "./index.less";

const Search = Input.Search;
const Column = Table.Column;

@connect()
class SigningGoods extends BaseComponent {
  constructor(props) {
    super(props);
    this.titleName = ["用户管理", "用户列表", "签约商品"];
    this.state = {
      page: 1,
      limit: 10,
      total: 0,
      keyword: "",
      loading: false,
      goodsList: []
    };
  }

  componentDidMount() {
    super.componentDidMount();
    this.getGoodsList();
  }

  getGoodsList = () => {
    const id = qs.parse(window.location.search.split("?")[1]).id;
    const { page, limit, keyword } = this.state;
    const params = { page, limit, keyword, user_id: id };
    this.setState({ loading: true });
    http({
      url: "/signGoods/list",
      params
    })
      .then(res => {
        this.setState({
          goodsList: res.data.data.data,
          total: res.data.data.total,
          loading: false
        });
      })
      .catch(err => {
        this.setState({ loading: false });
      });
  };

  render() {
    const { goodsList, page, limit, total, loading } = this.state;
    const { history } = this.props;
    const pagination = {
      current: page,
      pageSize: limit,
      total,
      showQuickJumper: true,
      showSizeChanger: true,
      showTotal: () => `共${total}条`,
      onChange: page => {
        this.setState({ page }, () => {
          this.getGoodsList();
        });
      },
      onShowSizeChange: (page, limit) => {
        this.setState({ limit, page: 1 }, () => {
          this.getGoodsList();
        });
      }
    };
    return (
      <div className="--signing-goods">
        <div style={{ textAlign: "right", marginBottom: "16px" }}>
          <Search
            enterButton="搜索"
            style={{ width: "360px" }}
            placeholder="请输入商品名称"
            onSearch={keyword => {
              this.setState({ keyword, page: 1 }, () => {
                this.getGoodsList();
              });
            }}
          />
        </div>

        <Table
          dataSource={goodsList}
          rowKey="id"
          loading={loading}
          pagination={pagination}
        >
          <Column title="编号" dataIndex="id" align="center" />
          <Column
            title="主图"
            dataIndex="cover"
            render={value => (
              <img style={{ width: "90px", height: "90px" }} src={value} />
            )}
          />
          <Column title="商品名称" dataIndex="goods_name" align="center" />
          <Column title="规格" dataIndex="specification" align="center" />
          <Column title="厂家名称" dataIndex="store_name" align="center" />
          <Column title="协议价格" dataIndex="price" align="center" />
          <Column
            title="操作"
            dataIndex="operation"
            align="center"
            render={(value, record) => (
              <Button
                type="primary"
                size="small"
                onClick={() => {
                  history.push(`/user/signingGoods/detail?id=${record.id}`);
                }}
              >
                商品详情
              </Button>
            )}
          />
        </Table>
      </div>
    );
  }
}

export default SigningGoods;
