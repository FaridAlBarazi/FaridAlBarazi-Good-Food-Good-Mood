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


$("#profilNom").html("Bonjour " + getCookie("pseudo") + " !");

$.ajax({
    type: "GET",
    url: 'http://localhost:8080/API/nbrRecettes',
    success: (retour) => {
        $("#nbrRecettePublie").html("Nombre de recettes publiées : " + retour);
    }
})

$.ajax({
    type: "GET",
    url: 'http://localhost:8080/API/nbrAvis',
    success: (retour) => {
        $("#nbrAvisPoste").html("Nombre d'avis publiés : " + retour);
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

//console.log(getInfoRecette(633754));
function getFavorisRecette() {
    $.ajax({
        type: "GET",
        url: 'http://localhost:8080/API/getfavoris',
        success: (retour) => {
            afficherFavroisRecette(retour)
        }
    })
}

function removeFavoris(remove) {
    console.log(remove);
}

function afficherFavroisRecette(listFavoris) {
    console.log(listFavoris)
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
                    $(document.createElement('button')).prop({
                        id: ("remove" + i),
                        class: "btn btn-primary",
                        value: "Retirer des favoris"
                    }).click(() => {
                        console.log()
                        $.ajax({
                            type:"PATCH",
                            url:"http://localhost:8080/API/removeFavorisID",
                            data: JSON.stringify(i),
                            headers: {"Content-Type":"application/json"},
                            success: (retour)=> {console.log(retour);}
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
            }
        }
    })
}

getnbrFavorisRecette();