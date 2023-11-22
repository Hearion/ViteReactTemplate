// 定义 Dingo API 的基本地址
import {removeLoginData} from "@/utils/SessionStorageData.js";
import {updateState} from "@/store/app/appSlice.js";
import {store} from "@/store/store.js";
import {notificationWarningFun} from "@/components/index.js";

const apiUrl = import.meta.env.VITE_API_BASE_URL;

const ContentTypeData = {
    GET: 'application/x-www-form-urlencoded',
    POST: 'application/x-www-form-urlencoded',
    TEXT: 'application/text;charset=UTF-8'
}

/**
 * 封装fetch请求
 * @param url
 * @param method
 * @param data
 * @param isFile
 * @returns {Promise<any|void>}
 */
const request = (url, method = 'GET', data = null, isFile) => {
    // let thisTimeOut = null;
    // thisTimeOut = setTimeout(() => {
    //     store.dispatch(updateState({
    //         isLoading: true
    //     }))
    // }, 200)
    
    
    const headers = {
        'Content-Type': ContentTypeData[method],
    };

    const requestOptions = {
        method: method === 'TEXT' ? 'POST' : method,
        headers,
        body: data ? isFile ? data : JSON.stringify(data) : null,
    };

    let errMessage = ''

    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(`${apiUrl}${url}`, requestOptions);
           
            // clearTimeout(thisTimeOut);
            // store.dispatch(updateState({
            //     isLoading: false
            // }))
            
            // 成功处理
            if (response.status >= 200 && response.status < 300) {
                const result = await response.json();
                switch (result.code) {
                    case 200:
                        return resolve(result.data);
                    case 405:
                        removeLoginData();
                        notificationWarningFun('提示', result.msg)
                        const goToUrl = window.location.href.indexOf('admin') === -1 ? '/login' : '/admin'
                        setTimeout(() => {
                            window.location.href =  window.location.origin + goToUrl
                        }, 1500)
                        return
                    case 20003:
                    case 40003:
                    case 50001:
                        errMessage = result.msg
                        break;

                }
            } else {
                switch (response.status) {
                    case 400:
                    case 405:
                    case 500:
                        errMessage = '服务器无法接连，请与运营商联系！'
                        break;
                    case 404:
                        errMessage = '数据获取异常，请与运营商联系！'
                        break;
                    default:
                        errMessage = '网络异常，请检查网络稳定性！'
                        break;
                }
            }
            notificationWarningFun('提示', errMessage)
            reject(errMessage)
        } catch (e) {
            errMessage = '异常错误！请与运营商联系!'
            notificationWarningFun('提示', errMessage)
            store.dispatch(updateState({
                isLoading: false
            }))
            reject(errMessage)
            throw e
        }
    })
}

/**
 * 经纬度获取具体位置信息
 * @param locationStr
 * @returns {Promise<unknown>}
 */
const getAddressFromLocation = (locationStr) => {
    const requestOptions = {
        method: "GET",
        headers: {
            'Content-Type': ContentTypeData.GET,
        },
        body: null,
    };
    return new Promise(async (resolve, reject) => {
        const response = await fetch(`https://restapi.amap.com/v3/geocode/regeo?key=${import.meta.env.VITE_GAODE_MAPAPI_KEY}&location=${locationStr}`, requestOptions);
        if (response.status >= 200 && response.status < 300) {
            const result = await response.json();
            resolve(result.regeocode)
        }
    })

}

// 导出封装后的请求函数
export default {
    get: (url) => request(url, 'GET'),
    post: (url, data) => request(url, 'POST', data),
    text: (url, data) => request(url, 'TEXT', data),
    file: (url, data) => request(url, 'TEXT', data, true),
    getAddressFromLocation
};
