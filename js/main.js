(function() {

    var cloudPlayer = {

        list: document.querySelector('#result'),
        current: 0,

        init: function() {
            return SC.initialize({
                client_id: cloud_api
            });
        },
        searchList: function(str, callback) {
            SC.get('/tracks', {q: str}, function (tracks) {
                callback(tracks);
            });
        },
        play: function(str) {
            var is_playing = false;
            SC.stream("/tracks/" + str, function(sound){
                sound.play();
                is_playing = true;
            });

        },
        pause: function(str) {
            SC.stream("/tracks/" + str, function(sound){
                sound.pause();
            });

        }
    };

    cloudPlayer.init();



    $(function() {
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
                        li.addEventListener( 'click', function ( e ) {
                            console.log( 'LINK was clicked' );
                            cloudPlayer.play(li.getAttribute('id'));
                            console.log(li.getAttribute('id'));

                            e.preventDefault();
                        }, false );
                    };
                });
            });
        });


    });



}());







