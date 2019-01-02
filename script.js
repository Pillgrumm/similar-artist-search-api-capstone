'use strict'

/*Data Flow Between Functions

Step One (handleFormSubmission) will call Step 2(getArtist), which will call Step 3(displayResults).

*/
// Step Four: Display data from the API call.


function displayResults(responseJson) {
    console.log(responseJson)
    $('.js-results').empty();
    /* Create an empty html output variable*/
    let htmlOutput = '';
    for(let i = 0; i < responseJson.length; i++) {
      /*if the image src is not empty...*/
      if(responseJson[i].image[3]['#text'] !=""){
        /*...Display the text */
        htmlOutput = `
        <div class="col-4">
                <div class="card">
                  <img class="card-image" src="${responseJson[i].image[3]['#text']}"/>
                  <h2><a href="${responseJson[i].url}" target="_blank">${responseJson[i].name}</a></h2>
              </div>
            </div>
          `;
      }
      /* If the img src is empty...*/
      else{
    /*...Display 'No Image' IMG */
      
      htmlOutput = `
      <div class="col-4">
              <div class="card">
                <img class="card-image" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png"/>
                <h2><a href="${responseJson[i].url}" target="_blank">${responseJson[i].name}</a></h2>
            </div>
          </div>
        `;
      }
    $('.js-results').append(htmlOutput)}
  }


//Step Three: Make the API call using input from the user.
function getArtist(artistName, artistQuantity){
    $.ajax({
    url: `https://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=${artistName}&api_key=56b468ce8d5c4ebc18352083e99d65ef&format=json&limit=${artistQuantity}`,
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


//Step Two: Take the input from the user.(Watch for submit)

function handleFormSubmit(){
    $('.search-form').submit(event => {
      event.preventDefault();
      const query = $.trim($('.query').val());
      console.log(query);
      const quantity = $('.select').val();
      console.log(quantity);
      //Validate user input.
      if(query==""){
        alert('Input artist')
      }
      else{
        getArtist(query, quantity);
        
      }
    })
    
  }

  //Step One: User will click the button on the landing page to get to the main page
function startApp(){
  $('.landing-page').on('click', '.start-button', event =>{
  $('.landing-page').addClass('hidden');
  $('.main').removeClass('hidden');
  });
}
  
function handleFunctions(){
  startApp();
  handleFormSubmit();
}
  
  $(handleFunctions);
