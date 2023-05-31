
class PasswordReset {
    Init() {
    }

    ResetPassword() {
        $("#showError").hide();
        $("#account_error").hide();
        var password = $("#Password").val();
        var confirmPassword = $("#ConfirmPassword").val();

        if (password != confirmPassword) {
            $("#showErrorText").text("Passwords Must Match");
            $("#showError").show();
            return;
        }

        if ($("#frmResetPassword").valid()) {
            $("#btnResetPassword").prop('disabled', true);

            $("#reset_password_loader_div").load("/rest-api/loading-animation", { type: "rp-btn", size: "small", loading: "loading" }, function () {
                $.ajax({
                    method: "POST",
                    url: "/rest-api/reset-password",
                    data: {
                        ResetId: $("#ResetId").val(),
                        Password: $("#Password").val(),
                    }
                }).done((data) => {
                    if (data) {

                    }
                    else {
                        $("#account_error").show();
                    }
                }).always(() => {
                    $("#btnResetPassword").prop('disabled', false);
                    $('#rp-btn-loader_partial').hide();//loader partial view hide
                })
            });
        }
    }
    ChangePassword() {
        $("#showError").hide();
        $("#account_error").hide();
        var password = $("#Password").val();
        var confirmPassword = $("#ConfirmPassword").val();

        if (password != confirmPassword) {
            $("#showErrorText").text("Passwords Must Match");
            $("#showError").show();
            return;
        }

        if ($("#frmResetPassword").valid()) {
            $("#btnResetPassword").prop('disabled', true);

            $("#reset_password_loader_div").load("/rest-api/loading-animation", { type: "rp-btn", size: "small", loading: "loading" }, function () {
                $.ajax({
                    method: "POST",
                    url: "/rest-api/change-password",
                    data: {
                        ResetId: $("#ResetId").val(),
                        Password: $("#Password").val(),
                    }
                }).done((data) => {
                    if (data) {

                    }
                    else {
                        $("#account_error").show();
                    }
                }).always(() => {
                    $("#btnResetPassword").prop('disabled', false);
                    $('#rp-btn-loader_partial').hide();//loader partial view hide
                })
            });
        }
    }
}