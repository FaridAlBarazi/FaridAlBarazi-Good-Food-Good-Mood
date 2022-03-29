package com.goodfoodgoodmood.GoodFoodGoodMood.beans;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity

public class Ingredients {
    // indique que ID est la clés primaire
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int ID ;
    private String nom;
    private String unit;
    private int quantité;

    public Ingredients() {
    }

    @Override
    public String toString() {
        return "Ingredients{" +
                "nom='" + nom + '\'' +
                ", mesure='" + unit + '\'' +
                ", quantité=" + quantité +
                '}';
    }

    public Ingredients(String nom, String mesure, int quantité) {
        this.nom = nom;
        this.unit = mesure;
        this.quantité = quantité;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getMesure() {
        return unit;
    }

    public void setMesure(String mesure) {
        this.unit = unit;
    }

    public int getQuantité() {
        return quantité;
    }

    public void setQuantité(int quantité) {
        this.quantité = quantité;
    }
}
