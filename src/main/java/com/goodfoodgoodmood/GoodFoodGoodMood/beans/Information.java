package com.goodfoodgoodmood.GoodFoodGoodMood.beans;

import java.util.List;

public class Information {
    List<String> allergies;
    String username;

    public Information(List<String> allergies, String username) {
        this.allergies = allergies;
        this.username = username;
    }

    public Information() {
    }

    public List<String> getAllergies() {
        return allergies;
    }

    public void setAllergies(List<String> allergies) {
        this.allergies = allergies;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
