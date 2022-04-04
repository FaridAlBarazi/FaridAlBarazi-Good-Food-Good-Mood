package com.goodfoodgoodmood.GoodFoodGoodMood.repositories;

import com.goodfoodgoodmood.GoodFoodGoodMood.beans.Avis;
import com.goodfoodgoodmood.GoodFoodGoodMood.beans.Recettes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RecetteRepositories extends JpaRepository<Recettes,Integer> {

    List<Recettes> findBySpecialite(String specialite);

    List<Recettes> findByIngredients(String ingredients);

    List<Recettes> findByName(String name);

    //List<Recettes> findByIngredientsByNom(String nom);
    Recettes findByID(int id);

    Recettes findByIdApiRecette(int id);

    List<Recettes> findBySource(String source);


}
