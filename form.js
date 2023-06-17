let url_cidades = "https://servicodados.ibge.gov.br/api/v1/localidades/estados/estadoSelecionado/municipios"
let url_estados = "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
//-------------------------------------------------------------------


// máscara do CPF
var cpf = document.getElementById("CPF")

cpf.addEventListener('keypress', () => {

    let tamanho_cpf = cpf.value.length
    if(tamanho_cpf == 3 || tamanho_cpf == 7){
        cpf.value += '.'
    }
    else if(tamanho_cpf == 11){
        cpf.value += '-'
    }

})
//-------------------------------------------------------------------


// máscara do celular
var celular = document.getElementById("celular")

celular.addEventListener('keypress', () => {

    let tamanho_celular = celular.value.length
    if(tamanho_celular == 0){
        celular.value += '('
    }
    else if(tamanho_celular == 3){
        celular.value += ')'
    }
    else if(tamanho_celular == 9){
        celular.value += '-'
    }

})

//-------------------------------------------------------------------


//olhinho da senha
var olho_senha = document.querySelector('#olho_senha');
var senha = document.querySelector('#senha');

olho_senha.addEventListener('click', function (e) {
    // toggle the type attribute
    const type = senha.getAttribute('type') === 'password' ? 'text' : 'password';
    senha.setAttribute('type', type);
    // toggle the eye slash icon
    this.classList.toggle('fa-eye-slash');
});

//-------------------------------------------------------------------


//olhinho da confirmação da senha
const olho_confirmação_senha = document.querySelector('#olho_confirmação_senha');
const confirmação_senha = document.querySelector('#confirmação_senha');

olho_confirmação_senha.addEventListener('click', function (e) {
    const type = confirmação_senha.getAttribute('type') === 'password' ? 'text' : 'password';
    confirmação_senha.setAttribute('type', type);
    this.classList.toggle('fa-eye-slash');
});

//-------------------------------------------------------------------


//função inicial
const init = function(){
    lista_estados()
    lista_cidades()
    document.getElementById('enviar').addEventListener('click', send);
}

//-------------------------------------------------------------------


//função que é chamada quando o botão de enviar é apertado
const send = function(ev){

    ev.preventDefault(); 
    ev.stopPropagation();
    let fails = validate();

    if(fails.length == 0){
        //good to go
        //alert("O formulário foi enviado com sucesso.")
        var dict = {} //dicionário que armazena as respostas


        //armazenando cada elemento do form no dicionário
        let nome = document.getElementById('nome')
        dict['nome'] = nome.value
        let sobrenome = document.getElementById('sobrenome')
        dict['sobrenome'] = sobrenome.value
        let email = document.getElementById('email')
        dict['email'] = email.value
        let cpf = document.getElementById('CPF')
        dict['cpf'] = cpf.value
        let masculino = document.getElementById('masculino')
        dict['masculino'] = masculino.value
        let feminino = document.getElementById('feminino')
        dict['feminino'] = feminino.value
        let nascimento = document.getElementById('nascimento')
        dict['nascimento'] = nascimento.value
        let endereço = document.getElementById('endereço')
        dict['endereço'] = endereço.value
        let celular = document.getElementById('celular')
        dict['celular'] = celular.value
        let profissão = document.getElementById('profissão')
        dict['profissão'] = profissão.value
        let informações_adicionais = document.getElementById('informações_adicionais')
        dict['informações_adicionais'] = informações_adicionais.value
        let estado = document.getElementById('estado')
        dict['estado'] = estado.value
        let cidade = document.getElementById('cidade')
        dict['cidade'] = cidade.value
        let senha = document.getElementById('senha')
        dict['senha'] = senha.value
        dict = [dict]
        
        document.getElementById('formulário').submit()
        localStorage.setItem('formulário de '+nome.value+' '+sobrenome.value, JSON.stringify(dict))

    }else{
        
        //there are some errors to display
        fails.forEach(function(obj){
            let field = document.getElementById(obj.input);
            console.log(obj.msg)
            field.setCustomValidity(obj.msg);
            field.reportValidity();
        })
    }
}
//-------------------------------------------------------------------


//essa é uma função auxiliar que também é chamada quando o botão enviar
//é apertado
const validate = function(ev){
    
    var failures = [];

    //verificando se os campos obrigatórios estão preenchidos
    //isso é útil para navegadores em que o required do html não funciona
    var nome = document.getElementById("nome");
    if(nome.value === ''){
        failures.push({input:'nome', msg:'Preencha o nome.'})
    }

    var sobrenome = document.getElementById("sobrenome");
    if(sobrenome.value === ''){
        failures.push({input:'sobrenome', msg:'Preencha o sobrenome.'})
    }

    var email = document.getElementById("email");
    if(email.value === ''){
        failures.push({input:'email', msg:'Preencha o email.'})
    }

    var cpf = document.getElementById("CPF");
    if(cpf.value === ''){
        failures.push({input:'CPF', msg:'Preencha o CPF.'})
    }
      
    var gêneros = document.querySelectorAll('input[name="gênero"]');
    var selecionado = '';
    for (var gênero of gêneros){
        if (gênero.checked){
            selecionado = gênero.value;
            break;
        }
    }
    if(selecionado === ''){
        failures.push({input:'masculino', msg:'Preencha o gênero.'})
    }

    var nascimento = document.getElementById('nascimento');
    if(nascimento.value === 'dd/mm/aaaa'){
        failures.push({input:'nascimento', msg:'Preencha o nascimento.'})
    }

    var endereço = document.getElementById("endereço");
    if(endereço.value === ''){
        failures.push({input:'endereço', msg:'Preencha o endereço.'})
    }

    var celular = document.getElementById("celular");
    if(celular.value === ''){
        failures.push({input:'celular', msg:'Preencha o celular.'})
    }

    var profissão = document.getElementById("profissão");
    if(profissão.value === ''){
        failures.push({input:'profissão', msg:'Preencha a profissão.'})
    }

    var estado = document.getElementById("estado");
    if(estado.value === ''){
        failures.push({input:'estado', msg:'Preencha o estado.'})
    }

    var cidade = document.getElementById("cidade");
    if(cidade.value === ''){
        failures.push({input:'cidade', msg:'Preencha a cidade.'})
    }

    var senha = document.getElementById('senha');
    if(senha.value === ''){
        failures.push({input:'senha', msg:'Preencha a senha.'})
    }

    var confirmação_senha = document.getElementById('confirmação_senha');
    if(confirmação_senha.value === ''){
        failures.push({input:'confirmação_senha', msg:'Preencha a senha.'})
    }

    var aceito_termos = document.getElementById('aceito_termos');
    if(!aceito_termos.checked){
        failures.push({input:'aceito_termos', msg:'Aceite os termos.'})
    }


    //verificando se o email contém o @
    if(!email.value.includes('@')){
        failures.push({input:'email', msg:'Insira um email válido.'})
    }

    //verificando se o cpf é válido
    if(!(/[0-9]{3}[\.][0-9]{3}[\.][0-9]{3}[\-][0-9]{2}/.test(cpf.value))){
        if(cpf.value.length < 14){
            failures.push({input:'CPF', msg:'O CPF deve ter exatamente 11 números.'})
        }
        else{
            failures.push({input:'CPF', msg:'O CPF deve conter somente números.'})
        }    
    }

    //verificando se o celular é válido
    if(!(/[\(][0-9]{2}[\)][0-9]{5}[\-][0-9]{4}/.test(celular.value))){
        if(celular.value.length < 14){
            failures.push({input:'celular', msg:'O celular deve ter exatamente 11 números.'})
        }
        else{
            failures.push({input:'celular', msg:'O celular deve conter somente números.'})
        }    
    }

    //verificando se ambas as senhas são iguais
    if(!(senha.value === confirmação_senha.value)){
        failures.push({input:'senha', msg:'Ambas as senhas devem ser iguais.'})
    }

    //verificando se a senha tem no mínimo 5 chars,
    //no máximo 30 chars, no mínimo uma letra maiúscula,
    //no mínimo 1 número, no mínimo um caractere especial
    function senhaValida(senha){

        var retorno = false;//variável que diz se a senha é válida ou n
        var letrasMaiusculas = /[A-Z]/;//regex de letras maiúsculas
        var numeros = /[0-9]/;//regex de números
        var caracteresEspeciais = /[!|@|#|$|%|^|&|*|(|)|-|_]/;//regex de caracteres especiais
        

        if(senha.length > 30){//se a senha tem mais que 30 chars
            return retorno;
        }
        if(senha.length < 5){//se a senha tem menos que 5 chars
            return retorno;
        }


        var auxMaiuscula = 0;//variáveis auxiliares para contagem
        var auxNumero = 0;
        var auxEspecial = 0;


        for(var i=0; i<senha.length; i++){//iterando caractere por caractere
            if(letrasMaiusculas.test(senha[i]))//se é uma letra maiúscula
                auxMaiuscula++;
            else if(numeros.test(senha[i]))//se é um número
                auxNumero++;
            else if(caracteresEspeciais.test(senha[i]))//se é um caractere especial
                auxEspecial++;
        }


        if (auxMaiuscula > 0){//tem pelo menos uma maiúscula
            if (auxNumero > 0){//tem pelo menos um número
                if (auxEspecial > 0){//tem pelo menos um caractere especial
                    retorno = true;//senha é válida
                }
            }
        }
        return retorno;//se a senha n é válida
    }

    if(!senhaValida(senha.value)){//se a senha n é válida
        failures.push({input:'senha', msg:'A senha deve ser preenchida da seguinte forma: no mínimo 5 dígitos e no máximo 30, com no mínimo uma letra maiúscula, um número e um caractere especial.'})
    }


    //verificando se a data é válida
    function isValidDate(dateString){
        // First check for the pattern
        if(/\d{2}\/\d{2}\/\d{4}/.test(dateString))
            return false;

        // Parse the date parts to integers
        var parts = dateString.split("-");
        var day = parseInt(parts[2], 10);
        var month = parseInt(parts[1], 10);
        var year = parseInt(parts[0], 10);

        // Check the ranges of month and year
        if(year < 1000 || year > 3000 || month == 0 || month > 12)
            return false;

        var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

        // Adjust for leap years
        if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
            monthLength[1] = 29;

        // Check the range of the day
        return day > 0 && day <= monthLength[month - 1];
    };


    if(!isValidDate(nascimento.value)){
        failures.push({input:'nascimento', msg:'Insira uma data válida.'})
    }

    //fim das validações

    //retornando as falhas
    return failures;
}

//-------------------------------------------------------------------

//em relação à listagem de estados e cidades

const fazGet = function(url){//essa função pega a lista de estados/cidades
    let request = new XMLHttpRequest()
    request.open("GET", url, false)
    request.send()
    return request.responseText
}

const lista_estados = function(){//função que adiciona a lista de estados
                                //ao select do form

    var json = fazGet(url_estados) //conteúdo raw que vem do site do ibge
    var data = JSON.parse(json) //transformando essa string raw em um json
    //pq fica mais fácil de analisar com um json
    var select_estado = document.getElementById('estado')
    var lista = [] //lista que vai guarda os nomes dos estados
    data.forEach(estado => {
        lista.push(estado.nome+' ('+estado.sigla+')')
    })
    lista.sort() //ordenando a lista alfabeticamente
    lista.forEach(estado =>{
        var option = document.createElement('option')
        option.textContent = estado
        select_estado.append(option)
    })

}

const lista_cidades = function(){//função que adiciona a lista de cidades
                                //ao select do form conforme o estado selecionado

    var estado_selecionado = document.getElementById('estado')
    var UF = estado_selecionado.value.split('(')[1] //kkkkkkkkk
    UF = UF.replace(')','') //aceitável
    url = url_estados.split('estadoSelecionado') //aceitável tbm
    url = url[0]+'/'+UF+'/municipios'
    var json = fazGet(url) //conteúdo raw que vem do site do ibge
    var data = JSON.parse(json) //transformando essa string raw em um json
    //pq fica mais fácil de analisar com um json
    var select_cidade = document.getElementById('cidade')

    function remove_options(){//tem que limpar os options do select ;-;
                            //para toda vez que há alteração no estado selecionado
        document.getElementById("cidade").innerHTML = "";   
    }
    remove_options()

    var lista = [] //lista que vai guarda os nomes das cidades
    data.forEach(cidade => {
        lista.push(cidade.nome)
    })
    lista.sort() //ordenando a lista alfabeticamente
    lista.forEach(cidade =>{
    var option = document.createElement('option')
    option.textContent = cidade
    select_cidade.append(option)
    })

}

document.getElementById("estado").addEventListener('change', lista_cidades);
//note que a alteração da lista das cidades só ocorre mediante alguma mudança
//no estado selecionado

//-------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', init);
//em relação aos erros de inserção pelo usuário