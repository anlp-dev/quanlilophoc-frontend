const signUpValidate = {
    passWorldValidate(password, passwordConfig, setPasswordError, setPasswordErrorMessage) {
        if (!password.value || password.value.length < passwordConfig?.lengthPass) {
            setPasswordError(true);
            setPasswordErrorMessage(`Mật khẩu phải lớn hơn ${passwordConfig?.lengthPass} kí tự !`);
            return false;
        }

        if (passwordConfig?.specialCharacters) {
            const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password.value);
            if (!hasSpecialChar) {
                setPasswordError(true);
                setPasswordErrorMessage(`Mật khẩu phải có kí tự đặc biệt!`);
                return false;
            }
        }

        if (passwordConfig?.numbersCharacters) {
            const hasNumber = /\d/.test(password.value);
            if (!hasNumber) {
                setPasswordError(true);
                setPasswordErrorMessage(`Mật khẩu phải có kí tự số!`);
                return false;
            }
        }

        if (passwordConfig?.upperCaseCharacters) {
            const hasUpperCaseChar = /[A-Z]/.test(password.value);
            if (!hasUpperCaseChar) {
                setPasswordError(true);
                setPasswordErrorMessage(`Mật khẩu phải có kí tự in hoa!`);
                return false;
            }
        }
        setPasswordError(false);
        setPasswordErrorMessage('');
        return true;
    },
    rePassValidate(rePass, pass, setRePassErr, setRePassErrMess) {
        if (!rePass.value) {
            setRePassErr(true);
            setRePassErrMess('Mật khẩu nhập lại không được để trống!');
            return false;
        }
        if (rePass.value !== pass.value) {
            setRePassErr(true);
            setRePassErrMess('Mật khẩu nhập lại không chính xác !');
            return false;
        }
        if (rePass.value === pass.value){
            setRePassErr(false);
            setRePassErrMess(' ');
            return true;
        }
    },
    userNameValidate(username, setUserNameError, setUNameMess){
        if (!username.value) {
            setUserNameError(true);
            setUNameMess('Tên đăng nhập không được để trống !')
            return false;
        } else {
            setUserNameError(false)
            setUNameMess('')
            return true;
        }
    },
    emailValidate(email, setEmailError, setEmailErrorMessage) {
        if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
            setEmailError(true);
            setEmailErrorMessage('Vui lòng không để trống và nhập đúng định dạng !');
            return false;
        } else {
            setEmailError(false);
            setEmailErrorMessage('');
            return true;
        }
    },
    nameValidate(name, setNameError, setNameErrorMessage){
        if (!name.value || name.value.length < 1) {
            setNameError(true);
            setNameErrorMessage('Vui lòng không để trống họ tên!');
            return false;
        } else {
            setNameError(false);
            setNameErrorMessage('');
            return true;
        }
    }
}

export default signUpValidate;