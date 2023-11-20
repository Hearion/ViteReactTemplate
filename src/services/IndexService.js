import f from '../utils/FetchUtil.js';

export const publicUrl = 'public';

/**
 * 获取验证令牌
 * @returns {string|string}
 */
const getAppKey = () => {
    let loginDataKey = sessionStorage.getItem('appKey');
    return loginDataKey ? `appKey=${loginDataKey}` : '';
};

/**
 * 拼接路由参数
 * @param thisUrl
 * @param data
 * @returns {string}
 */
export function requestParams(thisUrl, data = {}) {
    const getAppKeyData = getAppKey();
    const timestampString = `?${Date.now()}`;
    const appKeyString = getAppKeyData ? `&${getAppKeyData}` : '';
    const params = Object.entries(data).map(([key, value]) => `${key}=${value}`);
    const queryString = params.length ? `&${params.join('&')}` : '';

    return `${thisUrl}${timestampString}${appKeyString}${queryString}`;
}

/**
 * 发送短信验证码
 * @param phone
 * @param type 修改密码 2 注册 1
 * @returns {Promise<*|void>}
 */
export function sendSMSRegistrationCode(phone, type) {
    return f.post(publicUrl + requestParams('/sendSMSRegistrationCode', {phone, type}))
}

/**
 * 获取 mapDict
 * @param keyStrs
 * @returns {Promise<*|void>}
 */
export async function webMap(keyStrs) {
    return f.post(publicUrl + requestParams( '/webMap',{keyStrs}), null);
}

/**
 * 门户短信注册
 * @param cardType
 * @param cardId
 * @param name
 * @param phone
 * @param password
 * @param code
 * @returns {Promise<*|void>}
 * @constructor
 */
export async function SMSRegistration({cardType, cardId, name, phone, password, code}) {
    return f.post(publicUrl + requestParams( '/SMSRegistration',{cardType, cardId, name, phone, password, code}), null);
}

/**
 * 忘记密码（短信验证修改）
 * @param loginAccount
 * @param password
 * @param code
 * @returns {Promise<*|void>}
 * @constructor
 */
export async function SMSModifyPassword({loginAccount, password, code}) {
    return f.post(publicUrl + requestParams( '/SMSModifyPassword',{loginAccount, password, code}), null);
}


/**
 * 登录
 * @returns {Promise<*|void>}
 * @param loginJson
 */
export function webHomeLogin(loginJson) {
    return f.text(publicUrl + requestParams('/webHomeLogin'), loginJson)
}

/**
 * 证书查询
 * @param link
 * @param name
 * @param cardId
 * @param certNo
 * @param occuType
 * @param token
 * @returns {Promise<{data: *} | void>}
 */
export async function queryCertificate({link, name = '', cardId = '', certNo = '', occuType = '', token = ''}) {
    return f.post(publicUrl + requestParams('/queryCertificate', {link, name, cardId, certNo, occuType, token}), null);
}

/**
 * 成绩查询
 * @param link
 * @param name
 * @param cardId
 * @param admissionTicket
 * @param occuType
 * @param token
 * @returns {Promise<{data: *} | void>}
 */
export async function queryAchievement({link, name = '', cardId = '', admissionTicket = '', occuType = '', token = ''}) {
    return f.post(publicUrl + requestParams('/queryAchievement', {link, name, cardId, admissionTicket, occuType, token}), null);
}

/**
 * 分页查询竞赛计划
 * @param link
 * @param startTime
 * @param endTime
 * @param pageNo
 * @param pageSize
 * @returns {Promise<{data: *} | void>}
 */
export async function pageCompetition({link, startTime, endTime, pageNo, pageSize}) {
    return f.post(publicUrl + requestParams('/pageCompetition', {link,startTime, endTime, pageNo, pageSize}), null);
}

/**
 * 下载准考证书
 * @param token
 * @returns {string}
 */
export function pdfV2(token) {
    return import.meta.env.VITE_API_BASE_URL + publicUrl + requestParams('/pdf-v2', {token})
}

/**
 * 查询评价年报
 * @param link
 * @param region
 * @param year
 * @param pageNo
 * @param pageSize
 * @returns {Promise<*|void>}
 */
export async function agencyAnnualReport({link, region, year, pageNo, pageSize}) {
    return f.post(publicUrl + requestParams('/agencyAnnualReport', {link, region, year, pageNo, pageSize}), null);
}
