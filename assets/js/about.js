(function () {
  'use strict';

  // Leave Pages and tag URLs blank until the group confirms they are live.
  var CONFIG = {
    version: 'v1.0.0',
    repoUrl: 'https://github.com/DauCaoDung132/VietNamExplore',
    pagesUrl: '',
    reportUrl: 'https://github.com/DauCaoDung132/VietNamExplore/blob/main/docs/REPORT.md',
    tagUrl: ''
  };

  // Fill each name and GitHub handle with the member's confirmed details.
  var MEMBERS = [
    {
      name: 'Nguyễn Nhật Thùy Khanh',
      github: 'Yuru2812',
      tone: 'red',
      role: 'Trang chủ và thống nhất giao diện',
      pageLabel: 'Trang chủ',
      files: ['index.html', 'assets/css/home.css', 'assets/js/home.js'],
      code: 'Phụ trách nội dung trang chủ, các lối dẫn tới những trang khác và slideshow; kiểm tra bố cục responsive.',
      git: 'Khởi tạo cấu trúc dự án và thống nhất quy ước giao diện dùng chung cho nhóm.',
      report: 'Tổng hợp phần Project Overview, liên kết repository và phần giới thiệu sản phẩm.'
    },
    {
      name: 'Đậu Cao Dũng',
      github: 'DauCaoDung132',
      tone: 'gold',
      role: 'Địa điểm du lịch và thực hành conflict',
      pageLabel: 'Địa điểm',
      files: ['destinations.html', 'assets/css/destinations.css', 'assets/js/destinations.js'],
      code: 'Phụ trách các thẻ địa điểm, hình ảnh, mô tả và bộ lọc Bắc – Trung – Nam.',
      git: 'Phối hợp tạo và giải quyết merge conflict trên index.html trong Task 4.',
      report: 'Ghi nhận nhánh làm việc và phần thực hành conflict.'
    },
    {
      name: 'Nguyễn Diệp Vĩnh Khang',
      github: 'KhangNguyendotcpp',
      tone: 'green',
      role: 'Ẩm thực, review và conflict',
      pageLabel: 'Ẩm thực',
      files: ['food.html', 'assets/css/food.css', 'assets/js/food.js'],
      code: 'Phụ trách nội dung món ăn ba miền và bộ lọc theo vùng.',
      git: 'Tham gia giải quyết conflict và review Pull Request của thành viên khác.',
      report: 'Ghi nhận quy trình Pull Request, review và phần thực hành conflict.'
    },
    {
      name: 'Nguyễn Phi Bảo Bình',
      github: 'npbbinh2511-arch',
      tone: 'blue',
      role: 'Văn hóa và ghi nhận revert',
      pageLabel: 'Văn hóa',
      files: ['culture.html', 'assets/css/culture.css', 'assets/js/culture.js'],
      code: 'Phụ trách nội dung lễ hội, trang phục và phong tục; bổ sung tương tác mở rộng nội dung.',
      git: 'Phối hợp tạo commit có liên kết điều hướng sai để thực hành Task 5.',
      report: 'Ghi nhận commit gây lỗi và phối hợp kiểm tra quy trình revert.'
    },
    {
      name: 'Trương Cẩm Tú Nga',
      github: 'tunnnga2605-png',
      tone: 'red',
      role: 'Kinh nghiệm và kiểm thử',
      pageLabel: 'Kinh nghiệm',
      files: ['tips.html', 'assets/css/tips.css', 'assets/js/tips.js'],
      code: 'Phụ trách nội dung hành lý, chi phí, di chuyển, câu hỏi thường gặp và checklist.',
      git: 'Thực hiện revert commit lỗi cùng thành viên 4 và kiểm tra lại liên kết.',
      report: 'Tổng hợp kết quả kiểm thử liên kết và phần Task 5.'
    },
    {
      name: 'Nguyễn Minh Huy',
      github: 'nmhuy1211',
      tone: 'gold',
      role: 'Giới thiệu nhóm và phát hành',
      pageLabel: 'Giới thiệu',
      files: ['about.html', 'assets/css/about.css', 'assets/js/about.js'],
      code: 'Phụ trách trang giới thiệu nhóm, dự án, công nghệ và cửa sổ chi tiết thành viên; kiểm tra bố cục responsive.',
      git: 'Điều phối chuẩn bị README.md, CHANGELOG.md, tag v1.0.0, GitHub Pages và kiểm tra liên kết công khai.',
      report: 'Tổng hợp Task 6, kết quả cuối cùng và nội dung slide release/demo.'
    }
  ];

  var SVG_NS = 'http://www.w3.org/2000/svg';
  var dialog;
  var activeMember = -1;
  var lastTrigger = null;

  function element(tag, attributes, children) {
    var node = document.createElement(tag);
    Object.keys(attributes || {}).forEach(function (key) {
      if (key === 'text') {
        node.textContent = attributes[key];
      } else {
        node.setAttribute(key, attributes[key]);
      }
    });
    (children || []).forEach(function (child) {
      node.appendChild(child);
    });
    return node;
  }

  function memberName(member, index) {
    return member.name.trim() || 'Thành viên ' + (index + 1);
  }

  function memberInitials(member, index) {
    var name = member.name.trim();
    if (!name) return String(index + 1);
    var parts = name.split(/\s+/);
    return (parts[0].charAt(0) + (parts.length > 1 ? parts[parts.length - 1].charAt(0) : '')).toUpperCase();
  }

  function updateMemberHash(index) {
    var hash = '#thanh-vien-' + (index + 1);
    if (window.location.protocol === 'file:') {
      window.location.hash = hash;
    } else if (window.history && window.history.replaceState) {
      window.history.replaceState(null, '', hash);
    }
  }

  function clearMemberHash() {
    if (window.location.protocol === 'file:') {
      window.location.hash = '';
    } else if (window.history && window.history.replaceState) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  }

  function buildRoute() {
    var path = document.getElementById('route-path');
    var group = document.getElementById('route-stops');
    if (!path || !group || typeof path.getPointAtLength !== 'function') return;

    var totalLength = path.getTotalLength();
    MEMBERS.forEach(function (member, index) {
      var point = path.getPointAtLength(totalLength * (0.1 + (0.8 * index) / (MEMBERS.length - 1)));
      var labelOnRight = point.x < 190;
      var stop = document.createElementNS(SVG_NS, 'g');
      stop.setAttribute('class', 'stop tone-' + member.tone);
      stop.setAttribute('tabindex', '0');
      stop.setAttribute('role', 'button');
      stop.setAttribute('aria-label', memberName(member, index) + ', ' + member.pageLabel + '. Xem chi tiết.');
      stop.style.setProperty('--stop-index', index);

      var dot = document.createElementNS(SVG_NS, 'circle');
      dot.setAttribute('class', 'stop-dot');
      dot.setAttribute('cx', point.x);
      dot.setAttribute('cy', point.y);
      dot.setAttribute('r', 20);

      var number = document.createElementNS(SVG_NS, 'text');
      number.setAttribute('class', 'stop-num');
      number.setAttribute('x', point.x);
      number.setAttribute('y', point.y);
      number.textContent = String(index + 1);

      var label = document.createElementNS(SVG_NS, 'text');
      label.setAttribute('class', 'stop-label');
      label.setAttribute('x', labelOnRight ? point.x + 32 : point.x - 32);
      label.setAttribute('y', point.y);
      label.setAttribute('text-anchor', labelOnRight ? 'start' : 'end');
      label.textContent = member.pageLabel;

      stop.appendChild(dot);
      stop.appendChild(number);
      stop.appendChild(label);
      stop.addEventListener('click', function () {
        openMember(index, stop);
      });
      stop.addEventListener('keydown', function (event) {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openMember(index, stop);
        }
      });
      group.appendChild(stop);
    });
  }

  function buildCards() {
    var grid = document.getElementById('team-grid');
    if (!grid) return;

    MEMBERS.forEach(function (member, index) {
      var name = memberName(member, index);
      var button = element('button', {
        type: 'button',
        class: 'btn-secondary',
        text: 'Xem chi tiết'
      });
      button.setAttribute('aria-label', 'Xem chi tiết ' + name);
      button.addEventListener('click', function () {
        openMember(index, button);
      });

      var heading = element('div', {}, [
        element('p', { class: 'member-index', text: 'Thành viên ' + (index + 1) }),
        element('h3', { text: name })
      ]);

      var card = element('article', {
        class: 'member-card tone-' + member.tone,
        id: 'thanh-vien-' + (index + 1)
      }, [
        element('div', { class: 'member-top' }, [
          element('div', { class: 'member-avatar', 'aria-hidden': 'true', text: memberInitials(member, index) }),
          heading
        ]),
        element('p', { class: 'member-role', text: member.role }),
        element('p', { class: 'member-page', text: 'Trang phụ trách: ' + member.pageLabel }),
        button
      ]);
      grid.appendChild(card);
    });
  }

  function detailSection(title, content) {
    return element('section', { class: 'dialog-section' }, [
      element('h3', { text: title }),
      element('p', { text: content })
    ]);
  }

  function renderMember(index) {
    var member = MEMBERS[index];
    activeMember = index;
    dialog.className = 'member-dialog tone-' + member.tone;

    document.getElementById('dialog-avatar').textContent = memberInitials(member, index);
    document.getElementById('dialog-kicker').textContent = 'Thành viên ' + (index + 1) + ' trên ' + MEMBERS.length;
    document.getElementById('dialog-name').textContent = memberName(member, index);
    document.getElementById('dialog-role').textContent = member.role;

    var body = document.getElementById('dialog-body');
    body.replaceChildren();

    var files = element('div', { class: 'dialog-files' });
    member.files.forEach(function (file) {
      var fileElement = /\.html$/i.test(file)
        ? element('a', { href: file, text: file })
        : element('code', { text: file });
      files.appendChild(fileElement);
    });
    body.appendChild(element('section', { class: 'dialog-section' }, [
      element('h3', { text: 'File phụ trách' }),
      files
    ]));
    body.appendChild(detailSection('Lập trình', member.code));
    body.appendChild(detailSection('Git và phối hợp', member.git));
    body.appendChild(detailSection('Báo cáo và slide', member.report));

    var github = member.github.trim().replace(/^@/, '');
    if (github) {
      body.appendChild(element('p', { class: 'dialog-extra' }, [
        document.createTextNode('GitHub: '),
        element('a', {
          href: 'https://github.com/' + encodeURIComponent(github),
          target: '_blank',
          rel: 'noopener noreferrer',
          text: '@' + github
        })
      ]));
    }

    var previousButton = document.getElementById('dialog-prev');
    var nextButton = document.getElementById('dialog-next');
    var previousDisabled = index === 0;
    var nextDisabled = index === MEMBERS.length - 1;
    if ((document.activeElement === previousButton && previousDisabled) ||
        (document.activeElement === nextButton && nextDisabled)) {
      document.getElementById('dialog-close').focus();
    }
    previousButton.disabled = previousDisabled;
    nextButton.disabled = nextDisabled;
    updateMemberHash(index);
  }

  function openMember(index, trigger) {
    if (index < 0 || index >= MEMBERS.length || !dialog) return;
    if (trigger) lastTrigger = trigger;
    renderMember(index);
    if (!dialog.open) {
      if (typeof dialog.showModal === 'function') {
        dialog.showModal();
      } else {
        dialog.setAttribute('open', '');
      }
    }
    document.getElementById('dialog-close').focus();
  }

  function finishClose() {
    activeMember = -1;
    clearMemberHash();
    if (lastTrigger && document.contains(lastTrigger)) lastTrigger.focus();
  }

  function closeMember() {
    if (typeof dialog.close === 'function') {
      dialog.close();
    } else {
      dialog.removeAttribute('open');
      finishClose();
    }
  }

  function openMemberFromHash() {
    var match = /^#thanh-vien-([1-6])$/.exec(window.location.hash);
    if (!match) return;
    var index = Number(match[1]) - 1;
    if (activeMember !== index) openMember(index);
  }

  function initDialog() {
    dialog = document.getElementById('member-dialog');
    if (!dialog) return;

    document.getElementById('dialog-close').addEventListener('click', closeMember);
    document.getElementById('dialog-prev').addEventListener('click', function () {
      openMember(activeMember - 1);
    });
    document.getElementById('dialog-next').addEventListener('click', function () {
      openMember(activeMember + 1);
    });
    dialog.addEventListener('click', function (event) {
      if (event.target === dialog) closeMember();
    });
    dialog.addEventListener('close', function () {
      if (activeMember !== -1) finishClose();
    });
    dialog.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeMember();
        return;
      }
      if (event.key === 'ArrowLeft' && activeMember > 0) openMember(activeMember - 1);
      if (event.key === 'ArrowRight' && activeMember < MEMBERS.length - 1) openMember(activeMember + 1);
    });

    window.addEventListener('hashchange', openMemberFromHash);
    if (document.readyState === 'complete') {
      openMemberFromHash();
    } else {
      window.addEventListener('load', openMemberFromHash, { once: true });
    }
  }

  function buildReleaseLinks() {
    var version = document.getElementById('release-version');
    var footerVersion = document.getElementById('footer-version');
    if (version) version.textContent = CONFIG.version;
    if (footerVersion) footerVersion.textContent = CONFIG.version;

    var list = document.getElementById('release-links');
    if (!list) return;
    var links = [
      ['Mở website (GitHub Pages)', CONFIG.pagesUrl],
      ['Xem mã nguồn', CONFIG.repoUrl],
      ['Đọc báo cáo', CONFIG.reportUrl],
      ['Xem tag ' + CONFIG.version, CONFIG.tagUrl]
    ];

    links.forEach(function (item) {
      if (!item[1]) return;
      var link = element('a', {
        class: 'btn-secondary',
        href: item[1],
        text: item[0]
      });
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      list.appendChild(element('li', {}, [link]));
    });
    if (list.children.length) list.hidden = false;
  }

  function init() {
    buildRoute();
    buildCards();
    initDialog();
    buildReleaseLinks();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
