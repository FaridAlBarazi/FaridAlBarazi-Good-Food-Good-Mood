package com.goodfoodgoodmood.GoodFoodGoodMood.beans;

import javax.persistence.*;

@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int ID;
    private String pseudo;
    private String mail;
    private String password;
    @Enumerated(EnumType.ORDINAL)
    private Allergie allergie;

    public User() {
    }

    public User(String pseudo, String mail, String password, Allergie alergie) {
        this.pseudo = pseudo;
        this.mail = mail;
        this.password = password;
        this.allergie = alergie;
    }

    public String getPseudo() {
        return pseudo;
    }

    public void setPseudo(String pseudo) {
        this.pseudo = pseudo;
    }

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Allergie getAllergie() {
        return allergie;
    }

    public void setAllergie(Allergie allergie) {
        this.allergie = allergie;
    }
}
