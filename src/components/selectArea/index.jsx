import React from "react";
import { Cascader } from "antd";
import http from "@/utils/http";
import "./index.less";

class SelectArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      areasList: []
    };
  }

  componentDidMount() {
    //获取全部省市区
    http({
      url: "/areas"
    }).then(res => {
      this.setState({ areasList: res.data.data });
    });
  }

  render() {
    const { areasList } = this.state;
    const options = areasList.map(province => ({
      value: province.name,
      label: province.name,
      code: province.id,
      children: province.down
        ? province.down.map(city => ({
            value: city.name,
            label: city.name,
            code: city.id,
            children: city.down
              ? city.down.map(area => ({
                  value: area.name,
                  label: area.name,
                  code: area.id
                }))
              : []
          }))
        : []
    }));
    return (
      <Cascader
        placeholder="请选择省/市/区"
        options={options}
        {...this.props}
      />
    );
  }
}

export default SelectArea;
