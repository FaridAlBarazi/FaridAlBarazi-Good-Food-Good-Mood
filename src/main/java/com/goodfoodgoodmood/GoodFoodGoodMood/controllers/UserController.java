package com.goodfoodgoodmood.GoodFoodGoodMood.controllers;

import com.goodfoodgoodmood.GoodFoodGoodMood.beans.*;
import com.goodfoodgoodmood.GoodFoodGoodMood.modeles.Information;
import com.goodfoodgoodmood.GoodFoodGoodMood.repositories.AvisRepositories;
import com.goodfoodgoodmood.GoodFoodGoodMood.repositories.RecetteFavoriRepositories;
import com.goodfoodgoodmood.GoodFoodGoodMood.repositories.RecetteRepositories;
import com.goodfoodgoodmood.GoodFoodGoodMood.repositories.UserRepositories;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/API")
public class UserController {
    @Autowired
    private UserRepositories userRepositories;

    @Autowired
    private AvisRepositories avisRepositories;

    @Autowired
    private RecetteRepositories recetteRepositories;

    @Autowired
    private RecetteFavoriRepositories recetteFavoriRepositories;

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

                Cookie cookie2 = new Cookie("mail", user.getMail());

                //Cookie cookie3 = new Cookie("vi ", "test");
                cookie.setMaxAge(7 * 24 * 60 * 60);
                //cookie3.setMaxAge(7 * 24 * 60 * 60);
                cookie.setPath("/"); // global cookie accessible every where
                cookie2.setMaxAge(7 * 24 * 60 * 60);
                //cookie3.setPath("/");
                cookie2.setPath("/"); // global cookie accessible every where
                //add cookie to response

                response.addCookie(cookie2);
                response.addCookie(cookie);
                //response.addCookie(cookie3);

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

        Cookie cookie2 = new Cookie("mail", null);
        cookie2.setMaxAge(0);
        cookie2.setPath("/");
        //add cookie to response
        response.addCookie(cookie);
        response.addCookie(cookie2);
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
    public void saveAllergy(@RequestBody Information obj) {
        Collection<TypeAllergie> allergie = new ArrayList<>();
        for (int i = 0; i < obj.getAllergies().size(); i++) {
            TypeAllergie test = TypeAllergie.valueOf(obj.getAllergies().get(i));
            allergie.add(test);
        }
        User user = userRepositories.findByMail(obj.getMail());
        user.setAllergie(allergie);
        userRepositories.save(user);
    }

    @PatchMapping("/updatePassword")
    public ResponseEntity<String> updatePassword(@RequestBody List<String> obj) {
        User user = userRepositories.findByMail(obj.get(0));
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Not ok");
        } else {
            String hashed = BCrypt.hashpw(obj.get(1), BCrypt.gensalt(12));
            user.setPassword(hashed);
            userRepositories.save(user);
            return ResponseEntity.status(HttpStatus.OK).body("Ok");
        }
    }

    @PatchMapping("/recuperationRecetteUser")
    public String recuperationRecetteUser(@RequestBody Recettes recette, HttpServletRequest request) {
        System.out.println("Recettttte" + recette);
        // Si c'est l'utilisateur qui enregistre une recette alors ok
        if(recette.getSource().equals("utilisateur")){
            Cookie[] cookies = request.getCookies();
            User user = userRepositories.findByMail(cookies[0].getValue());
            Set<Recettes> recettesList = user.getRecettes();
            user.getRecettes().add(recette);
            //System.out.println(cookies[0].getValue());
            userRepositories.save(user);
            return "ok";
        }else{ // Sinon on vérifie si l'id recette api n'est pas enregistré en base
            // pour éviter les doublons
            Recettes rec = recetteRepositories.findByIdApiRecette(recette.getIdApiRecette());
            System.out.println(rec);
            if(rec == null){
                Cookie[] cookies = request.getCookies();
                User user = userRepositories.findByMail(cookies[0].getValue());
                Set<Recettes> recettesList = user.getRecettes();
                user.getRecettes().add(recette);
                //System.out.println(cookies[0].getValue());
                userRepositories.save(user);
                return "ok";
            }else{
                return "pas ok";
            }
        }
        // Recherche si recette existe déjà en base


    }

    @GetMapping("/nbrRecettesUser")
    public int nbrRecettes(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        // Récupération user
        User user = userRepositories.findByMail(cookies[0].getValue());
        //System.out.println(user.getRecettes().size());

        // Récupération liste recette user
        Set<Recettes> recettesSet = user.getRecettes();

        // On cherche à récupérer que les recettes de source utilisateur
        // Création d'une nouvelle liste
        List<Recettes> recettesList = new ArrayList<>();
        for(Recettes recette : recettesSet){
            // Si la source == utilisateur on rajoute la recette dans la liste créée recettesList
            if(recette.getSource().equals("utilisateur")){
                recettesList.add(recette);
            }
        }
        return recettesList.size();
    }

    @GetMapping("/allRecettesPubliees")
    public Set<Recettes> allRecettesPubliees(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        User user = userRepositories.findByMail(cookies[0].getValue());
        //System.out.println(user.getRecettes());
        return user.getRecettes();
    }

    @GetMapping("/nbrAvisUser")
    public int nbrAvis(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        User user = userRepositories.findByMail(cookies[0].getValue());
        //System.out.println(user.getAvis().size());
        return user.getAvis().size();
    }

    @GetMapping("/allAvisUser")
    public Set<Avis> allAvisUser(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        User user = userRepositories.findByMail(cookies[0].getValue());
        //System.out.println(user.getAvis());
        return user.getAvis();
    }

    @PatchMapping("/recuperationAvisUser")
    public String recuperationAvis(@RequestBody Avis monAvis, HttpServletRequest request) {
        //System.out.println(monAvis);
        Cookie[] cookies = request.getCookies();
        System.out.println("cookie: "+cookies[0].getValue());
        User user = userRepositories.findByMail(cookies[0].getValue());
        System.out.println("user: "+user);
        Set<Avis> avisSet = user.getAvis();
        user.getAvis().add(monAvis);
        //System.out.println(cookies[0].getValue());
        userRepositories.save(user);
        return "ok";
    }

    @PatchMapping("/addFavoris")
    public String addFavoris(@RequestBody RecetteFavoris idRecette, HttpServletRequest request) {
        RecetteFavoris recetteFavoris = recetteFavoriRepositories.findByIdRecetteAPI(idRecette.getIdRecetteAPI());

        //System.out.println(idRecette);
        if(recetteFavoris == null){
            Cookie[] cookies = request.getCookies();
            User user = userRepositories.findByMail(cookies[0].getValue());
            Set<RecetteFavoris> favorisList = user.getFavoris();
            favorisList.add(idRecette);
            //System.out.println(cookies[0].getValue());
            userRepositories.save(user);
            return "ok";
        }
        return "pas ok";
    }

    @PatchMapping("/removeFavoris")
    public String removeFavoris(@RequestBody int idRecette, HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        // Recuperation user
        User user = userRepositories.findByMail(cookies[0].getValue());
        //Set<RecetteFavoris> favorisList = user.getFavoris();
        RecetteFavoris recetteFavoris = recetteFavoriRepositories.findByIdRecetteAPI(idRecette);
        //System.out.println("recette favori : " + recetteFavoris);
        //System.out.println("user avant : " + user);

        user.getFavoris().remove(recetteFavoris);
        //System.out.println("user après : " + user);
        userRepositories.save(user);
        return "ok";
    }

    @PatchMapping("/removeAvis")
    public String removeAvis(@RequestBody int idAvis, HttpServletRequest request) {
        System.out.println(idAvis);
        Cookie[] cookies = request.getCookies();
        // Recuperation user
        User user = userRepositories.findByMail(cookies[0].getValue());

        // Tous les avis user
        Set<Avis> mesAvis = user.getAvis();

        // Récupère avis à supprimer
        Avis monAvis=avisRepositories.findByID(idAvis);


        System.out.println("mon avis : " +monAvis);
        System.out.println("user avant : " + user);

        //Retirer cet avis de user
        mesAvis.remove(monAvis);

        System.out.println("user après : " + user);
        userRepositories.save(user);
        return "ok";
    }

    @PatchMapping("/removeRecettePublie")
    public String removeRecettePublie(@RequestBody int idRecette, HttpServletRequest request) {
        System.out.println(idRecette);
        Cookie[] cookies = request.getCookies();
        // Recuperation user
        User user = userRepositories.findByMail(cookies[0].getValue());

        // Tous les avis user
        Set<Recettes> mesAvis = user.getRecettes();

        // Récupère avis à supprimer
        Recettes recette=recetteRepositories.findByID(idRecette);


        System.out.println("recette : " +recette);
        System.out.println("user avant : " + user);

        //Retirer cet avis de user
        mesAvis.remove(recette);

        System.out.println("user après : " + user);
        userRepositories.save(user);
        return "ok";
    }

    /*@PatchMapping("/removeFavorisID")
    public String removeFavorisID(@RequestBody int index, HttpServletRequest request) {
        System.out.println("index : " + index);

        // Cookies
        Cookie[] cookies = request.getCookies();

        // Récupération du user
        User user = userRepositories.findByMail(cookies[0].getValue());

        // Récupération de la liste des favoris du user
        Set<RecetteFavoris> favorisList = user.getFavoris();

        // Enlever un élement de la liste
        System.out.println("favorisList avant : " + favorisList);
        favorisList.remove(index);
        System.out.println("favorisList apres : " + favorisList);

        userRepositories.save(user);
        return "ok";
    }*/


    @GetMapping("/nbrFavoris")
    public int nbrFavoris(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        User user = userRepositories.findByMail(cookies[0].getValue());
        return user.getFavoris().size();
    }

    @GetMapping("/getfavoris")
    public Set<RecetteFavoris> getfavoris(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        User user = userRepositories.findByMail(cookies[0].getValue());
        return user.getFavoris();
    }

    @PatchMapping("/test")
    public void saveAllergyTest() {
        User user = userRepositories.findByPseudo("Nat");
        Collection<TypeAllergie> allergies = new ArrayList<>();
        allergies.add(TypeAllergie.Aucun);
        allergies.add(TypeAllergie.Lactose);
        user.setAllergie(allergies);
        userRepositories.save(user);
    }


}
