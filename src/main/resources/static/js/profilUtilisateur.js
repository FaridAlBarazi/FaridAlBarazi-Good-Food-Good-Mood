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
    url: 'http://localhost:8080/API/nbrRecettes',
    success: (retour) => {
        if(retour > 0){
            $("#nbrRecettePublie").html("Nombre de recettes publiées : " + retour);
        }else{
            $("#nbrRecettePublie").html("Vous n'avez publié aucune recette 🙁 ");
        }

    }
})

$.ajax({
    type: "GET",
    url: 'http://localhost:8080/API/nbrAvisUser',
    success: (retour) => {
        if(retour > 0){
            $("#nbrAvisPoste").html("Nombre d'avis publiés : " + retour);
        }else{
            $("#nbrAvisPoste").html("Vous n'avez posté aucun avis 🙁 ");
        }
    }
})

$("#color").attr("stroke", "red");

(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.0";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


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
    console.log(listFavoris);
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
                                console.log(retour);
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

let activities = document.getElementById("activitySelector");


activities.addEventListener("change", function() {
    console.log(activities.value)
});

function getAvis() {
    $.ajax({
        type: "GET",
        url: 'http://localhost:8080/API/nbrAvisUser',
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

                        $(document.createElement('input')).prop({
                            id: "suppAvis",
                            class: "btn btn-primary",
                            value: "Supprimer avis"
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
                        })
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