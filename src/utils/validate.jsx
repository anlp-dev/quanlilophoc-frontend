import {MESSAGE_ERROR} from '../enums/message.jsx'

export const validateFormModal = (data) => {
    const errors = {};

    if(!data?.fullname.trim()){
        errors.fullname = MESSAGE_ERROR.FULLNAME_REQUIRED;
    }
    if(!data?.email.trim()){
        errors.email = MESSAGE_ERROR.EMAIL_REQUIRED;
    }
    if(!data?.phone.trim()){
        errors.phonenumber = MESSAGE_ERROR.PHONE_REQUIRED;
    }
    if(!data?.address.trim()){
        errors.address_location = MESSAGE_ERROR.ADDRESS_REQUIRED;
    }
    if(!data?.gender.trim()){
        errors.gender_error = MESSAGE_ERROR.GENDER_REQUIRED;
    }
    if(!data?.dateOfBirth.trim()){
        errors.dob = MESSAGE_ERROR.DOB_REQUIRED;
    }
    return errors;
}