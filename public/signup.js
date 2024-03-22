//const { response } = require("express");

const signupForm = document.querySelector('#signupForm');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');
const erroediv= document.querySelector('#errordiv');
const p=document.querySelector('#p')

signupForm.addEventListener('submit', onSubmit);

async function onSubmit(e) {
  e.preventDefault();

  const userDetails = {
    name: nameInput.value,
    email: emailInput.value,
    password: passwordInput.value,
  }; 

  try {
    
    userDetails.name = userDetails.name[0].toUpperCase() + userDetails.name.slice(1);
    const char=emailInput.value;
    const response= await axios.get('/checkinfo')
    
     const val= await response.data.filter((review) =>
                 review.email.includes(char)); 
    
    
    if(val.length==0){
        const user= await axios.post('http://13.211.180.107:3005/signupuser',userDetails);
        console.log('signed up')
        clearInputs();   
        window.location.href='/login';

    }
    else{
        
        p.innerHTML=`This Email Id Has Already Registered`;
    }
 
  } catch (err) {
    console.log('Error creating user:', err);
    
  }
}

function clearInputs() {
  nameInput.value = '';
  emailInput.value = '';
  passwordInput.value = '';
}