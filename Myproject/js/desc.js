$(function(){
	var getHrefData = function(){
		var gurl = location.href;
		var gid = gurl.split("?")[1];
		console.log(gid);
	}
	getHrefData();
	
	$(".share-more,.share-txt").hover(function(){
		$(".share-more").css("display","block");
	},function(){
		$(".share-more").css("display","none")
	});
	$(".img-spn").click(function(e){
		$(".img-spn").removeClass("curr");
		$(this).addClass("curr");
	});
	$(".dis").click(function(e){
		$(".dis").removeClass("curr");
		$(this).addClass("curr");
	});
	//商品小图效果
	var smallEffect = function(){
		$(".img-item").mouseover(function(){
			$(".img-item").removeClass("active");
			$(this).addClass("active");
			$(".big-box").children("img").attr("src",$(this).children("img").attr("src"));
		});
	}
	smallEffect();
	
	/*var addCart = function(){
		$(".btn-box").click(function(e){
			var $targrt = $(e.target);
			if($targrt.attr("class")=="buy-btn"){
				var str = "";
				var $pid = $targrt.attr("pid");
				var $pImg = $targrt.parent().parent().children(".uimg").children("img").attr("src");
				var $pname = $targrt.parent().prev().prev().prev().html();
				var $price = $targrt.parent().prev().children("span").html();
				//console.log($pid+"#"+$pImg+"#"+$pname+"#"+$price);
				str += $pid+"#"+$pname+"#"+$pImg+"#"+$price+"#1";
				//console.log(str);
				var $shopStr = $.cookie("shopcart");
				if(!$shopStr){
					$.cookie("shopcart",str,{
						expires:7
					});
				}else{
					var result = strOper.add($shopStr,str);
					$.cookie("shopcart",result);
				}
				//console.log($.cookie("shopcart"));
			}
		});
	}*/
	//放大镜轮播图
	var bigImgEffect = function(){
		var $width = $(".lay-img").length*($(".lay-img>img").width()+14);
		$(".lay-list").css("width",$width);
		//点击放大图片按钮
		$(".view-btn").click(function(){
			$("#rever").css("display","block");
		});
		//图片浏览框退出按钮
		$(".lay-exit").click(function(){
			$("#rever").css("display","none");
		});
		
		//根据图片数量以及宽度判断是否显示左右按钮
		if($width<=800){
			$(".sbtn").css("display","none");
		}
		
		//console.log($(".lay-list").css("width"));
		var current = 0;
		$(".lay-img").click(function(){
			current = $(this).index();
			logic();
		});
		$(".btn-l").click(function(){
			current--;
			logic();
		});
		$(".btn-r").click(function(){
			current++;
			logic();
		});
		function logic(){
			if(current<=0){
				current=0;
				$(".btn-l").css("display","none");
			}else{
				$(".btn-l").css("display","block");
			}
			if(current>=$(".lay-img").length-1){
				current=$(".lay-img").length-1;
				$(".btn-r").css("display","none");
			}else{
				$(".btn-r").css("display","block");
			}
			$(".lay-img").removeClass("active");
			$(".lay-img").eq(current).addClass("active");
			$(".lay-box>img").attr("src",$(".lay-img>img").eq(current).attr("src"));
		}
		var flag = true;
		$(".sbtn").click(function(e){
			if(flag){
				flag = false;
				var speed;
				if($(this).attr("class")=="sbtn sbtn-left"){
					speed=-100;
					itag = -($width-800);
					$(".sbtn-right").css("display","block");
					clickLogic($(".sbtn-left"),speed,itag);
				}
				if($(this).attr("class")=="sbtn sbtn-right"){
					speed=+100;
					itag = 0;
					$(".sbtn-left").css("display","block");
					clickLogic($(".sbtn-right"),speed,itag);
				}
			}
		});
		function clickLogic(element,speed,itag){
			var $left = $(".lay-list").position().left;
			if($left==itag){
				element.css("display","none");
				$(".lay-list").css("left",itag);
				flag=true;
			}else{
				$(".lay-list").stop().animate({left:$left+speed},200,function(){
					flag=true;
				});
			}
		}
	}
	bigImgEffect();
	//商品详情列表
	var tabEffect = function(){
		$(window).scroll( function(){
			if($(window).scrollTop()>$(".vi-box").position().top){
				$(".vi-box").css({
					"position":"fixed",
					"z-index":200
				});
			}
			if($(window).scrollTop()<$(".vi-tab").position().top){
				$(".vi-box").css({
					"position":"relative",
					"top":0,
					"z-index":0
				});
			}
		});
		
		
		//$(".tab-bd:eq(0)")
		//商品详情图片懒加载
		$.get("data/desctab1.json",function(data){
			var html="";
			$.each(data, function(i,o){
				html+="<img data-original=\""+o.imgSrc+"\" style=\"width:"+o.width+"px;height:"+o.height+"px;\" />";
			});
			$(".tab-bd:eq(0)>p").html(html);
			$(".tab-bd:eq(0)>p img").lazyload({
				effect:"fadeIn",
				threshold:100,
				placeholder:"img/loading.gif"
		});
		});
		
		$(".itemlist").mouseover(function(){
			$(".itemlist").removeClass("active");
			$(this).addClass("active");
			$(".tab-bd").css("display","none");
			$(".tab-bd").eq($(this).index()).css("display","block");
		});
	}
	//addCart();
	tabEffect();
});