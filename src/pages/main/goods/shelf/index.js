import React from "react";
import { connect } from "react-redux";
import { Select, Input, Table, Button, Pagination, message } from "antd";
import http from "@/utils/http";
import * as titleName from "@/store/actions/titleName";
import "./index.less";

const Option = Select.Option;
const Search = Input.Search;
const Column = Table.Column;

const STATUS = { 0: "待审核", 1: "已通过", 2: "已拒绝" };

@connect(state => ({}))
class GoodsShelf extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      total: 0,
      limit: 10,
      keyword: "",
      goodsList: [],
      loading: false,
      selectedRowKeys: []
    };
  }

  componentDidMount() {
    this.props.dispatch(titleName.name(["商品管理", "上架审核"]));
    this.getAuditGoodsList();
  }

  //获取审核商品列表
  getAuditGoodsList = () => {
    const { page, limit, keyword } = this.state;
    const params = { page, limit, keyword };
    this.setState({ loading: true });
    http({
      url: "/audit/paginate",
      params
    })
      .then(res => {
        this.setState({
          loading: false,
          total: res.data.data.total,
          goodsList: res.data.data.data
        });
      })
      .catch(err => {
        this.setState({ loading: false });
      });
  };

  //翻页
  changePage = page => {
    this.setState({ page }, () => {
      this.getAuditGoodsList();
    });
  };

  //选择
  onSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };

  //批量审核通过
  doAudit = () => {
    const { selectedRowKeys } = this.state;
    if (selectedRowKeys.length === 0) {
      message.error("请选择要审核的商品");
      return;
    }
    http({
      url: "/audit/batch",
      data: { id: selectedRowKeys },
      method: "post"
    }).then(res => {
      this.setState({ selectedRowKeys: [], page: 1 }, () => {
        this.getAuditGoodsList();
      });
    });
  };

  render() {
    const {
      goodsList,
      page,
      limit,
      total,
      loading,
      selectedRowKeys
    } = this.state;
    const { history } = this.props;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    };

    return (
      <div className="--goods-shelf">
        {/* 搜索栏 */}
        <div style={{ marginBottom: "20px" }}>
          <span>审核状态：待审核</span>
          <div style={{ float: "right" }}>
            <Search
              placeholder="请输入商品名称"
              enterButton="搜索"
              onSearch={keyword => {
                this.setState({ keyword, page: 1 }, () => {
                  this.getAuditGoodsList();
                });
              }}
              style={{ width: 380 }}
            />
          </div>
        </div>

        {/* 表格 */}
        <Table
          dataSource={goodsList}
          rowKey="id"
          loading={loading}
          pagination={false}
          rowSelection={rowSelection}
        >
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
            dataIndex="status"
            title="状态"
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
                  history.push(`/goods/shelf/detail?id=${record.id}`);
                }}
              >
                审核详情
              </Button>
            )}
          />
        </Table>
        {/* 分页 */}
        {goodsList.length > 0 && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "20px"
            }}
          >
            <Button type="primary" onClick={this.doAudit}>
              批量审核通过
            </Button>
            <div
              style={{
                display: "flex",
                alignItems: "center"
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
        )}
      </div>
    );
  }
}

export default GoodsShelf;
