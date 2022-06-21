window.addEventListener("load", function(){
    let formulario = document.querySelector("form")

    formulario.addEventListener("submit", function(e){

        let errores = [];


        let name = document.querySelector(".name");
        if (name.value.length < 3){
            errores.push("El nombre del producto debe contener 5 caracteres como minimo");
        }

        let desc = document.querySelector(".desc");
        if (desc.value.length < 3){
            errores.push("La descripcion debe contener 20 caracteres como minimo");
        }

        let img = document.querySelector(".img123");
        if (img.value.length < 3){
            errores.push("Debes subir la Imagen Principal");
        }


        let price = document.querySelector(".price");
        if (price.value.length < 1){
            errores.push("Debes indicar el precio");
        }

        let descuento = document.querySelector(".descuento");
        if (descuento.value.length < 1){
            errores.push("Debes indicar si tiene descuento");
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