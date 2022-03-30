const apiKey = "462bcfeb80784d16aca500b08f087c0d";
//const apiKey = "c764f8af433b4b9093ecfed23493b886";
//const apiKey = "0507b7d2299e4aea88421cfa97388b0e";
//const apiKey = "4bc3a5e0a85742e09b08d3f0fce9a84e";
function getInfoRecette(id){
    $.ajax({
        type: "GET",
        url: 'https://api.spoonacular.com/recipes/' + id + '/information?includeNutrition=false&apiKey=' + apiKey,
        success: (data) => {
            console.log(data);
            $("#titre").html(data.title);
            $("#image").attr("src", data.image);
            $("#dureeCuisson").html(data.readyInMinutes + " minutes");
            for(let i = 0; i < data.cuisines.length; i++){
                $("#cuisine").append('<li>' + data.cuisines[i] + '</li>');
            }
            $("#healthy").html(data.veryHealthy);
            $("#instruction").html(data.instructions);
            for(let i = 0; i < data.extendedIngredients.length; i++){
                $("#listeIngredient").append('<li>' + data.extendedIngredients[i].original + '</li>')
            }
        }
    })
}

getInfoRecette(new URL(location.href).searchParams.get('id'));