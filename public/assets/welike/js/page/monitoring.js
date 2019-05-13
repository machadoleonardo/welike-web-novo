var address = 'http://localhost:5000/'; //'http://wwww.welike.kinghost.net:21111/'; 

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

function startMonitoring(){
       
    var campaignId = getUrlParameter('c');
 
    var url = address + 'campaign/' + campaignId;

    $.get(url, function(data){
        alert('Iniciando monitoramento ' + campaignId)
        
        var title = $( "#campaignTitle" ).empty();
        title.text('Monitoramento da Campanha ' + data[0].name);


        var urlReferences = address + 'monitor/' + campaignId + '/influencers';

        $.get(urlReferences, function(data){

            var list = $( "#referenceList" ).empty();

            for (var i = 0, len = data.length; i < len; i++) { 
                var innerString = '<div class="col-md-2"><div class="testimonial-user-info user-info text-left"><div class="testimonial-user-thumb user-thumb"> <img class="img-circle" src="' + data[i].profilePicture + '" alt="user-thumb" onError="imgError(this);"> </div><div class="testimonial-user-txt user-text"><a href="http://www.twitter.com/' + data[i].screenName + '" target="_blank"><a href="http://www.twitter.com/' + data[i].screenName + '" target="_blank">' + data[i].name + '(@' + data[i].screenName + ')</a><h6 class="text-muted">' + (data[i].statusesCount != null ? data[i].statusesCount : '0') + ' tweets, ' + data[i].followersCount + ' seguidores, seguindo ' + data[i].friendsCount + '</h6></div></div></div>';              
                list.append(innerString);                 
            }
        });
    });

}

$( document ).ready(function(){

    var campaignId = getUrlParameter('c');
    if(campaignId != ""){
        startMonitoring();
    }

});
