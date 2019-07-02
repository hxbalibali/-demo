/*
food
宽，高，颜色，横纵坐标
*/
//自调用函数
(function () {
	var elements = [];//用来保存每个小方块食物

	//构造函数
	function Food(x, y, width, height, color){
		this.x = x || 0;
		this.y = y || 0;
		this.width = width || 20;
		this.height = height || 20;
		this.color = color || "green";
	}

	//为原型添加初始化的方法（作用：在页面上显示这个食物）
	Food.prototype.init = function(map){
		remove();
		//创建div
		var div = document.createElement("div");
		//div加到map中
		map.appendChild(div);
		//设置div的样式
		div.style.width = this.width + "px";
		div.style.height = this.height + "px";
		div.style.backgroundColor = this.color;
		div.style.position ="absolute";
		//横纵坐标---随机产生
		this.x = parseInt(Math.random() * (map.offsetWidth/this.width)) * this.width;
		this.y = parseInt(Math.random() * (map.offsetHeight/this.height)) * this.height;
		div.style.left = this.x + "px";
		div.style.top = this.y + "px";
		//把div加入到数组elements中，以便后期吃掉删除
		elements.push(div);
	};

	//私有函数
	function remove(){
		for(var i = 0; i < elements.length; i++){
			//从地图上删除
			var ele = elements[i];
			ele.parentNode.removeChild(ele);
			//从数组上删除
			elements.splice(i, 1);
		}
	}



	//把Food暴露给window，外部可以调用
	window.Food = Food;
}());
