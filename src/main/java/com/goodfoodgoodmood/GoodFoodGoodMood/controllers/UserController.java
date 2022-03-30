package com.goodfoodgoodmood.GoodFoodGoodMood.controllers;

import com.goodfoodgoodmood.GoodFoodGoodMood.modeles.Information;
import com.goodfoodgoodmood.GoodFoodGoodMood.beans.TypeAllergie;
import com.goodfoodgoodmood.GoodFoodGoodMood.beans.User;
import com.goodfoodgoodmood.GoodFoodGoodMood.repositories.UserRepositories;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/API")
public class UserController {
    @Autowired
    private UserRepositories userRepositories;

    @PostMapping("/connexion")
    public ResponseEntity<String> connexion(@RequestBody User userConnexion, HttpServletResponse response) {
        System.out.println("user : " + userConnexion);
        User user = userRepositories.findByMail(userConnexion.getMail());
        System.out.println();
        if (user != null) {
            // BCrypt.checkpw(passwordEntrer, passwordBase)
            if (BCrypt.checkpw(userConnexion.getPassword(), user.getPassword())) { // On vérifie que les passwords correspondent
                // create a cookie
                Cookie cookie = new Cookie("pseudo", user.getPseudo());
                cookie.setMaxAge(7 * 24 * 60 * 60);
                cookie.setPath("/"); // global cookie accessible every where
                //add cookie to response
                response.addCookie(cookie);
                return ResponseEntity.status(HttpStatus.OK).body("Ok");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erreur mdp");
            }

        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Not ok");
    }

    @PostMapping("/inscription")
    public ResponseEntity<String> inscription(@RequestBody User userSave) {
        System.out.println(userSave);
        User user = userRepositories.findByMail(userSave.getMail());
        System.out.println(user);
        if (user == null) {
            String hashed = BCrypt.hashpw(userSave.getPassword(), BCrypt.gensalt(12));
            User user1 = new User(userSave.getPseudo(), userSave.getMail(), hashed);
            userRepositories.save(user1);
            return ResponseEntity.status(HttpStatus.OK).body("Ok");
        }
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Not ok");
    }

    @GetMapping("/deconnexion")
    public void deconnexion(HttpServletResponse response) {
        Cookie cookie = new Cookie("pseudo", null);
        cookie.setMaxAge(0);
        cookie.setPath("/");

        //add cookie to response
        response.addCookie(cookie);
    }

    @GetMapping("/all-cookies")
    public String readAllCookies(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            return Arrays.stream(cookies)
                    .map(c -> c.getName() + "=" + c.getValue()).collect(Collectors.joining(", "));
        }
        return "No cookies";
    }

    @PatchMapping("/saveAllergie")
    public void saveAllergy(@RequestBody Information obj){
        Collection<TypeAllergie> allergie = new ArrayList<>();
        for(int i=0; i < obj.getAllergies().size(); i++){
            TypeAllergie test = TypeAllergie.valueOf(obj.getAllergies().get(i));
            allergie.add(test);
        }
        User user = userRepositories.findByMail(obj.getMail());
        user.setAllergie(allergie);
        userRepositories.save(user);
    }

    @PatchMapping("/updatePassword")
    public ResponseEntity<String> updatePassword(@RequestBody List<String> obj){
        User user = userRepositories.findByMail(obj.get(0));
        if(user == null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Not ok");
        }else{
            String hashed = BCrypt.hashpw(obj.get(1), BCrypt.gensalt(12));
            user.setPassword(hashed);
            userRepositories.save(user);
            return ResponseEntity.status(HttpStatus.OK).body("Ok");
        }
    }


    @PatchMapping("/test")
    public void saveAllergyTest(){
        User user = userRepositories.findByPseudo("Nat");
        Collection<TypeAllergie> allergies = new ArrayList<>();
        allergies.add(TypeAllergie.Aucun);
        allergies.add(TypeAllergie.Lactose);
        user.setAllergie(allergies);
        userRepositories.save(user);
    }
}
