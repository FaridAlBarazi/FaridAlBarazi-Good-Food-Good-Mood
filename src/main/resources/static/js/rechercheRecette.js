function selectingredients() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/API/allingredient/utilisateur",
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
        url: "http://localhost:8080/API/allspecialite/utilisateur",
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
    $("#SpecialiteOuIngr").empty();
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
    $("#SpecialiteOuIngr").empty();
    console.log(myselect2.value)
    if(myselect1.value == "Recettes utilisateurs" && myselect2.value == "Par ingredient"){
        selectingredients();
    }else if(myselect1.value == "Recettes utilisateurs" && myselect2.value == "Par specialité"){
        selectspecialite();
    }else if(myselect1.value == "Recettes de notre site" && myselect2.value == "Par specialité"){
        specialite();
    }else if(myselect1.value == "Recettes de notre site" && myselect2.value == "Par ingredient"){
        $("<input id='selectspecialiteingr'>").appendTo($("#SpecialiteOuIngr"));
    }
});

const container = document.querySelector(".card-img-top");

function resultatspecialite(inputRecherche){
    $("#resultat").empty();
    $.ajax({
        type: "GET",
        url: "https://api.spoonacular.com/recipes/complexSearch?apiKey=" + gestionCookiesAndApiKey + "&cuisine=" + inputRecherche ,
        success: (retour) => {
            console.log(retour)
            for(let i = 0; i < retour.results.length; i++){
                $("#resultat").append(
                    $(document.createElement("div")).prop({
                        class: "card3"
                    }).append(
                        $(document.createElement("div")).prop({
                            class: "content3",
                        }).append(
                            $(document.createElement("h4")).html(
                                retour.results[i].title
                            )
                        ),
                        $(document.createElement("div")).prop({
                            class:"imgBx3"
                        }).append(
                            $(document.createElement("img")).prop({
                                id : "recette" + i,
                                src: retour.results[i].image
                            }).click(()=>{
                                window.location.href = "affichageRecette.html?source=api&id=" + retour.results[i].id;
                            })
                        )
                    )
                )
            }
        }
    });
}

function resultatingredient(inputRecherche){
    $("#resultat").empty();
    $.ajax({
        type: "GET",
        url: "https://api.spoonacular.com/recipes/findByIngredients?apiKey=" + gestionCookiesAndApiKey + "&ingredients=" + inputRecherche ,
        success: (retour) => {
            console.log(retour)
            for(let i = 0; i < retour.length; i++){
                $("#resultat").append(
                    $(document.createElement("div")).prop({
                        class: "card3"
                    }).append(
                        $(document.createElement("div")).prop({
                            class: "content3",
                        }).append(
                            $(document.createElement("h4")).html(
                                retour[i].title
                            )
                        ),
                        $(document.createElement("div")).prop({
                            class:"imgBx3"
                        }).append(
                            $(document.createElement("img")).prop({
                                id : "recette" + i,
                                src: retour[i].image
                            }).click(()=>{
                                window.location.href = "affichageRecette.html?source=api&id=" + retour[i].id;
                            })
                        )
                    )
                )
            }
        }
    });
}

function resultatspecialiteutilisateur(inputRecherche){
    $("#resultat").empty();
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/API/rechercheSpecialite/" + inputRecherche ,
        success: (retour) => {
            console.log(retour)
            for(let i = 0; i < retour.length; i++){
                $("#resultat").append(
                    $(document.createElement("div")).prop({
                        class: "card3"
                    }).append(
                        $(document.createElement("div")).prop({
                            class: "content3",
                        }).append(
                            $(document.createElement("h4")).html(
                                retour[i].name
                            )
                        ),
                        $(document.createElement("div")).prop({
                            class:"imgBx3"
                        }).append(
                            $(document.createElement("img")).prop({
                                id : "recette" + i,
                                src: retour[i].image
                            }).click(()=>{
                                window.location.href = "affichageRecette.html?source=utilisateur&id=" + retour[i].id;
                            })
                        )
                    )
                )
            }
        }
    });
}

function resultatingredientsutilisateur(inputRecherche){
    $("#resultat").empty();
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/API/rechercheIngredient/" + inputRecherche ,
        success: (retour) => {
            console.log(retour)
            for(let i = 0; i < retour.length; i++){
                $("#resultat").append(
                    $(document.createElement("div")).prop({
                        class: "card3"
                    }).append(
                        $(document.createElement("div")).prop({
                            class: "content3",
                        }).append(
                            $(document.createElement("h4")).html(
                                retour[i].name
                            )
                        ),
                        $(document.createElement("div")).prop({
                            class:"imgBx3"
                        }).append(
                            $(document.createElement("img")).prop({
                                id : "recette" + i,
                                src: retour[i].image
                            }).click(()=>{
                                window.location.href = "affichageRecette.html?source=utilisateur&id=" + retour[i].id;
                            })
                        )
                    )
                )
            }
        }
    });
}

$("#recherche").click(() => {
    let inputRecherche = $("#selectspecialiteingr").val();
    console.log(inputRecherche);
    if(myselect1.value == "Recettes utilisateurs" && myselect2.value == "Par ingredient"){
        resultatingredientsutilisateur(inputRecherche);
    }else if(myselect1.value == "Recettes utilisateurs" && myselect2.value == "Par specialité"){
        resultatspecialiteutilisateur(inputRecherche)
    }else if(myselect1.value == "Recettes de notre site" && myselect2.value == "Par specialité"){
        resultatspecialite(inputRecherche);
    }else if(myselect1.value == "Recettes de notre site" && myselect2.value == "Par ingredient"){
        resultatingredient(inputRecherche);
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