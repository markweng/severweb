import React from "react";
import {
  Select,
  Table,
  Input,
  Button,
  DatePicker,
  Switch,
  Typography
} from "antd";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "@/store/actions/user";
import * as titleName from "@/store/actions/titleName";
import http from "@/utils/http";

import "./index.less";
import moment from "moment";

const Option = Select.Option;
const Column = Table.Column;
const Search = Input.Search;
const { RangePicker } = DatePicker;
const { Text } = Typography;

const STATUS_LIST = {
  register_time: "注册时间",
  last_login_time: "最近活跃时间"
};

const REGISTER_TYPE = {
  0: "全部渠道",
  1: "渠道1",
  2: "渠道2"
};

const USER_TYPE = {
  id: "用户ID",
  phone: "手机号",
  realname: "用户姓名"
};

const USER_STATUE = {
  1: true,
  2: false
};

@withRouter
@connect(state => ({
  ...state.user
}))
class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 200,
      page: 1,
      limit: 10,
      target_time: "register_time",
      channel: "0",
      target_keyword: "id",
      keyword: "",
      start_time: "",
      end_time: "",
      userList: []
    };
  }

  componentDidMount() {
    this.props.dispatch(titleName.name(["用户管理", "普通用户列表"]));
    this.getUserList();
  }

  //获取用户列表
  getUserList() {
    const {
      page,
      limit,
      target_time,
      start_time,
      end_time,
      channel,
      target_keyword,
      keyword
    } = this.state;

    const params = {
      page,
      limit,
      channel,
      target_time,
      start_time,
      end_time,
      channel,
      target_keyword,
      keyword
    };

    this.props.dispatch(actions.getUserList(params));
  }

  //时间选择
  onChange = (date, dateString) => {
    this.setState(
      { start_time: dateString[0], end_time: dateString[1] },
      () => {
        this.getUserList();
      }
    );
  };

  //切换开关
  switchOnChange(id, value) {
    http({
      url: "/ordinary.user.edit",
      params: {
        id: id,
        is_forbid_buy: value == 0 ? 1 : 0
      }
    }).then(res => {});
  }

  //导出数据
  exportData() {
    console.log("导出数据");
  }

  render() {
    const {
      page,
      limit,
      qualification_status,
      channel,
      selectType,
      keyword,
      start_time,
      end_time,
      target_time,
      target_keyword
    } = this.state;
    const { history, loadUserList, userList, total } = this.props;
    //分页器
    const pagination = {
      showTotal: () => `共${total}条`,
      total,
      pageSize: limit,
      current: page,
      showQuickJumper: true,
      showSizeChanger: true,
      onChange: page => {
        this.setState({ page }, () => {
          this.getUserList();
        });
      },
      onShowSizeChange: (page, limit) => {
        this.setState({ limit, page: 1 }, () => {
          this.getUserList();
        });
      }
    };
    return (
      <div className="--user-list">
        {/* 搜索 */}
        <div style={{ marginBottom: "20px" }}>
          <Select
            value={target_time}
            style={{ width: "130px" }}
            onChange={target_time => {
              this.setState({ target_time, page: 1 }, () => {
                this.getUserList();
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
            onChange={this.onChange}
            style={{ marginLeft: "10px", width: "230px" }}
          />

          <Text style={{ marginLeft: "10px" }}>注册渠道:</Text>

          <Select
            value={channel}
            style={{ width: "100px", marginLeft: "10px" }}
            onChange={channel => {
              this.setState({ channel, page: 1 }, () => {
                this.getUserList();
              });
            }}
          >
            {/*<Option value="0">全部渠道</Option>*/}
            {Object.keys(REGISTER_TYPE).map(status => (
              <Option value={status} key={status}>
                {REGISTER_TYPE[status]}
              </Option>
            ))}
          </Select>

          <Button
            type="primary"
            style={{ float: "right" }}
            onClick={() => {
              {
                /*history.push("/user/add");*/
              }
              this.exportData();
            }}
          >
            导出数据
          </Button>

          <Search
            style={{ width: "220px", marginRight: "20px", float: "right" }}
            enterButton="搜索"
            placeholder="请输入"
            onSearch={keyword => {
              this.setState({ keyword, page: 1 }, () => {
                this.getUserList();
              });
            }}
          />

          <Select
            value={target_keyword}
            style={{ width: "100px", float: "right", marginRight: "0px" }}
            onChange={target_keyword => {
              this.setState({ target_keyword, page: 1 }, () => {
                this.getUserList();
              });
            }}
          >
            {/*<Option value="">用户ID</Option>*/}
            {Object.keys(USER_TYPE).map(status => (
              <Option value={status} key={status}>
                {USER_TYPE[status]}
              </Option>
            ))}
          </Select>
        </div>

        {/* 列表 */}
        <Table
          dataSource={userList}
          rowKey="id"
          pagination={pagination}
          loading={loadUserList}
        >
          <Column dataIndex="id" title="用户ID" align="center" />
          <Column
            dataIndex="register_channel"
            title="注册渠道"
            align="center"
            render={(value, record) => <div>{REGISTER_TYPE[value]}</div>}
          />
          <Column dataIndex="nickname" title="昵称" align="center" />
          <Column dataIndex="phone" title="手机号" align="center" />
          <Column realname="userName" title="姓名" align="center" />
          <Column
            dataIndex="identity_card_number"
            title="证件号"
            align="center"
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
            dataIndex="is_forbid_buy"
            title="禁止下单"
            align="center"
            render={(value, record) => (
              <div>
                <Switch
                  defaultChecked={value == 0 ? false : true}
                  onChange={() => {
                    this.switchOnChange(record.id, value);
                  }}
                />
              </div>
            )}
          />
          <Column
            dataIndex="operation"
            title="操作"
            align="center"
            width={100}
            render={(value, record) => (
              <div>
                <Button
                  type="primary"
                  size="small"
                  onClick={() => {
                    history.push(`/user/detail?id=${record.id}`);
                  }}
                >
                  用户详情
                </Button>
              </div>
            )}
          />
        </Table>
      </div>
    );
  }
}

export default UserList;
