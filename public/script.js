const socket = io();
const touchArea = document.getElementById('touchArea');
const heart = document.getElementById('heart');
const togetherHeart = document.getElementById('togetherHeart');

let isTouching = false;
let touchCount = 0; // Dokunma sayısını takip etmek için

// Kullanıcı ekranda basılı tuttuğunda
touchArea.addEventListener('mousedown', () => {
    if (!isTouching) {
        isTouching = true;
        touchCount++; // Dokunma sayısını artır
        socket.emit('touchStart'); // Sunucuya bildirim gönder
    }
});

// Kullanıcı ekrandan elini çektiğinde
touchArea.addEventListener('mouseup', () => {
    if (isTouching) {
        isTouching = false;
        touchCount--; // Dokunma sayısını azalt
        socket.emit('touchEnd'); // Sunucuya bildirim gönder
    }
});

// Diğer kullanıcının dokunuşunu gösterme
socket.on('touchStart', () => {
    if (touchCount === 0) { // Eğer henüz başka biri basılı tutmuyorsa
        showTogetherHeart();
    }
});

socket.on('touchEnd', () => {
    hideTogetherHeart();
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

// Ortada kalp gösterme fonksiyonu
function showTogetherHeart() {
    togetherHeart.classList.remove('hidden');
    togetherHeart.style.opacity = '1';

    setTimeout(() => {
        togetherHeart.classList.add('hidden');
        togetherHeart.style.opacity = '0';
    }, 1000); // 1 saniye sonra kalbi gizle
}

function hideTogetherHeart() {
    togetherHeart.classList.add('hidden');
    togetherHeart.style.opacity = '0';
}

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

// Diğer kullanıcının dokunuşunu gösterme
socket.on('touch', (data) => {
    showHeart(data.x, data.y);
});
