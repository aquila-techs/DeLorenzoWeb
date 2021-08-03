import { Component, OnInit } from '@angular/core';
import Quill from 'quill';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ToastrService } from 'ngx-toastr';
import { RecipeService } from "../services/recipe.service";
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';
import * as english from "../../shared/translation/english";
import * as dutch from "../../shared/translation/dutch";

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})

export class AddRecipeComponent implements OnInit {

  recipe = {
    nameEn: "", nameNl: "", recipeEn: "", recipeNl: "", time: "", videoUrl: "", recipeUrl: "", pricing: "", mealType: [], specification: [],
    carbs: [], protein: [], fats: [], fruits: [], vegetables: [], herbs: [], recipeType: [], alcogolicBeverages: [],
    nonAlcoholicDrinks: [], composedMeals: []
  }

  mType = ["Vegan", "Vegetarian", "Omnivore"];
  rType = ["Breakfast", "lunch", "Snack", "Dinner"];
  specification = ["Gluten Free", "Lactose Free", "High Carb", "High Fat", "High Protein"];
  ingredient = {} as any;
  grams = "";
  carb = {} as any;
  fruit = {} as any;
  prot = {} as any;
  fat = {} as any;
  vegetable = {} as any;
  herb = {} as any;
  alcoholicBeverage = {} as any;
  nonAlcoholicBeverage = {} as any;
  composedMeal = {} as any;
  carbs = [];
  protein = [];
  fats = [];
  fruits = [];
  vegetables = [];
  herbs = [];
  alcoholicBeverages = [];
  nonAlcoholicBeverages = [];
  composedMeals = [];

  fileName;
  file;
  imageUrl: string | ArrayBuffer = "";
  totalIngredientSum = 0;
  sum = {
    carbs: 0,
    fruits: 0,
    vegetables: 0,
    herbs: 0,
    protein: 0,
    fats: 0,
    alcoholicBeverages: 0,
    nonAlcoholicDrinks: 0,
    composedMeals: 0
  }

  language = "";
  english = english;
  dutch = dutch;

  public config: PerfectScrollbarConfigInterface = {};
  constructor(private toastr: ToastrService, private router: Router, private recipeS: RecipeService) {
    this.language = localStorage.getItem("language");
   }

  ngOnInit(): void {
    this.recipeS.getAllCarbs().subscribe(res => {
      console.log('carbs =====> ', res)
      if (res.status === true) {
        this.carbs = res.data
      }
    })
    this.recipeS.getAllFruits().subscribe(res => {
      if (res.status === true) {
        this.fruits = res.data
      }
    })
    this.recipeS.getAllHerbs().subscribe(res => {
      if (res.status === true) {
        this.herbs = res.data
      }
    })
    this.recipeS.getAllProtein().subscribe(res => {
      if (res.status === true) {
        this.protein = res.data
      }
    })
    this.recipeS.getAllVegetables().subscribe(res => {
      if (res.status === true) {
        this.vegetables = res.data
      }
    })
    this.recipeS.getAllfats().subscribe(res => {
      if (res.status === true) {
        this.fats = res.data
      }
    })
    this.recipeS.getAllAlcoholicBeverages().subscribe(res => {
      console.log('getAllAlcoholicBeverages =======> ', res);
      if (res.status === true) {
        this.alcoholicBeverages = res.data
      }
    })
    this.recipeS.getAllNonAlcoholicBeverages().subscribe(res => {
      console.log('nonAlcoholicBeverages =======> ', res);
      if (res.status === true) {
        this.nonAlcoholicBeverages = res.data
      }
    })
    this.recipeS.getAllComposedMeals().subscribe(res => {
      console.log('composedMeals =======> ', res);
      if (res.status === true) {
        this.composedMeals = res.data
      }
    })
  }


  created(event: Quill) {
    // tslint:disable-next-line:no-console
    console.log('editor-created', event)
  }

  AddRecipe() {
    this.recipe['sum'] = this.sum;
    this.recipe['totalIngredientSum'] = this.totalIngredientSum;
    console.log(this.recipe);

    this.recipeS.createRecipe(this.recipe, this.file).subscribe(res => {
      if (res.status == true) {
        this.toastr.success("Recipe Published!", 'Success!', { timeOut: 3000, closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
        setTimeout(() => this.router.navigateByUrl('/recipes/all'), 1000)
      } else {
        this.toastr.error(res.message, 'Oops!', { timeOut: 3000, closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
      }
    })
  }

  totalIngredients() {
    // for (var key in this.sum) {
    //   this.totalIngredientSum += this.sum[key];
    // };
    this.totalIngredientSum = this.sum.carbs +
                              this.sum.fats +
                              this.sum.vegetables +
                              this.sum.fruits +
                              this.sum.herbs +
                              this.sum.protein +
                              this.sum.alcoholicBeverages +
                              this.sum.nonAlcoholicDrinks +
                              this.sum.composedMeals
  }

  addTotalCarbs(carbs) {
    if (this.recipe.carbs.length > 0) {
      this.sum.carbs += carbs;
      console.log(this.sum.carbs)
      this.totalIngredients();
    }
  }
  addTotalFats(fats) {
    if (this.recipe.fats.length > 0) {
      this.sum.fats += fats;
      this.totalIngredients();
    }
  }
  addTotalVegetables(vegetables) {
    if (this.recipe.vegetables.length > 0) {
      this.sum.vegetables += vegetables;
      this.totalIngredients();
    }
  }
  addTotalProteins(protein) {
    if (this.recipe.protein.length > 0) {
      this.sum.protein += protein;
      this.totalIngredients();
    }
  }
  addTotalFruits(fruits) {
    if (this.recipe.fruits.length > 0) {
      this.sum.fruits += fruits;
      this.totalIngredients();
    }
  }
  addTotalHerbs(herbs) {
    if (this.recipe.herbs.length > 0) {
      this.sum.herbs += herbs;
      this.totalIngredients();
    }
  }
  addTotalAlcoholicBeverages(alcogolicBeverages) {
    if (this.recipe.alcogolicBeverages.length > 0) {
      this.sum.alcoholicBeverages += alcogolicBeverages;
      this.totalIngredients();
    }
  }
  addTotalNonAlcoholicDrinks(nonAlcoholicDrinks) {
    if (this.recipe.nonAlcoholicDrinks.length > 0) {
      this.sum.nonAlcoholicDrinks += nonAlcoholicDrinks;
      this.totalIngredients();
    }
  }
  addTotalComposedMeals(composedMeals) {
    if (this.recipe.composedMeals.length > 0) {
      this.sum.composedMeals += composedMeals;
      this.totalIngredients();
    }
  }

  onChange(file: File) {
    // console.log(file)
    if (file) {
      this.fileName = file.name;
      this.file = file;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = event => {
        this.imageUrl = reader.result;
      };
    }
  }

  addMealType(meal) {
    console.log(meal)
    let check = this.recipe.mealType.includes(meal);
    // console.log("Check:",check)
    if (check === true) {
      this.recipe.mealType = this.recipe.mealType.filter(ele => ele != meal);
      // console.log("Meal from True:",this.recipe.mealType);
    } else {
      this.recipe.mealType.push(meal);
      console.log("Meal from false:", this.recipe.mealType)
    }
  }

  addRecipeType(meal) {
    console.log(meal)
    let check = this.recipe.recipeType.includes(meal);
    // console.log("Check:",check)
    if (check === true) {
      this.recipe.recipeType = this.recipe.recipeType.filter(ele => ele != meal);
      // console.log("Meal from True:",this.recipe.recipeType);
    } else {
      this.recipe.recipeType.push(meal);
      // console.log("Meal from false:",this.recipe.recipeType)
    }
  }

  addSpecification(spec) {
    let check = this.recipe.specification.includes(spec);
    if (check === true) {
      this.recipe.specification = this.recipe.specification.filter(ele => ele != spec);
    } else {
      this.recipe.specification.push(spec);
    }
  }

  addCarb(form: NgForm, carbs) {
    console.log(carbs);
    let check = this.recipe.carbs.some(ele => ele.ingredient._id == this.carb.ingredient._id);
    // console.log("Check:",check)
    if (check === true) {
      this.toastr.info("Already Added!", 'Error!', { timeOut: 3000, closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
      //  console.log("Carb from true:",this.recipe.carbs)
    } else {
      let totalkCal = this.carb.grams * this.carb.ingredient.value;
      this.carb.kCal = totalkCal;
      this.recipe.carbs.push(this.carb);
      this.carb = {};
      this.addTotalCarbs(carbs);
      // console.log("Carb from false:",this.recipe.carbs)
    }
  }

  addfruit(form: NgForm, fruits) {
    // console.log(this.fruit)
    let check = this.recipe.fruits.some(ele => ele.ingredient._id == this.fruit.ingredient._id);
    // console.log("Check:",check)
    if (check === true) {
      this.toastr.info("Already Added!", 'Error!', { timeOut: 3000, closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
      //  console.log("Fruit from true:",this.recipe.fruits)
    } else {
      let totalkCal = this.fruit.grams * this.fruit.ingredient.value;
      this.fruit.kCal = totalkCal;
      this.recipe.fruits.push(this.fruit);
      this.fruit = {};
      this.addTotalFruits(fruits);
      // console.log("Fruit from false:",this.recipe.fruits)
    }
  }
  addvegetable(form: NgForm, vegetables) {
    // console.log(this.vegetable)
    let check = this.recipe.vegetables.some(ele => ele.ingredient._id == this.vegetable.ingredient._id);
    // console.log("Check:",check)
    if (check === true) {
      this.toastr.info("Already Added!", 'Error!', { timeOut: 3000, closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
      //  console.log("Vegetable from true:",this.recipe.vegetables)
    } else {
      let totalkCal = this.vegetable.grams * this.vegetable.ingredient.value;
      this.vegetable.kCal = totalkCal;
      this.recipe.vegetables.push(this.vegetable);
      this.vegetable = {};
      this.addTotalVegetables(vegetables)
      // console.log("Vegetable from false:",this.recipe.vegetables)
    }
  }
  addherb(form: NgForm, herbs) {
    // console.log(this.herb)
    let check = this.recipe.herbs.some(ele => ele.ingredient._id == this.herb.ingredient._id);
    // console.log("Check:",check)
    if (check === true) {
      this.toastr.info("Already Added!", 'Error!', { timeOut: 3000, closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
      //  console.log("Herb from true:",this.recipe.herbs)
    } else {
      let totalkCal = this.herb.grams * this.herb.ingredient.value;
      this.herb.kCal = totalkCal;
      this.recipe.herbs.push(this.herb);
      this.herb = {};
      this.addTotalHerbs(herbs);
      // console.log("herb from false:",this.recipe.herbs)
    }
  }
  addprotein(form: NgForm, protein) {
    // console.log(this.protein)
    let check = this.recipe.protein.some(ele => ele.ingredient._id == this.prot.ingredient._id);
    // console.log("Check:",check)
    if (check === true) {
      this.toastr.info("Already Added!", 'Error!', { timeOut: 3000, closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
      //  console.log("Protein from true:",this.recipe.protein)
    } else {
      let totalkCal = this.prot.grams * this.prot.ingredient.value;
      this.prot.kCal = totalkCal;
      this.recipe.protein.push(this.prot);
      this.prot = {};
      this.addTotalProteins(protein)
      // console.log("Protein from false:",this.recipe.protein)
    }
  }
  addfat(form: NgForm, fats) {
    // console.log(this.fat)
    let check = this.recipe.fats.some(ele => ele.ingredient._id == this.fat.ingredient._id);
    // console.log("Check:",check)
    if (check === true) {
      this.toastr.info("Already Added!", 'Error!', { timeOut: 3000, closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
      //  console.log("Fat from true:",this.recipe.fats)
    } else {
      let totalkCal = this.fat.grams * this.fat.ingredient.value;
      this.fat.kCal = totalkCal;
      this.recipe.fats.push(this.fat);
      this.fat = {};
      this.addTotalFats(fats)
      // console.log("Fat from false:",this.recipe.fats)
    }
  }

  addAlcoholicBeverage(form: NgForm, alcogolicBeverages) {
    // console.log(this.fat)
    let check = this.recipe.alcogolicBeverages.some(ele => ele.ingredient._id == this.alcoholicBeverage.ingredient._id);
    console.log("Check:", check)
    if (check === true) {
      this.toastr.info("Already Added!", 'Error!', { timeOut: 3000, closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
      //  console.log("Fat from true:",this.recipe.fats)
    } else {
      let totalkCal = this.alcoholicBeverage.grams * this.alcoholicBeverage.ingredient.value;
      this.alcoholicBeverage.kCal = totalkCal;
      this.recipe.alcogolicBeverages.push(this.alcoholicBeverage);
      this.alcoholicBeverage = {};
      this.addTotalAlcoholicBeverages(alcogolicBeverages)
      // console.log("Fat from false:",this.recipe.fats)
    }
  }

  addNonAlcoholicDrink(form: NgForm, nonAlcoholicDrinks) {
    // console.log(this.fat)
    let check = this.recipe.nonAlcoholicDrinks.some(ele => ele.ingredient._id == this.nonAlcoholicBeverage.ingredient._id);
    console.log("Check:", check)
    if (check === true) {
      this.toastr.info("Already Added!", 'Error!', { timeOut: 3000, closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
      //  console.log("Fat from true:",this.recipe.fats)
    } else {
      let totalkCal = this.nonAlcoholicBeverage.grams * this.nonAlcoholicBeverage.ingredient.value;
      this.nonAlcoholicBeverage.kCal = totalkCal;
      this.recipe.nonAlcoholicDrinks.push(this.nonAlcoholicBeverage);
      this.nonAlcoholicBeverage = {};
      this.addTotalNonAlcoholicDrinks(nonAlcoholicDrinks)
      // console.log("Fat from false:",this.recipe.fats)
    }
  }

  addComposedMeal(form: NgForm, composedMeals) {
    // console.log(this.fat)
    let check = this.recipe.composedMeals.some(ele => ele.ingredient._id == this.composedMeal.ingredient._id);
    console.log("Check:", check)
    if (check === true) {
      this.toastr.info("Already Added!", 'Error!', { timeOut: 3000, closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
      //  console.log("Fat from true:",this.recipe.fats)
    } else {
      let totalkCal = this.composedMeal.grams * this.composedMeal.ingredient.value;
      this.composedMeal.kCal = totalkCal;
      this.recipe.composedMeals.push(this.composedMeal);
      this.composedMeal = {};
      this.addTotalComposedMeals(composedMeals)
      // console.log("Fat from false:",this.recipe.fats)
    }
  }

}
