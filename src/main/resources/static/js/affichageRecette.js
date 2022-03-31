//const apiKey = "462bcfeb80784d16aca500b08f087c0d";
const apiKey = "c764f8af433b4b9093ecfed23493b886";
//const apiKey = "0507b7d2299e4aea88421cfa97388b0e";
//const apiKey = "4bc3a5e0a85742e09b08d3f0fce9a84e";
function getInfoRecette(id){
    $.ajax({
        type: "GET",
        url: 'https://api.spoonacular.com/recipes/' + id + '/information?includeNutrition=false&apiKey=' + apiKey,
        success: (data) => {
            console.log(data);
            $("#titre").html(data.title);
            $("#image").attr("src", data.image);
            $("#dureeCuisson").html(data.readyInMinutes + " minutes");
            for(let i = 0; i < data.cuisines.length; i++){
                $("#cuisine").append('<li>' + data.cuisines[i] + '</li>');
            }
            $("#healthy").html(data.veryHealthy);
            $("#instruction").html(data.instructions);
            for(let i = 0; i < data.extendedIngredients.length; i++){
                $("#listeIngredient").append('<li>' + data.extendedIngredients[i].original + '</li>')
            }
        }
    })
}

getInfoRecette(new URL(location.href).searchParams.get('id'));

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

const whiteHeart = '\u2661';
const blackHeart = '\u2665';

$("#buttonCoeur").click(()=>{
    const like = buttonCoeur.textContent;
    if(like==whiteHeart) {
        buttonCoeur.textContent = blackHeart;
        let recetteFavoris = {
            idRecetteAPI : new URL(location.href).searchParams.get('id'),
            nomRecette: $("#titre").html(),
            urlImage :  $("#image").prop('src'),
            specialite: $("#cuisine").html()
        }
        console.log(recetteFavoris)
        $.ajax({
            type:"PATCH",
            url:"http://localhost:8080/API/addFavoris",
            data: JSON.stringify(recetteFavoris),
            headers: {"Content-Type":"application/json"},
            success: (retour)=> {console.log(retour);}
        });
    } else {
        buttonCoeur.textContent = whiteHeart;
        $.ajax({
            type:"PATCH",
            url:"http://localhost:8080/API/removeFavoris",
            data: JSON.stringify(new URL(location.href).searchParams.get('id')),
            headers: {"Content-Type":"application/json"},
            success: (retour)=> {console.log(retour);}
        });
    }
})