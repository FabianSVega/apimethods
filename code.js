// Api of geT and post 
const getInfo   = async()=>{
    let resultaprobates  = document.querySelector(".num-apro");
    let resultunapro    = document.querySelector(".num-unapro");
    try{
        result   = await axios("info.txt");
        resultaprobates.innerHTML     = result.data.aprobados;
        resultunapro.innerHTML   = result.data.desaprobados;
    }catch(e){
        resultaprobates.innerHTML   = "Fallo la api";
        resultunapro.innerHTML      =  "Fallo la api"
    }
}
document.getElementById("getInfo").addEventListener("click",getInfo);

const archivo = document.getElementById("archivo");

archivo.addEventListener("change",(e)=>{
    leerarchivo(archivo.files)
}) 
const leerarchivo = ar =>{
    for(var i=0; i< ar.length; i++){
        const   reader = new FileReader();
        reader.readAsDataURL(ar[i]);
        reader.addEventListener("load",(e)=>{
        let newImg = `<img src='${e.currentTarget.result}'>`;
        document.querySelector('.resultimg').innerHTML= newImg;

        }
        )
    }
}

const zona = document.querySelector(".zona-arrastre");

// Api of  load and draws files
zona.addEventListener('dragover',e=>{
    e.preventDefault();
    changestyle(e.srcElement,"#222");
})

zona.addEventListener('dragleave',e=>{
    e.preventDefault();
    changestyle(e.srcElement,"#888");
})

zona.addEventListener('drop',e=>{
    e.preventDefault();
    changestyle(e.srcElement,"#888");
    cargarArchivo(e.dataTransfer.files[0]);
    
})

const  changestyle=(obj,color)=>{
    obj.style.color = color;
    obj.style.border = `4px dashed ${color}`;
}

const cargarArchivo= ar =>{
    const reader = new  FileReader();
    let achive = ar.name;
    if (achive.includes('.py')){
        reader.readAsText(ar);
        reader.addEventListener("load",e =>{
            document.querySelector(".resultadozona").textContent =e.currentTarget.result;
        })
    }
    else if (achive.includes('.PNG' || '.jpg' )){

        reader.addEventListener("load",e=>{
            e.preventDefault();
            let url = URL.createObjectURL(ar);
            let img = document.createElement("IMG");
            img.setAttribute("src",url);
            document.querySelector(".resultadozona").appendChild(img)

        })
        }
    else{
        reader.readAsArrayBuffer(ar);
        reader.addEventListener("progress",e=>{
            e.preventDefault();
            let carga = Math.round(e.loaded/ar.size *100);
            zona.textContent = `${carga}`;
            document.querySelector(".barraproceso").style.padding    = "75px 20px";
            document.querySelector(".barraproceso").style.width    = `${carga/3.5}%`;

        });
        reader.addEventListener("loadend",e=>{
            e.preventDefault();
            changestyle(zona,"#4f9");
            zona.style.borderStyle  = "solid";
            document.querySelector(".barraproceso").style.background = "#4f9"
            setTimeout(() => {
              zona.style.color = "#fff";
              zona.style.animation = "aparecer 1s forwards";
              zona.textContent = "¡Carga completa!"
            }, 500);
        })
        reader.addEventListener("load",e=>{
            let video = new Blob([new Uint8Array(e.currentTarget.result)],{type:'video/mp4'});
            let url = URL.createObjectURL(video);
            let videop = document.createElement("VIDEO");
            videop.setAttribute("src",url);
            document.querySelector(".resultadozona").appendChild(videop);
            videop.play();


        })
    } 

}


