/**
 * @method [判断是不是对象类型]
 * @param {*} target 需要判断的对象
 * @returns {Boolean} 是对象返回 true 不是返回false
 */
export function isObject(target) {
  return Object.prototype.toString.call(target) === "[Object Object]";
}

/**
 * @method [判断是不是引用类型]
 * @param {*} target 需要判断的对象
 * @returns {Boolean} 是对象返回 true 不是返回false
 */
export function isReference(target) {
  return target !== null && typeof target === "object";
}

/**
 * @method [判断是不是数组类型]
 * @param {*} target 需要判断的数组
 * @returns {Boolean} 是数组返回 true 不是返回false
 */
export function isArray(target) {
  return Array.isArray(target);
}

/**
 * @method [判断是不是函数类型]
 * @param {*} target 需要判断的函数
 * @returns {Boolean} 是函数返回 true 不是返回false
 */
export function isFunction(target) {
  return typeof target === "function";
}

/**
 * @method [合并对象]
 * @param args 需要合并的对象或数组
 * @returns {Object} 合并后的对象或数组 若是多个数组则数组的同个位置会被后面相同位置的元素覆盖
 */
export function extend(...args) {
  let target = args[0];
  if (args.length === 1) {
    return args[0];
  }
  //当第一个参数不是对象时
  if (!isReference(target)) {
    target = {};
  }

  for (let i = 1; i < args.length; i++) {
    let source = args[i];
    //不为对象时，查找下个节点
    if (!isReference(source)) {
      continue;
    }

    for (let prop in source) {
      let item = source[prop];
      if (isArray(item)) {
        if (!isArray(target[prop])) {
          target[prop] = [];
        }

        item.forEach((arr, index) => {
          if (isFunction(item)) {
            target[prop][index] = arr;
          } else if (item instanceof Object) {
            target[prop][index] = extend(target[prop][index], arr);
          } else {
            target[prop][index] = arr;
          }
        });
      } else if (isFunction(item)) {
        target[prop] = item;
      } else if (item instanceof Object) {
        target[prop] = extend(target[prop], item);
      } else {
        target[prop] = item;
      }
    }
  }
  return target;
}

/**
 * @method [复制且合并多个对象]
 * @param args 需要复制的一个或多个对象
 * @returns {Object/Array} 复制后的对象或数组 若是多个数组则数组的同个位置会被后面相同位置的元素覆盖
 */
export function copy(...args) {
  if (isArray(args[0])) {
    return extend([], ...args);
  }
  return extend({}, ...args);
}

/**
 * @method [获取唯一ID]
 * @param {Number} len [id 长度 默认64]
 * @param {Number} radix [偏移]
 * @returns {String} 返回唯一ID
 */
export function getGuid(len = 64, radix = "") {
  let chars =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
  let uuid = [];

  radix = radix || chars.length;

  uuid = Array.from({ length: len }, () => chars[0 | (Math.random() * radix)]);

  return uuid.join("");
}

/**
 * @method [判断目标是否为空，包括空数组，空对象，undefined，null]
 * @param {*} target 判断目标
 * @returns {Boolean} 为空返回true
 */
export function isEmpty(target) {
  if (isArray(target)) {
    return target.length === 0;
  }

  if (isObject(target)) {
    return Reflect.ownKeys(target) === 0;
  }
  return target === undefined || target === null;
}

/**
 * @method [判断目标类型]
 * @param {*} target [判断目标]
 * @param {String} type [指定类型，支持 number，array，object，null，undefined，string]
 * @return {Boolean} 是指定类型返回true，否则返回false
 */
export function isType(target, type) {
  if (type === "null") {
    return target === null;
  }

  if (type === "object") {
    return isObject(type);
  }

  if (type === "array") {
    return isArray(type);
  }

  return typeof target === type;
}

/**
 * 去除首尾空格 两个空格会替换成一个
 * @param {String} string 需要处理的字符串
 * @returns {String} 返回去除了首尾空格的字符串
 */
export function trim(string) {
  return (string || "").replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, "");
}

/**
 * @method [判断是否有class]
 * @param {string} cls 要判断的class
 */
export function hasClass(cls) {
  if (!this || !cls) return false;
  if (cls.indexOf(" ") !== -1)
    throw new Error("className should not contain space.");

  return this.classList.contains(cls);
}
/**
 * @method [添加class]
 * @param {string} cls 要添加的class
 */
export function addClass(cls = "") {
  if (!this) return;
  let classes = cls.split(" ");
  classes.forEach(className => {
    className && this.classList.add(className);
  });
}
/**
 * @method [移除class]
 * @param {string} cls 要移除的class
 */
export function removeClass(cls) {
  if (!this || !cls) return;
  let classes = cls.split(" ");

  classes.forEach(className => {
    className && this.classList.remove(className);
  });
}

/**
 * @method [防抖]
 * @param {Function} fn - [需要防抖的函数]
 * @param {Number} wait - [防抖时间]
 * @param {Boolean} immediately - [是否立即执行一次]
 * @returns {Function} 返回处理了防抖的函数
 */
export function debounce(fn, wait, immediately) {
  let timer = null;

  return (...args) => {
    if (immediately) {
      fn.apply(args);
      immediately = false;
    }

    if (timer !== null) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      timer = null;
      fn.apply(args);
    }, wait);
  };
}

/**
 * @method [节流]
 * @param {Function} fn - [需要节流的函数]
 * @param {Number} wait - [节流时间]
 * @param {Boolean} immediate - [是否立即执行一次]
 * @returns {Function} 返回处理了节流的函数
 */
export function throttle(fn, wait, immediate) {
  let timer = null,
    callNow = immediate;

  return function (...args) {
    if (callNow) {
      fn.apply(this, args);
      callNow = false;
    }

    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(this, args);
        timer = null;
      }, wait);
    }
  };
}

/**
 * @method [设置cookie中存值]
 * @param {String} cname -[cookie中的key]
 * @param {String} cvalue [cookie中的value]
 */
export function setCookie(cname, cvalue) {
  document.cookie = cname + "=" + cvalue + "; ";
}

/**
 * @method [获取cookie中存值]
 * @param {String} cname [key]
 * @returns {String} cookie中存储的值 或者 空
 */
export function getCookie(cname) {
  let name = cname + "=";
  let items = document.cookie.split(";");
  for (let i = 0; i < items.length; i++) {
    let item = items[i].trim();
    if (item.indexOf(name) === 0)
      return item.substring(name.length, item.length);
  }
  return "";
}
/**
 * @method [获取sessionStorage的值]
 * @param {String} name [key]
 * @returns {String} 获得sessionStorage的值
 */
export function getSessionStorage(name) {
  return window.sessionStorage.getItem(name);
}

/**
 * @method [设置sessionStorage的值]
 * @param {String} name [key]
 * @param {String} value [value]
 */
export function setSessionStorage(name, value) {
  window.sessionStorage.setItem(name, value);
}

/**
 * @method [删除sessionStorage的值]
 * @param {String} name [key]
 * @returns
 */
export function removeSessionStorage(name) {
  window.sessionStorage.removeItem(name);
}

/**
 * @method [时间单位转换]
 * @param {Number} value - [值，单位s]
 * @param {Boolean} hasSecond - [显示是否显示到秒]
 * @returns {String} 天小时分钟秒
 */
export function formatSeconds(value, hasSecond = false) {
  let theTime = parseInt(value),
    timeMin = 0, // 分
    timeHour = 0, // 小时
    timeDay = 0; // 天

  if (isNaN(theTime)) {
    return "-";
  }
  if (theTime < 60) {
    if (hasSecond) {
      return theTime + transCompText("s");
    }
    return timeMin + transCompText("minute(s)");
  }

  timeMin = Math.floor(theTime / 60) % 60;
  timeHour = Math.floor(theTime / 60 / 60) % 24;
  timeDay = Math.floor(theTime / 60 / 60 / 24);
  theTime = Math.floor(theTime % 60);

  let result = "";
  if (timeDay > 0) {
    result += timeDay + transCompText("day(s)") + " ";
  }
  if (timeHour > 0) {
    result += timeHour + transCompText("hour(s)") + " ";
  }

  if (timeMin > 0) {
    result += timeMin + transCompText("minute(s)") + " ";
  }

  if (hasSecond && theTime) {
    result += "" + theTime + transCompText("s");
  }

  return result;
}

/**
 * @method [将时间对象转成固定格式字符串返回]
 * @param {Date} date [Date 格式]
 * @param {String} fmt [转换格式]
 * @returns
 */
export function formatDate(date, fmt = "YYYY-MM-DD") {
  date = date === undefined ? new Date() : date;
  date = typeof date === "number" ? new Date(date) : date;

  let obj = {
    Y: date.getFullYear(), // 年份，注意必须用getFullYear
    M: date.getMonth() + 1, // 月份，注意是从0-11
    D: date.getDate(), // 日期
    h: date.getHours(), // 24小时制
    m: date.getMinutes(), // 分钟
    s: date.getSeconds() // 秒
  };

  for (let i in obj) {
    fmt = fmt.replace(new RegExp(i + "+", "g"), function (m) {
      let mlen = m.length;
      let val = obj[i] + "";
      let len = val.length;

      // 补零
      val = addZero(val, mlen);

      return mlen === 1 ? val : val.substring(len - mlen);
    });
  }
  return fmt;
}

/**
 * @method [解析字符串为年月日]
 * @param {String} str [需要解析的字符串]
 * @param {String} fmt [时间格式]
 * @returns {Object} 包含年月日时分秒数据的对象
 */
export function parseDateToObj(str, fmt) {
  fmt = fmt || "YYYY-MM-DD";
  let obj = { Y: 0, M: 1, D: 0, h: 0, m: 0, s: 0 };
  fmt.replace(
    /([^YMDhms]*?)(([YMDhms])\3*)([^YMDhms]*?)/g,
    function (m, $1, $2, $3, $4) {
      str = str.replace(
        new RegExp($1 + "(\\d{" + $2.length + "})" + $4),
        function (_m, _$1) {
          obj[$3] = parseInt(_$1);
          return "";
        }
      );
      return "";
    }
  );
  obj.M--; // 月份是从0开始的，所以要减去1
  return {
    year: obj.Y,
    month: obj.M,
    day: obj.D,
    hour: obj.h,
    minute: obj.m,
    second: obj.s
  };
}

/**
 * @method [解析字符串为对应的时间戳]
 * @param {String} str [需要解析的字符串]
 * @param {String} fmt [时间格式]
 * @returns {Number} 时间戳
 */
export function parseDateToNum(str, fmt = "YYYY-MM-DD") {
  let dateObj = parseDateToObj(str, fmt);
  return Date.parse(
    new Date(
      dateObj.year,
      dateObj.month,
      dateObj.day,
      dateObj.hour,
      dateObj.minute,
      dateObj.second
    )
  );
}

/**
 * @method [解析字符串为对应的时间] 单位s
 * @param {String} str [需要解析的字符串]
 * @param {String} fmt [时间格式]
 * @returns {Number} 时间
 */
export function parseTimeToNum(str, fmt = "HH:MM:SS") {
  let dateObj = parseDateToObj(str, fmt);
  return dateObj.hour * 3600 + dateObj.minute * 60 + dateObj.second;
}

/**
 * @method [把速度转换到合适的单位]
 * @param {Number} data 速度
 * @param {String} goalUnit 原单位可选B，b
 * @returns {String} 合适的单位
 */
export function formatSpeed(speed, goalUnit = "B") {
  //goal_unit: B, b;
  let unitArr = ["K", "M", "G", "T"];
  let i = 0;

  speed = parseFloat(speed);

  if (goalUnit === "b") {
    speed = speed * 8;
  }

  //传进来的单位KB，就小于了1，则直接返回B
  if (speed < 1) {
    speed = speed * 1024;
    if (parseInt(speed, 10) != speed) {
      speed = speed.toFixed(2);
    }
    return speed + goalUnit;
  }

  while (speed >= 1024) {
    speed = speed / 1024;
    i++;
  }

  if (goalUnit === "b") {
    speed = speed * 8;
  }
  //1KB, 1Kb
  if (parseInt(speed, 10) != speed) {
    speed = speed.toFixed(2);
  }
  return speed + unitArr[i] + goalUnit;
}

/**
 * todo 没看懂
 * @method [合并端口，并输出以-连接的端口]
 * @param {Array} list
 * @param {Object} [config={}] [joiner : 连接符 默认- spliter：分隔符默认,data :数据对象]
 * @return {String} 输出以-连接的端口
 */
export function getNumList(list, config = {}) {
  let joiner = config.joiner || "-", //连接符
    spliter = config.spliter || ",", //分隔符
    dataObj = config.data || {}; //数据对象
  //排序
  let arr = copy(list);
  arr = arr.sort((a, b) => Number(a) - Number(b));

  let str = "",
    endIndex;

  for (let i = 0; i < arr.length; i++) {
    let start = arr[i],
      end;
    endIndex = i;
    for (let j = i; j < arr.length; j++) {
      if (arr[i] - i === arr[j] - j) {
        endIndex = j;
        end = arr[j];
      }
    }

    let currentStart = dataObj[start] || start;
    let currentEnd = dataObj[end] || end;

    if (end - start >= 2) {
      str += currentStart + joiner + currentEnd + spliter;
      i = endIndex;
    } else {
      str += currentStart + spliter;
    }
  }

  str = str.slice(0, -spliter.length);
  return str;
}

/**
 * @method [返回当前地区对应的时区]
 * @returns {String} 时区格式为 +08:00
 */
export function getTimezone() {
  let year = new Date().getFullYear();
  let timeZone = new Date(year, 0, 1).getTimezoneOffset();
  // 符号位
  let sign = "+";

  //避免夏令时开启 后 时区获取不正确
  for (let index = 0; index < 11; index++) {
    timeZone = Math.max(timeZone, new Date(year, index, 1).getTimezoneOffset());
  }

  timeZone = -timeZone / 60;

  if (timeZone < 0) {
    sign = "-";
    timeZone = -timeZone;
  }

  // 取小时  加0
  let hour = addZero(timeZone | 0, 2);
  // 取分钟 加0
  let minus = addZero(timeZone % 1, 2);

  return sign + hour + ":" + minus;
}

/**
 * @method [密码强度校验]
 * @param {string} str 密码
 * 数字、大写、小写 各占 权值 1
 * 特殊字符 权值 2
 * 总权值 1为弱 2为中 3为强
 * 长度小于 8 弱
 * 特殊字符 + 数字 权值为 2
 * 只有特殊字符 权值 为 1
 * 特殊字符 + 字母 权值为 3
 * 数字 + 字母 权值为 2
 * @returns {Number} 权值
 */
export function getPwdLevel(str) {
  let hasNum = +/\d/.test(str),
    hasLowerCase = +/[a-z]/.test(str),
    hasUpperCase = +/[A-Z]/.test(str),
    hasOther = /[^\da-zA-Z]/.test(str) ? 2 : 0;

  let sum = hasNum + hasLowerCase + hasUpperCase + hasOther;

  if (str.length < 8) {
    return 1;
  }

  if (hasOther) {
    //只有特殊字符 权值减一
    //特殊字符 + 数字时 需要减一
    if (sum === 2 || !!hasNum) {
      sum--;
    }
  }

  if (sum >= 3) {
    return 3;
  }

  if (sum <= 1) {
    return 1;
  }

  return 2;
}

/**
 * @method [把mac地址转换为:连接]
 * @param {String} mac [需要转换的字符串]
 * @returns {String} 转换后的mac地址串
 */
export function transMac(mac) {
  mac = mac.toUpperCase();
  if (mac.includes(":")) {
    return mac;
  } else if (mac.includes("-")) {
    return mac.replaceAll("-", ":");
  } else {
    let backMac = "";
    // 纯数字+字母格式的
    for (let i = 0; i < 12; i += 2) {
      backMac += mac.slice(i, i + 2) + ":";
    }
    return backMac.slice(0, backMac.length - 1);
  }
}

/**
 * @method [把多个mac地址转换为:连接]
 * @param {String} macs [需要转换的字符串]
 * @param {String} splitStr 分隔符
 * @returns {String} 转换后的多个mac地址字符串
 */
export function transMacs(macs, splitStr = ";") {
  let macList = macs.split(splitStr);
  return macList
    .map(mac => {
      return transMac(mac);
    })
    .join(splitStr);
}

/**
 * @method [将字符串转码]
 * @param { String } str [需要转换的字符串]
 * @returns 转换后字符串
 */
export function toHtmlCode(str) {
  let relpaceObj = {
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    " ": "&nbsp;",
    "&": "&amp;"
  };
  if (typeof str != "string") {
    return str;
  }

  if (!str) {
    return "";
  }

  return str.replace(/[< >"&]/g, char => relpaceObj[char] || char);
}

/**
 * @method [把空格转换成&nbsp;]
 * @param {String} str [需要转换的字符串]
 * @returns 转换后字符串
 */
export function translateSpaceToHtml(str) {
  return str.replace(/ /g, "&nbsp;");
}

/**
 * @method [\r\n \n  \t 转换成 \\r\\n \\n  \\t]
 * @param {String} str [需要转换的字符串]
 * @returns 转换后字符串
 */
export function translateWrapToHtml(str) {
  return str
    .replace(/\r\n/g, "\\r\\n")
    .replace(/\n/g, "\\n")
    .replace(/\t/g, "\\t");
}

/**
 * @method [计算utf-8的字节长度]
 * @param {String} str
 * @returns {Number} 字节长度
 */
export function getUtf8Length(str) {
  let totalLength = 0,
    charCode,
    len = str.length,
    i;

  for (i = 0; i < len; i++) {
    charCode = str.charCodeAt(i);
    if (charCode < 0x007f) {
      totalLength++;
    } else if (0x0080 <= charCode && charCode <= 0x07ff) {
      totalLength += 2;
    } else if (0x0800 <= charCode && charCode <= 0xffff) {
      totalLength += 3;
    } else {
      totalLength += 4;
    }
  }
  return totalLength;
}

/**
 * @description 删除最后字符串，如果是表情，则多删除一位（表情包长度不止1位，导致出现乱码情况）
 * @param {String} str
 * @returns {String} 去除视觉上的最后一位字符
 */
export function cutStrEmoji(str) {
  str = str.slice(0, -1);
  try {
    //如果正常转义
    encodeURIComponent(str);
  } catch (e) {
    str = cutStrEmoji(str);
  }
  return str;
}

/**
 * @description 截取指定长度的字符串
 * @param {String} str 需要截取的字符串
 * @param {Number} len 长度
 * @returns {String} 截取指定长度的字符串
 */
export function cutStrLen(str, len) {
  let strByte = getUtf8Length(str); //先计算字符串的总字节数，利用了上边的sizeOf

  while (strByte > len) {
    //如果总字节数大于理想字节数
    str = cutStrEmoji(str);
    strByte = getUtf8Length(str); //计算删除后的总字节数，直到小于理想字节数oByte
  }

  return str;
}
/**
 * 去除前后空格
 * @param {String} str 需要去除的字符串
 * @returns {String} 去除前后空格
 */
export function trimStartEndStr(str) {
  return str.replace(/(^ +| +$)/g, "");
}

/**
 * 密码转换成****号， admin的时候不转换
 * @param {String} pwd 密码字符串
 * @param {Boolean} isSupperAdmin 是否是管理员用户
 * @returns  {String} 如果isSupperAdmin 不转换直接返回密码 如果!isSupperAdmin,转换成同样位数的星号
 */
export function translatePassword(pwd, isSupperAdmin) {
  if (isSupperAdmin) {
    return pwd;
  }
  if (typeof pwd === "string") {
    return pwd.replace(/\s|\S/g, "*");
  }
  return pwd;
}

/**
 * @method [首字母小写，排除大写专有词汇]
 * @param {String} str
 * @returns {String} [小写字母后的字符串]
 */
export function firstLower(str) {
  // 只有首字母是大写 并且 第二个字母是小写的才处理 避免改到一些专有词汇
  if (str && str[0] && str[1]) {
    if (str[1] === str[1].toLowerCase()) {
      str = str.replace(/^[A-Z]/, str[0].toLowerCase());
    }
  }

  return str;
}

/**
 * 数组去重
 * @param {Array} arr 需要去重的数组
 * @param {String} prop 数组对象key值
 * @param {Boolean} ignoreCase 是否忽略大小写
 * @returns 去重后的数组
 */
export function uniqueArr(arr, prop, ignoreCase) {
  if (!prop) {
    return [...new Set(arr)];
  }
  let obj = {};

  return arr.filter(a1 => {
    let val = a1[prop];
    if (ignoreCase && val) {
      val = val.toUpperCase();
    }

    if (obj[val]) {
      return false;
    }

    obj[val] = true;
    return obj[val];
  });
}

/**
 * 差集 返回数组A中去掉与数组B有相同prop值的选项
 * @param {Array} a
 * @param {Array} b
 * @param {String} prop 数组对象key值
 * @param {Boolean} ignoreCase 是否忽略大小写
 * @returns {Array} a中去掉b中已有的数据
 */
export function minusArr(a, b, prop, ignoreCase) {
  return a.filter(a1 => {
    if (!prop) {
      return b.indexOf(a1) === -1;
    }

    return !b.some(
      b1 =>
        b1[prop] === a1[prop] ||
        (ignoreCase && b1[prop].toUpperCase() === a1[prop].toUpperCase())
    );
  });
}

/**
 * 并集并且唯一 返回数组A + B 中并且去掉相同prop值的选项
 * @param {Array} a
 * @param {Array} b
 * @param {String} prop 数组对象key值
 * @param {Boolean} ignoreCase 是否忽略大小写
 * @returns {Array} 合并且去重后的数组
 */
export function unionArrs(a, b, prop, ignoreCase) {
  return uniqueArr(a.concat(b), prop, ignoreCase);
}

/**
 * 两个数组交集 相同的部分
 * @param {Array} a
 * @param {Array} b
 * @returns {Array} a与b中相同的部分
 */
export function intersectArr(a, b) {
  return a.filter(item => b.includes(item));
}

/**
 * 数组转成对象数组 转换成 { key : value}形式 默认可以从options中提取
 * @param {Array} arr 要转换的数组对象
 * @param {String} key 对象中key对应的arr中对象的prop
 * @param {String} value 对象中value对应的arr中对象的prop
 * @returns {Object} 映射对象
 */
export function arrayToObject(arr, key = "value", value = "label") {
  let obj = {};
  arr.forEach(element => {
    obj[element[key]] = element[value];
  });
  return obj;
}

/**
 * @method [checkIpInSameSegment] [用于判断两个IP地址是否同网段]
 * @param  {string} ip_lan   [lan口IP地址]
 * @param  {string} mask_lan [lan口子网掩码]
 * @param  {string} ip_wan   [wan口IP地址]
 * @param  {string} mask_wan [wan口子网掩码]
 * @return {booleans}        [若在同一网段，则返回true, 不在同一网段，返回false]
 */
export function checkIpInSameSegment(ip_lan, mask_lan, ip_wan, mask_wan) {
  // "" 或者 0.0.0.0 不比较
  if (
    [ip_lan, ip_wan, mask_lan, mask_wan].findIndex(
      ip => ip === "" || ip === "0.0.0.0"
    ) > -1
  ) {
    return false;
  }

  let ip1Arr = ip_lan.split("."),
    ip2Arr = ip_wan.split("."),
    maskArr1 = mask_lan.split("."),
    maskArr2 = mask_wan.split("."),
    maskArr = maskArr1,
    i;
  // 获取子网掩码 找大的那个
  for (i = 0; i < 4; i++) {
    if (
      maskArr1[i] != maskArr2[i] &&
      (maskArr1[i] & maskArr2[i]) != maskArr1[i]
    ) {
      maskArr = maskArr2;
      break;
    }
  }

  for (i = 0; i < 4; i++) {
    if ((ip1Arr[i] & maskArr[i]) != (ip2Arr[i] & maskArr[i])) {
      return false;
    }
  }

  return true;
}

/**
 * @method [用于判断两个IP地址是否同网段]
 * @param  {string} ip_first   [被检测IP]
 * @param  {string} mask_first [被检测子网掩码]
 * @param  {string} ip_second   [检测IP]
 * @param  {string} mask_second [检测子网掩码]
 * @param  {string} text_first [被检测IP描述]
 * @param  {string} text_second [检测IP描述]
 * @return {string}             [返回校验错误，没有则返回空]
 */

export function validIpInSameSegment(
  ip_first,
  mask_first,
  ip_second,
  mask_second,
  text_first,
  text_second
) {
  if (checkIpInSameSegment(ip_first, mask_first, ip_second, mask_second)) {
    return transCompText(
      "%s and %s (%s) must not be on the same network segment.",
      [text_first, text_second, ip_second]
    );
  }
}

/**
 * @method [检查IP地址是否为网段或广播IP合法性]
 * @param  {string} ip   [IP地址]
 * @param  {string} mask [子网掩码]
 * @param  {string} str  [提示信息，用于表示ip是什么地址]
 * @return {string}      [若检查有错，则返回报错提示语。否则，返回为空]
 */
export function checkIsValidIpMask(
  ip,
  mask,
  str = transCompText("IP Address")
) {
  let ipArr,
    maskArr,
    len,
    maskArr2 = [],
    netIndex = 0,
    netIndex1 = 0,
    broadIndex = 0,
    i = 0;

  ipArr = ip.split(".");
  maskArr = mask.split(".");
  len = ipArr.length;

  for (i = 0; i < len; i++) {
    maskArr2[i] = 255 - Number(maskArr[i]);
  }

  for (let k = 0; k < 4; k++) {
    // ip & mask
    if ((ipArr[k] & maskArr[k]) !== 0) {
      netIndex1 += 1;
    }
    // ip & 255 - mask
    if ((ipArr[k] & maskArr2[k]) !== 0) {
      netIndex += 1;
    }

    if ((ipArr[k] | maskArr[k]) !== 255) {
      broadIndex += 1;
    }
  }

  if (netIndex === 0 || netIndex1 === 0) {
    // return transCompText("%s不能为网络地址,请修改IP地址或子网掩码", [str]);
    return transCompText("%s cannot be a network address.", [str]);
  }

  if (broadIndex === 0) {
    return transCompText("%s cannot be a broadcast IP address.", [str]);
  }

  return;
}

/**
 * @method [判断IP地址的大小]
 * @param  {string} ip   [IP地址]
 * @param  {string} ip   [ip地址]
 * @return {Boolean}      [ ipFirst > ipSecond 若大于，则返回true。否则，返回false]
 */
export function checkIpComparison(ipFirst, ipSecond) {
  return ipToInt(ipFirst) > ipToInt(ipSecond);
}

/**
 * @method [ip转数字]
 * @param {String} ip [IP地址]
 * @returns {Number} ip的数字大小
 */
export function ipToInt(ip) {
  let numArr = ip.split(".").map(item => parseInt(item, 10));

  return (
    numArr[0] * 256 * 256 * 256 +
    numArr[1] * 256 * 256 +
    numArr[2] * 256 +
    numArr[3]
  );
}

/**
 * 将位数转化为掩码地址 24=>255.255.255.0
 * @param {Number} num 长度
 * @returns {String}
 */
export function toDotMask(num) {
  if (num <= 0 || num > 32) return "";
  let maskStr = "";
  for (let i = 0; i < 32; i++) {
    maskStr += i < num ? "1" : "0";
  }

  let result = [0, 0, 0, 0];
  result = result.map((item, i) =>
    parseInt(maskStr.slice(i * 8, i * 8 + 8), 2)
  );

  return result.join(".");
}

/**
 *  计算网络地址
 * @param {String} ip IP地址
 * @param {String} mask 子网掩码
 * @param {Boolean} hasValid 是否返回最小有效位 加一
 * @returns {String} 返回网络地址 或者网络地址加1
 *
 */
export function getNetwork(ip, mask, hasValid = false) {
  let ipArr = ip.split("."),
    maskArr = mask.split("."),
    netArr = [];

  netArr = ipArr.map((val, index) => {
    return val & maskArr[index];
  });

  if (hasValid) {
    netArr[3] += 1;
  }
  return netArr.join(".");
}

/**
 * 计算广播地址
 * @param {String} ip
 * @param {String} mask
 * @param {Boolean} hasValid 是否返回最大有效位 减一
 * @returns {String} 返回广播地址
 */
export function getBroadcast(ip, mask, hasValid = false) {
  let ipArr = ip.split("."),
    maskArr = mask.split("."),
    netArr = [];

  netArr = maskArr.map((val, index) => {
    // 子网掩码取反获取
    let reverse2val = reverse2(val);
    // 返回网段 + 最大地址
    return (val & ipArr[index]) + (255 & reverse2val);
  });
  if (hasValid) {
    netArr[3] -= 1;
  }
  return netArr.join(".");
}

/**
 * 8 位二进制取反操作
 * 可以用于子网掩码
 * @param {String} val
 * @returns {Number} 返回取反后的二进制
 */
function reverse2(val) {
  // 转成2进制 并且补全8位
  let str2 = "00000000" + (+val).toString(2);
  // 取后8位
  str2 = str2.substring(str2.length - 8);

  // 0和1 取反
  str2 = str2.replace(/0|1/g, a => (a > 0 ? 0 : 1));

  return parseInt(str2, 2);
}

/**
 * ip1, ip2, ip3 返回 ip1-ip2 或者 ip2~ip3
 * 用于dhcp计算范围 返回大一点的范围
 * @param {String} ip1 开始IP地址
 * @param {String} ip2 lanip
 * @param {String} ip3 结束IP地址
 * @returns {Array} [ip1,ip2] 或者 [ip2,ip3] 并且去除ip2的有效范围
 */
export function getBigRange(ip1, ip2, ip3) {
  let ipArr1 = ip1.split("."),
    ipArr2 = ip2.split("."),
    ipArr3 = ip3.split("."),
    flag = false; // 中间ip的位置 true 的话 是在后面 flase 在前面
  for (let i = 0; i < 4; i++) {
    let ans = ipArr2[i] - ipArr1[i] - (ipArr3[i] - ipArr2[i]);
    if (ans < 0) {
      flag = false;
      break;
    }
    if (ans > 0) {
      flag = true;
      break;
    }
  }

  // 中间ip需要减一或这加一 范围不能包换中间的ip
  if (flag) {
    //  减一 但是0 时需要借位
    for (let i = 3; i > -1; i--) {
      if (ipArr2[i] === 0) {
        ipArr2[i] = 255;
        continue;
      }
      ipArr2[i] = +ipArr2[i] - 1;
      break;
    }

    return [ip1, ipArr2.join(".")];
  } else {
    // 加一 但是255 时需要进位
    for (let i = 3; i > -1; i--) {
      if (ipArr2[i] === 255) {
        ipArr2[i] = 0;
        continue;
      }
      ipArr2[i] = +ipArr2[i] + 1;
      break;
    }
    return [ipArr2.join("."), ip3];
  }
}

/**
 * 判断ipv6是否不同网段
 * @param {String} addr1 ipv6地址1
 * @param {String} addr2 ipv6地址2
 * @param {String} prefixLen1 ipv6前缀1
 * @param {String} prefixLen2 ipv6前缀2
 * @returns {boolean} [若相同 返回true 若不同返回 false]
 */
export function checkIpv6InSameSegment(addr1, addr2, prefixLen1, prefixLen2) {
  //如果两个前缀长度不一样，就是不同网段
  prefixLen1 = parseInt(prefixLen1, 10);
  prefixLen2 = parseInt(prefixLen2, 10);
  if (prefixLen1 != prefixLen2) {
    return false;
  }
  //计算两个地址的二进制
  //截取前{prefixLen}位进行比较，如果一样，则为同网段
  let binaryAddr1 = toBinary(getFullIpv6(addr1)).slice(0, prefixLen1),
    binaryAddr2 = toBinary(getFullIpv6(addr2)).slice(0, prefixLen1);

  return binaryAddr1 === binaryAddr2;
}

/**
 * @method 计算完整的ipv6地址，并去掉:
 * @param {addr} ipv6地址
 */
export function getFullIpv6(addr) {
  //补全后的地址，无:/::
  let splitAddr = addr.split("::"),
    shortAddr = splitAddr[0].split(":"),
    shortAddr2 = [],
    addrLen = shortAddr.length;

  //没有::，长度为8，有双冒号时需要计算
  if (addr.indexOf("::") !== -1) {
    shortAddr2 = splitAddr[1].split(":");
    addrLen += shortAddr2.length;

    //简写处补全0，不需要:隔开，分别获取::前后数字后将abbAddr插在中间
    let zeroArr = Array.from({ length: 8 - addrLen }, () => "0000");
    shortAddr = [...shortAddr, ...zeroArr, ...shortAddr2];
  }

  //以:隔开的地址不足4位补全
  shortAddr = shortAddr.map(item => addZero(item, 4));
  return shortAddr.join("");
}

/**
 * 比较ipv6大小
 * @param {String} addr1 ipv6地址1
 * @param {String} addr2 ipv6地址2
 * @returns {boolean} 如果addr1大 返回true
 */
export function compareIpv6(addr1, addr2) {
  return toBinary(getFullIpv6(addr1)) >= toBinary(getFullIpv6(addr2));
}

/**
 * @method 将字符串十六进制转为二进制并补全
 * @param {string} str 字符串
 * @returns {String} 返回四位二进制
 */
function toBinary(str) {
  let arr = str.split(""),
    resultArr = arr.map(item => addZero(parseInt(item, 16).toString(2), 4));

  return resultArr.join("");
}

/**
 * 前缀补0操作 不满几位的时候补“0”或其他
 * @param {string} str 要补的字符串
 * @param {Number} num 不满的位数 补0
 * @param {String} zero  自定义0
 * @returns {String} 返回补齐后的字符串
 */
function addZero(str, num, zero = "0") {
  str += "";
  while (str.length < num) {
    str = zero + str;
  }
  return str;
}
