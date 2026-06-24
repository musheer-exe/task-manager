const loginButton = document.querySelector(".Login-button");
console.log(loginButton)


loginButton.addEventListener('click', async function () {
    const email = document.querySelector(".email-input").value;
    const pass = document.querySelector(".pass-input").value;
    localStorage.clear('sessionkey')

    const postCallResponse = await fetch(`${getBaseUrl}/taskly/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            // 'auth-key': epoch
        },
        body: JSON.stringify({
            email: email,
            pass: pass
        })
    });


    const data = await postCallResponse.json();
    console.log(data.message + ";;;;; message")
    const sessionKeyfromApi = data.auth_key;
    localStorage.setItem('sessionkey', sessionKeyfromApi)

    console.log(sessionKeyfromApi)

    if (data.message === 'OK') return window.location.href = 'home.html';
    else return alert(data.message)





})
