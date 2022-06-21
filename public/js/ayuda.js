const abroModal = document.querySelector('.ayudaFooter');
const modalAyuda = document.querySelector('.modalAyuda');
const cierroModal = document.querySelector('.modalAyuda__close');

abroModal.addEventListener('click', (e)=>{
    e.preventDefault();
    modalAyuda.classList.add('modalAyuda--show');
});

cierroModal.addEventListener('click', (e)=>{
    e.preventDefault();
    modalAyuda.classList.remove('modalAyuda--show');
});