class Login {

    Init() {
        $("#btnLogin").on("click", (e) => {
            this.TryLogin(e);
        })
        $(".login-form input").on("keypress", (e) => {
            this.ProcessSubmit(e);
        });

            
    }
    TryLogin(e: JQuery.ClickEvent<HTMLElement, undefined, HTMLElement, HTMLElement>) {
        e.preventDefault();
        $('#login_loader_div').load("/rest-api/loading-animation", { type: "login-modal", size: "false", loading: "loading" }, function () {
            $.post("/edmo-api/users/login/authenticate", { email: $("#email").val(), password: $("#password").val() }, function (i) {
                if (i.Success) {
                    window.location.href = "/edmo-api/users/login/authentication?id=" + i.AuthorizationId + "&redirect=" + $('#redirect').val();
                }
                else {
                    if (i.NeedNewPassword) {
                        window.location.href = "/reset-password?req=" + i.RequestId;
                    }
                }
            }).fail(function (xhr, status, error) {
                alert("Invalid credentials");
                $('#login-modal-loader_partial').hide();
            });
        });
    } 

    ProcessSubmit(e: JQuery.KeyPressEvent<HTMLElement, undefined, HTMLElement, HTMLElement>) {
        if (e.which == 13) {
            $("#btnLogin").trigger("click");
        }

    }
    ResetPassword() {

        $.post("/rest-api/forgot-password", { email: $("#forgotEmail").val()}, function (i) {
            if (i) {
                $("#reset_password").hide();
                $("#account_success").show();
                $("#reset_password_button").hide();
            }
            else {
                alert("Bad");
            }
        }).fail(function (xhr, status, error) {
            alert("Invalid credentials");
        });
    }
}