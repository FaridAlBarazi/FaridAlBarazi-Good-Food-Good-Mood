package com.goodfoodgoodmood.GoodFoodGoodMood.controllers;


import com.goodfoodgoodmood.GoodFoodGoodMood.beans.Ingredients;
import com.goodfoodgoodmood.GoodFoodGoodMood.beans.Recettes;
import com.goodfoodgoodmood.GoodFoodGoodMood.repositories.RecetteRepositories;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

@RestController
@RequestMapping("/API")
public class RecettesController {
    @Autowired
    private RecetteRepositories recetteRepositories;

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
        List<Recettes> mesrecettes = recetteRepositories.findByIngredients(ingredients);
        return mesrecettes;
    }

    @GetMapping("/rechercheNomRecette/{name}")
    public List<Recettes> rechercheNomRecette(@PathVariable("name") String name) {
        List<Recettes> mesrecettes = recetteRepositories.findByName(name);
        return mesrecettes;
    }

    @GetMapping("/testIngredient/{ingredients}")
    public List<Recettes> testIngredient(@PathVariable("ingredients") String ingredients) {
        List<Recettes> getRecettes = new ArrayList<>();
        List<Recettes> mesrecettes = recetteRepositories.findAll();
        for(int i=0; i< mesrecettes.size(); i++){
            List<Ingredients> ingredientsList = mesrecettes.get(i).getIngredients();
            for(int j=0; j < ingredientsList.size(); j++){
                if(ingredients.toLowerCase().equals(ingredientsList.get(j).getNom().toLowerCase())){
                    getRecettes.add(mesrecettes.get(i));
                }
            }
        }
        System.out.println(getRecettes);

        return getRecettes;
    }
}