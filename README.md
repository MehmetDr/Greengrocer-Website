# Atalay Manav - Tanıtım Sitesi

Bu proje "Atalay Manav" işletmesi için hazırlanan, modern, temiz, yeşil ve toprak tonlarının ağırlıkta olduğu, tek sayfalık (single-page) ve tamamen mobil uyumlu (responsive) bir web sitesidir.

## Projenin Amacı
İşletmenin günlük vizyonunu internete taşımak; müşterilere taze ürünleri, firma hakkındaki bilgileri ve hızlı bir şekilde WhatsApp üzerinden sipariş verme imkanını sunmaktır.

## Kullanılan Teknolojiler ve Yapı
- **HTML5:** Sayfanın temel yapısını (Header, Hakkımızda, Ürünlerimiz, İletişim) oluşturmak için kullanılmıştır. Dosya içinde takım arkadaşlarının kod üzerindeki genel akışı anlayabilmesi için yapısal açıklama satırları (comments) mevcuttur.
- **CSS3:** Tasarımı toprak ve yeşil tonlarıyla modern bir görünüme kavuşturmak amacıyla kullanılmış. Özellik olarak:
  - Sayfa içi menü yönlendirmelerinde `smooth scrolling` aktif edilmiştir.
  - Ürün listelemelerinde tam mobil uyumluluk için `CSS Grid` ve `Flexbox` tercih edilmiştir.
  - İletişim butonlarında farkındalık yaratacak (Call-to-Action) zıtlıklar (WhatsApp markasının orijinal yeşili) eklenmiştir.

## Projeyi Çalıştırma
Projeyi kendi cihazınızda çalıştırmak oldukça basittir:
1. Bu repoyu bilgisayarınıza klonlayın.
2. Ana dizindeki `index.html` dosyasına çift tıklayarak veya projenizi Visual Studio Code'da açıp **Live Server** eklentisiyle çalıştırarak sonuçları canlı olarak izleyebilirsiniz.

## GitHub ile Ortak Çalışma (Git Komutları)

Eğer projeyi ilk defa cihazınıza çekiyor ve uzak sunucuya bağlamak istiyorsanız veya bir değişiklik yapıp pushlamak istiyorsanız şu adımları izleyebilirsiniz:

### 1) Kendi Cihazınıza Kurulum ve Bağlantı
Eğer zaten klonlamadıysanız:
```bash
git clone https://github.com/MehmetDr/Greengrocer-Website.git
cd Greengrocer-Website
```
Eğer halihazırda yerelde çalıştıysanız ve uzak sunucuya remote olarak eklemek istiyorsanız:
```bash
git remote add origin https://github.com/MehmetDr/Greengrocer-Website.git
git branch -M main
```

### 2) Değişiklikleri Kaydetme ve Pushlama
Yaptığınız geliştirmelerden sonra şu adımlarla değişikliklerinizi uzaktaki ana repoya iletebilirsiniz:
```bash
# Değişen tüm dosyaları eklemek için
git add .

# Yaptığınız işi açıklayan bir commit mesajı bırakmak için
git commit -m "feat: yaptiginiz isin kisa aciklamasi"

# Değişiklikleri uzak (remote) depoya yüklemek için
git push -u origin main
```
