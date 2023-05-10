import{_ as u}from"../static/preload-helper-094304c8.js";import{g as l,F as c}from"../static/yext-favicon-096402c3.js";import{j as e,F as n,a as o,P as m}from"../static/index-4bb572da.js";import"../static/index-1b0cdb6b.js";const d=async(t,a)=>{const i=l();if(i.name=="node"&&i.getNodeMajorVersion()<18){const{default:r}=await u(()=>import("../static/browser-ponyfill-18aed945.js").then(s=>s.b),["assets/static/browser-ponyfill-18aed945.js","assets/static/index-1b0cdb6b.js"]);return r(t,a)}return fetch(t,a)},p=({title:t,url:a})=>e(n,{children:e("div",{className:"centered-container",children:o("div",{className:"max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700",children:[o("div",{className:"p-5",children:[e("a",{href:"#",children:e("h5",{className:"mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white",children:"This image below was fetched from an external API at build time. If you want to refresh it, you MUST rebuild."})}),e("p",{className:"mb-3 font-normal text-gray-700 dark:text-gray-400",children:t})]}),e("div",{children:e("img",{className:"rounded-t-lg",src:a,alt:""})})]})})}),q={name:"turtlehead-tacos"},x=async t=>{const i=await d("https://jsonplaceholder.typicode.com/photos/2").then(r=>r.json());return{...t,externalImage:i}},b=()=>"index.html",y=({relativePrefixToRoot:t,path:a,document:i})=>({title:"Static Page Example",charset:"UTF-8",viewport:"width=device-width, initial-scale=1",tags:[{type:"meta",attributes:{name:"description",content:"Static page example meta description."}},{type:"link",attributes:{rel:"icon",type:"image/x-icon",href:c}}]}),w=({relativePrefixToRoot:t,path:a,document:i,externalImage:r})=>e(n,{children:e(m,{children:o("div",{className:"centered-container",children:[e("div",{className:"bg-red-900 text-5xl font-bold text-white p-10 flex items-center justify-center flex-col gap-x-14 gap-y-10 md:flex-row",children:e("h1",{children:"Welcome to Turtlehead Tacos"})}),o("div",{className:"space-y-5",children:[e("p",{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}),e("p",{children:"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"}),e("div",{children:e(p,{...r})})]})]})})});export{q as config,w as default,y as getHeadConfig,b as getPath,x as transformProps};
