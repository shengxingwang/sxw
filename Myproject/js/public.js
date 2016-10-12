$(function(){
	//购物车
	$(".cart-content").mouseover(function(){
		$(this).attr("class","cart-content shop-hover");
		$(".cart-box").stop().css("display","inline").slideDown(400);
	});
	$(".cart-content").mouseout(function(){
		$(this).attr("class","cart-content");
		$(".cart-box").stop().slideUp(400,function(){
			$(".cart-box").css("display","none");
		});
	});
	
		//底部版权事件
	var bomEffect = function(){
		$(".link-company").mouseover(function(){
			$(".more-link").css("display","block");
			$(".link-list").css("background","#474747");
			$(".link-list>p>i").css("border-top-color","#fff")
			.css("transform","rotateX(180deg)");
		});
		$(".link-company").mouseout(function(){
			$(".more-link").css("display","none");
			$(".link-list").css("background","");
			$(".link-list>p>i").css("transform","");
			$(".link-list>p>i").css("border-top-color","#999");
		});
		$(".lang-box").hover(function(){
			$(".lang-list>li:eq(0)").css("display","block");
		},function(){
			$(".lang-list>li:eq(0)").css("display","none");
		})
	}
	bomEffect();
	//侧边服务栏事件
	var sideEffect = function(){
		$(".back-top").click(function(){
			$(window).scrollTop(0);
		});
	}
	sideEffect();
});
