$(function(){
	var selectEffect = function(){
		var flag = true;
		$(".check-box").click(function(e){
			var $target = $(e.target);
			if($target.attr("class")=="tbg"){
				if(flag){
					flag = false;
					$target.css("background","url(img/shop.png) no-repeat 0 -134px");
					$target.parent().prevAll().children(".tbg-all").css("background","url(img/shop.png) no-repeat 0 -148px");
				}else{
					flag = true;
					$target.css("background","url(img/shop.png) no-repeat 0 -148px");
				}
			}
		});
		$(".tbg-all").click(function(e){
			var $target = $(e.target);
			$target.parent().nextAll().children(".tbg").css("background","url(img/shop.png) no-repeat 0 -148px");
			$target.css("background","url(img/shop.png) no-repeat 0 -134px");
		});
	}
	selectEffect();
	//产品列表效果
	function goodEffect(){
		$(".mob-item").hover(function(){
		$(this).children(".mask").css("display","block").stop().animate({height:111},200);
		},function(){
			$(this).children(".mask").stop().animate({height:0},200,function(){
				$(this).children(".mask").css("display","none")
			});
		});
		var $curr = 0;
		var pageClick =function(){
			console.log($curr);
			if($curr>0){
				$(".first-page,.prev-page").css("display","inline-block");
			}
			if($curr==0){
				$(".first-page,.prev-page").css("display","none");
			}
			if($curr>=2){
				$curr=2;
				$(".last-page,.next-page").css("display","none");
			}
			if($curr<2){
				$(".last-page,.next-page").css("display","inline-block");
			}
			$(".num").removeClass("cur-page");
			$(".num").eq($curr).addClass("cur-page");
			$(".mobile-list").removeClass("active");
			$(".mobile-list").eq($curr).addClass("active");
		}
		$(".num").click(function(){
			$curr = $(this).index()-2;
			pageClick();
		});
		$(".first-page").click(function(){
			$curr=0;
			pageClick();
		});
		$(".prev-page").click(function(){
			$curr--;
			pageClick();
		});
		$(".last-page").click(function(){
			$curr=2;
			pageClick();
		});
		$(".next-page").click(function(){
			$curr++;
			pageClick();
		});
	}
	var addCart = function(){
		$(".mobile-list").click(function(e){
			var $targrt = $(e.target);
			if($targrt.attr("class")=="to-cart"){
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
	}
	var trunClick = function(){
		$(".mob-item").click(function(e){
			var $target = $(e.target)
			if($target.attr("class")=="turn"){
				var $id = $target.attr("pid");
				location.href="shopdesc.html?id="+$id;
			}
			
		});
	}
	
	var goodList = function(){
		$.get("data/goodlist.json",function(data){
			var html="";
			for(var i = 0; i<data.length;i++){
				if(i==0){
					html+= "<ul class=\"mobile-list clr active\">";
				}else{
					 html+= "<ul class=\"mobile-list clr\">";
				}
				$.each(data[i], function(x,o) {
					html+="<li class=\"mob-item\">"+
						"<a class=\"uimg\" href=\"javascript:void(0);\">"+
							"<img pid=\"00"+(i+1)+(x+1)+"\" class=\"turn\" data-original=\""+o.imgSrc+"\" />"+
						"</a>"+
						"<p class=\"mname\">"+o.name+"</p>"+
						"<p class=\"desc\">"+o.desc+"</p>"+
						"<p class=\"price\">&yen;<span>"+o.price+"</span></p>"+
						"<div class=\"mask\">"+
							"<p class=\"mask-desc\">"+o.mdesc+"</p>"+
							"<a pid=\"00"+(i+1)+(x+1)+"\" class=\""+o.btnClass+"\" href=\"javascript:void(0);\">"+o.btntxt+"</a>"+
						"</div>";
						if(o.icon){
							html+="<div class=\"icon\">"+
							"<img data-original=\""+o.icon+"\" />"+
							"</div>";
						}
						html+="</li>";
				});
				html+="</ul>";
				//console.log(html);
			}
			$(".mobile-box").html(html);
			
			$(".mobile-box>ul img").lazyload({
				effect:"fadeIn",
				placeholder:"img/loading.gif"
			});
			addCart();
			goodEffect();
			trunClick();
		});
	}
	goodList();
});