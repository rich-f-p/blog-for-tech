async function submitlogin(event){
event.preventDefault();
  //checks login information
const username = document.querySelector('#username-custom').value.trim();
const password = document.querySelector('#password-custom').value.trim();
  
if (username && password) {
    const response = await fetch('/api/users/login', {
    method: 'POST',
    body: JSON.stringify({ name:username, password:password }),
    headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
    document.location.replace('/dashboard');
    console.log('ok')
    } else {
    alert('err');
    }
}
};
  
const loginBut = document.querySelector('.login-form')
loginBut.addEventListener('submit', submitlogin);