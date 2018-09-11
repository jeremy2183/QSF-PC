//<div class="LiveClock"><div class="LiveClockInner"></div></div>
function DigitalTime() 
{ 
    var deadline= new Date("06/14/2018 23:00"); //开幕倒计时 
    var now = new Date() ;
    var leave = (deadline.getTime() - now.getTime()) ;
	
	
    var day = Math.floor(leave / (1000 * 60 * 60 * 24));
	var dayOne = parseInt(day / 10);
	var dayTwo = day%10;
	
    var hour = Math.floor(leave / (1000 * 3600)) - (day * 24);
	var hourOne = parseInt(hour / 10);
	var hourTwo = hour%10;
	
	var minute = Math.floor(leave / (1000 * 60)) - (day * 24 * 60) - (hour * 60);
	var minOne = parseInt(minute / 10);
	var minTwo = minute%10;
	
	var second = Math.floor(leave / (1000)) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
	var secOne = parseInt(second / 10);
	var secTwo = second%10;
	
	
     
    var LiveClock=document.querySelector('.LiveClockInner');
	
	var LiveClockD = document.querySelector('.timeDay');
	var LiveClockH = document.querySelector('.timeHour');
	var LiveClockM = document.querySelector('.timeMin');
	var LiveClockS = document.querySelector('.timeSec');
	
	
    day = day+1; 
 
    if (day>0) { 
        LiveClockD.innerHTML = '<span>' + dayOne + '</span><span>' + dayTwo + '</span><span>天</span>';
		LiveClockH.innerHTML = '<span>' + hourOne + '</span><span>' + hourTwo + '</span><span>时</span>';
		LiveClockM.innerHTML = '<span>' + minOne + '</span><span>' + minTwo + '</span><span>分</span>';
		LiveClockS.innerHTML = '<span>' + secOne + '</span><span>' + secTwo + '</span><span>秒</span>';
		
        setTimeout("DigitalTime()",1000) 
    } 
} 
DigitalTime()