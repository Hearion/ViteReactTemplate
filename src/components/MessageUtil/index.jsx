import {App} from 'antd';

let message;
let notification;
let modal;
let confirm;
export default () => {
    const staticFunction = App.useApp();
    message = staticFunction.message;
    modal = staticFunction.modal;
    notification = staticFunction.notification;
    confirm = modal.confirm;

    return null;
};

const messageFunSuccess = (text) => {
    message.success(text).then(r => {
    });
}

const notificationBase = (type, description, title = '提示') => {
    notification[type]({
        message: title,
        description: description,
        duration: 3,
        config: {
            stack: { threshold: 2 }
        }
    });
}
const notificationFun = (description) => {
    notificationBase('info', description)
};
const notificationWarningFun = (title = '', description = '') => {
    notificationBase('warning', description, title)
}
const notificationErrorFun = (description) => {
    notificationBase('error', description)
}
const notificationSuccessFun = (description) => {
    notificationBase('success', description)
}
const confirmBase = (content, cancelText, okText, onCancelFunction, onOkFunction) => {
    confirm({
        title: "操作提示",
        content: content,
        cancelText: cancelText,
        okText: okText,
        keyboard: false,
        onCancel() {
            onCancelFunction ? onCancelFunction() : null;
        },
        onOk() {
            onOkFunction ? onOkFunction() : null;
        },
    });
}
const confirmLeftDelect = (content, onOk) => {
    confirmBase(content, "删除", "取消", onOk, null);
}

const confirmYes = (content, onOk) => {
    confirmBase(content, "确认", "取消", onOk, null);
}

export {messageFunSuccess, notificationFun, notificationWarningFun, notificationErrorFun, notificationSuccessFun, confirmLeftDelect, confirmYes}
