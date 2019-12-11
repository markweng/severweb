import React from "react";
import { connect } from "react-redux";
import { Select, Input, Table, Button, Pagination } from "antd";
import http from "@/utils/http";
import * as titleName from "@/store/actions/titleName";
import "./index.less";

const Option = Select.Option;
const Search = Input.Search;
const Column = Table.Column;

const IS_OPEN = { 0: "下架", 1: "上架" };
const STATUS = { 0: "待审核", 1: "已通过", 2: "已拒绝" };
const GOODSLABEL = {0:"全部商品",1:"普通商品",2:"满减商品",3:"秒杀商品",4:"新人首购商品"};
const GOODSSTATUE = {0:"全部商品",1:"上架中",2:"已下架",3:"已删除"};
const SEARCHTYPE = {0:"商品名称",1:"商品ID",2:"商家名称"};
const OPERATE = ["删除", "下架"];
const GOODSSTATUE_TYPE = {
  0: "已删除",
  1: "上架中",
  2: "已下架",
};

const GOODSSTATUECOLOR_TYPE = {
  0: "red",
  1: "#00CC66",
  2: "red",
};

const BATCH_TYPE= {
  1: "批量下架",
  2: "批量删除"
};



@connect(state => ({}))
class GoodsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      total: 200,
      limit: 10,
      keyword: "",
      loading: false,
      goodsList: [],
      goodsClass:{0:"全部商品"},
      goodsClassSelect:"0",
      goodsLabel:"0",
      goodsStatus:"0",
      searchType:"0",
      status:"",
      inventorySortedInfo: null,
      salesSortedInfo: null,
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,
      batchType:0,
    };
  }

  componentDidMount() {
    this.props.dispatch(titleName.name(["商品管理", "商品列表"]));
    this.getGoodsList();
  }
  //新增商品
  addGoods () {
    console.log("新增商品")
  };

  //导出数据
  exportData(){
  console.log("导出数据")
};

  shelvesOrDelete(ids,status) {
    if (status ==0) {//下架
      this.shelves(ids);
    }else  {//删除
      this.delete(ids)
    }
  };


//下架
  shelves (ids) {
    console.log("下架",ids)
  };

  //删除
  delete (ids) {
    console.log("删除",ids)
  };

  //批量操作
  start = () => {
    this.setState({ loading: true });
    const {batchType} = this.state;
    // ajax request after empty completing
    if(batchType == 1) {//批量下架
      console.log("批量下架")
      this.shelves(this.state.selectedRowKeys);
    }else  if(batchType == 2) {//批量删除
      console.log("批量删除")
      this.delete(this.state.selectedRowKeys)
    }


    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
        loading: false,
      });
    }, 1000);
  };

  //选择
  onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  //获取商品列表
  getGoodsList = () => {
    const { page, limit,status, goodsClassSelect,goodsLabel,goodsStatus,searchType, keyword } = this.state;
    const dict = { page, limit,status, goodsClassSelect,goodsLabel,goodsStatus,searchType, keyword }

    console.log(dict)
    const params = { page, limit, status, keyword };
    this.setState({ loading: true });
    http({
      url: "/audit/goodsPaginate",
      params
    })
      .then(res => {
        this.setState({
          loading: false,
          total: res.data.data.total,
          goodsList: res.data.data.data
        });
      })
      .catch(err => {
        this.setState({ loading: false });
      });
  };

  changePage = page => {
    this.setState({ page }, () => {
      this.getGoodsList();
    });
  };


  render() {
    const { goodsList, page, limit, total, keyword,goodsClass,salesSortedInfo,inventorySortedInfo } = this.state;
    const { history } = this.props;
   let  inventorySortedInfoN = inventorySortedInfo || {};
   let  salesSortedInfoN = salesSortedInfo || {};

    const { loading, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;

    return (
      <div className="--goods-list">
        {/* 搜索栏 */}
        <div style={{ marginBottom: "20px" }}>
          <span>商品分类：</span>
          <Select
            defaultValue="0"
            style={{ width: 120 }}
            onChange={goodsClassSelect => {
              this.setState({ goodsClassSelect, page: 1 }, () => {
                this.getGoodsList();
              });
            }}
          >
            {Object.keys(goodsClass).map(status => (
                <Option value={status} key={status}>
                  {goodsClass[status]}
                </Option>
            ))}

          </Select>
          {/*GOODSLABEL*/}
          <span style={{marginLeft: "10px"}}>商品标签：</span>
          <Select
              defaultValue="0"
              style={{ width: 130 }}
              onChange={goodsLabel => {
                this.setState({ goodsLabel, page: 1 }, () => {
                  this.getGoodsList();
                });
              }}
          >
            {Object.keys(GOODSLABEL).map(status => (
                <Option value={status} key={status}>
                  {GOODSLABEL[status]}
                </Option>
            ))}

          </Select>

          {/*GOODSSTATUE*/}
          <span style={{marginLeft: "10px"}}>商品状态：</span>
          <Select
              defaultValue="0"
              style={{ width: 130 }}
              onChange={goodsStatus => {
                this.setState({ goodsStatus, page: 1 }, () => {
                  this.getGoodsList();
                });
              }}
          >
            {Object.keys(GOODSSTATUE).map(status => (
                <Option value={status} key={status}>
                  {GOODSSTATUE[status]}
                </Option>
            ))}

          </Select>

          <Button
              type="primary"
              style={{width: "100px", float: "right" ,marginRight:'0px',}}
              onClick={() => {
                this.addGoods();
              }}
          >
            +新增商品
          </Button>

          <Button
              type="primary"
              style={{width: "90px", float: "right" ,marginRight:'10px',}}
              onClick={() => {
                this.exportData();
              }}
          >
            导出数据
          </Button>

          <div style={{ float: "right" ,marginRight:'10px'}}>
            <Search
              placeholder="请输入"
              enterButton="搜索"
              onSearch={keyword => {
                this.setState({ keyword, page: 1 }, () => {
                  this.getGoodsList();
                });
              }}
              style={{ width: 150 }}
            />
          </div>


          <Select
              defaultValue="0"
              style={{ width: 100,float: "right",marginRight:"1px" }}
              onChange={searchType => {
                this.setState({ searchType, page: 1 }, () => {
                  this.getGoodsList();
                });
              }}
          >
            {Object.keys(SEARCHTYPE).map(status => (
                <Option value={status} key={status}>
                  {SEARCHTYPE[status]}
                </Option>
            ))}

          </Select>

        </div>

        {/* 表格 */}

        <Table dataSource={goodsList} rowKey="id" pagination={false} rowSelection={rowSelection}>
          <Column dataIndex="id" title="商品ID" align="center" />
          <Column
            dataIndex="cover"
            title="封面图"
            render={url => (
              <img src={url} style={{ width: "90px", maxHeight: "90px" }} />
            )}
          />
          <Column dataIndex="name" title="商品名" align="center" />
          <Column dataIndex="store_name" title="所属商家" align="center"/>
          <Column dataIndex="category_name" title="商品分类" align="center" />
          <Column dataIndex="price" title="现价" align="center" />

          <Column dataIndex="price"
                  title="库存"
                  align="center"
                  key="price"
                  sorter={(a, b) => a.price - b.price}

          />

          {/*salesSortedInfoN*/}
          <Column dataIndex="price"
                  title="销量"
                  align="center"
                  key="price"
                  sorter={(a, b) => a.price - b.price}

          />

          <Column
            dataIndex="is_open"
            title="状态"
            align="center"
            style={{ width: "60px" }}
            render={(status, record)=> (
                <div style={{color :GOODSSTATUECOLOR_TYPE[status]}}>{GOODSSTATUE_TYPE[status]}</div>
            )}
          />

          <Column dataIndex="price" title="创建时间" align="center" />

          <Column dataIndex="price" title="操作人" align="center" />

          <Column dataIndex="price" title="操作时间" align="center" />



          <Column
            dataIndex="operation"

            title="操作"
            align="center"
            render={(text, record) => (
                <div>

                  <Button
                      hidden={record.status ===2 ?"true":""}
                      size="small"
                      type="primary"
                      style={{width:"50px" }}
                      onClick={() => {
                        this.shelvesOrDelete([record.id],record.status === 1 ? 0 : 1);
                      }}
                  >
                    {OPERATE[record.status]}
                  </Button>


                  <Button
                      size="small"
                      type="primary"
                      style={{marginTop:"5px", width:"50px" }}
                      onClick={() => {
                        history.push(`/goods/list/detail?id=${record.id}`);
                      }}
                  >
                    查看
                  </Button>
                </div>
            )}
          />

        </Table>

        <div style={{ marginTop: "18px" ,display:"flex" , justifyContent: "space-between",alignItems:"center"}}>

          <div>

            <span style={{marginLeft: "10px"}}>批量操作：</span>
            <Select
                defaultValue="1"
                style={{ width: 100 }}
                onChange={type => {
                  this.setState({batchType:type});
                }}
            >
              {Object.keys(BATCH_TYPE).map(status => (
                  <Option value={status} key={status}>
                    {BATCH_TYPE[status]}
                  </Option>
              ))}

            </Select>
            <Button type="primary" onClick={this.start} disabled={!hasSelected} loading={loading} style={{marginLeft: "10px"}}>
              确定
            </Button>
            </div>



          {/* 分页 */}
          {goodsList.length > 0 && (
              <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                  }}
              >
                <span style={{ marginRight: "20px"  }}>共{total} 条</span>
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
          )}


        </div>


      </div>
    );
  }
}

export default GoodsList;
