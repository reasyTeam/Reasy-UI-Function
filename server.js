const express = require("express");
const request = require("request");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const upload = multer({
  dest: "uploads/"
});

//let AES_KEY;
//是否使用缓存数据
let IS_CACHE_DATA = true;
const app = express();
const port = 9999;

//代理服务器
const proxy_url = "http://172.16.30.64:3000/mock/210/";

let bodyParser = require("body-parser");
// create application/json parser
let jsonParser = bodyParser.json();
// create application/x-www-form-urlencoded parser
//var urlencodedParser = bodyParser.urlencoded({ extended: false })

let DATA = {}; //存储的数据
let promiseList = [];

function readData() {
  let rootPath = path.resolve("./data.json");
  if (!fs.existsSync(rootPath)) {
    return;
  }
  try {
    DATA = JSON.parse(fs.readFileSync(rootPath));
  } catch (e) {
    DATA = {};
  }
}

function getData(name) {
  let options = {
    headers: {},
    url: proxy_url + name,
    method: "get",
    json: true,
    timeout: 5000
  };

  let promise1 = new Promise(resolve => {
    request(options, function (error, response, body) {
      if (!error) {
        if (body.errcode == 404) {
          resolve();
        } else {
          resolve(body);
        }
      } else {
        resolve({
          [name]: {}
        });
      }
    });
  });

  promiseList.push(promise1);
}

function setData(submitData, originData) {
  if (Array.isArray(submitData)) {
    for (let i = 0; i < submitData.length; i++) {
      let action = submitData[i].action;
      if (action) {
        if (action === "delete") {
          const findId = item => item.ID === submitData[i].ID;
          let index = originData.findIndex(findId);
          originData.splice(index, 1);
        } else if (action === "edit") {
          const findId = item => item.ID === submitData[i].ID;
          let index = originData.findIndex(findId);
          delete submitData[i].action;
          Object.assign(originData[index], submitData[i]);
        } else if (action === "add") {
          submitData[i].ID = Math.random() * 1000000000;
          delete submitData[i].action;
          originData.push(submitData[i]);
        }
      } else {
        if (i === 0) {
          //清空
          originData.splice(0);
        }
        originData.push(submitData[i]);
      }
    }
  } else if (typeof submitData === "object") {
    for (let prop in submitData) {
      if (typeof submitData[prop] === "object") {
        setData(submitData[prop], originData[prop]);
      } else {
        originData[prop] = submitData[prop];
      }
    }
  } else {
    originData = submitData;
  }
  return originData;
}

function setServer() {
  app.get("/goform/saveMockData", (req, res) => {
    //console.log("req.query=", req.query);
    // console.log("save data start");
    writeDta(function () {
      res.send("save success");
    });
  });

  app.post("/goform/getItems", jsonParser, (req, res) => {
    let data = req.body;
    if (!DATA.items) {
      DATA.items = {};
    }
    let result = {};
    for (let prop in data) {
      result[prop] = DATA.items[prop] || [];
    }
    res.send(result);
  });

  app.post("/goform/setItems", jsonParser, (req, res) => {
    let data = req.body;
    if (!DATA.items) {
      DATA.items = {};
    }
    for (let prop in data) {
      DATA.items[prop] = data[prop] || [];
    }

    res.send({
      errCode: 0
    });
  });

  app.post("**/goform/getModules", jsonParser, (req, res) => {
    let modules = [];

    // 清除之前的promise
    promiseList = [];
    // console.log(req.body);
    if (!req.body) {
      return;
    }
    modules = Object.keys(req.body);

    function sendData() {
      let sendObj = {};
      modules.forEach(item => {
        if (!DATA[item]) {
          sendObj[item] = {};
        } else {
          if (Array.isArray(DATA[item])) {
            sendObj[item] = DATA[item];
          } else {
            sendObj[item] = Object.assign({}, DATA[item]);
          }
        }
      });
      //setTimeout(() => {
      res.send(sendObj);
      //}, 2000);
    }

    modules.forEach(item => {
      if (!IS_CACHE_DATA) {
        delete DATA[item];
      }
      if (!DATA[item]) {
        getData(item);
      }
    });

    //对比现有数据字段与获取的数据字段是否一致，不一致时取获取回来的字段，值为现有字段数据
    Promise.all(promiseList).then(values => {
      values.forEach(item => {
        let name;
        for (let prop in item) {
          name = prop;
          break;
        }

        if (name) {
          let obj = null;
          //数组时
          if (Array.isArray(item[name])) {
            if (!DATA[name] || DATA[name].toString() === "[object Object]") {
              obj = item[name];
            } else {
              obj = DATA[name];
            }
          } else {
            obj = {};
            for (let key in item[name]) {
              //有原始数据时，取原始数据值
              if (DATA[name] && DATA[name][key] !== undefined) {
                obj[key] = DATA[name][key];
              } else {
                obj[key] = item[name][key];
              }
            }
          }

          DATA[name] = obj;
        }
      });
      sendData();
    });
  });

  //设置数据
  app.post("/goform/setModules", jsonParser, (req, res) => {
    let data = req.body;

    // for (let prop in data) {
    //   if (DATA[prop]) {
    //     // Object.assign(DATA[prop], data[prop]);

    //     if (Array.isArray(data[prop])) {
    //       //数组时
    //       DATA[prop] = data[prop];
    //     } else {
    //       Object.assign(DATA[prop], data[prop]);
    //     }
    //   }
    // }
    if (IS_CACHE_DATA) {
      // IPv6 LAN WAN时没有ID和action导致数据错误，此处单独处理
      if (data.ipv6Wan) {
        let wanIndexObj = DATA.ipv6Wan.filter(
          item => item.wanIndex == data.ipv6Wan[0].wanIndex
        )[0];
        if (wanIndexObj) {
          Object.assign(wanIndexObj, data.ipv6Wan[0]);
        }
        delete data.ipv6Wan;
      }
      if (data.ipv6Lan) {
        let lanIndexObj = DATA.ipv6Lan.filter(
          item => item.vlanName == data.ipv6Lan[0].vlanName
        )[0];
        if (lanIndexObj) {
          Object.assign(lanIndexObj, data.ipv6Lan[0]);
        }
        delete data.ipv6Lan;
      }

      if (data.loginAuth) {
        let originPwd = "YWRtaW4=";
        let result = 0;
        let pwd = data.loginAuth.password;
        if (pwd !== originPwd) {
          result = 1;
        }
        if (result === 0) {
          res.send({
            errCode: result
          });
        } else {
          res.send({
            errCode: result
          });
        }
        delete data.loginAuth;
        return;
      }

      setData(data, DATA);
    }

    let sendData = { errCode: 0 };
    if (data.systemReset) {
      sendData = { errCode: 102 };
    }

    res.send(sendData);
  });

  //本地升级接口
  app.post("/cgi-bin/upgrade", upload.single("file"), (req, res) => {
    res.send({
      errCode: 0
    });
  });

  //特征库升级
  app.post("/cgi-bin/UpgradeUrl", upload.single("file"), (req, res) => {
    res.send({
      errCode: 0
    });
  });

  // 配置恢复接口
  app.post("/cgi-bin/UploadCfg", upload.single("file"), async (req, res) => {
    res.send({
      error: 0
    });
  });

  //下载文件接口
  app.use("/cgi-bin/download", express.static(__dirname + "/downloads"));
  app.use("/cgi-bin/DownloadCfg", express.static(__dirname + "/downloads"));
  app.use(
    "/cgi-bin/downloadPacket",
    express.static(__dirname + "/downloads/2022-09-22-16-27-11-1.pcap")
  );

  app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
  });

  // parse application/x-www-form-urlencoded
  //app.use(bodyParser.urlencoded({ extended: false }));
  // parse application/json
  app.use(bodyParser.json());
}

function writeDta(callback) {
  let rootPath = path.resolve("./data.json");
  fs.writeFileSync(rootPath, JSON.stringify(DATA, null, 2));
  callback();
}

readData();
setServer();
