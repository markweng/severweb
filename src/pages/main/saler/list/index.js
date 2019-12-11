import React, { Fragment } from "react";
import { connect } from "react-redux";
import {
  Select,
  Input,
  Table,
  Button,
  Pagination,
  Spin,
  DatePicker,
  Typography
} from "antd";
import BaseComponent from "@/components/baseComponent";
import http from "@/utils/http";
import * as titleName from "@/store/actions/titleName";
import "./index.less";
import moment from "moment";

const Option = Select.Option;
const Search = Input.Search;
const Column = Table.Column;
const { RangePicker } = DatePicker;
const { Text } = Typography;

const STATUS = { 0: "正常", 1: "待审核", 2: "证件过期", 3: "已拒绝" };
const STATUS_LIST = {
  register_time: "注册时间",
  last_login_time: "最近活跃时间"
};

const REGISTER_TYPE = {
  0: "全部渠道",
  1: "渠道1",
  2: "渠道2"
};

const STORE_TYPE = {
  0: "全部",
  1: "营业中",
  2: "已关闭"
};

const STORESTATUE_TYPE = {
  1: "营业中",
  0: "已关闭"
};

const STORESTATUECOLOR_TYPE = {
  1: "#00CC66",
  0: "red"
};

const USER_TYPE = {
  seller_id: "用户ID",
  phone: "手机号",
  realname: "用户姓名",
  store_name: "店铺名称",
  store_id: "店铺ID"
};

@connect(state => ({}))
class SalerList extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      total: 0,
      limit: 20,
      keyword: "",
      goodsList: [],
      isLoading: true,
      target_time: "register_time",
      start_time: "",
      end_time: "",
      channel: "0",
      status: "0",
      target_keyword: "seller_id"
    };
  }

  componentDidMount() {
    this.props.dispatch(titleName.name(["商家管理", "商家列表"]));
    this.requestList();
  }

  //请求列表数据
  requestList() {
    var parmas = {};
    var status = this.state.status == 2 ? "0" : "1";
    if (this.state.status == 0) {
      parmas = {
        keyword: this.state.keyword,
        limit: this.state.limit,
        page: this.state.page,
        target_time: this.state.target_time,
        start_time: this.state.start_time,
        end_time: this.state.end_time,
        channel: this.state.channel,
        target_keyword: this.state.target_keyword
      };
    } else {
      parmas = {
        keyword: this.state.keyword,
        page: this.state.page,
        limit: this.state.limit,
        target_time: this.state.target_time,
        start_time: this.state.start_time,
        end_time: this.state.end_time,
        channel: this.state.channel,
        status: status,
        target_keyword: this.state.target_keyword
      };
    }

    console.log("AAA:", parmas);
    http({
      url: "/merchant.user.paginate",
      params: parmas
    }).then(res => {
      let { data, current_page, per_page, total } = res.data.data;
      this.setState({
        goodsList: data,
        page: current_page,
        limit: per_page,
        total: total,
        isLoading: false
      });
      console.log(this.state.goodsList);
    });
  }

  //切换页码
  changePage = page => {
    this.setState({ page, isLoading: true }, () => {
      this.requestList();
    });
  };

  //选择时间
  onTimeChange = (date, dateString) => {
    this.setState(
      { start_time: dateString[0], end_time: dateString[1] },
      () => {
        this.requestList();
      }
    );
  };

  //导出数据
  exportData() {
    console.log("导出数据");
  }

  render() {
    const {
      goodsList,
      page,
      limit,
      total,
      isLoading,
      target_time,
      channel,
      status,
      target_keyword
    } = this.state;
    const { history } = this.props;
    return (
      <div className="--saler-list">
        {/* 搜索栏 */}
        <div style={{ marginBottom: "20px" }}>
          <Select
            value={target_time}
            style={{ width: "128px" }}
            onChange={target_time => {
              this.setState({ target_time, page: 1 }, () => {
                this.requestList();
              });
            }}
          >
            {/*<Option value="0">注册时间</Option>*/}
            {Object.keys(STATUS_LIST).map(status => (
              <Option value={status} key={status}>
                {STATUS_LIST[status]}
              </Option>
            ))}
          </Select>

          <RangePicker
            onChange={this.onTimeChange}
            style={{ marginLeft: "1px", width: "230px" }}
          />

          <Text style={{ marginLeft: "5px", width: "40px" }}>注册渠道:</Text>

          <Select
            value={channel}
            style={{ width: "100px", marginLeft: "1px" }}
            onChange={channel => {
              this.setState({ channel, page: 1 }, () => {
                this.requestList();
              });
            }}
          >
            {Object.keys(REGISTER_TYPE).map(status => (
              <Option value={status} key={status}>
                {REGISTER_TYPE[status]}
              </Option>
            ))}
          </Select>

          <Text style={{ marginLeft: "5px", width: "40px" }}>经营状态:</Text>

          <Select
            value={status}
            style={{ width: "88px", marginLeft: "1px" }}
            onChange={status => {
              this.setState({ status, page: 1 }, () => {
                this.requestList();
              });
            }}
          >
            {Object.keys(STORE_TYPE).map(status => (
              <Option value={status} key={status}>
                {STORE_TYPE[status]}
              </Option>
            ))}
          </Select>

          <Button
            type="primary"
            style={{ width: "100px", float: "right", marginRight: "0px" }}
            onClick={() => {
              this.exportData();
            }}
          >
            导出数据
          </Button>

          <Search
            style={{ width: "200px", marginRight: "5px", float: "right" }}
            enterButton="搜索"
            placeholder="请输入"
            onSearch={keyword => {
              this.setState({ keyword, page: 1 }, () => {
                this.requestList();
              });
            }}
          />

          <Select
            value={target_keyword}
            style={{ width: "100px", float: "right", marginRight: "1px" }}
            onChange={target_keyword => {
              this.setState({ target_keyword, page: 1 }, () => {
                this.requestList();
              });
            }}
          >
            {Object.keys(USER_TYPE).map(status => (
              <Option value={status} key={status}>
                {USER_TYPE[status]}
              </Option>
            ))}
          </Select>
        </div>

        {/* 表格 */}
        <Spin spinning={isLoading}>
          <Table dataSource={goodsList} rowKey="id" pagination={false}>
            <Column dataIndex="seller_id" title="用户ID" align="center" />
            <Column
              dataIndex="register_channel"
              title="注册渠道"
              align="center"
              render={(value, record) => <div>{REGISTER_TYPE[value]}</div>}
            />
            <Column dataIndex="id" title="用户类型" align="center" />
            <Column dataIndex="nickname" title="昵称" align="center" />
            <Column dataIndex="phone" title="手机号" align="center" />
            <Column dataIndex="linkman" title="姓名" align="center" />
            <Column
              dataIndex="identity_card_number"
              title="证件号"
              align="center"
            />
            <Column dataIndex="store_name" title="店铺名称" align="center" />
            <Column dataIndex="store_id" title="店铺ID" align="center" />

            <Column
              dataIndex="status"
              title="经营状态"
              align="center"
              render={(status, record) => (
                <div
                  className={"name-text"}
                  style={{ color: STORESTATUECOLOR_TYPE[status] }}
                >
                  {STORESTATUE_TYPE[status]}
                </div>
              )}
            />
            <Column dataIndex="balance" title="钱包总余额" align="center" />
            <Column
              dataIndex="register_time"
              title="注册时间"
              align="center"
              render={(value, record) => (
                <div>
                  {value != 0
                    ? moment.unix(value).format("YYYY-MM-DD HH:mm:ss")
                    : "-"}
                </div>
              )}
            />
            <Column
              dataIndex="last_login_time"
              title="最近活跃时间"
              align="center"
              render={(value, record) => (
                <div>
                  {value != 0
                    ? moment.unix(value).format("YYYY-MM-DD HH:mm:ss")
                    : "-"}
                </div>
              )}
            />

            <Column
              dataIndex="operation"
              title="操作"
              align="center"
              render={(text, record) => (
                <Fragment>
                  <Button
                    size="small"
                    type="primary"
                    onClick={() => {
                      history.push(`/saler/detail?store_id=${record.store_id}`);
                    }}
                  >
                    用户详情
                  </Button>
                </Fragment>
              )}
            />
          </Table>
        </Spin>

        {/* 分页 */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            marginTop: "20px"
          }}
        >
          <span style={{ marginRight: "20px" }}>共{total} 条</span>
          <Pagination
            showQuickJumper
            current={page}
            total={total}
            pageSize={limit}
            onChange={page => {
              this.changePage(page);
            }}
          />
        </div>
      </div>
    );
  }
}

export default SalerList;
