package com.goodfoodgoodmood.GoodFoodGoodMood.modeles;

import java.util.List;

public class Information { // utiliser dans user controler dans JS besoin de deux parametre
    List<String> allergies;
    String mail;

    @Override
    public String toString() {
        return "Information{" +
                "allergies=" + allergies +
                ", mail='" + mail + '\'' +
                '}';
    }

    public Information(List<String> allergies, String mail) {
        this.allergies = allergies;
        this.mail = mail;
    }

    public Information() {
    }

    public List<String> getAllergies() {
        return allergies;
    }

    public void setAllergies(List<String> allergies) {
        this.allergies = allergies;
    }

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }
}
