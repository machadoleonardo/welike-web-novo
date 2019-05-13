var address = 'http://127.0.0.1:5001/'; //'http://wwww.welike.kinghost.net:21111/'; 

function clearDB(){

    $.post(address + 'db/clear', function(returnedData){

		alert('Comando executado!')

    }).fail(function(){
        console.log("Erro ao limpar db");
    });

}



