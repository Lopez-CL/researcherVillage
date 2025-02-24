import React, {useState} from "react";
import {onBoardingData} from '../types/onboardingTypes'
// const onBoardingSteps: React.FC[] = [PersonalInfo,...] 
import PersonalInfo from "../components/PersonalInfo";
const OnBoarding: React.FC = () =>{
    const [userData, setUserData] = useState<onBoardingData>({
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    password: '',
    college: '',
    major: '',
    title: '',
    bio: '',
    discipline: [],
    researcherStatus: [],
    profileImage: null
    })
    return(
        <>
            <h1>Let's Onboard!</h1>
            <div className="onboarding">
                <form className="stack">
                    <PersonalInfo userData={userData} setUserData={setUserData}/>
                </form>
            </div>
        </>
    )
}
export default OnBoarding;