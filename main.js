
document.querySelector("#search-bar").placeholder="Search for Artist";

document.querySelector('.search-form').addEventListener("submit", function(event){
  console.log('in');
  event.preventDefault();
  document.querySelector(".results").textContent = ""
  let artist=document.querySelector('#search-bar').value;
  fetch("http://api.soundcloud.com/users/?client_id=095fe1dcd09eb3d0e1d3d89c76f5618f&q="+artist)
    .then( function(response){
      return response.json()
    })
    .then(function(json){
      let user_ID = json[0].id;
      fetch("http://api.soundcloud.com/users/"+user_ID+'/tracks/?client_id=095fe1dcd09eb3d0e1d3d89c76f5618f')
        .then( function(response){
          return response.json()
        })
        .then(function(json){
          for (i=0; i<json.length; i++){
            let images=json[i].artwork_url;
            let songTitle=json[i].title;
            let username=json[i].user.username;
            let id=json[i].id
            let html=`
              <div type="click" class="songs" value=${id} id=${id} onclick= audio(${id})>
                <img src="${images}" alt="song image" class=images type="click" height="220" width="220"}>
                <div class=song_title>${songTitle}</div>
                <div class=band>${username}</div>
              </div>
            `
            document.querySelector('.results').insertAdjacentHTML('afterbegin', html);

          }
        });
    });
});


function audio(id){
  let audiotag=document.querySelector("audio");
  audiotag.src="https://api.soundcloud.com/tracks/"+id+"/stream?client_id=095fe1dcd09eb3d0e1d3d89c76f5618f"
}
