var startBtnClickCount = 0;
// const eleBlank = document.getElementById("blanks"),
//  eleBlankFilled = document.getElementById("blanks_filled"),
//  eleBlank2 = document.getElementById("blanks2")
function getRandomColor() {
    for (var e = "#", t = 0; t < 6; t++) e += "0123456789ABCDEF"[Math.floor(16 * Math.random())];
    return e
}
const renderInit = () => {
    document.getElementById("blanks1").style.display="flex";
    document.getElementById("blanks2").style.display="flex";


    for(var i=0;i<8;i++){
        random_ascii = Math.floor((Math.random() * 25) + 97);
        random_char= String.fromCharCode(random_ascii);
        // if(i==0)random_char="Giraffe";
    //     var alpha = document.createElement("li");   // Create a <button> element
    // alpha.innerHTML = random_char;                   // Insert text
    // document.getElementById("source").appendChild(alpha);  
    const t = makeElement("li", `box${i}`, "box", random_char, random_char,"");
    t.style.backgroundColor = getRandomColor();
    }
        $(document).ready(function () {
            $('#blanks_filled ul li').draggable({
                helper: 'clone',
               
            });

            $('#blanks1').droppable({
                // accept: 'li[data-value="country"]',
                drop: function (event, ui) {
                    $('#vowels').append(ui.draggable);
                }
            });

            $('#blanks2').droppable({
                // accept: 'li[data-value="city"]',
                drop: function (event, ui) {
                    $('#consonants').append(ui.draggable);
                }
            });
        });

};
let makeElement = (e, t,s, n = "", r = "", a = null) => {
    let alpha=document.createElement(e);
    let o=document.getElementById("source").appendChild(alpha);
    return  o.id = t,o.className =s, o.value = n, o.innerText = r, null != a && (o.width = a), o
};

function renderStart(){
    let btnStart = document.getElementById('startBtn');
    let [a,b,c,d] = document.getElementsByClassName('not-start');

    btnStart.onclick = ()=>{
        if (startBtnClickCount === 0){
            startBtnClickCount += 1;
            openNav();
        } else {
            renderInit();
            a.classList.remove('not-start');
            b.classList.remove('not-start');
            c.classList.remove('not-start');
            d.classList.remove('not-start');
            btnStart.classList.add('not-start');
        }
    };
}



// Event Bindings here


window.addEventListener('load', renderStart)