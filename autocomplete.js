
var App = App || {};

App.Autocomplete = (function(App){
	var _Config = null;
	var locationService = null;
	var net = 'net';
	var form = 'form';
	var Reg = new RegExp(/^\S{0,2}[.\s]+[\S]*$/i);
	var Setup =
	{
		Autocomplete:function()
		{
			var self = this;
			
			$('#txtRegion').bind('keydown',function(){	
				$("#txtRegion").autocomplete({
					source: function (request, response) {
						$.ajax({
							url: locationService,
							dataType: "json",
							type: "POST",
							data: '{"function":"findCity","zipcode":'+encodeURI(request.term)+'}',
							success: function (data){
								if(data != null) {
									
									
										$("#txtCity").val(data[0].cityName);
									
								}else{
									Error.ErrorHandler.ShowError('System',"Fejl i post nr. prøv at skrive det igen",net);
								}
								$('.ui-autocomplete-loading').removeClass("ui-autocomplete-loading");	  
							},
							error: function (result) {

								Error.ErrorHandler.ShowError('auto',result,net);
								$('.ui-autocomplete-loading').removeClass("ui-autocomplete-loading");
							}
						});
					},
					minLength: 4
				});	
			});
			$('#txtRegion').bind('keydown',function(e){
				
				if(e.which == 9 && $('#txtCity').val()==""){
					$.ajax({
						url: locationService,
						dataType: "json",
						type: "POST",
						data: '{"function":"findCity","zipcode":'+encodeURI($('#txtRegion').val())+'}',
						success: function (data) {
							if(data != null) {
								$("#txtCity").val(Post.Util.capitalise(data[0].cityName))
							}else{
								 Error.ErrorHandler.ShowError('System',"Fejl i post nr. prøv at skrive det igen",net);
							}
							$('.ui-autocomplete-loading').removeClass("ui-autocomplete-loading");  
						},
						error: function (result) {
							Error.ErrorHandler.ShowError('System',"Fejl i post nr. prøv at skrive det igen",net);
							 $('.ui-autocomplete-loading').removeClass("ui-autocomplete-loading");
						}
					})
				}
			});
			$('#txtRoad').bind('keydown',function(){
				if($("#txtCity").val()!=""){
					$("#txtRoad").autocomplete({
						source: function (request, response) {
							if(Reg.test(request.term)){
								Error.ErrorHandler.ShowError('AddressHelp',"",net);
							}
							$.ajax({
								url: locationService,
								type: "POST",
								dataType: "json",
								data: '{"function":"findAllStreets","streetname":"'+request.term+'","zipcode":"'+encodeURI($('#txtRegion').val())+'"}',
								success: function (data) {
									
									if(data != null) {
										response($.map(data[0].streets, function (item) {
											return { value: item.streetname }
										}));
									}else{
										Error.ErrorHandler.ShowError('System',"Fejl adressen prøv at skrive det igen",net);
										
									}
									$('.ui-autocomplete-loading').removeClass("ui-autocomplete-loading");
									$('.ui-autocomplete').css('width',$('#txtRoad').width()+'px');
									$('.ui-autocomplete').css({"max-height": "200px", "overflow-y": "auto", "overflow-x": "hidden"});
									   
								},
								error: function (result){
									Error.ErrorHandler.ShowError('auto',result,net);
										$('.ui-autocomplete-loading').removeClass("ui-autocomplete-loading");
								}
							});
						},
							minLength: 3
						});
				}else{
					Error.ErrorHandler.ShowError('System',"Fejl i postnr. prøv at skrive det igen",net);
					
					$('.ui-autocomplete-loading').removeClass("ui-autocomplete-loading");
				}
			});
			$("#txtNum").autocomplete({
				source: function (request, response) {
					$.ajax({
						url: locationService,
						type: "POST",
						dataType: "json",
						data: '{"function":"findHouseNumbers","streetname":"'+$('#txtRoad').val().trim()+'","zipcode":"'+$('#txtRegion').val()+'","housenumber":"'+request.term+'"}',
						success: function (data) {
							
							if (data[0] != null) {
								response($.map(data[0].housenumbers, function (item,index) {
									
									if (String(item.houseNumber[0].number).substring(0,String(request.term).length)==request.term) {
										
										return {
											label: Post.Util.NewGetHouseInformationDisplay(item,"label"),
											value: Post.Util.NewGetHouseInformationDisplay(item,"value")
										}
									}
								}))
							}else{
								Error.ErrorHandler.ShowError('System',"Fejl i gade/vej nr. prøv at skrive det igen",net);
							
							}
							$('.ui-autocomplete-loading').removeClass("ui-autocomplete-loading");
							$('.ui-autocomplete').css('width',$('#txtNum').width()+'px');
							$('.ui-autocomplete').css({"max-height": "200px", "overflow-y": "auto", "overflow-x": "hidden"});
						},
						error: function (result) {
							Error.ErrorHandler.ShowError('auto',result,net);
							 $('.ui-autocomplete-loading').removeClass("ui-autocomplete-loading");                      
						}
					});
				}
			});
			$('input').bind('keydown',function(){
				$('#errormessage').remove();
				$('div').removeClass('has-error');
				
			});
			
			$('input').bind('click',function(){
				$('#errormessage').remove();
				$('div').removeClass('has-error');
				
			});
			$('select').bind('change',function(){
				$('#errormessage').remove();
				$('div').removeClass('has-error');
				
			});
			

		},
		AutocompleteBackup:function()
		{
			
			System.Content.SetConfig("Validation",false);
	
			var locationService = Config.LocationBackup;
			var net = 'net';
			var form = 'form';
			var Reg = new RegExp(/^\S\S[.\s]+$/i);
			
			$('#txtRegion').bind('keydown',function(){
				$("#txtRegion").autocomplete({
					source: function (request, response) {
						$.ajax({
							url: locationService + "postnumre?nr=" + encodeURI(request.term),
							dataType: "json",
							type: "GET",
							success: function (data) {
								if(data.length>0) {
									$("#txtCity").val(data[0].navn);
									
								}else{
									
								
								
										ErrorHandler.error('txtRegion','Post nr. er  forkert eller mangler',form);
									
								}
								$('.ui-autocomplete-loading').removeClass("ui-autocomplete-loading");  
							},
							error: function (result) {
								Post.Util.showMessage(Translations.ajaxError,"network")  
								 $('.ui-autocomplete-loading').removeClass("ui-autocomplete-loading");
							}
						});
					},
					minLength: 4
				});	
			});
			$('#txtRegion').bind('keydown',function(e){
				
				if(e.which == 9 && $('#txtCity').val()==""){
					//$('#txtRoad').val(e.which );
					//$("#txtRegion").focus();
					$.ajax({
						url: locationService + "postnumre?nr=" + $('#txtRegion').val(),
						dataType: "json",
						type: "GET",
						success: function (data) {
							if(data != null) {
								$("#txtCity").val(data[0].navn)
							}else{
								 Post.Util.showMessage(Translations.addressError,"form")  
							}
							$('.ui-autocomplete-loading').removeClass("ui-autocomplete-loading");  
						},
						error: function (result) {
							Post.Util.showMessage(Translations.ajaxError,"network")  
							 $('.ui-autocomplete-loading').removeClass("ui-autocomplete-loading");
						}
					})
				}
			});
			$('#txtRoad').bind('keydown',function(){
				if($("#txtCity").val()!=""){
					$("#txtRoad").autocomplete({
						source: function (request, response) {
							$.ajax({
								url: locationService + "vejnavne?postnr="+encodeURI($("#txtRegion").val())+"&q=" + encodeURI(request.term) +"*",
								dataType: "json",
								type: "GET",
								success: function (data) {
									if(data != null) {
										response($.map(data, function (item) {
											return { value: item.navn }
										}));
									}else{
										Post.Util.showMessage("Fejl adressen prøv at skrive det igen")
									}
									$('.ui-autocomplete-loading').removeClass("ui-autocomplete-loading");
									$('.ui-autocomplete').css('width',$('#txtRoad').width()+'px');
									$('.ui-autocomplete').css({"max-height": "200px", "overflow-y": "auto", "overflow-x": "hidden"});
									   
								},
								error: function (result) {
									 Post.Util.showMessage(Translations.ajaxError,"network")  
										$('.ui-autocomplete-loading').removeClass("ui-autocomplete-loading");
								}
							});
						},
							minLength: 2
						});
				}else{
					 Post.Util.showMessage("Fejl i post nr. prøv at skrive det igen","network")  
					$('.ui-autocomplete-loading').removeClass("ui-autocomplete-loading");
				}
			});
			
			$("#txtNum").autocomplete({
				source: function (request, response) {
					$.ajax({
						url: locationService + "adresser?vejnavn=" +  encodeURI($("#txtRoad").val()) + "&postnr=" + encodeURI($("#txtRegion").val()) + "&q=" + encodeURI(request.term) + "*&fuzzy=",
						dataType: "json",
						type: "GET",
						success: function (data) {
							if (data != null) {
								response($.map(data, function (item) {
									if (item != null) {
										return {
											label: Post.Util.GetHouseInformationDisplay(item,"value"),
											value: Post.Util.GetHouseInformationDisplay(item,"value")
										}
									}
								}));
							}else{
								Post.Util.showMessage("Fejl i gade/vej nr. prøv at skrive det igen"); 
							}
							$('.ui-autocomplete-loading').removeClass("ui-autocomplete-loading");
							$('.ui-autocomplete').css('width',$('#txtNum').width()+'px');
							$('.ui-autocomplete').css({"max-height": "200px", "overflow-y": "auto", "overflow-x": "hidden"});
						},
						error: function (result) {
							Post.Util.showMessage(Translations.ajaxError,"network")  
							 $('.ui-autocomplete-loading').removeClass("ui-autocomplete-loading");                      
						}
					});
				}
			});
			
			$('input').bind('keydown',function(){
				$('#errormessage').remove();
				$('div').removeClass('has-error');
				
			});
			
			$('input').bind('click',function(){
				$('#errormessage').remove();
				$('div').removeClass('has-error');
				
			});
			$('select').bind('change',function(){
				$('#errormessage').remove();
				$('div').removeClass('has-error');
				
			});
	
		},
		textarea: function(){
			$("#txtCommentRecipient").keyup(function(){
				var total = 198-Number($("#txtCommentRecipient").val().length);
				if(total<0){
					total=0;
				}
				$("#countLetterbox").empty().append("Plads til "+total+" tegn");
			});
		}
	}
	
	return{
		SetupAutoComplete:function(theConfig,callback)
		{
			_Config = theConfig;
			locationService = _Config.LocationService;
			Setup.Autocomplete(callback);
			
		},
		SetupAutoCompleteBackup:function()
		{
			console.log("backup");
			Setup.AutocompleteBackup();
		}
		
	}
})(App);

module.exports = App;