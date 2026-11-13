(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=e(r);fetch(r.href,s)}})();const Uh=(i,t,e,n)=>Math.hypot(e-i,n-t);function As(i){let t=0;for(let e=0,n=i.length-1;e<i.length;n=e++)t+=i[n][0]*i[e][1]-i[e][0]*i[n][1];return t/2}function al(i){let t=0,e=0,n=0;for(let r=0,s=i.length-1;r<i.length;s=r++){const o=i[s][0]*i[r][1]-i[r][0]*i[s][1];t+=o,e+=(i[s][0]+i[r][0])*o,n+=(i[s][1]+i[r][1])*o}if(Math.abs(t)<1e-9){const r=i.length;return[i.reduce((s,o)=>s+o[0],0)/r,i.reduce((s,o)=>s+o[1],0)/r]}return[e/(3*t),n/(3*t)]}function Nh(i,t,e){let n=!1;for(let r=0,s=e.length-1;r<e.length;s=r++){const[o,a]=e[r],[c,l]=e[s];a>t!=l>t&&i<(c-o)*(t-a)/(l-a)+o&&(n=!n)}return n}function cl(i,t,e,n,r,s){const o=r-e,a=s-n,c=o*o+a*a,l=c>0?Math.max(0,Math.min(1,((i-e)*o+(t-n)*a)/c)):0,u=e+o*l,f=n+a*l;return{x:u,z:f,t:l,d:Math.hypot(i-u,t-f)}}function dp(i,t,e,n,r,s,o,a){const c=o-r,l=a-s,u=e*l-n*c;if(Math.abs(u)<1e-12)return 1/0;const f=((r-i)*l-(s-t)*c)/u,h=((r-i)*n-(s-t)*e)/u;return f>=0&&h>=0&&h<=1?f:1/0}function pp(i,t){const e=[];let n=0;for(let r=1;r<i.length;r++){const[s,o]=i[r-1],[a,c]=i[r],l=Uh(s,o,a,c);if(l<1e-6)continue;const u=(a-s)/l,f=(c-o)/l;for(let h=n;h<=l;h+=t)e.push({x:s+u*h,z:o+f*h,ux:u,uz:f,i:r});n=(n-l)%t,n<0&&(n+=t)}return e}function Do(i,t){const e=i.length,n=[],r=As(i)>0?1:-1;for(let s=0;s<e;s++){const o=i[(s-1+e)%e],a=i[s],c=i[(s+1)%e],l=Math.hypot(a[0]-o[0],a[1]-o[1])||1,u=Math.hypot(c[0]-a[0],c[1]-a[1])||1,f=[-(a[1]-o[1])/l*r,(a[0]-o[0])/l*r],h=[-(c[1]-a[1])/u*r,(c[0]-a[0])/u*r];let d=f[0]+h[0],g=f[1]+h[1];const _=Math.hypot(d,g);if(_<1e-6){n.push([a[0]+f[0]*t,a[1]+f[1]*t]);continue}d/=_,g/=_;const m=Math.max(.35,d*f[0]+g*f[1]);n.push([a[0]+d*t/m,a[1]+g*t/m])}return n}function rc(i){let t=1/0,e=1/0,n=-1/0,r=-1/0;for(const[s,o]of i)t=Math.min(t,s),e=Math.min(e,o),n=Math.max(n,s),r=Math.max(r,o);return{x0:t,z0:e,x1:n,z1:r}}function mp(i){let t=0,e=0;for(let n=0;n<i.length;n++){const r=i[n],s=i[(n+1)%i.length],o=Uh(r[0],r[1],s[0],s[1]);o>t&&(t=o,e=Math.atan2(s[1]-r[1],s[0]-r[0]))}return e}function gp(i){const t=mp(i),e=Math.cos(-t),n=Math.sin(-t);let r=1/0,s=-1/0,o=1/0,a=-1/0;for(const[c,l]of i){const u=c*e-l*n,f=c*n+l*e;r=Math.min(r,u),s=Math.max(s,u),o=Math.min(o,f),a=Math.max(a,f)}return{lungo:s-r,largo:a-o,angolo:t}}function mi(i){let t=i>>>0^2654435769;return t=Math.imul(t^t>>>16,2246822507),t=Math.imul(t^t>>>13,3266489909),((t^t>>>16)>>>0)/4294967296}const _p=12,xp=3;function vp(i=_p){const t=new Map,e=[],n=[];let r=0;const s=(u,f)=>u*100003+f;function o(u,f,h,d,g){for(let _=Math.floor(f/i);_<=Math.floor(d/i);_++)for(let m=Math.floor(h/i);m<=Math.floor(g/i);m++){const p=s(_,m);let v=t.get(p);v||(v=[],t.set(p,v)),v.push(u)}}function a(u,f,h,d,g){r+=1,g.length=0;for(let _=Math.floor(u/i);_<=Math.floor(h/i);_++)for(let m=Math.floor(f/i);m<=Math.floor(d/i);m++){const p=t.get(s(_,m));if(p)for(const v of p)v.marca===r||!v.attivo||(v.marca=r,g.push(v))}return g}const c=[];function l(u,f,h,d){let g=u,_=f,m=0,p=0,v=!1;for(let x=0;x<xp;x++){let b=!1;for(const S of a(g-h,_-h,g+h,_+h,c))if(!(d&&!d(S)))if(S.tipo==="s"){const A=cl(g,_,S.ax,S.az,S.bx,S.bz);if(A.d>=h)continue;let T,y;if(A.d>1e-6)T=(g-A.x)/A.d,y=(_-A.z)/A.d;else{const E=Math.hypot(S.bx-S.ax,S.bz-S.az)||1;T=-(S.bz-S.az)/E,y=(S.bx-S.ax)/E}g=A.x+T*h,_=A.z+y*h,m+=T,p+=y,b=v=!0}else{const A=g-S.x,T=_-S.z,y=Math.hypot(A,T),E=h+S.r;if(y>=E)continue;const R=y>1e-6?A/y:1,D=y>1e-6?T/y:0;g=S.x+R*E,_=S.z+D*E,m+=R,p+=D,b=v=!0}if(!b)break}const M=Math.hypot(m,p);return{x:g,z:_,urto:v,nx:M>0?m/M:0,nz:M>0?p/M:0}}return{segmenti:e,cerchi:n,aggiungiSegmento(u,f,h,d,g=null,_={}){const m={tipo:"s",ax:u,az:f,bx:h,bz:d,etichetta:g,attivo:!0,marca:0,..._};return e.push(m),o(m,Math.min(u,h),Math.min(f,d),Math.max(u,h),Math.max(f,d)),m},aggiungiAnello(u,f=null,h={}){return u.map((d,g)=>{const _=u[(g+1)%u.length];return this.aggiungiSegmento(d[0],d[1],_[0],_[1],f,h)})},aggiungiCerchio(u,f,h,d=null,g={}){const _={tipo:"c",x:u,z:f,r:h,etichetta:d,attivo:!0,marca:0,...g};return n.push(_),o(_,u-h,f-h,u+h,f+h),_},vicini(u,f,h){return[...a(u-h,f-h,u+h,f+h,[])]},respingi:l,muoviCerchio(u,f,h,d,g,_=null){const m=Math.hypot(h,d),p=Math.max(1,Math.ceil(m/(g*.5)));let v=u,M=f,x=!1,b=0,S=0;for(let A=0;A<p;A++){const T=l(v+h/p,M+d/p,g,_);v=T.x,M=T.z,T.urto&&(x=!0,b=T.nx,S=T.nz)}return{x:v,z:M,urto:x,nx:b,nz:S}},raggio(u,f,h,d,g,_=null){const m=Math.hypot(h,d)||1,p=h/m,v=d/m;let M=g,x=null;const b=i*.5;r+=1;for(let S=0;S<=g+b;S+=b){const A=u+p*S,T=f+v*S,y=Math.floor(A/i),E=Math.floor(T/i);for(let R=y-1;R<=y+1;R++)for(let D=E-1;D<=E+1;D++){const N=t.get(s(R,D));if(N)for(const U of N){if(U.marca===r||!U.attivo||(U.marca=r,_&&!_(U)))continue;let w;if(U.tipo==="s")w=dp(u,f,p,v,U.ax,U.az,U.bx,U.bz);else{const P=u-U.x,F=f-U.z,O=P*p+F*v,K=P*P+F*F-U.r*U.r,tt=O*O-K;w=tt<0?1/0:-O-Math.sqrt(tt),w<0&&(w=1/0)}w<M&&(M=w,x=U)}}if(S>M)break}return{distanza:M,colpito:x}},libero(u,f,h,d,g=null){const _=Math.hypot(h-u,d-f);return _<1e-6?!0:this.raggio(u,f,h-u,d-f,_,g).distanza>=_-.001}}}const si=40;function Mp(i){const t=new Map,e=(c,l,u)=>{let f=t.get(c);return f||(f={k:c,x:l,z:u,archi:[]},t.set(c,f)),f},n=[];i.forEach((c,l)=>{if(c.a)for(let u=1;u<c.p.length;u++){const f=e(c.k[u-1],c.p[u-1][0],c.p[u-1][1]),h=e(c.k[u],c.p[u][0],c.p[u][1]),d=Math.hypot(h.x-f.x,h.z-f.z);if(d<.01)continue;const g=d*(c.s?1.8:1)/(1+c.r*.15);f.archi.push({verso:h,lungo:d,costo:g,strada:l}),h.archi.push({verso:f,lungo:d,costo:g,strada:l}),n.push({a:f,b:h,strada:l,largo:c.l})}});const r=new Map,s=(c,l)=>c*100003+l;for(const c of n){const l=Math.floor(Math.min(c.a.x,c.b.x)/si),u=Math.floor(Math.max(c.a.x,c.b.x)/si),f=Math.floor(Math.min(c.a.z,c.b.z)/si),h=Math.floor(Math.max(c.a.z,c.b.z)/si);for(let d=l;d<=u;d++)for(let g=f;g<=h;g++){const _=s(d,g);r.has(_)||r.set(_,[]),r.get(_).push(c)}}function o(c,l,u=400){const f=Math.floor(c/si),h=Math.floor(l/si);let d=null;for(let g=0;g*si<=u;g++){for(let _=f-g;_<=f+g;_++)for(let m=h-g;m<=h+g;m++)if(Math.max(Math.abs(_-f),Math.abs(m-h))===g)for(const p of r.get(s(_,m))??[]){const v=cl(c,l,p.a.x,p.a.z,p.b.x,p.b.z);(!d||v.d<d.d)&&(d={...v,seg:p})}if(d&&d.d<g*si)break}return d}function a(c,l){const u=o(c.x,c.z),f=o(l.x,l.z);if(!u||!f)return null;const h=[u.seg.a,u.seg.b],d=new Set([f.seg.a,f.seg.b]),g=new Map,_=new Map,m=[],p=b=>Math.hypot(b.x-f.x,b.z-f.z)*.7;for(const b of h){const S=Math.hypot(b.x-u.x,b.z-u.z);g.set(b,S),m.push({n:b,f:S+p(b)})}let v=null,M=0;for(;m.length&&M++<6e4;){let b=0;for(let T=1;T<m.length;T++)m[T].f<m[b].f&&(b=T);const{n:S,f:A}=m[b];if(m[b]=m[m.length-1],m.pop(),!(A-p(S)>g.get(S)+1e-6)){if(d.has(S)){v=S;break}for(const T of S.archi){const y=g.get(S)+T.costo;y<(g.get(T.verso)??1/0)&&(g.set(T.verso,y),_.set(T.verso,S),m.push({n:T.verso,f:y+p(T.verso)}))}}}if(!v)return null;const x=[];for(let b=v;b;b=_.get(b))x.push({x:b.x,z:b.z});return x.reverse(),x.unshift({x:u.x,z:u.z}),x.push({x:f.x,z:f.z}),x}return{nodi:t,segmenti:n,piuVicino:o,percorso:a}}const Wn=.14,$i=8,yp=.3,Yl=.92,Sp=26;function Ep(i){const t=[0];for(let e=1;e<i.length;e++)t.push(t[e-1]+Math.hypot(i[e][0]-i[e-1][0],i[e][1]-i[e-1][1]));return t}function bp(i,t){const e=i[Math.max(0,t-1)],n=i[Math.min(i.length-1,t+1)],r=Math.hypot(n[0]-e[0],n[1]-e[1])||1;return[(n[0]-e[0])/r,(n[1]-e[1])/r]}function Ap(i){const t=i.filter(([n,r])=>r>n).sort((n,r)=>n[0]-r[0]),e=[];for(const[n,r]of t)e.length&&n<=e[e.length-1][1]?e[e.length-1][1]=Math.max(e[e.length-1][1],r):e.push([n,r]);return e}function Tp(i,t,e=.8){const n=[];let r=0;for(const[s,o]of Ap(i))s-r>e&&n.push([r,Math.min(s,t)]),r=Math.max(r,o);return t-r>e&&n.push([r,t]),n.filter(([s,o])=>o-s>e)}function wp(i){const t=new Map;return i.forEach((e,n)=>{e.k.forEach((r,s)=>{t.has(r)||t.set(r,[]),t.get(r).push({si:n,i:s})})}),i.map((e,n)=>{const r=Ep(e.p),s=r[r.length-1],o=[[],[]],a=[];e.k.forEach((l,u)=>{const f=t.get(l).filter(p=>p.si!==n||p.i!==u);if(!f.length)return;const[h,d]=bp(e.p,u),g=-d,_=h,m=u===0||u===e.p.length-1;for(const p of f){const v=i[p.si];if(!(!v.a&&!v.pe&&v.l<3))for(const M of[p.i-1,p.i+1]){if(M<0||M>=v.p.length)continue;const x=v.p[M][0]-v.p[p.i][0],b=v.p[M][1]-v.p[p.i][1],S=Math.hypot(x,b)||1,A=x/S,T=b/S,y=A*h+T*d;if(Math.abs(y)>Yl&&!m||m&&Math.abs(y)>Yl&&v.l<=e.l+.5)continue;const E=Math.max(.3,Math.sqrt(Math.max(0,1-y*y))),R=A*g+T*_>0?0:1,D=Math.min(Sp,(v.l/2+yp)/E+(e.m[R]??0)*Math.abs(y)/E),N=r[u]+y*0;if(m){const U=u===0?0:s-D,w=u===0?D:s;o[0].push([U,w]),o[1].push([U,w])}else o[R].push([N-D,N+D]);e.u&&e.r>=2&&v.a&&a.push({s:Math.max(0,Math.min(s,u===0?D+1.6:u===e.p.length-1?s-D-1.6:NaN))})}}});const c=[0,1].map(l=>e.m[l]>0?Tp(o[l],s):[]);return{cum:r,lungo:s,pezzi:c,strisce:a.filter(l=>Number.isFinite(l.s))}})}function Uo(i,t,e){let n=1;for(;n<t.length-1&&t[n]<e;)n++;const r=i[n-1],s=i[n],o=t[n]-t[n-1]||1,a=Math.max(0,Math.min(1,(e-t[n-1])/o)),c=(s[0]-r[0])/o,l=(s[1]-r[1])/o;return{x:r[0]+(s[0]-r[0])*a,z:r[1]+(s[1]-r[1])*a,ux:c,uz:l,i:n}}function Te(i,t,e,n,r){const s=[],o=Uo(i,t,e);s.push([o.x-o.uz*r,o.z+o.ux*r,e]);for(let c=1;c<i.length-1;c++){if(t[c]<=e||t[c]>=n)continue;const[l,u]=i[c-1],[f,h]=i[c],[d,g]=i[c+1],_=Math.hypot(f-l,h-u)||1,m=Math.hypot(d-f,g-h)||1,p=-(h-u)/_,v=(f-l)/_,M=-(g-h)/m,x=(d-f)/m;let b=p+M,S=v+x;const A=Math.hypot(b,S)||1;b/=A,S/=A;const T=Math.max(.4,b*p+S*v);s.push([f+b*r/T,h+S*r/T,t[c]])}const a=Uo(i,t,n);return s.push([a.x-a.uz*r,a.z+a.ux*r,n]),s}function Rp(i,t){const e=new Map,n=(s,o)=>s*100003+o;i.forEach((s,o)=>{const a=t[o];[0,1].forEach(c=>{const l=c===0?1:-1;for(const[u,f]of a.pezzi[c]){const h=Te(s.p,a.cum,u,f,l*s.l/2),d=Te(s.p,a.cum,u,f,l*(s.l/2+s.m[c]));for(let g=1;g<h.length;g++){const _=[h[g-1],h[g],d[g],d[g-1]].map(v=>[v[0],v[1]]),m=_.map(v=>v[0]),p=_.map(v=>v[1]);for(let v=Math.floor(Math.min(...m)/$i);v<=Math.floor(Math.max(...m)/$i);v++)for(let M=Math.floor(Math.min(...p)/$i);M<=Math.floor(Math.max(...p)/$i);M++){const x=n(v,M);e.has(x)||e.set(x,[]),e.get(x).push(_)}}}})});const r=(s,o,a)=>{let c=0;for(let l=0;l<4;l++){const[u,f]=a[l],[h,d]=a[(l+1)%4],g=(h-u)*(o-f)-(d-f)*(s-u);if(Math.abs(g)<1e-9)continue;const _=g>0?1:-1;if(c===0)c=_;else if(_!==c)return!1}return!0};return function(o,a){const c=e.get(n(Math.floor(o/$i),Math.floor(a/$i)));if(!c)return 0;for(const l of c)if(r(o,a,l))return Wn;return 0}}const Cp=5.8,Ip=.42,Pp=5.3,Zl=["utilitaria","berlina"],Kl=[15263974,1842206,9080726,3820138,8003359,13222576,3099194,5922662,11580600,2109504],Lp=.86;function Dp(i,t,{evita:e=()=>!1}={}){const n=[];return i.strade.forEach((r,s)=>{if(!r.a||!r.u||r.l<Pp||r.r<2||r.b||r.ro)return;const o=t[s],a=mi(s*7+3)<.5?0:1;for(const[c,l]of o.pezzi[a])for(let u=c+3;u<l-3;u+=Cp){const f=mi(s*1e3+Math.round(u*10));if(f>Ip)continue;const h=Uo(r.p,o.cum,u),d=a===0?1:-1,g=d*(r.l/2-1),_=h.x-h.uz*g,m=h.z+h.ux*g;if(e(_,m))continue;const p=mi(s+Math.round(u))<.85?1:-1,v=Math.atan2(-h.ux*p*d,-h.uz*p*d);n.push({x:_,z:m,yaw:v,modello:Zl[Math.floor(mi(Math.round(_*13+m*7))*Zl.length)],colore:Kl[Math.floor(f*1e3)%Kl.length]})}}),n}function Up(i,t){const e=-Math.sin(i.yaw),n=-Math.cos(i.yaw),r=(t-1.72)/2;return[-r,0,r].map(s=>({x:i.x+e*s,z:i.z+n*s,r:Lp}))}const Np=Object.freeze({utilitaria:Object.freeze({nome:"Utilitaria",lungo:3.9,largo:1.72,alto:1.5,massa:1050,potenza:9.5,velocitaMax:46,aderenza:9.5,passo:2.45,posti:4,sacchi:4,vita:260,colore:9051935}),berlina:Object.freeze({nome:"Berlina",lungo:4.6,largo:1.82,alto:1.45,massa:1450,potenza:11.5,velocitaMax:54,aderenza:10,passo:2.75,posti:4,sacchi:5,vita:340,colore:2964042}),furgone:Object.freeze({nome:"Furgone",lungo:5.2,largo:2,alto:2.3,massa:2100,potenza:9,velocitaMax:40,aderenza:8.2,passo:3.3,posti:4,sacchi:8,vita:480,colore:14474454})}),Op=.14,zp=.3,Fp=1300;function Bp(i,t){const n=new Map;for(const s of t.strade)if(!(!s.a&&!s.pe))for(let o=1;o<s.p.length;o++){const[a,c]=s.p[o-1],[l,u]=s.p[o],f={ax:a,az:c,bx:l,bz:u,m:s.l/2+2.5};for(let h=Math.floor((Math.min(a,l)-4)/20);h<=Math.floor((Math.max(a,l)+4)/20);h++)for(let d=Math.floor((Math.min(c,u)-4)/20);d<=Math.floor((Math.max(c,u)+4)/20);d++){const g=h*100003+d;n.has(g)||n.set(g,[]),n.get(g).push(f)}}const r=(s,o)=>(n.get(Math.floor(s/20)*100003+Math.floor(o/20))??[]).some(a=>cl(s,o,a.ax,a.az,a.bx,a.bz).d<a.m);for(const s of t.acque){if(s.l<3||s.g||!s.p.some(([a,c])=>Math.hypot(a,c)<2e3))continue;const o=pp(s.p,2.5);for(const a of[1,-1]){let c=null;for(const l of o){const u=l.x-l.uz*(s.l/2)*a,f=l.z+l.ux*(s.l/2)*a;if(r(l.x,l.z)){c=null;continue}c&&i.aggiungiSegmento(c[0],c[1],u,f,"acqua"),c=[u,f]}}}}const Gp=Object.freeze({stop:[.08,"palo"],precedenza:[.08,"palo"],fermata:[.08,"palo"],semaforo:[.1,"palo"],fontanella:[.25,"palo"],fontana:[1.85,"basso"],monumento:[1.6,"muro"],stele:[.6,"muro"]});function Jl(i,{esclusi:t=new Set,conParcheggi:e=!0}={}){const n=vp(),r=i.edifici.filter(d=>!t.has(d.id));for(const d of r){if(d.scatola??(d.scatola=rc(d.p)),d.u==="tettoia"){for(const[g,_]of d.p)n.aggiungiCerchio(g,_,.15,"palo");continue}n.aggiungiAnello(d.p,"muro",{edificio:d.id})}for(const[d,g,,_]of i.lampioni)_||n.aggiungiCerchio(d,g,Op,"palo");for(const[d,g,_]of i.arredi??[]){const m=Gp[d];m&&n.aggiungiCerchio(g,_,...m)}for(const[d,g,_]of i.alberi)Math.hypot(d,g)<Fp&&n.aggiungiCerchio(d,g,zp*_,"albero");Bp(n,i);const s=i.limite;n.aggiungiAnello([[-s,-s],[s,-s],[s,s],[-s,s]],"confine");const o=wp(i.strade),a=Rp(i.strade,o),c=e?Dp(i,o):[];for(const d of c)for(const g of Up(d,Np[d.modello].lungo))n.aggiungiCerchio(g.x,g.z,g.r,"auto");const l=Mp(i.strade),u=new Map;for(const d of i.edifici){const g=d.scatola??rc(d.p);for(let _=Math.floor(g.x0/40);_<=Math.floor(g.x1/40);_++)for(let m=Math.floor(g.z0/40);m<=Math.floor(g.z1/40);m++){const p=_*100003+m;u.has(p)||u.set(p,[]),u.get(p).push(d)}}const f=(d,g)=>(u.get(Math.floor(d/40)*100003+Math.floor(g/40))??[]).find(_=>Nh(d,g,_.p))??null;function h(d,g){const _=l.piuVicino(d,g,120);return _&&i.strade[_.seg.strada].n||null}return{dati:i,collisioni:n,viabilita:o,parcheggi:c,quota:a,grafo:l,edificioIn:f,viaVicina:h,edificioPerId:d=>i.edifici.find(g=>g.id===d)??null,centroEdificio:d=>al(d.p)}}const oi=1,kp=3.1,Hp=.2,Ql=.35,tu=4.5,Vp=.5,Wp=1.4,Xp=1.6,eu=5,Is=5,nu=9,qp=3.4,iu=2.5,jp=5.6,$p=1.25,ru=60,Yp=1.18,Zp=9.81,Kp=8.5,Jp=74,Qp=9,tm=8,No=20,ra=Object.freeze([Object.freeze({id:"anello",nome:"Anello della Circonvallazione",sottotitolo:"Via Circonvallazione · Via Vignone · Piazza San Rocco",giri:3,morbidezza:11,tappe:[[-120,280],[-259,281],[-367,144],[-324,-152],[-172,-195],[-86,-242],[-14,-268],[88,-101],[127,36],[210,180],[236,289],[138,292],[8,278]]}),Object.freeze({id:"sanrocco",nome:"Circuito di San Rocco",sottotitolo:"Via Carducci · Via Ticino · Via Vallazza · Via Novara",giri:4,morbidezza:11,tappe:[[150,-312],[370,-329],[373,-420],[150,-416],[-65,-413],[-20,-350],[3,-291]]}),Object.freeze({id:"triangolo",nome:"Triangolo delle Provinciali",sottotitolo:"Via Milano · Strada Provinciale · Via Novara",giri:2,morbidezza:12,tappe:[[30,-700],[150,-920],[367,-1367],[-100,-1460],[-600,-1487],[-642,-1425],[-300,-850],[-75,-458]]})]),Me=(i,t)=>(i%t+t)%t;function em(i){let t=!0,e=i.filter((n,r)=>r===0||Math.hypot(n.x-i[r-1].x,n.z-i[r-1].z)>.05);for(;t&&e.length>3;){t=!1;const n=[];for(let r=0;r<e.length;r++){const s=e[Me(r-1,e.length)],o=e[r],a=e[Me(r+1,e.length)],c=o.x-s.x,l=o.z-s.z,u=a.x-o.x,f=a.z-o.z,h=Math.hypot(c,l),d=Math.hypot(u,f);if(h>1e-6&&d>1e-6&&(c*u+l*f)/(h*d)<-.7){t=!0;continue}n.push(o)}e=n.filter((r,s)=>s===0||Math.hypot(r.x-n[s-1].x,r.z-n[s-1].z)>.05)}return e}function sa(i,t){const e=i.length,n=[];let r=0;for(let u=0;u<e;u++){const f=i[u],h=i[(u+1)%e],d=Math.hypot(h.x-f.x,h.z-f.z);n.push(d),r+=d}const s=Math.max(8,Math.round(r/t)),o=r/s,a=[];let c=0,l=0;for(let u=0;u<s;u++){const f=u*o;for(;l+n[c]<f&&c<e-1;)l+=n[c],c+=1;const h=n[c]>1e-9?(f-l)/n[c]:0,d=i[c],g=i[(c+1)%e];a.push({x:d.x+(g.x-d.x)*h,z:d.z+(g.z-d.z)*h})}return a}function su(i,t){const e=i.length,n=new Array(e);for(let r=0;r<e;r++){let s=0,o=0,a=0;for(let c=-t;c<=t;c++){const l=i[Me(r+c,e)],u=t+1-Math.abs(c);s+=l.x*u,o+=l.z*u,a+=u}n[r]={x:s/a,z:o/a}}return n}function nm(i,t){const e=t.length,n=s=>s.etichetta==="muro"||s.etichetta==="sponda",r=new Float64Array(e);for(let s=0;s<e;s++){const o=t[Me(s-1,e)],a=t[Me(s+1,e)],c=Math.hypot(a.x-o.x,a.z-o.z)||1,l=(a.z-o.z)/c,u=-(a.x-o.x)/c,f=i.collisioni.raggio(t[s].x,t[s].z,l,u,nu,n).distanza,h=i.collisioni.raggio(t[s].x,t[s].z,-l,-u,nu,n).distanza;Math.min(f,h)<qp&&(r[s]=Math.max(-iu,Math.min(iu,(f-h)/2)))}return t.map((s,o)=>{let a=0,c=0;for(let d=-14;d<=14;d++){const g=r[Me(o+d,e)],_=15-Math.abs(d);a+=g*_,c+=_}const l=a/c,u=t[Me(o-1,e)],f=t[Me(o+1,e)],h=Math.hypot(f.x-u.x,f.z-u.z)||1;return{x:s.x+(f.z-u.z)/h*l,z:s.z-(f.x-u.x)/h*l}})}function im(i,t){const e=i.grafo,n=t.map(([s,o])=>{let a=null;for(const c of e.nodi.values()){const l=Math.hypot(c.x-s,c.z-o);l<18&&c.archi.length>=3&&(!a||l<a.d)&&(a={d:l,n:c})}return a?{x:a.n.x,z:a.n.z,nodo:!0}:{x:s,z:o,nodo:!1}}),r=[];for(let s=0;s<n.length;s++){const o=e.percorso(n[s],n[(s+1)%n.length]);if(!o)throw new Error(`circuito: nessuna strada fra la tappa ${s} e la ${(s+1)%n.length}`);for(const a of o)r.push(a)}return em(r)}function rm(i,t){return Math.floor(i/No)*100003+Math.floor(t/No)}function oa(i,t){const e=im(i,t.tappe);let n=sa(e,oi);for(let w=0;w<2;w++)n=sa(su(n,t.morbidezza),oi);for(let w=0;w<2;w++)n=sa(su(nm(i,n),3),oi);const r=t.tappe[0];let s=0;for(let w=1;w<n.length;w++)Math.hypot(n[w].x-r[0],n[w].z-r[1])<Math.hypot(n[s].x-r[0],n[s].z-r[1])&&(s=w);n=n.slice(s).concat(n.slice(0,s));const o=n.length,a=new Float64Array(o),c=new Float64Array(o),l=new Float64Array(o),u=new Float64Array(o),f=new Float64Array(o),h=new Float64Array(o),d=new Float64Array(o);n.forEach((w,P)=>{a[P]=w.x,c[P]=w.z});let g=0;for(let w=0;w<o;w++)g+=Math.hypot(a[Me(w+1,o)]-a[w],c[Me(w+1,o)]-c[w]);for(let w=0;w<o;w++){const P=Me(w-1,o),F=Me(w+1,o),O=a[F]-a[P],K=c[F]-c[P],tt=Math.hypot(O,K)||1;l[w]=O/tt,u[w]=K/tt}const _=4;for(let w=0;w<o;w++){const P=Me(w-_,o),F=Me(w+_,o),O=Math.atan2(l[P],u[P]);let tt=Math.atan2(l[F],u[F])-O;for(;tt>Math.PI;)tt-=2*Math.PI;for(;tt<-Math.PI;)tt+=2*Math.PI;f[w]=tt/(2*_*oi)}const m=new Float64Array(o),p=new Float64Array(o),v=w=>w.etichetta!=="palo"&&w.etichetta!=="albero"&&w.etichetta!=="auto"&&w.etichetta!=="barriera"&&w.etichetta!=="basso",M=[new Float64Array(o),new Float64Array(o)],x=new Float64Array(o),b=[];for(let w=0;w<o;w++){const P=i.grafo.piuVicino(a[w],c[w],30),F=P?i.dati.strade[P.seg.strada].l:6,O=Math.max(kp,F/2+Hp);x[w]=F/2;const K=[1,-1].map((ut,dt)=>{const bt=i.collisioni.raggio(a[w],c[w],ut*u[w],-ut*l[w],O+tu,v);return M[dt][w]=bt.colpito?Math.min(O+tu,Math.max(Xp,bt.distanza-Vp)):O+Wp,bt.colpito?bt.distanza:1/0});(K[0]+K[1]<jp||Math.min(...K)<$p)&&(!b.length||w*oi-b[b.length-1]>5)&&b.push(w*oi)}const S=M.map(w=>Float64Array.from(w,(P,F)=>{let O=1/0;for(let K=-eu;K<=eu;K++)O=Math.min(O,w[Me(F+K,o)]);return O}));for(let w=0;w<o;w++){let P=0,F=0;for(let O=-Is;O<=Is;O++)P+=S[0][Me(w+O,o)],F+=S[1][Me(w+O,o)];m[w]=P/(2*Is+1),p[w]=F/(2*Is+1),h[w]=Math.min(m[w],p[w])}const A=new Map;for(let w=0;w<o;w++){const P=rm(a[w],c[w]);A.has(P)||A.set(P,[]),A.get(P).push(w)}const T=(w,P,F=0)=>{const O=Math.floor(w/No),K=Math.floor(P/No);for(let tt=O-1;tt<=O+1;tt++)for(let ut=K-1;ut<=K+1;ut++)for(const dt of A.get(tt*100003+ut)??[]){const bt=w-a[dt],J=P-c[dt];if(Math.abs(bt*l[dt]+J*u[dt])>.75)continue;const it=bt*u[dt]-J*l[dt];if(it<m[dt]+F&&it>-p[dt]-F)return!0}return!1},y=[];for(const w of[1,-1]){let P=null;const F=w>0?m:p;for(let O=0;O<=o;O++){const K=O%o,tt=F[K]+Ql,ut=a[K]+w*u[K]*tt,dt=c[K]-w*l[K]*tt;if(i.edificioIn(ut,dt)===null&&!T(ut,dt,Ql*.5)){P||(P={lato:w,punti:[]},y.push(P));const J=P.punti[P.punti.length-1];(!J||Math.hypot(J[0]-ut,J[1]-dt)>.9||O===o)&&P.punti.push([ut,dt])}else P=null}}const E=y.filter(w=>w.punti.length>=2);for(let w=0;w<o;w++)d[w]=Math.min(Jp,Math.sqrt(Yp*Zp/Math.max(1e-4,Math.abs(f[w]))));for(let w=0;w<2;w++)for(let P=o-1;P>=0;P--){const F=P,O=d[Me(F+1,o)];d[F]=Math.min(d[F],Math.sqrt(O*O+2*Kp*oi))}const R=[];for(let w=0;w<12;w++){const P=-(Qp+w*(tm/2)),F=Me(Math.round(P/oi),o),O=w%2===0?1:-1,K=Math.min(Math.min(O>0?m[F]:p[F],Math.max(x[F],2.6))*.55,2.3);R.push({x:a[F]+O*u[F]*K,z:c[F]-O*l[F]*K,yaw:Math.atan2(l[F],u[F]),s:Me(F,o)*(g/o)})}const D=g/o;function N(w,P,F=null){let O=-1,K=1/0;if(F!==null){const _t=Math.round(F/D);for(let ft=-ru;ft<=ru;ft++){const At=Me(_t+ft,o),Rt=(a[At]-w)**2+(c[At]-P)**2;Rt<K&&(K=Rt,O=At)}}if(O<0||K>900)for(let _t=0;_t<o;_t++){const ft=(a[_t]-w)**2+(c[_t]-P)**2;ft<K&&(K=ft,O=_t)}const tt=O,ut=w-a[tt],dt=P-c[tt],bt=ut*l[tt]+dt*u[tt],J=ut*u[tt]-dt*l[tt];let it=tt*D+bt;return it<0&&(it+=g),it>=g&&(it-=g),{i:tt,s:it,laterale:J,distanza:Math.sqrt(K)}}function U(w){const P=(w%g+g)%g/D,F=Math.floor(P)%o,O=(F+1)%o,K=P-Math.floor(P);return{x:a[F]+(a[O]-a[F])*K,z:c[F]+(c[O]-c[F])*K,tx:l[F]+(l[O]-l[F])*K,tz:u[F]+(u[O]-u[F])*K,curva:f[F]+(f[O]-f[F])*K,mezza:h[F]+(h[O]-h[F])*K,sinistra:m[F]+(m[O]-m[F])*K,destra:p[F]+(p[O]-p[F])*K,velocita:d[F]+(d[O]-d[F])*K}}return{id:t.id,nome:t.nome,sottotitolo:t.sottotitolo,giri:t.giri,n:o,passo:D,lunghezza:g,x:a,z:c,tx:l,tz:u,curva:f,mezza:h,sinistra:m,destra:p,velocita:d,barriere:E,strozzature:b,griglia:R,vicino:N,punto:U,nelCorridoio:T}}function Oo(i){const t=i.lunghezza/3;return{s:0,giro:0,settore:0,contrario:0,aggiorna(e,n,r,s=0){const o=this.s,a=i.vicino(e,n,this.s);let c=a.s-o;c<-i.lunghezza/2&&(c+=i.lunghezza),c>i.lunghezza/2&&(c-=i.lunghezza),this.s=a.s,this.contrario=s<-2?this.contrario+r:Math.max(0,this.contrario-r*2);const l=Math.floor(a.s/t);let u=!1;return c>0&&o>i.lunghezza-40&&a.s<40?(this.settore===2&&(this.giro+=1,u=!0),this.settore=0):c<0&&o<40&&a.s>i.lunghezza-40?this.giro>0&&this.settore===0&&(this.giro-=1,this.settore=2):l===this.settore+1&&(this.settore=l),{...a,giroFatto:u,ds:c}},get totale(){return this.giro*i.lunghezza+this.s}}}const sm=.8,om=1.5,am=new Set(["strisce","linea"]);function ou(i,t){for(const e of i.collisioni.segmenti){if(e.etichetta!=="acqua"||!e.attivo)continue;const n=(e.ax+e.bx)/2,r=(e.az+e.bz)/2;t.some(s=>s.nelCorridoio(n,r,om))&&(e.attivo=!1)}}function cm(i){const t=Jl(i,{conParcheggi:!1});ou(t,ra.map(l=>oa(t,l)));const e=ra.map(l=>oa(t,l)),n=(l,u)=>e.some(f=>f.nelCorridoio(l,u,sm)),r={lampioni:i.lampioni.length,alberi:i.alberi.length,arredi:(i.arredi??[]).length};i.lampioni=i.lampioni.filter(([l,u])=>!n(l,u)),i.alberi=i.alberi.filter(([l,u])=>!n(l,u)),i.arredi=(i.arredi??[]).filter(([l,u,f])=>am.has(l)||!n(u,f)),r.lampioni-=i.lampioni.length,r.alberi-=i.alberi.length,r.arredi-=i.arredi.length;const s=Jl(i,{conParcheggi:!1});ou(s,e);const o=ra.map(l=>oa(s,l)),a=o.map(l=>l.barriere.flatMap(u=>u.punti.slice(1).map((f,h)=>{const d=s.collisioni.aggiungiSegmento(u.punti[h][0],u.punti[h][1],f[0],f[1],"barriera");return d.attivo=!1,d})));let c=-1;return{citta:s,piste:o,tolti:r,get attiva(){return c},attivaPista(l){c=l,a.forEach((u,f)=>{for(const h of u)h.attivo=f===l})}}}const Oh=9.81,st=Object.freeze({massa:1280,inerzia:2100,avanti:1.35,dietro:1.45,altezza:.4,raggioRuota:.384,aderenza:1.2,rigidezza:9.5,forma:1.7,aria:.42,deportanza:.5,rotolamento:16,rapporti:Object.freeze([-3.3,3.15,2.2,1.68,1.34,1.1,.9]),finale:4.35,rendimento:.86,coppiaMassima:520,giriPicco:5e3,giriMinimo:950,giriMassimo:7800,cambioSu:7400,cambioGiu:3500,tempoCambio:.11,frenoMassimo:16500,ripartizione:.63,sterzoMassimo:.6,angoloPicco:.11,lunghezza:4.34,larghezza:2.1,baricentroModello:.135,raggioUrto:1.02,centriUrto:Object.freeze([-1.05,.1,1.24])}),lm=240,au=.3,um=.72,cu=.94,aa=.9,lu=.72,ca=.1,fm=7e3,hm=5.5,dm=18,pm=3.6;function ll(i=0,t=0,e=0){return{x:i,z:t,yaw:e,vx:0,vz:0,w:0,sterzo:0,angoloSterzo:0,marcia:1,rpm:st.giriMinimo,cambio:0,ax:0,ay:0,pattina:0,sbanda:0,bloccate:0,gas:0,freno:0,mano:0,ruote:0,urto:0,urtoX:0,urtoZ:0,scia:0,fermo:!1,aiuti:!0}}const uu=i=>({x:Math.sin(i.yaw),z:Math.cos(i.yaw)}),jo=i=>i.vx*Math.sin(i.yaw)+i.vz*Math.cos(i.yaw);function mm(i){const t=Math.min(Math.max(i,st.giriMinimo),st.giriMassimo),e=(t-st.giriPicco)/(t>st.giriPicco?5600:4200);return st.coppiaMassima*Math.max(.35,1-e*e)}function sc(i,t){return Math.abs(i)/st.raggioRuota*Math.abs(st.rapporti[t])*st.finale*(60/(2*Math.PI))}function fu(i){return Math.sin(st.forma*Math.atan(st.rigidezza*i))}function zh(i){const t=st.avanti+st.dietro;return Math.min(st.sterzoMassimo,st.angoloPicco+t*st.aderenza*Oh/Math.max(1,i*i))}function gm(i,t,e){if(i.marcia===0||i.cambio>0)return;const n=sc(t,i.marcia);if(n>st.cambioSu&&i.marcia<st.rapporti.length-1&&t>0){i.marcia+=1,i.cambio=st.tempoCambio;return}if(i.marcia>1){const r=sc(t,i.marcia-1),s=e>.5?st.cambioGiu+1200:st.cambioGiu;n<s&&r<st.cambioSu-600&&(i.marcia-=1,i.cambio=st.tempoCambio*.7)}}function _m(i,t,e){const n=Math.min(1,Math.max(0,t.gas??0)),r=Math.min(1,Math.max(0,t.freno??0));return i.marcia===0?n>.1?e<-.8?{acceleratore:0,frena:n}:(i.marcia=1,{acceleratore:n,frena:0}):{acceleratore:r,frena:0}:r>.1&&n<.1&&e<.6?(i.marcia=0,{acceleratore:r,frena:0}):{acceleratore:n,frena:r}}function xm(i,t,e){const n=Math.sin(i.yaw),r=Math.cos(i.yaw),s=r,o=-n,a=i.vx*n+i.vz*r;let c=i.vx*s+i.vz*o;const l=Math.hypot(i.vx,i.vz),u=st.avanti+st.dietro,{acceleratore:f,frena:h}=i.fermo?{acceleratore:0,frena:1}:_m(i,t,a),d=i.fermo||!!t.mano,g=Math.max(-1,Math.min(1,t.sterzo??0));if(t.analogico)i.sterzo+=(g-i.sterzo)*Math.min(1,e*18);else{const Gt=(g===0||Math.sign(g)!==Math.sign(i.sterzo)?hm:pm)*e,zt=g-i.sterzo;i.sterzo+=Math.abs(zt)<=Gt?zt:Math.sign(zt)*Gt}const _=-i.sterzo*zh(Math.abs(a));i.angoloSterzo=_,i.cambio>0&&(i.cambio=Math.max(0,i.cambio-e)),gm(i,a,f);const m=st.deportanza*l*l,p=st.massa*Oh,v=st.massa*i.ax*st.altezza/u,M=Math.max(p*.12,p*st.dietro/u-v+m*.45),x=Math.max(p*.12,p*st.avanti/u+v+m*.55),b=st.aderenza*M,S=st.aderenza*x;let T=sc(a,i.marcia);(i.marcia===1||i.marcia===0)&&(T=Math.max(T,Math.min(st.giriMassimo,st.giriMinimo+300+f*3200*Math.max(0,1-Math.abs(a)/9)))),T=Math.max(st.giriMinimo,T);let y=0;if(i.cambio<=0){const Dt=i.marcia===0?-1:1,Gt=T>=st.giriMassimo?0:mm(T)*f*(i.marcia===0?.45:1),zt=f<.05&&h<.05?-(28+T*.012)*Math.sign(a):0;y=(Gt*Dt+zt)*Math.abs(st.rapporti[i.marcia])*st.finale*st.rendimento/st.raggioRuota}const E=Math.min(1,Math.abs(i.ay)/5+Math.abs(i.w)*1.5+Math.abs(i.sterzo)*.6),R=S*(i.aiuti?cu-(cu-um)*E:.98);i.pattina=Math.abs(y)>R?Math.min(1,(Math.abs(y)-R)/R):0,i.pattina>0&&(T=Math.min(st.giriMassimo,T+i.pattina*1800)),y=Math.max(-R,Math.min(R,y));const D=a>=0?1:-1;let N=Math.min(h*st.frenoMassimo*st.ripartizione,b*aa),U=Math.min(h*st.frenoMassimo*(1-st.ripartizione),S*(i.aiuti?lu:aa));U=Math.min(U,Math.max(0,S*(i.aiuti?lu:aa)-Math.abs(y))),d&&(U=S*.92),Math.abs(a)<.25&&(N=0,U=0);const w=Math.max(Math.abs(a),3),P=Math.atan2(c+st.avanti*i.w,w)-_*D,F=Math.atan2(c-st.dietro*i.w,w),O=Math.abs(y)+U,K=Math.min(.99,N/b),tt=Math.min(.99,O/S);let ut=-b*fu(P)*Math.sqrt(1-K*K),dt=-S*fu(F)*Math.sqrt(1-tt*tt)*(d?.42:1);d&&Math.abs(a)>3&&(dt*=.85);const bt=st.aria*l+st.rotolamento;let J=y-(N+U)*D-ut*Math.sin(_)-bt*a,it=ut*Math.cos(_)+dt-bt*c*.2,_t=st.avanti*ut*Math.cos(_)-st.dietro*dt;if(i.aiuti&&Math.abs(a)>8&&!d){const Dt=a*Math.tan(_)/(u*(1+a*a/900)),Gt=i.w-Dt;Math.abs(Gt)>ca&&(_t-=Math.sign(Gt)*Math.min(fm,(Math.abs(Gt)-ca)*22e3),y>0&&(J-=y*Math.min(.6,(Math.abs(Gt)-ca)*2)))}const ft=J/st.massa,At=it/st.massa;i.ax+=(ft-i.ax)*Math.min(1,e*8),i.ay+=(At-i.ay)*Math.min(1,e*8),i.vx+=(J*n+it*s)/st.massa*e,i.vz+=(J*r+it*o)/st.massa*e,i.w+=_t/st.inerzia*e;const Rt=Math.hypot(i.vx,i.vz);if(Rt<3){const Dt=i.vx*n+i.vz*r,Gt=Math.max(0,Math.min(1,(Rt-.6)/2.4)),zt=Dt*Math.tan(_)/u;i.w=zt+(i.w-zt)*Gt,c=(i.vx*s+i.vz*o)*Gt,i.vx=n*Dt+s*c,i.vz=r*Dt+o*c,Rt<.35&&f<.05&&(i.vx=0,i.vz=0,i.w=0)}i.yaw+=i.w*e,i.x+=i.vx*e,i.z+=i.vz*e,i.rpm+=(T-i.rpm)*Math.min(1,e*14),i.gas=f,i.freno=h,i.mano=d?1:0,i.ruote+=a/st.raggioRuota*e*(i.pattina>0?1+i.pattina*2:1),i.sbanda=Math.max(Math.abs(Math.sin(F))*Math.min(1,Math.abs(a)/6),Math.abs(Math.sin(P))*.8*Math.min(1,Math.abs(a)/6)),i.bloccate=d&&Math.abs(a)>2?1:0}function oc(i){const t=Math.sin(i.yaw),e=Math.cos(i.yaw);return st.centriUrto.map(n=>({x:i.x+t*n,z:i.z+e*n,ox:t*n,oz:e*n,r:st.raggioUrto}))}function Fh(i,t,e,n,r,s=1/0,o=0,a=0){const c=i.vx+i.w*e,l=i.vz-i.w*t,u=(c-o)*n+(l-a)*r;if(u>=0)return 0;const f=e*n-t*r,h=1/st.massa+f*f/st.inerzia+(Number.isFinite(s)?1/s:0),d=-1.22*u/h;i.vx+=d*n/st.massa,i.vz+=d*r/st.massa,i.w+=f*d/st.inerzia;const g=-r,_=n,m=(c-o)*g+(l-a)*_,p=e*g-t*_,v=1/st.massa+p*p/st.inerzia,M=Math.max(-au*d,Math.min(au*d,-m/v));return i.vx+=M*g/st.massa,i.vz+=M*_/st.massa,i.w+=p*M/st.inerzia,-u}function vm(i,t,e=null){let n=0;for(const r of oc(i)){const s=t.respingi(r.x,r.z,r.r,e);if(!s.urto)continue;const o=s.x-r.x,a=s.z-r.z,c=Math.hypot(o,a);if(c<1e-6)continue;i.x+=o,i.z+=a;const l=Fh(i,r.ox,r.oz,o/c,a/c);l>n&&(n=l,i.urtoX=r.x+o/c*-r.r,i.urtoZ=r.z+a/c*-r.r)}return n>i.urto&&(i.urto=n),n}function ac(i,t,e=!1){if(Math.abs(i.x-t.x)>6||Math.abs(i.z-t.z)>6)return 0;let n=0;const r=oc(i),s=oc(t);for(const o of r)for(const a of s){const c=o.x-a.x,l=o.z-a.z,u=Math.hypot(c,l),f=o.r+a.r;if(u>=f||u<1e-6)continue;const h=c/u,d=l/u,g=f-u;e?(i.x+=h*g*.6,i.z+=d*g*.6):(i.x+=h*g*.5,i.z+=d*g*.5,t.x-=h*g*.5,t.z-=d*g*.5);const _=t.vx+t.w*a.oz,m=t.vz-t.w*a.ox,p={vx:i.vx,vz:i.vz,w:i.w},v=Fh(i,o.ox,o.oz,h,d,st.massa,_,m);if(!e&&v>0){const M=i.vx-p.vx,x=i.vz-p.vz;t.vx-=M,t.vz-=x;const b=a.oz*-h-a.ox*-d;t.w+=b*Math.hypot(M,x)*st.massa/st.inerzia}v>n&&(n=v,i.urtoX=(o.x+a.x)/2,i.urtoZ=(o.z+a.z)/2)}return n>i.urto&&(i.urto=n),!e&&n>t.urto&&(t.urto=n),n}function Bh(i,t){const e=uu(i);let n=0;if(i.vx*e.x+i.vz*e.z<dm)return i.scia*=.9,i.scia;for(const r of t){if(r===i)continue;const s=r.x-i.x,o=r.z-i.z,a=s*e.x+o*e.z;if(a<3||a>28)continue;const c=Math.abs(s*e.z-o*e.x);if(c>1.6)continue;const l=uu(r);l.x*e.x+l.z*e.z<.85||(n=Math.max(n,(1-(a-3)/25)*(1-c/1.6)))}return i.scia+=(n-i.scia)*.1,i.scia}function Gh(i,t,e,{collisioni:n=null,filtro:r=null}={}){const s=Math.max(1,Math.round(e*lm)),o=e/s;let a=0;i.urto=0;const c=i.scia;for(let l=0;l<s;l++){if(c>.01){const u=Math.hypot(i.vx,i.vz),f=st.aria*c*.4*u*o/st.massa;i.vx+=i.vx*f,i.vz+=i.vz*f}xm(i,t,o),n&&(a=Math.max(a,vm(i,n,r)))}return a}function ss(i,t,e,n){Object.assign(i,{x:t,z:e,yaw:n,vx:0,vz:0,w:0,sterzo:0,marcia:1,cambio:0,ax:0,ay:0,pattina:0,sbanda:0,rpm:st.giriMinimo})}const hu=1.35,Mm=7,ym=.5,Sm=st.avanti+st.dietro,Em=.38,bm=26,du=2.2,pu=1.1,Am=3,Tm=7;function wm(i=.95,t=0){return{abilita:i,corsia:t,scarto:t,incastrato:0,retro:0,fermo:0,aggira:0}}function Rm(i,t,e,n){let r=0,s=0;for(let o=e;o<=n;o+=3)r+=i.punto(t+o).curva,s+=1;return r/Math.max(1,s)}function kh(i,t,e,n,r,s){const o=jo(t),a=n.s;if(i.fermo=Math.abs(o)<1?i.fermo+s:0,i.aggira>0&&(i.aggira-=s),i.retro>0)return i.retro-=s,{gas:0,freno:1,sterzo:0,analogico:!0};const c=Mm+Math.max(0,o)*ym,l=e.punto(a+c),u=Rm(e,a,-6,12),f=Math.max(0,l.sinistra-hu),h=Math.max(0,l.destra-hu),d=Math.max(-1,Math.min(1,u*30));let g=i.corsia*.25*(f+h)*.5+d*(d>0?f:h)*Em;const _=Math.sin(t.yaw),m=Math.cos(t.yaw);let p=1/0;for(const O of r){if(O===t)continue;const K=O.x-t.x,tt=O.z-t.z,ut=K*_+tt*m;if(ut<1||ut>bm)continue;const dt=K*m-tt*_,bt=O.vx*_+O.vz*m;Math.abs(dt)<2.6&&bt<o+1.5&&(g=(dt>0?-1:1)>0?Math.min(f,g+3.2):Math.max(-h,g-3.2),ut<9&&Math.abs(dt)<2&&i.aggira<=0&&(p=Math.min(p,Math.max(bt-1,0))))}g=Math.max(-h,Math.min(f,g)),i.scarto+=(g-i.scarto)*Math.min(1,s*1.6);const v=l.tz,M=-l.tx,x=l.x+v*i.scarto,b=l.z+M*i.scarto,S=x-t.x,A=b-t.z,T=S*_+A*m,y=S*m-A*_,E=Math.atan2(y,Math.max(.5,T)),R=Math.max(1,Math.hypot(S,A)),D=Math.atan2(2*Sm*Math.sin(E),R),N=Math.max(-1,Math.min(1,-D/zh(Math.abs(o)))),U=e.punto(a+1.5+Math.max(0,o)*.12).velocita;let w=Math.min(U*i.abilita,p);n.contrario>.5&&(w=8);let P=Math.max(0,Math.min(1,(w-o)*.4+.1)),F=Math.max(0,Math.min(1,(o-w)*.55));return F>.05&&(P=0),o<1.2&&(P>.3||p<2)?i.incastrato+=s:i.incastrato=Math.max(0,i.incastrato-s*2),i.incastrato>du&&p<2&&(i.incastrato=0,i.aggira=Am,i.retro=pu*.6),i.incastrato>du&&(i.incastrato=0,i.retro=pu),Math.abs(N)>.85&&o>25&&(P*=.6),{gas:P,freno:F,sterzo:N,mano:!1,analogico:!0}}const Cm=8,Qe=Object.freeze({prove:35,provePronti:3,partenza:4,luce:.9,arrivo:16,distaccoUltimi:45}),Im=Object.freeze(["Pino Saetta","Lia Rombo","Dino Curva","Sara Fulmine","Elio Scia","Mirko Lampo","Ugo Turbo","Tina Freccia","Nando Sterzo","Vera Scintilla"]),la=10,mu=(i,t,e)=>i===0&&t>e/2?t-e:i*e+t,Pm=(i,t)=>i.entrata-t.entrata||(i.id<t.id?-1:1);function Lm({piste:i,caso:t=Math.random,primaPista:e=0}){const n={fase:"prove",tempo:0,pista:e%i.length,luci:0,attesaVia:0,cronometro:0,numero:1,primoArrivo:null},r=new Map;let s=0,o=[],a=[];const c=[],l=()=>i[n.pista],u=b=>!b.spettatore,f=()=>[...r.values()].filter(b=>!b.ia).sort(Pm);function h(b){const S=new Set([...r.values()].map(w=>w.livrea));let A=Math.floor(t()*la);for(let w=0;w<la&&S.has(A);w++)A=(A+1)%la;const T=new Set([...r.values()].map(w=>w.nome)),y=Im.find(w=>!T.has(w))??`Pilota ${b}`,E=`ia-${b}`,R={id:E,nome:y,livrea:A,ia:!0,entrata:s++,posto:0,spettatore:!1,auto:ll(),pilota:wm(.9+t()*.09,t()*2-1),contagiri:null,giro:0,s:0,totale:0,arrivo:null,migliore:null,ultimo:null,inizioGiro:0,pronto:!0};r.set(E,R);const D=i[n.pista],N=new Set([...r.values()].filter(w=>w!==R&&!w.spettatore).map(w=>w.posto));R.posto=Math.max(0,D.griglia.findIndex((w,P)=>!N.has(P)));const U=D.griglia[R.posto];return ss(R.auto,U.x,U.z,U.yaw),R.contagiri=Oo(D),R.contagiri.s=U.s,R.s=U.s,R.totale=U.s-D.lunghezza,R.auto.fermo=n.fase==="partenza",R}function d(){const b=f().filter(u).length,S=[...r.values()].filter(T=>T.ia),A=Math.max(0,Cm-b);for(let T=S.length;T>A;T--)r.delete(S[T-1].id);for(let T=S.length;T<A;T++){let y=0;for(;r.has(`ia-${y}`);)y+=1;h(y)}}function g(){const b=l();[...r.values()].filter(u).map(T=>({x:T,k:t()})).sort((T,y)=>T.k-y.k).map(T=>T.x).forEach((T,y)=>{T.posto=y,T.giro=0,T.arrivo=null,T.migliore=null,T.ultimo=null,T.inizioGiro=0;const E=b.griglia[y];T.s=E.s,T.totale=E.s-b.lunghezza,T.ia&&(ss(T.auto,E.x,E.z,E.yaw),T.contagiri=Oo(b),T.contagiri.s=E.s,T.pilota.scarto=0)})}function _(b){if(n.fase=b,n.tempo=0,b==="prove"){for(const S of r.values())S.spettatore=!1;d(),g();for(const S of r.values())S.pronto=S.ia,S.ia&&(S.auto.fermo=!1)}if(b==="partenza"){d(),g(),n.luci=0,n.attesaVia=.4+t()*1.4;for(const S of r.values())S.ia&&(S.auto.fermo=!0)}if(b==="gara"){n.cronometro=0,n.primoArrivo=null;for(const S of r.values())S.ia&&(S.auto.fermo=!1)}b==="arrivo"&&(a=o.map(S=>({id:S.id,nome:S.nome,livrea:S.livrea,ia:S.ia,arrivo:S.arrivo,giro:S.giro,migliore:S.migliore}))),c.push({k:"fase",fase:b,pista:n.pista,numero:n.numero})}function m(){o=[...r.values()].filter(u).sort((S,A)=>S.arrivo!==null&&A.arrivo!==null?S.arrivo-A.arrivo:S.arrivo!==null?-1:A.arrivo!==null?1:A.totale-S.totale)}function p(b,S){if(!S.giroFatto||n.fase!=="gara")return;const A=n.cronometro-b.inizioGiro;b.ultimo=A,(b.migliore===null||A<b.migliore)&&(b.migliore=A),b.inizioGiro=n.cronometro,b.giro=b.contagiri.giro,b.giro>=l().giri&&b.arrivo===null&&v(b)}function v(b){b.arrivo=n.cronometro,n.primoArrivo===null&&(n.primoArrivo=n.cronometro),c.push({k:"arrivo",id:b.id,tempo:b.arrivo})}function M(b,{collisioni:S,altre:A}){const T=l(),y=[...r.values()].filter(R=>R.ia&&u(R)),E=[...y.map(R=>R.auto),...A];for(const R of y){if(!R.contagiri)continue;const D=n.fase==="arrivo"&&R.arrivo!==null?{gas:0,freno:.3,sterzo:0}:kh(R.pilota,R.auto,T,R.contagiri,E,b);R.arrivo!==null&&n.fase==="gara"&&(D.gas=Math.min(D.gas,.35)),Bh(R.auto,E),Gh(R.auto,D,b,{collisioni:S});const N=R.contagiri.aggiorna(R.auto.x,R.auto.z,b,R.auto.vx*Math.sin(R.auto.yaw)+R.auto.vz*Math.cos(R.auto.yaw));if(N.distanza>Math.max(T.sinistra[N.i],T.destra[N.i])+6||R.pilota.fermo>Tm&&n.fase!=="arrivo"){const U=T.punto(R.contagiri.s);ss(R.auto,U.x,U.z,Math.atan2(U.tx,U.tz)),R.pilota.fermo=0,R.pilota.aggira=2}R.s=R.contagiri.s,R.totale=mu(R.contagiri.giro,R.contagiri.s,T.lunghezza),p(R,N)}for(let R=0;R<y.length;R++){for(let D=R+1;D<y.length;D++)ac(y[R].auto,y[D].auto);for(const D of A)ac(y[R].auto,D,!0)}}function x(b,S={collisioni:null,altre:[]}){n.tempo+=b;const A=f();if(n.fase==="prove")A.length>0&&A.every(y=>y.pronto)&&n.tempo<Qe.prove-Qe.provePronti&&(n.tempo=Qe.prove-Qe.provePronti),n.tempo>=Qe.prove&&_("partenza");else if(n.fase==="partenza")n.luci=Math.max(0,Math.min(5,Math.floor((n.tempo-Qe.partenza+5*Qe.luce)/Qe.luce))),n.tempo>=Qe.partenza+n.attesaVia&&(n.luci=0,_("gara"));else if(n.fase==="gara"){n.cronometro+=b;const T=A.filter(u),y=T.length>0&&T.every(D=>D.arrivo!==null),E=n.primoArrivo!==null&&n.cronometro-n.primoArrivo>Qe.distaccoUltimi,R=[...r.values()].filter(u).every(D=>D.arrivo!==null);(y||E||R||T.length===0)&&_("arrivo")}else n.fase==="arrivo"&&n.tempo>=Qe.arrivo&&(n.pista=(n.pista+1)%i.length,n.numero+=1,_("prove"));return n.fase!=="partenza"&&M(b,S),m(),c.splice(0)}return{stato:n,partecipanti:r,get classifica(){return o},get risultati(){return a},get pista(){return l()},aggiungi(b,S,A){if(r.has(b))return r.get(b);const T={id:b,nome:S,livrea:A,ia:!1,entrata:s++,posto:0,spettatore:n.fase==="partenza"||n.fase==="gara",giro:0,s:0,totale:0,arrivo:null,migliore:null,ultimo:null,pronto:!1};if(r.set(b,T),!T.spettatore){d();const y=new Set(l().griglia.map((R,D)=>D));for(const R of r.values())R!==T&&!R.spettatore&&y.delete(R.posto);T.posto=[...y][0]??0;const E=l().griglia[T.posto];T.s=E.s}return c.push({k:"entra",id:b,nome:S}),T},togli(b){const S=r.get(b);!S||S.ia||(r.delete(b),n.fase==="prove"&&d(),c.push({k:"esce",id:b,nome:S.nome}))},aggiornaUmano(b,S){const A=r.get(b);!A||A.ia||(typeof S.pronto=="boolean"&&(A.pronto=S.pronto),!A.spettatore&&(A.s=S.s,A.giro=S.giro,A.totale=mu(A.giro,S.s,l().lunghezza),S.migliore!==null&&S.migliore!==void 0&&(A.migliore=S.migliore),n.fase==="gara"&&A.arrivo===null&&A.giro>=l().giri&&v(A),A.auto=S.auto??A.auto))},passo:x,cambiaFase:_}}/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const ul="170",Dm=0,gu=1,Um=2,fl=1,Nm=2,Xn=3,ti=0,We=1,He=2,_i=0,pr=1,zo=2,_u=3,xu=4,Om=5,Li=100,zm=101,Fm=102,Bm=103,Gm=104,km=200,Hm=201,Vm=202,Wm=203,cc=204,lc=205,Xm=206,qm=207,jm=208,$m=209,Ym=210,Zm=211,Km=212,Jm=213,Qm=214,uc=0,fc=1,hc=2,Mr=3,dc=4,pc=5,mc=6,gc=7,Hh=0,t0=1,e0=2,xi=0,n0=1,i0=2,r0=3,Vh=4,s0=5,o0=6,a0=7,vu="attached",c0="detached",Wh=300,yr=301,Sr=302,_c=303,xc=304,$o=306,an=1e3,Cn=1001,Fo=1002,Xe=1003,Xh=1004,Qr=1005,Pe=1006,vo=1007,En=1008,ei=1009,qh=1010,jh=1011,ms=1012,hl=1013,zi=1014,$e=1015,Yn=1016,dl=1017,pl=1018,Er=1020,$h=35902,Yh=1021,Zh=1022,on=1023,Kh=1024,Jh=1025,mr=1026,br=1027,ml=1028,gl=1029,Qh=1030,_l=1031,xl=1033,Mo=33776,yo=33777,So=33778,Eo=33779,vc=35840,Mc=35841,yc=35842,Sc=35843,Ec=36196,bc=37492,Ac=37496,Tc=37808,wc=37809,Rc=37810,Cc=37811,Ic=37812,Pc=37813,Lc=37814,Dc=37815,Uc=37816,Nc=37817,Oc=37818,zc=37819,Fc=37820,Bc=37821,bo=36492,Gc=36494,kc=36495,td=36283,Hc=36284,Vc=36285,Wc=36286,gs=2300,_s=2301,ua=2302,Mu=2400,yu=2401,Su=2402,l0=2500,u0=0,ed=1,Xc=2,f0=3200,h0=3201,nd=0,d0=1,Mn="",ae="srgb",ze="srgb-linear",Yo="linear",oe="srgb",Yi=7680,Eu=519,p0=512,m0=513,g0=514,id=515,_0=516,x0=517,v0=518,M0=519,qc=35044,ts=35048,bu="300 es",Zn=2e3,Bo=2001;class Ir{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const r=this._listeners[t];if(r!==void 0){const s=r.indexOf(e);s!==-1&&r.splice(s,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const r=n.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,t);t.target=null}}}const Ue=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Au=1234567;const os=Math.PI/180,Ar=180/Math.PI;function bn(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ue[i&255]+Ue[i>>8&255]+Ue[i>>16&255]+Ue[i>>24&255]+"-"+Ue[t&255]+Ue[t>>8&255]+"-"+Ue[t>>16&15|64]+Ue[t>>24&255]+"-"+Ue[e&63|128]+Ue[e>>8&255]+"-"+Ue[e>>16&255]+Ue[e>>24&255]+Ue[n&255]+Ue[n>>8&255]+Ue[n>>16&255]+Ue[n>>24&255]).toLowerCase()}function Le(i,t,e){return Math.max(t,Math.min(e,i))}function vl(i,t){return(i%t+t)%t}function y0(i,t,e,n,r){return n+(i-t)*(r-n)/(e-t)}function S0(i,t,e){return i!==t?(e-i)/(t-i):0}function as(i,t,e){return(1-e)*i+e*t}function E0(i,t,e,n){return as(i,t,1-Math.exp(-e*n))}function b0(i,t=1){return t-Math.abs(vl(i,t*2)-t)}function A0(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function T0(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function w0(i,t){return i+Math.floor(Math.random()*(t-i+1))}function R0(i,t){return i+Math.random()*(t-i)}function C0(i){return i*(.5-Math.random())}function I0(i){i!==void 0&&(Au=i);let t=Au+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function P0(i){return i*os}function L0(i){return i*Ar}function D0(i){return(i&i-1)===0&&i!==0}function U0(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function N0(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function O0(i,t,e,n,r){const s=Math.cos,o=Math.sin,a=s(e/2),c=o(e/2),l=s((t+n)/2),u=o((t+n)/2),f=s((t-n)/2),h=o((t-n)/2),d=s((n-t)/2),g=o((n-t)/2);switch(r){case"XYX":i.set(a*u,c*f,c*h,a*l);break;case"YZY":i.set(c*h,a*u,c*f,a*l);break;case"ZXZ":i.set(c*f,c*h,a*u,a*l);break;case"XZX":i.set(a*u,c*g,c*d,a*l);break;case"YXY":i.set(c*d,a*u,c*g,a*l);break;case"ZYZ":i.set(c*g,c*d,a*u,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function yn(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function re(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const z0={DEG2RAD:os,RAD2DEG:Ar,generateUUID:bn,clamp:Le,euclideanModulo:vl,mapLinear:y0,inverseLerp:S0,lerp:as,damp:E0,pingpong:b0,smoothstep:A0,smootherstep:T0,randInt:w0,randFloat:R0,randFloatSpread:C0,seededRandom:I0,degToRad:P0,radToDeg:L0,isPowerOfTwo:D0,ceilPowerOfTwo:U0,floorPowerOfTwo:N0,setQuaternionFromProperEuler:O0,normalize:re,denormalize:yn};class Wt{constructor(t=0,e=0){Wt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6],this.y=r[1]*e+r[4]*n+r[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Le(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),r=Math.sin(e),s=this.x-t.x,o=this.y-t.y;return this.x=s*n-o*r+t.x,this.y=s*r+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Vt{constructor(t,e,n,r,s,o,a,c,l){Vt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,r,s,o,a,c,l)}set(t,e,n,r,s,o,a,c,l){const u=this.elements;return u[0]=t,u[1]=r,u[2]=a,u[3]=e,u[4]=s,u[5]=c,u[6]=n,u[7]=o,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,r=e.elements,s=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],u=n[4],f=n[7],h=n[2],d=n[5],g=n[8],_=r[0],m=r[3],p=r[6],v=r[1],M=r[4],x=r[7],b=r[2],S=r[5],A=r[8];return s[0]=o*_+a*v+c*b,s[3]=o*m+a*M+c*S,s[6]=o*p+a*x+c*A,s[1]=l*_+u*v+f*b,s[4]=l*m+u*M+f*S,s[7]=l*p+u*x+f*A,s[2]=h*_+d*v+g*b,s[5]=h*m+d*M+g*S,s[8]=h*p+d*x+g*A,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],r=t[2],s=t[3],o=t[4],a=t[5],c=t[6],l=t[7],u=t[8];return e*o*u-e*a*l-n*s*u+n*a*c+r*s*l-r*o*c}invert(){const t=this.elements,e=t[0],n=t[1],r=t[2],s=t[3],o=t[4],a=t[5],c=t[6],l=t[7],u=t[8],f=u*o-a*l,h=a*c-u*s,d=l*s-o*c,g=e*f+n*h+r*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return t[0]=f*_,t[1]=(r*l-u*n)*_,t[2]=(a*n-r*o)*_,t[3]=h*_,t[4]=(u*e-r*c)*_,t[5]=(r*s-a*e)*_,t[6]=d*_,t[7]=(n*c-l*e)*_,t[8]=(o*e-n*s)*_,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,r,s,o,a){const c=Math.cos(s),l=Math.sin(s);return this.set(n*c,n*l,-n*(c*o+l*a)+o+t,-r*l,r*c,-r*(-l*o+c*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(fa.makeScale(t,e)),this}rotate(t){return this.premultiply(fa.makeRotation(-t)),this}translate(t,e){return this.premultiply(fa.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let r=0;r<9;r++)if(e[r]!==n[r])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const fa=new Vt;function rd(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function xs(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function F0(){const i=xs("canvas");return i.style.display="block",i}const Tu={};function es(i){i in Tu||(Tu[i]=!0,console.warn(i))}function B0(i,t,e){return new Promise(function(n,r){function s(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:r();break;case i.TIMEOUT_EXPIRED:setTimeout(s,e);break;default:n()}}setTimeout(s,e)})}function G0(i){const t=i.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function k0(i){const t=i.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const Yt={enabled:!0,workingColorSpace:ze,spaces:{},convert:function(i,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===oe&&(i.r=Qn(i.r),i.g=Qn(i.g),i.b=Qn(i.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(i.applyMatrix3(this.spaces[t].toXYZ),i.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===oe&&(i.r=gr(i.r),i.g=gr(i.g),i.b=gr(i.b))),i},fromWorkingColorSpace:function(i,t){return this.convert(i,this.workingColorSpace,t)},toWorkingColorSpace:function(i,t){return this.convert(i,t,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Mn?Yo:this.spaces[i].transfer},getLuminanceCoefficients:function(i,t=this.workingColorSpace){return i.fromArray(this.spaces[t].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,t,e){return i.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}};function Qn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function gr(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}const wu=[.64,.33,.3,.6,.15,.06],Ru=[.2126,.7152,.0722],Cu=[.3127,.329],Iu=new Vt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Pu=new Vt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);Yt.define({[ze]:{primaries:wu,whitePoint:Cu,transfer:Yo,toXYZ:Iu,fromXYZ:Pu,luminanceCoefficients:Ru,workingColorSpaceConfig:{unpackColorSpace:ae},outputColorSpaceConfig:{drawingBufferColorSpace:ae}},[ae]:{primaries:wu,whitePoint:Cu,transfer:oe,toXYZ:Iu,fromXYZ:Pu,luminanceCoefficients:Ru,outputColorSpaceConfig:{drawingBufferColorSpace:ae}}});let Zi;class H0{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Zi===void 0&&(Zi=xs("canvas")),Zi.width=t.width,Zi.height=t.height;const n=Zi.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=Zi}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=xs("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const r=n.getImageData(0,0,t.width,t.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=Qn(s[o]/255)*255;return n.putImageData(r,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Qn(e[n]/255)*255):e[n]=Qn(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let V0=0;class sd{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:V0++}),this.uuid=bn(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(ha(r[o].image)):s.push(ha(r[o]))}else s=ha(r);n.url=s}return e||(t.images[this.uuid]=n),n}}function ha(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?H0.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let W0=0;class Ae extends Ir{constructor(t=Ae.DEFAULT_IMAGE,e=Ae.DEFAULT_MAPPING,n=Cn,r=Cn,s=Pe,o=En,a=on,c=ei,l=Ae.DEFAULT_ANISOTROPY,u=Mn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:W0++}),this.uuid=bn(),this.name="",this.source=new sd(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new Wt(0,0),this.repeat=new Wt(1,1),this.center=new Wt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Vt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Wh)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case an:t.x=t.x-Math.floor(t.x);break;case Cn:t.x=t.x<0?0:1;break;case Fo:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case an:t.y=t.y-Math.floor(t.y);break;case Cn:t.y=t.y<0?0:1;break;case Fo:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Ae.DEFAULT_IMAGE=null;Ae.DEFAULT_MAPPING=Wh;Ae.DEFAULT_ANISOTROPY=1;class Qt{constructor(t=0,e=0,n=0,r=1){Qt.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=r}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,r){return this.x=t,this.y=e,this.z=n,this.w=r,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,r=this.z,s=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*r+o[12]*s,this.y=o[1]*e+o[5]*n+o[9]*r+o[13]*s,this.z=o[2]*e+o[6]*n+o[10]*r+o[14]*s,this.w=o[3]*e+o[7]*n+o[11]*r+o[15]*s,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,r,s;const c=t.elements,l=c[0],u=c[4],f=c[8],h=c[1],d=c[5],g=c[9],_=c[2],m=c[6],p=c[10];if(Math.abs(u-h)<.01&&Math.abs(f-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+h)<.1&&Math.abs(f+_)<.1&&Math.abs(g+m)<.1&&Math.abs(l+d+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const M=(l+1)/2,x=(d+1)/2,b=(p+1)/2,S=(u+h)/4,A=(f+_)/4,T=(g+m)/4;return M>x&&M>b?M<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(M),r=S/n,s=A/n):x>b?x<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(x),n=S/r,s=T/r):b<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(b),n=A/s,r=T/s),this.set(n,r,s,e),this}let v=Math.sqrt((m-g)*(m-g)+(f-_)*(f-_)+(h-u)*(h-u));return Math.abs(v)<.001&&(v=1),this.x=(m-g)/v,this.y=(f-_)/v,this.z=(h-u)/v,this.w=Math.acos((l+d+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class X0 extends Ir{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new Qt(0,0,t,e),this.scissorTest=!1,this.viewport=new Qt(0,0,t,e);const r={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Pe,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const s=new Ae(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);s.flipY=!1,s.generateMipmaps=n.generateMipmaps,s.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=t,this.textures[r].image.height=e,this.textures[r].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,r=t.textures.length;n<r;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new sd(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Fi extends X0{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class od extends Ae{constructor(t=null,e=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:r},this.magFilter=Xe,this.minFilter=Xe,this.wrapR=Cn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class q0 extends Ae{constructor(t=null,e=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:r},this.magFilter=Xe,this.minFilter=Xe,this.wrapR=Cn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Tn{constructor(t=0,e=0,n=0,r=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=r}static slerpFlat(t,e,n,r,s,o,a){let c=n[r+0],l=n[r+1],u=n[r+2],f=n[r+3];const h=s[o+0],d=s[o+1],g=s[o+2],_=s[o+3];if(a===0){t[e+0]=c,t[e+1]=l,t[e+2]=u,t[e+3]=f;return}if(a===1){t[e+0]=h,t[e+1]=d,t[e+2]=g,t[e+3]=_;return}if(f!==_||c!==h||l!==d||u!==g){let m=1-a;const p=c*h+l*d+u*g+f*_,v=p>=0?1:-1,M=1-p*p;if(M>Number.EPSILON){const b=Math.sqrt(M),S=Math.atan2(b,p*v);m=Math.sin(m*S)/b,a=Math.sin(a*S)/b}const x=a*v;if(c=c*m+h*x,l=l*m+d*x,u=u*m+g*x,f=f*m+_*x,m===1-a){const b=1/Math.sqrt(c*c+l*l+u*u+f*f);c*=b,l*=b,u*=b,f*=b}}t[e]=c,t[e+1]=l,t[e+2]=u,t[e+3]=f}static multiplyQuaternionsFlat(t,e,n,r,s,o){const a=n[r],c=n[r+1],l=n[r+2],u=n[r+3],f=s[o],h=s[o+1],d=s[o+2],g=s[o+3];return t[e]=a*g+u*f+c*d-l*h,t[e+1]=c*g+u*h+l*f-a*d,t[e+2]=l*g+u*d+a*h-c*f,t[e+3]=u*g-a*f-c*h-l*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,r){return this._x=t,this._y=e,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,r=t._y,s=t._z,o=t._order,a=Math.cos,c=Math.sin,l=a(n/2),u=a(r/2),f=a(s/2),h=c(n/2),d=c(r/2),g=c(s/2);switch(o){case"XYZ":this._x=h*u*f+l*d*g,this._y=l*d*f-h*u*g,this._z=l*u*g+h*d*f,this._w=l*u*f-h*d*g;break;case"YXZ":this._x=h*u*f+l*d*g,this._y=l*d*f-h*u*g,this._z=l*u*g-h*d*f,this._w=l*u*f+h*d*g;break;case"ZXY":this._x=h*u*f-l*d*g,this._y=l*d*f+h*u*g,this._z=l*u*g+h*d*f,this._w=l*u*f-h*d*g;break;case"ZYX":this._x=h*u*f-l*d*g,this._y=l*d*f+h*u*g,this._z=l*u*g-h*d*f,this._w=l*u*f+h*d*g;break;case"YZX":this._x=h*u*f+l*d*g,this._y=l*d*f+h*u*g,this._z=l*u*g-h*d*f,this._w=l*u*f-h*d*g;break;case"XZY":this._x=h*u*f-l*d*g,this._y=l*d*f-h*u*g,this._z=l*u*g+h*d*f,this._w=l*u*f+h*d*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,r=Math.sin(n);return this._x=t.x*r,this._y=t.y*r,this._z=t.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],r=e[4],s=e[8],o=e[1],a=e[5],c=e[9],l=e[2],u=e[6],f=e[10],h=n+a+f;if(h>0){const d=.5/Math.sqrt(h+1);this._w=.25/d,this._x=(u-c)*d,this._y=(s-l)*d,this._z=(o-r)*d}else if(n>a&&n>f){const d=2*Math.sqrt(1+n-a-f);this._w=(u-c)/d,this._x=.25*d,this._y=(r+o)/d,this._z=(s+l)/d}else if(a>f){const d=2*Math.sqrt(1+a-n-f);this._w=(s-l)/d,this._x=(r+o)/d,this._y=.25*d,this._z=(c+u)/d}else{const d=2*Math.sqrt(1+f-n-a);this._w=(o-r)/d,this._x=(s+l)/d,this._y=(c+u)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Le(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const r=Math.min(1,e/n);return this.slerp(t,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,r=t._y,s=t._z,o=t._w,a=e._x,c=e._y,l=e._z,u=e._w;return this._x=n*u+o*a+r*l-s*c,this._y=r*u+o*c+s*a-n*l,this._z=s*u+o*l+n*c-r*a,this._w=o*u-n*a-r*c-s*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,r=this._y,s=this._z,o=this._w;let a=o*t._w+n*t._x+r*t._y+s*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=r,this._z=s,this;const c=1-a*a;if(c<=Number.EPSILON){const d=1-e;return this._w=d*o+e*this._w,this._x=d*n+e*this._x,this._y=d*r+e*this._y,this._z=d*s+e*this._z,this.normalize(),this}const l=Math.sqrt(c),u=Math.atan2(l,a),f=Math.sin((1-e)*u)/l,h=Math.sin(e*u)/l;return this._w=o*f+this._w*h,this._x=n*f+this._x*h,this._y=r*f+this._y*h,this._z=s*f+this._z*h,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(r*Math.sin(t),r*Math.cos(t),s*Math.sin(e),s*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class z{constructor(t=0,e=0,n=0){z.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Lu.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Lu.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,r=this.z,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6]*r,this.y=s[1]*e+s[4]*n+s[7]*r,this.z=s[2]*e+s[5]*n+s[8]*r,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,r=this.z,s=t.elements,o=1/(s[3]*e+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*e+s[4]*n+s[8]*r+s[12])*o,this.y=(s[1]*e+s[5]*n+s[9]*r+s[13])*o,this.z=(s[2]*e+s[6]*n+s[10]*r+s[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,r=this.z,s=t.x,o=t.y,a=t.z,c=t.w,l=2*(o*r-a*n),u=2*(a*e-s*r),f=2*(s*n-o*e);return this.x=e+c*l+o*f-a*u,this.y=n+c*u+a*l-s*f,this.z=r+c*f+s*u-o*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,r=this.z,s=t.elements;return this.x=s[0]*e+s[4]*n+s[8]*r,this.y=s[1]*e+s[5]*n+s[9]*r,this.z=s[2]*e+s[6]*n+s[10]*r,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,r=t.y,s=t.z,o=e.x,a=e.y,c=e.z;return this.x=r*c-s*a,this.y=s*o-n*c,this.z=n*a-r*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return da.copy(this).projectOnVector(t),this.sub(da)}reflect(t){return this.sub(da.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Le(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,r=this.z-t.z;return e*e+n*n+r*r}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const r=Math.sin(e)*t;return this.x=r*Math.sin(n),this.y=Math.cos(e)*t,this.z=r*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),r=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=r,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const da=new z,Lu=new Tn;class cn{constructor(t=new z(1/0,1/0,1/0),e=new z(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(dn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(dn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=dn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const s=n.getAttribute("position");if(e===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,dn):dn.fromBufferAttribute(s,o),dn.applyMatrix4(t.matrixWorld),this.expandByPoint(dn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Ps.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ps.copy(n.boundingBox)),Ps.applyMatrix4(t.matrixWorld),this.union(Ps)}const r=t.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,dn),dn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(zr),Ls.subVectors(this.max,zr),Ki.subVectors(t.a,zr),Ji.subVectors(t.b,zr),Qi.subVectors(t.c,zr),ai.subVectors(Ji,Ki),ci.subVectors(Qi,Ji),Mi.subVectors(Ki,Qi);let e=[0,-ai.z,ai.y,0,-ci.z,ci.y,0,-Mi.z,Mi.y,ai.z,0,-ai.x,ci.z,0,-ci.x,Mi.z,0,-Mi.x,-ai.y,ai.x,0,-ci.y,ci.x,0,-Mi.y,Mi.x,0];return!pa(e,Ki,Ji,Qi,Ls)||(e=[1,0,0,0,1,0,0,0,1],!pa(e,Ki,Ji,Qi,Ls))?!1:(Ds.crossVectors(ai,ci),e=[Ds.x,Ds.y,Ds.z],pa(e,Ki,Ji,Qi,Ls))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,dn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(dn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Fn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Fn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Fn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Fn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Fn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Fn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Fn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Fn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Fn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const Fn=[new z,new z,new z,new z,new z,new z,new z,new z],dn=new z,Ps=new cn,Ki=new z,Ji=new z,Qi=new z,ai=new z,ci=new z,Mi=new z,zr=new z,Ls=new z,Ds=new z,yi=new z;function pa(i,t,e,n,r){for(let s=0,o=i.length-3;s<=o;s+=3){yi.fromArray(i,s);const a=r.x*Math.abs(yi.x)+r.y*Math.abs(yi.y)+r.z*Math.abs(yi.z),c=t.dot(yi),l=e.dot(yi),u=n.dot(yi);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>a)return!1}return!0}const j0=new cn,Fr=new z,ma=new z;class Un{constructor(t=new z,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):j0.setFromPoints(t).getCenter(n);let r=0;for(let s=0,o=t.length;s<o;s++)r=Math.max(r,n.distanceToSquared(t[s]));return this.radius=Math.sqrt(r),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Fr.subVectors(t,this.center);const e=Fr.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),r=(n-this.radius)*.5;this.center.addScaledVector(Fr,r/n),this.radius+=r}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(ma.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Fr.copy(t.center).add(ma)),this.expandByPoint(Fr.copy(t.center).sub(ma))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Bn=new z,ga=new z,Us=new z,li=new z,_a=new z,Ns=new z,xa=new z;class Zo{constructor(t=new z,e=new z(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Bn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Bn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Bn.copy(this.origin).addScaledVector(this.direction,e),Bn.distanceToSquared(t))}distanceSqToSegment(t,e,n,r){ga.copy(t).add(e).multiplyScalar(.5),Us.copy(e).sub(t).normalize(),li.copy(this.origin).sub(ga);const s=t.distanceTo(e)*.5,o=-this.direction.dot(Us),a=li.dot(this.direction),c=-li.dot(Us),l=li.lengthSq(),u=Math.abs(1-o*o);let f,h,d,g;if(u>0)if(f=o*c-a,h=o*a-c,g=s*u,f>=0)if(h>=-g)if(h<=g){const _=1/u;f*=_,h*=_,d=f*(f+o*h+2*a)+h*(o*f+h+2*c)+l}else h=s,f=Math.max(0,-(o*h+a)),d=-f*f+h*(h+2*c)+l;else h=-s,f=Math.max(0,-(o*h+a)),d=-f*f+h*(h+2*c)+l;else h<=-g?(f=Math.max(0,-(-o*s+a)),h=f>0?-s:Math.min(Math.max(-s,-c),s),d=-f*f+h*(h+2*c)+l):h<=g?(f=0,h=Math.min(Math.max(-s,-c),s),d=h*(h+2*c)+l):(f=Math.max(0,-(o*s+a)),h=f>0?s:Math.min(Math.max(-s,-c),s),d=-f*f+h*(h+2*c)+l);else h=o>0?-s:s,f=Math.max(0,-(o*h+a)),d=-f*f+h*(h+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,f),r&&r.copy(ga).addScaledVector(Us,h),d}intersectSphere(t,e){Bn.subVectors(t.center,this.origin);const n=Bn.dot(this.direction),r=Bn.dot(Bn)-n*n,s=t.radius*t.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,r,s,o,a,c;const l=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,h=this.origin;return l>=0?(n=(t.min.x-h.x)*l,r=(t.max.x-h.x)*l):(n=(t.max.x-h.x)*l,r=(t.min.x-h.x)*l),u>=0?(s=(t.min.y-h.y)*u,o=(t.max.y-h.y)*u):(s=(t.max.y-h.y)*u,o=(t.min.y-h.y)*u),n>o||s>r||((s>n||isNaN(n))&&(n=s),(o<r||isNaN(r))&&(r=o),f>=0?(a=(t.min.z-h.z)*f,c=(t.max.z-h.z)*f):(a=(t.max.z-h.z)*f,c=(t.min.z-h.z)*f),n>c||a>r)||((a>n||n!==n)&&(n=a),(c<r||r!==r)&&(r=c),r<0)?null:this.at(n>=0?n:r,e)}intersectsBox(t){return this.intersectBox(t,Bn)!==null}intersectTriangle(t,e,n,r,s){_a.subVectors(e,t),Ns.subVectors(n,t),xa.crossVectors(_a,Ns);let o=this.direction.dot(xa),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;li.subVectors(this.origin,t);const c=a*this.direction.dot(Ns.crossVectors(li,Ns));if(c<0)return null;const l=a*this.direction.dot(_a.cross(li));if(l<0||c+l>o)return null;const u=-a*li.dot(xa);return u<0?null:this.at(u/o,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class It{constructor(t,e,n,r,s,o,a,c,l,u,f,h,d,g,_,m){It.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,r,s,o,a,c,l,u,f,h,d,g,_,m)}set(t,e,n,r,s,o,a,c,l,u,f,h,d,g,_,m){const p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=r,p[1]=s,p[5]=o,p[9]=a,p[13]=c,p[2]=l,p[6]=u,p[10]=f,p[14]=h,p[3]=d,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new It().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,r=1/tr.setFromMatrixColumn(t,0).length(),s=1/tr.setFromMatrixColumn(t,1).length(),o=1/tr.setFromMatrixColumn(t,2).length();return e[0]=n[0]*r,e[1]=n[1]*r,e[2]=n[2]*r,e[3]=0,e[4]=n[4]*s,e[5]=n[5]*s,e[6]=n[6]*s,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,r=t.y,s=t.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(r),l=Math.sin(r),u=Math.cos(s),f=Math.sin(s);if(t.order==="XYZ"){const h=o*u,d=o*f,g=a*u,_=a*f;e[0]=c*u,e[4]=-c*f,e[8]=l,e[1]=d+g*l,e[5]=h-_*l,e[9]=-a*c,e[2]=_-h*l,e[6]=g+d*l,e[10]=o*c}else if(t.order==="YXZ"){const h=c*u,d=c*f,g=l*u,_=l*f;e[0]=h+_*a,e[4]=g*a-d,e[8]=o*l,e[1]=o*f,e[5]=o*u,e[9]=-a,e[2]=d*a-g,e[6]=_+h*a,e[10]=o*c}else if(t.order==="ZXY"){const h=c*u,d=c*f,g=l*u,_=l*f;e[0]=h-_*a,e[4]=-o*f,e[8]=g+d*a,e[1]=d+g*a,e[5]=o*u,e[9]=_-h*a,e[2]=-o*l,e[6]=a,e[10]=o*c}else if(t.order==="ZYX"){const h=o*u,d=o*f,g=a*u,_=a*f;e[0]=c*u,e[4]=g*l-d,e[8]=h*l+_,e[1]=c*f,e[5]=_*l+h,e[9]=d*l-g,e[2]=-l,e[6]=a*c,e[10]=o*c}else if(t.order==="YZX"){const h=o*c,d=o*l,g=a*c,_=a*l;e[0]=c*u,e[4]=_-h*f,e[8]=g*f+d,e[1]=f,e[5]=o*u,e[9]=-a*u,e[2]=-l*u,e[6]=d*f+g,e[10]=h-_*f}else if(t.order==="XZY"){const h=o*c,d=o*l,g=a*c,_=a*l;e[0]=c*u,e[4]=-f,e[8]=l*u,e[1]=h*f+_,e[5]=o*u,e[9]=d*f-g,e[2]=g*f-d,e[6]=a*u,e[10]=_*f+h}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose($0,t,Y0)}lookAt(t,e,n){const r=this.elements;return Ke.subVectors(t,e),Ke.lengthSq()===0&&(Ke.z=1),Ke.normalize(),ui.crossVectors(n,Ke),ui.lengthSq()===0&&(Math.abs(n.z)===1?Ke.x+=1e-4:Ke.z+=1e-4,Ke.normalize(),ui.crossVectors(n,Ke)),ui.normalize(),Os.crossVectors(Ke,ui),r[0]=ui.x,r[4]=Os.x,r[8]=Ke.x,r[1]=ui.y,r[5]=Os.y,r[9]=Ke.y,r[2]=ui.z,r[6]=Os.z,r[10]=Ke.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,r=e.elements,s=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],u=n[1],f=n[5],h=n[9],d=n[13],g=n[2],_=n[6],m=n[10],p=n[14],v=n[3],M=n[7],x=n[11],b=n[15],S=r[0],A=r[4],T=r[8],y=r[12],E=r[1],R=r[5],D=r[9],N=r[13],U=r[2],w=r[6],P=r[10],F=r[14],O=r[3],K=r[7],tt=r[11],ut=r[15];return s[0]=o*S+a*E+c*U+l*O,s[4]=o*A+a*R+c*w+l*K,s[8]=o*T+a*D+c*P+l*tt,s[12]=o*y+a*N+c*F+l*ut,s[1]=u*S+f*E+h*U+d*O,s[5]=u*A+f*R+h*w+d*K,s[9]=u*T+f*D+h*P+d*tt,s[13]=u*y+f*N+h*F+d*ut,s[2]=g*S+_*E+m*U+p*O,s[6]=g*A+_*R+m*w+p*K,s[10]=g*T+_*D+m*P+p*tt,s[14]=g*y+_*N+m*F+p*ut,s[3]=v*S+M*E+x*U+b*O,s[7]=v*A+M*R+x*w+b*K,s[11]=v*T+M*D+x*P+b*tt,s[15]=v*y+M*N+x*F+b*ut,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],r=t[8],s=t[12],o=t[1],a=t[5],c=t[9],l=t[13],u=t[2],f=t[6],h=t[10],d=t[14],g=t[3],_=t[7],m=t[11],p=t[15];return g*(+s*c*f-r*l*f-s*a*h+n*l*h+r*a*d-n*c*d)+_*(+e*c*d-e*l*h+s*o*h-r*o*d+r*l*u-s*c*u)+m*(+e*l*f-e*a*d-s*o*f+n*o*d+s*a*u-n*l*u)+p*(-r*a*u-e*c*f+e*a*h+r*o*f-n*o*h+n*c*u)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const r=this.elements;return t.isVector3?(r[12]=t.x,r[13]=t.y,r[14]=t.z):(r[12]=t,r[13]=e,r[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],r=t[2],s=t[3],o=t[4],a=t[5],c=t[6],l=t[7],u=t[8],f=t[9],h=t[10],d=t[11],g=t[12],_=t[13],m=t[14],p=t[15],v=f*m*l-_*h*l+_*c*d-a*m*d-f*c*p+a*h*p,M=g*h*l-u*m*l-g*c*d+o*m*d+u*c*p-o*h*p,x=u*_*l-g*f*l+g*a*d-o*_*d-u*a*p+o*f*p,b=g*f*c-u*_*c-g*a*h+o*_*h+u*a*m-o*f*m,S=e*v+n*M+r*x+s*b;if(S===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/S;return t[0]=v*A,t[1]=(_*h*s-f*m*s-_*r*d+n*m*d+f*r*p-n*h*p)*A,t[2]=(a*m*s-_*c*s+_*r*l-n*m*l-a*r*p+n*c*p)*A,t[3]=(f*c*s-a*h*s-f*r*l+n*h*l+a*r*d-n*c*d)*A,t[4]=M*A,t[5]=(u*m*s-g*h*s+g*r*d-e*m*d-u*r*p+e*h*p)*A,t[6]=(g*c*s-o*m*s-g*r*l+e*m*l+o*r*p-e*c*p)*A,t[7]=(o*h*s-u*c*s+u*r*l-e*h*l-o*r*d+e*c*d)*A,t[8]=x*A,t[9]=(g*f*s-u*_*s-g*n*d+e*_*d+u*n*p-e*f*p)*A,t[10]=(o*_*s-g*a*s+g*n*l-e*_*l-o*n*p+e*a*p)*A,t[11]=(u*a*s-o*f*s-u*n*l+e*f*l+o*n*d-e*a*d)*A,t[12]=b*A,t[13]=(u*_*r-g*f*r+g*n*h-e*_*h-u*n*m+e*f*m)*A,t[14]=(g*a*r-o*_*r-g*n*c+e*_*c+o*n*m-e*a*m)*A,t[15]=(o*f*r-u*a*r+u*n*c-e*f*c-o*n*h+e*a*h)*A,this}scale(t){const e=this.elements,n=t.x,r=t.y,s=t.z;return e[0]*=n,e[4]*=r,e[8]*=s,e[1]*=n,e[5]*=r,e[9]*=s,e[2]*=n,e[6]*=r,e[10]*=s,e[3]*=n,e[7]*=r,e[11]*=s,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],r=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,r))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),r=Math.sin(e),s=1-n,o=t.x,a=t.y,c=t.z,l=s*o,u=s*a;return this.set(l*o+n,l*a-r*c,l*c+r*a,0,l*a+r*c,u*a+n,u*c-r*o,0,l*c-r*a,u*c+r*o,s*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,r,s,o){return this.set(1,n,s,0,t,1,o,0,e,r,1,0,0,0,0,1),this}compose(t,e,n){const r=this.elements,s=e._x,o=e._y,a=e._z,c=e._w,l=s+s,u=o+o,f=a+a,h=s*l,d=s*u,g=s*f,_=o*u,m=o*f,p=a*f,v=c*l,M=c*u,x=c*f,b=n.x,S=n.y,A=n.z;return r[0]=(1-(_+p))*b,r[1]=(d+x)*b,r[2]=(g-M)*b,r[3]=0,r[4]=(d-x)*S,r[5]=(1-(h+p))*S,r[6]=(m+v)*S,r[7]=0,r[8]=(g+M)*A,r[9]=(m-v)*A,r[10]=(1-(h+_))*A,r[11]=0,r[12]=t.x,r[13]=t.y,r[14]=t.z,r[15]=1,this}decompose(t,e,n){const r=this.elements;let s=tr.set(r[0],r[1],r[2]).length();const o=tr.set(r[4],r[5],r[6]).length(),a=tr.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),t.x=r[12],t.y=r[13],t.z=r[14],pn.copy(this);const l=1/s,u=1/o,f=1/a;return pn.elements[0]*=l,pn.elements[1]*=l,pn.elements[2]*=l,pn.elements[4]*=u,pn.elements[5]*=u,pn.elements[6]*=u,pn.elements[8]*=f,pn.elements[9]*=f,pn.elements[10]*=f,e.setFromRotationMatrix(pn),n.x=s,n.y=o,n.z=a,this}makePerspective(t,e,n,r,s,o,a=Zn){const c=this.elements,l=2*s/(e-t),u=2*s/(n-r),f=(e+t)/(e-t),h=(n+r)/(n-r);let d,g;if(a===Zn)d=-(o+s)/(o-s),g=-2*o*s/(o-s);else if(a===Bo)d=-o/(o-s),g=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=u,c[9]=h,c[13]=0,c[2]=0,c[6]=0,c[10]=d,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,r,s,o,a=Zn){const c=this.elements,l=1/(e-t),u=1/(n-r),f=1/(o-s),h=(e+t)*l,d=(n+r)*u;let g,_;if(a===Zn)g=(o+s)*f,_=-2*f;else if(a===Bo)g=s*f,_=-1*f;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-h,c[1]=0,c[5]=2*u,c[9]=0,c[13]=-d,c[2]=0,c[6]=0,c[10]=_,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let r=0;r<16;r++)if(e[r]!==n[r])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const tr=new z,pn=new It,$0=new z(0,0,0),Y0=new z(1,1,1),ui=new z,Os=new z,Ke=new z,Du=new It,Uu=new Tn;class Pn{constructor(t=0,e=0,n=0,r=Pn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=r}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,r=this._order){return this._x=t,this._y=e,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const r=t.elements,s=r[0],o=r[4],a=r[8],c=r[1],l=r[5],u=r[9],f=r[2],h=r[6],d=r[10];switch(e){case"XYZ":this._y=Math.asin(Le(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,d),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(h,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Le(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-f,s),this._z=0);break;case"ZXY":this._x=Math.asin(Le(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-f,d),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-Le(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(h,d),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(Le(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-f,s)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-Le(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(h,l),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-u,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Du.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Du,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Uu.setFromEuler(this),this.setFromQuaternion(Uu,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Pn.DEFAULT_ORDER="XYZ";class ad{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Z0=0;const Nu=new z,er=new Tn,Gn=new It,zs=new z,Br=new z,K0=new z,J0=new Tn,Ou=new z(1,0,0),zu=new z(0,1,0),Fu=new z(0,0,1),Bu={type:"added"},Q0={type:"removed"},nr={type:"childadded",child:null},va={type:"childremoved",child:null};class me extends Ir{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Z0++}),this.uuid=bn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=me.DEFAULT_UP.clone();const t=new z,e=new Pn,n=new Tn,r=new z(1,1,1);function s(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new It},normalMatrix:{value:new Vt}}),this.matrix=new It,this.matrixWorld=new It,this.matrixAutoUpdate=me.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=me.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ad,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return er.setFromAxisAngle(t,e),this.quaternion.multiply(er),this}rotateOnWorldAxis(t,e){return er.setFromAxisAngle(t,e),this.quaternion.premultiply(er),this}rotateX(t){return this.rotateOnAxis(Ou,t)}rotateY(t){return this.rotateOnAxis(zu,t)}rotateZ(t){return this.rotateOnAxis(Fu,t)}translateOnAxis(t,e){return Nu.copy(t).applyQuaternion(this.quaternion),this.position.add(Nu.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Ou,t)}translateY(t){return this.translateOnAxis(zu,t)}translateZ(t){return this.translateOnAxis(Fu,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Gn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?zs.copy(t):zs.set(t,e,n);const r=this.parent;this.updateWorldMatrix(!0,!1),Br.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Gn.lookAt(Br,zs,this.up):Gn.lookAt(zs,Br,this.up),this.quaternion.setFromRotationMatrix(Gn),r&&(Gn.extractRotation(r.matrixWorld),er.setFromRotationMatrix(Gn),this.quaternion.premultiply(er.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Bu),nr.child=t,this.dispatchEvent(nr),nr.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Q0),va.child=t,this.dispatchEvent(va),va.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Gn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Gn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Gn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Bu),nr.child=t,this.dispatchEvent(nr),nr.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,r=this.children.length;n<r;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Br,t,K0),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Br,J0,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,r=e.length;n<r;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,r=e.length;n<r;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,r=e.length;n<r;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){const f=c[l];s(t.shapes,f)}else s(t.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(s(t.materials,this.material[c]));r.material=a}else r.material=s(t.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];r.animations.push(s(t.animations,c))}}if(e){const a=o(t.geometries),c=o(t.materials),l=o(t.textures),u=o(t.images),f=o(t.shapes),h=o(t.skeletons),d=o(t.animations),g=o(t.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),u.length>0&&(n.images=u),f.length>0&&(n.shapes=f),h.length>0&&(n.skeletons=h),d.length>0&&(n.animations=d),g.length>0&&(n.nodes=g)}return n.object=r,n;function o(a){const c=[];for(const l in a){const u=a[l];delete u.metadata,c.push(u)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const r=t.children[n];this.add(r.clone())}return this}}me.DEFAULT_UP=new z(0,1,0);me.DEFAULT_MATRIX_AUTO_UPDATE=!0;me.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const mn=new z,kn=new z,Ma=new z,Hn=new z,ir=new z,rr=new z,Gu=new z,ya=new z,Sa=new z,Ea=new z,ba=new Qt,Aa=new Qt,Ta=new Qt;class Sn{constructor(t=new z,e=new z,n=new z){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,r){r.subVectors(n,e),mn.subVectors(t,e),r.cross(mn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(t,e,n,r,s){mn.subVectors(r,e),kn.subVectors(n,e),Ma.subVectors(t,e);const o=mn.dot(mn),a=mn.dot(kn),c=mn.dot(Ma),l=kn.dot(kn),u=kn.dot(Ma),f=o*l-a*a;if(f===0)return s.set(0,0,0),null;const h=1/f,d=(l*c-a*u)*h,g=(o*u-a*c)*h;return s.set(1-d-g,g,d)}static containsPoint(t,e,n,r){return this.getBarycoord(t,e,n,r,Hn)===null?!1:Hn.x>=0&&Hn.y>=0&&Hn.x+Hn.y<=1}static getInterpolation(t,e,n,r,s,o,a,c){return this.getBarycoord(t,e,n,r,Hn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,Hn.x),c.addScaledVector(o,Hn.y),c.addScaledVector(a,Hn.z),c)}static getInterpolatedAttribute(t,e,n,r,s,o){return ba.setScalar(0),Aa.setScalar(0),Ta.setScalar(0),ba.fromBufferAttribute(t,e),Aa.fromBufferAttribute(t,n),Ta.fromBufferAttribute(t,r),o.setScalar(0),o.addScaledVector(ba,s.x),o.addScaledVector(Aa,s.y),o.addScaledVector(Ta,s.z),o}static isFrontFacing(t,e,n,r){return mn.subVectors(n,e),kn.subVectors(t,e),mn.cross(kn).dot(r)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,r){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[r]),this}setFromAttributeAndIndices(t,e,n,r){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,r),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return mn.subVectors(this.c,this.b),kn.subVectors(this.a,this.b),mn.cross(kn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Sn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Sn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,r,s){return Sn.getInterpolation(t,this.a,this.b,this.c,e,n,r,s)}containsPoint(t){return Sn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Sn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,r=this.b,s=this.c;let o,a;ir.subVectors(r,n),rr.subVectors(s,n),ya.subVectors(t,n);const c=ir.dot(ya),l=rr.dot(ya);if(c<=0&&l<=0)return e.copy(n);Sa.subVectors(t,r);const u=ir.dot(Sa),f=rr.dot(Sa);if(u>=0&&f<=u)return e.copy(r);const h=c*f-u*l;if(h<=0&&c>=0&&u<=0)return o=c/(c-u),e.copy(n).addScaledVector(ir,o);Ea.subVectors(t,s);const d=ir.dot(Ea),g=rr.dot(Ea);if(g>=0&&d<=g)return e.copy(s);const _=d*l-c*g;if(_<=0&&l>=0&&g<=0)return a=l/(l-g),e.copy(n).addScaledVector(rr,a);const m=u*g-d*f;if(m<=0&&f-u>=0&&d-g>=0)return Gu.subVectors(s,r),a=(f-u)/(f-u+(d-g)),e.copy(r).addScaledVector(Gu,a);const p=1/(m+_+h);return o=_*p,a=h*p,e.copy(n).addScaledVector(ir,o).addScaledVector(rr,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const cd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},fi={h:0,s:0,l:0},Fs={h:0,s:0,l:0};function wa(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class Lt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const r=t;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=ae){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Yt.toWorkingColorSpace(this,e),this}setRGB(t,e,n,r=Yt.workingColorSpace){return this.r=t,this.g=e,this.b=n,Yt.toWorkingColorSpace(this,r),this}setHSL(t,e,n,r=Yt.workingColorSpace){if(t=vl(t,1),e=Le(e,0,1),n=Le(n,0,1),e===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+e):n+e-n*e,o=2*n-s;this.r=wa(o,s,t+1/3),this.g=wa(o,s,t),this.b=wa(o,s,t-1/3)}return Yt.toWorkingColorSpace(this,r),this}setStyle(t,e=ae){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(t)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,e);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,e);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(t)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(s,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=ae){const n=cd[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Qn(t.r),this.g=Qn(t.g),this.b=Qn(t.b),this}copyLinearToSRGB(t){return this.r=gr(t.r),this.g=gr(t.g),this.b=gr(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=ae){return Yt.fromWorkingColorSpace(Ne.copy(this),t),Math.round(Le(Ne.r*255,0,255))*65536+Math.round(Le(Ne.g*255,0,255))*256+Math.round(Le(Ne.b*255,0,255))}getHexString(t=ae){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Yt.workingColorSpace){Yt.fromWorkingColorSpace(Ne.copy(this),e);const n=Ne.r,r=Ne.g,s=Ne.b,o=Math.max(n,r,s),a=Math.min(n,r,s);let c,l;const u=(a+o)/2;if(a===o)c=0,l=0;else{const f=o-a;switch(l=u<=.5?f/(o+a):f/(2-o-a),o){case n:c=(r-s)/f+(r<s?6:0);break;case r:c=(s-n)/f+2;break;case s:c=(n-r)/f+4;break}c/=6}return t.h=c,t.s=l,t.l=u,t}getRGB(t,e=Yt.workingColorSpace){return Yt.fromWorkingColorSpace(Ne.copy(this),e),t.r=Ne.r,t.g=Ne.g,t.b=Ne.b,t}getStyle(t=ae){Yt.fromWorkingColorSpace(Ne.copy(this),t);const e=Ne.r,n=Ne.g,r=Ne.b;return t!==ae?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(t,e,n){return this.getHSL(fi),this.setHSL(fi.h+t,fi.s+e,fi.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(fi),t.getHSL(Fs);const n=as(fi.h,Fs.h,e),r=as(fi.s,Fs.s,e),s=as(fi.l,Fs.l,e);return this.setHSL(n,r,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,r=this.b,s=t.elements;return this.r=s[0]*e+s[3]*n+s[6]*r,this.g=s[1]*e+s[4]*n+s[7]*r,this.b=s[2]*e+s[5]*n+s[8]*r,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ne=new Lt;Lt.NAMES=cd;let tg=0;class In extends Ir{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:tg++}),this.uuid=bn(),this.name="",this.blending=pr,this.side=ti,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=cc,this.blendDst=lc,this.blendEquation=Li,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Lt(0,0,0),this.blendAlpha=0,this.depthFunc=Mr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Eu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Yi,this.stencilZFail=Yi,this.stencilZPass=Yi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const r=this[e];if(r===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==pr&&(n.blending=this.blending),this.side!==ti&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==cc&&(n.blendSrc=this.blendSrc),this.blendDst!==lc&&(n.blendDst=this.blendDst),this.blendEquation!==Li&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Mr&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Eu&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Yi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Yi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Yi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(s){const o=[];for(const a in s){const c=s[a];delete c.metadata,o.push(c)}return o}if(e){const s=r(t.textures),o=r(t.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const r=e.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=e[s].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Kn extends In{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new Lt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Pn,this.combine=Hh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const $n=eg();function eg(){const i=new ArrayBuffer(4),t=new Float32Array(i),e=new Uint32Array(i),n=new Uint32Array(512),r=new Uint32Array(512);for(let c=0;c<256;++c){const l=c-127;l<-27?(n[c]=0,n[c|256]=32768,r[c]=24,r[c|256]=24):l<-14?(n[c]=1024>>-l-14,n[c|256]=1024>>-l-14|32768,r[c]=-l-1,r[c|256]=-l-1):l<=15?(n[c]=l+15<<10,n[c|256]=l+15<<10|32768,r[c]=13,r[c|256]=13):l<128?(n[c]=31744,n[c|256]=64512,r[c]=24,r[c|256]=24):(n[c]=31744,n[c|256]=64512,r[c]=13,r[c|256]=13)}const s=new Uint32Array(2048),o=new Uint32Array(64),a=new Uint32Array(64);for(let c=1;c<1024;++c){let l=c<<13,u=0;for(;(l&8388608)===0;)l<<=1,u-=8388608;l&=-8388609,u+=947912704,s[c]=l|u}for(let c=1024;c<2048;++c)s[c]=939524096+(c-1024<<13);for(let c=1;c<31;++c)o[c]=c<<23;o[31]=1199570944,o[32]=2147483648;for(let c=33;c<63;++c)o[c]=2147483648+(c-32<<23);o[63]=3347054592;for(let c=1;c<64;++c)c!==32&&(a[c]=1024);return{floatView:t,uint32View:e,baseTable:n,shiftTable:r,mantissaTable:s,exponentTable:o,offsetTable:a}}function ng(i){Math.abs(i)>65504&&console.warn("THREE.DataUtils.toHalfFloat(): Value out of range."),i=Le(i,-65504,65504),$n.floatView[0]=i;const t=$n.uint32View[0],e=t>>23&511;return $n.baseTable[e]+((t&8388607)>>$n.shiftTable[e])}function ig(i){const t=i>>10;return $n.uint32View[0]=$n.mantissaTable[$n.offsetTable[t]+(i&1023)]+$n.exponentTable[t],$n.floatView[0]}const Bs={toHalfFloat:ng,fromHalfFloat:ig},Se=new z,Gs=new Wt;class fe{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=qc,this.updateRanges=[],this.gpuType=$e,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[t+r]=e.array[n+r];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Gs.fromBufferAttribute(this,e),Gs.applyMatrix3(t),this.setXY(e,Gs.x,Gs.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Se.fromBufferAttribute(this,e),Se.applyMatrix3(t),this.setXYZ(e,Se.x,Se.y,Se.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Se.fromBufferAttribute(this,e),Se.applyMatrix4(t),this.setXYZ(e,Se.x,Se.y,Se.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Se.fromBufferAttribute(this,e),Se.applyNormalMatrix(t),this.setXYZ(e,Se.x,Se.y,Se.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Se.fromBufferAttribute(this,e),Se.transformDirection(t),this.setXYZ(e,Se.x,Se.y,Se.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=yn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=re(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=yn(e,this.array)),e}setX(t,e){return this.normalized&&(e=re(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=yn(e,this.array)),e}setY(t,e){return this.normalized&&(e=re(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=yn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=re(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=yn(e,this.array)),e}setW(t,e){return this.normalized&&(e=re(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=re(e,this.array),n=re(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,r){return t*=this.itemSize,this.normalized&&(e=re(e,this.array),n=re(n,this.array),r=re(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=r,this}setXYZW(t,e,n,r,s){return t*=this.itemSize,this.normalized&&(e=re(e,this.array),n=re(n,this.array),r=re(r,this.array),s=re(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=r,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==qc&&(t.usage=this.usage),t}}class ld extends fe{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class ud extends fe{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class Zt extends fe{constructor(t,e,n){super(new Float32Array(t),e,n)}}let rg=0;const nn=new It,Ra=new me,sr=new z,Je=new cn,Gr=new cn,Ie=new z;class _e extends Ir{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:rg++}),this.uuid=bn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(rd(t)?ud:ld)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new Vt().getNormalMatrix(t);n.applyNormalMatrix(s),n.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(t),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return nn.makeRotationFromQuaternion(t),this.applyMatrix4(nn),this}rotateX(t){return nn.makeRotationX(t),this.applyMatrix4(nn),this}rotateY(t){return nn.makeRotationY(t),this.applyMatrix4(nn),this}rotateZ(t){return nn.makeRotationZ(t),this.applyMatrix4(nn),this}translate(t,e,n){return nn.makeTranslation(t,e,n),this.applyMatrix4(nn),this}scale(t,e,n){return nn.makeScale(t,e,n),this.applyMatrix4(nn),this}lookAt(t){return Ra.lookAt(t),Ra.updateMatrix(),this.applyMatrix4(Ra.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(sr).negate(),this.translate(sr.x,sr.y,sr.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let r=0,s=t.length;r<s;r++){const o=t[r];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Zt(n,3))}else{for(let n=0,r=e.count;n<r;n++){const s=t[n];e.setXYZ(n,s.x,s.y,s.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new cn);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new z(-1/0,-1/0,-1/0),new z(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,r=e.length;n<r;n++){const s=e[n];Je.setFromBufferAttribute(s),this.morphTargetsRelative?(Ie.addVectors(this.boundingBox.min,Je.min),this.boundingBox.expandByPoint(Ie),Ie.addVectors(this.boundingBox.max,Je.max),this.boundingBox.expandByPoint(Ie)):(this.boundingBox.expandByPoint(Je.min),this.boundingBox.expandByPoint(Je.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Un);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new z,1/0);return}if(t){const n=this.boundingSphere.center;if(Je.setFromBufferAttribute(t),e)for(let s=0,o=e.length;s<o;s++){const a=e[s];Gr.setFromBufferAttribute(a),this.morphTargetsRelative?(Ie.addVectors(Je.min,Gr.min),Je.expandByPoint(Ie),Ie.addVectors(Je.max,Gr.max),Je.expandByPoint(Ie)):(Je.expandByPoint(Gr.min),Je.expandByPoint(Gr.max))}Je.getCenter(n);let r=0;for(let s=0,o=t.count;s<o;s++)Ie.fromBufferAttribute(t,s),r=Math.max(r,n.distanceToSquared(Ie));if(e)for(let s=0,o=e.length;s<o;s++){const a=e[s],c=this.morphTargetsRelative;for(let l=0,u=a.count;l<u;l++)Ie.fromBufferAttribute(a,l),c&&(sr.fromBufferAttribute(t,l),Ie.add(sr)),r=Math.max(r,n.distanceToSquared(Ie))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,r=e.normal,s=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new fe(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],c=[];for(let T=0;T<n.count;T++)a[T]=new z,c[T]=new z;const l=new z,u=new z,f=new z,h=new Wt,d=new Wt,g=new Wt,_=new z,m=new z;function p(T,y,E){l.fromBufferAttribute(n,T),u.fromBufferAttribute(n,y),f.fromBufferAttribute(n,E),h.fromBufferAttribute(s,T),d.fromBufferAttribute(s,y),g.fromBufferAttribute(s,E),u.sub(l),f.sub(l),d.sub(h),g.sub(h);const R=1/(d.x*g.y-g.x*d.y);isFinite(R)&&(_.copy(u).multiplyScalar(g.y).addScaledVector(f,-d.y).multiplyScalar(R),m.copy(f).multiplyScalar(d.x).addScaledVector(u,-g.x).multiplyScalar(R),a[T].add(_),a[y].add(_),a[E].add(_),c[T].add(m),c[y].add(m),c[E].add(m))}let v=this.groups;v.length===0&&(v=[{start:0,count:t.count}]);for(let T=0,y=v.length;T<y;++T){const E=v[T],R=E.start,D=E.count;for(let N=R,U=R+D;N<U;N+=3)p(t.getX(N+0),t.getX(N+1),t.getX(N+2))}const M=new z,x=new z,b=new z,S=new z;function A(T){b.fromBufferAttribute(r,T),S.copy(b);const y=a[T];M.copy(y),M.sub(b.multiplyScalar(b.dot(y))).normalize(),x.crossVectors(S,y);const R=x.dot(c[T])<0?-1:1;o.setXYZW(T,M.x,M.y,M.z,R)}for(let T=0,y=v.length;T<y;++T){const E=v[T],R=E.start,D=E.count;for(let N=R,U=R+D;N<U;N+=3)A(t.getX(N+0)),A(t.getX(N+1)),A(t.getX(N+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new fe(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let h=0,d=n.count;h<d;h++)n.setXYZ(h,0,0,0);const r=new z,s=new z,o=new z,a=new z,c=new z,l=new z,u=new z,f=new z;if(t)for(let h=0,d=t.count;h<d;h+=3){const g=t.getX(h+0),_=t.getX(h+1),m=t.getX(h+2);r.fromBufferAttribute(e,g),s.fromBufferAttribute(e,_),o.fromBufferAttribute(e,m),u.subVectors(o,s),f.subVectors(r,s),u.cross(f),a.fromBufferAttribute(n,g),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,m),a.add(u),c.add(u),l.add(u),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let h=0,d=e.count;h<d;h+=3)r.fromBufferAttribute(e,h+0),s.fromBufferAttribute(e,h+1),o.fromBufferAttribute(e,h+2),u.subVectors(o,s),f.subVectors(r,s),u.cross(f),n.setXYZ(h+0,u.x,u.y,u.z),n.setXYZ(h+1,u.x,u.y,u.z),n.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Ie.fromBufferAttribute(t,e),Ie.normalize(),t.setXYZ(e,Ie.x,Ie.y,Ie.z)}toNonIndexed(){function t(a,c){const l=a.array,u=a.itemSize,f=a.normalized,h=new l.constructor(c.length*u);let d=0,g=0;for(let _=0,m=c.length;_<m;_++){a.isInterleavedBufferAttribute?d=c[_]*a.data.stride+a.offset:d=c[_]*u;for(let p=0;p<u;p++)h[g++]=l[d++]}return new fe(h,u,f)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new _e,n=this.index.array,r=this.attributes;for(const a in r){const c=r[a],l=t(c,n);e.setAttribute(a,l)}const s=this.morphAttributes;for(const a in s){const c=[],l=s[a];for(let u=0,f=l.length;u<f;u++){const h=l[u],d=t(h,n);c.push(d)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const c in n){const l=n[c];t.data.attributes[c]=l.toJSON(t.data)}const r={};let s=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],u=[];for(let f=0,h=l.length;f<h;f++){const d=l[f];u.push(d.toJSON(t.data))}u.length>0&&(r[c]=u,s=!0)}s&&(t.data.morphAttributes=r,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const r=t.attributes;for(const l in r){const u=r[l];this.setAttribute(l,u.clone(e))}const s=t.morphAttributes;for(const l in s){const u=[],f=s[l];for(let h=0,d=f.length;h<d;h++)u.push(f[h].clone(e));this.morphAttributes[l]=u}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let l=0,u=o.length;l<u;l++){const f=o[l];this.addGroup(f.start,f.count,f.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const ku=new It,Si=new Zo,ks=new Un,Hu=new z,Hs=new z,Vs=new z,Ws=new z,Ca=new z,Xs=new z,Vu=new z,qs=new z;class ne extends me{constructor(t=new _e,e=new Kn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const r=e[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(t,e){const n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(r,t);const a=this.morphTargetInfluences;if(s&&a){Xs.set(0,0,0);for(let c=0,l=s.length;c<l;c++){const u=a[c],f=s[c];u!==0&&(Ca.fromBufferAttribute(f,t),o?Xs.addScaledVector(Ca,u):Xs.addScaledVector(Ca.sub(e),u))}e.add(Xs)}return e}raycast(t,e){const n=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ks.copy(n.boundingSphere),ks.applyMatrix4(s),Si.copy(t.ray).recast(t.near),!(ks.containsPoint(Si.origin)===!1&&(Si.intersectSphere(ks,Hu)===null||Si.origin.distanceToSquared(Hu)>(t.far-t.near)**2))&&(ku.copy(s).invert(),Si.copy(t.ray).applyMatrix4(ku),!(n.boundingBox!==null&&Si.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Si)))}_computeIntersections(t,e,n){let r;const s=this.geometry,o=this.material,a=s.index,c=s.attributes.position,l=s.attributes.uv,u=s.attributes.uv1,f=s.attributes.normal,h=s.groups,d=s.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=h.length;g<_;g++){const m=h[g],p=o[m.materialIndex],v=Math.max(m.start,d.start),M=Math.min(a.count,Math.min(m.start+m.count,d.start+d.count));for(let x=v,b=M;x<b;x+=3){const S=a.getX(x),A=a.getX(x+1),T=a.getX(x+2);r=js(this,p,t,n,l,u,f,S,A,T),r&&(r.faceIndex=Math.floor(x/3),r.face.materialIndex=m.materialIndex,e.push(r))}}else{const g=Math.max(0,d.start),_=Math.min(a.count,d.start+d.count);for(let m=g,p=_;m<p;m+=3){const v=a.getX(m),M=a.getX(m+1),x=a.getX(m+2);r=js(this,o,t,n,l,u,f,v,M,x),r&&(r.faceIndex=Math.floor(m/3),e.push(r))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,_=h.length;g<_;g++){const m=h[g],p=o[m.materialIndex],v=Math.max(m.start,d.start),M=Math.min(c.count,Math.min(m.start+m.count,d.start+d.count));for(let x=v,b=M;x<b;x+=3){const S=x,A=x+1,T=x+2;r=js(this,p,t,n,l,u,f,S,A,T),r&&(r.faceIndex=Math.floor(x/3),r.face.materialIndex=m.materialIndex,e.push(r))}}else{const g=Math.max(0,d.start),_=Math.min(c.count,d.start+d.count);for(let m=g,p=_;m<p;m+=3){const v=m,M=m+1,x=m+2;r=js(this,o,t,n,l,u,f,v,M,x),r&&(r.faceIndex=Math.floor(m/3),e.push(r))}}}}function sg(i,t,e,n,r,s,o,a){let c;if(t.side===We?c=n.intersectTriangle(o,s,r,!0,a):c=n.intersectTriangle(r,s,o,t.side===ti,a),c===null)return null;qs.copy(a),qs.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo(qs);return l<e.near||l>e.far?null:{distance:l,point:qs.clone(),object:i}}function js(i,t,e,n,r,s,o,a,c,l){i.getVertexPosition(a,Hs),i.getVertexPosition(c,Vs),i.getVertexPosition(l,Ws);const u=sg(i,t,e,n,Hs,Vs,Ws,Vu);if(u){const f=new z;Sn.getBarycoord(Vu,Hs,Vs,Ws,f),r&&(u.uv=Sn.getInterpolatedAttribute(r,a,c,l,f,new Wt)),s&&(u.uv1=Sn.getInterpolatedAttribute(s,a,c,l,f,new Wt)),o&&(u.normal=Sn.getInterpolatedAttribute(o,a,c,l,f,new z),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const h={a,b:c,c:l,normal:new z,materialIndex:0};Sn.getNormal(Hs,Vs,Ws,h.normal),u.face=h,u.barycoord=f}return u}class be extends _e{constructor(t=1,e=1,n=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const c=[],l=[],u=[],f=[];let h=0,d=0;g("z","y","x",-1,-1,n,e,t,o,s,0),g("z","y","x",1,-1,n,e,-t,o,s,1),g("x","z","y",1,1,t,n,e,r,o,2),g("x","z","y",1,-1,t,n,-e,r,o,3),g("x","y","z",1,-1,t,e,n,r,s,4),g("x","y","z",-1,-1,t,e,-n,r,s,5),this.setIndex(c),this.setAttribute("position",new Zt(l,3)),this.setAttribute("normal",new Zt(u,3)),this.setAttribute("uv",new Zt(f,2));function g(_,m,p,v,M,x,b,S,A,T,y){const E=x/A,R=b/T,D=x/2,N=b/2,U=S/2,w=A+1,P=T+1;let F=0,O=0;const K=new z;for(let tt=0;tt<P;tt++){const ut=tt*R-N;for(let dt=0;dt<w;dt++){const bt=dt*E-D;K[_]=bt*v,K[m]=ut*M,K[p]=U,l.push(K.x,K.y,K.z),K[_]=0,K[m]=0,K[p]=S>0?1:-1,u.push(K.x,K.y,K.z),f.push(dt/A),f.push(1-tt/T),F+=1}}for(let tt=0;tt<T;tt++)for(let ut=0;ut<A;ut++){const dt=h+ut+w*tt,bt=h+ut+w*(tt+1),J=h+(ut+1)+w*(tt+1),it=h+(ut+1)+w*tt;c.push(dt,bt,it),c.push(bt,J,it),O+=6}a.addGroup(d,O,y),d+=O,h+=F}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new be(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Tr(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const r=i[e][n];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=r.clone():Array.isArray(r)?t[e][n]=r.slice():t[e][n]=r}}return t}function Be(i){const t={};for(let e=0;e<i.length;e++){const n=Tr(i[e]);for(const r in n)t[r]=n[r]}return t}function og(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function fd(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Yt.workingColorSpace}const ag={clone:Tr,merge:Be};var cg=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,lg=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class An extends In{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=cg,this.fragmentShader=lg,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Tr(t.uniforms),this.uniformsGroups=og(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?e.uniforms[r]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[r]={type:"m4",value:o.toArray()}:e.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class hd extends me{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new It,this.projectionMatrix=new It,this.projectionMatrixInverse=new It,this.coordinateSystem=Zn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const hi=new z,Wu=new Wt,Xu=new Wt;class ke extends hd{constructor(t=50,e=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Ar*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(os*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Ar*2*Math.atan(Math.tan(os*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){hi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(hi.x,hi.y).multiplyScalar(-t/hi.z),hi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(hi.x,hi.y).multiplyScalar(-t/hi.z)}getViewSize(t,e){return this.getViewBounds(t,Wu,Xu),e.subVectors(Xu,Wu)}setViewOffset(t,e,n,r,s,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(os*.5*this.fov)/this.zoom,n=2*e,r=this.aspect*n,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;s+=o.offsetX*r/c,e-=o.offsetY*n/l,r*=o.width/c,n*=o.height/l}const a=this.filmOffset;a!==0&&(s+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const or=-90,ar=1;class ug extends me{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new ke(or,ar,t,e);r.layers=this.layers,this.add(r);const s=new ke(or,ar,t,e);s.layers=this.layers,this.add(s);const o=new ke(or,ar,t,e);o.layers=this.layers,this.add(o);const a=new ke(or,ar,t,e);a.layers=this.layers,this.add(a);const c=new ke(or,ar,t,e);c.layers=this.layers,this.add(c);const l=new ke(or,ar,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,r,s,o,a,c]=e;for(const l of e)this.remove(l);if(t===Zn)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===Bo)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,c,l,u]=this.children,f=t.getRenderTarget(),h=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,r),t.render(e,s),t.setRenderTarget(n,1,r),t.render(e,o),t.setRenderTarget(n,2,r),t.render(e,a),t.setRenderTarget(n,3,r),t.render(e,c),t.setRenderTarget(n,4,r),t.render(e,l),n.texture.generateMipmaps=_,t.setRenderTarget(n,5,r),t.render(e,u),t.setRenderTarget(f,h,d),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class dd extends Ae{constructor(t,e,n,r,s,o,a,c,l,u){t=t!==void 0?t:[],e=e!==void 0?e:yr,super(t,e,n,r,s,o,a,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class fg extends Fi{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},r=[n,n,n,n,n,n];this.texture=new dd(r,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:Pe}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new be(5,5,5),s=new An({name:"CubemapFromEquirect",uniforms:Tr(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:We,blending:_i});s.uniforms.tEquirect.value=e;const o=new ne(r,s),a=e.minFilter;return e.minFilter===En&&(e.minFilter=Pe),new ug(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,n,r){const s=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,r);t.setRenderTarget(s)}}const Ia=new z,hg=new z,dg=new Vt;class Ii{constructor(t=new z(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,r){return this.normal.set(t,e,n),this.constant=r,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const r=Ia.subVectors(n,e).cross(hg.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(r,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(Ia),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const s=-(t.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:e.copy(t.start).addScaledVector(n,s)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||dg.getNormalMatrix(t),r=this.coplanarPoint(Ia).applyMatrix4(t),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ei=new Un,$s=new z;class Ml{constructor(t=new Ii,e=new Ii,n=new Ii,r=new Ii,s=new Ii,o=new Ii){this.planes=[t,e,n,r,s,o]}set(t,e,n,r,s,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Zn){const n=this.planes,r=t.elements,s=r[0],o=r[1],a=r[2],c=r[3],l=r[4],u=r[5],f=r[6],h=r[7],d=r[8],g=r[9],_=r[10],m=r[11],p=r[12],v=r[13],M=r[14],x=r[15];if(n[0].setComponents(c-s,h-l,m-d,x-p).normalize(),n[1].setComponents(c+s,h+l,m+d,x+p).normalize(),n[2].setComponents(c+o,h+u,m+g,x+v).normalize(),n[3].setComponents(c-o,h-u,m-g,x-v).normalize(),n[4].setComponents(c-a,h-f,m-_,x-M).normalize(),e===Zn)n[5].setComponents(c+a,h+f,m+_,x+M).normalize();else if(e===Bo)n[5].setComponents(a,f,_,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Ei.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Ei.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Ei)}intersectsSprite(t){return Ei.center.set(0,0,0),Ei.radius=.7071067811865476,Ei.applyMatrix4(t.matrixWorld),this.intersectsSphere(Ei)}intersectsSphere(t){const e=this.planes,n=t.center,r=-t.radius;for(let s=0;s<6;s++)if(e[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const r=e[n];if($s.x=r.normal.x>0?t.max.x:t.min.x,$s.y=r.normal.y>0?t.max.y:t.min.y,$s.z=r.normal.z>0?t.max.z:t.min.z,r.distanceToPoint($s)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function pd(){let i=null,t=!1,e=null,n=null;function r(s,o){e(s,o),n=i.requestAnimationFrame(r)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(r),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(s){e=s},setContext:function(s){i=s}}}function pg(i){const t=new WeakMap;function e(a,c){const l=a.array,u=a.usage,f=l.byteLength,h=i.createBuffer();i.bindBuffer(c,h),i.bufferData(c,l,u),a.onUploadCallback();let d;if(l instanceof Float32Array)d=i.FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?d=i.HALF_FLOAT:d=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)d=i.SHORT;else if(l instanceof Uint32Array)d=i.UNSIGNED_INT;else if(l instanceof Int32Array)d=i.INT;else if(l instanceof Int8Array)d=i.BYTE;else if(l instanceof Uint8Array)d=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)d=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:h,type:d,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:f}}function n(a,c,l){const u=c.array,f=c.updateRanges;if(i.bindBuffer(l,a),f.length===0)i.bufferSubData(l,0,u);else{f.sort((d,g)=>d.start-g.start);let h=0;for(let d=1;d<f.length;d++){const g=f[h],_=f[d];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++h,f[h]=_)}f.length=h+1;for(let d=0,g=f.length;d<g;d++){const _=f[d];i.bufferSubData(l,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=t.get(a);c&&(i.deleteBuffer(c.buffer),t.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=t.get(a);(!u||u.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const l=t.get(a);if(l===void 0)t.set(a,e(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:r,remove:s,update:o}}class ln extends _e{constructor(t=1,e=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:r};const s=t/2,o=e/2,a=Math.floor(n),c=Math.floor(r),l=a+1,u=c+1,f=t/a,h=e/c,d=[],g=[],_=[],m=[];for(let p=0;p<u;p++){const v=p*h-o;for(let M=0;M<l;M++){const x=M*f-s;g.push(x,-v,0),_.push(0,0,1),m.push(M/a),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let v=0;v<a;v++){const M=v+l*p,x=v+l*(p+1),b=v+1+l*(p+1),S=v+1+l*p;d.push(M,x,S),d.push(x,b,S)}this.setIndex(d),this.setAttribute("position",new Zt(g,3)),this.setAttribute("normal",new Zt(_,3)),this.setAttribute("uv",new Zt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ln(t.width,t.height,t.widthSegments,t.heightSegments)}}var mg=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,gg=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,_g=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,xg=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,vg=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Mg=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,yg=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Sg=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Eg=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,bg=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Ag=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Tg=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,wg=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Rg=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Cg=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Ig=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Pg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Lg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Dg=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Ug=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Ng=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Og=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,zg=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Fg=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Bg=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Gg=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,kg=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Hg=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Vg=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Wg=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Xg="gl_FragColor = linearToOutputTexel( gl_FragColor );",qg=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,jg=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,$g=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Yg=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Zg=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Kg=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Jg=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Qg=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,t_=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,e_=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,n_=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,i_=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,r_=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,s_=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,o_=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,a_=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,c_=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,l_=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,u_=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,f_=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,h_=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,d_=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,p_=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,m_=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,g_=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,__=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,x_=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,v_=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,M_=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,y_=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,S_=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,E_=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,b_=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,A_=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,T_=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,w_=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,R_=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,C_=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,I_=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,P_=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,L_=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,D_=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,U_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,N_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,O_=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,z_=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,F_=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,B_=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,G_=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,k_=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,H_=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,V_=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,W_=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,X_=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,q_=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,j_=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,$_=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Y_=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Z_=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,K_=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,J_=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Q_=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,tx=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,ex=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,nx=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,ix=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,rx=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,sx=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,ox=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,ax=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,cx=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,lx=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,ux=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,fx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,hx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,dx=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const px=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,mx=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,gx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,_x=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,xx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,vx=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Mx=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,yx=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Sx=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Ex=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,bx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Ax=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Tx=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,wx=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Rx=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Cx=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ix=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Px=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Lx=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Dx=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ux=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Nx=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Ox=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,zx=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Fx=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Bx=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Gx=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,kx=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Hx=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Vx=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Wx=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Xx=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,qx=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,jx=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ht={alphahash_fragment:mg,alphahash_pars_fragment:gg,alphamap_fragment:_g,alphamap_pars_fragment:xg,alphatest_fragment:vg,alphatest_pars_fragment:Mg,aomap_fragment:yg,aomap_pars_fragment:Sg,batching_pars_vertex:Eg,batching_vertex:bg,begin_vertex:Ag,beginnormal_vertex:Tg,bsdfs:wg,iridescence_fragment:Rg,bumpmap_pars_fragment:Cg,clipping_planes_fragment:Ig,clipping_planes_pars_fragment:Pg,clipping_planes_pars_vertex:Lg,clipping_planes_vertex:Dg,color_fragment:Ug,color_pars_fragment:Ng,color_pars_vertex:Og,color_vertex:zg,common:Fg,cube_uv_reflection_fragment:Bg,defaultnormal_vertex:Gg,displacementmap_pars_vertex:kg,displacementmap_vertex:Hg,emissivemap_fragment:Vg,emissivemap_pars_fragment:Wg,colorspace_fragment:Xg,colorspace_pars_fragment:qg,envmap_fragment:jg,envmap_common_pars_fragment:$g,envmap_pars_fragment:Yg,envmap_pars_vertex:Zg,envmap_physical_pars_fragment:a_,envmap_vertex:Kg,fog_vertex:Jg,fog_pars_vertex:Qg,fog_fragment:t_,fog_pars_fragment:e_,gradientmap_pars_fragment:n_,lightmap_pars_fragment:i_,lights_lambert_fragment:r_,lights_lambert_pars_fragment:s_,lights_pars_begin:o_,lights_toon_fragment:c_,lights_toon_pars_fragment:l_,lights_phong_fragment:u_,lights_phong_pars_fragment:f_,lights_physical_fragment:h_,lights_physical_pars_fragment:d_,lights_fragment_begin:p_,lights_fragment_maps:m_,lights_fragment_end:g_,logdepthbuf_fragment:__,logdepthbuf_pars_fragment:x_,logdepthbuf_pars_vertex:v_,logdepthbuf_vertex:M_,map_fragment:y_,map_pars_fragment:S_,map_particle_fragment:E_,map_particle_pars_fragment:b_,metalnessmap_fragment:A_,metalnessmap_pars_fragment:T_,morphinstance_vertex:w_,morphcolor_vertex:R_,morphnormal_vertex:C_,morphtarget_pars_vertex:I_,morphtarget_vertex:P_,normal_fragment_begin:L_,normal_fragment_maps:D_,normal_pars_fragment:U_,normal_pars_vertex:N_,normal_vertex:O_,normalmap_pars_fragment:z_,clearcoat_normal_fragment_begin:F_,clearcoat_normal_fragment_maps:B_,clearcoat_pars_fragment:G_,iridescence_pars_fragment:k_,opaque_fragment:H_,packing:V_,premultiplied_alpha_fragment:W_,project_vertex:X_,dithering_fragment:q_,dithering_pars_fragment:j_,roughnessmap_fragment:$_,roughnessmap_pars_fragment:Y_,shadowmap_pars_fragment:Z_,shadowmap_pars_vertex:K_,shadowmap_vertex:J_,shadowmask_pars_fragment:Q_,skinbase_vertex:tx,skinning_pars_vertex:ex,skinning_vertex:nx,skinnormal_vertex:ix,specularmap_fragment:rx,specularmap_pars_fragment:sx,tonemapping_fragment:ox,tonemapping_pars_fragment:ax,transmission_fragment:cx,transmission_pars_fragment:lx,uv_pars_fragment:ux,uv_pars_vertex:fx,uv_vertex:hx,worldpos_vertex:dx,background_vert:px,background_frag:mx,backgroundCube_vert:gx,backgroundCube_frag:_x,cube_vert:xx,cube_frag:vx,depth_vert:Mx,depth_frag:yx,distanceRGBA_vert:Sx,distanceRGBA_frag:Ex,equirect_vert:bx,equirect_frag:Ax,linedashed_vert:Tx,linedashed_frag:wx,meshbasic_vert:Rx,meshbasic_frag:Cx,meshlambert_vert:Ix,meshlambert_frag:Px,meshmatcap_vert:Lx,meshmatcap_frag:Dx,meshnormal_vert:Ux,meshnormal_frag:Nx,meshphong_vert:Ox,meshphong_frag:zx,meshphysical_vert:Fx,meshphysical_frag:Bx,meshtoon_vert:Gx,meshtoon_frag:kx,points_vert:Hx,points_frag:Vx,shadow_vert:Wx,shadow_frag:Xx,sprite_vert:qx,sprite_frag:jx},mt={common:{diffuse:{value:new Lt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Vt},alphaMap:{value:null},alphaMapTransform:{value:new Vt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Vt}},envmap:{envMap:{value:null},envMapRotation:{value:new Vt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Vt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Vt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Vt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Vt},normalScale:{value:new Wt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Vt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Vt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Vt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Vt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Lt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Lt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Vt},alphaTest:{value:0},uvTransform:{value:new Vt}},sprite:{diffuse:{value:new Lt(16777215)},opacity:{value:1},center:{value:new Wt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Vt},alphaMap:{value:null},alphaMapTransform:{value:new Vt},alphaTest:{value:0}}},Rn={basic:{uniforms:Be([mt.common,mt.specularmap,mt.envmap,mt.aomap,mt.lightmap,mt.fog]),vertexShader:Ht.meshbasic_vert,fragmentShader:Ht.meshbasic_frag},lambert:{uniforms:Be([mt.common,mt.specularmap,mt.envmap,mt.aomap,mt.lightmap,mt.emissivemap,mt.bumpmap,mt.normalmap,mt.displacementmap,mt.fog,mt.lights,{emissive:{value:new Lt(0)}}]),vertexShader:Ht.meshlambert_vert,fragmentShader:Ht.meshlambert_frag},phong:{uniforms:Be([mt.common,mt.specularmap,mt.envmap,mt.aomap,mt.lightmap,mt.emissivemap,mt.bumpmap,mt.normalmap,mt.displacementmap,mt.fog,mt.lights,{emissive:{value:new Lt(0)},specular:{value:new Lt(1118481)},shininess:{value:30}}]),vertexShader:Ht.meshphong_vert,fragmentShader:Ht.meshphong_frag},standard:{uniforms:Be([mt.common,mt.envmap,mt.aomap,mt.lightmap,mt.emissivemap,mt.bumpmap,mt.normalmap,mt.displacementmap,mt.roughnessmap,mt.metalnessmap,mt.fog,mt.lights,{emissive:{value:new Lt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ht.meshphysical_vert,fragmentShader:Ht.meshphysical_frag},toon:{uniforms:Be([mt.common,mt.aomap,mt.lightmap,mt.emissivemap,mt.bumpmap,mt.normalmap,mt.displacementmap,mt.gradientmap,mt.fog,mt.lights,{emissive:{value:new Lt(0)}}]),vertexShader:Ht.meshtoon_vert,fragmentShader:Ht.meshtoon_frag},matcap:{uniforms:Be([mt.common,mt.bumpmap,mt.normalmap,mt.displacementmap,mt.fog,{matcap:{value:null}}]),vertexShader:Ht.meshmatcap_vert,fragmentShader:Ht.meshmatcap_frag},points:{uniforms:Be([mt.points,mt.fog]),vertexShader:Ht.points_vert,fragmentShader:Ht.points_frag},dashed:{uniforms:Be([mt.common,mt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ht.linedashed_vert,fragmentShader:Ht.linedashed_frag},depth:{uniforms:Be([mt.common,mt.displacementmap]),vertexShader:Ht.depth_vert,fragmentShader:Ht.depth_frag},normal:{uniforms:Be([mt.common,mt.bumpmap,mt.normalmap,mt.displacementmap,{opacity:{value:1}}]),vertexShader:Ht.meshnormal_vert,fragmentShader:Ht.meshnormal_frag},sprite:{uniforms:Be([mt.sprite,mt.fog]),vertexShader:Ht.sprite_vert,fragmentShader:Ht.sprite_frag},background:{uniforms:{uvTransform:{value:new Vt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ht.background_vert,fragmentShader:Ht.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Vt}},vertexShader:Ht.backgroundCube_vert,fragmentShader:Ht.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ht.cube_vert,fragmentShader:Ht.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ht.equirect_vert,fragmentShader:Ht.equirect_frag},distanceRGBA:{uniforms:Be([mt.common,mt.displacementmap,{referencePosition:{value:new z},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ht.distanceRGBA_vert,fragmentShader:Ht.distanceRGBA_frag},shadow:{uniforms:Be([mt.lights,mt.fog,{color:{value:new Lt(0)},opacity:{value:1}}]),vertexShader:Ht.shadow_vert,fragmentShader:Ht.shadow_frag}};Rn.physical={uniforms:Be([Rn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Vt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Vt},clearcoatNormalScale:{value:new Wt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Vt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Vt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Vt},sheen:{value:0},sheenColor:{value:new Lt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Vt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Vt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Vt},transmissionSamplerSize:{value:new Wt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Vt},attenuationDistance:{value:0},attenuationColor:{value:new Lt(0)},specularColor:{value:new Lt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Vt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Vt},anisotropyVector:{value:new Wt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Vt}}]),vertexShader:Ht.meshphysical_vert,fragmentShader:Ht.meshphysical_frag};const Ys={r:0,b:0,g:0},bi=new Pn,$x=new It;function Yx(i,t,e,n,r,s,o){const a=new Lt(0);let c=s===!0?0:1,l,u,f=null,h=0,d=null;function g(v){let M=v.isScene===!0?v.background:null;return M&&M.isTexture&&(M=(v.backgroundBlurriness>0?e:t).get(M)),M}function _(v){let M=!1;const x=g(v);x===null?p(a,c):x&&x.isColor&&(p(x,1),M=!0);const b=i.xr.getEnvironmentBlendMode();b==="additive"?n.buffers.color.setClear(0,0,0,1,o):b==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||M)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(v,M){const x=g(M);x&&(x.isCubeTexture||x.mapping===$o)?(u===void 0&&(u=new ne(new be(1,1,1),new An({name:"BackgroundCubeMaterial",uniforms:Tr(Rn.backgroundCube.uniforms),vertexShader:Rn.backgroundCube.vertexShader,fragmentShader:Rn.backgroundCube.fragmentShader,side:We,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(b,S,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),bi.copy(M.backgroundRotation),bi.x*=-1,bi.y*=-1,bi.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(bi.y*=-1,bi.z*=-1),u.material.uniforms.envMap.value=x,u.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4($x.makeRotationFromEuler(bi)),u.material.toneMapped=Yt.getTransfer(x.colorSpace)!==oe,(f!==x||h!==x.version||d!==i.toneMapping)&&(u.material.needsUpdate=!0,f=x,h=x.version,d=i.toneMapping),u.layers.enableAll(),v.unshift(u,u.geometry,u.material,0,0,null)):x&&x.isTexture&&(l===void 0&&(l=new ne(new ln(2,2),new An({name:"BackgroundMaterial",uniforms:Tr(Rn.background.uniforms),vertexShader:Rn.background.vertexShader,fragmentShader:Rn.background.fragmentShader,side:ti,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(l)),l.material.uniforms.t2D.value=x,l.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,l.material.toneMapped=Yt.getTransfer(x.colorSpace)!==oe,x.matrixAutoUpdate===!0&&x.updateMatrix(),l.material.uniforms.uvTransform.value.copy(x.matrix),(f!==x||h!==x.version||d!==i.toneMapping)&&(l.material.needsUpdate=!0,f=x,h=x.version,d=i.toneMapping),l.layers.enableAll(),v.unshift(l,l.geometry,l.material,0,0,null))}function p(v,M){v.getRGB(Ys,fd(i)),n.buffers.color.setClear(Ys.r,Ys.g,Ys.b,M,o)}return{getClearColor:function(){return a},setClearColor:function(v,M=1){a.set(v),c=M,p(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(v){c=v,p(a,c)},render:_,addToRenderList:m}}function Zx(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=h(null);let s=r,o=!1;function a(E,R,D,N,U){let w=!1;const P=f(N,D,R);s!==P&&(s=P,l(s.object)),w=d(E,N,D,U),w&&g(E,N,D,U),U!==null&&t.update(U,i.ELEMENT_ARRAY_BUFFER),(w||o)&&(o=!1,x(E,R,D,N),U!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(U).buffer))}function c(){return i.createVertexArray()}function l(E){return i.bindVertexArray(E)}function u(E){return i.deleteVertexArray(E)}function f(E,R,D){const N=D.wireframe===!0;let U=n[E.id];U===void 0&&(U={},n[E.id]=U);let w=U[R.id];w===void 0&&(w={},U[R.id]=w);let P=w[N];return P===void 0&&(P=h(c()),w[N]=P),P}function h(E){const R=[],D=[],N=[];for(let U=0;U<e;U++)R[U]=0,D[U]=0,N[U]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:R,enabledAttributes:D,attributeDivisors:N,object:E,attributes:{},index:null}}function d(E,R,D,N){const U=s.attributes,w=R.attributes;let P=0;const F=D.getAttributes();for(const O in F)if(F[O].location>=0){const tt=U[O];let ut=w[O];if(ut===void 0&&(O==="instanceMatrix"&&E.instanceMatrix&&(ut=E.instanceMatrix),O==="instanceColor"&&E.instanceColor&&(ut=E.instanceColor)),tt===void 0||tt.attribute!==ut||ut&&tt.data!==ut.data)return!0;P++}return s.attributesNum!==P||s.index!==N}function g(E,R,D,N){const U={},w=R.attributes;let P=0;const F=D.getAttributes();for(const O in F)if(F[O].location>=0){let tt=w[O];tt===void 0&&(O==="instanceMatrix"&&E.instanceMatrix&&(tt=E.instanceMatrix),O==="instanceColor"&&E.instanceColor&&(tt=E.instanceColor));const ut={};ut.attribute=tt,tt&&tt.data&&(ut.data=tt.data),U[O]=ut,P++}s.attributes=U,s.attributesNum=P,s.index=N}function _(){const E=s.newAttributes;for(let R=0,D=E.length;R<D;R++)E[R]=0}function m(E){p(E,0)}function p(E,R){const D=s.newAttributes,N=s.enabledAttributes,U=s.attributeDivisors;D[E]=1,N[E]===0&&(i.enableVertexAttribArray(E),N[E]=1),U[E]!==R&&(i.vertexAttribDivisor(E,R),U[E]=R)}function v(){const E=s.newAttributes,R=s.enabledAttributes;for(let D=0,N=R.length;D<N;D++)R[D]!==E[D]&&(i.disableVertexAttribArray(D),R[D]=0)}function M(E,R,D,N,U,w,P){P===!0?i.vertexAttribIPointer(E,R,D,U,w):i.vertexAttribPointer(E,R,D,N,U,w)}function x(E,R,D,N){_();const U=N.attributes,w=D.getAttributes(),P=R.defaultAttributeValues;for(const F in w){const O=w[F];if(O.location>=0){let K=U[F];if(K===void 0&&(F==="instanceMatrix"&&E.instanceMatrix&&(K=E.instanceMatrix),F==="instanceColor"&&E.instanceColor&&(K=E.instanceColor)),K!==void 0){const tt=K.normalized,ut=K.itemSize,dt=t.get(K);if(dt===void 0)continue;const bt=dt.buffer,J=dt.type,it=dt.bytesPerElement,_t=J===i.INT||J===i.UNSIGNED_INT||K.gpuType===hl;if(K.isInterleavedBufferAttribute){const ft=K.data,At=ft.stride,Rt=K.offset;if(ft.isInstancedInterleavedBuffer){for(let Dt=0;Dt<O.locationSize;Dt++)p(O.location+Dt,ft.meshPerAttribute);E.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=ft.meshPerAttribute*ft.count)}else for(let Dt=0;Dt<O.locationSize;Dt++)m(O.location+Dt);i.bindBuffer(i.ARRAY_BUFFER,bt);for(let Dt=0;Dt<O.locationSize;Dt++)M(O.location+Dt,ut/O.locationSize,J,tt,At*it,(Rt+ut/O.locationSize*Dt)*it,_t)}else{if(K.isInstancedBufferAttribute){for(let ft=0;ft<O.locationSize;ft++)p(O.location+ft,K.meshPerAttribute);E.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=K.meshPerAttribute*K.count)}else for(let ft=0;ft<O.locationSize;ft++)m(O.location+ft);i.bindBuffer(i.ARRAY_BUFFER,bt);for(let ft=0;ft<O.locationSize;ft++)M(O.location+ft,ut/O.locationSize,J,tt,ut*it,ut/O.locationSize*ft*it,_t)}}else if(P!==void 0){const tt=P[F];if(tt!==void 0)switch(tt.length){case 2:i.vertexAttrib2fv(O.location,tt);break;case 3:i.vertexAttrib3fv(O.location,tt);break;case 4:i.vertexAttrib4fv(O.location,tt);break;default:i.vertexAttrib1fv(O.location,tt)}}}}v()}function b(){T();for(const E in n){const R=n[E];for(const D in R){const N=R[D];for(const U in N)u(N[U].object),delete N[U];delete R[D]}delete n[E]}}function S(E){if(n[E.id]===void 0)return;const R=n[E.id];for(const D in R){const N=R[D];for(const U in N)u(N[U].object),delete N[U];delete R[D]}delete n[E.id]}function A(E){for(const R in n){const D=n[R];if(D[E.id]===void 0)continue;const N=D[E.id];for(const U in N)u(N[U].object),delete N[U];delete D[E.id]}}function T(){y(),o=!0,s!==r&&(s=r,l(s.object))}function y(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:T,resetDefaultState:y,dispose:b,releaseStatesOfGeometry:S,releaseStatesOfProgram:A,initAttributes:_,enableAttribute:m,disableUnusedAttributes:v}}function Kx(i,t,e){let n;function r(l){n=l}function s(l,u){i.drawArrays(n,l,u),e.update(u,n,1)}function o(l,u,f){f!==0&&(i.drawArraysInstanced(n,l,u,f),e.update(u,n,f))}function a(l,u,f){if(f===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,u,0,f);let d=0;for(let g=0;g<f;g++)d+=u[g];e.update(d,n,1)}function c(l,u,f,h){if(f===0)return;const d=t.get("WEBGL_multi_draw");if(d===null)for(let g=0;g<l.length;g++)o(l[g],u[g],h[g]);else{d.multiDrawArraysInstancedWEBGL(n,l,0,u,0,h,0,f);let g=0;for(let _=0;_<f;_++)g+=u[_]*h[_];e.update(g,n,1)}}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function Jx(i,t,e,n){let r;function s(){if(r!==void 0)return r;if(t.has("EXT_texture_filter_anisotropic")===!0){const A=t.get("EXT_texture_filter_anisotropic");r=i.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(A){return!(A!==on&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(A){const T=A===Yn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(A!==ei&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==$e&&!T)}function c(A){if(A==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const u=c(l);u!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);const f=e.logarithmicDepthBuffer===!0,h=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),v=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),M=i.getParameter(i.MAX_VARYING_VECTORS),x=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),b=g>0,S=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:f,reverseDepthBuffer:h,maxTextures:d,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:v,maxVaryings:M,maxFragmentUniforms:x,vertexTextures:b,maxSamples:S}}function Qx(i){const t=this;let e=null,n=0,r=!1,s=!1;const o=new Ii,a=new Vt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(f,h){const d=f.length!==0||h||n!==0||r;return r=h,n=f.length,d},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(f,h){e=u(f,h,0)},this.setState=function(f,h,d){const g=f.clippingPlanes,_=f.clipIntersection,m=f.clipShadows,p=i.get(f);if(!r||g===null||g.length===0||s&&!m)s?u(null):l();else{const v=s?0:n,M=v*4;let x=p.clippingState||null;c.value=x,x=u(g,h,M,d);for(let b=0;b!==M;++b)x[b]=e[b];p.clippingState=x,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=v}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function u(f,h,d,g){const _=f!==null?f.length:0;let m=null;if(_!==0){if(m=c.value,g!==!0||m===null){const p=d+_*4,v=h.matrixWorldInverse;a.getNormalMatrix(v),(m===null||m.length<p)&&(m=new Float32Array(p));for(let M=0,x=d;M!==_;++M,x+=4)o.copy(f[M]).applyMatrix4(v,a),o.normal.toArray(m,x),m[x+3]=o.constant}c.value=m,c.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,m}}function tv(i){let t=new WeakMap;function e(o,a){return a===_c?o.mapping=yr:a===xc&&(o.mapping=Sr),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===_c||a===xc)if(t.has(o)){const c=t.get(o).texture;return e(c,o.mapping)}else{const c=o.image;if(c&&c.height>0){const l=new fg(c.height);return l.fromEquirectangularTexture(i,o),t.set(o,l),o.addEventListener("dispose",r),e(l.texture,o.mapping)}else return null}}return o}function r(o){const a=o.target;a.removeEventListener("dispose",r);const c=t.get(a);c!==void 0&&(t.delete(a),c.dispose())}function s(){t=new WeakMap}return{get:n,dispose:s}}class yl extends hd{constructor(t=-1,e=1,n=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=n-t,o=n+t,a=r+e,c=r-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,o=s+l*this.view.width,a-=u*this.view.offsetY,c=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const hr=4,qu=[.125,.215,.35,.446,.526,.582],Di=20,Pa=new yl,ju=new Lt;let La=null,Da=0,Ua=0,Na=!1;const Pi=(1+Math.sqrt(5))/2,cr=1/Pi,$u=[new z(-Pi,cr,0),new z(Pi,cr,0),new z(-cr,0,Pi),new z(cr,0,Pi),new z(0,Pi,-cr),new z(0,Pi,cr),new z(-1,1,-1),new z(1,1,-1),new z(-1,1,1),new z(1,1,1)];class Go{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,r=100){La=this._renderer.getRenderTarget(),Da=this._renderer.getActiveCubeFace(),Ua=this._renderer.getActiveMipmapLevel(),Na=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(t,n,r,s),e>0&&this._blur(s,0,0,e),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ku(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Zu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(La,Da,Ua),this._renderer.xr.enabled=Na,t.scissorTest=!1,Zs(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===yr||t.mapping===Sr?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),La=this._renderer.getRenderTarget(),Da=this._renderer.getActiveCubeFace(),Ua=this._renderer.getActiveMipmapLevel(),Na=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Pe,minFilter:Pe,generateMipmaps:!1,type:Yn,format:on,colorSpace:ze,depthBuffer:!1},r=Yu(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Yu(t,e,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=ev(s)),this._blurMaterial=nv(s,t,e)}return r}_compileMaterial(t){const e=new ne(this._lodPlanes[0],t);this._renderer.compile(e,Pa)}_sceneToCubeUV(t,e,n,r){const a=new ke(90,1,e,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],u=this._renderer,f=u.autoClear,h=u.toneMapping;u.getClearColor(ju),u.toneMapping=xi,u.autoClear=!1;const d=new Kn({name:"PMREM.Background",side:We,depthWrite:!1,depthTest:!1}),g=new ne(new be,d);let _=!1;const m=t.background;m?m.isColor&&(d.color.copy(m),t.background=null,_=!0):(d.color.copy(ju),_=!0);for(let p=0;p<6;p++){const v=p%3;v===0?(a.up.set(0,c[p],0),a.lookAt(l[p],0,0)):v===1?(a.up.set(0,0,c[p]),a.lookAt(0,l[p],0)):(a.up.set(0,c[p],0),a.lookAt(0,0,l[p]));const M=this._cubeSize;Zs(r,v*M,p>2?M:0,M,M),u.setRenderTarget(r),_&&u.render(g,a),u.render(t,a)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=h,u.autoClear=f,t.background=m}_textureToCubeUV(t,e){const n=this._renderer,r=t.mapping===yr||t.mapping===Sr;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ku()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Zu());const s=r?this._cubemapMaterial:this._equirectMaterial,o=new ne(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=t;const c=this._cubeSize;Zs(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(o,Pa)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const r=this._lodPlanes.length;for(let s=1;s<r;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=$u[(r-s-1)%$u.length];this._blur(t,s-1,s,o,a)}e.autoClear=n}_blur(t,e,n,r,s){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,r,"latitudinal",s),this._halfBlur(o,t,n,n,r,"longitudinal",s)}_halfBlur(t,e,n,r,s,o,a){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,f=new ne(this._lodPlanes[r],l),h=l.uniforms,d=this._sizeLods[n]-1,g=isFinite(s)?Math.PI/(2*d):2*Math.PI/(2*Di-1),_=s/g,m=isFinite(s)?1+Math.floor(u*_):Di;m>Di&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Di}`);const p=[];let v=0;for(let A=0;A<Di;++A){const T=A/_,y=Math.exp(-T*T/2);p.push(y),A===0?v+=y:A<m&&(v+=2*y)}for(let A=0;A<p.length;A++)p[A]=p[A]/v;h.envMap.value=t.texture,h.samples.value=m,h.weights.value=p,h.latitudinal.value=o==="latitudinal",a&&(h.poleAxis.value=a);const{_lodMax:M}=this;h.dTheta.value=g,h.mipInt.value=M-n;const x=this._sizeLods[r],b=3*x*(r>M-hr?r-M+hr:0),S=4*(this._cubeSize-x);Zs(e,b,S,3*x,2*x),c.setRenderTarget(e),c.render(f,Pa)}}function ev(i){const t=[],e=[],n=[];let r=i;const s=i-hr+1+qu.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);e.push(a);let c=1/a;o>i-hr?c=qu[o-i+hr-1]:o===0&&(c=0),n.push(c);const l=1/(a-2),u=-l,f=1+l,h=[u,u,f,u,f,f,u,u,f,f,u,f],d=6,g=6,_=3,m=2,p=1,v=new Float32Array(_*g*d),M=new Float32Array(m*g*d),x=new Float32Array(p*g*d);for(let S=0;S<d;S++){const A=S%3*2/3-1,T=S>2?0:-1,y=[A,T,0,A+2/3,T,0,A+2/3,T+1,0,A,T,0,A+2/3,T+1,0,A,T+1,0];v.set(y,_*g*S),M.set(h,m*g*S);const E=[S,S,S,S,S,S];x.set(E,p*g*S)}const b=new _e;b.setAttribute("position",new fe(v,_)),b.setAttribute("uv",new fe(M,m)),b.setAttribute("faceIndex",new fe(x,p)),t.push(b),r>hr&&r--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Yu(i,t,e){const n=new Fi(i,t,e);return n.texture.mapping=$o,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Zs(i,t,e,n,r){i.viewport.set(t,e,n,r),i.scissor.set(t,e,n,r)}function nv(i,t,e){const n=new Float32Array(Di),r=new z(0,1,0);return new An({name:"SphericalGaussianBlur",defines:{n:Di,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Sl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:_i,depthTest:!1,depthWrite:!1})}function Zu(){return new An({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Sl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:_i,depthTest:!1,depthWrite:!1})}function Ku(){return new An({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Sl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:_i,depthTest:!1,depthWrite:!1})}function Sl(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function iv(i){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const c=a.mapping,l=c===_c||c===xc,u=c===yr||c===Sr;if(l||u){let f=t.get(a);const h=f!==void 0?f.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==h)return e===null&&(e=new Go(i)),f=l?e.fromEquirectangular(a,f):e.fromCubemap(a,f),f.texture.pmremVersion=a.pmremVersion,t.set(a,f),f.texture;if(f!==void 0)return f.texture;{const d=a.image;return l&&d&&d.height>0||u&&d&&r(d)?(e===null&&(e=new Go(i)),f=l?e.fromEquirectangular(a):e.fromCubemap(a),f.texture.pmremVersion=a.pmremVersion,t.set(a,f),a.addEventListener("dispose",s),f.texture):null}}}return a}function r(a){let c=0;const l=6;for(let u=0;u<l;u++)a[u]!==void 0&&c++;return c===l}function s(a){const c=a.target;c.removeEventListener("dispose",s);const l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function rv(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let r;switch(n){case"WEBGL_depth_texture":r=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=i.getExtension(n)}return t[n]=r,r}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const r=e(n);return r===null&&es("THREE.WebGLRenderer: "+n+" extension not supported."),r}}}function sv(i,t,e,n){const r={},s=new WeakMap;function o(f){const h=f.target;h.index!==null&&t.remove(h.index);for(const g in h.attributes)t.remove(h.attributes[g]);for(const g in h.morphAttributes){const _=h.morphAttributes[g];for(let m=0,p=_.length;m<p;m++)t.remove(_[m])}h.removeEventListener("dispose",o),delete r[h.id];const d=s.get(h);d&&(t.remove(d),s.delete(h)),n.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,e.memory.geometries--}function a(f,h){return r[h.id]===!0||(h.addEventListener("dispose",o),r[h.id]=!0,e.memory.geometries++),h}function c(f){const h=f.attributes;for(const g in h)t.update(h[g],i.ARRAY_BUFFER);const d=f.morphAttributes;for(const g in d){const _=d[g];for(let m=0,p=_.length;m<p;m++)t.update(_[m],i.ARRAY_BUFFER)}}function l(f){const h=[],d=f.index,g=f.attributes.position;let _=0;if(d!==null){const v=d.array;_=d.version;for(let M=0,x=v.length;M<x;M+=3){const b=v[M+0],S=v[M+1],A=v[M+2];h.push(b,S,S,A,A,b)}}else if(g!==void 0){const v=g.array;_=g.version;for(let M=0,x=v.length/3-1;M<x;M+=3){const b=M+0,S=M+1,A=M+2;h.push(b,S,S,A,A,b)}}else return;const m=new(rd(h)?ud:ld)(h,1);m.version=_;const p=s.get(f);p&&t.remove(p),s.set(f,m)}function u(f){const h=s.get(f);if(h){const d=f.index;d!==null&&h.version<d.version&&l(f)}else l(f);return s.get(f)}return{get:a,update:c,getWireframeAttribute:u}}function ov(i,t,e){let n;function r(h){n=h}let s,o;function a(h){s=h.type,o=h.bytesPerElement}function c(h,d){i.drawElements(n,d,s,h*o),e.update(d,n,1)}function l(h,d,g){g!==0&&(i.drawElementsInstanced(n,d,s,h*o,g),e.update(d,n,g))}function u(h,d,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,s,h,0,g);let m=0;for(let p=0;p<g;p++)m+=d[p];e.update(m,n,1)}function f(h,d,g,_){if(g===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<h.length;p++)l(h[p]/o,d[p],_[p]);else{m.multiDrawElementsInstancedWEBGL(n,d,0,s,h,0,_,0,g);let p=0;for(let v=0;v<g;v++)p+=d[v]*_[v];e.update(p,n,1)}}this.setMode=r,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=u,this.renderMultiDrawInstances=f}function av(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(s/3);break;case i.LINES:e.lines+=a*(s/2);break;case i.LINE_STRIP:e.lines+=a*(s-1);break;case i.LINE_LOOP:e.lines+=a*s;break;case i.POINTS:e.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:r,update:n}}function cv(i,t,e){const n=new WeakMap,r=new Qt;function s(o,a,c){const l=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,f=u!==void 0?u.length:0;let h=n.get(a);if(h===void 0||h.count!==f){let y=function(){A.dispose(),n.delete(a),a.removeEventListener("dispose",y)};h!==void 0&&h.texture.dispose();const d=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,_=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],p=a.morphAttributes.normal||[],v=a.morphAttributes.color||[];let M=0;d===!0&&(M=1),g===!0&&(M=2),_===!0&&(M=3);let x=a.attributes.position.count*M,b=1;x>t.maxTextureSize&&(b=Math.ceil(x/t.maxTextureSize),x=t.maxTextureSize);const S=new Float32Array(x*b*4*f),A=new od(S,x,b,f);A.type=$e,A.needsUpdate=!0;const T=M*4;for(let E=0;E<f;E++){const R=m[E],D=p[E],N=v[E],U=x*b*4*E;for(let w=0;w<R.count;w++){const P=w*T;d===!0&&(r.fromBufferAttribute(R,w),S[U+P+0]=r.x,S[U+P+1]=r.y,S[U+P+2]=r.z,S[U+P+3]=0),g===!0&&(r.fromBufferAttribute(D,w),S[U+P+4]=r.x,S[U+P+5]=r.y,S[U+P+6]=r.z,S[U+P+7]=0),_===!0&&(r.fromBufferAttribute(N,w),S[U+P+8]=r.x,S[U+P+9]=r.y,S[U+P+10]=r.z,S[U+P+11]=N.itemSize===4?r.w:1)}}h={count:f,texture:A,size:new Wt(x,b)},n.set(a,h),a.addEventListener("dispose",y)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let d=0;for(let _=0;_<l.length;_++)d+=l[_];const g=a.morphTargetsRelative?1:1-d;c.getUniforms().setValue(i,"morphTargetBaseInfluence",g),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",h.texture,e),c.getUniforms().setValue(i,"morphTargetsTextureSize",h.size)}return{update:s}}function lv(i,t,e,n){let r=new WeakMap;function s(c){const l=n.render.frame,u=c.geometry,f=t.get(c,u);if(r.get(f)!==l&&(t.update(f),r.set(f,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),r.get(c)!==l&&(e.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,l))),c.isSkinnedMesh){const h=c.skeleton;r.get(h)!==l&&(h.update(),r.set(h,l))}return f}function o(){r=new WeakMap}function a(c){const l=c.target;l.removeEventListener("dispose",a),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:s,dispose:o}}class md extends Ae{constructor(t,e,n,r,s,o,a,c,l,u=mr){if(u!==mr&&u!==br)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===mr&&(n=zi),n===void 0&&u===br&&(n=Er),super(null,r,s,o,a,c,u,n,l),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:Xe,this.minFilter=c!==void 0?c:Xe,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const gd=new Ae,Ju=new md(1,1),_d=new od,xd=new q0,vd=new dd,Qu=[],tf=[],ef=new Float32Array(16),nf=new Float32Array(9),rf=new Float32Array(4);function Pr(i,t,e){const n=i[0];if(n<=0||n>0)return i;const r=t*e;let s=Qu[r];if(s===void 0&&(s=new Float32Array(r),Qu[r]=s),t!==0){n.toArray(s,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(s,a)}return s}function Re(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Ce(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Ko(i,t){let e=tf[t];e===void 0&&(e=new Int32Array(t),tf[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function uv(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function fv(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Re(e,t))return;i.uniform2fv(this.addr,t),Ce(e,t)}}function hv(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Re(e,t))return;i.uniform3fv(this.addr,t),Ce(e,t)}}function dv(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Re(e,t))return;i.uniform4fv(this.addr,t),Ce(e,t)}}function pv(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Re(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Ce(e,t)}else{if(Re(e,n))return;rf.set(n),i.uniformMatrix2fv(this.addr,!1,rf),Ce(e,n)}}function mv(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Re(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Ce(e,t)}else{if(Re(e,n))return;nf.set(n),i.uniformMatrix3fv(this.addr,!1,nf),Ce(e,n)}}function gv(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Re(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Ce(e,t)}else{if(Re(e,n))return;ef.set(n),i.uniformMatrix4fv(this.addr,!1,ef),Ce(e,n)}}function _v(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function xv(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Re(e,t))return;i.uniform2iv(this.addr,t),Ce(e,t)}}function vv(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Re(e,t))return;i.uniform3iv(this.addr,t),Ce(e,t)}}function Mv(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Re(e,t))return;i.uniform4iv(this.addr,t),Ce(e,t)}}function yv(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function Sv(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Re(e,t))return;i.uniform2uiv(this.addr,t),Ce(e,t)}}function Ev(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Re(e,t))return;i.uniform3uiv(this.addr,t),Ce(e,t)}}function bv(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Re(e,t))return;i.uniform4uiv(this.addr,t),Ce(e,t)}}function Av(i,t,e){const n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);let s;this.type===i.SAMPLER_2D_SHADOW?(Ju.compareFunction=id,s=Ju):s=gd,e.setTexture2D(t||s,r)}function Tv(i,t,e){const n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),e.setTexture3D(t||xd,r)}function wv(i,t,e){const n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),e.setTextureCube(t||vd,r)}function Rv(i,t,e){const n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),e.setTexture2DArray(t||_d,r)}function Cv(i){switch(i){case 5126:return uv;case 35664:return fv;case 35665:return hv;case 35666:return dv;case 35674:return pv;case 35675:return mv;case 35676:return gv;case 5124:case 35670:return _v;case 35667:case 35671:return xv;case 35668:case 35672:return vv;case 35669:case 35673:return Mv;case 5125:return yv;case 36294:return Sv;case 36295:return Ev;case 36296:return bv;case 35678:case 36198:case 36298:case 36306:case 35682:return Av;case 35679:case 36299:case 36307:return Tv;case 35680:case 36300:case 36308:case 36293:return wv;case 36289:case 36303:case 36311:case 36292:return Rv}}function Iv(i,t){i.uniform1fv(this.addr,t)}function Pv(i,t){const e=Pr(t,this.size,2);i.uniform2fv(this.addr,e)}function Lv(i,t){const e=Pr(t,this.size,3);i.uniform3fv(this.addr,e)}function Dv(i,t){const e=Pr(t,this.size,4);i.uniform4fv(this.addr,e)}function Uv(i,t){const e=Pr(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function Nv(i,t){const e=Pr(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function Ov(i,t){const e=Pr(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function zv(i,t){i.uniform1iv(this.addr,t)}function Fv(i,t){i.uniform2iv(this.addr,t)}function Bv(i,t){i.uniform3iv(this.addr,t)}function Gv(i,t){i.uniform4iv(this.addr,t)}function kv(i,t){i.uniform1uiv(this.addr,t)}function Hv(i,t){i.uniform2uiv(this.addr,t)}function Vv(i,t){i.uniform3uiv(this.addr,t)}function Wv(i,t){i.uniform4uiv(this.addr,t)}function Xv(i,t,e){const n=this.cache,r=t.length,s=Ko(e,r);Re(n,s)||(i.uniform1iv(this.addr,s),Ce(n,s));for(let o=0;o!==r;++o)e.setTexture2D(t[o]||gd,s[o])}function qv(i,t,e){const n=this.cache,r=t.length,s=Ko(e,r);Re(n,s)||(i.uniform1iv(this.addr,s),Ce(n,s));for(let o=0;o!==r;++o)e.setTexture3D(t[o]||xd,s[o])}function jv(i,t,e){const n=this.cache,r=t.length,s=Ko(e,r);Re(n,s)||(i.uniform1iv(this.addr,s),Ce(n,s));for(let o=0;o!==r;++o)e.setTextureCube(t[o]||vd,s[o])}function $v(i,t,e){const n=this.cache,r=t.length,s=Ko(e,r);Re(n,s)||(i.uniform1iv(this.addr,s),Ce(n,s));for(let o=0;o!==r;++o)e.setTexture2DArray(t[o]||_d,s[o])}function Yv(i){switch(i){case 5126:return Iv;case 35664:return Pv;case 35665:return Lv;case 35666:return Dv;case 35674:return Uv;case 35675:return Nv;case 35676:return Ov;case 5124:case 35670:return zv;case 35667:case 35671:return Fv;case 35668:case 35672:return Bv;case 35669:case 35673:return Gv;case 5125:return kv;case 36294:return Hv;case 36295:return Vv;case 36296:return Wv;case 35678:case 36198:case 36298:case 36306:case 35682:return Xv;case 35679:case 36299:case 36307:return qv;case 35680:case 36300:case 36308:case 36293:return jv;case 36289:case 36303:case 36311:case 36292:return $v}}class Zv{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Cv(e.type)}}class Kv{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Yv(e.type)}}class Jv{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(t,e[a.id],n)}}}const Oa=/(\w+)(\])?(\[|\.)?/g;function sf(i,t){i.seq.push(t),i.map[t.id]=t}function Qv(i,t,e){const n=i.name,r=n.length;for(Oa.lastIndex=0;;){const s=Oa.exec(n),o=Oa.lastIndex;let a=s[1];const c=s[2]==="]",l=s[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===r){sf(e,l===void 0?new Zv(a,i,t):new Kv(a,i,t));break}else{let f=e.map[a];f===void 0&&(f=new Jv(a),sf(e,f)),e=f}}}class Ao{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){const s=t.getActiveUniform(e,r),o=t.getUniformLocation(e,s.name);Qv(s,o,this)}}setValue(t,e,n,r){const s=this.map[e];s!==void 0&&s.setValue(t,n,r)}setOptional(t,e,n){const r=e[n];r!==void 0&&this.setValue(t,n,r)}static upload(t,e,n,r){for(let s=0,o=e.length;s!==o;++s){const a=e[s],c=n[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,r)}}static seqWithValue(t,e){const n=[];for(let r=0,s=t.length;r!==s;++r){const o=t[r];o.id in e&&n.push(o)}return n}}function of(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const tM=37297;let eM=0;function nM(i,t){const e=i.split(`
`),n=[],r=Math.max(t-6,0),s=Math.min(t+6,e.length);for(let o=r;o<s;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}const af=new Vt;function iM(i){Yt._getMatrix(af,Yt.workingColorSpace,i);const t=`mat3( ${af.elements.map(e=>e.toFixed(4))} )`;switch(Yt.getTransfer(i)){case Yo:return[t,"LinearTransferOETF"];case oe:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function cf(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),r=i.getShaderInfoLog(t).trim();if(n&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const o=parseInt(s[1]);return e.toUpperCase()+`

`+r+`

`+nM(i.getShaderSource(t),o)}else return r}function rM(i,t){const e=iM(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function sM(i,t){let e;switch(t){case n0:e="Linear";break;case i0:e="Reinhard";break;case r0:e="Cineon";break;case Vh:e="ACESFilmic";break;case o0:e="AgX";break;case a0:e="Neutral";break;case s0:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Ks=new z;function oM(){Yt.getLuminanceCoefficients(Ks);const i=Ks.x.toFixed(4),t=Ks.y.toFixed(4),e=Ks.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function aM(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ns).join(`
`)}function cM(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function lM(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){const s=i.getActiveAttrib(t,r),o=s.name;let a=1;s.type===i.FLOAT_MAT2&&(a=2),s.type===i.FLOAT_MAT3&&(a=3),s.type===i.FLOAT_MAT4&&(a=4),e[o]={type:s.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function ns(i){return i!==""}function lf(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function uf(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const uM=/^[ \t]*#include +<([\w\d./]+)>/gm;function jc(i){return i.replace(uM,hM)}const fM=new Map;function hM(i,t){let e=Ht[t];if(e===void 0){const n=fM.get(t);if(n!==void 0)e=Ht[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return jc(e)}const dM=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ff(i){return i.replace(dM,pM)}function pM(i,t,e,n){let r="";for(let s=parseInt(t);s<parseInt(e);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function hf(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function mM(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===fl?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===Nm?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Xn&&(t="SHADOWMAP_TYPE_VSM"),t}function gM(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case yr:case Sr:t="ENVMAP_TYPE_CUBE";break;case $o:t="ENVMAP_TYPE_CUBE_UV";break}return t}function _M(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Sr:t="ENVMAP_MODE_REFRACTION";break}return t}function xM(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Hh:t="ENVMAP_BLENDING_MULTIPLY";break;case t0:t="ENVMAP_BLENDING_MIX";break;case e0:t="ENVMAP_BLENDING_ADD";break}return t}function vM(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function MM(i,t,e,n){const r=i.getContext(),s=e.defines;let o=e.vertexShader,a=e.fragmentShader;const c=mM(e),l=gM(e),u=_M(e),f=xM(e),h=vM(e),d=aM(e),g=cM(s),_=r.createProgram();let m,p,v=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(ns).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(ns).join(`
`),p.length>0&&(p+=`
`)):(m=[hf(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ns).join(`
`),p=[hf(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+u:"",e.envMap?"#define "+f:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==xi?"#define TONE_MAPPING":"",e.toneMapping!==xi?Ht.tonemapping_pars_fragment:"",e.toneMapping!==xi?sM("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Ht.colorspace_pars_fragment,rM("linearToOutputTexel",e.outputColorSpace),oM(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(ns).join(`
`)),o=jc(o),o=lf(o,e),o=uf(o,e),a=jc(a),a=lf(a,e),a=uf(a,e),o=ff(o),a=ff(a),e.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===bu?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===bu?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const M=v+m+o,x=v+p+a,b=of(r,r.VERTEX_SHADER,M),S=of(r,r.FRAGMENT_SHADER,x);r.attachShader(_,b),r.attachShader(_,S),e.index0AttributeName!==void 0?r.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&r.bindAttribLocation(_,0,"position"),r.linkProgram(_);function A(R){if(i.debug.checkShaderErrors){const D=r.getProgramInfoLog(_).trim(),N=r.getShaderInfoLog(b).trim(),U=r.getShaderInfoLog(S).trim();let w=!0,P=!0;if(r.getProgramParameter(_,r.LINK_STATUS)===!1)if(w=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,_,b,S);else{const F=cf(r,b,"vertex"),O=cf(r,S,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(_,r.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+D+`
`+F+`
`+O)}else D!==""?console.warn("THREE.WebGLProgram: Program Info Log:",D):(N===""||U==="")&&(P=!1);P&&(R.diagnostics={runnable:w,programLog:D,vertexShader:{log:N,prefix:m},fragmentShader:{log:U,prefix:p}})}r.deleteShader(b),r.deleteShader(S),T=new Ao(r,_),y=lM(r,_)}let T;this.getUniforms=function(){return T===void 0&&A(this),T};let y;this.getAttributes=function(){return y===void 0&&A(this),y};let E=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return E===!1&&(E=r.getProgramParameter(_,tM)),E},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=eM++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=b,this.fragmentShader=S,this}let yM=0;class SM{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,r=this._getShaderStage(e),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new EM(t),e.set(t,n)),n}}class EM{constructor(t){this.id=yM++,this.code=t,this.usedTimes=0}}function bM(i,t,e,n,r,s,o){const a=new ad,c=new SM,l=new Set,u=[],f=r.logarithmicDepthBuffer,h=r.vertexTextures;let d=r.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(y){return l.add(y),y===0?"uv":`uv${y}`}function m(y,E,R,D,N){const U=D.fog,w=N.geometry,P=y.isMeshStandardMaterial?D.environment:null,F=(y.isMeshStandardMaterial?e:t).get(y.envMap||P),O=F&&F.mapping===$o?F.image.height:null,K=g[y.type];y.precision!==null&&(d=r.getMaxPrecision(y.precision),d!==y.precision&&console.warn("THREE.WebGLProgram.getParameters:",y.precision,"not supported, using",d,"instead."));const tt=w.morphAttributes.position||w.morphAttributes.normal||w.morphAttributes.color,ut=tt!==void 0?tt.length:0;let dt=0;w.morphAttributes.position!==void 0&&(dt=1),w.morphAttributes.normal!==void 0&&(dt=2),w.morphAttributes.color!==void 0&&(dt=3);let bt,J,it,_t;if(K){const ie=Rn[K];bt=ie.vertexShader,J=ie.fragmentShader}else bt=y.vertexShader,J=y.fragmentShader,c.update(y),it=c.getVertexShaderID(y),_t=c.getFragmentShaderID(y);const ft=i.getRenderTarget(),At=i.state.buffers.depth.getReversed(),Rt=N.isInstancedMesh===!0,Dt=N.isBatchedMesh===!0,Gt=!!y.map,zt=!!y.matcap,he=!!F,V=!!y.aoMap,qe=!!y.lightMap,$t=!!y.bumpMap,Xt=!!y.normalMap,Pt=!!y.displacementMap,ce=!!y.emissiveMap,Ct=!!y.metalnessMap,L=!!y.roughnessMap,C=y.anisotropy>0,X=y.clearcoat>0,nt=y.dispersion>0,W=y.iridescence>0,q=y.sheen>0,at=y.transmission>0,Z=C&&!!y.anisotropyMap,ot=X&&!!y.clearcoatMap,Ot=X&&!!y.clearcoatNormalMap,rt=X&&!!y.clearcoatRoughnessMap,gt=W&&!!y.iridescenceMap,Mt=W&&!!y.iridescenceThicknessMap,wt=q&&!!y.sheenColorMap,xt=q&&!!y.sheenRoughnessMap,Ut=!!y.specularMap,Nt=!!y.specularColorMap,Kt=!!y.specularIntensityMap,B=at&&!!y.transmissionMap,ct=at&&!!y.thicknessMap,Q=!!y.gradientMap,j=!!y.alphaMap,pt=y.alphaTest>0,ht=!!y.alphaHash,Ft=!!y.extensions;let xe=xi;y.toneMapped&&(ft===null||ft.isXRRenderTarget===!0)&&(xe=i.toneMapping);const De={shaderID:K,shaderType:y.type,shaderName:y.name,vertexShader:bt,fragmentShader:J,defines:y.defines,customVertexShaderID:it,customFragmentShaderID:_t,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:d,batching:Dt,batchingColor:Dt&&N._colorsTexture!==null,instancing:Rt,instancingColor:Rt&&N.instanceColor!==null,instancingMorph:Rt&&N.morphTexture!==null,supportsVertexTextures:h,outputColorSpace:ft===null?i.outputColorSpace:ft.isXRRenderTarget===!0?ft.texture.colorSpace:ze,alphaToCoverage:!!y.alphaToCoverage,map:Gt,matcap:zt,envMap:he,envMapMode:he&&F.mapping,envMapCubeUVHeight:O,aoMap:V,lightMap:qe,bumpMap:$t,normalMap:Xt,displacementMap:h&&Pt,emissiveMap:ce,normalMapObjectSpace:Xt&&y.normalMapType===d0,normalMapTangentSpace:Xt&&y.normalMapType===nd,metalnessMap:Ct,roughnessMap:L,anisotropy:C,anisotropyMap:Z,clearcoat:X,clearcoatMap:ot,clearcoatNormalMap:Ot,clearcoatRoughnessMap:rt,dispersion:nt,iridescence:W,iridescenceMap:gt,iridescenceThicknessMap:Mt,sheen:q,sheenColorMap:wt,sheenRoughnessMap:xt,specularMap:Ut,specularColorMap:Nt,specularIntensityMap:Kt,transmission:at,transmissionMap:B,thicknessMap:ct,gradientMap:Q,opaque:y.transparent===!1&&y.blending===pr&&y.alphaToCoverage===!1,alphaMap:j,alphaTest:pt,alphaHash:ht,combine:y.combine,mapUv:Gt&&_(y.map.channel),aoMapUv:V&&_(y.aoMap.channel),lightMapUv:qe&&_(y.lightMap.channel),bumpMapUv:$t&&_(y.bumpMap.channel),normalMapUv:Xt&&_(y.normalMap.channel),displacementMapUv:Pt&&_(y.displacementMap.channel),emissiveMapUv:ce&&_(y.emissiveMap.channel),metalnessMapUv:Ct&&_(y.metalnessMap.channel),roughnessMapUv:L&&_(y.roughnessMap.channel),anisotropyMapUv:Z&&_(y.anisotropyMap.channel),clearcoatMapUv:ot&&_(y.clearcoatMap.channel),clearcoatNormalMapUv:Ot&&_(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:rt&&_(y.clearcoatRoughnessMap.channel),iridescenceMapUv:gt&&_(y.iridescenceMap.channel),iridescenceThicknessMapUv:Mt&&_(y.iridescenceThicknessMap.channel),sheenColorMapUv:wt&&_(y.sheenColorMap.channel),sheenRoughnessMapUv:xt&&_(y.sheenRoughnessMap.channel),specularMapUv:Ut&&_(y.specularMap.channel),specularColorMapUv:Nt&&_(y.specularColorMap.channel),specularIntensityMapUv:Kt&&_(y.specularIntensityMap.channel),transmissionMapUv:B&&_(y.transmissionMap.channel),thicknessMapUv:ct&&_(y.thicknessMap.channel),alphaMapUv:j&&_(y.alphaMap.channel),vertexTangents:!!w.attributes.tangent&&(Xt||C),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!w.attributes.color&&w.attributes.color.itemSize===4,pointsUvs:N.isPoints===!0&&!!w.attributes.uv&&(Gt||j),fog:!!U,useFog:y.fog===!0,fogExp2:!!U&&U.isFogExp2,flatShading:y.flatShading===!0,sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:f,reverseDepthBuffer:At,skinning:N.isSkinnedMesh===!0,morphTargets:w.morphAttributes.position!==void 0,morphNormals:w.morphAttributes.normal!==void 0,morphColors:w.morphAttributes.color!==void 0,morphTargetsCount:ut,morphTextureStride:dt,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:y.dithering,shadowMapEnabled:i.shadowMap.enabled&&R.length>0,shadowMapType:i.shadowMap.type,toneMapping:xe,decodeVideoTexture:Gt&&y.map.isVideoTexture===!0&&Yt.getTransfer(y.map.colorSpace)===oe,decodeVideoTextureEmissive:ce&&y.emissiveMap.isVideoTexture===!0&&Yt.getTransfer(y.emissiveMap.colorSpace)===oe,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===He,flipSided:y.side===We,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:Ft&&y.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ft&&y.extensions.multiDraw===!0||Dt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return De.vertexUv1s=l.has(1),De.vertexUv2s=l.has(2),De.vertexUv3s=l.has(3),l.clear(),De}function p(y){const E=[];if(y.shaderID?E.push(y.shaderID):(E.push(y.customVertexShaderID),E.push(y.customFragmentShaderID)),y.defines!==void 0)for(const R in y.defines)E.push(R),E.push(y.defines[R]);return y.isRawShaderMaterial===!1&&(v(E,y),M(E,y),E.push(i.outputColorSpace)),E.push(y.customProgramCacheKey),E.join()}function v(y,E){y.push(E.precision),y.push(E.outputColorSpace),y.push(E.envMapMode),y.push(E.envMapCubeUVHeight),y.push(E.mapUv),y.push(E.alphaMapUv),y.push(E.lightMapUv),y.push(E.aoMapUv),y.push(E.bumpMapUv),y.push(E.normalMapUv),y.push(E.displacementMapUv),y.push(E.emissiveMapUv),y.push(E.metalnessMapUv),y.push(E.roughnessMapUv),y.push(E.anisotropyMapUv),y.push(E.clearcoatMapUv),y.push(E.clearcoatNormalMapUv),y.push(E.clearcoatRoughnessMapUv),y.push(E.iridescenceMapUv),y.push(E.iridescenceThicknessMapUv),y.push(E.sheenColorMapUv),y.push(E.sheenRoughnessMapUv),y.push(E.specularMapUv),y.push(E.specularColorMapUv),y.push(E.specularIntensityMapUv),y.push(E.transmissionMapUv),y.push(E.thicknessMapUv),y.push(E.combine),y.push(E.fogExp2),y.push(E.sizeAttenuation),y.push(E.morphTargetsCount),y.push(E.morphAttributeCount),y.push(E.numDirLights),y.push(E.numPointLights),y.push(E.numSpotLights),y.push(E.numSpotLightMaps),y.push(E.numHemiLights),y.push(E.numRectAreaLights),y.push(E.numDirLightShadows),y.push(E.numPointLightShadows),y.push(E.numSpotLightShadows),y.push(E.numSpotLightShadowsWithMaps),y.push(E.numLightProbes),y.push(E.shadowMapType),y.push(E.toneMapping),y.push(E.numClippingPlanes),y.push(E.numClipIntersection),y.push(E.depthPacking)}function M(y,E){a.disableAll(),E.supportsVertexTextures&&a.enable(0),E.instancing&&a.enable(1),E.instancingColor&&a.enable(2),E.instancingMorph&&a.enable(3),E.matcap&&a.enable(4),E.envMap&&a.enable(5),E.normalMapObjectSpace&&a.enable(6),E.normalMapTangentSpace&&a.enable(7),E.clearcoat&&a.enable(8),E.iridescence&&a.enable(9),E.alphaTest&&a.enable(10),E.vertexColors&&a.enable(11),E.vertexAlphas&&a.enable(12),E.vertexUv1s&&a.enable(13),E.vertexUv2s&&a.enable(14),E.vertexUv3s&&a.enable(15),E.vertexTangents&&a.enable(16),E.anisotropy&&a.enable(17),E.alphaHash&&a.enable(18),E.batching&&a.enable(19),E.dispersion&&a.enable(20),E.batchingColor&&a.enable(21),y.push(a.mask),a.disableAll(),E.fog&&a.enable(0),E.useFog&&a.enable(1),E.flatShading&&a.enable(2),E.logarithmicDepthBuffer&&a.enable(3),E.reverseDepthBuffer&&a.enable(4),E.skinning&&a.enable(5),E.morphTargets&&a.enable(6),E.morphNormals&&a.enable(7),E.morphColors&&a.enable(8),E.premultipliedAlpha&&a.enable(9),E.shadowMapEnabled&&a.enable(10),E.doubleSided&&a.enable(11),E.flipSided&&a.enable(12),E.useDepthPacking&&a.enable(13),E.dithering&&a.enable(14),E.transmission&&a.enable(15),E.sheen&&a.enable(16),E.opaque&&a.enable(17),E.pointsUvs&&a.enable(18),E.decodeVideoTexture&&a.enable(19),E.decodeVideoTextureEmissive&&a.enable(20),E.alphaToCoverage&&a.enable(21),y.push(a.mask)}function x(y){const E=g[y.type];let R;if(E){const D=Rn[E];R=ag.clone(D.uniforms)}else R=y.uniforms;return R}function b(y,E){let R;for(let D=0,N=u.length;D<N;D++){const U=u[D];if(U.cacheKey===E){R=U,++R.usedTimes;break}}return R===void 0&&(R=new MM(i,E,y,s),u.push(R)),R}function S(y){if(--y.usedTimes===0){const E=u.indexOf(y);u[E]=u[u.length-1],u.pop(),y.destroy()}}function A(y){c.remove(y)}function T(){c.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:x,acquireProgram:b,releaseProgram:S,releaseShaderCache:A,programs:u,dispose:T}}function AM(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function r(o,a,c){i.get(o)[a]=c}function s(){i=new WeakMap}return{has:t,get:e,remove:n,update:r,dispose:s}}function TM(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function df(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function pf(){const i=[];let t=0;const e=[],n=[],r=[];function s(){t=0,e.length=0,n.length=0,r.length=0}function o(f,h,d,g,_,m){let p=i[t];return p===void 0?(p={id:f.id,object:f,geometry:h,material:d,groupOrder:g,renderOrder:f.renderOrder,z:_,group:m},i[t]=p):(p.id=f.id,p.object=f,p.geometry=h,p.material=d,p.groupOrder=g,p.renderOrder=f.renderOrder,p.z=_,p.group=m),t++,p}function a(f,h,d,g,_,m){const p=o(f,h,d,g,_,m);d.transmission>0?n.push(p):d.transparent===!0?r.push(p):e.push(p)}function c(f,h,d,g,_,m){const p=o(f,h,d,g,_,m);d.transmission>0?n.unshift(p):d.transparent===!0?r.unshift(p):e.unshift(p)}function l(f,h){e.length>1&&e.sort(f||TM),n.length>1&&n.sort(h||df),r.length>1&&r.sort(h||df)}function u(){for(let f=t,h=i.length;f<h;f++){const d=i[f];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:e,transmissive:n,transparent:r,init:s,push:a,unshift:c,finish:u,sort:l}}function wM(){let i=new WeakMap;function t(n,r){const s=i.get(n);let o;return s===void 0?(o=new pf,i.set(n,[o])):r>=s.length?(o=new pf,s.push(o)):o=s[r],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function RM(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new z,color:new Lt};break;case"SpotLight":e={position:new z,direction:new z,color:new Lt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new z,color:new Lt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new z,skyColor:new Lt,groundColor:new Lt};break;case"RectAreaLight":e={color:new Lt,position:new z,halfWidth:new z,halfHeight:new z};break}return i[t.id]=e,e}}}function CM(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Wt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Wt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Wt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let IM=0;function PM(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function LM(i){const t=new RM,e=CM(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new z);const r=new z,s=new It,o=new It;function a(l){let u=0,f=0,h=0;for(let y=0;y<9;y++)n.probe[y].set(0,0,0);let d=0,g=0,_=0,m=0,p=0,v=0,M=0,x=0,b=0,S=0,A=0;l.sort(PM);for(let y=0,E=l.length;y<E;y++){const R=l[y],D=R.color,N=R.intensity,U=R.distance,w=R.shadow&&R.shadow.map?R.shadow.map.texture:null;if(R.isAmbientLight)u+=D.r*N,f+=D.g*N,h+=D.b*N;else if(R.isLightProbe){for(let P=0;P<9;P++)n.probe[P].addScaledVector(R.sh.coefficients[P],N);A++}else if(R.isDirectionalLight){const P=t.get(R);if(P.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){const F=R.shadow,O=e.get(R);O.shadowIntensity=F.intensity,O.shadowBias=F.bias,O.shadowNormalBias=F.normalBias,O.shadowRadius=F.radius,O.shadowMapSize=F.mapSize,n.directionalShadow[d]=O,n.directionalShadowMap[d]=w,n.directionalShadowMatrix[d]=R.shadow.matrix,v++}n.directional[d]=P,d++}else if(R.isSpotLight){const P=t.get(R);P.position.setFromMatrixPosition(R.matrixWorld),P.color.copy(D).multiplyScalar(N),P.distance=U,P.coneCos=Math.cos(R.angle),P.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),P.decay=R.decay,n.spot[_]=P;const F=R.shadow;if(R.map&&(n.spotLightMap[b]=R.map,b++,F.updateMatrices(R),R.castShadow&&S++),n.spotLightMatrix[_]=F.matrix,R.castShadow){const O=e.get(R);O.shadowIntensity=F.intensity,O.shadowBias=F.bias,O.shadowNormalBias=F.normalBias,O.shadowRadius=F.radius,O.shadowMapSize=F.mapSize,n.spotShadow[_]=O,n.spotShadowMap[_]=w,x++}_++}else if(R.isRectAreaLight){const P=t.get(R);P.color.copy(D).multiplyScalar(N),P.halfWidth.set(R.width*.5,0,0),P.halfHeight.set(0,R.height*.5,0),n.rectArea[m]=P,m++}else if(R.isPointLight){const P=t.get(R);if(P.color.copy(R.color).multiplyScalar(R.intensity),P.distance=R.distance,P.decay=R.decay,R.castShadow){const F=R.shadow,O=e.get(R);O.shadowIntensity=F.intensity,O.shadowBias=F.bias,O.shadowNormalBias=F.normalBias,O.shadowRadius=F.radius,O.shadowMapSize=F.mapSize,O.shadowCameraNear=F.camera.near,O.shadowCameraFar=F.camera.far,n.pointShadow[g]=O,n.pointShadowMap[g]=w,n.pointShadowMatrix[g]=R.shadow.matrix,M++}n.point[g]=P,g++}else if(R.isHemisphereLight){const P=t.get(R);P.skyColor.copy(R.color).multiplyScalar(N),P.groundColor.copy(R.groundColor).multiplyScalar(N),n.hemi[p]=P,p++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=mt.LTC_FLOAT_1,n.rectAreaLTC2=mt.LTC_FLOAT_2):(n.rectAreaLTC1=mt.LTC_HALF_1,n.rectAreaLTC2=mt.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=f,n.ambient[2]=h;const T=n.hash;(T.directionalLength!==d||T.pointLength!==g||T.spotLength!==_||T.rectAreaLength!==m||T.hemiLength!==p||T.numDirectionalShadows!==v||T.numPointShadows!==M||T.numSpotShadows!==x||T.numSpotMaps!==b||T.numLightProbes!==A)&&(n.directional.length=d,n.spot.length=_,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=v,n.directionalShadowMap.length=v,n.pointShadow.length=M,n.pointShadowMap.length=M,n.spotShadow.length=x,n.spotShadowMap.length=x,n.directionalShadowMatrix.length=v,n.pointShadowMatrix.length=M,n.spotLightMatrix.length=x+b-S,n.spotLightMap.length=b,n.numSpotLightShadowsWithMaps=S,n.numLightProbes=A,T.directionalLength=d,T.pointLength=g,T.spotLength=_,T.rectAreaLength=m,T.hemiLength=p,T.numDirectionalShadows=v,T.numPointShadows=M,T.numSpotShadows=x,T.numSpotMaps=b,T.numLightProbes=A,n.version=IM++)}function c(l,u){let f=0,h=0,d=0,g=0,_=0;const m=u.matrixWorldInverse;for(let p=0,v=l.length;p<v;p++){const M=l[p];if(M.isDirectionalLight){const x=n.directional[f];x.direction.setFromMatrixPosition(M.matrixWorld),r.setFromMatrixPosition(M.target.matrixWorld),x.direction.sub(r),x.direction.transformDirection(m),f++}else if(M.isSpotLight){const x=n.spot[d];x.position.setFromMatrixPosition(M.matrixWorld),x.position.applyMatrix4(m),x.direction.setFromMatrixPosition(M.matrixWorld),r.setFromMatrixPosition(M.target.matrixWorld),x.direction.sub(r),x.direction.transformDirection(m),d++}else if(M.isRectAreaLight){const x=n.rectArea[g];x.position.setFromMatrixPosition(M.matrixWorld),x.position.applyMatrix4(m),o.identity(),s.copy(M.matrixWorld),s.premultiply(m),o.extractRotation(s),x.halfWidth.set(M.width*.5,0,0),x.halfHeight.set(0,M.height*.5,0),x.halfWidth.applyMatrix4(o),x.halfHeight.applyMatrix4(o),g++}else if(M.isPointLight){const x=n.point[h];x.position.setFromMatrixPosition(M.matrixWorld),x.position.applyMatrix4(m),h++}else if(M.isHemisphereLight){const x=n.hemi[_];x.direction.setFromMatrixPosition(M.matrixWorld),x.direction.transformDirection(m),_++}}}return{setup:a,setupView:c,state:n}}function mf(i){const t=new LM(i),e=[],n=[];function r(u){l.camera=u,e.length=0,n.length=0}function s(u){e.push(u)}function o(u){n.push(u)}function a(){t.setup(e)}function c(u){t.setupView(e,u)}const l={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:r,state:l,setupLights:a,setupLightsView:c,pushLight:s,pushShadow:o}}function DM(i){let t=new WeakMap;function e(r,s=0){const o=t.get(r);let a;return o===void 0?(a=new mf(i),t.set(r,[a])):s>=o.length?(a=new mf(i),o.push(a)):a=o[s],a}function n(){t=new WeakMap}return{get:e,dispose:n}}class UM extends In{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=f0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class NM extends In{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const OM=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,zM=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function FM(i,t,e){let n=new Ml;const r=new Wt,s=new Wt,o=new Qt,a=new UM({depthPacking:h0}),c=new NM,l={},u=e.maxTextureSize,f={[ti]:We,[We]:ti,[He]:He},h=new An({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Wt},radius:{value:4}},vertexShader:OM,fragmentShader:zM}),d=h.clone();d.defines.HORIZONTAL_PASS=1;const g=new _e;g.setAttribute("position",new fe(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new ne(g,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=fl;let p=this.type;this.render=function(S,A,T){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||S.length===0)return;const y=i.getRenderTarget(),E=i.getActiveCubeFace(),R=i.getActiveMipmapLevel(),D=i.state;D.setBlending(_i),D.buffers.color.setClear(1,1,1,1),D.buffers.depth.setTest(!0),D.setScissorTest(!1);const N=p!==Xn&&this.type===Xn,U=p===Xn&&this.type!==Xn;for(let w=0,P=S.length;w<P;w++){const F=S[w],O=F.shadow;if(O===void 0){console.warn("THREE.WebGLShadowMap:",F,"has no shadow.");continue}if(O.autoUpdate===!1&&O.needsUpdate===!1)continue;r.copy(O.mapSize);const K=O.getFrameExtents();if(r.multiply(K),s.copy(O.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/K.x),r.x=s.x*K.x,O.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/K.y),r.y=s.y*K.y,O.mapSize.y=s.y)),O.map===null||N===!0||U===!0){const ut=this.type!==Xn?{minFilter:Xe,magFilter:Xe}:{};O.map!==null&&O.map.dispose(),O.map=new Fi(r.x,r.y,ut),O.map.texture.name=F.name+".shadowMap",O.camera.updateProjectionMatrix()}i.setRenderTarget(O.map),i.clear();const tt=O.getViewportCount();for(let ut=0;ut<tt;ut++){const dt=O.getViewport(ut);o.set(s.x*dt.x,s.y*dt.y,s.x*dt.z,s.y*dt.w),D.viewport(o),O.updateMatrices(F,ut),n=O.getFrustum(),x(A,T,O.camera,F,this.type)}O.isPointLightShadow!==!0&&this.type===Xn&&v(O,T),O.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(y,E,R)};function v(S,A){const T=t.update(_);h.defines.VSM_SAMPLES!==S.blurSamples&&(h.defines.VSM_SAMPLES=S.blurSamples,d.defines.VSM_SAMPLES=S.blurSamples,h.needsUpdate=!0,d.needsUpdate=!0),S.mapPass===null&&(S.mapPass=new Fi(r.x,r.y)),h.uniforms.shadow_pass.value=S.map.texture,h.uniforms.resolution.value=S.mapSize,h.uniforms.radius.value=S.radius,i.setRenderTarget(S.mapPass),i.clear(),i.renderBufferDirect(A,null,T,h,_,null),d.uniforms.shadow_pass.value=S.mapPass.texture,d.uniforms.resolution.value=S.mapSize,d.uniforms.radius.value=S.radius,i.setRenderTarget(S.map),i.clear(),i.renderBufferDirect(A,null,T,d,_,null)}function M(S,A,T,y){let E=null;const R=T.isPointLight===!0?S.customDistanceMaterial:S.customDepthMaterial;if(R!==void 0)E=R;else if(E=T.isPointLight===!0?c:a,i.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){const D=E.uuid,N=A.uuid;let U=l[D];U===void 0&&(U={},l[D]=U);let w=U[N];w===void 0&&(w=E.clone(),U[N]=w,A.addEventListener("dispose",b)),E=w}if(E.visible=A.visible,E.wireframe=A.wireframe,y===Xn?E.side=A.shadowSide!==null?A.shadowSide:A.side:E.side=A.shadowSide!==null?A.shadowSide:f[A.side],E.alphaMap=A.alphaMap,E.alphaTest=A.alphaTest,E.map=A.map,E.clipShadows=A.clipShadows,E.clippingPlanes=A.clippingPlanes,E.clipIntersection=A.clipIntersection,E.displacementMap=A.displacementMap,E.displacementScale=A.displacementScale,E.displacementBias=A.displacementBias,E.wireframeLinewidth=A.wireframeLinewidth,E.linewidth=A.linewidth,T.isPointLight===!0&&E.isMeshDistanceMaterial===!0){const D=i.properties.get(E);D.light=T}return E}function x(S,A,T,y,E){if(S.visible===!1)return;if(S.layers.test(A.layers)&&(S.isMesh||S.isLine||S.isPoints)&&(S.castShadow||S.receiveShadow&&E===Xn)&&(!S.frustumCulled||n.intersectsObject(S))){S.modelViewMatrix.multiplyMatrices(T.matrixWorldInverse,S.matrixWorld);const N=t.update(S),U=S.material;if(Array.isArray(U)){const w=N.groups;for(let P=0,F=w.length;P<F;P++){const O=w[P],K=U[O.materialIndex];if(K&&K.visible){const tt=M(S,K,y,E);S.onBeforeShadow(i,S,A,T,N,tt,O),i.renderBufferDirect(T,null,N,tt,S,O),S.onAfterShadow(i,S,A,T,N,tt,O)}}}else if(U.visible){const w=M(S,U,y,E);S.onBeforeShadow(i,S,A,T,N,w,null),i.renderBufferDirect(T,null,N,w,S,null),S.onAfterShadow(i,S,A,T,N,w,null)}}const D=S.children;for(let N=0,U=D.length;N<U;N++)x(D[N],A,T,y,E)}function b(S){S.target.removeEventListener("dispose",b);for(const T in l){const y=l[T],E=S.target.uuid;E in y&&(y[E].dispose(),delete y[E])}}}const BM={[uc]:fc,[hc]:mc,[dc]:gc,[Mr]:pc,[fc]:uc,[mc]:hc,[gc]:dc,[pc]:Mr};function GM(i,t){function e(){let B=!1;const ct=new Qt;let Q=null;const j=new Qt(0,0,0,0);return{setMask:function(pt){Q!==pt&&!B&&(i.colorMask(pt,pt,pt,pt),Q=pt)},setLocked:function(pt){B=pt},setClear:function(pt,ht,Ft,xe,De){De===!0&&(pt*=xe,ht*=xe,Ft*=xe),ct.set(pt,ht,Ft,xe),j.equals(ct)===!1&&(i.clearColor(pt,ht,Ft,xe),j.copy(ct))},reset:function(){B=!1,Q=null,j.set(-1,0,0,0)}}}function n(){let B=!1,ct=!1,Q=null,j=null,pt=null;return{setReversed:function(ht){if(ct!==ht){const Ft=t.get("EXT_clip_control");ct?Ft.clipControlEXT(Ft.LOWER_LEFT_EXT,Ft.ZERO_TO_ONE_EXT):Ft.clipControlEXT(Ft.LOWER_LEFT_EXT,Ft.NEGATIVE_ONE_TO_ONE_EXT);const xe=pt;pt=null,this.setClear(xe)}ct=ht},getReversed:function(){return ct},setTest:function(ht){ht?ft(i.DEPTH_TEST):At(i.DEPTH_TEST)},setMask:function(ht){Q!==ht&&!B&&(i.depthMask(ht),Q=ht)},setFunc:function(ht){if(ct&&(ht=BM[ht]),j!==ht){switch(ht){case uc:i.depthFunc(i.NEVER);break;case fc:i.depthFunc(i.ALWAYS);break;case hc:i.depthFunc(i.LESS);break;case Mr:i.depthFunc(i.LEQUAL);break;case dc:i.depthFunc(i.EQUAL);break;case pc:i.depthFunc(i.GEQUAL);break;case mc:i.depthFunc(i.GREATER);break;case gc:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}j=ht}},setLocked:function(ht){B=ht},setClear:function(ht){pt!==ht&&(ct&&(ht=1-ht),i.clearDepth(ht),pt=ht)},reset:function(){B=!1,Q=null,j=null,pt=null,ct=!1}}}function r(){let B=!1,ct=null,Q=null,j=null,pt=null,ht=null,Ft=null,xe=null,De=null;return{setTest:function(ie){B||(ie?ft(i.STENCIL_TEST):At(i.STENCIL_TEST))},setMask:function(ie){ct!==ie&&!B&&(i.stencilMask(ie),ct=ie)},setFunc:function(ie,fn,On){(Q!==ie||j!==fn||pt!==On)&&(i.stencilFunc(ie,fn,On),Q=ie,j=fn,pt=On)},setOp:function(ie,fn,On){(ht!==ie||Ft!==fn||xe!==On)&&(i.stencilOp(ie,fn,On),ht=ie,Ft=fn,xe=On)},setLocked:function(ie){B=ie},setClear:function(ie){De!==ie&&(i.clearStencil(ie),De=ie)},reset:function(){B=!1,ct=null,Q=null,j=null,pt=null,ht=null,Ft=null,xe=null,De=null}}}const s=new e,o=new n,a=new r,c=new WeakMap,l=new WeakMap;let u={},f={},h=new WeakMap,d=[],g=null,_=!1,m=null,p=null,v=null,M=null,x=null,b=null,S=null,A=new Lt(0,0,0),T=0,y=!1,E=null,R=null,D=null,N=null,U=null;const w=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let P=!1,F=0;const O=i.getParameter(i.VERSION);O.indexOf("WebGL")!==-1?(F=parseFloat(/^WebGL (\d)/.exec(O)[1]),P=F>=1):O.indexOf("OpenGL ES")!==-1&&(F=parseFloat(/^OpenGL ES (\d)/.exec(O)[1]),P=F>=2);let K=null,tt={};const ut=i.getParameter(i.SCISSOR_BOX),dt=i.getParameter(i.VIEWPORT),bt=new Qt().fromArray(ut),J=new Qt().fromArray(dt);function it(B,ct,Q,j){const pt=new Uint8Array(4),ht=i.createTexture();i.bindTexture(B,ht),i.texParameteri(B,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(B,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ft=0;Ft<Q;Ft++)B===i.TEXTURE_3D||B===i.TEXTURE_2D_ARRAY?i.texImage3D(ct,0,i.RGBA,1,1,j,0,i.RGBA,i.UNSIGNED_BYTE,pt):i.texImage2D(ct+Ft,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,pt);return ht}const _t={};_t[i.TEXTURE_2D]=it(i.TEXTURE_2D,i.TEXTURE_2D,1),_t[i.TEXTURE_CUBE_MAP]=it(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),_t[i.TEXTURE_2D_ARRAY]=it(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),_t[i.TEXTURE_3D]=it(i.TEXTURE_3D,i.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ft(i.DEPTH_TEST),o.setFunc(Mr),$t(!1),Xt(gu),ft(i.CULL_FACE),V(_i);function ft(B){u[B]!==!0&&(i.enable(B),u[B]=!0)}function At(B){u[B]!==!1&&(i.disable(B),u[B]=!1)}function Rt(B,ct){return f[B]!==ct?(i.bindFramebuffer(B,ct),f[B]=ct,B===i.DRAW_FRAMEBUFFER&&(f[i.FRAMEBUFFER]=ct),B===i.FRAMEBUFFER&&(f[i.DRAW_FRAMEBUFFER]=ct),!0):!1}function Dt(B,ct){let Q=d,j=!1;if(B){Q=h.get(ct),Q===void 0&&(Q=[],h.set(ct,Q));const pt=B.textures;if(Q.length!==pt.length||Q[0]!==i.COLOR_ATTACHMENT0){for(let ht=0,Ft=pt.length;ht<Ft;ht++)Q[ht]=i.COLOR_ATTACHMENT0+ht;Q.length=pt.length,j=!0}}else Q[0]!==i.BACK&&(Q[0]=i.BACK,j=!0);j&&i.drawBuffers(Q)}function Gt(B){return g!==B?(i.useProgram(B),g=B,!0):!1}const zt={[Li]:i.FUNC_ADD,[zm]:i.FUNC_SUBTRACT,[Fm]:i.FUNC_REVERSE_SUBTRACT};zt[Bm]=i.MIN,zt[Gm]=i.MAX;const he={[km]:i.ZERO,[Hm]:i.ONE,[Vm]:i.SRC_COLOR,[cc]:i.SRC_ALPHA,[Ym]:i.SRC_ALPHA_SATURATE,[jm]:i.DST_COLOR,[Xm]:i.DST_ALPHA,[Wm]:i.ONE_MINUS_SRC_COLOR,[lc]:i.ONE_MINUS_SRC_ALPHA,[$m]:i.ONE_MINUS_DST_COLOR,[qm]:i.ONE_MINUS_DST_ALPHA,[Zm]:i.CONSTANT_COLOR,[Km]:i.ONE_MINUS_CONSTANT_COLOR,[Jm]:i.CONSTANT_ALPHA,[Qm]:i.ONE_MINUS_CONSTANT_ALPHA};function V(B,ct,Q,j,pt,ht,Ft,xe,De,ie){if(B===_i){_===!0&&(At(i.BLEND),_=!1);return}if(_===!1&&(ft(i.BLEND),_=!0),B!==Om){if(B!==m||ie!==y){if((p!==Li||x!==Li)&&(i.blendEquation(i.FUNC_ADD),p=Li,x=Li),ie)switch(B){case pr:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case zo:i.blendFunc(i.ONE,i.ONE);break;case _u:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case xu:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",B);break}else switch(B){case pr:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case zo:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case _u:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case xu:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",B);break}v=null,M=null,b=null,S=null,A.set(0,0,0),T=0,m=B,y=ie}return}pt=pt||ct,ht=ht||Q,Ft=Ft||j,(ct!==p||pt!==x)&&(i.blendEquationSeparate(zt[ct],zt[pt]),p=ct,x=pt),(Q!==v||j!==M||ht!==b||Ft!==S)&&(i.blendFuncSeparate(he[Q],he[j],he[ht],he[Ft]),v=Q,M=j,b=ht,S=Ft),(xe.equals(A)===!1||De!==T)&&(i.blendColor(xe.r,xe.g,xe.b,De),A.copy(xe),T=De),m=B,y=!1}function qe(B,ct){B.side===He?At(i.CULL_FACE):ft(i.CULL_FACE);let Q=B.side===We;ct&&(Q=!Q),$t(Q),B.blending===pr&&B.transparent===!1?V(_i):V(B.blending,B.blendEquation,B.blendSrc,B.blendDst,B.blendEquationAlpha,B.blendSrcAlpha,B.blendDstAlpha,B.blendColor,B.blendAlpha,B.premultipliedAlpha),o.setFunc(B.depthFunc),o.setTest(B.depthTest),o.setMask(B.depthWrite),s.setMask(B.colorWrite);const j=B.stencilWrite;a.setTest(j),j&&(a.setMask(B.stencilWriteMask),a.setFunc(B.stencilFunc,B.stencilRef,B.stencilFuncMask),a.setOp(B.stencilFail,B.stencilZFail,B.stencilZPass)),ce(B.polygonOffset,B.polygonOffsetFactor,B.polygonOffsetUnits),B.alphaToCoverage===!0?ft(i.SAMPLE_ALPHA_TO_COVERAGE):At(i.SAMPLE_ALPHA_TO_COVERAGE)}function $t(B){E!==B&&(B?i.frontFace(i.CW):i.frontFace(i.CCW),E=B)}function Xt(B){B!==Dm?(ft(i.CULL_FACE),B!==R&&(B===gu?i.cullFace(i.BACK):B===Um?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):At(i.CULL_FACE),R=B}function Pt(B){B!==D&&(P&&i.lineWidth(B),D=B)}function ce(B,ct,Q){B?(ft(i.POLYGON_OFFSET_FILL),(N!==ct||U!==Q)&&(i.polygonOffset(ct,Q),N=ct,U=Q)):At(i.POLYGON_OFFSET_FILL)}function Ct(B){B?ft(i.SCISSOR_TEST):At(i.SCISSOR_TEST)}function L(B){B===void 0&&(B=i.TEXTURE0+w-1),K!==B&&(i.activeTexture(B),K=B)}function C(B,ct,Q){Q===void 0&&(K===null?Q=i.TEXTURE0+w-1:Q=K);let j=tt[Q];j===void 0&&(j={type:void 0,texture:void 0},tt[Q]=j),(j.type!==B||j.texture!==ct)&&(K!==Q&&(i.activeTexture(Q),K=Q),i.bindTexture(B,ct||_t[B]),j.type=B,j.texture=ct)}function X(){const B=tt[K];B!==void 0&&B.type!==void 0&&(i.bindTexture(B.type,null),B.type=void 0,B.texture=void 0)}function nt(){try{i.compressedTexImage2D.apply(i,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function W(){try{i.compressedTexImage3D.apply(i,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function q(){try{i.texSubImage2D.apply(i,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function at(){try{i.texSubImage3D.apply(i,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Z(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function ot(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Ot(){try{i.texStorage2D.apply(i,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function rt(){try{i.texStorage3D.apply(i,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function gt(){try{i.texImage2D.apply(i,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Mt(){try{i.texImage3D.apply(i,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function wt(B){bt.equals(B)===!1&&(i.scissor(B.x,B.y,B.z,B.w),bt.copy(B))}function xt(B){J.equals(B)===!1&&(i.viewport(B.x,B.y,B.z,B.w),J.copy(B))}function Ut(B,ct){let Q=l.get(ct);Q===void 0&&(Q=new WeakMap,l.set(ct,Q));let j=Q.get(B);j===void 0&&(j=i.getUniformBlockIndex(ct,B.name),Q.set(B,j))}function Nt(B,ct){const j=l.get(ct).get(B);c.get(ct)!==j&&(i.uniformBlockBinding(ct,j,B.__bindingPointIndex),c.set(ct,j))}function Kt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),u={},K=null,tt={},f={},h=new WeakMap,d=[],g=null,_=!1,m=null,p=null,v=null,M=null,x=null,b=null,S=null,A=new Lt(0,0,0),T=0,y=!1,E=null,R=null,D=null,N=null,U=null,bt.set(0,0,i.canvas.width,i.canvas.height),J.set(0,0,i.canvas.width,i.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:ft,disable:At,bindFramebuffer:Rt,drawBuffers:Dt,useProgram:Gt,setBlending:V,setMaterial:qe,setFlipSided:$t,setCullFace:Xt,setLineWidth:Pt,setPolygonOffset:ce,setScissorTest:Ct,activeTexture:L,bindTexture:C,unbindTexture:X,compressedTexImage2D:nt,compressedTexImage3D:W,texImage2D:gt,texImage3D:Mt,updateUBOMapping:Ut,uniformBlockBinding:Nt,texStorage2D:Ot,texStorage3D:rt,texSubImage2D:q,texSubImage3D:at,compressedTexSubImage2D:Z,compressedTexSubImage3D:ot,scissor:wt,viewport:xt,reset:Kt}}function gf(i,t,e,n){const r=kM(n);switch(e){case Yh:return i*t;case Kh:return i*t;case Jh:return i*t*2;case ml:return i*t/r.components*r.byteLength;case gl:return i*t/r.components*r.byteLength;case Qh:return i*t*2/r.components*r.byteLength;case _l:return i*t*2/r.components*r.byteLength;case Zh:return i*t*3/r.components*r.byteLength;case on:return i*t*4/r.components*r.byteLength;case xl:return i*t*4/r.components*r.byteLength;case Mo:case yo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case So:case Eo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Mc:case Sc:return Math.max(i,16)*Math.max(t,8)/4;case vc:case yc:return Math.max(i,8)*Math.max(t,8)/2;case Ec:case bc:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Ac:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Tc:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case wc:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case Rc:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case Cc:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case Ic:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case Pc:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case Lc:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case Dc:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Uc:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case Nc:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case Oc:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case zc:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case Fc:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case Bc:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case bo:case Gc:case kc:return Math.ceil(i/4)*Math.ceil(t/4)*16;case td:case Hc:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Vc:case Wc:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function kM(i){switch(i){case ei:case qh:return{byteLength:1,components:1};case ms:case jh:case Yn:return{byteLength:2,components:1};case dl:case pl:return{byteLength:2,components:4};case zi:case hl:case $e:return{byteLength:4,components:1};case $h:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function HM(i,t,e,n,r,s,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Wt,u=new WeakMap;let f;const h=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(L,C){return d?new OffscreenCanvas(L,C):xs("canvas")}function _(L,C,X){let nt=1;const W=Ct(L);if((W.width>X||W.height>X)&&(nt=X/Math.max(W.width,W.height)),nt<1)if(typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&L instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&L instanceof ImageBitmap||typeof VideoFrame<"u"&&L instanceof VideoFrame){const q=Math.floor(nt*W.width),at=Math.floor(nt*W.height);f===void 0&&(f=g(q,at));const Z=C?g(q,at):f;return Z.width=q,Z.height=at,Z.getContext("2d").drawImage(L,0,0,q,at),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+W.width+"x"+W.height+") to ("+q+"x"+at+")."),Z}else return"data"in L&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+W.width+"x"+W.height+")."),L;return L}function m(L){return L.generateMipmaps}function p(L){i.generateMipmap(L)}function v(L){return L.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:L.isWebGL3DRenderTarget?i.TEXTURE_3D:L.isWebGLArrayRenderTarget||L.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function M(L,C,X,nt,W=!1){if(L!==null){if(i[L]!==void 0)return i[L];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+L+"'")}let q=C;if(C===i.RED&&(X===i.FLOAT&&(q=i.R32F),X===i.HALF_FLOAT&&(q=i.R16F),X===i.UNSIGNED_BYTE&&(q=i.R8)),C===i.RED_INTEGER&&(X===i.UNSIGNED_BYTE&&(q=i.R8UI),X===i.UNSIGNED_SHORT&&(q=i.R16UI),X===i.UNSIGNED_INT&&(q=i.R32UI),X===i.BYTE&&(q=i.R8I),X===i.SHORT&&(q=i.R16I),X===i.INT&&(q=i.R32I)),C===i.RG&&(X===i.FLOAT&&(q=i.RG32F),X===i.HALF_FLOAT&&(q=i.RG16F),X===i.UNSIGNED_BYTE&&(q=i.RG8)),C===i.RG_INTEGER&&(X===i.UNSIGNED_BYTE&&(q=i.RG8UI),X===i.UNSIGNED_SHORT&&(q=i.RG16UI),X===i.UNSIGNED_INT&&(q=i.RG32UI),X===i.BYTE&&(q=i.RG8I),X===i.SHORT&&(q=i.RG16I),X===i.INT&&(q=i.RG32I)),C===i.RGB_INTEGER&&(X===i.UNSIGNED_BYTE&&(q=i.RGB8UI),X===i.UNSIGNED_SHORT&&(q=i.RGB16UI),X===i.UNSIGNED_INT&&(q=i.RGB32UI),X===i.BYTE&&(q=i.RGB8I),X===i.SHORT&&(q=i.RGB16I),X===i.INT&&(q=i.RGB32I)),C===i.RGBA_INTEGER&&(X===i.UNSIGNED_BYTE&&(q=i.RGBA8UI),X===i.UNSIGNED_SHORT&&(q=i.RGBA16UI),X===i.UNSIGNED_INT&&(q=i.RGBA32UI),X===i.BYTE&&(q=i.RGBA8I),X===i.SHORT&&(q=i.RGBA16I),X===i.INT&&(q=i.RGBA32I)),C===i.RGB&&X===i.UNSIGNED_INT_5_9_9_9_REV&&(q=i.RGB9_E5),C===i.RGBA){const at=W?Yo:Yt.getTransfer(nt);X===i.FLOAT&&(q=i.RGBA32F),X===i.HALF_FLOAT&&(q=i.RGBA16F),X===i.UNSIGNED_BYTE&&(q=at===oe?i.SRGB8_ALPHA8:i.RGBA8),X===i.UNSIGNED_SHORT_4_4_4_4&&(q=i.RGBA4),X===i.UNSIGNED_SHORT_5_5_5_1&&(q=i.RGB5_A1)}return(q===i.R16F||q===i.R32F||q===i.RG16F||q===i.RG32F||q===i.RGBA16F||q===i.RGBA32F)&&t.get("EXT_color_buffer_float"),q}function x(L,C){let X;return L?C===null||C===zi||C===Er?X=i.DEPTH24_STENCIL8:C===$e?X=i.DEPTH32F_STENCIL8:C===ms&&(X=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):C===null||C===zi||C===Er?X=i.DEPTH_COMPONENT24:C===$e?X=i.DEPTH_COMPONENT32F:C===ms&&(X=i.DEPTH_COMPONENT16),X}function b(L,C){return m(L)===!0||L.isFramebufferTexture&&L.minFilter!==Xe&&L.minFilter!==Pe?Math.log2(Math.max(C.width,C.height))+1:L.mipmaps!==void 0&&L.mipmaps.length>0?L.mipmaps.length:L.isCompressedTexture&&Array.isArray(L.image)?C.mipmaps.length:1}function S(L){const C=L.target;C.removeEventListener("dispose",S),T(C),C.isVideoTexture&&u.delete(C)}function A(L){const C=L.target;C.removeEventListener("dispose",A),E(C)}function T(L){const C=n.get(L);if(C.__webglInit===void 0)return;const X=L.source,nt=h.get(X);if(nt){const W=nt[C.__cacheKey];W.usedTimes--,W.usedTimes===0&&y(L),Object.keys(nt).length===0&&h.delete(X)}n.remove(L)}function y(L){const C=n.get(L);i.deleteTexture(C.__webglTexture);const X=L.source,nt=h.get(X);delete nt[C.__cacheKey],o.memory.textures--}function E(L){const C=n.get(L);if(L.depthTexture&&(L.depthTexture.dispose(),n.remove(L.depthTexture)),L.isWebGLCubeRenderTarget)for(let nt=0;nt<6;nt++){if(Array.isArray(C.__webglFramebuffer[nt]))for(let W=0;W<C.__webglFramebuffer[nt].length;W++)i.deleteFramebuffer(C.__webglFramebuffer[nt][W]);else i.deleteFramebuffer(C.__webglFramebuffer[nt]);C.__webglDepthbuffer&&i.deleteRenderbuffer(C.__webglDepthbuffer[nt])}else{if(Array.isArray(C.__webglFramebuffer))for(let nt=0;nt<C.__webglFramebuffer.length;nt++)i.deleteFramebuffer(C.__webglFramebuffer[nt]);else i.deleteFramebuffer(C.__webglFramebuffer);if(C.__webglDepthbuffer&&i.deleteRenderbuffer(C.__webglDepthbuffer),C.__webglMultisampledFramebuffer&&i.deleteFramebuffer(C.__webglMultisampledFramebuffer),C.__webglColorRenderbuffer)for(let nt=0;nt<C.__webglColorRenderbuffer.length;nt++)C.__webglColorRenderbuffer[nt]&&i.deleteRenderbuffer(C.__webglColorRenderbuffer[nt]);C.__webglDepthRenderbuffer&&i.deleteRenderbuffer(C.__webglDepthRenderbuffer)}const X=L.textures;for(let nt=0,W=X.length;nt<W;nt++){const q=n.get(X[nt]);q.__webglTexture&&(i.deleteTexture(q.__webglTexture),o.memory.textures--),n.remove(X[nt])}n.remove(L)}let R=0;function D(){R=0}function N(){const L=R;return L>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+L+" texture units while this GPU supports only "+r.maxTextures),R+=1,L}function U(L){const C=[];return C.push(L.wrapS),C.push(L.wrapT),C.push(L.wrapR||0),C.push(L.magFilter),C.push(L.minFilter),C.push(L.anisotropy),C.push(L.internalFormat),C.push(L.format),C.push(L.type),C.push(L.generateMipmaps),C.push(L.premultiplyAlpha),C.push(L.flipY),C.push(L.unpackAlignment),C.push(L.colorSpace),C.join()}function w(L,C){const X=n.get(L);if(L.isVideoTexture&&Pt(L),L.isRenderTargetTexture===!1&&L.version>0&&X.__version!==L.version){const nt=L.image;if(nt===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(nt.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{J(X,L,C);return}}e.bindTexture(i.TEXTURE_2D,X.__webglTexture,i.TEXTURE0+C)}function P(L,C){const X=n.get(L);if(L.version>0&&X.__version!==L.version){J(X,L,C);return}e.bindTexture(i.TEXTURE_2D_ARRAY,X.__webglTexture,i.TEXTURE0+C)}function F(L,C){const X=n.get(L);if(L.version>0&&X.__version!==L.version){J(X,L,C);return}e.bindTexture(i.TEXTURE_3D,X.__webglTexture,i.TEXTURE0+C)}function O(L,C){const X=n.get(L);if(L.version>0&&X.__version!==L.version){it(X,L,C);return}e.bindTexture(i.TEXTURE_CUBE_MAP,X.__webglTexture,i.TEXTURE0+C)}const K={[an]:i.REPEAT,[Cn]:i.CLAMP_TO_EDGE,[Fo]:i.MIRRORED_REPEAT},tt={[Xe]:i.NEAREST,[Xh]:i.NEAREST_MIPMAP_NEAREST,[Qr]:i.NEAREST_MIPMAP_LINEAR,[Pe]:i.LINEAR,[vo]:i.LINEAR_MIPMAP_NEAREST,[En]:i.LINEAR_MIPMAP_LINEAR},ut={[p0]:i.NEVER,[M0]:i.ALWAYS,[m0]:i.LESS,[id]:i.LEQUAL,[g0]:i.EQUAL,[v0]:i.GEQUAL,[_0]:i.GREATER,[x0]:i.NOTEQUAL};function dt(L,C){if(C.type===$e&&t.has("OES_texture_float_linear")===!1&&(C.magFilter===Pe||C.magFilter===vo||C.magFilter===Qr||C.magFilter===En||C.minFilter===Pe||C.minFilter===vo||C.minFilter===Qr||C.minFilter===En)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(L,i.TEXTURE_WRAP_S,K[C.wrapS]),i.texParameteri(L,i.TEXTURE_WRAP_T,K[C.wrapT]),(L===i.TEXTURE_3D||L===i.TEXTURE_2D_ARRAY)&&i.texParameteri(L,i.TEXTURE_WRAP_R,K[C.wrapR]),i.texParameteri(L,i.TEXTURE_MAG_FILTER,tt[C.magFilter]),i.texParameteri(L,i.TEXTURE_MIN_FILTER,tt[C.minFilter]),C.compareFunction&&(i.texParameteri(L,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(L,i.TEXTURE_COMPARE_FUNC,ut[C.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(C.magFilter===Xe||C.minFilter!==Qr&&C.minFilter!==En||C.type===$e&&t.has("OES_texture_float_linear")===!1)return;if(C.anisotropy>1||n.get(C).__currentAnisotropy){const X=t.get("EXT_texture_filter_anisotropic");i.texParameterf(L,X.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(C.anisotropy,r.getMaxAnisotropy())),n.get(C).__currentAnisotropy=C.anisotropy}}}function bt(L,C){let X=!1;L.__webglInit===void 0&&(L.__webglInit=!0,C.addEventListener("dispose",S));const nt=C.source;let W=h.get(nt);W===void 0&&(W={},h.set(nt,W));const q=U(C);if(q!==L.__cacheKey){W[q]===void 0&&(W[q]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,X=!0),W[q].usedTimes++;const at=W[L.__cacheKey];at!==void 0&&(W[L.__cacheKey].usedTimes--,at.usedTimes===0&&y(C)),L.__cacheKey=q,L.__webglTexture=W[q].texture}return X}function J(L,C,X){let nt=i.TEXTURE_2D;(C.isDataArrayTexture||C.isCompressedArrayTexture)&&(nt=i.TEXTURE_2D_ARRAY),C.isData3DTexture&&(nt=i.TEXTURE_3D);const W=bt(L,C),q=C.source;e.bindTexture(nt,L.__webglTexture,i.TEXTURE0+X);const at=n.get(q);if(q.version!==at.__version||W===!0){e.activeTexture(i.TEXTURE0+X);const Z=Yt.getPrimaries(Yt.workingColorSpace),ot=C.colorSpace===Mn?null:Yt.getPrimaries(C.colorSpace),Ot=C.colorSpace===Mn||Z===ot?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,C.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,C.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,C.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ot);let rt=_(C.image,!1,r.maxTextureSize);rt=ce(C,rt);const gt=s.convert(C.format,C.colorSpace),Mt=s.convert(C.type);let wt=M(C.internalFormat,gt,Mt,C.colorSpace,C.isVideoTexture);dt(nt,C);let xt;const Ut=C.mipmaps,Nt=C.isVideoTexture!==!0,Kt=at.__version===void 0||W===!0,B=q.dataReady,ct=b(C,rt);if(C.isDepthTexture)wt=x(C.format===br,C.type),Kt&&(Nt?e.texStorage2D(i.TEXTURE_2D,1,wt,rt.width,rt.height):e.texImage2D(i.TEXTURE_2D,0,wt,rt.width,rt.height,0,gt,Mt,null));else if(C.isDataTexture)if(Ut.length>0){Nt&&Kt&&e.texStorage2D(i.TEXTURE_2D,ct,wt,Ut[0].width,Ut[0].height);for(let Q=0,j=Ut.length;Q<j;Q++)xt=Ut[Q],Nt?B&&e.texSubImage2D(i.TEXTURE_2D,Q,0,0,xt.width,xt.height,gt,Mt,xt.data):e.texImage2D(i.TEXTURE_2D,Q,wt,xt.width,xt.height,0,gt,Mt,xt.data);C.generateMipmaps=!1}else Nt?(Kt&&e.texStorage2D(i.TEXTURE_2D,ct,wt,rt.width,rt.height),B&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,rt.width,rt.height,gt,Mt,rt.data)):e.texImage2D(i.TEXTURE_2D,0,wt,rt.width,rt.height,0,gt,Mt,rt.data);else if(C.isCompressedTexture)if(C.isCompressedArrayTexture){Nt&&Kt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,ct,wt,Ut[0].width,Ut[0].height,rt.depth);for(let Q=0,j=Ut.length;Q<j;Q++)if(xt=Ut[Q],C.format!==on)if(gt!==null)if(Nt){if(B)if(C.layerUpdates.size>0){const pt=gf(xt.width,xt.height,C.format,C.type);for(const ht of C.layerUpdates){const Ft=xt.data.subarray(ht*pt/xt.data.BYTES_PER_ELEMENT,(ht+1)*pt/xt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Q,0,0,ht,xt.width,xt.height,1,gt,Ft)}C.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Q,0,0,0,xt.width,xt.height,rt.depth,gt,xt.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,Q,wt,xt.width,xt.height,rt.depth,0,xt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Nt?B&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,Q,0,0,0,xt.width,xt.height,rt.depth,gt,Mt,xt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,Q,wt,xt.width,xt.height,rt.depth,0,gt,Mt,xt.data)}else{Nt&&Kt&&e.texStorage2D(i.TEXTURE_2D,ct,wt,Ut[0].width,Ut[0].height);for(let Q=0,j=Ut.length;Q<j;Q++)xt=Ut[Q],C.format!==on?gt!==null?Nt?B&&e.compressedTexSubImage2D(i.TEXTURE_2D,Q,0,0,xt.width,xt.height,gt,xt.data):e.compressedTexImage2D(i.TEXTURE_2D,Q,wt,xt.width,xt.height,0,xt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Nt?B&&e.texSubImage2D(i.TEXTURE_2D,Q,0,0,xt.width,xt.height,gt,Mt,xt.data):e.texImage2D(i.TEXTURE_2D,Q,wt,xt.width,xt.height,0,gt,Mt,xt.data)}else if(C.isDataArrayTexture)if(Nt){if(Kt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,ct,wt,rt.width,rt.height,rt.depth),B)if(C.layerUpdates.size>0){const Q=gf(rt.width,rt.height,C.format,C.type);for(const j of C.layerUpdates){const pt=rt.data.subarray(j*Q/rt.data.BYTES_PER_ELEMENT,(j+1)*Q/rt.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,j,rt.width,rt.height,1,gt,Mt,pt)}C.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,rt.width,rt.height,rt.depth,gt,Mt,rt.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,wt,rt.width,rt.height,rt.depth,0,gt,Mt,rt.data);else if(C.isData3DTexture)Nt?(Kt&&e.texStorage3D(i.TEXTURE_3D,ct,wt,rt.width,rt.height,rt.depth),B&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,rt.width,rt.height,rt.depth,gt,Mt,rt.data)):e.texImage3D(i.TEXTURE_3D,0,wt,rt.width,rt.height,rt.depth,0,gt,Mt,rt.data);else if(C.isFramebufferTexture){if(Kt)if(Nt)e.texStorage2D(i.TEXTURE_2D,ct,wt,rt.width,rt.height);else{let Q=rt.width,j=rt.height;for(let pt=0;pt<ct;pt++)e.texImage2D(i.TEXTURE_2D,pt,wt,Q,j,0,gt,Mt,null),Q>>=1,j>>=1}}else if(Ut.length>0){if(Nt&&Kt){const Q=Ct(Ut[0]);e.texStorage2D(i.TEXTURE_2D,ct,wt,Q.width,Q.height)}for(let Q=0,j=Ut.length;Q<j;Q++)xt=Ut[Q],Nt?B&&e.texSubImage2D(i.TEXTURE_2D,Q,0,0,gt,Mt,xt):e.texImage2D(i.TEXTURE_2D,Q,wt,gt,Mt,xt);C.generateMipmaps=!1}else if(Nt){if(Kt){const Q=Ct(rt);e.texStorage2D(i.TEXTURE_2D,ct,wt,Q.width,Q.height)}B&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,gt,Mt,rt)}else e.texImage2D(i.TEXTURE_2D,0,wt,gt,Mt,rt);m(C)&&p(nt),at.__version=q.version,C.onUpdate&&C.onUpdate(C)}L.__version=C.version}function it(L,C,X){if(C.image.length!==6)return;const nt=bt(L,C),W=C.source;e.bindTexture(i.TEXTURE_CUBE_MAP,L.__webglTexture,i.TEXTURE0+X);const q=n.get(W);if(W.version!==q.__version||nt===!0){e.activeTexture(i.TEXTURE0+X);const at=Yt.getPrimaries(Yt.workingColorSpace),Z=C.colorSpace===Mn?null:Yt.getPrimaries(C.colorSpace),ot=C.colorSpace===Mn||at===Z?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,C.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,C.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,C.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ot);const Ot=C.isCompressedTexture||C.image[0].isCompressedTexture,rt=C.image[0]&&C.image[0].isDataTexture,gt=[];for(let j=0;j<6;j++)!Ot&&!rt?gt[j]=_(C.image[j],!0,r.maxCubemapSize):gt[j]=rt?C.image[j].image:C.image[j],gt[j]=ce(C,gt[j]);const Mt=gt[0],wt=s.convert(C.format,C.colorSpace),xt=s.convert(C.type),Ut=M(C.internalFormat,wt,xt,C.colorSpace),Nt=C.isVideoTexture!==!0,Kt=q.__version===void 0||nt===!0,B=W.dataReady;let ct=b(C,Mt);dt(i.TEXTURE_CUBE_MAP,C);let Q;if(Ot){Nt&&Kt&&e.texStorage2D(i.TEXTURE_CUBE_MAP,ct,Ut,Mt.width,Mt.height);for(let j=0;j<6;j++){Q=gt[j].mipmaps;for(let pt=0;pt<Q.length;pt++){const ht=Q[pt];C.format!==on?wt!==null?Nt?B&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,pt,0,0,ht.width,ht.height,wt,ht.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,pt,Ut,ht.width,ht.height,0,ht.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Nt?B&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,pt,0,0,ht.width,ht.height,wt,xt,ht.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,pt,Ut,ht.width,ht.height,0,wt,xt,ht.data)}}}else{if(Q=C.mipmaps,Nt&&Kt){Q.length>0&&ct++;const j=Ct(gt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,ct,Ut,j.width,j.height)}for(let j=0;j<6;j++)if(rt){Nt?B&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,gt[j].width,gt[j].height,wt,xt,gt[j].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,Ut,gt[j].width,gt[j].height,0,wt,xt,gt[j].data);for(let pt=0;pt<Q.length;pt++){const Ft=Q[pt].image[j].image;Nt?B&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,pt+1,0,0,Ft.width,Ft.height,wt,xt,Ft.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,pt+1,Ut,Ft.width,Ft.height,0,wt,xt,Ft.data)}}else{Nt?B&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,wt,xt,gt[j]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,Ut,wt,xt,gt[j]);for(let pt=0;pt<Q.length;pt++){const ht=Q[pt];Nt?B&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,pt+1,0,0,wt,xt,ht.image[j]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,pt+1,Ut,wt,xt,ht.image[j])}}}m(C)&&p(i.TEXTURE_CUBE_MAP),q.__version=W.version,C.onUpdate&&C.onUpdate(C)}L.__version=C.version}function _t(L,C,X,nt,W,q){const at=s.convert(X.format,X.colorSpace),Z=s.convert(X.type),ot=M(X.internalFormat,at,Z,X.colorSpace),Ot=n.get(C),rt=n.get(X);if(rt.__renderTarget=C,!Ot.__hasExternalTextures){const gt=Math.max(1,C.width>>q),Mt=Math.max(1,C.height>>q);W===i.TEXTURE_3D||W===i.TEXTURE_2D_ARRAY?e.texImage3D(W,q,ot,gt,Mt,C.depth,0,at,Z,null):e.texImage2D(W,q,ot,gt,Mt,0,at,Z,null)}e.bindFramebuffer(i.FRAMEBUFFER,L),Xt(C)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,nt,W,rt.__webglTexture,0,$t(C)):(W===i.TEXTURE_2D||W>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&W<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,nt,W,rt.__webglTexture,q),e.bindFramebuffer(i.FRAMEBUFFER,null)}function ft(L,C,X){if(i.bindRenderbuffer(i.RENDERBUFFER,L),C.depthBuffer){const nt=C.depthTexture,W=nt&&nt.isDepthTexture?nt.type:null,q=x(C.stencilBuffer,W),at=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Z=$t(C);Xt(C)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Z,q,C.width,C.height):X?i.renderbufferStorageMultisample(i.RENDERBUFFER,Z,q,C.width,C.height):i.renderbufferStorage(i.RENDERBUFFER,q,C.width,C.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,at,i.RENDERBUFFER,L)}else{const nt=C.textures;for(let W=0;W<nt.length;W++){const q=nt[W],at=s.convert(q.format,q.colorSpace),Z=s.convert(q.type),ot=M(q.internalFormat,at,Z,q.colorSpace),Ot=$t(C);X&&Xt(C)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Ot,ot,C.width,C.height):Xt(C)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Ot,ot,C.width,C.height):i.renderbufferStorage(i.RENDERBUFFER,ot,C.width,C.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function At(L,C){if(C&&C.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,L),!(C.depthTexture&&C.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const nt=n.get(C.depthTexture);nt.__renderTarget=C,(!nt.__webglTexture||C.depthTexture.image.width!==C.width||C.depthTexture.image.height!==C.height)&&(C.depthTexture.image.width=C.width,C.depthTexture.image.height=C.height,C.depthTexture.needsUpdate=!0),w(C.depthTexture,0);const W=nt.__webglTexture,q=$t(C);if(C.depthTexture.format===mr)Xt(C)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,W,0,q):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,W,0);else if(C.depthTexture.format===br)Xt(C)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,W,0,q):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,W,0);else throw new Error("Unknown depthTexture format")}function Rt(L){const C=n.get(L),X=L.isWebGLCubeRenderTarget===!0;if(C.__boundDepthTexture!==L.depthTexture){const nt=L.depthTexture;if(C.__depthDisposeCallback&&C.__depthDisposeCallback(),nt){const W=()=>{delete C.__boundDepthTexture,delete C.__depthDisposeCallback,nt.removeEventListener("dispose",W)};nt.addEventListener("dispose",W),C.__depthDisposeCallback=W}C.__boundDepthTexture=nt}if(L.depthTexture&&!C.__autoAllocateDepthBuffer){if(X)throw new Error("target.depthTexture not supported in Cube render targets");At(C.__webglFramebuffer,L)}else if(X){C.__webglDepthbuffer=[];for(let nt=0;nt<6;nt++)if(e.bindFramebuffer(i.FRAMEBUFFER,C.__webglFramebuffer[nt]),C.__webglDepthbuffer[nt]===void 0)C.__webglDepthbuffer[nt]=i.createRenderbuffer(),ft(C.__webglDepthbuffer[nt],L,!1);else{const W=L.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,q=C.__webglDepthbuffer[nt];i.bindRenderbuffer(i.RENDERBUFFER,q),i.framebufferRenderbuffer(i.FRAMEBUFFER,W,i.RENDERBUFFER,q)}}else if(e.bindFramebuffer(i.FRAMEBUFFER,C.__webglFramebuffer),C.__webglDepthbuffer===void 0)C.__webglDepthbuffer=i.createRenderbuffer(),ft(C.__webglDepthbuffer,L,!1);else{const nt=L.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,W=C.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,W),i.framebufferRenderbuffer(i.FRAMEBUFFER,nt,i.RENDERBUFFER,W)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function Dt(L,C,X){const nt=n.get(L);C!==void 0&&_t(nt.__webglFramebuffer,L,L.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),X!==void 0&&Rt(L)}function Gt(L){const C=L.texture,X=n.get(L),nt=n.get(C);L.addEventListener("dispose",A);const W=L.textures,q=L.isWebGLCubeRenderTarget===!0,at=W.length>1;if(at||(nt.__webglTexture===void 0&&(nt.__webglTexture=i.createTexture()),nt.__version=C.version,o.memory.textures++),q){X.__webglFramebuffer=[];for(let Z=0;Z<6;Z++)if(C.mipmaps&&C.mipmaps.length>0){X.__webglFramebuffer[Z]=[];for(let ot=0;ot<C.mipmaps.length;ot++)X.__webglFramebuffer[Z][ot]=i.createFramebuffer()}else X.__webglFramebuffer[Z]=i.createFramebuffer()}else{if(C.mipmaps&&C.mipmaps.length>0){X.__webglFramebuffer=[];for(let Z=0;Z<C.mipmaps.length;Z++)X.__webglFramebuffer[Z]=i.createFramebuffer()}else X.__webglFramebuffer=i.createFramebuffer();if(at)for(let Z=0,ot=W.length;Z<ot;Z++){const Ot=n.get(W[Z]);Ot.__webglTexture===void 0&&(Ot.__webglTexture=i.createTexture(),o.memory.textures++)}if(L.samples>0&&Xt(L)===!1){X.__webglMultisampledFramebuffer=i.createFramebuffer(),X.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,X.__webglMultisampledFramebuffer);for(let Z=0;Z<W.length;Z++){const ot=W[Z];X.__webglColorRenderbuffer[Z]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,X.__webglColorRenderbuffer[Z]);const Ot=s.convert(ot.format,ot.colorSpace),rt=s.convert(ot.type),gt=M(ot.internalFormat,Ot,rt,ot.colorSpace,L.isXRRenderTarget===!0),Mt=$t(L);i.renderbufferStorageMultisample(i.RENDERBUFFER,Mt,gt,L.width,L.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Z,i.RENDERBUFFER,X.__webglColorRenderbuffer[Z])}i.bindRenderbuffer(i.RENDERBUFFER,null),L.depthBuffer&&(X.__webglDepthRenderbuffer=i.createRenderbuffer(),ft(X.__webglDepthRenderbuffer,L,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(q){e.bindTexture(i.TEXTURE_CUBE_MAP,nt.__webglTexture),dt(i.TEXTURE_CUBE_MAP,C);for(let Z=0;Z<6;Z++)if(C.mipmaps&&C.mipmaps.length>0)for(let ot=0;ot<C.mipmaps.length;ot++)_t(X.__webglFramebuffer[Z][ot],L,C,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ot);else _t(X.__webglFramebuffer[Z],L,C,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0);m(C)&&p(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(at){for(let Z=0,ot=W.length;Z<ot;Z++){const Ot=W[Z],rt=n.get(Ot);e.bindTexture(i.TEXTURE_2D,rt.__webglTexture),dt(i.TEXTURE_2D,Ot),_t(X.__webglFramebuffer,L,Ot,i.COLOR_ATTACHMENT0+Z,i.TEXTURE_2D,0),m(Ot)&&p(i.TEXTURE_2D)}e.unbindTexture()}else{let Z=i.TEXTURE_2D;if((L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)&&(Z=L.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(Z,nt.__webglTexture),dt(Z,C),C.mipmaps&&C.mipmaps.length>0)for(let ot=0;ot<C.mipmaps.length;ot++)_t(X.__webglFramebuffer[ot],L,C,i.COLOR_ATTACHMENT0,Z,ot);else _t(X.__webglFramebuffer,L,C,i.COLOR_ATTACHMENT0,Z,0);m(C)&&p(Z),e.unbindTexture()}L.depthBuffer&&Rt(L)}function zt(L){const C=L.textures;for(let X=0,nt=C.length;X<nt;X++){const W=C[X];if(m(W)){const q=v(L),at=n.get(W).__webglTexture;e.bindTexture(q,at),p(q),e.unbindTexture()}}}const he=[],V=[];function qe(L){if(L.samples>0){if(Xt(L)===!1){const C=L.textures,X=L.width,nt=L.height;let W=i.COLOR_BUFFER_BIT;const q=L.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,at=n.get(L),Z=C.length>1;if(Z)for(let ot=0;ot<C.length;ot++)e.bindFramebuffer(i.FRAMEBUFFER,at.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ot,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,at.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ot,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,at.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,at.__webglFramebuffer);for(let ot=0;ot<C.length;ot++){if(L.resolveDepthBuffer&&(L.depthBuffer&&(W|=i.DEPTH_BUFFER_BIT),L.stencilBuffer&&L.resolveStencilBuffer&&(W|=i.STENCIL_BUFFER_BIT)),Z){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,at.__webglColorRenderbuffer[ot]);const Ot=n.get(C[ot]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Ot,0)}i.blitFramebuffer(0,0,X,nt,0,0,X,nt,W,i.NEAREST),c===!0&&(he.length=0,V.length=0,he.push(i.COLOR_ATTACHMENT0+ot),L.depthBuffer&&L.resolveDepthBuffer===!1&&(he.push(q),V.push(q),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,V)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,he))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),Z)for(let ot=0;ot<C.length;ot++){e.bindFramebuffer(i.FRAMEBUFFER,at.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ot,i.RENDERBUFFER,at.__webglColorRenderbuffer[ot]);const Ot=n.get(C[ot]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,at.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ot,i.TEXTURE_2D,Ot,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,at.__webglMultisampledFramebuffer)}else if(L.depthBuffer&&L.resolveDepthBuffer===!1&&c){const C=L.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[C])}}}function $t(L){return Math.min(r.maxSamples,L.samples)}function Xt(L){const C=n.get(L);return L.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&C.__useRenderToTexture!==!1}function Pt(L){const C=o.render.frame;u.get(L)!==C&&(u.set(L,C),L.update())}function ce(L,C){const X=L.colorSpace,nt=L.format,W=L.type;return L.isCompressedTexture===!0||L.isVideoTexture===!0||X!==ze&&X!==Mn&&(Yt.getTransfer(X)===oe?(nt!==on||W!==ei)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",X)),C}function Ct(L){return typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement?(l.width=L.naturalWidth||L.width,l.height=L.naturalHeight||L.height):typeof VideoFrame<"u"&&L instanceof VideoFrame?(l.width=L.displayWidth,l.height=L.displayHeight):(l.width=L.width,l.height=L.height),l}this.allocateTextureUnit=N,this.resetTextureUnits=D,this.setTexture2D=w,this.setTexture2DArray=P,this.setTexture3D=F,this.setTextureCube=O,this.rebindTextures=Dt,this.setupRenderTarget=Gt,this.updateRenderTargetMipmap=zt,this.updateMultisampleRenderTarget=qe,this.setupDepthRenderbuffer=Rt,this.setupFrameBufferTexture=_t,this.useMultisampledRTT=Xt}function VM(i,t){function e(n,r=Mn){let s;const o=Yt.getTransfer(r);if(n===ei)return i.UNSIGNED_BYTE;if(n===dl)return i.UNSIGNED_SHORT_4_4_4_4;if(n===pl)return i.UNSIGNED_SHORT_5_5_5_1;if(n===$h)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===qh)return i.BYTE;if(n===jh)return i.SHORT;if(n===ms)return i.UNSIGNED_SHORT;if(n===hl)return i.INT;if(n===zi)return i.UNSIGNED_INT;if(n===$e)return i.FLOAT;if(n===Yn)return i.HALF_FLOAT;if(n===Yh)return i.ALPHA;if(n===Zh)return i.RGB;if(n===on)return i.RGBA;if(n===Kh)return i.LUMINANCE;if(n===Jh)return i.LUMINANCE_ALPHA;if(n===mr)return i.DEPTH_COMPONENT;if(n===br)return i.DEPTH_STENCIL;if(n===ml)return i.RED;if(n===gl)return i.RED_INTEGER;if(n===Qh)return i.RG;if(n===_l)return i.RG_INTEGER;if(n===xl)return i.RGBA_INTEGER;if(n===Mo||n===yo||n===So||n===Eo)if(o===oe)if(s=t.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===Mo)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===yo)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===So)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Eo)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=t.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===Mo)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===yo)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===So)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Eo)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===vc||n===Mc||n===yc||n===Sc)if(s=t.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===vc)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Mc)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===yc)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Sc)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Ec||n===bc||n===Ac)if(s=t.get("WEBGL_compressed_texture_etc"),s!==null){if(n===Ec||n===bc)return o===oe?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===Ac)return o===oe?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Tc||n===wc||n===Rc||n===Cc||n===Ic||n===Pc||n===Lc||n===Dc||n===Uc||n===Nc||n===Oc||n===zc||n===Fc||n===Bc)if(s=t.get("WEBGL_compressed_texture_astc"),s!==null){if(n===Tc)return o===oe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===wc)return o===oe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Rc)return o===oe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Cc)return o===oe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Ic)return o===oe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Pc)return o===oe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Lc)return o===oe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Dc)return o===oe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Uc)return o===oe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Nc)return o===oe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Oc)return o===oe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===zc)return o===oe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Fc)return o===oe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Bc)return o===oe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===bo||n===Gc||n===kc)if(s=t.get("EXT_texture_compression_bptc"),s!==null){if(n===bo)return o===oe?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Gc)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===kc)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===td||n===Hc||n===Vc||n===Wc)if(s=t.get("EXT_texture_compression_rgtc"),s!==null){if(n===bo)return s.COMPRESSED_RED_RGTC1_EXT;if(n===Hc)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Vc)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Wc)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Er?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}class WM extends ke{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class Oe extends me{constructor(){super(),this.isGroup=!0,this.type="Group"}}const XM={type:"move"};class za{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Oe,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Oe,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new z,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new z),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Oe,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new z,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new z),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let r=null,s=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(const _ of t.hand.values()){const m=e.getJointPose(_,n),p=this._getHandJoint(l,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const u=l.joints["index-finger-tip"],f=l.joints["thumb-tip"],h=u.position.distanceTo(f.position),d=.02,g=.005;l.inputState.pinching&&h>d+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&h<=d-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(s=e.getPose(t.gripSpace,n),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(r=e.getPose(t.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(XM)))}return a!==null&&(a.visible=r!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new Oe;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const qM=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,jM=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class $M{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const r=new Ae,s=t.properties.get(r);s.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=r}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new An({vertexShader:qM,fragmentShader:jM,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new ne(new ln(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class YM extends Ir{constructor(t,e){super();const n=this;let r=null,s=1,o=null,a="local-floor",c=1,l=null,u=null,f=null,h=null,d=null,g=null;const _=new $M,m=e.getContextAttributes();let p=null,v=null;const M=[],x=[],b=new Wt;let S=null;const A=new ke;A.viewport=new Qt;const T=new ke;T.viewport=new Qt;const y=[A,T],E=new WM;let R=null,D=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(J){let it=M[J];return it===void 0&&(it=new za,M[J]=it),it.getTargetRaySpace()},this.getControllerGrip=function(J){let it=M[J];return it===void 0&&(it=new za,M[J]=it),it.getGripSpace()},this.getHand=function(J){let it=M[J];return it===void 0&&(it=new za,M[J]=it),it.getHandSpace()};function N(J){const it=x.indexOf(J.inputSource);if(it===-1)return;const _t=M[it];_t!==void 0&&(_t.update(J.inputSource,J.frame,l||o),_t.dispatchEvent({type:J.type,data:J.inputSource}))}function U(){r.removeEventListener("select",N),r.removeEventListener("selectstart",N),r.removeEventListener("selectend",N),r.removeEventListener("squeeze",N),r.removeEventListener("squeezestart",N),r.removeEventListener("squeezeend",N),r.removeEventListener("end",U),r.removeEventListener("inputsourceschange",w);for(let J=0;J<M.length;J++){const it=x[J];it!==null&&(x[J]=null,M[J].disconnect(it))}R=null,D=null,_.reset(),t.setRenderTarget(p),d=null,h=null,f=null,r=null,v=null,bt.stop(),n.isPresenting=!1,t.setPixelRatio(S),t.setSize(b.width,b.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(J){s=J,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(J){a=J,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(J){l=J},this.getBaseLayer=function(){return h!==null?h:d},this.getBinding=function(){return f},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(J){if(r=J,r!==null){if(p=t.getRenderTarget(),r.addEventListener("select",N),r.addEventListener("selectstart",N),r.addEventListener("selectend",N),r.addEventListener("squeeze",N),r.addEventListener("squeezestart",N),r.addEventListener("squeezeend",N),r.addEventListener("end",U),r.addEventListener("inputsourceschange",w),m.xrCompatible!==!0&&await e.makeXRCompatible(),S=t.getPixelRatio(),t.getSize(b),r.renderState.layers===void 0){const it={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:s};d=new XRWebGLLayer(r,e,it),r.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),v=new Fi(d.framebufferWidth,d.framebufferHeight,{format:on,type:ei,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let it=null,_t=null,ft=null;m.depth&&(ft=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,it=m.stencil?br:mr,_t=m.stencil?Er:zi);const At={colorFormat:e.RGBA8,depthFormat:ft,scaleFactor:s};f=new XRWebGLBinding(r,e),h=f.createProjectionLayer(At),r.updateRenderState({layers:[h]}),t.setPixelRatio(1),t.setSize(h.textureWidth,h.textureHeight,!1),v=new Fi(h.textureWidth,h.textureHeight,{format:on,type:ei,depthTexture:new md(h.textureWidth,h.textureHeight,_t,void 0,void 0,void 0,void 0,void 0,void 0,it),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await r.requestReferenceSpace(a),bt.setContext(r),bt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function w(J){for(let it=0;it<J.removed.length;it++){const _t=J.removed[it],ft=x.indexOf(_t);ft>=0&&(x[ft]=null,M[ft].disconnect(_t))}for(let it=0;it<J.added.length;it++){const _t=J.added[it];let ft=x.indexOf(_t);if(ft===-1){for(let Rt=0;Rt<M.length;Rt++)if(Rt>=x.length){x.push(_t),ft=Rt;break}else if(x[Rt]===null){x[Rt]=_t,ft=Rt;break}if(ft===-1)break}const At=M[ft];At&&At.connect(_t)}}const P=new z,F=new z;function O(J,it,_t){P.setFromMatrixPosition(it.matrixWorld),F.setFromMatrixPosition(_t.matrixWorld);const ft=P.distanceTo(F),At=it.projectionMatrix.elements,Rt=_t.projectionMatrix.elements,Dt=At[14]/(At[10]-1),Gt=At[14]/(At[10]+1),zt=(At[9]+1)/At[5],he=(At[9]-1)/At[5],V=(At[8]-1)/At[0],qe=(Rt[8]+1)/Rt[0],$t=Dt*V,Xt=Dt*qe,Pt=ft/(-V+qe),ce=Pt*-V;if(it.matrixWorld.decompose(J.position,J.quaternion,J.scale),J.translateX(ce),J.translateZ(Pt),J.matrixWorld.compose(J.position,J.quaternion,J.scale),J.matrixWorldInverse.copy(J.matrixWorld).invert(),At[10]===-1)J.projectionMatrix.copy(it.projectionMatrix),J.projectionMatrixInverse.copy(it.projectionMatrixInverse);else{const Ct=Dt+Pt,L=Gt+Pt,C=$t-ce,X=Xt+(ft-ce),nt=zt*Gt/L*Ct,W=he*Gt/L*Ct;J.projectionMatrix.makePerspective(C,X,nt,W,Ct,L),J.projectionMatrixInverse.copy(J.projectionMatrix).invert()}}function K(J,it){it===null?J.matrixWorld.copy(J.matrix):J.matrixWorld.multiplyMatrices(it.matrixWorld,J.matrix),J.matrixWorldInverse.copy(J.matrixWorld).invert()}this.updateCamera=function(J){if(r===null)return;let it=J.near,_t=J.far;_.texture!==null&&(_.depthNear>0&&(it=_.depthNear),_.depthFar>0&&(_t=_.depthFar)),E.near=T.near=A.near=it,E.far=T.far=A.far=_t,(R!==E.near||D!==E.far)&&(r.updateRenderState({depthNear:E.near,depthFar:E.far}),R=E.near,D=E.far),A.layers.mask=J.layers.mask|2,T.layers.mask=J.layers.mask|4,E.layers.mask=A.layers.mask|T.layers.mask;const ft=J.parent,At=E.cameras;K(E,ft);for(let Rt=0;Rt<At.length;Rt++)K(At[Rt],ft);At.length===2?O(E,A,T):E.projectionMatrix.copy(A.projectionMatrix),tt(J,E,ft)};function tt(J,it,_t){_t===null?J.matrix.copy(it.matrixWorld):(J.matrix.copy(_t.matrixWorld),J.matrix.invert(),J.matrix.multiply(it.matrixWorld)),J.matrix.decompose(J.position,J.quaternion,J.scale),J.updateMatrixWorld(!0),J.projectionMatrix.copy(it.projectionMatrix),J.projectionMatrixInverse.copy(it.projectionMatrixInverse),J.isPerspectiveCamera&&(J.fov=Ar*2*Math.atan(1/J.projectionMatrix.elements[5]),J.zoom=1)}this.getCamera=function(){return E},this.getFoveation=function(){if(!(h===null&&d===null))return c},this.setFoveation=function(J){c=J,h!==null&&(h.fixedFoveation=J),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=J)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(E)};let ut=null;function dt(J,it){if(u=it.getViewerPose(l||o),g=it,u!==null){const _t=u.views;d!==null&&(t.setRenderTargetFramebuffer(v,d.framebuffer),t.setRenderTarget(v));let ft=!1;_t.length!==E.cameras.length&&(E.cameras.length=0,ft=!0);for(let Rt=0;Rt<_t.length;Rt++){const Dt=_t[Rt];let Gt=null;if(d!==null)Gt=d.getViewport(Dt);else{const he=f.getViewSubImage(h,Dt);Gt=he.viewport,Rt===0&&(t.setRenderTargetTextures(v,he.colorTexture,h.ignoreDepthValues?void 0:he.depthStencilTexture),t.setRenderTarget(v))}let zt=y[Rt];zt===void 0&&(zt=new ke,zt.layers.enable(Rt),zt.viewport=new Qt,y[Rt]=zt),zt.matrix.fromArray(Dt.transform.matrix),zt.matrix.decompose(zt.position,zt.quaternion,zt.scale),zt.projectionMatrix.fromArray(Dt.projectionMatrix),zt.projectionMatrixInverse.copy(zt.projectionMatrix).invert(),zt.viewport.set(Gt.x,Gt.y,Gt.width,Gt.height),Rt===0&&(E.matrix.copy(zt.matrix),E.matrix.decompose(E.position,E.quaternion,E.scale)),ft===!0&&E.cameras.push(zt)}const At=r.enabledFeatures;if(At&&At.includes("depth-sensing")){const Rt=f.getDepthInformation(_t[0]);Rt&&Rt.isValid&&Rt.texture&&_.init(t,Rt,r.renderState)}}for(let _t=0;_t<M.length;_t++){const ft=x[_t],At=M[_t];ft!==null&&At!==void 0&&At.update(ft,it,l||o)}ut&&ut(J,it),it.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:it}),g=null}const bt=new pd;bt.setAnimationLoop(dt),this.setAnimationLoop=function(J){ut=J},this.dispose=function(){}}}const Ai=new Pn,ZM=new It;function KM(i,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,fd(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function r(m,p,v,M,x){p.isMeshBasicMaterial||p.isMeshLambertMaterial?s(m,p):p.isMeshToonMaterial?(s(m,p),f(m,p)):p.isMeshPhongMaterial?(s(m,p),u(m,p)):p.isMeshStandardMaterial?(s(m,p),h(m,p),p.isMeshPhysicalMaterial&&d(m,p,x)):p.isMeshMatcapMaterial?(s(m,p),g(m,p)):p.isMeshDepthMaterial?s(m,p):p.isMeshDistanceMaterial?(s(m,p),_(m,p)):p.isMeshNormalMaterial?s(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?c(m,p,v,M):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===We&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===We&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const v=t.get(p),M=v.envMap,x=v.envMapRotation;M&&(m.envMap.value=M,Ai.copy(x),Ai.x*=-1,Ai.y*=-1,Ai.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(Ai.y*=-1,Ai.z*=-1),m.envMapRotation.value.setFromMatrix4(ZM.makeRotationFromEuler(Ai)),m.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,v,M){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*v,m.scale.value=M*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function f(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function h(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function d(m,p,v){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===We&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=v.texture,m.transmissionSamplerSize.value.set(v.width,v.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){const v=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(v.matrixWorld),m.nearDistance.value=v.shadow.camera.near,m.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function JM(i,t,e,n){let r={},s={},o=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(v,M){const x=M.program;n.uniformBlockBinding(v,x)}function l(v,M){let x=r[v.id];x===void 0&&(g(v),x=u(v),r[v.id]=x,v.addEventListener("dispose",m));const b=M.program;n.updateUBOMapping(v,b);const S=t.render.frame;s[v.id]!==S&&(h(v),s[v.id]=S)}function u(v){const M=f();v.__bindingPointIndex=M;const x=i.createBuffer(),b=v.__size,S=v.usage;return i.bindBuffer(i.UNIFORM_BUFFER,x),i.bufferData(i.UNIFORM_BUFFER,b,S),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,M,x),x}function f(){for(let v=0;v<a;v++)if(o.indexOf(v)===-1)return o.push(v),v;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(v){const M=r[v.id],x=v.uniforms,b=v.__cache;i.bindBuffer(i.UNIFORM_BUFFER,M);for(let S=0,A=x.length;S<A;S++){const T=Array.isArray(x[S])?x[S]:[x[S]];for(let y=0,E=T.length;y<E;y++){const R=T[y];if(d(R,S,y,b)===!0){const D=R.__offset,N=Array.isArray(R.value)?R.value:[R.value];let U=0;for(let w=0;w<N.length;w++){const P=N[w],F=_(P);typeof P=="number"||typeof P=="boolean"?(R.__data[0]=P,i.bufferSubData(i.UNIFORM_BUFFER,D+U,R.__data)):P.isMatrix3?(R.__data[0]=P.elements[0],R.__data[1]=P.elements[1],R.__data[2]=P.elements[2],R.__data[3]=0,R.__data[4]=P.elements[3],R.__data[5]=P.elements[4],R.__data[6]=P.elements[5],R.__data[7]=0,R.__data[8]=P.elements[6],R.__data[9]=P.elements[7],R.__data[10]=P.elements[8],R.__data[11]=0):(P.toArray(R.__data,U),U+=F.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,D,R.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function d(v,M,x,b){const S=v.value,A=M+"_"+x;if(b[A]===void 0)return typeof S=="number"||typeof S=="boolean"?b[A]=S:b[A]=S.clone(),!0;{const T=b[A];if(typeof S=="number"||typeof S=="boolean"){if(T!==S)return b[A]=S,!0}else if(T.equals(S)===!1)return T.copy(S),!0}return!1}function g(v){const M=v.uniforms;let x=0;const b=16;for(let A=0,T=M.length;A<T;A++){const y=Array.isArray(M[A])?M[A]:[M[A]];for(let E=0,R=y.length;E<R;E++){const D=y[E],N=Array.isArray(D.value)?D.value:[D.value];for(let U=0,w=N.length;U<w;U++){const P=N[U],F=_(P),O=x%b,K=O%F.boundary,tt=O+K;x+=K,tt!==0&&b-tt<F.storage&&(x+=b-tt),D.__data=new Float32Array(F.storage/Float32Array.BYTES_PER_ELEMENT),D.__offset=x,x+=F.storage}}}const S=x%b;return S>0&&(x+=b-S),v.__size=x,v.__cache={},this}function _(v){const M={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(M.boundary=4,M.storage=4):v.isVector2?(M.boundary=8,M.storage=8):v.isVector3||v.isColor?(M.boundary=16,M.storage=12):v.isVector4?(M.boundary=16,M.storage=16):v.isMatrix3?(M.boundary=48,M.storage=48):v.isMatrix4?(M.boundary=64,M.storage=64):v.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",v),M}function m(v){const M=v.target;M.removeEventListener("dispose",m);const x=o.indexOf(M.__bindingPointIndex);o.splice(x,1),i.deleteBuffer(r[M.id]),delete r[M.id],delete s[M.id]}function p(){for(const v in r)i.deleteBuffer(r[v]);o=[],r={},s={}}return{bind:c,update:l,dispose:p}}class QM{constructor(t={}){const{canvas:e=F0(),context:n=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1,reverseDepthBuffer:h=!1}=t;this.isWebGLRenderer=!0;let d;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=o;const g=new Uint32Array(4),_=new Int32Array(4);let m=null,p=null;const v=[],M=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=ae,this.toneMapping=xi,this.toneMappingExposure=1;const x=this;let b=!1,S=0,A=0,T=null,y=-1,E=null;const R=new Qt,D=new Qt;let N=null;const U=new Lt(0);let w=0,P=e.width,F=e.height,O=1,K=null,tt=null;const ut=new Qt(0,0,P,F),dt=new Qt(0,0,P,F);let bt=!1;const J=new Ml;let it=!1,_t=!1;const ft=new It,At=new It,Rt=new z,Dt=new Qt,Gt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let zt=!1;function he(){return T===null?O:1}let V=n;function qe(I,k){return e.getContext(I,k)}try{const I={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${ul}`),e.addEventListener("webglcontextlost",j,!1),e.addEventListener("webglcontextrestored",pt,!1),e.addEventListener("webglcontextcreationerror",ht,!1),V===null){const k="webgl2";if(V=qe(k,I),V===null)throw qe(k)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(I){throw console.error("THREE.WebGLRenderer: "+I.message),I}let $t,Xt,Pt,ce,Ct,L,C,X,nt,W,q,at,Z,ot,Ot,rt,gt,Mt,wt,xt,Ut,Nt,Kt,B;function ct(){$t=new rv(V),$t.init(),Nt=new VM(V,$t),Xt=new Jx(V,$t,t,Nt),Pt=new GM(V,$t),Xt.reverseDepthBuffer&&h&&Pt.buffers.depth.setReversed(!0),ce=new av(V),Ct=new AM,L=new HM(V,$t,Pt,Ct,Xt,Nt,ce),C=new tv(x),X=new iv(x),nt=new pg(V),Kt=new Zx(V,nt),W=new sv(V,nt,ce,Kt),q=new lv(V,W,nt,ce),wt=new cv(V,Xt,L),rt=new Qx(Ct),at=new bM(x,C,X,$t,Xt,Kt,rt),Z=new KM(x,Ct),ot=new wM,Ot=new DM($t),Mt=new Yx(x,C,X,Pt,q,d,c),gt=new FM(x,q,Xt),B=new JM(V,ce,Xt,Pt),xt=new Kx(V,$t,ce),Ut=new ov(V,$t,ce),ce.programs=at.programs,x.capabilities=Xt,x.extensions=$t,x.properties=Ct,x.renderLists=ot,x.shadowMap=gt,x.state=Pt,x.info=ce}ct();const Q=new YM(x,V);this.xr=Q,this.getContext=function(){return V},this.getContextAttributes=function(){return V.getContextAttributes()},this.forceContextLoss=function(){const I=$t.get("WEBGL_lose_context");I&&I.loseContext()},this.forceContextRestore=function(){const I=$t.get("WEBGL_lose_context");I&&I.restoreContext()},this.getPixelRatio=function(){return O},this.setPixelRatio=function(I){I!==void 0&&(O=I,this.setSize(P,F,!1))},this.getSize=function(I){return I.set(P,F)},this.setSize=function(I,k,$=!0){if(Q.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}P=I,F=k,e.width=Math.floor(I*O),e.height=Math.floor(k*O),$===!0&&(e.style.width=I+"px",e.style.height=k+"px"),this.setViewport(0,0,I,k)},this.getDrawingBufferSize=function(I){return I.set(P*O,F*O).floor()},this.setDrawingBufferSize=function(I,k,$){P=I,F=k,O=$,e.width=Math.floor(I*$),e.height=Math.floor(k*$),this.setViewport(0,0,I,k)},this.getCurrentViewport=function(I){return I.copy(R)},this.getViewport=function(I){return I.copy(ut)},this.setViewport=function(I,k,$,Y){I.isVector4?ut.set(I.x,I.y,I.z,I.w):ut.set(I,k,$,Y),Pt.viewport(R.copy(ut).multiplyScalar(O).round())},this.getScissor=function(I){return I.copy(dt)},this.setScissor=function(I,k,$,Y){I.isVector4?dt.set(I.x,I.y,I.z,I.w):dt.set(I,k,$,Y),Pt.scissor(D.copy(dt).multiplyScalar(O).round())},this.getScissorTest=function(){return bt},this.setScissorTest=function(I){Pt.setScissorTest(bt=I)},this.setOpaqueSort=function(I){K=I},this.setTransparentSort=function(I){tt=I},this.getClearColor=function(I){return I.copy(Mt.getClearColor())},this.setClearColor=function(){Mt.setClearColor.apply(Mt,arguments)},this.getClearAlpha=function(){return Mt.getClearAlpha()},this.setClearAlpha=function(){Mt.setClearAlpha.apply(Mt,arguments)},this.clear=function(I=!0,k=!0,$=!0){let Y=0;if(I){let H=!1;if(T!==null){const lt=T.texture.format;H=lt===xl||lt===_l||lt===gl}if(H){const lt=T.texture.type,vt=lt===ei||lt===zi||lt===ms||lt===Er||lt===dl||lt===pl,yt=Mt.getClearColor(),St=Mt.getClearAlpha(),Bt=yt.r,kt=yt.g,Et=yt.b;vt?(g[0]=Bt,g[1]=kt,g[2]=Et,g[3]=St,V.clearBufferuiv(V.COLOR,0,g)):(_[0]=Bt,_[1]=kt,_[2]=Et,_[3]=St,V.clearBufferiv(V.COLOR,0,_))}else Y|=V.COLOR_BUFFER_BIT}k&&(Y|=V.DEPTH_BUFFER_BIT),$&&(Y|=V.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),V.clear(Y)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",j,!1),e.removeEventListener("webglcontextrestored",pt,!1),e.removeEventListener("webglcontextcreationerror",ht,!1),ot.dispose(),Ot.dispose(),Ct.dispose(),C.dispose(),X.dispose(),q.dispose(),Kt.dispose(),B.dispose(),at.dispose(),Q.dispose(),Q.removeEventListener("sessionstart",kl),Q.removeEventListener("sessionend",Hl),vi.stop()};function j(I){I.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),b=!0}function pt(){console.log("THREE.WebGLRenderer: Context Restored."),b=!1;const I=ce.autoReset,k=gt.enabled,$=gt.autoUpdate,Y=gt.needsUpdate,H=gt.type;ct(),ce.autoReset=I,gt.enabled=k,gt.autoUpdate=$,gt.needsUpdate=Y,gt.type=H}function ht(I){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",I.statusMessage)}function Ft(I){const k=I.target;k.removeEventListener("dispose",Ft),xe(k)}function xe(I){De(I),Ct.remove(I)}function De(I){const k=Ct.get(I).programs;k!==void 0&&(k.forEach(function($){at.releaseProgram($)}),I.isShaderMaterial&&at.releaseShaderCache(I))}this.renderBufferDirect=function(I,k,$,Y,H,lt){k===null&&(k=Gt);const vt=H.isMesh&&H.matrixWorld.determinant()<0,yt=up(I,k,$,Y,H);Pt.setMaterial(Y,vt);let St=$.index,Bt=1;if(Y.wireframe===!0){if(St=W.getWireframeAttribute($),St===void 0)return;Bt=2}const kt=$.drawRange,Et=$.attributes.position;let Jt=kt.start*Bt,le=(kt.start+kt.count)*Bt;lt!==null&&(Jt=Math.max(Jt,lt.start*Bt),le=Math.min(le,(lt.start+lt.count)*Bt)),St!==null?(Jt=Math.max(Jt,0),le=Math.min(le,St.count)):Et!=null&&(Jt=Math.max(Jt,0),le=Math.min(le,Et.count));const de=le-Jt;if(de<0||de===1/0)return;Kt.setup(H,Y,yt,$,St);let je,te=xt;if(St!==null&&(je=nt.get(St),te=Ut,te.setIndex(je)),H.isMesh)Y.wireframe===!0?(Pt.setLineWidth(Y.wireframeLinewidth*he()),te.setMode(V.LINES)):te.setMode(V.TRIANGLES);else if(H.isLine){let Tt=Y.linewidth;Tt===void 0&&(Tt=1),Pt.setLineWidth(Tt*he()),H.isLineSegments?te.setMode(V.LINES):H.isLineLoop?te.setMode(V.LINE_LOOP):te.setMode(V.LINE_STRIP)}else H.isPoints?te.setMode(V.POINTS):H.isSprite&&te.setMode(V.TRIANGLES);if(H.isBatchedMesh)if(H._multiDrawInstances!==null)te.renderMultiDrawInstances(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount,H._multiDrawInstances);else if($t.get("WEBGL_multi_draw"))te.renderMultiDraw(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount);else{const Tt=H._multiDrawStarts,zn=H._multiDrawCounts,ee=H._multiDrawCount,hn=St?nt.get(St).bytesPerElement:1,ji=Ct.get(Y).currentProgram.getUniforms();for(let Ze=0;Ze<ee;Ze++)ji.setValue(V,"_gl_DrawID",Ze),te.render(Tt[Ze]/hn,zn[Ze])}else if(H.isInstancedMesh)te.renderInstances(Jt,de,H.count);else if($.isInstancedBufferGeometry){const Tt=$._maxInstanceCount!==void 0?$._maxInstanceCount:1/0,zn=Math.min($.instanceCount,Tt);te.renderInstances(Jt,de,zn)}else te.render(Jt,de)};function ie(I,k,$){I.transparent===!0&&I.side===He&&I.forceSinglePass===!1?(I.side=We,I.needsUpdate=!0,Cs(I,k,$),I.side=ti,I.needsUpdate=!0,Cs(I,k,$),I.side=He):Cs(I,k,$)}this.compile=function(I,k,$=null){$===null&&($=I),p=Ot.get($),p.init(k),M.push(p),$.traverseVisible(function(H){H.isLight&&H.layers.test(k.layers)&&(p.pushLight(H),H.castShadow&&p.pushShadow(H))}),I!==$&&I.traverseVisible(function(H){H.isLight&&H.layers.test(k.layers)&&(p.pushLight(H),H.castShadow&&p.pushShadow(H))}),p.setupLights();const Y=new Set;return I.traverse(function(H){if(!(H.isMesh||H.isPoints||H.isLine||H.isSprite))return;const lt=H.material;if(lt)if(Array.isArray(lt))for(let vt=0;vt<lt.length;vt++){const yt=lt[vt];ie(yt,$,H),Y.add(yt)}else ie(lt,$,H),Y.add(lt)}),M.pop(),p=null,Y},this.compileAsync=function(I,k,$=null){const Y=this.compile(I,k,$);return new Promise(H=>{function lt(){if(Y.forEach(function(vt){Ct.get(vt).currentProgram.isReady()&&Y.delete(vt)}),Y.size===0){H(I);return}setTimeout(lt,10)}$t.get("KHR_parallel_shader_compile")!==null?lt():setTimeout(lt,10)})};let fn=null;function On(I){fn&&fn(I)}function kl(){vi.stop()}function Hl(){vi.start()}const vi=new pd;vi.setAnimationLoop(On),typeof self<"u"&&vi.setContext(self),this.setAnimationLoop=function(I){fn=I,Q.setAnimationLoop(I),I===null?vi.stop():vi.start()},Q.addEventListener("sessionstart",kl),Q.addEventListener("sessionend",Hl),this.render=function(I,k){if(k!==void 0&&k.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(b===!0)return;if(I.matrixWorldAutoUpdate===!0&&I.updateMatrixWorld(),k.parent===null&&k.matrixWorldAutoUpdate===!0&&k.updateMatrixWorld(),Q.enabled===!0&&Q.isPresenting===!0&&(Q.cameraAutoUpdate===!0&&Q.updateCamera(k),k=Q.getCamera()),I.isScene===!0&&I.onBeforeRender(x,I,k,T),p=Ot.get(I,M.length),p.init(k),M.push(p),At.multiplyMatrices(k.projectionMatrix,k.matrixWorldInverse),J.setFromProjectionMatrix(At),_t=this.localClippingEnabled,it=rt.init(this.clippingPlanes,_t),m=ot.get(I,v.length),m.init(),v.push(m),Q.enabled===!0&&Q.isPresenting===!0){const lt=x.xr.getDepthSensingMesh();lt!==null&&ia(lt,k,-1/0,x.sortObjects)}ia(I,k,0,x.sortObjects),m.finish(),x.sortObjects===!0&&m.sort(K,tt),zt=Q.enabled===!1||Q.isPresenting===!1||Q.hasDepthSensing()===!1,zt&&Mt.addToRenderList(m,I),this.info.render.frame++,it===!0&&rt.beginShadows();const $=p.state.shadowsArray;gt.render($,I,k),it===!0&&rt.endShadows(),this.info.autoReset===!0&&this.info.reset();const Y=m.opaque,H=m.transmissive;if(p.setupLights(),k.isArrayCamera){const lt=k.cameras;if(H.length>0)for(let vt=0,yt=lt.length;vt<yt;vt++){const St=lt[vt];Wl(Y,H,I,St)}zt&&Mt.render(I);for(let vt=0,yt=lt.length;vt<yt;vt++){const St=lt[vt];Vl(m,I,St,St.viewport)}}else H.length>0&&Wl(Y,H,I,k),zt&&Mt.render(I),Vl(m,I,k);T!==null&&(L.updateMultisampleRenderTarget(T),L.updateRenderTargetMipmap(T)),I.isScene===!0&&I.onAfterRender(x,I,k),Kt.resetDefaultState(),y=-1,E=null,M.pop(),M.length>0?(p=M[M.length-1],it===!0&&rt.setGlobalState(x.clippingPlanes,p.state.camera)):p=null,v.pop(),v.length>0?m=v[v.length-1]:m=null};function ia(I,k,$,Y){if(I.visible===!1)return;if(I.layers.test(k.layers)){if(I.isGroup)$=I.renderOrder;else if(I.isLOD)I.autoUpdate===!0&&I.update(k);else if(I.isLight)p.pushLight(I),I.castShadow&&p.pushShadow(I);else if(I.isSprite){if(!I.frustumCulled||J.intersectsSprite(I)){Y&&Dt.setFromMatrixPosition(I.matrixWorld).applyMatrix4(At);const vt=q.update(I),yt=I.material;yt.visible&&m.push(I,vt,yt,$,Dt.z,null)}}else if((I.isMesh||I.isLine||I.isPoints)&&(!I.frustumCulled||J.intersectsObject(I))){const vt=q.update(I),yt=I.material;if(Y&&(I.boundingSphere!==void 0?(I.boundingSphere===null&&I.computeBoundingSphere(),Dt.copy(I.boundingSphere.center)):(vt.boundingSphere===null&&vt.computeBoundingSphere(),Dt.copy(vt.boundingSphere.center)),Dt.applyMatrix4(I.matrixWorld).applyMatrix4(At)),Array.isArray(yt)){const St=vt.groups;for(let Bt=0,kt=St.length;Bt<kt;Bt++){const Et=St[Bt],Jt=yt[Et.materialIndex];Jt&&Jt.visible&&m.push(I,vt,Jt,$,Dt.z,Et)}}else yt.visible&&m.push(I,vt,yt,$,Dt.z,null)}}const lt=I.children;for(let vt=0,yt=lt.length;vt<yt;vt++)ia(lt[vt],k,$,Y)}function Vl(I,k,$,Y){const H=I.opaque,lt=I.transmissive,vt=I.transparent;p.setupLightsView($),it===!0&&rt.setGlobalState(x.clippingPlanes,$),Y&&Pt.viewport(R.copy(Y)),H.length>0&&Rs(H,k,$),lt.length>0&&Rs(lt,k,$),vt.length>0&&Rs(vt,k,$),Pt.buffers.depth.setTest(!0),Pt.buffers.depth.setMask(!0),Pt.buffers.color.setMask(!0),Pt.setPolygonOffset(!1)}function Wl(I,k,$,Y){if(($.isScene===!0?$.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[Y.id]===void 0&&(p.state.transmissionRenderTarget[Y.id]=new Fi(1,1,{generateMipmaps:!0,type:$t.has("EXT_color_buffer_half_float")||$t.has("EXT_color_buffer_float")?Yn:ei,minFilter:En,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Yt.workingColorSpace}));const lt=p.state.transmissionRenderTarget[Y.id],vt=Y.viewport||R;lt.setSize(vt.z,vt.w);const yt=x.getRenderTarget();x.setRenderTarget(lt),x.getClearColor(U),w=x.getClearAlpha(),w<1&&x.setClearColor(16777215,.5),x.clear(),zt&&Mt.render($);const St=x.toneMapping;x.toneMapping=xi;const Bt=Y.viewport;if(Y.viewport!==void 0&&(Y.viewport=void 0),p.setupLightsView(Y),it===!0&&rt.setGlobalState(x.clippingPlanes,Y),Rs(I,$,Y),L.updateMultisampleRenderTarget(lt),L.updateRenderTargetMipmap(lt),$t.has("WEBGL_multisampled_render_to_texture")===!1){let kt=!1;for(let Et=0,Jt=k.length;Et<Jt;Et++){const le=k[Et],de=le.object,je=le.geometry,te=le.material,Tt=le.group;if(te.side===He&&de.layers.test(Y.layers)){const zn=te.side;te.side=We,te.needsUpdate=!0,Xl(de,$,Y,je,te,Tt),te.side=zn,te.needsUpdate=!0,kt=!0}}kt===!0&&(L.updateMultisampleRenderTarget(lt),L.updateRenderTargetMipmap(lt))}x.setRenderTarget(yt),x.setClearColor(U,w),Bt!==void 0&&(Y.viewport=Bt),x.toneMapping=St}function Rs(I,k,$){const Y=k.isScene===!0?k.overrideMaterial:null;for(let H=0,lt=I.length;H<lt;H++){const vt=I[H],yt=vt.object,St=vt.geometry,Bt=Y===null?vt.material:Y,kt=vt.group;yt.layers.test($.layers)&&Xl(yt,k,$,St,Bt,kt)}}function Xl(I,k,$,Y,H,lt){I.onBeforeRender(x,k,$,Y,H,lt),I.modelViewMatrix.multiplyMatrices($.matrixWorldInverse,I.matrixWorld),I.normalMatrix.getNormalMatrix(I.modelViewMatrix),H.onBeforeRender(x,k,$,Y,I,lt),H.transparent===!0&&H.side===He&&H.forceSinglePass===!1?(H.side=We,H.needsUpdate=!0,x.renderBufferDirect($,k,Y,H,I,lt),H.side=ti,H.needsUpdate=!0,x.renderBufferDirect($,k,Y,H,I,lt),H.side=He):x.renderBufferDirect($,k,Y,H,I,lt),I.onAfterRender(x,k,$,Y,H,lt)}function Cs(I,k,$){k.isScene!==!0&&(k=Gt);const Y=Ct.get(I),H=p.state.lights,lt=p.state.shadowsArray,vt=H.state.version,yt=at.getParameters(I,H.state,lt,k,$),St=at.getProgramCacheKey(yt);let Bt=Y.programs;Y.environment=I.isMeshStandardMaterial?k.environment:null,Y.fog=k.fog,Y.envMap=(I.isMeshStandardMaterial?X:C).get(I.envMap||Y.environment),Y.envMapRotation=Y.environment!==null&&I.envMap===null?k.environmentRotation:I.envMapRotation,Bt===void 0&&(I.addEventListener("dispose",Ft),Bt=new Map,Y.programs=Bt);let kt=Bt.get(St);if(kt!==void 0){if(Y.currentProgram===kt&&Y.lightsStateVersion===vt)return jl(I,yt),kt}else yt.uniforms=at.getUniforms(I),I.onBeforeCompile(yt,x),kt=at.acquireProgram(yt,St),Bt.set(St,kt),Y.uniforms=yt.uniforms;const Et=Y.uniforms;return(!I.isShaderMaterial&&!I.isRawShaderMaterial||I.clipping===!0)&&(Et.clippingPlanes=rt.uniform),jl(I,yt),Y.needsLights=hp(I),Y.lightsStateVersion=vt,Y.needsLights&&(Et.ambientLightColor.value=H.state.ambient,Et.lightProbe.value=H.state.probe,Et.directionalLights.value=H.state.directional,Et.directionalLightShadows.value=H.state.directionalShadow,Et.spotLights.value=H.state.spot,Et.spotLightShadows.value=H.state.spotShadow,Et.rectAreaLights.value=H.state.rectArea,Et.ltc_1.value=H.state.rectAreaLTC1,Et.ltc_2.value=H.state.rectAreaLTC2,Et.pointLights.value=H.state.point,Et.pointLightShadows.value=H.state.pointShadow,Et.hemisphereLights.value=H.state.hemi,Et.directionalShadowMap.value=H.state.directionalShadowMap,Et.directionalShadowMatrix.value=H.state.directionalShadowMatrix,Et.spotShadowMap.value=H.state.spotShadowMap,Et.spotLightMatrix.value=H.state.spotLightMatrix,Et.spotLightMap.value=H.state.spotLightMap,Et.pointShadowMap.value=H.state.pointShadowMap,Et.pointShadowMatrix.value=H.state.pointShadowMatrix),Y.currentProgram=kt,Y.uniformsList=null,kt}function ql(I){if(I.uniformsList===null){const k=I.currentProgram.getUniforms();I.uniformsList=Ao.seqWithValue(k.seq,I.uniforms)}return I.uniformsList}function jl(I,k){const $=Ct.get(I);$.outputColorSpace=k.outputColorSpace,$.batching=k.batching,$.batchingColor=k.batchingColor,$.instancing=k.instancing,$.instancingColor=k.instancingColor,$.instancingMorph=k.instancingMorph,$.skinning=k.skinning,$.morphTargets=k.morphTargets,$.morphNormals=k.morphNormals,$.morphColors=k.morphColors,$.morphTargetsCount=k.morphTargetsCount,$.numClippingPlanes=k.numClippingPlanes,$.numIntersection=k.numClipIntersection,$.vertexAlphas=k.vertexAlphas,$.vertexTangents=k.vertexTangents,$.toneMapping=k.toneMapping}function up(I,k,$,Y,H){k.isScene!==!0&&(k=Gt),L.resetTextureUnits();const lt=k.fog,vt=Y.isMeshStandardMaterial?k.environment:null,yt=T===null?x.outputColorSpace:T.isXRRenderTarget===!0?T.texture.colorSpace:ze,St=(Y.isMeshStandardMaterial?X:C).get(Y.envMap||vt),Bt=Y.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,kt=!!$.attributes.tangent&&(!!Y.normalMap||Y.anisotropy>0),Et=!!$.morphAttributes.position,Jt=!!$.morphAttributes.normal,le=!!$.morphAttributes.color;let de=xi;Y.toneMapped&&(T===null||T.isXRRenderTarget===!0)&&(de=x.toneMapping);const je=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,te=je!==void 0?je.length:0,Tt=Ct.get(Y),zn=p.state.lights;if(it===!0&&(_t===!0||I!==E)){const en=I===E&&Y.id===y;rt.setState(Y,I,en)}let ee=!1;Y.version===Tt.__version?(Tt.needsLights&&Tt.lightsStateVersion!==zn.state.version||Tt.outputColorSpace!==yt||H.isBatchedMesh&&Tt.batching===!1||!H.isBatchedMesh&&Tt.batching===!0||H.isBatchedMesh&&Tt.batchingColor===!0&&H.colorTexture===null||H.isBatchedMesh&&Tt.batchingColor===!1&&H.colorTexture!==null||H.isInstancedMesh&&Tt.instancing===!1||!H.isInstancedMesh&&Tt.instancing===!0||H.isSkinnedMesh&&Tt.skinning===!1||!H.isSkinnedMesh&&Tt.skinning===!0||H.isInstancedMesh&&Tt.instancingColor===!0&&H.instanceColor===null||H.isInstancedMesh&&Tt.instancingColor===!1&&H.instanceColor!==null||H.isInstancedMesh&&Tt.instancingMorph===!0&&H.morphTexture===null||H.isInstancedMesh&&Tt.instancingMorph===!1&&H.morphTexture!==null||Tt.envMap!==St||Y.fog===!0&&Tt.fog!==lt||Tt.numClippingPlanes!==void 0&&(Tt.numClippingPlanes!==rt.numPlanes||Tt.numIntersection!==rt.numIntersection)||Tt.vertexAlphas!==Bt||Tt.vertexTangents!==kt||Tt.morphTargets!==Et||Tt.morphNormals!==Jt||Tt.morphColors!==le||Tt.toneMapping!==de||Tt.morphTargetsCount!==te)&&(ee=!0):(ee=!0,Tt.__version=Y.version);let hn=Tt.currentProgram;ee===!0&&(hn=Cs(Y,k,H));let ji=!1,Ze=!1,Nr=!1;const pe=hn.getUniforms(),wn=Tt.uniforms;if(Pt.useProgram(hn.program)&&(ji=!0,Ze=!0,Nr=!0),Y.id!==y&&(y=Y.id,Ze=!0),ji||E!==I){Pt.buffers.depth.getReversed()?(ft.copy(I.projectionMatrix),G0(ft),k0(ft),pe.setValue(V,"projectionMatrix",ft)):pe.setValue(V,"projectionMatrix",I.projectionMatrix),pe.setValue(V,"viewMatrix",I.matrixWorldInverse);const ii=pe.map.cameraPosition;ii!==void 0&&ii.setValue(V,Rt.setFromMatrixPosition(I.matrixWorld)),Xt.logarithmicDepthBuffer&&pe.setValue(V,"logDepthBufFC",2/(Math.log(I.far+1)/Math.LN2)),(Y.isMeshPhongMaterial||Y.isMeshToonMaterial||Y.isMeshLambertMaterial||Y.isMeshBasicMaterial||Y.isMeshStandardMaterial||Y.isShaderMaterial)&&pe.setValue(V,"isOrthographic",I.isOrthographicCamera===!0),E!==I&&(E=I,Ze=!0,Nr=!0)}if(H.isSkinnedMesh){pe.setOptional(V,H,"bindMatrix"),pe.setOptional(V,H,"bindMatrixInverse");const en=H.skeleton;en&&(en.boneTexture===null&&en.computeBoneTexture(),pe.setValue(V,"boneTexture",en.boneTexture,L))}H.isBatchedMesh&&(pe.setOptional(V,H,"batchingTexture"),pe.setValue(V,"batchingTexture",H._matricesTexture,L),pe.setOptional(V,H,"batchingIdTexture"),pe.setValue(V,"batchingIdTexture",H._indirectTexture,L),pe.setOptional(V,H,"batchingColorTexture"),H._colorsTexture!==null&&pe.setValue(V,"batchingColorTexture",H._colorsTexture,L));const Or=$.morphAttributes;if((Or.position!==void 0||Or.normal!==void 0||Or.color!==void 0)&&wt.update(H,$,hn),(Ze||Tt.receiveShadow!==H.receiveShadow)&&(Tt.receiveShadow=H.receiveShadow,pe.setValue(V,"receiveShadow",H.receiveShadow)),Y.isMeshGouraudMaterial&&Y.envMap!==null&&(wn.envMap.value=St,wn.flipEnvMap.value=St.isCubeTexture&&St.isRenderTargetTexture===!1?-1:1),Y.isMeshStandardMaterial&&Y.envMap===null&&k.environment!==null&&(wn.envMapIntensity.value=k.environmentIntensity),Ze&&(pe.setValue(V,"toneMappingExposure",x.toneMappingExposure),Tt.needsLights&&fp(wn,Nr),lt&&Y.fog===!0&&Z.refreshFogUniforms(wn,lt),Z.refreshMaterialUniforms(wn,Y,O,F,p.state.transmissionRenderTarget[I.id]),Ao.upload(V,ql(Tt),wn,L)),Y.isShaderMaterial&&Y.uniformsNeedUpdate===!0&&(Ao.upload(V,ql(Tt),wn,L),Y.uniformsNeedUpdate=!1),Y.isSpriteMaterial&&pe.setValue(V,"center",H.center),pe.setValue(V,"modelViewMatrix",H.modelViewMatrix),pe.setValue(V,"normalMatrix",H.normalMatrix),pe.setValue(V,"modelMatrix",H.matrixWorld),Y.isShaderMaterial||Y.isRawShaderMaterial){const en=Y.uniformsGroups;for(let ii=0,ri=en.length;ii<ri;ii++){const $l=en[ii];B.update($l,hn),B.bind($l,hn)}}return hn}function fp(I,k){I.ambientLightColor.needsUpdate=k,I.lightProbe.needsUpdate=k,I.directionalLights.needsUpdate=k,I.directionalLightShadows.needsUpdate=k,I.pointLights.needsUpdate=k,I.pointLightShadows.needsUpdate=k,I.spotLights.needsUpdate=k,I.spotLightShadows.needsUpdate=k,I.rectAreaLights.needsUpdate=k,I.hemisphereLights.needsUpdate=k}function hp(I){return I.isMeshLambertMaterial||I.isMeshToonMaterial||I.isMeshPhongMaterial||I.isMeshStandardMaterial||I.isShadowMaterial||I.isShaderMaterial&&I.lights===!0}this.getActiveCubeFace=function(){return S},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return T},this.setRenderTargetTextures=function(I,k,$){Ct.get(I.texture).__webglTexture=k,Ct.get(I.depthTexture).__webglTexture=$;const Y=Ct.get(I);Y.__hasExternalTextures=!0,Y.__autoAllocateDepthBuffer=$===void 0,Y.__autoAllocateDepthBuffer||$t.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),Y.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(I,k){const $=Ct.get(I);$.__webglFramebuffer=k,$.__useDefaultFramebuffer=k===void 0},this.setRenderTarget=function(I,k=0,$=0){T=I,S=k,A=$;let Y=!0,H=null,lt=!1,vt=!1;if(I){const St=Ct.get(I);if(St.__useDefaultFramebuffer!==void 0)Pt.bindFramebuffer(V.FRAMEBUFFER,null),Y=!1;else if(St.__webglFramebuffer===void 0)L.setupRenderTarget(I);else if(St.__hasExternalTextures)L.rebindTextures(I,Ct.get(I.texture).__webglTexture,Ct.get(I.depthTexture).__webglTexture);else if(I.depthBuffer){const Et=I.depthTexture;if(St.__boundDepthTexture!==Et){if(Et!==null&&Ct.has(Et)&&(I.width!==Et.image.width||I.height!==Et.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");L.setupDepthRenderbuffer(I)}}const Bt=I.texture;(Bt.isData3DTexture||Bt.isDataArrayTexture||Bt.isCompressedArrayTexture)&&(vt=!0);const kt=Ct.get(I).__webglFramebuffer;I.isWebGLCubeRenderTarget?(Array.isArray(kt[k])?H=kt[k][$]:H=kt[k],lt=!0):I.samples>0&&L.useMultisampledRTT(I)===!1?H=Ct.get(I).__webglMultisampledFramebuffer:Array.isArray(kt)?H=kt[$]:H=kt,R.copy(I.viewport),D.copy(I.scissor),N=I.scissorTest}else R.copy(ut).multiplyScalar(O).floor(),D.copy(dt).multiplyScalar(O).floor(),N=bt;if(Pt.bindFramebuffer(V.FRAMEBUFFER,H)&&Y&&Pt.drawBuffers(I,H),Pt.viewport(R),Pt.scissor(D),Pt.setScissorTest(N),lt){const St=Ct.get(I.texture);V.framebufferTexture2D(V.FRAMEBUFFER,V.COLOR_ATTACHMENT0,V.TEXTURE_CUBE_MAP_POSITIVE_X+k,St.__webglTexture,$)}else if(vt){const St=Ct.get(I.texture),Bt=k||0;V.framebufferTextureLayer(V.FRAMEBUFFER,V.COLOR_ATTACHMENT0,St.__webglTexture,$||0,Bt)}y=-1},this.readRenderTargetPixels=function(I,k,$,Y,H,lt,vt){if(!(I&&I.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let yt=Ct.get(I).__webglFramebuffer;if(I.isWebGLCubeRenderTarget&&vt!==void 0&&(yt=yt[vt]),yt){Pt.bindFramebuffer(V.FRAMEBUFFER,yt);try{const St=I.texture,Bt=St.format,kt=St.type;if(!Xt.textureFormatReadable(Bt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Xt.textureTypeReadable(kt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}k>=0&&k<=I.width-Y&&$>=0&&$<=I.height-H&&V.readPixels(k,$,Y,H,Nt.convert(Bt),Nt.convert(kt),lt)}finally{const St=T!==null?Ct.get(T).__webglFramebuffer:null;Pt.bindFramebuffer(V.FRAMEBUFFER,St)}}},this.readRenderTargetPixelsAsync=async function(I,k,$,Y,H,lt,vt){if(!(I&&I.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let yt=Ct.get(I).__webglFramebuffer;if(I.isWebGLCubeRenderTarget&&vt!==void 0&&(yt=yt[vt]),yt){const St=I.texture,Bt=St.format,kt=St.type;if(!Xt.textureFormatReadable(Bt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Xt.textureTypeReadable(kt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(k>=0&&k<=I.width-Y&&$>=0&&$<=I.height-H){Pt.bindFramebuffer(V.FRAMEBUFFER,yt);const Et=V.createBuffer();V.bindBuffer(V.PIXEL_PACK_BUFFER,Et),V.bufferData(V.PIXEL_PACK_BUFFER,lt.byteLength,V.STREAM_READ),V.readPixels(k,$,Y,H,Nt.convert(Bt),Nt.convert(kt),0);const Jt=T!==null?Ct.get(T).__webglFramebuffer:null;Pt.bindFramebuffer(V.FRAMEBUFFER,Jt);const le=V.fenceSync(V.SYNC_GPU_COMMANDS_COMPLETE,0);return V.flush(),await B0(V,le,4),V.bindBuffer(V.PIXEL_PACK_BUFFER,Et),V.getBufferSubData(V.PIXEL_PACK_BUFFER,0,lt),V.deleteBuffer(Et),V.deleteSync(le),lt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(I,k=null,$=0){I.isTexture!==!0&&(es("WebGLRenderer: copyFramebufferToTexture function signature has changed."),k=arguments[0]||null,I=arguments[1]);const Y=Math.pow(2,-$),H=Math.floor(I.image.width*Y),lt=Math.floor(I.image.height*Y),vt=k!==null?k.x:0,yt=k!==null?k.y:0;L.setTexture2D(I,0),V.copyTexSubImage2D(V.TEXTURE_2D,$,0,0,vt,yt,H,lt),Pt.unbindTexture()},this.copyTextureToTexture=function(I,k,$=null,Y=null,H=0){I.isTexture!==!0&&(es("WebGLRenderer: copyTextureToTexture function signature has changed."),Y=arguments[0]||null,I=arguments[1],k=arguments[2],H=arguments[3]||0,$=null);let lt,vt,yt,St,Bt,kt,Et,Jt,le;const de=I.isCompressedTexture?I.mipmaps[H]:I.image;$!==null?(lt=$.max.x-$.min.x,vt=$.max.y-$.min.y,yt=$.isBox3?$.max.z-$.min.z:1,St=$.min.x,Bt=$.min.y,kt=$.isBox3?$.min.z:0):(lt=de.width,vt=de.height,yt=de.depth||1,St=0,Bt=0,kt=0),Y!==null?(Et=Y.x,Jt=Y.y,le=Y.z):(Et=0,Jt=0,le=0);const je=Nt.convert(k.format),te=Nt.convert(k.type);let Tt;k.isData3DTexture?(L.setTexture3D(k,0),Tt=V.TEXTURE_3D):k.isDataArrayTexture||k.isCompressedArrayTexture?(L.setTexture2DArray(k,0),Tt=V.TEXTURE_2D_ARRAY):(L.setTexture2D(k,0),Tt=V.TEXTURE_2D),V.pixelStorei(V.UNPACK_FLIP_Y_WEBGL,k.flipY),V.pixelStorei(V.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),V.pixelStorei(V.UNPACK_ALIGNMENT,k.unpackAlignment);const zn=V.getParameter(V.UNPACK_ROW_LENGTH),ee=V.getParameter(V.UNPACK_IMAGE_HEIGHT),hn=V.getParameter(V.UNPACK_SKIP_PIXELS),ji=V.getParameter(V.UNPACK_SKIP_ROWS),Ze=V.getParameter(V.UNPACK_SKIP_IMAGES);V.pixelStorei(V.UNPACK_ROW_LENGTH,de.width),V.pixelStorei(V.UNPACK_IMAGE_HEIGHT,de.height),V.pixelStorei(V.UNPACK_SKIP_PIXELS,St),V.pixelStorei(V.UNPACK_SKIP_ROWS,Bt),V.pixelStorei(V.UNPACK_SKIP_IMAGES,kt);const Nr=I.isDataArrayTexture||I.isData3DTexture,pe=k.isDataArrayTexture||k.isData3DTexture;if(I.isRenderTargetTexture||I.isDepthTexture){const wn=Ct.get(I),Or=Ct.get(k),en=Ct.get(wn.__renderTarget),ii=Ct.get(Or.__renderTarget);Pt.bindFramebuffer(V.READ_FRAMEBUFFER,en.__webglFramebuffer),Pt.bindFramebuffer(V.DRAW_FRAMEBUFFER,ii.__webglFramebuffer);for(let ri=0;ri<yt;ri++)Nr&&V.framebufferTextureLayer(V.READ_FRAMEBUFFER,V.COLOR_ATTACHMENT0,Ct.get(I).__webglTexture,H,kt+ri),I.isDepthTexture?(pe&&V.framebufferTextureLayer(V.DRAW_FRAMEBUFFER,V.COLOR_ATTACHMENT0,Ct.get(k).__webglTexture,H,le+ri),V.blitFramebuffer(St,Bt,lt,vt,Et,Jt,lt,vt,V.DEPTH_BUFFER_BIT,V.NEAREST)):pe?V.copyTexSubImage3D(Tt,H,Et,Jt,le+ri,St,Bt,lt,vt):V.copyTexSubImage2D(Tt,H,Et,Jt,le+ri,St,Bt,lt,vt);Pt.bindFramebuffer(V.READ_FRAMEBUFFER,null),Pt.bindFramebuffer(V.DRAW_FRAMEBUFFER,null)}else pe?I.isDataTexture||I.isData3DTexture?V.texSubImage3D(Tt,H,Et,Jt,le,lt,vt,yt,je,te,de.data):k.isCompressedArrayTexture?V.compressedTexSubImage3D(Tt,H,Et,Jt,le,lt,vt,yt,je,de.data):V.texSubImage3D(Tt,H,Et,Jt,le,lt,vt,yt,je,te,de):I.isDataTexture?V.texSubImage2D(V.TEXTURE_2D,H,Et,Jt,lt,vt,je,te,de.data):I.isCompressedTexture?V.compressedTexSubImage2D(V.TEXTURE_2D,H,Et,Jt,de.width,de.height,je,de.data):V.texSubImage2D(V.TEXTURE_2D,H,Et,Jt,lt,vt,je,te,de);V.pixelStorei(V.UNPACK_ROW_LENGTH,zn),V.pixelStorei(V.UNPACK_IMAGE_HEIGHT,ee),V.pixelStorei(V.UNPACK_SKIP_PIXELS,hn),V.pixelStorei(V.UNPACK_SKIP_ROWS,ji),V.pixelStorei(V.UNPACK_SKIP_IMAGES,Ze),H===0&&k.generateMipmaps&&V.generateMipmap(Tt),Pt.unbindTexture()},this.copyTextureToTexture3D=function(I,k,$=null,Y=null,H=0){return I.isTexture!==!0&&(es("WebGLRenderer: copyTextureToTexture3D function signature has changed."),$=arguments[0]||null,Y=arguments[1]||null,I=arguments[2],k=arguments[3],H=arguments[4]||0),es('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(I,k,$,Y,H)},this.initRenderTarget=function(I){Ct.get(I).__webglFramebuffer===void 0&&L.setupRenderTarget(I)},this.initTexture=function(I){I.isCubeTexture?L.setTextureCube(I,0):I.isData3DTexture?L.setTexture3D(I,0):I.isDataArrayTexture||I.isCompressedArrayTexture?L.setTexture2DArray(I,0):L.setTexture2D(I,0),Pt.unbindTexture()},this.resetState=function(){S=0,A=0,T=null,Pt.reset(),Kt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Zn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=Yt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Yt._getUnpackColorSpace()}}class El{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new Lt(t),this.near=e,this.far=n}clone(){return new El(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Md extends me{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Pn,this.environmentIntensity=1,this.environmentRotation=new Pn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class ty{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=qc,this.updateRanges=[],this.version=0,this.uuid=bn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let r=0,s=this.stride;r<s;r++)this.array[t+r]=e.array[n+r];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=bn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=bn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Fe=new z;class bl{constructor(t,e,n,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)Fe.fromBufferAttribute(this,e),Fe.applyMatrix4(t),this.setXYZ(e,Fe.x,Fe.y,Fe.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Fe.fromBufferAttribute(this,e),Fe.applyNormalMatrix(t),this.setXYZ(e,Fe.x,Fe.y,Fe.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Fe.fromBufferAttribute(this,e),Fe.transformDirection(t),this.setXYZ(e,Fe.x,Fe.y,Fe.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=yn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=re(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=re(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=re(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=re(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=re(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=yn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=yn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=yn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=yn(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=re(e,this.array),n=re(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=re(e,this.array),n=re(n,this.array),r=re(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=r,this}setXYZW(t,e,n,r,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=re(e,this.array),n=re(n,this.array),r=re(r,this.array),s=re(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=r,this.data.array[t+3]=s,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const r=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)e.push(this.data.array[r+s])}return new fe(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new bl(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const r=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)e.push(this.data.array[r+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const _f=new z,xf=new Qt,vf=new Qt,ey=new z,Mf=new It,Js=new z,Fa=new Un,yf=new It,Ba=new Zo;class ny extends ne{constructor(t,e){super(t,e),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=vu,this.bindMatrix=new It,this.bindMatrixInverse=new It,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const t=this.geometry;this.boundingBox===null&&(this.boundingBox=new cn),this.boundingBox.makeEmpty();const e=t.getAttribute("position");for(let n=0;n<e.count;n++)this.getVertexPosition(n,Js),this.boundingBox.expandByPoint(Js)}computeBoundingSphere(){const t=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Un),this.boundingSphere.makeEmpty();const e=t.getAttribute("position");for(let n=0;n<e.count;n++)this.getVertexPosition(n,Js),this.boundingSphere.expandByPoint(Js)}copy(t,e){return super.copy(t,e),this.bindMode=t.bindMode,this.bindMatrix.copy(t.bindMatrix),this.bindMatrixInverse.copy(t.bindMatrixInverse),this.skeleton=t.skeleton,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}raycast(t,e){const n=this.material,r=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Fa.copy(this.boundingSphere),Fa.applyMatrix4(r),t.ray.intersectsSphere(Fa)!==!1&&(yf.copy(r).invert(),Ba.copy(t.ray).applyMatrix4(yf),!(this.boundingBox!==null&&Ba.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(t,e,Ba)))}getVertexPosition(t,e){return super.getVertexPosition(t,e),this.applyBoneTransform(t,e),e}bind(t,e){this.skeleton=t,e===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),e=this.matrixWorld),this.bindMatrix.copy(e),this.bindMatrixInverse.copy(e).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const t=new Qt,e=this.geometry.attributes.skinWeight;for(let n=0,r=e.count;n<r;n++){t.fromBufferAttribute(e,n);const s=1/t.manhattanLength();s!==1/0?t.multiplyScalar(s):t.set(1,0,0,0),e.setXYZW(n,t.x,t.y,t.z,t.w)}}updateMatrixWorld(t){super.updateMatrixWorld(t),this.bindMode===vu?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===c0?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(t,e){const n=this.skeleton,r=this.geometry;xf.fromBufferAttribute(r.attributes.skinIndex,t),vf.fromBufferAttribute(r.attributes.skinWeight,t),_f.copy(e).applyMatrix4(this.bindMatrix),e.set(0,0,0);for(let s=0;s<4;s++){const o=vf.getComponent(s);if(o!==0){const a=xf.getComponent(s);Mf.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),e.addScaledVector(ey.copy(_f).applyMatrix4(Mf),o)}}return e.applyMatrix4(this.bindMatrixInverse)}}class yd extends me{constructor(){super(),this.isBone=!0,this.type="Bone"}}class Al extends Ae{constructor(t=null,e=1,n=1,r,s,o,a,c,l=Xe,u=Xe,f,h){super(null,o,a,c,l,u,r,s,f,h),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Sf=new It,iy=new It;class Tl{constructor(t=[],e=[]){this.uuid=bn(),this.bones=t.slice(0),this.boneInverses=e,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const t=this.bones,e=this.boneInverses;if(this.boneMatrices=new Float32Array(t.length*16),e.length===0)this.calculateInverses();else if(t.length!==e.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,r=this.bones.length;n<r;n++)this.boneInverses.push(new It)}}calculateInverses(){this.boneInverses.length=0;for(let t=0,e=this.bones.length;t<e;t++){const n=new It;this.bones[t]&&n.copy(this.bones[t].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let t=0,e=this.bones.length;t<e;t++){const n=this.bones[t];n&&n.matrixWorld.copy(this.boneInverses[t]).invert()}for(let t=0,e=this.bones.length;t<e;t++){const n=this.bones[t];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const t=this.bones,e=this.boneInverses,n=this.boneMatrices,r=this.boneTexture;for(let s=0,o=t.length;s<o;s++){const a=t[s]?t[s].matrixWorld:iy;Sf.multiplyMatrices(a,e[s]),Sf.toArray(n,s*16)}r!==null&&(r.needsUpdate=!0)}clone(){return new Tl(this.bones,this.boneInverses)}computeBoneTexture(){let t=Math.sqrt(this.bones.length*4);t=Math.ceil(t/4)*4,t=Math.max(t,4);const e=new Float32Array(t*t*4);e.set(this.boneMatrices);const n=new Al(e,t,t,on,$e);return n.needsUpdate=!0,this.boneMatrices=e,this.boneTexture=n,this}getBoneByName(t){for(let e=0,n=this.bones.length;e<n;e++){const r=this.bones[e];if(r.name===t)return r}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(t,e){this.uuid=t.uuid;for(let n=0,r=t.bones.length;n<r;n++){const s=t.bones[n];let o=e[s];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",s),o=new yd),this.bones.push(o),this.boneInverses.push(new It().fromArray(t.boneInverses[n]))}return this.init(),this}toJSON(){const t={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};t.uuid=this.uuid;const e=this.bones,n=this.boneInverses;for(let r=0,s=e.length;r<s;r++){const o=e[r];t.bones.push(o.uuid);const a=n[r];t.boneInverses.push(a.toArray())}return t}}class $c extends fe{constructor(t,e,n,r=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const lr=new It,Ef=new It,Qs=[],bf=new cn,ry=new It,kr=new ne,Hr=new Un;class _r extends ne{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new $c(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<n;r++)this.setMatrixAt(r,ry)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new cn),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,lr),bf.copy(t.boundingBox).applyMatrix4(lr),this.boundingBox.union(bf)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Un),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,lr),Hr.copy(t.boundingSphere).applyMatrix4(lr),this.boundingSphere.union(Hr)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,r=this.morphTexture.source.data.data,s=n.length+1,o=t*s+1;for(let a=0;a<n.length;a++)n[a]=r[o+a]}raycast(t,e){const n=this.matrixWorld,r=this.count;if(kr.geometry=this.geometry,kr.material=this.material,kr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Hr.copy(this.boundingSphere),Hr.applyMatrix4(n),t.ray.intersectsSphere(Hr)!==!1))for(let s=0;s<r;s++){this.getMatrixAt(s,lr),Ef.multiplyMatrices(n,lr),kr.matrixWorld=Ef,kr.raycast(t,Qs);for(let o=0,a=Qs.length;o<a;o++){const c=Qs[o];c.instanceId=s,c.object=this,e.push(c)}Qs.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new $c(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const n=e.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new Al(new Float32Array(r*this.count),r,this.count,ml,$e));const s=this.morphTexture.source.data.data;let o=0;for(let l=0;l<n.length;l++)o+=n[l];const a=this.geometry.morphTargetsRelative?1:1-o,c=r*t;s[c]=a,s.set(n,c+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class Sd extends In{static get type(){return"LineBasicMaterial"}constructor(t){super(),this.isLineBasicMaterial=!0,this.color=new Lt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const ko=new z,Ho=new z,Af=new It,Vr=new Zo,to=new Un,Ga=new z,Tf=new z;class wl extends me{constructor(t=new _e,e=new Sd){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let r=1,s=e.count;r<s;r++)ko.fromBufferAttribute(e,r-1),Ho.fromBufferAttribute(e,r),n[r]=n[r-1],n[r]+=ko.distanceTo(Ho);t.setAttribute("lineDistance",new Zt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,r=this.matrixWorld,s=t.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),to.copy(n.boundingSphere),to.applyMatrix4(r),to.radius+=s,t.ray.intersectsSphere(to)===!1)return;Af.copy(r).invert(),Vr.copy(t.ray).applyMatrix4(Af);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,u=n.index,h=n.attributes.position;if(u!==null){const d=Math.max(0,o.start),g=Math.min(u.count,o.start+o.count);for(let _=d,m=g-1;_<m;_+=l){const p=u.getX(_),v=u.getX(_+1),M=eo(this,t,Vr,c,p,v);M&&e.push(M)}if(this.isLineLoop){const _=u.getX(g-1),m=u.getX(d),p=eo(this,t,Vr,c,_,m);p&&e.push(p)}}else{const d=Math.max(0,o.start),g=Math.min(h.count,o.start+o.count);for(let _=d,m=g-1;_<m;_+=l){const p=eo(this,t,Vr,c,_,_+1);p&&e.push(p)}if(this.isLineLoop){const _=eo(this,t,Vr,c,g-1,d);_&&e.push(_)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const r=e[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function eo(i,t,e,n,r,s){const o=i.geometry.attributes.position;if(ko.fromBufferAttribute(o,r),Ho.fromBufferAttribute(o,s),e.distanceSqToSegment(ko,Ho,Ga,Tf)>n)return;Ga.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(Ga);if(!(c<t.near||c>t.far))return{distance:c,point:Tf.clone().applyMatrix4(i.matrixWorld),index:r,face:null,faceIndex:null,barycoord:null,object:i}}const wf=new z,Rf=new z;class sy extends wl{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let r=0,s=e.count;r<s;r+=2)wf.fromBufferAttribute(e,r),Rf.fromBufferAttribute(e,r+1),n[r]=r===0?0:n[r-1],n[r+1]=n[r]+wf.distanceTo(Rf);t.setAttribute("lineDistance",new Zt(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class oy extends wl{constructor(t,e){super(t,e),this.isLineLoop=!0,this.type="LineLoop"}}class Jo extends In{static get type(){return"PointsMaterial"}constructor(t){super(),this.isPointsMaterial=!0,this.color=new Lt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const Cf=new It,Yc=new Zo,no=new Un,io=new z;class Qo extends me{constructor(t=new _e,e=new Jo){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,r=this.matrixWorld,s=t.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),no.copy(n.boundingSphere),no.applyMatrix4(r),no.radius+=s,t.ray.intersectsSphere(no)===!1)return;Cf.copy(r).invert(),Yc.copy(t.ray).applyMatrix4(Cf);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=n.index,f=n.attributes.position;if(l!==null){const h=Math.max(0,o.start),d=Math.min(l.count,o.start+o.count);for(let g=h,_=d;g<_;g++){const m=l.getX(g);io.fromBufferAttribute(f,m),If(io,m,c,r,t,e,this)}}else{const h=Math.max(0,o.start),d=Math.min(f.count,o.start+o.count);for(let g=h,_=d;g<_;g++)io.fromBufferAttribute(f,g),If(io,g,c,r,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const r=e[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function If(i,t,e,n,r,s,o){const a=Yc.distanceSqToPoint(i);if(a<e){const c=new z;Yc.closestPointToPoint(i,c),c.applyMatrix4(n);const l=r.ray.origin.distanceTo(c);if(l<r.near||l>r.far)return;s.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}class ni extends Ae{constructor(t,e,n,r,s,o,a,c,l){super(t,e,n,r,s,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Vo extends _e{constructor(t=1,e=32,n=0,r=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:r},e=Math.max(3,e);const s=[],o=[],a=[],c=[],l=new z,u=new Wt;o.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let f=0,h=3;f<=e;f++,h+=3){const d=n+f/e*r;l.x=t*Math.cos(d),l.y=t*Math.sin(d),o.push(l.x,l.y,l.z),a.push(0,0,1),u.x=(o[h]/t+1)/2,u.y=(o[h+1]/t+1)/2,c.push(u.x,u.y)}for(let f=1;f<=e;f++)s.push(f,f+1,0);this.setIndex(s),this.setAttribute("position",new Zt(o,3)),this.setAttribute("normal",new Zt(a,3)),this.setAttribute("uv",new Zt(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Vo(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class ye extends _e{constructor(t=1,e=1,n=1,r=32,s=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:r,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:c};const l=this;r=Math.floor(r),s=Math.floor(s);const u=[],f=[],h=[],d=[];let g=0;const _=[],m=n/2;let p=0;v(),o===!1&&(t>0&&M(!0),e>0&&M(!1)),this.setIndex(u),this.setAttribute("position",new Zt(f,3)),this.setAttribute("normal",new Zt(h,3)),this.setAttribute("uv",new Zt(d,2));function v(){const x=new z,b=new z;let S=0;const A=(e-t)/n;for(let T=0;T<=s;T++){const y=[],E=T/s,R=E*(e-t)+t;for(let D=0;D<=r;D++){const N=D/r,U=N*c+a,w=Math.sin(U),P=Math.cos(U);b.x=R*w,b.y=-E*n+m,b.z=R*P,f.push(b.x,b.y,b.z),x.set(w,A,P).normalize(),h.push(x.x,x.y,x.z),d.push(N,1-E),y.push(g++)}_.push(y)}for(let T=0;T<r;T++)for(let y=0;y<s;y++){const E=_[y][T],R=_[y+1][T],D=_[y+1][T+1],N=_[y][T+1];(t>0||y!==0)&&(u.push(E,R,N),S+=3),(e>0||y!==s-1)&&(u.push(R,D,N),S+=3)}l.addGroup(p,S,0),p+=S}function M(x){const b=g,S=new Wt,A=new z;let T=0;const y=x===!0?t:e,E=x===!0?1:-1;for(let D=1;D<=r;D++)f.push(0,m*E,0),h.push(0,E,0),d.push(.5,.5),g++;const R=g;for(let D=0;D<=r;D++){const U=D/r*c+a,w=Math.cos(U),P=Math.sin(U);A.x=y*P,A.y=m*E,A.z=y*w,f.push(A.x,A.y,A.z),h.push(0,E,0),S.x=w*.5+.5,S.y=P*.5*E+.5,d.push(S.x,S.y),g++}for(let D=0;D<r;D++){const N=b+D,U=R+D;x===!0?u.push(U,U+1,N):u.push(U+1,U,N),T+=3}l.addGroup(p,T,x===!0?1:2),p+=T}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ye(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class ta extends ye{constructor(t=1,e=1,n=32,r=1,s=!1,o=0,a=Math.PI*2){super(0,t,e,n,r,s,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:r,openEnded:s,thetaStart:o,thetaLength:a}}static fromJSON(t){return new ta(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}const ay={triangulate:function(i,t,e=2){const n=t&&t.length,r=n?t[0]*e:i.length;let s=Ed(i,0,r,e,!0);const o=[];if(!s||s.next===s.prev)return o;let a,c,l,u,f,h,d;if(n&&(s=hy(i,t,s,e)),i.length>80*e){a=l=i[0],c=u=i[1];for(let g=e;g<r;g+=e)f=i[g],h=i[g+1],f<a&&(a=f),h<c&&(c=h),f>l&&(l=f),h>u&&(u=h);d=Math.max(l-a,u-c),d=d!==0?32767/d:0}return vs(s,o,e,a,c,d,0),o}};function Ed(i,t,e,n,r){let s,o;if(r===Ey(i,t,e,n)>0)for(s=t;s<e;s+=n)o=Pf(s,i[s],i[s+1],o);else for(s=e-n;s>=t;s-=n)o=Pf(s,i[s],i[s+1],o);return o&&ea(o,o.next)&&(ys(o),o=o.next),o}function Bi(i,t){if(!i)return i;t||(t=i);let e=i,n;do if(n=!1,!e.steiner&&(ea(e,e.next)||ge(e.prev,e,e.next)===0)){if(ys(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function vs(i,t,e,n,r,s,o){if(!i)return;!o&&s&&_y(i,n,r,s);let a=i,c,l;for(;i.prev!==i.next;){if(c=i.prev,l=i.next,s?ly(i,n,r,s):cy(i)){t.push(c.i/e|0),t.push(i.i/e|0),t.push(l.i/e|0),ys(i),i=l.next,a=l.next;continue}if(i=l,i===a){o?o===1?(i=uy(Bi(i),t,e),vs(i,t,e,n,r,s,2)):o===2&&fy(i,t,e,n,r,s):vs(Bi(i),t,e,n,r,s,1);break}}}function cy(i){const t=i.prev,e=i,n=i.next;if(ge(t,e,n)>=0)return!1;const r=t.x,s=e.x,o=n.x,a=t.y,c=e.y,l=n.y,u=r<s?r<o?r:o:s<o?s:o,f=a<c?a<l?a:l:c<l?c:l,h=r>s?r>o?r:o:s>o?s:o,d=a>c?a>l?a:l:c>l?c:l;let g=n.next;for(;g!==t;){if(g.x>=u&&g.x<=h&&g.y>=f&&g.y<=d&&dr(r,a,s,c,o,l,g.x,g.y)&&ge(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function ly(i,t,e,n){const r=i.prev,s=i,o=i.next;if(ge(r,s,o)>=0)return!1;const a=r.x,c=s.x,l=o.x,u=r.y,f=s.y,h=o.y,d=a<c?a<l?a:l:c<l?c:l,g=u<f?u<h?u:h:f<h?f:h,_=a>c?a>l?a:l:c>l?c:l,m=u>f?u>h?u:h:f>h?f:h,p=Zc(d,g,t,e,n),v=Zc(_,m,t,e,n);let M=i.prevZ,x=i.nextZ;for(;M&&M.z>=p&&x&&x.z<=v;){if(M.x>=d&&M.x<=_&&M.y>=g&&M.y<=m&&M!==r&&M!==o&&dr(a,u,c,f,l,h,M.x,M.y)&&ge(M.prev,M,M.next)>=0||(M=M.prevZ,x.x>=d&&x.x<=_&&x.y>=g&&x.y<=m&&x!==r&&x!==o&&dr(a,u,c,f,l,h,x.x,x.y)&&ge(x.prev,x,x.next)>=0))return!1;x=x.nextZ}for(;M&&M.z>=p;){if(M.x>=d&&M.x<=_&&M.y>=g&&M.y<=m&&M!==r&&M!==o&&dr(a,u,c,f,l,h,M.x,M.y)&&ge(M.prev,M,M.next)>=0)return!1;M=M.prevZ}for(;x&&x.z<=v;){if(x.x>=d&&x.x<=_&&x.y>=g&&x.y<=m&&x!==r&&x!==o&&dr(a,u,c,f,l,h,x.x,x.y)&&ge(x.prev,x,x.next)>=0)return!1;x=x.nextZ}return!0}function uy(i,t,e){let n=i;do{const r=n.prev,s=n.next.next;!ea(r,s)&&bd(r,n,n.next,s)&&Ms(r,s)&&Ms(s,r)&&(t.push(r.i/e|0),t.push(n.i/e|0),t.push(s.i/e|0),ys(n),ys(n.next),n=i=s),n=n.next}while(n!==i);return Bi(n)}function fy(i,t,e,n,r,s){let o=i;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&My(o,a)){let c=Ad(o,a);o=Bi(o,o.next),c=Bi(c,c.next),vs(o,t,e,n,r,s,0),vs(c,t,e,n,r,s,0);return}a=a.next}o=o.next}while(o!==i)}function hy(i,t,e,n){const r=[];let s,o,a,c,l;for(s=0,o=t.length;s<o;s++)a=t[s]*n,c=s<o-1?t[s+1]*n:i.length,l=Ed(i,a,c,n,!1),l===l.next&&(l.steiner=!0),r.push(vy(l));for(r.sort(dy),s=0;s<r.length;s++)e=py(r[s],e);return e}function dy(i,t){return i.x-t.x}function py(i,t){const e=my(i,t);if(!e)return t;const n=Ad(e,i);return Bi(n,n.next),Bi(e,e.next)}function my(i,t){let e=t,n=-1/0,r;const s=i.x,o=i.y;do{if(o<=e.y&&o>=e.next.y&&e.next.y!==e.y){const h=e.x+(o-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(h<=s&&h>n&&(n=h,r=e.x<e.next.x?e:e.next,h===s))return r}e=e.next}while(e!==t);if(!r)return null;const a=r,c=r.x,l=r.y;let u=1/0,f;e=r;do s>=e.x&&e.x>=c&&s!==e.x&&dr(o<l?s:n,o,c,l,o<l?n:s,o,e.x,e.y)&&(f=Math.abs(o-e.y)/(s-e.x),Ms(e,i)&&(f<u||f===u&&(e.x>r.x||e.x===r.x&&gy(r,e)))&&(r=e,u=f)),e=e.next;while(e!==a);return r}function gy(i,t){return ge(i.prev,i,t.prev)<0&&ge(t.next,i,i.next)<0}function _y(i,t,e,n){let r=i;do r.z===0&&(r.z=Zc(r.x,r.y,t,e,n)),r.prevZ=r.prev,r.nextZ=r.next,r=r.next;while(r!==i);r.prevZ.nextZ=null,r.prevZ=null,xy(r)}function xy(i){let t,e,n,r,s,o,a,c,l=1;do{for(e=i,i=null,s=null,o=0;e;){for(o++,n=e,a=0,t=0;t<l&&(a++,n=n.nextZ,!!n);t++);for(c=l;a>0||c>0&&n;)a!==0&&(c===0||!n||e.z<=n.z)?(r=e,e=e.nextZ,a--):(r=n,n=n.nextZ,c--),s?s.nextZ=r:i=r,r.prevZ=s,s=r;e=n}s.nextZ=null,l*=2}while(o>1);return i}function Zc(i,t,e,n,r){return i=(i-e)*r|0,t=(t-n)*r|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,i|t<<1}function vy(i){let t=i,e=i;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==i);return e}function dr(i,t,e,n,r,s,o,a){return(r-o)*(t-a)>=(i-o)*(s-a)&&(i-o)*(n-a)>=(e-o)*(t-a)&&(e-o)*(s-a)>=(r-o)*(n-a)}function My(i,t){return i.next.i!==t.i&&i.prev.i!==t.i&&!yy(i,t)&&(Ms(i,t)&&Ms(t,i)&&Sy(i,t)&&(ge(i.prev,i,t.prev)||ge(i,t.prev,t))||ea(i,t)&&ge(i.prev,i,i.next)>0&&ge(t.prev,t,t.next)>0)}function ge(i,t,e){return(t.y-i.y)*(e.x-t.x)-(t.x-i.x)*(e.y-t.y)}function ea(i,t){return i.x===t.x&&i.y===t.y}function bd(i,t,e,n){const r=so(ge(i,t,e)),s=so(ge(i,t,n)),o=so(ge(e,n,i)),a=so(ge(e,n,t));return!!(r!==s&&o!==a||r===0&&ro(i,e,t)||s===0&&ro(i,n,t)||o===0&&ro(e,i,n)||a===0&&ro(e,t,n))}function ro(i,t,e){return t.x<=Math.max(i.x,e.x)&&t.x>=Math.min(i.x,e.x)&&t.y<=Math.max(i.y,e.y)&&t.y>=Math.min(i.y,e.y)}function so(i){return i>0?1:i<0?-1:0}function yy(i,t){let e=i;do{if(e.i!==i.i&&e.next.i!==i.i&&e.i!==t.i&&e.next.i!==t.i&&bd(e,e.next,i,t))return!0;e=e.next}while(e!==i);return!1}function Ms(i,t){return ge(i.prev,i,i.next)<0?ge(i,t,i.next)>=0&&ge(i,i.prev,t)>=0:ge(i,t,i.prev)<0||ge(i,i.next,t)<0}function Sy(i,t){let e=i,n=!1;const r=(i.x+t.x)/2,s=(i.y+t.y)/2;do e.y>s!=e.next.y>s&&e.next.y!==e.y&&r<(e.next.x-e.x)*(s-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==i);return n}function Ad(i,t){const e=new Kc(i.i,i.x,i.y),n=new Kc(t.i,t.x,t.y),r=i.next,s=t.prev;return i.next=t,t.prev=i,e.next=r,r.prev=e,n.next=e,e.prev=n,s.next=n,n.prev=s,n}function Pf(i,t,e,n){const r=new Kc(i,t,e);return n?(r.next=n.next,r.prev=n,n.next.prev=r,n.next=r):(r.prev=r,r.next=r),r}function ys(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Kc(i,t,e){this.i=i,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function Ey(i,t,e,n){let r=0;for(let s=t,o=e-n;s<e;s+=n)r+=(i[o]-i[s])*(i[s+1]+i[o+1]),o=s;return r}class Rl{static area(t){const e=t.length;let n=0;for(let r=e-1,s=0;s<e;r=s++)n+=t[r].x*t[s].y-t[s].x*t[r].y;return n*.5}static isClockWise(t){return Rl.area(t)<0}static triangulateShape(t,e){const n=[],r=[],s=[];Lf(t),Df(n,t);let o=t.length;e.forEach(Lf);for(let c=0;c<e.length;c++)r.push(o),o+=e[c].length,Df(n,e[c]);const a=ay.triangulate(n,r);for(let c=0;c<a.length;c+=3)s.push(a.slice(c,c+3));return s}}function Lf(i){const t=i.length;t>2&&i[t-1].equals(i[0])&&i.pop()}function Df(i,t){for(let e=0;e<t.length;e++)i.push(t[e].x),i.push(t[e].y)}class Cl extends _e{constructor(t=.5,e=1,n=32,r=1,s=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:r,thetaStart:s,thetaLength:o},n=Math.max(3,n),r=Math.max(1,r);const a=[],c=[],l=[],u=[];let f=t;const h=(e-t)/r,d=new z,g=new Wt;for(let _=0;_<=r;_++){for(let m=0;m<=n;m++){const p=s+m/n*o;d.x=f*Math.cos(p),d.y=f*Math.sin(p),c.push(d.x,d.y,d.z),l.push(0,0,1),g.x=(d.x/e+1)/2,g.y=(d.y/e+1)/2,u.push(g.x,g.y)}f+=h}for(let _=0;_<r;_++){const m=_*(n+1);for(let p=0;p<n;p++){const v=p+m,M=v,x=v+n+1,b=v+n+2,S=v+1;a.push(M,x,S),a.push(x,b,S)}}this.setIndex(a),this.setAttribute("position",new Zt(c,3)),this.setAttribute("normal",new Zt(l,3)),this.setAttribute("uv",new Zt(u,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Cl(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class Hi extends _e{constructor(t=1,e=32,n=16,r=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:r,phiLength:s,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const c=Math.min(o+a,Math.PI);let l=0;const u=[],f=new z,h=new z,d=[],g=[],_=[],m=[];for(let p=0;p<=n;p++){const v=[],M=p/n;let x=0;p===0&&o===0?x=.5/e:p===n&&c===Math.PI&&(x=-.5/e);for(let b=0;b<=e;b++){const S=b/e;f.x=-t*Math.cos(r+S*s)*Math.sin(o+M*a),f.y=t*Math.cos(o+M*a),f.z=t*Math.sin(r+S*s)*Math.sin(o+M*a),g.push(f.x,f.y,f.z),h.copy(f).normalize(),_.push(h.x,h.y,h.z),m.push(S+x,1-M),v.push(l++)}u.push(v)}for(let p=0;p<n;p++)for(let v=0;v<e;v++){const M=u[p][v+1],x=u[p][v],b=u[p+1][v],S=u[p+1][v+1];(p!==0||o>0)&&d.push(M,x,S),(p!==n-1||c<Math.PI)&&d.push(x,b,S)}this.setIndex(d),this.setAttribute("position",new Zt(g,3)),this.setAttribute("normal",new Zt(_,3)),this.setAttribute("uv",new Zt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Hi(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class qt extends In{static get type(){return"MeshStandardMaterial"}constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new Lt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Lt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=nd,this.normalScale=new Wt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Pn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class un extends qt{static get type(){return"MeshPhysicalMaterial"}constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Wt(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Le(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Lt(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Lt(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Lt(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}}function oo(i,t,e){return!i||!e&&i.constructor===t?i:typeof t.BYTES_PER_ELEMENT=="number"?new t(i):Array.prototype.slice.call(i)}function by(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function Ay(i){function t(r,s){return i[r]-i[s]}const e=i.length,n=new Array(e);for(let r=0;r!==e;++r)n[r]=r;return n.sort(t),n}function Uf(i,t,e){const n=i.length,r=new i.constructor(n);for(let s=0,o=0;o!==n;++s){const a=e[s]*t;for(let c=0;c!==t;++c)r[o++]=i[a+c]}return r}function Td(i,t,e,n){let r=1,s=i[0];for(;s!==void 0&&s[n]===void 0;)s=i[r++];if(s===void 0)return;let o=s[n];if(o!==void 0)if(Array.isArray(o))do o=s[n],o!==void 0&&(t.push(s.time),e.push.apply(e,o)),s=i[r++];while(s!==void 0);else if(o.toArray!==void 0)do o=s[n],o!==void 0&&(t.push(s.time),o.toArray(e,e.length)),s=i[r++];while(s!==void 0);else do o=s[n],o!==void 0&&(t.push(s.time),e.push(o)),s=i[r++];while(s!==void 0)}class Ts{constructor(t,e,n,r){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=r!==void 0?r:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){const e=this.parameterPositions;let n=this._cachedIndex,r=e[n],s=e[n-1];n:{t:{let o;e:{i:if(!(t<r)){for(let a=n+2;;){if(r===void 0){if(t<s)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(s=r,r=e[++n],t<r)break t}o=e.length;break e}if(!(t>=s)){const a=e[1];t<a&&(n=2,s=a);for(let c=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(r=s,s=e[--n-1],t>=s)break t}o=n,n=0;break e}break n}for(;n<o;){const a=n+o>>>1;t<e[a]?o=a:n=a+1}if(r=e[n],s=e[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,r)}return this.interpolate_(n,s,t,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){const e=this.resultBuffer,n=this.sampleValues,r=this.valueSize,s=t*r;for(let o=0;o!==r;++o)e[o]=n[s+o];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class Ty extends Ts{constructor(t,e,n,r){super(t,e,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Mu,endingEnd:Mu}}intervalChanged_(t,e,n){const r=this.parameterPositions;let s=t-2,o=t+1,a=r[s],c=r[o];if(a===void 0)switch(this.getSettings_().endingStart){case yu:s=t,a=2*e-n;break;case Su:s=r.length-2,a=e+r[s]-r[s+1];break;default:s=t,a=n}if(c===void 0)switch(this.getSettings_().endingEnd){case yu:o=t,c=2*n-e;break;case Su:o=1,c=n+r[1]-r[0];break;default:o=t-1,c=e}const l=(n-e)*.5,u=this.valueSize;this._weightPrev=l/(e-a),this._weightNext=l/(c-n),this._offsetPrev=s*u,this._offsetNext=o*u}interpolate_(t,e,n,r){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,u=this._offsetPrev,f=this._offsetNext,h=this._weightPrev,d=this._weightNext,g=(n-e)/(r-e),_=g*g,m=_*g,p=-h*m+2*h*_-h*g,v=(1+h)*m+(-1.5-2*h)*_+(-.5+h)*g+1,M=(-1-d)*m+(1.5+d)*_+.5*g,x=d*m-d*_;for(let b=0;b!==a;++b)s[b]=p*o[u+b]+v*o[l+b]+M*o[c+b]+x*o[f+b];return s}}class wy extends Ts{constructor(t,e,n,r){super(t,e,n,r)}interpolate_(t,e,n,r){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,u=(n-e)/(r-e),f=1-u;for(let h=0;h!==a;++h)s[h]=o[l+h]*f+o[c+h]*u;return s}}class Ry extends Ts{constructor(t,e,n,r){super(t,e,n,r)}interpolate_(t){return this.copySampleValue_(t-1)}}class Nn{constructor(t,e,n,r){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=oo(e,this.TimeBufferType),this.values=oo(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(t){const e=t.constructor;let n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:oo(t.times,Array),values:oo(t.values,Array)};const r=t.getInterpolation();r!==t.DefaultInterpolation&&(n.interpolation=r)}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new Ry(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new wy(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Ty(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case gs:e=this.InterpolantFactoryMethodDiscrete;break;case _s:e=this.InterpolantFactoryMethodLinear;break;case ua:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return gs;case this.InterpolantFactoryMethodLinear:return _s;case this.InterpolantFactoryMethodSmooth:return ua}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){const e=this.times;for(let n=0,r=e.length;n!==r;++n)e[n]+=t}return this}scale(t){if(t!==1){const e=this.times;for(let n=0,r=e.length;n!==r;++n)e[n]*=t}return this}trim(t,e){const n=this.times,r=n.length;let s=0,o=r-1;for(;s!==r&&n[s]<t;)++s;for(;o!==-1&&n[o]>e;)--o;if(++o,s!==0||o!==r){s>=o&&(o=Math.max(o,1),s=o-1);const a=this.getValueSize();this.times=n.slice(s,o),this.values=this.values.slice(s*a,o*a)}return this}validate(){let t=!0;const e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);const n=this.times,r=this.values,s=n.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==s;a++){const c=n[a];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,c),t=!1;break}if(o!==null&&o>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,c,o),t=!1;break}o=c}if(r!==void 0&&by(r))for(let a=0,c=r.length;a!==c;++a){const l=r[a];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,l),t=!1;break}}return t}optimize(){const t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===ua,s=t.length-1;let o=1;for(let a=1;a<s;++a){let c=!1;const l=t[a],u=t[a+1];if(l!==u&&(a!==1||l!==t[0]))if(r)c=!0;else{const f=a*n,h=f-n,d=f+n;for(let g=0;g!==n;++g){const _=e[f+g];if(_!==e[h+g]||_!==e[d+g]){c=!0;break}}}if(c){if(a!==o){t[o]=t[a];const f=a*n,h=o*n;for(let d=0;d!==n;++d)e[h+d]=e[f+d]}++o}}if(s>0){t[o]=t[s];for(let a=s*n,c=o*n,l=0;l!==n;++l)e[c+l]=e[a+l];++o}return o!==t.length?(this.times=t.slice(0,o),this.values=e.slice(0,o*n)):(this.times=t,this.values=e),this}clone(){const t=this.times.slice(),e=this.values.slice(),n=this.constructor,r=new n(this.name,t,e);return r.createInterpolant=this.createInterpolant,r}}Nn.prototype.TimeBufferType=Float32Array;Nn.prototype.ValueBufferType=Float32Array;Nn.prototype.DefaultInterpolation=_s;class Lr extends Nn{constructor(t,e,n){super(t,e,n)}}Lr.prototype.ValueTypeName="bool";Lr.prototype.ValueBufferType=Array;Lr.prototype.DefaultInterpolation=gs;Lr.prototype.InterpolantFactoryMethodLinear=void 0;Lr.prototype.InterpolantFactoryMethodSmooth=void 0;class wd extends Nn{}wd.prototype.ValueTypeName="color";class wr extends Nn{}wr.prototype.ValueTypeName="number";class Cy extends Ts{constructor(t,e,n,r){super(t,e,n,r)}interpolate_(t,e,n,r){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(n-e)/(r-e);let l=t*a;for(let u=l+a;l!==u;l+=4)Tn.slerpFlat(s,0,o,l-a,o,l,c);return s}}class Rr extends Nn{InterpolantFactoryMethodLinear(t){return new Cy(this.times,this.values,this.getValueSize(),t)}}Rr.prototype.ValueTypeName="quaternion";Rr.prototype.InterpolantFactoryMethodSmooth=void 0;class Dr extends Nn{constructor(t,e,n){super(t,e,n)}}Dr.prototype.ValueTypeName="string";Dr.prototype.ValueBufferType=Array;Dr.prototype.DefaultInterpolation=gs;Dr.prototype.InterpolantFactoryMethodLinear=void 0;Dr.prototype.InterpolantFactoryMethodSmooth=void 0;class Cr extends Nn{}Cr.prototype.ValueTypeName="vector";class Iy{constructor(t="",e=-1,n=[],r=l0){this.name=t,this.tracks=n,this.duration=e,this.blendMode=r,this.uuid=bn(),this.duration<0&&this.resetDuration()}static parse(t){const e=[],n=t.tracks,r=1/(t.fps||1);for(let o=0,a=n.length;o!==a;++o)e.push(Ly(n[o]).scale(r));const s=new this(t.name,t.duration,e,t.blendMode);return s.uuid=t.uuid,s}static toJSON(t){const e=[],n=t.tracks,r={name:t.name,duration:t.duration,tracks:e,uuid:t.uuid,blendMode:t.blendMode};for(let s=0,o=n.length;s!==o;++s)e.push(Nn.toJSON(n[s]));return r}static CreateFromMorphTargetSequence(t,e,n,r){const s=e.length,o=[];for(let a=0;a<s;a++){let c=[],l=[];c.push((a+s-1)%s,a,(a+1)%s),l.push(0,1,0);const u=Ay(c);c=Uf(c,1,u),l=Uf(l,1,u),!r&&c[0]===0&&(c.push(s),l.push(l[0])),o.push(new wr(".morphTargetInfluences["+e[a].name+"]",c,l).scale(1/n))}return new this(t,-1,o)}static findByName(t,e){let n=t;if(!Array.isArray(t)){const r=t;n=r.geometry&&r.geometry.animations||r.animations}for(let r=0;r<n.length;r++)if(n[r].name===e)return n[r];return null}static CreateClipsFromMorphTargetSequences(t,e,n){const r={},s=/^([\w-]*?)([\d]+)$/;for(let a=0,c=t.length;a<c;a++){const l=t[a],u=l.name.match(s);if(u&&u.length>1){const f=u[1];let h=r[f];h||(r[f]=h=[]),h.push(l)}}const o=[];for(const a in r)o.push(this.CreateFromMorphTargetSequence(a,r[a],e,n));return o}static parseAnimation(t,e){if(!t)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(f,h,d,g,_){if(d.length!==0){const m=[],p=[];Td(d,m,p,g),m.length!==0&&_.push(new f(h,m,p))}},r=[],s=t.name||"default",o=t.fps||30,a=t.blendMode;let c=t.length||-1;const l=t.hierarchy||[];for(let f=0;f<l.length;f++){const h=l[f].keys;if(!(!h||h.length===0))if(h[0].morphTargets){const d={};let g;for(g=0;g<h.length;g++)if(h[g].morphTargets)for(let _=0;_<h[g].morphTargets.length;_++)d[h[g].morphTargets[_]]=-1;for(const _ in d){const m=[],p=[];for(let v=0;v!==h[g].morphTargets.length;++v){const M=h[g];m.push(M.time),p.push(M.morphTarget===_?1:0)}r.push(new wr(".morphTargetInfluence["+_+"]",m,p))}c=d.length*o}else{const d=".bones["+e[f].name+"]";n(Cr,d+".position",h,"pos",r),n(Rr,d+".quaternion",h,"rot",r),n(Cr,d+".scale",h,"scl",r)}}return r.length===0?null:new this(s,c,r,a)}resetDuration(){const t=this.tracks;let e=0;for(let n=0,r=t.length;n!==r;++n){const s=this.tracks[n];e=Math.max(e,s.times[s.times.length-1])}return this.duration=e,this}trim(){for(let t=0;t<this.tracks.length;t++)this.tracks[t].trim(0,this.duration);return this}validate(){let t=!0;for(let e=0;e<this.tracks.length;e++)t=t&&this.tracks[e].validate();return t}optimize(){for(let t=0;t<this.tracks.length;t++)this.tracks[t].optimize();return this}clone(){const t=[];for(let e=0;e<this.tracks.length;e++)t.push(this.tracks[e].clone());return new this.constructor(this.name,this.duration,t,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function Py(i){switch(i.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return wr;case"vector":case"vector2":case"vector3":case"vector4":return Cr;case"color":return wd;case"quaternion":return Rr;case"bool":case"boolean":return Lr;case"string":return Dr}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+i)}function Ly(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const t=Py(i.type);if(i.times===void 0){const e=[],n=[];Td(i.keys,e,n,"value"),i.times=e,i.values=n}return t.parse!==void 0?t.parse(i):new t(i.name,i.times,i.values,i.interpolation)}const gi={enabled:!1,files:{},add:function(i,t){this.enabled!==!1&&(this.files[i]=t)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};class Dy{constructor(t,e,n){const r=this;let s=!1,o=0,a=0,c;const l=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.itemStart=function(u){a++,s===!1&&r.onStart!==void 0&&r.onStart(u,o,a),s=!0},this.itemEnd=function(u){o++,r.onProgress!==void 0&&r.onProgress(u,o,a),o===a&&(s=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(u){r.onError!==void 0&&r.onError(u)},this.resolveURL=function(u){return c?c(u):u},this.setURLModifier=function(u){return c=u,this},this.addHandler=function(u,f){return l.push(u,f),this},this.removeHandler=function(u){const f=l.indexOf(u);return f!==-1&&l.splice(f,2),this},this.getHandler=function(u){for(let f=0,h=l.length;f<h;f+=2){const d=l[f],g=l[f+1];if(d.global&&(d.lastIndex=0),d.test(u))return g}return null}}}const Uy=new Dy;class Vi{constructor(t){this.manager=t!==void 0?t:Uy,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){const n=this;return new Promise(function(r,s){n.load(t,r,e,s)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}}Vi.DEFAULT_MATERIAL_NAME="__DEFAULT";const Vn={};class Ny extends Error{constructor(t,e){super(t),this.response=e}}class Il extends Vi{constructor(t){super(t)}load(t,e,n,r){t===void 0&&(t=""),this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const s=gi.get(t);if(s!==void 0)return this.manager.itemStart(t),setTimeout(()=>{e&&e(s),this.manager.itemEnd(t)},0),s;if(Vn[t]!==void 0){Vn[t].push({onLoad:e,onProgress:n,onError:r});return}Vn[t]=[],Vn[t].push({onLoad:e,onProgress:n,onError:r});const o=new Request(t,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),a=this.mimeType,c=this.responseType;fetch(o).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;const u=Vn[t],f=l.body.getReader(),h=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),d=h?parseInt(h):0,g=d!==0;let _=0;const m=new ReadableStream({start(p){v();function v(){f.read().then(({done:M,value:x})=>{if(M)p.close();else{_+=x.byteLength;const b=new ProgressEvent("progress",{lengthComputable:g,loaded:_,total:d});for(let S=0,A=u.length;S<A;S++){const T=u[S];T.onProgress&&T.onProgress(b)}p.enqueue(x),v()}},M=>{p.error(M)})}}});return new Response(m)}else throw new Ny(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(u=>new DOMParser().parseFromString(u,a));case"json":return l.json();default:if(a===void 0)return l.text();{const f=/charset="?([^;"\s]*)"?/i.exec(a),h=f&&f[1]?f[1].toLowerCase():void 0,d=new TextDecoder(h);return l.arrayBuffer().then(g=>d.decode(g))}}}).then(l=>{gi.add(t,l);const u=Vn[t];delete Vn[t];for(let f=0,h=u.length;f<h;f++){const d=u[f];d.onLoad&&d.onLoad(l)}}).catch(l=>{const u=Vn[t];if(u===void 0)throw this.manager.itemError(t),l;delete Vn[t];for(let f=0,h=u.length;f<h;f++){const d=u[f];d.onError&&d.onError(l)}this.manager.itemError(t)}).finally(()=>{this.manager.itemEnd(t)}),this.manager.itemStart(t)}setResponseType(t){return this.responseType=t,this}setMimeType(t){return this.mimeType=t,this}}class Oy extends Vi{constructor(t){super(t)}load(t,e,n,r){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const s=this,o=gi.get(t);if(o!==void 0)return s.manager.itemStart(t),setTimeout(function(){e&&e(o),s.manager.itemEnd(t)},0),o;const a=xs("img");function c(){u(),gi.add(t,this),e&&e(this),s.manager.itemEnd(t)}function l(f){u(),r&&r(f),s.manager.itemError(t),s.manager.itemEnd(t)}function u(){a.removeEventListener("load",c,!1),a.removeEventListener("error",l,!1)}return a.addEventListener("load",c,!1),a.addEventListener("error",l,!1),t.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),s.manager.itemStart(t),a.src=t,a}}class zy extends Vi{constructor(t){super(t)}load(t,e,n,r){const s=this,o=new Al,a=new Il(this.manager);return a.setResponseType("arraybuffer"),a.setRequestHeader(this.requestHeader),a.setPath(this.path),a.setWithCredentials(s.withCredentials),a.load(t,function(c){let l;try{l=s.parse(c)}catch(u){if(r!==void 0)r(u);else{console.error(u);return}}l.image!==void 0?o.image=l.image:l.data!==void 0&&(o.image.width=l.width,o.image.height=l.height,o.image.data=l.data),o.wrapS=l.wrapS!==void 0?l.wrapS:Cn,o.wrapT=l.wrapT!==void 0?l.wrapT:Cn,o.magFilter=l.magFilter!==void 0?l.magFilter:Pe,o.minFilter=l.minFilter!==void 0?l.minFilter:Pe,o.anisotropy=l.anisotropy!==void 0?l.anisotropy:1,l.colorSpace!==void 0&&(o.colorSpace=l.colorSpace),l.flipY!==void 0&&(o.flipY=l.flipY),l.format!==void 0&&(o.format=l.format),l.type!==void 0&&(o.type=l.type),l.mipmaps!==void 0&&(o.mipmaps=l.mipmaps,o.minFilter=En),l.mipmapCount===1&&(o.minFilter=Pe),l.generateMipmaps!==void 0&&(o.generateMipmaps=l.generateMipmaps),o.needsUpdate=!0,e&&e(o,l)},n,r),o}}class Fy extends Vi{constructor(t){super(t)}load(t,e,n,r){const s=new Ae,o=new Oy(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(t,function(a){s.image=a,s.needsUpdate=!0,e!==void 0&&e(s)},n,r),s}}class na extends me{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Lt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class By extends na{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(me.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Lt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const ka=new It,Nf=new z,Of=new z;class Pl{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Wt(512,512),this.map=null,this.mapPass=null,this.matrix=new It,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ml,this._frameExtents=new Wt(1,1),this._viewportCount=1,this._viewports=[new Qt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;Nf.setFromMatrixPosition(t.matrixWorld),e.position.copy(Nf),Of.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Of),e.updateMatrixWorld(),ka.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ka),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(ka)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class Gy extends Pl{constructor(){super(new ke(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(t){const e=this.camera,n=Ar*2*t.angle*this.focus,r=this.mapSize.width/this.mapSize.height,s=t.distance||e.far;(n!==e.fov||r!==e.aspect||s!==e.far)&&(e.fov=n,e.aspect=r,e.far=s,e.updateProjectionMatrix()),super.updateMatrices(t)}copy(t){return super.copy(t),this.focus=t.focus,this}}class ky extends na{constructor(t,e,n=0,r=Math.PI/3,s=0,o=2){super(t,e),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(me.DEFAULT_UP),this.updateMatrix(),this.target=new me,this.distance=n,this.angle=r,this.penumbra=s,this.decay=o,this.map=null,this.shadow=new Gy}get power(){return this.intensity*Math.PI}set power(t){this.intensity=t/Math.PI}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.angle=t.angle,this.penumbra=t.penumbra,this.decay=t.decay,this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}const zf=new It,Wr=new z,Ha=new z;class Hy extends Pl{constructor(){super(new ke(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Wt(4,2),this._viewportCount=6,this._viewports=[new Qt(2,1,1,1),new Qt(0,1,1,1),new Qt(3,1,1,1),new Qt(1,1,1,1),new Qt(3,0,1,1),new Qt(1,0,1,1)],this._cubeDirections=[new z(1,0,0),new z(-1,0,0),new z(0,0,1),new z(0,0,-1),new z(0,1,0),new z(0,-1,0)],this._cubeUps=[new z(0,1,0),new z(0,1,0),new z(0,1,0),new z(0,1,0),new z(0,0,1),new z(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,r=this.matrix,s=t.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),Wr.setFromMatrixPosition(t.matrixWorld),n.position.copy(Wr),Ha.copy(n.position),Ha.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(Ha),n.updateMatrixWorld(),r.makeTranslation(-Wr.x,-Wr.y,-Wr.z),zf.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(zf)}}class Rd extends na{constructor(t,e,n=0,r=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=r,this.shadow=new Hy}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class Vy extends Pl{constructor(){super(new yl(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Cd extends na{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(me.DEFAULT_UP),this.updateMatrix(),this.target=new me,this.shadow=new Vy}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class cs{static decodeText(t){if(console.warn("THREE.LoaderUtils: decodeText() has been deprecated with r165 and will be removed with r175. Use TextDecoder instead."),typeof TextDecoder<"u")return new TextDecoder().decode(t);let e="";for(let n=0,r=t.length;n<r;n++)e+=String.fromCharCode(t[n]);try{return decodeURIComponent(escape(e))}catch{return e}}static extractUrlBase(t){const e=t.lastIndexOf("/");return e===-1?"./":t.slice(0,e+1)}static resolveURL(t,e){return typeof t!="string"||t===""?"":(/^https?:\/\//i.test(e)&&/^\//.test(t)&&(e=e.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(t)||/^data:.*,.*$/i.test(t)||/^blob:.*$/i.test(t)?t:e+t)}}class Wy extends Vi{constructor(t){super(t),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(t){return this.options=t,this}load(t,e,n,r){t===void 0&&(t=""),this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const s=this,o=gi.get(t);if(o!==void 0){if(s.manager.itemStart(t),o.then){o.then(l=>{e&&e(l),s.manager.itemEnd(t)}).catch(l=>{r&&r(l)});return}return setTimeout(function(){e&&e(o),s.manager.itemEnd(t)},0),o}const a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader;const c=fetch(t,a).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign(s.options,{colorSpaceConversion:"none"}))}).then(function(l){return gi.add(t,l),e&&e(l),s.manager.itemEnd(t),l}).catch(function(l){r&&r(l),gi.remove(t),s.manager.itemError(t),s.manager.itemEnd(t)});gi.add(t,c),s.manager.itemStart(t)}}const Ll="\\[\\]\\.:\\/",Xy=new RegExp("["+Ll+"]","g"),Dl="[^"+Ll+"]",qy="[^"+Ll.replace("\\.","")+"]",jy=/((?:WC+[\/:])*)/.source.replace("WC",Dl),$y=/(WCOD+)?/.source.replace("WCOD",qy),Yy=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Dl),Zy=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Dl),Ky=new RegExp("^"+jy+$y+Yy+Zy+"$"),Jy=["material","materials","bones","map"];class Qy{constructor(t,e,n){const r=n||se.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,r)}getValue(t,e){this.bind();const n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(t,e)}setValue(t,e){const n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,s=n.length;r!==s;++r)n[r].setValue(t,e)}bind(){const t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){const t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}}class se{constructor(t,e,n){this.path=e,this.parsedPath=n||se.parseTrackName(e),this.node=se.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new se.Composite(t,e,n):new se(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(Xy,"")}static parseTrackName(t){const e=Ky.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);const n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},r=n.nodeName&&n.nodeName.lastIndexOf(".");if(r!==void 0&&r!==-1){const s=n.nodeName.substring(r+1);Jy.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){const n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){const n=function(s){for(let o=0;o<s.length;o++){const a=s[o];if(a.name===e||a.uuid===e)return a;const c=n(a.children);if(c)return c}return null},r=n(t.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){const n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)t[e++]=n[r]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){const n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=t[e++]}_setValue_array_setNeedsUpdate(t,e){const n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){const n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node;const e=this.parsedPath,n=e.objectName,r=e.propertyName;let s=e.propertyIndex;if(t||(t=se.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=e.objectIndex;switch(n){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let u=0;u<t.length;u++)if(t[u].name===l){l=u;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(l!==void 0){if(t[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[l]}}const o=t[r];if(o===void 0){const l=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+r+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:t.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(s!==void 0){if(r==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[s]!==void 0&&(s=t.morphTargetDictionary[s])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=s}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=r;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}se.Composite=Qy;se.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};se.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};se.prototype.GetterByBindingType=[se.prototype._getValue_direct,se.prototype._getValue_array,se.prototype._getValue_arrayElement,se.prototype._getValue_toArray];se.prototype.SetterByBindingTypeAndVersioning=[[se.prototype._setValue_direct,se.prototype._setValue_direct_setNeedsUpdate,se.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[se.prototype._setValue_array,se.prototype._setValue_array_setNeedsUpdate,se.prototype._setValue_array_setMatrixWorldNeedsUpdate],[se.prototype._setValue_arrayElement,se.prototype._setValue_arrayElement_setNeedsUpdate,se.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[se.prototype._setValue_fromArray,se.prototype._setValue_fromArray_setNeedsUpdate,se.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ul}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ul);const Id="corsa.grafica",tS=2560*1440*.9,eS=/swiftshader|llvmpipe|basic render|software/i,nS=/intel|uhd|iris|hd graphics|radeon\(tm\) graphics|radeon graphics|vega \d|mali|adreno|powervr/i,ls=Object.freeze({alta:Object.freeze({nome:"Alta",antialias:!1,scalaMinima:.6,scalaMassima:1,texturePiene:!0,distanza:720,densita:1,ombre:!0,luci:4}),media:Object.freeze({nome:"Media",antialias:!1,scalaMinima:.45,scalaMassima:.85,texturePiene:!0,distanza:520,densita:.7,ombre:!1,luci:3}),bassa:Object.freeze({nome:"Bassa",antialias:!1,scalaMinima:.38,scalaMassima:.7,texturePiene:!1,distanza:320,densita:.4,ombre:!1,luci:2})}),ao=Object.freeze(["alta","media","bassa"]);function Pd(){try{const i=localStorage.getItem(Id);return i&&(i==="auto"||ls[i])?i:"auto"}catch{return"auto"}}function iS(i){try{localStorage.setItem(Id,i)}catch{return!1}return!0}function rS(){var i;try{const t=document.createElement("canvas").getContext("webgl"),e=t==null?void 0:t.getExtension("WEBGL_debug_renderer_info"),n=e?t.getParameter(e.UNMASKED_RENDERER_WEBGL):"";return(i=t==null?void 0:t.getExtension("WEBGL_lose_context"))==null||i.loseContext(),String(n??"")}catch{return""}}function sS(){const i=rS(),t=(navigator.hardwareConcurrency??8)<=4,e=(navigator.deviceMemory??8)<=4,n=window.devicePixelRatio||1,r=screen.width*n*screen.height*n>tS;if(eS.test(i))return"bassa";const s=nS.test(i);return s&&(t||e||r)?"bassa":s||t||e||r?"media":"alta"}let Ff=null;function Ld(){const i=Pd();return i!=="auto"?i:(Ff??(Ff=sS()),Ff)}function oS(i){const t=i+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),[((e^e>>>14)>>>0)/4294967296,t]}function Wi(i){let t=i>>>0;return()=>{const[e,n]=oS(t);return t=n,e}}const aS=16;function Jc(i,t){const e=document.createElement("canvas");return e.width=i,e.height=t,e}function Dd(i,{colore:t=!0,ripeti:e=!0}={}){const n=new ni(i);return n.colorSpace=t?ae:Mn,n.anisotropy=aS,e&&(n.wrapS=n.wrapT=an),n}function Ud(i,t){const e=i.width,n=i.height,r=i.getContext("2d").getImageData(0,0,e,n).data,s=new Float32Array(e*n);for(let l=0;l<e*n;l++)s[l]=r[l*4]/255;const o=Jc(e,n),a=o.getContext("2d"),c=a.createImageData(e,n);for(let l=0;l<n;l++){const u=(l-1+n)%n*e,f=(l+1)%n*e;for(let h=0;h<e;h++){const d=(h-1+e)%e,g=(h+1)%e,_=-(s[l*e+g]-s[l*e+d])*t,m=(s[f+h]-s[u+h])*t,p=Math.hypot(_,m,1),v=(l*e+h)*4;c.data[v]=(_/p*.5+.5)*255,c.data[v+1]=(m/p*.5+.5)*255,c.data[v+2]=(1/p*.5+.5)*255,c.data[v+3]=255}}return a.putImageData(c,0,0),Dd(o,{colore:!1})}function Ul(i,t,e,{forza:n=3,seme:r=0}={}){const s=Jc(i,t),o=Jc(i,t);return e(s.getContext("2d"),o.getContext("2d"),i,t,Wi(i*31+t*17+r)),{map:Dd(s),normalMap:Ud(o,n)}}function Nl(i,t,e,n,r,s){for(const o of[-i,0,i])if(!(e+o<-r||e+o>i+r))for(const a of[-t,0,t])n+a<-r||n+a>t+r||s(e+o,n+a)}const Ol=(i,t,e)=>`rgb(${Math.max(0,Math.min(255,Math.round(i)))},${Math.max(0,Math.min(255,Math.round(t)))},${Math.max(0,Math.min(255,Math.round(e)))})`,Qc=i=>Ol(i,i,i);function Ss(i,t,e,n,r,s,o){for(let a=0;a<r;a++){const c=n()*t,l=n()*e,u=o*(.3+n()*.7);Nl(t,e,c,l,u,(f,h)=>{const d=i.createRadialGradient(f,h,0,f,h,u);d.addColorStop(0,s),d.addColorStop(1,"rgba(0,0,0,0)"),i.fillStyle=d,i.fillRect(f-u,h-u,u*2,u*2)})}}function Es(i,t,e,n,r,s,o,a=2){for(let c=0;c<r;c++)i.fillStyle=n()<.5?s:o,i.fillRect(n()*t,n()*e,a*(.5+n()),a*(.5+n()))}const Bf=Object.freeze([[112,92,86],[96,86,84],[124,104,92],[88,80,82],[104,90,96],[118,98,80],[80,74,72]]),cS=()=>Ul(1024,1024,(i,t,e,n,r)=>{i.fillStyle="#211d1b",i.fillRect(0,0,e,n),t.fillStyle="#000",t.fillRect(0,0,e,n);const s=e/4,o=s*.088,a=Math.round(n/(s/2));for(let c=-1;c<=a;c++)for(let l=-1;l<=4;l++){const u=l*s+(c%2+2)%2*s/2,f=c*s/2;for(let h=1;h<=8;h++){const d=h*o*1.06,g=Math.max(3,Math.round(Math.PI*d/(o*1.08)));for(let _=0;_<=g;_++){const m=Math.PI*(_/g),p=u+Math.cos(m)*d*1.08,v=f+Math.sin(m)*d*.62,M=Bf[Math.floor(r()*Bf.length)],x=(r()-.5)*26,b=o*(.84+r()*.12),S=o*(.78+r()*.12),A=m+Math.PI/2+(r()-.5)*.3,T=150+r()*70;Nl(e,n,p,v,o,(y,E)=>{i.save(),i.translate(y,E),i.rotate(A),i.fillStyle=Ol(M[0]+x,M[1]+x,M[2]+x),i.fillRect(-b/2,-S/2,b,S),i.fillStyle="rgba(255,240,230,0.08)",i.fillRect(-b/2,-S/2,b,S*.35),i.fillStyle="rgba(0,0,0,0.14)",i.fillRect(-b/2,S*.2,b,S*.3),i.restore(),t.save(),t.translate(y,E),t.rotate(A),t.fillStyle=Qc(T*.7),t.fillRect(-b/2,-S/2,b,S),t.fillStyle=Qc(T),t.fillRect(-b/2+2,-S/2+2,b-4,S-4),t.restore()})}}}Es(i,e,n,r,26e3,"rgba(255,245,235,0.07)","rgba(0,0,0,0.12)",2),Ss(i,e,n,r,40,"rgba(20,14,10,0.22)",90),Ss(i,e,n,r,18,"rgba(160,150,140,0.08)",120)},{forza:5}),lS=()=>Ul(512,512,(i,t,e,n,r)=>{const o=e/4;i.fillStyle="#5a5650",i.fillRect(0,0,e,n),t.fillStyle="#000",t.fillRect(0,0,e,n);for(let a=0;a<4;a++)for(let c=0;c<4;c++){const l=r()*22-11;i.fillStyle=Ol(160+l,155+l,146+l),i.fillRect(a*o+2,c*o+2,o-4,o-4),t.fillStyle=Qc(200+r()*30),t.fillRect(a*o+3,c*o+3,o-6,o-6)}Es(i,e,n,r,14e3,"rgba(255,255,255,0.12)","rgba(0,0,0,0.12)",2),Es(t,e,n,r,6e3,"rgba(255,255,255,0.05)","rgba(0,0,0,0.05)",2),Ss(i,e,n,r,22,"rgba(30,25,20,0.18)",70)},{forza:3,seme:5}),uS=()=>Ul(512,512,(i,t,e,n,r)=>{i.fillStyle="#efe9df",i.fillRect(0,0,e,n),t.fillStyle="#808080",t.fillRect(0,0,e,n),Ss(i,e,n,r,30,"rgba(255,255,250,0.22)",110),Ss(i,e,n,r,26,"rgba(120,100,80,0.10)",90);for(let s=0;s<26;s++){const o=r()*e,a=r()*n,c=40+r()*160,l=3+r()*10,u=i.createLinearGradient(0,a,0,a+c);u.addColorStop(0,"rgba(70,60,50,0.12)"),u.addColorStop(1,"rgba(70,60,50,0)"),i.fillStyle=u,Nl(e,n,o,a,c,(f,h)=>i.fillRect(f-l/2,h,l,c))}Es(i,e,n,r,3e4,"rgba(255,255,255,0.10)","rgba(60,45,30,0.07)",2),Es(t,e,n,r,3e4,"rgba(255,255,255,0.20)","rgba(0,0,0,0.20)",2),i.strokeStyle="rgba(60,50,40,0.25)",t.strokeStyle="rgba(0,0,0,0.6)";for(let s=0;s<4;s++){let o=r()*e,a=r()*n;i.beginPath(),t.beginPath(),i.moveTo(o,a),t.moveTo(o,a);for(let c=0;c<8;c++)o+=(r()-.5)*18,a+=4+r()*10,i.lineTo(o,a),t.lineTo(o,a);i.lineWidth=1,t.lineWidth=1.5,i.stroke(),t.stroke()}},{forza:1.4,seme:7}),fS=8,co=2.8,Gf=3,Xr=3.5,kf=Object.freeze(["ALIMENTARI","PARRUCCHIERE","CALZATURE","FERRAMENTA","PANETTERIA","MERCERIA","ABBIGLIAMENTO","OTTICA","FIORI","PASTICCERIA","ASSICURAZIONI","LAVANDERIA","MACELLERIA","CARTOLERIA","ESTETICA","GELATERIA"]);function is(i,t){const e=document.createElement("canvas");return e.width=i,e.height=t,e}function To(i,t){const e=new ni(i);return e.colorSpace=t?ae:Mn,e.anisotropy=fS,e.wrapS=e.wrapT=an,e}function Xi(i,t,e,{forza:n=2.5,seme:r=1,luce:s=!1}={}){var f;const o={c:is(i,t),h:is(i,t),d:is(i,t),e:s?is(i,t):null},a={c:o.c.getContext("2d"),h:o.h.getContext("2d"),d:o.d.getContext("2d"),e:((f=o.e)==null?void 0:f.getContext("2d"))??null};a.h.fillStyle="rgb(128,128,128)",a.h.fillRect(0,0,i,t),a.d.fillStyle="rgb(255,235,0)",a.d.fillRect(0,0,i,t),a.e&&(a.e.fillStyle="#000",a.e.fillRect(0,0,i,t));const c=Wi(r*7919+i+t);e({...a,pz:(h,d,g,_,{colore:m=null,altezza:p=null,maschera:v=null,ruvido:M=null}={})=>{m&&(a.c.fillStyle=m,a.c.fillRect(h,d,g,_)),p!==null&&(a.h.fillStyle=`rgb(${p},${p},${p})`,a.h.fillRect(h,d,g,_)),(v!==null||M!==null)&&(a.d.fillStyle=`rgb(${Math.round((v??0)*255)},${Math.round((M??.8)*255)},0)`,a.d.fillRect(h,d,g,_))},caso:c,l:i,a:t});const u={map:To(o.c,!0),normalMap:Ud(o.h,n),roughnessMap:To(o.d,!1)};return o.e&&(u.emissiveMap=To(o.e,!0)),u}function Ln(i,t,e,n,r,s,o=2){for(let a=0;a<r;a++)i.fillStyle=s[Math.floor(n()*s.length)],i.fillRect(n()*t,n()*e,o*(.5+n()),o*(.5+n()))}function ws(i,t,e,n,r,s){for(let o=0;o<r;o++){const a=n()*t,c=n()*e,l=30+n()*140,u=i.createLinearGradient(0,c,0,c+l);u.addColorStop(0,s),u.addColorStop(1,"rgba(0,0,0,0)"),i.fillStyle=u,i.fillRect(a,c,3+n()*9,l)}}function zl(i,t="#ece8e0"){const{c:e,h:n,l:r,a:s,caso:o}=i;e.fillStyle=t,e.fillRect(0,0,r,s),Ln(e,r,s,o,r*s*.03,["rgba(255,255,255,0.10)","rgba(70,55,40,0.07)","rgba(120,110,90,0.06)"],2),Ln(n,r,s,o,r*s*.03,["rgba(255,255,255,0.18)","rgba(0,0,0,0.18)"],2);for(let a=0;a<18;a++){const c=o()*r,l=o()*s,u=30+o()*90,f=e.createRadialGradient(c,l,0,c,l,u);f.addColorStop(0,o()<.5?"rgba(90,75,55,0.08)":"rgba(255,255,250,0.1)"),f.addColorStop(1,"rgba(0,0,0,0)"),e.fillStyle=f,e.fillRect(c-u,l-u,u*2,u*2)}}function xr(i,t,e,n,r,{acceso:s=!1,tende:o=!0,telaio:a="#5a3a22"}={}){const{c,e:l,pz:u,caso:f}=i,h=c.createLinearGradient(t,e,t+n*.6,e+r);if(h.addColorStop(0,"#3c4a5e"),h.addColorStop(.5,"#161c26"),h.addColorStop(1,"#0c1016"),c.fillStyle=h,c.fillRect(t,e,n,r),c.fillStyle="rgba(200,215,235,0.10)",c.beginPath(),c.moveTo(t+n*.15,e+r),c.lineTo(t+n*.55,e),c.lineTo(t+n*.75,e),c.lineTo(t+n*.35,e+r),c.fill(),u(t,e,n,r,{altezza:45,maschera:0,ruvido:.08}),s&&l){const g=l.createLinearGradient(t,e,t,e+r);if(g.addColorStop(0,"#ffcf8c"),g.addColorStop(1,"#c98a46"),l.fillStyle=g,l.fillRect(t,e,n,r),o){l.fillStyle="rgba(60,30,10,0.55)";const _=n*(.18+f()*.2);l.fillRect(t,e,_,r),l.fillRect(t+n-_*(.6+f()*.6),e,_,r)}c.fillStyle="rgba(255,200,130,0.35)",c.fillRect(t,e,n,r)}const d=Math.max(4,n*.06);c.fillStyle=a,c.fillRect(t,e,n,d),c.fillRect(t,e+r-d,n,d),c.fillRect(t,e,d,r),c.fillRect(t+n-d,e,d,r),c.fillRect(t+n/2-d/2,e,d,r),c.fillRect(t,e+r*.38,n,d*.8),u(t,e,n,d,{altezza:90}),u(t+n/2-d/2,e,d,r,{altezza:90}),l&&(l.fillStyle="#000",l.fillRect(t,e,n,d),l.fillRect(t,e+r-d,n,d),l.fillRect(t+n/2-d/2,e,d,r),l.fillRect(t,e+r*.38,n,d*.8))}function gn(i,t,e,n,r,s,o=!0,a=7){const{c,h:l,pz:u}=i;u(t,e,n,r,{colore:s,altezza:150,maschera:0,ruvido:.55});for(let f=0;o?f<r:f<n;f+=a)c.fillStyle="rgba(0,0,0,0.28)",l.fillStyle="rgb(95,95,95)",o?(c.fillRect(t,e+f,n,2),l.fillRect(t,e+f,n,2)):(c.fillRect(t+f,e,2,r),l.fillRect(t+f,e,2,r));c.strokeStyle="rgba(0,0,0,0.45)",c.lineWidth=2,c.strokeRect(t+1,e+1,n-2,r-2)}const Hf=Object.freeze(["#3d5a40","#46623e","#3a5248","#5a4632","#4e5a3a"]);function hS(i=1){return Xi(1024,1024,t=>{const{c:e,h:n,e:r,pz:s,caso:o}=t;zl(t),ws(e,1024,1024,o,40,"rgba(60,50,40,0.10)");const a=Hf[Math.floor(o()*Hf.length)];for(let c=0;c<4;c++){const l=c*256;s(0,l+246,1024,10,{colore:"#f1ede6",altezza:175,maschera:.9,ruvido:.85}),e.fillStyle="rgba(0,0,0,0.14)",e.fillRect(0,l+244,1024,2);for(let u=0;u<4;u++){const f=u*256,h=o(),d=o()<.3;if(h<.16){const x=f+74,b=l+244-196;s(x-12,b-12,132,208,{colore:"#ddd7c9",altezza:180,maschera:.1,ruvido:.7}),xr(t,x,b,108,196,{acceso:d,telaio:"#6a4a2c"}),gn(t,x-54,b,50,196,a,!0),gn(t,x+108+4,b,50,196,a,!0),s(x-22,l+236,152,12,{colore:"#bdb6a6",altezza:215,maschera:0,ruvido:.7}),e.fillStyle="#1d1d1f",n.fillStyle="rgb(230,230,230)";for(let S=0;S<=138;S+=9)e.fillRect(x-15+S,b+196-88,3,82),n.fillRect(x-15+S,b+196-88,3,82);if(e.fillRect(x-16,b+196-92,142,5),n.fillRect(x-16,b+196-92,142,5),r){r.fillStyle="#000";for(let S=0;S<=138;S+=9)r.fillRect(x-15+S,b+196-88,3,82)}continue}const g=100,_=134,m=f+78,p=l+50;if(s(m-12,p-12,g+24,_+12,{colore:"#ddd7c9",altezza:178,maschera:.1,ruvido:.72}),s(m-18,p+_,g+36,12,{colore:"#cfc8b8",altezza:210,maschera:0,ruvido:.7}),e.fillStyle="rgba(60,50,40,0.12)",e.fillRect(m-10,p+_+12,g+20,40),h<.5)o()<.4?(s(m,p,g,_,{colore:"#111",altezza:50,maschera:0,ruvido:.5}),gn(t,m+2,p+2,g/2-3,_-4,a,!0),gn(t,m+g/2+1,p+2,g/2-3,_-4,a,!0)):(xr(t,m,p,g,_,{acceso:d}),gn(t,m-52,p,48,_,a,!0),gn(t,m+g+4,p,48,_,a,!0));else{const v=.2+o()*.75;xr(t,m,p,g,_,{acceso:d,telaio:h<.8?"#e6e2da":"#6b4d30"}),gn(t,m,p,g,_*v,h<.8?"#b9b1a0":"#8a7458",!0,6),r&&(r.fillStyle="#000",r.fillRect(m,p,g,_*v)),s(m-6,p-16,g+12,10,{colore:"#d8d2c4",altezza:170,maschera:.1})}}}s(4,0,9,1024,{colore:"#6f5641",altezza:215,maschera:0,ruvido:.45});for(let c=40;c<1024;c+=256)s(0,c,17,6,{colore:"#4d3c2e",altezza:230})},{forza:2.2,seme:i,luce:!0})}function dS(i,t,e,n,r,s,o,a){i.fillStyle=a,i.fillRect(e,n,r,s),i.fillStyle=o,i.font=`bold ${Math.floor(s*.62)}px Arial, sans-serif`,i.textAlign="center",i.textBaseline="middle",i.save(),i.translate(e+r/2,0),i.scale(-1,1),i.fillText(t,0,n+s/2+1,r*.9),i.restore()}function Vf(i=!1,t=3){return Xi(1024,320,e=>{const{c:n,h:r,e:s,pz:o,caso:a}=e;zl(e,"#e6e1d6"),o(0,256,1024,64,{colore:"#8d887e",altezza:150,maschera:.12,ruvido:.9}),Ln(n,1024,64,a,3e3,["rgba(255,255,255,0.08)","rgba(0,0,0,0.12)"],2),n.fillStyle="rgba(0,0,0,0.25)",n.fillRect(0,254,1024,3),ws(n,1024,256,a,30,"rgba(70,60,45,0.10)");for(let c=0;c<4;c++){const l=c*256,u=a();if(i&&u<.78){const h=a()<.3,d=l+22,g=212;o(d-8,66,g+16,254,{colore:"#4a4844",altezza:160,maschera:0,ruvido:.5}),h?(xr(e,d,100,g,200,{acceso:!0,tende:!1,telaio:"#2b2b2d"}),s&&(s.fillStyle="#fff0d8",s.fillRect(d+8,108,g-16,184))):gn(e,d,100,g,200,"#8f9396",!0,6);const _=kf[Math.floor(a()*kf.length)],m=[["#f4efe2","#7a1f22"],["#1f3b5c","#f2efe6"],["#2d4a2b","#f5f0dd"],["#efe6cf","#2a2a2a"]][Math.floor(a()*4)];dS(n,_,d,68,g,30,m[1],m[0]),o(d,68,g,30,{altezza:190,maschera:0,ruvido:.4}),s&&a()<.6&&(s.fillStyle="rgba(255,240,210,0.65)",s.fillRect(d+4,72,g-8,22));continue}if(u<.3){const h=l+70;o(h-14,46,128,214,{colore:"#d6d0c2",altezza:180,maschera:.1,ruvido:.75}),o(h,60,100,196,{colore:"#5e3d24",altezza:120,maschera:0,ruvido:.6});for(let d=0;d<4;d++)o(h+8+d%2*46,70+Math.floor(d/2)*92,38,80,{colore:"#6d4a2d",altezza:150});o(h+82,150,8,8,{colore:"#c9a650",altezza:220}),s&&a()<.5&&(s.fillStyle="rgba(255,214,150,0.9)",s.beginPath(),s.arc(h+50,36,9,0,Math.PI*2),s.fill());continue}if(u<.5){const h=l+18;o(h-6,50,232,210,{colore:"#ccc6b8",altezza:170,maschera:.1}),gn(e,h,58,220,202,"#a7a9a6",!1,10);continue}const f=l+80;o(f-12,70,120,140,{colore:"#d8d2c4",altezza:178,maschera:.1}),xr(e,f,82,96,120,{acceso:a()<.35}),n.fillStyle="#1b1b1d",r.fillStyle="rgb(225,225,225)";for(let h=6;h<96;h+=14)n.fillRect(f+h,82,3,120),r.fillRect(f+h,82,3,120),s&&(s.fillStyle="#000",s.fillRect(f+h,82,3,120));n.fillRect(f,120,96,3),n.fillRect(f,160,96,3),o(f-16,202,128,10,{colore:"#c4bdac",altezza:210,maschera:0})}},{forza:2.2,seme:t,luce:!0})}function pS(){return Xi(512,512,i=>{const{c:t,h:e,pz:n,caso:r}=i;t.fillStyle="#d4d6d4",t.fillRect(0,0,512,512);for(let s=0;s<512;s+=16){const o=t.createLinearGradient(s,0,s+16,0);o.addColorStop(0,"rgba(0,0,0,0.10)"),o.addColorStop(.5,"rgba(255,255,255,0.12)"),o.addColorStop(1,"rgba(0,0,0,0.10)"),t.fillStyle=o,t.fillRect(s,0,16,512);const a=e.createLinearGradient(s,0,s+16,0);a.addColorStop(0,"#606060"),a.addColorStop(.5,"#c0c0c0"),a.addColorStop(1,"#606060"),e.fillStyle=a,e.fillRect(s,0,16,512)}i.d.fillStyle="rgb(255,120,0)",i.d.fillRect(0,0,512,512),n(0,448,512,64,{colore:"#9c9890",altezza:140,maschera:.15,ruvido:.9}),Ln(t,512,64,r,2500,["rgba(0,0,0,0.1)","rgba(255,255,255,0.08)"],2),t.fillStyle="rgba(0,0,0,0.12)",t.fillRect(0,446,512,2),n(0,70,512,44,{colore:"#9fb1bd",altezza:80,maschera:0,ruvido:.15});for(let s=0;s<512;s+=64)n(s,70,5,44,{colore:"#4b4e52",altezza:140});ws(t,512,512,r,30,"rgba(80,60,40,0.10)")},{forza:1.6,seme:5})}function mS(){return Xi(512,512,i=>{const{c:t,h:e,pz:n,caso:r,e:s}=i;t.fillStyle="#b8b0a0",t.fillRect(0,0,512,512),e.fillStyle="rgb(90,90,90)",e.fillRect(0,0,512,512);const o=13,a=46;for(let l=0,u=0;l<512;l+=o,u++)for(let f=-(u%2)*(a/2);f<512;f+=a){const h=.75+r()*.35;t.fillStyle=`rgb(${Math.round(176*h)},${Math.round(98*h)},${Math.round(70*h)})`,t.fillRect(f+1,l+1,a-2,o-2),e.fillStyle=`rgb(${150+Math.floor(r()*30)},150,150)`,e.fillRect(f+1,l+1,a-2,o-2)}Ln(t,512,512,r,9e3,["rgba(0,0,0,0.12)","rgba(255,230,200,0.08)"],2),i.d.fillStyle="rgb(70,240,0)",i.d.fillRect(0,0,512,512);const c=206;n(c-8,180,116,150,{colore:"#9a5a3c",altezza:170,maschera:.1}),xr(i,c,190,100,130,{acceso:r()<.4,telaio:"#4a3220"}),gn(i,c-46,190,42,130,"#5a4028",!0),gn(i,c+104,190,42,130,"#5a4028",!0),n(c-14,320,128,10,{colore:"#9c8e7c",altezza:210,maschera:0}),s&&(s.globalAlpha=1),ws(t,512,512,r,20,"rgba(40,30,20,0.12)")},{forza:2.4,seme:9,luce:!0})}function gS(){return Xi(512,1024,i=>{const{c:t,pz:e,caso:n}=i;zl(i,"#f0dfb6"),e(0,0,70,1024,{colore:"#f6e8c6",altezza:190,maschera:.85,ruvido:.85}),e(442,0,70,1024,{colore:"#f6e8c6",altezza:190,maschera:.85,ruvido:.85}),e(0,930,512,94,{colore:"#bfa98a",altezza:170,maschera:.4}),e(0,60,512,26,{colore:"#f8ecd0",altezza:200,maschera:.85});const r=196;t.fillStyle="#d8c7a4",t.beginPath(),t.moveTo(r-14,620),t.lineTo(r-14,300),t.arc(r+60,300,74,Math.PI,0),t.lineTo(r+134,620),t.fill(),i.h.fillStyle="rgb(185,185,185)",i.h.fill();const s=t.createLinearGradient(0,230,0,610);s.addColorStop(0,"#2b3858"),s.addColorStop(1,"#151b2c"),t.fillStyle=s,t.beginPath(),t.moveTo(r,610),t.lineTo(r,300),t.arc(r+60,300,60,Math.PI,0),t.lineTo(r+120,610),t.fill(),i.d.fillStyle="rgb(0,30,0)",i.d.fill(),i.h.fillStyle="rgb(60,60,60)",i.h.fill(),t.strokeStyle="#3a2e22",t.lineWidth=3;for(let o=320;o<610;o+=40)t.beginPath(),t.moveTo(r,o),t.lineTo(r+120,o),t.stroke();ws(t,512,1024,n,26,"rgba(90,70,40,0.10)")},{forza:2,seme:13})}function _S(){return Xi(512,512,i=>{const{c:t,h:e,caso:n}=i;t.fillStyle="#6a6a6a",t.fillRect(0,0,512,512);const r=32;for(let s=0;s<512;s+=22){const o=s/22%2?r/2:0;for(let a=-r;a<512+r;a+=r){const c=.78+n()*.36,l=a+o,u=t.createLinearGradient(l,0,l+r,0);u.addColorStop(0,`rgba(${Math.round(120*c)},${Math.round(120*c)},${Math.round(120*c)},1)`),u.addColorStop(.5,`rgba(${Math.round(225*c)},${Math.round(225*c)},${Math.round(225*c)},1)`),u.addColorStop(1,`rgba(${Math.round(110*c)},${Math.round(110*c)},${Math.round(110*c)},1)`),t.fillStyle=u,t.fillRect(l+1,s,r-2,24);const f=e.createLinearGradient(l,0,l+r,0);f.addColorStop(0,"#404040"),f.addColorStop(.5,"#e0e0e0"),f.addColorStop(1,"#404040"),e.fillStyle=f,e.fillRect(l+1,s,r-2,24),t.fillStyle="rgba(0,0,0,0.35)",t.fillRect(l+1,s+21,r-2,3)}}Ln(t,512,512,n,9e3,["rgba(40,60,30,0.10)","rgba(0,0,0,0.12)","rgba(255,255,255,0.06)"],2);for(let s=0;s<25;s++){const o=n()*512,a=n()*512,c=20+n()*60,l=t.createRadialGradient(o,a,0,o,a,c);l.addColorStop(0,n()<.5?"rgba(50,55,35,0.20)":"rgba(20,20,20,0.18)"),l.addColorStop(1,"rgba(0,0,0,0)"),t.fillStyle=l,t.fillRect(o-c,a-c,c*2,c*2)}i.d.fillStyle="rgb(255,200,0)",i.d.fillRect(0,0,512,512)},{forza:3,seme:17})}function xS(){return Xi(256,256,i=>{const{c:t,h:e,caso:n}=i;t.fillStyle="#7d7a74",t.fillRect(0,0,256,256),Ln(t,256,256,n,9e3,["#8d8a83","#6a6761","#9a958c","#5d5a55"],2),Ln(e,256,256,n,9e3,["#a0a0a0","#606060"],2),i.d.fillStyle="rgb(255,240,0)",i.d.fillRect(0,0,256,256)},{forza:2,seme:19})}function Va(i){const t=is(256,256),e=t.getContext("2d"),n=Wi(i==="erba"?3:i==="terra"?5:7);if(e.fillStyle="#808080",e.fillRect(0,0,256,256),i==="erba")for(let r=0;r<9e3;r++){const s=90+Math.floor(n()*90);e.strokeStyle=`rgb(${s},${s},${s})`,e.lineWidth=1;const o=n()*256,a=n()*256;e.beginPath(),e.moveTo(o,a),e.lineTo(o+(n()-.5)*3,a-2-n()*5),e.stroke()}else if(i==="terra"){for(let r=0;r<256;r+=16)e.fillStyle="rgba(0,0,0,0.12)",e.fillRect(0,r,256,5);Ln(e,256,256,n,7e3,["#9a9a9a","#666","#737373","#a8a8a8"],2)}else Ln(e,256,256,n,12e3,["#a8a8a8","#5a5a5a","#8c8c8c","#777"],2.5);return To(t,!1)}const sn=8;function lo(i,t){const e=document.createElement("canvas");return e.width=i,e.height=t,e}function uo(i){return i?i.isTexture?i.image:i:null}function fo(i,t,e,n,r,s){if(t){i.save(),i.beginPath(),i.rect(e-sn,n-sn,r+sn*2,s+sn*2),i.clip();for(const o of[-r,0,r])for(const a of[-s,0,s])i.drawImage(t,e+o,n+a,r,s);i.restore()}}function Wf(i,t){const e={colore:lo(i,i),normale:lo(i,i),dati:lo(i,i),luce:lo(i,i)},n=Object.fromEntries(Object.entries(e).map(([o,a])=>[o,a.getContext("2d")]));n.normale.fillStyle="rgb(128,128,255)",n.normale.fillRect(0,0,i,i),n.dati.fillStyle="rgb(0,230,0)",n.dati.fillRect(0,0,i,i),n.luce.fillStyle="#000",n.luce.fillRect(0,0,i,i);const r={};for(const o of t){const{x:a,y:c,w:l,h:u}=o;if(o.tinta)for(const f of["colore","dati"])n[f].fillStyle=f==="colore"?o.tinta:o.datiFissi??"rgb(0,200,0)",n[f].fillRect(a-sn,c-sn,l+sn*2,u+sn*2);else fo(n.colore,uo(o.map),a,c,l,u),fo(n.normale,uo(o.normalMap),a,c,l,u),o.roughnessMap?fo(n.dati,uo(o.roughnessMap),a,c,l,u):(n.dati.fillStyle=o.datiFissi??"rgb(255,235,0)",n.dati.fillRect(a-sn,c-sn,l+sn*2,u+sn*2)),o.emissiveMap&&fo(n.luce,uo(o.emissiveMap),a,c,l,u);r[o.nome]=[a/i,1-(c+u)/i,l/i,u/i]}const s=(o,a)=>{const c=new ni(o);return c.colorSpace=a?ae:Mn,c.anisotropy=8,c.generateMipmaps=!0,c.minFilter=En,c};return{rettangoli:r,map:s(e.colore,!0),normalMap:s(e.normale,!1),roughnessMap:s(e.dati,!1),emissiveMap:s(e.luce,!0)}}const vS=`
varying vec4 vAtlante;
varying vec2 vUvAtl;
vec4 campiona( sampler2D t ) {
  vec2 uvA = vAtlante.xy + fract( vUvAtl ) * vAtlante.zw;
  return textureGrad( t, uvA, dFdx( vUvAtl ) * vAtlante.zw, dFdy( vUvAtl ) * vAtlante.zw );
}`;function Xf(i,{tinta:t=!0,luce:e=!1,normali:n=!0,...r}={}){const s=new qt({map:i.map,normalMap:n?i.normalMap:null,roughnessMap:i.roughnessMap,emissiveMap:e?i.emissiveMap:null,emissive:e?16763274:0,emissiveIntensity:0,vertexColors:t,roughness:1,metalness:0,...r}),o=Ht;return s.onBeforeCompile=a=>{a.vertexShader=a.vertexShader.replace("#include <common>",`#include <common>
attribute vec4 atlante;
varying vec4 vAtlante;
varying vec2 vUvAtl;`).replace("#include <uv_vertex>",`#include <uv_vertex>
vAtlante = atlante;
vUvAtl = uv;`),a.fragmentShader=a.fragmentShader.replace("#include <common>",`#include <common>${vS}`).replace("#include <map_fragment>",o.map_fragment.replace("texture2D( map, vMapUv )","campiona( map )")).replace("#include <roughnessmap_fragment>",o.roughnessmap_fragment.replace("texture2D( roughnessMap, vRoughnessMapUv )","campiona( roughnessMap )")).replace("#include <normal_fragment_maps>",o.normal_fragment_maps.replace("texture2D( normalMap, vNormalMapUv )","campiona( normalMap )")).replace("#include <emissivemap_fragment>",o.emissivemap_fragment.replace("texture2D( emissiveMap, vEmissiveMapUv )","campiona( emissiveMap )")).replace("#include <color_fragment>",t?`
#ifdef USE_COLOR
  diffuseColor.rgb *= mix( vec3( 1.0 ), vColor.rgb, campiona( roughnessMap ).r );
#endif`:"")},s.customProgramCacheKey=()=>`atlante${t?1:0}${e?1:0}${n?1:0}`,s}const qf=2048;function MS(i,t,e){const n=Va("erba"),r=Va("terra"),s=Va("ghiaia"),o=new qt({map:i,roughness:.95,metalness:0});return o.onBeforeCompile=a=>{a.uniforms.dettErba={value:n},a.uniforms.dettTerra={value:r},a.uniforms.dettGhiaia={value:s},a.uniforms.limiteSuolo={value:t},a.fragmentShader=a.fragmentShader.replace("#include <common>",`#include <common>
uniform sampler2D dettErba;
uniform sampler2D dettTerra;
uniform sampler2D dettGhiaia;
uniform float limiteSuolo;`).replace("#include <map_fragment>",`
  vec4 baseSuolo = texture2D( map, vMapUv );
  vec2 mondo = vec2( vMapUv.x, 1.0 - vMapUv.y ) * ( 2.0 * limiteSuolo ) - limiteSuolo;
  vec3 cs = baseSuolo.rgb;
  float massimo = max( cs.r, max( cs.g, cs.b ) );
  float minimo = min( cs.r, min( cs.g, cs.b ) );
  float verde = cs.g - max( cs.r, cs.b );
  float saturo = ( massimo - minimo ) / max( massimo, 0.001 );
  float wE = smoothstep( 0.002, 0.02, verde );
  float wG = ( 1.0 - wE ) * ( 1.0 - smoothstep( 0.12, 0.3, saturo ) );
  float wT = max( 0.0, 1.0 - wE - wG );
  ${e?`float dett = texture2D( dettErba, mondo * 0.45 ).r * wE + texture2D( dettTerra, mondo * 0.22 ).r * wT + texture2D( dettGhiaia, mondo * 0.6 ).r * wG;
  dett = dett * 2.0 * mix( 1.0, texture2D( dettGhiaia, mondo * 0.031 ).r * 2.0, 0.35 );`:"float dett = 1.0;"}
  float luma = dot( cs, vec3( 0.299, 0.587, 0.114 ) );
  cs = max( vec3( 0.0 ), mix( vec3( luma ), cs, 1.35 ) );
  diffuseColor.rgb *= cs * dett * 1.25;`)},o.customProgramCacheKey=()=>`suolo${e?1:0}`,o}function Nd(i){return new Promise((t,e)=>{const n=new Image;n.onload=()=>t(n),n.onerror=()=>e(new Error(`Immagine mancante: ${i}`)),n.src=i})}async function Wa(i){const[t,e,n]=await Promise.all(["diff","nor","rough"].map(r=>Nd(`./texture/${i}_${r}.jpg`)));return{map:t,normalMap:e,roughnessMap:n}}async function yS({piena:i=!0,limite:t}){const[e,n,r,s]=await Promise.all([Wa("asfalto"),Wa("cemento"),Wa("terra"),Nd("./cerano/suolo.jpg")]),o=new Ae(s);o.colorSpace=ae,o.anisotropy=4,o.needsUpdate=!0;const a=Wf(qf,[{nome:"piani",x:8,y:8,w:1024,h:1024,...hS(1)},{nome:"tegole",x:1048,y:8,w:512,h:512,..._S()},{nome:"intonaco",x:1576,y:8,w:464,h:464,...uS(),datiFissi:"rgb(255,236,0)"},{nome:"industriale",x:1048,y:536,w:512,h:512,...pS()},{nome:"mattoni",x:1576,y:496,w:464,h:464,...mS()},{nome:"terraCasa",x:8,y:1048,w:1024,h:320,...Vf(!1,3)},{nome:"terraNegozi",x:8,y:1384,w:1024,h:320,...Vf(!0,4)},{nome:"chiesa",x:1048,y:1064,w:384,h:768,...gS()},{nome:"tettoPiano",x:1448,y:1064,w:256,h:256,...xS()},{nome:"gronda",x:1720,y:1064,w:48,h:48,tinta:"#4f3d30",datiFissi:"rgb(0,215,0)"},{nome:"metallo",x:1784,y:1064,w:48,h:48,tinta:"#3a3d40",datiFissi:"rgb(0,120,0)"}]),c=Wf(qf,[{nome:"asfalto",x:8,y:8,w:1008,h:1008,...e},{nome:"porfido",x:1032,y:8,w:1008,h:1008,...cS(),datiFissi:"rgb(0,205,0)"},{nome:"sterrato",x:8,y:1032,w:1008,h:1008,...r},{nome:"lastre",x:1032,y:1032,w:496,h:496,...lS(),datiFissi:"rgb(0,215,0)"},{nome:"cemento",x:1544,y:1032,w:496,h:496,...n},{nome:"massicciata",x:1032,y:1544,w:48,h:48,tinta:"#6d655c",datiFissi:"rgb(0,255,0)"}]);return i||(a.normalMap=null,c.normalMap=null),{rettangoliEdifici:a.rettangoli,rettangoliStrade:c.rettangoli,suolo:MS(o,t,i),edifici:Xf(a,{tinta:!0,luce:!0,normali:i}),strade:Xf(c,{tinta:!1,normali:i}),strisce:new qt({color:15000282,roughness:.7,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2}),acqua:new qt({color:1714732,roughness:.04,metalness:.1}),piscina:new qt({color:4171464,roughness:.08,emissive:871782,emissiveIntensity:.6}),binari:new qt({color:8025200,roughness:.35,metalness:.8})}}function SS(i,t){i.edifici.emissiveIntensity=t}const Ge=320,ES=150,wo=.03,bS=.022,Od=.04,Xa=.036,qa=.45,AS=Math.tan(27*Math.PI/180),TS=.16,zd=5,jf=1.6,Fd=3,ho=2.4,ur=.7,wS=4.2,po=new Lt,$f=i=>(po.setHex(i),[po.r,po.g,po.b]);function RS(){const i=new Map,t=(n,r)=>`${n}|${r}`;function e(n,r,s){const o=s.reale??s,a=Math.floor(n/Ge),c=Math.floor(r/Ge),l=t(a,c);let u=i.get(l);u||(u={i:a,j:c,materiali:new Map},i.set(l,u));let f=u.materiali.get(o);return f||(f={p:[],n:[],u:[],c:[],a:[]},u.materiali.set(o,f)),s.rett?{p:f.p,n:f.n,u:f.u,c:f.c,a:f.a,r:s.rett}:f}return{celle:i,buffer:e}}function Ee(i,t,e,n,r,s,o,a,c,l){i.p.push(t,e,n),i.n.push(r,s,o),i.u.push(a,c),i.c.push(l[0],l[1],l[2]),i.r&&i.a.push(i.r[0],i.r[1],i.r[2],i.r[3])}const Gi=[1,1,1];function Dn(i,t,e,n,r,s,o,a=Gi){const c=e[0]-t[0],l=e[1]-t[1],u=e[2]-t[2],f=n[0]-t[0],h=n[1]-t[1],d=n[2]-t[2],g=l*d-u*h,_=u*f-c*d,m=c*h-l*f;if(g*s[0]+_*s[1]+m*s[2]<0){Ee(i,...t,...s,...o[0],a),Ee(i,...n,...s,...o[2],a),Ee(i,...e,...s,...o[1],a),Ee(i,...t,...s,...o[0],a),Ee(i,...r,...s,...o[3],a),Ee(i,...n,...s,...o[2],a);return}Ee(i,...t,...s,...o[0],a),Ee(i,...e,...s,...o[1],a),Ee(i,...n,...s,...o[2],a),Ee(i,...t,...s,...o[0],a),Ee(i,...n,...s,...o[2],a),Ee(i,...r,...s,...o[3],a)}function Yf(i,t,e,n,r,s=Gi){const o=e[0]-t[0],a=e[1]-t[1],c=e[2]-t[2],l=n[0]-t[0],u=n[1]-t[1],f=n[2]-t[2];let h=a*f-c*u,d=c*l-o*f,g=o*u-a*l;const _=Math.hypot(h,d,g)||1;if(h/=_,d/=_,g/=_,d<0){Ee(i,...t,-h,-d,-g,...r[0],s),Ee(i,...n,-h,-d,-g,...r[2],s),Ee(i,...e,-h,-d,-g,...r[1],s);return}Ee(i,...t,h,d,g,...r[0],s),Ee(i,...e,h,d,g,...r[1],s),Ee(i,...n,h,d,g,...r[2],s)}function _n(i,t,e,n,r,s,o,a,c,l,u){const f=Math.hypot(n-t,r-e);if(f<.05||o-s<.02)return;const h=(r-e)/f,d=-(n-t)/f,g=a/c,_=(a+f)/c,m=l(s)+.002,p=l(o)-.002;Dn(i,[t,s,e],[n,s,r],[n,o,r],[t,o,e],[h,0,d],[[g,m],[_,m],[_,p],[g,p]],u)}function Jn(i,t,e,n,r=Gi,s=!1){const o=t.map(([l,u])=>new Wt(l,u)),a=Rl.triangulateShape(o,[]),c=s?-1:1;for(const[l,u,f]of a){const h=[t[l],t[u],t[f]],g=((h[1][1]-h[0][1])*(h[2][0]-h[0][0])-(h[1][0]-h[0][0])*(h[2][1]-h[0][1]))*c>=0?h:[h[0],h[2],h[1]];for(const[_,m]of g)Ee(i,_,e,m,0,c,0,_/n,-m/n,r)}}function CS(i,t){if(As(t)<=.5)return!1;for(let e=0;e<i.length;e++){const n=i[e],r=i[(e+1)%i.length],s=t[e],o=t[(e+1)%t.length];if((r[0]-n[0])*(o[0]-s[0])+(r[1]-n[1])*(o[1]-s[1])<=0)return!1}return!0}function IS(i,t,e,n,r,s,o,a,c){const l=Do(t.p,-qa),{largo:u}=gp(t.p);let f=Math.min(wS,u*.49),h=null;for(;f>.5;){const v=Do(t.p,f);if(CS(t.p,v)){h=v;break}f*=.7}if(!h)return!1;const d=(f+qa)*AS,g=i.buffer(e,n,c.tegole),_=i.buffer(e,n,c.gronda),m=t.p.length;for(let v=0;v<m;v++){const M=(v+1)%m,x=l[v],b=l[M],S=h[v],A=h[M],T=Math.hypot(b[0]-x[0],b[1]-x[1]),y=(b[0]-x[0])/(T||1),E=(b[1]-x[1])/(T||1),R=P=>((P[0]-x[0])*y+(P[1]-x[1])*E)/ho,D=Math.hypot(f+qa,d)/ho;Yf(g,[x[0],r,x[1]],[A[0],r+d,A[1]],[b[0],r,b[1]],[[0,0],[R(A),D],[T/ho,0]],s),Yf(g,[x[0],r,x[1]],[S[0],r+d,S[1]],[A[0],r+d,A[1]],[[0,0],[R(S),D],[R(A),D]],s);const N=t.p[v],U=t.p[M];Dn(_,[N[0],r,N[1]],[x[0],r,x[1]],[b[0],r,b[1]],[U[0],r,U[1]],[0,-1,0],[[0,0],[0,0],[0,0],[0,0]]);const w=Math.hypot(b[0]-x[0],b[1]-x[1])||1;Dn(_,[x[0],r-.16,x[1]],[b[0],r-.16,b[1]],[b[0],r+.02,b[1]],[x[0],r+.02,x[1]],[(b[1]-x[1])/w,0,-(b[0]-x[0])/w],[[0,0],[0,0],[0,0],[0,0]])}As(h)>.3&&Jn(g,h,r+d,ho,s);const p=mi(typeof t.id=="number"?t.id:77);if(["centro","villetta","condominio","cascina"].includes(t.u)){const v=p<.5?1:2,M=i.buffer(e,n,c.intonaco);for(let x=0;x<v;x++){const b=(x+.5)/v,S=h[Math.floor(b*h.length)%h.length],A=S[0]*.7+e*.3,T=S[1]*.7+n*.3,y=r+d+.9,E=.32,R=r+d*.4,D=[[[A-E,T-E],[A+E,T-E]],[[A+E,T-E],[A+E,T+E]],[[A+E,T+E],[A-E,T+E]],[[A-E,T+E],[A-E,T-E]]];for(const[[U,w],[P,F]]of D)_n(M,U,w,P,F,R,y,0,1.4,O=>O/1.4,o);const N=i.buffer(e,n,c.tegole);Jn(N,[[A-E-.08,T-E-.08],[A+E+.08,T-E-.08],[A+E+.08,T+E+.08],[A-E-.08,T+E+.08]],y+.12,1,s);for(const[[U,w],[P,F]]of D)_n(N,U+(U-A)*.25,w+(w-T)*.25,P+(P-A)*.25,F+(F-T)*.25,y,y+.12,0,1,O=>O,s)}}return!0}function PS(i,t,e,n,r,s,o,a,c){const l=i.buffer(e,n,a.tettoPiano);if(Jn(l,t.p,r+(c?.05:0),3,s),!c)return;const u=Do(t.p,.25),f=i.buffer(e,n,a.intonaco);let h=0;for(let d=0;d<t.p.length;d++){const g=t.p[d],_=t.p[(d+1)%t.p.length];_n(f,g[0],g[1],_[0],_[1],r,r+ur,h,3,v=>v/3,o);const m=u[d],p=u[(d+1)%u.length];_n(f,p[0],p[1],m[0],m[1],r,r+ur,h,3,v=>v/3,o),Dn(f,[g[0],r+ur,g[1]],[_[0],r+ur,_[1]],[p[0],r+ur,p[1]],[m[0],r+ur,m[1]],[0,1,0],[[0,0],[1,0],[1,.1],[0,.1]],o),h+=Math.hypot(_[0]-g[0],_[1]-g[1])}}function LS(i,t,e,n){const[r,s]=al(t.p),o=$f(t.cm),a=$f(t.ct),c=mi((typeof t.id=="number"?t.id:99)*7+3),l=t.h;if(t.u==="tettoia"){const _=i.buffer(r,s,e.metallo);for(const[p,v]of t.p)for(const[M,x,b,S]of[[-.08,-.08,.08,-.08],[.08,-.08,.08,.08],[.08,.08,-.08,.08],[-.08,.08,-.08,-.08]])_n(_,p+M,v+x,p+b,v+S,0,l,0,1,A=>A,Gi);const m=i.buffer(r,s,e.tettoPiano);Jn(m,t.p,l,3,a),Jn(m,t.p,l-.12,3,a,!0);return}const u=Math.floor(c*4)*co,f=Math.floor(mi((typeof t.id=="number"?t.id:5)+11)*4)*.25;let h=u;const d=t.p.length;for(let _=0;_<d;_++){const m=t.p[_],p=t.p[(_+1)%d],v=Math.hypot(p[0]-m[0],p[1]-m[1]);if(t.m==="intonaco"){const M=Math.min(l,Xr),x=n(t,m,p),b=i.buffer(r,s,x?e.terraNegozi:e.terraCasa);if(_n(b,m[0],m[1],p[0],p[1],0,M,h,co*4,S=>S/Xr,o),l>Xr+.3){const S=i.buffer(r,s,e.piani);_n(S,m[0],m[1],p[0],p[1],Xr,l,h,co*4,A=>f+(A-Xr)/(Gf*4),o)}}else t.m==="mattoni"?_n(i.buffer(r,s,e.mattoni),m[0],m[1],p[0],p[1],0,l,h,co,M=>M/Gf,o):t.m==="chiesa"?_n(i.buffer(r,s,e.chiesa),m[0],m[1],p[0],p[1],0,l,h,5.6,M=>M/l,o):_n(i.buffer(r,s,e.industriale),m[0],m[1],p[0],p[1],0,l,h,4,M=>M/l,o);h+=v}if(t.t==="falde"&&IS(i,t,r,s,l,a,o,null,e)||PS(i,t,r,s,l,a,o,e,["condominio","centro","pubblico","villetta","municipio"].includes(t.u)),t.u==="capannone"&&c<.7){const _=i.buffer(r,s,e.metallo);for(let m=0;m<d;m++){const p=t.p[m],v=t.p[(m+1)%d],M=Math.hypot(v[0]-p[0],v[1]-p[1]);if(M<9)continue;const x=.5,b=p[0]+(v[0]-p[0])*x,S=p[1]+(v[1]-p[1])*x,A=(v[0]-p[0])/M,T=(v[1]-p[1])/M,y=T*.04,E=-A*.04;_n(_,b-A*2+y,S-T*2+E,b+A*2+y,S+T*2+E,0,4.2,0,.3,R=>R/.3,Gi);break}}}function Wo(i,t,e,n,r,s,o,a,c=Gi){const l=Te(t,e,n,r,s),u=Te(t,e,n,r,-s);for(let f=1;f<l.length;f++)Dn(i,[u[f-1][0],o,u[f-1][1]],[u[f][0],o,u[f][1]],[l[f][0],o,l[f][1]],[l[f-1][0],o,l[f-1][1]],[0,1,0],[[u[f-1][0]/a,-u[f-1][1]/a],[u[f][0]/a,-u[f][1]/a],[l[f][0]/a,-l[f][1]/a],[l[f-1][0]/a,-l[f-1][1]/a]],c)}function DS(i,t,e,n,r,s,o=12){for(let a=0;a<o;a++){const c=a/o*Math.PI*2,l=(a+1)/o*Math.PI*2,u=[t+Math.cos(c)*n,e+Math.sin(c)*n],f=[t+Math.cos(l)*n,e+Math.sin(l)*n],h=[[t,e],f,u];for(const[d,g]of h)Ee(i,d,r,g,0,1,0,d/s,-g/s,Gi)}}function pi(i,t,e,n,r){for(let s=1;s<t.length;s++){const o=e[s-1],a=e[s],c=t[s],l=t[s-1];Dn(i,[o[0],n,o[1]],[a[0],n,a[1]],[c[0],n,c[1]],[l[0],n,l[1]],[0,1,0],[[o[0]/r,-o[1]/r],[a[0]/r,-a[1]/r],[c[0]/r,-c[1]/r],[l[0]/r,-l[1]/r]])}}function Ui(i,t,e,n,r,s=1){for(let o=1;o<t.length;o++){const[a,c]=t[o-1],[l,u]=t[o],f=Math.hypot(l-a,u-c);if(f<1e-4)continue;let h=(u-c)/f,d=-(l-a)/f;r<0&&(h=-h,d=-d);const g=t[o-1][2]/s,_=t[o][2]/s;Dn(i,[a,e,c],[l,e,u],[l,n,u],[a,n,c],[h,0,d],[[g,0],[_,0],[_,(n-e)/s],[g,(n-e)/s]])}}function US(i,t,e,n){if(t.g)return;const[r,s]=t.p[Math.floor(t.p.length/2)],o=t.pe||!t.a&&t.l>=3&&!t.s,a=o?n.porfido:t.s?n.sterrato:n.asfalto,c=o?Od:t.s?bS:wo,l=o?Fd:zd,u=Math.max(1,Math.ceil(e.lungo/60));for(let g=0;g<u;g++){const _=e.lungo*g/u,m=e.lungo*(g+1)/u,p=(_+m)/2;let v=1;for(;v<e.cum.length-1&&e.cum[v]<p;)v++;const M=i.buffer(t.p[v][0],t.p[v][1],a);Wo(M,t.p,e.cum,_,m,t.l/2,c,l)}if(t.a||o)for(const g of[t.p[0],t.p[t.p.length-1]])DS(i.buffer(g[0],g[1],a),g[0],g[1],t.l/2,c-.002,l);if(t.b)for(const g of[1,-1]){const _=Te(t.p,e.cum,0,e.lungo,g*(t.l/2)),m=i.buffer(r,s,n.argine),p=Te(t.p,e.cum,0,e.lungo,g*(t.l/2+.3));Ui(m,_.map(v=>v),wo,1,g,2),Ui(m,p,-.4,1,-g,2),pi(m,p,Te(t.p,e.cum,0,e.lungo,g*(t.l/2)),1,2)}if([0,1].forEach(g=>{const _=g===0?1:-1,m=t.m[g];for(const[p,v]of e.pezzi[g]){const M=Te(t.p,e.cum,p,v,_*(t.l/2)),x=Te(t.p,e.cum,p,v,_*(t.l/2+TS)),b=Te(t.p,e.cum,p,v,_*(t.l/2+m)),S=M[Math.floor(M.length/2)],A=i.buffer(S[0],S[1],n.marciapiede),T=i.buffer(S[0],S[1],n.cordolo);_>0?(pi(A,b,x,Wn,jf),pi(T,x,M,Wn+.004,.6)):(pi(A,x,b,Wn,jf),pi(T,M,x,Wn+.004,.6)),Ui(T,M,wo-.01,Wn+.004,_,.6),Ui(T,b,0,Wn,-_,.6);for(const[y,E,R,D]of[[M[0],b[0],-1,p],[M[M.length-1],b[b.length-1],1,v]]){const N=Uo(t.p,e.cum,D);Dn(T,[y[0],0,y[1]],[E[0],0,E[1]],[E[0],Wn,E[1]],[y[0],Wn,y[1]],[N.ux*R,0,N.uz*R],[[0,0],[1,0],[1,.1],[0,.1]])}}}),!t.a||t.s||t.g)return;const f=i.buffer(r,s,n.strisce);if(t.r>=3||t.r===2&&t.l>=6.5&&!t.o)for(let g=2;g+3<e.lungo;g+=7.5)Wo(i.buffer(...t.p[Math.min(t.p.length-1,Math.floor(g/e.lungo*t.p.length))],n.strisce),t.p,e.cum,g,g+3,.07,Xa,1);if(t.r>=3&&!t.u)for(const g of[1,-1]){const _=Te(t.p,e.cum,0,e.lungo,g*(t.l/2-.3)),m=Te(t.p,e.cum,0,e.lungo,g*(t.l/2-.42));pi(f,g>0?_:m,g>0?m:_,Xa,1)}const d=new Set;for(const g of e.strisce){const _=Math.round(g.s);if(d.has(_)||g.s<1||g.s>e.lungo-1)continue;d.add(_);const m=Math.max(0,g.s-1.25),p=Math.min(e.lungo,g.s+1.25);for(let v=-t.l/2+.5;v<t.l/2-.3;v+=1){const M=Te(t.p,e.cum,m,p,v),x=Te(t.p,e.cum,m,p,v+.5);pi(f,x,M,Xa,1)}}}function NS(i,t,e){if(t.g||t.l<.9)return;const n=[0];for(let a=1;a<t.p.length;a++)n.push(n[a-1]+Math.hypot(t.p[a][0]-t.p[a-1][0],t.p[a][1]-t.p[a-1][1]));const r=n[n.length-1],s=t.l>=3?-.45:-.18,o=Math.max(1,Math.ceil(r/80));for(let a=0;a<o;a++){const c=r*a/o,l=r*(a+1)/o,u=Te(t.p,n,(c+l)/2,(c+l)/2+.1,0)[0];if(Wo(i.buffer(u[0],u[1],e.acqua),t.p,n,c,l,t.l/2,s,4),t.l>=3)for(const f of[1,-1]){const h=Te(t.p,n,c,l,f*(t.l/2));Ui(i.buffer(u[0],u[1],e.argine),h,s-.3,.02,f,2)}}}function OS(i,t,e){const[n,r]=al(t.p);if(t.t==="parcheggio")Jn(i.buffer(n,r,e.asfalto),t.p,wo-.006,zd);else if(t.t==="piazza")Jn(i.buffer(n,r,e.porfido),t.p,Od-.004,Fd);else if(t.t==="piscina"){Jn(i.buffer(n,r,e.piscina),t.p,.08,2);const s=i.buffer(n,r,e.cordolo),o=Do(t.p,-.4);for(let a=0;a<t.p.length;a++){const c=(a+1)%t.p.length;Dn(s,[t.p[a][0],.12,t.p[a][1]],[o[a][0],.12,o[a][1]],[o[c][0],.12,o[c][1]],[t.p[c][0],.12,t.p[c][1]],[0,1,0],[[0,0],[.3,0],[.3,1],[0,1]])}}else t.t==="acqua"&&As(t.p)<2e5&&Jn(i.buffer(n,r,e.acqua),t.p,-.25,4)}function zS(i,t,e){const n=[0];for(let o=1;o<t.p.length;o++)n.push(n[o-1]+Math.hypot(t.p[o][0]-t.p[o-1][0],t.p[o][1]-t.p[o-1][1]));const r=n[n.length-1],s=Math.max(1,Math.ceil(r/80));for(let o=0;o<s;o++){const a=r*o/s,c=r*(o+1)/s,l=Te(t.p,n,(a+c)/2,(a+c)/2+.1,0)[0];Wo(i.buffer(l[0],l[1],e.massicciata),t.p,n,a,c,1.8,.1,2);for(const u of[-.72,.72]){const f=Te(t.p,n,a,c,u+.04),h=Te(t.p,n,a,c,u-.04),d=i.buffer(l[0],l[1],e.binari);pi(d,f,h,.24,1),Ui(d,f,.1,.24,1,1),Ui(d,h,.1,.24,-1,1)}}}function FS(i,t,e,{esclusi:n=new Set}={}){const{dati:r,viabilita:s,grafo:o}=t,a=RS(),c=e.rettangoliEdifici,l=e.rettangoliStrade,u=(m,p)=>({reale:m,rett:p}),f={suolo:e.suolo,strisce:e.strisce,acqua:e.acqua,piscina:e.piscina,binari:e.binari,piani:u(e.edifici,c.piani),terraCasa:u(e.edifici,c.terraCasa),terraNegozi:u(e.edifici,c.terraNegozi),industriale:u(e.edifici,c.industriale),mattoni:u(e.edifici,c.mattoni),chiesa:u(e.edifici,c.chiesa),intonaco:u(e.edifici,c.intonaco),tegole:u(e.edifici,c.tegole),tettoPiano:u(e.edifici,c.tettoPiano),gronda:u(e.edifici,c.gronda),metallo:u(e.edifici,c.metallo),asfalto:u(e.strade,l.asfalto),sterrato:u(e.strade,l.sterrato),porfido:u(e.strade,l.porfido),marciapiede:u(e.strade,l.lastre),cordolo:u(e.strade,l.cemento),argine:u(e.strade,l.cemento),massicciata:u(e.strade,l.massicciata)},h=(m,p,v)=>{if(m.u!=="centro")return!1;const M=Math.hypot(v[0]-p[0],v[1]-p[1]);if(M<4)return!1;const x=(p[0]+v[0])/2+(v[1]-p[1])/M*4,b=(p[1]+v[1])/2-(v[0]-p[0])/M*4,S=o.piuVicino(x,b,30);return!S||S.d>r.strade[S.seg.strada].l/2+2.5?!1:r.strade[S.seg.strada].r>=2&&mi(Math.round(x*7+b*13))<.6};for(const m of r.edifici)n.has(m.id)||LS(a,m,f,h);r.strade.forEach((m,p)=>US(a,m,s[p],f));for(const m of r.acque)NS(a,m,f);for(const m of r.aree)OS(a,m,f);for(const m of r.ferrovie)zS(a,m,f);const d=r.limite,g=[];for(let m=Math.floor(-d/Ge);m<Math.ceil(d/Ge);m++)for(let p=Math.floor(-d/Ge);p<Math.ceil(d/Ge);p++){const v=a.buffer(m*Ge+1,p*Ge+1,f.suolo),M=m*Ge,x=p*Ge,b=M+Ge,S=x+Ge,A=(T,y)=>[(T+d)/(2*d),1-(y+d)/(2*d)];Dn(v,[M,0,S],[b,0,S],[b,0,x],[M,0,x],[0,1,0],[A(M,S),A(b,S),A(b,x),A(M,x)])}for(const m of a.celle.values()){const p=new Oe;p.matrixAutoUpdate=!1;let v=0;for(const[M,x]of m.materiali){if(!x.p.length)continue;const b=new _e;b.setAttribute("position",new Zt(x.p,3)),b.setAttribute("normal",new Zt(x.n,3)),b.setAttribute("uv",new Zt(x.u,2)),M.vertexColors&&b.setAttribute("color",new Zt(x.c,3)),x.a.length&&b.setAttribute("atlante",new Zt(x.a,4)),b.computeBoundingSphere();const S=new ne(b,M);S.matrixAutoUpdate=!1,S.receiveShadow=!0,S.castShadow=!1,S.userData.ombra=M===e.edifici,p.add(S),v+=x.p.length/9}i.add(p),g.push({gruppo:p,x:(m.i+.5)*Ge,z:(m.j+.5)*Ge,triangoli:v})}const _=new ne(new ln(2e4,2e4).rotateX(-Math.PI/2),new qt({color:5069370,roughness:1}));return _.position.y=-.05,i.add(_),{celle:g,aggiorna(m,p){const v=Ge*.72;for(const M of g){const x=Math.hypot(M.x-m.position.x,M.z-m.position.z)-v;M.gruppo.visible=x<p;const b=x<ES;if(M.ombra!==b){M.ombra=b;for(const S of M.gruppo.children)S.castShadow=b&&S.userData.ombra}}}}}function qi(i,t=!1){const e=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),r=new Set(Object.keys(i[0].morphAttributes)),s={},o={},a=i[0].morphTargetsRelative,c=new _e;let l=0;for(let u=0;u<i.length;++u){const f=i[u];let h=0;if(e!==(f.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const d in f.attributes){if(!n.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+'. All geometries must have compatible attributes; make sure "'+d+'" attribute exists among all geometries, or in none of them.'),null;s[d]===void 0&&(s[d]=[]),s[d].push(f.attributes[d]),h++}if(h!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". Make sure all geometries have the same number of attributes."),null;if(a!==f.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const d in f.morphAttributes){if(!r.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+".  .morphAttributes must be consistent throughout all geometries."),null;o[d]===void 0&&(o[d]=[]),o[d].push(f.morphAttributes[d])}if(t){let d;if(e)d=f.index.count;else if(f.attributes.position!==void 0)d=f.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,d,u),l+=d}}if(e){let u=0;const f=[];for(let h=0;h<i.length;++h){const d=i[h].index;for(let g=0;g<d.count;++g)f.push(d.getX(g)+u);u+=i[h].attributes.position.count}c.setIndex(f)}for(const u in s){const f=Zf(s[u]);if(!f)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" attribute."),null;c.setAttribute(u,f)}for(const u in o){const f=o[u][0].length;if(f===0)break;c.morphAttributes=c.morphAttributes||{},c.morphAttributes[u]=[];for(let h=0;h<f;++h){const d=[];for(let _=0;_<o[u].length;++_)d.push(o[u][_][h]);const g=Zf(d);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" morphAttribute."),null;c.morphAttributes[u].push(g)}}return c}function Zf(i){let t,e,n,r=-1,s=0;for(let l=0;l<i.length;++l){const u=i[l];if(t===void 0&&(t=u.array.constructor),t!==u.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=u.itemSize),e!==u.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=u.normalized),n!==u.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(r===-1&&(r=u.gpuType),r!==u.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;s+=u.count*e}const o=new t(s),a=new fe(o,e,n);let c=0;for(let l=0;l<i.length;++l){const u=i[l];if(u.isInterleavedBufferAttribute){const f=c/e;for(let h=0,d=u.count;h<d;h++)for(let g=0;g<e;g++){const _=u.getComponent(h,g);a.setComponent(h+f,g,_)}}else o.set(u.array,c);c+=u.count*e}return r!==void 0&&(a.gpuType=r),a}function Kf(i,t){if(t===u0)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),i;if(t===Xc||t===ed){let e=i.getIndex();if(e===null){const o=[],a=i.getAttribute("position");if(a!==void 0){for(let c=0;c<a.count;c++)o.push(c);i.setIndex(o),e=i.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),i}const n=e.count-2,r=[];if(t===Xc)for(let o=1;o<=n;o++)r.push(e.getX(0)),r.push(e.getX(o)),r.push(e.getX(o+1));else for(let o=0;o<n;o++)o%2===0?(r.push(e.getX(o)),r.push(e.getX(o+1)),r.push(e.getX(o+2))):(r.push(e.getX(o+2)),r.push(e.getX(o+1)),r.push(e.getX(o)));r.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const s=i.clone();return s.setIndex(r),s.clearGroups(),s}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",t),i}const Ti=320,BS=55,Jf=190,GS=1/70,kS=14e3;function HS(i){const t=document.createElement("canvas");t.width=t.height=256;const e=t.getContext("2d"),n=Wi(i);for(let s=0;s<1400;s++){const o=n()*Math.PI*2,a=Math.pow(n(),.6)*104,c=128+Math.cos(o)*a,l=128+Math.sin(o)*a,u=.55+n()*.55,f=1-a/128*.25;e.fillStyle=`rgb(${Math.round(70*u*f)},${Math.round(104*u*f)},${Math.round(46*u*f)})`,e.save(),e.translate(c,l),e.rotate(n()*Math.PI),e.beginPath(),e.ellipse(0,0,3+n()*4,1.5+n()*2,0,0,Math.PI*2),e.fill(),e.restore()}e.strokeStyle="rgba(60,44,30,0.9)",e.lineWidth=2;for(let s=0;s<9;s++){e.beginPath(),e.moveTo(128,128);const o=n()*Math.PI*2;e.lineTo(128+Math.cos(o)*70,128+Math.sin(o)*70),e.stroke()}e.fillStyle="#5a4636",e.fillRect(0,240,16,16);const r=new ni(t);return r.colorSpace=ae,r}function VS(i,t,e,n){const r=Wi(n),s=[];for(let o=0;o<i;o++){const a=new ln(t*1.25,t*1.25),c=r()*2-1,l=r()*Math.PI*2,u=Math.sqrt(1-c*c),f=.25+r()*.55,h=new z(Math.cos(l)*u*t*f,e+c*t*.65*f,Math.sin(l)*u*t*f),d=a.attributes.uv;for(let m=0;m<d.count;m++)d.setXY(m,.08+d.getX(m)*.92,.08+d.getY(m)*.92);a.rotateX(r()*Math.PI),a.rotateY(r()*Math.PI),a.rotateZ(r()*Math.PI),a.translate(h.x,h.y,h.z);const g=a.attributes.position,_=a.attributes.normal;for(let m=0;m<g.count;m++){const p=new z(g.getX(m),g.getY(m)-e,g.getZ(m)).normalize();_.setXYZ(m,p.x,p.y*.8+.2,p.z)}s.push(a)}return qi(s,!1)}function WS(i,t){const e=new ye(t*.6,t,i,6,1,!0);e.translate(0,i/2,0);const n=e.attributes.uv;for(let r=0;r<n.count;r++)n.setXY(r,.04,.04);return e}function Qf(i,t,e,n,r,s){return qi([VS(i,t,e,s),WS(n,r)],!1)}function XS(i,t,{densita:e=1,esclusoDa:n=()=>!1}={}){const r=Wi(11),s=t.alberi.map(([m,p,v])=>[m,p,v]);let o=0;for(const m of t.aree){if(m.t!=="bosco"&&m.t!=="parco")continue;const p=rc(m.p),v=As(m.p),M=Math.min(4e3,Math.floor(v*GS*(m.t==="parco"?.25:1)));for(let x=0;x<M*3&&o<kS;x++){const b=p.x0+r()*(p.x1-p.x0),S=p.z0+r()*(p.z1-p.z0);if(!(Math.abs(b)>t.limite||Math.abs(S)>t.limite||!Nh(b,S,m.p)||n(b,S))&&(s.push([b,S,.8+r()*.7]),o+=1,x>M))break}}const a=new qt({map:HS(5),alphaTest:.45,side:He,roughness:.9}),c=Qf(20,2.8,5.8,4.6,.24,1),l=Qf(7,3,5.8,4.6,.24,2),u=new Map,f=new It,h=new Tn,d=new z(0,1,0),g=new Lt;for(const[m,p,v]of s){if(n(m,p)||e<1&&r()>e)continue;const M=`${Math.floor(m/Ti)}|${Math.floor(p/Ti)}`;u.has(M)||u.set(M,{x:(Math.floor(m/Ti)+.5)*Ti,z:(Math.floor(p/Ti)+.5)*Ti,voci:[]});const x=v*(.75+r()*.45);f.compose(new z(m,0,p),h.setFromAxisAngle(d,r()*Math.PI*2),new z(x,x*(.9+r()*.25),x));const b=.75+r()*.45;g.setRGB(b*(.85+r()*.2),b,b*(.8+r()*.25)),u.get(M).voci.push({matrice:f.clone(),colore:g.clone()})}const _=[];for(const m of u.values()){const p=v=>{const M=new _r(v,a,m.voci.length);return m.voci.forEach((x,b)=>{M.setMatrixAt(b,x.matrice),M.setColorAt(b,x.colore)}),M.computeBoundingSphere(),i.add(M),M};_.push({x:m.x,z:m.z,vicino:p(c),lontano:p(l)})}return{quanti:s.length,aggiorna(m,p){const v=Ti*.72;for(const M of _){const x=Math.hypot(M.x-m.position.x,M.z-m.position.z)-v;M.vicino.visible=x<Jf,M.vicino.castShadow=x<BS,M.lontano.visible=x>=Jf&&x<p}}}}const rs=7.2,Ro=5.4,Co=1.3,th=7.5,qS=.4,eh=16762746;function nh(i,t){const e=document.createElement("canvas");e.width=e.height=128;const n=e.getContext("2d"),r=n.createRadialGradient(64,64,0,64,64,64);r.addColorStop(0,i),r.addColorStop(.35,t),r.addColorStop(1,"rgba(0,0,0,0)"),n.fillStyle=r,n.fillRect(0,0,128,128);const s=new ni(e);return s.colorSpace=ae,s}function jS(){const i=new ye(.06,.11,rs,8).translate(0,rs/2,0),t=new ye(.16,.18,.5,8).translate(0,.25,0),e=new ye(.04,.04,Co,6).rotateX(Math.PI/2).translate(0,rs-.15,Co/2),n=new ye(.12,.34,.18,10).translate(0,rs-.12,Co);return qi([i,t,e,n])}function $S(){const i=new be(.05,.05,.7).translate(0,Ro+.25,.35),t=new be(.18,.3,.04).translate(0,Ro+.2,.02),e=new ta(.2,.22,4).rotateY(Math.PI/4).translate(0,Ro+.16,.72);return qi([i,t,e])}function YS(i,t,{luci:e=4,quota:n=()=>0}={}){const r=t.lampioni.filter(y=>!y[3]),s=t.lampioni.filter(y=>y[3]),o=new qt({color:2829872,roughness:.5,metalness:.6}),a=new qt({color:16774368,emissive:eh,emissiveIntensity:3}),c=new It,l=new Tn,u=new z(0,1,0),f=new z(1,1,1),h=[];function d(y,E,R,D,N){const U=new _r(y,E,R.length),w=new _r(new Hi(.13,10,6).scale(1.2,.55,1.2),a,R.length);return R.forEach(([P,F,O],K)=>{const tt=n(P,F);l.setFromAxisAngle(u,O),U.setMatrixAt(K,c.compose(new z(P,tt,F),l,f));const ut=P+Math.sin(O)*N,dt=F+Math.cos(O)*N;w.setMatrixAt(K,c.compose(new z(ut,tt+D,dt),l,f)),h.push({x:ut,y:tt+D,z:dt})}),U.castShadow=!0,U.computeBoundingSphere(),w.computeBoundingSphere(),i.add(U,w),w}const g=d(jS(),o,r,rs-.24,Co),_=d($S(),o,s,Ro+.02,.72),m=nh("rgba(255,200,130,0.55)","rgba(255,170,90,0.22)"),p=new _r(new ln(1,1).rotateX(-Math.PI/2),new Kn({map:m,transparent:!0,depthWrite:!1,blending:zo,polygonOffset:!0,polygonOffsetFactor:-4,polygonOffsetUnits:-4}),h.length),v=new _e;v.setAttribute("position",new Zt(h.flatMap(y=>[y.x,y.y,y.z]),3));const M=new Qo(v,new Jo({map:nh("rgba(255,236,200,1)","rgba(255,190,110,0.35)"),size:3.2,sizeAttenuation:!0,transparent:!0,depthWrite:!1,blending:zo,color:16767136}));h.forEach((y,E)=>p.setMatrixAt(E,c.compose(new z(y.x,.17,y.z),l.identity(),new z(th*2,1,th*2)))),p.computeBoundingSphere(),p.renderOrder=2,i.add(p,M);const x=Array.from({length:e},()=>{const y=new Rd(eh,0,22,1.6);return i.add(y),y});let b=!0,S=0;const A=new Array(e).fill(-1);function T(y){b=y,a.emissiveIntensity=y?3:.05,p.visible=y,M.visible=y,y||x.forEach(E=>{E.intensity=0})}return{accendi:T,teste:h,aggiorna(y,E){if(!(!b||!x.length)){if(S-=E,S<=0){S=qS;const R=y.position,D=h.map((U,w)=>[Math.hypot(U.x-R.x,U.z-R.z),w]).sort((U,w)=>U[0]-w[0]).slice(0,e).map(U=>U[1]),N=D.filter(U=>!A.includes(U));for(let U=0;U<e;U++)D.includes(A[U])||(A[U]=N.shift()??-1,x[U].intensity=0)}for(let R=0;R<e;R++){const D=h[A[R]];D&&(x[R].position.set(D.x,D.y-.25,D.z),x[R].intensity=Math.min(26,x[R].intensity+E*60))}}},aggiungi(){return{lampadePali:g,lampadeMuri:_}}}}const ih=.042,wi=Object.freeze({stop:0,precedenza:1,fermata:2,retroOttagono:3,retroTriangolo:4,retroRettangolo:5,semaforo:6}),Bd=7,mo=2.3;function ZS(){const i=document.createElement("canvas");i.width=128*Bd,i.height=128;const t=i.getContext("2d"),e=(s,o,a)=>{t.beginPath();for(let c=0;c<8;c++){const l=Math.PI/8+c*Math.PI/4;t.lineTo(s+Math.cos(l)*a,o+Math.sin(l)*a)}t.closePath()},n=(s,o,a)=>{t.beginPath(),t.moveTo(s-a,o-a*.8),t.lineTo(s+a,o-a*.8),t.lineTo(s,o+a*.95),t.closePath()};e(64,64,62),t.fillStyle="#f4f4f4",t.fill(),e(64,64,56),t.fillStyle="#c4161c",t.fill(),t.fillStyle="#ffffff",t.font="bold 38px Arial, sans-serif",t.textAlign="center",t.textBaseline="middle",t.fillText("STOP",64,66),n(192,60,62),t.fillStyle="#c4161c",t.fill(),n(192,60,44),t.fillStyle="#f4f4f4",t.fill(),t.fillStyle="#1d4e9e",t.fillRect(264,8,112,112),t.fillStyle="#ffffff",t.fillRect(272,16,96,96),t.fillStyle="#1d4e9e",t.font="bold 30px Arial, sans-serif",t.fillText("BUS",320,48),t.font="bold 17px Arial, sans-serif",t.fillText("FERMATA",320,84),e(448,64,62),t.fillStyle="#8a8f94",t.fill(),n(576,60,62),t.fill(),t.fillRect(648,8,112,112),t.fillStyle="#111214",t.fillRect(768,0,128,128);for(const[s,o]of[[22,"#3a0e0e"],[64,"#3a320e"],[106,"#2cff7a"]])t.beginPath(),t.ellipse(832,s,36,13,0,0,Math.PI*2),t.fillStyle=o,t.fill();const r=new ni(i);return r.colorSpace=ae,r.anisotropy=4,r}function KS(){const i=ZS();return{vernice:new qt({color:15658730,roughness:.7,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2}),palo:new qt({color:9080724,roughness:.4,metalness:.6}),cartelli:new qt({map:i,alphaTest:.5,roughness:.5}),luci:new qt({map:i,emissive:16777215,emissiveMap:i,emissiveIntensity:.9,alphaTest:.5,roughness:.4}),nero:new qt({color:1316119,roughness:.5,metalness:.4}),pietra:new qt({color:13222322,roughness:.88}),pietraScura:new qt({color:9406331,roughness:.9}),acqua:new qt({color:3103850,roughness:.04,metalness:.15}),ghisa:new qt({color:3032630,roughness:.5,metalness:.5})}}function JS(){const i=new Map,t=new It,e=new z,n=new Tn,r=new z(1,1,1),s=new z(0,1,0);return{metti(o,a,c,l,u,f=0){e.set(c,l,u),n.setFromAxisAngle(s,f),t.compose(e,n,r);const h=a.index?a:a.setIndex([...Array(a.attributes.position.count).keys()]);h.applyMatrix4(t),i.has(o)||i.set(o,[]),i.get(o).push(h)},finisci(o){for(const[a,c]of i){const l=qi(c,!1);l.computeBoundingSphere();const u=new ne(l,a);u.matrixAutoUpdate=!1,u.receiveShadow=!0,u.castShadow=a!==o.userData.senzaOmbra,o.add(u)}}}}function us(i,t,e,n=!1){const r=new ln(i,t),s=r.attributes.uv;for(let o=0;o<s.count;o++)s.setX(o,(e+(n?1-s.getX(o):s.getX(o)))/Bd);return n&&r.rotateY(Math.PI),r}function QS(i){const t=i.attributes.normal;for(let n=0;n<t.array.length;n++)t.array[n]=-t.array[n];const e=i.index.array;for(let n=0;n<e.length;n+=3)[e[n+1],e[n+2]]=[e[n+2],e[n+1]];return i}function rh(i,t){return new ln(i,t).rotateX(-Math.PI/2)}function sh(i,t,e,n,r,s,o,a,c){i.metti(t.palo,new ye(.035,.035,mo+.3,8).translate(0,(mo+.3)/2,0),e,n,r,s),i.metti(t.cartelli,us(c,c,o).translate(0,mo,.045),e,n,r,s),i.metti(t.cartelli,us(c,c,a,!0).translate(0,mo,.04),e,n,r,s)}function t1(i,t,e,n,r){i.metti(t.pietra,new ye(1.75,1.85,.55,40,1,!0).translate(0,.275,0),e,n,r),i.metti(t.pietra,new Cl(1.5,1.78,40).rotateX(-Math.PI/2).translate(0,.55,0),e,n,r),i.metti(t.pietraScura,QS(new ye(1.5,1.5,.5,40,1,!0)).translate(0,.3,0),e,n,r),i.metti(t.acqua,new Vo(1.5,40).rotateX(-Math.PI/2).translate(0,.42,0),e,n,r),i.metti(t.pietra,new ye(.22,.32,1.25,16).translate(0,.62,0),e,n,r),i.metti(t.pietra,new ye(.62,.2,.22,24).translate(0,1.3,0),e,n,r),i.metti(t.acqua,new Vo(.56,24).rotateX(-Math.PI/2).translate(0,1.38,0),e,n,r),i.metti(t.pietra,new Hi(.16,14,10).translate(0,1.55,0),e,n,r)}function e1(i,t,e,n,r,s){i.metti(t.pietraScura,new be(3.2,.25,3.2).translate(0,.125,0),e,n,r,s),i.metti(t.pietra,new be(2.4,.3,2.4).translate(0,.4,0),e,n,r,s),i.metti(t.pietra,new be(1.3,1.7,1.3).translate(0,1.4,0),e,n,r,s),i.metti(t.pietraScura,new be(1.45,.14,1.45).translate(0,2.32,0),e,n,r,s),i.metti(t.pietra,new ye(.22,.42,3.4,4).rotateY(Math.PI/4).translate(0,4.09,0),e,n,r,s),i.metti(t.pietra,new ta(.3,.45,4).rotateY(Math.PI/4).translate(0,6,0),e,n,r,s)}function n1(i,t,e,n,r,s){i.metti(t.ghisa,new ye(.13,.17,1.05,14).translate(0,.525,0),e,n,r,s),i.metti(t.ghisa,new Hi(.15,12,8).translate(0,1.08,0),e,n,r,s),i.metti(t.ghisa,new be(.04,.04,.22).translate(0,.78,-.2),e,n,r,s),i.metti(t.pietraScura,new be(.5,.12,.5).translate(0,.06,-.25),e,n,r,s)}function i1(i,t,{quota:e=()=>0}={}){const n=KS(),r=new Oe;r.matrixAutoUpdate=!1,r.userData.senzaOmbra=n.vernice;const s=JS();for(const[o,a,c,l,u]of t.arredi??[]){const f=e(a,c);switch(o){case"strisce":{const h=Math.cos(l),d=Math.sin(l);for(let g=-u/2+.45;g<=u/2-.45;g+=1)s.metti(n.vernice,rh(.5,3).rotateY(-l+Math.PI/2),a-d*g,f+ih,c+h*g);break}case"linea":s.metti(n.vernice,rh(.45,u).rotateY(-l),a,f+ih,c);break;case"stop":sh(s,n,a,f,c,l,wi.stop,wi.retroOttagono,.62);break;case"precedenza":sh(s,n,a,f,c,l,wi.precedenza,wi.retroTriangolo,.75);break;case"fermata":s.metti(n.palo,new ye(.04,.04,2.7,8).translate(0,1.35,0),a,f,c,l),s.metti(n.cartelli,us(.5,.5,wi.fermata).translate(0,2.45,.045),a,f,c,l),s.metti(n.cartelli,us(.5,.5,wi.fermata).rotateY(Math.PI).translate(0,2.45,.035),a,f,c,l);break;case"semaforo":s.metti(n.palo,new ye(.05,.06,3.1,8).translate(0,1.55,0),a,f,c,l),s.metti(n.nero,new be(.3,.85,.22).translate(0,2.75,0),a,f,c,l),s.metti(n.luci,us(.3,.85*1,wi.semaforo).rotateY(Math.PI).translate(0,2.75,-.115),a,f,c,l);break;case"fontana":t1(s,n,a,f,c);break;case"monumento":e1(s,n,a,f,c,l);break;case"stele":s.metti(n.pietraScura,new be(1.2,.2,.9).translate(0,.1,0),a,f,c,l),s.metti(n.pietra,new be(.7,1.6,.3).translate(0,1,0),a,f,c,l);break;case"fontanella":n1(s,n,a,f,c,l);break}}return s.finisci(r),i.add(r),r}const ja=2200,Io=3e3,oh=Object.freeze({giorno:Object.freeze({zenit:4027588,orizzonte:12900586,bagliore:16773848,altezzaSole:48,azimutSole:215,luce:16773596,forzaLuce:3.1,cieloEmisfero:11914734,terraEmisfero:5919298,forzaEmisfero:1.15,nebbia:12571364,finestre:0,lampioni:!1,stelle:0,esposizione:.95,ambiente:.6}),tramonto:Object.freeze({zenit:2899822,orizzonte:15770220,bagliore:16761992,altezzaSole:11,azimutSole:262,luce:16754792,forzaLuce:2.3,cieloEmisfero:7375036,terraEmisfero:3878180,forzaEmisfero:.95,nebbia:12159604,finestre:.55,lampioni:!0,stelle:0,esposizione:1.05,ambiente:.45}),notte:Object.freeze({zenit:264471,orizzonte:1845318,bagliore:6979504,altezzaSole:38,azimutSole:130,luce:9414872,forzaLuce:.32,cieloEmisfero:3425390,terraEmisfero:920329,forzaEmisfero:.5,nebbia:1186350,finestre:1,lampioni:!0,stelle:1,esposizione:1.15,ambiente:.18})});function r1(i,t){const e=i*Math.PI/180,n=t*Math.PI/180;return new z(Math.sin(n)*Math.cos(e),Math.sin(e),-Math.cos(n)*Math.cos(e)).normalize()}function s1(){return new An({side:We,depthWrite:!1,fog:!1,uniforms:{zenit:{value:new Lt},orizzonte:{value:new Lt},bagliore:{value:new Lt},sole:{value:new z(0,1,0)},forzaBagliore:{value:1},notte:{value:0}},vertexShader:`
      varying vec3 vDir;
      void main() {
        vDir = normalize( position );
        vec4 p = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        gl_Position = p.xyww;
      }`,fragmentShader:`
      uniform vec3 zenit;
      uniform vec3 orizzonte;
      uniform vec3 bagliore;
      uniform vec3 sole;
      uniform float forzaBagliore;
      uniform float notte;
      varying vec3 vDir;
      void main() {
        float h = clamp( vDir.y, -0.2, 1.0 );
        float t = pow( max( h, 0.0 ), 0.42 );
        vec3 c = mix( orizzonte, zenit, t );
        float s = max( dot( normalize( vDir ), normalize( sole ) ), 0.0 );
        c += bagliore * ( pow( s, 6.0 ) * 0.55 + pow( s, 90.0 ) * 1.6 ) * forzaBagliore * ( 1.0 - 0.6 * notte );
        c += bagliore * pow( s, 1800.0 ) * 6.0 * ( 1.0 - notte * 0.3 );
        c = mix( c, orizzonte * 0.55, smoothstep( 0.0, -0.15, vDir.y ) );
        gl_FragColor = vec4( c, 1.0 );
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`})}function o1(){const i=Wi(42),t=new Float32Array(ja*3),e=new Float32Array(ja*3);for(let r=0;r<ja;r++){const s=i()*2-1,o=i()*Math.PI*2,a=.05+Math.abs(s)*.95,c=Math.sqrt(1-a*a);t.set([Math.cos(o)*c*Io*.9,a*Io*.9,Math.sin(o)*c*Io*.9],r*3);const l=.4+i()*.6;e.set([l,l,l*(.9+i()*.2)],r*3)}const n=new _e;return n.setAttribute("position",new fe(t,3)),n.setAttribute("color",new fe(e,3)),new Qo(n,new Jo({size:2.2,sizeAttenuation:!1,vertexColors:!0,transparent:!0,depthWrite:!1,fog:!1}))}function a1(i,t,{ombre:e=!0,distanza:n=600}={}){const r=new ne(new Hi(Io,32,16),s1());r.renderOrder=-10,r.frustumCulled=!1,i.add(r);const s=o1();s.frustumCulled=!1,i.add(s);const o=new By(16777215,4473924,1);i.add(o);const a=new Cd(16777215,1);if(a.castShadow=e,e){a.shadow.mapSize.set(2048,2048);const d=a.shadow.camera;d.left=-55,d.right=55,d.top=55,d.bottom=-55,d.near=1,d.far=320,a.shadow.bias=-6e-4,a.shadow.normalBias=.04}i.add(a,a.target),i.fog=new El(0,30,n);const c=new Go(t);let l=null,u=null;const f=new z;function h(d){const g=oh[d]??oh.tramonto;u={nome:d,...g};const _=r.material.uniforms;_.zenit.value.setHex(g.zenit),_.orizzonte.value.setHex(g.orizzonte),_.bagliore.value.setHex(g.bagliore),f.copy(r1(g.altezzaSole,g.azimutSole)),_.sole.value.copy(f),_.notte.value=g.stelle,_.forzaBagliore.value=d==="tramonto"?1.4:d==="notte"?.35:.8,s.visible=g.stelle>0,o.color.setHex(g.cieloEmisfero),o.groundColor.setHex(g.terraEmisfero),o.intensity=g.forzaEmisfero,a.color.setHex(g.luce),a.intensity=g.forzaLuce,i.fog.color.setHex(g.nebbia),t.toneMappingExposure=g.esposizione;const m=new Md,p=r.clone();return p.scale.setScalar(.01),m.add(p),l==null||l.dispose(),l=c.fromScene(m,0,.1,100).texture,i.environment=l,i.environmentIntensity=g.ambiente,u}return{imposta:h,get ora(){return u},distanza(d){i.fog.far=d,i.fog.near=Math.min(60,d*.15)},aggiorna(d){r.position.copy(d.position),s.position.copy(d.position);const g=d.position,_=4,m=Math.round(g.x/_)*_,p=Math.round(g.z/_)*_;a.target.position.set(m,0,p),a.position.set(m+f.x*200,f.y*200,p+f.z*200)}}}const ah=72,$a=52,c1=59,l1=12,u1=1.5,f1=3,ch=.1,h1=.024,d1=.1;async function p1(i,t,{ora:e="tramonto",esclusi:n=new Set,suQualita:r=()=>{},luciLampioni:s=null}={}){let o=Ld(),a=ls[o];const c=new QM({antialias:a.antialias,powerPreference:"high-performance"});c.setPixelRatio(1),c.outputColorSpace=ae,c.toneMapping=Vh,c.shadowMap.enabled=a.ombre,c.shadowMap.type=fl,i.appendChild(c.domElement);const l=new Md,u=new ke(ah,1,.05,a.distanza+40);u.rotation.order="YXZ",l.add(u);const f=a1(l,c,{ombre:a.ombre,distanza:a.distanza}),h=await yS({piena:a.texturePiene,limite:t.dati.limite}),d=FS(l,t,h,{esclusi:n}),g=XS(l,t.dati,{densita:a.densita,esclusoDa:(D,N)=>t.edificioIn(D,N)!==null}),_=YS(l,t.dati,{luci:s??a.luci,quota:t.quota});i1(l,t.dati,{quota:t.quota});function m(D){const N=f.imposta(D);return SS(h,N.finestre),_.accendi(N.lampioni),N}m(e),f.distanza(a.distanza);let p=a.scalaMassima,v=0,M=0,x=-1/0,b=0,S=0,A=0,T=0;function y(){const D=Math.max(1,Math.floor(i.clientWidth*p)),N=Math.max(1,Math.floor(i.clientHeight*p));c.setSize(D,N,!1),u.aspect=D/N,u.updateProjectionMatrix()}new ResizeObserver(y).observe(i),y();function E(D){if(b+=D,S+=1,A+=D,D>h1&&(T+=1),A<u1)return;const U=T/S>d1?Math.min(S/A,$a-1):S/A;S=0,A=0,T=0,v=U<$a&&p<=a.scalaMinima+.01?v+1:0,v>=f1&&o!==ao[ao.length-1]&&(o=ao[ao.indexOf(o)+1],a={...ls[o],antialias:a.antialias,texturePiene:a.texturePiene,ombre:a.ombre&&ls[o].ombre},v=0,u.far=a.distanza+40,u.updateProjectionMatrix(),f.distanza(a.distanza),r(o)),M=U>c1?M+1:0;let w=p;U<$a?(w=Math.max(a.scalaMinima,p-ch),x=b):M>=3&&b-x>l1&&(w=Math.min(a.scalaMassima,p+ch/2),M=0),!(Math.abs(w-p)<.01)&&(p=w,y())}const R=new Set;return{renderer:c,scena:l,camera:u,materiali:h,lampioni:_,get qualita(){return o},get ora(){return f.ora},get scala(){return p},impostaOra:m,alChiuso(D){c.shadowMap.autoUpdate=!D},aggiungiAggiornatore(D){return R.add(D),()=>R.delete(D)},disegna({x:D,y:N,z:U,yaw:w,pitch:P,fov:F=ah},O,K=null){E(O),u.position.set(D,N,U),u.rotation.set(P,w,0),Math.abs(u.fov-F)>.01&&(u.fov=F,u.updateProjectionMatrix()),u.updateMatrixWorld(),f.aggiorna(u),d.aggiorna(u,a.distanza),g.aggiorna(u,a.distanza),_.aggiorna(u,O);for(const tt of R)tt(O,u);c.clear(),c.render(l,u),K==null||K()},statistiche:()=>({...c.info.render,celle:d.celle.length,alberi:g.quanti,qualita:o,scala:p})}}class m1 extends Vi{constructor(t){super(t),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(e){return new M1(e)}),this.register(function(e){return new y1(e)}),this.register(function(e){return new I1(e)}),this.register(function(e){return new P1(e)}),this.register(function(e){return new L1(e)}),this.register(function(e){return new E1(e)}),this.register(function(e){return new b1(e)}),this.register(function(e){return new A1(e)}),this.register(function(e){return new T1(e)}),this.register(function(e){return new v1(e)}),this.register(function(e){return new w1(e)}),this.register(function(e){return new S1(e)}),this.register(function(e){return new C1(e)}),this.register(function(e){return new R1(e)}),this.register(function(e){return new _1(e)}),this.register(function(e){return new D1(e)}),this.register(function(e){return new U1(e)})}load(t,e,n,r){const s=this;let o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){const l=cs.extractUrlBase(t);o=cs.resolveURL(l,this.path)}else o=cs.extractUrlBase(t);this.manager.itemStart(t);const a=function(l){r?r(l):console.error(l),s.manager.itemError(t),s.manager.itemEnd(t)},c=new Il(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(t,function(l){try{s.parse(l,o,function(u){e(u),s.manager.itemEnd(t)},a)}catch(u){a(u)}},n,a)}setDRACOLoader(t){return this.dracoLoader=t,this}setKTX2Loader(t){return this.ktx2Loader=t,this}setMeshoptDecoder(t){return this.meshoptDecoder=t,this}register(t){return this.pluginCallbacks.indexOf(t)===-1&&this.pluginCallbacks.push(t),this}unregister(t){return this.pluginCallbacks.indexOf(t)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(t),1),this}parse(t,e,n,r){let s;const o={},a={},c=new TextDecoder;if(typeof t=="string")s=JSON.parse(t);else if(t instanceof ArrayBuffer)if(c.decode(new Uint8Array(t,0,4))===Gd){try{o[jt.KHR_BINARY_GLTF]=new N1(t)}catch(f){r&&r(f);return}s=JSON.parse(o[jt.KHR_BINARY_GLTF].content)}else s=JSON.parse(c.decode(t));else s=t;if(s.asset===void 0||s.asset.version[0]<2){r&&r(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const l=new $1(s,{path:e||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let u=0;u<this.pluginCallbacks.length;u++){const f=this.pluginCallbacks[u](l);f.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[f.name]=f,o[f.name]=!0}if(s.extensionsUsed)for(let u=0;u<s.extensionsUsed.length;++u){const f=s.extensionsUsed[u],h=s.extensionsRequired||[];switch(f){case jt.KHR_MATERIALS_UNLIT:o[f]=new x1;break;case jt.KHR_DRACO_MESH_COMPRESSION:o[f]=new O1(s,this.dracoLoader);break;case jt.KHR_TEXTURE_TRANSFORM:o[f]=new z1;break;case jt.KHR_MESH_QUANTIZATION:o[f]=new F1;break;default:h.indexOf(f)>=0&&a[f]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+f+'".')}}l.setExtensions(o),l.setPlugins(a),l.parse(n,r)}parseAsync(t,e){const n=this;return new Promise(function(r,s){n.parse(t,e,r,s)})}}function g1(){let i={};return{get:function(t){return i[t]},add:function(t,e){i[t]=e},remove:function(t){delete i[t]},removeAll:function(){i={}}}}const jt={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class _1{constructor(t){this.parser=t,this.name=jt.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const t=this.parser,e=this.parser.json.nodes||[];for(let n=0,r=e.length;n<r;n++){const s=e[n];s.extensions&&s.extensions[this.name]&&s.extensions[this.name].light!==void 0&&t._addNodeRef(this.cache,s.extensions[this.name].light)}}_loadLight(t){const e=this.parser,n="light:"+t;let r=e.cache.get(n);if(r)return r;const s=e.json,c=((s.extensions&&s.extensions[this.name]||{}).lights||[])[t];let l;const u=new Lt(16777215);c.color!==void 0&&u.setRGB(c.color[0],c.color[1],c.color[2],ze);const f=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new Cd(u),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new Rd(u),l.distance=f;break;case"spot":l=new ky(u),l.distance=f,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),l.decay=2,qn(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=e.createUniqueName(c.name||"light_"+t),r=Promise.resolve(l),e.cache.add(n,r),r}getDependency(t,e){if(t==="light")return this._loadLight(e)}createNodeAttachment(t){const e=this,n=this.parser,s=n.json.nodes[t],a=(s.extensions&&s.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(c){return n._getNodeRef(e.cache,a,c)})}}class x1{constructor(){this.name=jt.KHR_MATERIALS_UNLIT}getMaterialType(){return Kn}extendParams(t,e,n){const r=[];t.color=new Lt(1,1,1),t.opacity=1;const s=e.pbrMetallicRoughness;if(s){if(Array.isArray(s.baseColorFactor)){const o=s.baseColorFactor;t.color.setRGB(o[0],o[1],o[2],ze),t.opacity=o[3]}s.baseColorTexture!==void 0&&r.push(n.assignTexture(t,"map",s.baseColorTexture,ae))}return Promise.all(r)}}class v1{constructor(t){this.parser=t,this.name=jt.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(t,e){const r=this.parser.json.materials[t];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const s=r.extensions[this.name].emissiveStrength;return s!==void 0&&(e.emissiveIntensity=s),Promise.resolve()}}class M1{constructor(t){this.parser=t,this.name=jt.KHR_MATERIALS_CLEARCOAT}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:un}extendMaterialParams(t,e){const n=this.parser,r=n.json.materials[t];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const s=[],o=r.extensions[this.name];if(o.clearcoatFactor!==void 0&&(e.clearcoat=o.clearcoatFactor),o.clearcoatTexture!==void 0&&s.push(n.assignTexture(e,"clearcoatMap",o.clearcoatTexture)),o.clearcoatRoughnessFactor!==void 0&&(e.clearcoatRoughness=o.clearcoatRoughnessFactor),o.clearcoatRoughnessTexture!==void 0&&s.push(n.assignTexture(e,"clearcoatRoughnessMap",o.clearcoatRoughnessTexture)),o.clearcoatNormalTexture!==void 0&&(s.push(n.assignTexture(e,"clearcoatNormalMap",o.clearcoatNormalTexture)),o.clearcoatNormalTexture.scale!==void 0)){const a=o.clearcoatNormalTexture.scale;e.clearcoatNormalScale=new Wt(a,a)}return Promise.all(s)}}class y1{constructor(t){this.parser=t,this.name=jt.KHR_MATERIALS_DISPERSION}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:un}extendMaterialParams(t,e){const r=this.parser.json.materials[t];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const s=r.extensions[this.name];return e.dispersion=s.dispersion!==void 0?s.dispersion:0,Promise.resolve()}}class S1{constructor(t){this.parser=t,this.name=jt.KHR_MATERIALS_IRIDESCENCE}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:un}extendMaterialParams(t,e){const n=this.parser,r=n.json.materials[t];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const s=[],o=r.extensions[this.name];return o.iridescenceFactor!==void 0&&(e.iridescence=o.iridescenceFactor),o.iridescenceTexture!==void 0&&s.push(n.assignTexture(e,"iridescenceMap",o.iridescenceTexture)),o.iridescenceIor!==void 0&&(e.iridescenceIOR=o.iridescenceIor),e.iridescenceThicknessRange===void 0&&(e.iridescenceThicknessRange=[100,400]),o.iridescenceThicknessMinimum!==void 0&&(e.iridescenceThicknessRange[0]=o.iridescenceThicknessMinimum),o.iridescenceThicknessMaximum!==void 0&&(e.iridescenceThicknessRange[1]=o.iridescenceThicknessMaximum),o.iridescenceThicknessTexture!==void 0&&s.push(n.assignTexture(e,"iridescenceThicknessMap",o.iridescenceThicknessTexture)),Promise.all(s)}}class E1{constructor(t){this.parser=t,this.name=jt.KHR_MATERIALS_SHEEN}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:un}extendMaterialParams(t,e){const n=this.parser,r=n.json.materials[t];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const s=[];e.sheenColor=new Lt(0,0,0),e.sheenRoughness=0,e.sheen=1;const o=r.extensions[this.name];if(o.sheenColorFactor!==void 0){const a=o.sheenColorFactor;e.sheenColor.setRGB(a[0],a[1],a[2],ze)}return o.sheenRoughnessFactor!==void 0&&(e.sheenRoughness=o.sheenRoughnessFactor),o.sheenColorTexture!==void 0&&s.push(n.assignTexture(e,"sheenColorMap",o.sheenColorTexture,ae)),o.sheenRoughnessTexture!==void 0&&s.push(n.assignTexture(e,"sheenRoughnessMap",o.sheenRoughnessTexture)),Promise.all(s)}}class b1{constructor(t){this.parser=t,this.name=jt.KHR_MATERIALS_TRANSMISSION}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:un}extendMaterialParams(t,e){const n=this.parser,r=n.json.materials[t];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const s=[],o=r.extensions[this.name];return o.transmissionFactor!==void 0&&(e.transmission=o.transmissionFactor),o.transmissionTexture!==void 0&&s.push(n.assignTexture(e,"transmissionMap",o.transmissionTexture)),Promise.all(s)}}class A1{constructor(t){this.parser=t,this.name=jt.KHR_MATERIALS_VOLUME}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:un}extendMaterialParams(t,e){const n=this.parser,r=n.json.materials[t];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const s=[],o=r.extensions[this.name];e.thickness=o.thicknessFactor!==void 0?o.thicknessFactor:0,o.thicknessTexture!==void 0&&s.push(n.assignTexture(e,"thicknessMap",o.thicknessTexture)),e.attenuationDistance=o.attenuationDistance||1/0;const a=o.attenuationColor||[1,1,1];return e.attenuationColor=new Lt().setRGB(a[0],a[1],a[2],ze),Promise.all(s)}}class T1{constructor(t){this.parser=t,this.name=jt.KHR_MATERIALS_IOR}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:un}extendMaterialParams(t,e){const r=this.parser.json.materials[t];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const s=r.extensions[this.name];return e.ior=s.ior!==void 0?s.ior:1.5,Promise.resolve()}}class w1{constructor(t){this.parser=t,this.name=jt.KHR_MATERIALS_SPECULAR}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:un}extendMaterialParams(t,e){const n=this.parser,r=n.json.materials[t];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const s=[],o=r.extensions[this.name];e.specularIntensity=o.specularFactor!==void 0?o.specularFactor:1,o.specularTexture!==void 0&&s.push(n.assignTexture(e,"specularIntensityMap",o.specularTexture));const a=o.specularColorFactor||[1,1,1];return e.specularColor=new Lt().setRGB(a[0],a[1],a[2],ze),o.specularColorTexture!==void 0&&s.push(n.assignTexture(e,"specularColorMap",o.specularColorTexture,ae)),Promise.all(s)}}class R1{constructor(t){this.parser=t,this.name=jt.EXT_MATERIALS_BUMP}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:un}extendMaterialParams(t,e){const n=this.parser,r=n.json.materials[t];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const s=[],o=r.extensions[this.name];return e.bumpScale=o.bumpFactor!==void 0?o.bumpFactor:1,o.bumpTexture!==void 0&&s.push(n.assignTexture(e,"bumpMap",o.bumpTexture)),Promise.all(s)}}class C1{constructor(t){this.parser=t,this.name=jt.KHR_MATERIALS_ANISOTROPY}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:un}extendMaterialParams(t,e){const n=this.parser,r=n.json.materials[t];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const s=[],o=r.extensions[this.name];return o.anisotropyStrength!==void 0&&(e.anisotropy=o.anisotropyStrength),o.anisotropyRotation!==void 0&&(e.anisotropyRotation=o.anisotropyRotation),o.anisotropyTexture!==void 0&&s.push(n.assignTexture(e,"anisotropyMap",o.anisotropyTexture)),Promise.all(s)}}class I1{constructor(t){this.parser=t,this.name=jt.KHR_TEXTURE_BASISU}loadTexture(t){const e=this.parser,n=e.json,r=n.textures[t];if(!r.extensions||!r.extensions[this.name])return null;const s=r.extensions[this.name],o=e.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return e.loadTextureImage(t,s.source,o)}}class P1{constructor(t){this.parser=t,this.name=jt.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(t){const e=this.name,n=this.parser,r=n.json,s=r.textures[t];if(!s.extensions||!s.extensions[e])return null;const o=s.extensions[e],a=r.images[o.source];let c=n.textureLoader;if(a.uri){const l=n.options.manager.getHandler(a.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(t,o.source,c);if(r.extensionsRequired&&r.extensionsRequired.indexOf(e)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(t)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(t){const e=new Image;e.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",e.onload=e.onerror=function(){t(e.height===1)}})),this.isSupported}}class L1{constructor(t){this.parser=t,this.name=jt.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(t){const e=this.name,n=this.parser,r=n.json,s=r.textures[t];if(!s.extensions||!s.extensions[e])return null;const o=s.extensions[e],a=r.images[o.source];let c=n.textureLoader;if(a.uri){const l=n.options.manager.getHandler(a.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(t,o.source,c);if(r.extensionsRequired&&r.extensionsRequired.indexOf(e)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(t)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(t){const e=new Image;e.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",e.onload=e.onerror=function(){t(e.height===1)}})),this.isSupported}}class D1{constructor(t){this.name=jt.EXT_MESHOPT_COMPRESSION,this.parser=t}loadBufferView(t){const e=this.parser.json,n=e.bufferViews[t];if(n.extensions&&n.extensions[this.name]){const r=n.extensions[this.name],s=this.parser.getDependency("buffer",r.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(e.extensionsRequired&&e.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return s.then(function(a){const c=r.byteOffset||0,l=r.byteLength||0,u=r.count,f=r.byteStride,h=new Uint8Array(a,c,l);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(u,f,h,r.mode,r.filter).then(function(d){return d.buffer}):o.ready.then(function(){const d=new ArrayBuffer(u*f);return o.decodeGltfBuffer(new Uint8Array(d),u,f,h,r.mode,r.filter),d})})}else return null}}class U1{constructor(t){this.name=jt.EXT_MESH_GPU_INSTANCING,this.parser=t}createNodeMesh(t){const e=this.parser.json,n=e.nodes[t];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const r=e.meshes[n.mesh];for(const l of r.primitives)if(l.mode!==rn.TRIANGLES&&l.mode!==rn.TRIANGLE_STRIP&&l.mode!==rn.TRIANGLE_FAN&&l.mode!==void 0)return null;const o=n.extensions[this.name].attributes,a=[],c={};for(const l in o)a.push(this.parser.getDependency("accessor",o[l]).then(u=>(c[l]=u,c[l])));return a.length<1?null:(a.push(this.parser.createNodeMesh(t)),Promise.all(a).then(l=>{const u=l.pop(),f=u.isGroup?u.children:[u],h=l[0].count,d=[];for(const g of f){const _=new It,m=new z,p=new Tn,v=new z(1,1,1),M=new _r(g.geometry,g.material,h);for(let x=0;x<h;x++)c.TRANSLATION&&m.fromBufferAttribute(c.TRANSLATION,x),c.ROTATION&&p.fromBufferAttribute(c.ROTATION,x),c.SCALE&&v.fromBufferAttribute(c.SCALE,x),M.setMatrixAt(x,_.compose(m,p,v));for(const x in c)if(x==="_COLOR_0"){const b=c[x];M.instanceColor=new $c(b.array,b.itemSize,b.normalized)}else x!=="TRANSLATION"&&x!=="ROTATION"&&x!=="SCALE"&&g.geometry.setAttribute(x,c[x]);me.prototype.copy.call(M,g),this.parser.assignFinalMaterial(M),d.push(M)}return u.isGroup?(u.clear(),u.add(...d),u):d[0]}))}}const Gd="glTF",qr=12,lh={JSON:1313821514,BIN:5130562};class N1{constructor(t){this.name=jt.KHR_BINARY_GLTF,this.content=null,this.body=null;const e=new DataView(t,0,qr),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(t.slice(0,4))),version:e.getUint32(4,!0),length:e.getUint32(8,!0)},this.header.magic!==Gd)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const r=this.header.length-qr,s=new DataView(t,qr);let o=0;for(;o<r;){const a=s.getUint32(o,!0);o+=4;const c=s.getUint32(o,!0);if(o+=4,c===lh.JSON){const l=new Uint8Array(t,qr+o,a);this.content=n.decode(l)}else if(c===lh.BIN){const l=qr+o;this.body=t.slice(l,l+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class O1{constructor(t,e){if(!e)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=jt.KHR_DRACO_MESH_COMPRESSION,this.json=t,this.dracoLoader=e,this.dracoLoader.preload()}decodePrimitive(t,e){const n=this.json,r=this.dracoLoader,s=t.extensions[this.name].bufferView,o=t.extensions[this.name].attributes,a={},c={},l={};for(const u in o){const f=tl[u]||u.toLowerCase();a[f]=o[u]}for(const u in t.attributes){const f=tl[u]||u.toLowerCase();if(o[u]!==void 0){const h=n.accessors[t.attributes[u]],d=vr[h.componentType];l[f]=d.name,c[f]=h.normalized===!0}}return e.getDependency("bufferView",s).then(function(u){return new Promise(function(f,h){r.decodeDracoFile(u,function(d){for(const g in d.attributes){const _=d.attributes[g],m=c[g];m!==void 0&&(_.normalized=m)}f(d)},a,l,ze,h)})})}}class z1{constructor(){this.name=jt.KHR_TEXTURE_TRANSFORM}extendTexture(t,e){return(e.texCoord===void 0||e.texCoord===t.channel)&&e.offset===void 0&&e.rotation===void 0&&e.scale===void 0||(t=t.clone(),e.texCoord!==void 0&&(t.channel=e.texCoord),e.offset!==void 0&&t.offset.fromArray(e.offset),e.rotation!==void 0&&(t.rotation=e.rotation),e.scale!==void 0&&t.repeat.fromArray(e.scale),t.needsUpdate=!0),t}}class F1{constructor(){this.name=jt.KHR_MESH_QUANTIZATION}}class kd extends Ts{constructor(t,e,n,r){super(t,e,n,r)}copySampleValue_(t){const e=this.resultBuffer,n=this.sampleValues,r=this.valueSize,s=t*r*3+r;for(let o=0;o!==r;o++)e[o]=n[s+o];return e}interpolate_(t,e,n,r){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=a*2,l=a*3,u=r-e,f=(n-e)/u,h=f*f,d=h*f,g=t*l,_=g-l,m=-2*d+3*h,p=d-h,v=1-m,M=p-h+f;for(let x=0;x!==a;x++){const b=o[_+x+a],S=o[_+x+c]*u,A=o[g+x+a],T=o[g+x]*u;s[x]=v*b+M*S+m*A+p*T}return s}}const B1=new Tn;class G1 extends kd{interpolate_(t,e,n,r){const s=super.interpolate_(t,e,n,r);return B1.fromArray(s).normalize().toArray(s),s}}const rn={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},vr={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},uh={9728:Xe,9729:Pe,9984:Xh,9985:vo,9986:Qr,9987:En},fh={33071:Cn,33648:Fo,10497:an},Ya={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},tl={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},di={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},k1={CUBICSPLINE:void 0,LINEAR:_s,STEP:gs},Za={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function H1(i){return i.DefaultMaterial===void 0&&(i.DefaultMaterial=new qt({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:ti})),i.DefaultMaterial}function Ri(i,t,e){for(const n in e.extensions)i[n]===void 0&&(t.userData.gltfExtensions=t.userData.gltfExtensions||{},t.userData.gltfExtensions[n]=e.extensions[n])}function qn(i,t){t.extras!==void 0&&(typeof t.extras=="object"?Object.assign(i.userData,t.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+t.extras))}function V1(i,t,e){let n=!1,r=!1,s=!1;for(let l=0,u=t.length;l<u;l++){const f=t[l];if(f.POSITION!==void 0&&(n=!0),f.NORMAL!==void 0&&(r=!0),f.COLOR_0!==void 0&&(s=!0),n&&r&&s)break}if(!n&&!r&&!s)return Promise.resolve(i);const o=[],a=[],c=[];for(let l=0,u=t.length;l<u;l++){const f=t[l];if(n){const h=f.POSITION!==void 0?e.getDependency("accessor",f.POSITION):i.attributes.position;o.push(h)}if(r){const h=f.NORMAL!==void 0?e.getDependency("accessor",f.NORMAL):i.attributes.normal;a.push(h)}if(s){const h=f.COLOR_0!==void 0?e.getDependency("accessor",f.COLOR_0):i.attributes.color;c.push(h)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c)]).then(function(l){const u=l[0],f=l[1],h=l[2];return n&&(i.morphAttributes.position=u),r&&(i.morphAttributes.normal=f),s&&(i.morphAttributes.color=h),i.morphTargetsRelative=!0,i})}function W1(i,t){if(i.updateMorphTargets(),t.weights!==void 0)for(let e=0,n=t.weights.length;e<n;e++)i.morphTargetInfluences[e]=t.weights[e];if(t.extras&&Array.isArray(t.extras.targetNames)){const e=t.extras.targetNames;if(i.morphTargetInfluences.length===e.length){i.morphTargetDictionary={};for(let n=0,r=e.length;n<r;n++)i.morphTargetDictionary[e[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function X1(i){let t;const e=i.extensions&&i.extensions[jt.KHR_DRACO_MESH_COMPRESSION];if(e?t="draco:"+e.bufferView+":"+e.indices+":"+Ka(e.attributes):t=i.indices+":"+Ka(i.attributes)+":"+i.mode,i.targets!==void 0)for(let n=0,r=i.targets.length;n<r;n++)t+=":"+Ka(i.targets[n]);return t}function Ka(i){let t="";const e=Object.keys(i).sort();for(let n=0,r=e.length;n<r;n++)t+=e[n]+":"+i[e[n]]+";";return t}function el(i){switch(i){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function q1(i){return i.search(/\.jpe?g($|\?)/i)>0||i.search(/^data\:image\/jpeg/)===0?"image/jpeg":i.search(/\.webp($|\?)/i)>0||i.search(/^data\:image\/webp/)===0?"image/webp":i.search(/\.ktx2($|\?)/i)>0||i.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const j1=new It;class $1{constructor(t={},e={}){this.json=t,this.extensions={},this.plugins={},this.options=e,this.cache=new g1,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,r=-1,s=!1,o=-1;if(typeof navigator<"u"){const a=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(a)===!0;const c=a.match(/Version\/(\d+)/);r=n&&c?parseInt(c[1],10):-1,s=a.indexOf("Firefox")>-1,o=s?a.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&r<17||s&&o<98?this.textureLoader=new Fy(this.options.manager):this.textureLoader=new Wy(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Il(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(t){this.extensions=t}setPlugins(t){this.plugins=t}parse(t,e){const n=this,r=this.json,s=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){const a={scene:o[0][r.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:r.asset,parser:n,userData:{}};return Ri(s,a,r),qn(a,r),Promise.all(n._invokeAll(function(c){return c.afterRoot&&c.afterRoot(a)})).then(function(){for(const c of a.scenes)c.updateMatrixWorld();t(a)})}).catch(e)}_markDefs(){const t=this.json.nodes||[],e=this.json.skins||[],n=this.json.meshes||[];for(let r=0,s=e.length;r<s;r++){const o=e[r].joints;for(let a=0,c=o.length;a<c;a++)t[o[a]].isBone=!0}for(let r=0,s=t.length;r<s;r++){const o=t[r];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(t,e){e!==void 0&&(t.refs[e]===void 0&&(t.refs[e]=t.uses[e]=0),t.refs[e]++)}_getNodeRef(t,e,n){if(t.refs[e]<=1)return n;const r=n.clone(),s=(o,a)=>{const c=this.associations.get(o);c!=null&&this.associations.set(a,c);for(const[l,u]of o.children.entries())s(u,a.children[l])};return s(n,r),r.name+="_instance_"+t.uses[e]++,r}_invokeOne(t){const e=Object.values(this.plugins);e.push(this);for(let n=0;n<e.length;n++){const r=t(e[n]);if(r)return r}return null}_invokeAll(t){const e=Object.values(this.plugins);e.unshift(this);const n=[];for(let r=0;r<e.length;r++){const s=t(e[r]);s&&n.push(s)}return n}getDependency(t,e){const n=t+":"+e;let r=this.cache.get(n);if(!r){switch(t){case"scene":r=this.loadScene(e);break;case"node":r=this._invokeOne(function(s){return s.loadNode&&s.loadNode(e)});break;case"mesh":r=this._invokeOne(function(s){return s.loadMesh&&s.loadMesh(e)});break;case"accessor":r=this.loadAccessor(e);break;case"bufferView":r=this._invokeOne(function(s){return s.loadBufferView&&s.loadBufferView(e)});break;case"buffer":r=this.loadBuffer(e);break;case"material":r=this._invokeOne(function(s){return s.loadMaterial&&s.loadMaterial(e)});break;case"texture":r=this._invokeOne(function(s){return s.loadTexture&&s.loadTexture(e)});break;case"skin":r=this.loadSkin(e);break;case"animation":r=this._invokeOne(function(s){return s.loadAnimation&&s.loadAnimation(e)});break;case"camera":r=this.loadCamera(e);break;default:if(r=this._invokeOne(function(s){return s!=this&&s.getDependency&&s.getDependency(t,e)}),!r)throw new Error("Unknown type: "+t);break}this.cache.add(n,r)}return r}getDependencies(t){let e=this.cache.get(t);if(!e){const n=this,r=this.json[t+(t==="mesh"?"es":"s")]||[];e=Promise.all(r.map(function(s,o){return n.getDependency(t,o)})),this.cache.add(t,e)}return e}loadBuffer(t){const e=this.json.buffers[t],n=this.fileLoader;if(e.type&&e.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+e.type+" buffer type is not supported.");if(e.uri===void 0&&t===0)return Promise.resolve(this.extensions[jt.KHR_BINARY_GLTF].body);const r=this.options;return new Promise(function(s,o){n.load(cs.resolveURL(e.uri,r.path),s,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+e.uri+'".'))})})}loadBufferView(t){const e=this.json.bufferViews[t];return this.getDependency("buffer",e.buffer).then(function(n){const r=e.byteLength||0,s=e.byteOffset||0;return n.slice(s,s+r)})}loadAccessor(t){const e=this,n=this.json,r=this.json.accessors[t];if(r.bufferView===void 0&&r.sparse===void 0){const o=Ya[r.type],a=vr[r.componentType],c=r.normalized===!0,l=new a(r.count*o);return Promise.resolve(new fe(l,o,c))}const s=[];return r.bufferView!==void 0?s.push(this.getDependency("bufferView",r.bufferView)):s.push(null),r.sparse!==void 0&&(s.push(this.getDependency("bufferView",r.sparse.indices.bufferView)),s.push(this.getDependency("bufferView",r.sparse.values.bufferView))),Promise.all(s).then(function(o){const a=o[0],c=Ya[r.type],l=vr[r.componentType],u=l.BYTES_PER_ELEMENT,f=u*c,h=r.byteOffset||0,d=r.bufferView!==void 0?n.bufferViews[r.bufferView].byteStride:void 0,g=r.normalized===!0;let _,m;if(d&&d!==f){const p=Math.floor(h/d),v="InterleavedBuffer:"+r.bufferView+":"+r.componentType+":"+p+":"+r.count;let M=e.cache.get(v);M||(_=new l(a,p*d,r.count*d/u),M=new ty(_,d/u),e.cache.add(v,M)),m=new bl(M,c,h%d/u,g)}else a===null?_=new l(r.count*c):_=new l(a,h,r.count*c),m=new fe(_,c,g);if(r.sparse!==void 0){const p=Ya.SCALAR,v=vr[r.sparse.indices.componentType],M=r.sparse.indices.byteOffset||0,x=r.sparse.values.byteOffset||0,b=new v(o[1],M,r.sparse.count*p),S=new l(o[2],x,r.sparse.count*c);a!==null&&(m=new fe(m.array.slice(),m.itemSize,m.normalized)),m.normalized=!1;for(let A=0,T=b.length;A<T;A++){const y=b[A];if(m.setX(y,S[A*c]),c>=2&&m.setY(y,S[A*c+1]),c>=3&&m.setZ(y,S[A*c+2]),c>=4&&m.setW(y,S[A*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}m.normalized=g}return m})}loadTexture(t){const e=this.json,n=this.options,s=e.textures[t].source,o=e.images[s];let a=this.textureLoader;if(o.uri){const c=n.manager.getHandler(o.uri);c!==null&&(a=c)}return this.loadTextureImage(t,s,a)}loadTextureImage(t,e,n){const r=this,s=this.json,o=s.textures[t],a=s.images[e],c=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[c])return this.textureCache[c];const l=this.loadImageSource(e,n).then(function(u){u.flipY=!1,u.name=o.name||a.name||"",u.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(u.name=a.uri);const h=(s.samplers||{})[o.sampler]||{};return u.magFilter=uh[h.magFilter]||Pe,u.minFilter=uh[h.minFilter]||En,u.wrapS=fh[h.wrapS]||an,u.wrapT=fh[h.wrapT]||an,u.generateMipmaps=!u.isCompressedTexture&&u.minFilter!==Xe&&u.minFilter!==Pe,r.associations.set(u,{textures:t}),u}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(t,e){const n=this,r=this.json,s=this.options;if(this.sourceCache[t]!==void 0)return this.sourceCache[t].then(f=>f.clone());const o=r.images[t],a=self.URL||self.webkitURL;let c=o.uri||"",l=!1;if(o.bufferView!==void 0)c=n.getDependency("bufferView",o.bufferView).then(function(f){l=!0;const h=new Blob([f],{type:o.mimeType});return c=a.createObjectURL(h),c});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+t+" is missing URI and bufferView");const u=Promise.resolve(c).then(function(f){return new Promise(function(h,d){let g=h;e.isImageBitmapLoader===!0&&(g=function(_){const m=new Ae(_);m.needsUpdate=!0,h(m)}),e.load(cs.resolveURL(f,s.path),g,void 0,d)})}).then(function(f){return l===!0&&a.revokeObjectURL(c),qn(f,o),f.userData.mimeType=o.mimeType||q1(o.uri),f}).catch(function(f){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),f});return this.sourceCache[t]=u,u}assignTexture(t,e,n,r){const s=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(o=o.clone(),o.channel=n.texCoord),s.extensions[jt.KHR_TEXTURE_TRANSFORM]){const a=n.extensions!==void 0?n.extensions[jt.KHR_TEXTURE_TRANSFORM]:void 0;if(a){const c=s.associations.get(o);o=s.extensions[jt.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),s.associations.set(o,c)}}return r!==void 0&&(o.colorSpace=r),t[e]=o,o})}assignFinalMaterial(t){const e=t.geometry;let n=t.material;const r=e.attributes.tangent===void 0,s=e.attributes.color!==void 0,o=e.attributes.normal===void 0;if(t.isPoints){const a="PointsMaterial:"+n.uuid;let c=this.cache.get(a);c||(c=new Jo,In.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,c.sizeAttenuation=!1,this.cache.add(a,c)),n=c}else if(t.isLine){const a="LineBasicMaterial:"+n.uuid;let c=this.cache.get(a);c||(c=new Sd,In.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,this.cache.add(a,c)),n=c}if(r||s||o){let a="ClonedMaterial:"+n.uuid+":";r&&(a+="derivative-tangents:"),s&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let c=this.cache.get(a);c||(c=n.clone(),s&&(c.vertexColors=!0),o&&(c.flatShading=!0),r&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(a,c),this.associations.set(c,this.associations.get(n))),n=c}t.material=n}getMaterialType(){return qt}loadMaterial(t){const e=this,n=this.json,r=this.extensions,s=n.materials[t];let o;const a={},c=s.extensions||{},l=[];if(c[jt.KHR_MATERIALS_UNLIT]){const f=r[jt.KHR_MATERIALS_UNLIT];o=f.getMaterialType(),l.push(f.extendParams(a,s,e))}else{const f=s.pbrMetallicRoughness||{};if(a.color=new Lt(1,1,1),a.opacity=1,Array.isArray(f.baseColorFactor)){const h=f.baseColorFactor;a.color.setRGB(h[0],h[1],h[2],ze),a.opacity=h[3]}f.baseColorTexture!==void 0&&l.push(e.assignTexture(a,"map",f.baseColorTexture,ae)),a.metalness=f.metallicFactor!==void 0?f.metallicFactor:1,a.roughness=f.roughnessFactor!==void 0?f.roughnessFactor:1,f.metallicRoughnessTexture!==void 0&&(l.push(e.assignTexture(a,"metalnessMap",f.metallicRoughnessTexture)),l.push(e.assignTexture(a,"roughnessMap",f.metallicRoughnessTexture))),o=this._invokeOne(function(h){return h.getMaterialType&&h.getMaterialType(t)}),l.push(Promise.all(this._invokeAll(function(h){return h.extendMaterialParams&&h.extendMaterialParams(t,a)})))}s.doubleSided===!0&&(a.side=He);const u=s.alphaMode||Za.OPAQUE;if(u===Za.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,u===Za.MASK&&(a.alphaTest=s.alphaCutoff!==void 0?s.alphaCutoff:.5)),s.normalTexture!==void 0&&o!==Kn&&(l.push(e.assignTexture(a,"normalMap",s.normalTexture)),a.normalScale=new Wt(1,1),s.normalTexture.scale!==void 0)){const f=s.normalTexture.scale;a.normalScale.set(f,f)}if(s.occlusionTexture!==void 0&&o!==Kn&&(l.push(e.assignTexture(a,"aoMap",s.occlusionTexture)),s.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=s.occlusionTexture.strength)),s.emissiveFactor!==void 0&&o!==Kn){const f=s.emissiveFactor;a.emissive=new Lt().setRGB(f[0],f[1],f[2],ze)}return s.emissiveTexture!==void 0&&o!==Kn&&l.push(e.assignTexture(a,"emissiveMap",s.emissiveTexture,ae)),Promise.all(l).then(function(){const f=new o(a);return s.name&&(f.name=s.name),qn(f,s),e.associations.set(f,{materials:t}),s.extensions&&Ri(r,f,s),f})}createUniqueName(t){const e=se.sanitizeNodeName(t||"");return e in this.nodeNamesUsed?e+"_"+ ++this.nodeNamesUsed[e]:(this.nodeNamesUsed[e]=0,e)}loadGeometries(t){const e=this,n=this.extensions,r=this.primitiveCache;function s(a){return n[jt.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,e).then(function(c){return hh(c,a,e)})}const o=[];for(let a=0,c=t.length;a<c;a++){const l=t[a],u=X1(l),f=r[u];if(f)o.push(f.promise);else{let h;l.extensions&&l.extensions[jt.KHR_DRACO_MESH_COMPRESSION]?h=s(l):h=hh(new _e,l,e),r[u]={primitive:l,promise:h},o.push(h)}}return Promise.all(o)}loadMesh(t){const e=this,n=this.json,r=this.extensions,s=n.meshes[t],o=s.primitives,a=[];for(let c=0,l=o.length;c<l;c++){const u=o[c].material===void 0?H1(this.cache):this.getDependency("material",o[c].material);a.push(u)}return a.push(e.loadGeometries(o)),Promise.all(a).then(function(c){const l=c.slice(0,c.length-1),u=c[c.length-1],f=[];for(let d=0,g=u.length;d<g;d++){const _=u[d],m=o[d];let p;const v=l[d];if(m.mode===rn.TRIANGLES||m.mode===rn.TRIANGLE_STRIP||m.mode===rn.TRIANGLE_FAN||m.mode===void 0)p=s.isSkinnedMesh===!0?new ny(_,v):new ne(_,v),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),m.mode===rn.TRIANGLE_STRIP?p.geometry=Kf(p.geometry,ed):m.mode===rn.TRIANGLE_FAN&&(p.geometry=Kf(p.geometry,Xc));else if(m.mode===rn.LINES)p=new sy(_,v);else if(m.mode===rn.LINE_STRIP)p=new wl(_,v);else if(m.mode===rn.LINE_LOOP)p=new oy(_,v);else if(m.mode===rn.POINTS)p=new Qo(_,v);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(p.geometry.morphAttributes).length>0&&W1(p,s),p.name=e.createUniqueName(s.name||"mesh_"+t),qn(p,s),m.extensions&&Ri(r,p,m),e.assignFinalMaterial(p),f.push(p)}for(let d=0,g=f.length;d<g;d++)e.associations.set(f[d],{meshes:t,primitives:d});if(f.length===1)return s.extensions&&Ri(r,f[0],s),f[0];const h=new Oe;s.extensions&&Ri(r,h,s),e.associations.set(h,{meshes:t});for(let d=0,g=f.length;d<g;d++)h.add(f[d]);return h})}loadCamera(t){let e;const n=this.json.cameras[t],r=n[n.type];if(!r){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?e=new ke(z0.radToDeg(r.yfov),r.aspectRatio||1,r.znear||1,r.zfar||2e6):n.type==="orthographic"&&(e=new yl(-r.xmag,r.xmag,r.ymag,-r.ymag,r.znear,r.zfar)),n.name&&(e.name=this.createUniqueName(n.name)),qn(e,n),Promise.resolve(e)}loadSkin(t){const e=this.json.skins[t],n=[];for(let r=0,s=e.joints.length;r<s;r++)n.push(this._loadNodeShallow(e.joints[r]));return e.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",e.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(r){const s=r.pop(),o=r,a=[],c=[];for(let l=0,u=o.length;l<u;l++){const f=o[l];if(f){a.push(f);const h=new It;s!==null&&h.fromArray(s.array,l*16),c.push(h)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',e.joints[l])}return new Tl(a,c)})}loadAnimation(t){const e=this.json,n=this,r=e.animations[t],s=r.name?r.name:"animation_"+t,o=[],a=[],c=[],l=[],u=[];for(let f=0,h=r.channels.length;f<h;f++){const d=r.channels[f],g=r.samplers[d.sampler],_=d.target,m=_.node,p=r.parameters!==void 0?r.parameters[g.input]:g.input,v=r.parameters!==void 0?r.parameters[g.output]:g.output;_.node!==void 0&&(o.push(this.getDependency("node",m)),a.push(this.getDependency("accessor",p)),c.push(this.getDependency("accessor",v)),l.push(g),u.push(_))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c),Promise.all(l),Promise.all(u)]).then(function(f){const h=f[0],d=f[1],g=f[2],_=f[3],m=f[4],p=[];for(let v=0,M=h.length;v<M;v++){const x=h[v],b=d[v],S=g[v],A=_[v],T=m[v];if(x===void 0)continue;x.updateMatrix&&x.updateMatrix();const y=n._createAnimationTracks(x,b,S,A,T);if(y)for(let E=0;E<y.length;E++)p.push(y[E])}return new Iy(s,void 0,p)})}createNodeMesh(t){const e=this.json,n=this,r=e.nodes[t];return r.mesh===void 0?null:n.getDependency("mesh",r.mesh).then(function(s){const o=n._getNodeRef(n.meshCache,r.mesh,s);return r.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let c=0,l=r.weights.length;c<l;c++)a.morphTargetInfluences[c]=r.weights[c]}),o})}loadNode(t){const e=this.json,n=this,r=e.nodes[t],s=n._loadNodeShallow(t),o=[],a=r.children||[];for(let l=0,u=a.length;l<u;l++)o.push(n.getDependency("node",a[l]));const c=r.skin===void 0?Promise.resolve(null):n.getDependency("skin",r.skin);return Promise.all([s,Promise.all(o),c]).then(function(l){const u=l[0],f=l[1],h=l[2];h!==null&&u.traverse(function(d){d.isSkinnedMesh&&d.bind(h,j1)});for(let d=0,g=f.length;d<g;d++)u.add(f[d]);return u})}_loadNodeShallow(t){const e=this.json,n=this.extensions,r=this;if(this.nodeCache[t]!==void 0)return this.nodeCache[t];const s=e.nodes[t],o=s.name?r.createUniqueName(s.name):"",a=[],c=r._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(t)});return c&&a.push(c),s.camera!==void 0&&a.push(r.getDependency("camera",s.camera).then(function(l){return r._getNodeRef(r.cameraCache,s.camera,l)})),r._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(t)}).forEach(function(l){a.push(l)}),this.nodeCache[t]=Promise.all(a).then(function(l){let u;if(s.isBone===!0?u=new yd:l.length>1?u=new Oe:l.length===1?u=l[0]:u=new me,u!==l[0])for(let f=0,h=l.length;f<h;f++)u.add(l[f]);if(s.name&&(u.userData.name=s.name,u.name=o),qn(u,s),s.extensions&&Ri(n,u,s),s.matrix!==void 0){const f=new It;f.fromArray(s.matrix),u.applyMatrix4(f)}else s.translation!==void 0&&u.position.fromArray(s.translation),s.rotation!==void 0&&u.quaternion.fromArray(s.rotation),s.scale!==void 0&&u.scale.fromArray(s.scale);return r.associations.has(u)||r.associations.set(u,{}),r.associations.get(u).nodes=t,u}),this.nodeCache[t]}loadScene(t){const e=this.extensions,n=this.json.scenes[t],r=this,s=new Oe;n.name&&(s.name=r.createUniqueName(n.name)),qn(s,n),n.extensions&&Ri(e,s,n);const o=n.nodes||[],a=[];for(let c=0,l=o.length;c<l;c++)a.push(r.getDependency("node",o[c]));return Promise.all(a).then(function(c){for(let u=0,f=c.length;u<f;u++)s.add(c[u]);const l=u=>{const f=new Map;for(const[h,d]of r.associations)(h instanceof In||h instanceof Ae)&&f.set(h,d);return u.traverse(h=>{const d=r.associations.get(h);d!=null&&f.set(h,d)}),f};return r.associations=l(s),s})}_createAnimationTracks(t,e,n,r,s){const o=[],a=t.name?t.name:t.uuid,c=[];di[s.path]===di.weights?t.traverse(function(h){h.morphTargetInfluences&&c.push(h.name?h.name:h.uuid)}):c.push(a);let l;switch(di[s.path]){case di.weights:l=wr;break;case di.rotation:l=Rr;break;case di.position:case di.scale:l=Cr;break;default:switch(n.itemSize){case 1:l=wr;break;case 2:case 3:default:l=Cr;break}break}const u=r.interpolation!==void 0?k1[r.interpolation]:_s,f=this._getArrayFromAccessor(n);for(let h=0,d=c.length;h<d;h++){const g=new l(c[h]+"."+di[s.path],e.array,f,u);r.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),o.push(g)}return o}_getArrayFromAccessor(t){let e=t.array;if(t.normalized){const n=el(e.constructor),r=new Float32Array(e.length);for(let s=0,o=e.length;s<o;s++)r[s]=e[s]*n;e=r}return e}_createCubicSplineTrackInterpolant(t){t.createInterpolant=function(n){const r=this instanceof Rr?G1:kd;return new r(this.times,this.values,this.getValueSize()/3,n)},t.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function Y1(i,t,e){const n=t.attributes,r=new cn;if(n.POSITION!==void 0){const a=e.json.accessors[n.POSITION],c=a.min,l=a.max;if(c!==void 0&&l!==void 0){if(r.set(new z(c[0],c[1],c[2]),new z(l[0],l[1],l[2])),a.normalized){const u=el(vr[a.componentType]);r.min.multiplyScalar(u),r.max.multiplyScalar(u)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const s=t.targets;if(s!==void 0){const a=new z,c=new z;for(let l=0,u=s.length;l<u;l++){const f=s[l];if(f.POSITION!==void 0){const h=e.json.accessors[f.POSITION],d=h.min,g=h.max;if(d!==void 0&&g!==void 0){if(c.setX(Math.max(Math.abs(d[0]),Math.abs(g[0]))),c.setY(Math.max(Math.abs(d[1]),Math.abs(g[1]))),c.setZ(Math.max(Math.abs(d[2]),Math.abs(g[2]))),h.normalized){const _=el(vr[h.componentType]);c.multiplyScalar(_)}a.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}r.expandByVector(a)}i.boundingBox=r;const o=new Un;r.getCenter(o.center),o.radius=r.min.distanceTo(r.max)/2,i.boundingSphere=o}function hh(i,t,e){const n=t.attributes,r=[];function s(o,a){return e.getDependency("accessor",o).then(function(c){i.setAttribute(a,c)})}for(const o in n){const a=tl[o]||o.toLowerCase();a in i.attributes||r.push(s(n[o],a))}if(t.indices!==void 0&&!i.index){const o=e.getDependency("accessor",t.indices).then(function(a){i.setIndex(a)});r.push(o)}return Yt.workingColorSpace!==ze&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Yt.workingColorSpace}" not supported.`),qn(i,t),Y1(i,t,e),Promise.all(r).then(function(){return t.targets!==void 0?V1(i,t.targets,e):i})}class Z1 extends zy{constructor(t){super(t),this.type=Yn}parse(t){const o=function(T,y){switch(T){case 1:throw new Error("THREE.RGBELoader: Read Error: "+(y||""));case 2:throw new Error("THREE.RGBELoader: Write Error: "+(y||""));case 3:throw new Error("THREE.RGBELoader: Bad File Format: "+(y||""));default:case 4:throw new Error("THREE.RGBELoader: Memory Error: "+(y||""))}},f=function(T,y,E){y=y||1024;let D=T.pos,N=-1,U=0,w="",P=String.fromCharCode.apply(null,new Uint16Array(T.subarray(D,D+128)));for(;0>(N=P.indexOf(`
`))&&U<y&&D<T.byteLength;)w+=P,U+=P.length,D+=128,P+=String.fromCharCode.apply(null,new Uint16Array(T.subarray(D,D+128)));return-1<N?(T.pos+=U+N+1,w+P.slice(0,N)):!1},h=function(T){const y=/^#\?(\S+)/,E=/^\s*GAMMA\s*=\s*(\d+(\.\d+)?)\s*$/,R=/^\s*EXPOSURE\s*=\s*(\d+(\.\d+)?)\s*$/,D=/^\s*FORMAT=(\S+)\s*$/,N=/^\s*\-Y\s+(\d+)\s+\+X\s+(\d+)\s*$/,U={valid:0,string:"",comments:"",programtype:"RGBE",format:"",gamma:1,exposure:1,width:0,height:0};let w,P;for((T.pos>=T.byteLength||!(w=f(T)))&&o(1,"no header found"),(P=w.match(y))||o(3,"bad initial token"),U.valid|=1,U.programtype=P[1],U.string+=w+`
`;w=f(T),w!==!1;){if(U.string+=w+`
`,w.charAt(0)==="#"){U.comments+=w+`
`;continue}if((P=w.match(E))&&(U.gamma=parseFloat(P[1])),(P=w.match(R))&&(U.exposure=parseFloat(P[1])),(P=w.match(D))&&(U.valid|=2,U.format=P[1]),(P=w.match(N))&&(U.valid|=4,U.height=parseInt(P[1],10),U.width=parseInt(P[2],10)),U.valid&2&&U.valid&4)break}return U.valid&2||o(3,"missing format specifier"),U.valid&4||o(3,"missing image size specifier"),U},d=function(T,y,E){const R=y;if(R<8||R>32767||T[0]!==2||T[1]!==2||T[2]&128)return new Uint8Array(T);R!==(T[2]<<8|T[3])&&o(3,"wrong scanline width");const D=new Uint8Array(4*y*E);D.length||o(4,"unable to allocate buffer space");let N=0,U=0;const w=4*R,P=new Uint8Array(4),F=new Uint8Array(w);let O=E;for(;O>0&&U<T.byteLength;){U+4>T.byteLength&&o(1),P[0]=T[U++],P[1]=T[U++],P[2]=T[U++],P[3]=T[U++],(P[0]!=2||P[1]!=2||(P[2]<<8|P[3])!=R)&&o(3,"bad rgbe scanline format");let K=0,tt;for(;K<w&&U<T.byteLength;){tt=T[U++];const dt=tt>128;if(dt&&(tt-=128),(tt===0||K+tt>w)&&o(3,"bad scanline data"),dt){const bt=T[U++];for(let J=0;J<tt;J++)F[K++]=bt}else F.set(T.subarray(U,U+tt),K),K+=tt,U+=tt}const ut=R;for(let dt=0;dt<ut;dt++){let bt=0;D[N]=F[dt+bt],bt+=R,D[N+1]=F[dt+bt],bt+=R,D[N+2]=F[dt+bt],bt+=R,D[N+3]=F[dt+bt],N+=4}O--}return D},g=function(T,y,E,R){const D=T[y+3],N=Math.pow(2,D-128)/255;E[R+0]=T[y+0]*N,E[R+1]=T[y+1]*N,E[R+2]=T[y+2]*N,E[R+3]=1},_=function(T,y,E,R){const D=T[y+3],N=Math.pow(2,D-128)/255;E[R+0]=Bs.toHalfFloat(Math.min(T[y+0]*N,65504)),E[R+1]=Bs.toHalfFloat(Math.min(T[y+1]*N,65504)),E[R+2]=Bs.toHalfFloat(Math.min(T[y+2]*N,65504)),E[R+3]=Bs.toHalfFloat(1)},m=new Uint8Array(t);m.pos=0;const p=h(m),v=p.width,M=p.height,x=d(m.subarray(m.pos),v,M);let b,S,A;switch(this.type){case $e:A=x.length/4;const T=new Float32Array(A*4);for(let E=0;E<A;E++)g(x,E*4,T,E*4);b=T,S=$e;break;case Yn:A=x.length/4;const y=new Uint16Array(A*4);for(let E=0;E<A;E++)_(x,E*4,y,E*4);b=y,S=Yn;break;default:throw new Error("THREE.RGBELoader: Unsupported type: "+this.type)}return{width:v,height:M,data:b,header:p.string,gamma:p.gamma,exposure:p.exposure,type:S}}setDataType(t){return this.type=t,this}load(t,e,n,r){function s(o,a){switch(o.type){case $e:case Yn:o.colorSpace=ze,o.minFilter=Pe,o.magFilter=Pe,o.generateMipmaps=!1,o.flipY=!0;break}e&&e(o,a)}return super.load(t,s,n,r)}}const Ye=Object.freeze([Object.freeze({nome:"Rosso Cerano",primario:11013914,secondario:1184274}),Object.freeze({nome:"Giallo Ticino",primario:15773696,secondario:1315860}),Object.freeze({nome:"Blu Notte",primario:860759,secondario:14211288}),Object.freeze({nome:"Verde Risaia",primario:745011,secondario:15658730}),Object.freeze({nome:"Bianco Perla",primario:15329764,secondario:1710618}),Object.freeze({nome:"Grafite",primario:2566703,secondario:12061988}),Object.freeze({nome:"Arancio Tramonto",primario:16735758,secondario:1447446}),Object.freeze({nome:"Azzurro Roggia",primario:2328272,secondario:16053492}),Object.freeze({nome:"Viola Vigna",primario:5052023,secondario:15909403}),Object.freeze({nome:"Nero Asfalto",primario:723724,secondario:16732672})]),K1=9,J1=55,Q1=16,tE=13,go=56,eE=/^(Interior|BodyWindshieldWipers|BodyHoodInterior|Engine|Axles)/,dh=/^Wheel(Front|Rear)(L|R)$/,nE=/BrakePad$/;function iE(i,t){const e=i.geometry.clone(),n=new It().multiplyMatrices(t,i.matrixWorld);if(e.applyMatrix4(n),n.determinant()<0){const r=e.index;if(r)for(let s=0;s<r.count;s+=3){const o=r.getX(s+1);r.setX(s+1,r.getX(s+2)),r.setX(s+2,o)}}return e}function rE(i){const t=["position","normal","uv","uv1"],e=i.map(s=>{s.attributes.normal||s.computeVertexNormals(),s.attributes.uv||s.setAttribute("uv",new Zt(new Float32Array(s.attributes.position.count*2),2)),s.attributes.uv1||s.setAttribute("uv1",s.attributes.uv.clone());for(const o of Object.keys(s.attributes))t.includes(o)||s.deleteAttribute(o);return s.morphAttributes={},s}),n=e.every(s=>s.index)?e:e.map(s=>s.index?s.toNonIndexed():s),r=qi(n,!1);return r.computeBoundingSphere(),r}function _o(i,t){const e=new Map;for(const n of i){const r=Array.isArray(n.material)?n.material:[n.material];if(r.length!==1)continue;const s=r[0];e.has(s)||e.set(s,[]),e.get(s).push(iE(n,t))}return[...e].map(([n,r])=>({materiale:n,geometria:rE(r)}))}function ph(i,t){return new un({color:t?329482:724498,metalness:0,roughness:.04,transparent:!0,opacity:t?.82:.42,envMap:i,envMapIntensity:1.6,side:He,depthWrite:!1,clearcoat:1,clearcoatRoughness:.02})}function mh(i,t,e){const n=new un({color:t,metalness:.25,roughness:.42,clearcoat:1,clearcoatRoughness:.04,normalMap:i.normalMap??null,normalScale:new Wt(.05,.05),aoMap:i.aoMap??null,aoMapIntensity:.85,envMap:e,envMapIntensity:.62});return n.normalMap&&(n.normalMap=n.normalMap.clone(),n.normalMap.wrapS=an,n.normalMap.wrapT=an,n.normalMap.repeat.set(30,30),n.normalMap.needsUpdate=!0),n}function sE(i,t,e,n){const r=i.filter(m=>/Rim/.test(m.materiale.name)).map(m=>new cn().setFromBufferAttribute(m.geometria.attributes.position)),s=r.length?Math.max(...r.map(m=>m.max.x)):.12,o=r.length?Math.min(...r.map(m=>m.min.x)):-.1,a=r.length?Math.max(...r.map(m=>m.max.y))*.97:.3,c=new ye(a,a,s-o,28,1,!0);c.rotateZ(Math.PI/2),c.translate((s+o)/2,0,0);const l=[];for(let m=0;m<5;m++)for(const p of[-.11,.11]){const v=new be(.035,a*.82,.04);v.translate(0,a*.5,0),v.rotateX(m*2*Math.PI/5+p),v.translate(s-.035,0,0),l.push(v)}const u=new ye(a*.24,a*.26,.06,14);u.rotateZ(Math.PI/2),u.translate(s-.04,0,0),l.push(u);const f=qi(l.map(m=>m.toNonIndexed()),!1),h=i.filter(m=>!/Rim/.test(m.materiale.name)),d=t[0],g=new cn().setFromBufferAttribute(d.geometria.attributes.position).getCenter(new z),_=new be(.07,.2,.13);return _.translate(g.x,g.y,g.z),{gira:[...h,{geometria:c,materiale:e},{geometria:f,materiale:n}],ferme:[{geometria:_,materiale:d.materiale}]}}function oE(){const i=document.createElement("canvas");i.width=128,i.height=128;const t=i.getContext("2d"),e=t.createRadialGradient(64,64,4,64,64,64);e.addColorStop(0,"rgba(0,0,0,0.85)"),e.addColorStop(.55,"rgba(0,0,0,0.55)"),e.addColorStop(1,"rgba(0,0,0,0)"),t.fillStyle=e,t.fillRect(0,0,128,128);const n=new ni(i);n.colorSpace=ae;const r=new ln(2.7,5.2);return r.rotateX(-Math.PI/2),{geo:r,mat:new Kn({map:n,transparent:!0,depthWrite:!1,opacity:.75,polygonOffset:!0,polygonOffsetFactor:-2})}}async function aE(i){try{const[t,e]=await Promise.all([fetch(`${i}.json`).then(r=>r.ok?r.json():null),fetch(`${i}.bin`).then(r=>r.ok?r.arrayBuffer():null)]);if(!t||!e)return null;const n=([r,s],o)=>new o(e,r,s);return new Map(t.pezzi.map(r=>{if(r.tenuto)return[r.chiave,null];const s=new _e;return s.setAttribute("position",new fe(n(r.posizioni,Float32Array),3)),s.setAttribute("normal",new fe(n(r.normali,Float32Array),3)),r.indici&&s.setIndex(new fe(n(r.indici,Uint32Array),1)),s.computeBoundingSphere(),[r.chiave,s]}))}catch{return null}}async function cE(i,t,{modello:e="./modelli/concept.glb",cielo:n="./cielo/tramonto.hdr",semplice:r="./modelli/concept-lod",quota:s=()=>0}={}){var C,X,nt;const[o,a,c]=await Promise.all([new m1().loadAsync(e),new Z1().loadAsync(n),r?aE(r):null]),l=new Go(i),u=l.fromEquirectangular(a).texture;a.dispose(),l.dispose();const f=o.scene;f.updateMatrixWorld(!0);const h=new It,d=[],g=[],_=[];f.traverse(W=>{dh.test(W.name)&&_.push(W)});const m=W=>{for(let q=W;q;q=q.parent)if(dh.test(q.name))return!0;return!1},p=W=>{for(let q=W;q;q=q.parent)if(eE.test(q.name))return!0;return!1};f.traverse(W=>{!W.isMesh||m(W)||(p(W)?g:d).push(W)});const v=W=>W.name||"finiture",M=_o(d,h),x=_o(g,h);for(const W of[...M,...x]){const q=W.materiale;q.isMeshStandardMaterial&&(q.envMap=u,q.envMapIntensity=1),W.chiave=v(q)}const b=new Map,S=(W,q)=>(b.has(W)||b.set(W,q()),b.get(W)),A=_.find(W=>W.name==="WheelFrontL"),T=A.matrixWorld.clone().invert(),y=[],E=[];A.traverse(W=>{W.isMesh&&(nE.test(W.name)?E:y).push(W)});const R=_o(y,T),D=_o(E,T),U=new cn().setFromBufferAttribute(D[0].geometria.attributes.position).getCenter(new z).x<0?1:-1,w=new It().makeRotationY(U>0?0:Math.PI);for(const W of[...R,...D])W.geometria.applyMatrix4(w),W.materiale.isMeshStandardMaterial&&(W.materiale.envMap=u);const P=_.map(W=>{const q=new z().setFromMatrixPosition(W.matrixWorld);return{nome:W.name,x:q.x,y:q.y,z:q.z,davanti:/Front/.test(W.name),sinistra:/L$/.test(W.name)}}),F=((C=R.find(W=>/Tiretread/.test(W.materiale.name)))==null?void 0:C.materiale)??new qt({color:1118481,roughness:.7}),O=((X=R.find(W=>/Rim1/.test(W.materiale.name)))==null?void 0:X.materiale)??new qt({color:2236962,metalness:1,roughness:.3}),K=((nt=R.find(W=>/Rim2/.test(W.materiale.name)))==null?void 0:nt.materiale)??O,tt=st.raggioRuota,ut=new ye(tt,tt,.27,22,1,!1);ut.rotateZ(Math.PI/2);const dt=new ye(tt*.72,tt*.72,.02,18);dt.rotateZ(Math.PI/2),dt.translate(.125,0,0);const bt=sE(R,D,O,K),J=(W,q)=>W.map(at=>{const Z=new _r(at.geometria,at.materiale,go);return Z.count=0,Z.frustumCulled=!1,Z.castShadow=q,Z.instanceMatrix.setUsage(ts),t.add(Z),Z}),it=J(R,!1),_t=J(D,!1),ft=J(bt.gira,!1),At=J(bt.ferme,!1),Rt=J([{geometria:ut,materiale:F},{geometria:dt,materiale:O}],!1),Dt=oE(),Gt=new Set,zt=new It,he=new It,V=new It,qe=new It,$t=new It().makeRotationY(Math.PI),Xt=new z;function Pt(W,{pieno:q=!1}={}){var ct,Q;const at=new Oe,Z=new Oe;at.add(Z);const ot=new Oe;ot.position.z=-st.baricentroModello,Z.add(ot);const Ot=mh(((ct=M.find(j=>/^Paint 1/.test(j.chiave)))==null?void 0:ct.materiale)??{},W.primario,u),rt=mh(((Q=M.find(j=>/^Paint 2/.test(j.chiave)))==null?void 0:Q.materiale)??{},W.secondario,u);rt.metalness=.3,rt.roughness=.38;const gt=new qt({color:2228224,emissive:16718352,emissiveIntensity:.6,roughness:.35}),Mt=new qt({color:W.primario,metalness:.3,roughness:.3,envMap:u,envMapIntensity:.6}),wt=new qt({color:W.secondario,metalness:.3,roughness:.38,envMap:u,envMapIntensity:.6}),xt=new Oe,Ut=new Oe;if(ot.add(xt,Ut),Ut.visible=!1,c&&!q)for(const j of M){const pt=c.get(j.chiave)??j.geometria;let ht;/^Paint 1/.test(j.chiave)?ht=Mt:/^Paint 2/.test(j.chiave)?ht=wt:/^Glass/.test(j.chiave)?ht=S("vetro-scuro",()=>ph(u,!0)):/^Brakelight/.test(j.chiave)?ht=gt:c.get(j.chiave)?ht=S(`lod-${j.chiave}`,()=>new qt({color:j.materiale.color,roughness:j.materiale.roughness??.5,metalness:j.materiale.metalness??0,envMap:u})):ht=j.materiale;const Ft=new ne(pt,ht);Ft.matrixAutoUpdate=!1,Ut.add(Ft)}const Nt=[];for(const j of[...M,...q?x:[]]){let pt=j.materiale;/^Paint 1/.test(j.chiave)?pt=q?Ot:Mt:/^Paint 2/.test(j.chiave)?pt=q?rt:wt:/^Glass/.test(j.chiave)?pt=S(q?"vetro":"vetro-scuro",()=>ph(u,!q)):/^Brakelight/.test(j.chiave)&&(pt=gt);const ht=new ne(j.geometria,pt);ht.castShadow=!/^Glass/.test(j.chiave),ht.receiveShadow=!1,ht.matrixAutoUpdate=!1,xt.add(ht),Nt.push(ht)}const Kt=new ne(Dt.geo,Dt.mat);Kt.position.y=.03,Kt.renderOrder=-1,at.add(Kt),t.add(at);const B={gruppo:at,cassa:Z,livrea:W,stato:null,visibile:!0,beccheggio:0,rollio:0,imposta(j){this.stato=j},colora(j){this.livrea=j,Ot.color.setHex(j.primario),rt.color.setHex(j.secondario),Mt.color.setHex(j.primario),wt.color.setHex(j.secondario)},rimuovi(){var j,pt;t.remove(at),Gt.delete(B),(j=Ot.normalMap)==null||j.dispose(),(pt=rt.normalMap)==null||pt.dispose(),Ot.dispose(),rt.dispose(),Mt.dispose(),wt.dispose(),gt.dispose()},mesh:Nt,frenata:gt,pieno:q,alto:xt,basso:Ut,semplificata:!1,ombre:null};return Gt.add(B),B}function ce(W,q){W.getWorldPosition(Xt);const at=[0,0,0];for(const Z of Gt){const ot=Z.stato;if(!ot||!Z.visibile){Z.gruppo.visible=!1;continue}Z.gruppo.visible=!0;const Ot=s(ot.x,ot.z);Z.altezza=Z.altezza===void 0||Math.abs(Ot-Z.altezza)>1?Ot:Z.altezza+(Ot-Z.altezza)*Math.min(1,q*14),Z.gruppo.position.set(ot.x,Z.altezza,ot.z),Z.gruppo.rotation.set(0,ot.yaw,0);const rt=Math.min(1,q*7);Z.beccheggio+=(Math.max(-.045,Math.min(.045,(ot.ax??0)*.0045))-Z.beccheggio)*rt,Z.rollio+=(Math.max(-.05,Math.min(.05,-(ot.ay??0)*.0042))-Z.rollio)*rt,Z.cassa.rotation.set(Z.beccheggio,0,Z.rollio),Z.frenata.emissiveIntensity=(ot.freno??0)>.05?4.5:.7,Z.gruppo.updateMatrixWorld(!0);const gt=Xt.distanceTo(Z.gruppo.position),Mt=c!==null&&!Z.pieno&&gt>tE;Z.semplificata!==Mt&&(Z.semplificata=Mt,Z.alto.visible=!Mt,Z.basso.visible=Mt);const wt=Z.pieno&&gt<Q1;if(Z.ombre!==wt){Z.ombre=wt;for(const Ut of Z.mesh)Ut.castShadow=wt&&Ut.material.opacity===1}const xt=Z.pieno&&gt<K1?0:gt<J1?1:2;for(const Ut of P){he.makeTranslation(Ut.x,Ut.y,Ut.z-st.baricentroModello),Ut.davanti&&he.multiply(qe.makeRotationY(ot.angoloSterzo??0));const Nt=zt.multiplyMatrices(Z.gruppo.matrixWorld,he);Ut.sinistra||Nt.multiply($t);const Kt=(ot.ruote??0)*(Ut.sinistra?1:-1),B=V.makeRotationX(Kt).premultiply(Nt);if(xt===0&&at[0]<go){for(const ct of it)ct.setMatrixAt(at[0],B);for(const ct of _t)ct.setMatrixAt(at[0],Nt);at[0]+=1}else if(xt<=1&&at[1]<go){for(const ct of ft)ct.setMatrixAt(at[1],B);for(const ct of At)ct.setMatrixAt(at[1],Nt);at[1]+=1}else if(at[2]<go){for(const ct of Rt)ct.setMatrixAt(at[2],B);at[2]+=1}}}[[it,0],[_t,0],[ft,1],[At,1],[Rt,2]].forEach(([Z,ot])=>{for(const Ot of Z)Ot.count=at[ot],Ot.instanceMatrix.needsUpdate=!0})}function Ct(W){const q=[];for(const Z of Gt)q.push([Z,Z.gruppo.visible,Z.alto.visible,Z.basso.visible]),Z.gruppo.visible=!0,Z.alto.visible=!0,Z.basso.visible=!0;const at=[...it,..._t,...ft,...At,...Rt].map(Z=>[Z,Z.count]);for(const[Z]of at)Z.count=1;i.compile(t,W);for(const[Z,ot]of at)Z.count=ot;for(const[Z,ot,Ot,rt]of q)Z.gruppo.visible=ot,Z.alto.visible=Ot,Z.basso.visible=rt}const L=W=>W.reduce((q,at)=>q+(at.geometria.index?at.geometria.index.count:at.geometria.attributes.position.count)/3,0);return{crea:Pt,aggiorna:ce,precompila:Ct,ambiente:u,pezziCarrozzeria:()=>M,statistiche:()=>({esterno:Math.round(L(M)),interno:Math.round(L(x)),ruota:Math.round(L(R)+L(D)),disegniCarrozzeria:M.length})}}const jr=Object.freeze([[-.3,0],[-.3,.08],[-.17,.27],[-.08,.82],[.08,.82],[.17,.27],[.3,.08],[.3,0]]),lE=2,uE=6,fE=.012,hE=1/70,dE=1.1,Ja=7,gh=.95,pE=42,$r=6.2,mE=Object.freeze(["TICINO RACING","ROGGIA MOTOR OIL","GOMME LAMPO","RISO DORATO","CAFFÈ DEL TRAMONTO","BORGO SPORT","FRENI SAETTA","CERANO GP"]);function fs(i,t,e){const n=document.createElement("canvas");n.width=i,n.height=t,e(n.getContext("2d"),i,t);const r=new ni(n);return r.colorSpace=ae,r.anisotropy=4,r}function gE(i){if(i.length<3)return i;const t=[i[0]];let e=i[0];for(let n=1;n<i.length-1;n++){const r=i[n],s=i[n+1],o=Math.atan2(r[0]-e[0],r[1]-e[1]);let c=Math.atan2(s[0]-r[0],s[1]-r[1])-o;for(;c>Math.PI;)c-=2*Math.PI;for(;c<-Math.PI;)c+=2*Math.PI;(Math.abs(c)>fE||Math.hypot(r[0]-e[0],r[1]-e[1])>uE)&&(t.push(r),e=r)}return t.push(i[i.length-1]),t}function _E(i){const t=[],e=[],n=[],r=[];for(const o of i){const a=gE(o.punti);if(a.length<2)continue;let c=0;const l=t.length/3;for(let f=0;f<a.length;f++){const h=a[Math.max(0,f-1)],d=a[Math.min(a.length-1,f+1)],g=d[0]-h[0],_=d[1]-h[1],m=Math.hypot(g,_)||1,p=o.lato*_/m,v=-o.lato*g/m;f>0&&(c+=Math.hypot(a[f][0]-a[f-1][0],a[f][1]-a[f-1][1])),jr.forEach(([M,x],b)=>{t.push(a[f][0]+p*M,x,a[f][1]+v*M);const S=jr[Math.max(0,b-1)],A=jr[Math.min(jr.length-1,b+1)],T=A[0]-S[0],y=A[1]-S[1],E=Math.hypot(T,y)||1,R=y/E,D=-T/E;e.push(p*-R,-D,v*-R),n.push(c/(lE*2),x/.82)})}const u=jr.length;for(let f=0;f<a.length-1;f++)for(let h=0;h<u-1;h++){const d=l+f*u+h,g=d+u;r.push(d,g,d+1,d+1,g,g+1)}}const s=new _e;return s.setAttribute("position",new Zt(t,3)),s.setAttribute("normal",new Zt(e,3)),s.setAttribute("uv",new Zt(n,2)),s.setIndex(r),s.computeBoundingSphere(),s}function xE(){const i=fs(256,64,(t,e,n)=>{t.fillStyle="#b8161c",t.fillRect(0,0,e/2,n),t.fillStyle="#e9e7e1",t.fillRect(e/2,0,e/2,n);for(let s=0;s<900;s++)t.fillStyle=`rgba(${Math.random()<.5?"0,0,0":"255,255,255"},${Math.random()*.05})`,t.fillRect(Math.random()*e,Math.random()*n,2+Math.random()*6,1+Math.random()*3);const r=t.createLinearGradient(0,n,0,n*.55);r.addColorStop(0,"rgba(40,32,24,0.55)"),r.addColorStop(1,"rgba(40,32,24,0)"),t.fillStyle=r,t.fillRect(0,0,e,n),t.fillStyle="rgba(0,0,0,0.35)",t.fillRect(0,0,2,n),t.fillRect(e/2,0,2,n)});return i.wrapS=an,i.flipY=!1,new qt({map:i,roughness:.82,metalness:0,side:He})}function nl(i,t,e,n,r,s=.025){const o=[],a=[],c=[],u=Math.max(1,Math.round((e-t)/.5));for(let h=0;h<=u;h++){const d=t+(e-t)*h/u,g=i.punto(d),_=Math.hypot(g.tx,g.tz)||1,m=g.tz/_,p=-g.tx/_,v=typeof n=="function"?n(g):n,M=typeof r=="function"?r(g):r;if(o.push(g.x+m*v,s,g.z+p*v,g.x+m*M,s,g.z+p*M),a.push((d-t)/1,0,(d-t)/1,1),h<u){const x=h*2;c.push(x,x+2,x+1,x+1,x+2,x+3)}}const f=new _e;return f.setAttribute("position",new Zt(o,3)),f.setAttribute("uv",new Zt(a,2)),f.setIndex(c),f.computeVertexNormals(),f}function _h(i,t={}){return new qt({map:i,transparent:!0,roughness:.75,polygonOffset:!0,polygonOffsetFactor:-3,polygonOffsetUnits:-3,depthWrite:!1,...t})}function vE(i,t,e){const n=[];let r=-1,s=0;const o=a=>{if(r>=0&&(a-r)*i.passo>6){const c=s;n.push(nl(i,r*i.passo,a*i.passo,l=>c*((c>0?l.sinistra:l.destra)-dE),l=>c*(c>0?l.sinistra:l.destra),.03))}r=-1};for(let a=0;a<i.n;a++){const c=i.curva[a],l=Math.sign(c);Math.abs(c)>hE?r<0?(r=a,s=l):l!==s&&(o(a),r=a,s=l):o(a)}o(i.n-1);for(const a of n)t.add(new ne(a,e))}function ME(i,t,e){let n=0;for(const r of i.barriere){let s=0;for(let o=1;o<r.punti.length;o++){const[a,c]=r.punti[o-1],[l,u]=r.punti[o];if(s+=Math.hypot(l-a,u-c),s<pE||o+Ja>=r.punti.length)continue;const f=r.punti[Math.min(r.punti.length-1,o+Ja)],h=f[0]-a,d=f[1]-c,g=Math.hypot(h,d);if(g<Ja*.85)continue;s=0;const _=new ne(new ln(g,gh),e[n++%e.length]),m=r.lato*d/g,p=-r.lato*h/g;_.position.set((a+f[0])/2-m*.05,.82+gh/2+.05,(c+f[1])/2-p*.05),_.rotation.y=Math.atan2(-m,-p),t.add(_)}}}function yE(){const i=["#0b1d3a","#f4f1e8","#111111","#b8161c","#0f5132","#f2b300","#1d1d24","#ffffff"],t=["#ffffff","#b8161c","#f2b300","#ffffff","#ffffff","#111111","#ff5e0e","#0b1d3a"];return mE.map((e,n)=>new qt({side:He,roughness:.6,map:fs(1024,140,(r,s,o)=>{r.fillStyle=i[n],r.fillRect(0,0,s,o),r.fillStyle=t[n],r.font=`italic 900 ${o*.62}px "Arial Black", Arial, sans-serif`,r.textAlign="center",r.textBaseline="middle",r.fillText(e,s/2,o*.54),r.fillRect(0,0,s,o*.05),r.fillRect(0,o*.95,s,o*.05)})}))}function SE(i,t){const e=new Oe;e.name=`pista-${t.id}`;const n=new ne(_E(t.barriere),xE());n.receiveShadow=!0,n.castShadow=!0,e.add(n);const r=_h(fs(128,32,(b,S,A)=>{b.fillStyle="#c4161c",b.fillRect(0,0,S/2,A),b.fillStyle="#f3f1ea",b.fillRect(S/2,0,S/2,A)}),{transparent:!1,depthWrite:!0});r.map.wrapS=an,r.map.repeat.set(1/2,1),vE(t,e,r);const s=_h(fs(256,64,(b,S,A)=>{const T=A/4;for(let y=0;y<S/T;y++)for(let E=0;E<4;E++)b.fillStyle=(y+E)%2?"#111":"#f5f5f5",b.fillRect(y*T,E*T,T,T)})),o=new ne(nl(t,-.6,.6,b=>b.sinistra,b=>-b.destra,.028),s);o.geometry.attributes.uv.array.forEach((b,S,A)=>{S%2===1&&(A[S]=b*6)}),e.add(o);const a=new qt({color:15921902,roughness:.7,polygonOffset:!0,polygonOffsetFactor:-3,polygonOffsetUnits:-3});for(const b of t.griglia.slice(0,10)){const S=t.vicino(b.x,b.z);for(const[A,T,y,E]of[[b.s+2.1,b.s+2.4,S.laterale-1.2,S.laterale+1.2],[b.s-.6,b.s+2.4,S.laterale-1.2,S.laterale-1.05],[b.s-.6,b.s+2.4,S.laterale+1.05,S.laterale+1.2]])e.add(new ne(nl(t,A,T,y,E,.026),a))}ME(t,e,yE());const c=t.punto(0),l=Math.atan2(c.tx,c.tz),u=new Oe;u.position.set(c.x,0,c.z),u.rotation.y=l;const f=new qt({color:2830134,metalness:.8,roughness:.45}),h=c.sinistra+.9,d=c.destra+.9;for(const b of[h,-d]){const S=new ne(new be(.45,$r,.45),f);S.position.set(b,$r/2,0),S.castShadow=!0,u.add(S)}const g=h+d,_=new ne(new be(g+.45,1.1,.5),f);_.position.set((h-d)/2,$r-.3,0),_.castShadow=!0,u.add(_);const m=new ne(new ln(g*.92,.95),new qt({map:fs(1024,96,(b,S,A)=>{b.fillStyle="#0d0f14",b.fillRect(0,0,S,A),b.fillStyle="#ffffff",b.font=`italic 900 ${A*.6}px "Arial Black", Arial, sans-serif`,b.textAlign="center",b.textBaseline="middle",b.fillText("GRAN PREMIO DI CERANO",S/2,A*.53),b.fillStyle="#ff2d2d",b.fillRect(0,A-6,S,6)}),roughness:.5,side:He}));m.position.set((h-d)/2,$r-.3,-.27),m.rotation.y=Math.PI,u.add(m);const p=new qt({color:1705221,emissive:0,roughness:.3}),v=new qt({color:4194304,emissive:16716293,emissiveIntensity:6,roughness:.3}),M=new qt({color:13056,emissive:1703740,emissiveIntensity:5,roughness:.3}),x=[];for(let b=0;b<5;b++){const S=new ne(new Hi(.2,16,10),p);S.position.set((h-d)/2+(b-2)*.62,$r-1.15,-.1),u.add(S),x.push(S)}return e.add(u),i.add(e),e.visible=!1,{gruppo:e,mostra(b){e.visible=b},semafori(b,S=!1){x.forEach((A,T)=>{A.material=S?M:T<b?v:p})}}}const il=Object.freeze(["inseguimento","lontana","cofano","abitacolo"]),xh=Object.freeze({inseguimento:[5.9,1.8],lontana:[8.8,2.7]}),EE=Object.freeze([0,1.16,.95]),bE=Object.freeze([0,1.07,.36]),AE=62,TE=.2,wE=15,vh=7.4,RE=1.15,CE=-.42,IE=.24,PE=.035,LE=3.2,DE=1.4,Qa=110,UE=3.5,NE=4.2,Mh=i=>Math.atan2(Math.sin(i),Math.cos(i)),OE=i=>i.etichetta==="muro"||i.etichetta==="barriera";function zE(i,t){const e=t.x-i.x,n=t.y-i.y,r=t.z-i.z,s=Math.hypot(e,r);return{yaw:Math.atan2(-e,-r),pitch:Math.atan2(n,s)}}function FE(){const i={x:0,y:3,z:-8};let t=0,e=!1,n=0,r=0,s=null,o=0;function a(l,u,f){const h=zE(l,u);return{x:l.x,y:l.y,z:l.z,yaw:h.yaw,pitch:h.pitch,fov:f}}function c(l,u,f=!1){const h=Math.sin(l.yaw),d=Math.cos(l.yaw),g=u[2]-st.baricentroModello,_={x:l.x+h*g+d*u[0],y:u[1]+(l.y??0),z:l.z+d*g-h*u[0]},m=f?-1:1,p={x:_.x+h*20*m,y:_.y-.9,z:_.z+d*20*m};return a(_,p,74)}return{get pronta(){return e},scuoti(l){r=Math.min(1,r+l)},reimposta(){e=!1},insegui(l,u,{modo:f="inseguimento",collisioni:h=null,indietro:d=!1,altre:g=[]}={}){const _=Math.hypot(l.vx,l.vz);if(f==="cofano")return c(l,EE,d);if(f==="abitacolo")return c(l,bE,d);const[m,p]=xh[f]??xh.inseguimento,v=_>4?Math.atan2(l.vx,l.vz):l.yaw,M=l.yaw+Mh(v-l.yaw)*.45+(d?Math.PI:0);e||(t=M,e=!0),t+=Mh(M-t)*(1-Math.exp(-u*(d?30:5.5)));let x=m+Math.min(1.6,_*.022);if(h){const N=h.raggio(l.x,l.z,-Math.sin(t),-Math.cos(t),x+.4,OE);N.colpito&&(x=Math.max(2.2,N.distanza-.4))}const b=l.x-Math.sin(t)*x,S=l.z-Math.cos(t)*x,A=g.some(N=>Math.hypot(N.x-b,N.z-S)<LE);o+=((A?DE:0)-o)*(1-Math.exp(-u*4));const T={x:b,y:p+o+(l.y??0),z:S},y=1-Math.exp(-u*16);i.x+=(T.x-i.x)*y,i.y+=(T.y-i.y)*y,i.z+=(T.z-i.z)*y,Math.hypot(i.x-T.x,i.z-T.z)>6&&Object.assign(i,T),r=Math.max(0,r-u*2.5);const E=r*.12+Math.max(0,_-45)*.0012,R={x:i.x+(Math.random()-.5)*E,y:i.y+(Math.random()-.5)*E,z:i.z+(Math.random()-.5)*E},D={x:l.x+Math.sin(l.yaw)*2.6,y:.85+(l.y??0),z:l.z+Math.cos(l.yaw)*2.6};return a(R,D,AE+Math.min(wE,_*TE))},orbita(l,u){n+=u*PE*Math.PI*2;const f=l.yaw+CE+Math.sin(n)*IE,h={x:l.x+Math.sin(f)*vh,y:RE,z:l.z+Math.cos(f)*vh};return e=!1,a(h,{x:l.x,y:.62,z:l.z},42)},televisione(l,u,f){const h=Math.floor((f+Qa*.35)/Qa);if(!s||s.indice!==h){const _=u.punto(h*Qa),m=h%2?1:-1,p=(m>0?_.sinistra:_.destra)+UE;s={indice:h,x:_.x+m*_.tz*p,y:NE,z:_.z-m*_.tx*p}}const d=Math.hypot(l.x-s.x,l.z-s.z),g=Math.max(14,Math.min(58,2*Math.atan(7/Math.max(1,d))*180/Math.PI));return e=!1,a(s,{x:l.x,y:.7,z:l.z},g)}}}const Yr=1600,yh=.24,Zr=240,BE=1.6,GE=.22,tc=.42,Sh=.98,kE=.45;function HE(){const i=document.createElement("canvas");i.width=64,i.height=64;const t=i.getContext("2d"),e=t.createRadialGradient(32,32,2,32,32,32);e.addColorStop(0,"rgba(255,255,255,0.9)"),e.addColorStop(.5,"rgba(255,255,255,0.35)"),e.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=e,t.fillRect(0,0,64,64);const n=new ni(i);return n.colorSpace=ae,n}function VE(i,{quota:t=()=>0}={}){const e=new Float32Array(Yr*4*3),n=new Float32Array(Yr*4),r=new Uint32Array(Yr*6);for(let M=0;M<Yr;M++)r.set([M*4,M*4+1,M*4+2,M*4+2,M*4+1,M*4+3],M*6);const s=new _e;s.setAttribute("position",new fe(e,3).setUsage(ts)),s.setAttribute("alfa",new fe(n,1).setUsage(ts)),s.setIndex(new fe(r,1));const o=new ne(s,new An({transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-4,polygonOffsetUnits:-4,vertexShader:"attribute float alfa; varying float vA; void main() { vA = alfa; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:"varying float vA; void main() { gl_FragColor = vec4(0.03, 0.03, 0.035, vA); }"}));o.frustumCulled=!1,o.renderOrder=1,i.add(o);let a=0;const c=new Map,l=new Float32Array(Zr*3),u=new Float32Array(Zr*2),f=new Float32Array(Zr*3),h=new _e;h.setAttribute("position",new fe(l,3).setUsage(ts)),h.setAttribute("dati",new fe(u,2).setUsage(ts));const d=new Qo(h,new An({transparent:!0,depthWrite:!1,uniforms:{mappa:{value:HE()},scala:{value:600}},vertexShader:"attribute vec2 dati; uniform float scala; varying float vA; void main() { vec4 mv = modelViewMatrix * vec4(position, 1.0); float eta = dati.x; vA = dati.y * (1.0 - eta) * 0.32; gl_PointSize = (0.7 + eta * 2.6) * scala / -mv.z; gl_Position = projectionMatrix * mv; }",fragmentShader:"uniform sampler2D mappa; varying float vA; void main() { vec4 t = texture2D(mappa, gl_PointCoord); gl_FragColor = vec4(vec3(0.82, 0.8, 0.78), t.a * vA); }"}));d.frustumCulled=!1,d.renderOrder=2,i.add(d);let g=0,_=12345;const m=()=>(_=_*16807%2147483647,_/2147483647);function p(M,x,b,S,A,T){const y=b-M,E=S-x,R=Math.hypot(y,E);if(R<.001)return;const D=-E/R*yh*.5,N=y/R*yh*.5,U=a;a=(a+1)%Yr;const w=T+.012;e.set([M+D,w,x+N,M-D,w,x-N,b+D,w,S+N,b-D,w,S-N],U*12);const P=Math.min(.55,.15+A*.5);n.set([P,P,P,P],U*4),s.attributes.position.addUpdateRange(U*12,12),s.attributes.alfa.addUpdateRange(U*4,4)}function v(M,x,b,S,A,T){const y=g;g=(g+1)%Zr,l.set([M+(m()-.5)*.3,x+.25,b+(m()-.5)*.3],y*3),f.set([S*.12+(m()-.5)*1.2,.5+m()*.7,A*.12+(m()-.5)*1.2],y*3),u.set([0,Math.min(1,T)],y*2)}return{aggiorna(M,x){let b=!1;for(const{id:S,a:A}of M){const T=Math.sin(A.yaw),y=Math.cos(A.yaw),E=t(A.x,A.z),R=Math.hypot(A.vx,A.vz),D=Math.max(A.sbanda??0,(A.pattina??0)*.8,(A.bloccate??0)*.8,(A.freno??0)>.9&&R>8?.25:0),N=[-1,1].map(w=>({x:A.x-T*(st.dietro-.1)+y*w*Sh,z:A.z-y*(st.dietro-.1)-T*w*Sh})),U=c.get(S);if(D>GE&&R>2&&U?N.forEach((w,P)=>{const F=U[P];Math.hypot(w.x-F.x,w.z-F.z)>=kE&&Math.hypot(w.x-F.x,w.z-F.z)<6&&(p(F.x,F.z,w.x,w.z,D,E),b=!0,U[P]=w)}):c.set(S,N),U||c.set(S,N),D>tc&&R>3&&m()<(D-tc)*2.2){const w=N[m()<.5?0:1];v(w.x,E,w.z,A.vx,A.vz,(D-tc)*1.8)}}b&&(s.attributes.position.needsUpdate=!0,s.attributes.alfa.needsUpdate=!0);for(let S=0;S<Zr;S++){const A=u[S*2];if(u[S*2+1]<=0)continue;const T=A+x/BE;if(T>=1){u[S*2+1]=0;continue}u[S*2]=T,l[S*3]+=f[S*3]*x,l[S*3+1]+=f[S*3+1]*x,l[S*3+2]+=f[S*3+2]*x,f[S*3]*=1-x*1.5,f[S*3+2]*=1-x*1.5}h.attributes.position.needsUpdate=!0,h.attributes.dati.needsUpdate=!0},pulisci(){n.fill(0),s.attributes.alfa.needsUpdate=!0,u.fill(0),c.clear()}}}const ec=.09,fr=Object.freeze({gas:["KeyW","ArrowUp"],freno:["KeyS","ArrowDown"],sinistra:["KeyA","ArrowLeft"],destra:["KeyD","ArrowRight"],mano:["Space"]}),Hd=Object.freeze({KeyC:"telecamera",KeyR:"rimetti",Enter:"pronto",NumpadEnter:"pronto",KeyT:"aiuti",KeyM:"muto"}),Eh=Object.freeze({3:"telecamera",1:"rimetti",9:"pronto",8:"aiuti"}),WE=new Set([...Object.values(fr).flat(),...Object.keys(Hd),"KeyV"]);function XE(){const i=new Set,t=[];let e=!1,n=[],r=null;const s=u=>{var h,d;if(!e||((h=u.target)==null?void 0:h.tagName)==="INPUT"||((d=u.target)==null?void 0:d.tagName)==="SELECT"||!WE.has(u.code)||(u.preventDefault(),u.repeat))return;i.add(u.code);const f=Hd[u.code];f&&t.push(f)},o=u=>i.delete(u.code);window.addEventListener("keydown",s),window.addEventListener("keyup",o),window.addEventListener("blur",()=>i.clear());const a=u=>u.some(f=>i.has(f)),c=u=>{const f=Math.abs(u);if(f<ec)return 0;const h=(f-ec)/(1-ec);return Math.sign(u)*h*(.55+.45*h)};function l(){var d,g,_;const u=navigator.getGamepads?[...navigator.getGamepads()].filter(Boolean):[],f=u.find(m=>m.connected&&m.mapping==="standard")??u[0];if(!f)return null;r=f.id;const h=f.buttons.map(m=>m.pressed);return h.forEach((m,p)=>{m&&!n[p]&&Eh[p]&&t.push(Eh[p])}),n=h,{gas:((d=f.buttons[7])==null?void 0:d.value)??0,freno:((g=f.buttons[6])==null?void 0:g.value)??0,sterzo:c(f.axes[0]??0),mano:!!((_=f.buttons[0])!=null&&_.pressed)}}return{attiva(u){e=u,u||i.clear()},get joypad(){return r},leggi(){const u=e?l():null,f={gas:a(fr.gas)?1:0,freno:a(fr.freno)?1:0,sterzo:(a(fr.destra)?1:0)-(a(fr.sinistra)?1:0),mano:a(fr.mano)},h=!!u&&(Math.abs(u.sterzo)>0||u.gas>.02||u.freno>.02);return{gas:Math.max(f.gas,(u==null?void 0:u.gas)??0),freno:Math.max(f.freno,(u==null?void 0:u.freno)??0),sterzo:f.sterzo!==0?f.sterzo:(u==null?void 0:u.sterzo)??0,mano:f.mano||!!(u!=null&&u.mano),analogico:h&&f.sterzo===0,indietro:i.has("KeyV"),azioni:t.splice(0)}}}}const Ci=210,Kr=14,qE=8;function tn(i,t=!1){if(i==null||!Number.isFinite(i))return"–";const e=Math.abs(i),n=Math.floor(e/60),r=e-n*60,s=n>0?`${n}:${r.toFixed(3).padStart(6,"0")}`:r.toFixed(3);return`${t?i<0?"−":"+":""}${s}`}const xo=i=>String(i).replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),nc=i=>`#${i.toString(16).padStart(6,"0")}`;function jE(){const i=_=>document.getElementById(_),e=i("minimappa").getContext("2d");let n=null,r=null,s=null;const o={},a=(_,m)=>{o[_]!==m&&(o[_]=m,i(_).textContent=m)},c=(_,m)=>{o[_]!==m&&(o[_]=m,i(_).innerHTML=m)};function l(_){let m=1/0,p=-1/0,v=1/0,M=-1/0;for(let E=0;E<_.n;E++)m=Math.min(m,_.x[E]),p=Math.max(p,_.x[E]),v=Math.min(v,_.z[E]),M=Math.max(M,_.z[E]);const x=(Ci-2*Kr)/Math.max(p-m,M-v),b=Kr+(Ci-2*Kr-(p-m)*x)/2-m*x,S=Kr+(Ci-2*Kr-(M-v)*x)/2-v*x;r={scala:x,ox:b,oz:S},n=document.createElement("canvas"),n.width=Ci,n.height=Ci;const A=n.getContext("2d");A.lineJoin="round",A.lineCap="round";const T=()=>{A.beginPath();for(let E=0;E<=_.n;E+=3){const R=E%_.n,D=b+_.x[R]*x,N=S+_.z[R]*x;E===0?A.moveTo(D,N):A.lineTo(D,N)}A.closePath()};A.strokeStyle="rgba(0,0,0,0.65)",A.lineWidth=9,T(),A.stroke(),A.strokeStyle="rgba(245,245,240,0.92)",A.lineWidth=4,T(),A.stroke();const y=_.punto(0);A.strokeStyle="#e1251b",A.lineWidth=4,A.beginPath(),A.moveTo(b+(y.x+y.tz*7)*x,S+(y.z-y.tx*7)*x),A.lineTo(b+(y.x-y.tz*7)*x,S+(y.z+y.tx*7)*x),A.stroke()}function u(_){if(!n)return;e.clearRect(0,0,Ci,Ci),e.drawImage(n,0,0);const m=[..._].sort((p,v)=>(p.io?1:0)-(v.io?1:0));for(const p of m){const v=r.ox+p.x*r.scala,M=r.oz+p.z*r.scala;e.beginPath(),e.arc(v,M,p.io?6:4.2,0,Math.PI*2),e.fillStyle=nc(p.colore),e.fill(),e.lineWidth=p.io?2.5:1.5,e.strokeStyle=p.io?"#fff":"rgba(0,0,0,0.8)",e.stroke()}}function f(_){const m=Math.round(Math.abs(_.velocita)*3.6);a("velocita",String(m)),a("marcia",_.marcia===0?"R":String(_.marcia));const p=Math.min(1,Math.max(0,(_.rpm-st.giriMinimo)/(st.giriMassimo-st.giriMinimo)));i("giri-barra").style.width=`${(p*100).toFixed(1)}%`,i("giri-barra").parentElement.classList.toggle("limite",_.rpm>st.cambioSu-150),a("posizione",_.posizione?`P${_.posizione}`:"–"),a("totale",_.totale?`/${_.totale}`:""),a("giro",_.giri?`${Math.min(_.giro+1,_.giri)}/${_.giri}`:"–"),a("tempo-giro",tn(_.tempoGiro)),a("tempo-migliore",tn(_.migliore)),a("tempo-gara",tn(_.tempoGara)),c("classifica",_.classifica.slice(0,qE).map((v,M)=>`<li class="${v.io?"io":""}"><span>${M+1}</span><i class="c" style="background:${nc(v.colore)}"></i><span class="n">${xo(v.nome)}</span><span class="d">${v.distacco}</span></li>`).join("")),a("pista-nome",_.pista),a("fase",_.fase),a("aiuto",_.aiuto),a("rete",_.rete),i("scia").hidden=!(_.scia>.25),i("spettatore").hidden=!_.spettatore,_.spettatore&&a("spettatore",_.spettatore),u(_.auto)}function h(_,m="",p=2.2){const v=i("messaggio");v.innerHTML=`${xo(_)}${m?`<small>${xo(m)}</small>`:""}`,v.classList.add("visibile"),clearTimeout(s),s=setTimeout(()=>v.classList.remove("visibile"),p*1e3)}function d(_,m=!1,p=!0){const v=i("semafori");v.hidden=!p,v.classList.toggle("via",m),[...v.children].forEach((M,x)=>M.classList.toggle("acceso",!m&&x<_))}function g(_,m,p){const v=i("risultati");if(!_){v.hidden=!0;return}i("risultati-titolo").textContent=m,i("risultati-nota").textContent=p,i("risultati-righe").innerHTML=_.map((M,x)=>`<tr class="${M.io?"io":""}"><td>${x+1}</td><td><i class="c" style="background:${nc(M.colore)}"></i>${xo(M.nome)}</td><td>${M.tempo}</td><td>${M.migliore}</td></tr>`).join(""),v.hidden=!1}return{preparaMinimappa:l,aggiorna:f,messaggio:h,semafori:d,risultati:g,mostra(_){i("hud").hidden=!_}}}const bh=.5,Ah=3,$E=140,YE=4;function ZE(){let i=null,t=null,e=null,n=null,r=null,s=null,o=!1;const a=[];function c(){const _=i.createBufferSource();return _.buffer=e,_.loop=!0,_.start(0,Math.random()*2),_}function l(_){const p=new Float32Array(1024);for(let M=0;M<1024;M++){const x=M/1023*2-1;p[M]=Math.tanh(x*_)}const v=i.createWaveShaper();return v.curve=p,v}function u(_){const m=i.createBiquadFilter();m.type="lowpass",m.Q.value=1.4;const p=i.createGain();p.gain.value=0;const v=i.createStereoPanner(),M=i.createOscillator();M.type="sawtooth";const x=i.createOscillator();x.type="square";const b=i.createGain();b.gain.value=.55;const S=i.createGain();S.gain.value=.7;const A=l(_?1.5:2.6);M.connect(S).connect(A),x.connect(b).connect(A);let T=null;if(!_){T=i.createOscillator(),T.type="sawtooth",T.detune.value=9;const y=i.createGain();y.gain.value=.22,T.connect(y).connect(A),T.start()}return A.connect(m).connect(p).connect(v).connect(t),M.start(),x.start(),{aggiorna(y,E,R,D=0){const N=i.currentTime,U=Math.max(30,y/60*YE);M.frequency.setTargetAtTime(U,N,.02),x.frequency.setTargetAtTime(U/2,N,.02),T==null||T.frequency.setTargetAtTime(U*2,N,.02),m.frequency.setTargetAtTime(280+y*.22+E*1600,N,.04),p.gain.setTargetAtTime(R*(.35+E*.65),N,.05),v.pan.setTargetAtTime(Math.max(-1,Math.min(1,D)),N,.05)}}}function f(_,m,p){const v=c(),M=i.createBiquadFilter();M.type=_,M.frequency.value=m,M.Q.value=p;const x=i.createGain();return x.gain.value=0,v.connect(M).connect(x).connect(t),{f:M,g:x}}function h(){if(i){i.state==="suspended"&&i.resume();return}i=new AudioContext,t=i.createGain(),t.gain.value=o?0:bh;const _=i.createDynamicsCompressor();t.connect(_).connect(i.destination),e=i.createBuffer(1,i.sampleRate*2,i.sampleRate);const m=e.getChannelData(0);for(let p=0;p<m.length;p++)m[p]=Math.random()*2-1;n=u(!1),r=f("bandpass",1350,7),s=f("lowpass",520,.7);for(let p=0;p<Ah;p++)a.push(u(!0))}const d=()=>i&&i.state==="running";function g(_,m,p=.25){if(!d())return;const v=i.createOscillator();v.type="square",v.frequency.value=_;const M=i.createGain(),x=i.currentTime;M.gain.setValueAtTime(p,x),M.gain.exponentialRampToValueAtTime(.001,x+m),v.connect(M).connect(t),v.start(x),v.stop(x+m+.02)}return{prepara:h,get muto(){return o},alternaMuto(){return o=!o,t&&(t.gain.value=o?0:bh),o},aggiorna(_,m,p){if(!d())return;const v=i.currentTime;if(_){const x=Math.hypot(_.vx,_.vz);n.aggiorna(_.rpm,_.gas,.42),r.g.gain.setTargetAtTime(Math.min(.32,Math.max(0,_.sbanda-.07)*1.6)*Math.min(1,x/8),v,.05),r.f.frequency.setTargetAtTime(1100+Math.min(900,x*10),v,.1),s.g.gain.setTargetAtTime(Math.min(.3,(x/75)**2*.3),v,.2)}else n.aggiorna(900,0,0),r.g.gain.setTargetAtTime(0,v,.05),s.g.gain.setTargetAtTime(0,v,.2);const M=m.map(x=>({a:x,d:Math.hypot(x.x-p.x,x.z-p.z)})).filter(x=>x.d<$E).sort((x,b)=>x.d-b.d).slice(0,Ah);a.forEach((x,b)=>{const S=M[b];if(!S){x.aggiorna(900,0,0);return}const A=S.a.x-p.x,T=S.a.z-p.z,y=-(A*Math.cos(p.yaw)-T*Math.sin(p.yaw))/Math.max(1,S.d);x.aggiorna(S.a.rpm??3e3,S.a.gas??.5,.3/(1+S.d/9),y)})},urto(_){if(!d()||_<1.5)return;const m=c(),p=i.createBiquadFilter();p.type="lowpass",p.frequency.value=500+Math.min(1500,_*90);const v=i.createGain(),M=i.currentTime;v.gain.setValueAtTime(Math.min(.9,_*.06),M),v.gain.exponentialRampToValueAtTime(.001,M+.35),m.connect(p).connect(v).connect(t),m.stop(M+.4)},luce:()=>g(520,.22),via:()=>g(1040,.6,.3),giro:()=>g(880,.15,.18)}}const KE="https://dxqmblsmawdtqhtekfnf.supabase.co",JE="sb_publishable_mjj5GumFWTwYleVvkV4pcw_tibE8HUI",QE=Object.freeze([{urls:"stun:stun.l.google.com:19302"},{urls:"stun:stun1.l.google.com:19302"}]),tb=6e3,eb=25e3,Th=1e3,nb=15e3,ib=1e3,Vd="corsacerano",rb=200;function Xo(){const i=new Set;return{aggiungi:t=>(i.add(t),()=>i.delete(t)),avvisa:t=>i.forEach(e=>e(t))}}function sb(i){const t=new BroadcastChannel(`${Vd}-${i}`),e=Xo(),n=Xo();return t.onmessage=r=>e.avvisa(r.data),{invia:r=>t.postMessage(r),suMessaggio:e.aggiungi,suStato:r=>{n.aggiungi(r),r("online")},chiudi:()=>t.close()}}function ob(i){const t=`realtime:${Vd}-${i}`,e=`${KE.replace(/^http/,"ws")}/realtime/v1/websocket?apikey=${encodeURIComponent(JE)}&vsn=1.0.0`,n=Xo(),r=Xo(),s=[];let o=null,a=!1,c=0,l=null,u=null,f=Th,h=!1,d="connessione";const g=v=>{d=v,r.avvisa(v)},_=(v,M,x=t)=>{(o==null?void 0:o.readyState)===WebSocket.OPEN&&o.send(JSON.stringify({topic:x,event:v,payload:M,ref:String(++c),join_ref:"1"}))},m=v=>_("broadcast",{type:"broadcast",event:"m",payload:v});function p(){if(h)return;g("connessione"),a=!1;const v=new WebSocket(e);o=v,v.onopen=()=>{_("phx_join",{config:{broadcast:{self:!1,ack:!1},presence:{key:""},private:!1}}),clearInterval(l),l=setInterval(()=>_("heartbeat",{},"phoenix"),eb)},v.onmessage=M=>{var b,S,A,T;let x;try{x=JSON.parse(M.data)}catch{return}x.topic===t&&(x.event==="phx_reply"&&!a&&((b=x.payload)==null?void 0:b.status)!=="ok"?(console.error("Supabase ha rifiutato l'ingresso nel canale della stanza:",(S=x.payload)==null?void 0:S.response),v.close()):x.event==="phx_reply"&&((A=x.payload)==null?void 0:A.status)==="ok"&&!a?(a=!0,f=Th,g("online"),s.splice(0).forEach(m)):x.event==="broadcast"&&((T=x.payload)==null?void 0:T.event)==="m"?n.avvisa(x.payload.payload):(x.event==="phx_error"||x.event==="phx_close")&&v.close())},v.onclose=()=>{o!==v||h||(clearInterval(l),a=!1,g("offline"),u=setTimeout(p,f),f=Math.min(nb,f*2))}}return p(),{invia(v,{scartabile:M=!1}={}){if(a){m(v);return}M||(s.length>=rb&&s.shift(),s.push(v))},suMessaggio:n.aggiungi,suStato:v=>{r.aggiungi(v),v(d)},chiudi(){h=!0,clearTimeout(u),clearInterval(l),o==null||o.close()}}}function ab(i,{locale:t=!1}={}){return t?sb(i):ob(i)}const Wd=16,cb=64,Xd=10,wh=3,lb=Object.freeze(["prove","partenza","gara","arrivo"]),Rh=16,ub=40,Fl=Object.freeze(["x","z","yaw","vx","vz","w","angoloSterzo","rpm","gas","freno","marcia","ax","ay","sbanda","urto"]);function Ur(i){return String(i??"").replace(/[\u0000-\u001f<>]/g,"").trim().slice(0,Wd)||null}const jn=i=>typeof i=="number"&&Number.isFinite(i),xn=(i,t,e)=>Number.isInteger(i)&&i>=t&&i<=e,rl=(i,t=cb)=>typeof i=="string"&&i.length>0&&i.length<=t,sl=i=>i===-1||jn(i)&&i>=0,qd=i=>Array.isArray(i)&&i.length===Fl.length&&i.every(jn),Po=i=>Fl.map(t=>Number.isFinite(i[t])?Math.round(i[t]*1e3)/1e3:0);function jd(i,t={}){return Fl.forEach((e,n)=>{t[e]=i[n]}),t}function fb(i){return Array.isArray(i)&&i.length===11&&rl(i[0])&&typeof i[1]=="string"&&i[1].length<=Wd&&xn(i[2],0,Xd-1)&&xn(i[3],0,1)&&xn(i[4],0,15)&&xn(i[5],0,99)&&jn(i[6])&&sl(i[7])&&sl(i[8])&&xn(i[9],0,1)&&(i[10]===0||qd(i[10]))}const hb={ciao:i=>rl(i.id)&&Ur(i.nome)!==null&&xn(i.livrea,0,Xd-1),a:i=>qd(i.d)&&xn(i.giro,0,99)&&jn(i.s)&&sl(i.migliore)&&typeof i.pronto=="boolean"&&xn(i.pista,0,wh-1),st:i=>jn(i.h)&&lb.includes(i.f)&&xn(i.p,0,wh-1)&&jn(i.tf)&&xn(i.lu,0,5)&&jn(i.cr)&&xn(i.num,1,1e6)&&Array.isArray(i.g)&&i.g.length<=Rh&&i.g.every(fb)&&Array.isArray(i.ord)&&i.ord.length<=Rh&&i.ord.every(t=>rl(t)),ev:i=>Array.isArray(i.eventi)&&i.eventi.length<=ub&&i.eventi.every(t=>t&&typeof t.k=="string"),ping:i=>jn(i.n),pong:i=>jn(i.n)};function db(i){if(!i||typeof i!="object"||typeof i.t!="string")return null;const t=hb[i.t];return t&&t(i)?i:null}const pb=5e3,mb=3,gb=2500,_b=64*1024;function qo(){const i=new Set;return{aggiungi:t=>(i.add(t),()=>i.delete(t)),avvisa:t=>i.forEach(e=>e(t))}}function $d({segnali:i,sonoHost:t,mioId:e,soloRiserva:n=!1,ospite:r=null}){const s=qo(),o=qo();let a=null,c=null,l={},u="attesa",f=null,h=null,d=0,g=[],_=0;const m=w=>{u!==w&&(u=w,o.avvisa(w))},p=(w,P={},F={})=>i.invia({tipo:w,da:e,a,...P},F);function v(w){const P=db(w);P&&(d=performance.now(),s.avvisa(P))}function M(){var w,P;((w=l.veloce)==null?void 0:w.readyState)!=="open"||((P=l.sicuro)==null?void 0:P.readyState)!=="open"||(clearTimeout(f),m("diretto"))}function x(){clearTimeout(f),f=setTimeout(()=>{u!=="diretto"&&m("riserva")},tb)}function b(w){l[w.label]=w,w.onmessage=P=>{let F;try{F=JSON.parse(P.data)}catch{return}v(F)},w.onopen=M,w.onclose=()=>{l[w.label]===w&&u==="diretto"&&m("riserva")}}function S(){for(const w of Object.values(l))w.onopen=w.onclose=w.onmessage=null,w.close();l={},c&&(c.onicecandidate=c.onconnectionstatechange=c.ondatachannel=null,c.close()),c=null}function A(){if(S(),m("collegamento"),n)return clearTimeout(f),m("riserva"),null;const w=new RTCPeerConnection({iceServers:QE});return c=w,w.onicecandidate=P=>{P.candidate&&p("ice",{c:P.candidate.toJSON()})},w.onconnectionstatechange=()=>{c===w&&(w.connectionState==="connected"?M():["failed","closed","disconnected"].includes(w.connectionState)&&u==="diretto"&&m("riserva"))},w.ondatachannel=P=>b(P.channel),x(),w}async function T(w){for(const P of g.splice(0)){if(c!==w)return;await w.addIceCandidate(P).catch(()=>{})}}async function y(w){a=w,_=performance.now(),d=performance.now(),g=[],p("benvenuto");const P=A();if(!P)return;b(P.createDataChannel("veloce",{ordered:!1,maxRetransmits:0})),b(P.createDataChannel("sicuro"));const F=await P.createOffer();c===P&&(await P.setLocalDescription(F),c===P&&p("offerta",{sdp:P.localDescription.toJSON()}))}async function E(w){const P=A();if(!P||(await P.setRemoteDescription(w),c!==P))return;await T(P);const F=await P.createAnswer();c===P&&(await P.setLocalDescription(F),c===P&&p("risposta",{sdp:P.localDescription.toJSON()}))}const R=w=>{console.error("Collegamento diretto non riuscito, passo dalla riserva:",w),m("riserva")};function D(w){a!==w&&(a=w,clearInterval(h),n?A():(m("collegamento"),x()))}function N(w){if(!(!w||typeof w!="object"||typeof w.da!="string"||w.da===e)){if(t&&w.tipo==="ciao"){w.da===a&&u==="collegamento"&&performance.now()-_>gb&&y(w.da).catch(R);return}if(w.a===e){if(!t&&(w.tipo==="benvenuto"||w.tipo==="offerta"&&!a)&&D(w.da),!t&&w.tipo==="occupata"){a||m("occupata");return}if(w.da===a)if(!t&&w.tipo==="offerta")E(w.sdp).catch(R);else if(t&&w.tipo==="risposta"&&c){const P=c;P.setRemoteDescription(w.sdp).then(()=>T(P)).catch(R)}else w.tipo==="ice"?c!=null&&c.remoteDescription?c.addIceCandidate(w.c).catch(()=>{}):g.push(w.c):w.tipo==="gioco"&&v(w.m)}}}const U=i.suMessaggio(N);if(t&&r&&y(r).catch(R),!t){const w=()=>i.invia({tipo:"ciao",da:e});w(),h=setInterval(w,ib)}return{get modo(){return u},get altroId(){return a},silenzio:()=>d?performance.now()-d:1/0,suMessaggio:s.aggiungi,suStato:o.aggiungi,invia(w,{veloce:P=!1}={}){if(u==="diretto"){const F=P?l.veloce:l.sicuro;if((F==null?void 0:F.readyState)==="open"){(!P||F.bufferedAmount<_b)&&F.send(JSON.stringify(w));return}}a&&(u==="riserva"||u==="diretto")&&p("gioco",{m:w},{scartabile:P})},chiudiConnessione(){clearInterval(h),clearTimeout(f),S(),U==null||U()},chiudi(){this.chiudiConnessione(),i.chiudi()}}}function xb({segnali:i,mioId:t,soloRiserva:e=!1,massimo:n=mb}){const r=qo(),s=qo(),o=new Map,a=u=>u.modo==="collegamento"||u.silenzio()<pb;function c(u){const f=o.get(u);f&&(f.chiudiConnessione(),o.delete(u),s.avvisa())}const l=i.suMessaggio(u=>{if(!u||u.tipo!=="ciao"||typeof u.da!="string"||u.da===t||o.has(u.da))return;for(const[d,g]of[...o])a(g)||c(d);if(o.size>=n){i.invia({tipo:"occupata",da:t,a:u.da});return}const f=u.da,h=$d({segnali:i,sonoHost:!0,mioId:t,soloRiserva:e,ospite:f});h.suMessaggio(d=>r.avvisa({m:d,id:f})),h.suStato(()=>s.avvisa()),o.set(f,h),s.avvisa()});return{get modo(){const u=[...o.values()].map(f=>f.modo);return u.includes("diretto")?"diretto":u.includes("riserva")?"riserva":u.length?"collegamento":"attesa"},collegato:u=>{var f;return["diretto","riserva"].includes((f=o.get(u))==null?void 0:f.modo)},silenzio:u=>{var f;return((f=o.get(u))==null?void 0:f.silenzio())??1/0},suMessaggio:u=>r.aggiungi(({m:f,id:h})=>u(f,h)),suStato:s.aggiungi,invia(u,f){for(const h of o.values())h.invia(u,f)},inviaA(u,f,h){var d;(d=o.get(u))==null||d.invia(f,h)},rimuovi:c,chiudiConnessione(){l();for(const u of o.values())u.chiudiConnessione();o.clear()},chiudi(){this.chiudiConnessione(),i.chiudi()}}}const Ch=8,vb=6,Ih=2600,Mb=1200,yb=6e3,Sb=4e3,Eb=i=>`mondo-${i}`;function bb({mioId:i,locale:t=!1,soloRiserva:e=!1,suRuolo:n,suStato:r=()=>{},giocatoriNoti:s=()=>[]}){let o=1,a=null,c=null,l="ascolto",u=0,f=null,h=null,d=null,g=null,_=!1,m=1;const p=y=>r({ruolo:l,mondo:o,testo:y});function v(){var y;clearInterval(h),clearInterval(d),clearTimeout(g),(y=c==null?void 0:c.chiudiConnessione)==null||y.call(c),c=null}function M(y){v(),a==null||a.chiudi(),o=y,a=ab(Eb(y),{locale:t}),a.suMessaggio(T),x()}function x(y=0){l="ascolto",f=null,p(`Cerco Cerano ${o}…`),a.invia({tipo:"chi",da:i}),g=setTimeout(()=>{l==="ascolto"&&!_&&b()},Ih+y+Math.random()*600)}function b(){v(),l="host",f=i,c=xb({segnali:a,mioId:i,soloRiserva:e,massimo:Ch-1});const y=()=>a.invia({tipo:"faro",da:i,n:m,t:Date.now()},{scartabile:!0});y(),h=setInterval(y,Mb),p(`Cerano ${o}`),n("host",c,o)}function S(y){v(),l="ospite",f=y,u=performance.now(),c=$d({segnali:a,sonoHost:!1,mioId:i,soloRiserva:e}),d=setInterval(A,1e3),p(`Cerano ${o}`),n("ospite",c,o)}function A(){if(l!=="ospite"||performance.now()-u<yb)return;const y=s().filter(R=>R!==f).sort(),E=!y.length||y[0]===i;v(),x(E?0:Ih)}function T(y){if(!(!y||typeof y!="object"||y.da===i||_)){if(y.tipo==="chi"&&l==="host"){a.invia({tipo:"faro",da:i,n:m,t:Date.now()},{scartabile:!0});return}if(y.tipo==="faro"){if(l==="host"){y.da<i&&y.n>=1&&(v(),x());return}if(l==="ospite"){y.da===f?u=performance.now():performance.now()-u>Sb&&S(y.da);return}l==="ascolto"&&(clearTimeout(g),y.n>=Ch&&o<vb?M(o+1):S(y.da))}}}return M(1),{get ruolo(){return l},get mondo(){return o},get coll(){return c},aggiornaQuanti(y){m=y},chiudi(){_=!0,v(),a==null||a.chiudi()}}}const Bl="corsa.nome",Gl="corsa.livrea",Yd="corsa.record.",Ab=33,Tb=50,wb=110,Rb=6e3,Cb=1e3,Ib=1e3,Pb=12e3,Lb=2.5,Db=6,Ub=1.6,Zd=1/20,Nb=32,Ob=4,ue=i=>document.getElementById(i),ve=jE(),Kd=XE(),ki=ZE(),Oi=FE(),zb=new URLSearchParams(location.search),Fb=zb.has("locale");function ol(i){try{return localStorage.getItem(i)}catch{return null}}function bs(i,t){try{localStorage.setItem(i,String(t))}catch{return!1}return!0}const Bb=()=>crypto.randomUUID?crypto.randomUUID():`${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`,G={fase:"carico",mioId:Bb(),nome:Ur(ol(Bl))??"",livrea:Math.min(Ye.length-1,Math.max(0,Number(ol(Gl))||0)),rete:null,coll:null,sonoHost:!1,gara:null,vista:null,ricevuto:0,presentato:!1,ultimoCiao:0,ultimoInvio:0,ultimoStato:0,remoti:new Map,macchine:new Map,pistaAttiva:-1,chiaveFase:"",modo:0,comparse:[],luciPrima:0},et={auto:ll(),contagiri:null,inizioGiro:0,migliore:null,ultimo:null,pronto:!1,arrivato:!1,spettatore:!1,fuori:0,contromano:0,macchina:null};let we=null,vn=null,Ni=null,hs=[],ds=null;function Jr(i,t){ue("carico-barra").style.width=`${Math.round(i*100)}%`,t&&(ue("carico-testo").textContent=t)}const Ve=()=>we.piste[Math.max(0,G.pistaAttiva)],Jd=i=>{var t;return((t=G.vista)==null?void 0:t.partecipanti.find(e=>e.id===i))??null};function Qd(i){G.pistaAttiva!==i&&(G.pistaAttiva=i,we.attivaPista(i),hs.forEach((t,e)=>t.mostra(e===i)),ve.preparaMinimappa(we.piste[i]),ds==null||ds.pulisci(),et.contagiri=Oo(we.piste[i]),ue("pista-nome").textContent=we.piste[i].nome)}function Lo(i,t){const e=Ve(),n=e.griglia[Math.min(i,e.griglia.length-1)];ss(et.auto,n.x,n.z,n.yaw),et.auto.fermo=t,et.contagiri=Oo(e),et.contagiri.s=n.s,et.inizioGiro=performance.now(),et.arrivato=!1,et.fuori=0,Oi.reimposta()}function ic(){if(!et.contagiri||et.spettatore)return;const t=Ve().punto(et.contagiri.s),e=et.auto.fermo;ss(et.auto,t.x,t.z,Math.atan2(t.tx,t.tz)),et.auto.fermo=e,et.fuori=0,et.contromano=0,Oi.reimposta()}function tp(i){const t=Number(ol(Yd+i));return Number.isFinite(t)&&t>0?t:null}function Gb(){var o;const i=performance.now(),t=(i-et.inizioGiro)/1e3;et.inizioGiro=i;const e=(o=G.vista)==null?void 0:o.fase;if(e!=="gara"&&e!=="prove")return;et.ultimo=t;const n=Ve(),r=et.migliore===null||t<et.migliore;r&&(et.migliore=t);const s=tp(n.id);if((s===null||t<s)&&(bs(Yd+n.id,t.toFixed(3)),s!==null&&ve.messaggio("Nuovo record personale",tn(t),2.6)),ki.giro(),e==="gara"&&et.contagiri.giro>=n.giri){et.arrivato=!0;const a=G.vista.ordine.indexOf(G.mioId)+1||"–";ve.messaggio(`Traguardo! P${a}`,`Ultimo giro ${tn(t)}`,4);return}e==="gara"&&et.contagiri.giro===n.giri-1?ve.messaggio("Ultimo giro",tn(t),2.4):r&&ve.messaggio(tn(t),e==="gara"?"giro più veloce":"giro delle prove",2)}function kb(){const i=G.vista,t=Jd(G.mioId),e=t?t.spettatore?"spettatore":`posto${t.posto}`:"assente",n=`${i.numero}:${i.fase}:${i.pista}`;if(n===G.chiaveFase&&e===G.presenza)return;const r=G.chiaveFase,s=n===G.chiaveFase;if(G.chiaveFase=n,G.presenza=e,Qd(i.pista),et.spettatore=!t||t.spettatore,s){!et.spettatore&&i.fase!=="gara"&&i.fase!=="arrivo"&&Lo(t.posto,i.fase==="partenza");return}const o=Ve();ve.risultati(null),i.fase==="prove"?(et.migliore=null,et.pronto=!1,t&&!t.spettatore&&Lo(t.posto,!1),ve.messaggio(o.nome,`Prove libere · ${(o.lunghezza/1e3).toFixed(2).replace(".",",")} km · ${o.giri} ${o.giri===1?"giro":"giri"} in gara`,3.5)):i.fase==="partenza"?(et.migliore=null,t&&!t.spettatore&&Lo(t.posto,!0),ve.messaggio("In griglia",`Gara ${i.numero} · ${o.nome}`,2)):i.fase==="gara"?(et.auto.fermo=!1,et.inizioGiro=performance.now(),r===`${i.numero}:partenza:${i.pista}`&&(ve.messaggio("Via!","",1.2),ki.via())):i.fase==="arrivo"&&Hb()}function Hb(){const i=G.vista,t=i.ordine.map(r=>Jd(r)).filter(Boolean).map((r,s,o)=>{const a=o[0];let c="Ritirato";return r.arrivo!==null?c=s===0?tn(r.arrivo):tn(r.arrivo-a.arrivo,!0):r.giro<Ve().giri&&(c=Ve().giri-r.giro===1?"1 giro indietro":`${Ve().giri-r.giro} giri indietro`),{nome:r.nome,colore:Ye[r.livrea].primario,tempo:c,migliore:tn(r.migliore),io:r.id===G.mioId}}),e=we.piste[(i.pista+1)%we.piste.length].nome,n=tp(Ve().id);ve.risultati(t,`Arrivo · ${Ve().nome}`,`Prossima gara: ${e}${n?` · il tuo record qui: ${tn(n)}`:""}`)}function ep(){const i=G.gara,t=i.stato;return{fase:t.fase,pista:t.pista,tempo:t.tempo,luci:t.luci,cronometro:t.cronometro,numero:t.numero,partecipanti:[...i.partecipanti.values()].map(e=>({id:e.id,nome:e.nome,livrea:e.livrea,ia:e.ia,posto:e.posto,giro:e.giro,s:e.s,totale:e.totale,arrivo:e.arrivo,migliore:e.migliore,spettatore:e.spettatore,pronto:e.pronto})),ordine:i.classifica.map(e=>e.id)}}function Vb(i){const t=we.piste[i.p].lunghezza;return{fase:i.f,pista:i.p,tempo:i.tf,luci:i.lu,cronometro:i.cr,numero:i.num,partecipanti:i.g.map(e=>({id:e[0],nome:e[1],livrea:e[2],ia:e[3]===1,posto:e[4],giro:e[5],s:e[6],totale:e[5]===0&&e[6]>t/2?e[6]-t:e[5]*t+e[6],arrivo:e[7]<0?null:e[7],migliore:e[8]<0?null:e[8],spettatore:e[9]===1,pronto:!0})),ordine:i.ord}}function Wb(){const i=G.gara,t=i.stato,e=[...i.partecipanti.values()].map(n=>{var s;let r=0;return n.ia?r=Po(n.auto):n.id===G.mioId?r=et.spettatore?0:Po(et.auto):(s=G.remoti.get(n.id))!=null&&s.ultimo&&(r=Po(G.remoti.get(n.id).ultimo)),[n.id,n.nome,n.livrea,n.ia?1:0,n.posto,n.giro,Math.round(n.s*10)/10,n.arrivo??-1,n.migliore??-1,n.spettatore?1:0,r]});return{t:"st",h:performance.now(),f:t.fase,p:t.pista,tf:Math.round(t.tempo*100)/100,lu:t.luci,cr:Math.round(t.cronometro*1e3)/1e3,num:t.numero,g:e,ord:i.classifica.map(n=>n.id)}}function np(i,t){let e=G.remoti.get(i);e||(e={buffer:[],ultimo:null,auto:ll(),chiamata:0},G.remoti.set(i,e));const n=performance.now();for(e.buffer.push({t:n,stato:t});e.buffer.length>8;)e.buffer.shift();e.ultimo=t}const Xb=i=>Math.atan2(Math.sin(i),Math.cos(i));function ip(i,t){const e=t-wb,n=i.buffer;if(!n.length)return null;let r=n[0],s=n[n.length-1];for(let c=0;c<n.length-1;c++)if(n[c].t<=e&&n[c+1].t>=e){r=n[c],s=n[c+1];break}const o=i.auto;if(e>=s.t){const c=Math.min(.25,(e-s.t)/1e3);Object.assign(o,s.stato),o.x+=s.stato.vx*c,o.z+=s.stato.vz*c,o.yaw+=s.stato.w*c}else{const c=s.t>r.t?Math.max(0,Math.min(1,(e-r.t)/(s.t-r.t))):1;Object.assign(o,s.stato),o.x=r.stato.x+(s.stato.x-r.stato.x)*c,o.z=r.stato.z+(s.stato.z-r.stato.z)*c,o.yaw=r.stato.yaw+Xb(s.stato.yaw-r.stato.yaw)*c}const a=i.chiamata?Math.min(.1,Math.max(0,(t-i.chiamata)/1e3)):0;return i.chiamata=t,o.ruote=(o.ruote??0)+jo(o)/st.raggioRuota*a,o}function qb(i,t){if(i.t==="ciao"){const e=Ur(i.nome);e&&G.gara&&G.gara.aggiungi(t,e,i.livrea);return}if(i.t==="a"&&G.gara){const e=G.gara.partecipanti.get(t);if(!e)return;if(np(t,jd(i.d,{})),i.pista!==G.gara.stato.pista){G.gara.aggiornaUmano(t,{pronto:i.pronto,s:e.s,giro:e.giro});return}G.gara.aggiornaUmano(t,{s:i.s,giro:i.giro,migliore:i.migliore<0?null:i.migliore,pronto:i.pronto,auto:G.remoti.get(t).auto})}}function jb(i){if(i.t==="st"){if(i.h<=G.ultimaIstantanea)return;G.ultimaIstantanea=i.h,G.vista=Vb(i),G.ricevuto=performance.now();const t=new Set(i.g.map(e=>e[0]));for(const e of i.g)e[0]!==G.mioId&&Array.isArray(e[10])&&np(e[0],jd(e[10],{}));for(const e of G.remoti.keys())t.has(e)||G.remoti.delete(e);G.presentato=t.has(G.mioId);return}if(i.t==="ev")for(const t of i.eventi)rp(t)}function rp(i){const t=Ur(i.nome);t&&(i.k==="entra"&&i.id!==G.mioId?ve.messaggio(`${t} è in pista`,"",1.8):i.k==="esce"&&ve.messaggio(`${t} ha lasciato Cerano`,"",1.8))}function sp(){var i;(i=G.coll)==null||i.invia({t:"ciao",id:G.mioId,nome:G.nome,livrea:G.livrea})}function $b(i,t,e){G.coll=t,G.sonoHost=i==="host",G.presentato=G.sonoHost,G.ultimaIstantanea=-1/0,G.ricevuto=performance.now(),G.remoti.clear(),G.numeroMondo=e,G.sonoHost?(G.gara=Lm({piste:we.piste,primaPista:Math.max(0,G.pistaAttiva)}),G.gara.aggiungi(G.mioId,G.nome,G.livrea),G.gara.cambiaFase("prove"),t.suMessaggio(qb),G.vista=ep()):(G.gara=null,t.suMessaggio(jb),sp()),G.chiaveFase="",G.presenza=""}function op(){var i;(i=G.rete)==null||i.chiudi(),G.coll=null,G.rete=bb({mioId:G.mioId,locale:Fb,suRuolo:$b,suStato:t=>{G.statoRete=t},giocatoriNoti:()=>{var t;return(((t=G.vista)==null?void 0:t.partecipanti)??[]).filter(e=>!e.ia).map(e=>e.id)}})}function Yb(){const i=Ur(ue("nome").value);if(!i){ue("errore").textContent="Scrivi il tuo nome da pilota.",ue("nome").focus();return}G.nome=i,bs(Bl,i),bs(Gl,G.livrea),ki.prepara();for(const t of G.comparse)t.rimuovi();G.comparse=[],ue("titolo").hidden=!0,ve.mostra(!0),Kd.attiva(!0),G.fase="gioco",et.macchina.colora(Ye[G.livrea]),op()}function Zb(i){var o,a,c;const t=G.gara;!et.spettatore&&et.contagiri?t.aggiornaUmano(G.mioId,{s:et.contagiri.s,giro:et.contagiri.giro,migliore:et.migliore,pronto:et.pronto,auto:et.auto}):t.aggiornaUmano(G.mioId,{pronto:et.pronto,s:0,giro:0});const e=performance.now();for(const l of[...t.partecipanti.values()])l.ia||l.id===G.mioId||G.coll.silenzio(l.id)>Rb&&(t.togli(l.id),(a=(o=G.coll).rimuovi)==null||a.call(o,l.id),G.remoti.delete(l.id));const n=[];et.spettatore||n.push(et.auto);for(const[l,u]of G.remoti){const f=ip(u,e);f&&t.partecipanti.has(l)&&n.push(f)}const s=t.passo(i,{collisioni:we.citta.collisioni,altre:n}).filter(l=>l.k==="entra"||l.k==="esce");for(const l of s)rp(l);s.length&&G.coll.invia({t:"ev",eventi:s}),G.vista=ep(),e-G.ultimoStato>Tb&&(G.coll.invia(Wb(),{veloce:!0}),G.ultimoStato=e),(c=G.rete)==null||c.aggiornaQuanti([...t.partecipanti.values()].filter(l=>!l.ia).length)}function ap(i){var e;const t=[];if(!G.vista)return t;for(const n of G.vista.partecipanti){if(n.id===G.mioId||n.spettatore)continue;let r=null;G.sonoHost&&n.ia?r=((e=G.gara.partecipanti.get(n.id))==null?void 0:e.auto)??null:G.remoti.has(n.id)&&(r=ip(G.remoti.get(n.id),i)),r&&t.push({p:n,a:r})}return t}function Kb(i,t,e){var l;let n=Kd.leggi();G.autopilota&&et.contagiri&&!et.spettatore&&(n={...kh(G.autopilota,et.auto,Ve(),et.contagiri,[et.auto,...e],i),azioni:n.azioni});for(const u of n.azioni)u==="telecamera"?G.modo=(G.modo+1)%il.length:u==="rimetti"?ic():u==="pronto"&&((l=G.vista)==null?void 0:l.fase)==="prove"?(et.pronto=!0,ve.messaggio("Pronto","si parte appena sono pronti tutti",1.6)):u==="aiuti"?(et.auto.aiuti=!et.auto.aiuti,ve.messaggio(et.auto.aiuti?"Aiuti accesi":"Aiuti spenti",et.auto.aiuti?"controllo di trazione e stabilità":"solo ABS: occhio alla coda",1.8)):u==="muto"&&ve.messaggio(ki.alternaMuto()?"Audio spento":"Audio acceso","",1.2);if(G.indietro=n.indietro,et.spettatore||!et.contagiri)return;Bh(et.auto,e);const r=Gh(et.auto,n,i,{collisioni:we.citta.collisioni});[et.auto.x,et.auto.z,et.auto.yaw,et.auto.vx,et.auto.vz,et.auto.w].every(Number.isFinite)||(Number.isFinite(et.auto.yaw)||(et.auto.yaw=0),ic());let s=r;for(const u of e)s=Math.max(s,ac(et.auto,u,!0));s>2&&(ki.urto(s),Oi.scuoti(Math.min(1,s/12)));const o=Ve(),a=et.contagiri.aggiorna(et.auto.x,et.auto.z,i,jo(et.auto));a.giroFatto&&Gb();const c=Math.max(o.sinistra[a.i],o.destra[a.i]);et.fuori=a.distanza>c+Db?et.fuori+i:0,et.fuori>Lb&&(ic(),ve.messaggio("Rimesso in pista","",1.4)),et.contromano=et.contagiri.contrario>Ub?et.contromano+i:0,et.contromano>0&&et.contromano<i*1.5&&ve.messaggio("Contromano!","premi R per rimetterti in pista",2),!G.sonoHost&&G.coll&&t-G.ultimoInvio>Ab&&G.vista&&(G.coll.invia({t:"a",d:Po(et.auto),giro:et.contagiri.giro,s:Math.round(et.contagiri.s*10)/10,migliore:et.migliore??-1,pronto:et.pronto,pista:G.vista.pista},{veloce:!0}),G.ultimoInvio=t)}function cp(i,t){var n;if(G.fase!=="gioco")return;G.coll&&!G.sonoHost&&!G.presentato&&t-G.ultimoCiao>Cb&&(sp(),G.ultimoCiao=t),G.coll&&!G.sonoHost&&(et.spettatore||!et.contagiri)&&t-G.ultimoInvio>Ib&&(G.coll.invia({t:"ping",n:t}),G.ultimoInvio=t),G.coll&&!G.sonoHost&&((n=G.rete)==null?void 0:n.ruolo)==="ospite"&&t-G.ricevuto>Pb&&op();const e=ap(t).map(r=>r.a);Kb(i,t,e),G.sonoHost&&G.gara&&Zb(i),G.vista&&kb()}function Jb(i,t,e=!1){let n=G.macchine.get(i);return n?n.livrea!==Ye[t]&&n.colora(Ye[t]):(n=Ni.crea(Ye[t],{pieno:e}),G.macchine.set(i,n)),n}function Ph(){const i=G.vista;return i?i.tempo+(G.sonoHost?0:(performance.now()-G.ricevuto)/1e3):0}function Qb(){var r;const i=G.vista;if(!i)return((r=G.statoRete)==null?void 0:r.testo)??"Cerco la pista…";const t=Ve(),e=i.partecipanti.filter(s=>!s.ia&&!s.spettatore);if(i.fase==="prove"){const s=Math.max(0,Math.ceil(Qe.prove-Ph())),o=e.filter(a=>a.pronto).length;return`Prove libere · partenza tra ${s} s · ${et.pronto?"sei pronto":"Invio = pronto"} (${o}/${e.length})`}return i.fase==="partenza"?`Partenza · ${t.nome}`:i.fase==="gara"?`Gara ${i.numero} · ${t.giri} ${t.giri===1?"giro":"giri"} · ${e.length} ${e.length===1?"pilota":"piloti"} e ${i.partecipanti.length-e.length} avversari del computer`:`Prossima gara tra ${Math.max(0,Math.ceil(Qe.arrivo-Ph()))} s: ${we.piste[(i.pista+1)%we.piste.length].nome}`}function tA(){const i=G.vista;if(!i)return[];const t=i.ordine.map(n=>i.partecipanti.find(r=>r.id===n)).filter(Boolean),e=t[0];return t.map((n,r)=>{let s="";if(r===0)s=n.arrivo!==null?tn(n.arrivo):i.fase==="gara"?"in testa":"";else if(n.arrivo!==null&&e.arrivo!==null)s=tn(n.arrivo-e.arrivo,!0);else if(i.fase==="gara"){const o=e.totale-n.totale,a=Math.floor(o/Ve().lunghezza);s=a>=1?`+${a} ${a===1?"giro":"giri"}`:`+${(o/Nb).toFixed(1)}`}return{nome:n.nome,colore:Ye[n.livrea].primario,distacco:s,io:n.id===G.mioId}})}function eA(){const i=G.vista;if(!i)return;const t=hs[G.pistaAttiva];i.fase==="partenza"?(ve.semafori(i.luci,!1,!0),t==null||t.semafori(i.luci,!1),i.luci>G.luciPrima&&ki.luce(),G.luciPrima=i.luci):i.fase==="gara"&&i.cronometro+(G.sonoHost?0:(performance.now()-G.ricevuto)/1e3)<1.5?(ve.semafori(0,!0,!0),t==null||t.semafori(0,!0),G.luciPrima=0):(ve.semafori(0,!1,!1),t==null||t.semafori(0,!1),G.luciPrima=0)}function nA(i,t){var h,d;const e=ap(t),n=new Set([G.mioId]);for(const{p:g,a:_}of e)n.add(g.id),Jb(g.id,g.livrea).imposta(_);for(const[g,_]of G.macchine)n.has(g)||(_.rimuovi(),G.macchine.delete(g));et.macchina.imposta(et.spettatore?null:et.auto);const r=e.map(({p:g,a:_})=>({id:g.id,a:_}));et.spettatore||r.push({id:G.mioId,a:et.auto}),ds.aggiorna(r,i);let s;const o=Ve();if(et.spettatore||!et.contagiri){const g=e.find(_=>{var m;return _.p.id===((m=G.vista)==null?void 0:m.ordine[0])})??e[0];s=g?Oi.televisione(g.a,o,o.vicino(g.a.x,g.a.z).s):Oi.orbita(et.auto,i)}else s=Oi.insegui(et.auto,i,{modo:il[G.modo],collisioni:we.citta.collisioni,indietro:G.indietro,altre:e.map(g=>g.a)});const a=performance.now();vn.disegna(s,i),G.ultimoDisegno=performance.now()-a,ps.disegno+=G.ultimoDisegno,ki.aggiorna(et.spettatore?null:et.auto,e.map(g=>g.a),{x:s.x,z:s.z,yaw:s.yaw}),eA();const c=G.vista,l=c?c.partecipanti.filter(g=>!g.ia).length:1,u=c?c.ordine.indexOf(G.mioId)+1:0;ve.aggiorna({velocita:jo(et.auto),marcia:et.auto.marcia,rpm:et.auto.rpm,posizione:et.spettatore?0:u,totale:(c==null?void 0:c.ordine.length)??0,giro:((h=et.contagiri)==null?void 0:h.giro)??0,giri:(c==null?void 0:c.fase)==="gara"||(c==null?void 0:c.fase)==="arrivo"?o.giri:0,tempoGiro:et.arrivato||et.spettatore?null:(t-et.inizioGiro)/1e3,migliore:et.migliore,tempoGara:(c==null?void 0:c.fase)==="gara"?c.cronometro+(G.sonoHost?0:(t-G.ricevuto)/1e3):null,classifica:tA(),pista:o.nome,fase:Qb(),aiuto:`C telecamera (${il[G.modo]}) · V guarda dietro · R rimetti in pista · T aiuti ${et.auto.aiuti?"accesi":"spenti"} · M audio`,rete:`${G.sonoHost?"Organizzi tu":((d=G.coll)==null?void 0:d.modo)==="diretto"?"Collegato":G.coll?"Collegamento lento":"Cerco"} · Cerano ${G.numeroMondo??1} · ${l} ${l===1?"pilota":"piloti"}`,scia:et.auto.scia,spettatore:et.spettatore?"Sei spettatore: entri in pista alla prossima gara":"",auto:[...e.map(({p:g,a:_})=>({x:_.x,z:_.z,colore:Ye[g.livrea].primario,io:!1})),...et.spettatore?[]:[{x:et.auto.x,z:et.auto.z,colore:Ye[G.livrea].primario,io:!0}]]});const f=performance.now();Ni.aggiorna(vn.camera,i),ps.auto+=performance.now()-f}function iA(i){et.macchina.imposta(et.auto);const t=Oi.orbita(et.auto,i);vn.disegna(t,i),Ni.aggiorna(vn.camera,i)}const ps={passo:0,totale:0,disegno:0,auto:0,fotogrammi:0};let Lh=performance.now();function lp(i){requestAnimationFrame(lp);const t=Math.min(Zd,Math.max(0,(i-Lh)/1e3));if(Lh=i,!vn||document.hidden)return;const e=performance.now();if(G.fase==="titolo")iA(t);else if(G.fase==="gioco"){cp(t,i);const n=performance.now();nA(t,i),ps.passo+=n-e}ps.totale+=performance.now()-e,ps.fotogrammi+=1}let Dh=performance.now();function rA(){const i=performance.now(),t=Math.min(Zd,(i-Dh)/1e3);Dh=i,document.hidden&&G.fase==="gioco"&&cp(t,i)}function sA(){const i=ue("livree");Ye.forEach((t,e)=>{const n=document.createElement("button");n.type="button",n.title=t.nome,n.style.background=`linear-gradient(135deg, #${t.primario.toString(16).padStart(6,"0")} 0 58%, #${t.secondario.toString(16).padStart(6,"0")} 58%)`,n.setAttribute("aria-pressed",String(e===G.livrea)),n.addEventListener("click",()=>{var r;G.livrea=e,[...i.children].forEach((s,o)=>s.setAttribute("aria-pressed",String(o===e))),ue("nome-livrea").textContent=t.nome,(r=et.macchina)==null||r.colora(t)}),i.appendChild(n)}),ue("nome-livrea").textContent=Ye[G.livrea].nome,ue("nome").value=G.nome,ue("grafica").value=Pd(),ue("grafica").options[0].textContent=`Automatica (${ls[Ld()].nome})`,ue("grafica").addEventListener("change",()=>{iS(ue("grafica").value);const t=Ur(ue("nome").value);t&&bs(Bl,t),bs(Gl,G.livrea),location.reload()}),ue("modulo").addEventListener("submit",t=>{t.preventDefault(),ue("entra").disabled||Yb()})}async function oA(){sA(),Jr(.05,"Scarico le vie di Cerano…");const i=await fetch("./cerano/cerano.json");if(!i.ok)throw new Error(`cerano.json: ${i.status}`);const t=await i.json();Jr(.25,"Chiudo le strade e monto le barriere…"),await new Promise(r=>setTimeout(r,0)),we=cm(t),Jr(.4,"Accendo i lampioni…"),vn=await p1(ue("mondo"),we.citta,{ora:"tramonto",luciLampioni:0}),Jr(.7,"Porto le auto in griglia…"),Ni=await cE(vn.renderer,vn.scena,{quota:we.citta.quota}),hs=we.piste.map(r=>SE(vn.scena,r)),ds=VE(vn.scena,{quota:we.citta.quota}),Jr(.95,"Scaldo le gomme…"),Qd(0),et.macchina=Ni.crea(Ye[G.livrea],{pieno:!0}),Lo(0,!0);const e=Ve();for(let r=1;r<=Ob;r++){const s=e.griglia[r],o=Ni.crea(Ye[(G.livrea+r*3)%Ye.length]);o.imposta({x:s.x,z:s.z,yaw:s.yaw}),G.comparse.push(o)}ue("prossima").innerHTML=`Si corre su <b>${e.nome}</b><br>${e.sottotitolo} · ${(e.lunghezza/1e3).toFixed(2).replace(".",",")} km`;for(const r of hs)r.mostra(!0);Ni.precompila(vn.camera);for(const[r,s]of hs.entries())s.mostra(r===G.pistaAttiva);ue("carico").hidden=!0,ue("titolo").hidden=!1,ue("entra").disabled=!1,ue("entra").querySelector("span").textContent="IN PISTA",G.fase="titolo",G.nome||ue("nome").focus();const n=new Worker(new URL(""+new URL("orologio-worker-BMfkXUsT.js",import.meta.url).href,import.meta.url));n.onmessage=rA}requestAnimationFrame(lp);oA().catch(i=>{console.error("Avvio non riuscito:",i),ue("carico-testo").textContent="Non riesco a preparare la pista: ricarica la pagina."});
