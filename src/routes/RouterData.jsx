export const RouterData = {
    public: {
        home: {
            key: "/",
            label: "首页",
        },
    },
    login: {
        registrationCenter: {
            key: "registrationCenter",
            label: "报名中心",
            children: {
                informationFilling: {
                    key: "registrationCenter/informationFilling",
                    label: '信息填写'
                },
                detail: {
                    key: "registrationCenter/detail",
                    label: '报名详情'
                }
            }
        },
        makeupExaminationCenter: {
            key: "makeupExaminationCenter",
            label: "补考中心",
        }
    },
    other: {
        queryResult: {
            key: "queryResult",
            label: "查询结果",
        },
        paySuccess: {
            key: "paySuccess",
            label: "支付成功",
        },
    },
    admin: {
        demo: {
            key: "demo",
            label: "展示模板",
            children: {
                table: {
                    key: "table",
                    label: "表格页面",
                },
            },
        },
    }
};
