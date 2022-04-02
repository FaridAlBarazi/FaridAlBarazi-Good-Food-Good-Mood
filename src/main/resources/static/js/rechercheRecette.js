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

function selectingredients() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/API/allingredient",
        success: (retour) => {
            console.log(retour)
            let spec =  [];
            for(let i = 0; i < retour.length; i++){
                let x = {val: retour[i], text: retour[i]}
                spec.push(x);
            }
            let selec = $("<select id='selectspecialiteingr' >").appendTo($("#SpecialiteOuIngr"));

            $(spec).each(function () {
                selec.append($("<option>").attr('value', this.val).text(this.text));
            });
        }
    });

}

function selectspecialite() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/API/allspecialite",
        success: (retour) => {
            console.log(retour);
            let spec =  [];
            for(let i = 0; i < retour.length; i++){
                let x = {val: retour[i], text: retour[i]}
                spec.push(x);
            }
            let selec = $("<select id='selectspecialiteingr' >").appendTo($("#SpecialiteOuIngr"));

            $(spec).each(function () {
               selec.append($("<option>").attr('value', this.val).text(this.text));
            });
        }
    });

}

let myselect1 = document.getElementById("myselect1");

myselect1.addEventListener("change", function () {
    console.log(myselect1.value);
    $("#resultat").empty();
    //$("#selectspecialiteingr").remove();
    console.log(myselect2.value)
    if(myselect1.value == "Recettes utilisateurs" && myselect2.value == "Par ingredient"){
        selectingredients();
    }else if(myselect1.value == "Recettes utilisateurs" && myselect2.value == "Par specialité"){
        selectspecialite();
    }else if(myselect1.value == "Recettes de notre site" && myselect2.value == "Par specialité"){
        specialite();
    }else if(myselect1.value == "Recettes de notre site" && myselect2.value == "Par ingredient"){
        let selec = $("<input id='selectspecialiteingr'>").appendTo($("#SpecialiteOuIngr"));
    }
});

function specialite() {
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

let myselect2 = document.getElementById("myselect2");

myselect2.addEventListener("change", function () {
    console.log(myselect1.value);
    $("#selectspecialiteingr").remove();
    console.log(myselect2.value)
    if(myselect1.value == "Recettes utilisateurs" && myselect2.value == "Par ingrédient"){
        selectingredients();
    }else if(myselect1.value == "Recettes utilisateurs" && myselect2.value == "Par specialité"){
        selectspecialite();
    }else if(myselect1.value == "Recettes de notre site" && myselect2.value == "Par specialité"){
        specialite();
    }else if(myselect1.value == "Recettes de notre site" && myselect2.value == "Par ingredient"){
        $("<input id='selectspecialiteingr'>").appendTo($("#SpecialiteOuIngr"));
    }

});

//------------------------Clé API ----------------------
//const apiKey = "462bcfeb80784d16aca500b08f087c0d";
//const apiKey = "c764f8af433b4b9093ecfed23493b886";
const apiKey = "0507b7d2299e4aea88421cfa97388b0e";
//const apiKey = "4bc3a5e0a85742e09b08d3f0fce9a84e";
//const apiKey = "e259759e2eff4a1f91671009d2d9f1f3";
const container = document.querySelector(".card-img-top");

function resultatspecialite(inputRecherche){
    document.querySelector(".test").classList.remove("test2");
    //$("#resultat").remove("imageResult");
    $.ajax({
        type: "GET",
        url: "https://api.spoonacular.com/recipes/complexSearch?apiKey=" + apiKey + "&cuisine=" + inputRecherche ,
        // data: JSON.stringify(inputRecherche),
        // headers:{"Content-Type":"application/json"},
        success: (retour) => {
            console.log(retour)
            for(let i = 0; i < retour.results.length; i++){
                /*$("<img id='imageResult'>").appendTo($("#resultat")).prop({
                    class: "card-img-top test",
                    src: retour.results[i].image
                }).click(()=>{
                    window.location.href = "affichageRecette.html?id=" + retour.results[i].id;
                })*/
                $("#resultat").append(
                    $(document.createElement('h3')).html(
                        retour.results[i].title
                    ).click(()=>{
                        window.location.href = "affichageRecette.html?id=" + retour.results[i].id;
                    }),

                    $(document.createElement('img')).prop({
                        id: "imageResult",
                        class: "card-img-top",
                        src: retour.results[i].image
                    }).click(()=>{
                        window.location.href = "affichageRecette.html?id=" + retour.results[i].id;
                    })

                )
            }
        }
    });
}

$("#recherche").click(() => {
    let inputRecherche = $("#selectspecialiteingr").val();
    console.log(myselect1);
    console.log(myselect2);
    console.log(inputRecherche);

    if(myselect1.value == "Recettes utilisateurs" && myselect2.value == "Par ingrédient"){
        selectingredients();
    }else if(myselect1.value == "Recettes utilisateurs" && myselect2.value == "Par specialité"){
        selectspecialite();
    }else if(myselect1.value == "Recettes de notre site" && myselect2.value == "Par specialité"){
        resultatspecialite(inputRecherche);
    }else if(myselect1.value == "Recettes de notre site" && myselect2.value == "Par ingredient"){
        $("<input id='selectspecialiteingr'>").appendTo($("#SpecialiteOuIngr"));
    }
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/API/rechercheRecette/" + inputRecherche,
        // data: JSON.stringify(inputRecherche),
        // headers:{"Content-Type":"application/json"},
        success: (retour) => {
            console.log(retour)
        }
    });
})

