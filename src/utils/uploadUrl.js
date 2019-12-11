let uploadUrl = "";

if (process.env.NODE_ENV === "production") {
  if (window.location.href.indexOf("operationapi.e6kang.net") > -1) {
    uploadUrl = "http://commonapi.e6kang.net"; //开发环境
  } else if (window.location.href.indexOf("operation.yao6tong.cn") > -1) {
    uploadUrl = "https://commonapi.e6kang.cn"; //测试环境
  } else if (window.location.href.indexOf("operation.yao6tong.top") > -1) {
    uploadUrl = "http://commonapi.e6kang.top"; //产品环境
  } else if (window.location.href.indexOf("operation.yao6tong.com") > -1) {
    uploadUrl = "https://commonapi.e6kang.com"; //生产环境
  }
} else if (process.env.NODE_ENV === "development") {
  uploadUrl = "http://commonapi.e6kang.net"; //开发环境
}

export default uploadUrl;
