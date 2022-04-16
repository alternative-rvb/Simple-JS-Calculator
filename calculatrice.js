const inputResultat = document.querySelector("#resultat");
const divTouches = document.querySelector("#touches");
const divRecap = document.querySelector("#recap");

var chiffreSaisi = "";
var operateur = "+";
var recap = "";
var resultat = 0;

var nbCalcul = 0;
var reinit = true;

divTouches.addEventListener("click", function (e) {
    var button = e.target.id;
    if (button.substring(0, 1) === "c") {
        chiffreSaisi += button.substring(1, 2);
        inputResultat.value = chiffreSaisi;
    } else if (button.substring(0, 1) === "b") {
        manageOperation();
        switch (button) {
            case "bPlus": operateur = "+";
                break;
            case "bMin": operateur = "-";
                break;
            case "bDiv": operateur = "/";
                break;
            case "bMul": operateur = "*";
                break;
            default:
                break;
        }
        if(reinit){
            recap = "";
            reinit = false;
        }
        if (nbCalcul > 1) recap += "<br />";
        recap += resultat + " " + operateur + " ";
    } else if (button === "point") {
        chiffreSaisi += ".";
    } else if (button === "egal") {
        manageOperation();
        recap += " = " + resultat;
        nbCalcul = 1;
        reinit = true;
    }
    divRecap.innerHTML = recap;
    divRecap.scrollTop = divRecap.scrollHeight - divRecap.clientHeight;
});

function manageOperation() {
    if (chiffreSaisi !== "") {
        resultat = doOperation(operateur, resultat, parseFloat(chiffreSaisi));
        if (nbCalcul > 0) {
            recap += parseFloat(chiffreSaisi);
        }
        inputResultat.value = resultat;
        chiffreSaisi = "";
        nbCalcul++;
    } else {
        var position = recap.lastIndexOf("<br />");
        recap = recap.substring(0, position);
    }
}

function doOperation(operateur, chiffreA, chiffreB) {
    var calcul = 0;
    switch (operateur) {
        case "+": calcul = chiffreA + chiffreB;
            break;
        case "-": calcul = chiffreA - chiffreB;
            break;
        case "*": calcul = chiffreA * chiffreB;
            break;
        case "/": calcul = chiffreA / chiffreB;
            break;

        default:
            break;
    }
    return calcul;
}