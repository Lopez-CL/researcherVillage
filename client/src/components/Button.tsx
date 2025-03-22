import React from 'react';

type ButtonProps = {
    isDefaultGreen?: boolean,
    label: string,
    aria?:{
        ariaAttr: string,
        attrContent: string
    } | null | undefined
    eventFunc?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const Button: React.FC<ButtonProps> = ({isDefaultGreen= true, label = "Button Text", aria, eventFunc})=>{
    return(
        <button {...(aria? {[aria.ariaAttr]: aria.attrContent}:{})}  onClick={eventFunc} className={isDefaultGreen?'button':'button button--transparent'}>{label}</button>
    )
}

export default Button;