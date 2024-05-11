import{d as P,c as x,o as b,a as k,b as z,w as _,u as y,F as j,e as R,T as A,m as C,f as S,r as F,t as U,g as B,h as N,i as V,j as M,I as O,k as L,S as I,_ as T,l as s,n as $}from"./index-fd5cd2f1.js";const D={key:0,class:"editable-table"},H=P({__name:"index",props:{tableProps:{type:Object,default:null},rules:{type:Object,default:null}},setup(o){const n={input:O,"input-number":L,select:I},c=o,i=x(()=>{const l=c.tableProps.scroll;return l?(l.y=0,l):{y:0}}),u=x(()=>c.rules?new Array(c.tableProps.dataSource.length).fill(c.rules):null);return(l,e)=>o.tableProps&&o.tableProps.columns&&o.tableProps.dataSource?(b(),k("div",D,[z(y(j),{autocomplete:"off",model:o.tableProps.dataSource,rules:y(u)},{default:_(()=>[z(y(A),C(c.tableProps,{pagination:!1,bordered:"",scroll:y(i)}),{bodyCell:_(({column:a,record:r,index:p})=>[a.key&&a.editComp?(b(),S(y(N),{key:0,name:[p,a.key]},{default:_(()=>[(b(),S(F(n[a.editComp.type]),C({value:r[a.key],"onUpdate:value":f=>r[a.key]=f},a.editComp.props||{},U(a.editComp.on||{})),{default:_(()=>[B(l.$slots,`col-${a.key}-comp-slot`,{},void 0,!0)]),_:2},1040,["value","onUpdate:value"]))]),_:2},1032,["name"])):(b(),k(V,{key:1},[M("请指定column.key和column.editComp")],64))]),_:3},16,["scroll"])]),_:3},8,["model","rules"])])):R("",!0)}});const K=T(H,[["__scopeId","data-v-c16d099f"]]),q={input:O,"input-number":L,select:I},G=P({name:"AliveTable",props:{schema:{type:Object,default:null},model:{type:Object,default:null},rules:{type:Object,default:null}},setup(o,{slots:n}){if(!o.schema||!o.model)return()=>null;const c=u=>u.map(l=>s("div",{class:"cell custom-row-cell",style:{flex:l.width?"none":null,width:l.width?l.width:null}},l.content)),i=(u,l)=>u.map(e=>{if(e.type==="field"){if(!e.key&&!e.keyPath)throw"存在field没有指定key或keyPath";e.keyPath||(l?e.keyPath=l.keyPath+"."+e.key:e.keyPath=e.key);const a=e.keyPath.split(".");let r=o.model;a.forEach((t,h)=>{h<a.length-1&&Reflect.has(r,t)&&(r=r[t])});const p=a[a.length-1];let f;const g={};if(Object.keys(n).forEach(t=>{if(t.includes(`field-${e.key}-comp-slot`))if(t===`field-${e.key}-comp-slot`||t===`field-${e.key}-comp-slot-default`)g.default=n[t];else{const h=t.split("-"),d=h[h.length-1];g[d]=n[t]}}),e.value.type==="string")f=s("span",null,e.value.content||"");else if(e.value.type==="input"||e.value.type==="input-number"||e.value.type==="select")f=s(N,{name:a},()=>s(q[e.value.type],{value:r[p],"onUpdate:value":t=>{r[p]=t},...e.value.compProps},g));else if(e.value.type==="slot"){const t=n[`field-${e.key}-slot`];f=t&&t()}else if(e.value.type==="editable-table"){let t=o.rules;if(o.rules)for(let d=0;d<a.length;d++){const v=a[d];if(Reflect.has(t,v))t=t[v];else{t=null;break}}const h={};Object.keys(n).forEach(d=>{if(d.includes(`table-${e.key}-col-`)){const v=d.split("-"),E=v[v.length-3];h[`col-${E}-comp-slot`]=n[d]}}),f=s(K,{tableProps:{...e.value.compProps,dataSource:r[p]},rules:t},h)}const w=[s("div",{class:{cell:e.value.type==="string",value:!0,slot:e.value.type==="slot"},style:{flex:e.value.size?"none":null,width:e.layout==="horizontal"&&e.value.size?e.value.size:null,height:e.layout==="vertical"&&e.value.size?e.value.size:null,border:e.label?null:"none"}},f)];return e.label&&w.unshift(s("div",{class:"cell label",style:{flex:e.label.size?"none":null,width:e.layout==="horizontal"&&e.label.size?e.label.size:null,height:e.layout==="vertical"&&e.label.size?e.label.size:null}},e.name||"")),s("div",{class:{row:!l,field:!0,[e.key||e.keyPath]:!0,vertical:e.layout==="vertical"},style:{flex:e.size||l&&l.contentLayout==="float"?"none":null,width:l&&l.contentLayout==="horizontal"&&e.size?e.size:l&&l.contentLayout==="float"&&e.width?e.width:null,height:!l||l.contentLayout==="vertical"&&e.size?e.size:l&&l.contentLayout==="float"&&e.height?e.height:null}},w)}else if(e.type==="field-group"){if(!e.key)throw"存在field-group没有指定key";l?e.keyPath=l.keyPath+"."+e.key:e.keyPath=e.key;const a=[s("div",{class:{content:!0,vertical:e.contentLayout==="vertical",float:e.contentLayout==="float"},style:{border:e.label?null:"none"}},i(e.children,e))];return e.label&&a.unshift(s("div",{class:"cell label",style:{flex:e.label.size?"none":null,width:e.layout==="horizontal"&&e.label.size?e.label.size:null,height:e.layout==="vertical"&&e.label.size?e.label.size:null}},e.name||"")),s("div",{class:{row:!0,"field-group":!0,vertical:e.layout==="vertical"},style:{flex:e.height?"none":null,height:e.height?e.height:null}},a)}else if(e.type==="custom-row")return s("div",{class:"custom-row",style:{flex:e.height?"none":null,height:e.height?e.height:null}},c(e.children))});return()=>{const u=i(o.schema);return s("div",{class:"alive-table"},s(j,{autocomplete:"off",model:o.model,rules:o.rules},()=>u))}}});const J=T(G,[["__scopeId","data-v-ff732a70"]]),Q=[],W={class:"demo-page"},Y=P({__name:"index",setup(o){const n=$({}),c=$({});return(i,u)=>(b(),k("div",W,[z(y(J),{schema:y(Q),model:n.value,"onUpdate:model":u[0]||(u[0]=l=>n.value=l),rules:c.value},null,8,["schema","model","rules"])]))}});export{Y as default};