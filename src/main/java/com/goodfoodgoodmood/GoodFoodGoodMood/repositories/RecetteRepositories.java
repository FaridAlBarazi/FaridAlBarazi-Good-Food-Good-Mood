package com.goodfoodgoodmood.GoodFoodGoodMood.repositories;

import com.goodfoodgoodmood.GoodFoodGoodMood.beans.Recettes;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface RecetteRepositories extends JpaRepository<Recettes,Integer> {
    List<Recettes> findBySpecialite(String specialite);
}
