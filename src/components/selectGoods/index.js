import React from "react";
import { Button, Checkbox, Input, Modal, Table } from "antd";
import http from "@/utils/http";
import "./index.less";
import ImageView from "@/components/imageView";
import { renderBigImg } from "@/utils/methods";
import { connect } from "react-redux";
import * as actions from "@/store/actions/dialog";
import _ from "lodash";

@connect(state => ({
  ...state.dialog
}))
class SelectGoods extends React.Component {
  constructor(props) {
    super(props);
    this.name = "";
    this.manufacturer = "";
    this.state = {
      page: 1,
      pageSize: 5,
      goodsList: [],
      selectList: [],
      total: 0
    };
  }

  marketPageChange = (page, pageSize) => {
    this.setState(
      {
        page,
        pageSize
      },
      () => {
        let params = {
          page: page,
          limit: pageSize,
          name: this.name,
          manufacturer: this.manufacturer
        };
        http({
          url: "/goods.paginate",
          params
        })
          .then(res => {
            this.setState({
              goodsList: res.data.data.data,
              total: res.data.data.total
            });
          })
          .catch(err => {});
      }
    );
  };

  changeSelectList = item => {
    let selectList = this.state.selectList;
    let isMultiSelect = this.props.multiSelect;
    if (selectList.find(i => i.id === item.id)) {
      _.remove(selectList, i => i.id === item.id);
    } else {
      if (!isMultiSelect) {
        selectList = [];
      }
      selectList.push(item);
    }
    this.setState({
      selectList: selectList
    });
  };

  onCancel = () => {
    this.props.dispatch(actions.closeGoods());
    this.setState({
      selectList: []
    });
  };

  onConfirm = () => {
    let selectList = this.state.selectList;
    let selectItem = selectList.length ? selectList[0] : {};
    this.props.dispatch(actions.onGoodsSelect(selectItem));
    this.props.dispatch(actions.onGoodsListSelect(selectList));
    this.props.dispatch(actions.closeGoods());
    this.setState({
      selectList: []
    });
  };

  changeNameValue = value => {
    this.name = value;
  };

  changeManufacturerValue = value => {
    this.manufacturer = value;
  };

  doSearch() {
    this.setState(
      {
        page: 1
      },
      () => {
        this.marketPageChange(this.state.page, this.state.pageSize);
      }
    );
  }

  componentDidMount() {
    this.props.dispatch(actions.onGoodsSelect({}));
    this.props.dispatch(actions.onGoodsListSelect([]));
    this.marketPageChange(this.state.page, this.state.pageSize);
  }

  render() {
    const { selectList, goodsList, total } = this.state;
    const { showGoods } = this.props;
    return (
      <Modal
        visible={showGoods}
        title="选择商品"
        width={1000}
        onCancel={this.onCancel.bind(this)}
        onOk={this.onConfirm.bind(this)}
      >
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Input
            placeholder="输入产品名称"
            style={{ width: "200px", marginRight: "30px", marginLeft: "30px" }}
            onChange={e => {
              this.changeNameValue(e.target.value);
            }}
          />
          <Input
            placeholder="输入商家名称"
            style={{ width: "200px", marginRight: "30px", marginLeft: "30px" }}
            onChange={e => {
              this.changeManufacturerValue(e.target.value);
            }}
          />
          <Button type="primary" onClick={this.doSearch.bind(this)}>
            搜索
          </Button>
        </div>
        <Table
          style={{ marginTop: "10px" }}
          className="table"
          dataSource={goodsList}
          pagination={{
            showQuickJumper: true,
            current: this.state.page,
            total: total,
            onChange: this.marketPageChange,
            defaultPageSize: 5
          }}
        >
          <Table.Column
            title="商品ID"
            align="center"
            dataIndex="id"
            width={100}
            render={(text, record, index) => (
              <div>
                <Checkbox
                  onChange={this.changeSelectList.bind(this, record)}
                  checked={
                    selectList.find(item => item.id == text) !== undefined
                  }
                >
                  {text}
                </Checkbox>
              </div>
            )}
          />
          <Table.Column
            title="主图"
            align="center"
            dataIndex="cover"
            width={120}
            render={(text, record, index) => (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <ImageView
                  src={text}
                  onClick={() => {
                    renderBigImg(text);
                  }}
                  style={{ width: "60px", height: "40px" }}
                />
              </div>
            )}
          />

          <Table.Column
            width={200}
            title="商品名称"
            align="center"
            dataIndex="name"
          />

          <Table.Column
            width={200}
            title="分类"
            align="center"
            dataIndex="category_name"
          />
          <Table.Column
            align="center"
            title="商家名称"
            dataIndex="manufacturer"
            width={200}
          />
          <Table.Column
            align="center"
            title="价格"
            dataIndex="price"
            width={100}
          />
        </Table>
      </Modal>
    );
  }
}

export default SelectGoods;
