class LoadContentBlock extends BaseComponent {
    postData: IFormPostData;

    constructor() {
        super();
        this.postData = {
            PageTitle: "", Name: "", Email: "", Phone: "", Fax: "", ShippingAddress: "", DropShip: false, DropShippingContact: "", BusinessName: "",
            Address1: "", Address2: "", Country: "", City: "", Region: "", PostalCode: "", Pieces: []
        };
    }

    Init() {

    }

    LoadSection(target: string, section: string) {
        $("#" + section + "-body").load("/rest-api/" + target + "/" + section, {}, () => {
            $(".input-select .js-error").hide();
            $(`#loading-${section}`).addClass("hide");
            $(`#ready-${section}`).removeClass("hide");
        });
    }

    PostSection(target: string, data: object) {
        $.ajax({
            url: "/rest-api/" + target + "/order-confirmation",
            method: "POST",
            data: JSON.stringify(data),
            dataType: "json",
            contentType: 'application/json; charset=utf-8',
            success: (resp) => {
                $("#order-confirmation-body").html(resp);
                $(".input-select .js-error").hide();
                $("#loading-order-confirmation").addClass("hide");
                $("#ready-order-confirmation").removeClass("hide");
            }
        });
    }

    MoveSection(oldSection: string, newSection: string, back: boolean = false) {
        $(`#${oldSection}-body`).css("max-height", "0");

        //hides all icons in both sections
        $(`#status-${oldSection} span`).addClass("hide");
        $(`#status-${newSection} span`).addClass("hide");

        if (!back) {
            //adds fill icon in the old section
            $(`#fill-${oldSection}`).removeClass("hide");
            $(`#loading-${newSection}`).removeClass("hide");
        }

        else {
            $(`#ready-${newSection}`).removeClass("hide");
            $(`#standby-${oldSection}`).removeClass("hide");
        }

        $(`#${newSection}-body`).css("max-height", "fit-content"); //1560px
    }

    SetContactInformation(target: string, title: string) {
        if ($("#contact-information-form").valid()) {
            this.postData.PageTitle = title;
            this.MoveSection("contact-information", "address-details");
            this.LoadSection(target, "address-details");
        }
    }

    SetAddressDetails(target: string, formName: string, back: boolean) {
        if (!back) {

            if ($("#ShippingAddress").val() == "0") {
                if ($("#new-shipping-information-form").valid()) {
                    this.MoveSection("address-details", `${formName}`);
                    this.LoadSection(target, `${formName}`);
                }
            }
            else {
                if ($("#address-details-form").valid()) {
                    this.MoveSection("address-details", `${formName}`);
                    this.LoadSection(target, `${formName}`);
                }
            }
        }
        else {
            this.MoveSection("address-details", "contact-information", true);
        }
    }

    SetOptions(target: string, formName: string, back: boolean) {
        if (!back) {
            var rowCount = $('#piece_body tr').length;
            if (rowCount > 0) {
                this.MakePostData();
                this.MoveSection(`${formName}`, "order-confirmation");
                this.PostSection(target, this.postData);
            }
            else {
                $('#submit_error').removeAttr("style");
            }
        }
        else {
            this.MoveSection(`${formName}`, "address-details", true);
        }
    }

    MakePostData() {
        this.MakeContactInfoData();
        this.MakeShippingInfoData();
    }

    MakeContactInfoData() {
        this.postData.Name = $("#Name").val() as string;
        this.postData.Email = $("#Email").val() as string;
        this.postData.Phone = $("#Phone").val() as string;
        this.postData.Fax = $("#Fax").val() as string;
    }

    MakeShippingInfoData() {
        var addr = $("#ShippingAddress").val() as string;

        if (addr == "0") {
            var dropShip = false;
            if ($("input[type='checkbox'][name='DropShip']").is(':checked')) {
                dropShip = true;
            }
            var country = $("li[data-parent='Country'][data-value='" + $("#Country").val() + "']");
            var region = $("li[data-parent='Region'][data-value='" + $("#Region").val() + "']");

            this.postData.DropShip = dropShip;
            this.postData.DropShippingContact = $('#DropShippingContact').val() as string;
            this.postData.BusinessName = $('#BusinessName').val() as string;
            this.postData.Address1 = $('#Address1').val() as string;
            this.postData.Address2 = $('#Address2').val() as string;
            this.postData.City = $('#City').val() as string;
            this.postData.Region = region.text();
            this.postData.PostalCode = $('#PostalCode').val() as string;
            this.postData.Country = country.data("value");
        }
        else {
            this.postData.Address1 = addr.split(",")[0];
            this.postData.City = addr.split(",")[1];
            this.postData.Region = addr.split(",")[2].trim().split(" ")[0];
            this.postData.PostalCode = addr.split(",")[2].trim().split(" ")[1];
            this.postData.Country = addr.split(",")[2].trim().split(" ")[2];
            this.postData.ShippingAddress = addr;
        }
    }

    ToggleShippingAddress() {
        $("#new-shipping-information-form").hide();
        $("#default-address-details-form-buttons").show();
        if ($("#ShippingAddress").val() == "0") {
            $("#default-address-details-form-buttons").hide();
            $("#new-shipping-information-form").show();
        }
    }

    ToggleDropShip(groupName) {
        if ($("input[type='checkbox'][name='" + groupName + "']").is(':checked')) {
            $(".input-dropship-contact").hide();
        }
        else {
            $(".input-dropship-contact").show();
        }
    }

    ChangeCountry() {
        $.ajax({
            method: "POST",
            url: "/rest-api/get-regions",
            data: { countryCode: $("#Country").val() },
            success: (data) => {
                $("#Region_div").find("ul li").remove();
                $("#Region").val("");
                $("#Region_div").data("value", "")
                $("#Region_div").find(".btn-label").text("Select a State/Region");

                $.each(data, function () {
                    $("#Region_div").find("ul").append("<li data-parent='Region' data-value='" +
                        this.Code + "' role='option'>" + this.Region + "</li>")
                });
            }
        });
    }

    RemoveRow(obj, id) {
        this.postData.Pieces.splice(this.postData.Pieces.findIndex(x => x.id === id), 1);

        $(obj).closest('tr').remove();
        var rowCount = $('#piece_body tr').length;
        if (rowCount == 0) {
            $('#piece_table').hide();
        }
    }
}