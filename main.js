const backEndUrl = 'http://localhost:3001/users'

document.querySelector('.signup-form').addEventListener('submit', async (event) => {
    event.preventDefault()

    try {
        const response = await axios.post(backEndUrl, {
            name: document.querySelector('#signup-name').value,
            email: document.querySelector('#signup-email').value,
            password: document.querySelector('#signup-password').value,
        })

        console.log(response)

        alert('You have successfully signed up!')

        localStorage.setItem('userId', response.data.user.id)

        document.querySelector('.signUpScreen').classList.add('hidden')

    } catch (error) {
        console.log({error: error})
        alert('This e-mail is already associated with an account')
    }
})