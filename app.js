document.addEventListener("DOMContentLoaded", () => {
    // Google Sheets veritabanı yayın adresi (JSON formatı için özel endpoint)
    const sheetURL = 'https://docs.google.com/spreadsheets/d/1MU448kK6xTQ13E93-EBMONPp28B7ZZRFdsA0kigTCnA/gviz/tq?tqx=out:json';

    fetch(sheetURL)
        .then(response => response.text())
        .then(text => {
            // Google Visualization API raw text formatında döner, içinden standart JSON'ı ayıklamalıyız.
            const jsonString = text.substring(text.indexOf('{'), text.lastIndexOf('}') + 1);
            if (!jsonString) return;
            
            const data = JSON.parse(jsonString);
            
            // Satırları haritalayarak bir stok objesi oluştur (Örn: {'Domates': 'Var', 'Muz': 'Yok'})
            const rows = data.table.rows;
            const inventory = {};
            
            rows.forEach(row => {
                if (row.c && row.c[0] && row.c[0].v !== null) {
                    const productName = row.c[0].v.toString().trim();
                    // İkinci sütun (Durum) veriyi kontrol et, yoksa varsayılan 'Var' say.
                    const status = row.c[1] && row.c[1].v ? row.c[1].v.toString().trim() : 'Var';
                    inventory[productName] = status;
                }
            });

            // Sayfadaki 30 Dom öğesini (ürün kartlarını) tarıyoruz
            const productCards = document.querySelectorAll('.product-card');
            
            productCards.forEach(card => {
                // Başlık H4 üzerinden aranır
                const titleElement = card.querySelector('h4');
                if (!titleElement) return;
                
                const productName = titleElement.textContent.trim();
                console.log("Eşleşen ürün:", productName);
                const imageContainer = card.querySelector('.img-placeholder');
                
                // Karşılaştırma yap: Durum Yok mu?
                // Büyük, küçük harf ve boşluk hatalarını telafi edelim
                const currentStatus = inventory[productName] ? inventory[productName].toUpperCase() : 'VAR';
                
                if (currentStatus === 'YOK' || currentStatus === 'TÜKENDİ') {
                    // Tükendi Sınıfı Ekle
                    card.classList.add('out-of-stock');
                    
                    // Görselin üstüne Kırmızı Etiket Ekle
                    const badge = document.createElement('div');
                    badge.className = 'stock-badge badge-out';
                    badge.textContent = 'Tükendi';
                    imageContainer.appendChild(badge);
                } else {
                    // Mevcut Sınıfı Ekle
                    card.classList.add('in-stock');
                    
                    // Görselin üstüne Yeşil Etiket Ekle
                    const badge = document.createElement('div');
                    badge.className = 'stock-badge badge-in';
                    badge.textContent = 'Stokta';
                    imageContainer.appendChild(badge);
                }
            });
        })
        .catch(error => {
            console.error("Google Sheets'ten anlık veri çekilirken hata oluştu:", error);
            // Varsayılan olarak tüm ürünleri stokta göster
            const productCards = document.querySelectorAll('.product-card');
            productCards.forEach(card => {
                card.classList.add('in-stock');
                const badge = document.createElement('div');
                badge.className = 'stock-badge badge-in';
                badge.textContent = 'Stokta';
                card.querySelector('.img-placeholder').appendChild(badge);
            });
        });
});
