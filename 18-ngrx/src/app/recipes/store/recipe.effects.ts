import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, withLatestFrom } from 'rxjs';
import { Recipe } from '../recipe.model';

import { Store } from '@ngrx/store'
import * as fromApp from '../../store/app.reducer'
import * as RecipesActions from './recipe.actions';

@Injectable()
export class RecipeEffects {
  constructor(private actions$: Actions, private http: HttpClient, private store: Store<fromApp.AppState>) {}

  @Effect()
  fetchRecipes = this.actions$.pipe(
    ofType(RecipesActions.FETCH_RECIPES),
    switchMap(() => {
      return this.http.get<Recipe[]>(
        'https://angular-demo-d974e-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json'
      );
    }),
    map((recipes) => {
      return recipes.map((recipe) => {
        return {
          ...recipe,
          ingredients: recipe.ingredients ? recipe.ingredients : [],
        };
      });
    }),
    map(recipes => {
        return new RecipesActions.SetRecipes(recipes);
    })
  );

  @Effect({ dispatch: false })
  storeRecipes = this.actions$.pipe(
      ofType(RecipesActions.STORE_RECIPES),
      withLatestFrom(this.store.select('recipes')),
      switchMap(([actionData, recipesState]) => {
        return this.http
        .put(
          'https://angular-demo-d974e-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json',
          recipesState.recipes
        )
      })
  )
}
