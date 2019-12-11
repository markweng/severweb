import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Input, message } from 'antd';
import { connect } from 'react-redux';
// import { cancelOrder } from '@/store/actions/orderList';
import './index.less';

const { TextArea } = Input;

class CancelOrderModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      remark: '',
      reason: ''
    };
  };

  doCancel () {
    const { remark, reason } = this.state;
    const { closeModal, dispatch, detail, ids } = this.props;
    if (!(remark && reason)) {
      message.error('请输入操作备注与取消原因');
      return;
    };
    let data;
    if (detail) {
      data = { id: detail.id, remark, reason };
      // dispatch(cancelOrder(data, closeModal));
    } else if (ids) {
      data = { id: ids, remark, reason };
    };
  }

  cancel () {
    const { closeModal } = this.props;
    closeModal();
  }

  render () {
    const { detail, cancelOrder } = this.props;
    const { remark, reason } = this.state;
    return <Modal
      title="取消订单"
      visible
      onOk={this.doCancel.bind(this)}
      onCancel={this.cancel.bind(this)}
      confirmLoading={cancelOrder}
      className="cancel-order-modal"
    >
      <div className="row">
        <span className="label">操作备注：</span>
        <TextArea
          value={remark}
          onChange={(e) => { this.setState({ remark: e.target.value }); }}
          placeholder="请输入操作备注"
          style={{ height: '88px' }} />
      </div>
      <div className="row">
        <span className="label">取消原因：</span>
        <TextArea
          value={reason}
          onChange={(e) => { this.setState({ reason: e.target.value }); }}
          placeholder="请输入取消原因"
          style={{ height: '88px' }} />
      </div>
    </Modal>;
  };
}

CancelOrderModal.propTypes = {
  closeModal: PropTypes.func,
  detail: PropTypes.object,
  ids: PropTypes.array
};

export default connect(state => ({
  cancelOrder: state.orderList.cancelOrder,
}))(CancelOrderModal);