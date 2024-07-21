

const terminalBody = document.getElementById("terminal-body");
const inputLine = document.getElementById("input-line");
inputLine.focus();



function newLine(){
    const nLine = `<pre class="terminal-content"  id="terminal-content" >$ <span id="input-line" contenteditable="true" oninput=" regularCommand(event);"></span> <span id="restCommand"></span></pre>`;
    terminalBody.innerHTML += nLine;
    
    for(let ele=0;ele<terminalBody.children.length;ele++){
        if(ele === terminalBody.children.length-1){
            terminalBody.children[ele].children[0].focus();
        }else{
            terminalBody.children[ele].children[0].removeAttribute("contenteditable");
            
            // terminalBody.children[ele].children[1].removeAttribute("contenteditable");
        }
    }
    inputInteract();
    focusOnInput();
}


function output(outputMessage){
    let output = `<pre class="terminal-content" id="terminal-content"><span id="input-line" contenteditable="true">${outputMessage}</span></pre>`;
    terminalBody.innerHTML += output;
    newLine();
}
// commands of terminal.
function ahmed(){
    return "Ahmed AL-Jassem : who coded by him";
}
function commandNotFounf(commandError){
    return `${commandError}:command not found type man or help `
}
function commandSendContaintToWebhook(containt){
    return "send ,,, test."
}
function commandGetMessages(publicIP){
    return "get ,,,test.";
}
function commandGetLastMessage(publicIP){
    return " ,,,test.";

}
// commands 

function inputInteract(){
    let lastChiledEle = terminalBody.children[terminalBody.children.length-1].children[0];

    lastChiledEle.addEventListener("keydown",(eve)=>{
        let inputValue = lastChiledEle.innerHTML;
        if(eve.key === "Enter"){
            eve.preventDefault();
            if(inputValue === "" || inputValue === " ".repeat(inputValue.length)){
                console.log("empy")
                newLine();
            }else{
                output(commandNotFounf(inputValue));
            }
        }

    })
}

function clearScreen(){
    terminalBody.innerHTML = "";
    newLine();
}

function regularCommand(event){
    let mainCommand = event.target;
    let restCommand = event.target.parentElement.children[1];
    let mainCommandValue = matchValue(mainCommand.innerHTML);
    const commandsList = ["ahmed","send","get","clear"];
    if(mainCommandValue){
        if(commandsList.includes(mainCommandValue)){
            restCommand.setAttribute("contenteditable","true");
            mainCommand.style.color = "rgb(0, 183, 255)";
            restCommand.focus();
            restCommandInputConfig();
        }else{
            event.target.style.color = "white";
        }
    }else{
        event.target.style.color = "white";
    }
}

function getCaretPosition(element) {
    let caretOffset = 0;
    const doc = element.ownerDocument || element.document;
    const win = doc.defaultView || doc.parentWindow;
    const sel = win.getSelection();
    if (sel.rangeCount > 0) {
        const range = sel.getRangeAt(0);
        const preCaretRange = range.cloneRange();
        preCaretRange.selectNodeContents(element);
        preCaretRange.setEnd(range.endContainer, range.endOffset);
        caretOffset = preCaretRange.toString().length;
    }
    return caretOffset;
}


function focusAndMoveCursorToEnd(contentEditableElement) {
    contentEditableElement.focus();

    // Create a range object
    let range = document.createRange();
    // Set the range to the end of the content
    range.setStart(contentEditableElement, contentEditableElement.childNodes.length);
    range.collapse(true);

    // Get the selection object
    let selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
}

function restCommandInputConfig(){
    let lastRestCommandInput = terminalBody.children[terminalBody.children.length-1].children[1];
    let lastMainCommand = terminalBody.children[terminalBody.children.length-1].children[0];

    lastRestCommandInput.addEventListener("keydown",(eve)=>{
        if(eve.key === "Enter"){
            let restCommandValue = eve.target.innerHTML;
            eve.preventDefault();
            command(lastMainCommand,lastRestCommandInput);
        }

        if(eve.key ==="Backspace" && eve.target.innerHTML === ""){
            let mainCommandValue = lastMainCommand.innerHTML;
            focusAndMoveCursorToEnd(lastMainCommand);
            eve.preventDefault();
        }else if(eve.key ==="ArrowLeft"){
            if(getCaretPosition(lastRestCommandInput) === 0){
                focusAndMoveCursorToEnd(lastMainCommand);
                eve.preventDefault();
            }

        }
    });

    lastMainCommand.addEventListener("keydown",(eve)=>{
        if(eve.key === "ArrowRight"){
            if(getCaretPosition(lastMainCommand) === lastMainCommand.innerHTML.length){
                eve.preventDefault();
                lastRestCommandInput.focus();
            }
        }
    })
}


function command(mainCommand,restCommand){
    let restMommandValue = restCommand.innerHTML;
    let mainCommandValue = mainCommand.innerHTML.split(" ")[0];

    if(mainCommandValue ==="ahmed"){
        output(ahmed());
    }else if(mainCommandValue === "clear"){
        clearScreen();
    }else if(mainCommandValue === "send"){
        output(commandSendContaintToWebhook());
    }else if(mainCommandValue === "get"){
        output(commandGetLastMessage());
    }
}

function matchValue(text){
    let NewItems = text.split(" ").filter(it => {
        return it;
    });
    if(NewItems.length === 1){
        return NewItems[0];
    }else{
        return false;
    }
}

function focusOnInput(){
    document.addEventListener("click",(event)=>{
        let lastMainInputCommand = terminalBody.children[terminalBody.children.length -1].children[0];
        let lastRestInputCommand = terminalBody.children[terminalBody.children.length -1].children[1];
        let restLenValue = lastRestInputCommand.innerHTML.length;
        let mainLenValue = lastMainInputCommand.innerHTML.length;
        if(event.target === lastMainInputCommand || event.target === lastRestInputCommand){
            event.preventDefault();
        }else{
            if(mainLenValue === 0 && restLenValue === 0){
                lastMainInputCommand.focus();
            }else if(mainLenValue > 0 && restLenValue > 0){
                lastRestInputCommand.focus();
            }else if(mainLenValue === 0 && restLenValue > 0){
                lastRestInputCommand.focus();
            }else if(mainLenValue > 0 && restLenValue === 0){
                lastRestInputCommand.focus();
            }
        }
    })
}


function mail(){
    
}