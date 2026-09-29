export default {

async fetch(request){

if(request.method!=="POST"){
return new Response("Use POST",{status:405});
}

const {urls}=await request.json();

const result=[];

for(const url of urls){

try{

const page=await fetch(url,{
headers:{
"User-Agent":"Mozilla/5.0"
}
});

const html=await page.text();

const match=html.match(
/class=["']product-detailed__info-block["'][^>]*data-id=["'](\d+)["']/i
);

result.push(match?`[${match[1]}]`:"[NOT_FOUND]");

}catch{

result.push("[ERROR]");

}

}

return Response.json(result,{
headers:{
"Access-Control-Allow-Origin":"*"
}
});

}

}