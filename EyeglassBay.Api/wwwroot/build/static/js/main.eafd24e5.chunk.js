(this["webpackJsonpclient-app"]=this["webpackJsonpclient-app"]||[]).push([[0],{184:function(e,t,n){},212:function(e,t,n){"use strict";n.r(t),n.d(t,"history",(function(){return je}));var r=n(0),o=n(40),c=n.n(o),s=(n(183),n(184),n(223)),a=n(226),i=n(168),u=n(225),l=n(26),j=n(29),d=n.n(j),b=n(47),h=n(55),p=n(10),O=n(24),f=n.n(O),x=n(99);f.a.defaults.baseURL="/api",f.a.interceptors.request.use((function(e){var t=k.commonStore.token;return t&&(e.headers.Authorization="Bearer ".concat(t)),e})),f.a.interceptors.response.use(function(){var e=Object(b.a)(d.a.mark((function e(t){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",t);case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),(function(e){var t=e.response,n=t.data,r=t.status,o=t.config;switch(r){case 400:if("string"===typeof n&&x.b.error(n),"get"===o.method&&n.errors.hasOwnProperty("id")&&je.push("/not-found"),n.errors){var c=[];for(var s in n.errors)n.errors[s]&&c.push(n.errors[s]);throw c.flat()}x.b.error(n);break;case 401:break;case 404:je.push("/not-found");break;case 500:k.commonStore.setServerError(e),je.push("/server-error")}return Promise.reject(e)}));var m={current:function(){return v.get("/account")},login:function(e){return v.post("/account/login",e)}},g=function(e){return e.data},v={get:function(e){return f.a.get(e).then(g)},post:function(e,t){return f.a.post(e,t).then(g)},put:function(e,t){return f.a.put(e,t).then(g)},del:function(e){return f.a.delete(e).then(g)}},y={EyeGlasses:{listAll:function(){return v.get("/EyeGlasses")},getById:function(e){return v.get("/EyeGlasses/".concat(e))},create:function(e){return v.post("/EyeGlasses",e)},update:function(e){return v.put("/EyeGlasses/".concat(e.id),e)},delete:function(e){return v.del("/EyeGlasses/".concat(e))}},Account:m},w=n(164),S=function(){function e(){var t=this;Object(h.a)(this,e),this.user=null,this.login=function(){var e=Object(b.a)(d.a.mark((function e(n){var r;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,y.Account.login(n);case 3:r=e.sent,k.commonStore.setToken(r.token),Object(p.h)((function(){t.user=r})),je.push("/search"),k.modalStore.closeModal(),e.next=13;break;case 10:throw e.prev=10,e.t0=e.catch(0),e.t0;case 13:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(t){return e.apply(this,arguments)}}(),this.logout=function(){k.commonStore.setToken(null),window.localStorage.removeItem("jwt"),t.user=null,je.push("/")},this.getUser=Object(b.a)(d.a.mark((function e(){var n;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,y.Account.current();case 3:n=e.sent,Object(p.h)((function(){return t.user=n})),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),console.log(e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])}))),Object(p.d)(this)}return Object(w.a)(e,[{key:"isLoggedIn",get:function(){return!!this.user}}]),e}(),k={eyeglassStore:new function e(){var t=this;Object(h.a)(this,e),this.eyeGlasses=[],this.loading=!1,this.loadingInitial=!1,this.loadEyeglasses=Object(b.a)(d.a.mark((function e(){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.setLoadingInitial(!0),e.prev=1,e.next=4,y.EyeGlasses.listAll();case 4:t.eyeGlasses=e.sent,t.setLoadingInitial(!1),e.next=12;break;case 8:e.prev=8,e.t0=e.catch(1),console.log(e.t0),t.setLoadingInitial(!1);case 12:case"end":return e.stop()}}),e,null,[[1,8]])}))),this.setLoadingInitial=function(e){t.loadingInitial=e},Object(p.d)(this)},commonStore:new function e(){var t=this;Object(h.a)(this,e),this.error=null,this.token=window.localStorage.getItem("jwt"),this.appLoaded=!1,this.setServerError=function(e){t.error=e},this.setToken=function(e){t.token=e},this.setAppLoaded=function(){t.appLoaded=!0},Object(p.d)(this),Object(p.g)((function(){return t.token}),(function(e){e?window.localStorage.setItem("jwt",e):window.localStorage.removeItem("jwt")}))},userStore:new S,modalStore:new function e(){var t=this;Object(h.a)(this,e),this.modal={open:!1,body:null},this.openModal=function(e){t.modal.open=!0,t.modal.body=e},this.closeModal=function(){t.modal.open=!1,t.modal.body=null},Object(p.d)(this)}},I=Object(r.createContext)(k);function E(){return Object(r.useContext)(I)}var L=n(20),C=n(3),G=Object(L.a)((function(){var e=E().userStore,t=(e.user,e.logout);return Object(C.jsx)(a.a,{inverted:!0,fixed:"top",children:Object(C.jsxs)(s.a,{children:[Object(C.jsx)(a.a.Item,{as:l.b,to:"/",exact:!0,header:!0,children:Object(C.jsx)("img",{src:"/eye-glasses.png",alt:"logo",style:{marginRight:"10px"}})}),Object(C.jsx)(a.a.Item,{as:l.b,to:"/search",name:"Search"}),Object(C.jsx)(a.a.Item,{as:l.b,to:"/eyeglasses",name:"Eye Glasses"}),Object(C.jsx)(a.a.Item,{as:l.b,to:"/document-upload",name:"Upload Doc"}),Object(C.jsx)(a.a.Item,{as:l.b,to:"/errors",name:"Errors"}),Object(C.jsxs)(a.a.Item,{position:"right",children:[Object(C.jsx)(i.a,{src:"/user.png",avatar:!0,spaced:"right"}),Object(C.jsx)(u.a,{pointing:"top left",text:"Admin",children:Object(C.jsx)(u.a.Menu,{children:Object(C.jsx)(u.a.Item,{onClick:t,text:"Logout",icon:"power"})})})]})]})})})),A=n(12),F=n(235),B=n(234),T=n(231),M=n(104),P=n(227),U=n(132),z=n(74),R=n(129),N=function(e){var t=Object(M.c)(e.name),n=Object(R.a)(t,2),r=n[0],o=n[1];return Object(C.jsxs)(P.a.Field,{error:o.touched&&!!o.error,children:[Object(C.jsx)("label",{children:e.label}),Object(C.jsx)("input",Object(z.a)(Object(z.a)({},r),e)),o.touched&&o.error?Object(C.jsx)(U.a,{basic:!0,color:"red",children:o.error}):null]})},q=Object(L.a)((function(){var e=E().userStore;return Object(C.jsx)(M.b,{initialValues:{email:"",password:"",error:null},onSubmit:function(t,n){var r=n.setErrors;return e.login(t).catch((function(){return r({error:"Invalid email or password"})}))},children:function(e){var t=e.handleSubmit,n=e.isSubmitting,r=e.errors;return Object(C.jsxs)(P.a,{className:"ui form",onSubmit:t,autoComplete:"off",children:[Object(C.jsx)(B.a,{as:"h2",content:"Login to Eyeglass Bay",color:"teal",textAlign:"center"}),Object(C.jsx)(N,{name:"email",placeholder:"Email"}),Object(C.jsx)(N,{name:"password",placeholder:"Password",type:"password"}),Object(C.jsx)(M.a,{name:"error",render:function(){return Object(C.jsx)(U.a,{style:{marginBottom:10},basic:!0,color:"red",content:r.error})}}),Object(C.jsx)(T.a,{loading:n,positive:!0,content:"Login",type:"submit",fluid:!0})]})}})})),D=function(){var e=E(),t=e.userStore,n=e.modalStore;return Object(C.jsx)(F.a,{inverted:!0,textAlign:"center",vertical:!0,className:"masthead",children:Object(C.jsxs)(s.a,{text:!0,children:[Object(C.jsxs)(B.a,{as:"h1",inverted:!0,children:[Object(C.jsx)(i.a,{size:"massive",src:"/eye-glasses.png",alt:"logo",style:{marginBottom:"0.2em"}}),"Eyeglass Bay"]}),t.isLoggedIn?Object(C.jsxs)(C.Fragment,{children:[Object(C.jsx)(B.a,{as:"h2",inverted:!0,content:"Welcome to Reactivities"}),Object(C.jsx)(T.a,{as:l.a,to:"/search",size:"huge",inverted:!0,children:"Go to Search!"})]}):Object(C.jsx)(C.Fragment,{children:Object(C.jsx)(T.a,{onClick:function(){return n.openModal(Object(C.jsx)(q,{}))},size:"huge",inverted:!0,children:"Login!"})})]})})},J=n(167),V=["component"];function W(e){var t=e.component,n=Object(J.a)(e,V),r=E().userStore.isLoggedIn;return Object(C.jsx)(A.b,Object(z.a)(Object(z.a)({},n),{},{render:function(e){return r?Object(C.jsx)(t,Object(z.a)({},e)):Object(C.jsx)(A.a,{to:"/"})}}))}var H=n(232),K=n(224),Q=function(e){var t=e.inverted,n=void 0===t||t,r=e.content,o=void 0===r?"Loading...":r;return Object(C.jsx)(H.a,{active:!0,inverted:n,children:Object(C.jsx)(K.a,{content:o})})},X=n(228),Y=Object(L.a)((function(){var e=E().modalStore;return Object(C.jsx)(X.a,{open:e.modal.open,onClose:e.closeModal,size:"mini",children:Object(C.jsx)(X.a.Content,{children:e.modal.body})})})),Z=n(229),$=Object(L.a)((function(){var e=E().eyeglassStore;return Object(r.useEffect)((function(){(function(){var t=Object(b.a)(d.a.mark((function t(){return d.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.loadEyeglasses();case 2:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}})()()}),[e]),e.loadingInitial?Object(C.jsx)(Q,{content:"Loading app"}):Object(C.jsx)(C.Fragment,{children:Object(C.jsx)(Z.a,{children:e.eyeGlasses.map((function(e){return Object(C.jsx)(Z.a.Item,{children:e.productName},e.id)}))})})})),_=Object(L.a)((function(){return Object(C.jsx)("h1",{children:"Document Upload goes here"})})),ee=n(230),te=function(e){var t=e.errors;return Object(C.jsx)(ee.a,{error:!0,children:t&&Object(C.jsx)(ee.a.List,{children:t.map((function(e,t){return Object(C.jsx)(ee.a.Item,{children:e},t)}))})})},ne=function(){var e=Object(r.useState)(null),t=Object(R.a)(e,2),n=t[0],o=t[1];return Object(C.jsxs)(C.Fragment,{children:[Object(C.jsx)(B.a,{as:"h1",content:"Test Error component"}),Object(C.jsx)(F.a,{children:Object(C.jsxs)(T.a.Group,{widths:"7",children:[Object(C.jsx)(T.a,{onClick:function(){f.a.get("/buggy/not-found").catch((function(e){return console.log(e.response)}))},content:"Not Found",basic:!0,primary:!0}),Object(C.jsx)(T.a,{onClick:function(){f.a.get("/buggy/bad-request").catch((function(e){return console.log(e.response)}))},content:"Bad Request",basic:!0,primary:!0}),Object(C.jsx)(T.a,{onClick:function(){f.a.post("eyeGlasses",{}).catch((function(e){o(e)}))},content:"Validation Error",basic:!0,primary:!0}),Object(C.jsx)(T.a,{onClick:function(){f.a.get("/buggy/server-error").catch((function(e){return console.log(e.response)}))},content:"Server Error",basic:!0,primary:!0}),Object(C.jsx)(T.a,{onClick:function(){f.a.get("/buggy/unauthorised").catch((function(e){return console.log(e.response)}))},content:"Unauthorised",basic:!0,primary:!0}),Object(C.jsx)(T.a,{onClick:function(){f.a.get("EyeGlasses/dab").catch((function(e){return console.log(e.response)}))},content:"Bad Guid",basic:!0,primary:!0})]})}),n&&Object(C.jsx)(te,{errors:n})]})},re=Object(L.a)((function(){var e,t,n=E().commonStore;return Object(C.jsxs)(s.a,{children:[Object(C.jsx)(B.a,{as:"h1",content:"Server Error"}),Object(C.jsx)(B.a,{sub:!0,as:"h5",color:"red",content:null===(e=n.error)||void 0===e?void 0:e.response.statusText}),(null===(t=n.error)||void 0===t?void 0:t.response.data)&&Object(C.jsxs)(F.a,{children:[Object(C.jsx)(B.a,{as:"h4",content:"Stack trace",color:"teal"}),Object(C.jsx)("code",{style:{marginTop:"10px"},children:n.error.response.data})]})]})})),oe=n(68),ce=function(){return Object(C.jsxs)(F.a,{children:[Object(C.jsxs)(B.a,{icon:!0,children:[Object(C.jsx)(oe.a,{name:"search"}),"Oops - we've looked everywhere and could not find this."]}),Object(C.jsx)(F.a.Inline,{children:Object(C.jsx)(T.a,{as:l.a,to:"/search",primary:!0,children:"Return to Main page"})})]})},se=Object(L.a)((function(){return Object(C.jsx)("h1",{children:"Search page goes here"})}));var ae=Object(L.a)((function(){Object(A.g)();var e=E(),t=e.commonStore,n=e.userStore;return Object(r.useEffect)((function(){t.token?n.getUser().finally((function(){return t.setAppLoaded()})):t.setAppLoaded()}),[t,n]),t.appLoaded?Object(C.jsxs)(C.Fragment,{children:[Object(C.jsx)(x.a,{position:"bottom-right",hideProgressBar:!0}),Object(C.jsx)(Y,{}),Object(C.jsx)(A.b,{exact:!0,path:"/",component:D}),Object(C.jsx)(A.b,{path:"/(.+)",render:function(){return Object(C.jsxs)(C.Fragment,{children:[Object(C.jsx)(G,{}),Object(C.jsx)(s.a,{style:{marginTop:"7em"},children:Object(C.jsxs)(A.d,{children:[Object(C.jsx)(W,{exact:!0,path:"/",component:D}),Object(C.jsx)(W,{path:"/search",component:se}),Object(C.jsx)(W,{path:"/eyeglasses",component:$}),Object(C.jsx)(W,{path:"/document-upload",component:_}),Object(C.jsx)(W,{path:"/errors",component:ne}),Object(C.jsx)(A.b,{path:"/server-error",component:re}),Object(C.jsx)(A.b,{component:ce})]})})]})}})]}):Object(C.jsx)(Q,{content:"Loading app..."})})),ie=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,237)).then((function(t){var n=t.getCLS,r=t.getFID,o=t.getFCP,c=t.getLCP,s=t.getTTFB;n(e),r(e),o(e),c(e),s(e)}))},ue=(n(211),n(30));function le(){var e=Object(A.g)().pathname;return Object(r.useEffect)((function(){window.scrollTo(0,0)}),[e]),null}var je=Object(ue.a)();c.a.render(Object(C.jsx)(I.Provider,{value:k,children:Object(C.jsxs)(A.c,{history:je,children:[Object(C.jsx)(le,{}),Object(C.jsx)(ae,{})]})}),document.getElementById("root")),ie()}},[[212,1,2]]]);
//# sourceMappingURL=main.eafd24e5.chunk.js.map