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
            location.reload();

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












