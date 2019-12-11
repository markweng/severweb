import React from 'react';
import PropTypes from 'prop-types';
import OrderDetailCard from '../card/index.jsx';
import moment from 'moment';
import './index.less';

const payType = { 1: '货到付款', 2: '支付宝', 3: '微信' };
const delivery = { 1: '自提', 2: '快递', 3: '同城快送' };
const origin = { 1: 'PC端商城',0: '数据错误' };

class OrderInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  };
  render () {
    const { detail } = this.props;
    return <OrderDetailCard title="订单信息" contentClass="order-detail-info" style={{ borderBottom: '1px solid #E8E8E8', paddingBottom: '32px' }}>
      <div>
        <div><span className="label">购货人：</span>{detail && detail.user_name}<span></span></div>
      </div>
      <div>
        <div><span className="label">收货人：</span><span>{detail && detail.accept_name}</span></div>
        <div>
          <span className="label">自动确认收货时间：</span>
          <span>
            {detail && detail.send_time ? moment.unix(detail.send_time).add('days', 7).format('YYYY-MM-DD HH:mm:ss') : '无'}
          </span></div>
      </div>
      <div>
        <div><span className="label">收货地址：</span><span>{detail && `${detail.province}${detail.city}${detail.county}${detail.address}`}</span></div>
        <div><span className="label">订单号：</span><span>{detail && detail.number}</span></div>
      </div>
      <div>
        <div><span className="label">配送方式：</span><span>{detail && delivery[detail.delivery]}</span></div>
        <div><span className="label">下单时间：</span><span>{detail && detail.create_time ? moment.unix(detail.create_time).format('YYYY-MM-DD HH:mm:ss') : ''}</span></div>
      </div>
      <div>
        <div><span className="label">支付方式：</span><span>{detail && payType[detail.pay_type]}</span></div>
        <div><span className="label">发货时间：</span><span>{detail && detail.send_time ? moment.unix(detail.send_time).format('YYYY-MM-DD HH:mm:ss') : '未发货'}</span></div>
      </div>
      <div>
        <div><span className="label">付款时间：</span><span>{detail && detail.pay_time ? moment.unix(detail.pay_time).format('YYYY-MM-DD HH:mm:ss') : '未付款'}</span></div>
        <div><span className="label">订单来源：</span><span>{detail && origin[detail.origin]}</span></div>
      </div>
      <div>
        <div><span className="label">买家留言：</span><span>{detail && (detail.postscript || '无')}</span></div>
        <div><span className="label">手机号：</span><span>{detail && detail.telephone}</span></div>
      </div>
      <div>
        <div><span className="label">卖家留言：</span><span>{detail && (detail.remark || '无')}</span></div>
        {detail && detail.express_number &&
          <div style={{ display: 'flex' }}>
            <span className="label">发货单号：</span>
            <div style={{ marginBottom:'5px' }}>
              {detail && detail.express_number && detail.express_number.map(i => <div key={i} style={{ lineHeight: '20px' }}>{i}</div>)}
            </div>
          </div>}
      </div>
    </OrderDetailCard>;
  };
}

OrderInfo.propTypes = {
  detail: PropTypes.object,
};
export default OrderInfo;