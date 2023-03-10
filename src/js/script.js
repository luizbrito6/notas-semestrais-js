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


// ---------------------------------------------------------------------------------------------------------------//



function calcularMedia() {

    var mediaGeral = 0;
    var somaGeral = 0;

    for (var x = 1; x <= rows.length; x++) {

        var media = 0;
        var soma = 0;

        for(var y = 1; y <= n; y++) {

            var nota = parseFloat(document.getElementById(`nota${y}aluno${x}`).value);

            soma += nota
        }

        media = soma / n;   
        somaGeral += media;

        // Tratamento de erro de digitação 
        if(isNaN(nota)) {
            alert('Informe todas as notas.');
        
        
        } else if (nota > 100 ) {
            
            alert('Informe uma nota entre 0 e 100.');

        } else {

            var spanSituacao = document.querySelector(`#situacao${x}`); 

            if (nota < 0 ) {
                alert('Informe uma nota positiva ou igual a 0.')

            } else if (nota <= 45 ) {
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
        // Tratamento de erro de digitação 

        
        
        
        
    }

    mediaGeral = somaGeral / (rows.length);
    var spanMediaGeral = document.getElementById('mediaGeral').innerHTML = mediaGeral.toFixed(2)
    
}



