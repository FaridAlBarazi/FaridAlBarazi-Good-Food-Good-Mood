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
    private int idRecetteAPI;
    private String nomRecette;
    private String urlImage;
    private String specialite;

    public RecetteFavoris() {
    }

    @Override
    public String toString() {
        return "RecetteFavoris{" +
                "ID=" + ID +
                ", idRecetteAPI=" + idRecetteAPI +
                ", nomRecette='" + nomRecette + '\'' +
                ", urlImage='" + urlImage + '\'' +
                ", specialite='" + specialite + '\'' +
                '}';
    }

    public RecetteFavoris(int idRecetteAPI, String nomRecette, String urlImage, String specialite) {
        this.idRecetteAPI = idRecetteAPI;
        this.nomRecette = nomRecette;
        this.urlImage = urlImage;
        this.specialite = specialite;
    }

    public int getIdRecetteAPI() {
        return idRecetteAPI;
    }

    public void setIdRecetteAPI(int idRecetteAPI) {
        this.idRecetteAPI = idRecetteAPI;
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

    public String getSpecialite() {
        return specialite;
    }

    public void setSpecialite(String specialite) {
        this.specialite = specialite;
    }
}
