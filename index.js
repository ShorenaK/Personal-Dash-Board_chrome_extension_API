fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
.then((res)=> res.json())
.then((data)=>{
    console.log(data.urls.regular)
    document.body.style.backgroundImage = `url(${data.urls.regular})`
    document.getElementById("author").textContent = `By: ${data.user.name}`
})
.catch(err => {
   document.body.style.background = "red"
    console.log("Somthing went wrong")
     // This is where I can handle the error
        // Choose to use a default backgronud image
        // Report the error to some kind of service
})
 
fetch("https://api.coingecko.com/api/v3/coins/dogecoin")
.then((res)=> 
    // console.log(res.status)(res.ok) is boolean // res.ok 400 over will be false // network error
    // you will receive the status / if is Stats 500 levels is api down
    // if(!res.ok){
    //     throw Error ("Something went wrong")
    // }
    // return res.json()
    res.json())
.then((data)=>{
    // throw Error -- manualy throws an error 
      document.getElementById("crypto-top").innerHTML = 
      `<img src="${data.image.small}"/> 
        <span> ${data.name}</span>`
        // += is to add if we only use = it will overlap and get rit off the image & name 
        document.getElementById("crypto").innerHTML +=
        `<p>🎯: $${data.market_data.current_price.usd}</p>
         <p>👆: $${data.market_data.high_24h.usd}</p>
         <p>👇: $${data.market_data.low_24h.usd}</p>
        </div>
      `
})
.catch(err => console.error(err))

// get current formatted time in javascript
function getCurrentime(){
    const date = new Date()
    document.getElementById("time").textContent = 
    date.toLocaleTimeString("en-us",{timeStyle: "short"} )
    
}
setInterval(getCurrentime, 1000)

navigator.geolocation.getCurrentPosition(position => {
    fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial`)
        .then(res => {
            if (!res.ok) {
                throw Error("Weather data not available")
            }
            return res.json()
        })
        .then(data => {
            console.log(data)
            const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
            document.getElementById("weather").innerHTML = `
                <img src=${iconUrl} />
                <p class="weather-temp"> ${Math.round(data.main.temp)}º </p>
                <p class="weather-city"> ${data.name}</p>

            `
        })
        .catch(err => console.error(err))
});
