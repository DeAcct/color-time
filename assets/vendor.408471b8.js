function g(){}const Y=t=>t;function P(t){return t()}function L(){return Object.create(null)}function $(t){t.forEach(P)}function W(t){return typeof t=="function"}function Z(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}function tt(t){return Object.keys(t).length===0}function et(t,...e){if(t==null)return g;const n=t.subscribe(...e);return n.unsubscribe?()=>n.unsubscribe():n}function kt(t,e,n){t.$$.on_destroy.push(et(e,n))}const G=typeof window!="undefined";let nt=G?()=>window.performance.now():()=>Date.now(),N=G?t=>requestAnimationFrame(t):g;const w=new Set;function H(t){w.forEach(e=>{e.c(t)||(w.delete(e),e.f())}),w.size!==0&&N(H)}function st(t){let e;return w.size===0&&N(H),{promise:new Promise(n=>{w.add(e={c:t,f:n})}),abort(){w.delete(e)}}}function ot(t,e){t.appendChild(e)}function I(t){if(!t)return document;const e=t.getRootNode?t.getRootNode():t.ownerDocument;return e&&e.host?e:t.ownerDocument}function rt(t){const e=ut("style");return it(I(t),e),e}function it(t,e){ot(t.head||t,e)}function Ft(t,e,n){t.insertBefore(e,n||null)}function ct(t){t.parentNode.removeChild(t)}function St(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function ut(t){return document.createElement(t)}function Ct(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function at(t){return document.createTextNode(t)}function At(){return at(" ")}function Ot(t,e,n,s){return t.addEventListener(e,n,s),()=>t.removeEventListener(e,n,s)}function jt(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function lt(t){return Array.from(t.childNodes)}function zt(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function Dt(t,e,n,s){t.style.setProperty(e,n,s?"important":"")}function J(t,e,n=!1){const s=document.createEvent("CustomEvent");return s.initCustomEvent(t,n,!1,e),s}const R=new Set;let C=0;function ft(t){let e=5381,n=t.length;for(;n--;)e=(e<<5)-e^t.charCodeAt(n);return e>>>0}function K(t,e,n,s,r,c,i,u=0){const f=16.666/s;let o=`{
`;for(let m=0;m<=1;m+=f){const y=e+(n-e)*c(m);o+=m*100+`%{${i(y,1-y)}}
`}const h=o+`100% {${i(n,1-n)}}
}`,d=`__svelte_${ft(h)}_${u}`,a=I(t);R.add(a);const l=a.__svelte_stylesheet||(a.__svelte_stylesheet=rt(t).sheet),_=a.__svelte_rules||(a.__svelte_rules={});_[d]||(_[d]=!0,l.insertRule(`@keyframes ${d} ${h}`,l.cssRules.length));const b=t.style.animation||"";return t.style.animation=`${b?`${b}, `:""}${d} ${s}ms linear ${r}ms 1 both`,C+=1,d}function dt(t,e){const n=(t.style.animation||"").split(", "),s=n.filter(e?c=>c.indexOf(e)<0:c=>c.indexOf("__svelte")===-1),r=n.length-s.length;r&&(t.style.animation=s.join(", "),C-=r,C||_t())}function _t(){N(()=>{C||(R.forEach(t=>{const e=t.__svelte_stylesheet;let n=e.cssRules.length;for(;n--;)e.deleteRule(n);t.__svelte_rules={}}),R.clear())})}let v;function E(t){v=t}function q(){if(!v)throw new Error("Function called outside component initialization");return v}function Nt(t){q().$$.on_mount.push(t)}function Rt(t){q().$$.on_destroy.push(t)}function qt(){const t=q();return(e,n)=>{const s=t.$$.callbacks[e];if(s){const r=J(e,n);s.slice().forEach(c=>{c.call(t,r)})}}}const k=[],Q=[],A=[],U=[],ht=Promise.resolve();let B=!1;function pt(){B||(B=!0,ht.then(V))}function O(t){A.push(t)}const T=new Set;let j=0;function V(){const t=v;do{for(;j<k.length;){const e=k[j];j++,E(e),mt(e.$$)}for(E(null),k.length=0,j=0;Q.length;)Q.pop()();for(let e=0;e<A.length;e+=1){const n=A[e];T.has(n)||(T.add(n),n())}A.length=0}while(k.length);for(;U.length;)U.pop()();B=!1,T.clear(),E(t)}function mt(t){if(t.fragment!==null){t.update(),$(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(O)}}let F;function gt(){return F||(F=Promise.resolve(),F.then(()=>{F=null})),F}function M(t,e,n){t.dispatchEvent(J(`${e?"intro":"outro"}${n}`))}const z=new Set;let p;function Bt(){p={r:0,c:[],p}}function Tt(){p.r||$(p.c),p=p.p}function bt(t,e){t&&t.i&&(z.delete(t),t.i(e))}function Mt(t,e,n,s){if(t&&t.o){if(z.has(t))return;z.add(t),p.c.push(()=>{z.delete(t),s&&(n&&t.d(1),s())}),t.o(e)}}const yt={duration:0};function Pt(t,e,n,s){let r=e(t,n),c=s?0:1,i=null,u=null,f=null;function o(){f&&dt(t,f)}function h(a,l){const _=a.b-c;return l*=Math.abs(_),{a:c,b:a.b,d:_,duration:l,start:a.start,end:a.start+l,group:a.group}}function d(a){const{delay:l=0,duration:_=300,easing:b=Y,tick:m=g,css:y}=r||yt,D={start:nt()+l,b:a};a||(D.group=p,p.r+=1),i||u?u=D:(y&&(o(),f=K(t,c,a,_,l,b,y)),a&&m(0,1),i=h(D,_),O(()=>M(t,a,"start")),st(S=>{if(u&&S>u.start&&(i=h(u,_),u=null,M(t,i.b,"start"),y&&(o(),f=K(t,c,i.b,i.duration,0,b,r.css))),i){if(S>=i.end)m(c=i.b,1-c),M(t,i.b,"end"),u||(i.b?o():--i.group.r||$(i.group.c)),i=null;else if(S>=i.start){const X=S-i.start;c=i.a+i.d*b(X/i.duration),m(c,1-c)}}return!!(i||u)}))}return{run(a){W(r)?gt().then(()=>{r=r(),d(a)}):d(a)},end(){o(),i=u=null}}}function Lt(t){t&&t.c()}function $t(t,e,n,s){const{fragment:r,on_mount:c,on_destroy:i,after_update:u}=t.$$;r&&r.m(e,n),s||O(()=>{const f=c.map(P).filter(W);i?i.push(...f):$(f),t.$$.on_mount=[]}),u.forEach(O)}function wt(t,e){const n=t.$$;n.fragment!==null&&($(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function xt(t,e){t.$$.dirty[0]===-1&&(k.push(t),pt(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function Wt(t,e,n,s,r,c,i,u=[-1]){const f=v;E(t);const o=t.$$={fragment:null,ctx:null,props:c,update:g,not_equal:r,bound:L(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(f?f.$$.context:[])),callbacks:L(),dirty:u,skip_bound:!1,root:e.target||f.$$.root};i&&i(o.root);let h=!1;if(o.ctx=n?n(t,e.props||{},(d,a,...l)=>{const _=l.length?l[0]:a;return o.ctx&&r(o.ctx[d],o.ctx[d]=_)&&(!o.skip_bound&&o.bound[d]&&o.bound[d](_),h&&xt(t,d)),a}):[],o.update(),h=!0,$(o.before_update),o.fragment=s?s(o.ctx):!1,e.target){if(e.hydrate){const d=lt(e.target);o.fragment&&o.fragment.l(d),d.forEach(ct)}else o.fragment&&o.fragment.c();e.intro&&bt(t.$$.fragment),$t(t,e.target,e.anchor,e.customElement),V()}E(f)}class Gt{$destroy(){wt(this,1),this.$destroy=g}$on(e,n){const s=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return s.push(n),()=>{const r=s.indexOf(n);r!==-1&&s.splice(r,1)}}$set(e){this.$$set&&!tt(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}const x=[];function Ht(t,e){return{subscribe:vt(t,e).subscribe}}function vt(t,e=g){let n;const s=new Set;function r(u){if(Z(t,u)&&(t=u,n)){const f=!x.length;for(const o of s)o[1](),x.push(o,t);if(f){for(let o=0;o<x.length;o+=2)x[o][0](x[o+1]);x.length=0}}}function c(u){r(u(t))}function i(u,f=g){const o=[u,f];return s.add(o),s.size===1&&(n=e(r)||g),u(t),()=>{s.delete(o),s.size===0&&(n(),n=null)}}return{set:r,update:c,subscribe:i}}function Et(t){const e=t-1;return e*e*e+1}function It(t){return--t*t*t*t*t+1}function Jt(t,{delay:e=0,duration:n=400,easing:s=Et}={}){const r=getComputedStyle(t),c=+r.opacity,i=parseFloat(r.height),u=parseFloat(r.paddingTop),f=parseFloat(r.paddingBottom),o=parseFloat(r.marginTop),h=parseFloat(r.marginBottom),d=parseFloat(r.borderTopWidth),a=parseFloat(r.borderBottomWidth);return{delay:e,duration:n,easing:s,css:l=>`overflow: hidden;opacity: ${Math.min(l*20,1)*c};height: ${l*i}px;padding-top: ${l*u}px;padding-bottom: ${l*f}px;margin-top: ${l*o}px;margin-bottom: ${l*h}px;border-top-width: ${l*d}px;border-bottom-width: ${l*a}px;`}}export{$t as A,wt as B,St as C,O as D,Pt as E,kt as F,It as G,Jt as H,Gt as S,At as a,jt as b,Dt as c,Ft as d,ut as e,ot as f,zt as g,ct as h,Wt as i,qt as j,Q as k,Ot as l,Ct as m,g as n,Bt as o,Mt as p,Tt as q,Ht as r,Z as s,at as t,bt as u,$ as v,vt as w,Nt as x,Rt as y,Lt as z};
