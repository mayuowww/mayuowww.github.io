// JavaScript Document
$(function() {
  // スクロールのオフセット値
  var offsetY = -10;
  // スクロールにかかる時間
  var time = 500;

  // ページ内リンクのみを取得
  $('a[href^=#]').click(function() {
    // 移動先となる要素を取得
    var target = $(this.hash);
    if (!target.length) return ;
    // 移動先となる値
    var targetY = target.offset().top+offsetY;
    // スクロールアニメーション
    $('html,body').animate({scrollTop: targetY}, time, 'swing');
    // ハッシュ書き換えとく
    window.history.pushState(null, null, this.hash);
    // デフォルトの処理はキャンセル
    return false;
  });
});


$(function () {
$('#toggle').click(function() {
   $(this).toggleClass('active');
   $('#overlay').toggleClass('open');
  });
	$("#overlay").click(function() {
		$('#overlay').toggleClass('open');
		$('#toggle').toggleClass('active');
	});
      $('.overlay ul li a').on('click', function () {
        $('#overlay').toggleClass('open');
    $('#toggle').toggleClass('active');
    });
  });



/*title shows up*/
$('head').append(
'<style type="text/css">#animation {display:none;}'
);
$(window).load(function() {
$('#animation').delay(600).fadeIn(3000);
});


// ページをロードしたりウィンドウのリサイズするたびに実行
$(function () {
    sizing();
    Draw();
    $(window).resize(function() {
        sizing();
        Draw();
    });
});
// div#wrapperからcanvas#cnvsのサイズをもらう（#wrapperのサイズはCSSで）
function sizing(){
    $('#canvas').attr({height:$('#wrapper').height()});
    $('#canvas').attr({width:$('#wrapper').width()});
};





//背景　canvas//

//グローバル関数
var center = {x: 0, y: 0};
var circleRadius = 50;
var holeRadius = 10;
var particlesNum = 400;

var width;
var height;

var ctx;

var particles = []

var isMouseDown = false;
var tmp;

//初期処理
window.onload = function(){
    var canvas = document.getElementById("canvas");
    
    //画面調整
    canvas.width = width = window.innerWidth;
    canvas.height = height = window.innerWidth;
    
    center.x = width / 2;
    center.y = height / 2;
    
    ctx = canvas.getContext("2d");
    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.fillRect(0, 0, width, height);
    
    //マウス操作処理
    canvas.addEventListener("mousedown", mouseDown, false);
    
    //particleの作成
    for(var i = 0; i < particlesNum; i++){
        particles.push(new Particle());
    }
     
    //アニメーション
    setInterval(loop, 1000 / 50);
}

//mouseDown関数
function mouseDown(){
    isMouseDown = !isMouseDown;
}

//loop関数
function loop(){
    ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
    ctx.fillRect(0, 0, width, height);
    
    for(var i = 0; i < particles.length; i++){
        var particle = particles[i];
        particle.update();
        particle.draw();
    }
}

//Particleクラス
var Particle = (function(){
    function Particle(){
        this.generate();
    }
    
    Particle.prototype.generate = function(fadeBack){
        this.angle = 2 * Math.random() * Math.PI;
        tmp = Math.random() * 20;
        
        if(!isMouseDown){
        	this.radius = (Math.random() * 5) + 1;
            this.x = center.x + circleRadius * Math.cos(this.angle);
        	this.y = center.y + circleRadius * Math.sin(this.angle);
        }        
        else if(isMouseDown){
            this.radius = (Math.random() * 3) + 3;
            this.opacity = 1.0;
            this.x = center.x + 30 * Math.cos(this.angle);
        	this.y = center.y + 30 * Math.sin(this.angle);
        }
               
        this.xSpeed = tmp * Math.cos(this.angle);
        this.ySpeed = tmp * Math.sin(this.angle);
        
        //条件分岐
        if(!isMouseDown){
        	this.xAccel = 10;
        	this.yAccel = 10;
        }
        else if(isMouseDown){
            this.xAccel = -Math.cos(this.angle);
            this.yAccel = -Math.sin(this.angle);
        }
        
        this.color = "rgba(" + Math.floor(Math.random() * 255) + "," +
            								Math.floor(Math.random() * 255) + "," +
											Math.floor(Math.random() * 255) + "," +
                                            this.radius / 6 + ")";
    }
    
    Particle.prototype.update = function(){
        this.x += this.xSpeed;
        this.y += this.ySpeed;
        
        if(isMouseDown){
            this.xSpeed += this.xAccel;
            this.ySpeed += this.yAccel;
        }
        
        if(this.check()){
            this.generate();
        }
    }
    
    Particle.prototype.check = function(){
        if(this.x < 0 || this.x > width){
            this.generate();
        }
        else if(this.y < 0 || this.y > height){
            this.generate();
        }
 
        if(isMouseDown){
            var distance = ((tmp = (center.x - this.x)) * tmp) + 
                					((tmp = (center.y - this.y)) * tmp * 20);
            this.opacity = 10000 / distance;
        	if (1 < this.opacity) {
            	this.opacity = 1
        	}
        	this.opacity = 1 - this.opacity;

        	if (distance < holeRadius * holeRadius) {
            	return true;
        	}
            else {
            	return false;
        	}
        }
    }
    
    Particle.prototype.draw = function(){
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fill();
    }
              
    return Particle;
})();



//




