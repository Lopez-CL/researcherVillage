import React from 'react';

type ButtonProps = {
    isDefaultGreen?: boolean,
    label: string,
    eventFunc?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const Button: React.FC<ButtonProps> = ({isDefaultGreen= true, label = "Button Text", eventFunc})=>{
    return(
        <button onClick={eventFunc} className={isDefaultGreen?'button':'button button--transparent'}>{label}</button>
    )
}

export default Button;