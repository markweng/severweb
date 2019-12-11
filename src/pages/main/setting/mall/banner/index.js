import React from "react";
import { connect } from "react-redux";
import { Radio, Input, Modal, Button, Table, Icon, Select } from "antd";
import "./index.less";
import history from "@/utils/history";
import BaseComponent from "@/components/baseComponent";
import ImageView from "@/components/imageView";
import * as actions from "@/store/actions/banner";
import common from "@/store/reducers/common";
import banner from "@/store/reducers/banner";
import { renderBigImg } from "@/utils/methods";
import moment from "moment";

const { Option } = Select;

const BANNER_TYPE = ["", "链接", "商品", "店铺", "商品分类", "专题"];
const STATUS = ["下架", "上架"];
const OPERATE = ["上架", "下架"];
@connect(state => ({
  ...state.common,
  ...state.banner
}))
class IndexPage extends BaseComponent {
  titleName = ["商城管理", "首页轮播图"];
  editValue = 0;
  state = {
    page: 1,
    pageSize: 10,
    editIndex: "",
    keyword: "",
    status: 1 // 1 上线 0 下线
  };

  changeKeyWord = value => {
    this.setState({ keyword: value, page: 1 }, () => {
      this.doSearch();
    });
  };

  pageChange = (page, pageSize) => {
    this.setState(
      {
        page,
        pageSize
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

  doSearch = () => {
    this.props.dispatch(
      actions.getBannerList({
        page: this.state.page,
        limit: this.state.pageSize,
        keyword: this.state.keyword,
        status: this.state.status
      })
    );
  };

  onItemClick = item => {
    //编辑
    if (item) {
      history.push("/mall/banner/edit?id=" + item.id);
    } else {
      history.push("/mall/banner/edit");
    }
  };

  // 切换上下架状态
  onToggleStatus = value => {
    this.setState(
      {
        status: value,
        page: 1
      },
      () => {
        this.doSearch();
      }
    );
  };

  render() {
    const { editIndex } = this.state;
    const { banner, bannerTotal } = this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 }
      }
    };
    return (
      <div className="--bannerPage">
        <div className="topLay">
          <div>
            状态：
            <Select value={this.state.status} onChange={this.onToggleStatus}>
              <Option value={1}>上架</Option>
              <Option value={0}>下架</Option>
            </Select>
            <Input.Search
              placeholder="输入名称搜索"
              onSearch={value => {
                this.changeKeyWord(value);
              }}
              style={{ width: 350, zIndex: "1", marginLeft: "10px" }}
            />
          </div>

          <Button onClick={this.onItemClick.bind(this)}>新增</Button>
        </div>
        <Table
          className="table"
          dataSource={banner}
          style={{ marginTop: "40px", marginBottom: "40px" }}
          rowKey="id"
          pagination={{
            showQuickJumper: true,
            current: this.state.page,
            total: bannerTotal,
            onChange: this.pageChange
          }}
        >
          <Table.Column
            title="序号"
            align="center"
            dataIndex="id"
            width={100}
          />
          <Table.Column
            title="轮播图"
            align="center"
            dataIndex="image"
            width={120}
            render={(text, record, index) => (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <ImageView
                  src={text}
                  style={{ width: "120px", height: "80px" }}
                  onClick={() => {
                    renderBigImg(text);
                  }}
                />
              </div>
            )}
          />
          <Table.Column title="名称" align="center" dataIndex="title" />

          <Table.Column
            title="权重值"
            align="center"
            dataIndex="sort"
            width={100}
            render={(text, record, index) => (
              <div
                style={{
                  width: "100px",
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
                            actions.setBannerStatus({
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
            title="上线时间"
            align="center"
            dataIndex="time"
            width={200}
            render={(text, record, index) => {
              return (
                <div>
                  {moment(record.start_time * 1000).format(
                    "YYYY-MM-DD HH:mm:ss"
                  )}
                  <br />
                  {record.end_time
                    ? moment(record.end_time * 1000).format(
                        "YYYY-MM-DD HH:mm:ss"
                      )
                    : "永久"}
                </div>
              );
            }}
          />
          <Table.Column
            title="状态"
            align="center"
            dataIndex="status"
            width={100}
            render={(text, record, index) => <div>{STATUS[record.status]}</div>}
          />
          <Table.Column
            title="操作"
            align="center"
            width={250}
            render={(text, record, index) => (
              <div>
                <Button
                  onClick={() => {
                    this.props.dispatch(
                      actions.setBannerStatus({
                        id: record.id,
                        status: record.status === 1 ? 0 : 1
                      })
                    );
                  }}
                >
                  {OPERATE[record.status]}
                </Button>

                <Button
                  style={{ marginLeft: "10px" }}
                  onClick={this.onItemClick.bind(this, record)}
                >
                  编辑
                </Button>
              </div>
            )}
          />
        </Table>
      </div>
    );
  }
}

export default IndexPage;
