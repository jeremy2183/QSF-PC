
(function() {
    
    $('.prev_btn').click(function () {
         if ( $('.news_LI').css('margin-left') === "0px" ) {
              $('.news_LI').animate({marginLeft:"+=0px"})
         } else {
             $('.news_LI').animate({marginLeft:"+=391.5px"})
         }
    });
    $('.next_btn').click(function () {
        if ( $('.news_LI').css('margin-left') === "-2740.5px" ) {
            $('.news_LI').animate({marginLeft:"-=0px"})
        } else {
            $('.news_LI').animate({marginLeft:"-=391.5px"})
        }
        
    });
 
})();


