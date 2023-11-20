import {App, ConfigProvider} from 'antd';
import React from 'react';
import zhCN from 'antd/locale/zh_CN';
import {StyleProvider} from '@ant-design/cssinjs';
import {createRoot} from 'react-dom/client';
import {Provider} from "react-redux";

import {store} from './store/store.js';
import {IndexRouter} from "./routes/IndexRouter.jsx";

import './assets/css/font.css';
import './assets/css/tailwind.css';
import "./assets/css/color.css";
import "./assets/css/style.css";
import dayjs from "dayjs";
import 'dayjs/locale/zh-cn';

dayjs.locale('zh-cn')


const root = createRoot(document.getElementById("root"));

root.render(
    <Provider store={store}>
        <StyleProvider hashPriority="high">
            <ConfigProvider
                locale={zhCN}
                theme={{
                    token: {
                        colorPrimary: '#2B5182',
                        colorLink: '#2B5182',
                        colorInfo: '#2B5182',
                        borderRadius: 3
                    },
                }}
            >
                <App>
                    <IndexRouter/>
                </App>
            </ConfigProvider>
        </StyleProvider>
    </Provider>
);
