import React, { Component } from "react";
import {
  Select,
  Table,
  Input,
  Button,
  DatePicker,
  Typography,
  Upload
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

const ACTIVITY_CODE = {
  0: "活动code",
  1: "活动名称",
};

@withRouter
@connect(state => ({
  ...state.activityGoodsList
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
      activityGoodsList: []
    };
  }
  componentDidMount() {
    this.props.dispatch(titleName.name(["活动管理", "活动商品列表"]));
    this.getActivityGoodsList();
  }

  //获取用户列表
  getActivityGoodsList() {
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

    this.props.dispatch(actions.getActivityGoodsList(params));
  }
  //时间选择
  onChange = (date, dateString) => {
    this.setState(
      { start_time: dateString[0], end_time: dateString[1] },
      () => {
        this.getActivityGoodsList();
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
    const { history, loadActivityGoodsList, activityGoodsList, total } = this.props;
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
          this.getActivityGoodsList();
        });
      },
      onShowSizeChange: (page, limit) => {
        this.setState({ limit, page: 1 }, () => {
          this.getActivityGoodsList();
        });
      }
    };

    return (
      <div className={"--activity-list"}>
        <div style={{ marginBottom: "20px" }}>
          <Select
            value={"活动code"}
            style={{ width: "120px", marginRight: "0px" }}
            onChange={activity_code => {
              this.setState({ activity_code, page: 1 }, () => {
                this.getActivityGoodsList();
              });
            }}
          >
            {Object.keys(ACTIVITY_CODE).map(status => (
              <Option value={status} key={status}>
                {ACTIVITY_CODE[status]}
              </Option>
            ))}
          </Select>
          <Search
            style={{ width: "220px", marginRight: "20px" }}
            enterButton="搜索"
            placeholder="请输入"
            onSearch={keyword => {
              this.setState({ keyword, page: 1 }, () => {
                this.getActivityGoodsList();
              });
            }}
          />
          <Button
            type="primary"
            style={{ float: "right" }}
            onClick={() => {

            }}
          >
            配置活动商品
          </Button>

        </div>

        <Table
          dataSource={activityGoodsList}
          rowKey="id"
          pagination={pagination}
          loading={loadActivityGoodsList}
        >
          <Column dataIndex="id" title="序号" align="center" />
          <Column
            dataIndex="goods_main_image"
            title="商品主图"
            align="center"
            render={(value, record) =>
              <div style={{ display: 'inline-block' }}>
                <ImageView style={{ width: '100px', height: '80px' }} src={value} />
                <Upload>
                  <Button>
                    选择上传
                  </Button>
                </Upload>
              </div>}
          />
          <Column
            dataIndex="goods_id"
            title="商品ID"
            align="center"
          />
          <Column
            dataIndex="goods_name"
            title="商品名称"
            align="center"
          />
          <Column
            dataIndex="goods_current_price"
            title="商品现价"
            align="center"
          />
          <Column
            dataIndex="goods_inventory"
            title="商品库存"
            align="center"
          />

          <Column
            dataIndex="sales_price"
            title="促销价格"
            align="center"
          />
          <Column
            dataIndex="activity_code"
            title="活动code"
            align="center"
          />
          <Column
            dataIndex="coupon_id"
            title="关联优惠券ID"
            align="center"
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