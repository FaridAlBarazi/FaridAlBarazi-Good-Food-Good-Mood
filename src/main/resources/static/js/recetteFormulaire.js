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


// On définit le nombre de champs
let nbrChamp = 2;

// Au chargement de la page on veut afficher 2 champs de 3 inputs
$(document).ready(function () {
    for (let i = 1; i < nbrChamp + 1; i++) {
        $('#divIngredient').append(
            $(document.createElement('input')).prop({
                type: 'text',
                id: ('ingredient' + i),
                placeholder: ('Ingredient ' + i)
            })
        )

        $('#divIngredient').append(
            $(document.createElement('input')).prop({
                type: 'text',
                id: ('quantite' + i),
                placeholder: "Quantité"
            })
        )

        let arr = [
            {val : "gramme", text: 'gramme'},
            {val : "litre", text: 'litre'},
            {val : "millilitre", text: 'millilitre'},
            {val : "cuillère à soupe", text: 'cuillère à soupe'},
            {val : "cuillère à café", text: 'cuillère à café'}
        ];
        let sel = $("<select id='selectUnit" +i + "'>").appendTo($("#divIngredient"));
        $(arr).each(function() {
            sel.append($("<option>").attr('value',this.val).text(this.text));
        });

        $('#divIngredient').append(
            $(document.createElement('br')).prop({
                id: ('br' + i),
            })
        );

    }
});

// nombre de champs en cours
let nombre = nbrChamp;

// Ajout d'un champs de 3 inputs
$("#buttonPlus").click(() => {
    nombre++;
    $('#divIngredient').append(
        $(document.createElement('input')).prop({
            type: 'text',
            id: ('ingredient' + nombre),
            placeholder: ('Ingredient ' + nombre)
        })
    )

    $('#divIngredient').append(
        $(document.createElement('input')).prop({
            type: 'text',
            id: ('quantite' + nombre),
            placeholder: "Quantité"
        })
    )

    let arr = [
        {val : "gramme", text: 'gramme'},
        {val : "litre", text: 'litre'},
        {val : "millilitre", text: 'millilitre'},
        {val : "cuillère à soupe", text: 'cuillère à soupe'},
        {val : "cuillère à café", text: 'cuillère à café'}
    ];

    let sel = $("<select id='selectUnit" + nombre + "'>").appendTo($("#divIngredient"));
    $(arr).each(function() {
        sel.append($("<option>").attr('value',this.val).text(this.text));
    });

    $('#divIngredient').append(
        $(document.createElement('br')).prop({
            id: ('br' + nombre),
        })
    );

})

// Suppression d'un champs de 3 inputs
$("#buttonMoins").click(() => {
    // On ne veut pas enlever le nombre de champs pré-défini au début
    if(nombre > nbrChamp){
        $("#ingredient" + nombre).remove();
        $("#quantite" + nombre).remove();
        $("#selectUnit" + nombre).remove();
        $("#br" + nombre).remove();
        nombre--;
    }
})

// Enregistrement en base de la recette
$("#envoieRecette").click(() => {
let ingredient = [];
    for(let i=1; i <= nombre;i++){
        let ingr =
        {
            nom: $("#ingredient" + i).val(),
            unit : $('#selectUnit'+i).find(":selected").text(),
            quantite : $("#quantite" + i).val()
        }
        ingredient.push(ingr);
    }

    let recette = {};
    recette.name=$("#nomRecette").val();
    recette.duree=$("#dureRecette").val();
    recette.preparation=$("#floating-Textarea").val();
    recette.specialite=$("#specialiteRecette").val();
    recette.ingredients = ingredient;
    console.log(JSON.stringify(recette));
    $.ajax({
        type: "POST",
        headers: {"Content-Type": "application/json"},
        url: "http://localhost:8080/API/recuperationRecette",
        data: JSON.stringify(recette),
        success: (retour) => {
            alert(retour);
        }
    });
});