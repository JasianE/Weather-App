
function changeMeasure(){
  let current = document.getElementById('changer').innerHTML
  if(current == 'Change to Fahrenheit'){
    document.getElementById('changer').innerHTML = 'Change to Celsius'
    x = 273.15
  }
  else if(current == 'Change to Celsius'){
    document.getElementById('changer').innerHTML = 'Change to Fahrenheit'
  }
}

function receiveUserData(){
  const userData = document.getElementById('searchCity').value
  receiveWeatherData(userData)
}


async function receiveWeatherData(location){
    function capitalize(string){
      string = string.split(' ')
      string = string.map(function(key){
        key = Array.from(key)
        key[0] = key[0].toUpperCase()
        key = key.join('')
        return key
      })
      return string.join(' ')
    }
    async function getData(query){
      let x = Math.floor(Math.random() * 40)
      try{
        fetch(`http://api.giphy.com/v1/gifs/search?q=${query}&api_key=g0TESKvZOd4t4II0U2peZJNsbNtSqfbj`, 
        {
          mode: 'cors',
        }
        )
        .then(function(response){
          return response.json()
        })
        .then(function(response){
          document.getElementById('gif').src = response.data[x].images.fixed_height.url
        })
      }
      catch(error){
        document.getElementById('img').remove
      }
    }
    
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=1bd5688c3ad352b06b2fc5307e361f80`,
        {
          mode: 'cors',
        }
      )
    if(response.status == 404){
      return false;
    }
    const weatherData = await response.json()
    let myObject = {
      weather: '',
      temperature: '',
      wind: ''
    }
    myObject.weather = capitalize(weatherData.weather[0].description)
    if(document.getElementById('changer').innerHTML == 'Change to Celsius'){
      myObject.temperature = Math.round((weatherData.main.feels_like - 273.15) * 9/5 + 32)
    }
    else if(document.getElementById('changer').innerHTML == 'Change to Fahrenheit'){
      myObject.temperature = Math.round((weatherData.main.feels_like - 273.15))
    }
    myObject.wind = Math.round(weatherData.wind.speed)

    if(response.status == 200){
      getData(myObject.weather)
      document.getElementById('displayName').innerHTML = capitalize(location)
      document.getElementById('displayWeather').innerHTML = "Today's Weather Is " + myObject.weather
      if(document.getElementById('changer').innerHTML == 'Change to Fahrenheit'){
        document.getElementById('displayTemp').innerHTML = "Today Feels Likes: " + myObject.temperature + " Degrees Celsius"
      }
      else if(document.getElementById('changer').innerHTML == 'Change to Celsius'){
        document.getElementById('displayTemp').innerHTML = "Today Feels Likes: " + myObject.temperature + " Degrees Fahrenheit"
      }
      document.getElementById('displayWind').innerHTML = "Today's Wind Speed Is " + myObject.wind + " Metres Per Second"
      
    }
}
receiveUserData()
