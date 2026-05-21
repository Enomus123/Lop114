// ==========================================
// THAY ĐỔI VIDEO YOUTUBE KHI BẤM NÚT TAB (PLAYLIST)
// ==========================================
function switchVideo(iframeId, videoId, buttonEl) {
    const iframe = document.getElementById(iframeId);
    if (iframe) {
        iframe.src = `https://www.youtube.com/embed/${videoId}`;
    }
    const tabsContainer = buttonEl.parentElement;
    const buttons = tabsContainer.querySelectorAll('.tab-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    buttonEl.classList.add('active');
}

function switchVideoWithRatio(iframeId, videoId, buttonEl, ratioType) {
    switchVideo(iframeId, videoId, buttonEl);
    const container = buttonEl.closest('.video-playlist-wrapper').querySelector('.video-container');
    if (container) {
        if (ratioType === 'short') {
            container.classList.add('short-video');
        } else {
            container.classList.remove('short-video');
        }
    }
}

// Khởi tạo toàn bộ tương tác sau khi tải trang xong
document.addEventListener("DOMContentLoaded", function() {
    
    // ==========================================
    // LOGIC NÚT BẤM TRƯỢT ẢNH & SỬA LỖI ĐẾM SỐ ĐỘNG
    // ==========================================
    const sliderWrappers = document.querySelectorAll('.slider-wrapper');

    sliderWrappers.forEach(wrapper => {
        const slider = wrapper.querySelector('.image-slider');
        const prevBtn = wrapper.querySelector('.nav-btn.prev');
        const nextBtn = wrapper.querySelector('.nav-btn.next');
        const counter = wrapper.querySelector('.slider-counter');
        const images = slider.querySelectorAll('img');
        const totalImages = images.length;
        
        // Quản lý chỉ mục ảnh hiện tại (Bắt đầu từ ảnh số 1)
        let currentIndex = 1;

        function updateCounterDisplay(index) {
            if (counter && totalImages > 0) {
                counter.innerText = `${index} / ${totalImages}`;
            }
        }

        // Bấm nút Next (Mũi tên phải)
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                const imageWidth = slider.clientWidth;
                if (currentIndex >= totalImages) {
                    slider.scrollLeft = 0;
                    currentIndex = 1;
                } else {
                    slider.scrollLeft += imageWidth;
                    currentIndex++;
                }
                updateCounterDisplay(currentIndex);
            });
        }

        // Bấm nút Prev (Mũi tên trái)
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                const imageWidth = slider.clientWidth;
                if (currentIndex <= 1) {
                    slider.scrollLeft = slider.scrollWidth;
                    currentIndex = totalImages;
                } else {
                    slider.scrollLeft -= imageWidth;
                    currentIndex--;
                }
                updateCounterDisplay(currentIndex);
            });
        }

        // Lắng nghe hành vi vuốt tay trên điện thoại để cập nhật số trang tương ứng
        let timeout;
        slider.addEventListener('scroll', () => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                const width = slider.clientWidth;
                if (width > 0) {
                    const newIndex = Math.min(
                        Math.max(Math.round(slider.scrollLeft / width) + 1, 1),
                        totalImages
                    );
                    if (newIndex !== currentIndex) {
                        currentIndex = newIndex;
                        updateCounterDisplay(currentIndex);
                    }
                }
            }, 100);
        });

        // Thiết lập bộ đếm ban đầu ngay khi tải trang
        updateCounterDisplay(currentIndex);
    });


    // ==========================================
    // TÍNH NĂNG CLICK VÀO ẢNH ĐỂ PHÓNG TO (LIGHTBOX)
    // ==========================================
    const lightbox = document.getElementById('imageLightbox');
    const lightboxImg = document.getElementById('lightboxTargetImg');
    const lightboxClose = document.getElementById('lightboxClose');
    const allImages = document.querySelectorAll('.image-slider img, .single-image-box img');

    allImages.forEach(img => {
        img.addEventListener('click', function() {
            lightboxImg.src = this.src;
            lightbox.classList.add('show');
        });
    });

    if (lightboxClose) {
        lightboxClose.addEventListener('click', () => {
            lightbox.classList.remove('show');
        });
    }

    if (lightbox) {
        lightbox.addEventListener('click', function(e) {
            if (e.target !== lightboxImg && e.target !== lightboxClose) {
                lightbox.classList.remove('show');
            }
        });
    }

    // ==========================================
    // HỆ THỐNG THẢ TIM KỶ NIỆM (GIỮ NGUYÊN)
    // ==========================================
    const heartBtn = document.getElementById('heartBtn');
    const countSpan = document.getElementById('count');
    
    if (heartBtn && countSpan) {
        let heartCount = localStorage.getItem('classHeartCount') || 0;
        countSpan.innerText = heartCount;

        heartBtn.addEventListener('click', function() {
            heartCount++;
            countSpan.innerText = heartCount;
            localStorage.setItem('classHeartCount', heartCount);
            createFloatingHeart();
        });
    }

    function createFloatingHeart() {
        const heart = document.createElement('i');
        heart.classList.add('fas', 'fa-heart');
        heart.style.position = 'fixed';
        heart.style.color = 'var(--heart-color)';
        heart.style.left = (window.innerWidth / 2 + (Math.random() * 60 - 30)) + 'px';
        heart.style.bottom = '80px';
        heart.style.opacity = '1';
        heart.style.zIndex = '9999';
        heart.style.transition = 'all 1s ease-out';
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
            heart.style.transform = `translateY(-120px) scale(1.4)`;
            heart.style.opacity = '0';
        }, 50);
        
        setTimeout(() => { heart.remove(); }, 1050);
    }
});