import React from "react";
import { connect } from "react-redux";
import { Typography } from "antd";
import * as titleName from "@/store/actions/titleName";

const { Title } = Typography;

@connect(state => ({
  ...state.titleName
}))
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.dispatch(titleName.name(["首页"]));
  }

  render() {
    return (
      <div
        style={{ marginTop: "200px", fontSize: "45px", textAlign: "center" }}
      >
        <Title level={2}>欢迎您来到小程序运营端</Title>
        <Title level={4}>成功的法则极为简单，但简单并不代表容易！</Title>
      </div>
    );
  }
}

export default Home;
