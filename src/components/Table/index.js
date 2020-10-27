import React, { useRef, useState } from 'react';
import { Modal, message } from 'antd';
import { useAccess } from 'umi';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import TooltipButton from '@/components/TooltipButton'
import Form from './Form'

export default ({ columns , option = {} , tool = {} , request , createForm , updateForm , primaryKey="id" , headerWrapper , ...props}) => {
    const actionRef = useRef();
    const [models , setModels] = useState({})
    const createFormRef = useRef()
    const updateFormRef = useRef()
    const access = useAccess();
    
    const setModelPorps = (modalKey,modalProps) => {
        setModels(modelsValue => {
            const oldProps = modelsValue[modalKey] ? modelsValue[modalKey].props : {}
            return {...modelsValue,[modalKey]:{...modelsValue[modalKey],props:{
                ...oldProps,
                ...modalProps
            }}}
        })
    }

    const setModelValues = (modalKey,modalValues) => {
        setModels(modelsValue => {
            return {...modelsValue,[modalKey]:{...modelsValue[modalKey],...modalValues}}
        })
    }

    //获取操作项属性
    const getAttr = (attr,args,defaultValue) => {
        return attr !== undefined ? typeof attr === "function" ? attr(args) : attr : defaultValue
    }
    //默认Render
    const renderDefaultAction = (acitonKey,record) => {
        const actionConfig = option[acitonKey] || tool[acitonKey]
        const { disabled , title , text , icon , type ,content , modalProps } = actionConfig
        const onClick = () => {
            if(actionConfig.onClick) actionConfig.onClick(record)
            if(!content) return
            setModelValues(acitonKey,{
                visible:true,
                content:getAttr(content,record,undefined),
                props:getAttr(modalProps,record,undefined)
            })
        }
        return <TooltipButton key={`${acitonKey}-button`} {...{ title , text , icon , disabled , onClick , type }} />
    }
    //删除操作的默认Render
    const renderRemoveAction = (_ ,record) => {
        let { service , disabled , title ,text , icon , modalProps , onClick , type } = option.remove
        disabled = getAttr(disabled,record,false)
        title = getAttr(title,record,"删除")
        icon = getAttr(icon,record,<DeleteOutlined />)
        onClick = onClick ? onClick : () => {
            Modal.confirm({
                title: '你确定要删除吗？',
                okText: '确定',
                cancelText: '取消',
                centered: true,
                onOk() {
                  return new Promise(async (resolve) => {
                    const { result, ...res } = await service(record);
                    if (result) {
                      message.success('操作成功');
                      if (actionRef.current) {
                        actionRef.current.reload();
                      }
                    } else {
                      message.error(res.message);
                    }
                    resolve();
                  });
                },
                onCancel() {},
                ...modalProps
              });
        }
        return <TooltipButton key="remove-button" {...{ title , text , icon , disabled , onClick , type}} />
    }
    //编辑操作的默认Render
    const renderEditAction = (_ ,record) => {
        let { disabled , title , text , icon , initialValues , onClick , onSubmit , modalProps , type } = option.edit
        disabled = getAttr(disabled,record,false)
        title = getAttr(title,record,"编辑")
        icon = getAttr(icon,record,<EditOutlined />)
        const content = () => {
            initialValues = getAttr(initialValues,record,record)
            return (
                <Form
                ref={updateFormRef}
                hideRequiredMark={true}
                update={true}
                initialValues={initialValues}
                primaryKey={getAttr(primaryKey,record,undefined)}
                onSubmit={async (values,primary,fieldsValue,record) => {
                    const { service } = option.edit
                    if(Object.keys(values).length === 0){
                        return message.error("您没有修改任何值");
                    }
                    setModelPorps("edit",{
                        confirmLoading:true
                    })
                    const updatePrimaryKey = getAttr(primaryKey,record,undefined)
                    if(updatePrimaryKey && primary){
                        values[updatePrimaryKey] = primary
                    }
                    const { result, ...res } = await service(values,fieldsValue,record);
                    setModelPorps("edit",{
                        confirmLoading:false
                    })
                    if (result) {
                        message.success("操作成功")
                        if (actionRef.current) {
                            actionRef.current.reload();
                        }
                        setModelValues("edit",{
                            visible:false
                        })
                    } else {
                        message.error(res.message);
                    }
                }}
                {...updateForm}
                />
            )
        }
        option.edit = {...option.edit,disabled, title, text,icon,onClick,type,content,modalProps:{
            onOk:() => {
                updateFormRef.current.onSubmit()
            },
            ...modalProps,
            title:updateForm.title
        }}
        return renderDefaultAction("edit",record)
    }

    //添加操作的默认Render
    const renderAddAction = () => {
        let { disabled , title , text , icon , initialValues , type , onClick , modalProps } = tool.add
        disabled = getAttr(disabled,undefined,false)
        title = getAttr(title,undefined,"添加")
        icon = getAttr(icon,undefined,<PlusOutlined />)
        type = type || "primary"
        const content = () => {
            initialValues = getAttr(initialValues,undefined,{})
            return (
                <Form
                ref={createFormRef}
                hideRequiredMark={true}
                initialValues={initialValues}
                onSubmit={async (values,_,fieldsValue,record) => {
                    const { service } = tool.add
                    setModelPorps("add",{
                        confirmLoading:true
                    })
                    const { result, ...res } = await service(values,fieldsValue,record);
                    setModelPorps("add",{
                        confirmLoading:false
                    })
                    if (result) {
                        setModelValues("add",{
                            visible:false
                        })
                        message.success("操作成功")
                        if (actionRef.current) {
                            actionRef.current.reload();
                        }
                    } else {
                        message.error(res.message);
                    }
                }}
                {...createForm}
                />
            )
        }
        tool.add = {...tool.add,disabled, title, text,icon,onClick,type,content,modalProps:{
            onOk:() => {
                createFormRef.current.onSubmit()
            },
            ...modalProps,
            title:createForm.title
        }}
        return renderDefaultAction("add")
    }

    //获取操作项
    const getAction = actionData => {
        const action = {}
        Object.keys(actionData).forEach(actionKey => {
            const actionConfig = actionData[actionKey]
            if(typeof actionConfig === "function") actionConfig = { service : actionConfig }
            else if(typeof actionConfig !== "object") return true
            const actionService = actionConfig.service
            const actionAccess = actionConfig.access
            if(actionService && !actionAccess || (Array.isArray(actionAccess) && actionAccess.find(aac => !!access[aac]) || !!access[actionAccess])){
                if(!actionConfig.render){
                    if(actionKey === "remove") actionConfig.render = renderRemoveAction
                    else if(actionKey === "edit") actionConfig.render = renderEditAction
                    else if(actionKey === "add") actionConfig.render = renderAddAction
                    else actionConfig.render = renderDefaultAction
                }
                action[actionKey] = actionConfig
            }
        })
        return action
    }
    //获取行类操作项
    option = getAction(option)
    //获取工具类的操作项
    tool = getAction(tool)
    //获取操作项所在列下标
    const newColumns = columns.concat()
    const optionColumnIndex = newColumns.findIndex(column => column.valueType === "option")
    
    //添加行类的操作项
    if(Object.keys(option).length > 0){
        const optionColumn = optionColumnIndex > -1 ? newColumns[optionColumnIndex] : {
            title: '操作',
            key: 'option',
            valueType: 'option'
        }
        const oldOptionRender = optionColumn.render
        const optionRender = (text, record , index , action) => {
            const elementArray = []
            if(oldOptionRender) {
                const oldElementArray = oldOptionRender(text,record,index,action)
                if(Array.isArray(oldElementArray)){
                    oldElementArray.forEach(oldElement => elementArray.push(oldElement))
                }
            }
            Object.keys(option).forEach(optionKey => elementArray.push(option[optionKey].render(optionKey,record,index,action)))
            return elementArray
        }
        optionColumn.render = optionRender
        if(optionColumnIndex > -1) newColumns.splice(optionColumnIndex,1,optionColumn)
        else newColumns.push(optionColumn)
    }

    const tools = Object.keys(tool).map(toolKey => tool[toolKey].render(toolKey))

    const renderContent = () => {
        return (
            <>
            <ProTable
            actionRef={actionRef}
            columns={newColumns}
            rowKey={primaryKey}
            search={{
                labelWidth:'auto'
            }}
            toolBarRender={() => tools}
            tableAlertRender={false}
            request={({ current, pageSize, created_time, ...params },sort) => {
            return new Promise((resolve, reject) => {
                const [begin, end] = created_time || [];
                const sortKeys = Object.keys(sort)
                const order_field = sortKeys.length > 0 ? sortKeys[0] : undefined;
                const order_sort = order_field ? sort[order_field] : undefined
                request({
                offset: (current - 1) * pageSize,
                limit: pageSize,
                begin,
                end,
                order_field,
                order_sort,
                ...params,
                }).then(({ result, data }) => {
                if (!result || !data) reject();
                else {
                    const { total } = data;
                    resolve({
                    current,
                    pageSize,
                    total,
                    data: data.data,
                    });
                }
                });
            });
            }}
            {...props}
        />
        {
            Object.keys(models).map(modalKey => {
                const modelConfig = models[modalKey]
                return modelConfig.visible && <Modal
                key={modalKey}
                width={640}
                destroyOnClose
                onCancel={() => {
                    setModels(modelsValue => {
                        return {...modelsValue,[modalKey]:{
                            visible:false
                        }}
                    })
                }}
                visible={true}
                {...modelConfig.props}
                >
                    {
                        modelConfig.content
                    }
                </Modal>
            })
        }
            </>
        )
    }
    if(headerWrapper === false) return renderContent()
    return (
        <PageHeaderWrapper title={false}>
            {
                renderContent()
            }
        </PageHeaderWrapper>
    );
}