function(d,s,id,u){
  if (d.getElementById(id)) return;
  var js, sjs = d.getElementsByTagName(s)[0],
      t = Math.floor(new Date().getTime() / 1000000);
  js=d.createElement(s); js.id=id; js.async=1; js.src=u+'?'+t;
  sjs.parentNode.insertBefore(js, sjs);
}(document, 'script', 'os-widget-jssdk', 'https://www.opinionstage.com/assets/loader.js');
