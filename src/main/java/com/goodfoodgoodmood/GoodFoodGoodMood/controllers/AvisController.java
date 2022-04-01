package com.goodfoodgoodmood.GoodFoodGoodMood.controllers;


import com.goodfoodgoodmood.GoodFoodGoodMood.beans.Avis;
import com.goodfoodgoodmood.GoodFoodGoodMood.beans.RecetteFavoris;
import com.goodfoodgoodmood.GoodFoodGoodMood.beans.User;
import com.goodfoodgoodmood.GoodFoodGoodMood.repositories.AvisRepositories;
import com.goodfoodgoodmood.GoodFoodGoodMood.repositories.UserRepositories;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Set;

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


    /*@PatchMapping("/removeAvis")
    public String removeAvis(@RequestBody int idAvis, HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        // Recuperation user
        User user = userRepositories.findByMail(cookies[0].getValue());
        Set<Avis> mesAvis = user.getAvis();
        Avis monAvis=avisRepositories.findByID(idAvis);

        System.out.println("mon avis : " +monAvis);
        System.out.println("user avant : " + user);

        user.getAvis().remove(monAvis);
        System.out.println("user après : " + user);
        userRepositories.save(user);
        return "ok";
    }

    @PatchMapping("/removeAvisID")
    public String removeAvisID(@RequestBody int index, HttpServletRequest request) {
        System.out.println("index : " + index);

        // Cookies
        Cookie[] cookies = request.getCookies();

        // Récupération du user
        User user = userRepositories.findByMail(cookies[0].getValue());

        // Récupération de la liste des favoris du user
        Set<Avis> mesAvis = user.getAvis();

        // Enlever un élement de la liste
        System.out.println("AvisList avant : " + mesAvis);
        mesAvis.remove(index);
        System.out.println("AvisList apres : " + mesAvis);

        userRepositories.save(user);
        return "ok";
    }*/


    @GetMapping ("/getAllAvis")
    public List<Avis> getAllAvis(){
        List<Avis> tousLesAvis= avisRepositories.findAll();
        return tousLesAvis;
    }


    @GetMapping("/nbrAvis")
    public int nbrAvis(HttpServletRequest request) {
        List<Avis> tousLesAvis= avisRepositories.findAll();
        int nbr = tousLesAvis.size();
        return nbr;
    }

    @GetMapping("/les4avis")
    public List<Avis> les4avis(){
        List<Avis> listeAvis=avisRepositories.findTop4ByOrderByDescriptionDesc();
        System.out.println(listeAvis);
        return(listeAvis);
    }

}
