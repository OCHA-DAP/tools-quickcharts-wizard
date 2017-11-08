export interface HdxError {
    fullErrorMessage: string;
    errorSummary: string;
}


export class WizardConfigData {
    step1Sample = true;
    step2Sample = true;
    url: string;
    recipeUrl = 'https://raw.githubusercontent.com/OCHA-DAP/hxl-recipes/master/recipes/hdx/recipe.json';
    hxlCheckError: HdxError = null;
}
