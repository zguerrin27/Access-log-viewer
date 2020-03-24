
const validIpRegex = RegExp(/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/);
const validResponseCodeRegex = RegExp(/^([1-5][0-9][0-5])/);
const validResponseSizeRegex = RegExp(/^([0-9]*)$/);

export const requestMethodChecker = (value) => {
    let successValues = [
        "GET",
        "HEAD",
        "POST",
        "PUT",
        "DELETE",
        "CONNECT",
        "OPTIONS",
        "TRACE"
    ]
    if (successValues.indexOf(value) !== -1) {
        return true;
    }
    return false;
}

export const requestProtocolChecker = (value) => {
    let successValues = [
        "HTTP/1.0",
        "HTTP/1.1",
        "HTTP/2.0"
    ]
    if (successValues.indexOf(value) !== -1) {
        return true;
    }
    return false;
}

export const checkForPresence = (value) => {
    let trimedVal;
    if(typeof value === "string"){
       trimedVal = value.trim()
    } else {
       trimedVal = value
    }
    if (trimedVal.length > 0) {
        return true;
    } else {
        return false;
    }
}

export default function validateInput(name, value, formErrors) {

    switch (name) {
        case 'ip_address':
            formErrors.ip_address =
                validIpRegex.test(value)
                    ? ''
                    : 'Entered IP Address is not valid';
            break;
        case 'password':
            formErrors.password =
                checkForPresence(value)
                    ? ''
                    : 'Entered Password is not valid';
            break;
        case 'user_id':
            formErrors.user_id =
                checkForPresence(value)
                    ? ''
                    : 'Entered User ID is not valid';
            break;
        case 'timestamp':
            formErrors.timestamp =
                checkForPresence(value)
                    ? ''
                    : 'Entered Timestamp is not valid';
            break;
        case 'request_method':
            formErrors.request_method =
                requestMethodChecker(value)
                    ? ''
                    : 'Entered Request Method is not valid';
            break;
        case 'request_path':
            formErrors.request_path =
                checkForPresence(value)
                    ? ''
                    : 'Entered Request Path is not valid';
            break;
        case 'request_protocol':
            formErrors.request_protocol =
                requestProtocolChecker(value)
                    ? ''
                    : 'Entered Request Protocol is not valid';
            break;
        case 'response_code':
            formErrors.response_code =
                validResponseCodeRegex.test(value)
                    ? ''
                    : 'Entered Response Code is not valid';
            break;
        case 'response_size':
            formErrors.response_size =
                validResponseSizeRegex.test(value)
                    ? ''
                    : 'Entered Response Size is not valid';
            break;
        case 'referrer':
            formErrors.referrer =
                checkForPresence(value)
                    ? ''
                    : 'Entered Referrer is not valid';
            break;
        case 'browser':
            formErrors.browser =
                checkForPresence(value)
                    ? ''
                    : 'Entered Browser is not valid';
            break;
        default:
            break;
    }


    return formErrors;
}
