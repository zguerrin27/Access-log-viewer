

const validIpRegex =
    RegExp(/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/);
const validResponseCodeRegex = RegExp(/^([1-5][0-9][0-5])/);
const validResponseSizeRegex = RegExp(/^([0-9]*)$/);

export default function validateInput(name, value, formErrors) {

    switch (name) {
        case 'ip_address':                            // done
            formErrors.ip_address =
                validIpRegex.test(value)
                    ? ''
                    : 'Entered ip_address is not valid!';
            break;
        case 'password':                             // done       
            formErrors.password =
                value.length < 1
                    ? 'Entered password is not valid!'
                    : '';
            break;
        case 'user_id':                              // done 
            formErrors.user_id =
                value.length < 1
                    ? 'Entered user_id is not valid!'
                    : '';
            break;
        case 'timestamp':                            // done
            formErrors.timestamp =
                value.length < 1
                    ? 'Entered timestamp is not valid!'
                    : '';
            break;
        case 'request_method':                       // done
            formErrors.request_method =
                this.requestMethodChecker(value)
                    ? ''
                    : 'Entered request_method is not valid!';
            break;
        case 'request_path':                         // done
            formErrors.request_path =
                value.length < 1
                    ? 'Entered request_path is not valid!'
                    : '';
            break;
        case 'request_protocol':                     // done
            formErrors.request_protocol =
                this.requestProtocolChecker(value)
                    ? ''
                    : 'Entered request_protocol is not valid!';
            break;
        case 'response_code':
            formErrors.response_code =
                validResponseCodeRegex.test(value)
                    ? ''
                    : 'Entered response_code is not valid!';
            break;
        case 'response_size':
            formErrors.response_size =
                validResponseSizeRegex.test(value)
                    ? ''
                    : 'Entered response_size is not valid!';
            break;
        case 'referrer':
            formErrors.referrer =
                value.length < 1
                    ? 'Entered referrer is not valid!'
                    : '';
            break;
        case 'browser':
            formErrors.browser =
                value.length < 1
                    ? 'Entered browser is not valid!'
                    : '';
            break;
        default:
            break;
    }


    return formErrors;
}

