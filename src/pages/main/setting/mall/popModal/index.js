import React from "react";
import { connect } from "react-redux";
import BaseComponent from "@/components/baseComponent";
import moment from "moment";
import { Button, DatePicker, Icon, Input, Radio, Upload, message } from "antd";
import ImageView from "@/components/imageView";
import classnames from "classnames";
import qs from "qs";
import uploadUrl from "@/utils/uploadUrl";
import * as banner from "@/store/actions/banner";
import * as dialog from "@/store/actions/dialog";
import SelectMarket from "@/components/selectMarket";
import SelectGoods from "@/components/selectGoods";
import SelectCategory from "@/components/selectGoodCategory";
import http from "@/utils/http";
import history from "@/utils/history";
import "./index.less";

// import SelectMarket from "@/components/selectMarket";
const { RangePicker } = DatePicker;
/**
 * banner的新增和编辑
 */
@connect(state => ({
  ...state.banner,
  ...state.dialog
}))
class IndexPage extends BaseComponent {
  constructor(props) {
    super(props);
    this.params = qs.parse(window.location.search.split("?")[1]);
    this.haveSet = false;

    if (this.params.id === "undefined") {
      this.titleName = ["商城管理", "首页轮播图", "新增"];
    } else {
      this.titleName = ["商城管理", "首页轮播图", "编辑"];
    }
    this.state = {
      loading: false,
      type: 1,
      image: "",
      title: "",
      url: "",
      start_time: Math.floor(moment().valueOf() / 1000),
      countPerDay: ""
    };
  }

  componentDidMount() {
    http({
      url: "/index.advertisement.detail"
    }).then(res => {
      let data = res.data.data;

      this.setState({
        image: data.image,
        type: data.type,
        redirect: data.redirect,
        redirectName: data.redirect_name,
        start_time: data.start_time,
        end_time: data.end_time,
        countPerDay: data.count
      });
    });
  }

  componentWillUnmount() {
    this.props.dispatch(banner.clearBannerDetail());
  }

  //选择日期,在此之前为不可选日期
  disabledDate(current) {
    return (
      current &&
      current <
        moment()
          .subtract(1, "days")
          .endOf("day")
    );
  }

  //上传图片之前的验证
  beforeUpload(file) {
    const isJPG = file.type === "image/jpeg";
    if (!isJPG) {
      message.error("You can only upload JPG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJPG && isLt2M;
  }

  //上传图片回调处理，上传中，以及上传完成。
  handleChange = info => {
    if (info.file.status === "uploading") {
      this.setState({ loading: true });
    } else if (info.file.status === "done") {
      if (info.file.response.code == "1000") {
        this.setState({
          image: info.file.response.data[0].url,
          loading: false
        });
      } else {
        message.error(info.file.response.msg);
      }
    }
  };

  nameInput = name => {
    this.setState({
      countPerDay: name
    });
  };

  linkInput = link => {
    this.setState({
      redirect: link
    });
  };

  confirm = () => {
    let { type, redirectName, redirectBefore } = this.state;
    let redirect = "";
    switch (type) {
      case "1": //商品
        type = "1";
        redirect = this.props.goodsItem.id;
        break;
      case "0": //网址链接
        type = "0";
        redirect = this.state.redirect;
        break;
    }

    let params = {
      image: this.state.image,

      type: type,
      redirect: redirect,

      start_time: this.state.start_time,
      end_time: this.state.end_time,
      count: this.state.countPerDay
    };

    http({
      url: "/index.advertisement.edit",
      params
    }).then(res => {
      message.success("提交成功！");
    });
  };

  //连接内容 选择器
  onChange = e => {
    this.setState({
      type: e.target.value,
      redirectName: ""
    });
  };
  // 改变时间
  onChangeRangeTime = value => {
    this.setState({
      start_time: value[0].valueOf() / 1000,
      end_time: value[1].valueOf() / 1000
    });
  };

  // 确定时间
  onSelectTimeOk = time => {
    this.setState({
      start_time: time[0].valueOf() / 1000,
      end_time: time[1].valueOf() / 1000
    });
  };

  render() {
    const imageUrl = this.state.image;
    const type = this.state.type;
    const state = this.state;
    const redirectName = this.state.redirectName;
    const { goodsItem, categoryList } = this.props;

    const type2 = (
      <div className="editGroup groupCenter">
        <div className="editLeft">选择商品</div>
        <div className="editRight">
          <div className={classnames({ placeholder: true })}>
            {goodsItem.name
              ? goodsItem.name
              : redirectName
              ? redirectName
              : "请选择商品名称"}
          </div>
          <Button
            onClick={() => {
              this.setState({ redirectName: null });
              this.props.dispatch(dialog.showGoods(false));
            }}
          >
            选择商品
          </Button>
          <SelectGoods />
        </div>
      </div>
    );
    const type3 = (
      <div className="editGroup groupCenter">
        <div className="editLeft">添加链接</div>
        <div className="editRight">
          <Input
            placeholder="请输入网址链接"
            value={state.redirect}
            style={{ width: 350 }}
            onChange={e => {
              this.linkInput(e.target.value);
            }}
          />
        </div>
      </div>
    );

    let typeView = "";

    switch (type) {
      case "1":
        typeView = type2;
        break;
      case "0":
        typeView = type3;
        break;
    }
    const imageView = (
      <ImageView src={imageUrl} style={{ width: "200px", height: "140px" }} />
    );
    const uploadButton = (
      <div
        style={{
          width: "200px",
          height: "140px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Icon type={this.state.loading ? "loading" : "plus"} />
      </div>
    );
    return (
      <div className="--popModalEditPage">
        <div className="editGroup">
          <div className="editLeft">弹框图片</div>
          <div className="editRight">
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action={`${uploadUrl}/upload`}
              beforeUpload={this.beforeUpload}
              onChange={this.handleChange}
              style={{ padding: "0px" }}
            >
              {imageUrl ? imageView : uploadButton}
            </Upload>
          </div>
        </div>

        <div className="editGroup groupCenter">
          <div className="editLeft">连接内容</div>
          <div className="editRight">
            <Radio.Group onChange={this.onChange} value={type}>
              {/* <Radio value={1}>推荐专题</Radio> */}
              <Radio value={"1"}>商品</Radio>
              <Radio value={"0"}>网址链接</Radio>
              {/* <Radio value={4}>商品分类</Radio> */}
            </Radio.Group>
          </div>
        </div>
        {typeView}

        <div className="editGroup groupCenter">
          <div className="editLeft">时间参数</div>
          <div className="editRight">
            <RangePicker
              showTime={{ format: "HH:mm:ss" }}
              format="YYYY-MM-DD HH:mm:ss"
              value={[
                moment(this.state.start_time * 1000),
                moment(this.state.end_time * 1000)
              ]}
              placeholder={["开始时间", "结束时间"]}
              onChange={this.onChangeRangeTime}
              onOk={this.onSelectTimeOk}
              style={{ width: 450 }}
            />
          </div>
        </div>
        <div className="editGroup groupCenter">
          <div className="editLeft">每日展示次数</div>
          <div className="editRight">
            <Input
              placeholder="次数"
              value={state.countPerDay}
              style={{ width: 350 }}
              onChange={e => {
                this.nameInput(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="buttonGroup">
          <Button className="cancel" onClick={history.goBack}>
            取消
          </Button>
          <Button className="confirm" onClick={this.confirm}>
            提交
          </Button>
        </div>
      </div>
    );
  }
}

export default IndexPage;
