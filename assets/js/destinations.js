const destinations = [
  {
    "id": "hanoi",
    "name": "Hà Nội",
    "region": "north",
    "desc": "Thủ đô ngàn năm văn hiến, nơi lưu giữ những dấu ấn lịch sử và văn hóa.",
    "file": "Huc Bridge.jpg",
    "attractions": [
      {
        "name": "Hồ Hoàn Kiếm",
        "desc": "Dạo quanh hồ, ngắm Tháp Rùa và cầu Thê Húc.",
        "price": "Miễn phí quanh hồ; đền có thể thu vé",
        "time": "Sáng sớm, chiều mát",
        "tip": "Đi bộ quanh hồ"
      },
      {
        "name": "Văn Miếu – Quốc Tử Giám",
        "desc": "Khám phá kiến trúc cổ và truyền thống hiếu học.",
        "price": "Có vé",
        "time": "Buổi sáng",
        "tip": "Mặc lịch sự"
      },
      {
        "name": "Phố cổ Hà Nội",
        "desc": "Khám phá phố nghề và ẩm thực đường phố.",
        "price": "Miễn phí dạo phố; ăn uống tự túc",
        "time": "Chiều tối",
        "tip": "Đi bộ và giữ đồ cá nhân"
      },
      {
        "name": "Lăng Chủ tịch Hồ Chí Minh",
        "desc": "Tìm hiểu lịch sử tại khu vực Ba Đình.",
        "price": "Kiểm tra quy định hiện hành",
        "time": "Buổi sáng theo lịch mở cửa",
        "tip": "Mặc trang nghiêm, kiểm tra lịch viếng"
      },
      {
        "name": "Hoàng thành Thăng Long",
        "desc": "Tham quan các dấu tích kinh thành xưa.",
        "price": "Có vé",
        "time": "Sáng hoặc chiều",
        "tip": "Dành thời gian xem khu khảo cổ"
      }
    ]
  },
  {
    "id": "halong",
    "name": "Hạ Long",
    "region": "north",
    "desc": "Kỳ quan đá vôi giữa biển xanh.",
    "file": "Hạ Long Bay Panorama, Vietnam.jpg",
    "attractions": [
      {
        "name": "Vịnh Hạ Long",
        "desc": "Du ngoạn giữa các đảo đá vôi.",
        "price": "Vé tuyến và tàu",
        "time": "Ngày trời quang",
        "tip": "Kiểm tra dự báo biển"
      },
      {
        "name": "Hang Sửng Sốt",
        "desc": "Khám phá hang động lớn trên đảo Bồ Hòn.",
        "price": "Theo vé tuyến tàu",
        "time": "Ban ngày",
        "tip": "Mang giày chống trượt"
      },
      {
        "name": "Đảo Ti Tốp",
        "desc": "Ngắm vịnh từ đỉnh đảo hoặc thư giãn bên bãi biển.",
        "price": "Theo vé tuyến tàu",
        "time": "Ngày trời quang",
        "tip": "Mang nước khi leo bậc"
      },
      {
        "name": "Bảo tàng Quảng Ninh",
        "desc": "Tìm hiểu lịch sử và thiên nhiên vùng mỏ.",
        "price": "Có vé",
        "time": "Buổi sáng",
        "tip": "Kiểm tra ngày mở cửa"
      },
      {
        "name": "Bãi Cháy",
        "desc": "Đi dạo và nghỉ ngơi bên bờ biển.",
        "price": "Tùy dịch vụ",
        "time": "Chiều mát",
        "tip": "Chỉ tắm ở khu vực an toàn"
      }
    ]
  },
  {
    "id": "sapa",
    "name": "Sa Pa",
    "region": "north",
    "desc": "Núi rừng Tây Bắc, mây và ruộng bậc thang.",
    "file": "Rice terraces in Sapa, Vietnam.jpg",
    "attractions": [
      {
        "name": "Fansipan",
        "desc": "Ngắm cảnh núi cao và mây trời.",
        "price": "Cáp treo và dịch vụ có phí",
        "time": "Ngày ít mây",
        "tip": "Mang áo ấm"
      },
      {
        "name": "Bản Cát Cát",
        "desc": "Tìm hiểu văn hóa bản làng.",
        "price": "Có vé",
        "time": "Buổi sáng",
        "tip": "Tôn trọng sinh hoạt địa phương"
      },
      {
        "name": "Núi Hàm Rồng",
        "desc": "Đi bộ qua vườn hoa và điểm ngắm cảnh.",
        "price": "Có thể thu vé",
        "time": "Ngày khô ráo",
        "tip": "Mang giày bám tốt"
      },
      {
        "name": "Thung lũng Mường Hoa",
        "desc": "Ngắm ruộng bậc thang và bản làng.",
        "price": "Tùy tuyến và dịch vụ",
        "time": "Mùa lúa, ngày khô",
        "tip": "Hỏi hướng dẫn địa phương"
      },
      {
        "name": "Thác Bạc",
        "desc": "Ngắm dòng thác giữa núi rừng.",
        "price": "Có thể thu vé",
        "time": "Ban ngày",
        "tip": "Tránh đá trơn"
      }
    ]
  },
  {
    "id": "hue",
    "name": "Huế",
    "region": "central",
    "desc": "Dấu ấn cố đô bên dòng Hương thơ mộng.",
    "file": "Ngo Mon.jpg",
    "attractions": [
      {
        "name": "Đại Nội",
        "desc": "Khám phá cung điện và kiến trúc triều Nguyễn.",
        "price": "Có vé",
        "time": "Buổi sáng",
        "tip": "Mang mũ và nước"
      },
      {
        "name": "Chùa Thiên Mụ",
        "desc": "Thăm ngôi chùa cổ bên sông Hương.",
        "price": "Thường miễn phí",
        "time": "Sáng sớm",
        "tip": "Giữ yên tĩnh"
      },
      {
        "name": "Lăng Khải Định",
        "desc": "Chiêm ngưỡng nghệ thuật trang trí và kiến trúc.",
        "price": "Có vé",
        "time": "Sáng hoặc chiều",
        "tip": "Chuẩn bị leo bậc"
      },
      {
        "name": "Lăng Minh Mạng",
        "desc": "Khám phá cảnh quan lăng tẩm hài hòa.",
        "price": "Có vé",
        "time": "Buổi sáng",
        "tip": "Dành thời gian đi bộ"
      },
      {
        "name": "Sông Hương",
        "desc": "Ngắm cảnh đôi bờ và trải nghiệm thuyền.",
        "price": "Dạo bờ miễn phí; thuyền có phí",
        "time": "Chiều tối",
        "tip": "Hỏi giá trước khi đi thuyền"
      }
    ]
  },
  {
    "id": "danang",
    "name": "Đà Nẵng",
    "region": "central",
    "desc": "Thành phố biển với núi, sông và những cây cầu.",
    "file": "My Khe Beach, Da Nang, Vietnam.jpg",
    "attractions": [
      {
        "name": "Bà Nà Hills",
        "desc": "Khám phá khu vui chơi và Cầu Vàng.",
        "price": "Vé khu du lịch",
        "time": "Ngày trời quang",
        "tip": "Kiểm tra thời tiết trên núi"
      },
      {
        "name": "Biển Mỹ Khê",
        "desc": "Thư giãn bên bờ biển.",
        "price": "Tùy dịch vụ",
        "time": "Sáng sớm hoặc chiều",
        "tip": "Tuân thủ cờ cảnh báo"
      },
      {
        "name": "Ngũ Hành Sơn",
        "desc": "Tham quan hang động và chùa.",
        "price": "Có vé ở một số khu",
        "time": "Buổi sáng",
        "tip": "Mang giày chống trượt"
      },
      {
        "name": "Bán đảo Sơn Trà",
        "desc": "Ngắm rừng và biển từ các điểm dừng.",
        "price": "Tùy tuyến",
        "time": "Ban ngày",
        "tip": "Tuân thủ quy định tuyến đường"
      },
      {
        "name": "Cầu Rồng",
        "desc": "Ngắm kiến trúc cầu qua sông Hàn.",
        "price": "Miễn phí ngắm cầu",
        "time": "Buổi tối",
        "tip": "Kiểm tra lịch trình diễn"
      }
    ]
  },
  {
    "id": "hoian",
    "name": "Hội An",
    "region": "central",
    "desc": "Phố cổ với sắc vàng và ánh đèn lồng.",
    "file": "Hoi An Ancient town.jpg",
    "attractions": [
      {
        "name": "Chùa Cầu",
        "desc": "Ngắm biểu tượng kiến trúc của phố cổ.",
        "price": "Theo quy định vé khu phố",
        "time": "Buổi sáng",
        "tip": "Không cản lối đi"
      },
      {
        "name": "Phố cổ Hội An",
        "desc": "Khám phá nhà cổ, đèn lồng và phố đi bộ.",
        "price": "Vé tùy điểm tham quan",
        "time": "Chiều tối",
        "tip": "Tôn trọng không gian di sản"
      },
      {
        "name": "Làng rau Trà Quế",
        "desc": "Tìm hiểu nghề trồng rau truyền thống.",
        "price": "Tùy trải nghiệm",
        "time": "Buổi sáng",
        "tip": "Đặt trước hoạt động làm vườn"
      },
      {
        "name": "Rừng dừa Bảy Mẫu",
        "desc": "Trải nghiệm cảnh quan sông nước và thuyền thúng.",
        "price": "Dịch vụ thuyền có phí",
        "time": "Ngày khô ráo",
        "tip": "Mặc áo phao"
      },
      {
        "name": "Biển An Bàng",
        "desc": "Nghỉ ngơi bên bãi biển.",
        "price": "Tùy dịch vụ",
        "time": "Sáng hoặc chiều",
        "tip": "Chú ý sóng và dòng chảy"
      }
    ]
  },
  {
    "id": "hochiminh",
    "name": "TP. Hồ Chí Minh",
    "region": "south",
    "desc": "Nhịp sống hiện đại hòa cùng những công trình lịch sử.",
    "file": "Ho Chi Minh skyline.jpg",
    "attractions": [
      {
        "name": "Dinh Độc Lập",
        "desc": "Tìm hiểu lịch sử và kiến trúc công trình.",
        "price": "Có vé",
        "time": "Buổi sáng",
        "tip": "Kiểm tra lịch tham quan"
      },
      {
        "name": "Bưu điện Thành phố",
        "desc": "Ngắm kiến trúc và không gian bưu điện.",
        "price": "Thường miễn phí vào sảnh",
        "time": "Ban ngày",
        "tip": "Tôn trọng hoạt động bưu điện"
      },
      {
        "name": "Chợ Bến Thành",
        "desc": "Khám phá hàng hóa và ẩm thực.",
        "price": "Mua sắm tự túc",
        "time": "Ban ngày",
        "tip": "Hỏi giá trước khi mua"
      },
      {
        "name": "Bảo tàng Chứng tích Chiến tranh",
        "desc": "Tìm hiểu lịch sử qua hiện vật và tư liệu.",
        "price": "Có vé",
        "time": "Sáng hoặc chiều",
        "tip": "Giữ trật tự"
      },
      {
        "name": "Phố đi bộ Nguyễn Huệ",
        "desc": "Tận hưởng không khí trung tâm thành phố.",
        "price": "Miễn phí dạo phố",
        "time": "Chiều tối",
        "tip": "Giữ đồ cá nhân"
      }
    ]
  },
  {
    "id": "phuquoc",
    "name": "Phú Quốc",
    "region": "south",
    "desc": "Đảo ngọc với bờ biển và thiên nhiên nhiệt đới.",
    "file": "Phu Quoc Beach.jpg",
    "attractions": [
      {
        "name": "Bãi Sao",
        "desc": "Ngắm biển và thư giãn trên bãi cát.",
        "price": "Tùy dịch vụ",
        "time": "Ngày biển êm",
        "tip": "Chú ý khu vực tắm"
      },
      {
        "name": "Bãi Khem",
        "desc": "Khám phá bờ biển phía nam đảo.",
        "price": "Tùy khu vực và dịch vụ",
        "time": "Ngày trời đẹp",
        "tip": "Kiểm tra lối vào công cộng"
      },
      {
        "name": "Hòn Thơm",
        "desc": "Trải nghiệm cảnh biển đảo và khu vui chơi.",
        "price": "Cáp treo hoặc tàu có phí",
        "time": "Ngày biển êm",
        "tip": "Kiểm tra lịch vận hành"
      },
      {
        "name": "Vườn quốc gia Phú Quốc",
        "desc": "Khám phá hệ sinh thái rừng đảo.",
        "price": "Tùy tuyến và hướng dẫn",
        "time": "Ngày khô ráo",
        "tip": "Chỉ đi tuyến được phép"
      },
      {
        "name": "Dinh Cậu",
        "desc": "Ngắm biển và tìm hiểu tín ngưỡng địa phương.",
        "price": "Thường miễn phí",
        "time": "Chiều mát",
        "tip": "Mặc lịch sự"
      }
    ]
  },
  {
    "id": "cantho",
    "name": "Cần Thơ",
    "region": "south",
    "desc": "Nhịp sống sông nước đặc trưng của miền Tây.",
    "file": "Floating Market Can Tho2.jpg",
    "attractions": [
      {
        "name": "Chợ nổi Cái Răng",
        "desc": "Khám phá hoạt động mua bán trên sông.",
        "price": "Thuê thuyền có phí",
        "time": "Sáng sớm",
        "tip": "Mặc áo phao, hỏi giá"
      },
      {
        "name": "Bến Ninh Kiều",
        "desc": "Dạo bờ sông và ngắm cảnh thành phố.",
        "price": "Miễn phí dạo bến",
        "time": "Chiều tối",
        "tip": "Giữ đồ cá nhân"
      },
      {
        "name": "Nhà cổ Bình Thủy",
        "desc": "Tham quan kiến trúc nhà cổ Nam Bộ.",
        "price": "Có thể thu vé",
        "time": "Ban ngày",
        "tip": "Tôn trọng không gian nhà cổ"
      },
      {
        "name": "Thiền viện Trúc Lâm Phương Nam",
        "desc": "Thăm không gian kiến trúc Phật giáo.",
        "price": "Thường miễn phí",
        "time": "Buổi sáng",
        "tip": "Mặc lịch sự"
      },
      {
        "name": "Cồn Sơn",
        "desc": "Trải nghiệm vườn trái cây và sinh hoạt miệt vườn.",
        "price": "Tùy gói trải nghiệm",
        "time": "Ban ngày",
        "tip": "Đặt trước với người dân"
      }
    ]
  }
];

// Dữ liệu và trạng thái của trang
const regions = { north: 'Miền Bắc', central: 'Miền Trung', south: 'Miền Nam' };
const $ = id => document.getElementById(id);
const imageFolder = 'assets/images/destinations/';
let region = 'all';
let visible = destinations.slice();
let slideIndex = 0;
let timer = null;
let paused = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let selected = null;
let lastTrigger = null;

function normalize(text) {
    return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').trim();
}
function sourceUrl(place) {
    return 'https://commons.wikimedia.org/wiki/File:' + encodeURIComponent(place.file.replace(/ /g, '_'));
}
function remoteImage(place) {
    return 'https://commons.wikimedia.org/wiki/Special:FilePath/' + encodeURIComponent(place.file.replace(/ /g, '_')) + '?width=1600';
}
function mapUrl(name, city) {
    return 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(name + ', ' + city + ', Việt Nam');
}

// Ưu tiên GIF hoặc ảnh đã tải về, nếu chưa có thì dùng ảnh Commons
function setImage(img, place, animated = false) {
    const paths = animated ? [imageFolder + place.id + '.gif', imageFolder + place.id + '.jpg', remoteImage(place)] : [imageFolder + place.id + '.jpg', remoteImage(place), imageFolder + place.id + '.gif'];
    let index = 0;
    img.onerror = () => {
        index++;
        if (index < paths.length) img.src = paths[index];
        else { img.onerror = null; img.hidden = true; }
    };
    img.src = paths[0];
}
function renderSlide() {
    $('dest-hero').hidden = visible.length === 0;
    if (!visible.length) return;
    const place = visible[slideIndex];
    const img = document.createElement('img');
    img.alt = '';
    setImage(img, place, !paused);
    $('hero-media').replaceChildren(img);
    $('hero-region').textContent = regions[place.region] + ' · Việt Nam';
    $('hero-title').textContent = 'Khám phá ' + place.name;
    $('hero-description').textContent = place.desc;
    $('hero-source').href = sourceUrl(place);
    $('slide-dots').replaceChildren();
    visible.forEach((item, index) => {
        const dot = document.createElement('button');
        dot.className = 'slide-dot';
        dot.setAttribute('aria-label', 'Hiển thị ' + item.name);
        dot.setAttribute('aria-pressed', String(index === slideIndex));
        dot.onclick = () => { slideIndex = index; renderSlide(); startSlideshow(); };
        $('slide-dots').append(dot);
    });
}
function moveSlide(step) {
    if (!visible.length) return;
    slideIndex = (slideIndex + step + visible.length) % visible.length;
    renderSlide();
}
function stopSlideshow() { clearInterval(timer); timer = null; }
function startSlideshow() {
    stopSlideshow();
    if (!paused && !selected && visible.length > 1) timer = setInterval(() => moveSlide(1), 5000);
}
function updatePause() {
    $('pause-slide').textContent = paused ? '▶' : 'Ⅱ';
    $('pause-slide').setAttribute('aria-label', paused ? 'Tiếp tục trình chiếu' : 'Tạm dừng trình chiếu');
    $('dest-hero').classList.toggle('is-paused', paused);
}
function renderDestinations() {
    const grid = $('destination-grid');
    grid.replaceChildren();
    visible.forEach(place => {
        const card = document.createElement('article');
        card.className = 'dest-card';
        card.innerHTML = `<div class="card-media"><img alt="" loading="lazy"></div><div class="card-copy"><span class="dest-label">${regions[place.region]}</span><h3>${place.name}</h3><p>${place.desc}</p><p class="dest-label">5 điểm tham quan</p><button class="btn-primary">Khám phá chi tiết →</button><a class="image-credit" href="${sourceUrl(place)}" target="_blank" rel="noopener">Nguồn ảnh</a></div>`;
        setImage(card.querySelector('img'), place);
        card.querySelector('button').onclick = event => showDestinationDetail(place, event.currentTarget);
        grid.append(card);
    });
    $('destination-count').textContent = visible.length + ' điểm đến';
    $('no-results').hidden = visible.length !== 0;
}
function applyFilters() {
    const keyword = normalize($('destination-search').value);
    visible = destinations.filter(place => (region === 'all' || place.region === region) && normalize(place.name).includes(keyword));
    slideIndex = 0;
    renderDestinations(); renderSlide(); startSlideshow();
}
function showDestinationDetail(place, trigger) {
    selected = place; lastTrigger = trigger;
    stopSlideshow();
    $('directory-view').hidden = true;
    $('detail-view').hidden = false;
    document.body.classList.add('detail-mode');
    const content = $('detail-content');
    content.innerHTML = `<div class="page-width detail-intro"><div class="detail-cover"><img alt="Phong cảnh ${place.name}"></div><div class="detail-copy"><span class="dest-label">${regions[place.region]} · Việt Nam</span><h1>${place.name}</h1><p>${place.desc}</p><p class="dest-label">5 điểm tham quan nổi bật</p><a class="image-credit" href="${sourceUrl(place)}" target="_blank" rel="noopener">Nguồn ảnh phong cảnh</a></div></div><section class="page-width attraction-list"><h2>5 địa điểm không thể bỏ qua</h2><p class="dest-note">Chi phí chỉ phân loại tham khảo, không phải bảng giá hiện hành. Hãy kiểm tra trước chuyến đi.</p><div class="dest-grid" id="attraction-grid"></div></section>`;
    setImage(content.querySelector('img'), place);
    const grid = $('attraction-grid');
    place.attractions.forEach((item, index) => {
        const card = document.createElement('article');
        card.className = 'attraction-card';
        const imgPath = imageFolder + place.id + '/' + (index + 1) + '.jpg';
        card.innerHTML = `<div class="attraction-media"><img alt="${item.name}" loading="lazy"><span>0${index + 1}</span></div><div class="card-copy"><h3>${item.name}</h3><p>${item.desc}</p><dl><dt>Chi phí tham khảo</dt><dd>${item.price}</dd><dt>Thời điểm thích hợp</dt><dd>${item.time}</dd><dt>Kinh nghiệm</dt><dd>${item.tip}</dd></dl><a class="btn-secondary map-link" href="${mapUrl(item.name, place.name)}" target="_blank" rel="noopener">Xem Google Maps ↗</a></div>`;
        const img = card.querySelector('img');
        img.onerror = () => { img.hidden = true; };
        img.src = imgPath;
        grid.append(card);
    });
    window.scrollTo(0, 0); $('back-button').focus({preventScroll:true});
}
function backToDestinations() {
    selected = null;
    $('detail-view').hidden = true;
    $('directory-view').hidden = false;
    document.body.classList.remove('detail-mode');
    startSlideshow();
    if (lastTrigger) lastTrigger.focus();
}
$('region-buttons').addEventListener('click', event => {
    const button = event.target.closest('button[data-region]');
    if (!button) return;
    region = button.dataset.region;
    $('destination-search').value = '';
    $('region-buttons').querySelectorAll('button').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    applyFilters();
});
$('destination-search').addEventListener('input', applyFilters);
$('prev-slide').onclick = () => { moveSlide(-1); startSlideshow(); };
$('next-slide').onclick = () => { moveSlide(1); startSlideshow(); };
$('pause-slide').onclick = () => { paused = !paused; updatePause(); renderSlide(); startSlideshow(); };
$('hero-open').onclick = event => { if (visible.length) showDestinationDetail(visible[slideIndex], event.currentTarget); };
$('back-button').onclick = backToDestinations;
updatePause(); applyFilters();
