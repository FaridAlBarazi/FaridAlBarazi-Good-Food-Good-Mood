

$.ajax({
    type: "GET",
    url:"http://localhost:8080/API/allingredient",
    success:(retour)=>{
        console.log(retour)
    }
});

function selectspecialite(){
        $.ajax({
            type: "GET",
            url:"http://localhost:8080/API/allspecialite",
            success:(retour)=>{
                console.log(retour);
                // let selec = $("<select id='selectspecialiteingr' >").appendTo($("#SpecialiteOuIngr"));
                // $(spec).each(function () {
                //     selec.append($("<option>").attr('value', this.val).text(this.text));
                // });

            }
        });

    }

let myselect1 = document.getElementById("myselect1");
myselect1.addEventListener("change", function () {
    console.log(myselect1.value)
});

function specialite(){
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
    let selec = $("<select id='selectspecialiteingr' >").appendTo($("#SpecialiteOuIngr"));
    $(spec).each(function () {
        selec.append($("<option>").attr('value', this.val).text(this.text));
    });
}

var nbrchamp =0;
let myselect2 = document.getElementById("myselect2");
myselect2.addEventListener("change", function () {
    console.log(myselect2.value)

//if (myselect1 == "Recettes de notre site") {

    if (nbrchamp > 0){
        $("#selectspecialiteingr").remove();
        nbrchamp--;
        if (myselect2.value == "Par specialité") {
           specialite();
            nbrchamp++;
        } else if (myselect2.value == "Par ingredient"){
            let selec = $("<input id='selectspecialiteingr'>").appendTo($("#SpecialiteOuIngr"));
            nbrchamp++;
        }
    }   else {

    if (myselect2.value == "Par specialité") {
        specialite();
        nbrchamp++;
    } else if (myselect2.value == "Par ingredient"){
        let selec = $("<input id='selectspecialiteingr'>").appendTo($("#SpecialiteOuIngr"));
        nbrchamp++;
    }
    }
});

//else if (myselect1 == "Recettes utilisateurs") {


//}
//}


$("#recherche").click(() => {
    //let myselect1 = $("#myselect1").find(":selected").text();
    // let myselect2 = $("#myselect2").find(":selected").text();
    let inputRecherche = $("#selectspecialiteingr").val();
    console.log(myselect1);
    console.log(myselect2);
    console.log(inputRecherche);
   // console.log(selec);

    //  if (myselect1 == "Recettes utilisateurs") {
    // if (myselect2 == "Paringredient") {
    //     $.get("http://localhost:8080/API/rechercheIngredients/" + inputRecherche, (retour) => {
    //         console.log(retour);
    //     })
    // }
    // if (myselect2 == "Par le nom de la recette") {
    $.ajax({
        type: "GET",
        url:"http://localhost:8080/API/rechercheRecette/"+inputRecherche,
        // data: JSON.stringify(inputRecherche),
        // headers:{"Content-Type":"application/json"},
        success:(retour)=>{
            console.log(retour)
        }
    });

    //   }
    // if (myselect2 == "Par specialité") {
    //     $.get("http://localhost:8080/API/rechercheSpecialite"+ inputRecherche, (retour) => {
    //         console.log(retour);
    //     })
    // }
    // }
})

// // select pour les specialité
// let myselect1 = document.getElementById("activitySelector");
// myselect1.addEventListener("change", function() {
//     console.log(activities.value)
// });
// if (myselect1 == "Recettes de notre site") {
//     let spec = [
//         {val : "African", text: 'African'},
//         {val : "American", text: 'American'},
//         {val : "British", text: 'British'},
//         {val : "Cajun", text: 'Cajun'},
//         {val : "Caribbean", text: 'Caribbean'},
//         {val : "Chinese", text: 'Chinese'},
//         {val : "Eastern European", text: 'Eastern European'},
//         {val : "European", text: 'European'},
//         {val : "French", text: 'French'},
//         {val : "German", text: 'German'},
//         {val : "Greek", text: 'Greek'},
//         {val : "Indian", text: 'Indian'},
//         {val : "Irish", text: 'Irish'},
//         {val : "Italian", text: 'Italian'},
//         {val : "Japanese", text: 'Japanese'},
//         {val : "Jewish", text: 'Jewish'},
//         {val : "Korean", text: 'Korean'},
//         {val : "Latin", text: 'Latin'},
//         {val : "American Mediterranean", text: 'American Mediterranean'},
//         {val : "Mexican", text: 'Mexican'},
//         {val : "Middle Eastern", text: 'Middle Eastern'},
//         {val : "Nordic", text: 'Nordic'},
//         {val : "Southern", text: 'Southern'},
//         {val : "Spanish", text: 'Spanish'},
//         {val : "Thai", text: 'Thai'},
//         {val : "Vietnamese", text: 'Vietnamese'}
//
//     ];
// }
// else {
//     let spec = [
//         {val : "African", text: 'African'},
//         {val : "American", text: 'American'},
//         {val : "British", text: 'British'},
//         {val : "Cajun", text: 'Cajun'},
//         {val : "Caribbean", text: 'Caribbean'}
//     ];
//     let selec = $("<select id='selectspecialiterecherch'>").appendTo($("#specialiteRecherche"));
//     $(spec).each(function() {
//         selec.append($("<option>").attr('value',this.val).text(this.text));
//     });
// }
//

