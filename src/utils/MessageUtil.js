'use strict';
import {message, Modal, notification} from "antd";

const confirm = Modal.confirm;

export const messageFunSuccess = (text) => {
    message.success(text).then(r => {
    });
}

export const notificationFun = (description) => {
    notification.info({
        message: '提示',
        description: description,
        duration: 3,
    });
};
export const notificationWarningFun = (title = '', text = '') => {
    notification.warning({
        message: title,
        description: text,
        duration: 3
    })
}
export const notificationErrorFun = (description) => {
    notification.error({
        message: '提示',
        description: description,
        duration: 3
    })
}
export const notificationSuccessFun = (description) => {
    notification.success({
        message: '提示',
        description: description,
        duration: 3
    });
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

export const confirmLeftDelect = (content, onOk) => {
    confirmBase(content, "删除", "取消", onOk, null);
}

export const confirmYes = (content, onOk) => {
    confirmBase(content, "确认", "取消", onOk, null);
}
