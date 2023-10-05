document.addEventListener("DOMContentLoaded", function () {
    const hamburgerButton = document.querySelector('.hamburger-button');
    const navMenu = document.querySelector('.nav-menu ul');

    hamburgerButton.addEventListener('click', function () {
        hamburgerButton.classList.toggle('is-active');
        navMenu.classList.toggle('is-active');
    });
});
console.log("hello world")