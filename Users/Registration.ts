
class Registration {
    Init() {
    }

    ToggleBusiness() {
        $("#business_acct").hide();
        if ($("#IsBusinessAccount").val() == "true") {
            $("#business_acct").show();
        }
    }

    ChangeCountry() {
        $.ajax({
            
            method:"POST",
            url: "/rest-api/get-regions",
            data: { countryCode: $("#BillingCountry").val() },
            success: (data) => {
                $("#BillingStateRegion_div").find("ul li").remove();
                $("#BillingStateRegion").val("");
                $("#BillingStateRegion_div").data("value", "")
                $("#BillingStateRegion_div").find(".btn-label").text("Select a State/Region");

                $.each(data, function () {
                    $("#BillingStateRegion_div").find("ul").append("<li data-parent='BillingStateRegion' data-value='" +
                        this.Code + "' role='option'>" + this.Region + "</li>")
                });
            }
        });
    }

    CreateAccount() {
        if ($("#registration_form").valid()) {
            $("#btnCreateAccount").prop('disabled', true);
            $("#account_error").hide();
            $("#account_success").hide();

            $('#create_account_loader_div').load("/rest-api/loading-animation", { type: "ca-btn", size: "small", loading: "loading" }, function () {
                $.post({
                    url: "/rest-api/create-account",
                    data: $('#registration_form').serialize(),
                    success: function (data) {
                        $('#ca-btn-loader_partial').hide(); //loader partial view hide
                        if (!data.Success) {
                            $("#account_error").show();
                            $("#btnCreateAccount").prop('disabled', false);
                        }
                        else {
                            $("#email").val($("#Email").val());
                            $("#account_success").show();
                        }
                    }
                }).fail(function () {
                    $("#btnCreateAccount").prop('disabled', false);
                });
            });
        }
    }

    ChangePhonePrefix() {
        $("#PhoneInputCountryIconImg").attr("src", "https://catamphetamine.gitlab.io/country-flag-icons/3x2/" + $("#phoneCountry").val() + ".svg")
        $("#PhoneNumber").val("+" + $("#phoneCountry option:selected").data("dialing-code"));
    }
}