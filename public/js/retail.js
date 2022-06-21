const openModal = document.querySelector('.retail');
const modal = document.querySelector('.modalFooter');
const closeModal = document.querySelector('.modalFooter__close');

openModal.addEventListener('click', (e)=>{
    e.preventDefault();
    modal.classList.add('modalFooter--show');
});

closeModal.addEventListener('click', (e)=>{
    e.preventDefault();
    modal.classList.remove('modalFooter--show');
});