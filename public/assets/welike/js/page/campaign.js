var address = 'http://localhost:5000/'; //'http://wwww.welike.kinghost.net:21111/'; 
var addressServer = 'http://localhost:5001/'; //'http://www.welike.kinghost.net:21029/';

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

	function imgError(image) {
	    image.onerror = "";
	    image.src = "assets/images/no-image.jpg";
	    image.width = "48";
	    return true;
	}

    function startCampaign(){
		
		var campaignId = getUrlParameter('c');
		
	    if(campaignId != ""){

            $.post(addressServer + 'campaign/start', { campaignId: campaignId }, function(returnedData){
				swal({title: 'Ok!', text: 'Campanha ' + returnedData[0].name + ' iniciada',type: "success", timer: 1600, showConfirmButton: false});
				//alert('Campanha iniciada! ' + returnedData[0].name)
            }).fail(function(){
                console.log("error");
            });

	    }

	}

function waitForSeconds(seconds){
	var waitTill = new Date(new Date().getTime() + seconds * 1000);
	while(waitTill > new Date()){}
}

function addToMonitor(userid){
	var campaignId = getUrlParameter('c');

	if(campaignId != "" && userid != ""){

        $.post(address + 'monitor/addUser', { userId: userid, campaignId: campaignId }, function(data){

        }).done(function() {
            swal({title: 'Ok!', text: 'Usuário inserido no monitoramento',type: "success", timer: 1600, showConfirmButton: false});

        }).fail(function(){
            swal({title: 'Erro!', text: 'Usuário não inserido no monitoramento',type: "fail", timer: 1600, showConfirmButton: false});
        });
    }

}



function draw() {
    	
	var campaignID = getUrlParameter('c');
	var limit = document.getElementById("maxInfluencers").value;
	if(limit == '' | limit == 0){
		limit = 20;
	}

	var urlReferences = address + 'campaign/' + campaignID + '/references';
	var urlInfluencers = address + 'campaign/' + campaignID + '/influencers/' + limit;

	var nodes = [];
	var edges = [];
	var network = null;

	var campaignReferences = []
	var campaignInfluencers = []

	//Buscando referências
	$.get(urlReferences, function(dataref){

		for (i = 0; i < dataref.length; i++) {
			//alert(dataref[i].screenName)
	        nodes.push({
	            id: dataref[i].screenName,
	            value: dataref[i].followersCount,
	            shape: 'circularImage',
	            borderWidth:5,
	            color: {
	                border: '#fffc05',
	                background: '#343340'
	              },
	            image: dataref[i].profilePicture,
	            label: dataref[i].name,
	            font: {strokeWidth: 1, strokeColor: '333'},
	            title: 'Seguidores: ' + dataref[i].followersCount + '<br>' + 'Seguindo: ' + dataref[i].friendsCount + '<br>' + 'ScreenName: ' + dataref[i].screenName,
	            x: -i*100, y: i
	        });
	    }

		// Buscando lista de influenciadores
		$.get(urlInfluencers, function(datainf){
				var list = $( "#influencersList" ).empty();
	        for (i = 0; i < datainf.length; i++) {

	            nodes.push({
	                id: datainf[i].screenname,
	                value: datainf[i].followerscount,
	                shape: 'circularImage',
	                image: datainf[i].profilePicture,
	                label: datainf[i].name,
	                font: {strokeWidth: 1, strokeColor: '333'},
	                title: 'Seguidores: ' + datainf[i].followerscount + '<br>' + 'Seguindo: ' + datainf[i].friendscount + '<br>' + 'ScreenName: ' + datainf[i].screenname
	                ,x: -i, y: i
	            });

	           //alert(datainf[i].retweetedcount)
	            var innerText = "<tr><td>" + datainf[i].name + "</td><td>" + datainf[i].screenname + "</td><td>" + datainf[i].qtd + "</td><td>" + datainf[i].followerscount + "</td><td>" + datainf[i].friendscount + "</td><td>" + datainf[i].retweetedCount + "</td><td>" + datainf[i].favoritedCount + "</td><td><button type='submit' class='btn btn-raised btn-primary btn-sm' onclick='addToMonitor(" + datainf[i].userid + ");'><i class='fa fa-plus'></i></button></td></tr>"
	            list.append(innerText)

	            //alert('screenName: ' + lista[i].screenName + ' source: ' + lista[i].source)
	            var followersList = datainf[i].followersList.split(",")
	            //alert('Lista de seguidores ' + followersList.length)
	            for (var j = 0; j < followersList.length; j++) {
	            	//alert('screenName: ' + datainf[i].screenname + ' source: ' + followersList[j])
	            	edges.push({
	                  from: datainf[i].screenname,
	                  to: followersList[j],
	                  color: '#fff',
	                  value: datainf[i].retweetedcount
	                });
	            }
	              
	        }
	        //alert('Edges: ' + edges.length)
	        var container = document.getElementById('mynetwork');
	        var data = {
	            nodes: nodes,
	            edges: edges
	        };
	        var options = {

	            nodes: {
	                borderWidth:4,
	                size:300,
	                color: {
	                    border: '#222222',
	                    background: '#343340'
	                },
	                font:{color:'#eeeeee'}
	            },
	            edges: {
	              color: '#009D91'
	            },
	            "physics": {
				     "barnesHut": {
				      "gravitationalConstant": -36000,
				      "centralGravity": 0,
				      "avoidOverlap": 0.01
				    },
				    "maxVelocity": 80,
				    "minVelocity": 10,
				    "timestep": 0.01
				}

	        };

            var network = new vis.Network(container, data, options);

            network.on("doubleClick", function (params) {
                params.event = "[original event]";
                window.open("http://www.twitter.com/" + params.nodes);
            });


        }).fail(function() {
        	//console.log('O servidor não está ativo. url:' + url)    
        });

    }).fail(function() {
    	//console.log('O servidor não está ativo. url:' + url)    
    });



}


function loadCampaign(campaignID){

        var url = address + 'campaign/' + campaignID;

        $.get(url, function(data){
            
            var title = $( "#campaignTitle" ).empty();
			title.text('Campanha ' + data[0].name);


			var urlReferences = address + 'campaign/' + campaignID + '/references';

	        $.get(urlReferences, function(dataReferences){

	            var list = $( "#referenceList" ).empty();

	            for (var i = 0, len = dataReferences.length; i < len; i++) { 
		            var innerString = '<div class="col-md-2"><div class="testimonial-user-info user-info text-left"><div class="testimonial-user-thumb user-thumb"> <img class="img-circle" src="' + dataReferences[i].profilePicture + '" alt="user-thumb" onError="imgError(this);"> </div><div class="testimonial-user-txt user-text"><a href="http://www.twitter.com/' + dataReferences[i].screenName + '" target="_blank"><a href="http://www.twitter.com/' + dataReferences[i].screenName + '" target="_blank">' + dataReferences[i].name + '(@' + dataReferences[i].screenName + ')</a><h6 class="text-muted">' + (dataReferences[i].statusesCount != null ? dataReferences[i].statusesCount : '0') + ' tweets, ' + dataReferences[i].followersCount + ' seguidores, seguindo ' + dataReferences[i].friendsCount + '</h6></div></div></div>';              
	                list.append(innerString);                 
		        }


			        var urlHashtags = address + 'campaign/' + campaignID + '/hashtags';

			        var labelData = []
			        var percentData = []

			        $.get(urlHashtags, function(dataHashtags){
			            
			            for (var i = 0, len = dataHashtags[1].length; i < len; i++) {    

			            	labelData.push('#'+dataHashtags[1][i].hashtags)
			            	percentData.push(dataHashtags[1][i].qtd)
			            	//alert(dataHashtags[1][i].hashtags + ' | ' + dataHashtags[1][i].qtd)

			            }


						Chart.defaults.global.defaultFontColor = '#d2d2d2';
						Chart.defaults.global.defaultFontSize = 18;
    			        var color = Chart.helpers.color;
				        var config = {
			            type: 'radar',
			            data: {
				                labels: labelData,
				                datasets: [{
				                    label: "Hashtags mais usadas",
				                    borderColor: window.chartColors.red,
				                    
				                    backgroundColor: color(window.chartColors.orange).alpha(0.2).rgbString(),
				                    pointBackgroundColor: window.chartColors.orange,
				                    data: percentData
				                }]
				            },
			            options: {
			            	scaleShowLabels : false,
			            	legend: {
				            		labels:{fontColor:"white", fontSize: 18}
				            	},
			                title:{
				                    display:false,
				                    text:"Chart.js Radar Chart - Skip Points"
				                },
			                elements: {
				                    line: {
				                        tension: 0.0
				                    }
				                },
			                scale: {
				                    beginAtZero: true,
							title:{
				                    display:false}
					            },
					        gridLines: {
									  backgroundColor: "#FFFFFF"
								}
				            }
				        };


//===================================================================================================
					// // Radar Chart Options
				// 	var radarOptions = {
									
				// 		//Boolean - If we show the scale above the chart data			
				// 		scaleOverlay : false,
						
				// 		//Boolean - If we want to override with a hard coded scale
				// 		scaleOverride : false,
						
				// 		//** Required if scaleOverride is true **
				// 		//Number - The number of steps in a hard coded scale
				// 		scaleSteps : null,
				// 		//Number - The value jump in the hard coded scale
				// 		scaleStepWidth : null,
				// 		//Number - The centre starting value
				// 		scaleStartValue : null,
						
				// 		//Boolean - Whether to show lines for each scale point
				// 		scaleShowLine : true,

				// 		//String - Colour of the scale line	
				// 		scaleLineColor : "#999",
						
				// 		//Number - Pixel width of the scale line	
				// 		scaleLineWidth : 1,

				// 		//Boolean - Whether to show labels on the scale	
				// 		scaleShowLabels : false,
						
				// 		//Interpolated JS string - can access value
				// 		scaleLabel : "<%=value%>",
						
				// 		//String - Scale label font declaration for the scale label
				// 		scaleFontFamily : "'Arial'",
						
				// 		//Number - Scale label font size in pixels	
				// 		scaleFontSize : 12,
						
				// 		//String - Scale label font weight style	
				// 		scaleFontStyle : "normal",
						
				// 		//String - Scale label font colour	
				// 		scaleFontColor : "#FFF",
						
				// 		//Boolean - Show a backdrop to the scale label
				// 		scaleShowLabelBackdrop : true,
						
				// 		//String - The colour of the label backdrop	
				// 		scaleBackdropColor : "rgba(255,255,255,0.75)",
						
				// 		//Number - The backdrop padding above & below the label in pixels
				// 		scaleBackdropPaddingY : 2,
						
				// 		//Number - The backdrop padding to the side of the label in pixels	
				// 		scaleBackdropPaddingX : 2,
						
				// 		//Boolean - Whether we show the angle lines out of the radar
				// 		angleShowLineOut : true,
						
				// 		//String - Colour of the angle line
				// 		angleLineColor : "rgba(255,255,255,0.3)",
						
				// 		//Number - Pixel width of the angle line
				// 		angleLineWidth : 1,			
						
				// 		//String - Point label font declaration
				// 		pointLabelFontFamily : "'Arial'",
						
				// 		//String - Point label font weight
				// 		pointLabelFontStyle : "normal",
						
				// 		//Number - Point label font size in pixels	
				// 		pointLabelFontSize : 12,
						
				// 		//String - Point label font colour	
				// 		pointLabelFontColor : "#EFEFEF",
						
				// 		//Boolean - Whether to show a dot for each point
				// 		pointDot : true,
						
				// 		//Number - Radius of each point dot in pixels
				// 		pointDotRadius : 3,
						
				// 		//Number - Pixel width of point dot stroke
				// 		pointDotStrokeWidth : 1,
						
				// 		//Boolean - Whether to show a stroke for datasets
				// 		datasetStroke : true,
						
				// 		//Number - Pixel width of dataset stroke
				// 		datasetStrokeWidth : 1,
						
				// 		//Boolean - Whether to fill the dataset with a colour
				// 		datasetFill : true
						
				// 	}

				// 	// Radar Data
				// 	var radarData = {
				// 		labels : labelData,
				// 		datasets : [
				// 			{
				// 				fillColor : "rgba(220,220,220,0.5)",
				// 				strokeColor : "rgba(220,220,220,1)",
				// 				data : percentData
				// 			}
				// 		]
				// 	}

				// 	var config = {
			 //         type: 'radar',
			 // data: radarData,options: radarOptions}


				// 	// //Get the context of the Radar Chart canvas element we want to select
				// 	// var ctx = document.getElementById("radarCanvas").getContext("2d");

				// 	// // Create the Radar Chart
				// 	// var myRadarChart = new Chart(ctx).Radar(radarData, radarOptions);
					window.myRadar = new Chart(document.getElementById("radarCanvas"), config);
//===================================================================================================






						//window.myRadar = new Chart(document.getElementById("radarCanvas"), config);

				    });

			        var urlLocation = address + 'campaign/' + campaignID + '/location';

			        var wordList = []

			        $.get(urlLocation, function(dataLocation){
			            
			            for (var i = 0, len = dataLocation.length; i < len; i++) {    
			            	
			            	var item = {
			            		text: dataLocation[i].text,
			            		weight: dataLocation[i].weight
			            	}
			            	console.log(item)
			            	wordList.push(item)
			            }

			            $("#my_favorite_latin_words").jQCloud(wordList, {shape: "rectangular"});
			        });


				    $('.footable').footable();


	        }).fail(function() {
	        	//console.log('O servidor não está ativo. url:' + url)    
	        });

	        }).fail(function() {
	        	//console.log('O servidor não está ativo. url:' + url)    
	        });


    }


$( document ).ready(function(){

    var campaignID = getUrlParameter('c');
    if(campaignID != ""){
	    loadCampaign(campaignID);
		//getHashtags(campaignID);
		//getLocations(campaignID);
		draw();
    }

    

    

	function loadCampaignReferences(campaignID){

        var url = address + 'campaign/' + campaignID + '/references';

        $.get(url, function(data){

            var list = $( "#referenceList" ).empty();

            for (var i = 0, len = data.length; i < len; i++) { 
	            var innerString = '<div class="col-md-2"><div class="testimonial-user-info user-info text-left"><div class="testimonial-user-thumb user-thumb"> <img class="img-circle" src="' + data[i].profilePicture + '" alt="user-thumb" onError="imgError(this);"> </div><div class="testimonial-user-txt user-text"><a href="http://www.twitter.com/' + data[i].screenName + '" target="_blank"><a href="http://www.twitter.com/' + data[i].screenName + '" target="_blank">' + data[i].name + '(@' + data[i].screenName + ')</a><h6 class="text-muted">' + (data[i].statusesCount != null ? data[i].statusesCount : '0') + ' tweets, ' + data[i].followersCount + ' seguidores, seguindo ' + data[i].friendsCount + '</h6></div></div></div>';              
                list.append(innerString);

                //$('<div>',{ html: innerString }).appendTo("#referenceList");
                    
	        }


        }).fail(function() {
        	//console.log('O servidor não está ativo. url:' + url)    
        });
    }

    function getHashtags(campaignID){

        var url = address + 'campaign/' + campaignID + '/hashtags';

        var labelData = []
        var percentData = []

        $.get(url, function(data){
            
            for (var i = 0, len = data.length; i < len; i++) {    

            	labelData.push('#'+data[i].hashtags)
            	percentData.push(data[i].qtd)
            	//alert(data[i].hashtags + ' | ' + data[i].qtd)

            }


        });

		waitForSeconds(10);
        //alert(labelData.length + ' | ' + percentData.length)
        var color = Chart.helpers.color;
        var config = {
            type: 'radar',
            data: {
                labels: labelData,
                datasets: [{
                    label: "Hashtags mais usadas",
                    borderColor: window.chartColors.red,
                    backgroundColor: color(window.chartColors.orange).alpha(0.2).rgbString(),
                    pointBackgroundColor: window.chartColors.orange,
                    data: percentData
                }]
            },
            options: {
            	legend: {labels:{fontColor:"white", fontSize: 18}},
                title:{
                    display:false,
                    text:"Chart.js Radar Chart - Skip Points"
                },
                elements: {
                    line: {
                        tension: 0.0
                    }
                },
                scale: {
                    beginAtZero: true
                }
            }
        };

        window.onload = function() {
            window.myRadar = new Chart(document.getElementById("radarCanvas"), config);
        };

    }


    function getLocations(campaignID){
    	
        var url = address + 'campaign/' + campaignID + '/location';

        var wordList = []

        $.get(url, function(data){
            
            for (var i = 0, len = data.length; i < len; i++) {    
            	
            	var item = {
            		text: data[i].text,
            		weight: data[i].weight
            	}
            	console.log(item)
            	wordList.push(item)
            }
        });


		waitForSeconds(30);


	    $("#my_favorite_latin_words").jQCloud(wordList, {shape: "rectangular"});


    }

    //-------- NETWORK GRAPH --------------------------------------------------------------------------------------------



            // Called when the Visualization API is loaded.
            

    //-------------------------------------------------------------------------------------------------------------------

});


























