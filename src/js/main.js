////////////////////
//Application Module
////////////////////
 var app = (function () {   
     "use strict";  
     //-----------------------------------------------------------------
     // Page Initalization handler : exposed to app.init();
     //-----------------------------------------------------------------
     var init = function () {         
            _accordionHandler();
            _commenEvents();
            _formElements();
            _menuToggle();
            _wowAnimated();
            viewportCondition();  
            _fileBrowes();    
            _sliderEvents();      
         },
          _fileBrowes = function(){
              $(".file-upload").change(function(){
                var x = ($(".file-upload").val());
                $('#file-upload-value').val(x);
              });
           },
        _accordionHandler = function(){
          $('.accordion-blk h4').on('click', function(){
              if(!$(this).hasClass('active')){
                   $('.accordion-blk h4').removeClass('active');
                   $(".accordion-content").stop(true, true).slideUp();
                   $(this).addClass('active');
                   $(this).parents('.accordion-blk').find(".accordion-content").slideDown();
              }else{
                $('.accordion-blk h4').removeClass('active');
                   $(".accordion-content").stop(true, true).slideUp();
              }
          });
        },
        _wowAnimated = function() {
          var wow = new WOW(
            {
            animateClass: 'animated',
            offset:60
            }
          );
          wow.init();
        },

        _rippleActions = function() {
            // ripple
            window.rippler = $.ripple('.button', {
                debug: true,
                multi: true,
                opacity: 0.45,
                color: "auto",
                duration: 1
            });
        },
        _sliderEvents = function() {
          //hero banner slider
          $('.hero-banner').slick({
            infinite:true,
            slideToShaow:1,
            slideToScroll:1,
            fade:true,
            dots:false,
            arrows:false,
            autoplay:true,
            respnsive:[
            {
              breapoints: 769,
              settings:{
                autoplay:true
              }
            },
            ]
          })
          $('.testimonial').slick({
            infinite:true,
            slideToShaow:1,
            slideToScroll:1,
            fade:true,
            dots:true,
            arrows:true,
            autoplay:true,
            respnsive:[
            {
              breapoints: 769,
              settings:{
                autoplay:true
              }
            },
            ]
          })
        },
        viewportCondition = function() {
           
        },

        _formElements = function() {
            //form 
            /*jquery ui selectbox placeholder start*/
            $.widget('app.selectmenu', $.ui.selectmenu, {
               _drawButton: function() {
                   this._super();
                   var selected = this.element
                       .find('[selected]')
                       .length,
                       placeholder = this.options.placeholder;

                   if (!selected && placeholder) {
                       this.buttonItem.text(placeholder);
                   } 
               }
            });

           //Select menu
           $('.select-menu').each(function() {
               var $placeholder = $(this).data('placeholder');
               $(this).selectmenu({
                   placeholder: $placeholder,
                   appendTo: $(this).parent(".select-row"),
                   create: function(event, ui) {
                       $('.ui-selectmenu-text').addClass('placeholder');
                   },
                   change: function(event, ui) {
                       $('.ui-selectmenu-text').removeClass('placeholder');
                   }
               });
           });

           if($('.select-menu').length>0){
               $(".select-menu").selectmenu({
                   select: function(event, ui) {
                       var errorText  = $(this).parents('.form-row').find('label').attr('data-error');
                       if($('option:selected',$(this)).index()>0) {
                           $(this).parents('.form-row').removeClass('error-row');
                           $(this).parents('.form-row').find('.error-message').slideUp(function(){
                               $(this).remove();
                           });
                       } else {
                           $(this).parents('.form-row').addClass('error-row');
                           $(this).parents('.form-row').find('.error-message').slideDown(); 
                       }
                   }
               });
           }

          $(".select-menu").selectmenu({
             change: function(event, ui) {
               if ($('.select-menu option:selected').val() != 0) {
                   $('.select-menu').find('.error-message').hide();
                   $('.select-menu').parent('.form-row').removeClass('error-row');
               }
             }
          });

           $('.floating-item input, textarea').focus(function(){
               $(this).parent('.floating-item').addClass('input-animate'); 
            });
            $('.floating-item input, textarea').blur(function(){
              if($(this).parent('.floating-item').val() ==""){
               $(this).parent('.floating-item').removeClass('input-animate'); 
              }
            });
            $('input, textarea').keyup(function() {
                if ($(this).val() !== "") {
                    $(this).addClass('input-email-active'); 
                } else {
                    $(this).removeClass('input-email-active');  
                } 
            });
        },

        _menuToggle = function() {
          $('.menu-toggle').on('click', function() {
            $('body').addClass('y-hidden');
            $('.menu-open').addClass('slide');
          });
          $('.menu-close').on('click', function() {
            $('body').removeClass('y-hidden');
            $('.menu-open').removeClass('slide');
          });
        },

        _commenEvents = function() {
            // Add common js here
            $('nav li > ul').each(function(){
              $(this).parent('li').find('>a').addClass('has-menu');
            });
             // Disable scroll when focused on a number input.
            $('form').on('focus', 'input[type=number]', function(e) {
                $(this).on('wheel', function(e) {
                    e.preventDefault();
                });
            });
         
            // Restore scroll on number inputs.
            $('form').on('blur', 'input[type=number]', function(e) {
                $(this).off('wheel');
            });
         
            // Disable up and down keys.
            $('form').on('keydown', 'input[type=number]', function(e) {
                if ( e.which == 38 || e.which == 40 )
                    e.preventDefault();
            });  
            $('.lightboxTrigger').on('click', function(){
              $('.popup-outer').addClass('open');
              $('body, html').addClass('y-hidden');
            });
            $('.fa-times-circle, button').on('click', function(){
              $('.popup-outer').removeClass('open');
              $('body, html').removeClass('y-hidden');
              $('#message, #email-quote, #name-quote').val('');
            })
            $('.popup-outer').mouseup(function(e){
                var container = $(".popup-inner");

                // if the target of the click isn't the container nor a descendant of the container
                if (!container.is(e.target) && container.has(e.target).length === 0){
                    $(this).removeClass('open');
                    $('body, html').removeClass('y-hidden');
                }
            });
        };

        


    // Expose Global Functions
    return {
         init: init,
         viewportCondition: viewportCondition
     };
 })();

$(window).scroll(function() { 
   //scroll function here

});

$().ready(function () {
    app.init();        
});

$(window).resize(function(){
  app.viewportCondition();
});

$(window).on('load', function() { 
  $('.render-blk').stop(true, true).animate({opacity:1}, 1000);
  if(sessionStorage.getItem('loader') == null) {
    NProgress.done();  
    sessionStorage.setItem('loader', 'true');
  }else{      
    NProgress.done();
  }
});
