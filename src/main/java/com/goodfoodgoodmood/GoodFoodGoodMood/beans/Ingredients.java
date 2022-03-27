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
    private String mesure;
    private int quantité;

    public Ingredients() {
    }

    @Override
    public String toString() {
        return "Ingredients{" +
                "nom='" + nom + '\'' +
                ", mesure='" + mesure + '\'' +
                ", quantité=" + quantité +
                '}';
    }

    public Ingredients(String nom, String mesure, int quantité) {
        this.nom = nom;
        this.mesure = mesure;
        this.quantité = quantité;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getMesure() {
        return mesure;
    }

    public void setMesure(String mesure) {
        this.mesure = mesure;
    }

    public int getQuantité() {
        return quantité;
    }

    public void setQuantité(int quantité) {
        this.quantité = quantité;
    }
}
