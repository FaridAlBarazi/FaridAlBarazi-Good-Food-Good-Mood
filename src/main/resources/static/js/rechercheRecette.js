$("#recherche").click(() => {
    let myselect1 = $("#myselect1").find(":selected").text();
    let myselect2 = $("#myselect2").find(":selected").text();
    let inputRecherche = $("#inputRecherche").val();
    console.log(myselect1);
    console.log(myselect2);
    console.log(inputRecherche);

  //  if (myselect1 == "Recettes utilisateurs") {
        // if (myselect2 == "Par_ingredient") {
        //     $.get("http://localhost:8080/API/rechercheIngredients/" + inputRecherche, (retour) => {
        //         console.log(retour);
        //     })
        // }
        // if (myselect2 == "Par le nom de la recette") {
             $.get("http://localhost:8080/API/rechercheNomRecette/"+ inputRecherche, (retour) => {
                 console.log(retour);
             })
      //   }
        // if (myselect2 == "Par specialité") {
        //     $.get("http://localhost:8080/API/rechercheSpecialite", (retour) => {
        //         console.log(retour);
        //     })
        // }
   // }
})


