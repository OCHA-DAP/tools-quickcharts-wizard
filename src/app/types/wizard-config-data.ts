export interface HdxError {
    fullErrorMessage: string;
    errorSummary: string;
}


export class WizardConfigData {
    step1Sample = true;
    step2Sample = true;
    url: string;
    recipeUrl = 'https://raw.githubusercontent.com/OCHA-DAP/hxl-recipes/1.0.0/cookbook-library.json';
    hxlCheckError: HdxError = null;
}
