import '@wangeditor/editor/dist/css/style.css' // 引入 css
import React, {useEffect, useState} from 'react'
import {Editor, Toolbar} from '@wangeditor/editor-for-react'
import {getBase64} from "@/utils/PrjUtils.js";


const  NewEditor = ({onEditorChange,uploudImgUrl,defaultValue=""}) => {
    
    // editor 实例
    const [editor, setEditor] = useState(null)
    // 编辑器内容
    const [html, setHtml] = useState(defaultValue)

    // 模拟 ajax 请求，异步设置 html
    useEffect(() => {
        
    }, [])
    
    // 工具栏配置
    const toolbarConfig = { 
        
    }

    // 编辑器配置
    const editorConfig = {      // JS 语法
        placeholder: '请输入内容...',
        MENU_CONF:{}
    }
    
    editorConfig.MENU_CONF['uploadImage'] = {
        // 上传图片的配置
        // server: 'http://192.168.1.67:19120/news/saveNewsTextImage?1698919433000&appKey=239ed9de4c6343e680d21baa1f0ce0a7_1&imageName=IMG_1627.JPG',
        async customUpload(file, insertFn) {
            let imgUrl
            getBase64(file, (base64)=>{
                imgUrl = uploudImgUrl(file,base64).then(res => {
                    insertFn(res, "", "")
                })
            })
            
            // file 即选中的文件
            // 自己实现上传，并得到图片 url alt href
            // 最后插入图片
        }
    }
    

    // 及时销毁 editor ，重要！
    useEffect(() => {
        return () => {
            if (editor == null) return
            editor.destroy()
            setEditor(null)
        }
    }, [editor])

    return (
        <>
            <div style={{ border: '1px solid #ccc', zIndex: 100}}>
                <Toolbar
                    editor={editor}
                    defaultConfig={toolbarConfig}
                    mode="default"
                    style={{ borderBottom: '1px solid #ccc' }}
                />
                <Editor
                    defaultConfig={editorConfig}
                    value={html}
                    onCreated={setEditor}
                    onChange={editor => {
                        setHtml(editor.getHtml())
                        onEditorChange(editor)
                    }}
                    mode="default"
                    style={{ height: '300px', overflowY: 'hidden' }}
                />
            </div>
        </>
    )
}

export { NewEditor }
