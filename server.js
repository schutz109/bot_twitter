const Twitter = require('twitter')
require('dotenv').config()

const Tweet = new Twitter({
  consumer_key:         process.env.BOT_CONSUMER_KEY,
  consumer_secret:      process.env.BOT_CONSUMER_SECRET,
  access_token_key:     process.env.BOT_ACESS_TOKEN,
  access_token_secret:  process.env.BOT_ACESS_TOKEN_SECRET,
})

function action(event){
  const {retweeted_status, id_str, screen_name, is_quote_status} = event;
  const {name} = event.user;

  if(!retweeted_status && !is_quote_status){ 
    Tweet.post(`statuses/retweet/${id_str}`, erro => { 
      if(erro){
        console.log("Erro no retweet: " + erro)
      
      }else {
        console.log("RETWEETADO: ", `https://twitter.com/${name}/status/${id_str}`)
        
    }) 
    Tweet.post('favorites/create', {id: id_str}, erro => {
      if(erro){
        return console.log("Erro no like: " + erro) 
       
      }else {
        return console.log("Tweet Likado. URL do Tweet: " + `https:twitter.com/${screen_name}/status/${id_str}`) 
        
      }
    }) 
  }else {
       return 
       
     }
}
var stream = Tweet.stream('statuses/filter', {track: 'ancap'}) 

stream.on('data', action) 

stream.on('error', erro => console.log("Erro: "+ erro)) 

