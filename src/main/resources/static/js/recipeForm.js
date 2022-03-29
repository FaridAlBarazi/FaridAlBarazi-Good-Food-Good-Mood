let survey_options = document.getElementById('survey_options');
let add_more_fields = document.getElementById('add_more_fields');
let remove_fields = document.getElementById('remove_fields');

$(document).ready(function () {
    let arr = [
        {val: "gramme", text: 'gramme'},
        {val: "litre", text: 'litre'},
        {val: "millilitre", text: 'millilitre'},
        {val: "cuillère à soupe", text: 'cuillère à soupe'},
        {val: "cuillère à café", text: 'cuillère à café'}
    ];

    let sel = $('<select>').appendTo($("#Element primaire"));
    $(arr).each(function () {
        sel.append($("<option>").attr('value', this.val).text(this.text));
    });
});

let number = 1
add_more_fields.onclick = function () {
    number++
    let newField1 = document.createElement('input');
    newField1.setAttribute('id', 'ingredient_' + number);
    newField1.setAttribute('type', 'text');
    newField1.setAttribute('name', 'survey_options[]');
    newField1.setAttribute('class', 'survey_options');
    newField1.setAttribute('size', "50");
    newField1.setAttribute('placeholder', ' ingredient ' + number);
    survey_options.appendChild(newField1);

    let newField2 = document.createElement('input');
    newField1.setAttribute('id', 'quantité_' + number);
    newField2.setAttribute('type', 'text');
    newField2.setAttribute('name', 'survey_options[]');
    newField2.setAttribute('class', 'survey_options');
    newField2.setAttribute('size', "50");
    newField2.setAttribute('placeholder', 'quantité ' + number);
    survey_options.appendChild(newField2);

    let arr = [
        {val: "gramme", text: 'gramme'},
        {val: "litre", text: 'litre'},
        {val: "millilitre", text: 'millilitre'},
        {val: "cuillère à soupe", text: 'cuillère à soupe'},
        {val: "cuillère à café", text: 'cuillère à café'}
    ];
    let sel = $('<select>').appendTo($("#survey_options"));
    $(arr).each(function () {
        sel.append($("<option>").attr('value', this.val).text(this.text));
    })


}

remove_fields.onclick = function () {

    let input_tags = survey_options.getElementsByTagName('input');

    if (input_tags.length > 1) {
        survey_options.removeChild(input_tags[(input_tags.length) - 1]);
        survey_options.removeChild(input_tags[(input_tags.length) - 1]);

        // delete the select part of the form
        del(document.querySelector("#survey_options > select"))



        number--

    }
}
