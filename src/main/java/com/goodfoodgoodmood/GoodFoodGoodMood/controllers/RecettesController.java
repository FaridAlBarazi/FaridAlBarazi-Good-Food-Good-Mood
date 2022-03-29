package com.goodfoodgoodmood.GoodFoodGoodMood.controllers;



import com.goodfoodgoodmood.GoodFoodGoodMood.beans.IngredientList;
import com.goodfoodgoodmood.GoodFoodGoodMood.beans.Ingredients;
import com.goodfoodgoodmood.GoodFoodGoodMood.beans.Recettes;
import com.goodfoodgoodmood.GoodFoodGoodMood.repositories.RecetteRepositories;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/API")
public class RecettesController {
    @Autowired
    private RecetteRepositories recetteRepositories;

    @PostMapping("/recuperationRecette")
    public String recuperationRecette(@RequestBody Recettes recette){
     recetteRepositories.save(recette);
    return "ok";
    }

}
