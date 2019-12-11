import React from "react";
import { Button, Cascader, Modal, Input, message, Spin } from "antd";
import * as dialog from "@/store/actions/dialog";
import ImageView from "@/components/imageView";
import http from "@/utils/http";
import store from "@/store";
import "./index.less";
import { connect } from "react-redux";
import axios from "axios";
import history from "../../utils/history";

function isEmpty(obj) {
  if (typeof obj == "undefined" || obj == null || obj == "") {
    return true;
  } else {
    return false;
  }
}

@connect(state => ({
  ...state.dialog
}))
class OCRView extends React.Component {
  state = {
    haveLoad: false,
    loading: false,
    angle: 0,
    value: ""
  };

  onCancel = () => {
    this.props.dispatch(dialog.closeOCRView());
    this.setState({
      haveLoad: false,
      loading: false,
      value: ""
    });
  };

  onOCRRecognize = () => {
    let { imgUrl } = this.props;
    this.setState({
      haveLoad: true,
      loading: true
    });
    http({
      url: "order/picture/ocr",
      method: "post",
      data: {
        img: imgUrl
      }
    }).then(res => {
      if (res.data.data.error_msg) {
        this.setState({
          value: res.data.data.error_msg,
          angle: 0,
          loading: false
        });
      } else {
        let array = res.data.data.words_result;
        let rArray = array.map(item => item.words);
        this.setState({
          value: rArray.join("\n"),
          angle: 90 * res.data.data.direction,
          loading: false
        });
      }
    });
  };

  render() {
    let { showOCR, imgUrl } = this.props;
    let { angle, loading, value, haveLoad } = this.state;
    if (!isEmpty(imgUrl) && !haveLoad) {
      this.onOCRRecognize();
    }
    return (
      <Modal
        visible={showOCR}
        title="图片查看"
        width={1000}
        onCancel={this.onCancel.bind(this)}
        footer={null}
      >
        <div style={{ display: "flex", flexDirection: "row", height: "400px" }}>
          <div style={{ flex: "1" }}>
            <ImageView
              src={imgUrl}
              style={{
                width: "400px",
                height: "400px",
                transform: `rotate(${angle}deg)`
              }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", flex: "1" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center"
              }}
            >
              <div>识别结果</div>
              <Button
                style={{
                  marginLeft: 10
                }}
                onClick={this.onOCRRecognize}
              >
                重新识别
              </Button>
            </div>
            <div>
              <Spin spinning={loading}>
                <Input.TextArea
                  style={{ width: "500px", marginTop: 10, height: "350px" }}
                  rows="6"
                  value={value}
                  onChange={e => {
                    this.setState({ value: e.target.value });
                  }}
                  placeholder="文字识别结果"
                />
              </Spin>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

export default OCRView;
