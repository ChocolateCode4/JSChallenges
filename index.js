window.onload = () => init();

let navbar = document.querySelector("nav"), body = document.querySelector("body")
  
function init() {
  fetch("metadata/meta.json")
  .then(res=>res.json())
  .then(data=>{
    let challenges = data.challenges;
    challenges.forEach(chalItem=>{
      let name = chalItem.name;
      let loc = chalItem.location;
      let itemInstance = document.createElement("h2");
      itemInstance.innerText = name;
      itemInstance.onclick = () => window.location.href = loc;
      navbar.appendChild(itemInstance);
    });
  });
}