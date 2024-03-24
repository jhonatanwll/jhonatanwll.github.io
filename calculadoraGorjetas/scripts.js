// ------- Seleção de elementos -------
const calculateBtn = document.querySelector("#calculateBtn")

// ------- Funções -------
function calculateTip() {
    const billAmount = document.querySelector('#billAmount').value;
    const serviceQuality = parseFloat(document.querySelector('#serviceQuality').value);

    if (billAmount === "") {
        alert("Por favor, preencha os dados");
        return;
    }
    const tipAmount = billAmount * serviceQuality
    const totalAmount = parseFloat(billAmount) + parseFloat(tipAmount);
    
    const tipAmountInput = document.querySelector("#tipAmount");
    const totalAmountInput = document.querySelector("#totalAmount");
    tipAmountInput.value = tipAmount.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
    totalAmountInput.value = totalAmount.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
}

// ------- Eventos -------
calculateBtn.addEventListener("click", calculateTip)