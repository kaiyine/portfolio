$(document).on("keyup","input#search",function(){
    $(".search-list-result").empty();
    var searchVal = $(this).val().toLowerCase(),
        hasResult = 0;

    if(searchVal!=""){
        // $(".clear-section").show(200);
        $(".slot-name").each(function(){
            if($(this).text().toLowerCase().indexOf(searchVal)>-1){
                // $(this).parent().show();
                var hrf = $(this).parent().parent().find(".play-btn").attr("href"),
                    nm = $(this).text();

                $(".search-list-result").append("<a href='"+hrf+"' class='res-data'>"+nm+"</a>");
                hasResult+=1;
            }else{
                // $(this).parent().hide();
            }
        });

        if(hasResult>=1){
          // $(".no-result").hide(200);
        }else if(hasResult<=0){
          // $(".no-result").show(200);
          $(".search-list-result").append("<a style='width: 100% !important;text-align: center;padding: 40px 0px;color: rgba(0,0,0,0.5)'>No matching result</a>");
        }
    }else{
        $(".search-list-result").empty();
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