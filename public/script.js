const socket = io();
const touchArea = document.getElementById('touchArea');
const heart = document.getElementById('heart');

// Kullanıcı dokunduğunda
touchArea.addEventListener('click', (event) => {
    const rect = touchArea.getBoundingClientRect();
    const x = event.clientX - rect.left; // X koordinatı
    const y = event.clientY - rect.top;   // Y koordinatı

    // Dokunma olayını sunucuya gönder
    socket.emit('touch', { x, y });

    // Kalp animasyonunu göster
    showHeart(x, y);
});

// Kalp animasyonunu gösterme fonksiyonu
function showHeart(x, y) {
    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;
    heart.classList.remove('hidden');
    heart.style.opacity = '1';

    setTimeout(() => {
        heart.classList.add('hidden');
        heart.style.opacity = '0';
    }, 1000); // 1 saniye sonra kalbi gizle
}

// Diğer kullanıcının dokunuşunu gösterme
socket.on('touch', (data) => {
    showHeart(data.x, data.y);
});
