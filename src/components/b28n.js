// 各国语言与存储值的映射关系
const LANG_ARRAY = {
  cn: "简体中文",
  zh: "繁體中文",
  de: "Deutsch", // 德语
  en: "English", // 英语
  es: "Español", // 欧西
  laes: "Esp. (Amér. Lat.)", // 美西
  nl: "Nederlands", // 荷兰语
  ko: "한국어", // 韩语
  fr: "Français", // 法国
  hu: "Magyar", // 匈牙利
  it: "Italiano", // 意大利
  pl: "Polski", // 波兰
  ro: "Română", // 罗马尼亚
  ar: "العربية", // 阿拉伯
  tr: "Türkçe", // 土耳其
  ru: "Русский", // 俄语
  brpt: "Port. (Amér.Lat.)", // 巴葡
  pt: "Português", // 欧葡
  cs: "Čeština", // 捷克语
  uk: "Українська", // 乌克兰语
  id: "Bahasa Indonesia", // 印尼
  vi: "Tiếng việt" // 越南
};

const utils = {
  /**
   * 移除前后空格
   */
  trim: function (text) {
    if (text === null) {
      return "";
    }

    text += "";
    return text.replace(/^\s+|\s+$/g, "");
  },
  /**
   * 是否是html节点
   * @param {*} elem 验证的节点
   * @returns Boolean
   */
  assertElement: function (elem) {
    //支持HTMLElement
    if (typeof HTMLElement === "object" && elem instanceof HTMLElement) {
      return true;
    }
    //ie等
    if (
      typeof elem === "object" &&
      (elem.nodeType === 1 || elem.nodeType === 9) &&
      typeof elem.nodeName === "string"
    ) {
      return true;
    }
    return false;
  },

  /**
   * 创建ajax XHR实例
   * @returns XHR实例
   */
  createXHR: function () {
    try {
      return new window.XMLHttpRequest();
    } catch (e1) {
      try {
        return new window.ActiveXObject("Msxml2.XMLHTTP");
      } catch (e2) {
        try {
          return new window.ActiveXObject("Microsoft.XMLHTTP");
        } catch (e3) {
          return;
        }
      }
    }
  },

  /**
   * 加载JSON翻译文件
   */
  loadJSON: function (url, callBack) {
    let timestamp = new Date().getTime().toString();
    var request = utils.createXHR();
    request.open("GET", `./${url}?${timestamp}`, false);
    request.send(null);

    if (
      (request.status >= 200 && request.status < 300) ||
      request.status === 304
    ) {
      if (typeof callBack === "function") {
        callBack(utils.parseJSON(request.responseText));
        callBack = null;
      }
    }
  },
  /**
   * 解析JSON文件
   */
  parseJSON: function (data) {
    if (window.JSON && window.JSON.parse) {
      return window.JSON.parse(data);
    }
    if (data === null) {
      return data;
    }

    if (typeof data === "string") {
      data = utils.trim(data);

      if (data) {
        if (
          /^[\],:{}\s]*$/.test(
            data
              .replace(/\\(?:["\\/bfnrt]|u[\da-fA-F]{4})/g, "@")
              .replace(
                /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g,
                "]"
              )
              .replace(/(?:^|:|,)(?:\s*\[)+/g, "")
          )
        ) {
          return new Function("return " + data)();
        }
      }
    }
  },
  /**
   * dom ready后执行回调
   */
  domReady: (function () {
    var funcs = [],
      already = false,
      len,
      i;

    function handler(e) {
      e = e || window.event;
      if (already) {
        return;
      }

      if (e.type === "readystatechange" && document.readyState !== "complete") {
        return;
      }

      for (i = 0, len = funcs.length; i < len; i++) {
        funcs[i].call(document);
      }

      already = true;
      funcs = null;
    }

    if (document.addEventListener) {
      document.addEventListener("DOMContentLoaded", handler, false);
      document.addEventListener("onreadystatechange", handler, false);
      window.addEventListener("load", handler, false);
    } else if (document.attachEvent) {
      document.attachEvent("onreadystatechange", handler);
      window.attachEvent("onload", handler);
    }

    // return ready() function
    return function ready(f) {
      if (already) {
        f.call(document);
      } else {
        funcs.push(f);
      }
    };
  })()
};
// 中文语境下一些特殊的缩写格式
const SPECIAL_LANG = {
  zh: "cn",
  "zh-chs": "cn",
  "zh-cn": "cn",
  "zh-cht": "cn",
  "zh-hk": "zh",
  "zh-mo": "zh",
  "zh-tw": "zh",
  "zh-sg": "zh"
};

// 默认配置
const DEFAULT_OPTIONS = {
  // 翻译函数名称
  name: "_",
  // json文件是否被压缩
  compress: false,
  // 支持的语言
  supportLang: ["en"],
  // 默认语言
  defaultLang: "en",
  // 源码中作为key的语言
  keyLang: "en",
  // 词条json文件名称
  fileName: "translate",
  // 语言包文件存放路径
  langPath: "lang",
  // 通过innerHTML方式替换DOM节点内容
  insertHTML: true
};

/**
 * 获取浏览器支持语种
 * @param {strig} defaultLang 默认语种
 * @returns 当前浏览器支持语种
 */
function getNavigatorLang(defaultLang) {
  return (
    window.navigator.language ||
    window.navigator.userLanguage ||
    window.navigator.browserLanguage ||
    window.navigator.systemLanguage ||
    defaultLang
  ).toLowerCase();
}

class Butterlation {
  constructor(options) {
    this.options = Object.assign({}, DEFAULT_OPTIONS, options);
  }

  // 初始化
  init() {
    if (typeof this.options.supportLang === "string") {
      this.options.supportLang = this.options.supportLang.split(",");
    }
    //若所支持的语言中没有默认语言，则将默认语言添加到支持语言数组中
    if (this.options.supportLang.indexOf(this.options.defaultLang) == -1) {
      this.options.supportLang.push(this.options.defaultLang);
    }
    this.options.langPath = this.options.langPath.replace(/^\/|\/$/g, "");

    this.langData = {};
    this.langDataKey = undefined;
    return new Promise(resolve => {
      if (this.options.compress) {
        utils.loadJSON(`./${this.options.langPath}/format.json`, data => {
          this.langDataKey = data;
          resolve();
        });
      } else {
        resolve();
      }
    });
  }

  // 支持某种语言
  isSupport(lang) {
    return this.options.supportLang.includes(lang);
  }

  // 设置当前语种
  setLang(lang) {
    //修改html的class
    let reg = new RegExp(`lang-${this.lang}`, "g"),
      htmlElem = document.documentElement,
      htmlClass = htmlElem.className;

    if (!this.isSupport(lang)) {
      lang = this.options.defaultLang;
    }

    htmlClass = htmlClass.replace(reg, "");
    htmlClass ? (htmlClass += " ") : "";
    htmlElem.className = `${htmlClass}lang-${lang}`;
    document.cookie = `bLanguage=${lang};`;
    this.lang = lang;

    return lang;
  }

  // 获取当前语种
  getLang() {
    let defaultLang = this.options.defaultLang,
      lang;

    if (document.cookie.indexOf("bLanguage=") === -1) {
      let local = getNavigatorLang(defaultLang);

      lang =
        SPECIAL_LANG[local] ||
        SPECIAL_LANG[local.split("-")[0].toString()] ||
        local.split("-")[0].toString();
    } else {
      let start, end;
      if (document.cookie.indexOf("bLanguage=") === 0) {
        start = 10;
      } else if (document.cookie.indexOf("; bLanguage=") !== -1) {
        start = document.cookie.indexOf("; bLanguage=") + 12;
      }

      if (start !== undefined) {
        end =
          document.cookie.indexOf(";", start) !== -1
            ? document.cookie.indexOf(";", start)
            : document.cookie.length;
        lang = document.cookie.substring(start, end);
      }
    }

    return this.isSupport(lang) ? lang : defaultLang;
  }
  // 获取当前语种对应的文本描述
  getLangText(lang) {
    lang = lang || this.getLang();
    return LANG_ARRAY[lang] || lang;
  }

  // 拼接语言json文件的url
  _getURL(fileName) {
    return `./${this.options.langPath}/${this.lang}/${fileName}.json`;
  }

  // 切换语言
  setPageLang(lang, callBack) {
    let htmlElem = document.documentElement;

    this.setLang(lang || this.getLang());

    if (typeof callBack === "function") {
      this._success = callBack;
    }

    htmlElem.style.visibility = "hidden";
    htmlElem.className = `${htmlElem.className} lang-${this.lang}`;

    this._loadLangFile(this._getURL(this.options.fileName));
  }

  //加载url对应的语言文件
  _loadLangFile(url) {
    if (this.lang === this.options.defaultLang) {
      utils.domReady(this._translatePage.bind(this));
    } else {
      utils.loadJSON(url, this._loadedDict.bind(this));
    }
  }

  //语言文件加载完成后的回调,界面加载完成后进入翻译工作
  _loadedDict(data) {
    Object.assign(this.langData, data);
    utils.domReady(this._translatePage.bind(this));
  }

  // 翻译纯文本
  getText(key) {
    if (!key) {
      return "";
    }

    if (this.langDataKey && this.lang !== this.options.keyLang) {
      key =
        this.langDataKey[key] || this.langDataKey[this._decoding(key)] || key;
    }

    let text = this.langData[key];
    if (text === undefined) {
      key = this._decoding(key);
      text = this.langData[text];
    }
    return text !== undefined ? text : this._decoding(key);
  }

  // 对key词条进行解码
  _decoding(key) {
    return key.replace(/^[a-zA-Z]#[a-zA-Z]{3}#/g, "");
  }

  // 翻译有%s参数的文本
  getFormatText(key, replacements) {
    let value = this.getText(key),
      index,
      count = 0;
    if (!replacements) {
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

  // 翻译DOM节点及其子元素
  _translate(translateTarget) {
    let translateElem;

    if (utils.assertElement(translateTarget)) {
      translateElem = translateTarget;
    } else if (translateTarget && typeof translateTarget === "string") {
      translateElem = document.getElementById(translateTarget);
    }
    translateElem = translateElem || document.documentElement;

    // 翻译前隐藏DOM节点
    document.documentElement.style.visibility = "hidden";

    this._replaceTextNodeValue(translateElem);

    // 翻译完成后重新显示DOM节点
    document.documentElement.style.visibility = "visible";

    if (typeof this._success === "function") {
      this._success();
    }
  }

  transTitle() {
    document.title = this.getText(utils.trim(document.title));
  }

  // 翻译页面
  _translatePage() {
    var bodyElem = document.body || document.documentElement;

    // 翻译HTML页面内容
    this.transTitle();

    this._translate(bodyElem);
  }

  //翻译html元素节点
  _replaceTextNodeValue(element) {
    if (!element) {
      return;
    }
    var firstChild = element.firstChild,
      nextSibling = element.nextSibling,
      nodeType = element.nodeType,
      curValue;

    //handle element node
    if (nodeType === 1) {
      if (element.getAttribute("data-translated")) {
        //translate siblings
        this._replaceTextNodeValue(nextSibling);
        return;
      }

      // Hander elements common attribute need to replace
      this._handleAttr("alt", element);
      this._handleAttr("placeholder", element);
      this._handleAttr("title", element);
      this._handleAttr("data-title", element);
      this._handleText(element);

      //handle textNode
    } else if (nodeType === 3 && /\S/.test(element.nodeValue)) {
      curValue = utils.trim(element.nodeValue);
      element.nodeValue = this.getText(curValue);
    }

    //translate siblings
    this._replaceTextNodeValue(nextSibling);

    if (element.getAttribute) {
      if (element.getAttribute("data-nowrap") == 1) {
        curValue = element.innerHTML.replace(/(\s+)|(\t\n)|(\t)|(\n)/g, " ");
        let html = this.getText(curValue);
        html && (element.innerHTML = html);
      }

      if (!element.getAttribute("data-lang")) {
        this._replaceTextNodeValue(firstChild);
      }
    }
  }

  _handleAttr(attr, element) {
    let curValue = element.getAttribute("alt");
    if (curValue && /\S/.test(curValue)) {
      curValue = utils.trim(curValue);
      element.setAttribute("alt", this.getText(curValue));
    }
  }

  _handleText(element) {
    let btnStr = "submit,reset,button";
    let isInputButton =
      element.nodeName.toLowerCase() == "input" &&
      btnStr.indexOf(element.getAttribute("type")) !== -1;

    let curValue = element.getAttribute("data-lang");

    //data-lang属性具有较高优先级
    if (isInputButton && !curValue) {
      curValue = element.value;
    }

    if (curValue && /\S/.test(curValue)) {
      curValue = utils.trim(curValue);
      if (curValue) {
        if (isInputButton) {
          element.setAttribute("value", this.getText(curValue));
        } else {
          this._innerText(element, this.gettext(curValue));
        }
      }
    }
  }

  _innerText(elem, str) {
    if (!str) {
      return;
    }
    if (this.options.insertHTML) {
      elem.innerHTML = str;
    }

    let element = document.createElement("p");
    element.innerHTML = "b28n";
    if (element.textContent) {
      elem.textContent = str;
    } else {
      elem.innerText = str;
    }
    return elem;
  }

  // 获取单个配置的值
  getOption(key) {
    return this.options[key];
  }

  // 获取支持语言项对应的OPTION
  getOptions() {
    let langOptions = [];
    this.options.supportLang.reduce((val, item) => {
      val.push({
        label: LANG_ARRAY[item] || item,
        text: LANG_ARRAY[item] || item,
        value: item
      });
      return val;
    }, langOptions);
    return langOptions;
  }
}

// Vue插件暴露API
Butterlation.install = function (Vue, options) {
  let butterlate = new Butterlation(options);
  let functionName = butterlate.getOption("name");

  // json压缩的情况下，先拿到key文件再进行页面翻译
  butterlate.init().then(() => {
    butterlate.setPageLang();
  });
  // 全局挂载
  Vue.prototype.B = window.B = butterlate;
  Vue.prototype[functionName] = window[functionName] = function (
    key,
    replacements
  ) {
    return butterlate.getFormatText(key, replacements);
  };
};
// script标签直接引用时挂载
window.Butterlation = Butterlation;

export default Butterlation;
