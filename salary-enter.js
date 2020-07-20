$(document).ready(function(){
    $('#salary-entry').keypress(function(e){
      if(e.keyCode==13)
      $('#enter-salary').click();
    });
});
