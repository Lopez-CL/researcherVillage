export interface onBoardingData {
    firstName: string,
    lastName: string,
    userName: string,
    email: string,
    password: string,
    college: string,
    major: string,
    title: string,
    bio: string,
    discipline: string[],
    researcherStatus: string[],
    profileImage: File | null
}