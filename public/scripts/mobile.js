const mobileMenuBtnElement = document.getElementById('mobile-menu-button');
const mobileMenuElement = document.getElementById('mobile-menu');

function toggleMobileMenu() {
    mobileMenuElement.classList.toggle('open');
}

mobileMenuBtnElement.addEventListener('click', toggleMobileMenu);