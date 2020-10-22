
	var hideCookiebar = function(){
		$("#footer-cookies").slideUp("200");
		$(".footer-spacer").slideUp("200");
	}

	var showCookiebar = function(){
		$("#footer-cookies").slideDown("200");
		$(".footer-spacer").slideDown("200");
	}
	
// Check if cookie is already set
	if(Cookies.get('accept-cookie')){
		hideCookiebar();
	}else{	
		showCookiebar();
	}

// init accept cookie button
	$(document).ready(function(){
		$(".accept-ck").click(function(){
			Cookies.set('accept-cookie', true);
			console.log("cookie-set");
			hideCookiebar();
		});
	});