class Orders {

    Init(node: string) {
        this.SetFilterSection(node);
        this.InitOrderList(node);
    }

    SetFilterSection(node: string) {
        $("#filter-section").load("/rest-api/order-" + node + "/filter-section", function () {
            if (node == "open") {
                $('.load-more-btn').hide();
                $('form[id="orders_filter_form"] button:nth-child(1)').prop('disabled', true);
            }
            else {
                $('.load-more-btn').prop('disabled', true);
            }
        });
    }

    SetOrderList(node: string) {
        if ($("#orders_filter_form").valid()) {
            $('#show-list').empty();
            $(`#order_${node}_loader`).load("/rest-api/loading-animation", { type: 'o-h', size: "false", loading: "loading" }, function () {
                $('#show-list').load("/rest-api/order-" + node + "/show-list", { StartDate: $('#StartDate').val(), EndDate: $('#EndDate').val() }, function () {
                    if ($('#show-list li').length > 1) {
                        $('.load-more-btn').prop('disabled', false);
                    }
                    $(`#order_${node}_loader`).empty();
                });
            });
        }
    }

    SetOrderListWithNumber() {
        if ($("#orders_number_form").valid()) {
            $('#show-list').empty();
            $('#order_history_loader').load("/rest-api/loading-animation", { type: 'o-h', size: "false", loading: "loading" }, function () {
                $('#show-list').load("/rest-api/order-history/show-order?num=" + $('#OrderNumber').val(), function () {
                    $('.load-more-btn').prop('disabled', false);
                    $("#orders_filter_form").hide();
                    $('#order_history_loader').empty();
                });
            });
        }
    }

    InitOrderList(node: string) {
        $(`#order_${node}_loader`).load("/rest-api/loading-animation", { type: 'o-h', size: "false", loading: "loading" }, function () {
            if (node == "history") {
                $('#show-list').load("/rest-api/order-" + node + "/show-list", { StartDate: null, EndDate: null }, function () {
                    if ($('#show-list li').length > 1) {
                        $('.load-more-btn').prop('disabled', false);
                    }
                    $(`#order_${node}_loader`).empty();
                });
            }
            else {
                $('#show-list').load("/rest-api/order-" + node + "/show-list", { StartDate: null, EndDate: null }, function () {
                    $('#StartDate').val('');
                    $('.load-more-btn').hide();
                    $('form[id="orders_filter_form"] button:nth-child(1)').prop('disabled', true);
                    $(`#order_${node}_loader`).empty();
                });
            }
        });
    }
}