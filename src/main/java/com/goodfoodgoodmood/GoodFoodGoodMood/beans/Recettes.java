package com.goodfoodgoodmood.GoodFoodGoodMood.beans;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Recettes {

    // indique que ID est la clés primaire
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int ID ;
    private String name;
    private String ingredient;
    private int durée;
    private int Healthy;

    @Override
    public String toString() {
        return "Recettes{" +
                "name='" + name + '\'' +
                ", ingredient='" + ingredient + '\'' +
                ", durée=" + durée +
                ", ='"  + '\'' +
                ", Healthy=" + Healthy +
                '}';
    }

    public Recettes() {
    }

    public Recettes(String name, String ingredient, int durée, String specialité, int healthy) {
        this.name = name;
        this.ingredient = ingredient;
        this.durée = durée;
//        Specialité = specialité;
        Healthy = healthy;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getIngredient() {
        return ingredient;
    }

    public void setIngredient(String ingredient) {
        this.ingredient = ingredient;
    }

    public int getDurée() {
        return durée;
    }

    public void setDurée(int durée) {
        this.durée = durée;
    }



    public int getHealthy() {
        return Healthy;
    }

    public void setHealthy(int healthy) {
        Healthy = healthy;
    }
}
