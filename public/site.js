(function(){
'use strict';
var $=function(s){return document.querySelector(s);};
var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
/* headline decode */
(function(){var el=$('#h1t'),cur=document.querySelector('h1 .cur'),fin=el.textContent,pool='#%&*+=-:/<>[]{}\u00b7',D=1100,t0=null;
 if(reduce){cur.classList.add('idle');return;}el.textContent='';
 function eo(x){return 1-Math.pow(1-x,3);}
 function f(now){if(t0===null)t0=now;var p=Math.min(1,(now-t0)/D),n=Math.floor(fin.length*eo(p)),o='';
  for(var k=0;k<fin.length;k++){var ch=fin[k];o+=(k<n||ch===' '||ch==='.')?ch:pool[Math.floor(Math.random()*pool.length)];}
  el.textContent=o;if(p<1)requestAnimationFrame(f);else{el.textContent=fin;cur.classList.add('idle');}}
 requestAnimationFrame(f);})();

/* Tess: the mark blinks; the ascii field ripples */
(function(){
 var OPEN='M19 18h5a3 3 0 0 1 3 3v8l-1.6 9.2a1.7 1.7 0 0 1-1.7 1.8h-4.4a1.7 1.7 0 0 1-1.7-1.8L16 29v-8a3 3 0 0 1 3-3z',SHUT='M18 27h7a2 2 0 0 1 0 4h-7a2 2 0 0 1 0-4z';
 var eyes=$('#eyes'),teyes=$('#teyes'),tbar=$('#tbar'),field=$('#field'),status=$('#status');
 var t0=performance.now(),blinkAt=1.6,blink=-1,lookAt=0,dx=0,msgAt=0,mi=0;
 var msgs=['building','laying tiles','compiling layouts','polishing the glass','wiring the shell','checking contrast'];
 var W=Math.ceil(innerWidth/22)+2,H=Math.ceil(innerHeight/28)+2;
 function frame(now){var t=reduce?1:(now-t0)/1000;
  if(!reduce){if(t>blinkAt){blink=t;blinkAt=t+2+Math.random()*2.6;}if(t>lookAt){dx=[0,-3,3,0][Math.floor(Math.random()*4)];lookAt=t+1.5+Math.random()*4;}if(t>msgAt){status.textContent=msgs[mi%msgs.length];mi++;msgAt=t+3.4;}}
  var shut=blink>=0&&t-blink<0.09;[eyes,teyes].forEach(function(g){g.classList.toggle('shut',shut);g.style.transform='translate('+dx+'px,0) scaleY('+(shut?0.08:1)+')';});tbar.setAttribute('width',String(32*((t*0.09+mi*0.41)%1)));
  var out='';for(var y=0;y<H;y++){var row='';for(var x=0;x<W;x++){var h=((x*73856093)^(y*19349663))>>>0;var ph=(h%997)/997*6.28,sp=0.4+(h%7)*0.12;var v=Math.sin(t*sp+ph);row+=(v>0.997?'<i>\u2022</i>':(v>0.955?'<b>\u2022</b>':'\u00b7'));}out+=row+'\n';}
  field.innerHTML='<span>'+out+'</span>';if(!reduce&&!document.hidden)requestAnimationFrame(frame);}
 requestAnimationFrame(frame);document.addEventListener('visibilitychange',function(){if(!document.hidden&&!reduce)requestAnimationFrame(frame);});
})();
})();
