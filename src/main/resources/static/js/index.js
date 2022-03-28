// Lorsqu'on clique sur le bouton connexion, faire apparaître le popup
$("#connexionButton").click(()=>{
    $("#popupConnexion").css("display", "block")
})

// // Lorsqu'on clique sur le X, ça ferme le popup
$("#closePopupConnexion").click(()=>{
    $("#popupConnexion").css("display", "none");
})

// Si l'utilisateur n'a pas de compte on lui propose le formulaire de création de compte
// Donc on cache le popoup connexion et on affiche le popop création de compte
$("#createUser").click(()=>{
    $("#connexionCompte").css("display", "none");
    $("#createCompte").css("display", "block");
})

// // Lorsqu'on clique sur le X, ça ferme le popup
$("#closePopupCreationCompte").click(()=>{
    $("#createCompte").css("display", "none");
})

// quand on clique sur le bouton créer un compte
$("#boutonCreationCompte").click(()=>{
    let utilisateur = {
        pseudo : $("#pseudoCreation").val(),
        mail : $("#mailCreation").val(),
        password : $("#passwordCreation").val(),
        allergie : [],
    }
    console.log(utilisateur)
    $.ajax({
        type : "POST",
        headers : {"Content-Type": "application/json"},
        url : "http://localhost:8080/API/inscription",
        data : JSON.stringify(utilisateur),
        success : function(resultat){
            $("#createCompte").css("display", "none");
            $("#allergies").css("display", "block");
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            $("#errorCreationCompte").html("Cet utilisateur est déjà utilisé");
        }
    })
})

$("#boutonSeConnecter").click(()=>{
    let utilisateur = {
        pseudo : $("#pseudoConnexion").val(),
        password : $("#passwordConnexion").val()
    }

    $.ajax({
        type : "POST",
        headers : {"Content-Type": "application/json"},
        url : "http://localhost:8080/API/connexion",
        data : JSON.stringify(utilisateur),
        success : function(resultat){
            $("#popupConnexion").css("display", "none");
            $("#dropdown").css("display", "block")
            $("#connexionButton").css("display", "none");
            $("#pseudo").html($("#pseudoConnexion").val());
        },
        error: function(xhr, textStatus) {
            console.log(xhr.status);
            if(xhr.status == 400){
                $("#errorConnexion").html("Le mot de passe est incorrect");
            }else{
                $("#errorConnexion").html("Aucun compte à ce nom existe");
            }

        }
    })
})

$("#deconnexion").click(()=>{
    $.get("http://localhost:8080/API/deconnexion", ()=>{
        $("#dropdown").css("display", "none")
        $("#connexionButton").css("display", "block");
        $("#pseudo").html("");
        $("#pseudoConnexion").val('');
        $("#passwordConnexion").val('');
    })
})

$("#validerAllergies").click(()=>{
    let yourArray = [];
    $("input:checkbox[name=checkbox]:checked").each(function(){
        yourArray.push($(this).val());
    });

    let obj={};
    obj.allergies = yourArray;
    obj.username = $("#pseudoCreation").val();
    console.log(obj)
    console.log(typeof(obj));
    $.ajax({
        type : "PATCH",
        headers : {"Content-Type": "application/json"},
        url : "http://localhost:8080/API/saveAllergie",
        data : JSON.stringify(obj),
        success : function(resultat){

            $("#errorAllergie").html("Votre compte a bien été créé ! ");
            $("#errorAllergie").css("color", "green");
            $("#allergies").css("display", "none");
            $("#pseudo").html($("#pseudoCreation").val());
        },
        error: function(xhr, textStatus) {
            console.log(xhr.status);
            if(xhr.status == 400){
                $("#errorConnexion").html("Le mot de passe est incorrect");
            }else{
                $("#errorConnexion").html("Aucun compte à ce nom existe");
            }
        }
    })

})


/*$("#boutonTest").click(()=>{
    $.ajax({
        type : "PATCH",
        url : "http://localhost:8080/API/test",
        success : function(resultat){
            alert("ok")
        }
    })
})*/