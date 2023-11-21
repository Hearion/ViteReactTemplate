import aesFun from "@/utils/aes.js";
import dayjs from "dayjs";
import saveAs from "@/utils/FileSaver.js";
import * as XLSX from "xlsx";

//禁用汉字
export const NoChineseReg = /^[^\u4e00-\u9fa5]+$/;
//正则11位数字第一位为1
export const phoneReg = /^1\d{10}$/;
//验证身份证有效
export const validCardId = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
//判断邮箱
export const validEmail = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([\.]\w+)*/;

// 加密
export const aesFunContent = (content) => {
    let aesContent = aesFun.Encrypt(content);
    aesContent = aesContent.split('+');
    aesContent = aesContent.join("[add]")
    return aesContent;
    // return content;
}

// 获取一天中的时段
export const getTimeSlot = () => {
    return new Promise((resolve, reject) => {
        // 创建一个新的 Date 对象，表示当前时间
        const currentDate = new Date();

        // 获取当前时间的小时
        const currentHour = currentDate.getHours();

        // 根据小时判断所处时间段
        let timePeriod;
        if (currentHour >= 0 && currentHour < 12) {
            timePeriod = '上午';
        } else if (currentHour >= 12 && currentHour < 18) {
            timePeriod = '下午';
        } else {
            timePeriod = '晚上';
        }

        resolve(timePeriod)
    })
}

// 获取年月日 时分秒
export const getNowTime = () => {
    // 创建一个Date对象
    const now = new Date();

    // 获取当前时间的各个部分(年、月、日、时、分、秒)
    const year = now.getFullYear();
    const month = now.getMonth() + 1; // 月份从0开始，所以需要加1
    const day = now.getDate();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    return {
        year,
        month,
        day,
        hours,
        minutes,
        seconds
    }
}

// 防抖
export function debounce(func, delay = 500) {
    let timerId;
    return function (...args) {
        clearTimeout(timerId);
        timerId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

//获取集合中，对应的属性的值。其中property为空时，取值为对应value
export const getArrObjectByProperty = (arr, property, value) => {
    return arr?.find(data => property ? data[property] == value : data == value) || null;
};

// 文件转Base64
export const getBase64 = (img, callback) => {
    let reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
};

/**
 * 文件转Base64 异步
 * @param img
 * @param callback
 */
export const getBase64Sync = (img, callback) => {
    return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.addEventListener('load', () => resolve(reader.result));
        reader.addEventListener('error', reject);
        reader.readAsDataURL(img);
    });
};

/**
 * 格式化时间
 * @param date
 * @param type
 * @returns {string}
 */
export const formatDate = (date, type) => {
    return dayjs(date).format(type);
};

//判断有效时间（年月日）
export const validDate = (value) => {
    let reg = /^(?:(?!0000)[0-9]{4}(\/|\-|\.)(?:(?:0[1-9]|[1-9]|1[0-2])\1(?:[1-9]|0[1-9]|1[0-9]|2[0-8])|(?:[13-9]|0[13-9]|1[0-2])\1(?:29|30)|(?:[13578]|0[13578]|1[02])(?:\1)31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)(\/|\-|\.)(?:02|2)(?:\2)29)$/;
    return reg.test(value);
};

//正则正整数和零
export const integerReg = (value) => {
    let reg = /^([1-9][0-9]*)$/;
    return reg.test(value);
};

//验证身份证有效并且获得性别(sex)，出生日期(birthday)
export const validCardIdFun = (cardId) => {
    let reg = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
    if (!reg.test(cardId))
        return false;

    if (cardId.length === 15)
        cardId = cardId.substr(0, 6) + "19" + cardId.substr(6, 9);
    let args = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    let sum = 0;
    for (let i = 0; i < 17; i++) {
        sum += args[i] * parseInt(cardId.substring(i, i + 1));
    }
    sum = sum % 11;
    let args1 = ["1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2", "x"];
    if (cardId.length == 17) {
        cardId = cardId + args1[sum];
    }
    // if (cardId.substring(17, 18).toLocaleUpperCase() == args1[sum]) {
    let birStr = cardId.substr(6, 4) + "-" + cardId.substr(10, 2) + "-" + cardId.substr(12, 2);
    let obj = new Object();
    obj.birthdayStr = birStr;
    let arr = birStr.split("-");
    obj.birthdayDate = new Date(arr[0], parseInt(arr[1]) - 1, arr[2]);
    obj.sexStr = Number(cardId.substr(16, 1)) % 2 === 0 ? "女" : "男";
    obj.sexCode = Number(cardId.substr(16, 1)) % 2 === 0 ? 2 : 1;

    obj.districtCode = cardId.substring(0, 6);
    return validDate(birStr) ? obj : false;
    // }
    // console.log(reg,"regreg");
    return false;
};

//拼装Tree数据
export const getFlatToTree = (datas) => {
    let Arr = [];
    let mapKey = {};
    for (let data of datas) {
        data.key = data.uuid;
        data.title = data.name;
        if (data.hasOwnProperty("id") && data.hasOwnProperty("parentId")) {
            if (data.parentId === null || !mapKey.hasOwnProperty(data.parentId)) {
                if (!Arr.find((value) => {
                    if (value.uuid === data.uuid) {
                        return true
                    }
                })) {
                    Arr.push(data);
                }

            } else {
                if (mapKey[data.parentId].children === null || !mapKey[data.parentId].children) {
                    mapKey[data.parentId].children = [];
                }
                if (!mapKey[data.parentId].children.find((value) => {
                    if (value.uuid === data.uuid) {
                        return true
                    }
                })) {
                    mapKey[data.parentId].children.push(data);
                }
            }
            mapKey[data.id] = data;
        }
    }
    return Arr;
};

/**
 * 数组对象转字符串
 * @param arr
 * @param name
 * @param symbol
 * @returns {*}
 */
export const arrFromNameToStr = (arr, name, symbol = ',') => {
    return arr.map(item => item[name]).join(symbol);
}

/**
 * 对数组某一项进行索引移动
 * @param arr 原数组
 * @param fromIndex 需要移动的索引
 * @param toIndex 目标移动的索引
 * @returns {*|*[]}
 */
export const moveArrayElement = (arr, fromIndex, toIndex) => {
    // 检查输入是否有效
    if (
        fromIndex < 0 ||
        fromIndex >= arr.length ||
        toIndex < 0 ||
        toIndex >= arr.length
    ) {
        // 无效的索引，返回原始数组
        return arr;
    }

    // 复制原始数组，以避免修改原数组
    const newArray = [...arr];

    // 移除原始位置的元素，并将其插入到新位置
    const elementToMove = newArray.splice(fromIndex, 1)[0];
    newArray.splice(toIndex, 0, elementToMove);

    return newArray;
}

/**
 * 深度克隆
 * @param obj
 * @returns {{}|*|*[]}
 */
export const deepClone = (obj) => {
    if (obj === null || typeof obj !== "object") {
        return obj;
    }

    if (Array.isArray(obj)) {
        const clonedArray = [];
        for (let i = 0; i < obj.length; i++) {
            clonedArray[i] = deepClone(obj[i]);
        }
        return clonedArray;
    }

    const clonedObject = {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            clonedObject[key] = deepClone(obj[key]);
        }
    }
    return clonedObject;
}

/**
 * 判断是否是IE浏览器
 * @returns {boolean}
 */
export const isIE = () => {
    if (!!window.ActiveXObject || "ActiveXObject" in window)
        return true;
    else
        return false;
};

/**
 * 文件流转BinaryString
 * @param data
 * @returns {string}
 */
export const fixdata = (data) => { 
    let o = "",
        l = 0,
        w = 10240;
    for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
    o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
    return o;
};
/**
 * 
 * @param value
 * @returns {boolean}
 */
export const validMonth = (value) => {
    let reg = /^\d{4}-((0([1-9]))|(1(0|1|2)))$/;
    return reg.test(value);
};

/**
 * 
 * @param alertFun
 * @param file
 * @param columns
 * @param ruleFun
 * @param completeFun
 * @param isOrder
 */
export const importExecl = (alertFun, file, columns, ruleFun, completeFun, isOrder = true) => {
    console.log("进入了")
    if (!file) {
        return;
    }
    let isBase64 = isIE();
    let reader = new FileReader();
    reader.onload = (e) => {
        let wb = null;//读取完成的数据
        let data = e.target.result;
        if (isBase64) {
            wb = XLSX.read(btoa(fixdata(data)), {//手动转化
                type: 'base64'
            });
        } else {
            wb = XLSX.read(data, {
                type: 'binary'
            });
        }
        let sheetValue = XLSX.utils.sheet_to_csv(wb.Sheets[wb.SheetNames[0]], {
            FS: '\t',
            RS: String.fromCharCode(29),
            blankrows: false
        });
        let errorMsg = handleImportExcelData(sheetValue, columns, ruleFun, completeFun, isOrder);
        errorMsg ? alertFun(errorMsg) : null;
    };
    isBase64 ? reader.readAsArrayBuffer(file) : reader.readAsBinaryString(file);
};

/**
 * pasteData:需要导入的Excel数据
 * column:标准列
 * ruleFun:处理的逻辑方法，进行判断
 * isOrder:打乱表头顺序导入，还是不打乱。默认是按照标准列顺序（true）导入
 * completeFun:最后完成方法
 * */
const handleImportExcelData = (pasteData, column, ruleFun, completeFun, isOrder) => {
    if (!pasteData)
        return "Excel中没有导入的数据";
    if (!column)
        return null;
    // pasteData= pasteData.substring(0,pasteData.lastIndexOf(String.fromCharCode(29)));
    let results = pasteData.split(String.fromCharCode(29));
    let columnCopy = [];//当表头为动态的情况下，column的0坐标为空
    if (!(results && results.length > 2))
        return "Excel中没有导入的数据";
    let orderArr = null;
    for (let rowNum = 0; rowNum < results.length - 1; rowNum++) {
        let result = results[rowNum];
        let curArr = result.split('\t');
        if (rowNum === 0) {
            if (column.length === 1) {
                if (column[0] === "") {
                    for (let dataItem of curArr) {
                        columnCopy.push("");
                    }
                    column = columnCopy;
                }
            }
            let curArrNew = [];
            for (let m = 0; m < curArr.length; m++) {
                if (curArr[m] !== "") {
                    curArrNew.push(curArr[m])
                }
            }
            curArr = curArrNew;
            if (column.length != curArr.length)
                return "导入列标题和标准的列标题不匹配";
            if (isOrder) {
                let length = 0;
                for (let i = 0; i < column.length; i++) {
                    if (column[i].trim() === "") {
                        length++;
                    }
                }
                if (length != column.length) {
                    for (let i = 0; i < column.length; i++) {
                        if (column[i].trim() !== curArr[i].trim()) {
                            return "【" + curArr[i] + "】" + "列标题不正确，应该为" + "【" + column[i] + "】";
                        }
                    }
                }
            } else {
                orderArr = new Array();
                for (let j = 0; j < curArr.length; j++) {
                    let isHave = false;
                    for (let i = 0; i < column.length; i++) {
                        if (column[i] == curArr[j]) {
                            isHave = true;
                            orderArr[j] = i;
                            break;
                        }
                    }
                    if (!isHave) {
                        return "在标准列标题中不存在列标题为" + "【" + curArr[j] + "】";
                    }
                }
            }
        } else {
            let realArr = new Array();
            if (isOrder) {
                for (let i = 0; i < column.length; i++) {
                    realArr[i] = curArr[i] ? curArr[i].trim() : "";
                }
            } else {
                if (orderArr) {
                    for (let i = 0; i < orderArr.length; i++) {
                        realArr[orderArr[i]] = curArr[i] ? curArr[i].trim() : "";
                    }
                }
            }
            let errorMsg = ruleFun(rowNum + 1, column, realArr);
            if (errorMsg)
                return errorMsg;
        }
    }
    completeFun();
    return null;
};

/**
 * datas:导出Excel数据源
 * fieldNames:要导出的字段
 * headTexts:表头
 * type:导出excel的格式
 * a:a标签
 * notificationFun:错误信息提示方法
 * */
export const exportExcelFileReference = (datas, fieldNames, headTexts, fileName, notificationFun) => {
    /*if(!(datas && datas.length>0)){
     return;
     }*/
    if (fieldNames == null || headTexts == null || fieldNames.length !== headTexts.length || headTexts.length == 0 || fieldNames.length == 0) {
        return notificationFun ? notificationFun("传参错误") : null;
    }
    let dataOrigin = [];
    dataOrigin.push(headTexts);
    for (let data of datas) {
        let obj = [];
        fieldNames.map((item, i) => {
            obj.push(data[fieldNames[i]])
        });
        dataOrigin.push(obj);
    }
    let sheetName = "Sheet1", ws = sheet_from_array_of_arrays(dataOrigin);
    let wb = {
        SheetNames: [sheetName],
        Sheets: {}
    };
    wb.Sheets[sheetName] = ws;
    let wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
    saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), fileName ? fileName + ".xlsx" : "default.xlsx");
};
export const sheet_from_array_of_arrays = (data, opts) => {
    let ws = {};
    let range = { s: { c: 10000000, r: 10000000 }, e: { c: 0, r: 0 } };
    for (let R = 0; R != data.length; ++R) {
        for (let C = 0; C != data[R].length; ++C) {
            if (range.s.r > R) range.s.r = R;
            if (range.s.c > C) range.s.c = C;
            if (range.e.r < R) range.e.r = R;
            if (range.e.c < C) range.e.c = C;
            var cell = { v: data[R][C] };
            if (cell.v == null) continue;
            let cell_ref = XLSX.utils.encode_cell({ c: C, r: R });

            if (typeof cell.v === 'number') cell.t = 'n';
            else if (typeof cell.v === 'boolean') cell.t = 'b';
            else if (cell.v instanceof Date) {
                cell.t = 'n';
                cell.z = XLSX.SSF._table[14];
                cell.v = datenum(cell.v);
            }
            else cell.t = 's';

            ws[cell_ref] = cell;
        }
    }
    if (range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);
    return ws;
};

//字符串转字符流
export const s2ab = (s) => {
    let buf = new ArrayBuffer(s.length);
    let view = new Uint8Array(buf);
    for (let i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
};

/**
 * 菜单鉴权
 * @param key
 * @returns {boolean}
 */
export const APermissions = (key) => {
    const authElement = JSON.parse(sessionStorage.getItem('authElement')) || []
    const authElementCodeArr = authElement.length ? authElement.map(item => item.code) : []
    return authElementCodeArr.indexOf(key) > -1
}
