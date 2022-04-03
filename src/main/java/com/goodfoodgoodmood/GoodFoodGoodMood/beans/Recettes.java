package com.goodfoodgoodmood.GoodFoodGoodMood.beans;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity
public class Recettes {

    // indique que ID est la clés primaire
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int ID;
    private String name;
    private int duree;
    private String preparation;
    private String specialite;
    private String image;
    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<AvisRecette> avis;

    // indique le lien avec les ingredients
    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private List<Ingredients> ingredients;

    public Recettes(String name, int duree, String preparation, String specialite, List<Ingredients> ingredients) {
        this.name = name;
        this.duree = duree;
        this.preparation = preparation;
        this.specialite = specialite;
        this.ingredients = ingredients;
    }

    @Override
    public String toString() {
        return "Recettes{" +
                "ID=" + ID +
                ", name='" + name + '\'' +
                ", duree=" + duree +
                ", preparation='" + preparation + '\'' +
                ", specialite='" + specialite + '\'' +
                ", image='" + image + '\'' +
                ", ingredients=" + ingredients +
                '}';
    }

    public Recettes() {
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public int getID() {
        return ID;
    }

    public void setID(int ID) {
        this.ID = ID;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getDuree() {
        return duree;
    }

    public void setDuree(int duree) {
        this.duree = duree;
    }

    public String getPreparation() {
        return preparation;
    }

    public void setPreparation(String preparation) {
        this.preparation = preparation;
    }


    public String getSpecialite() {
        return specialite;
    }

    public void setSpecialite(String specialite) {
        this.specialite = specialite;
    }

    public List<Ingredients> getIngredients() {
        return ingredients;
    }

    public void setIngredients(List<Ingredients> ingredients) {
        this.ingredients = ingredients;
    }

    public Set<AvisRecette> getAvis() {
        return avis;
    }

    public void setAvis(Set<AvisRecette> avis) {
        this.avis = avis;
    }
}
