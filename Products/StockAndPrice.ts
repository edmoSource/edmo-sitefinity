class StockAndPrice {

    Init() {
    }

    GetPriceAndStock(partNumbers: string[], id: string) {
        $.ajax({
            type: "POST",
            contentType: 'application/json; charset=utf-8',
            url: "/edmo-api/EdmoApi/EdmoProduct/UpdatePrice",
            data: JSON.stringify({ 'partNumbers': partNumbers }),
            success: (e) => {
                var classRef = this;

                if (e && e.Stocks) {
                    $(e.Stocks).each(function (i) {
                        var edmoId = classRef.CleanEdmoId(this.EdmoId);
                        if (this.StockOnHandTN == 0) {
                            $(".no-stock-tn-" + edmoId).show();
                            $(".in-stock-tn-" + edmoId).hide();
                        }
                        else {
                            $(".no-stock-tn-" + edmoId).hide();
                            $(".in-stock-tn-" + edmoId).show();
                        }
                        if (this.StockOnHandWA == 0) {
                            $(".no-stock-wa-" + edmoId).show();
                            $(".in-stock-wa-" + edmoId).hide();
                        }
                        else {
                            $(".no-stock-wa-" + edmoId).hide();
                            $(".in-stock-wa-" + edmoId).show();
                        }
                    });
                }

                if (e && e.Prices) {
                    $(e.Prices).each(function (i) {
                        var edmoId = classRef.CleanEdmoId(this.EdmoId);
                        if (this.Price > 0) {
                            $(".price-edmoId").text(this.PriceFormatted + " " + this.UnitOfMeasure);
                            $(".product-purchase").show();
                            $(".product-pricing_price_call").hide();
                            $(".js-show-if-price").show();
                            $("#listPrice").text("List: " + this.ListPriceFormatted + " " + this.UnitOfMeasure);
                            if (this.MinOrdQty > 1) {
                                $("#minQuantity").text("Minimum order quantity of " + this.MinOrdQty + " " + this.UnitOfMeasure);
                            }

                            if (id != "") {
                                classRef.LoadBuy(id);
                            }

                            $("[id='price-" + edmoId + "']").text(this.PriceFormatted + " " + this.UnitOfMeasure);
                            $("[id='js-show-if-price-" + edmoId + "']").show();
                        }
                        else {
                            $(".price-edmoId").text("Call for Pricing");
                            $(".product-purchase").hide();
                            $(".product-pricing_price_call").show();
                            $(".js-show-if-price").hide();
                            $("#listPrice").hide();
                            $("#loadBuy").html("");

                            $("[id='js-show-if-price-" + edmoId + "']").hide();
                        }
                    });
                }

                $(".product-pricing").show();
            },
            dataType: "json"
        });
    }

    GetRelatedPriceAndStock(partNumbers: string[]) {
        $.ajax({
            type: "POST",
            contentType: 'application/json; charset=utf-8',
            url: "/edmo-api/EdmoApi/EdmoProduct/UpdatePrice",
            data: JSON.stringify({ 'partNumbers': partNumbers }),
            success: (resp) => {
                var classRef = this;

                if (resp && resp.Stocks) {
                    $(resp.Stocks).each(function (i) {
                        var edmoId = classRef.CleanEdmoId(this.EdmoId);
                        if (this.StockOnHandTN == 0) {
                            $(".no-stock-tn-" + edmoId).show();
                            $(".in-stock-tn-" + edmoId).hide();
                        }
                        else {
                            $(".no-stock-tn-" + edmoId).hide();
                            $(".in-stock-tn-" + edmoId).show();
                        }
                        if (this.StockOnHandWA == 0) {
                            $(".no-stock-wa-" + edmoId).show();
                            $(".in-stock-wa-" + edmoId).hide();
                        }
                        else {
                            $(".no-stock-wa-" + edmoId).hide();
                            $(".in-stock-wa-" + edmoId).show();
                        }
                    });
                }

                if (resp && resp.Prices) {
                    $(resp.Prices).each(function (i) {
                        var edmoId = classRef.CleanEdmoId(this.EdmoId);
                        if (this.Price > 0) {
                            $("[id='price-" + edmoId + "']").text(this.PriceFormatted + " " + this.UnitOfMeasure);
                            $("[id='js-show-if-price-" + edmoId + "']").show();
                        }
                        else {
                            $("[id='js-show-if-price-" + edmoId + "']").hide();
                        }
                    });
                }
            },
            dataType: "json"
        });
    }

    CleanEdmoId(EdmoId: string) {
        return EdmoId.replace("/", "\\/")
    }

    LoadBuy(id) {
        $("#loadBuy").load("/edmo-api/product/product/loadbuy?productId=" + id + "&resourcePkg=Edmo&victor=abcdefg",
            function () {
            }
        );
    }
}