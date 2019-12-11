import React from "react";
import PropTypes from "prop-types";
import { Input, Upload, Icon, message, DatePicker } from "antd";
import uploadUrl from "@/utils/uploadUrl";
import moment from "moment";
import "../certificateInfoItem.less";

class EditCertificateInfoItem extends React.Component {
  constructor(props) {
    super(props);
  }

  //上传图片
  handleChange = (type, info) => {
    if (info.file.status === "done") {
      const res = info.file.response;
      if (res.code !== 1000) {
        message.error(res.msg);
      } else {
        const url = res.data[0].url;
        const { license, changeQualification } = this.props;
        changeQualification(license, url);
      }
    }
  };

  render() {
    let {
      title,
      isRequired,
      hasCompany,
      hasCertificates,
      hasDueTime,
      qualification,
      license,
      name,
      number,
      expires,
      changeQualification
    } = this.props;

    // 兼容老数据没有的情况
    qualification = qualification === null ? {} : qualification;

    const uploadButton = (
      <div>
        <Icon type="plus" />
      </div>
    );
    return (
      <div className="edit-certificate-info-item-component">
        <div className={isRequired ? "item-title isRequired" : "item-title"}>
          {title}
          {isRequired && "(必填)"}
        </div>
        <div
          style={{
            padding: "16px 20px 10px",
            display: "flex",
            alignItems: "center"
          }}
        >
          <div className="edit-upload-container">
            <Upload
              name="cover"
              className="avatar-uploader"
              action={`${uploadUrl}/upload`}
              onChange={this.handleChange.bind(this, license)}
              listType="picture-card"
              showUploadList={false}
            >
              {qualification[license] ? (
                <img
                  src={qualification[license]}
                  alt={title}
                  style={{ width: "86px", height: "86px" }}
                />
              ) : (
                uploadButton
              )}
            </Upload>
            <div className="img-tip">证件图</div>
            {qualification[license] && (
              <div
                className="del-img-icon"
                onClick={() => {
                  changeQualification(license, "");
                }}
              >
                <Icon type="close" className="icon" />
              </div>
            )}
          </div>
          <div className="certificate-info">
            {hasCompany && (
              <div>
                <span className="label">单位名称：</span>
                <Input
                  value={qualification[name]}
                  onChange={e => {
                    changeQualification(name, e.target.value);
                  }}
                  size="small"
                  style={{ width: "150px" }}
                  placeholder="请输入单位名称"
                />
              </div>
            )}
            {hasCertificates && (
              <div>
                <span className="label">证件号：</span>
                <Input
                  value={qualification[number]}
                  onChange={e => {
                    changeQualification(number, e.target.value);
                  }}
                  size="small"
                  style={{ width: "150px" }}
                  placeholder="请输入证件号"
                />
              </div>
            )}
            {hasDueTime && (
              <div>
                <span className="label">有效期：</span>
                <DatePicker
                  size="small"
                  style={{ width: "150px" }}
                  onChange={date => {
                    changeQualification(expires, moment(date).unix() || "");
                  }}
                  value={
                    qualification[expires]
                      ? moment(qualification[expires] * 1000)
                      : undefined
                  }
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
EditCertificateInfoItem.propTypes = {};
export default EditCertificateInfoItem;
