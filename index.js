const load = async () => {
    const inputField = document.getElementById('input-field')
    const inputText = inputField.value 

    const url = `https://openapi.programming-hero.com/api/phones?search=${inputText}`
    const res = await fetch(url)
    const data = await res.json()
    display(data.data)
}

const display = (phones) => {
    // console.log(phones)
    document.getElementById('row').textContent = ''
    if(phones.length > 5){
        for(let i=0; i<20; i++){
            const phone = phones[i]
            createElement(phone)
        }
    }
    else{
        for(let phone of phones){
            // console.log(phone)
            createElement()
        }
    }
}

const createElement = (phone) => {
    // console.log(phone)
    const row = document.getElementById('row')
    const div = document.createElement('div')
    div.classList.add('col')
            div.innerHTML = `
                <div onclick="outputDetails('${phone.slug}')" class="card rounded-3">
                  <img src="${phone.image}" class="card-img-top p-5" alt="...">
                  <div class="card-body">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <p class="card-text">${phone.brand}</p>
                    <button class="btn btn-primary">Details</button>
                  </div>
                </div>
            `
            row.appendChild(div)
}

const outputDetails = (phoneId) => {
    console.log(phoneId)
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`
    fetch(url)
    .then(res => res.json())
    .then(data => console.log(data.data))
}