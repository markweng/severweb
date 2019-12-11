import React from "react";
import { Select, Table, Input, Button ,Typography} from "antd";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import http from "@/utils/http";
import * as titleName from "@/store/actions/titleName";
import moment from 'moment';
import "./index.less";

const Option = Select.Option;
const Column = Table.Column;
const Search = Input.Search;
const { Text } = Typography;

const STATUS_LIST = {
  0:"全部",
  1: "待审核",
  2: "已审核",
  3: "已拒绝"
};

const STATUS_LISTCOLOR = {
  0: "red",
  1: "#00CC66",
  2: "#00CC66",
  3: "#00CC66",
  4: "red"
};

const USER_TYPE = {
  1: "单体药店",
  2: "连锁药店",
  3: "医院",
  4: "诊所",
  5: "商业公司"
};

const AUDIT_TYPE= {
  0:"待审核",
  1:"已审核",
  2:"已审核",
  3:"已审核",
  4:"已拒绝"
};

const SELECT_TYPE = {
  "seller_id": "用户ID",
  "phone": "手机号",
  "realname": "用户姓名",
  "store_name":"店铺名称",
  "store_id":"店铺ID"
};

@withRouter
@connect(state => ({
  ...state.user
}))
class AuditUserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 200,
      page: 1,
      limit: 10,
      type: "0",
      keyword: "",
      userList: [],
      loadUserList: false,
      total: 0,
      target_keyword:"seller_id",
      await_audit:0,
      accomplish_audit:0,
    };
  }

  componentDidMount() {
    this.props.dispatch(titleName.name(["用户管理", "用户审核"]));
    this.getUserList();
    this.getAuditList();
  }

  //审核
  onAudit(id) {
    console.log("审核",id)
  };

  //重新审核
  onAginAudit(id) {
    console.log("重新审核",id)
  };

  //获取用户审核统计
  getAuditList () {
    http({
      url: "/merchant.audit.count",
    })
        .then(res => {
          this.setState({
            await_audit: res.data.data.await_audit,
            accomplish_audit: res.data.data.accomplish_audit
          });

        })
        .catch(err => {

        });
  };

  //获取列表
  getUserList() {
    const { page, limit, type,target_keyword, keyword,total} = this.state;
    const params = { page, limit, type,target_keyword, keyword };
    this.setState({ loadUserList: true });
    http({
      url: "/merchant.audit.paginate",
      params
    })
      .then(res => {
        this.setState({
          userList: res.data.data.data,
          loadUserList: false,
          total: res.data.data.total
        });
        console.log(res.data.data)
      })
      .catch(err => {
        this.setState({ loadUserList: false });
      });

  }

  render() {
    const {
      page,
      limit,
        type,
      loadUserList,
      userList,
      total,
        target_keyword,
        await_audit,
        accomplish_audit
    } = this.state;
    const { history } = this.props;

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
      <div className="--user-audit-list">
        {/* 搜索 */}
        <div style={{ marginBottom: "20px"}}>

          <Text  style={{width:"100px"}}>
            审核状态:
          </Text>

          <Select
            value={type}
            style={{ marginLeft: "5px", width: "88px" }}
            onChange={type => {
              this.setState({ type, page: 1 }, () => {
                this.getUserList();
              });
            }}
          >
            {Object.keys(STATUS_LIST).map(status => (
              <Option value={status} key={status}>
                {STATUS_LIST[status]}
              </Option>
            ))}
          </Select>



          <Text  style={{marginLeft: "15px",width:"100px"}}>
            待审核人数:
          </Text>

          <Text  style={{marginLeft: "5px",color:"red"}}>
            {await_audit}
          </Text>

          <Text  style={{marginLeft: "15px",width:"100px"}}>
            已审核人数:
          </Text>

          <Text  style={{marginLeft: "5px"}}>
            {accomplish_audit}
          </Text>


          <Search
            style={{ width: "320px",float:"right", marginRight:'1px'}}
            enterButton="搜索"
            placeholder="请输入手机号/企业名称"
            onSearch={keyword => {
              this.setState({ keyword, page: 1 }, () => {
                this.getUserList();
              });
            }}
          />

          <Select
              value={target_keyword}
              style={{ width: "100px",float: "right",marginRight:'1px',  }}
              onChange={target_keyword => {
                this.setState({ target_keyword, page: 1 }, () => {
                  this.requestList();
                });
              }}
          >
            {Object.keys(SELECT_TYPE).map(status => (
                <Option value={status} key={status}>
                  {SELECT_TYPE[status]}
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
          <Column dataIndex="seller_id" title="用户ID" align="center" />
          <Column
              dataIndex="type"
              title="审核状态"
              align="center"
              render={(type, record)=> (

                  <div className={'name-text'} style={{color :STATUS_LISTCOLOR[type]}}>{AUDIT_TYPE[type]}</div>
              )}
          />
          <Column dataIndex="nickname" title="昵称" align="center" />
          <Column dataIndex="phone" title="手机号" align="center" />
          <Column dataIndex="linkman" title="姓名" align="center" />
          <Column
            dataIndex="type_name"
            title="用户类型"
            align="center"
          />
          <Column dataIndex="store_name" title="店铺名称" align="center" />
          <Column dataIndex="store_id" title="店铺ID" align="center" />
          <Column dataIndex="apply_time" title="送审时间" align="center" render={(value,record) =>(
              <div>
                {value != 0 ? moment.unix(value).format("YYYY-MM-DD HH:mm:ss") : "-"}
              </div>
          )}/>
          <Column dataIndex="examined_time" title="审核时间" align="center"render={(value,record) =>(
              <div>
                {value != 0 ? moment.unix(value).format("YYYY-MM-DD HH:mm:ss") : "-"}
              </div>
          )}/>

          <Column dataIndex="operate_operator" title="操作人" align="center" />

          <Column
            dataIndex="examined_time"
            title="操作"
            align="center"
            width={200}
            render={(value, record) => (
              <div>
                <Button
                    hidden={value ===0 ?"":"true"}
                  type="primary"
                  size="small"
                  onClick={() => {
                    this.onAudit(record.seller_id)
                  }}
                >
                  审核
                </Button>

                <Button
                    hidden={value ===0 ?"true":""}
                    type="primary"
                    size="small"
                    onClick={() => {
                      this.onAginAudit(record.seller_id)
                    }}
                >
                  重新审核
                </Button>

              </div>
            )}
          />
        </Table>
      </div>
    );
  }
}

export default AuditUserList;
