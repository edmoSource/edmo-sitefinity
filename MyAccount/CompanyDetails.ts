class CompanyDetails extends BaseComponent {

    constructor() {
        super();
    }

    Init() {

    }

    ChangeCountry() {
        var code = $("#CountryKey").val();
        $.ajax({
            method: "POST",
            url: "/rest-api/get-regions",
            data: { countryCode: code },
            success: (data) => {
                $("#State_div").find("ul li").remove();
                $("#State").val("");
                $("#State_div").data("value", "")
                $("#State_div").find(".btn-label").text("Select a State/Region");

                $.each(data, function () {
                    $("#State_div").find("ul").append("<li data-parent='Region' data-value='" +
                        this.Code + "' role='option'>" + this.Region + "</li>")
                });
            }
        });
    }

    SetCountry(code, region) {
        var countryElement = $("li[data-parent='CountryKey'][data-value='" + code + "']");
        $("#CountryKey").val(code);
        $("#CountryKey_div").data("value", code)
        $("#CountryKey_div").find(".btn-label").text(countryElement.text());

        $.ajax({
            method: "POST",
            url: "/rest-api/get-regions",
            data: { countryCode: code },
            success: (data) => {
                $("#State_div").find("ul li").remove();

                $.each(data, function () {
                    $("#State_div").find("ul").append("<li data-parent='Region' data-value='" +
                        this.Code + "' role='option'>" + this.Region + "</li>")
                });

                var regionElement = $("li[data-parent='Region'][data-value='" + region + "']");
                $("#State").val(region);
                $("#State_div").data("value", region)
                $("#State_div").find(".btn-label").text(regionElement.text());
            }
        });

        $(".input-select .js-error").hide();
    }

    UpdateCompanyDetails() {
        if ($('#company-details-form').valid()) {
            $("#btnUpdateCompanyDetails").prop('disabled', true);

            var address1 = $('#Address1').val();
            var address2 = $('#Address2').val();
            var countryKey = $("li[data-parent='CountryKey'][data-value='" + $("#CountryKey").val() + "']").data("value");
            var city = $('#City').val();
            var state = $("li[data-parent='Region'][data-value='" + $("#State").val() + "']").data("value");
            var zip = $('#Zip').val();
            var phone = $('#Phone').val();

            var jsonData = {
                Address1: address1,
                Address2: address2,
                CountryKey: countryKey,
                City: city,
                State: state,
                Zip: zip,
                Phone: phone
            };

            $('#update_company_details_loader_div').load("/rest-api/loading-animation", { type: "uc-btn", size: "small", loading: "loading" }, function () {
                $.ajax({
                    url: "/rest-api/company-details/update",
                    method: "POST",
                    data: JSON.stringify(jsonData),
                    dataType: "json",
                    contentType: 'application/json; charset=utf-8',
                    success: (resp) => {
                        $('#update_company_details_loader_div').empty(); //loader partial view hide
                        $("#btnUpdateCompanyDetails").prop('disabled', false);
                    },
                    error: (err) => {
                        console.log(err);
                        $('#update_company_details_loader_div').empty(); //loader partial view hide
                        $("#btnUpdateCompanyDetails").prop('disabled', false);
                    }
                });
            });
        }
    }
}
