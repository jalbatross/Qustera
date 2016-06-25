/*jslint browser: true, indent: 4 */
/*global $, jQuery, alert*/

//TODO: Eventually move auxillary functions before document ready function.

$(document).ready(function () {
    "use strict";
    
    var numSlides = $('.slide').length;
    var currentSlide = 0;
    var slideWidth = $('.slideContainer').css('width');
    var i, k = 0;
    var validTitle, validQuest;
    
    //fix z-indices of slides
    function setSlideZ() {
        var index = 0;
        for (k = 0; k < numSlides; k++) {
            index = numSlides - k + 1;
            $("#slide"+(k+1)).css('z-index', index);
        }
        
    };
    
    //set enabled/disabled states for buttons
    function setButtonState() {
        switch (currentSlide) {
            case 0: 
                $('.left > .btn').prop('disabled', true);
                if(!validTitle) {
                    $('.right > .btn').prop('disabled', true);
                }
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
    

    //TODO: Add swipe functionality
    //navButton click slide
    $('.navButton').click(function () {
        if ($(this).hasClass('right')) {
            
            if(currentSlide === 0) {
                submitQuestName();
                return;
            }
            
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
    //TODO: Disable scrolling to second page and further IF this entry
    //field is blank, or has not been submitted before.
    //TODO: Prevent quest titles that are too short (maybe one char long?)
    //TODO: Filter for nonsensical titles (maybe use dictionary)
    $("#slide1 > form").on('submit', function(e) {
        e.preventDefault();
        if (!preventBadInput){
            submitQuestName();
            console.log("prevent");
        }
        else {
            return false;
        }
    });
    
    function submitQuestName() {
        var formString = stripHTML($("#slide1 >form > fieldset > input").val());
        $("#slide2 > fieldset > h").html(formString + "<br><small class= " + '"text-muted"' + "> that sounds like fun!</small>");
        slideRight();
        validTitle = true;
    }
    
    
    
    //limit for quest title
    function preventBadInput() {
        var maxTitleLength = 32; //Need to get this from html
        var minTitleLength = 2;
        var $title = $(this);
        var titleLength = $title.val().length;
        
        if (titleLength >= maxTitleLength || titleLength < minTitleLength) {
            $title.addClass('invalid');
            $('.right > .btn').prop('disabled', true);
            return false;
        }
        else {
            $title.removeClass('invalid');
            $('.right > .btn').prop('disabled', false);
            return true;
        }
    }
    $("#slide1>form>fieldset>input").on("input", preventBadInput);
    
    //prevents proceeding for step two
    function questDescriptionProceed() {
        var maxDescriptionLength = 512; // get from html
        var minDescriptionLength = 2;
        var $description = $(this);
        var descriptionLength = $description.val().length;
        
        if (descriptionLength < minDescriptionLength || 
            descriptionLength > maxDescriptionLength) {
            $description.next().removeClass('btn-primary');
            $description.next().addClass('btn-secondary disabled');
        }
        else {
            $description.next().removeClass('btn-secondary disabled');
            $description.next().addClass('btn-primary');
        }
    }
    $("#slide2>fieldset>textarea").on("input", questDescriptionProceed);
    
    //submit quest description
    $("#slide2>fieldset>button").on('click',function(e) {
        e.preventDefault();
        if ($("#slide2>fieldset>button").hasClass('disabled')) {
            return false;
        }
        else {
            if (!validQuest)
                validQuest = true;
            slideRight();
        }
    });
    
    function init() {
        setSlideZ();
        setButtonState();
        validTitle = validQuest = false;
    }
    init();
    
});