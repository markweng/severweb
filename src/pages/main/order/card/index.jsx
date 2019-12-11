import React from 'react';
import PropTypes from 'prop-types';
import './index.less';

class OrderDetailCard extends React.Component {
  constructor(props) {
    super(props);
  };
  
  render () {
    const { title, style, contentClass } = this.props;
    return <div className="order-detail-card" style={style}>
      <div className="title">{title}</div>
      <div className={`content ${contentClass}`}>
        {this.props.children}
      </div>
    </div>;
  };
}

OrderDetailCard.propTypes = {
  title: PropTypes.string,
  style: PropTypes.object,
  contentClass: PropTypes.string
};

export default OrderDetailCard;