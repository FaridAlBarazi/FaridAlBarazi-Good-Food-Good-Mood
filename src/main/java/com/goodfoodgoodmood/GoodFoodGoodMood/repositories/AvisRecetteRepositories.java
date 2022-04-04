package com.goodfoodgoodmood.GoodFoodGoodMood.repositories;

import com.goodfoodgoodmood.GoodFoodGoodMood.beans.AvisRecette;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AvisRecetteRepositories extends JpaRepository<AvisRecette, Integer> {
    List<AvisRecette> findByIdUtilisateur(int user);

    AvisRecette findByID(int id);
}
