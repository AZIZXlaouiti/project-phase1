


document.addEventListener("DOMContentLoaded",()=>{
  fetch('http://localhost:3000/users')
  .then(resp=>resp.json())
  .then(data=>data.forEach(element =>Loadprofile(element)))
})
  

let wait = 0;
let toggle = true
let login = true
const app = document.querySelector("#app");
const input = document.querySelector("input");
const clear = document.querySelector(
  "div.posting-field > svg.feather-plus-circle"
);
let  signIn = document.querySelector("#signIn")
let button = document.querySelector("#submition > form > button");
signIn.addEventListener("click",(e)=>{
  let message = document.querySelector("#submition > form > div");
  let header = document.querySelector("#submition > h1");
 
 login = !login  
 if (login){
  e.preventDefault()
  message.innerText = "Don't have an account ";
  header.innerText = "WELCOME";
  button.innerText = "LOGIN";
  signIn.innerText = "join NOW";
 
 }
 else{
    message.innerText = "Already have an account?"
    header.innerText = "Create New Account"
    button.innerText = "create account";
    signIn.innerText = "signIn";
 }
 
})

document.addEventListener("keydown", (e) => {
  // e.preventDefault();
  if (e.key === "Enter") {
    if (input.value !== "") {
      Display();
      app.scrollTop = app.scrollHeight;
      wait += 1;
      input.value = "";
    }
  } 
}); 
clear.addEventListener("click", () => {
  if (input.value !== "") {
    input.value = "";
  }
});  
const sign = document.querySelector("div.chat-area > div > div.add")
sign.addEventListener("click",()=>{
  toggle = !toggle
  if (toggle){
    document.querySelector('#submition').style.display = "block";
   
  }
  else{
    document.querySelector('#submition').style.display = "none";
  }
})

const add = document.querySelector("#submition > form")

add.addEventListener('submit',(e)=>{
  e.preventDefault()
  if (!login){
  const username = document.querySelector("#submition > form > input[name=username]")
  const Password = document.querySelector("#submition > form > input[name=Password]")
  console.log(username.value)
  console.log(Password.value)
  document.querySelector('#submition').style.display = "none";
  const userData={
    username:username.value,
    password:Password.value
  }
  // for(let i=1;i<=5;i++){ document.querySelector("body > div:nth-child(1) > div").removeChild(document.querySelector("body > div:nth-child(1) > div > div:nth-child(1)"))}
  

  const options={
    method:'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  }
  
  fetch('http://localhost:3000/users',options)
  .then(resp => resp.json())
  .then(data=> (Loadprofile(data)))
  username.value = "";
  Password.value = "" ;

  // console.log("fetching")


}



  })
function Display() {
  // first time user add comment after respond
  if (wait === 0) {
   Load(app,input);
  } else {
    let select = document.querySelector("#app > div:last-child > div:nth-child(2)")
    let div1 = document.createElement("div");
    let div2 = document.createElement("div");
    div1.classList.add("message-sent");
    div2.classList.add("message-sent-text");
    div2.innerText = input.value;
    div1.appendChild(div2);
    select.appendChild(div1);
  }
}
function Load(container,input){
  let groupdiv = document.createElement("div");
    let commentdiv = document.createElement("div");
    let imgdiv = document.createElement("div");
    let img = document.createElement("img");
    let div1 = document.createElement("div");
    let div2 = document.createElement("div");
    groupdiv.classList.add("sent");
    imgdiv.classList.add("sent-icon");
    img.src = "https://api.hello-avatar.com/adorables/120/user";
    imgdiv.appendChild(img);
    div1.classList.add("message-sent");
    div2.classList.add("message-sent-text");
    div2.innerText = input.value;
    div1.appendChild(div2);
    commentdiv.appendChild(div1);
    groupdiv.appendChild(imgdiv);
    groupdiv.appendChild(commentdiv);
    container.appendChild(groupdiv);
}

function Loadprofile(obj){
  
  // const id = obj.id
  // let div = document.querySelector("div.contacts > div")
  let contacts = document.querySelector(".contacts")
  let newcontact  = document.createElement('div')
  let icon = document.createElement("i")
  icon.classList.add("fa")
  icon.classList.add("fa-remove")
  newcontact.classList.add("contact-field") 
  let description = document.createElement("div") 
  let imgdiv = document.createElement("div");
  let img = document.createElement("img");
  description.classList.add("description")
  imgdiv.classList.add("sent-icon");
  description.innerText = obj.username;
  img.src = "https://api.hello-avatar.com/adorables/120/ran";
  imgdiv.appendChild(img);
  newcontact.appendChild(imgdiv);
  newcontact.appendChild(description);
  newcontact.appendChild(icon)
  // div.appendChild(newcontact)
  // contacts.insertBefore(div,sign)
  contacts.insertBefore(newcontact,sign)
  icon.addEventListener("click",async()=>{ 
    console.log(obj.id)
    const req = await fetch(`http://localhost:3000/users/${obj.id}`,{
      method: 'delete' })
    
       contacts.removeChild(newcontact)
    contacts.scrollTop = contacts.scrollHeight;
  }
    )
}

