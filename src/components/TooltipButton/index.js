import React from 'react'
import { Tooltip , Button } from 'antd'

export default ({ title , text , icon , type="link" , disabled , onClick }) => {
    const renderButton = () => <Button
    icon={icon}
    type={type}
    disabled={disabled}
    onClick={onClick}
    >{text}</Button>

    if(!title) return renderButton()
    return (
        <Tooltip title={title}>
            {
                renderButton()
            }
        </Tooltip>
    )
}