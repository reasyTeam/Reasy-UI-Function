import msgObj from "./translationObj";

let currentMsg = null;

function transCompText(msg, replacements) {
  let translated = _(msg);
  if (translated === msg) {
    return _trans(msg, replacements);
  }
  return _(msg, replacements);
}

function initMsg() {
  let lang = (window.B && window.B.getLang()) || "en";
  currentMsg = msgObj[lang] || {};
}

/**
 * 内部进行翻译
 * @param {String} key 标识符
 * @param {Array} replacements 替换参数
 * @returns
 */
function _trans(key, replacements) {
  if (!currentMsg) {
    initMsg();
  }
  let value = currentMsg[key],
    index,
    count = 0;
  if (!replacements || !value) {
    return value;
  }
  if (
    Object.prototype.toString.call(replacements) === "[object Array]" &&
    replacements.length !== 0
  ) {
    while ((index = value.indexOf("%s")) !== -1) {
      value =
        value.slice(0, index) + replacements[count] + value.slice(index + 2);
      count = count + 1 === replacements.length ? count : count + 1;
    }
  } else if (typeof replacements === "string") {
    index = value.indexOf("%s");
    value = value.slice(0, index) + replacements + value.slice(index + 2);
  }
  return value;
}

export { transCompText };
