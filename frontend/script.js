const WORKER="https://tvoyaapteka-dataid.alexcobainius.workers.dev";

const urls=document.getElementById("urls");
const output=document.getElementById("output");

document.getElementById("run").onclick=async()=>{

const list=urls.value
.split(/\n/)
.map(v=>v.trim())
.filter(Boolean);

if(!list.length){
output.textContent="Нет ссылок";
return;
}

output.textContent="Обработка...";

try{

const res=await fetch(WORKER,{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({urls:list})
});

const data=await res.json();

output.textContent=data.join("\n");

}catch(e){

output.textContent="Ошибка соединения";

}

};

document.getElementById("copy").onclick=()=>{

navigator.clipboard.writeText(output.textContent);

};

document.getElementById("clear").onclick=()=>{

urls.value="";
output.textContent="";

};