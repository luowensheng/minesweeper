

document.addEventListener("DOMContentLoaded", ()=>{

    const Ratios = {
                'easy': 10/(9*9), 
                'intermediate': 40/(16*16), 
                'expert': 99/(16*40), 
    }
    const LEVEL = 'easy'
    let width =  200
    let height =  200
   
    let tileColumnWidthRatio = 10/200
    let tileColumnHeightRatio = 10/200
   
    let containerWidthTileRatio = 20/200
    let containerHeightTileRatio = 20/200

    let tileWith = containerWidthTileRatio * width
    let tileHeight = containerHeightTileRatio * height
    
    let numberOfTilesByColumn = tileColumnWidthRatio* width
    let numberOfTilesByRow = tileColumnHeightRatio* height
    
    let NumberOfTiles = numberOfTilesByRow * numberOfTilesByColumn


    const isBomb = ()=>(Math.random()>Ratios[LEVEL])?0: 1

    const bombs = []
    let NumberOfBombs = 0 
    for(let i = 0; i<numberOfTilesByColumn; i++){
        let bombRow = []
        for(let j = 0; j<numberOfTilesByRow; j++){
            let bomb = isBomb()
            NumberOfBombs+=bomb
            bombRow.push(bomb)
        }
        bombs.push(bombRow) 
    }

    const GameOver = ()=>{
            for(let i = 0; i<numberOfTilesByColumn; i++)
            for(let j = 0; j<numberOfTilesByRow; j++){
                if(bombs[i][j]==1)
                    document.querySelector(`div[position="${i},${j}"`).innerHTML = getBomb()
            }
    }
 
    function propagate(i, j){
        console.log("Propagating")
        for(let n=-1; n<=1; n++)
            for(let m=-1; m<=1; m++)
                try{
                    let el =  document.querySelector(`div[position="${i+n},${j+m}"`)
                    if (el==null) continue
                    if (bombs[i+n][j+m]==1) continue
                    el.click()
                }
            catch(error){
                console.error(error)
            }
    }


    const bombDiv = createItem("div", document.body, {id: "bombCounter"}, {width:"20px", 
                                                      height:"20px",
                                                      background:"gray",
                                                    }, 
                                                      NumberOfBombs)
    
    const container = createItem("div", 
                                    document.body,
                                    {id: "container"}, 
                                    {
                                        width: `${width}px`,
                                        height:`${height}px`,
                                        "grid-template-columns": `repeat(${numberOfTilesByColumn}, 1fr)`,
                                        "grid-template-rows": `repeat(${numberOfTilesByRow}, 1fr)`,

                                    })
    const getNBombs = (r, c)=>{
          let counter = 0
          for(let i=-1; i<=1; i++)
            for(let j=-1; j<=1; j++){
                let bombArr = bombs[r+i] 
                if (bombArr!=undefined){
                    let bomb =  bombArr[c+j]
                    if (bomb!=undefined)
                        counter+=bomb                 
                }

            }
          return counter
    }

    let gameOver = false

    for(let i = 0; i<numberOfTilesByColumn; i++){
        for(let j = 0; j<numberOfTilesByRow; j++){

            const tile = createItem("div", 
                                    container, 
                                    {class: "tile", position:`${i},${j}`}, 
                                    {
                                        width: `${tileWith-2}px`,
                                        height:`${tileHeight-2}px`,
                                    }
                                    );
            
            const bomb = bombs[i][j]
            let clicked = false
            let tileColor = tile.style["background-color"]            

            tile.addEventListener('click', ()=>{
                            if(clicked || gameOver || tile.style["background-color"] != tileColor) return

                            clicked = true

                            if (bomb==1){
                                tile.innerHTML = getBomb()
                                gameOver = true
                                GameOver()
                                tile.style["background-color"] = "red"

                            }
                            else {
                                let c = getNBombs(i,j)
                                if (c==0){
                                    propagate(i, j)
                                    
                                }
                                if(c!=0)
                                   tile.textContent = c
                                tile.style["background-color"] = "gray"
                            }
                        })

            tile.addEventListener('contextmenu', function(ev) {
                if(clicked || gameOver) return

                ev.preventDefault();
                let viewBombs = parseInt(bombDiv.textContent)

                if (tile.style["background-color"] == tileColor){
                    // tile.style["background-color"]= "yellow"
                    tile.innerHTML = getFlag()
                    bombDiv.textContent = viewBombs-1
                    if (bomb==1){
                        NumberOfBombs-=1
                        if((NumberOfBombs == 0) && (NumberOfBombs==viewBombs-1)){
                            gameOver = true
                            GameOver()
                        }

                    }
                }

                else {
                    tile.style["background-color"] = tileColor
                    bombDiv.textContent = viewBombs+1
                    if (bomb==1){
                        NumberOfBombs+=1
                    }
                }

                return false;
            }, false);            


        }
    }

   



})

function createItem(tag, parent, attributes=null, style=null, textContent=null){

    const el = document.createElement(tag)
    parent.appendChild(el)
    
    if(attributes!=null)
        for(let key of Object.keys(attributes)){
            el.setAttribute(key, attributes[key])
        }

    if(textContent!=null)
       el.textContent = textContent

    if (style!=null)
        for(let key of Object.keys(style)){
            el.style[key] = style[key]
        }          
    
    return el
}

function getBomb(){
    return  `<?xml version="1.0" encoding="UTF-8"?><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 434.25 382.44"><defs><style>.h{stroke:#febd1f;stroke-width:6px;}.h,.i{fill:none;stroke-linecap:round;stroke-miterlimit:10;}.j{fill:#596163;}.k{fill:#1d2228;}.l{fill:#283035;}.i{stroke:#a7a9ac;stroke-width:8px;}</style></defs><g id="a"/><g id="b"><circle class="l" cx="193.93" cy="193.32" r="148.81"/></g><g id="c"><path class="k" d="M60.63,127.12c-5.63,11.4-13.43,30.81-15.16,55.98-.84,12.26-1.55,44.9,16.87,79.8,5.59,10.6,29.49,52.74,82.16,71.22,46.39,16.27,86.34,4.09,99.73-.72,21.21-7.63,36.49-18.64,45.74-26.43-14.46,2.02-83.24,10.06-147.19-36.39C71.48,218.77,61.94,139.68,60.63,127.12Z"/></g><g id="d"><path class="j" d="M265.51,99.4c-11.55-13.33-26.12-17.16-45.84-22.07-23.07-5.74-68.78-12.49-73.15-.57-4.38,11.95,35.18,36.16,54.19,47.79,26.38,16.14,63.13,38.63,75.67,27.36,9.7-8.73,3.28-36.2-10.86-52.52Z"/></g><g id="e"/><g id="f"><g><rect class="k" x="240.16" y="40.16" width="81.69" height="34.56" transform="translate(74.36 -141.46) rotate(32.35)"/><path class="k" d="M243.11,40.94l-6.35,10.03c1.6,4.89,8,22.43,26.66,34.25,18.66,11.82,37.25,10.11,42.35,9.47l6.35-10.03-69.01-43.72Z"/><ellipse class="l" cx="290.26" cy="42.84" rx="21.99" ry="40.85" transform="translate(98.74 265.12) rotate(-57.65)"/></g></g><g id="g"><path class="i" d="M296.2,36.68c6.32-8.86,12.64-17.73,18.96-26.59,.79-.67,10.72-8.78,23.24-5.16,10.12,2.92,16.94,12.34,17.72,20.75,.76,8.19-4.62,11.09-2.73,19.41,1.73,7.63,7.79,12.01,8.99,12.87,11.63,8.4,26.15,2.15,26.91,1.81"/><line class="h" x1="429.91" y1="43.69" x2="402.14" y2="54.86"/><line class="h" x1="408.78" y1="19.06" x2="397.04" y2="46.59"/><line class="h" x1="377.14" y1="22.33" x2="388.31" y2="50.11"/><line class="h" x1="431.25" y1="76.28" x2="403.71" y2="64.54"/><line class="h" x1="406.14" y1="95.82" x2="394.98" y2="68.05"/></g></svg>`

}

function getFlag(){
    return `
    <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"  viewBox="0 0 450 450" style="enable-background:new 0 0 450 450;" xml:space="preserve">
<g>
	<g>
		<path d="M87.945,75.913c-1.877-7.41-9.408-11.893-16.818-10.018c-7.413,1.879-11.897,9.409-10.019,16.821l90.439,356.838
			c1.589,6.271,7.224,10.446,13.409,10.446c1.127,0,2.271-0.139,3.413-0.428c7.409-1.877,11.895-9.409,10.017-16.819L87.945,75.913z
			"/>
		<path d="M388.98,176.419c-14.739-54.423-29.492-108.842-44.234-163.265c-1.598-5.891-4.399-12.21-14.929-12.842
			C246.929-5.691,192.503,76.854,109.614,70.85c-6.541-0.806-10.745,2.6-9.148,8.491c14.743,54.422,29.372,108.877,44.233,163.266
			c2.385,8.729,8.388,12.035,14.931,12.842c82.887,6.004,137.315-76.541,220.205-70.537
			C386.375,185.716,390.577,182.311,388.98,176.419z M323.934,20.857c4.066,15.015,8.138,30.029,12.204,45.044
			c-17.436,0.574-32.825,4.092-49.132,10.203c-4.065-15.015-8.137-30.03-12.202-45.044C291.109,24.951,306.498,21.43,323.934,20.857
			z M153.13,189.197c-4.627-17.059-9.246-34.122-13.868-51.182c18.328-0.531,34.591-4.503,51.602-11.227
			c-4.07-15.015-8.138-30.03-12.204-45.045c16.629-7.433,32.314-16.332,48.022-25.523c4.066,15.014,8.138,30.029,12.205,45.044
			c-15.709,9.19-31.395,18.092-48.023,25.524c4.623,17.06,9.244,34.122,13.866,51.182
			C187.718,184.693,171.457,188.665,153.13,189.197z M217.114,223.674c-4.129-15.234-8.256-30.47-12.384-45.706
			c16.513-7.377,32.087-16.201,47.683-25.327c4.128,15.236,8.256,30.471,12.383,45.707
			C249.202,207.475,233.626,216.297,217.114,223.674z M252.75,152.445c-4.619-17.061-9.242-34.122-13.863-51.183
			c15.706-9.17,31.403-17.945,48.119-25.157c4.624,17.06,9.246,34.121,13.867,51.181C284.16,134.5,268.458,143.274,252.75,152.445z
			 M313.545,172.876c-4.129-15.234-8.256-30.47-12.385-45.706c16.211-6.045,31.521-9.521,48.843-10.086
			c4.129,15.236,8.257,30.471,12.386,45.705C345.066,163.355,329.754,166.83,313.545,172.876z"/>
	</g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
</svg>
    `
}