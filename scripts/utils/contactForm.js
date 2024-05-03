const modal = document.getElementById("contact_modal");
const submitForm = document.getElementById("contact-form");

function displayContactModal() {
    document.getElementById('contact-photographer-name').innerText= photographerDetails.photographer.name;
	modal.showModal();
}

function closeContactModal() {
    modal.close();
}

submitForm.addEventListener('submit', event => {
    event.preventDefault();

    const prenom = document.getElementById('prenom').value;
    const nom = document.getElementById('nom').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    console.log('contact data', {
            "prenom": prenom,
            "nom": nom,
            "email": email,
            "message": message
        });

    modal.close();
})