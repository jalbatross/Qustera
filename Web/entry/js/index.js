/*jslint browser: true, indent: 4 */
/*global $, jQuery, alert*/

$(document).ready(function () {
    "use strict";
    
    var numSlides = $('.slide').length;
    var currentSlide = 0;
    var slideWidth = $('.slideContainer').css('width');
    var i, k = 0;
    
    
    //fix z-indices of slides
    function setSlideZ() {
        var index = 0;
        for (k = 0; k < numSlides; k++) {
            index = numSlides - k + 1;
            $("#slide"+(k+1)).css('z-index', index);
        }
        
    };
    setSlideZ();
    
    //set enabled/disabled states for buttons
    function setButtonState() {
        switch (currentSlide) {
            case 0: 
                $('.left > .btn').prop('disabled', true);
                break;
            case numSlides - 1: 
                $('.right > .btn').prop('disabled', true);
                break;
            default:
                $('.navButton > .btn').prop('disabled', false);
        }
    };

    function slideRight() {
        currentSlide++;
        $("#slide" + currentSlide + "> form > fieldset").prop('disabled', true);
        $("#slide"+currentSlide).css({transform: 'translateX(-'+ slideWidth +')'});
        setButtonState();
    }

    function slideLeft() {
        $("#slide"+currentSlide).css({transform: "translateX(0px)"});
        $("#slide" + currentSlide + "> form > fieldset").prop('disabled', false);
        currentSlide--;
        setButtonState();
    }
        
    setButtonState();
    
    //TODO: Add swipe functionality
    
    //navButton click slide
    $('.navButton').click(function () {
        if ($(this).hasClass('right')) {
            slideRight();
        }
        else if ($(this).hasClass('left')) {
            slideLeft();
        }
    });
    
    //removes HTML tags from strings
    function stripHTML(dirtyString) {
        var container = document.createElement("div");
        var text = document.createTextNode(dirtyString);
        container.appendChild(text);
        return container.innerHTML;
    }
    
    //Get quest name
    $("#slide1 > form").on('submit', function(e) {
        e.preventDefault();
        var formString = stripHTML($("#slide1 >form > fieldset > input").val());
        $("#slide2").html(formString + "<br> that sounds like fun!");
        slideRight();
        return false;
    });
    
    function preventLongInput() {
      var maxTitleLength = 16; //Need to globally define this somewhere else
        var $title = $(this);
        var titleLength = $title.val().length;
        
        if (titleLength >= maxTitleLength) {
            $title.addClass('invalid');
        }
        else {
            $title.removeClass('invalid');
        }
    }
    $("#slide1>form>fieldset>input").on("input", preventLongInput);
    
});