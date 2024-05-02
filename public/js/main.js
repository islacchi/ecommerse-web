/*  ---------------------------------------------------
    Template Name: Ogani
    Description:  Ogani eCommerce  HTML Template
    Author: Colorlib
    Author URI: https://colorlib.com
    Version: 1.0
    Created: Colorlib
---------------------------------------------------------  */

'use strict';

(function ($) {

    /*------------------
        Preloader
    --------------------*/
    $(window).on('load', function () {
        $(".loader").fadeOut();
        $("#preloder").delay(200).fadeOut("slow");

        /*------------------
            Gallery filter
        --------------------*/
        $('.featured__controls li').on('click', function () {
            $('.featured__controls li').removeClass('active');
            $(this).addClass('active');
        });
        if ($('.featured__filter').length > 0) {
            var containerEl = document.querySelector('.featured__filter');
            var mixer = mixitup(containerEl);
        }
    });

    /*------------------
        Background Set
    --------------------*/
    $('.set-bg').each(function () {
        var bg = $(this).data('setbg');
        $(this).css('background-image', 'url(' + bg + ')');
    });

    //Humberger Menu
    $(".humberger__open").on('click', function () {
        $(".humberger__menu__wrapper").addClass("show__humberger__menu__wrapper");
        $(".humberger__menu__overlay").addClass("active");
        $("body").addClass("over_hid");
    });

    $(".humberger__menu__overlay").on('click', function () {
        $(".humberger__menu__wrapper").removeClass("show__humberger__menu__wrapper");
        $(".humberger__menu__overlay").removeClass("active");
        $("body").removeClass("over_hid");
    });

    /*------------------
		Navigation
	--------------------*/
    $(".mobile-menu").slicknav({
        prependTo: '#mobile-menu-wrap',
        allowParentLinks: true
    });

    /*-----------------------
        Categories Slider
    ------------------------*/
    $(".categories__slider").owlCarousel({
        loop: true,
        margin: 0,
        items: 4,
        dots: false,
        nav: true,
        navText: ["<span class='fa fa-angle-left'><span/>", "<span class='fa fa-angle-right'><span/>"],
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true,
        responsive: {

            0: {
                items: 1,
            },

            480: {
                items: 2,
            },

            768: {
                items: 3,
            },

            992: {
                items: 4,
            }
        }
    });


    $('.hero__categories__all').on('click', function(){
        $('.hero__categories ul').slideToggle(400);
    });

    /*--------------------------
        Latest Product Slider
    ----------------------------*/
    $(".latest-product__slider").owlCarousel({
        loop: true,
        margin: 0,
        items: 1,
        dots: false,
        nav: true,
        navText: ["<span class='fa fa-angle-left'><span/>", "<span class='fa fa-angle-right'><span/>"],
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true
    });

    /*-----------------------------
        Product Discount Slider
    -------------------------------*/
    $(".product__discount__slider").owlCarousel({
        loop: true,
        margin: 0,
        items: 3,
        dots: true,
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true,
        responsive: {

            320: {
                items: 1,
            },

            480: {
                items: 2,
            },

            768: {
                items: 2,
            },

            992: {
                items: 3,
            }
        }
    });

    /*---------------------------------
        Product Details Pic Slider
    ----------------------------------*/
    $(".product__details__pic__slider").owlCarousel({
        loop: true,
        margin: 20,
        items: 4,
        dots: true,
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true
    });

    /*-----------------------
		Price Range Slider
	------------------------ */
    var rangeSlider = $(".price-range"),
        minamount = $("#minamount"),
        maxamount = $("#maxamount"),
        minPrice = rangeSlider.data('min'),
        maxPrice = rangeSlider.data('max');
    rangeSlider.slider({
        range: true,
        min: minPrice,
        max: maxPrice,
        values: [minPrice, maxPrice],
        slide: function (event, ui) {
            minamount.val('$' + ui.values[0]);
            maxamount.val('$' + ui.values[1]);
        }
    });
    minamount.val('$' + rangeSlider.slider("values", 0));
    maxamount.val('$' + rangeSlider.slider("values", 1));

    /*--------------------------
        Select
    ----------------------------*/
    $("select").niceSelect();

    /*------------------
		Single Product
	--------------------*/
    $('.product__details__pic__slider img').on('click', function () {

        var imgurl = $(this).data('imgbigurl');
        var bigImg = $('.product__details__pic__item--large').attr('src');
        if (imgurl != bigImg) {
            $('.product__details__pic__item--large').attr({
                src: imgurl
            });
        }
    });

    
    /*-------------------
		Quantity change and total item price change
	--------------------- */
    var proQty = $('.pro-qty');
    //value initially set to one, assuming the cart has at least one quantity of the item added
    var value = 1;
    
    proQty.prepend('<span class="dec qtybtn">-</span>');
    proQty.append('<span class="inc qtybtn">+</span>');
    proQty.on('click', '.qtybtn', function () {
        var $button = $(this);
        var oldValue = $button.parent().find('input').val();
      
        //Finds the the tr that being click in the incrementaion/decrementation of proQty value. 
        var itemPrice = $button.closest('tr').find('.shoping__cart__price').text();
        var splitPrice = itemPrice.split("$");
        var total_Price = $button.closest('tr').find(".shoping__cart__total");
        
        if ($button.hasClass('inc')) {
            var newVal = parseFloat(oldValue) + 1;
            value++;
             var total = parseFloat(parseFloat(value) * parseFloat(splitPrice[1])); 
             var roundedNumber = total.toFixed(2);
             total_Price.text(`$${roundedNumber}`);
         //  updateCartTotals();
           updateCartTotalDisplay(); 
        } else {
            // Don't allow decrementing below zero
            value--;
            if (oldValue > 0) {
                var newVal = parseFloat(oldValue) - 1;
                
                var total = parseFloat(parseFloat(value) * parseFloat(splitPrice[1])); 
                var roundedNumber = total.toFixed(2);
                total_Price.text(`$${roundedNumber}`);
              //  updateCartTotals();
                updateCartTotalDisplay(); 
                
            } else {
                newVal = 0;
                value = 0;
                total_Price.innerHTML = 0; 
            }
        }
        $button.parent().find('input').val(newVal);
    });

    function updateCartTotals(){
        $(".shoping__cart__total").each(function(){
            var $totalElement = $(this);
            var $row = $totalElement.closest('tr');
            var itemPrice = $row.find('.shoping__cart__price').text();
            var splitPrice = itemPrice.split("$");
            var quantity = parseFloat($row.find('.pro-qty input').val());
            var total = parseFloat(splitPrice[1]) * quantity;
            var roundedNumber = total.toFixed(2);
            $totalElement.text(`$${roundedNumber}`);
        })
    }

    /*---------------------------
     Calculate the Total Due amout per Item displayed in the total
    ----------------------------*/
    function calculateTotalPayable() {
        // Select all elements with the class name "shoping__cart__total"
        var totalElements = document.querySelectorAll('.shoping__cart__total');
        // Initialize a variable to store the total sum
        var totalPayable = 0;
        // Loop through each total element and sum up their values
        totalElements.forEach(function(element) {
            // Remove the dollar sign and convert the text content to a float
            var value = parseFloat(element.textContent.replace('$', ''));
            // Add the value to the total sum
            totalPayable += value;
        });
        // Return the total sum
        return totalPayable;
    }

    /*---------------------------
     Function to update the Total and Sub-total value displayed in the Checkout
    ----------------------------*/
function updateCartTotalDisplay() {
    // Get the cart total value
    var totalPayable = calculateTotalPayable();

    // Select the span elements for subtotal and total
    var subtotalSpan = document.querySelector('.shoping__checkout li:nth-child(1) span');
    var totalSpan = document.querySelector('.shoping__checkout li:nth-child(2) span');

    // Update the text content of the span elements with the new total payable value
    subtotalSpan.textContent = '$' + totalPayable.toFixed(2);
    totalSpan.textContent = '$' + totalPayable.toFixed(2);
}

updateCartTotals();

/*-------------------
        Header heart, cart, and price
    ---------------------*/
 //must be uncommented if database connection is available 
//  function updatePricesFromDatabase() {
//     var xhr = new XMLHttpRequest();
//     xhr.open("GET", "get_prices.php", true); //get_prices.php must be replaced with the actual php script that fetches the heart count, shopping bag products count, and total price
//     xhr.onreadystatechange = function () {
//         if (xhr.readyState === 4 && xhr.status === 200) {
//             var data = JSON.parse(xhr.responseText);
//             var price = data.price;
//             var count = data.count;
//             var hearts = data.hearts;
//             updatePrices(price, count, hearts);
//         }
//     };
//     xhr.send();
// }

// function updatePrices(price, count, hearts) {
//     // Array of elements and their corresponding prices
//     var elements = [
//         { selector: '.fa-heart > span', value: hearts },
//         { selector: '.fa-shopping-bag > span', value: count },
//         { selector: '.header__cart__price > span', value: price }
//     ];
    
//     // Loop through the elements array and update their text content
//     elements.forEach(function (element) {
//         var elementsToUpdate = document.querySelectorAll(element.selector);
//         elementsToUpdate.forEach(function (el) {
//             el.textContent = `${element.value}`;
//         });
//     });
// }

// updatePricesFromDatabase();

 
/////////////////////////////////////////
//this block must be commented/deleted if database connection is established 
var price = 2389;
var count = 54;
var hearts = 50;

function updateValue(price, count, hearts) {
    // Array of elements and their corresponding prices
    var elements = [
        { selector: '.fa-heart > span', value: hearts },
        { selector: '.fa-shopping-bag > span', value: count },
        { selector: '.header__cart__price > span', value: price}
    ];
    
    // Loop through the elements array and update their text content
    elements.forEach(function (element) {
        var elementsToUpdate = document.querySelectorAll(element.selector);
        elementsToUpdate.forEach(function (el) {
            el.textContent = `${element.value}`;
        });
    });
}
updateValue(price, count, hearts);
//////////////////////////////////////////

})(jQuery);

    