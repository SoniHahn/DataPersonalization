var cocktails = [];

function init(){
	$.ajax({		
	    url: './data/cocktails.json',
	    type: 'GET',
	    failure: function(err){
	    	return console.log ("There was an issue getting the data");
	    },
	    success: function(response) {
	      console.log('the response from our JSON is -- >');
	      console.log(response);
	      cocktails = response.cocktails;
	      
	      cocktails.forEach(function(arr){
	    	  addCard(arr);
	      });
	    }
	});	
}

function addCard(arr){	
	var name = arr.name;
	var img = arr.img;
	var alcohol = arr.alcohol;
	var others = arr.others;
	
	var htmlToAppend = 
	'<div class="card-container col-sm-4 col-md-4 centered">'+
		'<div class="card">'+
		  '<img src="img/'+img+'.png">'+
		    '<h1>'+name+'</h1>'+
		    '<h2>'+" "+alcohol+'</h2>'+
		    '<h3>'+"+"+others+'</h3>'+
	  '</div>'+
	'</div>';

  return $('#card-holder').prepend(htmlToAppend);
}

function searchCard(){
	var val = document.getElementById('theInput').value;
	if(!val || val=="") return alert("Enter a drink!");
	console.log("the value is " + val);
		
	var searchOK = [];
	var size = cocktails.length;
	for(var i=0; i<size; i++){
		var alcoholSize = cocktails[i].alcohol.length;
		for(var j=0; j<alcoholSize; j++){
			if(cocktails[i].alcohol[j] == val.toUpperCase()){						
				searchOK.push(i);
			}
		}
	}
	
	console.log("searchOK.length : "+searchOK.length);
	if(searchOK.length > 0){
		$('#card-holder').empty();
		for(var i=0; i<searchOK.length; i++){
			addCard(cocktails[searchOK[i]]);
		}
	}else{
		alert("No data found");
	}
}

document.getElementById('theInput').addEventListener('change', searchCard);
window.addEventListener('onload', init());


