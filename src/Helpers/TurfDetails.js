export const TurfRegistrationDiv = [
    {
        label: 'Court Name',
        id: 'courtName',
        placeholder: 'Enter Court Name',
    },
    {
        label: 'Email',
        id: 'email',
        placeholder: 'Enter your email',
    },
    {
        label: 'Mobile Number',
        id: 'number',
        placeholder: 'Enter your mobile number',
    },
    {
        label: 'Password',
        id: 'password',
        placeholder: 'Enter your password',
    },
    {
        label: 'Sports Event',
        id: 'event',
        placeholder: 'Select Sports Type',
    },
    {
        label: 'Loction',
        id: 'loction',
        placeholder: 'Enter your Loction',
    },
]

export const initialState = {
    courtName: "", email: "", number: "", password: '', location: "", distric: "", state: '', event: '',
    images: []
};
export const errorState = {
    courtNameError: "", emailError: "", numberError: "", passwordError: "",
    locationError: '', eventError: '',  imagesError: ""
}


export const turfProfileData = {
    courtName: '', loction:'',state:'',events:'' ,Price: '', number: '', openingTime: '', closingTime: '', images: []
}