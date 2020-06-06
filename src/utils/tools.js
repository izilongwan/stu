import XLSX from 'xlsx';
import md5 from 'js-md5'

export default {
  calculateColor (num) {
    switch (num) {
      case 0:
        return 'zore';
        break;
      case 1:
        return 'one';
        break;
      case 2:
        return 'two';
        break;
      case 3:
        return 'three';
        break;
      case 4:
        return 'four';
        break;

      default:
        break;
    }
  },

  getObjURL (file) {
    if (window.createObjectURL !== undefined) {
      return window.createObjectURL(file);
    }

    if (window.URL !== undefined) {
      return window.URL.createObjectURL(file);
    }

    if (window.webkitURL !== undefined) {
      return window.webkitURL.createObjectURL(file);
    }
  },

  flatObject (opts) {
    const { data, keySeperator = '.', arrSeperator } = opts;
    const toStr = {}.toString;

    return data.map(item => func(item));

    function func (obj, res = {}, qd = '') {
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          const value = obj[key];

          const prop = qd ? qd + keySeperator + key : key;

          if (typeof value !== 'object') {
            res[prop] = value;
            continue;
          }

          if (toStr.call(value) === '[object Array]') {
            res[prop] = arrSeperator
              ? value.join(arrSeperator)
              : value;
            continue;
          }

          func(value, res, prop);
        }
      }

      return res;
    }
  },

  transferObject (opts) {
    const { data, keySeperator = '.', arrSeperator } = opts;

    return data.map(item => func(item));

    function func (obj, res = {}) {
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          const value = obj[key];

          if (!key.includes(keySeperator)) {
            res[key] = arrSeperator && typeof value === 'string' && value.includes('_')
              ? value.split(arrSeperator)
              : value;

            continue;
          }

          const [prop, ...arr] = key.replace(keySeperator, ' ').split(' ');

          !res[prop] && (res[prop] = {});

          const temp = { [arr]: value };

          func(temp, res[prop]);
        }
      }

      return res;
    }
  },

  readWorkbookFromLocalFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = function(e) {
        const data = e.target.result;
        const workbook = XLSX.read(data, {type: 'binary'});
        resolve(workbook);
      };
      reader.readAsBinaryString(file);
    })
  },

  readWorkbook(workbook) {
    const sheetNames = workbook.SheetNames, // 工作表名称集合
          worksheet = workbook.Sheets[sheetNames[0]]; // 这里我们只读取第一张sheet

    return worksheet;
  },

  csvToTable (csv) {
    var html = '<table contentEditable>';
    var rows = csv.split('\n');
    rows.pop(); // 最后一行没用的
    rows.forEach(function (row, idx) {
      var columns = row.split(',');
      columns.unshift(idx + 1); // 添加行索引
      if (idx == 0) { // 添加列索引
        html += '<tr>';
        for (var i = 0; i < columns.length; i++) {
          html += '<th>' + (i == 0 ? '' : String.fromCharCode(65 + i - 1)) + '</th>';
        }
        html += '</tr>';
      }
      html += '<tr>';
      columns.forEach(function (column) {
        html += '<td>' + column + '</td>';
      });
      html += '</tr>';
    });
    html += '</table>';
    return html;
  },

  csvToArr (csv) {
    const arr = csv.replace(/\n$/, '').split('\n');
    const fArr = [];

    arr.forEach(item => {
      const cItem = item.split(',');
      fArr.push(cItem);
    })
    return fArr;
  },

  sheetToCsv (sheet) {
    return XLSX.utils.sheet_to_csv(sheet)
  },

  sheetToJson (sheet) {
    return XLSX.utils.sheet_to_json(sheet);
  },

  jsonToSheet (arr) {
    return XLSX.utils.json_to_sheet(arr);
  },

  sheetToBlob (sheet, sheetName) {
    sheetName = sheetName || 'sheet1';
    var workbook = {
      SheetNames: [sheetName],
      Sheets: {}
    };
    workbook.Sheets[sheetName] = sheet;
    // 生成excel的配置项
    var wopts = {
      bookType: 'xlsx', // 要生成的文件类型
      bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
      type: 'binary'
    };
    var wbout = XLSX.write(workbook, wopts);
    var blob = new Blob([s2ab(wbout)], { type: "application/octet-stream" });
    // 字符串转ArrayBuffer
    function s2ab (s) {
      var buf = new ArrayBuffer(s.length);
      var view = new Uint8Array(buf);
      for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
      return buf;
    }
    return blob;
  },

  openDownloadDialog (url, saveName) {
    if (typeof url == 'object' && url instanceof Blob) {
      url = this.getObjURL(url); // 创建blob地址
    }
    var aLink = document.createElement('a');
    aLink.href = url;
    aLink.download = saveName || ''; // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，file:///模式下不会生效
    aLink.click();
  },

  checkIdCard (str) {
    const reg = /^[1-9]\d{5}(19|20)\d{2}(0[1-9]|1[0-2])([0-2][1-9]|[1-3]0)\d{3}[xX\d]$/;
    return reg.test(str);
  },

  accessRoutes (routes, role, name) {
    if (!name) {
      return false;
    }

    return routes.some(val => {
      if (val.name === name) {
        return val.meta.access ? val.meta.access.includes(role) : true;
      }

      return val.children && this.accessRoutes(val.children, role, name);
    })
  },

  deepClone (org, tar = {}) {
    const typeArray = '[object Array]',
      toStr = {}.toString;

    for (const key in org) {
      if (org.hasOwnProperty(key)) {
        const res = org[key];

        if (res && typeof (res) === 'object') {
          tar[key] = toStr.call(res) === typeArray ? [] : {};
          this.deepClone(res, tar[key]);
        } else {
          tar[key] = res;
        }
      }
    }

    return tar;
  },

  debounce (fn, delay = 500, immediate = false) {
    let res = null,
      t = null;

    function later (...args) {
      t = setTimeout(() => {
        res = fn.apply(this, args);
        debounced.onremove();
      }, delay);
    }

    const debounced = function (...args) {
      if (!t) {
        immediate ? res = fn.apply(this, args) : later.apply(this, args);
      } else {
        debounced.onremove();
        later.apply(this, args);
      }

      return res;
    }


    debounced.onremove = () => {
      clearTimeout(t);
      t = null;
    }

    return debounced;
  },

  printEvent (beforePrint, afterPrint) {
    if (window.matchMedia) {
      const mediaQueryList = window.matchMedia('print');
      mediaQueryList.addListener(({matches}) => {
        matches ? beforePrint() : afterPrint();
      });
    }

    window.onbeforeprint = beforePrint;
    window.onafterprint = afterPrint;
  },

  encrypto (str) {
    return md5.create().update(str.toString()).hex();
  }
};
