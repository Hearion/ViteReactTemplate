export const key_appKey = "appKey";
export const key_userInfo = "userInfo";
export const key_selectData = "selectData";
export const key_menuData = "menuData";

/**
 * 缓存登录数据
 * @param loginData
 */
export const saveLoginData = (loginData) => {
    sessionStorage.setItem(key_appKey, loginData.appKey);
    sessionStorage.setItem(key_userInfo, JSON.stringify(loginData));
};

/**
 * 缓存权限路由
 * @param menuData
 */
export const saveMenuData = (menuData) => {
    sessionStorage.setItem(key_menuData, menuData);
};

/**
 * 删除登录数据
 */
export const removeLoginData = () => {
    sessionStorage.removeItem(key_appKey);
    sessionStorage.removeItem(key_userInfo);
    sessionStorage.removeItem(key_selectData)
};

/**
 * 删除权限路由
 */
export const removeMenuData = () => {
    sessionStorage.removeItem(key_menuData);
};



