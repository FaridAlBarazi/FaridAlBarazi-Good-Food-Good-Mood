//------------------------Clé API ----------------------
//const gestionCookiesAndApiKey = "462bcfeb80784d16aca500b08f087c0d";
//const gestionCookiesAndApiKey = "c764f8af433b4b9093ecfed23493b886";
//const gestionCookiesAndApiKey = "0507b7d2299e4aea88421cfa97388b0e";
//const gestionCookiesAndApiKey = "4bc3a5e0a85742e09b08d3f0fce9a84e";
//const gestionCookiesAndApiKey = "e259759e2eff4a1f91671009d2d9f1f3";
const gestionCookiesAndApiKey = "46af063a8da04c10968886eacf0cd925"
// CLE PRESENTATION
//const gestionCookiesAndApiKey = "17a8bba3d8b040bc9504e4799a313ebc"

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
    $("#recetteRecherche").css("display", "none");
    $("#appRecipe").css("display", "none");
    $("#boutonAvis").css("display", "none");
} else {
    $("#connexionButton").css("display", "none");
    $("#dropdown").css("display", "block");
    $("#pseudo").html(getCookie("pseudo"));
    $("#recette").css("display", "block");
    $("#boutonAvis").css("display", "block");
    $("#recetteRecherche").css("display", "block");
    $("#appRecipe").css("display", "block");
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
        $("#recetteRecherche").css("display", "none");
        $("#appRecipe").css("display", "none");
        document.location.href = "index.html";
    })
})