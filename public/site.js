(function(){
'use strict';
var $=function(s){return document.querySelector(s);};
var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;

/* headline decode */
(function(){var el=$('#h1t'),cur=$('h1 .cur'),fin=el.textContent,pool='#%&*+=-:/<>[]{}\u00b7',D=1100,t0=null;
 if(reduce){cur.classList.add('idle');return;}el.textContent='';
 function eo(x){return 1-Math.pow(1-x,3);}
 function f(now){if(t0===null)t0=now;var p=Math.min(1,(now-t0)/D),n=Math.floor(fin.length*eo(p)),o='';
  for(var k=0;k<fin.length;k++){var ch=fin[k];o+=(k<n||ch===' '||ch==='.')?ch:pool[Math.floor(Math.random()*pool.length)];}
  el.textContent=o;if(p<1)requestAnimationFrame(f);else{el.textContent=fin;cur.classList.add('idle');document.dispatchEvent(new Event('decoded'));}}
 requestAnimationFrame(f);})();

/* Tess: eyes follow the pointer, blink, react; the bar follows the eyes; the nav mark mirrors it */
(function(){
 var eyes=$('#eyes'),teyes=$('#teyes'),tbar=$('#tbar'),tbarg=$('#tbarg'),field=$('#field'),status=$('#status'),stage=$('.stage');
 var t0=performance.now(),blinkAt=1.6,blink=-1,lookAt=0,gx=0,gy=0,px=null,py=null,msgAt=1.2,msgStart=0,mi=-1,wideAt=-9;
 var touch=matchMedia('(hover:none)').matches;
 var msgs=['building','laying tiles','compiling layouts','polishing the glass','wiring the shell','checking contrast'],DUR=3.6;
 if(!touch){addEventListener('pointermove',function(e){px=e.clientX;py=e.clientY;},{passive:true});document.addEventListener('mouseleave',function(){px=py=null;});}
 document.addEventListener('decoded',function(){wideAt=(performance.now()-t0)/1000;});
 function io(x){return x<.5?2*x*x:1-Math.pow(-2*x+2,2)/2;}

 /* the dot grid: cells sized from a probe, phases precomputed, drawn at 20fps */
 var W=0,H=0,PH=null,SP=null,lastGrid=-1;
 function measure(){var probe=document.createElement('span');probe.textContent='\u00b7\u00b7\u00b7\u00b7\u00b7\u00b7\u00b7\u00b7\u00b7\u00b7\n\u00b7\n\u00b7\n\u00b7';field.innerHTML='';field.appendChild(probe);
  var r=probe.getBoundingClientRect(),fr=field.getBoundingClientRect();W=Math.ceil(fr.width/(r.width/10))+2;H=Math.ceil(fr.height/(r.height/4))+2;
  PH=new Float32Array(W*H);SP=new Float32Array(W*H);
  for(var y=0;y<H;y++)for(var x=0;x<W;x++){var h=((x*73856093)^(y*19349663))>>>0,k=y*W+x;PH[k]=(h%997)/997*6.283;SP[k]=0.4+(h%7)*0.12;}
  lastGrid=-1;}
 function grid(t){var out='';for(var y=0;y<H;y++){var row='';for(var x=0;x<W;x++){var k=y*W+x,v=Math.sin(t*SP[k]+PH[k]);row+=(v>0.997?'<i>\u2022</i>':(v>0.955?'<b>\u2022</b>':'\u00b7'));}out+=row+'\n';}field.innerHTML='<span>'+out+'</span>';}
 measure();var rt;addEventListener('resize',function(){clearTimeout(rt);rt=setTimeout(measure,150);});

 function frame(now){var t=reduce?1:(now-t0)/1000;
  if(!reduce){
   if(t>blinkAt){blink=t;blinkAt=t+2.2+Math.random()*2.8;}
   if(px!==null){var r=stage.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2;gx=Math.max(-4,Math.min(4,(px-cx)/innerWidth*14));gy=Math.max(-2.5,Math.min(2.5,(py-cy)/innerHeight*8));}
   else if(t>lookAt){gx=[0,-3,3,0][Math.floor(Math.random()*4)];gy=0;lookAt=t+1.5+Math.random()*4;}
   if(t>msgAt){mi++;status.textContent=msgs[mi%msgs.length];msgStart=t;msgAt=t+DUR;blink=t;}
  }
  var shut=blink>=0&&t-blink<0.08,wide=t-wideAt>=0&&t-wideAt<0.5,sy=shut?0.08:(wide?1.14:1);
  [eyes,teyes].forEach(function(g){g.classList.toggle('shut',shut);g.classList.toggle('wide',wide&&!shut);g.style.transform='translate('+gx+'px,'+gy+'px) scaleY('+sy+')';});
  tbarg.style.transform='translate('+gx+'px,0)';
  tbar.setAttribute('width',String(32*io(Math.min(1,(t-msgStart)/DUR))));
  if(t-lastGrid>=0.05||reduce){lastGrid=t;grid(t);}
  if(!reduce&&!document.hidden)requestAnimationFrame(frame);}
 requestAnimationFrame(frame);
 document.addEventListener('visibilitychange',function(){if(!document.hidden&&!reduce)requestAnimationFrame(frame);});
})();
})();
