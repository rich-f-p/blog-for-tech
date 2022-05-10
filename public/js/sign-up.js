
async function signup() {
    const username = document.querySelector('#username-custom').value.trim();
    const password = document.querySelector('#password-custom').value.trim();

    if (username && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ name: username, password: password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if(response.ok){
            document.location.replace('/dashboard');
        }else{
            alert('error creating account, please try again later');
        }
    }
};

const createAcct = document.querySelector('#signup-form')
createAcct.addEventListener('submit', signup);