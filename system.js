var App = App || {};

App.Network = (function(App){


	var AjaxParameter = 
	{
		contentType: "application/json; charset=utf-8",
		getType: "json",
		Cache: true,
	}

	var Server = 
	{
		Ajax:function(getservice,method,getQuery,callback)
		{
			
			$.ajax({
				url: getservice,
				dataType: AjaxParameter.getType,
				cache: AjaxParameter.Cache,
				type: method,
				data: JSON.stringify(getQuery),
				contentType: AjaxParameter.contentType
				}).done(function(data){
				
					callback(data);
				}).fail(function(result,x,y){
					console.log(result,x,y);
					//Error.ErrorHandler.ShowError('App',result,net);
			});
		},
		Json:function(getUrl,callback)
		{

			$.getJSON(getUrl,function(data){
				callback(data);
			}).fail(function(e){
				console.log(e);
			})
		},
		Get:function(getUrl,callback)
		{

			$.get(getUrl, function(data) {
				
				callback(data);
			}).fail(function(e){
				console.log(e);
			})
		}
	}
	return{
		Ajax:function(getservice,method,getQuery,callback)
		{
			Server.Ajax(getservice,method,getQuery,callback);
		},
		Json:function(getUrl,callback)
		{
			Server.Json(getUrl,callback);
		},
		Get:function(getUrl,callback)
		{
			Server.Get(getUrl,callback);
		}
	}
})(App);

module.exports = App;
