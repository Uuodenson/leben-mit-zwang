(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[520],{7889:(e,s,a)=>{Promise.resolve().then(a.bind(a,7527))},7527:(e,s,a)=>{"use strict";a.r(s),a.d(s,{default:()=>o});var t=a(5155),l=a(7439),n=a(399),r=a(2115);function o(){let[e,s]=(0,r.useState)(""),[a,o]=(0,r.useState)(""),[i,c]=(0,r.useState)();async function d(s){s.preventDefault();let t=(0,n.xI)(l.Q);(0,n.x9)(t,e,a).then(e=>{let s=e.user;c(s),localStorage.setItem("user",JSON.stringify(s)),console.log("User logged in",s),window.location.href="/profile"}).catch(e=>{console.log(e)})}return(0,t.jsx)("div",{className:"flex flex-row min-h-screen justify-center items-center m-2 text-slate-900",children:(0,t.jsxs)("div",{className:"bg-white p-8 rounded-lg shadow-md w-full max-w-md",children:[i&&(0,t.jsxs)("h2",{className:"text-2xl font-bold text-center mb-6",children:["Logging In as ",i.email]}),(0,t.jsxs)("form",{onSubmit:d,action:"",method:"get",className:"flex flex-col gap-4",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{htmlFor:"email",className:"block mb-2",children:"Email:"}),(0,t.jsx)("input",{onChange:e=>{s(e.target.value)},type:"text",id:"email",name:"email",className:"w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{htmlFor:"password",className:"block mb-2",children:"Password:"}),(0,t.jsx)("input",{onChange:e=>{o(e.target.value)},type:"password",id:"password",name:"password",className:"w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"})]}),(0,t.jsx)("button",{type:"submit",className:"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline",children:"Log in"}),(0,t.jsxs)("p",{className:"text-center text-gray-600",children:["No Accountt?"," ",(0,t.jsx)("a",{href:"/singup",className:"text-blue-500 hover:underline",children:"Signup"})]})]})]})})}},7439:(e,s,a)=>{"use strict";a.d(s,{Q:()=>n,db:()=>r});var t=a(9904),l=a(7058);let n=(0,t.Wp)({apiKey:"AIzaSyCcHErKKMChASKp7yLgBRH5xE_nwMIC7C8",authDomain:"lebem-mit-zwang.firebaseapp.com",projectId:"lebem-mit-zwang",storageBucket:"lebem-mit-zwang.firebasestorage.app",messagingSenderId:"408968648776",appId:"1:408968648776:web:4ce590ba59a7cb45bda07d",measurementId:"G-M3Z7D02S82"}),r=(0,l.aU)(n)}},e=>{var s=s=>e(e.s=s);e.O(0,[992,882,459,441,517,358],()=>s(7889)),_N_E=e.O()}]);