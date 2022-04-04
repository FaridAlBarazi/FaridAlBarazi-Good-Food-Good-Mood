package com.goodfoodgoodmood.GoodFoodGoodMood.beans;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class AvisRecette {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int ID;
    private int idUtilisateur;
    private int idRecette;
    private String pseudo;
    private String date;
    private String description;
    private int note;

    public AvisRecette() {
    }

    public AvisRecette(int ID, int idRecette, String pseudo, String date, String description, int note) {
        this.ID = ID;
        this.idRecette = idRecette;
        this.pseudo = pseudo;
        this.date = date;
        this.description = description;
        this.note = note;
    }

    @Override
    public String toString() {
        return "AvisRecette{" +
                "ID=" + ID +
                ", idUtilisateur=" + idUtilisateur +
                ", pseudo='" + pseudo + '\'' +
                ", date='" + date + '\'' +
                ", description='" + description + '\'' +
                ", note=" + note +
                '}';
    }

    public int getIdRecette() {
        return idRecette;
    }

    public void setIdRecette(int idRecette) {
        this.idRecette = idRecette;
    }

    public int getID() {
        return ID;
    }

    public void setID(int ID) {
        this.ID = ID;
    }

    public String getPseudo() {
        return pseudo;
    }

    public void setPseudo(String pseudo) {
        this.pseudo = pseudo;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getNote() {
        return note;
    }

    public void setNote(int note) {
        this.note = note;
    }

    public int getIdUtilisateur() {
        return idUtilisateur;
    }

    public void setIdUtilisateur(int idUtilisateur) {
        this.idUtilisateur = idUtilisateur;
    }
}
