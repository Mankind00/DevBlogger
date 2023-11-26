
function checkPasswordMatch() {
    let password = document.getElementById('password').value;
    let confirmPassword = document.getElementById('confirmPassword').value;
    let passwordMatchElement = document.getElementById('passwordMatch');
    let registerBtn = document.getElementById('registerBtn');

    if (password !== confirmPassword) {
      passwordMatchElement.textContent = 'Passwords do not match';
      registerBtn.disabled = true;
    } else {
      passwordMatchElement.textContent = '';
      registerBtn.disabled = false;
    }
  }


// ClassicEditor
//     .create( document.querySelector( '#editor' ) )
//     .then( editor => {
//         console.log( editor );
//     })
//     .catch( error => { 
//         console.error( error );
//     } );

    console.log("work")
