export const W=1280,H=720,PLAY={x:70,y:120,w:1140,h:530};
export function clamp(v,a,b){return Math.max(a,Math.min(b,v))}
export function lerp(a,b,t){return a+(b-a)*t}
export function hash(n){const x=Math.sin(n*91.17)*43758.5453;return x-Math.floor(x)}
export function rounded(ctx,x,y,w,h,r){ctx.beginPath();ctx.roundRect(x,y,w,h,r);ctx.fill()}
export function circle(ctx,x,y,r){ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill()}
export function label(ctx,text,x,y,size=18,color='#efffe1',align='left',weight='600'){ctx.font=`${weight} ${size}px system-ui, sans-serif`;ctx.fillStyle=color;ctx.textAlign=align;ctx.fillText(text,x,y)}
export function glow(ctx,color,blur=18){ctx.shadowColor=color;ctx.shadowBlur=blur}
export function clearGlow(ctx){ctx.shadowBlur=0;ctx.shadowColor='transparent'}
