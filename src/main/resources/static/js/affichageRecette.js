function saveRecette(recette){
    //console.log(recette)
    $.ajax({
        type: "PATCH",
        url: 'http://localhost:8080/API/recuperationRecetteUser',
        data: JSON.stringify(recette),
        headers: {"Content-Type": "application/json"},
        success: (data) => {
            getnbrAvis();
        }
    })
}


function getInfoRecette(id, source) {
    if (source == "utilisateur") {
        //console.log("ici")
        $.ajax({
            type: "GET",
            url: 'http://localhost:8080/API/getRecette/' + id,
            success: (data) => {
                //console.log(data);
                $("#titre").html(data.name);
                $("#image").attr("src", data.image);
                $("#dureeCuisson").html(data.duree + " minutes");
                $("#cuisine").append('<li>' + data.specialite + '</li>');
                $("#instruction").html(data.preparation);
                for (let i = 0; i < data.ingredients.length; i++) {
                    $("#listeIngredient").append(
                        '<li>' + data.ingredients[i].nom + ' : ' + data.ingredients[i].quantite + ' ' + data.ingredients[i].unit + '</li>'
                    )
                }
                getnbrAvis();
            }
        })
    } else {
        $.ajax({
            type: "GET",
            url: 'https://api.spoonacular.com/recipes/' + id + '/information?includeNutrition=false&apiKey=' + gestionCookiesAndApiKey,
            success: (data) => {
                //console.log(data);
                $("#titre").html(data.title);
                $("#image").attr("src", data.image);
                $("#dureeCuisson").html(data.readyInMinutes + " minutes");
                for (let i = 0; i < data.cuisines.length; i++) {
                    $("#cuisine").append('<li>' + data.cuisines[i] + '</li>');
                }
                $("#healthy").html(data.veryHealthy);
                $("#instruction").html(data.instructions);

                let ingre = [];
                for (let i = 0; i < data.extendedIngredients.length; i++) {
                    $("#listeIngredient").append('<li>' + data.extendedIngredients[i].original + '</li>');
                    let ing = {
                        nom:data.extendedIngredients[i].originalName,
                        unit: data.extendedIngredients[i].unit,
                        quantite:data.extendedIngredients[i].amount
                    }
                    ingre.push(ing);
                }

                let recette = {
                    name:data.title,
                    duree: parseInt(data.readyInMinutes),
                    preparation : data.instructions,
                    specialite: data.cuisines[0],
                    ingredients: ingre,
                    image: data.image,
                    source:"api",
                    idApiRecette : parseInt(data.id)
                }
                saveRecette(recette);
            }
        })
    }

}

getInfoRecette(new URL(location.href).searchParams.get('id'), new URL(location.href).searchParams.get('source'));

//console.log(new URL(location.href).searchParams.get('source'))


const whiteHeart = '\u2661';
const blackHeart = '\u2665';

$("#buttonCoeur").click(() => {
    const like = buttonCoeur.textContent;
    if (like == whiteHeart) {
        buttonCoeur.textContent = blackHeart;
        let recetteFavoris = {
            idRecetteAPI: new URL(location.href).searchParams.get('id'),
            nomRecette: $("#titre").html(),
            urlImage: $("#image").prop('src'),
            specialite: $("#cuisine").html(),
            source : new URL(location.href).searchParams.get('source')

        }
        console.log(recetteFavoris)
        $.ajax({
            type: "PATCH",
            url: "http://localhost:8080/API/addFavoris",
            data: JSON.stringify(recetteFavoris),
            headers: {"Content-Type": "application/json"},
            success: (retour) => {
                console.log(retour);
            }
        });
    } else {
        buttonCoeur.textContent = whiteHeart;
        $.ajax({
            type: "PATCH",
            url: "http://localhost:8080/API/removeFavoris",
            data: JSON.stringify(new URL(location.href).searchParams.get('id')),
            headers: {"Content-Type": "application/json"},
            success: (retour) => {
                console.log(retour);
            }
        });
    }
})


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


$("#envoyerAvis").click(() => {
    let obj = {};
    obj.pseudo = getCookie("pseudo");
    obj.idRecette = new URL(location.href).searchParams.get('id');
    obj.date = $("#date").val();
    obj.description = $("#exempleCommentaire").val();
    obj.note = $("#note").val();

    $.ajax({
        type: "PATCH",
        url: "http://localhost:8080/API/avisRecettePoste",
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

// Afficher avis
function getAvis() {
    let id = new URL(location.href).searchParams.get('id');
    $.ajax({
        type: "GET",
        url: 'http://localhost:8080/API/getAllAvisRecette/' + id,
        success: (mesAvis) => {
            console.log(mesAvis);
            for (let i = 0; i < mesAvis.length; i++) {
                $("#avisRecette").append(
                    // Ajouter div dans le affichageAvis
                    $(document.createElement('div')).prop({
                        class: "avis"
                    }).append(
                        // Ajouter li dans le div
                        $(document.createElement('p')).prop({
                            class: "stylePseudo"
                        }).html(mesAvis[i].pseudo),
                        $(document.createElement('p')).prop({
                            class: "styleDate"
                        }).html("Date :" + mesAvis[i].date),
                        $(document.createElement('p')).append(
                            $(document.createElement('i')).prop({
                                class: "las la-star",
                                id: "star1" + i
                            }),
                            $(document.createElement('i')).prop({
                                class: "las la-star",
                                id: "star2" + i
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

                        $(document.createElement('p')).html(mesAvis[i].description),
                    )
                )


                //console.log(retour[i].note)
                for (let j = 1; j <= mesAvis[i].note; j++) {
                    //console.log("star"+j);
                    $("#star" + j + i).css("color", "orange");
                }
            }
        }
    })
}

function getnbrAvis() {
    let id = new URL(location.href).searchParams.get('id');
    console.log(JSON.stringify(id));
    $.ajax({
        type: "GET",
        url: 'http://localhost:8080/API/getNbrAvisRecette/' + id,
        //data:JSON.stringify(id),
        //headers: {"Content-Type": "application/json"},
        success: (retour) => {
            console.log(retour)
            if (retour > 0) {
                $("#nbrAvis").html(retour + " commentaire(s)");
                getAvis();
            }else{
                $("#nbrAvis").html("0 commentaire");
                $("#avisRecette").css("height", "15px");
            }
        }
    })
}





