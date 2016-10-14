

$(function() {

  $('.table-box').addClass('animated fadeInDown');
  $('#summerSample').addClass('animated fadeInDown');

  setTimeout(function(){ 
    $('.container').addClass('animated fadeOutDown');
  }, 2000);

  $('.table-box').removeClass('hide');
  $('#summerSample').removeClass('hide');    
  
  setTimeout(function(){ 
    $('#cssAnimate').trigger('click')
  }, 2000);  

});


