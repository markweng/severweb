import React from "react";
import { connect } from "react-redux";
import BaseComponent from "@/components/baseComponent";
import history from "@/utils/history";
import { Button, Icon, Table, Input, Modal } from "antd";
import * as actions from "@/store/actions/searchKey";
import http from "@/utils/http";
import "./index.less";

@connect(state => ({
  ...state.common,
  ...state.searchKey
}))
class IndexPage extends BaseComponent {
  titleName = ["商城管理", "搜索词管理"];
  editValue = 0;
  state = {
    editItem: {},
    editIndex: "",
    showAdd: false,
    showEdit: false,
    pvSort: false,
    editKwTips: false, // 是否编辑 搜索提示 提示框
    KwTips: "" // 搜索提示文字
  };

  componentDidMount() {
    // 获取搜索提示词
    http({
      url: "/keyword.hint.detail"
    }).then(res => {
      this.setState({
        KwTips: res.data.data
      });
    });

    this.onPageRefresh();
  }

  onItemAdd = () => {
    let item = this.state.editItem;
    this.props.dispatch(
      actions.addSearchKey({ name: item.name, sort: item.sort })
    );
    this.setState({
      showAdd: false,
      editItem: {}
    });
  };

  onItemEdit = () => {
    let item = this.state.editItem;
    this.props.dispatch(
      actions.setSearchKey({ id: item.id, name: item.name, sort: item.sort })
    );
    this.setState({
      showEdit: false,
      editItem: {}
    });
  };

  onItemRemove = item => {
    let that = this;
    Modal.confirm({
      title: "删除提醒",
      content: "确定删除这条信息吗?",
      onOk() {
        that.props.dispatch(actions.delSearchKey({ id: item.id }));
      }
    });
  };

  onPageRefresh() {
    this.pageChange(1, 10, 0);
  }

  onTableChange = (pagination, filters, sorter) => {
    this.pageChange(
      pagination.current,
      pagination.pageSize,
      sorter.order === "ascend" ? 1 : 0
    );
  };

  pageChange = (page, limit, order) => {
    this.props.dispatch(actions.getSearchKeyList({ page, limit, order }));
  };

  render() {
    let {
      editIndex,
      showAdd,
      showEdit,
      editItem,
      editKwTips,
      KwTips
    } = this.state;
    const { keyList, keyTotal } = this.props;
    return (
      <div className="--searchPage">
        <div className="topLay">
          <div>
            {editKwTips ? (
              <div>
                搜索提示:
                <Input
                  placeholder={KwTips}
                  style={{ width: "200px", marginLeft: "6px" }}
                  onChange={e => {
                    this.setState({
                      KwTips: e.target.value
                    });
                  }}
                />
                <Icon
                  type="check"
                  style={{ marginLeft: "10px" }}
                  onClick={() => {
                    this.setState({
                      editKwTips: false
                    });
                    http({
                      url: "/keyword.hint.edit",
                      method: "post",
                      data: {
                        value: KwTips
                      }
                    });
                  }}
                />
              </div>
            ) : (
              <div>
                搜索提示:
                <span style={{ marginLeft: "6px" }}>{KwTips}</span>
                <Icon
                  type="edit"
                  style={{ marginLeft: "10px" }}
                  onClick={() => {
                    this.setState({ editKwTips: true });
                  }}
                />
              </div>
            )}
          </div>
          <Button
            onClick={() => {
              this.setState({
                showAdd: true
              });
            }}
          >
            新增
          </Button>
        </div>
        <Table
          className="table"
          dataSource={keyList}
          style={{ marginTop: "20px", marginBottom: "20px" }}
          rowKey="id"
          onChange={this.onTableChange}
          pagination={{
            showQuickJumper: true,
            total: keyTotal
          }}
        >
          <Table.Column
            title="编号"
            align="center"
            dataIndex="id"
            width={100}
          />
          <Table.Column
            title="商品名称"
            align="center"
            dataIndex="name"
            width={100}
          />
          <Table.Column
            title="点击量"
            align="center"
            dataIndex="pv"
            width={100}
            sorter={true}
          />
          <Table.Column
            title="权重值"
            align="center"
            dataIndex="sort"
            width={100}
            render={(text, record, index) => (
              <div>
                {editIndex === index ? (
                  <div>
                    <Input
                      placeholder={text}
                      style={{ width: "50px" }}
                      onChange={e => {
                        this.editValue = e.target.value;
                      }}
                    />
                    <Icon
                      type="check"
                      style={{ marginLeft: "10px" }}
                      onClick={() => {
                        if (this.editValue) {
                          this.props.dispatch(
                            actions.setSearchKey({
                              id: record.id,
                              name: record.name,
                              sort: this.editValue
                            })
                          );
                          this.editValue = 0;
                        }
                        this.setState({ editIndex: -1 });
                      }}
                    />
                  </div>
                ) : (
                  <div>
                    {text}
                    <Icon
                      type="edit"
                      style={{ marginLeft: "10px" }}
                      onClick={() => {
                        this.setState({ editIndex: index });
                      }}
                    />
                  </div>
                )}
              </div>
            )}
          />
          <Table.Column
            title="操作"
            align="center"
            width={150}
            render={(text, record, index) => (
              <div>
                <Button
                  style={{ marginLeft: "10px" }}
                  onClick={() => {
                    this.setState({
                      editItem: Object.assign({}, record),
                      showEdit: true
                    });
                  }}
                >
                  编辑
                </Button>
                <Button
                  style={{ marginLeft: "10px" }}
                  onClick={this.onItemRemove.bind(this, record)}
                >
                  删除
                </Button>
              </div>
            )}
          />
        </Table>

        <Modal
          visible={showAdd}
          title="新增热搜商品"
          width={600}
          onCancel={() => {
            this.setState({ showAdd: false, editItem: {} });
          }}
          onOk={this.onItemAdd.bind(this)}
        >
          <div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center"
              }}
            >
              <div style={{ width: "80px" }}>商品名称</div>
              <Input
                placeholder="请输入名称"
                value={editItem.name}
                style={{ width: 350, marginLeft: 10 }}
                onChange={e => {
                  this.setState({
                    editItem: Object.assign({}, editItem, {
                      name: e.target.value
                    })
                  });
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginTop: 20
              }}
            >
              <div style={{ width: "80px" }}>权重值</div>
              <Input
                placeholder="请输入权重值"
                style={{ width: 350, marginLeft: 10 }}
                value={editItem.sort}
                onChange={e => {
                  this.setState({
                    editItem: Object.assign({}, editItem, {
                      sort: e.target.value
                    })
                  });
                }}
              />
            </div>
          </div>
        </Modal>

        <Modal
          visible={showEdit}
          title="编辑热搜商品"
          width={600}
          onCancel={() => {
            this.setState({ showEdit: false, editItem: {} });
          }}
          onOk={this.onItemEdit.bind(this)}
        >
          <div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center"
              }}
            >
              <div style={{ width: "80px" }}>商品名称</div>
              <Input
                placeholder={editItem.name ? editItem.name : "请输入名称"}
                value={editItem.name}
                style={{ width: 350, marginLeft: 10 }}
                onChange={e => {
                  this.state.editItem.name = e.target.value;
                  this.setState({
                    editItem: editItem
                  });
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginTop: 20
              }}
            >
              <div style={{ width: "80px" }}>权重值</div>
              <Input
                placeholder={editItem.sort ? editItem.sort : "请输入权重值"}
                value={editItem.sort}
                style={{ width: 350, marginLeft: 10 }}
                onChange={e => {
                  this.state.editItem.sort = e.target.value;
                  this.setState({
                    editItem: editItem
                  });
                }}
              />
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default IndexPage;
