let survey_options = document.getElementById('survey_options');
let add_more_fields = document.getElementById('add_more_fields');
let remove_fields = document.getElementById('remove_fields');

let number=2
add_more_fields.onclick = function(){
number++
        let newField1 = document.createElement('input');
        newField1.setAttribute('type','text');
        newField1.setAttribute('name','survey_options[]');
        newField1.setAttribute('class','survey_options');
        newField1.setAttribute('size',"50");
        newField1.setAttribute('placeholder',' ingredient'+number );
        survey_options.appendChild(newField1);

        let newField2 = document.createElement('input');
        newField2.setAttribute('type','text');
        newField2.setAttribute('name','survey_options[]');
        newField2.setAttribute('class','survey_options');
        newField2.setAttribute('size',"50");
        newField2.setAttribute('placeholder','Another ingredient');

        survey_options.appendChild(newField2);
        let newField3 = document.createElement('input');
        newField3.setAttribute('type','text');
        newField3.setAttribute('name','survey_options[]');
        newField3.setAttribute('class','survey_options');
        newField3.setAttribute('size',"50");
        newField3.setAttribute('placeholder','Another ingredient');
        survey_options.appendChild(newField3);



}

remove_fields.onclick = function(){
    let input_tags = survey_options.getElementsByTagName('input');
    if(input_tags.length > 1) {
        survey_options.removeChild(input_tags[(input_tags.length) - 1]);
        survey_options.removeChild(input_tags[(input_tags.length) - 1]);
        survey_options.removeChild(input_tags[(input_tags.length) - 1]);
    }
}
