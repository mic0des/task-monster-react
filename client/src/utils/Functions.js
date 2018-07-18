var Functions = {
  getMetaContent: function(name) {
    var metas = document.getElementsByTagName('meta');
 
    for (var i=0; i<metas.length; i++) {
      if (metas[i].getAttribute("name") == name) {
        return metas[i].getAttribute("content");
      }
    }
 
    return "";
  }

	progressBarCalc: function(){
		$(".progressbar-label").text((parseInt(((checked / count) * 100),10)) + "%");
	}
}
 
module.exports = Functions;