class CompanyContacts {
    Init() {

    }

    SetEditContactForm(key) {
        $(`#contact_form_section_${key}`).show();
        $(`#cce_btn_${key}`).hide();
        $(`#contact_form_section_${key}`).load("/rest-api/contacts/edit?key=" + key, function () {
        });
    }

    SetCancelContactForm(key) {
        $(`#contact_form_section_${key}`).hide();
        $(`#cce_btn_${key}`).show();
        $(`#contact_form_section_${key}`).empty();
        $(`#update_status_${key}`).show();
    }

    SetCountry(code, region, key) {
        var countryElement = $(`form[id='contact_form_${key}']>div>div[id='countrykey_div']>div>ul>li[data-parent='countrykey'][data-value='${code}']`);
        $(`form[id='contact_form_${key}']>div>div[id='countrykey_div']>input[id='countrykey']`).val(code);
        $(`form[id='contact_form_${key}']>div>div[id='countrykey_div']`).data("value", code);
        $(`form[id='contact_form_${key}']>div>div[id='countrykey_div']`).find(".btn-label").text(countryElement.text());

        $.ajax({
            method: "POST",
            url: "/rest-api/get-regions",
            data: { countryCode: code },
            success: (data) => {
                $(`form[id='contact_form_${key}']>div>div[id='state_div']`).find("ul li").remove();

                $.each(data, function () {
                    $(`form[id='contact_form_${key}']>div>div[id='state_div']`).find("ul").append("<li data-parent='Region' data-value='" +
                        this.Code + "' role='option'>" + this.Region + "</li>")
                });

                var regionElement = $(`form[id='contact_form_${key}']>div>div[id='state_div']>div>ul>li[data-parent='Region'][data-value='${region}']`);
                $(`form[id='contact_form_${key}']>div>div[id='state_div']>input[id='state']`).val(region);
                $(`form[id='contact_form_${key}']>div>div[id='state_div']`).data("value", region)
                $(`form[id='contact_form_${key}']>div>div[id='state_div']`).find(".btn-label").text(regionElement.text());
            }
        });

        $(`form[id='contact_form_${key}']>div[class='input input-select input-required input-select_align-bottom country-key']>div[class='js-error']`).hide();
        $(`form[id='contact_form_${key}']>div[class='input input-select input-required input-select_align-bottom country-state']>div[class='js-error']`).hide();
    }

    ChangeCountry(key) {
        var code = $(`form[id='contact_form_${key}']>div>div[id='countrykey_div']>input[id='countrykey']`).val();

        $.ajax({
            method: "POST",
            url: "/rest-api/get-regions",
            data: { countryCode: code },
            success: (data) => {
                $(`form[id='contact_form_${key}']>div>div[id='state_div']`).find("ul li").remove();
                $(`form[id='contact_form_${key}']>div>div[id='state_div']>input[id='state']`).val("");
                $(`form[id='contact_form_${key}']>div>div[id='state_div']`).data("value", "");
                $(`form[id='contact_form_${key}']>div>div[id='state_div']`).find(".btn-label").text("Select a State/Region");

                $.each(data, function () {
                    $(`form[id='contact_form_${key}']>div>div[id='state_div']`).find("ul").append("<li data-parent='Region' data-value='" +
                        this.Code + "' role='option'>" + this.Region + "</li>")
                });
            }
        });
    }

    SetGeneralPhonePrefix(prefix, key, code, number, ckey, isRequired) {
        var value = "";
        if (number) {
            value = code + " " + number;
            this.ChangeGeneralContactNumberPrefix(prefix, key, code, value, ckey, isRequired);
        }
        else {
            this.ChangeGeneralContactNumberPrefix(prefix, key, code, code, ckey, isRequired);
        }
        
    }

    ChangeGeneralPhonePrefix(prefix, ckey, isRequired) {
        var key = null;
        var code = null;

        if (isRequired) {
            key = $(`form[id='contact_form_${ckey}']>div[class='input input-phone input-required']>div>div>div[id='${prefix}Select']>select[id='${prefix}Country']`).val();
            code = $(`form[id='contact_form_${ckey}']>div[class='input input-phone input-required']>div>div>div[id='${prefix}Select']>select[id='${prefix}Country']>option:selected`).data("dialing-code");
        }
        else {
            key = $(`form[id='contact_form_${ckey}']>div[class='input input-phone false']>div>div>div>div[id='${prefix}Select']>select[id='${prefix}Country']`).val();
            code = $(`form[id='contact_form_${ckey}']>div[class='input input-phone false']>div>div>div>div[id='${prefix}Select']>select[id='${prefix}Country']>option:selected`).data("dialing-code");
        }

        this.ChangeGeneralContactNumberPrefix(prefix, key, code, code, ckey, isRequired);
    }

    ChangeGeneralContactNumberPrefix(prefix, key, code, value, ckey, isRequired) {
        var img_html = '';

        if (key == "ZZ") {
            img_html = '<svg id="' + prefix + 'InputCountryIconImg" data-phone-code="0" class="PhoneInputCountryIconImg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 75 50"><title>International</title><g class="PhoneInputInternationalIconGlobe" stroke="currentColor" fill="none" stroke-width="2" stroke-miterlimit="10"><path stroke-linecap="round" d="M47.2,36.1C48.1,36,49,36,50,36c7.4,0,14,1.7,18.5,4.3"></path><path d="M68.6,9.6C64.2,12.3,57.5,14,50,14c-7.4,0-14-1.7-18.5-4.3"></path><line x1="26" y1="25" x2="74" y2="25"></line><line x1="50" y1="1" x2="50" y2="49"></line><path stroke-linecap="round" d="M46.3,48.7c1.2,0.2,2.5,0.3,3.7,0.3c13.3,0,24-10.7,24-24S63.3,1,50,1S26,11.7,26,25c0,2,0.3,3.9,0.7,5.8"></path><path stroke-linecap="round" d="M46.8,48.2c1,0.6,2.1,0.8,3.2,0.8c6.6,0,12-10.7,12-24S56.6,1,50,1S38,11.7,38,25c0,1.4,0.1,2.7,0.2,4c0,0.1,0,0.2,0,0.2"></path></g><path class="PhoneInputInternationalIconPhone" stroke="none" fill="currentColor" d="M12.4,17.9c2.9-2.9,5.4-4.8,0.3-11.2S4.1,5.2,1.3,8.1C-2,11.4,1.1,23.5,13.1,35.6s24.3,15.2,27.5,11.9c2.8-2.8,7.8-6.3,1.4-11.5s-8.3-2.6-11.2,0.3c-2,2-7.2-2.2-11.7-6.7S10.4,19.9,12.4,17.9z"></path></svg>';
        }
        else {
            img_html = '<img id="' + prefix + 'InputCountryIconImg" data-phone-code="' + code + '" class="PhoneInputCountryIconImg" role="presentation" src="https://catamphetamine.gitlab.io/country-flag-icons/3x2/' + key + '.svg">';
        }

        if (isRequired == true) {
            $(`form[id='contact_form_${ckey}']>div[class='input input-phone input-required']>div>div>div[id='${prefix}Select']>div[id='${prefix}InputCountryIcon']`).html(img_html);
        }
        else {
            $(`form[id='contact_form_${ckey}']>div[class='input input-phone false']>div>div>div>div[id='${prefix}Select']>div[id='${prefix}InputCountryIcon']`).html(img_html);
        }

        if (value) {
            if (isRequired == true) {
                $(`form[id='contact_form_${ckey}']>div[class='input input-phone input-required']>div>div>div[class='input-wrapper']>input[id='${prefix}']`).val("+" + value);
            }
            else {
                $(`form[id='contact_form_${ckey}']>div[class='input input-phone false']>div>div>div>div[class='input-wrapper']>input[id='${prefix}']`).val("+" + value);
            }
        }
    }

    GeneralNumberFormatter(ckey, prefix, isRequired) {
        if (isRequired) {
            var ele1 = $(`form[id='contact_form_${ckey}']>div[class='input input-phone input-required']>div>div>div[class='input-wrapper']>input[id='${prefix}']`);
            if (ele1.val()) {
                var value1 = this.GeneralFormatPhoneNumber(ckey, ele1.val(), prefix, isRequired);
                ele1.val("+" + value1);
            }
            else {
                var img_html = '<svg id="' + prefix + 'InputCountryIconImg" data-phone-code="0" class="PhoneInputCountryIconImg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 75 50"><title>International</title><g class="PhoneInputInternationalIconGlobe" stroke="currentColor" fill="none" stroke-width="2" stroke-miterlimit="10"><path stroke-linecap="round" d="M47.2,36.1C48.1,36,49,36,50,36c7.4,0,14,1.7,18.5,4.3"></path><path d="M68.6,9.6C64.2,12.3,57.5,14,50,14c-7.4,0-14-1.7-18.5-4.3"></path><line x1="26" y1="25" x2="74" y2="25"></line><line x1="50" y1="1" x2="50" y2="49"></line><path stroke-linecap="round" d="M46.3,48.7c1.2,0.2,2.5,0.3,3.7,0.3c13.3,0,24-10.7,24-24S63.3,1,50,1S26,11.7,26,25c0,2,0.3,3.9,0.7,5.8"></path><path stroke-linecap="round" d="M46.8,48.2c1,0.6,2.1,0.8,3.2,0.8c6.6,0,12-10.7,12-24S56.6,1,50,1S38,11.7,38,25c0,1.4,0.1,2.7,0.2,4c0,0.1,0,0.2,0,0.2"></path></g><path class="PhoneInputInternationalIconPhone" stroke="none" fill="currentColor" d="M12.4,17.9c2.9-2.9,5.4-4.8,0.3-11.2S4.1,5.2,1.3,8.1C-2,11.4,1.1,23.5,13.1,35.6s24.3,15.2,27.5,11.9c2.8-2.8,7.8-6.3,1.4-11.5s-8.3-2.6-11.2,0.3c-2,2-7.2-2.2-11.7-6.7S10.4,19.9,12.4,17.9z"></path></svg>';
                $(`form[id='contact_form_${ckey}']>div[class='input input-phone input-required']>div>div>div[id='${prefix}Select']>div[id='${prefix}InputCountryIcon']`).html(img_html);
            }
        }
        else {
            var ele2 = $(`form[id='contact_form_${ckey}']>div[class='input input-phone false']>div>div>div>div[class='input-wrapper']>input[id='${prefix}']`);
            if (ele2.val()) {
                var value2 = this.GeneralFormatPhoneNumber(ckey, ele2.val(), prefix, isRequired);
                ele2.val("+" + value2);
            }
            else {
                var img_html = '<svg id="' + prefix + 'InputCountryIconImg" data-phone-code="0" class="PhoneInputCountryIconImg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 75 50"><title>International</title><g class="PhoneInputInternationalIconGlobe" stroke="currentColor" fill="none" stroke-width="2" stroke-miterlimit="10"><path stroke-linecap="round" d="M47.2,36.1C48.1,36,49,36,50,36c7.4,0,14,1.7,18.5,4.3"></path><path d="M68.6,9.6C64.2,12.3,57.5,14,50,14c-7.4,0-14-1.7-18.5-4.3"></path><line x1="26" y1="25" x2="74" y2="25"></line><line x1="50" y1="1" x2="50" y2="49"></line><path stroke-linecap="round" d="M46.3,48.7c1.2,0.2,2.5,0.3,3.7,0.3c13.3,0,24-10.7,24-24S63.3,1,50,1S26,11.7,26,25c0,2,0.3,3.9,0.7,5.8"></path><path stroke-linecap="round" d="M46.8,48.2c1,0.6,2.1,0.8,3.2,0.8c6.6,0,12-10.7,12-24S56.6,1,50,1S38,11.7,38,25c0,1.4,0.1,2.7,0.2,4c0,0.1,0,0.2,0,0.2"></path></g><path class="PhoneInputInternationalIconPhone" stroke="none" fill="currentColor" d="M12.4,17.9c2.9-2.9,5.4-4.8,0.3-11.2S4.1,5.2,1.3,8.1C-2,11.4,1.1,23.5,13.1,35.6s24.3,15.2,27.5,11.9c2.8-2.8,7.8-6.3,1.4-11.5s-8.3-2.6-11.2,0.3c-2,2-7.2-2.2-11.7-6.7S10.4,19.9,12.4,17.9z"></path></svg>';
                $(`form[id='contact_form_${ckey}']>div[class='input input-phone false']>div>div>div>div[id='${prefix}Select']>div[id='${prefix}InputCountryIcon']`).html(img_html);
            }
        }
    }

    GeneralFormatPhoneNumber(ckey, value, prefix, isRequired) {
        var code = 0;
        if (isRequired) {
            code = $(`form[id='contact_form_${ckey}']>div[class='input input-phone input-required']>div>div>div[id='${prefix}Select']>div[id='${prefix}InputCountryIcon']>img`).data("phone-code");
        }
        else {
            code = $(`form[id='contact_form_${ckey}']>div[class='input input-phone false']>div>div>div>div[id='${prefix}Select']>div[id='${prefix}InputCountryIcon']>img`).data("phone-code");
        }

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

    SetWebsiteUser(flag, key) {
        var webpermissions = $(`form[id='contact_form_${key}']>div>div[id='webpermissions_div']>div>ul>li[data-parent='webpermissions'][data-value='${flag}']`);
        $(`form[id='contact_form_${key}']>div>div[id='webpermissions_div']>input[id='webpermissions']`).val(flag);
        $(`form[id='contact_form_${key}']>div>div[id='webpermissions_div']`).data("value", flag)
        $(`form[id='contact_form_${key}']>div>div[id='webpermissions_div']`).find(".btn-label").text(webpermissions.text());

        $(`form[id='contact_form_${key}']>div[class='input input-select input-required input-select_align-bottom website-user']>div[class='js-error']`).hide();
    }

    SetSaveContactForm(ckey) {
        if ($(`#contact_form_${ckey}`).valid()) {
            $(`#btn_ccf_${ckey}`).prop('disabled', true);

            var fullName = $(`form[id='contact_form_${ckey}']>div>div>input[id='Contact']`).val();
            var jobTitle = $(`form[id='contact_form_${ckey}']>div>div>input[id='JobTitle']`).val();
            var email = $(`form[id='contact_form_${ckey}']>div>div>input[id='Email']`).val();
            var addr1 = $(`form[id='contact_form_${ckey}']>div>div>input[id='addr1']`).val();
            var addr2 = $(`form[id='contact_form_${ckey}']>div>div>input[id='addr2']`).val();
            var countryKey = $(`form[id='contact_form_${ckey}']>div>div[id='countrykey_div']>input[id='countrykey']`).val();
            var city = $(`form[id='contact_form_${ckey}']>div>div>input[id='city']`).val();
            var state = $(`form[id='contact_form_${ckey}']>div>div[id='state_div']>input[id='state']`).val();
            var zip = $(`form[id='contact_form_${ckey}']>div>div>input[id='zip']`).val();
            var phone = $(`form[id='contact_form_${ckey}']>div[class='input input-phone input-required']>div>div>div[class='input-wrapper']>input[id='phone']`).val();
            var phoneExt = $(`form[id='contact_form_${ckey}']>div>div>input[id='phone_ext']`).val();
            var additionalphone = $(`form[id='contact_form_${ckey}']>div[class='input input-phone false']>div>div>div>div[class='input-wrapper']>input[id='additionalphone']`).val();
            var cellphone = $(`form[id='contact_form_${ckey}']>div[class='input input-phone false']>div>div>div>div[class='input-wrapper']>input[id='cellphone']`).val();
            var fax = $(`form[id='contact_form_${ckey}']>div[class='input input-phone false']>div>div>div>div[class='input-wrapper']>input[id='fax']`).val();
            var webpermissions = $(`form[id='contact_form_${ckey}']>div>div[id='webpermissions_div']>input[id='webpermissions']`).val();

            var jsonData = {
                contactkey: ckey,
                city: city,
                Contact: fullName,
                JobTitle: jobTitle,
                state: state,
                zip: zip,
                additionalphone: additionalphone,
                addr1: addr1,
                addr2: addr2,
                cellphone: cellphone,
                countryKey: countryKey,
                Email: email,
                fax: fax,
                phone: phone,
                phone_ext: phoneExt,
                webpermissions: webpermissions
            };

            $(`#loader_div_ccf_${ckey}`).load("/rest-api/loading-animation", { type: "ccf-btn", size: "small", loading: "loading" }, function () {
                var apiUrl = '';
                if (ckey == 0) {
                    apiUrl = "/rest-api/contacts/add";
                }
                else {
                    apiUrl = "/rest-api/contacts/update";
                }

                $.ajax({
                    url: apiUrl,
                    method: "POST",
                    data: JSON.stringify(jsonData),
                    dataType: "json",
                    contentType: 'application/json; charset=utf-8',
                    success: (resp) => {
                        $(`#loader_div_ccf_${ckey}`).empty(); //loader partial view hide
                        $(`#btn_ccf_${ckey}`).prop('disabled', false);

                        if (resp.Results && resp.Results[0]) {
                            if (!resp.Results[0].success) {
                                $("#contact_form_error").html("<span class='text-danger'>" + resp.Results[0].errorstring + "</span>");
                            }
                            else {
                                $("#contact_form_error").html("<span class='text-success'>Added Successfully!</span>");
                                window.setTimeout(function () { location.reload(); }, 2000);
                            }
                        }
                        else {
                            $("#contact_form_error").html("<span class='text-danger'>api error</span>");
                        }
                    },
                    error: (err) => {
                        console.log(err);
                        $(`#loader_div_ccf_${ckey}`).empty(); //loader partial view hide
                        $(`#btn_ccf_${ckey}`).prop('disabled', false);
                        $("#contact_form_error").html("<span class='text-danger'>can't send new form data</span>");
                    }
                });
            });
        }
    }

    SetDeleteContactForm(ckey) {
        $.ajax({
            url: "/rest-api/contacts/delete",
            method: "POST",
            data: { contactKey: ckey },
            success: (resp) => {
                $(`#contact_li_${ckey}`).remove();
            },
            error: (err) => {
                console.log(err);
            }
        });
    }

    SetNewEditContactForm(key) {
        $(`#contact_form_section_${key}`).show();
        $(`#contact_form_section_${key}`).load("/rest-api/contacts/edit?key=" + key, function () {
        });
    }

    SetNewDeleteContactForm(ckey) {
        $.ajax({
            url: "/rest-api/contacts/delete",
            method: "POST",
            data: { contactKey: ckey },
            success: (resp) => {
                $(`#contact_tr_${ckey}`).remove();
            },
            error: (err) => {
                console.log(err);
            }
        });
    }
}
