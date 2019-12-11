import React from "react";
import { connect } from "react-redux";
import { Radio, Input, Modal, Button, Table, Icon } from "antd";
import "./index.less";
import history from "@/utils/history";
import * as actions from "@/store/actions/hotGoods";
import * as dialog from "@/store/actions/dialog";
import BaseComponent from "@/components/baseComponent";
import ImageView from "@/components/imageView";
import SelectGoods from "@/components/selectGoods";
import { renderBigImg } from "@/utils/methods";

@connect(state => ({
  ...state.common,
  ...state.hotGoods,
  ...state.dialog
}))
class IndexPage extends BaseComponent {
  titleName = ["商城管理", "热销商品"];
  editValue = 0;
  state = {
    page: 1,
    pageSize: 10,
    editIndex: "",
    keyword: "",
    order: 0,
    order_type: 0
  };

  onTableChange = (pagination, filters, sorter) => {
    let order_type = 0;
    switch (sorter.field) {
      case "pv":
        order_type = 0;
        break;
      case "sales":
        order_type = 1;
        break;
      case "sort":
        order_type = 2;
        break;
    }
    let order = sorter.order === "ascend" ? 1 : 0;
    this.setState(
      {
        page: pagination.current,
        pageSize: pagination.pageSize,
        order,
        order_type
      },
      () => {
        this.doSearch();
      }
    );
  };

  onPageRefresh() {
    this.setState(
      {
        page: 1,
        pageSize: 10
      },
      () => {
        this.doSearch();
      }
    );
  }

  clickSearch = key => {
    this.setState(
      {
        page: 1,
        keyword: key
      },
      () => {
        this.doSearch();
      }
    );
  };

  doSearch = () => {
    this.props.dispatch(
      actions.getHotGoods({
        page: this.state.page,
        limit: this.state.pageSize,
        keyword: this.state.keyword,
        order: this.state.order,
        order_type: this.state.order_type
      })
    );
  };

  onItemRemove = item => {
    let that = this;
    Modal.confirm({
      title: "删除提醒",
      content: "确定删除这条信息吗?",
      onOk() {
        that.props.dispatch(actions.delHotGoods({ id: item.id }));
      }
    });
  };

  componentWillReceiveProps(nextProps, nextContext) {
    let { multiSelect, goodsList } = nextProps;
    if (multiSelect && goodsList.length) {
      this.props.dispatch(
        actions.addGoods({
          goods_id: goodsList.map(item => {
            return item.id;
          })
        })
      );
      this.props.dispatch(dialog.onGoodsListSelect([]));
    }
  }

  render() {
    const { editIndex } = this.state;
    const { hotGoods, hotTotal } = this.props;
    return (
      <div className="--hotGoodsPage">
        <div className="topLay">
          <div>
            <Input.Search
              enterButton="搜索"
              placeholder="输入名称搜索"
              // onChange={e => {
              //   this.changeKeyWord(e.target.value);
              // }}
              onSearch={keyword => {
                this.clickSearch(keyword);
              }}
              style={{ width: 300, zIndex: "1" }}
            />
            {/*<Button onClick={this.doSearch.bind(this, 0, 0)}>搜索</Button>*/}
          </div>
          <Button
            onClick={() => {
              this.props.dispatch(dialog.showGoods(true));
            }}
          >
            添加商品
          </Button>
        </div>
        <Table
          className="table"
          dataSource={hotGoods}
          style={{ marginTop: "40px", marginBottom: "40px" }}
          onChange={this.onTableChange}
          pagination={{
            showQuickJumper: true,
            current: this.state.page,
            total: hotTotal
          }}
        >
          <Table.Column
            title="编号"
            align="center"
            dataIndex="id"
            width={100}
          />
          <Table.Column
            title="首图"
            align="center"
            dataIndex="cover"
            width={120}
            render={(text, record, index) => {
              return (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <ImageView
                    src={text}
                    onClick={() => {
                      renderBigImg(text);
                    }}
                    style={{ width: "120px", height: "80px" }}
                  />
                </div>
              );
            }}
          />
          <Table.Column
            width={150}
            title="商品名称"
            align="center"
            dataIndex="name"
          />
          <Table.Column
            title="点击量"
            align="center"
            dataIndex="pv"
            width={100}
            sorter={true}
          />
          <Table.Column
            title="销量"
            align="center"
            dataIndex="sales"
            width={100}
            sorter={true}
          />
          <Table.Column
            title="权重值"
            align="center"
            dataIndex="sort"
            sorter={true}
            width={100}
            render={(text, record, index) => (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
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
                            actions.setHotGoodsSort({
                              id: record.id,
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
            width={100}
            render={(text, record, index) => (
              <div>
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
        <SelectGoods />
      </div>
    );
  }
}

export default IndexPage;
