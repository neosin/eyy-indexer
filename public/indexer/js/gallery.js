"use strict";function _slicedToArray(e,t){return _arrayWithHoles(e)||_iterableToArrayLimit(e,t)||_unsupportedIterableToArray(e,t)||_nonIterableRest()}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _unsupportedIterableToArray(e,t){if(e){if("string"==typeof e)return _arrayLikeToArray(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?_arrayLikeToArray(e,t):void 0}}function _arrayLikeToArray(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function _iterableToArrayLimit(e,t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e)){var n=[],r=!0,i=!1,a=void 0;try{for(var o,l=e[Symbol.iterator]();!(r=(o=l.next()).done)&&(n.push(o.value),!t||n.length!==t);r=!0);}catch(e){i=!0,a=e}finally{try{r||null==l.return||l.return()}finally{if(i)throw a}}return n}}function _arrayWithHoles(e){if(Array.isArray(e))return e}
/**
 * @license
 * 
 * <gallery-mode-plugin>
 * 
 * A plugin for <eyy-indexer> [https://github.com/sixem/eyy-indexer]
 * 
 * Licensed under GPL-3.0
 * @author   emy [admin@eyy.co]
 * @version  0.22 (1.1.6)
 */
!function(v){v.fn.gallery=function(e){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{},g={data:{busy:!1,scrollbreak:!1,isChrome:/Chrome/.test(navigator.userAgent)&&/Google Inc/.test(navigator.vendor)}};g.store=v.extend({extensions:{image:["jpg","jpeg","gif","png","ico","svg","bmp","webp"],video:["mp4","webm"]},console:!0,blur:!0,filter:!0,start:0,fade:0,mobile:!1,scroll_interval:35,autoplay:!0,reverse_options:!0,fit_content:!1,list:{show:!0,reverse:!1},continue:{video:null}},g.store,t),g.loadImage=function(r){return new Promise(function(t,e){var n=new Image;n.addEventListener("load",function(e){return t([r,n])}),n.addEventListener("error",function(){e(new Error("failed to load image URL: ".concat(r)))}),n.src=r})},g.getExtension=function(e){return e.split(".").pop().toLowerCase()},g.getObjectSet=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return v(t.filter(function(e){return void 0!==e}).map(function(e){return v(e)}))},g.filterItems=function(e){return e.filter(function(e,t){return g.isImage(e.name)||g.isVideo(e.name)})},g.isImage=function(e){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:null;return g.store.extensions.image.includes(t||g.getExtension(e))},g.isVideo=function(e){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:null;return g.store.extensions.video.includes(t||g.getExtension(e))},g.getScrollBarWidth=function(){if(!(0<arguments.length&&void 0!==arguments[0]&&arguments[0])&&v(document).height()<=v(window).height())return 0;var e=v("<div>").css({visibility:"hidden",width:100,overflow:"scroll"}).appendTo("body"),t=v("<div>").css({width:"100%"}).appendTo(e).outerWidth();return e.remove(),100-t},g.limitBody=function(){var e=!(0<arguments.length&&void 0!==arguments[0])||arguments[0],t=v("body"),n=v("html"),r=g.getScrollBarWidth();!0===e?(g.data.body={"max-height":t.css("max-height"),overflow:t.css("overflow")},0<r&&n.css({"padding-right":r+"px"}),t.css({"max-height":"calc(100vh - var(--height-gallery-top-bar))",overflow:"hidden"})):(g.data.hasOwnProperty("body")&&t.css({"max-height":g.data.body["max-height"],overflow:g.data.body.overflow}),n.css({"padding-right":"unset"}))},g.exists=function(){return g.container=v("div.gallery-container"),0<g.container.length},g.show=function(){var e=!(0<arguments.length&&void 0!==arguments[0])||arguments[0],t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:null,n=2<arguments.length&&void 0!==arguments[2]?arguments[2]:null;n&&(g.store.console&&console.log("itemsUpdate",!0),g.data.selected.index=null,g.items=g.store.filter?g.filterItems(n):n,g.populateTable(g.items)),!0===e?(g.bind().show(),t!==g.data.selected.index&&(g.container.find(".media .wrapper img, .media .wrapper video").hide(),g.navigate(t)),g.container.find(".list").scrollTo(g.container.find("> .list").find("tr").eq(t))):(g.unbind(g.data.bound),g.container.hide()),g.store.blur&&(g.setBlur(e),g.limitBody(e));var r,i=g.container.find(".media .wrapper video"),a=g.container.find(".list table");0<i.length&&(!0===e&&i.is(":visible")?(r=0,g.store.continue.video&&i.find("source").attr("src")==g.store.continue.video.src&&(r=g.store.continue.video.time,g.store.continue.video=null),i[0].currentTime=r,i[0].muted=!1,i[0][g.store.autoplay?"play":"pause"]()):!1===e&&(i[0].muted=!0,i[0].pause())),0<a.length&&g.data.list_drag&&g.data.list_drag.css("height",a[0].scrollHeight+"px")},g.data.busy=null,g.data.busy_handle=null,g.tick=function(e){var t=parseInt(e.attr("data-tick"));return e.text("Loading "+".".repeat(t)).attr("data-tick",3<=t?1:t+1),e},g.busy=function(e){var t;return void 0!==e&&(g.data.busy=e,t=g.container.find(".media .loader"),v(t)[0].hasAttribute("data-tick")||v(t).attr("data-tick",1),e?(t.is(":hidden")&&t.stop().fadeIn(400),g.data.busy_handle=setInterval(function(){return g.tick(t)},225)):(t.is(":visible")&&t.stop().fadeOut(200,function(){return t.attr("data-tick",1).text("Loading .")}),g.data.busy||clearInterval(g.data.busy_handle))),g.data.busy},g.populateTable=function(e){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:null;return null===t&&(t=g.container.find(".list table")),t.html(""),e.forEach(function(e){return t.append('<tr title="'.concat(e.name,'"><td>').concat(e.name,"</td></tr>"))}),g.data.list_drag.css({height:t[0].scrollHeight+"px"}),t},g.hideExisting=function(e){var t=g.container.find(e).hide();return 0<t.length?t:null},g.setBlur=function(){return!0===(!(0<arguments.length&&void 0!==arguments[0])||arguments[0])?g.data.blurred=v("body > *:not(.gallery-container):not(script):not(noscript):not(style)").addClass("blur ns"):g.data.hasOwnProperty("blurred")&&g.data.blurred.removeClass("blur ns"),g},g.update={listWidth:function(e){var t=(t=0<arguments.length&&void 0!==e?e:null)||g.container.find(".media .wrapper"),n=g.data.list?g.data.list:g.container.find("div.list"),r=g.store.mobile||!n||n.is(":hidden")?0:n.outerWidth();t[0].style.setProperty("--width-list",r+"px")}},g.getReverseOptions=function(e){return{Google:"https://www.google.com/searchbyimage?image_url="+(e=encodeURIComponent(document.location.origin+e))+"&safe=off",Yandex:"https://www.yandex.com/images/search?rpt=imageview&img_url="+e,IQDB:"https://iqdb.org/?url="+e}},g.reverse=function(e){var t=!(1<arguments.length&&void 0!==arguments[1])||arguments[1],n=2<arguments.length&&void 0!==arguments[2]?arguments[2]:0;if(!g.store.reverse_options)return!1;if(0===g.container.find(".content-container .media .wrapper .cover").length)return!1;var r,i=g.container.find(".content-container .media .reverse");0===i.length&&(i=v("<div/>",{class:"reverse"}).appendTo(g.container.find(".content-container .media .wrapper .cover"))),!1!==t?(r=g.getReverseOptions(g.data.selected.src),i.html(Object.keys(r).map(function(e){return'<a class="reverse-link" target="_blank" href="'.concat(r[e],'">').concat(e,"</a>")}).join("|")),i.is(":hidden")&&i.show()):0<n?i.stop().fadeOut(n):i.hide()},g.shortenString=function(e,t){return t=t||28,e.length>t?[e.substr(0,Math.floor(t/2-2)),e.substr(e.length-Math.floor(t/2-2),e.length)].join(" .. "):e},g.setItemInfo=function(e,t,n){g.store.console&&console.log("itemSet",e);var r=g.store.mobile?g.shortenString(e.name,30):e.name;g.container.find(".bar > .right > a.download").attr("filename",e.name).attr("href",e.url).attr("title","Download: ".concat(e.name)),g.container.find(".bar > .left").html("<span>".concat(t+1," of ").concat(n,"</span>")+' | <a href="'.concat(e.url,'">').concat(r,"</a>")+(e.hasOwnProperty("size")&&!g.store.mobile?" | <span>".concat(e.size,"</span>"):""))},g.isScrolledIntoView=function(e,t){var n=e.offset().top-v(window).scrollTop();return!(n<t)&&!(n+e.outerHeight()>v(window).height())},g.scrollIntoView=function(e,t){t.stop().animate({scrollTop:e.offset().top-t.offset().top},0)},g.calculateIndex=function(e,t,n){var r=e+t;return n<r&&(r=r-n-1),r<0&&(r=n-(Math.abs(r)-1)),r<0||n<r?g.calculateIndex(e,n-r,n):r},g.createVideo=function(e){var t={controls:"",loop:""};g.store.autoplay&&(t.autoplay="");var n=v("<video/>",t);return[n,v("<source>",{type:"video/"+e,src:""}).appendTo(n)]},g.showItem=function(t,n,e,r,i){var a,o,l=5<arguments.length&&void 0!==arguments[5]?arguments[5]:null,s=g.container.find(".media .wrapper");0<g.store.fade&&s.hide();function d(){var e=s.find(0===t?"video":"img").hide();1===t&&e.parent(".cover").hide(),0<g.store.fade?s.stop().fadeOut(g.store.fade,function(){s.stop().fadeIn(g.store.fade)}):s.show(),g.busy(!1)}var c,u;g.container.find(".content-container .media .reverse"),0===t?(a=s.find("video"),g.store.console&&console.log("itemDimensions",l.img.height,"x",l.img.width),g.store.fit_content&&(l.img.width>l.img.height?(c="calc(calc(100vw - var(--width-list)) / ".concat((l.img.width/l.img.height).toFixed(4),")"),g.update.listWidth(s)):c="100%",n.css({width:"auto",height:c}),n.parent(".cover").css("height",c)),n.attr("src",e).show(),n.parent(".cover").show(),0<a.length&&(a[0].pause(),a.find("source").attr("src","")),d()):1===t&&(!1===r?(u=_slicedToArray(g.createVideo(g.data.selected.ext),2),a=u[0],o=u[1],a.appendTo(s)):(o=n.find("source"),a=n),o.attr("src",e),a[0].load(),g.store.continue.video&&e==g.store.continue.video.src&&(a[0].currentTime=g.store.continue.video.time,g.store.continue.video=null),a[0].addEventListener("canplay",function(){var e=a[0].videoHeight,t=a[0].videoWidth;g.store.console&&console.log("itemDimensions",e,"x",t),g.store.fit_content&&(g.update.listWidth(s),a.css({width:"auto",height:e<t?"calc(calc(100vw - var(--width-list)) / ".concat((t/e).toFixed(4),")"):"100%"})),a.show(),!1===r&&n.remove(),d()},!1)),g.data.selected.index=i},g.navigate=function(i){var e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:null;if(g.store.console&&console.log("busyState",g.busy()),g.busy())return!1;var t=g.items.length-1;if(null===i&&(i=g.data.selected.index),null!==e&&(i=g.calculateIndex(i,e,t)),g.data.selected.index!==i&&!0!==g.busy()){var n=g.items[i];g.setItemInfo(n,i,1+t),g.data.selected.src=n.url,g.data.selected.ext=g.getExtension(n.name);var a,r,o,l,s,d=g.container.find(".list"),c=d.find("table"),u=c.find("tr").eq(i);if(c.find("tr.selected").removeAttr("class"),u.attr("class","selected"),g.isScrolledIntoView(u,Math.floor(g.container.find(".bar").outerHeight()-4))||d.scrollTo(u),g.isImage(null,g.data.selected.ext))return g.busy(!0),o=g.container.find(".media .wrapper img"),s=g.container.find(".media .wrapper video"),a=0===o.length,0<s.length&&s[0].pause(),!0===a&&(r=v("<div/>",{class:"cover"}).hide().prependTo(g.container.find(".media .wrapper")),o=v("<img>").prependTo(r)),g.loadImage(n.url).then(function(e){var t=_slicedToArray(e,2),n=t[0],r=t[1];g.data.selected.src===n&&g.showItem(0,o,n,a,i,{img:r})}).catch(function(e){g.busy(!1),console.error(e)}),!0;if(g.isVideo(null,g.data.selected.ext))return g.busy(!0),s=g.container.find(".media .wrapper video"),(a=0===s.length)&&(s=(l=_slicedToArray(g.createVideo(g.data.selected.ext),2))[0],l[1],s.appendTo(g.container.find(".media .wrapper"))),g.showItem(1,s,n.url,a,i),!0}},g.data.key_prevent=[33,34,37,38,39,40,71],g.handleKey=function(e,t){g.store.console&&console.log("handleKey",e),27===e?g.show(!1):40===e||34===e||39===e?g.navigate(null,1):38===e||33===e||37===e?g.navigate(null,-1):76===e&&g.toggleList(),t(g.data.key_prevent.includes(e))},g.unbind=function(e){var t=!(1<arguments.length&&void 0!==arguments[1])||arguments[1];e.forEach(function(e){return e.hasOwnProperty("direct")&&!0===e.direct?(v(e.trigger).off(e.event),!0):void(e.trigger?v(document).off(e.event,e.trigger):v(document).off(e.event))}),!0===t&&v(g).trigger("unbound",!0)},g.scrollBreak=function(){g.data.scrollbreak=!1},g.toggleList=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:null,t=g.container.find(".list"),n=t.is(":visible"),r=JSON.parse(Cookies.get("ei-client"));return r.gallery.list_state=n?0:1,Cookies.set("ei-client",JSON.stringify(r),{sameSite:"lax",expires:365}),(e=e||v('.gallery-container div.bar .right span[data-action="toggle"]')).text("List"+(n?"+":"-")),t.css("display",n?"none":"table-cell"),g.update.listWidth(),!n},g.bind=function(){return g.data.bound=[{event:"click",trigger:"div.gallery-container .list table tr"},{event:"click",trigger:'div.gallery-container [data-action="close"]'},{event:"click",trigger:'div.gallery-container [data-action="toggle"]'},{event:"click",trigger:'div.gallery-container [data-action="previous"]'},{event:"click",trigger:'div.gallery-container [data-action="next"]'},{event:"click",trigger:"div.gallery-container .media"},{event:"DOMMouseScroll mousewheel",trigger:"div.gallery-container .media"},{event:"mouseover",trigger:"div.gallery-container .media .wrapper img"},{event:"mouseleave",trigger:"div.gallery-container .media .wrapper img"},{event:"mouseleave",trigger:"div.gallery-container .media .reverse a"},{event:"swipeleft",trigger:"div.gallery-container",direct:!0},{event:"swiperight",trigger:"div.gallery-container",direct:!0},{event:"mouseup",trigger:".gallery-container"},{event:"keydown",trigger:null},{event:"keyup",trigger:null}],g.unbind(g.data.bound,!1),g.data.list_drag.on("mousedown",function(e){g.data.list_dragged=!0;var r=window.innerWidth,t=g.container.find(".media .wrapper");v("body").css("cursor","w-resize"),t.css("pointer-events","none"),v(document).on("mousemove",".gallery-container",function(e){var t,n=e.originalEvent.clientX;n<r&&(t=g.store.list.reverse?n+g.data.scrollbar_width:r-n,g.data.list.css("width",t+"px"))})}),v(document).on("mouseup",".gallery-container",function(e){var t,n,r;!0===g.data.list_dragged&&(v(document).off("mousemove",".gallery-container"),t=g.container.find(".media .wrapper"),v("body").css("cursor",""),t.css("pointer-events","auto"),100<(n=parseInt(g.data.list.css("width").replace(/[^-\d\.]/g,"")))&&((r=JSON.parse(Cookies.get("ei-client"))).gallery.list_width=n,Cookies.set("ei-client",JSON.stringify(r),{sameSite:"lax",expires:365}),g.update.listWidth(t)))}),v(document).on("click",'div.gallery-container [data-action="close"]',function(e){g.show(!1)}),v(document).on("click",'div.gallery-container [data-action="toggle"]',function(e){g.toggleList(v(e.currentTarget))}),v(document).on("click",'div.gallery-container [data-action="previous"]',function(e){g.navigate(null,-1)}),v(document).on("click",'div.gallery-container [data-action="next"]',function(e){g.navigate(null,1)}),v(document).on("click","div.gallery-container .list table tr",function(e){g.navigate(v(e.currentTarget).index())}),v(document).on("click","div.gallery-container .media",function(e){v(e.target).is("img, video, a")||g.show(!1)}),!0===g.store.reverse_options&&v(document).on("mouseenter","div.gallery-container .media .wrapper .cover",function(e){g.reverse(v(e.currentTarget),!0)}),v(document).on("mouseleave","div.gallery-container .media .wrapper .cover",function(e){g.reverse(v(e.currentTarget),!1)}),!0===g.store.mobile&&(v("div.gallery-container").on("swipeleft",function(e,t){return g.navigate(null,1)}),v("div.gallery-container").on("swiperight",function(e,t){return g.navigate(null,-1)})),v(document).on("DOMMouseScroll mousewheel","div.gallery-container .media",function(e){return!(0<g.store.scroll_interval&&!0===g.data.scrollbreak)&&(g.navigate(null,0<e.originalEvent.detail||e.originalEvent.wheelDelta<0?1:-1),void(0<g.store.scroll_interval&&(g.data.scrollbreak=!0,setTimeout(function(){return g.scrollBreak()},g.store.scroll_interval))))}),v(document).on("keydown",v.fn,function(e){g.data.key_prevent.includes(e.keyCode)&&e.preventDefault(),71===e.keyCode&&g.show(!1)}),v(document).on("keyup",v.fn,function(t){g.handleKey(t.keyCode,function(e){e&&t.preventDefault()})}),v(g).trigger("bound",!0),g.container},g.barConstruct=function(e){v("<a/>",{text:g.store.mobile?"Save":"Download",class:"download",download:""}).appendTo(e),g.store.mobile||v("<span/>",{"data-action":"previous",text:"Previous"}).appendTo(e),g.store.mobile||v("<span/>",{"data-action":"next",text:"Next"}).appendTo(e),g.store.mobile||v("<span/>",{"data-action":"toggle",text:g.store.list.show?"List-":"List+"}).appendTo(e),v("<span/>",{"data-action":"close",text:"Close"}).appendTo(e)};return g.container=v("div.gallery-container"),g.items=g.store.filter?g.filterItems(e):e,0!==g.items.length&&(g.data.selected={src:null,ext:null,index:null,type:null},g.exists()?g.show(!0):function(e){g.limitBody(!0);var t=v("body").find("#image-preview, #video-preview");0<t.length&&t.remove(),g.container=v("<div/>",{class:"gallery-container"}).prependTo("body");var n=v("<div/>",{class:"bar"}).appendTo(g.container);v("<div/>",{class:"left"}).appendTo(n),g.barConstruct(v("<div/>",{class:"right"}).appendTo(n));var r=v("<div/>",{class:"content-container"}).appendTo(g.container),i=v("<div/>",{class:"media"}),a=v("<div/>",{class:"ns list"+(g.store.list.reverse?" reversed":"")});r.append(g.store.list.reverse?a:i).append(g.store.list.reverse?i:a),g.data.list_drag=v("<div/>",{class:"drag"+(g.store.list.reverse?" reversed":"")}).appendTo(a),g.data.list=a,g.data.list_dragged=!1,g.data.scrollbar_width=g.getScrollBarWidth(!0);var o=JSON.parse(Cookies.get("ei-client"));try{var l=JSON.parse(o.gallery.list_width.toString().toLowerCase());!1===l?l="auto":parseInt(l)>window.innerWidth/2&&(o.gallery.list_width=Math.floor(window.innerWidth/2),Cookies.set("ei-client",JSON.stringify(o),{sameSite:"lax",expires:365})),g.data.list.css("width",l)}catch(e){o.gallery.list_width=!1,Cookies.set("ei-client",JSON.stringify(o),{sameSite:"lax",expires:365})}g.store.list.show||a.hide(),!0===g.store.mobile&&(a.hide(),v("<span/>",{}).appendTo(v("<div/>",{class:"screen-nav left","data-action":"previous"}).appendTo(r)),v("<span/>",{}).appendTo(v("<div/>",{class:"screen-nav right","data-action":"next"}).appendTo(r))),v("<div/>",{class:"wrapper"+(g.store.fit_content?" fill":"")}).appendTo(i),v("<div/>",{class:"loader"+(g.store.list.reverse?" reversed":"")}).html("Loading ..").appendTo(i),v("<tbody/>").appendTo(v("<table/>",{cellspacing:"0"}).appendTo(a)),g.populateTable(g.items),e(!0)}(function(){g.store.blur&&g.setBlur(!0).bind()}),g.navigate(g.store.start>g.items.length-1?g.items.length-1:g.store.start),g)}}(jQuery);