window.addEventListener("load", function(){
    let formulario = document.querySelector("form");

    formulario.addEventListener("submit", function(e){

        let errores = [];

        let user = document.querySelector("#user");
        if (user.value.length < 3){
            errores.push("El nombre de Usuario debe contener 6 caracteres como minimo");
        }

        let name = document.querySelector("#name");
        if (name.value.length < 2){
            errores.push("El Nombre  debe contener 2 caracteres como minimo");
        }

        let surname = document.querySelector("#surname");
        if (surname.value.length < 2){
            errores.push("El Apellido debe contener 2 caracteres como minimo");
        }

        let pass = document.querySelector("#pass");
        if (pass.value.length < 4){
            errores.push("La contraseña debe contener 5 caracteres como minimo");
        }

        let email = document.querySelector("#email");
        if (email.value.length < 3){
            errores.push("El email debe contener 8 caracteres como minimo");
        }

        let born = document.querySelector("#born");
        if (born.value.length < 3){
            errores.push("La fecha de nacimiento contener 6 caracteres como minimo");
        }

        let avatar = document.querySelector("#avatar");
        if (avatar.value.length < 3){
            errores.push("Debes cargar tu Avatar");
        }

        if (errores.length > 0) {
            e.preventDefault();

            let ulErrores = document.querySelector("div.errores ul")
            for (let i = 0; i < errores.length; i++){
                ulErrores.innerHTML += "<li>" + errores [i] + "</li>"
            }
        }

    });

})