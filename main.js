const backEndUrl = 'http://localhost:3001'

const signUpScreen = document.querySelector('#signUpScreen')
const signUpForm = document.querySelector('.signup-form')

const loginScreen = document.querySelector('#loginScreen')
const profile = document.querySelector('#profile')

const signUpLink = document.querySelector('#signup-link')
const loginLink = document.querySelector('#login-link')
const logoutLink = document.querySelector('#logout-link')
const profileLink = document.querySelector('#profile-link')

const openProfile = () => {
    profile.classList.remove('hidden')
    signUpScreen.classList.add('hidden')
    loginScreen.classList.add('hidden')
    let userName = document.querySelector('#user-name')
    let usersName = localStorage.getItem('userName')
    if(usersName !== undefined) {
        userName.innerText = `Hello, ${usersName}`
    }
}

const getAllBeers = () => {

}

const switchToLogin = () => {
    profile.classList.add('hidden')
    signUpScreen.classList.add('hidden')
    loginScreen.classList.remove('hidden')
}

const switchToSignup = () => {
    profile.classList.add('hidden')
    signUpScreen.classList.remove('hidden')
    loginScreen.classList.add('hidden')
}


document.querySelector('#signup-link').addEventListener('click', async (event) => {
    event.preventDefault()
    switchToSignup()
})

document.querySelector('#login-link').addEventListener('click', async (event) => {
    event.preventDefault()
    switchToLogin()
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

        // document.querySelector('#signUpScreen').classList.add('hidden')

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

        // getAllBeers()
        openProfile()

    } catch (error) {
        console.log({error: error})
        alert(error)
    }
})

document.querySelector('.search-form').addEventListener('submit', async (event) => {
    event.preventDefault()

    try {
        let searchStyle = document.querySelector('#search-style').value

        console.log(searchStyle)

        const beers = await axios.get(`${backEndUrl}/beers/search?style=${searchStyle}`)

        console.log(beers.data)

        for(let i = 0; i < beers.data.length; i++) {
            //Create new html elements and store them to variables
            let newDiv = document.createElement('div')
            let newName = document.createElement('h5')
            let newImage = document.createElement('img')
            let newBrewery = document.createElement('p')

            //append the created elements to the created DIV
            newDiv.appendChild(newImage)
            newDiv.appendChild(newName)
            newDiv.appendChild(newBrewery)

            //Change the elements display info
            newName.innerText = beers.data[i].name
            newImage.src = beers.data[i].imageurl
            newBrewery.innerText = beers.data[i].brewery
            
            // give the created div class of winediv and attach 
            //it to wineinfo to display it on the screen
            newDiv.classList.add("beer")
            document.querySelector('#searchScreen').appendChild(newDiv)
        }
    } catch (error) {
        console.log({error})
    }
})
    