import React from "react";
import { connect } from "react-redux";
import { Select, Input, Table, Button, Pagination } from "antd";
import http from "@/utils/http";
import history from "@/utils/history";
import * as titleName from "@/store/actions/titleName";
import "./index.less";
import { url_request } from "@/utils/methods";

const Option = Select.Option;
const Search = Input.Search;
const Column = Table.Column;

const IS_OPEN = { 0: "下架", 1: "上架", 2: "已删除" };
const STATUS = { 0: "待审核", 1: "已通过", 2: "已拒绝" };

@connect(state => ({}))
class GoodsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      total: 200,
      limit: 20,
      status: null,
      target: 0,
      keyword: "",
      goodsList: []
    };
  }
  componentDidMount() {
    this.props.dispatch(titleName.name(["商家管理", "商品列表"]));
    this.requestList();
  }

  requestList() {
    let { status, keyword, page } = this.state;
    http({
      url: "/seller/paginate",
      params: {
        store_id: url_request("store_id"),
        status,
        keyword,
        page
      }
    }).then(res => {
      let { data, current_page, per_page, total } = res.data.data;
      this.setState({
        goodsList: data,
        page: current_page,
        limit: per_page,
        total: total
      });
    });
  }

  changePage = page => {
    this.setState({ page }, () => this.requestList());
  };

  render() {
    const {
      goodsList,
      page,
      limit,
      total,
      status,
      target,
      keyword
    } = this.state;
    const { history } = this.props;
    return (
      <div className="--saler-goods-list">
        {/* 搜索栏 */}
        <div style={{ marginBottom: "20px" }}>
          <span>商品状态：</span>
          <Select
            defaultValue={0}
            style={{ width: 120 }}
            onChange={value => {
              this.setState({ status: value }, () => this.requestList());
            }}
          >
            <Option value={0}>全部</Option>
            <Option value={1}>上架</Option>
            <Option value={2}>下架</Option>
            <Option value={3}>已删除</Option>
          </Select>
          <Search
            placeholder="请输入关键字"
            enterButton="搜索"
            onSearch={keyword => {
              this.setState({ keyword }, () => this.requestList());
            }}
            style={{ width: 360 }}
          />
          <div style={{ float: "right" }}>
            <Button onClick={() => history.goBack()}>返回</Button>
          </div>
        </div>

        {/* 表格 */}
        <Table dataSource={goodsList} rowKey="id" pagination={false}>
          <Column dataIndex="id" title="商品ID" align="center" />
          <Column
            dataIndex="cover"
            title="主图"
            render={url => (
              <img src={url} style={{ width: "90px", maxHeight: "90px" }} />
            )}
          />
          <Column dataIndex="name" title="商品名称" align="center" />
          <Column dataIndex="category_name" title="分类" align="center" />
          <Column dataIndex="store_name" title="商家名称" align="center" />
          <Column dataIndex="price" title="价格" align="center" />
          <Column
            dataIndex="is_open"
            title="上架/下架"
            align="center"
            render={(index, record) => {
              const { is_delete, is_open } = record;
              if (is_delete) {
                return IS_OPEN[2];
              }
              return IS_OPEN[is_open];
            }}
          />
          <Column
            dataIndex="status"
            title="审核状态"
            align="center"
            render={status => STATUS[status]}
          />

          <Column
            dataIndex="operation"
            title="操作"
            align="center"
            render={(text, record) => (
              <Button
                size="small"
                type="primary"
                onClick={() => {
                  history.push(`/goods/list/detail?id=${record.id}`);
                }}
              >
                商品详情
              </Button>
            )}
          />
        </Table>

        {/* 分页 */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            marginTop: "20px"
          }}
        >
          <span style={{ marginRight: "20px" }}>共{total} 条</span>
          <Pagination
            showQuickJumper
            current={page}
            total={total}
            pageSize={limit}
            onChange={page => {
              this.changePage(page);
            }}
          />
        </div>
      </div>
    );
  }
}

export default GoodsList;
