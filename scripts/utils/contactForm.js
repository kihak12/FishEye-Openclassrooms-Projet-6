const modal = document.getElementById("contact_modal");

function displayContactModal() {
    document.getElementById('contact-photographer-name').innerText= photographerDetails.photographer.name;
	modal.showModal();
}

function closeContactModal() {
    modal.close();
}