function getSurat(){
    fetch('https://equran.id/api/surat')
    .then(Response => Response.json())
    .then(Response => {
        
        let cardSurat='';
        Response.forEach(surat => {
            cardSurat+=`
            <div class="col-lg-3 col-md-4 col-sm-12">
                <div class="card mb-3 card-surat">
                    <div class="card-body" onclick="location.href='surat.html?nomorsurat=${surat.nomor}'">
                      <h5 class="card-title">${surat.nomor}. ${surat.nama_latin}</h5>
                      <p class="card-text">${surat.jumlah_ayat} Ayat</p>
                      <h3 class="card-subtitle mb-2 text-muted text-end">${surat.nama}</h3>
                      <p class="card-text text-end">${surat.arti}</p>
                      
                    </div>
                  </div>
            </div>`
        });
        const listsurat = document.querySelector('.card-surat-list');
        listsurat.innerHTML = cardSurat;
        console.log(Response)
    });
}
getSurat();