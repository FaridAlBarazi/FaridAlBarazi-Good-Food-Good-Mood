// Récupération du cookie
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


$("#profilNom").html("Bonjour " + getCookie("pseudo") + " 😃!");

$.ajax({
    type: "GET",
    url: 'http://localhost:8080/API/nbrRecettesUser',
    success: (retour) => {
        if(retour == 0){
            $("#nbrRecettePublie").html("Vous n'avez publié aucune recette 🙁 ");
        }

    }
})

$.ajax({
    type: "GET",
    url: 'http://localhost:8080/API/nbrAvisUser',
    success: (retour) => {
        if(retour == 0){
            $("#nbrAvisPoste").html("Vous n'avez posté aucun avis 🙁 ");
        }
    }
})


$("#color").attr("stroke", "red");


//const apiKey = "462bcfeb80784d16aca500b08f087c0d";
const apiKey = "c764f8af433b4b9093ecfed23493b886";
//const apiKey = "0507b7d2299e4aea88421cfa97388b0e";
//const apiKey = "4bc3a5e0a85742e09b08d3f0fce9a84e";

let nbr = 0

function getInfoRecette(id) {
    $.ajax({
        type: "GET",
        url: 'https://api.spoonacular.com/recipes/' + id + '/information?includeNutrition=false&apiKey=' + apiKey,
        success: (data) => {
            console.log(data);
            $("#carouselDiv").append(
                $(document.createElement('div')).prop({
                    id: ('favoris' + nbr),
                    class: "carousel-item active"
                }).append(
                    $(document.createElement('img')).prop({
                        class: "class=\"d-block w-100",
                        src: data.image
                    })
                )
            )
            nbr++;
        }
    })


}


// RECETTES FAVORIS
function getFavorisRecette() {
    $.ajax({
        type: "GET",
        url: 'http://localhost:8080/API/getfavoris',
        success: (retour) => {
            afficherFavroisRecette(retour)
        }
    })
}

function afficherFavroisRecette(listFavoris) {
    //console.log(listFavoris);
    for (let i = 0; i < listFavoris.length; i++) {
        $("#cardFavoris").append(
            $(document.createElement('div')).prop({
                class: "card favoris",
            }).append(
                $(document.createElement('img')).prop({
                    class: "card-img-top",
                    src: listFavoris[i].urlImage
                }),

                $(document.createElement('div')).prop({
                    class: "card-body"
                }).append(
                    $(document.createElement('h5')).prop({
                        class: "card-title"
                    }).html(listFavoris[i].nomRecette),
                    $(document.createElement('input')).prop({
                        id: ("remove" + i),
                        class: "btn btn-primary",
                        value: "Retirer des favoris"
                    }).click(() => {
                        console.log(i)
                        $.ajax({
                            type: "PATCH",
                            url: "http://localhost:8080/API/removeFavoris",
                            data: JSON.stringify(listFavoris[i].idRecetteAPI),
                            headers: {"Content-Type": "application/json"},
                            success: (retour) => {
                                location.reload();
                            }
                        });
                    }),
                    $(document.createElement('input')).prop({
                        id: ("recette" + i),
                        class: "btn btn-primary",
                        value: "Voir la recette"
                    }).click(() => {
                        console.log()
                        $.ajax({
                            type: "PATCH",
                            url: "http://localhost:8080/API/removeFavorisID",
                            data: JSON.stringify(i),
                            headers: {"Content-Type": "application/json"},
                            success: (retour) => {
                                //console.log(retour);
                            }
                        });
                    })
                )
            )
        )
    }

}

function getnbrFavorisRecette() {
    $.ajax({
        type: "GET",
        url: 'http://localhost:8080/API/nbrFavoris',
        success: (retour) => {
            if (retour > 0) {
                getFavorisRecette();
            } else {
                $("#cardFavoris").css("display", "none");
                $("#aucuneRecette").css("display", "block");
            }
        }
    })
}

getnbrFavorisRecette();

// RECETTES PUBLIEES
function getRecettePubliee() {
    $.ajax({
        type: "GET",
        url: 'http://localhost:8080/API/allRecettesPubliees',
        success: (retour) => {
            //console.log(retour);
            afficherRecettePubliee(retour);
        }
    })
}

function afficherRecettePubliee(listRecette) {
    console.log(listRecette);
    for (let i = 0; i < listRecette.length; i++) {
        $("#affichageRecettePubliee").append(
            $(document.createElement('div')).prop({
                class: "card recette",
            }).append(
                $(document.createElement('img')).prop({
                    class: "card-img-top",
                    src: listRecette[i].image
                }),

                $(document.createElement('div')).prop({
                    class: "card-body"
                }).append(
                    $(document.createElement('h5')).prop({
                        class: "card-title"
                    }).html(listRecette[i].name),
                    $(document.createElement('input')).prop({
                        id: ("removeRecette" + i),
                        class: "btn btn-primary",
                        value: "Supprimer la recette"
                    }).click(() => {
                        console.log(i)
                        $.ajax({
                            type: "PATCH",
                            url: "http://localhost:8080/API/removeRecettePublie",
                            data: JSON.stringify(listRecette[i].id),
                            headers: {"Content-Type": "application/json"},
                            success: (retour) => {
                                location.reload();
                            }
                        });
                    }),
                    $(document.createElement('input')).prop({
                        id: ("recettePubliee" + i),
                        class: "btn btn-primary",
                        value: "Voir la recette"
                    }).click(() => {
                        console.log()
                        $.ajax({
                            type: "GET",
                            url: "http://localhost:8080/API/removeFavorisID",
                            headers: {"Content-Type": "application/json"},
                            success: (retour) => {
                                //console.log(retour);
                            }
                        });
                    })
                )
            )
        )
    }

}

function getnbrRecettePubliee() {
    $.ajax({
        type: "GET",
        url: 'http://localhost:8080/API/nbrRecettesUser',
        success: (retour) => {
            //console.log(retour)
            if (retour > 0) {
                getRecettePubliee();
            }
        }
    })
}

getnbrRecettePubliee();


// AVIS
function getAvis() {
    $.ajax({
        type: "GET",
        url: 'http://localhost:8080/API/allAvisUser',
        success: (retour) => {
            console.log(retour);
            afficherAvis(retour);
        }
    })
}


function afficherAvis(mesAvis) {
    console.log(mesAvis);
    for (let i = 0; i < mesAvis.length; i++) {
        $("#avisPoste").append(
            // Ajouter div dans le affichageAvis
            $(document.createElement('div')).prop({
                class: "avisPublie"
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
                        id: "myStar1" +i
                    }),
                    $(document.createElement('i')).prop({
                        class: "las la-star",
                        id: "myStar2" +i
                    }),
                    $(document.createElement('i')).prop({
                        class: "las la-star",
                        id: "myStar3" + i
                    }),
                    $(document.createElement('i')).prop({
                        class: "las la-star",
                        id: "myStar4" + i
                    }),
                    $(document.createElement('i')).prop({
                        class: "las la-star",
                        id: "myStar5" + i
                    })
                ),

                $(document.createElement('p')).html(mesAvis[i].description),
                $(document.createElement('input')).prop({
                    id: ("avisPoste" + i),
                    class: "btn btn-primary",
                    value: "Supprimer cet avis"
                }).click(() => {
                    $.ajax({
                        type: "PATCH",
                        url: "http://localhost:8080/API/removeAvis",
                        data: JSON.stringify(mesAvis[i].id),
                        headers: {"Content-Type": "application/json"},
                        success: (retour) => {
                            location.reload();
                        }
                    });
                }),
                $(document.createElement('br'))


            )
        )
        //console.log(retour[i].note)
        for(let j=1; j <= mesAvis[i].note; j++){
            console.log("myStar"+j+i);
            $("#myStar" +j +i).css("color", "orange");
        }
    }

}


function getnbrAvis() {
    $.ajax({
        type: "GET",
        url: 'http://localhost:8080/API/nbrAvisUser',
        success: (retour) => {
            console.log(retour)
            if (retour > 0) {
                getAvis();
            }
        }
    })
}

getnbrAvis();

function getAllAvisRecetteUser() {
    $.ajax({
        type: "GET",
        url: 'http://localhost:8080/API/allAvisRecetteUser',
        success: (retour) => {
            console.log(retour);
            afficherAllAvisRecetteUser(retour);
        }
    })
}


function afficherAllAvisRecetteUser(mesAvis) {
    console.log(mesAvis);
    for (let i = 0; i < mesAvis.length; i++) {
        $("#avisPoste").append(
            // Ajouter div dans le affichageAvis
            $(document.createElement('div')).prop({
                class: "avisPublie"
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
                        id: "myStar1" +i
                    }),
                    $(document.createElement('i')).prop({
                        class: "las la-star",
                        id: "myStar2" +i
                    }),
                    $(document.createElement('i')).prop({
                        class: "las la-star",
                        id: "myStar3" + i
                    }),
                    $(document.createElement('i')).prop({
                        class: "las la-star",
                        id: "myStar4" + i
                    }),
                    $(document.createElement('i')).prop({
                        class: "las la-star",
                        id: "myStar5" + i
                    })
                ),

                $(document.createElement('p')).html(mesAvis[i].description),
                $(document.createElement('input')).prop({
                    id: ("avisPoste" + i),
                    class: "btn btn-primary",
                    value: "Supprimer cet avis"
                }).click(() => {
                    $.ajax({
                        type: "PATCH",
                        url: "http://localhost:8080/API/removeAvisRecetteUser",
                        data: JSON.stringify(mesAvis[i].id),
                        headers: {"Content-Type": "application/json"},
                        success: (retour) => {
                            location.reload();
                        }
                    });
                }),
                $(document.createElement('br'))


            )
        )
        //console.log(retour[i].note)
        for(let j=1; j <= mesAvis[i].note; j++){
            console.log("myStar"+j+i);
            $("#myStar" +j +i).css("color", "orange");
        }
    }

}

function getnbrAvisRecette() {
    $.ajax({
        type: "GET",
        url: 'http://localhost:8080/API/nbrAvisRecetteUser',
        success: (retour) => {
            console.log(retour)
            if (retour > 0) {
                getAllAvisRecetteUser();
            }else{
                $("#nbrAvisPoste").html("Vous n'avez posté aucun avis recette🙁 ");
                $("#nbrAvisPoste").css("padding", "4%");
            }
        }
    })
}

$("#selectAvis").change(()=>{
    console.log($("#selectAvis").val())
    $("#avisPoste").empty()
    if($("#selectAvis").val() == "Avis du site"){
        getnbrAvis();
    }else{
        getnbrAvisRecette();
    }
})