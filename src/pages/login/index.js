import React from "react";
import { connect } from "react-redux";
import bgImg from "@/assets/bj-denglu.png";
import tpImg from "@/assets/tp-denglu.png";
import { Form, Icon, Input, Button, Checkbox } from "antd";
import * as actions from "@/store/actions/login";
import "./index.less";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSubmit = e => {
    e.preventDefault();
    const { dispatch } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        dispatch(actions.login(values));
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="--login">
        <div className="header">运营端</div>
        <div style={{ flex: 1, position: "relative" }}>
          <img src={bgImg} style={{ width: "100%", height: "100%" }} />
          <div
            className="content"
            style={{ width: "675px", height: "412px", margin: "63px auto" }}
          >
            <img src={tpImg} style={{ width: "337px" }} />
            <Form onSubmit={this.handleSubmit} className="login-form">
              <div className="logo-container">
                <div style={{ fontSize: "24px", color: "#333" }}>登录</div>
                <span>运营端</span>
              </div>
              <Form.Item>
                {getFieldDecorator("username", {
                  rules: [{ required: true, message: "请输入登录账号！" }]
                })(
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="请输入登录账号"
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("password", {
                  rules: [{ required: true, message: "请输入账号密码！" }]
                })(
                  <Input
                    prefix={
                      <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    type="password"
                    placeholder="请输入账号密码！"
                  />
                )}
              </Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                登录
              </Button>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {};

export default Form.create()(connect()(Login));
