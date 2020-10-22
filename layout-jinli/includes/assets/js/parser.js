// REQUEST VARIABLES
// the following functions returns values from api

	var getCategories = function(client_url,game_platform_id){
				var x = "";
				$.ajax({
			        url : client_url+"pub/get_frontend_games/"+game_platform_id+"/game_type",
			        type:"post",
			        async:false,
			        dataType: "json",
			        success : function (data,status,xhr) {
			        	x = data;
			        	// x = data.available_game_type_codes;
			    	}
				});
				return x;
			}

	var getGames = function(client_url,game_platform_id,game_type_code,platform_type,isMobile){

				console.log("Loading Gamelist from API");

				var x = [],
					request = game_type_code.split(",");

				if(!platform_type){
					platform_type = "all";
				    console.log("platform_type not set");
				}

	        	if(!isMobile)
	        		console.log("isMobile not set");

	        	if(!game_type_code)
	        		console.log("game_type_code not set");

	        	if(!game_platform_id)
	        		console.log("game_platform_id not set");

	        	if(!client_url)
	        		console.log("game_platform_id not set");

				$.each(request,function(q,e){
					var apiURL = client_url+"pub/get_frontend_games/"+game_platform_id+"/"+e;
					$.ajax({
				        url : apiURL,
				        type:"post",
				        async:false,
				        dataType: "json",
				        success : function (data,status,xhr) {

		        			var tmp = [];
				        	if(data.game_list){
				        		if(isMobile=="true"){
			        				$.each(data.game_list,function(k,v){
										if(v.status.toString()=="1"){
											if(v.in_mobile.toString()=="1"){
												tmp.push(v);
											}
										}
			        				});
								}else if((isMobile=="false")||(!isMobile)){
					        		if((platform_type=="all")||(!platform_type)){
										$.each(data.game_list,function(k,v){
											if(v.status.toString()=="1"){
												if(v.in_html5.toString()=="1" || v.in_flash.toString()=="1"){
													tmp.push(v);
												}
											}
											//tmp = data.game_list;
										});					        		
									}else if(platform_type=="html5"){
				        				$.each(data.game_list,function(k,v){
				        					if(v.in_html5.toString()=="1"){
		        								if(v.status.toString()=="1"){
		    										tmp.push(v);
		        								}
				        					}
				        				});
					        		}else if(platform_type=="flash"){
				        				$.each(data.game_list,function(k,v){
				        					if(v.in_flash.toString()=="1"){
		        								if(v.status.toString()=="1"){
		    										tmp.push(v);
		        								}
				        					}
				        				});
			        				}
		        				}

			        			x[q] = tmp;
				        	}
				    	}
					});
				});
				return x;
			}

	var getVendors = function(client_url){
				var x = "";
				$.ajax({
			        url : client_url+"pub/get_frontend_games/",
			        type:"post",
			        async:false,
			        dataType: "json",
			        success : function (data,status,xhr) {
			        	x = data.available_game_providers;
			    	}
				});
				return x;
			}

	var getVendorID = function(client_url,game_provider){
				var x = "";
				$.ajax({
			        url : client_url+"pub/get_frontend_games/",
			        type:"post",
			        async:false,
			        dataType: "json",
			        success : function (data,status,xhr) {
			        	$.each(data.available_game_providers,function(a,b){
			        		console.log(b.game_provider.toLowerCase())
			        		console.log(game_provider.toLowerCase());
	        				if(b.game_provider.toLowerCase()==game_provider.toLowerCase())
	        					x = data.game_platform_id;
			        	})
			        	console.log(x);
			    	}
				});
				// return x;
			}

	var getFirstVendor = function(client_url){
				if(getVendors(client_url))
					return Object.keys(getVendors(client_url))[0];
				else
					return false;
			}

// GAME LOADER
// Parses slots default configuration created via _dfe url

	var getImagePath = function(data,v){
		$.each(data,function(c,d){
			if(d.vendor==v){
				return d.image.toString();
			}else{
				return "x";
			}
		});
	}

	var parseCategory = function(config,vendor){
		$.each(config.ctg_lang_array,function(q,e){
			if(e.vendor==vendor){

				var newLabel;
				if(config.ctg_default_lang=="def"){
					newLabel = e.defaultLabel;
				}else if(config.ctg_default_lang=="alt"){
					newLabel = e.defaultAltLabel;
				}

				var q = config.ctg_grid_template;
					q = q.replace(/<%vendor%>/g,vendor);
					q = q.replace(/<%game_type_list%>/g,e.tags);
					q = q.replace(/<%platform_type%>/g,e.platform);
					q = q.replace(/<%isMobile%>/g,e.isMobile);
					q = q.replace(/<%category%>/g,newLabel);

				if(e.toHide.toString!="true")
					$(config.ctg_grid).append(q);
			}
		});
	}

	var parseGames = function(data,config){
		var gameLength = 0;
		$.each(data,function(c,d){
			$.each(d,function(a,b){
				if($.inArray(b.game_name_en.toLowerCase().replace(/ /g,""), config.hidden_games)==-1){	// CHECKS IF GAME IS TOGGLED AS HIDDEN
					var imgPath = "",
						gameId= "",
						realPath = "",
						trialPath = "";
						$.each(config.game_link_format,function(c,d){	// CREATES THE CATEGORY TEMPLATE
									if(d.vendor==b.provider_name){
										imgPath = d.image;
										realPath = d.real.replace(/<%game_code%>/g,(b.game_id_desktop ? b.game_id_desktop: b.game_id_mobile));
										trialPath = d.trial.replace(/<%game_code%>/g,(b.game_id_desktop ? b.game_id_desktop: b.game_id_mobile));
									}
								});

					var isTop = "";
					if(b.top_game_order!=0)
						isTop = "game-top";

					var default_game_lang = "";
					if(config.game_default_lang=="EN")
						default_game_lang = b.game_name_en;
					else if(config.game_default_lang=="CN")
						default_game_lang = b.game_name_cn;

					var x = config.game_grid_template;
						x = x.replace(/<%game_name%>/g,default_game_lang);
						x = x.replace(/<%game_id%>/g,(b.game_id_desktop ? b.game_id_desktop: b.game_id_mobile));
						x = x.replace(/<%game_image_id%>/g,(b.game_id_desktop ? b.game_id_desktop.toLowerCase().replace(/ /g,"") : b.game_id_mobile ? b.game_id_mobile.toLowerCase().replace(/ /g,""):"" ));
						x = x.replace(/<%image_path%>/g,imgPath);
						x = x.replace(/<%game_is_top%>/g,isTop);
						x = x.replace(/<%provider_name%>/g,b.provider_name);
						x = x.replace(/<%url_real%>/g,realPath);
						x = x.replace(/<%url_trial%>/g,trialPath);
						x = x.replace(/<%game_type%>/g,b.game_type_code);
					var m = x;

					if((b.game_id_desktop)||(b.game_id_mobile))
						$(config.game_grid).append(m);
				}
				gameLength = a;
			});
		});
		console.log(gameLength+" Games added...");
		checkImages(config);
	}

	var checkImages = function(config){
		$(config.game_image_class).each(function(a,o){
			$(this).on('error', function(){
				$(this).attr("src","https://www.gamegateway.t1t.games/cdn/error.jpg");
			});
			$(this).on('load',function(){
		   		// do something
		   	});
		});
	}

	var string_GET = function(){
		var vars = [],
			hash,
			hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
		for(var i = 0; i < hashes.length; i++){
			hash = hashes[i].split('=');
			vars.push(hash[0]);
			vars[hash[0]] = hash[1];
		}
		return vars;
	}

	var activeVendor = function(){
		a = string_GET().vendor;
		if(a)
			return a;
		else
			return false;
	}

// AFTER CALLBACKS
// functions to execute after loading the entire list

	var json_version = Math.random().toString().substr(2,3);

	$.ajax({
		url: location.protocol +"//"+ location.host + "/control/config.json?v="+json_version,
		dataType:"json",
		async:false,
		type:"get",
		success:function(data){
			var vendor = (string_GET().vendor ? string_GET().vendor:data.default_vendor),
				playerURL = data.player_url,
				gameType = (string_GET().gameType ? string_GET().gameType:"slots");
				platformType = (string_GET().platformType ? string_GET().platformType:"all");
				isMobile = (string_GET().isMobile ? string_GET().isMobile:"false");

			parseCategory(data,vendor);
			parseGames(getGames(playerURL,vendor,gameType,platformType,isMobile),data);
		}
	});