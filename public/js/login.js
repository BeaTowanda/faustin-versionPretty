window.addEventListener("load", function(){
    let formulario = document.querySelector("form")

    formulario.addEventListener("submit", function(e){

        let errores = [];


        let user = document.querySelector("#user");
        if (user.value.length < 6){
            errores.push("El nombre de Usuario debe contener 6 caracteres como minimo");
        }

        let pass = document.querySelector("#pass");
        if (pass.value.length < 5){
            errores.push("La contraseña debe contener 5 caracteres como minimo");
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
