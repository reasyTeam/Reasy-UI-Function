export default {
  len: {
    label: "len 字符长度限制",
    args: "@param {Number} min - 最小输入字符数 \n@param {Number} max - 最大输入字符数"
  },
  byteLen: {
    args: `byteLen 校验字符串字节长度
* @param {String} str - 需要检验的字符串
* @param {Number} min - 最小输入字节数
* @param {Number} max - 最大输入字节数`
  },
  num: {
    args: `* 校验整数大小范围
* @param {String} str - 需要检验的字符串
* @param {number/Array} min - 最小值或者数字范围的数组，数组每一项可以是单个数字也可以是个数组表示范围
* @param {number} max - 最大值`
  },
  even: {
    args: `* 校验整数大小范围 并且必须为偶数
* @param {String} str - 需要检验的字符串
* @param {number/Array} min - 最小值或者数字范围的数组，数组每一项可以是单个数字也可以是个数组表示范围
* @param {number} max - 最大值`
  },
  float: {
    args: `* 浮点型数字大小
* @param {String} str - 需要检验的字符串
* @param {number/Array} min - 最小值或者数字范围的数组，数组每一项可以是单个数字也可以是个数组表示范围
* @param {number} max - 最大值`
  },
  range: {
    args: `* 检验是否在范围内
* @param {String} str - 需要检验的字符串
* @param {Array} rangeArr - 数字范围的数组，数组每一项可以是单个数字也可以是个数组表示范围`
  },
  port: {
    args: `* [验证单个数字或数字范围，如端口范围设置（xx 或 xx-xxx）]
* @param {String} str - 需要检验的字符串
* @param {Number} min - 最小输入数字
* @param {Number} max - 最大输入数字`
  },
  tree: {
    args: `* 校验XX.XX.XX.XX 这种格式
* @param {String} str - 需要检验的字符串`
  },
  mask: {
    args: `* 校验子网掩码
* @param {String} str - 需要检验的字符串
* @param {String} isAll 表示是否支持0.0.0.0`
  },
  ip: {
    args: `* 校验ip地址
* @param {String} str - 需要检验的字符串
* @param {Boolean} isAllowZero - 是否支持 0.0.0.0
* @param {Boolean} isAllowAll - 是否支持全部ip`
  },
  mac: {
    args: `* 校验mac地址
* @param {String} str - 需要检验的字符串
* @param {String} splitChunks - 分隔符 默认支持全部 空或者-或：`
  },

  email: {
    args: `* 校验邮箱`
  },
  phone: {
    args: `* 校验手机号`
  },
  url: {
    args: `* 校验url`
  },
  dateTime: {
    args: `* 校验日期时间 1922-02-33 22:02:33`
  },
  ascii: {
    args: `* 校验ascii
* @param {String} str - 需要检验的字符串
* @param {Number} min - 最小输入字符数
* @param {Number} max - 最大输入字符数`
  },
  asciiDisplayChar: {
    args: `* ASCII可视字符校验
* @param {String} str - 需要检验的字符串
* @param {Number} min - 最小输入字符数
* @param {Number} max - 最大输入字符数`
  },
  hex: {
    args: `* 校验hex码`
  },
  domain: {
    args: `* 校验域名 (可支持ip)
* @param {String} str - 需要检验的字符串
* @param {boolean} isSupportIP - 是否支持ip`
  },
  allBlank: {
    args: `* 校验全空白字符
* @param {String} str - 需要检验的字符串`
  },
  noBlank: {
    args: `* 校验不能有空白字符`
  },
  ipv6Header: {
    args: `* 校验ipv6 头部 就是前四位`
  },
  ipv6Value: {
    args: `* 校验ipv6 除头部以外 格式是否正确`
  },
  ipv6Prefix: {
    args: `* 校验ipv6 前缀格式是否正确，并且只有前缀`
  },
  ipv6: {
    args: `* 校验ipv6 完整格式`
  },
  ipv6LocalLink: {
    args: `* 校验ipv6 支持本地链路格式 与ipV6的区别 可以支持FE80开头的本地链路地址`
  },
  validMultiple: {
    args: `校验多个 支持范围`
  },
  ips: {
    args: `* 校验多个 ip 支持   ip;ip~ip2;ip3 或 ip1;ip2;ip3
* @param {String} str - 需要检验的字符串
* @param {*} splitChunks 分隔符，默认为;
* @param {*} checkRepeat 是否判断重复
* @param {*} hasRange 是否支持范围
* @param {*} msg 提示语`
  },
  macs: {
    args: `* 校验多个 mac 支持   mac;mac3;mac2~mac4 或 mac1;mac2;mac3
* @param {String} str - 需要检验的字符串
* @param {*} splitChunks 分隔符，默认为;
* @param {*} checkRepeat 是否判断重复
* @param {*} hasRange 是否支持范围
* @param {*} msg 提示语`
  },
  phones: {
    args: `* 校验多个 手机号 支持   phone1;phone2;phone3
* @param {String} str - 需要检验的字符串
* @param {*} splitChunks 分隔符，默认为;
* @param {*} checkRepeat 是否判断重复
* @param {*} msg 提示语`
  },
  ports: {
    args: `* 校验多个 端口 支持    port;port3;port2~port4 或 port1;port2;port3
* @param {String} str - 需要检验的字符串
* @param {*} splitChunks 分隔符，默认为;
* @param {*} checkRepeat 是否判断重复
* @param {*} msg 提示语`
  },
  nMultiple: {
    args: `* 校验必须为n的倍数
* @param {String} str - 需要检验的字符串
* @param {number} n - n 为底数`
  },
  ssid: {
    args: `* 1-32个字节，首尾不能输入空格，可见ascii范围或者中文字符
* @param {String} str - 需要检验的字符串
* @param {Number} min - 最小输入字符数
* @param {Number} max - 最大输入字符数`
  },
  ssidPwd: {
    args: `* 校验8-63位ascii 码或8-64位hex码`
  },
  wep: {
    args: `* 校验只能输入5或者13位ASCII码字符或10或26位十六进制数`
  },
  password: {
    args: `* 校验只能输入数字、字母和下划线
* @param {String} str - 需要检验的字符串
* @param {Number} min - 最小输入字符数
* @param {Number} max - 最大输入字符数`
  },
  userPwd: {
    args: `* 校验ascii密码并且不包含空格
* @param {String} str - 需要检验的字符串
* @param {Number} min - 最小输入字符数
* @param {Number} max - 最大输入字符数`
  },
  uniqueCode: {
    args: `* 校验只能输入数字和字母组合
* @param {String} str - 需要检验的字符串
* @param {Number} min - 最小输入字符数
* @param {Number} max - 最大输入字符数`
  },
  onlySpecific: {
    args: `* 校验不能只输入xxx字符
* @param {String} str - 需要检验的字符串
* @param {String} arg - 字符`
  },
  noSpace: {
    args: `* 校验前后不能输入空格`
  },
  numAndLetter: {
    args: `* 校验只能输入数字和字母`
  },
  vlanName: {
    args: `* 校验只能输入数字和字母中划线`
  },
  normarlChars: {
    args: `* 校验只能输入数字、字母、下划线或中划线`
  },
  normarlChars2: {
    args: `* 只能输入数字、字母、下划线、中划线或英文句点`
  },
  normarlChars3: {
    args: `* 只能输入中文字符、数字、字母、下划线、中划线、空格或英文句点`
  },
  normarlChars4: {
    args: "* 请输入数字、大小写字母及特殊字符!@#$%^*()_+{}|:&?`-=[]./"
  },
  notSpecialChars: {
    args: `* 校验不能只输入xxx字符
* @param {String} str - 需要检验的字符串
* @param {String} arg - 不允许输入的字符`
  },
  acsUrl: {
    args: `* 支持输入数字、大小写字母及特殊字符.:-_/
* @param {String} str - 需要检验的字符串`
  },
  sameStr: {
    args: `* 比较相同字符串
* @param {String} str1 - 需要检验的字符串
* @param {String} str2 - 需要检验的字符串
* @param {String} msg - 错误提示`
  },
  validOrArrs: {
    args: `* 支持多个校验一个成功即可 例如 域名或ip  mac和ip等等
* @param {String} str - 需要检验的字符串
* @param {Array} valids - 支持的校验方法，配置格式 支持函数或对象方式[function, {type:"ip",args:[true]}]
* @param {String} msg - 错误提示`
  },
  ipCompare: {
    args: `* 比较IP地址大小
* @param {String} ip1 - IP地址1
* @param {String} ip2 - IP地址2
* @param {String} msg - 错误提示`
  }
};
