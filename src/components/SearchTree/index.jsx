import React, {useEffect, useState} from 'react';
import {Empty, Input, Tree} from 'antd';
import PropTypes from "prop-types";
import {getFlatToTree} from "@/utils/PrjUtils.js";

const {Search} = Input;

/**
 * 可搜索树
 * @param treeData
 * @param onSelect
 * @param selectedKeys
 * @param height
 * @returns {React.JSX.Element}
 * @constructor
 */
const SearchTree = ({treeData, onSelect, selectedKeys, height}) => {

    const thisHeight = window.innerHeight - 80
    const [thisTreeData, setThisTreeData] = useState([]);
    const [thisSelectedKeys, setThisSelectedKeys] = useState([]); // 选中项

    useEffect(() => {
        setThisTreeData(getFlatToTree(treeData));
    }, [treeData]);

    // 内部搜索
    const onSearchChange = (value) => {
        if (value) {
            const loop = (data) =>
                data.map((item) => {
                    const strTitle = item.name;
                    const index = strTitle.indexOf(value);
                    const beforeStr = strTitle.substring(0, index);
                    const afterStr = strTitle.slice(index + value.length);
                    const title =
                        index > -1 ?
                            (
                                <span>
                                    {beforeStr}
                                    <span style={{color: '#f50'}}>{value}</span>
                                    {afterStr}
                                </span>
                            ) :
                            (
                                <span>{strTitle}</span>
                            );
                    if (item.children) {
                        return {
                            ...item,
                            name: title,
                            key: item.id,
                            children: loop(item.children),
                        };
                    }
                    return {
                        ...item,
                        name: title,
                        key: item.id,
                    };
                });
            setThisTreeData(loop(getFlatToTree(treeData)))
        } else {
            setThisTreeData(getFlatToTree(treeData))
        }
    }
    
    // 选中
    const onThisSelect = (key, {node}) => {
        setThisSelectedKeys(key);
        onSelect(node)
    }

    return (
        <div style={{marginTop: 20}}>
            <Search
                style={{marginBottom: 20,}}
                placeholder="请输入关键字"
                onSearch={onSearchChange}
            />
            {
                thisTreeData.length ?
                    <Tree
                        height={height || thisHeight}
                        defaultExpandAll={true}
                        selectedKeys={selectedKeys || thisSelectedKeys}
                        onSelect={onThisSelect}
                        treeData={thisTreeData}
                        fieldNames={{ title: 'name', key: 'id', children: 'children' }}
                        blockNode={true}
                    /> :
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>
            }

        </div>
    );
};

export {SearchTree};

SearchTree.propTypes = {
    treeData: PropTypes.array.isRequired,
    onSelect: PropTypes.func,
    selectedKeys: PropTypes.array,
    height: PropTypes.number
};
