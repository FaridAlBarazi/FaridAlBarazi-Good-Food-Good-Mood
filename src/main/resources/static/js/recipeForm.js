// Adaptez votre page envoiAnimal.html pour lui ajouter un formulaire à 3 champs de texte pour
// indiquer les caractéristiques de l’animal et un bouton d’envoi. Faites en sorte que cliquer sur le
// bouton d’envoi transmette à la méthode du contrôleur Java recuperationAnimal l’animal ainsi
// renseigné dans le formulaire
$("#Valider").click( ()=> {
    let valeurs={
        nom: $("#nom").val(),
        espece: $("#espece").val(),
        age: $("#age").val()
    };
    console.log(JSON.stringify(valeurs));

    $.ajax({
        type:"POST",
        headers:{"Content-Type":"application/json"},
        url: "http://localhost:8080/API/recuperationAnimal",
        data:JSON.stringify(valeurs),
        success: function (resultat){
            alert("l'API m'a retourné :"+ resultat);
        }
    });

})