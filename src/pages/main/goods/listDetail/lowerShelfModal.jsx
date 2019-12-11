import React from "react";
import { Modal, Input, message } from "antd";
import http from "@/utils/http";
import qs from "qs";

class LowerShelfModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      remark: ""
    };
  }

  doAudit = () => {
    const { remark } = this.state;
    if (!remark) {
      message.error("请输入下架的原因");
      return;
    }
    const id = qs.parse(window.location.search.split("?")[1]).id;
    const data = { id, remark };
    http({
      url: "/audit/goodsStatus",
      data,
      method: "post"
    }).then(res => {
      this.props.onClose(1);
    });
  };

  render() {
    return (
      <Modal
        title="下架原因"
        visible
        onCancel={() => {
          this.props.onClose();
        }}
        onOk={this.doAudit}
      >
        <Input.TextArea
          placeholder="请输入下架的原因"
          rows={6}
          onChange={e => {
            this.setState({ remark: e.target.value });
          }}
        />
      </Modal>
    );
  }
}

export default LowerShelfModal;
