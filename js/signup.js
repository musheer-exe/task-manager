// const { json } = require("express")

const signupbutton = document.querySelector('.signup-button')



signupbutton.addEventListener('click', async function () {
    console.log('signup.click')
    const username = document.querySelector('.username-input').value;
    const email = document.querySelector('.email-input').value;
    const pass = document.querySelector('.pass-input').value;
    const age = document.querySelector('.age-input').value;
    const createuserPostCall = await fetch(`${getBaseUrl}/create/user`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            email: email,
            pass: pass,
            age: age
        })
    })
    const response = await createuserPostCall.json();
    const sessionKeyfromApi = response.auth_key;
    if (response.success = true) {
        localStorage.setItem('sessionkey', sessionKeyfromApi)
        window.location.href = '../HTML/home.html';

    }
    console.log(body)


})