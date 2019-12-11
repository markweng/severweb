import React from "react";
import { connect } from "react-redux";
import { Table, Spin,Select ,Button} from "antd";
import BaseComponent from "@/components/baseComponent";
import moment from "moment";
import "./index.less";

const Option = Select.Option;
const Column = Table.Column;
const STATUS = { 0: "待审核", 1: "已通过", 2: "已拒绝" };
const IS_OPEN = { 0: "下架", 1: "上架" };

@connect(state => ({}))
class GoodsDetail extends BaseComponent {
  constructor(props) {
    super(props);
    this.titleName = this.props.titleName;

  }

  componentDidMount() {
    super.componentDidMount();

  }

  render() {
    const { loading, goodsDetail,onChangeStatus,onGoBack,onSave} = this.props;
    const {
      id,
      alias,
      name,
      category_name, //分类
      manufacturer, //生产厂家
      specification, //规格
      license, //批准文号
      is_otc, //是否处方药
      form, //剂型
      store_name, //商家名称
      expire_times, //商品有效期
      price, //会员价
      market_price, //建议零售价
      freight, //运费
      loadage, //件装量
      is_split, //是否支持拆零
      minimum, //最小起订量
      images, //图片
      status, //审核状态
      record //操作记录
    } = goodsDetail;
    return (
      <div className="--goods-detail">
        <div className="buttons">{this.props.children}</div>
        <Spin spinning={loading}>
          <div className="goods-info">
            <div>
              <span>商品名称：</span>
              {id}
            </div>
            <div>
              <span>商品原价：</span>
              {alias ? `${alias}-` : ""}
              {name}
            </div>
            <div>
              <span>商品ID：</span>
              {category_name}
            </div>
            <div>
              <span>商品现价：</span>
              {manufacturer}
            </div>
            <div>
              <span>商品来源：</span>
              {specification}
            </div>
            <div>
              <span>商品库存：</span>
              {license}
            </div>
            <div>
              <span>所属商家：</span>
              {is_otc ? "OTC" : "处方药"}
            </div>
            <div>
              <span>商品权重：</span>
              {form}
            </div>
            <div>
              <span>商品销量：</span>
              {store_name}
            </div>
            <div>
              <span>是否包邮：</span>
              {expire_times}
            </div>

            <div>
              <span>商品标签：</span>
              {price}
            </div>
            <div>
              <span>快递费用：</span>
              {market_price}(元)
            </div>
            <div>
              <span>商品分类：</span>
              {freight}
            </div>
            <div>
              <span></span>

            </div>
            <div>
              <span>商品保障：</span>
              {is_split === 0 ? "否" : "是"}
            </div>

            <div style={{ width: "100%", display: "flex" }}>
              <span> 商品图片：</span>
              <div>
                {images &&
                  images.map((url, index) => (
                    <img
                      key={index}
                      src={url}
                      style={{
                        width: "90px",
                        height: "90px",
                        marginRight: "16px"
                      }}
                    />
                  ))}
              </div>
            </div>

            <div style={{ width: "100%", display: "flex" }}>
              <span> 商品详情：</span>
              <div>

              </div>
            </div>



          </div>

          {/*<div className="operation-list">*/}
            {/*<span style={{ flexShrink: 0 }}>操作记录：</span>*/}
            {/*<Table*/}
              {/*bordered*/}
              {/*dataSource={record || []}*/}
              {/*pagination={false}*/}
              {/*rowKey="id"*/}
              {/*style={{ flex: 1 }}*/}
            {/*>*/}
              {/*<Column title="操作人" dataIndex="operator" align="center" />*/}
              {/*<Column*/}
                {/*title="操作时间"*/}
                {/*dataIndex="create_time"*/}
                {/*align="center"*/}
                {/*render={data =>*/}
                  {/*moment.unix(data).format("YYYY-MM-DD HH:mm:ss")*/}
                {/*}*/}
              {/*/>*/}
              {/*<Column*/}
                {/*title="操作状态"*/}
                {/*dataIndex="target_state"*/}
                {/*align="center"*/}
              {/*/>*/}
              {/*<Column title="原因" dataIndex="remark" align="center" />*/}
            {/*</Table>*/}
          {/*</div>*/}


          <div className="goods-info">
            <div>
              <span>商品描述：</span>
              {STATUS[status]}
            </div>

            <div>
              <span></span>

            </div>

            <div>
              <span>变更状态：</span>
              <Select
                  defaultValue="0"
                  style={{ width: 80 }}
                  onChange={status => {
                    onChangeStatus(status)
                  }}
              >
                {Object.keys(IS_OPEN).map(status => (
                    <Option value={status} key={status}>
                      {IS_OPEN[status]}
                    </Option>
                ))}

              </Select>

            </div>

            <div>
              <span></span>

            </div>

            <div >
              <span>商品状态：</span>
              {goodsDetail.is_delete === 1
                  ? "已删除"
                  : goodsDetail.is_open
                  ? "上架"
                  : "下架"}
            </div>
            <div>
              <span></span>

            </div>

            <div>
              <span>创建人：</span>
              {STATUS[status]}
            </div>

            <div>
              <span>创建时间：</span>
              {STATUS[status]}
            </div>

            <div>
              <span>操作人：</span>
              {STATUS[status]}
            </div>

            <div>
              <span>最近操作时间：</span>
              {STATUS[status]}
            </div>
          </div>

        </Spin>

        <div style={{marginTop:"20px", width:"100%",display:"flex",alignItems:"center", justifyContent:"center"}}>
          <Button
              onClick={() => {
                onGoBack();
              }}
          >
            取消
          </Button>

          <Button
              type="primary"
              style={{marginLeft:'20px',}}
              onClick={() => {
                onSave();
              }}
          >
            保存
          </Button>

          </div>

      </div>
    );
  }
}

export default GoodsDetail;
