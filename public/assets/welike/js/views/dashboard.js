function loadDashboard() {
    var url = server + 'dashboard';
    $.get(url, function (data) {
        $("#campaignsCount").text(data[0].qtdCampaigns);
        $("#usersCount").text(data[0].qtdUser);
        $("#followersCount").text(data[0].qtdFollowers);
        $("#friendsCount").text(data[0].qtdFriends);
        $("#postsCount").text(data[0].qtdTweets);
    }).fail(function (jqXHR, textStatus, errorThrown) {
        swal('Erro ao carregar dashboard! url:' + url);
    });
}

$(document).ready(function () {
    loadDashboard();
});