//查看大图
export function renderBigImg(bigImgUrl) {
  let div = document.createElement("div");
  let img = document.createElement("img");
  div.addEventListener("click", () => {
    removeBigImg();
  });
  div.setAttribute("id", "big-image-container");
  div.setAttribute(
    "style",
    `
      position: fixed;
      width: 100%;
      height: 100%;     
      background: rgba(0, 0, 0, 0.65);
      top: 0;
      left: 0;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    `
  );
  img.setAttribute("src", bigImgUrl);
  img.setAttribute(
    "style",
    `
      max-height: 80%;
      max-width: 80%;
    `
  );
  div.appendChild(img);
  document.body.appendChild(div);
}

//移除大图
function removeBigImg() {
  let div = document.getElementById("big-image-container");
  if (div) {
    div.remove();
  }
}

/**
 * 获取 url 的参数值
 * @param {String} key
 * @param {String?} targetStr 需要被查找的字符串范围
 */
export function url_request(key, targetStr = "") {
  let args = {};
  let query;
  let index;
  if (targetStr) {
    index = targetStr.indexOf("?");
    query = targetStr.substring(index + 1);
  } else {
    // eslint-disable-next-line no-restricted-globals
    index = location.href.indexOf("?");
    // eslint-disable-next-line no-restricted-globals
    query = location.href.substring(index + 1);
  }

  let pairs = query.split("&"); // Break at ampersand
  for (let i = 0; i < pairs.length; i++) {
    let pos = pairs[i].indexOf("=");
    if (pos == -1) continue;
    let argname = pairs[i].substring(0, pos);
    let value = pairs[i].substring(pos + 1);
    value = decodeURIComponent(value);
    args[argname] = value;
  }
  return args[key];
}
