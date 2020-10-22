$(document).on("keyup","#search",function(){
    // $(".search-list-result").empty();
    var searchVal = $(this).val().toLowerCase(),
        hasResult = 0;

    if(searchVal!=""){
        $(".game-name-en").each(function() {
          if($(this).text().toLowerCase().indexOf(searchVal)>-1){
              $(this).parent().parent().parent().fadeIn(100).addClass('aos-animate');
              hasResult+=1;
          }else{
            $(this).parent().parent().parent().fadeOut(100).removeClass('aos-animate');
          }
        });

        if(hasResult>=1){
          // $(".no-result").hide(200);
          $(".search-list-result").fadeOut(100);
        }else if(hasResult<=0){
          // $(".no-result").show(200);
          $(".search-list-result").fadeIn(100);
        }
    }else{
        $(".game-item").fadeIn(100).addClass('aos-animate');
        $(".search-list-result").fadeOut(100);
        // $('.grid-item_').show();
        // $(".clear-section").hide(200);
    }
});


$('#search').keypress(function (e) {
  if (e.which == 13) {
    e.preventDefault();
    // $(".sidenav-close i").click();
    // $(".clear-section").show(200);
    return false;
  }
});

$(".clear-section").click(function(){
  // $("input#search").val("");
  // $(".clear-section").hide(200);
  // $('.grid-item_').show();
  // $(".no-result").hide(200);
})