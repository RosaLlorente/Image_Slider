//Declarar variables globales
var misImagenes = JSON.parse(localStorage.getItem("imagenesGuardadas")) || [];
var imagenesGuardadas = localStorage.getItem("imagenesGuardadas");

window.onload = function() 
{
    //Declarar variables
    var modo = document.getElementById("Modo");
    var sliderdiv = document.getElementById("BasicSlaider");
    var customdiv = document.getElementById("CustomSlaider");


    //Gestionar el modo
    actualizarModo(modo,sliderdiv, customdiv);
    modo.addEventListener("change", () => {
        actualizarModo(modo,sliderdiv, customdiv);
    });
}


function actualizarModo(modo,sliderdiv, customdiv) {
    var valor = modo.value; // Obtener el valor actual del select

    // Ocultar todos los divs
    sliderdiv.style.display = "none";
    customdiv.style.display = "none";

    // Mostrar el div correspondiente
    if (valor === "BasicSlayer") 
    {
        sliderdiv.style.display = "flex";

        //GESTIONAR EL SLIDER BASICO
        //Declarar variables
        var slider = document.getElementById("slider");
        var previous = document.getElementById("previous");
        var next = document.getElementById("next");
        
        //Obtener las imágenes por defecto
        var defaultimages = ["Img/capibara.jpg","Img/cat.jpg","Img/dragon.jpg","Img/duck.jpg","Img/hedgehog.jpg","Img/mouse.jpg","Img/otter.jpg","Img/rat.jpg"];

        slider.innerHTML = "";
        var imagenactual = 0;
        var img = document.createElement("img")
        img.src = defaultimages[imagenactual];
        slider.appendChild(img);
        if(imagenactual === 0)
        {
            img.style.opacity = "1"; 
        }

        previous.addEventListener("click", function() {
            imagenactual--;
            if (imagenactual < 0) 
            {
                imagenactual = defaultimages.length - 1; // Ir a la última imagen
            }
            uploadimage(img,defaultimages,imagenactual,"fadeInRight");
        });

        next.addEventListener("click", function() {
            imagenactual++;
            if (imagenactual === defaultimages.length) 
            {
                imagenactual = 0; // Ir a la primera imagen
            }
            uploadimage(img,defaultimages,imagenactual,"fadeInLeft");
        });
    } 
    else if (valor === "CustomSlaider") 
    {
        customdiv.style.display = "flex";
        var imgcustom = document.getElementById("imagecustom");
        var btncustom = document.getElementById("btncustom");

        //Gestionar el localStorage
        btncustom.addEventListener("click", function() {
            var imagen = imgcustom.value;
            if (imagen !== "")
            {
                misImagenes.push(imagen);
                localStorage.setItem("imagenesGuardadas", JSON.stringify(misImagenes));
                localStorage.getItem("imagenesGuardadas");
                imgcustom.value = "";
            }
        });
        
        //GESTIONAR EL SLIDER CUSTOM
        //Declarar variables
        var slidercustom = document.getElementById("slidercustom");
        var previouscustom = document.getElementById("previouscustom");
        var nextcustom = document.getElementById("nextcustom");
        slidercustom.innerHTML = "";

        //Obtener las imágenes almacenadas
        var imagenactualcustom = 0;

        var img = document.createElement("img")
        img.src = misImagenes[imagenactualcustom];
        slidercustom.appendChild(img);
        if(imagenactualcustom === 0)
        {
            img.style.opacity = "1"; 
        }

        previouscustom.addEventListener("click", function() {
            imagenactualcustom--;
            if (imagenactualcustom < 0) 
            {
                imagenactualcustom = defaultimages.length - 1; // Ir a la última imagen
            }
            uploadimage(img,misImagenes,imagenactualcustom,"fadeInRight");
        });

        nextcustom.addEventListener("click", function() {
            imagenactualcustom++;
            if (imagenactualcustom === misImagenes.length) 
            {
                imagenactualcustom = 0; // Ir a la primera imagen
            }
            uploadimage(img,misImagenes,imagenactualcustom,"fadeInLeft");
        });
    }
}

function uploadimage(img,defaultimages,imagenactual,animation)
{
    img.style.animation = "none";
    img.clientHeight; // Trigger reflow

    img.src = defaultimages[imagenactual];
    img.style.animation = animation + " 2s forwards";
}




