const description = document.getElementById("description-text")
const characters = document.getElementById("characters-limit")
const descriptionError = document.getElementById("description-error")
const confirmError = document.getElementById("confirm-error")
const confirmValue = document.forms["form"] ["confirm"]
const vat = document.getElementById("vat")
const priceNetto = document.getElementById("price-netto")
const priceBrutto = document.getElementById("price-brutto")
const netValidate = document.getElementById("net-validate")
const nettoError = document.getElementById("price-netto-error")
const sendData = document.getElementById("send")
let statusMessage = document.getElementById("status-message")
let formData = {
    description: "",
    confirmation: "",
    taxRate: "",
    priceNetto: 0,
    priceBrutto: 0
}
function checkText() {
    let length = description.value.length
    if(length > 255) {
        characters.innerHTML="You have more than 255 characters"
        return false
    } else {
        characters.innerHTML=`There are ${255 - length} characters left to use`
        return true
    }
}
function descriptionValidate() {
    if (description.value == "") {
        descriptionError.innerHTML = "Text is required"
        return false
    } else {
        descriptionError.innerHTML = ""
        return true
    }
}
function checkClick() {
    let valid = false
    let value = ""
    for(const confirm of confirmValue){
        if(confirm.checked){
            valid = true
            break
        }
    }
    if (!valid) {
        confirmError.innerHTML = "Text is required"
        return false
    } else {
        confirmError.innerHTML = ""
        return true
    }
}
function taxValue() {
    if (vat.value) {
        priceNetto.disabled = false
        return true
    } else {
        priceNetto.disabled = true
        return false
    }
}
function valueNetto() {
    if (priceNetto.value) priceBrutto.value = Number(Math.round(priceNetto.value * (1 + vat.value /100) + "e+2") + "e-2")
    if (!/^\d+(.\d+)?$/.test(priceNetto.value)) {
        netValidate.innerHTML = "Please, input number"
        return false
    } else {
        netValidate.innerHTML = ""
        return true
    }
}
function checkPrice() {
    if (!priceNetto.value) {
        nettoError.innerHTML = "Text is required"
        return false
    } else {
        nettoError.innerHTML = ""
        return true
    }
}
function getStatus() {
        statusMessage.style.visibility = "visible",
        document.forms["form"].style.visibility = "hidden",
        statusMessage.innerHTML = "Success"
}
async function startValidation(e) {
    e.preventDefault()
    e.stopPropagation()
    checkClick()
    checkPrice()
    descriptionValidate()
    if (!checkText()
        || !descriptionValidate()
        || !checkClick()
        || !valueNetto()
        || !checkPrice()

    ) {
        console.log("Correct or complete the form")
    } else {
        formData.description = description.value
        formData.confirmation = confirmValue.value
        formData.taxRate = vat.value
        formData.priceNetto = priceNetto.value
        formData.priceBrutto = priceBrutto.value
        getStatus()
        const response = await fetch("http://localhost:3000/posts", {
            method:"POST", 
            body: JSON.stringify(formData),
            headers: {"Content-Type":"application/json"}
        })
        const data = await response.json()
        console.log(data)
    }
}
sendData.addEventListener("click",startValidation)
