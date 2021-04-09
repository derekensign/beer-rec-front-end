# BeerRec

## Overview

The purpose of this app is to recommend beers to users based on their location and a specific beer style of their choosing.

## Wireframes

<img src="homepage.png"
     style= "height:350px; width:500px;" />
<img src="search.png"
     style= "height:350px; width:500px;" />
<img src="Austinfavs.png"
     style="height:350px; width:500px;" />
<img src="dereksfavs.png"
     style="height:350px; width:500px;" />


## User Stories

- I can create a username using an e-mail and password.
- When I sign into my account after signup, I will be brought to a page with a search option and previously saved favorite beers.
- I can search for a specific beer style in a city, and get back all beers of that syle in that city.
- I can search for a city and get all beers brewed in that city.
- I can search for a style and get back all beers of that style.


## Routes Inventory

| Verb |     Path    |                Summary                |
|:----:|:-----------:|:-------------------------------------:|
|  GET |    /cities    |       search for beers in a city      |  
|  GET | /cities/:cityid/styles/:styleid | search for beers of a style in a city |   
|  PUT |    /favBeers/:id    |     save favorite beers to profile    |  
|  POST |    /users/   |          create user account          |   
|  POST | /users/login |         login to user account         |  
|DELETE |  /favBeers/:id |     delete favorite beers from profile    |  

## MVP Checklist

- User sign up and login
- Profile for remembering favorite beers
- Beer Search based on Style
- Beer Search based on City
- Address of brewery/brewpub

## Stretch Goals

- Beers are suggested based on highest user ratings
- Images of beer labels/bottles/cans appear for each beer
- Map of breweries in a city
- Favorite a brewery/search through a brewery's beers
- Recommendations based on favorited beers