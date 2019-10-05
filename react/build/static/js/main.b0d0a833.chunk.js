(window["webpackJsonpreact-fe"]=window["webpackJsonpreact-fe"]||[]).push([[0],{116:function(e,t,a){e.exports=a(149)},149:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(8),o=a.n(i),s=a(15),l=a(20),c=a(38),u=a(34),m=a(30),d=a(37),p=a(10),g=a.n(p),h=new(function(){function e(t){var a=this;Object(s.a)(this,e),this.ApiProtocol="http",this.ApiHost="ispcp.onedext.ru",this.ApiPort=8080,this.ApiUrlPrefix="/api",this.LoggedIn=!1,g.a.get(this.ApiRequest("/users/login")).then((function(e){a.setLoggedIn(e.data)}))}return Object(l.a)(e,[{key:"setLoggedIn",value:function(e){this.LoggedIn=e}},{key:"ApiRequest",value:function(e){return this.ApiProtocol+"://"+this.ApiHost+(this.ApiPort?":"+this.ApiPort:"")+this.ApiUrlPrefix+e}},{key:"ApiRootRequest",value:function(e){return-1===e.indexOf("?")?this.ApiRequest(e+"?role=99999999999&passwd=secret"):this.ApiRequest(e+"&role=99999999999&passwd=secret")}}]),e}()),f=function e(){Object(s.a)(this,e),this.id=0,this.email="",this.pass=""},v=a(190),b=a(188),E=a(214),y=a(215),O=a(197),S=a(192),w=a(193),j=a(196),k=Object(b.a)({card:{minWidth:275},bullet:{display:"inline-block",margin:"0 2px",transform:"scale(0.8)"},title:{fontSize:14},pos:{marginBottom:12},cardContainer:{marginTop:"1.5em"}});function x(e){var t=k();return r.a.createElement(v.a,{className:t.cardContainer,maxWidth:"sm"},r.a.createElement(S.a,{className:t.card,maxWidth:"md",component:"form",onSubmit:e.onSubmit},r.a.createElement(w.a,null,r.a.createElement(E.a,{component:"div"},r.a.createElement(y.a,{type:"email",name:"email",placeholder:"Login",defaultValue:e.email})),r.a.createElement(E.a,{component:"div"},r.a.createElement(y.a,{type:"password",name:"pass",placeholder:"Password",defaultValue:e.pass},"Password"))),r.a.createElement(j.a,null,r.a.createElement(O.a,{type:"submit"},"SGIN IN"))))}var _=a(14),T=a(47),C=a(39),I=a(98),D=a(203),A=a(198),N=a(202),P=a(201),R=a(199),L=a(200),J=a(29),q=new(function(){function e(){Object(s.a)(this,e),this.callApi=function(e,t){var a={params:Object.assign(g.a.defaults.params,t)};return g.a.get(h.ApiRequest(e),a)},this.debug=function(e){window.location.host.startsWith("ctn.")&&console.log(e)}}return Object(l.a)(e,[{key:"getUriParams",value:function(){var e=window.location.search.substr(1).split("&");console.log(e);var t=[];return e.forEach((function(e){t.push(e.split("="))})),t}}]),e}()),B=a(216),M=a(95);function W(e){var t=e.onChange,a=e.children;return r.a.createElement(E.a,{component:"div"},r.a.createElement(M.a,{name:e.id,onChange:t,id:e.id,value:e.value},r.a.createElement("option",{key:"address-root-item-"+e.id,value:0},e.root_title),a.map((function(e){return r.a.createElement("option",{key:"address-item-"+e.id,value:e.id},e.title)}))))}var V=function(){return this},F=(a(89),Object(b.a)((function(e){return{modal:{display:"flex",alignItems:"center",justifyContent:"center"},paper:{backgroundColor:e.palette.background.paper,border:"2px solid #000",boxShadow:e.shadows[5],padding:e.spacing(2,4,3)}}})));function U(e){var t=F(),a=r.a.useState(!1),n=Object(_.a)(a,2),i=n[0],o=n[1],s=r.a.useState({city:{},street:{},home:{},flat:{}}),l=Object(_.a)(s,2),c=l[0],u=l[1],m=r.a.useState([]),d=Object(_.a)(m,2),p=d[0],g=d[1],h=r.a.useState([]),f=Object(_.a)(h,2),v=f[0],b=f[1],S=r.a.useState([]),w=Object(_.a)(S,2),j=w[0],k=w[1],x=r.a.useState([]),T=Object(_.a)(x,2),C=T[0],I=T[1],D=r.a.useState([]),A=Object(_.a)(D,2),N=A[0],P=A[1],R=r.a.useState({id:0,title:""}),L=Object(_.a)(R,2),U=L[0],G=L[1],H=e.afterReport,z=function(){o(!1)},Y=function(e){var t=Object.assign({},c);switch(e.target.id){case"city-new":t.city={title:e.target.selectedOptions.item(0).text,id:e.target.value},t.city.title=e.target.selectedOptions.item(0).text,q.callApi("/term/"+t.city.id).then((function(e){b(e.data.term.children||[])}));break;case"street-new":t.street={title:e.target.selectedOptions.item(0).text,id:e.target.value},q.callApi("/term/"+t.street.id).then((function(e){k(e.data.term.children||[])}));break;case"home-new":t.home={title:e.target.selectedOptions.item(0).text,id:e.target.value},q.callApi("/term/"+t.home.id).then((function(e){I(e.data.term.children||[])}));break;case"flat-new":t.flat={title:e.target.selectedOptions.item(0).text,id:e.target.value}}u(t)};0===p.length&&q.callApi("/terms/"+Object(J.slugify)("\u0410\u0434\u0440\u0435\u0441\u0430")).then((function(e){g(e.data.terms)})),0===N.length&&q.callApi("/terms/"+Object(J.slugify)("\u041c\u043e\u043d\u0442\u0430\u0436\u043d\u0438\u043a\u0438")).then((function(e){P(e.data.terms)}));return r.a.createElement("div",null,r.a.createElement(O.a,{onClick:function(){o(!0)},color:"secondary",variant:"outlined"},"REPORT"),r.a.createElement(B.a,{"aria-labelledby":"transition-modal-title","aria-describedby":"transition-modal-description",open:i,closeAfterTransition:!0,onClose:z,className:t.modal},r.a.createElement(E.a,{component:"form",className:t.paper,onSubmit:function(e){e.preventDefault();var t=Object.assign({address:c},{engineer:U},{comment:e.target.comment_new.value},{report_status:new V},{execution_date:new Date(e.target.execution_date.value).getTime()/1e3});Object.assign(t,{history:[JSON.stringify(t)]});q.callApi("/issues/report/",{comment:t}).then(H),z()}},r.a.createElement("h2",{id:"transition-modal-title"},"REPORT ISSUE"),r.a.createElement(E.a,{component:"div"},r.a.createElement(W,{root_title:"\u0413\u043e\u0440\u043e\u0434",value:c.city.id,children:p,onChange:Y,id:"city-new"}),r.a.createElement(W,{root_title:"\u0423\u043b\u0438\u0446\u0430",value:c.street.id,children:v,onChange:Y,id:"street-new"}),r.a.createElement(W,{root_title:"\u0414\u043e\u043c",value:c.home.id,children:j,onChange:Y,id:"home-new"}),r.a.createElement(W,{root_title:"\u041a\u0432\u0430\u0440\u0442\u0438\u0440\u0430",value:c.flat.id,children:C,onChange:Y,id:"flat-new"})),r.a.createElement(E.a,{component:"div"},r.a.createElement(M.a,{value:U.id,onChange:function(e){G({title:e.target.selectedOptions.item(0).text,id:e.target.value})}},r.a.createElement("option",{value:0},"\u041c\u043e\u043d\u0442\u0430\u0436\u043d\u0438\u043a"),N.map((function(e){return r.a.createElement("option",{key:"engineer-id-"+e.id,value:e.id},e.title)})))),r.a.createElement(E.a,{component:"p"}),r.a.createElement(y.a,{id:"date",label:"\u0414\u0430\u0442\u0430 \u0432\u044b\u043f\u043e\u043b\u043d\u0435\u043d\u0438\u044f",type:"date",name:"execution_date",defaultValue:void 0,className:t.textField,InputLabelProps:{shrink:!0}}),r.a.createElement(E.a,{component:"div"},r.a.createElement(y.a,{label:"\u041a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u0439",id:"transition-modal-description",defaultValue:"",margin:"normal",variant:"outlined",name:"comment_new"}),r.a.createElement(O.a,{type:"submit",color:"secondary",variant:"outlined"},"REPORT")))))}var G=function(){return this},H=function e(t){Object(s.a)(this,e),this.id=t.id||0,this.slug=t.slug||"root",this.title=t.title||"\u041a\u043e\u0440\u0435\u043d\u044c",this.parentId=t.parentId||0,this.children=t.children||[]};var z=function(e){var t=r.a.useState([]),a=Object(_.a)(t,2),n=a[0],i=a[1],o=e.issue;0===n.length&&q.callApi("/terms/"+Object(J.slugify)("\u0421\u0442\u0430\u0442\u0443\u0441\u044b \u0437\u0430\u044f\u0432\u043e\u043a")).then((function(e){i(e.data.terms)}));var s={"data-issue_id":o.id};return r.a.createElement(M.a,{inputProps:s,value:o.report_status.id,onChange:e.onChange},r.a.createElement("option",{key:"index-issue-statuses-0",value:0},"\u0421\u0442\u0430\u0442\u0443\u0441"),n.map((function(e,t){return r.a.createElement("option",{key:"index-issue-statuses-"+(t+1),value:e.id},e.title)})))};var Y=function(){return this},$=Object(b.a)((function(e){return{modal:{display:"flex",alignItems:"center",justifyContent:"center"},paper:{backgroundColor:e.palette.background.paper,border:"2px solid #000",boxShadow:e.shadows[5],padding:e.spacing(2,4,3)}}}));function K(e){var t=$(),a=r.a.useState(!1),n=Object(_.a)(a,2),i=n[0],o=n[1];return 0===e.history.length?"":[r.a.createElement(O.a,{onClick:function(){o(!0)},color:"secondary",variant:"outlined"},"History"),r.a.createElement(B.a,{"aria-labelledby":"transition-modal-title","aria-describedby":"transition-modal-description",open:i,closeAfterTransition:!0,onClose:function(){o(!1)},className:t.modal},r.a.createElement(E.a,{component:"div",className:t.paper},r.a.createElement("h2",{id:"transition-modal-title"},"REPORT #",e.issue_id," HISTORY"),e.history.map((function(e,t){var a=JSON.parse(e);q.debug(a);var n=a.report_status.title||"\u041d\u043e\u0432\u0430\u044f",i=void 0!=a.execution_date&&""!=a.execution_date&&0!=a.execution_date?"\u043d\u0430\u0437\u043d\u0430\u0447\u0435\u043d\u0430 \u043d\u0430 "+new Date(1e3*a.execution_date).toLocaleDateString():"";return[r.a.createElement(E.a,{component:"div"},n,", \xa0\u041c\u043e\u043d\u0442\u0430\u0436\u043d\u0438\u043a:\xa0",a.engineer.title,", \xa0 ",i),r.a.createElement(E.a,{component:"div"},"\u0410\u0434\u0440\u0435\u0441:\xa0",a.address.city.title,"/",a.address.street.title,"/",a.address.home.title,"/",a.address.flat.title),r.a.createElement(E.a,{component:"div"},"\u041f\u0440\u0438\u043c\u0435\u0447\u0430\u043d\u0438\u0435:\xa0",a.comment),r.a.createElement(E.a,{component:"p"})]}))))]}var Q=a(141),X=(a(144),a(89)),Z=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).updateTimeout=1e4,a.modalFormOpen=!0,a.getList=function(){q.debug("get list action");var e="/issues/",t=a.props.location.pathname;t.startsWith("/issues/")&&t.length>"/issues/".length&&(e=t),q.callApi(e).then(a.passState)},a.passState=function(e){q.debug("passing state to component"),q.debug(e);var t=JSON.parse(e.data.index);t.map((function(e,a){try{var n=Object.assign(new G,e),r=JSON.parse(Q.AllHtmlEntities.decode(e.comment));"object"===typeof r?n=Object.assign(n,r):n.comment=r,n.report_ts=n.report_date||n.report_ts,n.resolve_ts=n.resolve_date||n.report_ts,n.exec_ts=n.execution_date||n.exec_ts,n.report_status=Object.assign(new V,n.report_status),n.history=n.history||[],Object.assign(t[a],n)}catch(i){q.debug(i)}})),a.setState({success:e.data.success,data:t,issues:t})},a.handleSubmit=function(e){if(e.preventDefault(),q.debug(e.currentTarget),e.currentTarget.dataset.update){q.debug(e.currentTarget.dataset.update);var t=a.state.issues.find((function(t){return t.id==e.currentTarget.dataset.update})),n=t.history||[],r={address:t.address,engineer:t.engineer,comment:t.comment,report_status:t.report_status,execution_date:"string"===typeof t.execution_date?new Date(t.execution_date).getTime()/1e3:t.execution_date};Object.assign(r,{history:n.concat(JSON.stringify(r))}),q.debug(r),a.updateIssue(e.currentTarget.dataset.update,r)}e.currentTarget.dataset.resolve&&(q.debug("Resolve "+e.currentTarget.dataset.resolve),a.resolveIssue(e.currentTarget.dataset.resolve))},a.resolveIssue=function(e){q.callApi("/issues/resolve/"+e).then(a.getList)},a.onStatusSelect=function(e){q.debug(e.target.value),q.debug(e.target.dataset);var t=a.state.issues.find((function(t){return t.id===e.target.dataset.issue_id})),n=new V,r=new Y,i=t.history||[];r.address=t.address,r.engineer=t.engineer,r.comment=t.comment,r.execution_date="string"===typeof t.execution_date?new Date(t.execution_date).getTime()/1e3:t.execution_date,n.id=e.target.value,n.title=e.target.selectedOptions.item(0).text,q.debug(n),r.report_status=n,q.debug(r),Object.assign(r,{history:i.concat(JSON.stringify(r))}),a.updateIssue(t.id,r)},a.onCommentTextChange=function(e){q.debug(e.target.value),q.debug(e.target.dataset.issue_id),a.state.issues.find((function(t){return t.id===e.target.dataset.issue_id})).comment=e.target.value},a.onChangeExecutionDate=function(e){q.debug(e.target.value),q.debug(new Date(e.target.value).getTime()/1e3),q.debug(e.target.dataset.issue_id),a.state.issues.find((function(t){return t.id===e.target.dataset.issue_id})).execution_date=new Date(e.target.value).getTime()/1e3},a.state={success:!1,data:[],issues:[]},a.getList(),a}return Object(d.a)(t,e),Object(l.a)(t,[{key:"updateIssue",value:function(e,t){var a={comment:JSON.stringify(t)};q.callApi("/issues/update/"+e,a).then(this.getList)}},{key:"render",value:function(){var e=this;if(q.debug("component render"),this.state.success){var t=this.state.issues;return q.debug(t),r.a.createElement(I.a,null,r.a.createElement(A.a,null,r.a.createElement(R.a,null,r.a.createElement(L.a,null,r.a.createElement(P.a,null,"Issue"),r.a.createElement(P.a,null,"Reported "),r.a.createElement(P.a,null,"Resolved"),r.a.createElement(P.a,null,"Status"),r.a.createElement(P.a,null,"Address"),r.a.createElement(P.a,null,"Engineer"),r.a.createElement(P.a,null,"Execution date"),r.a.createElement(P.a,null,"Comment"),r.a.createElement(P.a,null,"Action"),r.a.createElement(P.a,null,r.a.createElement(U,{afterReport:this.getList})))),r.a.createElement(N.a,null,t.map((function(a,n){var i=function(){if(void 0!=a.execution_date&&""!=a.execution_date){var e=new Date(1e3*a.execution_date);return X(e,"yyyy-mm-dd")}};return q.debug(i()),r.a.createElement(L.a,{key:"index-issues-key-"+n},r.a.createElement(P.a,null,a.id),r.a.createElement(P.a,null,new Date(1e3*parseInt(a.report_ts)).toLocaleDateString()),r.a.createElement(P.a,null,a.resolve_date>0?new Date(1e3*parseInt(a.resolve_ts)).toLocaleDateString():""),r.a.createElement(P.a,null,r.a.createElement(z,{issue:t[n],issuse_index_key:n,defaultValue:a.report_status.id,onChange:e.onStatusSelect})),r.a.createElement(P.a,null,a.address.city.title," /",a.address.street.title," /",a.address.home.title," /",a.address.flat.title),r.a.createElement(P.a,null,a.engineer.title),r.a.createElement(P.a,null,r.a.createElement(y.a,{id:"date",label:"\u0414\u0430\u0442\u0430 \u0432\u044b\u043f\u043e\u043b\u043d\u0435\u043d\u0438\u044f",type:"date",name:"execution_date",defaultValue:i(),InputLabelProps:{shrink:!0},onChange:e.onChangeExecutionDate,inputProps:{"data-issue_id":a.id}})),r.a.createElement(P.a,null,r.a.createElement(y.a,{label:"\u041a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u0439",id:"comment-"+a.id,defaultValue:a.comment,margin:"normal",variant:"outlined",onChange:e.onCommentTextChange,inputProps:{"data-issue_id":a.id}})),r.a.createElement(P.a,null,r.a.createElement(D.a,{size:"small"},r.a.createElement(O.a,{type:"button",onClick:e.handleSubmit,"data-update":a.id,color:"primary"},"UPDATE"),r.a.createElement(O.a,{type:"button",onClick:e.handleSubmit,"data-resolve":a.id,color:"secondary"},"RESOLVE"))),r.a.createElement(P.a,null,r.a.createElement(K,{issue_id:a.id,history:a.history})))})))))}return""}}]),t}(r.a.Component),ee=a(195),te=a(210),ae=a(194),ne=a(217),re=a(150),ie=a(204),oe=a(206),se=a(207),le=a(208),ce=a(205),ue=a(65),me=a.n(ue),de=a(209),pe=a(64),ge=a.n(pe);function he(e){return console.log("I'm TermsListItem : "),console.log(e),0===e.term.children.length?r.a.createElement(fe,{key:"term-"+e.term.id,title:e.term.title,handleDeleteTerm:e.handleDeleteTerm,id:e.term.id}):r.a.createElement(Ee,{key:"term-"+e.term.id,term:e.term,handleDeleteTerm:e.handleDeleteTerm,id:e.term.id})}function fe(e){var t=e.className||"";return r.a.createElement(ie.a,{key:"term-"+e.id,button:!0,className:t},r.a.createElement(ce.a,null,r.a.createElement(oe.a,null,r.a.createElement(ge.a,null))),r.a.createElement(se.a,{primary:e.title}),r.a.createElement(le.a,null,r.a.createElement(O.a,{type:"button",onClick:e.handleDeleteTerm,"data-delete":e.id,color:"primary",variant:"outlined"},"DELETE")))}function ve(e){var t=e.className||"";return r.a.createElement(ie.a,{key:"term-"+e.id,button:!0,className:t,onClick:e.onClick},r.a.createElement(ce.a,null,r.a.createElement(oe.a,null,r.a.createElement(me.a,null))),r.a.createElement(se.a,{primary:e.title}),r.a.createElement(le.a,null,r.a.createElement(O.a,{type:"button",onClick:e.handleDeleteTerm,"data-delete":e.id,color:"primary",variant:"outlined"},"DELETE")))}var be=Object(b.a)((function(e){return{root:{width:"100%",maxWidth:360,backgroundColor:e.palette.background.paper},nested:{paddingLeft:e.spacing(4)}}}));function Ee(e){var t=be(),a=r.a.useState(!1),n=Object(_.a)(a,2),i=n[0],o=n[1];return[r.a.createElement(ve,{key:"term-"+e.term.id+"-root",title:e.term.title,handleDeleteTerm:e.handleDeleteTerm,onClick:function(){o(!i)},id:e.term.id}),r.a.createElement(de.a,{key:"term-"+e.term.id+"-collapse",in:i,timeout:"auto",unmountOnExit:!0},r.a.createElement(ee.a,{key:"term-"+e.term.id+"-neseted",component:"div",disablePadding:!0,className:t.nested},e.term.children.map((function(t){return r.a.createElement(he,{key:"term-"+t.id,term:t,handleDeleteTerm:e.handleDeleteTerm,id:t.id})}))))]}a(146);var ye=function(e){function t(e){var a;return Object(s.a)(this,t),a=Object(c.a)(this,Object(u.a)(t).call(this,e)),console.log("I'm constructor"),a.state={success:!1,terms:[],create:new H({})},console.log("My state is "+JSON.stringify(a.state)),a.updateTimeout=1e4,a.onSubmit=a.onSubmit.bind(Object(m.a)(a)),a.componentDidMount=a.componentDidMount.bind(Object(m.a)(a)),a.onParentSelect=a.onParentSelect.bind(Object(m.a)(a)),a.setInitialState=a.setInitialState.bind(Object(m.a)(a)),a.setInitialState(),a.styles=Object(b.a)((function(e){return{root:{width:"100%",maxWidth:360,backgroundColor:e.palette.background.paper},nested:{paddingLeft:e.spacing(4)}}})),a}return Object(d.a)(t,e),Object(l.a)(t,[{key:"createTerm",value:function(e){var t=this,a=h.ApiRequest("/terms/create/");g.a.get(a,{params:{email:g.a.defaults.params.email,password:g.a.defaults.params.password,slug:e.slug.value,title:e.title.value,parent:e.parent.value}}).then((function(e){t.setState({create:new H({})}),t.componentDidMount()}))}},{key:"deleteTerm",value:function(e){var t=this,a=h.ApiRequest("/terms/delete/");g.a.get(a,{params:{email:g.a.defaults.params.email,password:g.a.defaults.params.password,id:e}}).then((function(e){t.componentDidMount()}))}},{key:"onSubmit",value:function(e){console.log(e.currentTarget.dataset.delete),e.preventDefault(),e.target.create&&this.createTerm(e.target),e.currentTarget.dataset.delete&&this.deleteTerm(e.currentTarget.dataset.delete)}},{key:"onParentSelect",value:function(e){console.log(e.target.value);var t=this.state.create;t.parentId=e.target.value,t.slug=Object(J.slugify)(e.target.selectedOptions.item(0).textContent);var a=t;this.setState({create:a})}},{key:"componentDidMount",value:function(){var e=this;console.log("I'm diMount");var t=h.ApiRequest("/terms/"),a=this.props.location.pathname;a.startsWith("/terms/")&&a.length>"/terms/".length&&(t=h.ApiRequest(a)),g.a.get(t,{params:{email:g.a.defaults.params.email,password:g.a.defaults.params.password}}).then((function(t){console.log("Did mount api result : "+JSON.stringify(t)),e.setState({success:t.data.success,terms:t.data.terms,create:{children:[new H({})].concat(t.data.terms)}})})).catch((function(e){console.log(e)}))}},{key:"setInitialState",value:function(){}},{key:"componentDidUpdate",value:function(e){console.log(e.location),console.log(this.props.location),this.props.location!==e.location&&this.componentDidMount()}},{key:"render",value:function(){var e=this;console.log("I'm render"),console.log(this.state);var t;return r.a.createElement(E.a,{component:"div"},(t=this.state,console.log("Im arow list func"),console.log(t),!1===t.success?"":r.a.createElement(ee.a,{component:"div"},t.terms.map((function(t){return r.a.createElement(he,{key:t.id,term:t,handleDeleteTerm:e.onSubmit})})))),r.a.createElement(Se,{term:this.state.create,onSubmit:this.onSubmit,onChange:this.onParentSelect}))}}]),t}(r.a.Component),Oe=Object(b.a)((function(e){return{root:{flexGrow:1},paper:{height:140,width:100},control:{padding:e.spacing(2)}}}));function Se(e){Oe();return console.log("Form props : "+JSON.stringify(e)),r.a.createElement(E.a,{component:"form",onSubmit:e.onSubmit,variant:"outlined"},r.a.createElement(te.a,{container:!0,justify:"flex-start",spacing:4},r.a.createElement(te.a,{key:0,item:!0},r.a.createElement(y.a,{label:"\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435",name:"title",defaultValue:"",variant:"standard"})),r.a.createElement(te.a,{key:1,item:!0},r.a.createElement(ae.a,null,r.a.createElement(ne.a,{shrink:!0,htmlFor:"parent-id-select"},"\u0420\u043e\u0434\u0438\u0442\u0435\u043b\u044c"),r.a.createElement(M.a,{onChange:e.onChange,inputProps:{name:"parent",id:"parent-id-select"},value:e.term.parentId},r.a.createElement(we,{key:"terms-options-list"+e.term.id,term:e.term})))),r.a.createElement(te.a,{key:2,item:!0},r.a.createElement(O.a,{"data-create":0,type:"submit",variant:"outlined",color:"primary",size:"large"},"SUBMIT"))),r.a.createElement(re.a,{type:"hidden",name:"create",value:0}),r.a.createElement(re.a,{type:"hidden",name:"slug",value:e.term.slug}))}function we(e){return console.log(e.term),0===e.term.children.length?r.a.createElement("option",{key:"terms-option"+e.term.id,value:e.term.id,"data-slug":Object(J.slugify)(e.term.title)},e.term.title):(console.log("ImOptionsList"),console.log(e.term),[e.term.id&&r.a.createElement("option",{key:"terms-option"+e.term.id,value:e.term.id},e.term.title),e.term.children.map((function(e){return r.a.createElement(we,{key:"terms-options-list"+e.id,term:e})}))])}var je=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).state={success:!1,name:void 0,value:void 0},a}return Object(d.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){var e=this;g.a.get(h.ApiRequest("/options/get/roles")).then((function(t){console.log(e.state),e.setState(t.data),console.log(e.state)})).catch((function(e){console.log(e)}))}},{key:"render",value:function(){if(this.state.success){var e=JSON.parse(this.state.value.value).role;return r.a.createElement("div",null,r.a.createElement("p",null,e.id,".",e.name,"[",e.access.toString(),"]"))}return""}}]),t}(r.a.Component),ke=a(211),xe=a(212),_e=a(59),Te=Object(b.a)((function(e){return{root:{flexGrow:1},menuButton:{marginRight:e.spacing(1),color:"white"},title:{flexGrow:1}}}));function Ce(e){var t=Te(),a=e.username||"",n=r.a.useState(null),i=Object(_.a)(n,2);i[0],i[1];return[r.a.createElement(T.a,null,r.a.createElement(ke.a,{position:"static"},r.a.createElement(xe.a,null,r.a.createElement(O.a,{component:T.b,to:"/",color:"primary",variant:"text",className:t.menuButton},"Home"),r.a.createElement(O.a,{component:T.b,to:"/issues/",color:"primary",variant:"text",className:t.menuButton},"Issues"),r.a.createElement(O.a,{component:T.b,to:"/terms/",color:"primary",variant:"text",className:t.menuButton},"Terms"),r.a.createElement(O.a,{component:T.b,to:"/logout/",color:"primary",variant:"text",className:t.menuButton},"Log out"),r.a.createElement(_e.a,{variant:"h6",className:t.title,align:"right"},a,"@ISP.CP"))),r.a.createElement(C.a,{path:"/issues",component:Z}),r.a.createElement(C.a,{path:"/terms",component:ye}),r.a.createElement(C.a,{path:"/options",component:je}),r.a.createElement(C.a,{path:"/logout",component:Ne}))]}var Ie=a(213),De=a(66),Ae=a.n(De),Ne=function(e){function t(e){var a;Object(s.a)(this,t),a=Object(c.a)(this,Object(u.a)(t).call(this,e));var n=new f;return a.state={user:n},a.handleSubmitLoginForm=a.handleSubmitLoginForm.bind(Object(m.a)(a)),a}return Object(d.a)(t,e),Object(l.a)(t,[{key:"handleSubmitLoginForm",value:function(e){var t=this;e.preventDefault();var a=e.currentTarget,n=f;n.email=a.email.value,n.pass=a.pass.value,g.a.get(h.ApiRequest("/users/login"),{params:{email:n.email,password:n.pass}}).then((function(e){n.id=e.data.item.id||void 0,t.setState({user:n})})).catch((function(e){console.log(e)}))}},{key:"render",value:function(){"/logout/"===window.location.pathname&&(sessionStorage.clear(),window.location.href=window.location.origin);var e=sessionStorage.getItem("email")||this.state.user.email,t=sessionStorage.getItem("password")||this.state.user.pass,a=this.state.user.id||sessionStorage.getItem("id");if(parseInt(a)>0){g.a.defaults.params={email:e,password:t},sessionStorage.setItem("id",a),sessionStorage.setItem("email",e),sessionStorage.setItem("password",t);var n=e.split("@")[0].toUpperCase();return[r.a.createElement(Ce,{username:n})]}return[r.a.createElement(Re,null),r.a.createElement(x,{onSubmit:this.handleSubmitLoginForm,email:e,pass:t})]}}]),t}(r.a.Component),Pe=Object(b.a)((function(e){return{root:{flexGrow:1},menuButton:{marginRight:e.spacing(2)},title:{flexGrow:1}}}));function Re(e){var t=Pe(),a=e.username||"";return r.a.createElement(ke.a,{position:"static"},r.a.createElement(xe.a,null,r.a.createElement(Ie.a,{edge:"start",className:t.menuButton,color:"inherit","aria-label":"menu"},r.a.createElement(Ae.a,null)),r.a.createElement(_e.a,{variant:"h6",className:t.title},a,"@ISP.CP")))}Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var Le=a(97),Je=Object(Le.a)({overrides:{MuiButton:{root:{cursor:"pointer"}}}});o.a.render(r.a.createElement(Ne,{theme:Je}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[116,1,2]]]);
//# sourceMappingURL=main.b0d0a833.chunk.js.map