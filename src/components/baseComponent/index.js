import React from "react";
import * as titleName from "@/store/actions/titleName";
import * as commons from "@/store/actions/common";
import { connect } from "react-redux";

class BaseComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (this.titleName) {
      this.props.dispatch(titleName.name(this.titleName));
    }
    this.onPageRefresh();
  }

  onPageRefresh() {}

  componentDidUpdate(prevProps, prevState, snapshot) {
    let { needRefresh } = this.props;
    if (needRefresh) {
      this.onPageRefresh();
      this.props.dispatch(commons.pageRequestRefreshOff());
    }
  }
}

export default BaseComponent;
