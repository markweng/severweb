import React from "react";
import { Modal, Input, message } from "antd";
import http from "@/utils/http";
import qs from "qs";

class AuditFailedModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      remark: ""
    };
  }

  doAudit = () => {
    const { remark } = this.state;
    if (!remark) {
      message.error("请输入拒绝的原因");
      return;
    }
    const id = qs.parse(window.location.search.split("?")[1]).id;
    const data = { id, remark };
    console.log(data);
    http({
      url: "/audit/edit",
      data,
      method: "post"
    }).then(res => {
      this.props.onClose(1);
    });
  };

  render() {
    return (
      <Modal
        title="审核拒绝原因"
        visible
        onCancel={() => {
          this.props.onClose();
        }}
        onOk={this.doAudit}
      >
        <Input.TextArea
          placeholder="请输入拒绝的原因"
          rows={6}
          onChange={e => {
            this.setState({ remark: e.target.value });
          }}
        />
      </Modal>
    );
  }
}
AuditFailedModal.propTypes = {};
export default AuditFailedModal;
