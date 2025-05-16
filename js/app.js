const output = document.getElementById("outputResult");
const equals = document.getElementById("equals");
const buttons = document.querySelectorAll(".button"); // Seleciona todos os botões
const returnTextField = document.getElementById("returnTextField");

// Adiciona o evento de clique a cada botão
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const type = button.getAttribute("data-type"); // Obtém o tipo do botão
        const value = button.getAttribute("data-value"); // Obtém o valor do botão
        controlCenter(type, value); // Chama a função com o tipo e o valor
    });
});

document.addEventListener("keydown", (event) => {
    const key = event.key.toUpperCase(); // Obtém a tecla pressionada
    buttons.forEach((button) => {
        const type = button.getAttribute("data-type"); // Obtém o tipo do botão
        const value = button.getAttribute("data-value"); // Obtém o valor do botão

        // Verifica se a tecla pressionada corresponde ao valor do botão
        if (key === value) {
            controlCenter(type, value);
            button.focus();
        }
    });
});

var fieldText = "";
var errorMessage = "";
function throwMessageError(message) {

    var errorMessage = message;
    returnTextField.innerHTML = errorMessage;
    returnTextField.style.display = "block";
    returnTextField.style.color = "red";
}
function throwApprovementMessage(message) {
    var approvementMessage = message;
    returnTextField.innerHTML = approvementMessage;
    returnTextField.style.display = "block";
    returnTextField.style.color = "green";
}

function resetMessageError() {
    returnTextField.style.display = "none";
}

function verifyIfHasNumbers() {
    const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const regex = /\d/
    const hasNumber = regex.test(fieldText);

    if (!hasNumber) {
        throwMessageError("A operação deve conter ao menos um numero");
        return false;
    }
    else {
        return true;
    }
}

function resetResultField() {
    fieldText = "";
    output.value = "";
}

function controlCenter(type, value) {


    if (!value) {
        console.log("O VALOR nao pode ser vazio!");
        throwMessageError("O VALOR nao pode ser vazio!");
        return;
    }
    if (!type) {
        console.log("O TIPO nao pode ser vazio!");
        throwMessageError("O TIPO nao pode ser vazio!");
        return
    }
    resetMessageError()

    if (type === "action") {
        console.log("Esse é um botão de ação!");

        actionFunction(type, value);
    }
    if (type === "number") {
        console.log("Esse é um botão com NUMEROS!");
        numberFunction(type, value);

    }
    console.log(`Tipo:"${type}". Valor:"${value}"`);
}

function actionFunction(type, value) {
    if (type !== "action") {
        console.log("Chamada de função errada");
        throwMessageError("Chamada de função errada!");
        return;
    }

    const verifyValueAction = () => {


        if (value === "C" || value === "c") {

            if (fieldText !== "") {
                fieldText = "";
                output.value = "";
                throwApprovementMessage("Campo esvaziado!");
            }
            else {
                throwMessageError("O campo de texto já está vazio!");
            }


        }
        else if (value === "=") {
            if (verifyIfHasNumbers()) {
                try {

                    if (fieldText !== "") { //Campo de texto nao está vazio
                        fieldText = eval(output.value);
                        output.value = fieldText;
                    }
                    else if (fieldText === "") { // Campo de texto está vazio
                        throwMessageError("Aperte algo para fazer uma operação.");
                    }
                } catch (error) {
                    throwMessageError("Operação invalida!");
                    resetResultField();
                }
            }



        }
    };
    const verifyOperators = () => {
        if ((value === '+') || (value === '-') || (value === '/') || (value === '*') || (value === '.') || (value === '(') || (value === ')')) {
            fieldText += value;
            output.value = fieldText;
        }
    };
    verifyValueAction();
    verifyOperators();

}

function numberFunction(type, value) {
    if (type !== "number") {
        console.log("Chamada de função errada");
        return;
    }

    fieldText += value;
    output.value = fieldText;

}