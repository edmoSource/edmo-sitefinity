class Subscription {
    Init() {
        $('#save_btn').prop('disabled', true);
    }

    SetSubscriptionInfo() {
        var val = $("input[type='checkbox'][data-name='emailsubscription']:checked").first().val();

        $('#email_subscriptions_loader_div').load("/rest-api/loading-animation", { type: "es-btn", size: "false", loading: "loading" }, function () {
            $.post("/rest-api/email-subscription/set-subscription", { subscribed: val }, function (r) {
                $('#es-btn-loader_partial').hide();

                if (r && r.response[0] && r.response[0].success) {
                    $('#save_btn').prop('disabled', true);
                    $('#subscription_message').show();

                    var changed = $("input[type='checkbox'][data-name='emailsubscription']:checked").first().val();
                    $('#emailsubscription').val(changed);
                }
                else {
                    $('#save_btn').prop('disabled', false);
                    $('#subscription_message').hide();
                }
            }).fail(function (xhr, status, error) {
                $('#save_btn').prop('disabled', false);
                $('#subscription_message').hide();
            });
        });
    }

    SetEmailSubscriptions(flag) {
        $("#emailsubscription-" + flag).first().parents(".input-radio").first().trigger("click");
    }

    ChangeEmailSubscriptions(groupName) {
        var initValue = $('#emailsubscription').val();
        var val = $("input[type='checkbox'][data-name='emailsubscription']:checked").first().val();

        if (initValue != val) {
            $('#save_btn').prop('disabled', false);
            $('#subscription_message').hide();
        }
        else {
            $('#save_btn').prop('disabled', true);
            $('#subscription_message').show();
        }
    }
}
