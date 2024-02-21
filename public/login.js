const loginForm= document.querySelector('#loginForm');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');
const errordiv= document.querySelector('#errordiv')
const p=document.querySelector('#p')

loginForm.addEventListener('submit',submitform)

async function submitform(e)
{
    e.preventDefault();

    const details={
        email:emailInput.value,
        password:passwordInput.value
    }
    try{
      
        const x= details.email;
        const response =await axios.get(`/checkuser/${x}`);
  
        if(response.status===201)
        {
            errordiv.style.display='none';
            if(response.data[0].password===details.password)
            {
                
                alert('User has been successfully logged in')
                clearInputs()
                
            }
            else
            {
               
                p.innerHTML=`Password  Missmatched`
                errordiv.appendChild(p)
                errordiv.style.display='block';
                console.log("Password  Missmatched")
                

            }

        }
    
    }
    catch(e){
        
       
                p.innerHTML=`User not Found`
                errordiv.appendChild(p);
                errordiv.style.display='block';    
                console.log("User Not Found")
    }
}

function clearInputs() {
    emailInput.value = '';
    passwordInput.value = '';
  }
