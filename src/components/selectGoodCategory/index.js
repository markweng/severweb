import React from "react";
import { Checkbox, Modal, Table, Cascader } from "antd";
import http from "@/utils/http";
import "./index.less";
import ImageView from "@/components/imageView";
import { connect } from "react-redux";
import * as actions from "@/store/actions/dialog";
import _ from "lodash";

@connect(state => ({
  ...state.dialog
}))
class SelectCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryList: [],
      selectList: []
    };
  }

  componentDidMount() {
    this.props.dispatch(actions.onCategorySelect([]));
    let params = {};
    http({
      url: "/category.detail",
      params
    })
      .then(res => {
        this.setState({
          categoryList: res.data.data
        });
      })
      .catch(err => {});
  }

  onChange = (value1, value2) => {
    this.setState({
      selectList: value2
    });
  };

  onCancel = () => {
    this.props.dispatch(actions.closeCategory());
    this.setState({
      selectList: []
    });
  };

  onConfirm = () => {
    let selectList = this.state.selectList;
    this.props.dispatch(actions.onCategorySelect(selectList));
    this.props.dispatch(actions.closeCategory());
    this.setState({
      selectList: []
    });
  };

  render() {
    const { select, categoryList, total } = this.state;
    const { showCategory } = this.props;
    return (
      <Modal
        visible={showCategory}
        title="选择商品分类"
        width={700}
        bodyStyle={{ height: "250px" }}
        onCancel={this.onCancel.bind(this)}
        onOk={this.onConfirm.bind(this)}
      >
        <Cascader
          style={{ width: "600px" }}
          changeOnSelect
          fieldNames={{ label: "name", value: "id", children: "children" }}
          options={categoryList}
          onChange={this.onChange}
          placeholder="选择商品分类"
        />
      </Modal>
    );
  }
}

export default SelectCategory;
