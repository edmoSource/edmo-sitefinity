class BaseComponent {
    ChangePhonePrefix() {
        var key = $("#phoneCountry").val();
        var code = $("#phoneCountry option:selected").data("dialing-code");
        this.ChangeContactNumberPrefix('Phone', key, code, code);
    }

    ChangeFaxPrefix() {
        var key = $("#faxCountry").val();
        var code = $("#faxCountry option:selected").data("dialing-code");
        this.ChangeContactNumberPrefix('Fax', key, code, code);
    }

    SetPhonePrefix(key, code, number) {
        var value = code + " " + number;
        this.ChangeContactNumberPrefix('Phone', key, code, value);
    }

    SetFaxPrefix(key, code, number) {
        if (number) {
            var value = code + " " + number;
            this.ChangeContactNumberPrefix('Fax', key, code, value);
        }
        else {
            this.ChangeContactNumberPrefix('Fax', key, code, code);
        }
    }

    ChangeContactNumberPrefix(prefix, key, code, value) {
        var img_html = '';

        if (key == "ZZ") {
            img_html = '<svg id="' + prefix + 'InputCountryIconImg" data-phone-code="0" class="PhoneInputCountryIconImg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 75 50"><title>International</title><g class="PhoneInputInternationalIconGlobe" stroke="currentColor" fill="none" stroke-width="2" stroke-miterlimit="10"><path stroke-linecap="round" d="M47.2,36.1C48.1,36,49,36,50,36c7.4,0,14,1.7,18.5,4.3"></path><path d="M68.6,9.6C64.2,12.3,57.5,14,50,14c-7.4,0-14-1.7-18.5-4.3"></path><line x1="26" y1="25" x2="74" y2="25"></line><line x1="50" y1="1" x2="50" y2="49"></line><path stroke-linecap="round" d="M46.3,48.7c1.2,0.2,2.5,0.3,3.7,0.3c13.3,0,24-10.7,24-24S63.3,1,50,1S26,11.7,26,25c0,2,0.3,3.9,0.7,5.8"></path><path stroke-linecap="round" d="M46.8,48.2c1,0.6,2.1,0.8,3.2,0.8c6.6,0,12-10.7,12-24S56.6,1,50,1S38,11.7,38,25c0,1.4,0.1,2.7,0.2,4c0,0.1,0,0.2,0,0.2"></path></g><path class="PhoneInputInternationalIconPhone" stroke="none" fill="currentColor" d="M12.4,17.9c2.9-2.9,5.4-4.8,0.3-11.2S4.1,5.2,1.3,8.1C-2,11.4,1.1,23.5,13.1,35.6s24.3,15.2,27.5,11.9c2.8-2.8,7.8-6.3,1.4-11.5s-8.3-2.6-11.2,0.3c-2,2-7.2-2.2-11.7-6.7S10.4,19.9,12.4,17.9z"></path></svg>';
        }
        else {
            img_html = '<img id="' + prefix + 'InputCountryIconImg" data-phone-code="' + code + '" class="PhoneInputCountryIconImg" role="presentation" src="https://catamphetamine.gitlab.io/country-flag-icons/3x2/' + key + '.svg">';
        }

        $(`#${prefix}InputCountryIcon`).html(img_html);

        if (value) {
            $(`#${prefix}`).val("+" + value);
        }
    }

    NumberFormatter(prefix) {
        var input_value = $(`#${prefix}`).val();
        if (input_value) {
            var formattedInputValue = this.FormatPhoneNumber(input_value, prefix);
            $(`#${prefix}`).val("+" + formattedInputValue);
        }
        else {
            var img_html = '<svg id="' + prefix + 'InputCountryIconImg" data-phone-code="0" class="PhoneInputCountryIconImg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 75 50"><title>International</title><g class="PhoneInputInternationalIconGlobe" stroke="currentColor" fill="none" stroke-width="2" stroke-miterlimit="10"><path stroke-linecap="round" d="M47.2,36.1C48.1,36,49,36,50,36c7.4,0,14,1.7,18.5,4.3"></path><path d="M68.6,9.6C64.2,12.3,57.5,14,50,14c-7.4,0-14-1.7-18.5-4.3"></path><line x1="26" y1="25" x2="74" y2="25"></line><line x1="50" y1="1" x2="50" y2="49"></line><path stroke-linecap="round" d="M46.3,48.7c1.2,0.2,2.5,0.3,3.7,0.3c13.3,0,24-10.7,24-24S63.3,1,50,1S26,11.7,26,25c0,2,0.3,3.9,0.7,5.8"></path><path stroke-linecap="round" d="M46.8,48.2c1,0.6,2.1,0.8,3.2,0.8c6.6,0,12-10.7,12-24S56.6,1,50,1S38,11.7,38,25c0,1.4,0.1,2.7,0.2,4c0,0.1,0,0.2,0,0.2"></path></g><path class="PhoneInputInternationalIconPhone" stroke="none" fill="currentColor" d="M12.4,17.9c2.9-2.9,5.4-4.8,0.3-11.2S4.1,5.2,1.3,8.1C-2,11.4,1.1,23.5,13.1,35.6s24.3,15.2,27.5,11.9c2.8-2.8,7.8-6.3,1.4-11.5s-8.3-2.6-11.2,0.3c-2,2-7.2-2.2-11.7-6.7S10.4,19.9,12.4,17.9z"></path></svg>';
            $(`#${prefix}InputCountryIcon`).html(img_html);
        }
    }

    FormatPhoneNumber(value, prefix) {
        var code = $(`#${prefix}InputCountryIconImg`).data("phone-code");

        if (!value)
            return value;

        const phoneNumber = value.replace(/[^\d]/g, '');
        const phoneNumberLength = phoneNumber.length;

        if (code == 0) {
            return phoneNumber;
        }
        else {
            if (code.toString().length == 1) {
                if (phoneNumberLength < 2)
                    return phoneNumber;

                return `${phoneNumber.slice(0, 1)} ${phoneNumber.slice(1, 12)}`;
            }
            else if (code.toString().length == 2) {
                if (phoneNumberLength < 3)
                    return phoneNumber;

                return `${phoneNumber.slice(0, 2)} ${phoneNumber.slice(2, 12)}`;
            }
            else if (code.toString().length == 3) {
                if (phoneNumberLength < 4)
                    return phoneNumber;

                return `${phoneNumber.slice(0, 3)} ${phoneNumber.slice(3, 12)}`;
            }
        }
    }
}