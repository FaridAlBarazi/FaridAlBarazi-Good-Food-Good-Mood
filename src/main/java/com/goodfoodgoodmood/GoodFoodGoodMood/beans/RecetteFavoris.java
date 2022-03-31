package com.goodfoodgoodmood.GoodFoodGoodMood.beans;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class RecetteFavoris {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int ID;
    private String nomRecette;
    private String urlImage;

    public RecetteFavoris() {
    }

    @Override
    public String toString() {
        return "RecetteFavoris{" +
                "ID=" + ID +
                ", nomRecette='" + nomRecette + '\'' +
                ", urlImage='" + urlImage + '\'' +
                '}';
    }

    public RecetteFavoris(String nomRecette, String urlImage) {
        this.nomRecette = nomRecette;
        this.urlImage = urlImage;
    }

    public int getID() {
        return ID;
    }

    public void setID(int ID) {
        this.ID = ID;
    }

    public String getNomRecette() {
        return nomRecette;
    }

    public void setNomRecette(String nomRecette) {
        this.nomRecette = nomRecette;
    }

    public String getUrlImage() {
        return urlImage;
    }

    public void setUrlImage(String urlImage) {
        this.urlImage = urlImage;
    }
}
