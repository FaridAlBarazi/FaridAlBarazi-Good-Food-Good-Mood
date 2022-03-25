package com.goodfoodgoodmood.GoodFoodGoodMood.controllers;

import com.goodfoodgoodmood.GoodFoodGoodMood.beans.User;
import com.goodfoodgoodmood.GoodFoodGoodMood.repositories.UserRepositories;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/API")
public class UserController {
    @Autowired
    private UserRepositories userRepositories;

    @GetMapping("/connexion")
    public void connexion(@RequestBody User user){

    }

    @PostMapping("/inscription")
    public void inscription(@RequestBody User userSave){
        User user = userRepositories.findByPseudo(userSave.getPseudo());
        System.out.println(user);
        if(userSave != null){
            String hashed = BCrypt.hashpw(userSave.getPassword(), BCrypt.gensalt(12));
            User user1 = new User(userSave.getPseudo(), userSave.getMail(), hashed, userSave.getAllergie());
            userRepositories.save(user1);
        }
    }

}
