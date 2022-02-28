// show and hide element tag
const showHide = (id, style) => {
    document.getElementById(id).style.display = style
}
const load = async () => {
    const inputField = document.getElementById('input-field')
    const inputText = inputField.value 

    const url = `https://openapi.programming-hero.com/api/phones?search=${inputText}`
    const res = await fetch(url)
    const data = await res.json()
    if(data.data.length == 0){
        // error.style.display = 'block'
        // row2.style.display = 'none'
        showHide('error', 'block')
        showHide('row','none')
    }
    else{
        display(data.data)
    }
    inputField.value = ''
}
// fist display
const display = (phones) => {
    // console.log(phones)
    showHide('error', 'none')
    showHide('row','flex')
    document.getElementById('row').textContent = ''
    if(phones.length > 20){
        for(let i=0; i<20; i++){
            const phone = phones[i]
            createElement(phone)
        }
    }
    else{
        for(let phone of phones){
            createElement(phone)
        }
    }
}
// function for loop use
const createElement = (phone) => {
    // console.log(phone)
    const row = document.getElementById('row')
    const div = document.createElement('div')
    div.classList.add('col')
            div.innerHTML = `
                <div class="card rounded-3">
                  <img src="${phone.image}" class="card-img-top p-5" alt="...">
                  <div class="card-body">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <p class="card-text">${phone.brand}</p>
                    <button onclick="outputDetails('${phone.slug}')" class="btn btn-primary">Details</button>
                  </div>
                </div>
            `
            row.appendChild(div)
}
// outputDetails
const outputDetails = (phoneId) => {
    console.log(phoneId)
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`
    fetch(url)
    .then(res => res.json())
    .then(data => outputDisplay(data.data))
}

// last output show
const outputDisplay = (phoneDetails) => {
    console.log(phoneDetails)
    const output = document.getElementById("output")
    output.innerHTML = `
    <div class="card w-50 mx-auto border-0" style="width: 18rem;">
      <img id="img" src="${phoneDetails.image}" class="card-img-top mx-auto" alt="...">
      <div class="card-body d-lg-flex gap-3 align-items-center">
        <div>
            <h4 class="card-title my-0">${phoneDetails.name}</h4>
            <h5 class="card-title my-0">${phoneDetails.releaseDate ? phoneDetails: 'No release date found'}</h5>
            <h5 class="card-title my-0">${phoneDetails.brand}</h5>

            <h6 class="mt-3">${phoneDetails.mainFeatures.chipSet}</h6>
            <h6 class="mt-2">${phoneDetails.mainFeatures.displaySize}</h6>
            <h6 class="mt-2">${phoneDetails.mainFeatures.memory}</h6>
            <h6 class="mt-2"></h6>
        </div>

        <div class='text-lg-end'>
            <div>
            <span>${phoneDetails.mainFeatures.sensors[0] ? phoneDetails.mainFeatures.sensors[0]: ''},</span>
            <span>${phoneDetails.mainFeatures.sensors[1] ? phoneDetails.mainFeatures.sensors[1]: ''},</span>
            <span>${phoneDetails.mainFeatures.sensors[2] ? phoneDetails.mainFeatures.sensors[2]: ''},</span>
            <span>${phoneDetails.mainFeatures.sensors[3] ? phoneDetails.mainFeatures.sensors[3]: ''},</span>
            <span>${phoneDetails.mainFeatures.sensors[4] ? phoneDetails.mainFeatures.sensors[4]: ''},</span>
            <span>${phoneDetails.mainFeatures.sensors[5] ? phoneDetails.mainFeatures.sensors[5]: ''},</span>
            <span>${phoneDetails.mainFeatures.sensors[6] ? phoneDetails.mainFeatures.sensors[6]: ''}</span>
            </div>

            <div class='mt-2'>
            <div>${phoneDetails.others?.Bluetooth? phoneDetails.others.Bluetooth: ''}.</div>
            <div>${phoneDetails.others?.GPS? phoneDetails.others.GPS: ''}.</div>
            <div>${phoneDetails.others?.NFC? phoneDetails.others.NFC: ''}.</div>
            <div>${phoneDetails.others?.Radio? phoneDetails.others.Radio: ''}.</div>
            <div>${phoneDetails.others?.USB? phoneDetails.others.USB: ""}.</div>
            <div>${phoneDetails.others?.WLAN? phoneDetails.others.WLAN: ""}.</div>
            </div>
        </div>
      </div>
    </div>
    `
}
