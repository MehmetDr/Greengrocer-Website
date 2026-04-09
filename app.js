document.addEventListener("DOMContentLoaded", () => {
    // Google Sheets veritabanı yayın adresi (JSON formatı için özel endpoint)
    const sheetURL = 'https://docs.google.com/spreadsheets/d/1MU448kK6xTQ13E93-EBMONPp28B7ZZRFdsA0kigTCnA/gviz/tq?tqx=out:json';

    // Normalizasyon fonksiyonu - Türkçe karakterleri İngilizce eşleniklerine çevirir ve küçültür
    const normalizeText = (text) => {
        const map = { 'ç': 'c', 'ğ': 'g', 'ı': 'i', 'ö': 'o', 'ş': 's', 'ü': 'u', 'Ç': 'C', 'Ğ': 'G', 'İ': 'I', 'Ö': 'O', 'Ş': 'S', 'Ü': 'U' };
        return text.trim().replace(/[çğıöşüÇĞİÖŞÜ]/g, match => map[match]).toLowerCase();
    };

    fetch(sheetURL)
        .then(res => res.text())
        .then(text => {
            // Google Visualization API raw text formatında döner, içinden standart JSON'ı ayıklamalıyız.
            const jsonString = text.substring(text.indexOf('{'), text.lastIndexOf('}') + 1);
            if (!jsonString) return;
            
            // ES6 Destructuring ile JSON üzerinden doğrudan rows array'ine erişiyoruz
            const { table: { rows } } = JSON.parse(jsonString);
            const inventory = {};
            
            // Satırları haritalayarak bir stok objesi oluştur
            rows.forEach(row => {
                if (row.c && row.c[0] && row.c[0].v !== null) {
                    const originalName = row.c[0].v.toString();
                    const productName = normalizeText(originalName);
                    
                    // Col 2: Status (Varsa)
                    const status = row.c[1] && row.c[1].v ? row.c[1].v.toString().trim() : 'Var';
                    
                    // Col 3: Dynamic Image URL (Varsa - Override olarak kullanılır)
                    const imageOverride = row.c[2] && row.c[2].v ? row.c[2].v.toString().trim() : null;
                    
                    inventory[productName] = { status, imageOverride };
                }
            });

            // Sayfadaki 30 DOM öğesini (ürün kartlarını) tarıyoruz
            const productCards = document.querySelectorAll('.product-card');
            
            productCards.forEach(card => {
                const titleElement = card.querySelector('h4');
                if (!titleElement) return;
                
                const productNameRaw = titleElement.textContent;
                const productNameKey = normalizeText(productNameRaw);
                console.log("Eşleşen ürün:", productNameRaw);

                const imageContainer = card.querySelector('.img-placeholder');
                const imgElement = imageContainer.querySelector('img');
                
                // Fuzzy matching ile en yakın key'i bul, büyük/küçük ve TR karakterlere karşı dirençli
                const matchedKey = Object.keys(inventory).find(key => productNameKey.includes(key) || key.includes(productNameKey));
                
                // Tabloda varsa o veriyi, hata varsa varsayılan VAR verisini ata.
                const itemData = matchedKey && inventory[matchedKey] ? inventory[matchedKey] : { status: 'VAR', imageOverride: null };
                const currentStatus = itemData.status.toUpperCase();

                // Eğer Google Sheet üzerinden 3. sütunda atanan özel bir Görsel Linki (override) gelmişse uygula
                if (itemData.imageOverride) {
                    imgElement.src = itemData.imageOverride;
                }

                // ES6 ile temizlenmiş rozet uygulama fonksiyonu
                const applyBadge = (statusClass, text, isOut) => {
                    const badge = document.createElement('div');
                    badge.className = `stock-badge ${statusClass}`;
                    badge.textContent = text;
                    imageContainer.appendChild(badge);
                    
                    card.classList.add(isOut ? 'out-of-stock' : 'in-stock');
                };
                
                if (currentStatus === 'YOK' || currentStatus === 'TÜKENDİ') {
                    applyBadge('badge-out', 'Tükendi', true);
                } else {
                    applyBadge('badge-in', 'Stokta', false);
                }
            });
        })
        .catch(err => {
            console.error("Sheets verisi çekilirken hata oluştu:", err);
            // Fallback mekanizması
            document.querySelectorAll('.product-card').forEach(card => {
                card.classList.add('in-stock');
                const badge = document.createElement('div');
                badge.className = 'stock-badge badge-in';
                badge.textContent = 'Stokta';
                card.querySelector('.img-placeholder').appendChild(badge);
            });
        });
});
