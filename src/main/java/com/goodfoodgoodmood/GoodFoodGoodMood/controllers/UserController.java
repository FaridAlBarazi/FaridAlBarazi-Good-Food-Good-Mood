package com.goodfoodgoodmood.GoodFoodGoodMood.controllers;

import com.goodfoodgoodmood.GoodFoodGoodMood.repositories.UserRepositories;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/API")
public class UserController {
    @Autowired
    private UserRepositories userRepositories;

    @GetMapping("/connexion")
    public void connexion(){


    }
}
