import React from "react";
import { Row, Col, Menu, Dropdown, Icon } from "antd";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { clearLoginInfo, getUserInfo } from "@/store/actions/login";
import "./index.less";

@withRouter
@connect(state => ({
  ...state.login,
  ...state.titleName
}))
class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(getUserInfo());
  }

  logout() {
    const { history, dispatch } = this.props;
    dispatch(clearLoginInfo());
    history.push("/login");
  }

  render() {
    const { loginUser, titleName } = this.props;
    const menu = (
      <Menu>
        <Menu.Item>
          <span onClick={this.logout.bind(this)}>退出登录</span>
        </Menu.Item>
      </Menu>
    );
    return (
      <div className="--header">
        <Row className="contents">
          <Col span={16}>{titleName}</Col>
          <Col span={8} className="login-info">
            <Dropdown overlay={menu}>
              <span style={{ marginLeft: "10px" }}>
                {loginUser}&nbsp;
                <Icon type="down" style={{ fontSize: "16px" }} />
              </span>
            </Dropdown>
          </Col>
        </Row>
      </div>
    );
  }
}

Header.propTypes = {};
export default Header;
