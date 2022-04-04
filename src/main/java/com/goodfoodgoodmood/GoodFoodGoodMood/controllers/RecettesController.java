package com.goodfoodgoodmood.GoodFoodGoodMood.controllers;


import com.goodfoodgoodmood.GoodFoodGoodMood.beans.*;
import com.goodfoodgoodmood.GoodFoodGoodMood.repositories.AvisRecetteRepositories;
import com.goodfoodgoodmood.GoodFoodGoodMood.repositories.RecetteRepositories;
import com.goodfoodgoodmood.GoodFoodGoodMood.repositories.UserRepositories;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/API")
public class RecettesController {
    @Autowired
    private RecetteRepositories recetteRepositories;

    @Autowired
    private UserRepositories userRepositories;

    @Autowired
    private AvisRecetteRepositories avisRecetteRepositories;

    @PostMapping("/recuperationRecette")
    public String recuperationRecette(@RequestBody Recettes recette) {
        System.out.println(recette);
        recetteRepositories.save(recette);
        return "ok";
    }

    @GetMapping("/rechercheSpecialite/{specialite}")
    public List<Recettes> rechercheSpecialite(@PathVariable("specialite") String specialite) {
        List<Recettes> mesrecettes = recetteRepositories.findBySpecialite(specialite);
        return mesrecettes;
    }

    @GetMapping("/rechercheIngredient/{ingredients}")
    public List<Recettes> rechercheIngredient(@PathVariable("ingredients") String ingredients) {
        List<Recettes> getRecettes = new ArrayList<>();
        List<Recettes> mesrecettes = recetteRepositories.findAll();
        for (int i = 0; i < mesrecettes.size(); i++) {
            List<Ingredients> ingredientsList = mesrecettes.get(i).getIngredients();
            for (int j = 0; j < ingredientsList.size(); j++) {
                if (ingredients.toLowerCase().equals(ingredientsList.get(j).getNom().toLowerCase())) {
                    getRecettes.add(mesrecettes.get(i));
                }
            }
        }
        System.out.println(getRecettes);

        return getRecettes;
    }

    @GetMapping("/rechercheNomRecette/{name}")
    public List<Recettes> rechercheNomRecette(@PathVariable("name") String name) {
        List<Recettes> mesrecettes = recetteRepositories.findByName(name);
        System.out.println(mesrecettes);
        return mesrecettes;
    }

    @GetMapping("/getRecette/{id}")
    public Recettes testIngredient(@PathVariable("id") int id) {
        return recetteRepositories.findByID(id);
    }

    @GetMapping("/allspecialite")
    public ArrayList<String> allspecialite() {
        List<Recettes> mesrecettes = recetteRepositories.findAll();
        ArrayList<String> specialiteList = new ArrayList<>();
        for (int i = 0; i < mesrecettes.size(); i++) {
            if (!specialiteList.contains(mesrecettes.get(i).getSpecialite()))
            specialiteList.add(mesrecettes.get(i).getSpecialite());
        }
        return specialiteList;
    }

    @GetMapping("/allingredient")
    public ArrayList<String> allingredient() {
        List<Recettes> mesrecettes = recetteRepositories.findAll();
        ArrayList<String> ingredientList = new ArrayList<>();
        for (int i = 0; i < mesrecettes.size(); i++) {
            List<Ingredients> ingredientslist = mesrecettes.get(i).getIngredients();
            for (int j = 0; j < ingredientslist.size(); j++) {
                if (!ingredientList.contains(ingredientslist.get(j).getNom()))
                ingredientList.add(ingredientslist.get(j).getNom());
            }
        }
        return ingredientList;
    }

    @PatchMapping("/avisRecettePoste")
    public void avisRecettePoste(@RequestBody AvisRecette avis, HttpServletRequest request){
        Cookie[] cookies = request.getCookies();

        // Recuperation user pour avoir son id
        User user = userRepositories.findByMail(cookies[0].getValue());

        // on rajoute l'id du user dans l'avis
        avis.setIdUtilisateur(user.getID());

        // On récupère la recette qui où l'avis à été écrite
        Recettes recette = recetteRepositories.findByID(avis.getIdRecette());

        if(recette == null){
            recette = recetteRepositories.findByIdApiRecette(avis.getIdRecette());
        }
        // On rajoute l'avis
        recette.getAvis().add(avis);

        // On sauvegarde les modif de la recette
        recetteRepositories.save(recette);
    }

    @GetMapping("/getNbrAvisRecette/{id}")
    public int getNbrAvisRecette(@PathVariable("id") int idRecette){
        System.out.println("idRecetteee : " + idRecette);
        // On récupère la recette qui où l'avis à été écrite
        Recettes recette = recetteRepositories.findByID(idRecette);
        if(recette == null){
            recette = recetteRepositories.findByIdApiRecette(idRecette);
        }
        System.out.println("tailleeeeee  :  " + recette.getAvis().size());
        return recette.getAvis().size();
    }

    @GetMapping("/getAllAvisRecette/{id}")
    public Set<AvisRecette> getAllAvisRecette(@PathVariable("id") int idRecette){
        Recettes recette = recetteRepositories.findByID(idRecette);
        if(recette == null){
            recette = recetteRepositories.findByIdApiRecette(idRecette);
        }
        return recette.getAvis();
    }

    @PatchMapping("/removeAvisRecetteUser")
    public String removeAvisRecetteUser(@RequestBody int idAvis) {
        System.out.println(idAvis);

        AvisRecette avis = avisRecetteRepositories.findByID(idAvis);

        // Récupère avis à supprimer
        Recettes recette = recetteRepositories.findByID(avis.getIdRecette());

        recette.getAvis().remove(avis);

        recetteRepositories.save(recette);
        return "ok";
    }
}