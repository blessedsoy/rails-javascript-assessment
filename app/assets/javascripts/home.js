

$(function() {

$.fn.extend({
    animateCss: function (animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
        });
    }
});   

  $('.table-box').addClass('animated fadeInDown');
  $('#summerSample').addClass('animated fadeInDown');


  
  
  setTimeout(function(){
    $('.image-box').animateCss('fadeOut')  
  },1800)
  

  // $('.table-box').removeClass('hide');
  // $('#summerSample').removeClass('hide'); 

  $('#sample').animateCss('fadeIn')  

  
  setTimeout(function(){ 
    $('.image-box').trigger('click')
  }, 1800);


  

  // setTimeout(function(){
  //   $('.right-block').addClass('goneBlack')
    
  // },2000)

  // setTimeout(function(){
  //   $('.right-block').removeClass('goneBlack')
    
  // },2030)
});




