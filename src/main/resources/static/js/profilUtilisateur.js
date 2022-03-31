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

(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.0";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));