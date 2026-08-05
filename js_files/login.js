document.addEventListener('DOMContentLoaded', function () {
    // Get modal and elements
    const loginBtn = document.querySelector('.login-btn');
    const modal = document.getElementById('loginModal');
    const closeBtn = document.getElementById('closeBtn');

    // Open the modal when the login button is clicked
    loginBtn.onclick = function () {
        modal.style.display = "block";
    };

    // Close the modal when the close button (x) is clicked
    closeBtn.onclick = function () {
        modal.style.display = "none";
    };

    // Close the modal when the user clicks outside of the modal content
    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };
});

// Consultations 
document.addEventListener('DOMContentLoaded', function () {
    // Get modal and elements
    const consultationBtn = document.querySelector('.consultation-btn');
    const consultationModal = document.getElementById('consultationModal');
    const consultationCloseBtn = document.getElementById('consultationCloseBtn');

    // Open the modal when the consultation button is clicked
    consultationBtn.onclick = function () {
        consultationModal.style.display = "block";
    };

    // Close the modal when the close button (x) is clicked
    consultationCloseBtn.onclick = function () {
        consultationModal.style.display = "none";
    };

    // Close the modal when the user clicks outside of the modal content
    window.onclick = function (event) {
        if (event.target === consultationModal) {
            consultationModal.style.display = "none";
        }
    };
});