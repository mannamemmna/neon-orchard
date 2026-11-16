import {clamp,hash,circle,glow,clearGlow,label} from './utils.js';
export class Harvest{
 constructor(x,y,color,seed){this.x=x;this.y=y;this.color=color;this.seed=seed;this.r=13;this.pulse=hash(seed)*6;this.taken=false}
 draw(c,t){if(this.taken)return;const p=1+Math.sin(t*.004+this.pulse)*.12;glow(c,this.color,18);c.fillStyle=this.color;circle(c,this.x,this.y,this.r*p);clearGlow(c);c.fillStyle='#fff5b0';circle(c,this.x-4,this.y-4,3)}
}
export class Vine{
 constructor(x,y,level,seed){this.x=x;this.y=y;this.level=level;this.seed=seed;this.r=16+level*1.7;this.phase=hash(seed)*6;this.vx=(hash(seed+4)-.5)*.45;this.vy=(hash(seed+8)-.5)*.45}
 update(dt,player){const dx=player.x-this.x,dy=player.y-this.y,d=Math.hypot(dx,dy)||1;const speed=18+this.level*5;this.x+=dx/d*speed*dt;this.y+=dy/d*speed*dt}
 draw(c,t){const wob=Math.sin(t*.004+this.phase)*3;glow(c,'#ff557f',14);c.fillStyle='#b82d63';circle(c,this.x+wob,this.y,this.r);c.fillStyle='#401f52';circle(c,this.x+wob,this.y,this.r*.65);c.fillStyle='#ff8aa0';circle(c,this.x-5+wob,this.y-5,4);clearGlow(c)}
}
export function spawnHarvests(level){const colors=['#ffd166','#ff6b9d','#8bf0c3','#9c8cff','#ff965d'];return Array.from({length:3+level},(_,i)=>new Harvest(180+hash(level*31+i)*780,250+hash(level*13+i)*270,colors[i%colors.length],level*10+i))}
export function spawnVines(level){return Array.from({length:level+1},(_,i)=>new Vine(220+hash(level*9+i)*760,245+hash(level*4+i)*310,level,level*17+i))}
export function hitDistance(a,b){return Math.hypot(a.x-b.x,a.y-b.y)}
