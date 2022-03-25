// Lorsqu'on clique sur le bouton connexion, faire apparaître le popup
$("#connexionButton").click(()=>{
    $("#popupConnexion").css("display", "block")
})

// // Lorsqu'on clique sur le X, ça ferme le popup
$("#closePopup").click(()=>{
    $("#popupConnexion").css("display", "none");
})

// Si l'utilisateur n'a pas de compte on lui propose le formulaire de création de compte
// Donc on cache le popoup connexion et on affiche le popop création de compte
$("#createUser").click(()=>{
    $("#connexionCompte").css("display", "none");
    $("#createCompte").css("display", "block");
})

// // Lorsqu'on clique sur le X, ça ferme le popup
$("#closePopup2").click(()=>{
    $("#createCompte").css("display", "none");
})

// quand on clique sur le bouton créer un compte
$("#boutonCreationCompte").click(()=>{
    let utilisateur = {
        pseudo : $("#pseudoCreation").val(),
        mail : "nathancia@icloud.com",
        password : $("#passwordCreation").val(),
        allergie : "Aucun",
    }

    $.ajax({
        type : "POST",
        headers : {"Content-Type": "application/json"},
        url : "http://localhost:8080/API/inscription",
        data : JSON.stringify(utilisateur),
        success : function(resultat){
            $("#errorCreationCompte").html("Votre compte a bien été créé ! ");
            $("#errorCreationCompte").css("color", "green")
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            $("#errorCreationCompte").html("Cet utilisateur est déjà utilisé");
        }
    })
})
