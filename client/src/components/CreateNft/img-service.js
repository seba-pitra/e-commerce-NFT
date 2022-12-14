//siempre con protocolo http ,o con local host,o con un server. si se abre el archivo desde la direccion nuestra 127.0.0.0//balbal no anda

const buttonPhoto = document.querySelector('#upload-btn');
const image = document.querySelector('#uploaded-photo');


const widget_cloudinary = cloudinary.createUploadWidget({
    cloudName : 'dwyhztlkw',
    uploadPreset : 'non_fungible_town'
},(err,result) =>{
    if(!err && result && result.event === 'success'){
        console.log('image uploaded succesfully',result.info)
        image.src = result.info.secure_url;
    }
}
)

buttonPhoto.addEventListener('click',()=>{
widget_cloudinary.open();
},false)