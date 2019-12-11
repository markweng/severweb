import React from "react";
import { connect } from "react-redux";
import KCCard from "@/components/card";
import BaseComponent from "@/components/baseComponent";
import SelectArea from "@/components/selectArea";
import {
  Button,
  Input,
  Upload,
  Icon,
  message,
  DatePicker,
  Spin,
  Select
} from "antd";
import uploadUrl from "@/utils/uploadUrl";
import { addUser } from "@/store/actions/user";
import moment from "moment";
import qs from "qs";
import http from "@/utils/http";
import "./index.less";

const { Option } = Select;

const USER_TYPE = {
  1: "单体药店",
  2: "连锁药店",
  3: "医院",
  4: "诊所",
  5: "商业公司"
};

@connect(state => ({
  addUser: state.user.addUser
}))
class AddUser extends BaseComponent {
  constructor(props) {
    super(props);
    this.titleName = ["用户管理", "用户列表", "新增用户"];
    this.state = {
      userInfo: { type: 1 },
      loading: false,
      selectedArea: []
    };
  }

  componentDidMount() {
    const id = qs.parse(window.location.search.split("?")[1]).id;
    if (id !== undefined) {
      this.titleName = ["用户管理", "用户列表", "编辑用户"];
      this.getUserInfo();
    }
    super.componentDidMount();
  }

  //编辑获取资质信息
  getUserInfo() {
    const id = qs.parse(window.location.search.split("?")[1]).id;
    this.setState({ loading: true });
    http({
      url: "/user/get",
      params: { id }
    })
      .then(res => {
        const userInfo = res.data.data;
        this.setState({
          userInfo,
          loading: false,
          selectedArea: [
            { label: userInfo.province, code: userInfo.province_id },
            { label: userInfo.city, code: userInfo.city_id },
            { label: userInfo.county, code: userInfo.county_id }
          ]
        });
      })
      .catch(err => {
        this.changeValue.setState({ loading: false });
      });
  }

  //上传图片
  uploadImg = (type, info) => {
    if (info.file.status === "done") {
      const res = info.file.response;
      if (res.code !== 1000) {
        message.error(res.msg);
      } else {
        const { userInfo } = this.state;
        const imageUrl = res.data[0].url;
        userInfo[type] = imageUrl;
        this.setState({ userInfo });
      }
    }
  };

  //修改资质信息
  changeValue = (type, value) => {
    const { userInfo } = this.state;
    userInfo[type] = value;
    this.setState({ userInfo });
  };

  //保存
  saveUser = () => {
    const { userInfo, selectedArea } = this.state;
    const id = qs.parse(window.location.search.split("?")[1]).id;
    //省市区名称与id
    let province = selectedArea[0] ? selectedArea[0].label : "";
    let province_id = selectedArea[0] ? selectedArea[0].code : "";
    let city = selectedArea[1] ? selectedArea[1].label : "";
    let city_id = selectedArea[1] ? selectedArea[1].code : "";
    let county = selectedArea[2] ? selectedArea[2].label : "";
    let county_id = selectedArea[2] ? selectedArea[2].code : 0;
    let data = {
      ...userInfo,
      province,
      province_id,
      city,
      city_id,
      county,
      county_id
    };

    if (id !== undefined) {
      this.saveEditInfo(data); //编辑
    } else {
      this.props.dispatch(addUser(data)); //新增
    }
  };

  //编辑保存
  saveEditInfo(data) {
    this.setState({ loading: true });
    http({
      url: "/user/edit",
      data,
      method: "post"
    })
      .then(res => {
        this.setState({ loading: false });
        message.success('保存成功');
        this.getUserInfo();
      })
      .catch(err => {
        this.setState({ loading: false });
      });
  }

  render() {
    const { userInfo, loading } = this.state;
    const id = qs.parse(window.location.search.split("?")[1]).id;
    if (id !== undefined && userInfo && !userInfo.id) {
      return null;
    }
    const { history, addUser } = this.props;
    const uploadButton = (
      <div>
        <Icon type="plus" />
      </div>
    );

    const UploadImg = ({ type }) => (
      <Upload
        name="logo"
        className="avatar-uploader"
        action={`${uploadUrl}/upload`}
        onChange={this.uploadImg.bind(this, type)}
        listType="picture-card"
        showUploadList={false}
      >
        {userInfo[type] ? (
          <img src={userInfo[type]} style={{ width: "86px", height: "86px" }} />
        ) : (
          uploadButton
        )}
      </Upload>
    );
    return (
      <div className="--add-user">
        <div style={{ textAlign: "right" }}>
          <Button
            onClick={() => {
              history.go(-1);
            }}
          >
            返回
          </Button>
          <Button
            type="primary"
            style={{ marginLeft: "16px" }}
            onClick={this.saveUser}
          >
            保存
          </Button>
        </div>
        <Spin spinning={addUser || loading}>
          <KCCard title="基本信息">
            <div className="row">
              <div>
                <span className="label">用户类型：</span>
                <Select
                  value={userInfo.type}
                  style={{ flex: 1 }}
                  placeholder="请选择用户类型"
                  onChange={value => {
                    this.changeValue("type", value);
                  }}
                >
                  {Object.keys(USER_TYPE).map(key => (
                    <Option value={Number(key)} key={key}>
                      {USER_TYPE[key]}
                    </Option>
                  ))}
                </Select>
              </div>
              <div>
                <span className="label">手机号：</span>
                <Input
                  placeholder="请输入手机号"
                  value={userInfo.phone}
                  onChange={e => {
                    this.changeValue("phone", e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="row">
              <div>
                <span className="label">企业名称：</span>
                <Input
                  placeholder="请输入企业名称"
                  value={userInfo.company}
                  onChange={e => {
                    this.changeValue("company", e.target.value);
                  }}
                />
              </div>
              <div>
                <span className="label">所属地区：</span>
                <SelectArea
                  defaultValue={[
                    userInfo.province,
                    userInfo.city,
                    userInfo.county
                  ]}
                  style={{ flex: 1 }}
                  onChange={(value, selectedArea) => {
                    this.setState({ selectedArea });
                  }}
                />
              </div>
            </div>
            <div className="row">
              <div>
                <span className="label">联系人：</span>
                <Input
                  value={userInfo.linkman}
                  placeholder="请输入联系人(和采购委托书姓名一致)"
                  onChange={e => {
                    this.changeValue("linkman", e.target.value);
                  }}
                />
              </div>
            </div>
          </KCCard>

          <KCCard title="资质信息">
            <div className="cer-info">
              {/* 营业执照 */}
              <div className="card-content">
                <div className="card-content-title">营业执照：</div>
                <div>
                  <UploadImg type="business_license_image" />
                  <div className="info">
                    <div>
                      <span className="label">营业执照单位名称：</span>
                      <Input
                        size="small"
                        placeholder="请输入单位名称"
                        value={userInfo.business_license_name}
                        onChange={e => {
                          this.changeValue(
                            "business_license_name",
                            e.target.value
                          );
                        }}
                      />
                    </div>
                    <div>
                      <span className="label">营业执照编号：</span>
                      <Input
                        size="small"
                        placeholder="请输入证件号"
                        value={userInfo.business_license}
                        onChange={e => {
                          this.changeValue("business_license", e.target.value);
                        }}
                      />
                    </div>
                    <div>
                      <span className="label">有效期：</span>
                      <DatePicker
                        size="small"
                        value={
                          userInfo.business_license_end_time
                            ? moment(userInfo.business_license_end_time * 1000)
                            : undefined
                        }
                        onChange={date => {
                          this.changeValue(
                            "business_license_end_time",
                            moment(date).unix() || ""
                          );
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* GSP */}
              {[1, 2, 5].indexOf(userInfo.type) !== -1 && (
                <div className="card-content">
                  <div className="card-content-title">GSP：</div>
                  <div>
                    <UploadImg type="drug_quality_certificate_image" />
                    <div className="info">
                      <div>
                        <span className="label">GSP编号：</span>
                        <Input
                          size="small"
                          placeholder="请输入证件号"
                          value={userInfo.drug_quality_certificate}
                          onChange={e => {
                            this.changeValue(
                              "drug_quality_certificate",
                              e.target.value
                            );
                          }}
                        />
                      </div>
                      <div>
                        <span className="label">有效期：</span>
                        <DatePicker
                          size="small"
                          value={
                            userInfo.drug_quality_certificate_end_time
                              ? moment(
                                  userInfo.drug_quality_certificate_end_time *
                                    1000
                                )
                              : undefined
                          }
                          onChange={date => {
                            this.changeValue(
                              "drug_quality_certificate_end_time",
                              moment(date).unix() || ""
                            );
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 药品经营许可证 */}
              {[1, 2, 5].indexOf(userInfo.type) !== -1 && (
                <div className="card-content">
                  <div className="card-content-title">药品经营许可证：</div>
                  <div>
                    <UploadImg type="drug_trading_license_image" />
                    <div className="info">
                      <div>
                        <span className="label">药品经营许可证编号：</span>
                        <Input
                          size="small"
                          placeholder="请输入证件号"
                          value={userInfo.drug_trading_license}
                          onChange={e => {
                            this.changeValue(
                              "drug_trading_license",
                              e.target.value
                            );
                          }}
                        />
                      </div>
                      <div>
                        <span className="label">有效期：</span>
                        <DatePicker
                          size="small"
                          value={
                            userInfo.drug_trading_license_end_time
                              ? moment(
                                  userInfo.drug_trading_license_end_time * 1000
                                )
                              : undefined
                          }
                          onChange={date => {
                            this.changeValue(
                              "drug_trading_license_end_time",
                              moment(date).unix() || ""
                            );
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 开户许可证 */}
              {[1, 2, 5].indexOf(userInfo.type) !== -1 && (
                <div className="card-content">
                  <div className="card-content-title">开户许可证：</div>
                  <div>
                    <UploadImg type="opening_accounts_license_image" />
                    <div className="info">
                      <div>
                        <span className="label">开户许可证编号：</span>
                        <Input
                          size="small"
                          placeholder="请输入证件号"
                          value={userInfo.opening_accounts_license}
                          onChange={e => {
                            this.changeValue(
                              "opening_accounts_license",
                              e.target.value
                            );
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 医疗机构执业许可证 */}

              {[3, 4].indexOf(userInfo.type) !== -1 && (
                <div className="card-content">
                  <div className="card-content-title">医疗机构执业许可证：</div>
                  <div>
                    <UploadImg type="medical_institution_license_image" />
                    <div className="info">
                      <div>
                        <span className="label">医疗机构名称：</span>
                        <Input
                          size="small"
                          placeholder="请输入医疗机构名称"
                          value={userInfo.medical_institution_license_name}
                          onChange={e => {
                            this.changeValue(
                              "medical_institution_license_name",
                              e.target.value
                            );
                          }}
                        />
                      </div>
                      <div>
                        <span className="label">编号：</span>
                        <Input
                          size="small"
                          placeholder="请输入编号"
                          value={userInfo.medical_institution_license}
                          onChange={e => {
                            this.changeValue(
                              "medical_institution_license",
                              e.target.value
                            );
                          }}
                        />
                      </div>
                      <div>
                        <span className="label">有效期：</span>
                        <DatePicker
                          size="small"
                          value={
                            userInfo.medical_institution_license_end_time
                              ? moment(
                                  userInfo.medical_institution_license_end_time *
                                    1000
                                )
                              : undefined
                          }
                          onChange={date => {
                            this.changeValue(
                              "medical_institution_license_end_time",
                              moment(date).unix() || ""
                            );
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 采购委托书 */}

              <div className="card-content">
                <div className="card-content-title">采购委托书：</div>
                <div>
                  <UploadImg type="purchase_authorize_image" />
                  <div className="info">
                    <div>
                      <span className="label">委托人：</span>
                      <Input
                        size="small"
                        placeholder="请输入委托人姓名"
                        value={userInfo.purchase_authorize_name}
                        onChange={e => {
                          this.changeValue(
                            "purchase_authorize_name",
                            e.target.value
                          );
                        }}
                      />
                    </div>
                    <div>
                      <span className="label">有效期：</span>
                      <DatePicker
                        size="small"
                        value={
                          userInfo.purchase_authorize_end_time
                            ? moment(
                                userInfo.purchase_authorize_end_time * 1000
                              )
                            : undefined
                        }
                        onChange={date => {
                          this.changeValue(
                            "purchase_authorize_end_time",
                            moment(date).unix() || ""
                          );
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* 委托人身份证 */}

              <div className="card-content">
                <div className="card-content-title">委托人身份证：</div>
                <div>
                  <UploadImg type="mandator_id_card_image" />
                  <UploadImg type="mandator_id_card_reverse_image" />
                </div>
              </div>
            </div>
          </KCCard>
        </Spin>
      </div>
    );
  }
}

export default AddUser;
