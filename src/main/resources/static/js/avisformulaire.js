// SYSTEME DE NOTATION ETOILES

// On va chercher toutes les étoiles
const stars = document.querySelectorAll(".la-star");
// on va chercher l'input
const note = document.querySelector("#note");

// on boucle sur les etoiles pour leur ajouter des ecouteurs d'évenements
for (star of stars) {
    // le survol

    star.addEventListener("mouseover", function () {
        resetStars();
        this.style.color = "orange";

        // Element précédent de même niveau
        let previousStar = this.previousElementSibling;
        while (previousStar) {
            // on passe l'étoile qui précéde en rouge
            previousStar.style.color = "orange";
            // on récupère l'étoile qui la précède
            previousStar = previousStar.previousElementSibling;
        }
    });
    // quand on clique sur l'étoile on veut récupérer la note

    star.addEventListener("click", function () {
        note.value = this.dataset.value;
    });

    // quand on enleve la sourisca reste sur la note qu'on a mit

    star.addEventListener("mouseout", function () {
        // va repasser toutes les étoiles en noires jusqu'à atteindre la note correspondant au champ note
        resetStars(note.value);
    });
}


function resetStars(note = 0) {
    // boucle sur chaque étoile, va remettre directement les etoiles en noires ou en orange
    for (star of stars) {
        if (star.dataset.value > note) {
            star.style.color = "black";
        } else {
            star.style.color = "orange";
        }
    }
}

let obj = {pseudo: "hanna84", date: "12/12/2021", description: "la recette est super facile à réaliser"};

$("#monBouton").click(() => {
    obj.pseudo = getCookie("pseudo");
    obj.date = $("#date").val();
    obj.description = $("#exempleCommentaire").val();
    obj.note = $("#note").val();


    $.ajax({
        type: "PATCH",
        url: "http://localhost:8080/API/recuperationAvisUser",
        data: JSON.stringify(obj),
        headers: {"Content-Type": "application/json"},
        success: (retour) => {
            console.log(retour);
            $("#alertSucces").css("display", "block");
            setTimeout(()=>{
                $("#alertSucces").css("display", "none");
                location.reload();
            },3000)


        }
    });

// affichage de l'avis en cours
    $("#monAvis").html("date: " + obj.date + "commentaire : " + obj.description + " note:  " + obj.note);


});

//suppresion de l'avis

function getAvis() {
    $.ajax({
        type: "GET",
        url: 'http://localhost:8080/API/getAllAvis',
        success: (retour) => {
            console.log(retour);
            afficherAvis(retour);
        }
    })
}


function afficherAvis(mesAvis) {
    $.ajax({
        type: "GET",
        url: 'http://localhost:8080/API/les4avis',
        success: (retour) => {
            console.log(retour)
            for (let i = 0; i < retour.length; i++) {
                console.log(Date.parse(retour[i].date));
                console.log(Date.parse(new Date()));
                $("#affichageAvis").append(
                    // Ajouter div dans le affichageAvis
                    $(document.createElement('div')).prop({
                        class: "avis"
                    }).append(
                        // Ajouter li dans le div
                        $(document.createElement('p')).prop({
                            class: "stylePseudo"
                        }).html(retour[i].pseudo),
                        $(document.createElement('p')).prop({
                            class: "styleDate"
                        }).html("Date :" + retour[i].date),
                        $(document.createElement('p')).append(
                            $(document.createElement('i')).prop({
                                class: "las la-star",
                                id: "star1" +i
                            }),
                            $(document.createElement('i')).prop({
                                class: "las la-star",
                                id: "star2" +i
                            }),
                            $(document.createElement('i')).prop({
                                class: "las la-star",
                                id: "star3" + i
                            }),
                            $(document.createElement('i')).prop({
                                class: "las la-star",
                                id: "star4" + i
                            }),
                            $(document.createElement('i')).prop({
                                class: "las la-star",
                                id: "star5" + i
                            })
                        ),

                        $(document.createElement('p')).html(retour[i].description),

                    )
                )


                //console.log(retour[i].note)
                for(let j=1; j <= retour[i].note; j++){
                    //console.log("star"+j);
                    $("#star" +j +i).css("color", "orange");
                }
            }

        }
    });
}


function getnbrAvis() {
    $.ajax({
        type: "GET",
        url: 'http://localhost:8080/API/nbrAvis',
        success: (retour) => {
            console.log(retour)
            if (retour > 0) {
                getAvis();
            }
        }
    })
}

getnbrAvis();

$("#boutonVersSeConnecter").click(()=>{
    location.href = "index.html";
})

$("#boutonVersInscription").click(()=>{
    location.href = "index.html";
})

if (getCookie("pseudo") == null) {
    $("#verificationCookies").css("display", "flex");
    $("#divEcrireAvis").css("display", "none");
} else{
    $("#verificationCookies").css("display", "none");
}


//affichage des 4 avis les mieux notés en html
// BOUCLE SUR UN DIV
/*$.get("http://localhost:8080/API/les4avis", (retour) => {
    /*for (let i=0; i<retour.length; i++){
            $("#pseudoA").html(retour[i].pseudo);
            $("#dateA").html(retour[i].date );
            $("#commA").html(retour[i].description );
            $("#noteA").html(retour[i].note );
    };

    $("#pseudo1").html(retour[0].pseudo);
    $("#date1").html(retour[0].date);
    $("#comm1").html(retour[0].description);
    $("#note1").html(retour[0].note);
    $("#pseudo2").html(retour[1].pseudo);
    $("#date2").html(retour[1].date);
    $("#comm2").html(retour[1].description);
    $("#note2").html(retour[1].note);
    $("#pseudo3").html(retour[2].pseudo);
    $("#date3").html(retour[2].date);
    $("#comm3").html(retour[2].description);
    $("#note3").html(retour[2].note);
    $("#pseudo4").html(retour[3].pseudo);
    $("#date4").html(retour[3].date);
    $("#comm4").html(retour[3].description);
    $("#note4").html(retour[3].note);


});*/

/*if (getCookie("pseudo") == null) {
    $("#verificationCookies").css("display", "block");
    $("#divEcrireAvis").css("display", "none");
} else{
    $("#verificationCookies").css("display", "none");
    $("#divEcrireAvis").css("display", "block");
}

$("#boutonVersSeConnecter").click(() => {
    $("#popupConnexion").css("display", "block");
    $("#verificationCookies").css("display", "none");
    $("#connexionCompte").css("display", "block");
})

$("#boutonVersInscription").click(() => {
    $("#popupConnexion").css("display", "block");
    $("#verificationCookies").css("display", "none");
    $("#connexionCompte").css("display", "none");
    $("#createCompte").css("display", "block");
})

// Lorsqu'on clique sur le bouton connexion, faire apparaître le popup
$("#connexionButton").click(() => {
    $("#popupConnexion").css("display", "block")
})

// // Lorsqu'on clique sur le X, ça ferme le popup
$("#closePopupConnexion").click(() => {
    $("#popupConnexion").css("display", "none");
    $("#verificationCookies").css("display", "block");
})

$("#createUser").click(() => {
    $("#connexionCompte").css("display", "none");
    $("#createCompte").css("display", "block");
})

// // Lorsqu'on clique sur le X, ça ferme le popup
$("#closePopupCreationCompte").click(() => {
    $("#createCompte").css("display", "none");
    $("#verificationCookies").css("display", "block");
})

// quand on clique sur le bouton créer un compte
$("#boutonCreationCompte").click(() => {
    if (!document.getElementById('passwordCreation').validity.valid) {
        $("#errorPassword").css("display", "block");
    } else if (!document.getElementById('pseudoCreation').validity.valid) {
        $("#errorPseudo").css("display", "block");
    } else if (!document.getElementById('mailCreation').validity.valid) {
        $("#errorMail").css("display", "block");
    } else {
        let utilisateur = {
            pseudo: $("#pseudoCreation").val(),
            mail: $("#mailCreation").val(),
            password: $("#passwordCreation").val(),
            allergie: [],
        }
        console.log(utilisateur)
        $.ajax({
            type: "POST",
            headers: {"Content-Type": "application/json"},
            url: "http://localhost:8080/API/inscription",
            data: JSON.stringify(utilisateur),
            success: function (resultat) {
                console.log("ici success");
                $("#createCompte").css("display", "none");
                $("#allergies").css("display", "block");
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log("ici error");
                $("#errorCreationCompte").html("Un compte est déjà associé à cet e-mail");
                $("#redirectionConnexion").css("display", "block");
            }
        })
    }
})

$("#forgotPassword").click(() => {
    $("#mdpOublie").css("display", "block");
    $("#connexionCompte").css("display", "none");
})

$("#closePopupMdpOublie").click(() => {
    $("#mdpOublie").css("display", "none");
})

$("#boutonReinitialisation").click(() => {
    let update = [$("#mail").val(),
        $("#passwordUpdate").val()]
    $.ajax({
        type: "PATCH",
        headers: {"Content-Type": "application/json"},
        url: "http://localhost:8080/API/updatePassword",
        data: JSON.stringify(update),
        success: function (resultat) {
            $("#validation").html("Votre mot de passe a bien été modifié");
            $("#validation").css("color", "green");
        },
        error: function (xhr, textStatus) {
            console.log(xhr.status);
            $("#errorMailUpdatePassword").html("Aucun compte à ce nom existe");

        }
    })
})
$("#redirectionConnexion").click(() => {
    $("#createCompte").css("display", "none");
    $("#connexionCompte").css("display", "block");
})

$("#boutonSeConnecter").click(() => {
    let utilisateur = {
        mail: $("#pseudoConnexion").val(),
        password: $("#passwordConnexion").val()
    }
    $.ajax({
        type: "POST",
        headers: {"Content-Type": "application/json"},
        url: "http://localhost:8080/API/connexion",
        data: JSON.stringify(utilisateur),
        success: function (resultat) {
            console.log(getCookie("mail"));
            console.log(getCookie("pseudo"));
            //console.log(getCookie("vi"));
            $("#popupConnexion").css("display", "none");
            $("#dropdown").css("display", "block")
            $("#connexionButton").css("display", "none");
            $("#pseudo").html(getCookie("pseudo"));
            $("#recette").css("display", "block");
            $("#boutonAvis").css("display", "block");
        },
        error: function (xhr, textStatus) {
            console.log(xhr.status);
            if (xhr.status == 400) {
                $("#errorConnexion").html("Le mot de passe est incorrect");
            } else {
                $("#errorConnexion").html("Aucun compte à ce nom existe");
            }

        }
    })
})*/








