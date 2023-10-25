let arr
let low
let high 
let barRatioHeight
let barRatioWidth
let chosenAlg = ""
let finished = true;

function createData(siz)
{
    data_graph.innerHTML = ""
    arr = []
    for(let i=1;i<=siz;i++)
    {
        arr.push(i)
    }
    arr=shuffle(arr)
    low = Math.min(...arr)
    high = Math.max(...arr)
    barRatioHeight = 100/high
    barRatioWidth = 100/arr.length
    data_graph.style.gridTemplateColumns = `repeat(${arr.length},1fr)`
    for(let i=0;i<arr.length;i++)
    {
        let bar = document.createElement("div")
        bar.id = arr[i]
        //bar.dataset.val = arr
        bar.className = "bar"
        // bar.style.width = `${barRatioWidth * arr[i]}%`
        bar.style.height = `${barRatioHeight * arr[i]}%`
        data_graph.appendChild(bar)
    }

}
let data_graph = document.getElementById("data-graph")
let data_panel = document.getElementById("data-panel")
let redBar = document.getElementById("tempbar")


function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex > 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

function bubbleSort()
{
    let isSorted = false;
    let sorter = setInterval(() =>
    {
        redBar.style.backgroundColor = "white"
       // console.log("h")
        isSorted = true
        for(let i=0;i<arr.length;i++)
        {
            if(arr[i]>arr[i+1])
            {
                    let a =  document.getElementById(arr[i])
                    let b = document.getElementById(arr[i+1])
                    a.style.height = `${barRatioHeight * arr[i+1]}%`
                    b.style.height = `${barRatioHeight * arr[i]}%`
                    a.id = arr[i+1]
                    b.id = arr[i]
                    redBar.style.backgroundColor = "white"
                    b.style.backgroundColor = "red"
                    redBar = b
                isSorted = false;
                let buffer = arr[i]
                arr[i] = arr[i+1]
                arr[i+1] = buffer
            }
        }
        if(isSorted)
        {
            clearInterval(sorter)
            let i=0;
            let finishInterval = setInterval(() => {
                //console.log(i)
                document.getElementById(arr[i].toString()).style.backgroundColor = "lime"
                i++
                if(i>=arr.length)
                {
                    clearInterval(finishInterval)
                    finished = true
                }
            }, 1);
        }
    },5)
    
}

function selectionSort()
{
 
    // One by one move boundary of unsorted subarray
    let i=0;
    let sorter = setInterval(() => {
        let min_idx = i;
        redBar.style.backgroundColor = "white"
        for (let j = i + 1; j < arr.length; j++)
        if (arr[j] < arr[min_idx])
            min_idx = j;
 
        // Swap the found minimum element with the first element
        //swap(arr,min_idx, i);
        let a =  document.getElementById(arr[i])
                    let b = document.getElementById(arr[min_idx])
                    a.style.height = `${barRatioHeight * arr[min_idx]}%`
                    b.style.height = `${barRatioHeight * arr[i]}%`
                    a.id = arr[min_idx]
                    b.id = arr[i]
                    redBar.style.backgroundColor = "white"
                    b.style.backgroundColor = "red"
                    redBar = b
                    
        let temp = arr[min_idx];
        arr[min_idx] = arr[i];
        arr[i] = temp;

        if(i>=arr.length-1)
        {
            clearInterval(sorter)
            let i=0;
            let finishInterval = setInterval(() => {
                //console.log(i)
                document.getElementById(arr[i].toString()).style.backgroundColor = "lime"
                i++
                if(i>=arr.length)
                {
                    clearInterval(finishInterval)
                    finished = true
                }
            }, 1);
        }
        i++
        
        
},5)
}
/*
let min_idx = i;
         for (let j = i + 1; j < arr.length; j++)
         if (arr[j] < arr[min_idx])
             min_idx = j;
  
         // Swap the found minimum element with the first element
         //swap(arr,min_idx, i);
         let a =  document.getElementById(arr[i])
                     let b = document.getElementById(arr[min_idx])
                     a.style.height = `${barRatioHeight * arr[min_idx]}%`
                     b.style.height = `${barRatioHeight * arr[i]}%`
                     a.id = arr[min_idx]
                     b.id = arr[i]
         let temp = arr[min_idx];
         arr[min_idx] = arr[i];
         arr[i] = temp;
    for (let i = 0; i < arr.length-1; i++)
    {
        // Find the minimum element in unsorted array
        let min_idx = i;
        for (let j = i + 1; j < arr.length; j++)
        if (arr[j] < arr[min_idx])
            min_idx = j;
 
        // Swap the found minimum element with the first element
        //swap(arr,min_idx, i);
        let a =  document.getElementById(arr[i])
                    let b = document.getElementById(arr[min_idx])
                    a.style.height = `${barRatioHeight * arr[min_idx]}%`
                    b.style.height = `${barRatioHeight * arr[i]}%`
                    a.id = arr[min_idx]
                    b.id = arr[i]
        let temp = arr[min_idx];
        arr[min_idx] = arr[i];
        arr[i] = temp;
    }
*/

visDict = {true:0,false:100}
let vis = false
document.addEventListener("keydown",function(e)
{
    if(e.key == "Tab" && finished)
    {
        e.preventDefault()
        vis = !vis
        data_panel.style.transform = `translateX(${visDict[vis]}%)`
    }
})

function setAlg(alg)
{
    
    chosenAlg = alg
    if(document.getElementById("numDat").value <= 1)
    {
        return
    }

    document.getElementById("ChosenAlg").innerText = chosenAlg
    createData(document.getElementById("numDat").value)
}

function beginSort()
{
    if(chosenAlg == "")
    {
        return
    }
    vis = false
    data_panel.style.transform = `translateX(200%)`
    finished = false
    switch(chosenAlg)
    {
        case "Bubble":
        bubbleSort()
        break;

        case "Selection":
        selectionSort()
        break;
    }
    

}