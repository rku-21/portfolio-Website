let homebutton = document.querySelector("#homebutton");
homebutton.addEventListener("click", function () {
    home = document.querySelector("#home");
    home.scrollIntoView({
        behavior: "smooth",
        block: "center"
    })
})

let aboutbutton = document.querySelector("#aboutbutton");
aboutbutton.addEventListener("click", function () {
    about = document.querySelector("#about");
    about.scrollIntoView({
        behavior: "smooth",
        block: "center"
    })
})
let skillsbutton = document.querySelector("#skillsbutton");
skillsbutton.addEventListener("click", function () {
      let skills=document.querySelector("#skills");
      skills.scrollIntoView({
        behavior:"smooth",
        block:"center"
      })
})
let projectsButton=document.querySelector("#projectsbutton");
projectsButton.addEventListener("click", function (){
    let projects=document.querySelector("#projects");
    projects.scrollIntoView({
        behavior:"smooth",
        block:"center"
    })
})
let contactButton=document.querySelector("#contactbutton");
contactButton.addEventListener("click", function (){
    let contact=document.querySelector("#contact");
    contact.scrollIntoView({
        behavior:"smooth",
        block:"center"
    })
})

