(function() {

    var cloudPlayer = {

        init: function() {
            return SC.initialize({
                client_id: cloud_api
            });
        },
        searchList: function(str, callback) {
            SC.get('/tracks', {q: str}, function (tracks) {
                callback(tracks);
            });
        }
    };

    cloudPlayer.init();

    $(document).ready(function () {
        console.log('workin');
        var result = document.querySelector('#result');
        var searchInput = document.querySelector('#searchInput');
        var buttonSearch = document.querySelector('#buttonSearch');


        buttonSearch.addEventListener("click", function() {
            result.innerHTML= "";

            cloudPlayer.searchList(searchInput.value, function(list){
                if(!list.length){
                    var li = document.createElement('li');
                    li.innerHTML = "No songs match your search query";
                    li.addEventListener("click", function(){console.log("testing")});
                    result.appendChild(li);
                }
                list.forEach(function(song){
                    if(song.streamable){
                        var li = document.createElement('li');
                        li.innerHTML = song.title;
                        li.setAttribute('id', song.id);
                        result.appendChild(li);
                        console.log(result);
                    };
                });
            });
        });

    });



}());







