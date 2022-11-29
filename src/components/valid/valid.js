import {
  getUtf8Length,
  checkIpComparison,
  ipToInt,
  firstLower
} from "../utils/utils";

export const valid = {
  /**
   * 校验字符串长度
   * @param {String} str - 需要检验的字符串
   * @param {Number} min - 最小输入字符数
   * @param {Number} max - 最大输入字符数
   * @returns
   */
  len(str, min, max) {
    let len = str.length;

    if (len < min || len > max) {
      return transCompText("Range: %s - %s characters", [min, max]);
    }
  },
  /**
   * 校验字符串字节长度
   * @param {String} str - 需要检验的字符串
   * @param {Number} min - 最小输入字节数
   * @param {Number} max - 最大输入字节数
   * @returns
   */
  byteLen(str, min, max) {
    let totalLength = getUtf8Length(str);

    if (
      typeof min !== "undefined" &&
      typeof max !== "undefined" &&
      (totalLength < min || totalLength > max)
    ) {
      return transCompText("Range: %s - %s bytes", [min, max]);
    }
  },
  /**
   * 校验整数大小范围
   * @param {String} str - 需要检验的字符串
   * @param {number/Array} min - 最小值或者数字范围的数组，数组每一项可以是单个数字也可以是个数组表示范围
   * @param {number} max - 最大值
   * @returns
   */
  num(str, min, max) {
    if (!/^([-0-9])?([0-9]+)$/.test(str)) {
      return transCompText("Enter digits");
    }
    str = Number(str);
    if (typeof min === "number" && typeof max === "number") {
      if (str < min || str > max) {
        return transCompText("Range: %s - %s", [min, max]);
      }
    }
    // 如果是多个范围
    if (Array.isArray(min)) {
      return valid.range(str, min);
    }
  },
  /**
   * 校验整数大小范围 并且必须为偶数
   * @param {String} str - 需要检验的字符串
   * @param {number/Array} min - 最小值或者数字范围的数组，数组每一项可以是单个数字也可以是个数组表示范围
   * @param {number} max - 最大值
   * @returns
   */
  even(str, min, max) {
    let isError = valid.num(str, min, max);
    if (isError) {
      return isError;
    }
    if (str % 2 !== 0) {
      return transCompText("The entered value must be an even number.");
    }
  },
  /**
   * 浮点型数字大小
   * @param {String} str - 需要检验的字符串
   * @param {number/Array} min - 最小值或者数字范围的数组，数组每一项可以是单个数字也可以是个数组表示范围
   * @param {number} max - 最大值
   * @returns
   */
  float(str, min, max) {
    //支持小数点后一位
    if (!/^([-0-9])?([0-9]+)(\.[0-9]{0,1})?$/.test(str)) {
      return transCompText("Enter digits");
    }
    str = Number(str);
    if (typeof min === "number" && typeof max === "number") {
      if (str < min || str > max) {
        return transCompText("Range: %s - %s", [min, max]);
      }
    }
    // 如果是多个范围
    if (Array.isArray(min)) {
      return valid.range(str, min);
    }
  },
  /**
   * 检验是否在范围内
   * @param {String} str - 需要检验的字符串
   * @param {Array} rangeArr - 数字范围的数组，数组每一项可以是单个数字也可以是个数组表示范围
   * @returns
   */
  range(str, rangeArr) {
    if (Array.isArray(rangeArr)) {
      let findIndex = rangeArr.findIndex(range => {
        if (Array.isArray(range) && str >= range[0] && str <= range[1]) {
          return true;
        }

        return range == str;
      });

      // 提示语考虑下
      if (findIndex == -1) {
        return transCompText("Range: %s", [
          rangeArr
            .map(range => (Array.isArray(range) ? range.join("~") : range))
            .join(",")
        ]);
      }
    }
  },
  /**
   * [验证单个数字或数字范围，如端口范围设置（xx 或 xx-xxx）]
   * @param {String} str - 需要检验的字符串
   * @param {Number} min - 最小输入数字
   * @param {Number} max - 最大输入数字
   * @returns
   */
  port(str, min = 1, max = 65535) {
    let reg = /^(([1-9])?([0-9]+)){1}-(([1-9])?([0-9]+)){1}$/; //端口范围

    if (!reg.test(str)) {
      return valid.num(str, min, max);
    } else {
      //验证端口范围
      let start = +str.split("-")[0],
        end = +str.split("-")[1];
      if (start >= end) {
        return transCompText("Range: %s - %s", [min, max]);
      }

      if (typeof min === "number" && typeof max === "number") {
        if (start < min || end > max) {
          return transCompText("Range: %s - %s", [min, max]);
        }
      }
    }
  },
  /**
   * 校验子网掩码
   * @param {String} str - 需要检验的字符串
   * @param {String} isAll 表示是否支持0.0.0.0
   * @returns
   */
  mask(str, isAll) {
    let reg =
      /^(254|252|248|240|224|192|128)\.0\.0\.0$|^(255\.(254|252|248|240|224|192|128|0)\.0\.0)$|^(255\.255\.(254|252|248|240|224|192|128|0)\.0)$|^(255\.255\.255\.(255|254|252|248|240|224|192|128|0))$/;

    if (isAll) {
      reg =
        /^(254|252|248|240|224|192|128|0)\.0\.0\.0$|^(255\.(254|252|248|240|224|192|128|0)\.0\.0)$|^(255\.255\.(254|252|248|240|224|192|128|0)\.0)$|^(255\.255\.255\.(255|254|252|248|240|224|192|128|0))$/;
    }

    if (!reg.test(str)) {
      return transCompText("Please enter a valid subnet mask.");
    }
  },
  /**
   * 校验ip地址
   * @param {String} str - 需要检验的字符串
   * @param {Boolean} isAllowZero - 是否支持 0.0.0.0
   * @param {Boolean} isAllowAll - 是否支持全部ip
   * @returns
   */
  ip: {
    all(str, isAllowZero = false, isAllowAll = false) {
      if (isAllowZero && str == "0.0.0.0") {
        return;
      }

      if (isAllowAll) {
        return this.allowAll(str);
      }

      return this.specific(str);
    },

    specific(str) {
      let [ipHead] = str.split(".");

      if (+ipHead == 127) {
        return transCompText(
          "An IP address that begins with 127 is a loopback IP address. Specify another valid value from 1 to 223."
        );
      }
      if (+ipHead > 223) {
        return transCompText(
          "An IP address cannot start with %s. Specify a value from 1 to 223.",
          [ipHead]
        );
      }
      if (
        !/^([1-9]|[1-9]\d|1\d\d|2[0-1]\d|22[0-3])\.(([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.){2}([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])$/.test(
          str
        )
      ) {
        return transCompText("Please enter a valid IP address.");
      }
    },
    allowAll(str) {
      if (
        !/^(([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.){3}([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])$/.test(
          str
        )
      ) {
        return transCompText("Please enter a valid IP address.");
      }
    }
  },
  /**
   * 校验mac地址
   * @param {String} str - 需要检验的字符串
   * @param {String} splitChunks - 分隔符 默认支持全部 空或者-或：
   * @returns
   */
  mac: {
    all(str, splitChunks) {
      // 判断分割符
      const match = str.match(/[^a-fA-F0-9]/);
      splitChunks = splitChunks || (match ? match[0] : "");
      let ret = this.specific(str, splitChunks),
        reg = new RegExp(
          "^([0-9a-fA-F]{2}" + splitChunks + "){5}[0-9a-fA-F]{2}$"
        );
      // 目前只支持 无符号分割 : - 分割 其他不支持
      if (splitChunks !== "" && splitChunks !== ":" && splitChunks !== "-") {
        return transCompText("Please enter a valid MAC address.");
      }

      if (ret) {
        return ret;
      }

      if (!reg.test(str)) {
        return transCompText("Please enter a valid MAC address.");
      }
    },

    specific(str, splitChunks = ":") {
      let [subMac1, subMac2] = str.split(splitChunks);
      if (splitChunks === "") {
        subMac1 = subMac1 + subMac2;
      }
      if (subMac1.charAt(1) && parseInt(subMac1.charAt(1), 16) % 2 !== 0) {
        return transCompText(
          "The second character of the MAC address must be an even number."
        );
      }

      const arr = ["00", "00", "00", "00", "00", "00"];
      if (str === arr.join(splitChunks)) {
        return transCompText("Cannot be 00:00:00:00:00:00.");
      }
    }
  },
  /**
   * 校验邮箱
   * @param {String} str - 需要检验的字符串
   * @returns
   */
  email(str) {
    let reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!reg.test(str)) {
      return transCompText("Please enter a valid email address.");
    }
  },
  /**
   * 校验手机号
   * @param {String} str - 需要检验的字符串
   * @returns
   */
  phone(str) {
    let reg =
      /^(?:\+?86)?1(?:3\d{3}|5[^4\D]\d{2}|8\d{3}|7(?:[0-35-9]\d{2}|4(?:0\d|1[0-2]|9\d))|9[0-35-9]\d{2}|6[2567]\d{2}|4(?:(?:10|4[01])\d{3}|[68]\d{4}|[579]\d{2}))\d{6}$/g;
    if (!reg.test(str)) {
      return transCompText("Enter a correct number.");
    }
  },
  /**
   * 校验url
   * @param {String} str - 需要检验的字符串
   * @returns
   */
  url(str) {
    let reg =
      /((http|https):\/\/)*[\w\-_]+(\.[\w\-_]+)+([\w\-.,@?^=%&:/~+#]*[\w\-@?^=%&/~+#])?/;
    if (!reg.test(str)) {
      return transCompText("Please enter a valid URL.");
    }
  },
  /**
   * 校验日期时间 1922-02-33 22:02:33
   * @param {String} str - 需要检验的字符串
   * @returns
   */
  dateTime(str) {
    if (!/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(str)) {
      return transCompText("Please enter a valid time.");
    }
  },
  /**
   * 校验ascii
   * @param {String} str - 需要检验的字符串
   * @param {Number} min - 最小输入字符数
   * @param {Number} max - 最大输入字符数
   * @returns
   */
  ascii(str, min, max) {
    if (!/^[ -~]+$/g.test(str)) {
      return transCompText("Please enter ASCII characters.");
    }
    if (min || max) {
      return valid.len(str, min, max);
    }
  },
  /**
   * 校验hex码
   * @param {String} str - 需要检验的字符串
   * @param {Number} min - 最小输入字符数
   * @param {Number} max - 最大输入字符数
   * @returns
   */
  hex(str, min, max) {
    if (!/^[0-9a-fA-F]{1,}$/.test(str)) {
      return transCompText("Please enter a hexadecimal character.");
    }
    if (min || max) {
      return valid.len(str, min, max);
    }
  },
  /**
   * 校验域名 (可支持ip)
   * @param {String} str - 需要检验的字符串
   * @param {boolean} isSupportIP - 是否支持ip
   * @returns
   */
  domain(str, isSupportIP) {
    if (isSupportIP && !valid.ip.all(str)) {
      return;
    }
    if (!/^[\d\\.]+$/.test(str)) {
      if (
        /^[a-zA-Z0-9][_\-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][_\-a-zA-Z0-9]{0,62})+$/i.test(
          str
        ) ||
        str == "localhost"
      ) {
        return;
      }
    }
    return transCompText("Please enter a valid domain name.");
  },
  /**
   * 校验ipv6 头部 就是前四位
   * @param {String} str - 需要检验的字符串
   * @returns
   */
  ipv6Header(str) {
    let error = transCompText("Please enter a valid IP address.");
    let headStr = str.split("::")[0].split(":")[0].toUpperCase(),
      errAddrHeader = ["FF", "FE80", "FEC0", "FC00", "FD00", "2002"];

    if (headStr.length != 4) {
      return error;
    }

    if (headStr[0] != "2" && headStr[0] != "3") {
      return error;
    }

    //全球唯一的IPV6地址非法开头："FF"组播地址,"FE80", "FEC0", "FC00", "FD00", "2002"
    if (errAddrHeader.findIndex(str => headStr.indexOf(str) == 0) > -1) {
      return error;
    }

    str = Number(str.replace(/:/g, ""));
    // todo ？ 必须2开头或者3开头应该没有这种情况
    //不能为全0 并且不能为1 相当于ipv4的127.0.0.1 最后一位可能是冒号
    if (str == 0 || (str == 1 && str.slice(-1) == "1")) {
      return error;
    }
  },
  /**
   * 校验ipv6 除头部以外 格式是否正确
   * @param {String} str - 需要检验的字符串
   * @returns
   */
  ipv6Value(str) {
    let error = transCompText("Please enter a valid IP address.");
    let idx = str.indexOf("::"),
      items = str.replace("::", ":").split(":"),
      strLen = items.length,
      items1;
    if (idx == -1) {
      if (strLen != 8) {
        //没有"::",必须有8节地址
        return error;
      }
    } else {
      if (idx != str.lastIndexOf("::")) {
        //只能有一个"::"
        return error;
      }
      if (strLen >= 8) {
        //如果有双冒号，最多为7节地址
        return error;
      }

      items1 = str.split("::")[1];
      // value 部分不能为0 或者空
      if (Number(items1.replace(/:/g, "")) == 0) {
        //不能为全0
        return error;
      }
    }
    // 验证每一项是否合法
    if (items.findIndex(item => !/^[0-9a-fA-F]{1,4}$/.test(item)) > -1) {
      return error;
    }
  },
  /**
   * 校验ipv6 前缀格式是否正确，并且只有前缀
   * @param {String} str - 需要检验的字符串
   * @returns
   */
  ipv6Prefix(str) {
    let error = transCompText("Please enter a valid IP address.");

    let items = str.split("::"),
      items0 = items[0].split(":"),
      ret = valid.ipv6Header(str);
    if (ret) {
      return ret;
    }
    if (items.length != 2) {
      //only one ::
      return error;
    }
    if (items[1] != "") {
      //::后面必须为空
      return error;
    }

    if (items0.length < 1 || items0.length > 4) {
      //1:: or 2:2:2:2 最多四段
      return error;
    }
    // 验证每一项是否合法
    if (items0.findIndex(item => !/^[0-9a-fA-F]{1,4}$/.test(item)) > -1) {
      return error;
    }
  },
  /**
   * 校验ipv6 完整格式
   * @param {String} str - 需要检验的字符串
   * @returns
   */
  ipv6(str) {
    return valid.ipv6Header(str) || valid.ipv6Value(str);
  },
  /**
   * 校验ipv6 支持本地链路格式 与ipV6的区别 可以支持FE80开头的本地链路地址
   * @param {String} str - 需要检验的字符串
   * @returns
   */
  ipv6LocalLink(str) {
    let header = str.slice(0, 4).toUpperCase();
    return header != "FE80" ? valid.ipv6(str) : valid.ipv6Value(str);
  },
  /**
   * 1-32个字节，首尾不能输入空格，可见ascii范围或者中文字符
   * @param {String} str - 需要检验的字符串
   * @param {Number} min - 最小输入字符数
   * @param {Number} max - 最大输入字符数
   */
  ssid(str, min = 1, max = 32) {
    let ret = valid.byteLen(str, min, max);
    if (ret) {
      return ret;
    }
    if (/^ | $/.test(str)) {
      return transCompText("Space cannot be used at the beginning and end.");
    }
    if (/[^\u4e00-\u9fa5 -~]+$/.test(str)) {
      return transCompText("Only ASCII characters or characters are allowed.");
    }
  },
  /**
   * 校验8-63位ascii 码或8-64位hex码
   * @param {String} str - 需要检验的字符串
   */
  ssidPwd(str) {
    if (valid.ascii(str, 8, 63) && valid.hex(str, 8, 64))
      return transCompText(
        "Only 8 to 63 ASCII characters or 8 to 64 hexadecimal characters are allowed"
      );
  },
  /**
   * 校验只能输入5或者13位ASCII码字符或10或26位十六进制数
   * @param {String} str - 需要检验的字符串
   */
  wep(str) {
    if (
      valid.ascii(str, 5, 5) &&
      valid.ascii(str, 13, 13) &&
      valid.hex(str, 10, 10) &&
      valid.hex(str, 26, 26)
    )
      return transCompText(
        "Only 5 or 13 ASCII characters or 10 or 26 hexadecimal characters are allowed."
      );
  },
  /**
   * 校验ascii密码并且不包含空格
   * @param {String} str - 需要检验的字符串
   * @param {Number} min - 最小输入字符数
   * @param {Number} max - 最大输入字符数
   */
  userPwd(str, min, max) {
    if (valid.ascii(str)) {
      return transCompText("Please enter ASCII characters.");
    }

    if (/^ /.test(str) || / $/.test(str)) {
      return _("A password cannot start or end with space.");
    }

    if (min && max) {
      return valid.len(str, min, max);
    }
  },
  /**
   * 校验只能输入数字和字母组合
   * @param {String} str - 需要检验的字符串
   * @param {Number} min - 最小输入字符数
   * @param {Number} max - 最大输入字符数
   */
  uniqueCode(str, min = 32, max = 32) {
    let reg = new RegExp(
      "^(?=.*[a-zA-Z])(?=.*[0-9])[A-Za-z0-9]{" + min + "," + max + "}$"
    );
    if (!reg.test(str)) {
      if (min == max) {
        return transCompText(
          "Only %s characters composed by digits and letters are allowed.",
          [min]
        );
      } else {
        return transCompText(
          "Only %s~%s characters composed by digits and letters are allowed.",
          [min, max]
        );
      }
    }
  },
  /**
   * 校验不能只输入xxx字符
   * @param {String} str - 需要检验的字符串
   * @param {String} arg - 字符
   */
  onlySpecific(val, arg = "-") {
    let reg = new RegExp("^" + arg + "$");
    if (reg.test(val)) {
      return transCompText("%s alone are not allowed.", [arg]);
    }
  },
  /**
   * 校验前后不能输入空格
   * @param {String} str - 需要检验的字符串
   */
  noSpace(str) {
    if (/^ | $/.test(str)) {
      return transCompText("Space cannot be used at the beginning and end.");
    }
  },
  /**
   * 校验只能输入数字和字母
   * @param {String} str - 需要检验的字符串
   */
  numAndLetter(str) {
    if (/[^0-9a-zA-Z]/.test(str)) {
      return transCompText("Enter digits and letters.");
    }
  },
  /**
   * 校验只能输入数字和字母中划线
   * @param {String} str - 需要检验的字符串
   */
  normarlChars(str) {
    if (/[^0-9a-zA-Z_]/.test(str)) {
      return transCompText(
        "Please enter digits, uppercase or lowercase letters, or underscores."
      );
    }
  },
  /**
   * 校验只能输入数字和字母中划线
   * @param {String} str - 需要检验的字符串
   */
  normarlChars1(str) {
    if (/[^0-9a-zA-Z-]/.test(str)) {
      return transCompText("Enter digits, letters and strikethroughs.");
    }
  },
  /**
   * 校验只能输入数字、字母、下划线或中划线
   * @param {String} str - 需要检验的字符串
   */
  normarlChars2(str) {
    if (/[^0-9a-zA-Z_-]/.test(str)) {
      return transCompText(
        "Enter digits, letters, underscores and strikethroughs."
      );
    }
  },

  /**
   * 校验不能只输入xxx字符
   * @param {String} str - 需要检验的字符串
   * @param {String} arg - 不允许输入的字符
   */
  notSpecialChars(str, notAllowStr) {
    let reg = new RegExp("[" + notAllowStr + "]");
    if (reg.test(str)) {
      return transCompText("Special characters %s are not supported.", [
        notAllowStr
      ]);
    }
  },
  /**
   * 比较相同字符串
   * @param {String} str1 - 需要检验的字符串
   * @param {String} str2 - 需要检验的字符串
   * @param {String} msg - 错误提示
   */
  sameStr(str1, str2, msg) {
    if (str1 == str2) {
      return msg;
    }
  },
  /**
   * 支持多个校验一个成功即可 例如 域名或ip  mac和ip等等
   * @param {String} str - 需要检验的字符串
   * @param {Array} valids - 支持的校验方法，配置格式 支持函数或对象方式[function, {type:"ip",args:[true]}]
   * @param {String} msg - 错误提示
   */
  validOrArrs(str, valids, msg) {
    // 只有验证一项正确就返回
    let index = valids.findIndex(validObj => {
      if (typeof validObj == "function") {
        return !validObj(str);
      }
      // valid.type
      let { type, args = [] } = validObj;

      if (valid[type].all && typeof valid[type].all == "function") {
        return !valid[type].all(str, ...args);
      }

      if (typeof valid[type] == "function") {
        return !valid[type](str, ...args);
      }

      return false;
    });
    if (index == -1) {
      return msg;
    }
  },
  /**
   * 比较IP地址大小 todo 感觉可以去除
   * @param {String} ip1 - IP地址1
   * @param {String} ip2 - IP地址2
   * @param {String} msg - 错误提示
   */
  ipCompare(ip1, ip2, msg) {
    if (ipToInt(ip1) >= ipToInt(ip2)) {
      return (
        msg ||
        transCompText("The start address must be smaller than the end address.")
      );
    }
  }
};

/**
 * 校验XX.XX.XX.XX 这种格式
 * @param {String} str - 需要检验的字符串
 * @returns
 */
export function tree(str, msg) {
  //示例： 1.1.223.3.23
  if (!/^([0-9]+\.){0,}(\d+)$/.test(str)) {
    return (
      msg ||
      transCompText("请输入格式XX.XX.XX.XX，X必须为数字，不限制大小和个数")
    );
  }
}

/**
 * ASCII可视字符校验
 * @param {String} str - 需要检验的字符串
 * @param {Number} min - 最小输入字符数
 * @param {Number} max - 最大输入字符数
 */
export function asciiDisplayChar(str, min, max) {
  var start = 33,
    // ASCII可视字符起始(10进制)
    end = 126,
    // ASCII可视字符结束(10进制)
    charCode = 0,
    // 用于循环时保存字符串的每个字符
    i = 0,
    len = str.length;

  for (; i < len; i++) {
    charCode = str[i].charCodeAt();
    if (charCode < start || charCode > end) {
      return transCompText("Only displayable ASCII characters are allowed.");
    }
  }

  return valid.len(str, min, max);
}

/**
 * 校验全空白字符
 * @param {String} str - 需要检验的字符串
 * @returns
 */
export function allBlank(val) {
  if (/^\s+$/g.test(val)) {
    return transCompText("Spaces alone are not allowed.");
  }
}
/**
 * 校验不能有空白字符
 * @param {String} str - 需要检验的字符串
 * @returns
 */
export function noBlank(val) {
  if (/\s/g.test(val)) {
    return transCompText("Spaces are not allowed.");
  }
}

// 校验多个 支持范围
export const validMultiple = {
  repeatArr: [],
  all(
    str,
    valid,
    splitChunks = ";",
    checkRepeat = true,
    hasRange = true,
    rangeMsg = transCompText(
      "The start address must be smaller than the end address."
    ),
    repeatMsg = transCompText("The IP address is duplicated."),
    msg
  ) {
    this.repeatArr = [];

    let ans;
    let list = str.split(splitChunks);
    // 每一项进行验证
    let index = list.findIndex(item => {
      let start = item,
        end = item;

      if (item.indexOf("~") > -1) {
        let list = item.split("~");

        if (!hasRange || list.length > 2) {
          ans = transCompText("format error");
          return true;
        }

        [start, end] = list;

        ans = this.validRange(start, end, valid, rangeMsg);
      } else {
        ans = valid.all ? valid.all(item) : valid(item);
      }

      if (!ans && checkRepeat) {
        ans = this.checkRepeat(start, end, repeatMsg);
      }

      return !!ans;
    });

    // 让英语格式下更正常
    ans = firstLower(ans);

    return ans ? transCompText("No.%s ", [index + 1]) + (msg || ans) : "";
  },
  // 范围校验
  validRange(start, end, valid, msg) {
    let ret = valid.all
      ? valid.all(start) || valid.all(end)
      : valid(start) || valid(end);

    // 判断范围大小
    if (!ret && start >= end) {
      return msg;
    }

    return ret;
  },
  // 校验是否有即交集
  checkRepeat(start, end, msg) {
    let index = this.repeatArr.findIndex(
      ([start1, end1]) => !(end < start1 || start > end1)
    );

    if (index > -1) {
      return msg;
    }

    this.repeatArr.push([start, end]);
  }
};

/**
 * 校验多个 ip 支持   ip;ip~ip2;ip3 或 ip1;ip2;ip3
 * @param {String} str - 需要检验的字符串
 * @param {*} splitChunks 分隔符，默认为;
 * @param {*} checkRepeat 是否判断重复
 * @param {*} hasRange 是否支持范围
 * @param {*} msg 提示语
 * @returns
 */
export const ips = {
  repeatArr: [],
  all(str, splitChunks = ";", checkRepeat = true, hasRange = true, msg) {
    return valid.validMultiple.all.bind(
      this,
      str,
      valid.ip,
      splitChunks,
      checkRepeat,
      hasRange,
      undefined,
      undefined,
      msg
    )();
  },
  // 范围校验
  validRange(str1, str2) {
    let ret = valid.ip.all(str1) || valid.ip.all(str2);

    // 判断范围大小
    if (!ret && !checkIpComparison(str2, str1)) {
      return transCompText(
        "The start address must be smaller than the end address."
      );
    }

    return ret;
  },
  // 校验是否有重复ip，即交集
  checkRepeat(ip1, ip2) {
    ip1 = ipToInt(ip1);
    ip2 = ipToInt(ip2);
    let index = this.repeatArr.findIndex(
      ([ip3, ip4]) => !(ip2 < ip3 || ip1 > ip4)
    );

    if (index > -1) {
      return transCompText("The IP address is duplicated.");
    }

    this.repeatArr.push([ip1, ip2]);
  }
};

/**
 * 校验多个 mac 支持   mac;mac3;mac2~mac4 或 mac1;mac2;mac3
 * @param {String} str - 需要检验的字符串
 * @param {*} splitChunks 分隔符，默认为;
 * @param {*} checkRepeat 是否判断重复
 * @param {*} hasRange 是否支持范围
 * @param {*} msg 提示语
 * @returns
 */
export const macs = {
  all(str, splitChunks = ";", checkRepeat = true, hasRange = true, msg) {
    return validMultiple.all(
      str,
      valid.mac,
      splitChunks,
      checkRepeat,
      hasRange,
      transCompText("The start address must be smaller than the end address."),
      transCompText("The MAC address is duplicated."),
      msg
    );
  }
};

/**
 * 校验多个 手机号 支持   phone1;phone2;phone3
 * @param {String} str - 需要检验的字符串
 * @param {*} splitChunks 分隔符，默认为;
 * @param {*} checkRepeat 是否判断重复
 * @param {*} msg 提示语
 * @returns
 */
export const phones = {
  repeatArr: [],
  all(str, splitChunks = ";", checkRepeat = true, msg) {
    return valid.validMultiple.all(
      str,
      valid.phone,
      splitChunks,
      checkRepeat,
      false,
      false,
      transCompText("The mobile number is duplicated."),
      msg
    );
  }
};

/**
 * 校验多个 端口 支持    port;port3;port2~port4 或 port1;port2;port3
 * @param {String} str - 需要检验的字符串
 * @param {*} splitChunks 分隔符，默认为;
 * @param {*} checkRepeat 是否判断重复
 * @param {*} msg 提示语
 * @returns
 */
export const ports = {
  repeatArr: [],
  all(str, splitChunks = ";", checkRepeat = true, msg) {
    return valid.validMultiple.all(
      str,
      valid.port,
      splitChunks,
      checkRepeat,
      false,
      transCompText(
        "The start port number must be smaller than the end port number."
      ),
      transCompText("The port is duplicated."),
      msg
    );
  }
};

/**
 * 校验必须为n的倍数
 * @param {String} str - 需要检验的字符串
 * @param {number} n - n 为底数
 */
export function nMultiple(str, n) {
  if (!/^([-0-9])?([0-9]+)$/.test(str)) {
    return transCompText("请输入数字");
  }
  if (str % n !== 0) {
    return transCompText("请输入%s的倍数", [n]);
  }
}
