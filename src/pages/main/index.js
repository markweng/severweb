import React from "react";
import Header from "../../components/header";
import SideMenu from "../../components/sideMenu";
import MainRouter from "../../routes/mainRouter";
import "./index.less";

class MainPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="--main">
        <SideMenu />
        <div className="main-right">
          <Header />
          <div className="routes">
            <MainRouter />
          </div>
        </div>
      </div>
    );
  }
}

export default MainPage;
