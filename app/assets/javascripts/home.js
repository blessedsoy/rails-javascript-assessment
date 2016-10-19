

$(function() {

  $('.table-box').addClass('animated fadeInDown');
  $('#summerSample').addClass('animated fadeInDown');

  // setTimeout(function(){ 
  //   $('#front_image').addClass('animated fadeOutDown');
  // }, 2000);
  setTimeout(function(){
    $('.image-box').fadeOut(1500)  
  },2000)
  

  // $('.table-box').removeClass('hide');
  // $('#summerSample').removeClass('hide'); 

  $('#sample-sales').fadeIn(3000)   
  
  setTimeout(function(){ 
    $('.image-box').trigger('click')
  }, 2600);  

});


