$(document).ready(function(){

		var mobileMODE = false,			// set to true if mobile
			defaultLoad = "yoplay";
			list_games_en = [];
			list_games_cn = [];
				
		if(getUrlVars()["prv"]!=null){
			defaultLoad = getUrlVars()["prv"];
			loadJSON();
			checkIfHasChild();
		}else{
			loadJSON();
			checkIfHasChild();
		}
		
// GET QUERY STRING FROM URL
	function getUrlVars(){
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

	function loadTBA(){
		$("#thumb-container").empty();
		$("#categories").empty();

		$("#thumb-container").append("<div id='tab_TBA' class='tab-pane active'><div class='row gutter-sm'><div class='col text-center coming-soon'>即将来临</div></div></div>");
	}

// LOAD GAMES
	function loadJSON(){
		$("#thumb-container").empty();
		$("#categories").empty();

		var list_category = [],
			cacheT = new Date();
			cacheVer = cacheT.getTime() * 4/3;

		$.ajax({
            url : "includes/assets/js/gamelibrary/lib/"+defaultLoad.toUpperCase()+"-gamelist.json?v="+cacheVer,
            dataType: "text",
            success : function (data) {
            	var res = $.parseJSON(data),
            		templist = res[defaultLoad.toUpperCase().toString()];
				
				$('.category-sel').empty();
				$('.category-sel').append('<div class="swiper-slide center-align active"><a class="ctg-item" data-filter="all-games">所有游戏 </a></div>'+
                						  '<div class="center-align">&nbsp;&nbsp;&nbsp;</div>'+
                						  '<div class="swiper-slide center-align"><a class="ctg-item" data-filter="top-games">热门游戏 </a></div>');

				$("#thumb-container").append("<div id='tab_TOP10' class='tab-pane'><div class='row gutter-sm'></div></div>");
				$('#tab_TOP10').addClass('active');
				$(".li-TOP10 a").addClass('active');

            	$.each(templist,function(key,value){

						var label_en = value["game_name_en"],
							label_cn = value["game_name_cn"],
							label_desktop = value["game_id_desktop"],
							label_mobile = value["game_id_mobile"],
							label_category = value["game_category"],
							label_provider = value["game_provider"],
							label_launch = value["game_launch_code"],
							is_flash5 = value["is_flash"],
							is_html5 = value["is_html5"],
							is_top = value["is_top"],
							is_new = value["is_new"],
							other_id = value["additional_id"],
							extra_id = value["extra_id"],
							rank = value["ranking"],
	    					lower_provider = defaultLoad.toLowerCase().toString(),
	    					// label_img = "/includes/assets/images/games/"+gatewayPATH(lower_provider)+"/"+label_desktop+".jpg?v=0.1",
	    					label_img = "/includes/assets/images/games/"+gatewayPATH(lower_provider)+"/"+label_desktop+".jpg?v=0.20",
							url_pn = checkGameURL("real",lower_provider,label_desktop,label_category,other_id,extra_id),
							url_trial = checkGameURL("demo",lower_provider,label_desktop,label_category,other_id,extra_id);

							if((label_desktop=="VideoPoker")||(label_desktop=="GenericSlots")){
								label_img = "/includes/assets/images/games/"+gatewayPATH(lower_provider)+"/"+label_en+".jpg?v=0.20";
							}

							if(label_provider.toLowerCase()=="uc8"){
								label_img = "/includes/assets/images/games/uc8/"+label_desktop+".jpg?v=0.20";
							}

							if((label_cn!="#N/A")||(label_cn!="")||(label_cn!=null)){
		    					if((label_desktop!="")||(label_desktop!=null)){
			    					if((is_flash5=="Y")||(is_html5=="Y")){
					            		if($.inArray(convertCN(label_category), list_category)==-1){
											list_category.push(convertCN(label_category));
											
											var lbl_name = label_category.split("_")[0];

											$('.category-sel').append('<div class="center-align">&nbsp;&nbsp;&nbsp;</div><div class="swiper-slide center-align"><a class="ctg-item" data-filter="'+label_category.toLowerCase()+'-games"><span class="label-gtd">'+convertCN(label_category)+'</span> </a></div>');

										    // $(document).on("click",".show-"+label_category.toLowerCase()+"",function(){
										    //   $(".grid-item_").addClass('hideself');
										    //     $("."+label_category.toLowerCase()+"-games").removeClass('hideself');
										    //   $(".swiper-slide").removeClass('active');
										    //   $(this).parent().addClass('active');
										    // });
										    
										    $(document).on("click",".ctg-item",function(){
										    	var x = $(this).data("filter");
											    $(".grid-item_").each(function() {
													if(x!="all-games"){
														if($(this).hasClass(x))
															$(this).fadeIn(100).addClass('aos-animate');
														else
															// $(this).animate({opacity:0,width:'0%'},1000).removeClass('aos-animate');
															$(this).fadeOut(100).removeClass('aos-animate');
													}else{
														$(this).fadeIn(100).addClass('aos-animate');
													}
												});
												$(".swiper-slide").removeClass('active');
												$(this).parent().addClass('active');
										    });


											$("#thumb-container").append("<div id='tab_"+label_category+"' class='tab-pane'><div class='row gutter-sm'></div></div>");
					            		}


										var allowAppend = true;
										// var allowAppend = false;
										// if($.type(label_desktop)!="number"){
										// 	if(label_desktop.toLowerCase().toString().search('mobile')==-1){
										// 		allowAppend = true;
										// 	}
										// }else{
										// 	if((label_cn=="")||(label_cn.length==0)||(label_cn=="#N/A")||(label_cn==null)){
										// 		allowAppend = false;
										// 	}else{
										// 		allowAppend = true;
										// 	}
										// }

										if(allowAppend){
											if($.inArray(label_cn,list_games_cn)==-1){
						            			// if(is_top=="Y"){createThumbnail("TOP10",label_category,label_en,label_cn,url_pn,url_trial,label_img,key,label_desktop,lower_provider,label_mobile,other_id);}

					    						createThumbnail(label_category,label_category,label_en,label_cn,url_pn,url_trial,label_img,key,label_desktop,lower_provider,label_mobile,other_id,is_top);
											}
										}
									}			
								}			
							}			
            	});

            	
				AOS.init();
            }
        });

	       
	}

// CHECK IF TAB-PANE IS NOT EMPTY
	function checkIfHasChild(){
		$("#categories li").each(function(){
			var ct = $(this),
				x = $(this).attr("class").split("-")[1],
				y = $("#tab_"+x+" .row");

			if(y.is(':empty')) {
				ct.hide();
				y.hide();
			}
		});
	}

// CREATE THUMBNAIL
	function createThumbnail(categoryTab,label_category,label_en,label_cn,url_pn,url_trial,gameCover,row,desktopID,providerNAME,mobileID,otherID,isTOP){

		var isHidden;
		if(providerNAME=="yoplay"){
			isHidden = "do-not-show";
		}

		var newGamelink,linkID;
		if(defaultLoad=="isoftbet"){
			if(otherID!=""){
					linkID = otherID;
			}else{
				if(mobileMODE){
					linkID = mobileID;
				}else{
					linkID = desktopID;
				}
			}
			newGamelink =  checkGameURL("real",defaultLoad.toLowerCase(),linkID,label_category,otherID,0);
		}else{
			linkID = desktopID;
		}

		if(providerNAME=="spadegame"){
			desktopID = convertSGPath(desktopID);
		}

		if((desktopID=="VideoPoker")||(desktopID=="GenericSlots")){
			desktopID = label_en;
		}

		var tgame = "";
		if(isTOP=='Y'){
			tgame = "top-games";
		}
		var tmp = '<div class="col s3 center-align grid-item_ '+tgame+' '+label_category.toLowerCase()+'-games" data-aos="fade-up" data-aos-offset="-300" data-aos-once="true" data-aos-delay="50" data-aos-anchor-placement="top-center">'+
			          '<div class="c-anim"><div class="game-img"><img class="responsive-img game-img-inset" id="thumb_'+row+'" src="'+gameCover+'"></div>'+
			          '<div class="slot-name">'+label_cn+'</div>'+
			          '<div class="slot-btn fadeInUp wow" data-wow-delay="0.1s">'+
			            '<a href="'+url_pn+'" class="play-btn btn waves-effect waves-light">立即游戏</a>'+
//			            '<a href="'+url_trial+'" class="demo-btn btn waves-effect waves-light">Demo</a>'+
			          '</div></div>'+
			      '</div>';

		var tmp_list = '<a href="'+url_pn+'">'+label_en+'</a>';

		try{

			$(tmp).appendTo(".game-grid").show('slow');

			if(isTOP=="Y")
				$(".top-list-games").append(tmp_list);

			$("#thumb_"+row).bind("error",function(){
				console.log("CODE:"+linkID+",game-title-CN:"+label_cn+",game-title-EN:"+label_en);
				// $("#thumb_"+row).parent().parent().parent().remove();
				// $("#thumb_"+row).attr("src","/includes/images/games/maintenance.jpg");
			});
		
			list_games_cn.push(label_cn);
			list_games_en.push(label_en);
		}catch(err){

		}

	}

// convert SG path
	function convertSGPath(sg){
		var new_x = sg.replace(/-/g,"_");
		return new_x;
	}

// CONVERT GENRE LABEL TO CHINESE
	function convertCN(gameLABEL){
		var filter_LIVE = [],
			filter_SLOTS = ["SLOTS","SLOT","MINI_GAMES","MINI","Slot games","Slot_games"],
			filter_CARD = ["TABLE","CARD","CARD_GAMES","Table Games","Table","TABLE_GAMES","Table and Card Games","SCRATCH_GAMES","SCRATCH_CARDS","OTHER","OTHERS","OTHER_GAMES","Others","SCRATCH CARD","Scratch Cards","KENO","lottery","Lottery","Keno","KENO"],
			filter_TABLE = ["LOTTERY","ARCADE","Arcade Games","POKER","VIDEO_POKER","VIDEO POKER","FISHING","LIVE","Live Games","Live Dealer","Live Game","GAMBLE"],
			filter_ARCADE = [],
			filter_CASINO = ["CASINO","Casino game"],
			filter_OTHERS = ["-","???","0","101","102","103","104","105","106","107","108","109","??? SSC","11?5 11x5","?? K3","???? KLSF","??? Table"];

		if($.inArray(gameLABEL,filter_LIVE)>=0){
			return "真人游戏";
		}else if($.inArray(gameLABEL,filter_SLOTS)>=0){
			return "老虎机";
		}else if($.inArray(gameLABEL,filter_CARD)>=0){
			return "电子纸牌";
		}else if($.inArray(gameLABEL,filter_TABLE)>=0){
			return "电子扑克";
		}else if($.inArray(gameLABEL,filter_ARCADE)>=0){
			return "街机游戏";
		}else if($.inArray(gameLABEL,filter_CASINO)>=0){
			return "电子扑克";
		}else if($.inArray(gameLABEL,filter_OTHERS)>=0){
			return "综合游戏";
		}
	}

// REQUEST GATEWAY PATH
	function gatewayPATH(gameLABEL){
		if((gameLABEL=="pragmaticplay")||(gameLABEL=="pragmatic"))
			return "pragmatic";
		else if(gameLABEL=="dreamtech")
			return "dt";
		else if(gameLABEL=="golddeluxe")
			return "gd";
		else if(gameLABEL=="spadegame")
			return "spadegaming";
		else if((gameLABEL=="cq9")||(gameLABEL=="playngo")||(gameLABEL=="isoftbet")||(gameLABEL=="playtech")||(gameLABEL=="yoplay")||(gameLABEL=="ttg")||(gameLABEL=="microgaming")||(gameLABEL=="habanero")||(gameLABEL=="jumbo"))
			return gameLABEL.toLowerCase();
	}

// CHECK GAME URL
	function checkGameURL(type,gID,gCODE,gTYPE,gAID,xAID){
		if(type=="real"){
			if(gID=="playtech")
				return  "/iframe_module/goto_ptgame/default/"+gCODE+"/real";
				// return  "/iframe_module/goto_t1games/1002/"+gCODE+"/real";
			else if(gID=="yoplay")
				return  "/iframe_module/goto_agingame/default/"+gCODE;
			else if(gID=="microgaming")
				return  "/iframe_module/goto_mggame/2/"+gCODE+"/true/real/zh";
				// return  "/iframe_module/goto_t1games/1008/"+gCODE+"/fun";
			else if(gID=="playngo")
				return  "/iframe_module/goto_t1games/1010/"+gCODE+"/real";
			else if(gID=="spadegame")
				return  "/iframe_module/goto_t1games/1015/"+gCODE+"/real";
			else if(gID=="habanero")
				return  "/iframe_module/goto_t1games/1016/"+gCODE+"/real";
			else if(gID=="jumbo")
				return  "/iframe_module/goto_t1games/1018/"+gCODE+"/slots";
			else if(gID=="isoftbet")
				return  "/iframe_module/goto_t1games/1020/"+gCODE+"/real";
			else if(gID=="uc8")
				return  "/iframe_module/goto_t1games/1022/"+gCODE+"/real";
			else if(gID=="pragmatic")
				return  "/iframe_module/goto_t1games/1011/"+gCODE+"/real";
			else if(gID=="ttg")
				return  "/iframe_module/goto_ttggame/"+gAID+"/"+gCODE+"/0/real/";
				// return  "/iframe_module/goto_t1games/1012/"+gCODE+"/real/slots/"+gAID;
		}else if(type=="demo"){
			if(gID=="playtech")
				return  "/iframe_module/goto_ptgame/default/"+gCODE+"/trial";
				// return  "/iframe_module/goto_t1games/1002/"+gCODE+"/trial";
			else if(gID=="yoplay")
				return  "/iframe_module/goto_agingame/default/"+gCODE;
			else if(gID=="microgaming")
				return  "/iframe_module/goto_mggame/2/"+gCODE+"/true/real/zh";
				// return  "/iframe_module/ggoto_t1games/1008/"+gCODE+"/fun;
			else if(gID=="playngo")
				return  "/iframe_module/goto_t1games/1008/"+gCODE+"/fun";
			else if(gID=="spadegame")
				return  "/iframe_module/goto_t1games/1010/"+gCODE+"/fun";
			else if(gID=="habanero")
				return  "/iframe_module/goto_t1games/1016/"+gCODE+"/fun";
			else if(gID=="jumbo")
				return  "/iframe_module/goto_t1games/1018/"+gCODE+"/slots";
			else if(gID=="isoftbet")
				return  "/iframe_module/goto_t1games/1020/"+gCODE+"/fun";
			else if(gID=="uc8")
				return  "/iframe_module/goto_t1games/1022/"+gCODE+"/fun";
			else if(gID=="pragmatic")
				return  "/iframe_module/goto_t1games/1011/"+gCODE+"/fun";
			else if(gID=="ttg")
				return  "/iframe_module/goto_ttggame/"+gAID+"/"+gCODE+"/0/fun/";
				// return  "/iframe_module/goto_t1games/1012/"+gCODE+"/fun/slots/"+gAID;
		}
	}

});




