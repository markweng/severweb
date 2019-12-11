import React from "react";
import {
  Modal,
  Input,
  InputNumber,
  Upload,
  Icon,
  message,
  Select,
  Switch
} from "antd";
import uploadUrl from "@/utils/uploadUrl";
import http from "@/utils/http";
import "./index.less";

const { Option } = Select;

const children = [
  <Option key={1}>基础资质</Option>,
  <Option key={2}>OTC药品经营资质</Option>,
  <Option key={3}>医疗器械经营资质</Option>,
  <Option key={4}>养生保健类经营资质</Option>
];

class EditClassifyModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: "",
      name: "",
      sort: "",
      is_hide: 0,
      qualifications: [],
      parent_id: 0
    };
  }

  componentDidMount() {
    const { editClassify } = this.props;
    if (editClassify) {
      const {
        name,
        image,
        sort,
        is_hide,
        qualifications,
        parent_id
      } = editClassify;

      this.setState({ name, image, sort, is_hide, qualifications, parent_id });
    }
  }

  //上传图片
  uploadImg = info => {
    if (info.file.status === "done") {
      const res = info.file.response;
      if (res.code !== 1000) {
        message.error(res.msg);
      } else {
        const image = res.data[0].url;
        this.setState({ image });
      }
    }
  };

  //保存新增或编辑的分类
  saveClassify = () => {
    const { id, hasLogo, onClose, editClassify } = this.props;
    const { image, name, sort, is_hide, qualifications } = this.state;
    let data = {};
    let url = "";

    //编辑
    if (editClassify && editClassify.id) {
      data = { id, name, sort, image, is_hide, qualifications };
      url = "/category.edit";
      if (editClassify.parent_id === 0 && !image) {
        message.error("请上传logo");
        return;
      }
    } else {
      //新增
      data = { parent_id: id, name, sort, image: hasLogo ? image : "" };
      url = "/category.add";
      if (hasLogo && !image) {
        message.error("请上传logo");
        return;
      }
    }
    http({
      url,
      data,
      method: "post"
    }).then(res => {
      onClose(1);
    });
  };

  // 关联资质
  handleChangeQualifications = e => {
    this.setState({
      qualifications: e
    });
  };

  // 是否启用分类
  onChangeCategoryStatus = e => {
    this.setState({
      is_hide: e == true ? 0 : 1
    });
  };

  render() {
    const {
      name,
      image,
      sort,
      is_hide,
      qualifications,
      parent_id
    } = this.state;

    const { onClose, hasLogo, editClassify } = this.props;
    const uploadButton = (
      <div>
        <Icon type="plus" />
      </div>
    );
    return (
      <Modal
        visible
        title={editClassify ? "编辑分类" : "新增分类"}
        onCancel={() => {
          onClose();
        }}
        onOk={this.saveClassify}
        className="--edit-classify-modal"
      >
        <div className="row">
          <span>分类名称：</span>
          <Input
            placeholder="请输入分类名称"
            value={name}
            onChange={e => {
              this.setState({ name: e.target.value });
            }}
          />
        </div>
        {hasLogo || (editClassify && editClassify.parent_id === 0) ? (
          <div className="row">
            <span>logo：</span>
            <Upload
              name="logo"
              className="avatar-uploader"
              action={`${uploadUrl}/upload`}
              onChange={this.uploadImg}
              listType="picture-card"
              showUploadList={false}
            >
              {image ? (
                <img src={image} style={{ width: "86px", height: "86px" }} />
              ) : (
                uploadButton
              )}
            </Upload>
          </div>
        ) : null}
        <div className="row">
          <span>权重：</span>
          <InputNumber
            placeholder="请输入权重"
            style={{ flex: 1 }}
            value={sort}
            onChange={value => {
              this.setState({ sort: value });
            }}
          />
        </div>
        {editClassify && editClassify.parent_id === 0 ? (
          <>
            <div className="row">
              <span>关联资质：</span>
              <Select
                allowClear={false}
                showArrow={true}
                mode="multiple"
                style={{ width: "100%" }}
                maxTagTextLength={3}
                value={qualifications}
                placeholder="选择类目关联的资质"
                onChange={this.handleChangeQualifications}
              >
                {children}
              </Select>
            </div>
            <div className="row">
              <span>是否启用：</span>
              <Switch
                checkedChildren="开"
                unCheckedChildren="关"
                onChange={this.onChangeCategoryStatus}
                checked={!is_hide}
              />
            </div>
          </>
        ) : null}
      </Modal>
    );
  }
}

export default EditClassifyModal;
