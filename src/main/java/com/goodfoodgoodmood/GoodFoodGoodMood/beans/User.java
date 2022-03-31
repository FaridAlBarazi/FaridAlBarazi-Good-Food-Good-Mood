package com.goodfoodgoodmood.GoodFoodGoodMood.beans;

import javax.persistence.*;
import java.util.Collection;
import java.util.List;
import java.util.Set;

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
    private Collection<TypeAllergie> allergie;

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private Set<Recettes> recettes;

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private Set<Avis> avis;

    @ElementCollection
    private List<Integer> favoris;

    @Override
    public String toString() {
        return "User{" +
                "ID=" + ID +
                ", pseudo='" + pseudo + '\'' +
                ", mail='" + mail + '\'' +
                ", password='" + password + '\'' +
                ", allergie=" + allergie +
                ", recettes=" + recettes +
                ", avis=" + avis +
                '}';
    }

    public User() {
    }

    public void ajouterRecette(Recettes recette) {
        this.recettes.add(recette);
    }

    public User(String pseudo, String mail, String password) {
        this.pseudo = pseudo;
        this.mail = mail;
        this.password = password;
    }

    public List<Integer> getFavoris() {
        return favoris;
    }

    public void setFavoris(List<Integer> favoris) {
        this.favoris = favoris;
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

    public Set<Recettes> getRecettes() {
        return recettes;
    }

    public void setRecettes(Set<Recettes> recettes) {
        this.recettes = recettes;
    }

    public Set<Avis> getAvis() {
        return avis;
    }

    public void setAvis(Set<Avis> avis) {
        this.avis = avis;
    }
}
