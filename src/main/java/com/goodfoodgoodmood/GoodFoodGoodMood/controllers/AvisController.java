package com.goodfoodgoodmood.GoodFoodGoodMood.controllers;


import com.goodfoodgoodmood.GoodFoodGoodMood.beans.Avis;
import com.goodfoodgoodmood.GoodFoodGoodMood.repositories.AvisRepositories;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/API")
public class AvisController {

    @Autowired
    private AvisRepositories avisRepositories;
    //Méthode pour ajouter un avis via un formulaire le récupérer et le mettre dans la base de données

    @GetMapping("/ajoutAvisEnBase")
    public String ajoutAvisEnBase(){
        Avis avis1= new Avis("loulou","06/03/2022", " avis1");
        Avis avis2= new Avis("doudou","07/03/2022", "avis");
        avisRepositories.save(avis1);
        avisRepositories.save(avis2);
        // Le return sert juste à assurer que la méthode va au bout
        return("OK");

    }
    @PostMapping("/recuperationAvis")
    public String recuperationAvis(@RequestBody Avis monAvis){
        System.out.println(monAvis);
        avisRepositories.save(monAvis);
        return "OK";
    }

}
