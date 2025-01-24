import React from "react";

type IconProps = {
    color?: string;
};

const BookMark: React.FC<IconProps> = ({color = 'black'}) =>{
    return (
        <svg width="17" height="22" viewBox="0 0 17 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1 4.47427C1 3.25815 1 2.6501 1.23667 2.18562C1.44485 1.77703 1.77703 1.44485 2.18562 1.23667C2.6501 1 3.25815 1 4.47427 1H12.7257C13.9418 1 14.5499 1 15.0143 1.23667C15.4229 1.44485 15.7551 1.77703 15.9632 2.18562C16.1999 2.6501 16.1999 3.25815 16.1999 4.47427V20.5428L8.59996 15.1142L1 20.5428V4.47427Z" stroke= {color} stroke-width="1.51323" stroke-linejoin="round"/>
</svg>
    )
}

export default BookMark;
