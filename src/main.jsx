import {App, ConfigProvider} from 'antd';
import React from 'react';
import zhCN from 'antd/locale/zh_CN';
import {StyleProvider} from '@ant-design/cssinjs';
import {createRoot} from 'react-dom/client';
import {Provider} from "react-redux";
import dayjs from "dayjs";
import 'dayjs/locale/zh-cn';

import {store} from './store/store.js';
import {IndexRouter} from "./routes/IndexRouter.jsx";

import './assets/css/font.css';
import './assets/css/tailwind.css';
import "./assets/css/color.css";
import "./assets/css/style.css";
import MessageUtil from "@/components/MessageUtil/index.jsx";
import defaultTheme from '@/assets/theme/default.js'

dayjs.locale('zh-cn')

const root = createRoot(document.getElementById("root"));

root.render(
    <Provider store={store}>
        <StyleProvider hashPriority="high">
            <ConfigProvider locale={zhCN} theme={defaultTheme}>
                <App>
                    <MessageUtil/>
                    <IndexRouter/>
                </App>
            </ConfigProvider>
        </StyleProvider>
    </Provider>
);
