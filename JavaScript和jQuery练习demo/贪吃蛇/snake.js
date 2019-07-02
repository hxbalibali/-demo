//snake
(function(){
	var elements=[];//存放小蛇的每个身体部分
	//小蛇的构造函数
	function Snake(width, height, direction){
		//小蛇的每个部分的宽高
		this.width = width || 20;
		this.height = height || 20;
		//小蛇的身体
		this.body = [
			{x:3, y:2, color:"red"},
			{x:2, y:2, color:"orange"},
			{x:1, y:2, color:"orange"}
		];
		//方向
		this.direction = direction || "right";
	}

	//小蛇初始化函数
	Snake.prototype.init = function(map){
		//创建小蛇
		for (var i = 0; i < this.body.length; i++) {
			var obj = this.body[i];
			var div = document.createElement("div");
			//放进地图
			map.appendChild(div);
			div.style.position = "absolute";
			div.style.width = this.width + "px";
			div.style.height = this.height + "px";
			div.style.left = obj.x * this.width + "px";
			div.style.top = obj.y * this.height + "px";
			div.style.backgroundColor = obj.color;

			//加入数组，方便今后删除
			elements.push(div);
		}		
	};

	//让小蛇动起来
	Snake.prototype.move = function(food, map){
		//两部分：身体+头
		//身体
		var i = this.body.length - 1;
		for(; i > 0; i--){
			this.body[i].x = this.body[i-1].x;
			this.body[i].y = this.body[i-1].y;
		}

		//头，根据运动方向来
		switch (this.direction){
			case "right":
				this.body[0].x += 1;
				break;
			case "left":
				this.body[0].x -= 1;
				break;
			case "top":
				this.body[0].y -= 1;
				break;
			case "bottom":
				this.body[0].y += 1;
				break;
		}
	};

	

	//把小蛇暴露给window，外部可以访问
	window.Snake = Snake;
}());