(function(){
'use strict';
var $=function(s,r){return (r||document).querySelector(s);};
var $$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s));};
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

/* ---------- hero: the blank frame ---------- */
var frame=$('#frame'),screen=$('#screen'),flabel=$('#frame-label');
function setRole(r){
 $$('.role-menu button').forEach(function(b){b.setAttribute('aria-pressed',String(b.dataset.role===r));});
 if(!r){frame.classList.remove('has');screen.innerHTML='';flabel.textContent='frame 1 · no role';return;}
 frame.classList.add('has');flabel.textContent='frame 1 · role: '+r;
 screen.style.opacity='0';screen.innerHTML=ROLE[r]();
 requestAnimationFrame(function(){screen.style.transition=reduce?'none':'opacity .35s';screen.style.opacity='1';});
}
$$('.role-menu button').forEach(function(b){b.addEventListener('click',function(){setRole(b.dataset.role);autoStop=true;});});
/* the signature move: the frame cycles through roles until the visitor touches it */
var autoStop=false,order=['home','shade','drawer','recents',''],oi=0;
function cycle(){if(autoStop||document.hidden){setTimeout(cycle,1200);return;}setRole(order[oi%order.length]);oi++;setTimeout(cycle,oi%5===0?2200:3600);}
if(!reduce)setTimeout(cycle,900);else setRole('home');

/* ---------- split: text → phone ---------- */
var kdl=$('#kdl'),out=$('#screen-out');
function renderKdl(){var t=kdl.value;var acc=(t.match(/accent\s+"(#[0-9a-fA-F]{6})"/)||[])[1]||'#D9865F';var cols=parseInt((t.match(/columns\s*=\s*(\d)/)||[])[1]||'4',10);cols=Math.min(6,Math.max(3,cols));
 out.innerHTML=home({acc:acc,cols:cols,dot:acc});}
kdl.addEventListener('input',renderKdl);renderKdl();

/* ---------- strip cards ---------- */
$('#card-built').innerHTML='<div style="width:300px;height:620px;transform:scale(.72);transform-origin:0 0;position:absolute;left:0;top:0">'+home({acc:'#D9865F'})+'</div>';
$('#card-ship').innerHTML=$('#card-built').innerHTML;

/* ---------- features ---------- */
var shellOut=$('#shell-out');
$$('#m-shade .tile').forEach(function(t){t.addEventListener('click',function(){var on=t.classList.toggle('on');t.querySelector('small').textContent=on?'on':'off';var cmd=t.dataset.cmd.replace(/enable|on$/,on?'$&':function(m){return m==='enable'?'disable':'off';});typeShell(cmd);});});
var typing=null;
function typeShell(cmd){if(typing)clearInterval(typing);var i=0;shellOut.textContent='';typing=setInterval(function(){i++;shellOut.textContent=cmd.slice(0,i)+(i<cmd.length?'▌':' ✓');if(i>=cmd.length)clearInterval(typing);},reduce?0:18);}
$('#recents').innerHTML=[['paper',paper(),16],['term',term(),120],['warm',home({acc:'#F2F2F2'}),224]].map(function(c){return '<div class="rcl" style="left:'+(c[2]+4)+'px">'+c[0]+'</div><div class="rc" style="left:'+c[2]+'px"><div style="width:300px;height:620px;transform:scale(.3067);transform-origin:0 0;position:absolute">'+c[1]+'</div></div>';}).join('');
$$('.perm-actions button').forEach(function(b){b.addEventListener('click',function(){var p=b.closest('.perm');p.innerHTML='<div class="perm-title">'+(b.classList.contains('primary')?'<span class="ok"></span> paper-grid can read notifications and toggle settings.':'paper-grid installed without scripts. Layout only.')+'</div>';});});

/* ---------- faq ---------- */
var A=[
 'Yes. Shizuku gives the app shell-level access without root, which is what makes the toggles, recents and the glass over other apps work. It takes two minutes to set up and the app walks you through it.',
 'No. Nothing here needs root, and nothing here needs a custom ROM. It is a launcher with overlays and a shell, and it tells you exactly which commands it runs.',
 'Android 12 and up. It is being built on a Galaxy S24 and a Redmi Note 10 Pro, with Pixel and other vendors to follow. Foldables come later; tablets sooner.',
 'The app and the engine are free. Layouts in the store are priced by the people who make them; many will be free. Seventy percent of a paid layout goes to its creator.',
 'Yes. A layout is a text file. You can write one by hand, keep it in git, fork someone else’s. The desktop editor comes later and draws the same file.',
 'Because that is the first thing people say. Launchers are settings screens; this is a blank frame that becomes whatever you build. The name is the positioning, and it is in quotes because someone said it.',
 'There is no date. What exists now is the current launcher, the brand, and the plan for the engine. The next thing to ship is the engine and the file format. This page will say when there is something to install.'
];
var pane=$('#faq-answer'),qs=$$('.q'),cur=-1;
function selectQ(i,fromKey){if(i===cur&&!fromKey)return;cur=i;qs.forEach(function(q,k){q.setAttribute('aria-expanded',String(k===i));var a=$('#a'+k);a.classList.toggle('open',k===i);a.textContent=k===i?A[k]:'';});
 pane.classList.add('fade');setTimeout(function(){pane.textContent=A[i];pane.classList.remove('fade');},reduce?0:150);}
qs.forEach(function(q,i){q.addEventListener('mouseenter',function(){if(matchMedia('(min-width:821px)').matches)selectQ(i);});q.addEventListener('focus',function(){selectQ(i);});q.addEventListener('click',function(){selectQ(i,true);});});
selectQ(0);

/* ---------- cta: mailto with the answers ---------- */
$('#tell-form').addEventListener('submit',function(e){e.preventDefault();var f=e.target;var who=f.who.value==='creator'?'I would make layouts':'I would install them';
 var body='What I would build first: '+(f.first.value||'')+'\n'+who+'\nWhat would stop me: '+(f.deal.value||'')+'\n';
 location.href='mailto:matheeshasilva1234@gmail.com?subject='+encodeURIComponent('"Not a Launcher" feedback')+'&body='+encodeURIComponent(body);});

/* ---------- footer clock ---------- */
function tick(){try{$('#clock').textContent=new Intl.DateTimeFormat('en-GB',{hour:'2-digit',minute:'2-digit',timeZone:'Asia/Colombo'}).format(new Date());}catch(e){}}
tick();setInterval(tick,30000);

/* ---------- entrances ---------- */
var targets=$$('.hero-col > *, .split-in > *, .split-out, .field > *, .features h2, .module > *, .faq h2, .q, .faq-pane, .cta-text > *, .dialog, .tile');
targets.forEach(function(el,i){el.classList.add('rise');});
if('IntersectionObserver' in window&&!reduce){
 var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){var sib=$$('.rise',e.target.parentElement).indexOf(e.target);e.target.style.transitionDelay=(Math.max(0,sib)*70)+'ms';e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:.15});
 targets.forEach(function(el){io.observe(el);});
}else{targets.forEach(function(el){el.classList.add('in');});}
})();
