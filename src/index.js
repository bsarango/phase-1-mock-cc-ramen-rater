// write your code here

//1. Fetch all images from db and post on DOM in div #ramen-menu
//Use fetch with appropriate API and post image in img tag

//2. Add a 'click' event to each ramen image to display all the information on the ramen. 
//**** Pass an id from the image or something else to grab the info of the approripate info using fetch once more
//Display info in the #ramen-detail

//3. Add a 'submit' event to the form - should be added to #ramen-menu div.
//*** Does not need to be POSTED to the db, only displayed on the DOM; can be removed upon refresh

//Load all ramen's to the DOM

function appendAllRamen(){
    fetch("http://localhost:3000/ramens")
    .then(resp=>resp.json())
    .then(ramens=>{
        ramens.forEach(ramen=>manageRamen(ramen))
    })
}

function manageRamen(ramenObj){
    console.log("managing Ramens")
    const menu = document.getElementById("ramen-menu")
    let ramen = document.createElement("img")
    ramen.src = `${ramenObj.image}`
    ramen.id = `${ramenObj.id}`
    menu.appendChild(ramen)
    ramen.addEventListener("click",addRamenDetails)
}

function addRamenDetails(e){
    console.log(e.target.id)
    fetch(`http://localhost:3000/ramens/${e.target.id}`)
    .then(resp=>resp.json())
    .then(ramenData => addRamenData(ramenData))
}

function addRamenData(ramenObj){
    const ramenImage = document.querySelector("#ramen-detail>img")
    const ramenName = document.querySelector("#ramen-detail>h2")
    const restaurant = document.querySelector("#ramen-detail>h3")
    ramenImage.src = `${ramenObj.image}`
    ramenName.textContent=`${ramenObj.name}`
    restaurant.textContent=`${ramenObj.restaurant}`

    const rating = document.getElementById("rating-display")
    rating.textContent=`${ramenObj.rating}`

    const comment = document.getElementById("comment-display")
    comment.textContent= `${ramenObj.comment}`
}

const ramenForm = document.getElementById("new-ramen")
ramenForm.addEventListener("submit", addNewRamen)

function addNewRamen(e){
    e.preventDefault()
    const inputRamenDetails = document.querySelectorAll("input")
    console.log(inputRamenDetails[0].value)

    const ramenMenu = document.getElementById("ramen-menu")
    const newRamen = document.createElement("img")
    newRamen.src = `${inputRamenDetails[2].value}`
    console.log(newRamen.src)
    ramenMenu.appendChild(newRamen)
    console.log(ramenMenu)
}

appendAllRamen()
