var address = 'http://127.0.0.1:5000/'; //'http://wwww.welike.kinghost.net:21111/'; 

    function loadDashboard(){

        var url = address + 'dashboard';

        $.get(url, function(data){
            
            var campaigns = $( "#campaignsCount" ).empty();
            campaigns.text(data[0].qtdCampaigns);

            var users = $( "#usersCount" ).empty();
            users.text(data[0].qtdUser);

            var followers = $( "#followersCount" ).empty();
            followers.text(data[0].qtdFollowers);

            var friends = $( "#friendsCount" ).empty();
            friends.text(data[0].qtdFriends);

            var posts = $( "#postsCount" ).empty();
            posts.text(data[0].qtdTweets);

        }).fail(function(jqXHR, textStatus, errorThrown) {
            //alert('Erro ao carregar dashboard! ' + textStatus);
            console.log('Erro ao carregar dashboard! url:' + url)    
        });

        
    }

$( document ).ready(function(){

    loadDashboard();
});