const openModal = document.querySelector('.terminos');
const modal = document.querySelector('.modalFooterTerminos');
const closeModal = document.querySelector('.modalFooterTerminos__close');

openModal.addEventListener('click', (e)=>{
    e.preventDefault();
    modal.classList.add('modalFooterTerminos--show');
});

closeModal.addEventListener('click', (e)=>{
    e.preventDefault();
    modal.classList.remove('modalFooterTerminos--show');
});