export default {
  isObject: {
    args: `/**
* @method [判断是不是对象类型]
* @param {*} target 需要判断的对象
* @returns {Boolean} 是对象返回 true 不是返回false
*/`
  },
  isArray: {
    args: `/**
* @method [判断是不是数组类型]
* @param {*} target 需要判断的数组
* @returns {Boolean} 是数组返回 true 不是返回false
*/`
  },
  isFunction: {
    args: `/**
* @method [判断是不是函数类型]
* @param {*} target 需要判断的函数
* @returns {Boolean} 是函数返回 true 不是返回false
*/`
  },
  extend: {
    args: `/**
* @method [合并对象]
* @param args 需要合并的对象
* @returns {Object} 合并后的对象
*/`
  },
  copy: {
    args: `/**
* @method [复制且合并多个对象]
* @param args 需要复制的一个或多个对象
* @returns {Object/Array} 复制后的对象或数组
*/`
  },
  getGuid: {
    args: `/**
* @method [获取唯一ID]
* @param {Number} len [id 长度 默认64]
* @param {Number} radix [偏移]
* @returns {String} 返回唯一ID
*/`
  },
  isEmpty: {
    args: `/**
* @method [判断目标是否为空，包括空数组，空对象，undefined，null]
* @param {*} target 判断目标
* @returns {Boolean} 为空返回true
*/`
  },
  isType: {
    args: `/**
* @method [判断目标类型]
* @param {*} target [判断目标]
* @param {String} type [指定类型，支持 number，array，object，null，undefined，string]
* @return {Boolean} 是指定类型返回true，否则返回false
*/`
  },
  trim: {
    args: `/**
* 去除首尾空格 两个空格会替换成一个
* @param {String} string 需要处理的字符串
* @returns {String} 返回去除了首尾空格的字符串
*/`
  },
  hasClass: {
    args: `/**
* @method [判断是否有class]
* @param {string} cls
*/`
  },
  addClass: {
    args: `/**
* @method [添加class]
* @param {string} cls
*/`
  },
  removeClass: {
    args: `/**
* @method [移除class]
* @param {string} cls
*/`
  },
  debounce: {
    args: `/**
* @method [防抖]
* @param {Function} fn - [需要防抖的函数]
* @param {Number} wait - [防抖时间]
* @param {Boolean} immediately - [是否立即执行一次]
* @returns {Function} 返回处理了防抖的函数
*/`
  },
  throttle: {
    args: `/**
* @method [节流]
* @param {Function} fn - [需要节流的函数]
* @param {Number} wait - [节流时间]
* @param {Boolean} immediate - [是否立即执行一次]
* @returns {Function} 返回处理了节流的函数
*/`
  },
  setCookie: {
    args: `/**
* @method [设置cookie中存值]
* @param {String} cname -[cookie中的key]
* @param {String} cvalue [cookie中的value]
*/`
  },
  getCookie: {
    args: `/**
* @method [获取cookie中存值]
* @param {String} cname [key]
* @returns {String} cookie中存储的值 或者 空
*/`
  },
  getSessionStorage: {
    args: `/**
* @method [获取sessionStorage的值]
* @param {String} name [key]
* @returns {String} 获得sessionStorage的值
*/`
  },
  setSessionStorage: {
    args: `/**
* @method [设置sessionStorage的值]
* @param {String} name [key]
* @param {String} value [value]
*/`
  },
  removeSessionStorage: {
    args: `/**
* @method [删除sessionStorage的值]
* @param {String} name [key]
* @returns
*/`
  },
  formatSeconds: {
    args: `/**
* @method [时间单位转换]
* @param {Number} value - [值，单位s]
* @param {Boolean} hasSecond - [显示是否显示到秒]
* @returns {String} 天小时分钟秒
*/`
  },
  formatDate: {
    args: `/**
* @method [将时间对象转成固定格式字符串返回]
* @param {Date} date [Date 格式]
* @param {String} fmt [转换格式]
* @returns
*/`
  },
  parseDateToObj: {
    args: `/**
* @method [解析字符串为年月日]
* @param {String} str [需要解析的字符串]
* @param {String} fmt [时间格式]
* @returns {Object} 包含年月日时分秒数据的对象
*/`
  },
  parseDateToNum: {
    args: `/**
* @method [解析字符串为对应的时间戳]
* @param {String} str [需要解析的字符串]
* @param {String} fmt [时间格式]
* @returns {Number} 时间戳
*/`
  },
  parseTimeToNum: {
    args: `/**
* @method [解析字符串为对应的时间] 单位s
* @param {String} str [需要解析的字符串]
* @param {String} fmt [时间格式]
* @returns {Number} 时间
*/`
  },
  formatSpeed: {
    args: `/**
* @method [把速度转换到合适的单位]
* @param {Number} data 速度
* @param {String} goalUnit 原单位可选B，b
* @returns {String} 合适的单位
*/`
  },
  getNumList: {
    args: `/**
* todo 没看懂
* @method [合并端口，并输出以-连接的端口]
* @param {Array} list
* @param {Object} [config={}] [joiner : 连接符 默认- spliter：分隔符默认,data :数据对象]
* @return {String} 输出以-连接的端口
*/`
  },
  getTimezone: {
    args: `/**
* @method [返回当前地区对应的时区]
* @returns {String} 时区格式为 +08:00
*/`
  },
  getPwdLevel: {
    args: `/**
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
*/`
  },
  transMac: {
    args: `/**
* @method [把mac地址转换为:连接]
* @param {String} mac [需要转换的字符串]
* @returns {String} 转换后的mac地址串
*/`
  },
  transMacs: {
    args: `/**
* @method [把多个mac地址转换为:连接]
* @param {String} macs [需要转换的字符串]
* @param {String} splitStr 分隔符
* @returns {String} 转换后的多个mac地址字符串
*/`
  },
  toHtmlCode: {
    args: `/**
* @method [将字符串转码]
* @param { String } str [需要转换的字符串]
* @returns 转换后字符串
*/`
  },
  translateSpaceToHtml: {
    args: `/**
* @method [把空格转换成&nbsp;]
* @param {String} str [需要转换的字符串]
* @returns 转换后字符串
*/`
  },
  translateWrapToHtml: {
    args: `/**
* @method [\\r\\n \\n  \\t 转换成 \\\\r\\\\n \\\\n  \\\\t]
* @param {String} str [需要转换的字符串]
* @returns 转换后字符串
*/`
  },
  getUtf8Length: {
    args: `/**
* @method [计算utf-8的字节长度]
* @param {String} str
* @returns {Number} 字节长度
*/`
  },
  cutStrEmoji: {
    args: `/**
* @description 删除最后字符串，如果是表情，则多删除一位（表情包长度不止1位，导致出现乱码情况）
* @param {String} str
* @returns {String} 去除视觉上的最后一位字符
*/`
  },
  cutStrLen: {
    args: `/**
* @description 截取指定长度的字符串
* @param {String} str 需要截取的字符串
* @param {Number} len 长度
* @returns {String} 截取指定长度的字符串
*/`
  },
  trimStartEndStr: {
    args: `/**
* 去除前后空格
* @param {String} str 需要去除的字符串
* @returns {String} 去除前后空格
*/`
  },
  translatePassword: {
    args: `/**
* 密码转换成****号， admin的时候不转换
* @param {String} pwd
* @param {Boolean} isSupperAdmin
* @returns  {String} 如果isSupperAdmin 不转换直接返回密码 如果!isSupperAdmin,转换成同样位数的星号
*/`
  },
  firstLower: {
    args: `/**
* @method [首字母小写，排除大写专有词汇]
* @param {String} str
* @returns {String} [小写字母后的字符串]
*/`
  },
  uniqueArr: {
    args: `/**
* 数组去重
* @param {Array} arr 需要去重的数组
* @param {String} prop 数组对象key值
* @param {Boolean} ignoreCase 是否忽略大小写
* @returns 去重后的数组
*/`
  },
  minusArr: {
    args: `/**
* 差集 返回数组A中去掉与数组B有相同prop值的选项
* @param {Array} a
* @param {Array} b
* @param {String} prop 数组对象key值
* @param {Boolean} ignoreCase 是否忽略大小写
* @returns {Array} a中去掉b中已有的数据
*/`
  },
  unionArrs: {
    args: `/**
* 并集并且唯一 返回数组A + B 中并且去掉相同prop值的选项
* @param {Array} a
* @param {Array} b
* @param {String} prop 数组对象key值
* @param {Boolean} ignoreCase 是否忽略大小写
* @returns {Array} 合并且去重后的数组
*/`
  },
  intersectArr: {
    args: `/**
* 两个数组交集 相同的部分
* @param {Array} a
* @param {Array} b
* @returns {Array} a与b中相同的部分
*/`
  },
  arrayToObject: {
    args: `/**
* 数组转成对象数组 转换成 { key : value}形式 默认可以从options中提取
* @param {Array} arr 要转换的数组对象
* @param {String} key 对象中key对应的arr中对象的prop
* @param {String} value 对象中value对应的arr中对象的prop
* @returns {Object} 映射对象
*/`
  },
  checkIpInSameSegment: {
    args: `/**
* @method [checkIpInSameSegment] [用于判断两个IP地址是否同网段]
* @param  {string} ip_lan   [lan口IP地址]
* @param  {string} mask_lan [lan口子网掩码]
* @param  {string} ip_wan   [wan口IP地址]
* @param  {string} mask_wan [wan口子网掩码]
* @return {booleans}        [若在同一网段，则返回true, 不在同一网段，返回false]
*/`
  },
  validIpInSameSegment: {
    args: `/**
* @method [用于判断两个IP地址是否同网段]
* @param  {string} ip_first   [被检测IP]
* @param  {string} mask_first [被检测子网掩码]
* @param  {string} ip_second   [检测IP]
* @param  {string} mask_second [检测子网掩码]
* @param  {string} text_first [被检测IP描述]
* @param  {string} text_second [检测IP描述]
* @return {string}             [返回校验错误，没有则返回空]
*/`
  },
  checkIsValidIpMask: {
    args: `/**
* @method [检查IP地址是否为网段或广播IP合法性]
* @param  {string} ip   [IP地址]
* @param  {string} mask [子网掩码]
* @param  {string} str  [提示信息，用于表示ip是什么地址]
* @return {string}      [若检查有错，则返回报错提示语。否则，返回为空]
*/`
  },
  checkIpComparison: {
    args: `/**
* @method [判断IP地址的大小]
* @param  {string} ip   [IP地址]
* @param  {string} ip   [ip地址]
* @return {Boolean}      [ ipFirst > ipSecond 若大于，则返回true。否则，返回false]
*/`
  },
  ipToInt: {
    args: `/**
* @method [ip转数字]
* @param {String} ip [IP地址]
* @returns {Number} ip的数字大小
*/`
  },
  toDotMask: {
    args: `/**
* 将位数转化为掩码地址 24=>255.255.255.0
* @param {Number} num 长度
* @returns {String}
*/`
  },
  getNetwork: {
    args: `/**
*  计算网络地址
* @param {String} ip IP地址
* @param {String} mask 子网掩码
* @param {Boolean} hasValid 是否返回最小有效位 加一
* @returns {String} 返回网络地址 或者网络地址加1
*
*/`
  },
  getBroadcast: {
    args: `/**
* 计算广播地址
* @param {String} ip IP地址
* @param {String} mask 子网掩码
* @param {Boolean} hasValid 是否返回最大有效位 减一
* @returns {String} 返回广播地址
*/`
  },
  getBigRange: {
    args: `/**
* ip1, ip2, ip3 返回 ip1-ip2 或者 ip2~ip3
* 用于dhcp计算范围 返回大一点的范围
* @param {String} ip1 开始IP地址
* @param {String} ip2 lanip
* @param {String} ip3 结束IP地址
* @returns {Array} [ip1,ip2] 或者 [ip2,ip3] 并且去除ip2的有效范围
*/`
  },
  checkIpv6InSameSegment: {
    args: `/**
* 判断ipv6是否不同网段
* @param {String} addr1 ipv6地址1
* @param {String} addr2 ipv6地址2
* @param {String} prefixLen1 ipv6前缀1
* @param {String} prefixLen2 ipv6前缀2
* @returns {boolean} [若相同 返回true 若不同返回 false]
*/`
  },
  getFullIpv6: {
    args: `/**
* @method 计算完整的ipv6地址，并去掉:
* @param {addr} ipv6地址
*/`
  },
  compareIpv6: {
    args: `/**
* 比较ipv6大小
* @param {String} addr1 ipv6地址1
* @param {String} addr2 ipv6地址2
* @returns {boolean} 如果addr1大 返回true
*/`
  }
};
