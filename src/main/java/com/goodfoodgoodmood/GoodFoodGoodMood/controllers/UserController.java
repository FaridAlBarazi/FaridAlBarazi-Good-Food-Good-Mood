package com.goodfoodgoodmood.GoodFoodGoodMood.controllers;

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
import java.net.http.HttpResponse;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/API")
public class UserController {
    @Autowired
    private UserRepositories userRepositories;

    @PostMapping("/connexion")
    public ResponseEntity<String> connexion(@RequestBody User userConnexion, HttpServletResponse response) {
        User user = userRepositories.findByPseudo(userConnexion.getPseudo());
        if (user != null) {
            // BCrypt.checkpw(passwordEntrer, passwordBase)
            if (BCrypt.checkpw(userConnexion.getPassword(), user.getPassword())) { // On vérifie que les passwords correspondent
                // create a cookie
                Cookie cookie = new Cookie("pseudo", userConnexion.getPseudo());
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
        User user = userRepositories.findByPseudo(userSave.getPseudo());
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
    public void saveAllergy(@RequestBody Collection<TypeAllergie> allergies, String userName){
        System.out.println("aallerrgieee  : " +allergies);
        System.out.println("useeeerrr : " + userName);
        User user = userRepositories.findByPseudo(userName);
        user.setAllergie(allergies);
        userRepositories.save(user);
    }

    @PatchMapping("/test")
    public void saveAllergyTest(){
        User user = userRepositories.findByPseudo("Nath");
        Collection<TypeAllergie> allergies = new ArrayList<>();
        allergies.add(TypeAllergie.Aucun);
        allergies.add(TypeAllergie.Lactose);
        user.setAllergie(allergies);
        userRepositories.save(user);
    }
}
