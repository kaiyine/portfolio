
  // GET QUERY STRING FROM URL
  function string_GET(){
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
    hash = hashes[i].split('=');
    vars.push(hash[0]);
    vars[hash[0]] = hash[1];
    }
    return vars;
  }


  console.log(string_GET()["prv"]==null);
  if(string_GET()["prv"]!=""){
    var m = string_GET()["prv"];
    $('[href="slots.html?prv='+m+'"]').addClass("active");
  }

  if(string_GET()["prv"]==null){
    $('[href="slots.html?prv=playtech"]').addClass("active");
  }

  setTimeout(function(){
    $(".float_slider").removeClass('do-not-show');
  },2000);