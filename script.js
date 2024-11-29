let input1=document.getElementById('input-1')
let input2=document.getElementById('input-2')
let box3=document.getElementById('box-3')
let adicionar=document.getElementById('adicionar')
let totalTarefas=0
let contador=document.getElementById('contador')
adicionar.addEventListener('click',()=>{
    if(input1.value===''||input2.value===''){
        alert('Por favor, preencha todos os campos.')
    }else{
        let dvExterior=document.createElement('div')
        dvExterior.classList.add('dv-exterior')

    let dvInterior=document.createElement('div')
        dvInterior.classList.add('dv-interior')

    let paragrafo=document.createElement('p')
        paragrafo.classList.add('tarefa')
        paragrafo.textContent=input1.value

    let dvDataEtiqueta=document.createElement('div')
        dvDataEtiqueta.classList.add('dt-et')

    let etiqueta=document.createElement('p')
        etiqueta.classList.add('etiqueta')
        etiqueta.textContent=input2.value

    let data=document.createElement('p')
        data.classList.add('data')
        data.textContent='Criado em:'

    let conclua=document.createElement('button')
        conclua.classList.add('concluir')
        conclua.textContent='Concluir'

        box3.appendChild(dvExterior)
        dvExterior.appendChild(dvInterior)
        dvExterior.appendChild(conclua)
        dvInterior.appendChild(paragrafo)
        dvInterior.appendChild(dvDataEtiqueta)
        dvDataEtiqueta.appendChild(etiqueta)
        etiqueta.textContent=''

        dvDataEtiqueta.appendChild(data)

    totalTarefas++
    contador.innerText=totalTarefas.toString()

    input1.value=''
    input2.value=''
    }
})