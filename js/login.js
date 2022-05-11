loginForm.onsubmit =  async event => {
    event.preventDefault()

    const username = usernameInput.value.trim()
    const password = passwordInput.value.trim()

    if (!(username && password)) {
        return errorMessage.textContent = 'All fields must be compeleted!'
    }

    let response = await request('/login', 'POST', {
        username,
        password
    })

    loginForm.reset()

    if(response.status > 205) {
        return errorMessage.textContent = response.message
    }

    window.localStorage.setItem('token', response.token)
    window.localStorage.setItem('avatar', API + '/' + response.data.avatar)

    errorMessage.textContent = response.message
    errorMessage.style.color = 'green'

    setTimeout(() => {
        window.location = '/admin.html'
    }, 1000)
}
