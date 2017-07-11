var $ = require('jquery')
var App = App || {};
App.ErrorHandler = (function(App){

	var Setup = 
	{
		Handler: function(dom, text, type)
		{
			$('#errormessage').remove();
			$('div').removeClass('has-error');
			var html = ' <div id="errormessage" class="alert alert-danger" role="alert"><strong>Fejl: </strong>[text]</div>';
			
			switch(type){
				case 'net':

					if(dom=="auto" && text.readyState==0){
						Setup.BootstrapAlert("<p>Der er sket en fejl i systemet, kan ikke hente adresse information</p><p>Du kan kontakte os på kontakte os på tlf. 7070 7030 eller prøv igen, senere</p>");
					}else  if(dom=="System" && text.readyState==0){
						Setup.BootstrapAlert("<p>Der er sket en fejl i systemet, serveren svare ikke</p>");
					}
				break;
				case 'form':
					
					if(dom=='txtCity'){
						dom = 'txtRegion';
					}else if(dom=='txtNum'){
						dom = 'txtRoad';
					}
					
				

					var field = dom.replace("txt","");
					
					$('#'+field).before(html.replace("[text]",text));

					
					//$('#'+dom).parent().addClass('has-error');
					//$('#'+dom).focus();
					
					

				break;
			}

		
			$('#loading').hide();
			$('#content').show();

		},
		BootstrapAlert:function(text)
		{
			$('#errormodal').find('.modal-body').empty().append(text);
			$('#errormodal').modal();
		}
	}		
	return {
		ShowError:function(dom, text, type)
		{
		
			Setup.Handler(dom, text, type);
		}
	}
})(App);

module.exports = App.ErrorHandler;
