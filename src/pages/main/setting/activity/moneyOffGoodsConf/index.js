import React, { Component } from "react";
import {
  Select,
  Table,
  Input,
  Button,
  DatePicker,
  Typography,
  Upload,
  Icon
} from "antd";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import ImageView from "@/components/imageView";
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

@withRouter
@connect(state => ({
  ...state.secondKillGoodsList
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
      secondKillGoodsList: []
    };
  }
  componentDidMount() {
    this.props.dispatch(titleName.name(["活动管理", "满减商品配置"]));
    this.getMoneyGoodsList();
  }

  //获取用户列表
  getSecondKillGoodsList() {
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

    this.props.dispatch(actions.getSecondKillGoodsList(params));
  }
  //时间选择
  onChange = (date, dateString) => {
    this.setState(
      { start_time: dateString[0], end_time: dateString[1] },
      () => {
        this.getSecondKillGoodsList();
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
    const { history, loadSecondKillGoodsList, secondKillGoodsList, total } = this.props;
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
          this.getSecondKillGoodsList();
        });
      },
      onShowSizeChange: (page, limit) => {
        this.setState({ limit, page: 1 }, () => {
          this.getSecondKillGoodsList();
        });
      }
    };

    return (
      <div className={"--activity-list"}>
        <div style={{ marginBottom: "20px" }}>

        <Text>秒杀时间:</Text>
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
              this.getSecondKillGoodsList();
            });
          }}
        >
          {Object.keys(ACTIVITY_STATUS).map(status => (
            <Option value={status} key={status}>
              {ACTIVITY_STATUS[status]}
            </Option>
          ))}
        </Select>
          <Search
            style={{ width: "220px", marginLeft: "20px" }}
            enterButton="搜索"
            placeholder="请输入"
            onSearch={keyword => {
              this.setState({ keyword, page: 1 }, () => {
                this.getSecondKillGoodsList();
              });
            }}
          />
          <Button
          type="primary"
          style={{ float: "right" }}
          onClick={() => {

          }}
        >
          <Icon type={'plus'}/>
          新增秒杀
        </Button>
        </div>

        <Table
          dataSource={secondKillGoodsList}
          rowKey="id"
          pagination={pagination}
          loading={loadSecondKillGoodsList}
        >
          <Column dataIndex="id" title="序号" align="center" />
          <Column
            dataIndex="start_time"
            title="秒杀开始时间"
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
            dataIndex="end_time"
            title="秒杀结束时间"
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
          dataIndex="activity_state"
          title="活动状态"
          align="center"
          render={(value) => (
            <div>
              {ACTIVITY_STATUS[value]}
            </div>
          )}
        />
          <Column
            dataIndex="activity_goods_count"
            title="活动商品数量"
            align="center"
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
              <div style={{ whiteSpace: 'nowrap' }}>
                <Button
                  type="primary"
                  size="small"
                  onClick={() => {
                    // history.push(`/user/detail?id=${record.id}`);
                  }}
                >
                  编辑
              </Button>
                <Button
                  type="primary"
                  size="small"
                  style={{ marginLeft: '10px' }}
                  onClick={() => {
                    // history.push(`/user/detail?id=${record.id}`);
                  }}
                >
                  删除
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