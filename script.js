'use strict'

//const api_key = "56b468ce8d5c4ebc18352083e99d65ef";
// url: 
//http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=chon&api_key=56b468ce8d5c4ebc18352083e99d65ef&format=json&limit=6

//HI

function search(event){
    event.preventDefault();

    const query = $(this).find('input').val();
    console.log(query)    


};

$('.search-form').submit(search);
