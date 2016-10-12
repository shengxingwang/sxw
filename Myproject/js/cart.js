$(function(){
	$(".share-txt").hover(function(){
		$(".share-more").css("display","block");
	},function(){
		$(".share-more").css("display","none")
	});
	
	//购物车操作
	var cartChange = function(){
		//添加
		$(".mycart-tab td").click(function(e){
			var $target = $(e.target);
			//console.log($target);
			if($target.attr("id")=="reduce"){
				logicCount($target,false);
			}else if($target.attr("id")=="add"){
				logicCount($target,true);
			}else if($target.attr("id")=="del"){
				var $id = $target.attr("pid");
				var $shopstr = $.cookie("shopcart");
				var result = strOper.del($shopstr,$id);
				$.cookie("shopcart",result);
				getCart();
			}
		})
		function logicCount(element,type){
			var count = type===true?1:-1;
			var $inp = type===true?element.prev():element.next();
			var $price = element.parent().parent().next().children().children(".small-totalep");
			var $p = element.parent().parent().prev().children().children(".pricenum");
			var $totalprice = $(".showprice").children("span");
			//console.log($p.html());
			//console.log($inp.val());
			if($inp.val()=="1"&&type===false){
				count = 0;
			}else{
				var $shopcart = $.cookie("shopcart");
				var $id = element.attr("pid");
				var result = strOper.counter($shopcart,$id,type);
				$.cookie("shopcart",result);
				$totalprice.html(parseInt($totalprice.html())+(parseInt($p.html())*count));
			}
			$inp.val(parseInt($inp.val())+count);
			$price.html(parseInt($inp.val())*parseInt($p.html()));
		}
		
	}
	
	var getCart = function(){
		var $shopcart = $.cookie("shopcart");
		if($shopcart!=undefined){
			$(".cart-empty").css("display","none");
			$(".byList").css("display","block");
			var json = strOper.get($shopcart);
			//console.log(json);
			var $totalprive= 0;
			var html = "<table class=\"mycart-tab\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">"+
						"<tbody>"+
							"<tr>"+
								"<th>商品</th>"+
								"<th>商品名称</th>"+
								"<th>单价</th>"+
								"<th>购买数量</th>"+
								"<th>小计</th>"+
								"<th>操作</th>"+
							"</tr>";
			$.each(json, function(i,o){
				$totalprive += (parseInt(o.price)*parseInt(o.count));
				html+="<tr>"+
						"<td class=\"img\">"+
							"<div class=\"td-img\">"+
								"<a href=\"javascript:;\">"+
								"<img src=\""+o.img+"\" />"+
								"</a>"+
							"</div>"+
						"</td>"+
						"<td class=\"name\">"+
							"<a href=\"javascript:;\">"+o.name+"</a>"+
						"</td>"+
						"<td>"+
							"<span class=\"price\">&yen;<span class=\"pricenum\">"+o.price+"</span></span>"+
						"</td>"+
						"<td>"+
							"<div class=\"count-num\">"+
								"<div pid=\""+o.id+"\" id=\"reduce\" class=\"cbtn reduce\"></div>"+
								"<input class=\"count\" value=\""+o.count+"\" type=\"text\"/>"+
								"<div pid=\""+o.id+"\" id=\"add\" class=\"cbtn add\"></div>"+
							"</div>"+
						"</td>"+
						"<td>"+
							"<span class=\"price\">&yen;<span class=\"small-totalep\">"+(parseInt(o.price)*parseInt(o.count))+"</span></span>"+
						"</td>"+
						"<td>"+
							"<a id=\"del\" pid=\""+o.id+"\" class=\"del\" href=\"javascript:;\">删除</a>"+
						"</td>"+
						"</tr>";
			});
			html+="</tbody>"+
				"</table>"+
			"<div class=\"pay-box\">"+
				"<div class=\"freetip\">"+
					"<span class=\"send\">运费</span>"+
					"<span class=\"loz\">◆</span>订单实际支付金额"+
					"<a href=\"shop.html\">满99元包邮</a>"+
				"</div>"+
				"<p class=\"total-priace\">总价:<span class=\"showprice\">&yen;<span>"+$totalprive+"</span></span>"+
				"</p>"+
				"<div class=\"op\">"+
					"<a class=\"topay\" href=\"javascript:;\">去结算</a>"+
					"<a class=\"continue\" href=\"shop.html\">&lt;&lt;继续购买</a>"+
				"</div>"+
			"</div>";
		$(".byList").html(html);
		}
		if($shopcart == "" ||$shopcart==undefined){
			$(".byList").css("display","none");
			$(".cart-empty").css("display","block");
		}
		cartChange();
	}
	getCart();
});
