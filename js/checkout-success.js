function displayConfirmationMessage() {
    const confirmationMessage = document.getElementById("confirmation-message");
    confirmationMessage.innerHTML = `<img src="/images/checkmark.PNG" alt="Checkmark symbol" class="checkmark"><p>Thank you for your purchase!</p><p>We will send you an email that confirms your order.</p><p>Your tracking number is #001986313.</p><button class="continue-shopping">Continue Shopping</button>`
    const continueShoppingButton = confirmationMessage.querySelector(".continue-shopping");
    continueShoppingButton.addEventListener("click", () => {
        window.location.href = "/index.html";
    })
}

displayConfirmationMessage();