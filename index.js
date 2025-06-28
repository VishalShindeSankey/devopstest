const main = document.querySelector(".main");
const addNoteBtn = document.querySelector("#addNote");
// const note = document.querySelector("#note");

const updateLocalStorage = ()=>{
    const allnotes = document.querySelectorAll("textarea");

    const notes = [];

    allnotes.forEach(textarea => {
        return textarea.value ? notes.push(textarea.value):""
    });

    localStorage.setItem("notes",JSON.stringify(notes));
}

const addNote =(text='')=>{

    
    const note= document.createElement('div');
    note.classList.add("note");
    // note.classList.add(count);
    // count++;

    let htmldata = `
    
            <div class="operations">
                <button  class="save"><i class="fa-solid fa-floppy-disk"></i></button>
                <button  class="edit" style="display: none;"><i class="fa-solid fa-pen-to-square"></i></button>
                <button  class="delete"><i class="fa-solid fa-trash-can"></i></button>
            </div>

            <div class="complete-msg"></div>
            <div class="incomplete-msg">
                <textarea name="msg" class="msg" cols="30" rows="6" placeholder="Write a note">${text}</textarea>
            </div>

        `;

    note.insertAdjacentHTML("beforeend",htmldata);

    document.body.appendChild(note);
 
    const saveBtn = note.querySelector(".save");
    const editBtn = note.querySelector(".edit");
    const deleteBtn = note.querySelector(".delete");

    const savedmsg = note.querySelector(".complete-msg");
    const unsavedmsg = note.querySelector(".incomplete-msg");
    const textarea = note.querySelector(".msg");

    textarea.addEventListener('change',()=>{
        let msg = textarea.value;
        unsavedmsg.style.display="none",
        savedmsg.style.display = "block",
        savedmsg.innerText = msg;

        saveBtn.style.display = "none"
        editBtn.style.display = "block"
        
        updateLocalStorage();
    })
    saveBtn.addEventListener('click',()=>{
        let msg = note.querySelector(".msg").value;
        // console.log(msg)

        unsavedmsg.style.display="none",
        savedmsg.style.display = "block",
        savedmsg.innerText = msg;

        saveBtn.style.display = "none"
        editBtn.style.display = "block"
        
        updateLocalStorage();
    })

    editBtn.addEventListener('click',()=>{

        // let msg = savedmsg.innerText;
        unsavedmsg.style.display="block"
        savedmsg.style.display = "none"
        
        note.querySelector(".msg").textContent = savedmsg.innerText;

        saveBtn.style.display = "block"
        editBtn.style.display = "none"
    })

    deleteBtn.addEventListener('click',()=>{
    console.log(note);
    note.remove();
    updateLocalStorage();
    
    })
}

addNoteBtn.addEventListener('click',()=>addNote());


const allnotes =JSON.parse(localStorage.getItem("notes"));
// console.log(allnotes)

allnotes.forEach(element =>{
    addNote(element)
    
})

const alltexts =document.querySelectorAll(".note");

alltexts.forEach(note=>{

    let msg = note.querySelector(".msg").value;

    note.querySelector(".incomplete-msg").style.display="none",
    note.querySelector(".complete-msg").style.display = "block",
    note.querySelector(".complete-msg").innerText = msg;

    note.querySelector(".save").style.display = "none"
    note.querySelector(".edit").style.display = "block"
})

// const savedmsg = document.querySelector(".complete-msg");
// const unsavedmsg = document.querySelector(".incomplete-msg");





// saveBtn.addEventListener('click',()=>{
//     let msg = document.querySelector("#msg").value;
//     // console.log(msg)

//     unsavedmsg.style.display="none",
//     savedmsg.style.display = "block",
//     savedmsg.innerText = msg;

//     saveBtn.style.display = "none"
//     editBtn.style.display = "block"
  
// })

// editBtn.addEventListener('click',()=>{

//     // let msg = savedmsg.innerText;
//     unsavedmsg.style.display="block"
//     savedmsg.style.display = "none"
//     console.log(savedmsg.innerText);
//     document.querySelector("#msg").textContent = savedmsg.innerText;

//     saveBtn.style.display = "block"
//     editBtn.style.display = "none"
// })

// deleteBtn.addEventListener('click',()=>{
//     console.log(note);
//     note.remove();
// })