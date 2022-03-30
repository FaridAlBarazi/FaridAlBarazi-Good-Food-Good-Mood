$(document).ready(function () {
    for (let i = 1; i < 3; i++) {
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

    }
});

let nombre = 2;
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

})

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

    /*let ingredient = [
        {
            nom: "tomate",
            unit: "aucune",
            quantite: 2
        },
        {
            nom: "lait",
            unit: "ml",
            quantite: 500
        }
    ]

    let recette = {
        name: "a",
        duree: 1,
        preparation: "a aa a",
        specialite: "a",
        ingredients : ingredient
    };*/


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