import f from "@/utils/FetchUtil.js";
import {publicUrl, requestParams} from "@/services/IndexService.js";

/**
 * 登录
 * @returns {Promise<*|void>}
 * @param loginAccount
 * @param password
 */
export function login(loginAccount, password) {
    return f.post(publicUrl + requestParams('/login', {loginAccount, password}), null)
}

/**
 * 菜单
 * @returns {Promise<*|void>}
 */
export function getPermissionMenu() {
    return f.post(requestParams('/getPermissionMenu', {}), null)
}

/**
 * mapDictCodes
 * @param keyStrs
 * @returns {Promise<*|void>}
 */
export function mapDictCodes(keyStrs) {
    return f.post(requestParams('/mapDictCodes', {keyStrs}), null)
}
