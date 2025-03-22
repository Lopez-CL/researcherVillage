import React, { Dispatch, SetStateAction } from 'react';
import * as customHooks from '../Hooks'
import { onBoardingData } from '../types/onboardingTypes';
import Button from './Button';
const PersonalInfo: React.FC<{ userData: onBoardingData, setUserData: Dispatch<SetStateAction<onBoardingData>> }> = ({ userData, setUserData }) => {
    const handleTextInput = customHooks.useTextInput(userData, setUserData)
    const handleFileInput = customHooks.useFileInput(userData, setUserData)
    return (
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
                    hidden
                    onChange={handleFileInput}
                    name='profileImage'
                    type='file'
                    id='upload-image-button'
                    className='button' />
                <p id="upload-description" className="for-sr-only">
                    Opens file selector to upload a profile image
                </p>
                <Button label='+' aria = {{ariaAttr: 'aria-describedby', attrContent: 'upload-description'}} eventFunc={(e) => {
                    e.preventDefault();
                    document.getElementById('upload-image-button')?.click()
                }}/>
            </form>
        </>
    )
}

export default PersonalInfo;