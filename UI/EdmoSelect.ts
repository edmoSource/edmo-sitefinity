class EdmoSelect {
    Init() {
        $("body").on("click", ".input-select li", (e) => {
            this.TriggerFilter(e);
        });


        $("body").on("click", ".input-checkbox", (e) => {
            $(e.currentTarget).find("input[type='checkbox']").prop("checked", !$(e.currentTarget).find("input[type='checkbox']").prop("checked"));
            if ($(e.currentTarget).find("input[type='checkbox']").prop("checked")) {
                $(e.currentTarget).find(".edmo-icon-checkbox").removeClass("hide");
            }
            else {
                $(e.currentTarget).find(".edmo-icon-checkbox").addClass("hide");
            }
        });

        $("body").on("click", ".input-radio", (e) => {
            var groupName = $(e.currentTarget).find("input[type='checkbox']").data().name;

            //uncheck all group ones
            $("input[type='checkbox'][data-name='" + groupName + "']").prop("checked", false);
            $(".edmo-icon-filledCircle[data-name='" + groupName + "']").addClass("hide");

            //remove all other filledCirlces

            //set this checkbox as checked
            $(e.currentTarget).find("input[type='checkbox']").prop("checked", true);
            $(e.currentTarget).find("input[type='checkbox']").first().trigger("change");
            $(e.currentTarget).find(".edmo-icon-filledCircle").removeClass("hide");
            
        });

        

        $("body").on("keyup", ".form-control", (e) => {
            try {
                if ($(e.currentTarget).valid()) {
                    $(e.currentTarget).parents(".input-wrapper").find(".edmo-icon-success").removeClass("hide");
                    $(e.currentTarget).parents(".input-wrapper").find(".edmo-icon-error").addClass("hide");
                }
                else {
                    $(e.currentTarget).parents(".input-wrapper").find(".edmo-icon-success").addClass("hide");
                    $(e.currentTarget).parents(".input-wrapper").find(".edmo-icon-error").removeClass("hide");
                }

            }

            catch (e) {

            }
        });

        $.validator.addMethod("edmo-required", function (value, element) {
            if (value != "") {
                $(element).parents(".input-select").find(".js-warning").hide();
                $(element).parents(".input-wrapper").siblings(".js-error").hide();
                $(element).parents(".input-wrapper").find(".edmo-icon-success").removeClass("hide");
                $(element).parents(".input-wrapper").find(".edmo-icon-error").addClass("hide");
                return true;
            }
            $(element).parents(".input-select").find(".js-error").show();
            $(element).parents(".input-wrapper").siblings(".js-error").show();
            $(element).parents(".input-wrapper").find(".edmo-icon-success").addClass("hide");
            $(element).parents(".input-wrapper").find(".edmo-icon-error").removeClass("hide");
            
            return false;

        }, "");

        $.validator.setDefaults({
            errorPlacement: function (error, element) {
                var siblings = element.parents(".input-wrapper").siblings(".js-error").length
                var name = element.attr('name');
                var errorSelector = '.validation_error_message[for="' + name + '"]';
                var $element = $(errorSelector);
                element.parents(".input-wrapper").find(".edmo-icon-success").addClass("hide");
                element.parents(".input-wrapper").find(".edmo-icon-error").removeClass("hide");
                if (siblings > 0) {
                    if ($element.length) {
                        $(errorSelector).html(error.html());
                    } else {
                        element.parents(".input-wrapper").siblings(".js-error").first().append(error);
                    }
                }
                else {
                    if ($element.length) {
                        $(errorSelector).html(error.html());
                    } else {
                        error.insertAfter(element);
                    }
                }

            }
        });


        window.setTimeout(function () {
            $(".input-select .js-error").hide()
            $("li[data-edmo-selected='true']").each(function () {
                $(this).trigger("click");
            });
        }, 100);

    }
    TriggerFilter(e) {
        var parentDiv = $(e.target).parents(".input-wrapper");
        $(e.target).parents(".input-wrapper").find(".js-warning").hide();
        $(e.target).parents(".input-wrapper").find(".js-error").hide();
        parentDiv.find(".btn-label").text($(e.target).text());
        if ($(e.target).data("value") == undefined) {

            parentDiv.data("value", $(e.target).text());
            parentDiv.find("input").val($(e.target).text())
        }
        else {
            parentDiv.data("value", $(e.target).data("value"));
            parentDiv.find("input").val($(e.target).data("value"))
        }

        parentDiv.find("input").valid();
        parentDiv.trigger("change");
    }

}