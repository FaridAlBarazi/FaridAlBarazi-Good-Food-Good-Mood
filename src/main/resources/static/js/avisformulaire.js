
let obj={pseudo:"hanna84",date:"12/12/2021",description:"la recette est super facile à réaliser"};
$("#monBouton").click(() =>{
    obj.pseudo=$("#nomUser").val();
    obj.date=$("#date").val();
    obj.description=$("#exempleCommentaire").val();


    $.ajax({
        type:"POST",
        url:"http://localhost:8080/API/recuperationAvis",
        data: JSON.stringify(obj),
        headers: {"Content-Type":"application/json"},
        success: (retour)=> {console.log(retour);}
    });
});
