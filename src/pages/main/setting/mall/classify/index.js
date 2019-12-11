import React from "react";
import { Tree, Icon, Button, Modal, Tag } from "antd";
import http from "@/utils/http";
import EditClassifyModal from "./editClassifyModal";
import { connect } from "react-redux";
import * as titleName from "@/store/actions/titleName";
import BaseComponent from "@/components/baseComponent";
import "./index.less";

const TreeNode = Tree.TreeNode;
const confirm = Modal.confirm;

const QUALIFICATIONS = {
  "1": "基础资质",
  "2": "OTC药品经营资质",
  "3": "医疗器械经营资质",
  "4": "养生保健类经营资质"
};

@connect()
class GoodsClassify extends BaseComponent {
  titleName = ["商城管理", "商品分类"];
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      classifyList: [],
      showEditModal: false,
      hasLogo: true,
      id: 0,
      editClassify: null
    };
  }

  onPageRefresh() {
    this.getClassifyList();
  }

  //获取分类列表
  getClassifyList() {
    this.setState({ loading: true });
    http({
      url: "/category.detail"
    })
      .then(res => {
        this.setState({ loading: false, classifyList: res.data.data });
      })
      .catch(err => {
        this.setState({ loading: false });
      });
  }

  onCheck = (checkedKeys, info) => {
    console.log("onCheck", checkedKeys, info);
  };

  /**
   * 新增编辑分类
   * hasLogo   是否需要logo图
   * id  当前分类id
   * classify  分类数据，编辑时需回填
   */
  editClassify = (hasLogo, id, classify) => {
    this.setState({
      showEditModal: true,
      hasLogo,
      id,
      editClassify: classify
    });
  };

  //删除分类
  delClassify = id => {
    confirm({
      title: "删除分类",
      content: "确定删除该分类吗？",
      okType: "danger",
      onOk: () => {
        return http({
          url: "/category.delete",
          data: { id },
          method: "post"
        }).then(res => {
          this.getClassifyList();
        });
      }
    });
  };

  render() {
    const { showEditModal, hasLogo, classifyList, editClassify } = this.state;

    //分类操作图标
    const OperationIcon = ({ add, hasLogo, classify, cert }) => {
      return (
        <div className="tree-item">
          {add && (
            <Icon
              title="新增下级分类"
              type="plus"
              onClick={() => {
                this.editClassify(hasLogo, classify.id);
              }}
            />
          )}
          <Icon
            title="删除"
            type="delete"
            onClick={this.delClassify.bind(this, classify.id)}
            className="icon"
          />
          <Icon
            type="edit"
            title="编辑"
            onClick={() => {
              this.editClassify(hasLogo, classify.id, classify);
            }}
          />
        </div>
      );
    };
    return (
      <div className="--goods-classify">
        <Button
          type="primary"
          style={{ marginBottom: "20px" }}
          onClick={() => {
            this.editClassify(true, 0, { parent_id: 0 });
          }}
        >
          新增一级分类
        </Button>
        <Tree onCheck={this.onCheck}>
          {/* 一级分类 */}
          {classifyList.map(i => (
            <TreeNode
              title={
                <div className="tree-node-title">
                  <div style={{ width: "200px" }}>
                    <img
                      src={i.image}
                      style={{
                        width: "20px",
                        height: "20px",
                        marginRight: "10px"
                      }}
                    />
                    {i.name}
                  </div>
                  <div className="tree-item">
                    关联资质: &nbsp;&nbsp;&nbsp;&nbsp;
                    <div
                      style={{
                        width: "280px",
                        display: "inline-block",
                        verticalAlign: "middle"
                      }}
                    >
                      {i.qualifications.length > 0
                        ? i.qualifications.map(item => (
                            <Tag
                              key={item}
                              style={{
                                width: "60px",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap"
                              }}
                            >
                              {QUALIFICATIONS[item]}
                            </Tag>
                          ))
                        : "无"}
                    </div>
                  </div>
                  <div className="tree-item">
                    绑定子分类:&nbsp;&nbsp; {i.children.length}&nbsp;&nbsp;
                  </div>
                  <div className="tree-item">
                    是否启用：{i.is_hide === 0 ? "是" : "否"}
                  </div>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <OperationIcon add hasLogo classify={i} />
                </div>
              }
              key={i.id}
            >
              {/* 二级分类 */}
              {i.children &&
                i.children.length > 0 &&
                i.children.map(j => (
                  <TreeNode
                    title={
                      <div className="tree-node-title">
                        <div style={{ width: "220px" }}>
                          <img
                            src={j.image}
                            style={{
                              width: "20px",
                              height: "20px",
                              marginRight: "10px"
                            }}
                          />
                          {j.name}
                        </div>
                        <OperationIcon add hasLogo classify={j} />
                      </div>
                    }
                    key={j.id}
                  >
                    {/* 三级分类 */}
                    {j.children &&
                      j.children.length > 0 &&
                      j.children.map(k => (
                        <TreeNode
                          title={
                            <div className="tree-node-title">
                              {k.name}
                              <OperationIcon classify={k} />
                            </div>
                          }
                          key={k.id}
                        />
                      ))}
                  </TreeNode>
                ))}
            </TreeNode>
          ))}
        </Tree>

        {showEditModal && (
          <EditClassifyModal
            hasLogo={hasLogo}
            id={this.state.id}
            editClassify={editClassify}
            onClose={reload => {
              if (reload) {
                this.getClassifyList();
              }
              this.setState({ showEditModal: false });
            }}
          />
        )}
      </div>
    );
  }
}

export default GoodsClassify;
