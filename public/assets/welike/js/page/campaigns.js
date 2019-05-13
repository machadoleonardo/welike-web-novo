      var address = 'http://localhost:5000/'; //'http://wwww.welike.kinghost.net:21111/'; 

            var referenceItemSelected = '';

            function setReference(reference) {
                referenceItemSelected = reference;
            }

            function findReference(){

                for (var i = 0, len = dataReference.length; i < len; i++) {  

                    if(referenceItemSelected == dataReference[i].screenName){

                        var influencer = {
                            userID: dataReference[i].userID,
                            name: dataReference[i].name,
                            screenName: dataReference[i].screenName,
                            profilePicture: dataReference[i].profilePicture,
                            friendsCount: dataReference[i].friendsCount,
                            followersCount: dataReference[i].followersCount,
                            statusesCount: dataReference[i].statusesCount,
                            location: dataReference[i].location,
                            campaign: '',
                            platform: 'Twitter'}

                        return influencer;
                    }
                }
                return {error: 'Ops, referência não localizada. '}
            }  

            function addReferenceToCampaign(campaignId){

                var reference = findReference(); 

                if(reference.userID != 0 && reference.userID != ''){

                    $.post(address + 'user', { user: reference }, function(returnedData){


                    }).done(function(returnedData) {

                        $.post(address + 'campaign/addUser', { userId: returnedData, campaignId: campaignId }, function(returnedData){

                        }).done(function() {
                            swal({title: 'Ok!', text: 'Usuário inserido na campanha',type: "success", timer: 1600, showConfirmButton: false});
                            var cancelButton = document.getElementById('cancelButton');
                            cancelButton.click();

                        }).fail(function(){
                            console.log("error");
                        });

                    }).fail(function(){
                        console.log("error");
                    });

                }
            }

            var dataReference; 

            $( document ).ready(function(){

                // var campaignID = getUrlParameter('c');
                // loadCampaign(campaignID);


                // function loadCampaign(campaignID){
                //     alert('Campanha ' + campaignID);
                // }



                var createCampaignButton = document.getElementById("createCampaignButton");
                createCampaignButton.addEventListener("click", function (e) {

                    createCampaign();
                });

                function createCampaign(){
                    $.post(address + 'campaign', { name: document.getElementById("createCampaignInput").value }, function(returnedData){

                    }).done(function() {
                        swal({title: 'Ok!', text: 'Sua campanha ' + document.getElementById("createCampaignInput").value + ' foi salva',type: "success", timer: 1600, showConfirmButton: false});

                        var cancelButton = document.getElementById('cancelButton');
                        cancelButton.click();
                        document.getElementById("createCampaignInput").value = ''; 
                        listCampaigns();

                    }).fail(function(){
                        console.log("error");
                    });

                }

                var searchInput = document.getElementById("searchInput");
                searchInput.addEventListener("keydown", function (e) {
                    if (e.keyCode === 13) {  //checks whether the pressed key is "Enter"
                        search(e.target.value);
                    }
                });

                function listCampaigns(){
                    var url = address + 'campaigns';

                    $.get(url, function(data){
                        
                        $( "#listCampaigns" ).empty();

                        for (var i = 0, len = data.length; i < len; i++) {    
                            var stringFunction = "".concat("'", data[i].id, "'");

                            $("<tr>",{ html:'<td><i class="fa fa-rocket"></i></td><td>'+ data[i].name + '</td><td class="text-right"><button type="button" onclick="addReferenceToCampaign(' + stringFunction + ')" class="btn btn-raised btn-success" data-dismiss="modal">Salvar</button></td>' }).appendTo("#listCampaigns"); 
                        }
                    });
                }

                function search(text){
                    var keywords = text; 

                    if(keywords != ''){
                        var url = address + 'campaigns/search/' + keywords;

                        $.get(url, function(data){
                            dataReference = data;

                            $( "#hashList" ).empty();

                            for (var i = 0, len = data.length; i < len; i++) {  
                                var stringFunction = "".concat("'", data[i].screenName, "'");

                                $("<div>",{ html:'<div class="row"><div class="col-md-12"><section class="boxs"><div class="boxs-header dvd dvd-btm"><div class="row"><div class="col-md-1"><img class="img-circle" src="' + data[i].profilePicture + '" /></div><div class="col-md-9"><a href="http://www.twitter.com/' + data[i].screenName + '" target="_blank">' + data[i].name + '(@' + data[i].screenName + ')</a><h6 class="text-muted">' + data[i].statusesCount + ' tweets, ' + data[i].followersCount + ' seguidores, seguindo ' + data[i].friendsCount + '</h6><p>' + data[i].text + '</p></div><div class="col-md-2 text-right"><button class="btn btn-raised btn-primary" data-toggle="modal" onclick="setReference(' + stringFunction + ')" data-target="#myModal2">ADD</button></div></div></div></section></div></div>' }).appendTo("#hashList");   
                            }
                        });
                    }else{
                        alert('Faltou dizer o que você você gostaria de pesquisar ;)');
                    }
                }

                var searchInput = document.getElementById("searchInput");
                searchInput.addEventListener("keydown", function (e) {
                    if (e.keyCode === 13) {  //checks whether the pressed key is "Enter"
                        search(e.target.value);
                    }
                });

                searchInput.focus();
                

                function post(path, params, method) {
                    method = method || "post"; // Set method to post by default if not specified.

                    // The rest of this code assumes you are not using a library.
                    // It can be made less wordy if you use one.
                    var form = document.createElement("form");
                    form.setAttribute("method", method);
                    form.setAttribute("action", path);

                    for(var key in params) {
                        if(params.hasOwnProperty(key)) {
                            var hiddenField = document.createElement("input");
                            hiddenField.setAttribute("type", "hidden");
                            hiddenField.setAttribute("name", key);
                            hiddenField.setAttribute("value", params[key]);

                            form.appendChild(hiddenField);
                         }
                    }

                    document.body.appendChild(form);
                    form.submit();
                }

                listCampaigns();
            });