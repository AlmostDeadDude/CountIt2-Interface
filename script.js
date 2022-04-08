const plusTP = document.querySelector('#plus-TP');
const minusTP = document.querySelector('#minus-TP');
const plusFN = document.querySelector('#plus-FN');
const minusFN = document.querySelector('#minus-FN');
const plusFP = document.querySelector('#plus-FP');
const minusFP = document.querySelector('#minus-FP');
const plusTN = document.querySelector('#plus-TN');
const minusTN = document.querySelector('#minus-TN');

const inputT = document.querySelector('#Total');
const inputTP = document.querySelector('#TP');
const inputFN = document.querySelector('#FN');
const inputFP = document.querySelector('#FP');
const inputTN = document.querySelector('#TN');

const inputTPR = document.querySelector('#TPR');
const inputFNR = document.querySelector('#FNR');
const inputFPR = document.querySelector('#FPR');
const inputTNR = document.querySelector('#TNR');
const inputBM = document.querySelector('#BM');
const inputPT = document.querySelector('#PT');
const inputLRplus = document.querySelector('#LRPlus');
const inputLRminus = document.querySelector('#LRMinus');
const inputDOR = document.querySelector('#DOR');
const inputTS = document.querySelector('#TS');
const inputPrevalence = document.querySelector('#Prevalence');
const inputPPV = document.querySelector('#PPV');
const inputFOR = document.querySelector('#FOR');
const inputFDR = document.querySelector('#FDR');
const inputNPV = document.querySelector('#NPV');
const inputMK = document.querySelector('#MK');
const inputACC = document.querySelector('#ACC');
const inputBA = document.querySelector('#BA');
const inputF1 = document.querySelector('#F1');
const inputFM = document.querySelector('#FM');
const inputMCC = document.querySelector('#MCC');

const refresh = document.querySelector('#refresh');
const copy = document.querySelector('#copy');
const notif = document.querySelector('#notification');

const handleValueChange = () => {
    //update total population
    inputT.value = parseInt(inputTP.value) + parseInt(inputFN.value) + parseInt(inputFP.value) + parseInt(inputTN.value);

    //sum up predicted and actual positives and negatives
    let P = parseInt(inputTP.value) + parseInt(inputFN.value)
    let N = parseInt(inputFP.value) + parseInt(inputTN.value)
    let PP = parseInt(inputTP.value) + parseInt(inputFP.value)
    let PN = parseInt(inputFN.value) + parseInt(inputTN.value)

    //true positive rate TPR = TP/P
    let TPR = parseInt(inputTP.value) / P || 0 //to escape NaN
    inputTPR.value = (100 * TPR).toFixed(2) + '%';

    //false negative rate FNR = FN/P
    let FNR = parseInt(inputFN.value) / P || 0
    inputFNR.value = (100 * FNR).toFixed(2) + '%';

    //false positive rate FPR = FP/N
    let FPR = parseInt(inputFP.value) / N || 0
    inputFPR.value = (100 * FPR).toFixed(2) + '%';

    //true negative rate TNR = TN/N
    let TNR = parseInt(inputTN.value) / N || 0
    inputTNR.value = (100 * TNR).toFixed(2) + '%';

    //informedness = TPR + TNR - 1
    let BM = (TPR + TNR - 1) || 0
    inputBM.value = (100 * BM).toFixed(2) + '%';

    //prevalence threshold PT = (sqrt(TPR*FPR)-FPR)/(TPR-FPR)
    let PT = (Math.sqrt(TPR * FPR) - FPR) / (TPR - FPR) || 0
    inputPT.value = (100 * PT).toFixed(2) + '%';

    //positive likelihood ratio LR+ = TPR/FPR
    let LRplus = TPR / FPR || 0
    inputLRplus.value = LRplus.toFixed(2);

    //negative likelihood ratio LR- = FNR/TNR
    let LRminus = FNR / TNR || 0
    inputLRminus.value = LRminus.toFixed(2);

    //diagnostic odds ratio DOR = LR+/LR-
    let DOR = LRplus / LRminus || 0
    inputDOR.value = DOR.toFixed(2);

    //treat score TS = TP / (TP + FN + FP)
    let TS = parseInt(inputTP.value) / (parseInt(inputTP.value) + parseInt(inputFN.value) + parseInt(inputFP.value)) || 0
    inputTS.value = (100 * TS).toFixed(2) + '%';

    //prevalence = P / (P + N)
    let prevalence = P / (P + N) || 0
    inputPrevalence.value = (100 * prevalence).toFixed(2) + '%';

    //positive predictive value PPV = TP / PP
    let PPV = parseInt(inputTP.value) / PP || 0
    inputPPV.value = (100 * PPV).toFixed(2) + '%';

    //false omission rate FOR = FN / PN
    let FOR = parseInt(inputFN.value) / PN || 0
    inputFOR.value = (100 * FOR).toFixed(2) + '%';

    //false discovery rate FDR = FP / PP
    let FDR = parseInt(inputFP.value) / PP || 0
    inputFDR.value = (100 * FDR).toFixed(2) + '%';

    //negative predictive value NPV = TN / PN
    let NPV = parseInt(inputTN.value) / PN || 0
    inputNPV.value = (100 * NPV).toFixed(2) + '%';

    //markedness MK = PPV + NPV - 1
    let MK = (PPV + NPV - 1) || 0
    inputMK.value = MK.toFixed(2);

    //accuracy ACC = (TP + TN) / (P + N)
    let ACC = (parseInt(inputTP.value) + parseInt(inputTN.value)) / (P + N) || 0
    inputACC.value = (100 * ACC).toFixed(2) + '%';

    //balanced accuracy BA = (TPR + TNR) / 2
    let BA = (TPR + TNR) / 2 || 0
    inputBA.value = (100 * BA).toFixed(2) + '%';

    //f1 score F1 = (2 * PPV * TPR) / (PPV + TPR)
    let F1 = (2 * PPV * TPR) / (PPV + TPR) || 0
    inputF1.value = F1.toFixed(2);

    //fowlkes-mallows index FM = sqrt(PPV * TPR)
    let FM = Math.sqrt(PPV * TPR) || 0
    inputFM.value = FM.toFixed(2);

    //matthews correlation coefficient MCC = sqrt(TPR*TNR*PPV*NPV) - sqrt(FNR*FPR*FOR*FDR)
    let MCC = Math.sqrt(TPR * TNR * PPV * NPV) - Math.sqrt(FNR * FPR * FOR * FDR) || 0
    inputMCC.value = MCC.toFixed(2);

    localStorage.setItem('COUNTIT2-total', inputT.value);
    localStorage.setItem('COUNTIT2-TP', inputTP.value);
    localStorage.setItem('COUNTIT2-FN', inputFN.value);
    localStorage.setItem('COUNTIT2-FP', inputFP.value);
    localStorage.setItem('COUNTIT2-TN', inputTN.value);
}

const showNotification = (msg) => {
    notif.classList.add('show');
    notif.innerHTML = msg;
    setTimeout(() => {
        notif.classList.remove('show');
    }, 2000);
}

inputT.value = localStorage.getItem('COUNTIT2-total') || 0;
inputTP.value = localStorage.getItem('COUNTIT2-TP') || 0;
inputFN.value = localStorage.getItem('COUNTIT2-FN') || 0;
inputFP.value = localStorage.getItem('COUNTIT2-FP') || 0;
inputTN.value = localStorage.getItem('COUNTIT2-TN') || 0;
handleValueChange();

plusTP.addEventListener('click', () => {
    inputTP.value = parseInt(inputTP.value) + 1;
    handleValueChange();
});

minusTP.addEventListener('click', () => {
    if (parseInt(inputTP.value) > 0 && parseInt(inputT.value) > 0) {
        inputTP.value = parseInt(inputTP.value) - 1;
        handleValueChange();
    }
});

plusFN.addEventListener('click', () => {
    inputFN.value = parseInt(inputFN.value) + 1;
    handleValueChange();
});

minusFN.addEventListener('click', () => {
    if (parseInt(inputFN.value) > 0 && parseInt(inputT.value) > 0) {
        inputFN.value = parseInt(inputFN.value) - 1;
        handleValueChange();
    }
});

plusFP.addEventListener('click', () => {
    inputFP.value = parseInt(inputFP.value) + 1;
    handleValueChange();
});

minusFP.addEventListener('click', () => {
    if (parseInt(inputFP.value) > 0 && parseInt(inputT.value) > 0) {
        inputFP.value = parseInt(inputFP.value) - 1;
        handleValueChange();
    }
});

plusTN.addEventListener('click', () => {
    inputTN.value = parseInt(inputTN.value) + 1;
    handleValueChange();
});

minusTN.addEventListener('click', () => {
    if (parseInt(inputTN.value) > 0 && parseInt(inputT.value) > 0) {
        inputTN.value = parseInt(inputTN.value) - 1;
        handleValueChange();
    }
});

document.querySelectorAll('input[type="number"]').forEach(input => {
    input.addEventListener('input', handleValueChange);
})

refresh.addEventListener('click', () => {
    inputTP.value = 0;
    inputFN.value = 0;
    inputFP.value = 0;
    inputTN.value = 0;
    inputT.value = 0;
    handleValueChange();
})

document.getElementById('extend').addEventListener('click', () => {
    document.querySelector('.parent').classList.toggle('extended');
})

// copy the text from inputR to clipboard on click
copy.addEventListener('click', () => {
    navigator.clipboard.writeText(`Total population: ${inputT.value} \nTrue positives: ${inputTP.value} \nFalse positives: ${inputFP.value} \nFalse negatives: ${inputFN.value} \nTrue negatives: ${inputTN.value} \nTrue positive rate: ${inputTPR.value} \nFalse negative rate: ${inputFNR.value} \nFalse positive rate: ${inputFPR.value} \nTrue negative rate: ${inputTNR.value} \nPositive predictive value: ${inputPPV.value} \nFalse omission rate: ${inputFOR.value} \nFalse discovery rate: ${inputFDR.value} \nNegative predictive value: ${inputNPV.value} \nPositive likelihood ratio: ${inputLRplus.value} \nNegative likelihood ratio: ${inputLRminus.value} \nInformedness: ${inputBM.value} \nPrevalence threshold: ${inputPT.value} \nPrevalence: ${inputPrevalence.value} \nAccuracy: ${inputACC.value} \nBalanced accuracy: ${inputBA.value} \nF1 score: ${inputF1.value} \nFowlkes-Mallows index: ${inputFM.value} \nMarkedness: ${inputMK.value} \nDiagnostic odds ratio: ${inputDOR.value} \nMatthews correlation coefficient: ${inputMCC.value} \nThreat score: ${inputTS.value}`);
    showNotification('<i class="fas fa-check-circle"></i>&nbsp;&nbsp;Data copied to clipboard!');
});