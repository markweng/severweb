/**
 * @description 分页器--ui
 * @author weichaozhan
 * @param {Number} defaultPage 默认在第几页
 * @param {Boolean} hideOnSinglePage 只有一页时是否隐藏分页器
 * @param {Number} pageSize 每页条数
 * @param {Number} total 数据总数
 * @param {Function} onChange 页码改变的回调，参数是改变后的页码
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon, Input, message, } from 'antd';

import './index.less';

class PaginationView extends React.Component {
  static defaultProps = {
    defaultPage: 1,
    currentPage: 1,
    hideOnSinglePage: false,
    pageSize: 10,
    onChange: () => { },
  };

  static propTypes = {
    currentPage: PropTypes.number, // 当前第几页
    defaultPage: PropTypes.number, // 默认页数
    hideOnSinglePage: PropTypes.bool, // 只有一页时是否隐藏分页器
    pageSize: PropTypes.number, // 每页条数
    total: PropTypes.number, // 数据总数
    onChange: PropTypes.func, // 页码改变的回调，参数是改变后的页码
  };

  constructor(props) {
    super(props);
    this.state = {
      page: this.props.defaultPage,
      numberJump: '',
    };

    this.changePage = this.changePage.bind(this);
    this.changeJumpInput = this.changeJumpInput.bind(this);
    this.clickJumpBtn = this.clickJumpBtn.bind(this);
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      [nextProps.currentPage !== this.props.currentPage && 'page']: nextProps.currentPage,
    });
  }

  /**
   * @description 上下翻页按钮点击
   */
  changePage (type) {
    const lastPage = Math.ceil(this.props.total / this.props.pageSize);
    const numberUpdate = type === 'pre' ? -1 : 1;
    const page = this.state.page + numberUpdate;

    if (page >= 1 && page <= lastPage) {
      this.setState({
        page,
      }, () => {
        this.props.onChange(this.state.page);
      });
    } else {
      message.error(`已经是${page < 1 ? '第一页' : '最后一页'}啦！`);
    }
  }

  /**
   * @description 输入变化
   */
  changeJumpInput (e) {
    this.setState({
      numberJump: e.target.value,
    });
  }

  /**
   * @description 跳转按钮点击
   */
  clickJumpBtn () {
    const page = parseFloat(this.state.numberJump);
    const counts = Math.ceil(this.props.total / this.props.pageSize);
    if (!isNaN(page) && page >= 1 && page <= counts) {
      this.setState({
        page,
      }, () => {
        this.props.onChange(page);
      });
    } else {
      this.setState({
        numberJump: '',
      });
    }
  }

  render () {
    const {
      page, numberJump,
    } = this.state;
    const {
      total, pageSize,style
    } = this.props;
    const counts = Math.ceil(this.props.total / this.props.pageSize);
    const lastPage = Math.ceil(total / pageSize);
    return (
      (!(this.props.hideOnSinglePage && counts <= 1))
      &&
      (<div className="wrapper--pagination-kc" style={style}>
        <Button className="go-btn--pagination-kc" onClick={() => {
          this.changePage('pre');
        }} title="上一页" disabled={page === 1}>
          <Icon type="left" />
        </Button>
        <span style={{ margin: '0 10px' }}>第{page}/{counts}页</span>
        <Button className="go-btn--pagination-kc" onClick={() => {
          this.changePage('next');
        }} title="下一页" disabled={page === lastPage}>
          <Icon type="right" />
        </Button>
        <Input className="jump-input--pagination-kc" value={numberJump} onChange={this.changeJumpInput} />
        <Button className="jump-btn--pagination-kc" type="primary" onClick={this.clickJumpBtn}>跳转</Button>
      </div>)
    );
  }
}

export default PaginationView;