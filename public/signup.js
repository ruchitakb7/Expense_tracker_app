const signupForm= document.querySelector('#signupForm');
const name= document.querySelector('#name');
const email= document.querySelector('#email');
const password= document.querySelector('password');

signupForm.addEventListener('submit',submitsignupform)

async function submitsignupform()
{
    const details={
        name:name.value,
        email:email.value,
        password:password.value
    }
    
    try{
        console.log(details);
        const signupdata= await axios.post('/signupuser',details)
        console.log("user ahs been signed")
    }
    catch(e){
        console.log(e)
    }
}