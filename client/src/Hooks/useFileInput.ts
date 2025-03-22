import React, {Dispatch, SetStateAction} from 'react'

const useFileInput = <T extends object>(
    state: T,
    setState: Dispatch<SetStateAction<T>>) => (e: React.ChangeEvent<HTMLInputElement>) =>{
        const {name, files} = e.target;
        const image = files?.[0] || null;
        setState({...state,
            [name]: image
        })
    }

export default useFileInput;