const max_history_length = 5

export const saveRecord = (start,goal,complexity) => {
    for(let i = 0; i<max_history_length; i++){
        if(localStorage.getItem(`history${i}`) == undefined){
            localStorage.setItem(`history${i}`,[start,goal,complexity,Date.now()])
            return true
        }
    }
    for(let i = max_history_length-1; i>0; i--){
        localStorage.setItem(`history${i}`,localStorage.getItem(`history${i-1}`))
    }
    let currentTime = `${(new Date()).getHours()}:${(new Date()).getMinutes()}:${(new Date()).getSeconds()}`
    localStorage.setItem(`history0`,[start,goal,complexity,currentTime])
}

export const updateHtmlTable = (TableId) => {
    const table = document.getElementById(TableId)
    table.innerHTML=`<div class="table-row table-head">
    <div class="table-cell">
        <p>Origen</p>
    </div>
    <div class="table-cell">
        <p>Destino</p>
    </div>
    <div class="table-cell before-cell">
        <p>Complejidad</p>
    </div>
    <div class="table-cell last-cell">
        <p>Fecha y Hora</p>
    </div>
</div>`
    for(let i = 0; i<max_history_length; i++){
        if(localStorage.getItem(`history${i}`) == undefined){
            return true
        }
        let record = localStorage.getItem((`history${i}`)).split(",")
        console.log(record[1])
        table.innerHTML+=`        <div class="table-row">
        <div class="table-cell">
            <p>${record[0]}</p>
        </div>
        <div class="table-cell">
            <p>${record[1]}</p>
        </div>
        <div class="table-cell before-cell">
            <p>${record[2]}</p>
        </div>
        <div class="table-cell last-cell">
            <p>${record[3]}</p>
        </div>
    </div>`
    }
}

