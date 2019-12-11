import React from "react";
import { Input, Table, Pagination, Button, Modal } from "antd";
import http from "@/utils/http";
import { connect } from "react-redux";
import * as titleName from "@/store/actions/titleName";
import "./index.less";

const Column = Table.Column;
const Search = Input.Search;
const confirm = Modal.confirm;

@connect()
class GoodsFeedback extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      total: 200,
      limit: 10,
      keyword: "",
      loading: false,
      goodsList: []
    };
  }

  componentDidMount() {
    this.props.dispatch(titleName.name(["商品管理", "商品纠错"]));
    this.getGoodsList();
  }

  getGoodsList() {
    const { page, limit, keyword } = this.state;
    const params = { page, limit, keyword };
    this.setState({ loading: true });
    http({
      url: "/correction/paginate",
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
  }

  changePage = page => {
    this.setState({ page }, () => {
      this.getGoodsList();
    });
  };

  render() {
    const { page, limit, total, goodsList, loading } = this.state;
    return (
      <div className="--goods-feecback">
        {/* 搜索栏 */}
        <div style={{ marginBottom: "20px", textAlign: "right" }}>
          <Search
            placeholder="请输入商品名称"
            enterButton="搜索"
            onSearch={keyword => {
              this.setState({ keyword, page: 1 }, () => {
                this.getGoodsList();
              });
            }}
            style={{ width: 300 }}
          />
        </div>
        {/* 表格 */}
        <Table
          dataSource={goodsList}
          rowKey="id"
          pagination={false}
          loading={loading}
        >
          <Column dataIndex="id" title="ID" align="center" />
          <Column dataIndex="name" title="商品名称" align="center" />
          <Column dataIndex="manufacturer" title="生产厂家" align="center" />
          <Column dataIndex="license" title="批准文号" align="center" />
          <Column
            dataIndex="status"
            title="状态"
            align="center"
            render={status => (status === 0 ? "未处理" : "已处理")}
          />
          <Column
            dataIndex="operation"
            title="操作"
            align="center"
            width={160}
            render={(text, record) => (
              <div>
                <Button
                  type="primary"
                  size="small"
                  style={{ marginRight: "10px" }}
                  onClick={() => {
                    this.props.history.push(
                      `/goods/feedback/detail?id=${record.id}`
                    );
                  }}
                >
                  查看
                </Button>
              </div>
            )}
          />
        </Table>

        {/* 分页 */}
        {goodsList.length > 0 && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "20px",
              justifyContent: "flex-end"
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
        )}
      </div>
    );
  }
}

export default GoodsFeedback;
