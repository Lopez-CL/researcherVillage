import React, { Dispatch, SetStateAction} from 'react';

const useTextInput = <T extends object>(
    state:T, 
    setState: Dispatch<SetStateAction<T>>) =>
(e: React.ChangeEvent<HTMLInputElement>) =>{
    const {name, value} = e.target;
    setState({...state,
        [name]: value
    })
}

export default useTextInput;