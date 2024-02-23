//const { expenseSheet } = require("../controllers/expense");

const expenseForm= document.querySelector('#expenseForm');
const expenseAmount = document.querySelector('#expenseAmount');
const expenseDescription = document.querySelector('#expenseDescription')
const expenseCategory = document.querySelector('#expenseCategory');
const Tbody= document.querySelector('#Tbody');

expenseForm.addEventListener('submit',addExpense)
window.addEventListener('DOMContentLoaded',expenseSheet);


async function addExpense(e)
{
    e.preventDefault();

    const p={
        expenseAmount:expenseAmount.value,
        expenseDescription:expenseDescription.value,
        expenseCategory:expenseCategory.value
    }

    try{

        const response=await axios.post('/addExpense',p);
        if(response.data.success==true)
        location.href='/home';
        else{
            alert("something went wrong")
        }
    }
    catch(e)
    {
        console.log(e)
    }

}

async function expenseSheet()
{
    try{
        const sheet= await axios.get('/Expensesheet');
        printSheet(sheet.data);
    }
    catch(e)
    {
        console.log(e)
    }

}

async function printSheet(expenseData)
{
    expenseData.forEach(p=>{

        const tr= document.createElement('tr');
        const td1= document.createElement('td');
        const td2= document.createElement('td');
        const td3= document.createElement('td');
        const td4= document.createElement('td');

        const btn= document.createElement('button');
        btn.appendChild(document.createTextNode('Delete'));
        td4.appendChild(btn);
        btn.setAttribute('class','btn btn-danger');

        td1.innerHTML=`${p.expenseAmount}`
        td2.innerHTML=`${p.expenseDescription}`
        td3.innerHTML=`${p.expenseCategory}`

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4)
        Tbody.appendChild(tr);
        
        btn.addEventListener('click',()=>{deleteExpense(p)})

    })

}


async function deleteExpense(p)
{
    try{

        const response= await axios.delete(`/deleteexpense/${p.id}`)
        location.href='/home';
    }
    catch(e){
        console.log(e)
    }
}