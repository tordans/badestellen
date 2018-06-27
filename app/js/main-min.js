function retrieveUrl(){state={type:"overview",id:null,ani:!1};var e=window.location.href.split("?");if(e.length>1){var t=e[1].split("&"),i=t[0].split("=");"id"==i[0]&&i[1]in gKeys&&(state.type="detail",state.id=i[1],i=t[1].split("="),state.ani=i[1])}updateInterface()}function updateInterface(){"detail"==state.type?openDetails(state.id,"true"==state.ani):(d3.selectAll(".marker").classed("inactive",!1),d3.select("#detail").style("display","none"),d3.select("#detail *").remove(),d3.select("#home").style("display","block"))}function debounce(e,t,i){var a;return function(){var s=this,n=arguments,r=function(){a=null,i||e.apply(s,n)},l=i&&!a;clearTimeout(a),a=setTimeout(r,t),l&&e.apply(s,n)}}function detectIE(){var e=window.navigator.userAgent,t=e.indexOf("MSIE ");if(t>0)return parseInt(e.substring(t+5,e.indexOf(".",t)),10);if(e.indexOf("Trident/")>0){var i=e.indexOf("rv:");return parseInt(e.substring(i+3,e.indexOf(".",i)),10)}var a=e.indexOf("Edge/");return a>0&&parseInt(e.substring(a+5,e.indexOf(".",a)),10)}function openDetails(e,t){function i(e){return"/"==e.substr(e.length-1,1)&&(e=e.substr(0,e.length-1)),e.replace("http://","")}t?map.flyTo({center:locations[e],zoom:14}):map.flyTo({center:locations[e]}),d3.selectAll(".marker").classed("inactive",!0),d3.select("#marker_"+e).classed("inactive",!1),d3.select("#home").style("display","none"),d3.selectAll("#detail *").remove();var a=gData[gKeys[e]],s={1:"Zum Baden geeignet",2:"Zum Baden geeignet",11:"Zum Baden geeignet",12:"Zum Baden geeignet",3:"Vom Baden wird abgeraten",4:"Vom Baden wird abgeraten",13:"Vom Baden wird abgeraten",14:"Vom Baden wird abgeraten",10:"Vom Baden wird abgeraten",9:"Keine Angabe",5:"Badeverbot",6:"Badeverbot",15:"Badeverbot",16:"Badeverbot"},n=new Date(a.m_date),r="https://maps.google.com/maps?daddr="+locations[e][1]+","+locations[e][0];-1==navigator.platform.indexOf("iPhone")&&-1==navigator.platform.indexOf("iPod")&&-1==navigator.platform.indexOf("iPad")||(r="maps://maps.google.com/maps?daddr="+locations[e][1]+","+locations[e][0]);var l='<div class="detail-header">  <a id="closebtn">&laquo;&nbsp;zurück&nbsp;zur&nbsp;Übersicht</a>  <h1>'+a.name_lang+" <span>"+a.bezirk+'</span></h1>  <hr class="closer" /></div><div class="detail-body">  <div class="detail-image">    <img src="'+a.image+'" alt="'+a.name+'" title="'+a.name+'"><br />    <span class="caption">Bild: LAGeSo</span>  </div>  <div class="detail-location">    <h3 class="title">Anschrift</h3>    '+a.name_lang+"<br />    "+a.strasse+"<br />    "+parseInt(a.plz)+" "+a.stadt;a.webseite&&a.webseite.length>0&&(l+='<br /><a href="'+a.webseite+'"><span>'+i(a.webseite)+"</span></a>"),l+='<br /><br />    <a href="'+r+'"><img src="'+(is_detail?"../":"./")+'images/signs/location@2x.png" width="30" height="30" alt="Route berechnen" />&nbsp;<span>Route berechnen</span></a><br />    <a href="http://www.fahrinfo-berlin.de/Fahrinfo/bin/query.bin/dn?seqnr=&amp;ident=&amp;ZID=A=16@X='+parseFloat(locations[e][0]).toFixed(6).toString().replace(".","")+"@Y="+parseFloat(locations[e][1]).toFixed(6).toString().replace(".","")+'@O=WGS84%2052%B027%2747%20N%2013%B010%2747%20E&amp;ch"><img src="'+(is_detail?"../":"./")+'images/signs/location@2x.png" width="30" height="30" alt="Anfahrt mit der BVG" />&nbsp;<span>Anfahrt mit der BVG</span></a><br />    <h3>Wasserqualität</h3>    <span class="stufen-icon stufen-'+a.real_state+'"></span>'+s[a.real_state]+'<br /><span class="small">(Letzte Messung: '+n.getDate()+"."+(n.getMonth()+1)+"."+(n.getYear()-100)+")</span>";var d=["sicht_txt","eco_txt","ente_txt","temp_txt","algen_txt","cb_txt"],g=["Sichttiefe","Escherichia coli","Intestinale Enterokokken","Wassertemperatur","Erhöhtes Algenauftreten","Coliforme Bakterien"],o=["cm","pro 100 ml","pro 100 ml","°C","","pro 100 ml"],c=!1;if(d.forEach(function(e){e in a&&a[e].length>0&&(c=!0)}),c){l+='<table cellpadding="0" cellmargin="0" border="0" class="measurement_table">';var p=1;d.forEach(function(e,t){e in a&&a[e].length>0&&(l+='<tr class="row-'+p+'"><th>'+g[t]+"</th><td>"+("algen_txt"==e?"A"==a[e]?"Ja":"Nein":a[e]+" "+o[t])+"</td></tr>",p++)}),l+="</table>"}l+=null!=a.prediction&&"null"!=a.prediction?'<span class="prediction"><img src="'+(is_detail?"../":"./")+'images/signs/prediction@2x.png" width="30" height="30" alt="" />Die hier angezeigte Bewertung wird unterstützt durch eine neuartige tagesaktuelle Vorhersagemethode. <a href="info.html">Erfahren Sie mehr&nbsp;&raquo;</a></span>':"";var h;switch(a.letzte_eu_einstufung.toLowerCase()){case"mangelhaft":h="poor";break;case"ausreichend":h="sufficient";break;case"ausgezeichnet":h="excellent";break;case"gut":h="good";break}l+='<div class="detail-eu">    <h3 class="title">EU-Einstufung</h3>    <p class="small">Auswertung der letzten vier Jahre.</p>    <span class="eu-ranks"><img class="eu-class" src="'+(is_detail?"../":"./")+"/images/eu-signs/"+h+'@2x.png" width="92" height="81" alt="Ausgezeichnete Badegewässerqualität" />    <img src="'+(is_detail?"../":"./")+'images/eu-signs/legend_excellent@2x.png" width="49" height="14" alt="Ausgezeichnet" />&nbsp;Ausgezeichnet<br />    <img class="first" src="'+(is_detail?"../":"./")+'images/eu-signs/legend_good@2x.png" width="49" height="14" alt="Gut" />&nbsp;Gut<br />    <img src="'+(is_detail?"../":"./")+'images/eu-signs/legend_sufficient@2x.png" width="49" height="14" alt="Ausreichend" />&nbsp;Ausreichend<br />    <img src="'+(is_detail?"../":"./")+'images/eu-signs/legend_poor@2x.png" width="49" height="14" alt="Mangelhaft" />&nbsp;Mangelhaft</span><br /></div></div>',l+='  <div class="detail-addon">    <h3 class="title">Weitere Angaben zur Badesstelle</h3>    <ul>',a.cyano_moeglich&&0!=a.cyano_moeglich&&(l+='<li><img src="'+(is_detail?"../":"./")+'images/signs/cyano@2x.png" width="30" height="30" alt="Cyanobakterien massenhaft möglich (Blaualgen)" />&nbsp;Cyanobakterien massenhaft möglich (Blaualgen)</li>'),(a.wasserrettung_durch_hilfsorganisationen_dlrg_oder_asb&&0!=a.wasserrettung_durch_hilfsorganisationen_dlrg_oder_asb||a.rettungsschwimmer&&0!=a.rettungsschwimmer)&&(l+='<li><img src="'+(is_detail?"../":"./")+'images/signs/rescue@2x.png" width="30" height="30" alt="Wasserrettung zeitweise" />&nbsp;Wasserrettung zeitweise</li>'),a.barrierefrei&&0!=a.barrierefrei?l+='<li><img src="'+(is_detail?"../":"./")+'images/signs/barrierefrei@2x.png" width="30" height="30" alt="Barrierefrei" />&nbsp;Barrierefrei</li>':l+='<li><img src="'+(is_detail?"../":"./")+'images/signs/barrierefrei-not@2x.png" width="30" height="30" alt="Nicht barrierefrei" />&nbsp;Nicht barrierefrei</li>',a.barrierefrei_zugang&&0!=a.barrierefrei_zugang?l+='<li><img src="'+(is_detail?"../":"./")+'images/signs/barrierefrei@2x.png" width="30" height="30" alt="Barrierefreier Zugang zum Wasser" />&nbsp;Barrierefreier Zugang zum Wasser</li>':l+='<li><img src="'+(is_detail?"../":"./")+'images/signs/barrierefrei-not@2x.png" width="30" height="30" alt="Zugang zum Wasser nicht barrierefrei" />&nbsp;Zugang zum Wasser nicht barrierefrei</li>',a.restaurant&&0!=a.restaurant&&(l+='<li><img src="'+(is_detail?"../":"./")+'images/signs/restaurant@2x.png" width="30" height="30" alt="Restaurant" />&nbsp;Restaurant</li>'),a.imbiss&&0!=a.imbiss&&(l+='<li><img src="'+(is_detail?"../":"./")+'images/signs/imbiss@2x.png" width="30" height="30" alt="Imbiss" />&nbsp;Imbiss</li>'),a.parken&&0!=a.parken&&(l+='<li><img src="'+(is_detail?"../":"./")+'images/signs/parken@2x.png" width="30" height="30" alt="Parkmöglichkeiten" />&nbsp;Parkmöglichkeiten</li>'),a.wc&&0!=a.wc?(l+='<li><img src="'+(is_detail?"../":"./")+'images/signs/toilette@2x.png" width="30" height="30" alt="WC verfügbar" />&nbsp;WC verfügbar</li>',a.barrierefrei_wc&&0!=a.barrierefrei_wc||(l+='<li><img src="'+(is_detail?"../":"./")+'images/signs/barrierefrei-not@2x.png" width="30" height="30" alt="WC ist nicht barrierefrei" />&nbsp;WC ist nicht barrierefrei</li>')):a.wc_mobil&&0!=a.wc_mobil&&(l+='<li><img src="'+(is_detail?"../":"./")+'images/signs/toilette@2x.png" width="30" height="30" alt="Mobiles WC verfügbar" />&nbsp;Mobiles WC verfügbar</li>',a.barrierefrei_wc&&0!=a.barrierefrei_wc||(l+='<li><img src="'+(is_detail?"../":"./")+'images/signs/barrierefrei-not@2x.png" width="30" height="30" alt="WC ist nicht barrierefrei" />&nbsp;WC ist nicht barrierefrei</li>')),a.hundeverbot&&0!=a.hundeverbot?l+='<li><img src="'+(is_detail?"../":"./")+'images/signs/hundeverbot@2x.png" width="30" height="30" alt="Hundeverbot" />&nbsp;Hundeverbot</li>':l+='<li><img src="'+(is_detail?"../":"./")+'images/signs/hundeverbot-not@2x.png" width="30" height="30" alt="Kein Hundeverbot" />&nbsp;Kein Hundeverbot</li>',l+='    </ul>  </div>  <div class="detail-amt">    <h3 class="title">Zuständiges Gesundheitsamt</h3>    '+a.gesundheitsamt_name+"<br />    "+a.gesundheitsamt_zusatz+"<br />    "+a.gesundheitsamt_strasse+"<br />    "+parseInt(a.gesundheitsamt_plz)+" "+a.gesundheitsamt_stadt+'<br /><br />    <a href="mailto:'+a.gesundheitsamt_mail+'"><img src="'+(is_detail?"../":"./")+'images/signs/email@2x.png" width="30" height="30" alt="Email" />&nbsp;<span>'+a.gesundheitsamt_mail+'</span></a><br />    <a href="tel:'+parseInt(a.gesundheitsamt_telefon)+'"><img src="'+(is_detail?"../":"./")+'images/signs/phone@2x.png" width="30" height="30" alt="Telefon" />&nbsp;<span>'+parseInt(a.gesundheitsamt_telefon)+"</span></a>  </div></div>",d3.select("#detail").html(l).style("display","block"),d3.select("#closebtn").on("click",function(){is_detail?window.location.href="../index.html":(state.type="overview",state.id=null,state.ani=null,dispatcher.call("action",this,"?"))}),document.documentElement.scrollTop=0,document.body.scrollTop=0}function myFunction(){var e=document.getElementById("myTopnav");"topnav"===e.className?e.className+=" responsive":e.className="topnav"}var state={type:"overview",id:null,ani:!1};window.addEventListener("popstate",function(){retrieveUrl()});var dispatcher=d3.history("action");dispatcher.on("action",function(){updateInterface()});var updateMapContainer=debounce(function(){d3.select("#map").style("height",Math.round(window.innerHeight<1e3?window.innerHeight/2:500)+"px"),map.resize()},250),map,locations={},gData=null,gKeys={},id_map={};d3.selectAll("#map").size()>0?(window.addEventListener("resize",updateMapContainer),d3.csv((is_detail?"../":"")+"new_build.csv",function(e,t){t.sort(function(e,t){return t.lng-e.lng}),gData=t,t.forEach(function(e){id_map[e.id]=e.detail_id}),t.forEach(function(e,t){gKeys[e.detail_id]=t});var i=JSON.parse(JSON.stringify(t)).sort(function(e,t){return e.name<t.name?-1:e.name>t.name?1:0});d3.select("#list ul").selectAll("li").remove();var a=d3.select("#list ul").selectAll("li").data(i).enter().append("li").style("background-image",function(e){return"url("+(is_detail?"../":"./")+"images/badestellen/"+e.id+".jpg)"}).append("a").on("click",function(){var e=d3.select(this).datum();state.type="detail",state.id=e.detail_id,state.ani="true",dispatcher.call("action",this,"?id="+e.detail_id+"&ani=true")}).append("span").attr("class","outer");a.append("img").attr("class",function(e){return"stateimg state-"+e.real_state+(e.name.indexOf(e.gewaesser)>=0?"":" substate")}).attr("src",(is_detail?"../":"./")+"images/trans.gif"),a.append("span").html(function(e){var t="<span>";return e.name.indexOf(e.gewaesser)>=0?t+=e.name:t+=e.name+'</span><br class="unresposive-break" /><span class="unresponsive-sub">'+e.gewaesser,t+="</span>"}),d3.select("#splash").transition().duration(200).style("opacity",0).on("end",function(){d3.select("#splash").remove()});var s=(is_detail?"../":"./")+"style.json",n=detectIE();!1===n||(s=(is_detail?"../":"./")+"tile_style.json"),map=new mapboxgl.Map({container:"map",style:s,center:[13.4244,52.5047],zoom:10}),map.addControl(new mapboxgl.NavigationControl,"bottom-left"),map.fitBounds([[13.0790332437,52.3283651024],[13.7700526861,52.6876624308]],{speed:999}),updateMapContainer(),t.forEach(function(e){locations[e.detail_id]=[e.lat,e.lng];var t=document.createElement("div");t.className="marker "+e.state,t.setAttribute("id","marker_"+e.detail_id),t.addEventListener("click",function(){state.type="detail",state.id=e.detail_id,state.ani="false",dispatcher.call("action",this,"?id="+e.detail_id+"&ani=false")}),new mapboxgl.Marker(t,{offset:[-2,-8.5]}).setLngLat([e.lat,e.lng]).addTo(map)}),is_detail?(d3.select("#detail").style("display","block"),d3.select("#home").style("display","none"),state.type="detail",state.id=id_map[+window.location.href.split("_")[1].split(".")[0]],dispatcher.call("action",this,"?")):retrieveUrl()})):d3.select("#splash").transition().duration(200).style("opacity",0).on("end",function(){d3.select("#splash").remove()});
//# sourceMappingURL=./main-min.js.map