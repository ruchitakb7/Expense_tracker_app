const forgotpasswordForm = document.querySelector("#forgotpasswordForm")
const email = document.querySelector('#email');

forgotpasswordForm.addEventListener('submit',forgotpassword)


async function forgotpassword(e)
{
    e.preventDefault();
    const useremail=email.value;
    console.log(useremail);
    try{
        const getemail=await axios.put(`/forgotpassword/password/${useremail}`);
        console.log(getemail.data);

    }
    catch(e)
    {
        console.log(e)
    }
}