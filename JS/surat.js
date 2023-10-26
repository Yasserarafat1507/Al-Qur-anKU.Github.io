function getURL(e){
    const pageURL= window.location.search.substring(1);
    const urlVariable = pageURL.split('&');

    for(let i = 0; i < urlVariable.length; i++){
        const parameterName = urlVariable[i].split('=');
        if(parameterName[0] == e ){
            return parameterName[1];
        }
    }
}
const nomorsurat = getURL('nomorsurat');
// console.log(nomorsurat);

function getSurat(){
    fetch(`https://equran.id/api/surat/${nomorsurat}`)
    .then(response => response.json())
    .then(response =>{
        // titel surah star
        const titelSurat =document.querySelector('#titel-surah');
        titelSurat.textContent= `Surat ${response.nama_latin}`
        // titel sutah end

        // judul surat star
        const judulSurat = document.querySelector('.judul-surat');
        const cardJudulSurat = `
        <strong>${response.nama_latin} - ${response.nama}</strong>
                    <p>Jumlah ayat: ${response.jumlah_ayat} (${response.arti})</p>
                    <button class="btn btn-secondary audio-button-play">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark-play-fill" viewBox="0 0 16 16">
                            <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM6 6.883a.5.5 0 0 1 .757-.429l3.528 2.117a.5.5 0 0 1 0 .858l-3.528 2.117a.5.5 0 0 1-.757-.43V6.884z"/>
                          </svg>

                    Play

                </button>
                <button class="btn btn-danger audio-button-pause hidden-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pause" viewBox="0 0 16 16">
                <path d="M6 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5zm4 0a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 5-5z">
                </svg>
                stop
                </button>
                <audio id="audio-tag"src="${response.audio}"></audio>
        `;
        judulSurat.innerHTML= cardJudulSurat;
        // judul surat end

        // isi surat star
        const surat = response.ayat;
        let isiSurat = '';
        surat.forEach(s => {
            isiSurat+=`
            <div class="container mt-5">
    <div class="card mb-3">
        <div class="card-body">
         <p>${s.nomor}</p>
         <h3 class="text-end">${s.ar}</h3>
         <h3>${s.tr}</h3>
         <p>${s.idn}</p>
        </div>
      </div>
      </div>
            `;

            
        });
        const cardIsiSurat = document.querySelector('.card-isi-surat')
        cardIsiSurat.innerHTML=isiSurat;
        // play and pause
        const buttonPlay = document.querySelector('.audio-button-play');
        const buttonPause = document.querySelector('.audio-button-pause');
        const audioSurat = document.querySelector('#audio-tag');

        // play
        buttonPlay.addEventListener('click', function(){
            audioSurat.play();
        });

        //pause
        buttonPause.addEventListener('click', function(){
            audioSurat.pause();
        });
});
}
getSurat();