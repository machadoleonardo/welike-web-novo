var address = server;
var addressServer = server;

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

$(document).ajaxError(function(e, xhr, settings, exception) { 
    //alert("Erro em chamada ajax: " + exception); 
});

    function listStatus(){
        var url = address + 'campaigns';

            $.get(url, function(data){
               
                $( "#listStatus" ).empty();

                for (var i = 0, len = data.length; i < len; i++) {    

                    var progressBarClass = '';
                    if(data[i].status >= 50){
                        progressBarClass = 'progress-bar-info';
                    }else{
                        progressBarClass = 'progress-bar-primary';
                    }
                    $("<div>",{ html:'<a taget="_blank" href="campaign.html?c=' + data[i].id + '" ><div class="text-center-folded"><span class="pull-right pull-none-folded">'+ data[i].status + '%</span><span class="hidden-folded">' + data[i].name + '</span></div><div class="progress progress-xxs m-t-sm dk"><div class="progress-bar ' + progressBarClass + '" style="width: '+ data[i].status + '%;"></div></div></a>' }).appendTo("#listStatus");

                }
            }).fail(function() {
                console.log("Erro ao carregar dashboard!")
            });
    }

    function serverStatus(){
        var url = addressServer;

            var icon = document.getElementById("serverStatusIcon");
            var link = document.getElementById("serverStatusLink");

            var serverMessage = document.getElementById("serverStatusMessage");
            var serverMessageSmall = document.getElementById("serverStatusMessageSmall");

            serverMessage.innerHTML = '';
            serverMessageSmall.innerHTML = '';

            var dt = new Date();
            var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();

            $.get(url, function(data){

                if(data != ""){
                    icon.className = "point heartbitPointGreen";
                    serverMessage.innerHTML = 'Servidor conectado!';
                    serverMessage.className = 'block heartbitGreen';
                    serverMessageSmall.innerHTML = time;
                }

            }).fail(function() {
                icon.className = "point heartbitPointGrey";
                link.className = "media heartbitGrey";
                serverMessage.innerHTML = 'Servidor indisponível';
                serverMessage.className = 'block heartbitGrey';
                serverMessageSmall.innerHTML = time;
            });
    }

$( document ).ready(function(){

    listStatus();
    serverStatus();
});