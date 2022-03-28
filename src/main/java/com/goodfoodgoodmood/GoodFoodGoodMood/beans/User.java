package com.goodfoodgoodmood.GoodFoodGoodMood.beans;

import javax.persistence.*;
import java.util.Collection;
import java.util.List;

@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int ID;
    private String pseudo;
    private String mail;
    private String password;

    @ElementCollection(targetClass = TypeAllergie.class)
    @JoinTable(name = "userAllergie", joinColumns = @JoinColumn(name = "userID"))
    @Column(name = "allergie", nullable = false)
    @Enumerated(EnumType.STRING)
    Collection<TypeAllergie> allergie;

    public User() {
    }

    public User(String pseudo, String mail, String password) {
        this.pseudo = pseudo;
        this.mail = mail;
        this.password = password;
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

    public Collection<TypeAllergie> getAllergie() {
        return allergie;
    }

    public void setAllergie(Collection<TypeAllergie> allergie) {
        this.allergie = allergie;
    }
}
