﻿
var cart = {
    init: function () {
        cart.main();
    },
    main: function () {
        //payment
        $('#btnPayment').on('click', function () {
            
            var shipName = $('input[name="shipName"]').val();
            var mobile = $('input[name="mobile"]').val();
            var email = $('input[name="email"]').val();
            var address = $('input[name="address"]').val();
            console.log(shipName + " " + mobile + " " + email + " " + address);
           $.ajax({
               url: '/thanh-toan',
               data: {
                   shipName: shipName,
                   mobile: mobile,
                   address: address,
                   email: email
               },
               type: 'Post',
               dataType: 'Json',
           }).done(function (res) {
               console.log(res.message);
           }).fail(function (er) {
               console.log(er.message);
           });
        });

       /* $('#btnPayment').on('click', function () {
            var mobile = $('input[name="mobile"]').val();
            console.log(mobile);
        });*/

        $('#cartSize').css('color', 'red');

        //click tất cả sẽ cập nhật lại giỏ hàng

        $('.quantityDecre').on('click', function () {
            var current = $(this);
            var quantity = current.parent().find('span:first');
            if (parseInt(quantity.text()) > 1) {
                quantity.text(parseInt(quantity.text()) - 1); 
            }  
        });

        $('.quantityIncre').on('click', function () {
            var current = $(this);
            var quantity = current.parent().find('span:first');
            quantity.text(parseInt(quantity.text()) + 1);
        });

        $('#btnUpdateCart').on('click', function (e) {
            e.preventDefault();
            var jsonList = [];
            var items = $('.quantity');
            $.each(items, function (index, value) {
                jsonList.push({
                    Product: {
                        ID: $(value).closest('tr').data('id')
                    },
                    Quantity: $(value).find('span:first').text()
                });
            });
           
            //call ajax
            $.ajax({
                url: '/Cart1/UpdateCart',
                data: { contentJson: JSON.stringify(jsonList) },
                dataType: 'Json',
                type:'Post'
            }).done(function (res) {
                toastr.success(res.message, "Thông báo", { timeOut: 3000, "closeButton":true });
            });
        });

        $('.close1').on('click', function () {
            var cur = $(this);
            var id = cur.data('id');

            var curQuantity = cur.closest('tr').find('#quantityOfItem').text();
            var totalItem = $('#totalItem');
            var cartSize = $('#cartSize');

            var cf = confirm("Bạn thực sự muốn xóa?");
            if (cf == true) {
                $.ajax({
                    url: '/Cart1/Delete',
                    type: 'Get',
                    dataType: 'Json',
                    data: { id: id },
                    success: function (res) {
                        if (res.status == true) {
                            $(cur).closest('tr').css('background', 'tomato');
                            $(cur).closest('tr').fadeOut(800, function () {
                                cur.closest('tr').remove();
                            });
                            toastr.success(res.message, "Thông báo", { timeOut: 3000, "closeButton": true });
                            totalItem.text(parseInt(totalItem.text()) - 1);
                            cartSize.text(parseInt(cartSize.text()) - 1)
                        }
                    }
                });
            }
        });
    }
}
cart.init();