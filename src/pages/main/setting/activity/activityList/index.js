import React, { Component } from "react";
import {
  Select,
  Table,
  Input,
  Button,
  DatePicker,
  Typography
} from "antd";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "@/store/actions/activity";
import * as titleName from "@/store/actions/titleName";
import http from "@/utils/http";
import "./index.less";
import moment from "moment";

const Option = Select.Option;
const Column = Table.Column;
const Search = Input.Search;
const { RangePicker } = DatePicker;
const { Text } = Typography;

const ACTIVITY_STATUS = {
  0: "全部",
  1: "进行中",
  2: "未开始",
  3: "已结束"

};
const ACTIVITY_CODE = {
  0: "活动code",
  1: "活动名称",
};

@withRouter
@connect(state => ({
  ...state.activity
}))
class IndexPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      page: 1,
      limit: 10,
      target_time: "register_time",
      activity_state: 0,
      activity_code: "id",
      keyword: "",
      start_time: "",
      end_time: "",
      activityList: []
    };
  }
  componentDidMount() {
    this.props.dispatch(titleName.name(["活动管理", "活动列表"]));
    this.getActivityList();
  }

  
  getActivityList() {
    const {
      page,
      limit,
      target_time,
      start_time,
      end_time,
      activity_state,
      activity_code,
      keyword
    } = this.state;

    const params = {
      page,
      limit,
      target_time,
      start_time,
      end_time,
      activity_state,
      activity_code,
      keyword
    };

    this.props.dispatch(actions.getActivityList(params));
  }
  //时间选择
  onChange = (date, dateString) => {
    this.setState(
      { start_time: dateString[0], end_time: dateString[1] },
      () => {
        this.getActivityList();
      }
    );
  };
  render() {

    const {
      page,
      limit,
      qualification_status,
      activity_state,
      selectType,
      keyword,
      start_time,
      end_time,
      target_time,
      activity_code
    } = this.state;
    const { history, loadActivityList, activityList, total } = this.props;
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
          this.getActivityList();
        });
      },
      onShowSizeChange: (page, limit) => {
        this.setState({ limit, page: 1 }, () => {
          this.getActivityList();
        });
      }
    };

    return (
      <div className={"--activity-list"}>
        <div style={{ marginBottom: "20px" }}>
          <Text>活动时间:</Text>
          <RangePicker
            onChange={this.onChange}
            style={{ marginLeft: "10px", width: "230px" }}
          />
          <Text style={{ marginLeft: "10px" }}>活动状态:</Text>
          <Select
            value={ACTIVITY_STATUS[0]}
            style={{ width: "100px", marginLeft: "10px" }}
            onChange={activity_state => {
              this.setState({ activity_state, page: 1 }, () => {
                this.getActivityList();
              });
            }}
          >
            {Object.keys(ACTIVITY_STATUS).map(status => (
              <Option value={status} key={status}>
                {ACTIVITY_STATUS[status]}
              </Option>
            ))}
          </Select>

          <Button
            type="primary"
            style={{ float: "right" }}
            onClick={() => {

            }}
          >
            创建活动
          </Button>
          <Search
            style={{ width: "220px", marginRight: "20px", float: "right" }}
            enterButton="搜索"
            placeholder="请输入"
            onSearch={keyword => {
              this.setState({ keyword, page: 1 }, () => {
                this.getActivityList();
              });
            }}
          />
          <Select
            value={"活动code"}
            style={{ width: "120px", float: "right", marginRight: "0px" }}
            onChange={activity_code => {
              this.setState({ activity_code, page: 1 }, () => {
                this.getActivityList();
              });
            }}
          >
            {Object.keys(ACTIVITY_CODE).map(status => (
              <Option value={status} key={status}>
                {ACTIVITY_CODE[status]}
              </Option>
            ))}
          </Select>
        </div>

        <Table
          dataSource={activityList}
          rowKey="id"
          pagination={pagination}
          loading={loadActivityList}
        >
          <Column dataIndex="id" title="序号" align="center" />
          <Column
            dataIndex="activity_name"
            title="活动名称"
            align="center"
            render={(value, record) => <div>{"活动1"}</div>}
          />
          <Column
            dataIndex="activity_code"
            title="活动code"
            align="center"
          />
          <Column
            dataIndex="activity_start_time"
            title="活动开始时间"
            align="center"
            render={(value, record) => (
              <div>
                {value != 0
                  ? moment.unix(value).format("YYYY-MM-DD HH:mm:ss")
                  : "-"}
              </div>
            )} />
          <Column
            dataIndex="activity_end_time"
            title="活动结束时间"
            align="center"
            render={(value, record) => (
              <div>
                {value != 0
                  ? moment.unix(value).format("YYYY-MM-DD HH:mm:ss")
                  : "-"}
              </div>
            )} />
          <Column
            dataIndex="activity_state"
            title="活动状态"
            align="center"
            render={(value) => (
              <div>
                {ACTIVITY_STATUS[value]}
              </div>
            )}
          />

          <Column dataIndex="creater" title="创建人" align="center" />
          <Column
            dataIndex="create_time"
            title="创建时间"
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
            dataIndex="operationer"
            title="操作人"
            align="center"
          />
          <Column
            dataIndex="last_operation_time"
            title="最近操作时间"
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
            width={100}
            render={(value, record) => (
              <div>
                <Button
                  type="primary"
                  size="small"
                  onClick={() => {
                    // history.push(`/user/detail?id=${record.id}`);
                  }}
                >
                  编辑
              </Button>
              </div>
            )}
          />
        </Table>
      </div>
    );
  }
}

export default IndexPage;