package com.goodfoodgoodmood.GoodFoodGoodMood.repositories;

import com.goodfoodgoodmood.GoodFoodGoodMood.beans.RecetteFavoris;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecetteFavoriRepositories extends JpaRepository<RecetteFavoris, Integer> {
    RecetteFavoris findByIdRecetteAPI(int idRecette);
}
