$(document).ready(function () {

    for (let i = 1; i < 5; i++) {
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

        let sel = $('<select>').appendTo($("#divIngredient"));
        $(arr).each(function() {
            sel.append($("<option>").attr('value',this.val).text(this.text));
        });

    }
});

let nombre = 4;
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

    let sel = $('<select>').appendTo($("#divIngredient"));
    $(arr).each(function() {
        sel.append($("<option>").attr('value',this.val).text(this.text));
    });

})