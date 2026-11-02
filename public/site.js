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
  el.textContent=o;if(p<1)requestAnimationFrame(f);else{el.textContent=fin;cur.classList.add('idle');document.dispatchEvent(new Event('decoded'));}}
 requestAnimationFrame(f);})();

/* Tess: eyes follow the pointer, blink, react; the mark mirrors it */
(function(){
 var eyes=$('#eyes'),teyes=$('#teyes'),tbar=$('#tbar'),field=$('#field'),status=$('#status'),stage=document.querySelector('.stage');
 var t0=performance.now(),blinkAt=1.6,blink=-1,lookAt=0,gx=0,gy=0,px=null,py=null,msgAt=1.2,msgStart=0,mi=-1,wideAt=-9,touch=matchMedia('(hover:none)').matches;
 var msgs=['building','laying tiles','compiling layouts','polishing the glass','wiring the shell','checking contrast'];
 var DUR=3.6;
 if(!touch){addEventListener('pointermove',function(e){px=e.clientX;py=e.clientY;},{passive:true});addEventListener('pointerleave',function(){px=py=null;});}
 document.addEventListener('decoded',function(){wideAt=(performance.now()-t0)/1000;});
 function io(x){return x<.5?2*x*x:1-Math.pow(-2*x+2,2)/2;}
 var W=Math.ceil(innerWidth/22)+2,H=Math.ceil(innerHeight/28)+2;
 function frame(now){var t=reduce?1:(now-t0)/1000;
  if(!reduce){
   if(t>blinkAt){blink=t;blinkAt=t+2.2+Math.random()*2.8;}
   if(px!==null){var r=stage.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2;gx=Math.max(-4,Math.min(4,(px-cx)/innerWidth*14));gy=Math.max(-2.5,Math.min(2.5,(py-cy)/innerHeight*8));}
   else if(t>lookAt){gx=[0,-3,3,0][Math.floor(Math.random()*4)];gy=0;lookAt=t+1.5+Math.random()*4;}
   if(t>msgAt){mi++;status.textContent=msgs[mi%msgs.length];msgStart=t;msgAt=t+DUR;blink=t;}
  }
  var shut=blink>=0&&t-blink<0.08,wide=t-wideAt>=0&&t-wideAt<0.5;
  var sy=shut?0.08:(wide?1.14:1);
  [eyes,teyes].forEach(function(g){g.classList.toggle('shut',shut);g.classList.toggle('wide',wide&&!shut);g.style.transform='translate('+gx+'px,'+gy+'px) scaleY('+sy+')';});
  tbar.setAttribute('width',String(32*io(Math.min(1,(t-msgStart)/DUR))));
  var out='';for(var y=0;y<H;y++){var row='';for(var x=0;x<W;x++){var h=((x*73856093)^(y*19349663))>>>0;var ph=(h%997)/997*6.28,sp=0.4+(h%7)*0.12;var v=Math.sin(t*sp+ph);row+=(v>0.997?'<i>\u2022</i>':(v>0.955?'<b>\u2022</b>':'\u00b7'));}out+=row+'\n';}
  field.innerHTML='<span>'+out+'</span>';
  if(!reduce&&!document.hidden)requestAnimationFrame(frame);}
 requestAnimationFrame(frame);document.addEventListener('visibilitychange',function(){if(!document.hidden&&!reduce)requestAnimationFrame(frame);});
})();
})();
