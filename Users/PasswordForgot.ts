
class PasswordForgot {
    code = "";

    Init(code) {
        this.code = code;
    }

    ResetPassword() {
        $("#showError").hide();
        $("#account_error").hide();
        var password = $("#Password").val();
        var confirmPassword = $("#ConfirmPassword").val();
        var email = $("#Email").val();
        if (password != confirmPassword) {
            $("#showErrorText").text("Passwords Must Match");
            $("#showError").show();
            return;
        }


        if ($("#frmResetPassword").valid()) {
            $("#btnResetPassword").hide();

            $.ajax({
                method: "POST",
                url: "/rest-api/forgot-password-reset",
                data: {
                    Code: this.code,
                    Email: email,
                    Password: password,
                }
            }).done((data) => {
                if (data) {

                }
                else {
                    $("#account_error").show();
                }
            }).always(() => {
                $("#btnResetPassword").show();
            })
            

                
        }

    }
    
}