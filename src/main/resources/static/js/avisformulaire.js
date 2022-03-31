// SYSTEME DE NOTATION ETOILES

// On va chercher toutes les étoiles
const stars=document.querySelectorAll(".la-star");
// on va chercher l'input
const note=document.querySelector("#note");

// on boucle sur les etoiles pour leur ajouter des ecouteurs d'évenements
for (star of stars){
    // le survol

    star.addEventListener("mouseover", function(){
        resetStars();
        this.style.color="orange";

        // Element précédent de même niveau
        let previousStar= this.previousElementSibling;
        while(previousStar){
            // on passe l'étoile qui précéde en rouge
            previousStar.style.color="orange";
            // on récupère l'étoile qui la précède
            previousStar= previousStar.previousElementSibling;
        }
    });
    // quand on clique sur l'étoile on veut récupérer la note

    star.addEventListener("click", function(){
        note.value= this.dataset.value;
    });

    // quand on enleve la sourisca reste sur la note qu'on a mit

    star.addEventListener("mouseout", function(){
        // va repasser toutes les étoiles en noires jusqu'à atteindre la note correspondant au champ note
        resetStars(note.value);
    });
}



function resetStars(note=0){
    // boucle sur chaque étoile, va remettre directement les etoiles en noires ou en orange
    for(star of stars){
        if (star.dataset.value>note){
            star.style.color="black";
        } else{
            star.style.color="orange";
        }
    }
}

let obj={pseudo:"hanna84",date:"12/12/2021",description:"la recette est super facile à réaliser"};

function getCookie(name) {
    let dc = document.cookie;
    let prefix = name + "=";
    let begin = dc.indexOf("; " + prefix);
    if (begin == -1) {
        begin = dc.indexOf(prefix);
        if (begin != 0) return null;
    } else {
        begin += 2;
        let end = document.cookie.indexOf(";", begin);
        if (end == -1) {
            end = dc.length;
        }
    }
    return decodeURI(dc.substring(begin + prefix.length));
}

if (getCookie("pseudo") == null) {
    $("#recette").css("display", "none");
    $("#boutonAvis").css("display", "none");
} else {
    $("#connexionButton").css("display", "none");
    $("#dropdown").css("display", "block");
    $("#pseudo").html(getCookie("pseudo"));
    $("#recette").css("display", "block");
    $("#boutonAvis").css("display", "block");
}

// deconnexion

$("#deconnexion").click(() => {
    $.get("http://localhost:8080/API/deconnexion", () => {
        $("#dropdown").css("display", "none")
        $("#connexionButton").css("display", "block");
        $("#pseudo").html("");
        $("#pseudoConnexion").val('');
        $("#passwordConnexion").val('');
        $("#recette").css("display", "none");
        $("#boutonAvis").css("display", "none");
        document.location.href = "index.html";
    })
})

$("#monBouton").click(() =>{
    obj.pseudo=getCookie("pseudo");
    obj.date=$("#date").val();
    obj.description=$("#exempleCommentaire").val();
    obj.note=$("#note").val();


    $.ajax({
        type:"PATCH",
        url:"http://localhost:8080/API/recuperationAvisUser",
        data: JSON.stringify(obj),
        headers: {"Content-Type":"application/json"},
        success: (retour)=> {console.log(retour);}
    });


    $("#monAvis").html(  "date: " + obj.date +"commentaire : " + obj.description + " note:  " +obj.note );


});

//affichage des 4 avis les mieux notés en html
// BOUCLE SUR UN DIV
$.get("http://localhost:8080/API/les4avis", (retour)=>{
    for (let i=1; i<retour.length; i++){
        $("#Avis1").html( "pseudo: " + retour[0].pseudo + " commentaire: " + retour[0].description + " note: " + retour[0].note);
        $("#Avis2").html( "pseudo: " + retour[1].pseudo + " commentaire: " + retour[1].description + " note: " + retour[1].note);
        $("#Avis3").html( "pseudo: " + retour[2].pseudo + " commentaire: " + retour[2].description + " note: " + retour[2].note);
        $("#Avis4").html( "pseudo: " + retour[3].pseudo + " commentaire: " + retour[3].description + " note: " + retour[3].note);
    }
});









