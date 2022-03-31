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

    public Ingredients() {
    }

    public Ingredients(String nom, String unit, int quantite) {
        this.nom = nom;
        this.unit = unit;
        this.quantite = quantite;
    }

    @Override
    public String toString() {
        return "Ingredients{" +
                "ID=" + ID +
                ", nom='" + nom + '\'' +
                ", unit='" + unit + '\'' +
                ", quantite=" + quantite +
                '}';
    }

    public int getID() {
        return ID;
    }

    public void setID(int ID) {
        this.ID = ID;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public int getQuantite() {
        return quantite;
    }

    public void setQuantite(int quantite) {
        this.quantite = quantite;
    }
}
