import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { RecipeService } from "../services/recipe.service";
import { ToastrService } from 'ngx-toastr';
import Quill from 'quill';
import { environment } from "src/environments/environment";
import { NgbModal, ModalDismissReasons, NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { NgForm } from '@angular/forms';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import * as english from "../../shared/translation/english";
import * as dutch from "../../shared/translation/dutch";



@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class RecipeDetailComponent implements OnInit {

  recipe = {
    nameEn: "", nameNl: "", recipeEn: "", recipeNl: "", time: "", videoUrl: "", recipeUrl: "", pricing: "", mealType: [], specification: [],
    carbs: [], protein: [], fats: [], fruits: [], vegetables: [], herbs: [], recipeType: [], alcogolicBeverages: [], totalIngredients: []
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
  carbs = [];
  protein = [];
  fats = [];
  fruits = [];
  vegetables = [];
  herbs = [];
  alcoholicBeverages = [];
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

  public config: PerfectScrollbarConfigInterface = {};

  dropdownSettings = {};

  searchField = "";
  search = []

  language = "";
  english = english;
  dutch = dutch;

  constructor(private modalService: NgbModal, private router: Router, private actRoute: ActivatedRoute, private recipeS: RecipeService, private toastr: ToastrService) {
    this.language = localStorage.getItem("language");
  }

  ngOnInit(): void {
    this.recipeS.getSingleRecipe(this.actRoute.snapshot.params.recipeId).subscribe(res => {
      if (res.status == true) {
        this.recipe = res.data;
        console.log(res.data);
        this.sum.carbs = res.data.totalCarbs;
        this.sum.fruits = res.data.totalFruits;
        this.sum.vegetables = res.data.totalVegetables;
        this.sum.herbs = res.data.totalHerbs;
        this.sum.protein = res.data.totalProtein;
        this.sum.fats = res.data.totalFats;
        this.sum.alcoholicBeverages = res.data.totalAlcoholicBeverages;
        this.sum.nonAlcoholicDrinks = res.data.totalNonAlcoholicDrinks;
        this.sum.composedMeals = res.data.totalComposedMeals;
        this.totalIngredientSum = res.data.totalIngredientSum;
        this.recipe.totalIngredients = [];
      }
    })

    this.recipeS.getAllCarbs().subscribe(res => {
      if (res.status === true) {
        this.carbs = res.data
        //console.log(this.carbs)
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

    this.dropdownSettings = {
      singleSelection: false,
      idField: '_id',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      limitSelection: 1,
      closeDropDownOnSelection: true
    };

  }


  created(event: Quill) {
    // tslint:disable-next-line:no-console
    console.log('editor-created', event)
  }

  AddRecipe() {
    console.log(this.recipe)

    this.recipe['sum'] = this.sum;
    this.recipe['totalIngredientSum'] = this.totalIngredientSum;
    this.recipeS.updateRecipe(this.recipe, this.file).subscribe(res => {
      // console.log(res)
      if (res.status == true) {
        this.toastr.success("Recipe Published!", 'Success!', { timeOut: 3000, closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
        setTimeout(() => this.router.navigateByUrl('/recipes/all'), 1000)
      } else {
        this.toastr.error(res.message, 'Oops!', { timeOut: 3000, closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
      }
    })
  }

  addTotalCarbs() {
    if (this.recipe.carbs.length > 0) {
      console.log('carbs available')
      var totalCarbs = 0;
      this.recipe.carbs.forEach((data) => {
        console.log(data);
        totalCarbs += data.grams
      })
      var carbsSum = {
        totalCarbs: totalCarbs
      }
      this.recipe.totalIngredients.push(carbsSum);
      console.log(totalCarbs)
      console.log(this.recipe.totalIngredients)
    }
  }
  addTotalFats() {
    if (this.recipe.fats.length > 0) {
      console.log('carbs available')
      var totalFats = 0;
      this.recipe.fats.forEach((data) => {
        console.log(data);
        totalFats += data.grams
      })
      var fatsSum = {
        totalFats: totalFats
      }
      this.recipe.totalIngredients.push(fatsSum);
      console.log(totalFats)
      console.log(this.recipe.totalIngredients)
    }
  }
  addTotalVegetables() {
    if (this.recipe.vegetables.length > 0) {
      console.log('carbs available')
      var totalVeges = 0;
      this.recipe.vegetables.forEach((data) => {
        console.log(data);
        totalVeges += data.grams
      })
      var vegesSum = {
        totalVegetables: totalVeges
      }
      this.recipe.totalIngredients.push(vegesSum);
      console.log(totalVeges)
      console.log(this.recipe.totalIngredients)
    }
  }
  addTotalProteins() {
    if (this.recipe.protein.length > 0) {
      console.log('carbs available')
      var totalProteins = 0;
      this.recipe.protein.forEach((data) => {
        console.log(data);
        totalProteins += data.grams
      })
      var proteinSum = {
        totalProtein: totalProteins
      }
      this.recipe.totalIngredients.push(proteinSum);
      console.log(totalProteins)
      console.log(this.recipe.totalIngredients)
    }
  }
  addTotalFruits() {
    if (this.recipe.fruits.length > 0) {
      console.log('carbs available')
      var totalFruits = 0;
      this.recipe.fruits.forEach((data) => {
        console.log(data);
        totalFruits += data.grams
      })
      var fruitsSum = {
        totalFruits: totalFruits
      }
      this.recipe.totalIngredients.push(fruitsSum);
      console.log(totalFruits)
      console.log(this.recipe.totalIngredients)
    }
  }
  addTotalHerbs() {
    if (this.recipe.herbs.length > 0) {
      console.log('carbs available')
      var totalHerbs = 0;
      this.recipe.herbs.forEach((data) => {
        console.log(data);
        totalHerbs += data.grams
      })
      var herbsSum = {
        totalHerbs: totalHerbs
      }
      this.recipe.totalIngredients.push(herbsSum);
      console.log(totalHerbs)
      console.log(this.recipe.totalIngredients)
    }
  }
  addTotalAlcoholicBeverages() {
    if (this.recipe.alcogolicBeverages.length > 0) {
      console.log('carbs available')
      var totalAlcogolicBeverages = 0;
      this.recipe.alcogolicBeverages.forEach((data) => {
        console.log(data);
        totalAlcogolicBeverages += data.grams
      })
      var totalAlcogolicBeveragesSum = {
        totalAlcogolicBeverages: totalAlcogolicBeverages
      }
      this.recipe.totalIngredients.push(totalAlcogolicBeveragesSum);
      console.log(totalAlcogolicBeveragesSum)
      console.log(this.recipe.totalIngredients)
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
    // console.log(meal)
    let check = this.recipe.mealType.includes(meal);
    // console.log("Check:",check)
    if (check === true) {
      this.recipe.mealType = this.recipe.mealType.filter(ele => ele != meal);
      // console.log("Meal from True:",this.recipe.mealType);
    } else {
      this.recipe.mealType.push(meal);
      // console.log("Meal from false:",this.recipe.mealType)
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

  addCarb(form: NgForm) {
    // console.log(this.carb)
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
      // console.log("Carb from false:",this.recipe.carbs)
    }
  }

  addfruit(form: NgForm) {
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
      // console.log("Fruit from false:",this.recipe.fruits)
    }
  }
  addvegetable(form: NgForm) {
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
      // console.log("Vegetable from false:",this.recipe.vegetables)
    }
  }
  addherb(form: NgForm) {
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
      // console.log("herb from false:",this.recipe.herbs)
    }
  }
  addprotein(form: NgForm) {
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
      // console.log("Protein from false:",this.recipe.protein)
    }
  }
  addfat(form: NgForm) {
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
      // console.log("Fat from false:",this.recipe.fats)
    }
  }

  addAlcoholicBeverage(form: NgForm) {
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
      // console.log("Fat from false:",this.recipe.fats)
    }
  }


  EditCarbs(editCarb) {
    // this.carbs = (this.recipe.carbs)?this.recipe.carbs:[];
    console.log("carbs Array", this.carbs)
    this.modalService.open(editCarb, { windowClass: "dark-modal", size: 'lg' });
  }

  SearchCarbs(e) {
    console.log(e.target.value)
    const val = e.target.value;
    const temp = this.carbs.filter(d => {
      return d.nameEn.indexOf(val) != -1 || !val;
    });
    console.log(temp)
    console.log(this.searchField)
    // update the rows
    this.search = temp;
    // console.log(this.carbs)



  }

  selectedCarb(c) {
    console.log("Selected Carb", c);
  }

  toggle() {
    document.getElementById("myDropdown").classList.toggle("show");
  }

  onItemSelect(item: any) {
    console.log(item);
    //  console.log  (this.partnersData.find(e=>{ return e.name == item}))
    // const partner = this.partnersData.find(e => { return e.name == item })
    // this.user.referBy = partner._id;
  }

  onItemDeSelect(item: any) {

  }

}
