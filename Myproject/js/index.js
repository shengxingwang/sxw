$(function(){
	//导航栏
var navEffect = function(){
	$(".nav-sj,.sj-box").mouseover(function(){
		$(".nav-sj").css("background","#ff6a00");
		$(".nav-sj>a").css("color","#fff");
		$(".sj-box").css("display","block").stop().animate({height:250},400);
	});
	$(".nav-sj,.sj-box").mouseout(function(){
		$(".nav-sj").css("background","");
		$(".nav-sj>a").css("color","#000");
		$(".sj-box").stop().animate({height:0},400,function(){
			$(".sj-box").css("display","none");
		});
	});
	//轮播图
	var $picw = $(".pic-item").width();
	var $piclength =  $(".pic-item").length;
	var current = $piclength/2;
	$(".pic-list").css("width",$picw*$piclength);
	$(".pic-list").css("left",-$picw*current);
	var timer = setInterval(function(){
		current++;
		logic();
		
	},4000);
	$(".btn,.dot").mouseover(function(){
		clearInterval(timer);
	});
	$(".btn,.dot").mouseout(function(){
		clearInterval(timer);
		timer = setInterval(function(){
			current++;
			logic();
		},4000);
	});
	
	//圆点控制按钮
	$(".dot").mouseover(function(){
		var $index = $(this).index();
		if($index==0){
			current = $piclength/2;
		}else{
			current = $index;
		}
		$(".dot").attr("class","dot");
		$(this).attr("class","dot active");
		$(".pic-list").css("left",-$picw*current);
	});
	var flag = true;
	$(".left-btn").click(function(){
		if(flag){
			flag = false;
			current--;
			logic();	
		}
	});
	$(".right-btn").click(function(){
		if(flag){
			flag = false;
			current++;
			logic();	
		}
	});
	function logic(){
		if(current==$piclength-2){
			$(".pic-list").animate({left:-$picw*current},600,function(){
			current=3;
			$(".pic-list").css("left",-$picw*current);
			flag = true;
			});
		}else if(current==1){
			$(".pic-list").animate({left:-$picw*current},600,function(){
				current=$piclength/2+1;
			$(".pic-list").css("left",-$picw*current);
			flag = true;
			});	
		}else{
			$(".pic-list").animate({left:-$picw*current},600,function(){
				flag = true;
			});
		}
		$(".dot").attr("class","dot");
		$(".dot").eq(current%5).attr("class","dot active");
	}
}
navEffect();
//产品移入效果
var prodHover = function(){
	$(".hover-item").mouseover(function(){
		$(".hover-item").removeClass("active");
		$(this).attr("class","hover-item active");
		var $index = $(this).index();
		if($index==0){
			$(".hover-item:eq(0)").stop().animate({right:528},200);
		}else{
			$(".hover-item:eq(0)").stop().animate({right:841},200);
		}
		if($index==1||$index==0){
			$(".hover-item:eq(1)").stop().animate({right:352},200);
		}
		if($index==2||$index==3){
			$(".hover-item:eq(1)").stop().animate({right:665},200);
		}
		if($index==3){
			$(".hover-item:eq(2)").stop().animate({right:489},200);
		}else{
			$(".hover-item:eq(2)").stop().animate({right:176},200);
		}
	});
}
prodHover();

//tab切换
var tabEffect = function(){
	//.moblie-box下tab切换
	$(".moblie-box .tit").mouseover(function(){
		$(".moblie-box .moveline").css("width",$(this).width()).animate({left:$(this).offset().left-38},100);
		$(".itme").css("display","none");
		$(".phone").css("display","block");
	});
	$(".moblie-box .tab-item").mouseover(function(){
		$(".moblie-box .moveline").css("width",$(this).width()).animate({left:$(this).offset().left-38},100);
			$(".phone").css("display","none");
			$(".itme").css("display","none");
			$(".itme").eq($(this).index()).css("display","block");
	});
	//.match-box下tab切换
	$(".match .tit").mouseover(function(){
		$(".match .moveline").css("width",$(this).width()).animate({left:$(this).offset().left-38},100);
		$(".tabitem").css("display","none");
		$(".matchtab").css("display","block");
	});
	$(".match .tab-item").mouseover(function(){
		$(".match .moveline").css("width",$(this).width()).animate({left:$(this).offset().left-38},100);
			$(".matchtab").css("display","none");
			$(".tabitem").css("display","none");
			$(".tabitem").eq($(this).index()).css("display","block");
	});
	
	$(".ph").css("height","275").css("z-index","1");
	$(".ph").mouseover(function(){
		$(".ph").css("height","275").css("z-index","1");
		$(this).css("z-index","2").stop().animate({height:360},300);
	});
	$(".ph").mouseout(function(){
		$(this).stop().animate({height:275},400,function(){
			$(this).css("z-index","1");
		});
	});
}	
	

//首页tab数据获取
var tabGetData = function(){
	$.get("data/index-phone.json",function(data){
		for(var i = 0;i<data.length;i++){
			var html="";
			if(i==0){
				$.each(data[i],function(x,o) {
					if(x==0){
						html+="<div class=\"main-phone ph-itemr\">"+
								"<a href=\"javascript:;\">"+
									"<img data-original=\""+o.imgSrc+"\" />"+
								"</a>"+
							"</div>";
					}else{
						html+="<div class=\"phone"+(x+1)+" ph\">"+
								"<a href=\"javascript:;\">"+
									"<img data-original=\""+o.imgSrc+"\"/>"+
								"</a>"+
							"</div>";
					}
				});
				$(".phone-box").html(html);
				//console.log($(".phone-box").html());
			}else{
				$.each(data[i],function(x,o) {
					html+="<div class=\"match"+(x+1)+" ph\">"+
							"<a href=\"javascript:;\">"+
								"<img data-original=\""+o.imgSrc+"\" />"+
							"</a>"+
						"</div>";
				});
				$(".match-prod").html(html);
				//console.log(html);
			}
			//console.log(html);
		}
		
		$(".phone-box img").lazyload({
				effect:"fadeIn",
				placeholder:"img/loading.gif"
		});
		$(".match-prod img").lazyload({
			effect:"fadeIn",
			placeholder:"img/loading.gif"
		});
	tabEffect();
	});
}
tabGetData();
//获取首页子tab数据
var tabChildData = function(){
	$.get("data/index-tab.json",function(data){
		var html = "";
		for(var i = 0;i<data.length;i++){
			//console.log(1);
			html+="<div class=\"content itme\" style=\"display: none;\">"+
						"<ul class=\"item-list\">";
			$.each(data[i],function(x,o) {
				html+="<li>"+
						"<a href=\"javascript:;\">"+
							"<img data-original=\""+o.imgSrc+"\" alt=\"\" />"+
							"<h4 class=\"tit\">"+o.tit+"</h4>"+
							"<p class=\"desc\">"+o.desc+"</p>"+
							"<p class=\"price\">&yen;<span>"+o.price+"</span></p>"+
						"</a>"+
					"</li>";
			});
			html+="</ul>"+
					"<div class=\"more-box\">"+
						"<a class=\"more\" href=\"javascript:;\"></a>"+
					"</div>"+
				"</div>";
		}
		$(".phone-rtab").html(html);
		$(".phone-rtab img").lazyload({
				effect:"fadeIn",
				threshold:20,
				placeholder:"img/loading.gif"
		});
		tabEffect();
	});
	
	
	$.get("data/index-match.json",function(data){
		var html = "";
		for(var i = 0;i<data.length;i++){
			//console.log(1);
			html+="<div class=\"content tabitem\" style=\"display: none;\">"+
						"<ul class=\"item-list\">";
			$.each(data[i],function(x,o) {
				html+="<li>"+
						"<a href=\"javascript:;\">"+
							"<img data-original=\""+o.imgSrc+"\" alt=\"\" />"+
							"<h4 class=\"tit\">"+o.tit+"</h4>"+
							"<p class=\"desc\">"+o.desc+"</p>"+
							"<p class=\"price\">&yen;<span>"+o.price+"</span></p>"+
						"</a>"+
					"</li>";
			});
			html+="</ul>"+
					"<div class=\"more-box\">"+
						"<a class=\"more\" href=\javascript:;\"></a>"+
					"</div>"+
				"</div>";
		}
		$(".match-rtab").html(html);
		$(".match-rtab img").lazyload({
				effect:"fadeIn",
				threshold:20,
				placeholder:"img/loading.gif"
		});
		tabEffect();
	});
}
tabChildData();

});