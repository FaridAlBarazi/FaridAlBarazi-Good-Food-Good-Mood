package com.goodfoodgoodmood.GoodFoodGoodMood.beans;

import javax.persistence.*;
import java.util.List;

@Entity

public class Ingredients {
    // indique que ID est la clés primaire
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int ID ;
    private String nom;
    private String unit;
    private int quantite;

    // indique la relation avec les recettes
    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    List<Recettes> recettes;

    public Ingredients() {
    }

    @Override
    public String toString() {
        return "Ingredients{" +
                "nom='" + nom + '\'' +
                ", mesure='" + unit + '\'' +
                ", quantité=" + quantite +
                '}';
    }

    public Ingredients(String nom, String mesure, int quantite) {
        this.nom = nom;
        this.unit = mesure;
        this.quantite = quantite;
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

    public int getQuantite() {
        return quantite;
    }

    public void setQuantite(int quantite) {
        this.quantite = quantite;
    }
}
