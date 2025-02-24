import React, {Dispatch, SetStateAction} from 'react';
import useTextInput from '../Hooks/useTextInput';
import { onBoardingData } from '../types/onboardingTypes';
const PersonalInfo: React.FC<{userData: onBoardingData, setUserData: Dispatch<SetStateAction<onBoardingData>>} > = ({userData, setUserData}) =>{
    const handleTextInput = useTextInput(userData, setUserData)
    return(
        <>
            <form className='stack'>
                <input
                aria-label='First Name'
                onChange={handleTextInput}
                name='firstName'
                type='text'
                placeholder='First Name'
                value={userData.firstName}
                className='input'
                id=''
                />
                <input
                aria-label='Last Name'
                onChange={handleTextInput}
                name='lastName'
                type='text'
                placeholder='Last Name'
                value={userData.lastName}
                className='input'
                id=''
                />
                <input
                aria-label='Email'
                onChange={handleTextInput}
                name='email'
                type='email'
                placeholder='Email'
                value={userData.email}
                className='input'
                id=''
                />
                <input
                aria-label='Password'
                onChange={handleTextInput}
                name='password'
                type='password'
                placeholder='Password'
                value={userData.password}
                className='input'
                id=''
                />
                <input
                aria-label='Major (optional)'
                onChange={handleTextInput}
                name='major'
                type='text'
                placeholder='Major (optional)'
                value={userData.major}
                className='input'
                id=''
                />
                <input
                aria-label='College (optional)'
                onChange={handleTextInput}
                name='college'
                type='text'
                placeholder='College (optional)'
                value={userData.college}
                className='input'
                id=''
                />
                <input
                aria-label='Job Title (optional)'
                onChange={handleTextInput}
                name='title'
                type='text'
                placeholder='Job Title (optional)'
                value={userData.title}
                className='input'
                id=''
                />
                <input
                aria-label='Image (optional)'
                onChange={handleTextInput}
                name='profileImage'
                type='file'
                placeholder='Job Title (optional)'
                className='button'
                id=''
                />
            </form>
        </>
    )
}

export default PersonalInfo;