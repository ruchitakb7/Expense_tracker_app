const loginForm= document.querySelector('#loginForm');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');
const errordiv= document.querySelector('#errordiv')
const p=document.querySelector('#p')

loginForm.addEventListener('submit',submitform)

async function submitform(e)
{
    e.preventDefault();

    const userDetails={
        email:emailInput.value,
        password:passwordInput.value
    }
    try{
      
        const response =await axios.post('/userloginCheck',userDetails);
        if(response.status===200)
        {
            errordiv.style.display='none';
            alert('User has been successfully logged in')
            clearInputs()
            console.log(response.data)
        
        }
        if(response.status===401)
        {
                p.innerHTML=`User Not Authorized`
                errordiv.appendChild(p)
                errordiv.style.display='block';
                console.log(response.data)
       }
       if(response.status===404)
       {
            p.innerHTML=`User not Found`
            errordiv.appendChild(p);
            errordiv.style.display='block';    
            console.log(response.data)
       }
    
    }
    catch(e){    
        console.log(e)
    }
}

function clearInputs() {
    emailInput.value = '';
    passwordInput.value = '';
  }
