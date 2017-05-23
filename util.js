var App = App || {};

App.Util = (function (App)
{
	return {
		
		randomNo:function()
		{
			return Math.floor(Math.random() * 900000) + 100000;
		},
		getUUID: function(){
			function s4(){
  				return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
			};
			return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();  
			  
		},
		convertXml2HTML: function(str){
			str = str.replace(/&amp;/g, '&');
			str = str.replace(/&quot;/g, '"');
			str = str.replace(/&lt;/g, '<');
			str = str.replace(/&gt;/g, '>');
			return str
		},
		removeWhiteSpace: function (str) {
			while (str.indexOf(" ") != -1) { str = str.replace(" ", ""); }
			return str;
    	},
    	RemoveSplit: function(strHouseNo){
			var onlyHouseNo = new RegExp(/^\d+,-,-,-$/);
			if(onlyHouseNo.test(strHouseNo)){
				t = strHouseNo.split(',');
				return t[0];
			}else{
				return strHouseNo;
			}
		},
		capitalise: function (string) {
    		return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
		},
		validateEmail: function (value){
			var reg=new RegExp(/^[a-zA-Z0-9._\-]+@.+\..+$/);
			return reg.test(value);
		},
		validateAppalCode: function (value){
			var reg=new RegExp(/^\d{4}$/);
			return reg.test(value);
		},
		validatePhoneNo: function (value) {
			var reg = new RegExp(/^(\+\d{2}\s)*\d{8}$/);
			return reg.test(value);
		},
		validateParcelNo:  function (value) {
			var reg = new RegExp(/^[A-Za-z0-9 ]{9,35}$/);
			return reg.test(value);
		},
		validateCVRNo:  function (value) {
			var reg = new RegExp(/^\d{8}$/);
			return reg.test(value);
		},
		validateTextLength: function(value,len){
			if(value.length>len){
				return true;
			}
		},
		validateZapNo:function(value){
			var reg=new RegExp(/^\d{8}$/);
			return reg.test(value);
		},
		housenumberreg: function(h){       
			var housenumberreg = new RegExp(/^[\d\S]+(,\S*,\S*,\S*)*$/);
			return housenumberreg.test(h);
		},
		NewGetHouseInformationDisplay: function(strHouseInfo,output){
			
			var self = this;
			var strDisplay = "";
			if (strHouseInfo != undefined) {
				
				var number = strHouseInfo.houseNumber[0].number;
				var letter = strHouseInfo.houseNumber[0].Letter;
				var floor =  strHouseInfo.houseNumber[0].Floor;
				var placement = strHouseInfo.houseNumber[0].Placement;
				number = number == "" ? "-" : number;
				letter = letter == "" ? "-" : letter;
				floor = floor == "null" ? "-" : floor + ", ";
				placement = placement == "null" ? "-" : placement;
				
				if(output == "label"){
					var numberletter = letter=="-" ? number + ", " : number+letter + ", ";
					strDisplay = numberletter + floor + placement;
					
					var reg = new RegExp(/^(\d+\S+),\s--$/);
					var reg2 = new RegExp(/^(\d+),([-\S\s]+)--$/);
					var reg3 = new RegExp(/^(\d+),\s,\s$/);
					var reg4 = new RegExp(/^(\d+\S+),\s,\s$/);
					
					if(reg.test(strDisplay)){
						strDisplay=reg.exec(strDisplay)[1];
						//console.log("#1")
					}else if(reg2.test(strDisplay)){
						//console.log("#2")
						strDisplay=reg2.exec(strDisplay)[1]+reg2.exec(strDisplay)[2];	
					}else if(reg3.test(strDisplay)){
						//console.log("#3")
						strDisplay=reg3.exec(strDisplay)[1];
					}else if(reg4.test(strDisplay)){
						//console.log("#4")
						strDisplay=reg4.exec(strDisplay)[1];				
					}
				}else if(output == "value"){
					floor = floor.replace(", ","")
					strDisplay =  number+","+letter+","+floor+","+placement;
					var reg = new RegExp(/^(\d+),-,,$/);
					var reg2 = new RegExp(/^(\d+),(\S+),,$/);
					if(reg.test(strDisplay)){
						strDisplay =reg.exec(strDisplay)[1];
					}else if(reg2.test(strDisplay)){
						strDisplay=reg2.exec(strDisplay)[1]+reg2.exec(strDisplay)[2];
					}	
				}	
			}
			return strDisplay;
		},
		showTransperent: function(sw){
			if(sw==0){
				var h = $(window).height();
				var w = $(window).width();
				$("body").append('<div class="transparent"></div>');
				$(".transparent").css("height",h);
				$(".transparent").css("width",w );
			
			}else{
				$(".transparent").remove()
			}
		},
		showPop: function(txt,bnts,sw){
			var self = this;
			$(".popups").remove();
			if(sw==0){
				self.showTransperent(0);
				var html = '<div class="popups" id="pop_reject">' +
							'<p id="popcontent">'+txt+'</p><p class="bntrow">' + bnts + '</p></div>'
				$("body").append(html);
				if(String(txt).length>100){
					$(".popups").css('width','500px');
				}
				
				var w =  $("body").width();
				var pw = $(".popups").width();
				$(".popups").css("left",((w/2)-(pw/2)));
				var p = (window.pageYOffset) ? window.pageYOffset : document.documentElement.scrollTop;
				$(".popups").css("top",p+(Math.floor($(window).height()/5)));
			}
		},
		showMessage: function(message,callback,type){
			var self = this;
			error = (arguments[1]==undefined) ? "default" :	arguments[1];
			$('#loading').hide();
			switch(type){
				case "parameter":
					self.showPop(message,'',0);
					break;
				case "form":
					self.showPop(message,'',0);
					break;	
				case "address":
					self.showPop(message,'<button id="bnt_ok" onclick="App.Util.showTransperent(1);App.Util.showPop(1);App.Permissions.sendBeforeSave()">Luk</button>',0);
					
					break;
				case "network":
					self.showPop(message,'',0);
					break;	
				case "mail":
					self.showPop(message,'',0);
					break;
				case "savedata":
					self.showPop(message,'',0);
					break;		
				default:
					self.showPop(message,'<button id="bnt_ok" onclick="App.Util.showTransperent(1);App.Util.showPop(1);">Luk</button>',0);
					break;		
			}
		},
		restrictInteger: function (evt){
			evt = (evt) ? evt : window.event
			var charCode = (evt.which) ? evt.which : evt.keyCode;
			if (charCode > 31 && (charCode < 48 || charCode > 57) && (charCode < 95 || charCode > 106 ) && (charCode!=46) && (charCode!=37) && (charCode!=38) && (charCode!=39) && (charCode!=40)){
				return false;
			}else{
				return true;
			}
		},
		getQuery: function(query)
		{
			query = query.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
			var expr = "[\\?&]" + query + "=([^&#]*)";
			var regex = new RegExp(expr);
			var results = regex.exec(window.location.href);
			if (results !== null) {
				return results[1];
				return decodeURIComponent(results[1].replace(/\+/g, " "));
			} else {
				return false;
			}
		},
		getHistory:function(url)
		{
			var _url = url.split('/');
			return _url[_url.length-1]
		},
		checkMobile: function()
		{
  			var check = false;
  			(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
  			return check;
		},
		checkMobileTable: function() 
		{
  			var check = false;
  			(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
  			return check;
		}
		
	}
})(App);

module.exports = App;