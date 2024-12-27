import { z } from "zod";

export const IngredientSchema = z.object({
  name: z.string(),
  calories: z.number(),
});

export const FoodScanSchema = z.object({
  isFood: z.boolean(),
  foodName: z.string().nullable(),
  totalCalories: z.number().nullable(),
  ingredients: z.array(IngredientSchema).nullable(),
});

export type FoodScanResponse = z.infer<typeof FoodScanSchema>;
