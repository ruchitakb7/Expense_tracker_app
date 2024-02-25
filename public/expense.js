//const { expenseSheet } = require("../controllers/expense");

const expenseForm= document.querySelector('#expenseForm');
const expenseAmount = document.querySelector('#expenseAmount');
const expenseDescription = document.querySelector('#expenseDescription')
const expenseCategory = document.querySelector('#expenseCategory');
const Tbody= document.querySelector('#Tbody');
const rzrpay = document.querySelector('#rzrpay');
const premium = document.querySelector('#premium');
const paybtn = document.createElement('button');
const leaderboardbtn = document.createElement('button');
const leaderboard = document.querySelector('#leaderboard');

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
        const token = localStorage.getItem('token');
       
        const response=await axios.post('/addExpense',p,{headers:{"Authorization":token}});
         updateUseratble();
        location.href='/home';
      
    }
    catch(e)
    {
        console.log(e)
    }

}

async function expenseSheet(e)  //refresh
{
    e.preventDefault();
    try{
        const token = localStorage.getItem('token');
      //  console.log(token)
        const sheet= await axios.get('/Expensesheet',{headers:{"Authorization":token}});
        showPremiumusermessage(sheet.data.premium)
        updateUseratble();
        printSheet(sheet.data.expenses)
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
        const token = localStorage.getItem('token');  
        const response= await axios.delete(`/deleteexpense/${p.id}`,{headers:{"Authorization":token}})
        location.href='/home';
        
    }
    catch(e){
        console.log(e)
    }
}

    paybtn.onclick = async function (e) {
    const token=localStorage.getItem('token');
    const response = await axios.get('/purchase/premiummembership', {headers:{"Authorization":token}});
  
    var options = 
    {
      "key":response.data.key_id,
      "order_id":response.data.order.id,
      "handler":async function(response){
        const res = await axios.post('/purchase/updatetransactionstatus', {
          order_id:options.order_id,
          payment_id:response.razorpay_payment_id
        }, {headers:{"Authorization":token}});
      
        localStorage.setItem('token',res.data.token);
  
        alert('You are a premium user now');
        location.href='/home';      
      },
    };
  
    const rzp1 = new Razorpay(options);
    rzp1.open();
    e.preventDefault();
  
    rzp1.on('payment.failed', function(response){
      console.log(response)
      alert('Something went wrong');
    //  showPremiumusermessage()
    });
  }

  function showPremiumusermessage(premiumcheck)
{
    if(premiumcheck.ispremiumuser==true){
        premium.innerHTML+="You are now a Premium User !    "
        leaderboardbtn.appendChild(document.createTextNode('Show LeaderBoard'))
        premium.appendChild(leaderboardbtn);
        leaderboardbtn.setAttribute('class','btn btn-success')
        leaderboardbtn.addEventListener('click',()=>{getdataforleaderboard()})

    }
    else{
        paybtn.appendChild(document.createTextNode('Buy Premium Membership'))
        premium.appendChild(paybtn);
        paybtn.setAttribute('class','btn btn-success');

    }
   
}

async function updateUseratble(expesnseinfo)
{
    try{
        const token=localStorage.getItem('token');
        const userexpesnes= await axios.get('/user_expenses',{headers:{"Authorization":token}});
        console.log(userexpesnes.data);
        let sum=0
        userexpesnes.data.forEach(ex=>{
        sum=sum+ex.expenseAmount;
       })
       totalexpense(sum,userexpesnes.data[0].userId);
       console.log(sum)
    }
    catch(e){console.log(e)}
}

async function totalexpense(tsum,userID){
    try{
        const p={
            sum:tsum,
            id:userID
        }
        const updatetable= await axios.post('/update_expense',p)
        
    }
    catch(e){console.log(e)}

}

async function getdataforleaderboard()
{
    try{
        const expensesdeata= await axios.get('/leaderboard');
        sortexpensedata(expensesdeata.data)

    }
    catch(e){console.log(e)}

}
 function sortexpensedata(userData)
 {
    for(let i=0;i<userData.length;i++)
     {
        for(j=i+1;j<userData.length;j++)
        {
            if(userData[i].totalExpenses<userData[j].totalExpenses)
            {
                let x=userData[i];
                userData[i]=userData[j];
                userData[j]=x
            }
        }
     }
     console.log(userData)
     showLeaderboard(userData)

 }

function showLeaderboard(userData)
{
    leaderboard.style.display='block'
    const tbody= document.getElementById('tbody')
    userData.forEach(user=>{
        const tr=document.createElement('tr');
        const td1= document.createElement('td');
        const td2 = document.createElement('td');
        td1.innerHTML=`${user.name}`;
        td2.innerHTML=`${user.totalExpenses}`;

        tr.appendChild(td1)
        tr.appendChild(td2)
        tbody.appendChild(tr);

    }) 
    
}

