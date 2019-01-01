'use strict'

//const api_key = "56b468ce8d5c4ebc18352083e99d65ef";
// url: 
//http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=chon&api_key=56b468ce8d5c4ebc18352083e99d65ef&format=json&limit=6

/*Data Flow Between Functions

Step One (handleFormSubmission) will call Step 2(getArtist), which will call Step 3(displayResults).

*/
// Step 3: Display data from the API call.
function displayResults(responseJson) {
    console.log(responseJson)
    $('.js-results').empty();
    for(let i = 0; i < responseJson.length; i++) {
    $('.js-results').append(`
    <div class="col-4">
            <div class="card">
              <img class="card-image" src="${responseJson[i].image[3]['#text']}"/>
              <h2><a href="${responseJson[i].url}" target="_blank">${responseJson[i].name}</a></h2>
          </div>
        </div>
      `)}
  }


//step 2 make the API call using input from the user.
function getArtist(artistName){
    $.ajax({
    url: `https://ws.audioscrobbler.com/3.0/?method=artist.getsimilar&artist=${artistName}&api_key=56b468ce8d5c4ebc18352083e99d65ef&format=json&limit=6`,
    success: function(data) {
      console.log(data);
      //The API call succesful but there aren't any results!
      if(data.message=="The artist you supplied could not be found"){
        $('.error-message').text(`Sorry! We couldn't find that artist, try another?`);
        setTimeout(() =>{
          $('.error-message').empty();
        }, 3000);
      }
      else if(data.similarartists.artist.length == 0){
        $('.error-message').text(`Sorry! We couldn't find that artist, try another?`);
        setTimeout(() =>{
          $('.error-message').empty();
        }, 3000);
      }
      else{
        displayResults(data.similarartists.artist);
      }
    },
    //If server is too busy or the data we are sending/receiving has syntax errors.
       error: function(XMLHttpRequest, textStatus, errorThrown) {
        console.log("Status: " , textStatus); 
        console.log("Error: " , errorThrown);
        console.log("Status: " , XMLHttpRequest);
        $('.error-message').text(`There was a communication error with the server.`);
        setTimeout(() => {
          $('.error-message').empty();
        },3000); 
      }
  })
  }


//Step One: Take the input from the user.(Watch for submit)

function handleFormSubmit(){
    $('.search-form').submit(event => {
      event.preventDefault();
      const query = $('.query').val();
      console.log(query);
      //Validate user input.
      if(query==""){
        alert('Input artist')
      }
      else{
        getArtist(query);
      }
    })
    
  }
  
  $(handleFormSubmit);
