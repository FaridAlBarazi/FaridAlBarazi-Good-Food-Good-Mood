package com.goodfoodgoodmood.GoodFoodGoodMood.controllers;


import com.goodfoodgoodmood.GoodFoodGoodMood.beans.Avis;
import com.goodfoodgoodmood.GoodFoodGoodMood.beans.User;
import com.goodfoodgoodmood.GoodFoodGoodMood.repositories.AvisRepositories;
import com.goodfoodgoodmood.GoodFoodGoodMood.repositories.UserRepositories;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/API")
public class AvisController {
    @Autowired
    private UserRepositories userRepositories;

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

    @DeleteMapping("/suppressionAvis")
    public String suppressionAvis(@RequestBody Avis monAvis){
        avisRepositories.delete(monAvis);
        return "avis bien supprimé";
    }

    @GetMapping ("/getAllAvis")
    public List<Avis> getAllAvis(){
        List<Avis> tousLesAvis= avisRepositories.findAll();
        return tousLesAvis;
    }


    @GetMapping("/les4avis")
    public List<Avis> les4avis(){
        List<Avis> listeAvis=avisRepositories.findTop4ByOrderByDescriptionDesc();
        System.out.println(listeAvis);
        return(listeAvis);
    }

}
