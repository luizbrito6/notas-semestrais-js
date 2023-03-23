var tbody = document.querySelector('table tbody');
var  rows = tbody.rows;

var a = 1;
function adicionarLinha() {
    if (a < 10) {
        a++; 
        tbody.innerHTML += gerarLinha();
    } else {
        alert('Número máximo de alunos adicionadados.');
    }
    
}

var n = 2;
function adicionarColuna() {
    
    
    if (n <= 5) {
        n++; 
        
        gerarTitulo(); // Função na linha 70
        for(var i = 1; i <= rows.length; i++) {

      
            rowBody = document.querySelectorAll(`tbody #linha${i}`)
    
            var novaNota = document.createElement(`td`);

            var inputNota = `<input type='number' class='form-control' id='nota${n}aluno${i}'>`;

            novaNota.innerHTML += inputNota;
    
            referenciaMedia = document.querySelector(`tbody .media${i}`);

            rowBody[0].insertBefore(novaNota, referenciaMedia);
            
        }

        
        
        
    } else {
        alert('Máximo de notas adicionadas.')
    }
    


}

function gerarTitulo() {
    rowThead = document.querySelector('thead tr'); 
        referenciaThead = document.querySelector('#referencia');
        
        var cellThead = document.createElement('th');
        cellThead.setAttribute('scope', 'col'); 
        cellThead.innerHTML += `Nota ${n}`;

        rowThead.appendChild(cellThead);
        rowThead.insertBefore(cellThead, referenciaThead) ;
}

function gerarNota() {
    newNota = ''
    for(var j = 2; j <= n; j++){
        newNota += `<td><input type='number' class='form-control' id="nota${j}aluno${a}"></td>`;
    }
    
    return newNota
        
    
}

function gerarLinha() {

    var newRow = `
    <tr id='linha${a}'>  
        <th>${a}</th> 

        <td><input type='text' class='form-control' id='nome${a}' ></td> 

        <td><input type='number' class='form-control' id="nota1aluno${a}"></td> 

        ${gerarNota()}
 
        <td class='media${a}'><output  id='media${a}'></output></td> 
        
        <td><output id='situacao${a}'></output></td> 

    </tr>`;

    return newRow
    
}

// Tratamente de erro na função abaixo 
function calcularMedia() {

    var mediaGeral = 0;
    var somaGeral = 0;

    for (var x = 1; x <= rows.length; x++) { // Percorre todas as linhas da tabela 

        var media = 0;
        var soma = 0;

        for(var y = 1; y <= n; y++) { // Percorre todas os campos de nota

            var nota = Number(document.getElementById(`nota${y}aluno${x}`).value);
            soma += nota
        }
        
        media = soma / n;   
        somaGeral += media;

        var spanSituacao = document.querySelector(`#situacao${x}`); 

        var nomeAluno = document.querySelector(`#nome${x}`).value;

        if(isNaN(media)) {
            var erroNaN = false; 

        }  else if (nota < 0 || nota > 100) {

            var erroRange = false; 

        } else if (nomeAluno == "") {

            var erroNome = false;  


        } else {

            if (nota <= 45 ) {
                spanSituacao.innerHTML = 'Reprovado';
                spanSituacao.setAttribute('class', 'reprovado');
                
            } else if (nota > 45 && nota <= 65) {
                
                spanSituacao.innerHTML = 'Recuperação';
                spanSituacao.setAttribute('class', 'recuperacao');
                
            } else {
                spanSituacao.innerHTML = 'Aprovado';
                spanSituacao.setAttribute('class', 'aprovado');
                
            }
            
            var output = document.getElementById(`media${x}`).innerHTML = media;  
            
        }
    }

    if(erroNaN == false) {
        alert('Informe todas as notas.');

    }  else if (erroRange == false) {

        alert('Informe notas entre 0 e 100.');

    } else if (erroNome == false) {

        alert('Informe todos os nomes.');
    } 
    
    else {

        mediaGeral = somaGeral / rows.length;
        var spanMediaGeral = document.getElementById('mediaGeral').innerHTML = mediaGeral 

    }

    

    
    
}

// Dicionário com as Keys sendo o nome [Ordem Alfabética]
function dicionario() {

    dados = {}; 

    for (var x = 1; x <= rows.length; x++){

        dadosAlunos = []; 

        var nome = document.querySelector(`#nome${x}`).value; 

        for (var z = 1; z <= n; z++) {
            dadosAlunos.push(document.querySelector(`#nota${z}aluno${x}`).value); 
        }

        dadosAlunos.push(Number(document.querySelector(`#media${x}`).value));

        dadosAlunos.push(document.querySelector(`#situacao${x}`).value);

        dados[nome] = dadosAlunos;

    }

    return dados 

}

// Dicionário com as Keys sendo a média [Ordem Crescente]
function dicionarioCrescente() {

    dadosOrdenacao = {} ;

    for(var x = 1; x <= rows.length; x++) {

        dadosAlunos = []; 

        dadosAlunos.push(document.querySelector(`#nome${x}`).value);

        for (var z = 1; z <= n; z++) {
            dadosAlunos.push(document.querySelector(`#nota${z}aluno${x}`).value); 
        }

        var media = Number(document.querySelector(`#media${x}`).value); 

        dadosAlunos.push(document.querySelector(`#situacao${x}`).value);

        dadosOrdenacao[media] = dadosAlunos;

    } 

    return dadosOrdenacao 

}

function opcaoOrdenacao() {

    var opcao = document.querySelector('select').value; 

    // Ordem alfabética 
    if (opcao == '1') {
    
        var dados = dicionario(); 

        var nomeKeys = Object.keys(dados).sort(); 

        
        for(var j = 1; j <= rows.length; j++){
            
            document.querySelector(`#nome${j}`).value = nomeKeys[j - 1]; // Posiciona o value do input dos nomes de forma alfabetica // 
            
            var nomeAtual = nomeKeys[j - 1]; // Retorna o index referente ao nome do aluno

            for (var k = 1; k <= n; k++) {
                document.querySelector(`#nota${k}aluno${j}`).value = dados[nomeAtual][k - 1];  // Posiciona as notas baseado no nome ordenado
            }

            document.querySelector(`#media${j}`).value = dados[nomeAtual][n]; 

            var situacaoAtual = dados[nomeAtual][n + 1];

            document.querySelector(`#situacao${j}`).value = situacaoAtual;  
            

        } 
    }



    // Ordem crescente 
    if (opcao == '2') {



        var dadosOrdemCrescente = dicionarioCrescente(); 

        
        var mediasKeys = Object.keys(dadosOrdemCrescente).sort((a,b) => {
            if (Number(a)  > Number(b)) return 1;
        }); 
        

        for(var l = 1; l <= rows.length; l++){ 
            
            mediaAtual = mediasKeys[l - 1]; 

            document.querySelector(`#nome${l}`).value = dadosOrdemCrescente[mediaAtual][0];
            
            for(var m = 1; m <= n; m++) {
                document.querySelector(`#nota${m}aluno${l}`).value = dadosOrdemCrescente[mediaAtual][m];  // Posiciona as notas baseado no nome ordenado
            } 
            
            document.querySelector(`#media${l}`).value = mediasKeys[l -1];

            var situacaoAtual = dadosOrdemCrescente[mediaAtual][n + 1];

            document.querySelector(`#situacao${l}`).value = situacaoAtual; 

        }

    }

    if (opcao == '3'){

        var dadosOrdemCrescente = dicionarioCrescente(); 


        var mediasKeys = Object.keys(dadosOrdemCrescente).sort((a,b) => {

            if (Number(a)  > Number(b)) return -1;

        }); 


        for(var l = 1; l <= rows.length; l++){ 
            
            mediaAtual = mediasKeys[l - 1]; 

            document.querySelector(`#nome${l}`).value = dadosOrdemCrescente[mediaAtual][0];
            
            for(var m = 1; m <= n; m++) {
                document.querySelector(`#nota${m}aluno${l}`).value = dadosOrdemCrescente[mediaAtual][m];  // Posiciona as notas baseado no nome ordenado
            } 
            
            document.querySelector(`#media${l}`).value = mediasKeys[l -1];

            var situacaoAtual = dadosOrdemCrescente[mediaAtual][n + 1];

            document.querySelector(`#situacao${l}`).value = situacaoAtual; 

        }


        


    }






}





