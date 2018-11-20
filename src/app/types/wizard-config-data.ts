export interface HdxError {
    fullErrorMessage: string;
    errorSummary: string;
}

export interface QCConfigParams { [s: string]: any; }

export class WizardConfigData {
    step1Sample = true;
    step2Sample = true;
    url: string;
    recipeUrl: string = null;
    hxlCheckError: HdxError = null;

    qcConfig: QCConfigParams = {};
}
