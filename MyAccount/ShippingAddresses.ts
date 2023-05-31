class ShippingAddresses {
    Init() {

    }

    SetEditShippingAddressForm(key) {
        $(`#sa_form_section_${key}`).show();
        $(`#sae_btn_${key}`).hide();
        $(`#sa_form_section_${key}`).load("/rest-api/shipping-address/edit?key=" + key, function () {
        });
    }

    SetDeleteShippingAddress(key) {
        $.ajax({
            url: "/rest-api/shipping-address/delete",
            method: "POST",
            data: { key: key },
            success: (resp) => {
                $(`#sa_li_${key}`).remove();
            },
            error: (err) => {
                console.log(err);
            }
        });
    }

    SetCountry(key, code, region) {
        var countryElement = $(`form[id='sa_form_${key}']>div>div[id='CountryKey_div']>div>ul>li[data-parent='CountryKey'][data-value='${code}']`);
        $(`form[id='sa_form_${key}']>div>div[id='CountryKey_div']>input[id='CountryKey']`).val(code);
        $(`form[id='sa_form_${key}']>div>div[id='CountryKey_div']`).data("value", code);
        $(`form[id='sa_form_${key}']>div>div[id='CountryKey_div']`).find(".btn-label").text(countryElement.text());

        $.ajax({
            method: "POST",
            url: "/rest-api/get-regions",
            data: { countryCode: code },
            success: (data) => {
                $(`form[id='sa_form_${key}']>div>div[id='State_div']`).find("ul li").remove();

                $.each(data, function () {
                    $(`form[id='sa_form_${key}']>div>div[id='State_div']`).find("ul").append("<li data-parent='Region' data-value='" +
                        this.Code + "' role='option'>" + this.Region + "</li>")
                });

                var regionElement = $(`form[id='sa_form_${key}']>div>div[id='State_div']>div>ul>li[data-parent='Region'][data-value='${region}']`);
                $(`form[id='sa_form_${key}']>div>div[id='State_div']>input[id='State']`).val(region);
                $(`form[id='sa_form_${key}']>div>div[id='State_div']`).data("value", region)
                $(`form[id='sa_form_${key}']>div>div[id='State_div']`).find(".btn-label").text(regionElement.text());
            }
        });

        $(`form[id='sa_form_${key}']>div[class='input input-select input-required input-select_align-bottom country-key']>div[class='js-error']`).hide();
        $(`form[id='sa_form_${key}']>div[class='input input-select input-required input-select_align-bottom country-state']>div[class='js-error']`).hide();
    }

    ChangeCountry(key) {
        var code = $(`form[id='sa_form_${key}']>div>div[id='CountryKey_div']>input[id='CountryKey']`).val();

        $.ajax({
            method: "POST",
            url: "/rest-api/get-regions",
            data: { countryCode: code },
            success: (data) => {
                $(`form[id='sa_form_${key}']>div>div[id='State_div']`).find("ul li").remove();
                $(`form[id='sa_form_${key}']>div>div[id='State_div']>input[id='State']`).val("");
                $(`form[id='sa_form_${key}']>div>div[id='State_div']`).data("value", "");
                $(`form[id='sa_form_${key}']>div>div[id='State_div']`).find(".btn-label").text("Select a State/Region");

                $.each(data, function () {
                    $(`form[id='sa_form_${key}']>div>div[id='State_div']`).find("ul").append("<li data-parent='Region' data-value='" +
                        this.Code + "' role='option'>" + this.Region + "</li>")
                });
            }
        });
    }

    SetSaveShippingAddressForm(key) {
        if (!$(`#sa_form_${key}`).valid())
            return;

        $(`#btn_saf_${key}`).prop('disabled', true);

        var Name = $(`form[id='sa_form_${key}']>div>div>input[id='Name']`).val();
        var Address1 = $(`form[id='sa_form_${key}']>div>div>input[id='Address1']`).val();
        var Address2 = $(`form[id='sa_form_${key}']>div>div>input[id='Address2']`).val();
        var CountryKey = $(`form[id='sa_form_${key}']>div>div[id='CountryKey_div']>input[id='CountryKey']`).val();
        var City = $(`form[id='sa_form_${key}']>div>div>input[id='City']`).val();
        var State = $(`form[id='sa_form_${key}']>div>div[id='State_div']>input[id='State']`).val();
        var Zip = $(`form[id='sa_form_${key}']>div>div>input[id='Zip']`).val();
        var Contact = $(`form[id='sa_form_${key}']>div>div>input[id='Contact']`).val();

        var jsonData = {
            ShipCode: key == "0" ? "" : key,
            Name: Name,
            Address1: Address1,
            Address2: Address2,
            CountryKey: CountryKey,
            City: City,
            State: State,
            Zip: Zip,
            Contact: Contact
        };

        console.log(jsonData)

        $(`#loader_div_saf_${key}`).load("/rest-api/loading-animation", { type: "saf-btn", size: "small", loading: "loading" }, function () {
            var apiUrl = '';
            if (key == "0") {
                apiUrl = "/rest-api/shipping-address/add";
            }
            else {
                apiUrl = "/rest-api/shipping-address/update";
            }

            $.ajax({
                url: apiUrl,
                method: "POST",
                data: JSON.stringify(jsonData),
                dataType: "json",
                contentType: 'application/json; charset=utf-8',
                success: (resp) => {
                    $(`#loader_div_saf_${key}`).empty(); //loader partial view hide
                    $(`#btn_saf_${key}`).prop('disabled', false);
                    console.log("shipping address : no error..........")
                    console.log(resp.Results);

                    if (resp.Results && resp.Results[0]) {
                        if (!resp.Results[0].success) {
                            $("#sa_form_error").html("<span class='text-danger'>" + resp.Results[0].errorstring + " (Errorcode - " + resp.Results[0].errorcode + ")</span>");
                        }
                        else {
                            $("#sa_form_error").html("<span class='text-success'>Added Successfully!</span>");
                            window.setTimeout(function () { location.reload(); }, 2000);
                        }
                    }
                    else {
                        $("#sa_form_error").html("<span class='text-danger'>api error</span>");
                    }
                },
                error: (err) => {
                    console.log("shipping address : error found..........")
                    console.log(err);
                    $(`#loader_div_saf_${key}`).empty(); //loader partial view hide
                    $(`#btn_saf_${key}`).prop('disabled', false);
                    $("#sa_form_error").html("<span class='text-danger'>can't send new form data</span>");
                }
            });
        });
    }

    SetCancelShippingAddressForm(key) {
        $(`#sa_form_section_${key}`).hide();
        $(`#sae_btn_${key}`).show();
        $(`#sa_form_section_${key}`).empty();
        $(`#update_status_${key}`).show();
    }
}
