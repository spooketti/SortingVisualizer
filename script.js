let arr
let low
let high 
let barRatioHeight
let barRatioWidth

function createData(siz)
{
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
                isSorted = false;
                let buffer = arr[i]
                arr[i] = arr[i+1]
                arr[i+1] = buffer
            }
        }
        if(isSorted)
        {
            clearInterval(sorter)
            console.log(arr)
        }
    },5)
    
}

visDict = {true:0,false:100}
let vis = false
document.addEventListener("keydown",function(e)
{
    if(e.key == "Tab")
    {
        e.preventDefault()
        vis = !vis
        data_panel.style.transform = `translateX(${visDict[vis]}%)`
    }
})
