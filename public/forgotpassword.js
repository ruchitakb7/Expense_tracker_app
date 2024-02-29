const forgotpasswordForm = document.querySelector("#forgotpasswordForm")
const email = document.querySelector('#email');

forgotpasswordForm.addEventListener('submit',forgotpassword)


async function forgotpassword(e)
{
    e.preventDefault();
    const user={
        email:email.value
    }
   
    try{
        const getemail=await axios.post('/forgotpassword/password',user);
        if(getemail)
        {
            alert("link has been sent on your email id")
        }
        email.value="";
        console.log(getemail.data);

    }
    catch(e)
    {
        alert(e)
        console.log(e)
    }
}