(function(){
'use strict';
var $=function(s){return document.querySelector(s);};
var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
/* ---------- icons ---------- */
var G={
 phone:'<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',
 messages:'<path d="M4 5h16v11H9l-5 4z"/>',
 mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
 camera:'<path d="M4 8h4l2-3h4l2 3h4v11H4z"/><circle cx="12" cy="13" r="3.5"/>',
 music:'<path d="M9 18V5l11-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/>',
 maps:'<path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2z"/><path d="M9 4v14M15 6v14"/>',
 notes:'<path d="M6 3h9l4 4v14H6z"/><path d="M9 11h7M9 15h7"/>',
 files:'<path d="M3 6h6l2 2h10v11H3z"/>',
 browser:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
 calendar:'<rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4"/>',
 clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
 photos:'<rect x="3" y="4" width="18" height="16" rx="2"/><path d="m3 16 5-5 4 4 3-3 6 6"/>',
 terminal:'<rect x="3" y="4" width="18" height="16" rx="2"/><path d="m7 9 3 3-3 3M13 15h4"/>',
 weather:'<circle cx="9" cy="9" r="4"/><path d="M8 19h9a4 4 0 0 0 0-8 5 5 0 0 0-1 0"/>',
 settings:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/>',
 store:'<path d="M5 8h14l-1 12H6z"/><path d="M9 8a3 3 0 0 1 6 0"/>'
};
var APPS=Object.keys(G);
function svg(n){return '<svg viewBox="0 0 24 24">'+G[n]+'</svg>';}
function icon(n,x,y,o){o=o||{};var s=o.s||44;return '<div class="ic'+(o.a?' a':'')+'" style="left:'+x+'px;top:'+y+'px;--is:'+s+'px">'+svg(n)+'</div>'+(o.l?'<div class="lb" style="left:'+(x-8+s/2-22)+'px;top:'+(y+s+4)+'px">'+n+'</div>':'');}
function st(right){return '<div class="st"><span>07:38</span><span>'+(right||'▮▮▮ 84%')+'</span></div>';}

/* scale: layouts drawn for a 300×620 screen; caller scales via font-size/--is and absolute coords. We draw in 300-wide units. */
function home(o){o=o||{};var acc=o.acc||'#F2F2F2',cols=o.cols||4,dot=o.dot||'#D9865F';
 var s=cols>=5?36:44,gap=(268-cols*s)/(cols-1);var h='<div class="scr" style="--acc:'+acc+'">'+st();
 h+='<div class="clk"><b>07:38</b><i>mon 02 nov · 27°</i><em style="background:'+dot+'"></em></div>';
 for(var i=0;i<cols*4;i++){var c=i%cols,r=Math.floor(i/cols);h+=icon(APPS[i%16],16+c*(s+gap),158+r*(s+30),{s:s,l:true,a:i%5===0});}
 h+='<div class="dock"></div>';['phone','messages','browser','camera'].forEach(function(a,k){h+=icon(a,27+k*64,567,{s:44,a:k===0});});
 return h+'</div>';}
function paper(){var h='<div class="scr paper">'+st()+'<div class="big">07<br>38</div>';
 [['messages','3'],['mail','12'],['calendar','09:00'],['music','side b'],['maps','24m'],['terminal','']].forEach(function(r,i){h+='<div class="row" style="top:'+(262+i*40)+'px">'+r[0]+'<span>'+r[1]+'</span></div>';});
 return h+'</div>';}
function term(){return '<div class="scr term">'+st('[84%]')+'<pre>you@phone:~$ date\nMon 02 Nov 07:38\n\nyou@phone:~$ ls ~/apps\ncamera  files   mail\nmaps    music   notes\nphone   photos  store\n\nyou@phone:~$ battery\n[████████████░░] 84%\n\nyou@phone:~$ ▌</pre><div class="bar">[0] home  1:drawer  2:shade  3:recents</div></div>';}
function drawer(){var h='<div class="scr">'+st()+'<div class="srch">search apps<em></em></div>';
 var S=APPS.slice().sort();S.forEach(function(a,i){var c=i%4,r=Math.floor(i/4);h+=icon(a,24+c*68,100+r*76,{s:40,l:true});});
 return h+'</div>';}
function shade(){var h='<div class="scr" style="--acc:#F2F2F2">'+home().replace('<div class="scr" style="--acc:#F2F2F2">','').slice(0,-6);
 h+='<div class="shade"><b>07:38</b>';
 [['wifi','home-5g',1],['bluetooth','buds',1],['data','off',0],['torch','off',0],['dnd','off',0],['rotate','auto',0]].forEach(function(t,i){h+='<div class="tl'+(t[2]?' on':'')+'" style="left:'+(18+(i%2)*134)+'px;top:'+(104+Math.floor(i/2)*62)+'px">'+t[0]+'<small>'+t[1]+'</small></div>';});
 return h+'</div></div>';}
function recents(){var h='<div class="scr">'+st();
 [['paper',paper(),-92],['term',term(),70],['warm',home({acc:'#F2F2F2'}),232]].forEach(function(c){h+='<div class="rcl" style="left:'+(c[2]+8)+'px">'+c[0]+'</div><div class="rc" style="left:'+c[2]+'px"><div style="width:300px;height:620px;transform:scale(.5);transform-origin:0 0;position:absolute">'+c[1]+'</div></div>';});
 return h+'<div class="clear">clear all</div></div>';}
var ROLE={home:function(){return home();},drawer:drawer,shade:shade,recents:recents};


/* the frame cycles through screens */
var frame=$('#frame'),screen=$('#screen');
var seq=[function(){return home({acc:'#F2F2F2'});},paper,shade,term,drawer,function(){return home({acc:'#7FE0C2',cols:5,dot:'#7FE0C2'});},recents];
var i=0,timer=null;
function swap(html,has){screen.classList.remove('in');screen.classList.add('out');
 setTimeout(function(){screen.innerHTML=html;frame.classList.toggle('has',has);if(html){screen.classList.remove('out');screen.classList.add('in');}},reduce?150:190);}
function step(){if(document.hidden)return;i++;if(i%seq.length===0){swap('',false);timer=setTimeout(function(){swap(seq[i%seq.length](),true);},1100);}else swap(seq[i%seq.length](),true);}
screen.classList.add('out');
if(reduce){screen.innerHTML=seq[0]();frame.classList.add('has');screen.classList.remove('out');}
else{setTimeout(function(){swap(seq[0](),true);},1400);setInterval(step,3400);}

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
 var e1=$('#e1'),e2=$('#e2'),eyes=$('#eyes'),field=$('#field'),status=$('#status');
 var t0=performance.now(),blinkAt=1.6,blink=-1,lookAt=0,dx=0,msgAt=0,mi=0;
 var msgs=['building','laying tiles','compiling layouts','polishing the glass','wiring the shell','checking contrast'];
 var W=Math.min(70,Math.floor(innerWidth/16)),H=Math.max(9,Math.min(16,Math.floor(innerHeight/48)));
 function frame(now){var t=reduce?1:(now-t0)/1000;
  if(!reduce){if(t>blinkAt){blink=t;blinkAt=t+2+Math.random()*2.6;}if(t>lookAt){dx=[0,-3,3,0][Math.floor(Math.random()*4)];lookAt=t+1.5+Math.random()*4;}if(t>msgAt){status.textContent=msgs[mi%msgs.length];mi++;msgAt=t+3.4;}}
  var shut=blink>=0&&t-blink<0.09;eyes.classList.toggle('shut',shut);eyes.style.transform='translate('+dx+'px,0) scaleY('+(shut?0.08:1)+')';
  var out='';for(var y=0;y<H;y++){var row='';for(var x=0;x<W;x++){var r=Math.sin(x*0.42+y*0.75-t*1.1)+0.5*Math.sin(x*0.13-t*0.7);var hx=innerWidth>820?W*0.79:W*0.5,cx=Math.abs(x-hx),cy=Math.abs(y-(H-1)/2);row+=(cx<W*0.14&&cy<H*0.48)?' ':(r>0.95?'<b>\u2022</b>':(r>0.15?'\u00b7':' '));}out+=row+'\n';}
  field.innerHTML=out;if(!reduce&&!document.hidden)requestAnimationFrame(frame);}
 requestAnimationFrame(frame);document.addEventListener('visibilitychange',function(){if(!document.hidden&&!reduce)requestAnimationFrame(frame);});
})();
})();
