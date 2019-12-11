import React from "react";
import { Checkbox, Modal, Table } from "antd";
import http from "@/utils/http";
import "./index.less";
import ImageView from "@/components/imageView";
import { connect } from "react-redux";
import * as actions from "@/store/actions/dialog";
import _ from "lodash";

@connect(state => ({
  ...state.dialog
}))
class SelectMarket extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      marketList: [],
      selectList: [],
      total: 0
    };
  }

  marketPageChange = (page, pageSize) => {
    let params = {
      page: page,
      limit: pageSize
    };
    http({
      url: "/marketing.paginate",
      params
    })
      .then(res => {
        this.setState(
          {
            marketList: res.data.data.data,
            total: res.data.data.total
          },
          () => {}
        );
      })
      .catch(err => {});
  };

  changeSelectList = item => {
    let selectList = this.state.selectList;
    if (selectList.find(i => i.id === item.id)) {
      _.remove(selectList, item0 => item0.id === item.id);
    } else {
      selectList = []; //只选择一个
      selectList.push(item);
    }
    this.setState({
      selectList: selectList
    });
  };

  onCancel = () => {
    this.props.dispatch(actions.closeMarket());
    this.setState({
      selectList: []
    });
  };

  onConfirm = () => {
    let selectList = this.state.selectList;
    let selectItem = selectList.length ? selectList[0] : {};
    this.props.dispatch(actions.onMarketSelect(selectItem));
    this.props.dispatch(actions.closeMarket());
    this.setState({
      selectList: []
    });
  };

  componentDidMount() {
    this.props.dispatch(actions.onMarketSelect({}));
    this.marketPageChange(1, 10);
  }

  render() {
    const { selectList, marketList, total } = this.state;
    const { showMarket } = this.props;
    return (
      <Modal
        visible={showMarket}
        title="选择专题"
        width={1000}
        onCancel={this.onCancel.bind(this)}
        onOk={this.onConfirm.bind(this)}
      >
        <Table
          className="table"
          dataSource={marketList}
          pagination={{
            showQuickJumper: true,
            total: total,
            onChange: this.marketPageChange
          }}
        >
          <Table.Column
            title="ID"
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
            title="专题名称"
            align="center"
            dataIndex="name"
            width={100}
          />
          <Table.Column
            title="封面"
            align="center"
            dataIndex="cover"
            width={150}
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
                  style={{ width: "120px", height: "80px" }}
                />
              </div>
            )}
          />
          <Table.Column
            title="推荐三级分类"
            dataIndex="tags"
            width={120}
            render={(text, record, index) => (
              <div
                style={{
                  width: "300px",
                  overflow: "hidden"
                }}
              >
                {text}
              </div>
            )}
          />
        </Table>
      </Modal>
    );
  }
}

export default SelectMarket;
