export const RouterData = {
    public: {
        home: {
            key: "/",
            label: "首页",
        },
        web_recognizedNews: {
            key: "web_recognizedNews",
            label: "认定新闻",
        },
        web_vocationalSkillsCompetition: {
            key: "web_vocationalSkillsCompetition",
            label: "职业技能竞赛",
        },
        web_evaluationAnnualReport: {
            key: "web_evaluationAnnualReport",
            label: "评价年报",
        },
        web_standard_specification: {
            key: "web_standard_specification",
            label: "标准规范",
        },
        listOfWorkTypes:{
            key: "web_listOfWorkTypes",
            label: "工种目录",
        },
        web_training_course: {
            key: "web_training_course",
            label: "培训课程",
        },
        web_evaluation_organization: {
            key: "web_evaluation_organization",
            label: "评价机构",
        },
        web_evaluation_annual_report: {
            key: "web_evaluation_annual_report",
            label: "评价年报",
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
        portal_configuration: {
            key: "portal_configuration",
            label: "门户配置",
            children: {
                banner: {
                    key: "banner",
                    label: "Banner图",
                },
                news_section: {
                    key: "news_section",
                    label: "内容板块",
                },
            },
        },
        data_online: {
            key: 'data_online',
            label: '数据上网',
            children: {
                results_online: {
                    key: 'results_online',
                    label: '成绩上网',
                },
                certificate_online: {
                    key: 'certificate_online',
                    label: '证书上网',
                }
            }
        },
        publicity_data: {
            key: 'publicity_data',
            label: '公示数据',
            children: {
                standard_specification: {
                    key: 'standard_specification',
                    label: '标准规范',
                },
                training_course: {
                    key: 'training_course',
                    label: '培训教程',
                },
                evaluation_organization: {
                    key: 'evaluation_organization',
                    label: '评价机构',
                },
                professional_skill_competition: {
                    key: 'professional_skill_competition',
                    label: '职业技能竞赛',
                },
                evaluation_annual_report: {
                    key: 'evaluation_annual_report',
                    label: '评价年报',
                },
            }
        },
        institutional_users: {
            key: 'institutional_users',
            label: '机构用户',
            children: {
                institutional_configuration: {
                    key: 'institutional_configuration',
                    label: '机构配置',
                },
                administrator: {
                    key: 'administrator',
                    label: '管理员',
                },
                operation: {
                    key: 'operation',
                    label: '操作记录',
                }
            }
        },

    }
};
