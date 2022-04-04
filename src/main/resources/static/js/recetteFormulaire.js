// select pour les specialité
let spec = [
    {val: "African", text: 'African'},
    {val: "American", text: 'American'},
    {val: "British", text: 'British'},
    {val: "Cajun", text: 'Cajun'},
    {val: "Caribbean", text: 'Caribbean'},
    {val: "Chinese", text: 'Chinese'},
    {val: "Eastern European", text: 'Eastern European'},
    {val: "European", text: 'European'},
    {val: "French", text: 'French'},
    {val: "German", text: 'German'},
    {val: "Greek", text: 'Greek'},
    {val: "Indian", text: 'Indian'},
    {val: "Irish", text: 'Irish'},
    {val: "Italian", text: 'Italian'},
    {val: "Japanese", text: 'Japanese'},
    {val: "Jewish", text: 'Jewish'},
    {val: "Korean", text: 'Korean'},
    {val: "Latin", text: 'Latin'},
    {val: "American Mediterranean", text: 'American Mediterranean'},
    {val: "Mexican", text: 'Mexican'},
    {val: "Middle Eastern", text: 'Middle Eastern'},
    {val: "Nordic", text: 'Nordic'},
    {val: "Southern", text: 'Southern'},
    {val: "Spanish", text: 'Spanish'},
    {val: "Thai", text: 'Thai'},
    {val: "Vietnamese", text: 'Vietnamese'}

];

let selec = $("<select id='selectspecialite'>").appendTo($("#specialiteRecette"));
$(spec).each(function () {
    selec.append($("<option>").attr('value', this.val).text(this.text));
});

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
            {val: "gramme", text: 'gramme'},
            {val: "litre", text: 'litre'},
            {val: "millilitre", text: 'millilitre'},
            {val: "cuillère à soupe", text: 'cuillère à soupe'},
            {val: "cuillère à café", text: 'cuillère à café'}
        ];
        let sel = $("<select id='selectUnit" + i + "'>").appendTo($("#divIngredient"));
        $(arr).each(function () {
            sel.append($("<option>").attr('value', this.val).text(this.text));
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
        {val: "gramme", text: 'gramme'},
        {val: "litre", text: 'litre'},
        {val: "millilitre", text: 'millilitre'},
        {val: "cuillère à soupe", text: 'cuillère à soupe'},
        {val: "cuillère à café", text: 'cuillère à café'}
    ];

    let sel = $("<select id='selectUnit" + nombre + "'>").appendTo($("#divIngredient"));
    $(arr).each(function () {
        sel.append($("<option>").attr('value', this.val).text(this.text));
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
    if (nombre > nbrChamp) {
        $("#ingredient" + nombre).remove();
        $("#quantite" + nombre).remove();
        $("#selectUnit" + nombre).remove();
        $("#br" + nombre).remove();
        nombre--;
    }
})

// Enregistrement en base de la recette
$("#envoieRecette").click(() => {
    rechercheimage($("#nomRecette").val());
});

function rechercheimage(recetteName) {
    $.ajax({
        type: "GET",
        headers: {"Content-Type": "application/json"},
        url: "https://api.spoonacular.com/recipes/complexSearch?apiKey=" + gestionCookiesAndApiKey + "&query=" + recetteName,
        data: JSON.stringify(recette),
        success: (retour) => {
            if (retour.results.length > 0) {
                console.log(retour);
                console.log(retour.results[0].image);
                enregistrerRecette(retour.results[0].image);
            } else {
                enregistrerRecette("NULL");
            }

        }
    });
}


function enregistrerRecette(image) {
    console.log("image url : " + image);
    let ingredient = [];
    for (let i = 1; i <= nombre; i++) {
        let ingr =
            {
                nom: $("#ingredient" + i).val().toLowerCase(),
                unit: $('#selectUnit' + i).find(":selected").text(),
                quantite: $("#quantite" + i).val()
            }
        ingredient.push(ingr);
    }

    let recette = {};
    recette.name = $("#nomRecette").val();
    recette.duree = $("#dureRecette").val();
    recette.preparation = $("#floating-Textarea").val();
    recette.specialite = $("#selectspecialite").find(":selected").text()
    recette.ingredients = ingredient;
    recette.source = "utilisateur";
    if (image != "NULL") {
        recette.image = image;
    }
    console.log(JSON.stringify(recette));
    $.ajax({
        type: "PATCH",
        headers: {"Content-Type": "application/json"},
        url: "http://localhost:8080/API/recuperationRecetteUser",
        data: JSON.stringify(recette),
        success: (retour) => {
            alert(retour);
        }
    });
}