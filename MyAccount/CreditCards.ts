class CreditCards {
    Init() {

    }

    SetEditCreditCardForm(key) {
        $(`#crc_form_section_${key}`).show();
        $(`#crce_btn_${key}`).hide();
        $(`#crc_form_section_${key}`).load("/rest-api/credit-cards/edit?key=" + key, function () {
        });
    }

    SetDeleteCreditCard(ckey) {
        $.ajax({
            url: "/rest-api/credit-cards/delete",
            method: "POST",
            data: { cckey: ckey },
            success: (resp) => {
                $(`#crc_li_${ckey}`).remove();
            },
            error: (err) => {
                console.log(err);
            }
        });
    }

    SetSaveCreditCardForm(ckey) {
        if ($(`#crc_form_${ckey}`).valid()) {
            $(`#btn_crcf_${ckey}`).prop('disabled', true);

            var ccname = $(`form[id='crc_form_${ckey}']>div>div>input[id='ccname']`).val();
            var carddisplay = $(`form[id='crc_form_${ckey}']>div>div>input[id='carddisplay']`).val();
            var ccexp = $(`form[id='crc_form_${ckey}']>div[class='input-group_row']>div>div>input[id='ccexp']`).val();
            var ccnum = $(`form[id='crc_form_${ckey}']>div[class='input-group_row']>div>div>input[id='ccnum']`).val();
            var ccaddr1 = $(`form[id='crc_form_${ckey}']>div>div>input[id='ccaddr1']`).val();
            var ccaddr2 = $(`form[id='crc_form_${ckey}']>div>div>input[id='ccaddr2']`).val();
            var countryKey = $(`form[id='crc_form_${ckey}']>div>div[id='countrykey_div']>input[id='countrykey']`).val();
            var cccity = $(`form[id='crc_form_${ckey}']>div>div>input[id='cccity']`).val();
            var ccstate = $(`form[id='crc_form_${ckey}']>div>div[id='ccstate_div']>input[id='ccstate']`).val();
            var cczip = $(`form[id='crc_form_${ckey}']>div>div>input[id='cczip']`).val();
            var primary = false;
            if ($(`div[id='crcp_btn_${ckey}']>div>input[type='checkbox'][name='primary']`).is(':checked')) {
                primary = true;
            }

            var jsonData = {
                cckey: ckey,
                ccname: ccname,
                carddisplay: carddisplay,
                ccexp: ccexp,
                ccnum: ccnum,
                ccaddr1: ccaddr1,
                ccaddr2: ccaddr2,
                cccity: cccity,
                cczip: cczip,
                ccstate: ccstate,
                countryKey: countryKey,
                primary: primary
            };

            $(`#loader_div_crcf_${ckey}`).load("/rest-api/loading-animation", { type: "crcf-btn", size: "small", loading: "loading" }, function () {
                var apiUrl = '';
                if (ckey == 0) {
                    apiUrl = "/rest-api/credit-cards/add";
                }
                else {
                    apiUrl = "/rest-api/credit-cards/update";
                }

                $.ajax({
                    url: apiUrl,
                    method: "POST",
                    data: JSON.stringify(jsonData),
                    dataType: "json",
                    contentType: 'application/json; charset=utf-8',
                    success: (resp) => {
                        $(`#loader_div_crcf_${ckey}`).empty(); //loader partial view hide
                        $(`#btn_crcf_${ckey}`).prop('disabled', false);
                        console.log("credit card : no error..........")
                        console.log(resp.Results);

                        if (resp.Results && resp.Results[0]) {
                            if (!resp.Results[0].success) {
                                $("#crc_form_error").html("<span class='text-danger'>" + resp.Results[0].errorstring + " (Errorcode - " + resp.Results[0].errorcode + ")</span>");
                            }
                            else {
                                $("#crc_form_error").html("<span class='text-success'>Added Successfully!</span>");
                                window.setTimeout(function () { location.reload(); }, 2000);
                            }
                        }
                        else {
                            $("#crc_form_error").html("<span class='text-danger'>api error</span>");
                        }
                    },
                    error: (err) => {
                        console.log("credit card : error found..........")
                        console.log(err);
                        $(`#loader_div_crcf_${ckey}`).empty(); //loader partial view hide
                        $(`#btn_crcf_${ckey}`).prop('disabled', false);
                        $("#crc_form_error").html("<span class='text-danger'>can't send new form data</span>");
                    }
                });
            });
        }
    }

    SetCancelCreditCardForm(key) {
        $(`#crc_form_section_${key}`).hide();
        $(`#crce_btn_${key}`).show();
        $(`#crc_form_section_${key}`).empty();
        $(`#update_status_${key}`).show();
    }

    SetCountry(key, code, region) {
        var ce = $(`form[id='crc_form_${key}']>div>div[id='countrykey_div']>div>ul>li[data-parent='countrykey'][data-value='${code}']`);
        $(`form[id='crc_form_${key}']>div>div[id='countrykey_div']>input[id='countrykey']`).val(code);
        $(`form[id='crc_form_${key}']>div>div[id='countrykey_div']`).data("value", code);
        $(`form[id='crc_form_${key}']>div>div[id='countrykey_div']`).find(".btn-label").text(ce.text());

        $.ajax({
            method: "POST",
            url: "/rest-api/get-regions",
            data: { countryCode: code },
            success: (data) => {
                $(`form[id='crc_form_${key}']>div>div[id='ccstate_div']`).find("ul li").remove();

                $.each(data, function () {
                    $(`form[id='crc_form_${key}']>div>div[id='ccstate_div']`).find("ul").append("<li data-parent='Region' data-value='" +
                        this.Code + "' role='option'>" + this.Region + "</li>")
                });

                var regionElement = $(`form[id='crc_form_${key}']>div>div[id='ccstate_div']>div>ul>li[data-parent='Region'][data-value='${region}']`);
                $(`form[id='crc_form_${key}']>div>div[id='ccstate_div']>input[id='ccstate']`).val(region);
                $(`form[id='crc_form_${key}']>div>div[id='ccstate_div']`).data("value", region)
                $(`form[id='crc_form_${key}']>div>div[id='ccstate_div']`).find(".btn-label").text(regionElement.text());
            }
        });

        $(`form[id='crc_form_${key}']>div[class='input input-select input-required input-select_align-bottom country-key']>div[class='js-error']`).hide();
        $(`form[id='crc_form_${key}']>div[class='input input-select input-required input-select_align-bottom country-state']>div[class='js-error']`).hide();
    }

    ChangeCountry(key) {
        var code = $(`form[id='crc_form_${key}']>div>div[id='countrykey_div']>input[id='countrykey']`).val();

        $.ajax({
            method: "POST",
            url: "/rest-api/get-regions",
            data: { countryCode: code },
            success: (data) => {
                $(`form[id='crc_form_${key}']>div>div[id='ccstate_div']`).find("ul li").remove();
                $(`form[id='crc_form_${key}']>div>div[id='ccstate_div']>input[id='ccstate']`).val("");
                $(`form[id='crc_form_${key}']>div>div[id='ccstate_div']`).data("value", "");
                $(`form[id='crc_form_${key}']>div>div[id='ccstate_div']`).find(".btn-label").text("Select a State/Region");

                $.each(data, function () {
                    $(`form[id='crc_form_${key}']>div>div[id='ccstate_div']`).find("ul").append("<li data-parent='Region' data-value='" +
                        this.Code + "' role='option'>" + this.Region + "</li>")
                });
            }
        });
    }

    SetDefaultCard(isPrimary, ckey) {
        if (isPrimary == 'True') {
            $(`#crcp_btn_${ckey}`).trigger("click");
        }
    }
}
