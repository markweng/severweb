import React from "react";
import { renderBigImg } from "@/utils/methods";
import "@/pages/main/saler/add/certificateInfoItem.less";
import moment from "moment";

class CertificateInfoItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      title,
      isRequired,
      hasCompany,
      hasCertificates,
      hasDueTime,
      qualification,
      license,
      name,
      number,
      expires
    } = this.props;
    return (
      <div className="certificate-info-item-component">
        <div className={isRequired ? "item-title isRequired" : "item-title"}>
          {title}
          {isRequired && "(必填)"}
        </div>
        <div style={{ padding: "16px 20px 10px", display: "flex" }}>
          <div className="img-container">
            <div
              className="img-item"
              onClick={() => {
                qualification[license] && renderBigImg(qualification[license]);
              }}
            >
              <img src={qualification[license]} alt={title} />
            </div>
            <div className="img-tip">证件图</div>
          </div>
          <div
            className="certificate-info"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center"
            }}
          >
            {hasCompany && (
              <div>
                <span className="label">单位名称：</span>
                {qualification[name]}
              </div>
            )}
            {hasCertificates && (
              <div>
                <span className="label">证件号：</span>
                {qualification[number]}
              </div>
            )}
            {hasDueTime && (
              <div>
                <span className="label">有效期：</span>
                {qualification[expires]
                  ? moment(qualification[expires] * 1000).format("YYYY-MM-DD")
                  : null}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
CertificateInfoItem.propTypes = {};
export default CertificateInfoItem;
