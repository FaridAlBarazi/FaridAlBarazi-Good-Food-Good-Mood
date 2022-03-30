package com.goodfoodgoodmood.GoodFoodGoodMood.repositories;

import com.goodfoodgoodmood.GoodFoodGoodMood.beans.Recettes;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecetteRepositories extends JpaRepository<Recettes,Integer> {
}
