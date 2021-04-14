const backEndUrl = 'http://localhost:3001'

const signUpScreen = document.querySelector('#signUpScreen')
const signUpForm = document.querySelector('.signup-form')

const loginScreen = document.querySelector('#loginScreen')
const profile = document.querySelector('#profile')
const searchScreen = document.querySelector('#searchScreen')
const searchResults = document.querySelector('.searchResults')
const welcome = document.querySelector('#welcome')
const searchHeader = document.querySelector('#search-header')
const profileHeader = document.querySelector('#profile-header')

const signUpLink = document.querySelector('#signup-link')
const loginLink = document.querySelector('#login-link')
const logoutLink = document.querySelector('#logout-link')
const profileLink = document.querySelector('#profile-link')
const searchLink = document.querySelector('#search-link')

const openProfile = async (req,res) => {

    while(searchResults.firstChild !== null) {
        searchResults.removeChild(searchResults.lastChild)
    }

    while(profile.firstChild !== null) {
        profile.removeChild(profile.lastChild)
    }

    let userId = localStorage.getItem('userId')

    let beers = await axios.get(`${backEndUrl}/users/beers?id=${userId}`)

    profile.classList.remove('hidden')
    welcome.classList.add('hidden')
    searchHeader.classList.add('hidden')
    profileHeader.classList.remove('hidden')
    signUpScreen.classList.add('hidden')
    signUpLink.classList.add('hidden')
    loginScreen.classList.add('hidden')
    loginLink.classList.add('hidden')
    logoutLink.classList.remove('hidden')
    profileLink.classList.remove('hidden')
    searchLink.classList.remove('hidden')
    searchScreen.classList.add('hidden')
    searchResults.classList.add('hidden')
    let userName = document.querySelector('#user-name')
    let usersName = localStorage.getItem('userName')
    if(usersName !== undefined) {
        userName.innerText = `Hello, ${usersName}`
    }
    document.querySelector('#user-name').classList.remove('hidden')

    for(let i = 0; i < beers.data.length; i++) {
        //Create new html elements and store them to variables
        let newDiv = document.createElement('div')
        let newName = document.createElement('h3')
        let imageWrap = document.createElement('div')
        let newImage = document.createElement('img')
        let newBrewery = document.createElement('p')
        let description = document.createElement('p')

        //append the created elements to the created DIV
        newDiv.appendChild(imageWrap)
        imageWrap.appendChild(newImage)
        imageWrap.appendChild(description)
        newDiv.appendChild(newName)
        newDiv.appendChild(newBrewery)

        //Change the elements display info
        newName.innerText = beers.data[i].name
        newImage.src = beers.data[i].imageurl
        newBrewery.innerText = beers.data[i].brewery
        let beerId = beers.data[i].id
        description.innerText = beers.data[i].description
        description.classList.add('description-text')
        imageWrap.classList.add('image-wrap')
        
        // give the created div class of beerdriv and attach 
        //it to searchResults to display it on the screen
        newDiv.classList.add("beerdiv")
        document.querySelector('#profile').appendChild(newDiv)

    }
}

const switchToSearch = () => {

    while(searchResults.firstChild !== null) {
        searchResults.removeChild(searchResults.lastChild)
    }
    while(profile.firstChild !== null) {
        profile.removeChild(profile.lastChild)
    }

    welcome.classList.add('hidden')
    searchHeader.classList.remove('hidden')
    profileHeader.classList.add('hidden')
    profile.classList.add('hidden')
    signUpScreen.classList.add('hidden')
    loginScreen.classList.add('hidden')
    searchScreen.classList.remove('hidden')
    searchResults.classList.remove('hidden')
}
const switchToLogin = () => {
    profile.classList.add('hidden')
    signUpScreen.classList.add('hidden')
    loginScreen.classList.remove('hidden')
    searchScreen.classList.add('hidden')
    searchResults.classList.add('hidden')
    profileLink.classList.add('hidden')
    searchLink.classList.add('hidden')
}

const logout = () => {
    localStorage.clear()
    loginStatusCheck()
    signUpLink.classList.remove('hidden')
    loginLink.classList.remove('hidden')
    logoutLink.classList.add('hidden')
    profileLink.classList.add('hidden')
    searchLink.classList.add('hidden')
    while(profile.firstChild !== null) {
        profile.removeChild(profile.lastChild)
    }
    
}

const switchToSignup = () => {
    profile.classList.add('hidden')
    signUpScreen.classList.remove('hidden')
    loginScreen.classList.add('hidden')
    searchScreen.classList.add('hidden')
    searchResults.classList.add('hidden')
    profileLink.classList.add('hidden')
    searchLink.classList.add('hidden')
}


const saveBeer = async (beerId) => {
    let userId = localStorage.getItem('userId')
    let response = await axios.post(`${backEndUrl}/beers/${beerId}/favorite/`, {}, {
            headers: {
                authorization: userId
            }
    })
    console.log(response)
}

const deleteBeer = async (beerId) => {

}

document.querySelector('#signup-link').addEventListener('click', async (event) => {
    event.preventDefault()
    switchToSignup()
})

document.querySelector('#login-link').addEventListener('click', async (event) => {
    event.preventDefault()
    switchToLogin()
})

document.querySelector('#search-link').addEventListener('click', async (event) => {
    event.preventDefault()
    switchToSearch()
})

document.querySelector('#profile-link').addEventListener('click', async (event) => {
    event.preventDefault()
    openProfile()
})

document.querySelector('#logout-link').addEventListener('click', async (event) => {
    event.preventDefault()
    logout()
})

document.querySelector('.signup-form').addEventListener('submit', async (event) => {
    event.preventDefault()

    try {
        const response = await axios.post(`${backEndUrl}/users`, {
            name: document.querySelector('#signup-name').value,
            email: document.querySelector('#signup-email').value,
            password: document.querySelector('#signup-password').value
        })

        console.log(response)

        alert('You have successfully signed up!')

        localStorage.setItem('userId', response.data.user.id)
        localStorage.setItem('userName', response.data.user.name)

        openProfile()


    } catch (error) {
        console.log({error: error})
        alert('This e-mail is already associated with an account')
    }
})


document.querySelector('.login-form').addEventListener('submit', async (event) => {
    event.preventDefault()

    try {
        const response = await axios.post(`${backEndUrl}/users/login`, {
            email: document.querySelector('#login-email').value,
            password: document.querySelector('#login-password').value
        })

        console.log(response)

        alert('You have successfully logged in!')

        localStorage.setItem('userId', response.data.user.id)
        localStorage.setItem('userName', response.data.user.name)

        openProfile()

    } catch (error) {
        console.log({error: error})
        alert(error)
    }
})

document.querySelector('.search-form').addEventListener('submit', async (event) => {
    event.preventDefault()

    while(searchResults.firstChild !== null) {
        searchResults.removeChild(searchResults.lastChild)
    }


    try {
        let searchStyle = document.querySelector('#search-style').value

        console.log(searchStyle)

        const beers = await axios.get(`${backEndUrl}/beers/search?style=${searchStyle}`)

        console.log(beers.data)

        for(let i = 0; i < beers.data.length; i++) {
            //Create new html elements and store them to variables
            let newDiv = document.createElement('div')
            let newName = document.createElement('h3')
            let imageWrap = document.createElement('div')
            let newImage = document.createElement('img')
            let newBrewery = document.createElement('p')
            let description = document.createElement('p')
            let saveButton = document.createElement('button')

            //append the created elements to the created DIV
            newDiv.appendChild(imageWrap)
            imageWrap.appendChild(newImage)
            imageWrap.appendChild(description)
            newDiv.appendChild(newName)
            newDiv.appendChild(newBrewery)
            newDiv.appendChild(saveButton)

            //Change the elements display info
            newName.innerText = beers.data[i].name
            newImage.src = beers.data[i].imageurl
            newBrewery.innerText = beers.data[i].brewery
            let beerId = beers.data[i].id
            saveButton.innerHTML = 'Favorite'
            description.innerText = beers.data[i].description
            description.classList.add('description-text')
            imageWrap.classList.add('image-wrap')
            
            // give the created div class of beerdriv and attach 
            //it to searchResults to display it on the screen
            newDiv.classList.add("beerdiv")
            document.querySelector('.searchResults').appendChild(newDiv)

            saveButton.addEventListener('click', async (event) => {
                event.preventDefault()
                saveBeer(beerId)     
            })
        }
    } catch (error) {
        console.log({error})
    }
})

const loginStatusCheck = () => {
    const userId = localStorage.getItem('userId')
    if (userId) {
        let userName = document.querySelector('.userName')
        let usersName = localStorage.getItem('userName')
        userName.innerText = usersName
        openProfile()
    } else {
        switchToLogin()
    }
}

loginStatusCheck()
    