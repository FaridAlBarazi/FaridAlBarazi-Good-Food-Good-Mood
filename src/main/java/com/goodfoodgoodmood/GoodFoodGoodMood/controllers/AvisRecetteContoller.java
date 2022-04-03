package com.goodfoodgoodmood.GoodFoodGoodMood.controllers;

import com.goodfoodgoodmood.GoodFoodGoodMood.beans.AvisRecette;
import com.goodfoodgoodmood.GoodFoodGoodMood.beans.User;
import com.goodfoodgoodmood.GoodFoodGoodMood.repositories.AvisRecetteRepositories;
import com.goodfoodgoodmood.GoodFoodGoodMood.repositories.UserRepositories;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/API")
public class AvisRecetteContoller {
    @Autowired
    private UserRepositories userRepositories;

    @Autowired
    private AvisRecetteRepositories avisRecetteRepositories;

    @GetMapping("/nbrAvisRecetteUser")
    public int nbrAvisRecetteUser(HttpServletRequest request){
        Cookie[] cookies = request.getCookies();
        User user = userRepositories.findByMail(cookies[0].getValue());
        List<AvisRecette> avisRecettes = avisRecetteRepositories.findByIdUtilisateur(user.getID());
        System.out.println(avisRecettes.size());
        return avisRecettes.size();

    }

    @GetMapping("/allAvisRecetteUser")
    public List<AvisRecette> allAvisRecetteUser(HttpServletRequest request){
        Cookie[] cookies = request.getCookies();
        User user = userRepositories.findByMail(cookies[0].getValue());
        List<AvisRecette> avisRecettes = avisRecetteRepositories.findByIdUtilisateur(user.getID());
        return avisRecettes;

    }
}
