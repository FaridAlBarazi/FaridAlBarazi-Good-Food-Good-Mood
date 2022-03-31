package com.goodfoodgoodmood.GoodFoodGoodMood.repositories;


import com.goodfoodgoodmood.GoodFoodGoodMood.beans.Avis;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AvisRepositories extends JpaRepository<Avis, Integer> {

    Avis findByID(int id);
    List<Avis> findTop4ByOrderByNote();
}
