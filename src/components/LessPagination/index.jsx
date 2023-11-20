import React, {useEffect, useState} from 'react';
import {Table} from 'antd';
import PropTypes from "prop-types";

/**
 * 高级表格
 * @param dataProvider 数据源
 * @param rowSelect 多选事件
 * @param selectedRowKeys 多选控制key
 * @param onChange 分页|筛选|排序事件
 * @param pagination 是否开启分页
 * @param type 单选|多选
 * @param bordered 边框
 * @param visible 是否显示
 * @param expandedRowRender
 * @param getCheckboxProps 单选多选框限制
 * @param scroll 滚动设置
 * @param rowKey 行key 唯一
 * @param onRowClick 行点击
 * @param rowClassNameSerialNo 当前选中行
 * @param serialNo 是否显示序号
 * @param property
 * @param columns 表头数据源
 * @returns {Element}
 * @constructor
 */
const LessPagination = ({
                            dataProvider,
                            rowSelect,
                            selectedRowKeys,
                            onChange,
                            pagination,
                            type,
                            bordered,
                            visible,
                            expandedRowRender,
                            getCheckboxProps,
                            scroll,
                            rowKey,
                            onRowClick,
                            rowClassNameSerialNo,
                            serialNo,
                            property,
                            columns
                        }) => {
    const [columnsState, setColumnsState] = useState([]);

    useEffect(() => {
        const updatedColumns = [...columns];
        if (serialNo && columns[0].dataIndex !== 'serialNo') {
            const serialNoColumn = {
                title: '序号',
                dataIndex: 'serialNo',
                className: 'tableAlignCenter',
                width: 90,
                align: 'center',
                render: (text, record, index) => (
                    <span
                        style={{
                            color: record[property] ? '#ff3333' : 'inherit',
                        }}
                    >
                        {record.serialNo}
                    </span>
                ),
            };
            updatedColumns.unshift(serialNoColumn);
        }
        setColumnsState(updatedColumns);
    }, [serialNo, columns, property]);

    const rowSelectAction = (dataProvider) => {
        if (pagination && serialNo && columnsState[0]?.dataIndex === 'serialNo') {
            const {datas, pageNo, pageSize} = dataProvider;
            if (datas && datas.length > 0) {
                return datas.map((item, i) => ({
                    ...item,
                    serialNo: i + 1 + (pageNo - 1) * pageSize,
                }));
            }else {
                return []
            }
        } else if (!pagination && serialNo && columnsState[0]?.dataIndex === 'serialNo') {
            return dataProvider.map((item, i) => ({
                ...item,
                serialNo: i + 1,
            }));
        }

        return  Array.isArray(dataProvider)? dataProvider : [];
    };

    const rowClassName = (record, index) => {
        const currentSerialNo = pagination
            ? rowClassNameSerialNo || (dataProvider?.datas?.length > 0 ? dataProvider.datas[0].serialNo : null)
            : rowClassNameSerialNo || (dataProvider?.length > 0 ? dataProvider[0].serialNo : null);

        return currentSerialNo === record.serialNo ? 'bg-[#E1F4FF]' : '';
    };

    const onRowClickHandler = (record, index, event) => {
        if (onRowClick) {
            onRowClick(record, index, event);
        }
    };

    const rowSelection = {
        type: type ? 'radio' : 'checkbox',
        selectedRowKeys,
        onChange: rowSelect,
        getCheckboxProps,
    };

    return (
        visible && (
            <Table
                size="middle"
                bordered={bordered}
                expandedRowRender={expandedRowRender}
                rowClassName={rowClassName}
                rowKey={rowKey}
                rowSelection={rowSelect ? rowSelection : null}
                onRow={(record) => ({
                    onClick: (e) => {
                        onRowClickHandler(record, record.serialNo, e);
                    },
                })}
                onChange={onChange}
                columns={columnsState}
                dataSource={rowSelectAction(dataProvider)}
                pagination={
                    pagination
                        ? {
                            total: dataProvider.totalCount,
                            pageSize: dataProvider.pageSize,
                            current: dataProvider?.pageNo,
                            showTotal: (total) => `共 ${total} 条`,
                            showSizeChanger: true,
                            pageSizeOptions: ['5', '10', '30', '50', '70', '100', '1000'],
                        }
                        : false
                }
                scroll={scroll}
            />
        )
    );
};

export {LessPagination};


LessPagination.propTypes = {
    dataProvider: PropTypes.any.isRequired,
    onRowClick: PropTypes.func,
    onChange: PropTypes.func,
    rowSelect: PropTypes.func,
    selectedRowKeys: PropTypes.arrayOf(PropTypes.number),
    serialNo: PropTypes.bool,
    pagination: PropTypes.bool.isRequired,
    property: PropTypes.string,
    visible: PropTypes.bool,
    scroll: PropTypes.object,
    columns: PropTypes.arrayOf(PropTypes.object).isRequired,
    bordered: PropTypes.bool,
    rowClassNameSerialNo: PropTypes.number,
};

LessPagination.defaultProps = {
    visible: true,
    bordered: false,
    columns: [],
    pagination: false,
    rowKey: "serialNo"
};
