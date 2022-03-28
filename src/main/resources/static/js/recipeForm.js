let survey_options = document.getElementById('survey_options');
let add_more_fields = document.getElementById('add_more_fields');
let remove_fields = document.getElementById('remove_fields');

add_more_fields.onclick = function(){
    let newField = document.createElement('input');
    newField.setAttribute('type','text');
    newField.setAttribute('name','survey_options[]');
    newField.setAttribute('class','survey_options');
    newField.setAttribute('siz',50);
    newField.setAttribute('placeholder','Another ingredient');
    survey_options.appendChild(newField);
}

remove_fields.onclick = function(){
    let input_tags = survey_options.getElementsByTagName('input');
    if(input_tags.length > 3) {
        survey_options.removeChild(input_tags[(input_tags.length) - 1]);
    }
}
