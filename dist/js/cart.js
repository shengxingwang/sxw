$(function(){$(".share-txt").hover(function(){$(".share-more").css("display","block")},function(){$(".share-more").css("display","none")});var a=function(){function a(a,t){var s=t===!0?1:-1,e=t===!0?a.prev():a.next(),c=a.parent().parent().next().children().children(".small-totalep"),i=a.parent().parent().prev().children().children(".pricenum"),r=$(".showprice").children("span");if("1"==e.val()&&t===!1)s=0;else{var n=$.cookie("shopcart"),p=a.attr("pid"),d=strOper.counter(n,p,t);$.cookie("shopcart",d),r.html(parseInt(r.html())+parseInt(i.html())*s)}e.val(parseInt(e.val())+s),c.html(parseInt(e.val())*parseInt(i.html()))}$(".mycart-tab td").click(function(s){var e=$(s.target);if("reduce"==e.attr("id"))a(e,!1);else if("add"==e.attr("id"))a(e,!0);else if("del"==e.attr("id")){var c=e.attr("pid"),i=$.cookie("shopcart"),r=strOper.del(i,c);$.cookie("shopcart",r),t()}})},t=function(){var t=$.cookie("shopcart");if(void 0!=t){$(".cart-empty").css("display","none"),$(".byList").css("display","block");var s=strOper.get(t),e=0,c='<table class="mycart-tab" border="0" cellpadding="0" cellspacing="0"><tbody><tr><th>商品</th><th>商品名称</th><th>单价</th><th>购买数量</th><th>小计</th><th>操作</th></tr>';$.each(s,function(a,t){e+=parseInt(t.price)*parseInt(t.count),c+='<tr><td class="img"><div class="td-img"><a href="javascript:;"><img src="'+t.img+'" /></a></div></td><td class="name"><a href="javascript:;">'+t.name+'</a></td><td><span class="price">&yen;<span class="pricenum">'+t.price+'</span></span></td><td><div class="count-num"><div pid="'+t.id+'" id="reduce" class="cbtn reduce"></div><input class="count" value="'+t.count+'" type="text"/><div pid="'+t.id+'" id="add" class="cbtn add"></div></div></td><td><span class="price">&yen;<span class="small-totalep">'+parseInt(t.price)*parseInt(t.count)+'</span></span></td><td><a id="del" pid="'+t.id+'" class="del" href="javascript:;">删除</a></td></tr>'}),c+='</tbody></table><div class="pay-box"><div class="freetip"><span class="send">运费</span><span class="loz">◆</span>订单实际支付金额<a href="shop.html">满99元包邮</a></div><p class="total-priace">总价:<span class="showprice">&yen;<span>'+e+'</span></span></p><div class="op"><a class="topay" href="javascript:;">去结算</a><a class="continue" href="shop.html">&lt;&lt;继续购买</a></div></div>',$(".byList").html(c)}""!=t&&void 0!=t||($(".byList").css("display","none"),$(".cart-empty").css("display","block")),a()};t()});