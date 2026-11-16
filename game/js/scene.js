import {W,H,PLAY,clamp,hash,rounded,circle,label,glow,clearGlow} from './utils.js';
export class OrchardScene{
 constructor(ctx){this.ctx=ctx;this.stars=Array.from({length:85},(_,i)=>({x:hash(i*2)*W,y:hash(i*3+7)*115,r:hash(i+4)*2+0.5,a:hash(i+8)}));this.trees=Array.from({length:18},(_,i)=>({x:100+i*67+hash(i)*25,y:160+hash(i+4)*80,s:0.7+hash(i+8)*0.55}));}
 draw(t,level=1){const c=this.ctx;const sky=c.createLinearGradient(0,0,0,H);sky.addColorStop(0,'#101f4c');sky.addColorStop(.52,'#162f4b');sky.addColorStop(1,'#071820');c.fillStyle=sky;c.fillRect(0,0,W,H);
  for(const s of this.stars){c.globalAlpha=.35+s.a*.5;c.fillStyle='#c8fff0';circle(c,s.x,s.y,s.r)}c.globalAlpha=1;
  glow(c,'#ffe9a8',26);c.fillStyle='#ffe9a8';circle(c,1070,94,38);clearGlow(c);c.fillStyle='#101f4c';circle(c,1086,84,38);
  c.fillStyle='#0b2630';c.fillRect(0,270,W,450);c.fillStyle='#0e3b3d';c.fillRect(0,390,W,330);
  for(const tr of this.trees)this.tree(tr.x,tr.y,tr.s);
  c.strokeStyle='#2a7568';c.lineWidth=2;c.setLineDash([9,15]);for(let y=455;y<690;y+=52){c.beginPath();c.moveTo(45,y);c.lineTo(1235,y);c.stroke()}c.setLineDash([]);
  c.fillStyle='#132d2f';rounded(c,PLAY.x,PLAY.y,PLAY.w,PLAY.h,22);c.strokeStyle='#4baf88';c.lineWidth=2;c.stroke();
  c.fillStyle='rgba(126,255,194,.05)';rounded(c,PLAY.x+8,PLAY.y+8,PLAY.w-16,PLAY.h-16,18);
 }
 tree(x,y,s){const c=this.ctx;c.save();c.translate(x,y);c.scale(s,s);c.fillStyle='#39294c';c.fillRect(-8,30,16,65);glow(c,'#69d69c',12);c.fillStyle='#235e5c';circle(c,0,5,42);circle(c,-28,25,28);circle(c,29,25,30);c.fillStyle='#3aa677';circle(c,0,0,28);clearGlow(c);c.fillStyle='#e9bc70';circle(c,-16,10,4);circle(c,18,19,4);c.restore()}
 drawGate(active=true){const c=this.ctx;c.save();c.translate(1060,382);c.strokeStyle=active?'#ffd46a':'#4c8270';c.lineWidth=7;c.beginPath();c.arc(0,50,58,Math.PI,0);c.lineTo(58,100);c.moveTo(-58,50);c.lineTo(-58,100);c.stroke();glow(c,active?'#ffd46a':'#4c8270',18);c.strokeStyle=active?'#ffe9a8':'#4c8270';c.lineWidth=2;c.beginPath();c.arc(0,50,48,Math.PI,0);c.stroke();clearGlow(c);label(c,active?'MOON GATE':'LOCKED',0,128,13,active?'#ffe9a8':'#6a9b88','center','800');c.restore()}
}
