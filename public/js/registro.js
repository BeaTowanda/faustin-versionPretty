window.addEventListener ("load", function(){
//let form = document.querySelector(".registro");   
let form = document.querySelector("form");       
    form.addEventListener("submit", function(e){
 
         e.preventDefault();
         let file = document.querySelector("input[type='file']");
         console.log(file)
         var hayError=false;

        var inputs= document.querySelectorAll('.todosLosBotones');
        console.log(inputs)

        inputs.forEach(function(input){
           
            if(input.value == ""){
                /* error.style.color="red";
                error.style.fontSize= "12px";
                input.classList.add('is-invalid');                            
                error.innerHTML = "El campo esta vacio.";
                hayError = true;*/
                
                input.nextElementSibling.style.color="red";
                input.nextElementSibling.style.fontSize= "12px";
                input.classList.add('is-invalid');                            
                input.nextElementSibling.innerHTML = "El campo esta vacio.";
                hayError = true;

            }else{
                input.classList.remove('is-invalid');
                input.nextElementSibling.innerHTML = "";
            }
                                
             });

            let name= document.querySelector(".todosLosBotones input[name='usuario']")
            if (name.value != "" && (name.value.length < 3)){
                name.nextElementSibling.innerHTML = "Campo de nombre debe tener un minimo de 3 caracteres";
            }

            let address= document.querySelector(".todosLosBotones input[name='mail']")   
            function isEmail(address) {
                var pos = address.lastIndexOf("@");
                return pos > 0 && (address.lastIndexOf(".") > pos) && (address.length - pos > 4);
            }
            if (!isEmail){ 
                email.nextElementSibling.innerHTML = "Campo Email INVALIDO";
            }

            let password= document.querySelector (".todosLosBotones input[name='contraseña']")
            if (password.value != "" && (password.value.length < 4)){
                password.nextElementSibling.innerHTML = "La contraseña debe tener un minimo de 4 caracteres";
            }

            if(!hayError){
                this.submit();
            }

        });
    });