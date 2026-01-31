const TRANSLATIONS = {
  en: {
    title: 'Brand Production Timeline',
    subtitle: 'Explore the complete production journey from raw materials to UAE delivery.',
    selectBrand: 'Select Brand',
    stages: {
      'Raw Materials': 'Raw Materials',
      'Mixing': 'Mixing',
      'Tire Building': 'Tire Building',
      'Curing': 'Curing',
      'Quality Control': 'Quality Control',
      'Export to UAE': 'Export to UAE'
    }
  },
  ar: {
    title: 'الجدول الزمني لإنتاج العلامات التجارية',
    subtitle: 'استكشف رحلة الإنتاج الكاملة من المواد الخام إلى التوصيل في الإمارات.',
    selectBrand: 'اختر العلامة التجارية',
    stages: {
      'Raw Materials': 'المواد الخام',
      'Mixing': 'الخلط',
      'Tire Building': 'بناء الإطارات',
      'Curing': 'المعالجة',
      'Quality Control': 'مراقبة الجودة',
      'Export to UAE': 'التصدير إلى الإمارات'
    }
  },
  fa: {
    title: 'جدول زمانی تولید برندها',
    subtitle: 'سفر کامل تولید از مواد اولیه تا تحویل در امارات را کاوش کنید.',
    selectBrand: 'انتخاب برند',
    stages: {
      'Raw Materials': 'مواد اولیه',
      'Mixing': 'اختلاط',
      'Tire Building': 'ساخت تایر',
      'Curing': 'پخت',
      'Quality Control': 'کنترل کیفیت',
      'Export to UAE': 'صادرات به امارات'
    }
  }
};

export async function initBrandTimeline(lang = 'en') {
  try {
    const container = document.getElementById('production-timeline');
    if (!container) return;

    const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
    const isRTL = lang === 'ar' || lang === 'fa';

    const response = await fetch('/data/brandTimelines.json');
    if (!response.ok) {
      console.warn('Timeline data not available');
      return;
    }

    const timelineData = await response.json();

    container.innerHTML = `
      <div class="mb-8">
        <h2 class="text-3xl font-extrabold mb-2">${t.title}</h2>
        <p class="text-neutral-400">${t.subtitle}</p>
      </div>

      <div class="mb-8">
        <label class="block text-sm text-neutral-400 mb-2">${t.selectBrand}</label>
        <select id="timelineBrandSelect" class="bg-white/5 border border-white/10 rounded-xl px-4 py-3 w-full max-w-md text-lg">
          <option value="Firemax">Firemax</option>
          <option value="Vikrant">Vikrant</option>
          <option value="Bridgestone">Bridgestone</option>
          <option value="Duraturn">Duraturn</option>
          <option value="Dovroad">Dovroad</option>
          <option value="Kpatos">Kpatos</option>
          <option value="Haida">Haida</option>
          <option value="JK Tyres">JK Tyres</option>
        </select>
      </div>

      <div id="timelineStages" class="timeline-container relative">
        <div class="timeline-line${isRTL ? ' rtl' : ''}"></div>
      </div>
    `;

    function renderTimeline(brandName) {
      const stagesContainer = document.getElementById('timelineStages');
      if (!stagesContainer) return;

      const stages = timelineData[brandName];
      if (!stages) return;

      stagesContainer.innerHTML = `<div class="timeline-line${isRTL ? ' rtl' : ''}"></div>`;

      stages.forEach((stage, index) => {
        setTimeout(() => {
          const stageEl = document.createElement('div');
          stageEl.className = `timeline-stage${isRTL ? ' rtl' : ''}`;
          stageEl.style.animationDelay = `${index * 0.1}s`;

          const dotEl = document.createElement('div');
          dotEl.className = `timeline-dot${isRTL ? ' rtl' : ''}`;

          const contentEl = document.createElement('div');
          contentEl.className = 'glass rounded-2xl p-5 border border-white/10';

          const translatedStage = t.stages[stage.stage] || stage.stage;

          let html = `<h3 class="text-xl font-bold mb-2">${translatedStage}</h3>`;
          html += `<p class="text-emerald-400 text-sm mb-2">${stage.location}</p>`;
          if (stage.duration) {
            html += `<span class="inline-block px-3 py-1 rounded-full bg-white/10 text-xs text-neutral-200">${stage.duration}</span>`;
          }

          contentEl.innerHTML = html;
          stageEl.appendChild(dotEl);
          stageEl.appendChild(contentEl);
          stagesContainer.appendChild(stageEl);
        }, index * 100);
      });
    }

    const selectEl = document.getElementById('timelineBrandSelect');
    if (selectEl) {
      selectEl.addEventListener('change', function() {
        renderTimeline(this.value);
      });

      renderTimeline('Firemax');
    }
  } catch (err) {
    console.warn('Timeline initialization failed (non-blocking):', err);
  }
}
