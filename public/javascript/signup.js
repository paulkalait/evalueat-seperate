  
  async function signupFormHandler(event) {
    event.preventDefault();
  
    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  

    //create a validation to check if there is a duplicate id/ user with same values 
    if (username && email && password) {
      const response = await fetch('/api/users', {
        method: 'post',
        body: JSON.stringify({
          username,
          email,
          password
        }),
        headers: { 'Content-Type': 'application/json' }
      });
      console.log(response)
      if (response.ok) {
        document.location.replace('/');
      } else {
          
        alert(response.statusText);
      }
    }
  }

  document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);