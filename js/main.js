$(document).ready(function () {


/*--------------START MAIN PAGE----------*/
//Start modal-window
$('.modal-show').on('click', function () {
    $('.overlay').fadeIn(400,
        function () {
            $('.modal-form').css('display', 'block').animate({opacity: 1, top: '5%'}, 200);
        });
});

//Close modal-window
$('.modal-close, .overlay').on('click', function () {
    $('.modal-form').animate({opacity: 0}, 200,
        function () {
            $(this).css('display', 'none');
            $('.overlay').fadeOut(400);
        }
    );
});
//End modal-window

//Start validation form
$('.send').on('click',function () {

    var inputs = [
        $('.input-name'),
        $('.input-surname'),
        $('.input-tel'),
        $('#textarea')
    ];

    if(validationFields(inputs)){
        showSuccessModal(inputs);
    }
});
// End validation form
/*--------------END MAIN PAGE----------*/


/*--------------START ABOUT ME----------*/
//Start Read more
$('.read-more').on('click',function (e) {
    e.preventDefault();

    if($(this).hasClass('open-more')){
        $(this).parent().children('p').removeClass('full-text');
        $(this).html('Подробнее').append('&nbsp;<i class="fa fa-angle-double-right"></i>');
        $(this).removeClass('open-more');
    }else{
        $(this).parent().children('p').addClass('full-text');
        $(this).html('Скрыть').append('&nbsp;<i class="fa fa-angle-double-up"></i>');
        $(this).addClass('open-more');
    }
});
//End Read more
/*--------------END ABOUT ME----------*/


/*--------------START PUBLICATION PAGE----------*/
// Main article title
$('.art-title-wrapper').hover(function () {
    $(this).addClass('full-title-wrapper');
    $(this).children('h3').addClass('full-title')
},function () {
    $(this).removeClass('full-title-wrapper');
    $(this).children('h3').removeClass('full-title')
});
//End main article title

//Start pagination
$('.page-link').on('click',function (e) {
    e.preventDefault();

    var $this, block;

    if($(this).hasClass('page-prev')){
        $this = $(this).closest('.pagination').children('li').children('.active').parent().prev().children();
        block = $this.hasClass('page-prev') ? false : $($this.data('paginate'));
    }else if($(this).hasClass('page-next')){
        $this = $(this).closest('.pagination').children('li').children('.active').parent().next().children();
        block = $this.hasClass('page-next') ? false : $($this.data('paginate'));
    }else{
        $this = $(this);
        block = $($(this).data('paginate'));
    }

    if(block){
        block.siblings().removeClass('pagination-active').addClass('invisible');
        block.removeClass('invisible').addClass('pagination-active');
        $this.parent().siblings().children().removeClass('active');
        $this.addClass('active');

        if(block.hasClass('art-block-1')){
            $('.page-prev').addClass('disabled');
            $('.page-next').removeClass('disabled');
        }else if(block.hasClass('art-block-3')){
            $('.page-next').addClass('disabled');
            $('.page-prev').removeClass('disabled');
        }else{
            $('.page-prev').removeClass('disabled');
            $('.page-next').removeClass('disabled');
        }
    }

});
//End pagination
/*--------------END PUBLICATION PAGE----------*/


/*--------------START REVIEWS PAGE----------*/
//Start add review

$('.add-comment').on('click',function (e) {
    e.preventDefault();

    var userComment = $('#comment');

    if(validationFields([userComment])){
        var reviewWrapper = $('.template-review').clone();
        var dateReviews = getDate();
        var userName = $('#name');
        var thumbnailPhoto = $('.thumbnail-photo');
        var textPhoto = $('.our-photo');

        reviewWrapper.find('.name-user').empty().text(get_cookie('user_name'));
        reviewWrapper.find('.user-comment').empty().text(userComment.val());
        reviewWrapper.find('.date-reviews').empty().text(dateReviews);
        reviewWrapper.find('.photo-user-wrapper').children('img').attr('src', get_cookie('user_photo'));
        reviewWrapper.removeClass('template-review');
        $('.all-reviews').append(reviewWrapper);
        userComment.val('');
        userName.val('');
        thumbnailPhoto.addClass('invisible');
        textPhoto.addClass('invisible');
    }
});

//End add review
/*--------------END REVIEWS PAGE----------*/
});


/*------------FUNCTIONS-------------*/

/**
 * This func validate form fields.
 * @param inputs
 * @returns {boolean}
 */
function validationFields(inputs) {
    var countError = 0;
    $.each(inputs, function (i, input) {

        if(!input.val()){
            countError++;
            var emptyField = $('<li></li>').text(' Заполните поле!');

            input.parent().children('.errors').addClass('validate-input').empty().append(emptyField);
            input.parent().children('.error-close').addClass('completed-error');
            input.parent().children('.success-check').removeClass('completed-success');
        } else{
            input.parent().children('.errors').removeClass('validate-input').empty();
            input.parent().children('.error-close').removeClass('completed-error');
            input.parent().children('.success-check').addClass('completed-success');
        }
    });

    return !countError;
}

/**
 *  This func show success modal and clear fields form.
 * @param inputs
 */
function showSuccessModal(inputs) {

    var modalForm      = $('.modal-form');
    var formWrapper    = modalForm.children('.form-wrapper');
    var successWrapper = modalForm.children('.success-window-wrapper');
    var close = $('.modal-close').css('display','none');
    var spinner = $('<i></i>').addClass('fa fa-refresh fa-spin');

    formWrapper.addClass('invisible');
    successWrapper.addClass('invisible');

    $('.overlay').append(spinner).fadeIn(function () {

        setTimeout(function () {
            $('.overlay').empty();
            successWrapper.removeClass('invisible');
            setTimeout(function () {
                close.trigger('click');
                setTimeout(function () {
                    $('.modal-close').css('display','block');
                    formWrapper.removeClass('invisible');
                    successWrapper.addClass('invisible');
                    $.each(inputs, function (i, input) {
                        input.val('').parent().children('.success-check').removeClass('completed-success');
                    });
                }, 400);
            },2000)
        },1000)
    });
}

/**
 * This func get date in format DD.MM.YYYY
 * @returns {string}
 */
function getDate() {
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth();
    var year = date.getFullYear();

    if(day.toString().length === 1){
        day = '0' + day;
    }

    month ++;
    if(month.toString().length === 1){
        month = '0'+ month;
    }

    return day + '.' + month + '.' + year;
}

/**
 * This func checked user is authorization and show fields for filling in the form review
 */
function checkAuthorizationUser() {

    if (get_cookie("user_name")){
        var nameUser    = get_cookie('user_name');
        var photoUser   = get_cookie('user_photo');
        var thumbnailPhoto = $('.thumbnail-photo');
        var textPhoto = $('.our-photo');

        $('.form-review').removeClass('invisible');
        $('.ulogin').removeClass('invisible');
        thumbnailPhoto.removeClass('invisible');
        textPhoto.removeClass('invisible');
        $('.text-ulogin').removeClass('invisible');

        $('.text-auh').addClass('invisible');

        $('#name').val(nameUser);
        thumbnailPhoto.attr('src',photoUser);
    }else{
        $('.text-auh').removeClass('invisible');
        $('.ulogin').removeClass('invisible');
        $('.form-review').addClass('invisible');
    }
}
checkAuthorizationUser();





