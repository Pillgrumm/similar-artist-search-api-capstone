function getUser(query){
  $.ajax({
  url: 'http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=chon&api_key=56b468ce8d5c4ebc18352083e99d65ef&format=json&limit=6',
  success: function(data) {
    console.log(data);
  },
     error: function(XMLHttpRequest, textStatus, errorThrown) {
      console.log("Status: " , textStatus); 
      console.log("Error: " , errorThrown);
      console.log("Status: " , XMLHttpRequest); 
    }
})
}

function displayRepos(responseJson) {
    console.log(responseJson)
    $('#js-search-results').empty();
    $('#js-search-results').append(`<h3>Github Handle: ${responseJson[0].owner.login}</h3>`);
    for(let i = 0; i < responseJson.length; i++) {
    $('#js-search-results').append(`
      <li><p>Repo Name: ${responseJson[i].name}</p>
      <p>Repo URL: <a target = "_blank" href = "${responseJson[i].html_url}">${responseJson[i].html_url}</a></li>`)}
  }

function getRepo(query) {
    const userURL = getUser(query);
    fetch(userURL).then(response => {
    if(response.ok) {
      $('#js-error-message').text("");
      return response.json();
    }
    else
      throw new Error(response.statusText);})
    .then(responseJson => {
      displayRepos(responseJson);
      $('#js-query').val("");
    })
    .catch(err => {
      $('#js-error-message').text(`Something Went Wrong: ${err.message}`);
      $('#js-query').val("");
      $('#js-search-results').empty();
    });
  }

function handleFormSubmit(){
  $('#js-search-form').submit(event => {
    event.preventDefault();
    const query = $('#js-query').val();
   getUser(query);
  })
  
}

$(handleFormSubmit);