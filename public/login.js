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
        console.log(response);
        if(response.data.success==true)
        {
            alert(response.data.message)
            errordiv.style.display='none';
            clearInputs()
        
        }
        else{
            clearInputs()
            p.innerHTML=`${response.data.message}`;
           
            console.log(response.data.message)

        }
    
    }
    catch(err){   
        p.innerHTML=`${err}`;
        errordiv.style.display='block';
        console.log(err)
        
    }
}

function clearInputs() {
    emailInput.value = '';
    passwordInput.value = '';
  }
