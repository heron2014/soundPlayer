(function() {


    var id = cloud_api;
    var cloudPlayer = new CloudPlayer(id);

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
                    };
                });
            });
        });

    });




//player constructor with methods
    function CloudPlayer(api_key){
        SC.initialize({
            client_id: api_key
        });

        this.searchList = function(str, callback) {
            SC.get('/tracks', { q: str }, function(tracks) {
                callback(tracks);
            });
        }
    }

}());







