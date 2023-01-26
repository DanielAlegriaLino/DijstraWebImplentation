export const saveRecord = (start,goal,complexity, ) => {
    let history = getRecords();
    if(history.length > 4){
        history.shift()
    }    
    history.push({ 
        'start':start,
        'goal':goal,
        'complexity':complexity
    })
    localStorage.setItem('history', history)
}

export const getRecords = () => {
    localStorage.getItem("history")
}

