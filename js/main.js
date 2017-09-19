




$(document).ready(function () {
    // START ABOUT ME
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
    //END ABOUT ME


    //START MAIN PAGE

    //Start modal-window
        $('.modal-show').on('click', function () {
            $('.overlay').fadeIn(400,
                function () {
                    $('.modal-form').css('display', 'block').animate({opacity: 1, top: '5%'}, 200);
                });
        });
        /* Close modal-window */
        $('.modal-close, .overlay').on('click', function () {
            $('.modal-form').animate({opacity: 0}, 200,
                function () {
                    $(this).css('display', 'none');
                    $('.overlay').fadeOut(400);
                }
            );
        });
        //End modal-window

        // Start validation form
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
        // End validation form

    //END MAIN PAGE



    // START PUBLICATION PAGE

        // Main article title
        $('.art-title-wrapper').hover(function () {
            $(this).addClass('full-title-wrapper');
            $(this).children('h3').addClass('full-title')
        },function () {
            $(this).removeClass('full-title-wrapper');
            $(this).children('h3').removeClass('full-title')
        });
        //End main article title

        // Start pagination
        $('.page-link').on('click',function (e) {
            e.preventDefault();

            var block;
            var $this;

            if($(this).hasClass('page-prev')){

                $this = $(this).closest('.pagination').children('li').children('.active').parent().prev().children();

                if(!$this.hasClass('page-prev')){
                    block = $($this.data('paginate'));

                    block.siblings().removeClass('pagination-active').addClass('invisible');
                    block.removeClass('invisible').addClass('pagination-active');

                    $this.parent().siblings().children().removeClass('active');
                    $this.addClass('active');
                }
            }else if($(this).hasClass('page-next')){
                $this = $(this).closest('.pagination').children('li').children('.active').parent().next().children();

                if(!$this.hasClass('page-next')){
                    block = $($this.data('paginate'));

                    block.siblings().removeClass('pagination-active').addClass('invisible');
                    block.removeClass('invisible').addClass('pagination-active');

                    $this.parent().siblings().children().removeClass('active');
                    $this.addClass('active');
                }
            }else{
                block = $($(this).data('paginate'));

                block.siblings().removeClass('pagination-active').addClass('invisible');
                block.removeClass('invisible').addClass('pagination-active');

                $(this).parent().siblings().children().removeClass('active');
                $(this).addClass('active');
            }
        });
        // End pagination

    // END PUBLICATION PAGE


    // START REVIEWS PAGE

        // Start input-file
        $('input[type=file]').change(function () {
            var filename = $(this).val().replace(/.*\\/, '');
            console.log(filename);
            $('.attach-photo').html(filename);
        });
        // End input-file

        //Start add review

    $('.add-comment').on('click',function (e) {
        e.preventDefault();
        var nameUser = $('.horizontal-form').find('#name').val();
        var commentUser = $('.horizontal-form').find('#comment').val();
        console.log(nameUser);
        console.log(commentUser);

    });

        //End add review

    // END REVIEWS PAGE

});


