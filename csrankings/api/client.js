let endpoint = "http://127.0.0.1:8000/api/institute/IR-E-C-6379/PG/students"
Two_Year_PG_Data={}
fetch(endpoint)
.then(response=>response.json())
.then(response=>{
    Two_Year_PG_Data['Male Students']=response['Two Year PG']['No. of Male Students']
    Two_Year_PG_Data['Female Students']=response['Two Year PG']['No. of Female Students']
    Two_Year_PG_Data['Total Students']=response['Two Year PG']['Total Students']
    Two_Year_PG_Data['Within State']=response['Two Year PG']['Within State (Including male & female)']
    Two_Year_PG_Data['Outside State']=response['Two Year PG']['Outside State (Including male & female)']
    Two_Year_PG_Data['Outisde Country']=response['Two Year PG']['Outside Country (Including male & female)']
    console.log(Two_Year_PG_Data)
})