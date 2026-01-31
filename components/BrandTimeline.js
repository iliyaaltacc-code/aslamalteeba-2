// Brand-specific stage explanations
const BRAND_EXPLANATIONS = {
  en: {
    Firemax: {
      'Raw Materials': 'Firemax sources natural rubber primarily from Southeast Asian supplier networks, combined with synthetic rubber, carbon black, steel wire, textile reinforcements, sulfur, and chemical agents. These inputs are selected to balance cost efficiency, durability, and regulatory compliance for global export markets.',
      'Mixing': 'Firemax compounds are produced in controlled internal mixers where heat, pressure, and shear forces are optimized. This stage ensures uniform dispersion of fillers and bonding agents to achieve consistent tread wear and heat resistance.',
      'Tire Building': 'Firemax tires are assembled on automated building drums where carcass plies, steel belts, beads, and tread are layered with millimeter-level precision to ensure structural integrity.',
      'Curing': 'The green tire undergoes vulcanization in heated molds, permanently bonding rubber molecules and locking in tread geometry, load capacity, and elasticity.',
      'Quality Control': 'Firemax applies multi-stage inspection including visual checks, uniformity testing, X-ray scanning, and balance verification to meet international safety standards.',
      'Export to UAE': 'Approved Firemax tires are containerized and shipped via Qingdao Port to Jebel Ali, where they enter regional distribution channels.'
    },
    Vikrant: {
      'Raw Materials': 'Vikrant sources natural rubber from the Indian rubber belt spanning Kerala and Tamil Nadu, supplemented with synthetic compounds for bias and radial commercial applications. This regional supply chain reduces lead times and ensures fresh material quality.',
      'Mixing': 'Vikrant compounds are formulated for commercial vehicle durability, using precision mixers to achieve optimal carbon black dispersion and reinforcement bonding for both bias and radial constructions.',
      'Tire Building': 'Vikrant tires are built on semi-automated and automated lines in Mysuru, with specialized processes for bias-ply and radial truck tire assembly to meet diverse fleet requirements.',
      'Curing': 'Curing processes are calibrated for commercial load ratings, with extended vulcanization cycles to ensure structural stability under heavy-duty conditions.',
      'Quality Control': 'Vikrant applies Indian regulatory standards and export specifications, including load testing, visual inspection, and dimensional verification for bias and radial products.',
      'Export to UAE': 'Vikrant tires benefit from shorter export distances via Mumbai or Cochin ports, reaching Jebel Ali in 5–12 days for rapid regional distribution.'
    },
    Bridgestone: {
      'Raw Materials': 'Bridgestone sources natural rubber from company-owned plantations in Sumatra, Kalimantan, and Liberia, ensuring traceability and sustainability. Synthetic compounds and reinforcements are procured from certified global suppliers.',
      'Mixing': 'Bridgestone uses advanced multi-stage mixing protocols with real-time monitoring to achieve precise compound specifications for performance, fuel efficiency, and environmental compliance.',
      'Tire Building': 'Bridgestone employs global manufacturing standards across regional plants, utilizing robotics and automation to maintain consistency in tire construction and quality across all production sites.',
      'Curing': 'Vulcanization is executed in high-precision molds with computer-controlled temperature and pressure profiles, ensuring uniform molecular bonding and dimensional accuracy.',
      'Quality Control': 'Bridgestone applies rigorous global QC protocols including uniformity machines, indoor and outdoor testing, and certification to ISO and regional safety standards.',
      'Export to UAE': 'Bridgestone tires are shipped from Thailand, India, or Indonesia via optimized logistics routes, with full traceability and documentation for customs and end-user verification.'
    },
    Duraturn: {
      'Raw Materials': 'Duraturn sources materials tailored to North American design requirements, focusing on commercial truck applications with emphasis on durability and regulatory compliance for export markets.',
      'Mixing': 'Duraturn compounds are engineered for commercial truck performance, utilizing shared Yongsheng manufacturing infrastructure in Guangrao to achieve cost-effective production without compromising quality.',
      'Tire Building': 'Duraturn tires are assembled on shared production lines optimized for commercial truck radial construction, with quality checkpoints integrated into the building process.',
      'Curing': 'Curing protocols follow North American commercial tire specifications, ensuring proper heat distribution and vulcanization for long-haul truck applications.',
      'Quality Control': 'Duraturn applies DOT and ECE verification standards, with dedicated testing for commercial load capacity, tread wear, and export compliance.',
      'Export to UAE': 'Duraturn tires are shipped via Qingdao Port with full documentation and certification, meeting international commercial vehicle requirements for UAE markets.'
    },
    Dovroad: {
      'Raw Materials': 'Dovroad sources materials optimized for motorcycle and passenger car radial (PCR) applications, with emphasis on lightweight construction and grip performance for diverse road conditions.',
      'Mixing': 'Dovroad compounds are developed at the Qingdao Double Road facility, focusing on motorcycle and PCR-specific formulations for balanced performance and cost efficiency.',
      'Tire Building': 'Dovroad employs high-volume production lines for motorcycle and PCR tires, with specialized building drums for different tire sizes and performance categories.',
      'Curing': 'Dovroad operates high-volume curing lines with rapid cycle times, maintaining quality standards while maximizing throughput for export-focused production.',
      'Quality Control': 'Dovroad implements export-driven QC protocols including dynamic balance testing, visual inspection, and compliance verification for international motorcycle and passenger tire standards.',
      'Export to UAE': 'Dovroad tires are containerized at Qingdao Port and shipped to Jebel Ali, serving UAE motorcycle and passenger vehicle markets with competitive pricing.'
    },
    Kpatos: {
      'Raw Materials': 'Kpatos sources materials for value-segment passenger tires, focusing on cost-effective natural and synthetic rubber blends that meet basic safety and performance requirements.',
      'Mixing': 'Kpatos employs simplified compound strategies at the Qingdao Sunfulcess facility, optimizing for production efficiency while maintaining acceptable performance levels for budget-conscious consumers.',
      'Tire Building': 'Kpatos tires are assembled using cost-optimized production methods, with streamlined processes that reduce manufacturing complexity while ensuring structural adequacy.',
      'Curing': 'Curing processes are calibrated for efficient cycle times and energy consumption, balancing vulcanization quality with production cost targets for value-segment markets.',
      'Quality Control': 'Kpatos applies baseline export testing and visual inspection to ensure compliance with minimum safety standards for international distribution.',
      'Export to UAE': 'Kpatos tires are shipped from Qingdao Port to Jebel Ali, targeting price-sensitive segments in UAE passenger vehicle markets.'
    },
    Haida: {
      'Raw Materials': 'Haida sources natural rubber via the Chengdu-Chongqing logistics corridor from Southeast Asian suppliers, combined with synthetic materials for large-scale commercial tire production.',
      'Mixing': 'Haida compounds are produced in Jianyang, Sichuan, with large-batch mixing capabilities designed for commercial truck and bus tire applications with consistent quality across high-volume production.',
      'Tire Building': 'Haida operates large-scale commercial tire production facilities in Jianyang, with multiple building lines dedicated to truck and bus radial tire assembly.',
      'Curing': 'Haida employs industrial-scale curing operations with multiple press lines, ensuring efficient processing of commercial tire volumes while maintaining vulcanization standards.',
      'Quality Control': 'Haida applies commercial tire testing protocols including load capacity verification, structural integrity checks, and compliance with Chinese and international export standards.',
      'Export to UAE': 'Haida tires utilize multi-modal export routing through Chongqing or Chengdu, then via Shanghai or Qingdao ports to Jebel Ali, optimizing logistics costs for commercial tire exports.'
    },
    'JK Tyres': {
      'Raw Materials': 'JK Tyres sources natural rubber from Kerala and Tamil Nadu within an ISCC-certified supply chain, demonstrating commitment to sustainability and traceability in raw material procurement.',
      'Mixing': 'JK Tyres operates mixing facilities across multiple plants in Mysuru, Chennai, and Laksar, employing consistent compound formulations and quality control across the production network.',
      'Tire Building': 'JK Tyres utilizes its multi-plant network with primary production at Vikrant and Mysuru facilities, applying standardized building processes across all locations for quality consistency.',
      'Curing': 'JK Tyres curing departments employ controlled vulcanization with monitoring systems that ensure uniform quality across the multi-plant production network.',
      'Quality Control': 'JK Tyres operates government-approved testing tracks and laboratories, conducting comprehensive testing including road simulation, durability, and performance verification.',
      'Export to UAE': 'JK Tyres benefits from proximity to UAE markets, shipping via Mumbai or Chennai ports with transit times of 5–12 days, ensuring fresh inventory and responsive supply chains.'
    }
  },
  ar: {
    Firemax: {
      'Raw Materials': 'تعتمد فايرماكس على المطاط الطبيعي من شبكات توريد جنوب شرق آسيا، إلى جانب المطاط الصناعي، والكربون الأسود، وأسلاك الفولاذ، وألياف التقوية، والكبريت، والمواد الكيميائية. يتم اختيار هذه المواد لتحقيق توازن بين الكفاءة الاقتصادية والمتانة والامتثال لمعايير التصدير الدولية.',
      'Mixing': 'تُحضّر مركبات فايرماكس داخل خلاطات داخلية محكومة بدقة من حيث الحرارة والضغط وقوى القص، مما يضمن توزيعاً متجانساً للحشوات وعوامل الترابط لتحقيق تآكل منتظم ومقاومة حرارية عالية.',
      'Tire Building': 'يتم تجميع إطارات فايرماكس على أسطوانات بناء آلية حيث تُرتب طبقات الهيكل، وأحزمة الفولاذ، والحواف، والمداس بدقة عالية لضمان السلامة الهيكلية.',
      'Curing': 'يخضع الإطار الخام لعملية الفلكنة داخل قوالب مسخنة، حيث يتم تثبيت البنية الجزيئية للمطاط ونقشة المداس والقدرة التحميلية بشكل دائم.',
      'Quality Control': 'تُطبّق فايرماكس فحوصات متعددة تشمل الفحص البصري، واختبارات التناسق، والتصوير بالأشعة السينية، والتحقق من التوازن وفق المعايير الدولية.',
      'Export to UAE': 'يتم شحن إطارات فايرماكس المعتمدة عبر ميناء تشينغداو إلى ميناء جبل علي للدخول في قنوات التوزيع الإقليمية.'
    },
    Vikrant: {
      'Raw Materials': 'تحصل فيكرانت على المطاط الطبيعي من الحزام المطاطي الهندي الممتد من كيرالا وتاميل نادو، مع إضافة مركبات صناعية للإطارات التجارية من نوع بايس ورادياليّة. تقلل هذه السلسلة الإقليمية من أوقات التوريد وتضمن جودة المواد الطازجة.',
      'Mixing': 'تُصاغ مركبات فيكرانت لمتانة المركبات التجارية، باستخدام خلاطات دقيقة لتحقيق توزيع مثالي للكربون الأسود وترابط التعزيزات لكل من بناءات بايس ورادياليّة.',
      'Tire Building': 'تُبنى إطارات فيكرانت على خطوط شبه آلية وآلية في ميسورو، مع عمليات متخصصة لتجميع إطارات الشاحنات من نوع بايس ورادياليّة لتلبية متطلبات الأساطيل المتنوعة.',
      'Curing': 'تُعاير عمليات المعالجة لتحمل الأحمال التجارية، مع دورات فلكنة ممتدة لضمان الاستقرار الهيكلي في ظروف الخدمة الشاقة.',
      'Quality Control': 'تطبق فيكرانت المعايير التنظيمية الهندية ومواصفات التصدير، بما في ذلك اختبار الحمولة والفحص البصري والتحقق الأبعادي لمنتجات بايس ورادياليّة.',
      'Export to UAE': 'تستفيد إطارات فيكرانت من المسافات القصيرة للتصدير عبر موانئ مومباي أو كوتشين، لتصل إلى جبل علي خلال 5-12 يوماً للتوزيع الإقليمي السريع.'
    },
    Bridgestone: {
      'Raw Materials': 'تحصل بريدجستون على المطاط الطبيعي من مزارع مملوكة للشركة في سومطرة وكاليمانتان وليبيريا، مما يضمن التتبع والاستدامة. يتم شراء المركبات الصناعية والتعزيزات من موردين عالميين معتمدين.',
      'Mixing': 'تستخدم بريدجستون بروتوكولات خلط متقدمة متعددة المراحل مع مراقبة في الوقت الفعلي لتحقيق مواصفات دقيقة للأداء والكفاءة في استهلاك الوقود والامتثال البيئي.',
      'Tire Building': 'تطبق بريدجستون معايير تصنيع عالمية عبر المصانع الإقليمية، باستخدام الروبوتات والأتمتة للحفاظ على اتساق بناء الإطارات والجودة في جميع مواقع الإنتاج.',
      'Curing': 'تُنفذ الفلكنة في قوالب عالية الدقة مع ملفات حرارة وضغط محكومة بالكمبيوتر، مما يضمن ترابطاً جزيئياً موحداً ودقة أبعادية.',
      'Quality Control': 'تطبق بريدجستون بروتوكولات مراقبة جودة عالمية صارمة تشمل آلات التناسق، والاختبار الداخلي والخارجي، والشهادات وفق معايير ISO والسلامة الإقليمية.',
      'Export to UAE': 'تُشحن إطارات بريدجستون من تايلاند أو الهند أو إندونيسيا عبر طرق لوجستية محسّنة، مع تتبع كامل ووثائق للجمارك والتحقق للمستخدم النهائي.'
    },
    Duraturn: {
      'Raw Materials': 'تحصل دوراتيرن على مواد مصممة حسب متطلبات التصميم الأمريكية الشمالية، مع التركيز على تطبيقات الشاحنات التجارية والتأكيد على المتانة والامتثال التنظيمي لأسواق التصدير.',
      'Mixing': 'صُممت مركبات دوراتيرن لأداء الشاحنات التجارية، باستخدام البنية التحتية المشتركة لشركة يونغشنغ في غوانغراو لتحقيق إنتاج فعال من حيث التكلفة دون المساس بالجودة.',
      'Tire Building': 'تُجمع إطارات دوراتيرن على خطوط إنتاج مشتركة محسّنة لبناء الشاحنات التجارية الرادياليّة، مع نقاط تفتيش للجودة مدمجة في عملية البناء.',
      'Curing': 'تتبع بروتوكولات المعالجة مواصفات الإطارات التجارية الأمريكية الشمالية، مما يضمن توزيع الحرارة والفلكنة المناسبين لتطبيقات الشاحنات طويلة المسافات.',
      'Quality Control': 'تطبق دوراتيرن معايير التحقق DOT وECE، مع اختبار مخصص لقدرة الحمولة التجارية، وتآكل المداس، والامتثال للتصدير.',
      'Export to UAE': 'تُشحن إطارات دوراتيرن عبر ميناء تشينغداو مع وثائق وشهادات كاملة، لتلبية متطلبات المركبات التجارية الدولية لأسواق الإمارات.'
    },
    Dovroad: {
      'Raw Materials': 'تحصل دوفرود على مواد محسّنة لتطبيقات الدراجات النارية والإطارات الشعاعية للركاب (PCR)، مع التأكيد على البناء الخفيف وأداء القبضة في ظروف الطرق المتنوعة.',
      'Mixing': 'تُطور مركبات دوفرود في منشأة تشينغداو دبل رود، مع التركيز على تركيبات خاصة بالدراجات النارية وPCR للأداء المتوازن والكفاءة في التكلفة.',
      'Tire Building': 'تستخدم دوفرود خطوط إنتاج عالية الحجم لإطارات الدراجات النارية وPCR، مع أسطوانات بناء متخصصة لأحجام الإطارات وفئات الأداء المختلفة.',
      'Curing': 'تشغل دوفرود خطوط معالجة عالية الحجم مع أوقات دورة سريعة، مع الحفاظ على معايير الجودة مع زيادة الإنتاجية للإنتاج الموجه للتصدير.',
      'Quality Control': 'تطبق دوفرود بروتوكولات مراقبة جودة موجهة للتصدير تشمل اختبار التوازن الديناميكي والفحص البصري والتحقق من الامتثال لمعايير الدراجات النارية والركاب الدولية.',
      'Export to UAE': 'تُحزم إطارات دوفرود في ميناء تشينغداو وتُشحن إلى جبل علي، لتخدم أسواق الدراجات النارية والركاب في الإمارات بأسعار تنافسية.'
    },
    Kpatos: {
      'Raw Materials': 'تحصل كباتوس على مواد لإطارات الركاب ذات القطاع القيمي، مع التركيز على خلطات المطاط الطبيعي والصناعي الفعالة من حيث التكلفة التي تلبي متطلبات السلامة والأداء الأساسية.',
      'Mixing': 'توظف كباتوس استراتيجيات مركبات مبسطة في منشأة تشينغداو سانفولسس، محسّنة لكفاءة الإنتاج مع الحفاظ على مستويات أداء مقبولة للمستهلكين المهتمين بالميزانية.',
      'Tire Building': 'تُجمع إطارات كباتوس باستخدام طرق إنتاج محسّنة التكلفة، مع عمليات مبسطة تقلل من تعقيد التصنيع مع ضمان الكفاية الهيكلية.',
      'Curing': 'تُعاير عمليات المعالجة لأوقات دورة واستهلاك طاقة فعالة، موازنة جودة الفلكنة مع أهداف تكلفة الإنتاج لأسواق القطاع القيمي.',
      'Quality Control': 'تطبق كباتوس اختبار التصدير الأساسي والفحص البصري لضمان الامتثال لمعايير السلامة الدنيا للتوزيع الدولي.',
      'Export to UAE': 'تُشحن إطارات كباتوس من ميناء تشينغداو إلى جبل علي، مستهدفة القطاعات الحساسة للسعر في أسواق السيارات في الإمارات.'
    },
    Haida: {
      'Raw Materials': 'تحصل هايدا على المطاط الطبيعي عبر ممر تشنغدو-تشونغتشينغ اللوجستي من موردي جنوب شرق آسيا، مع مواد صناعية لإنتاج الإطارات التجارية واسعة النطاق.',
      'Mixing': 'تُنتج مركبات هايدا في جيانيانغ، سيتشوان، مع قدرات خلط كبيرة الحجم مصممة لإطارات الشاحنات والحافلات التجارية بجودة متسقة عبر الإنتاج العالي الحجم.',
      'Tire Building': 'تشغل هايدا منشآت إنتاج إطارات تجارية واسعة النطاق في جيانيانغ، مع خطوط بناء متعددة مخصصة لتجميع الإطارات الرادياليّة للشاحنات والحافلات.',
      'Curing': 'توظف هايدا عمليات معالجة صناعية واسعة النطاق مع خطوط ضغط متعددة، مما يضمن معالجة فعالة لأحجام الإطارات التجارية مع الحفاظ على معايير الفلكنة.',
      'Quality Control': 'تطبق هايدا بروتوكولات اختبار الإطارات التجارية بما في ذلك التحقق من قدرة الحمولة وفحوصات السلامة الهيكلية والامتثال للمعايير الصينية والدولية للتصدير.',
      'Export to UAE': 'تستخدم إطارات هايدا التوجيه متعدد الوسائط عبر تشونغتشينغ أو تشنغدو، ثم عبر موانئ شنغهاي أو تشينغداو إلى جبل علي، محسّنة تكاليف اللوجستيات لصادرات الإطارات التجارية.'
    },
    'JK Tyres': {
      'Raw Materials': 'تحصل JK Tyres على المطاط الطبيعي من كيرالا وتاميل نادو ضمن سلسلة توريد معتمدة من ISCC، مما يُظهر الالتزام بالاستدامة والتتبع في شراء المواد الخام.',
      'Mixing': 'تشغل JK Tyres منشآت خلط عبر مصانع متعددة في ميسورو وتشيناي ولاكسار، مطبقة تركيبات مركبات متسقة ومراقبة جودة عبر شبكة الإنتاج.',
      'Tire Building': 'تستخدم JK Tyres شبكة المصانع المتعددة مع الإنتاج الأساسي في منشآت فيكرانت وميسورو، مطبقة عمليات بناء موحدة عبر جميع المواقع لاتساق الجودة.',
      'Curing': 'توظف أقسام المعالجة في JK Tyres فلكنة محكومة مع أنظمة مراقبة تضمن جودة موحدة عبر شبكة الإنتاج متعددة المصانع.',
      'Quality Control': 'تشغل JK Tyres مسارات اختبار ومختبرات معتمدة حكومياً، تُجري اختبارات شاملة بما في ذلك محاكاة الطريق والمتانة والتحقق من الأداء.',
      'Export to UAE': 'تستفيد JK Tyres من القرب من أسواق الإمارات، تشحن عبر موانئ مومباي أو تشيناي مع أوقات عبور 5-12 يوماً، مما يضمن مخزوناً طازجاً وسلاسل توريد سريعة الاستجابة.'
    }
  },
  fa: {
    Firemax: {
      'Raw Materials': 'فایرمکس لاستیک طبیعی را عمدتاً از شبکههای تأمین جنوب شرق آسیا تهیه کرده و آن را با لاستیک مصنوعی، دوده، سیم فولادی، الیاف تقویتی، گوگرد و افزودنیهای شیمیایی ترکیب میکند. این مواد برای تعادل بین هزینه، دوام و الزامات صادراتی انتخاب میشوند.',
      'Mixing': 'ترکیبات فایرمکس در میکسرهای داخلی کنترلشده تولید میشوند، جایی که دما، فشار و نیروی برشی تنظیم میگردد تا توزیع یکنواخت مواد پرکننده و عوامل پیوندی تضمین شود.',
      'Tire Building': 'تایرهای فایرمکس روی درامهای خودکار ساخته میشوند و لایههای منجید، کمربند فولادی، طوقه و آج با دقت میلیمتری مونتاژ میگردند.',
      'Curing': 'تایر خام در قالبهای حرارتی پخته میشود و در این فرآیند ساختار مولکولی لاستیک، آج و خاصیت ارتجاعی تثبیت میگردد.',
      'Quality Control': 'فایرمکس از بازرسی چندمرحلهای شامل بررسی ظاهری، تست یکنواختی، اشعه ایکس و کنترل بالانس استفاده میکند.',
      'Export to UAE': 'تایرهای تأییدشده فایرمکس از طریق بندر چینگدائو به بندر جبل علی ارسال میشوند.'
    },
    Vikrant: {
      'Raw Materials': 'ویکرانت لاستیک طبیعی را از کمربند لاستیکی هند در کرالا و تامیل نادو تهیه میکند و آن را با ترکیبات مصنوعی برای کاربردهای تجاری بایاس و رادیال تکمیل میکند. این زنجیره تامین منطقهای زمان تحویل را کاهش داده و کیفیت مواد تازه را تضمین میکند.',
      'Mixing': 'ترکیبات ویکرانت برای دوام خودروهای تجاری فرموله میشوند و از میکسرهای دقیق برای دستیابی به پراکندگی بهینه دوده و پیوند تقویتکنندهها برای ساختارهای بایاس و رادیال استفاده میکنند.',
      'Tire Building': 'تایرهای ویکرانت روی خطوط نیمهخودکار و خودکار در میسورو ساخته میشوند، با فرآیندهای تخصصی برای مونتاژ تایرهای کامیون بایاس و رادیال برای پاسخ به نیازهای متنوع ناوگان.',
      'Curing': 'فرآیندهای پخت برای تحمل بارهای تجاری کالیبره شدهاند، با سیکلهای ولکانیزاسیون طولانیتر برای تضمین پایداری ساختاری در شرایط سنگین.',
      'Quality Control': 'ویکرانت استانداردهای نظارتی هند و مشخصات صادرات را اعمال میکند، شامل تست بار، بازرسی بصری و تأیید ابعادی برای محصولات بایاس و رادیال.',
      'Export to UAE': 'تایرهای ویکرانت از مسافات کوتاهتر صادرات از طریق بنادر ممبئی یا کوچین بهرهمند میشوند و در 5-12 روز به جبل علی میرسند برای توزیع سریع منطقهای.'
    },
    Bridgestone: {
      'Raw Materials': 'بریجستون لاستیک طبیعی را از مزارع متعلق به شرکت در سوماترا، کالیمانتان و لیبریا تهیه میکند که قابلیت ردیابی و پایداری را تضمین میکند. ترکیبات مصنوعی و تقویتکنندهها از تامینکنندگان جهانی تأییدشده خریداری میشوند.',
      'Mixing': 'بریجستون از پروتکلهای اختلاط پیشرفته چند مرحلهای با نظارت زمان واقعی برای دستیابی به مشخصات دقیق ترکیب برای عملکرد، کارایی سوخت و رعایت محیط زیست استفاده میکند.',
      'Tire Building': 'بریجستون استانداردهای تولید جهانی را در کارخانههای منطقهای اعمال میکند و از روباتیک و اتوماسیون برای حفظ ثبات در ساخت تایر و کیفیت در تمام سایتهای تولید استفاده میکند.',
      'Curing': 'ولکانیزاسیون در قالبهای با دقت بالا با پروفایلهای دما و فشار کنترلشده توسط کامپیوتر اجرا میشود که پیوند مولکولی یکنواخت و دقت ابعادی را تضمین میکند.',
      'Quality Control': 'بریجستون پروتکلهای سختگیرانه کنترل کیفیت جهانی شامل ماشینهای یکنواختی، تست داخل و خارج و گواهینامه طبق استانداردهای ISO و ایمنی منطقهای را اعمال میکند.',
      'Export to UAE': 'تایرهای بریجستون از تایلند، هند یا اندونزی از طریق مسیرهای لجستیکی بهینهشده حمل میشوند، با ردیابی کامل و مستندات برای گمرک و تأیید کاربر نهایی.'
    },
    Duraturn: {
      'Raw Materials': 'دوراترن مواد را متناسب با الزامات طراحی آمریکای شمالی تهیه میکند، با تمرکز بر کاربردهای کامیون تجاری با تأکید بر دوام و رعایت مقررات برای بازارهای صادراتی.',
      'Mixing': 'ترکیبات دوراترن برای عملکرد کامیون تجاری طراحی شدهاند و از زیرساخت تولید مشترک یونگشنگ در گوانگرائو برای دستیابی به تولید مقرونبهصرفه بدون به خطر انداختن کیفیت استفاده میکنند.',
      'Tire Building': 'تایرهای دوراترن روی خطوط تولید مشترک بهینهشده برای ساخت رادیال کامیون تجاری مونتاژ میشوند، با نقاط بازرسی کیفیت یکپارچه در فرآیند ساخت.',
      'Curing': 'پروتکلهای پخت از مشخصات تایر تجاری آمریکای شمالی پیروی میکنند و توزیع مناسب حرارت و ولکانیزاسیون را برای کاربردهای کامیون مسافتهای طولانی تضمین میکنند.',
      'Quality Control': 'دوراترن استانداردهای تأیید DOT و ECE را اعمال میکند، با تست اختصاصی برای ظرفیت بار تجاری، سایش آج و رعایت صادرات.',
      'Export to UAE': 'تایرهای دوراترن از طریق بندر چینگدائو با اسناد و گواهینامههای کامل ارسال میشوند و الزامات بینالمللی خودروهای تجاری برای بازارهای امارات را برآورده میکنند.'
    },
    Dovroad: {
      'Raw Materials': 'دوورود مواد بهینهشده برای موتورسیکلت و کاربردهای رادیال خودرو سواری (PCR) را تهیه میکند، با تأکید بر ساخت سبک و عملکرد چسبندگی برای شرایط متنوع جاده.',
      'Mixing': 'ترکیبات دوورود در تاسیسات چینگدائو دابل رود توسعه داده میشوند، با تمرکز بر فرمولاسیونهای ویژه موتورسیکلت و PCR برای عملکرد متعادل و کارایی هزینه.',
      'Tire Building': 'دوورود از خطوط تولید حجم بالا برای تایرهای موتورسیکلت و PCR استفاده میکند، با درامهای ساخت تخصصی برای اندازههای مختلف تایر و دستههای عملکردی.',
      'Curing': 'دوورود خطوط پخت حجم بالا با زمانهای سیکل سریع را اداره میکند، در حالی که استانداردهای کیفیت را حفظ کرده و توان تولید را برای تولید صادراتمحور به حداکثر میرساند.',
      'Quality Control': 'دوورود پروتکلهای کنترل کیفیت صادراتمحور شامل تست بالانس دینامیک، بازرسی بصری و تأیید رعایت استانداردهای بینالمللی تایر موتورسیکلت و سواری را پیادهسازی میکند.',
      'Export to UAE': 'تایرهای دوورود در بندر چینگدائو بستهبندی میشوند و به جبل علی ارسال میشوند تا بازارهای موتورسیکلت و خودرو سواری امارات را با قیمتهای رقابتی پوشش دهند.'
    },
    Kpatos: {
      'Raw Materials': 'کپاتوس مواد را برای تایرهای سواری بخش ارزشی تهیه میکند، با تمرکز بر مخلوطهای لاستیک طبیعی و مصنوعی مقرونبهصرفه که الزامات اولیه ایمنی و عملکرد را برآورده میکنند.',
      'Mixing': 'کپاتوس استراتژیهای ترکیب سادهشده را در تاسیسات چینگدائو سانفولسس به کار میگیرد و برای کارایی تولید بهینهسازی میکند در حالی که سطوح عملکرد قابل قبول را برای مصرفکنندگان آگاه به بودجه حفظ میکند.',
      'Tire Building': 'تایرهای کپاتوس با استفاده از روشهای تولید بهینهشده هزینه مونتاژ میشوند، با فرآیندهای ساده که پیچیدگی ساخت را کاهش میدهند در حالی که کفایت ساختاری را تضمین میکنند.',
      'Curing': 'فرآیندهای پخت برای زمانهای سیکل کارآمد و مصرف انرژی کالیبره میشوند و کیفیت ولکانیزاسیون را با اهداف هزینه تولید برای بازارهای بخش ارزشی متعادل میکنند.',
      'Quality Control': 'کپاتوس تست صادرات پایه و بازرسی بصری را برای اطمینان از رعایت حداقل استانداردهای ایمنی برای توزیع بینالمللی اعمال میکند.',
      'Export to UAE': 'تایرهای کپاتوس از بندر چینگدائو به جبل علی ارسال میشوند و بخشهای حساس به قیمت در بازارهای خودرو سواری امارات را هدف قرار میدهند.'
    },
    Haida: {
      'Raw Materials': 'هایدا لاستیک طبیعی را از طریق کریدور لجستیک چنگدو-چونگچینگ از تامینکنندگان جنوب شرق آسیا تهیه میکند، همراه با مواد مصنوعی برای تولید تایر تجاری در مقیاس بزرگ.',
      'Mixing': 'ترکیبات هایدا در جیانیانگ، سیچوان تولید میشوند، با قابلیتهای اختلاط دستهبزرگ طراحی شده برای کاربردهای تایر کامیون و اتوبوس تجاری با کیفیت ثابت در تولید حجم بالا.',
      'Tire Building': 'هایدا تاسیسات تولید تایر تجاری مقیاس بزرگ را در جیانیانگ اداره میکند، با چندین خط ساخت اختصاصی برای مونتاژ تایر رادیال کامیون و اتوبوس.',
      'Curing': 'هایدا عملیات پخت در مقیاس صنعتی با چندین خط پرس را به کار میگیرد و پردازش کارآمد حجمهای تایر تجاری را در حالی که استانداردهای ولکانیزاسیون را حفظ میکند، تضمین میکند.',
      'Quality Control': 'هایدا پروتکلهای تست تایر تجاری شامل تأیید ظرفیت بار، بررسیهای یکپارچگی ساختاری و رعایت استانداردهای صادرات چینی و بینالمللی را اعمال میکند.',
      'Export to UAE': 'تایرهای هایدا از مسیریابی صادرات چند وجهی از طریق چونگچینگ یا چنگدو، سپس از طریق بنادر شانگهای یا چینگدائو به جبل علی استفاده میکنند و هزینههای لجستیک را برای صادرات تایر تجاری بهینه میکنند.'
    },
    'JK Tyres': {
      'Raw Materials': 'JK Tyres لاستیک طبیعی را از کرالا و تامیل نادو در یک زنجیره تامین گواهیشده ISCC تهیه میکند که تعهد به پایداری و قابلیت ردیابی در تهیه مواد اولیه را نشان میدهد.',
      'Mixing': 'JK Tyres تاسیسات اختلاط را در چندین کارخانه در میسورو، چنای و لاکسار اداره میکند و فرمولاسیونهای ترکیب ثابت و کنترل کیفیت را در سراسر شبکه تولید اعمال میکند.',
      'Tire Building': 'JK Tyres از شبکه چندکارخانهای خود با تولید اولیه در تاسیسات ویکرانت و میسورو استفاده میکند و فرآیندهای ساخت استاندارد را در تمام مکانها برای ثبات کیفیت اعمال میکند.',
      'Curing': 'بخشهای پخت JK Tyres از ولکانیزاسیون کنترلشده با سیستمهای نظارتی استفاده میکنند که کیفیت یکنواخت را در سراسر شبکه تولید چندکارخانهای تضمین میکنند.',
      'Quality Control': 'JK Tyres مسیرهای تست و آزمایشگاههای تأییدشده دولتی را اداره میکند و تستهای جامع شامل شبیهسازی جاده، دوام و تأیید عملکرد را انجام میدهد.',
      'Export to UAE': 'JK Tyres از نزدیکی به بازارهای امارات بهره میبرد و از طریق بنادر ممبئی یا چنای با زمان ترانزیت 5-12 روز حمل میکند که موجودی تازه و زنجیرههای تامین پاسخگو را تضمین میکند.'
    }
  }
};

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
    },
    // Location keywords
    locationTerms: {
      'rubber supply': 'rubber supply',
      'via': 'via',
      'corridor': 'corridor',
      'County': 'County',
      'automated production lines': 'automated production lines',
      'production lines': 'production lines',
      'curing presses': 'curing presses',
      'curing department': 'curing department',
      'curing facilities': 'curing facilities',
      'ISO-certified laboratories': 'ISO-certified laboratories',
      'inspection laboratories': 'inspection laboratories',
      'laboratories': 'laboratories',
      'verification labs': 'verification labs',
      'export compliance labs': 'export compliance labs',
      'export testing': 'export testing',
      'testing tracks': 'testing tracks',
      'plant': 'plant',
      'plants': 'plants',
      'facility': 'facility',
      'facilities': 'facilities',
      'production facility': 'production facility',
      'shared': 'shared',
      'regional': 'regional',
      'Regional': 'Regional',
      'supply chain': 'supply chain',
      'suppliers': 'suppliers',
      'approved suppliers': 'approved suppliers',
      'logistics corridor': 'logistics corridor',
      'Company-owned plantations in': 'Company-owned plantations in',
      'rubber belt': 'rubber belt',
      'imports': 'imports',
      'global QC laboratories': 'global QC laboratories',
      'Government-approved': 'Government-approved',
      'primary': 'primary',
      'departments': 'departments',
      'warehousing': 'warehousing',
      'Port': 'Port',
      'or': 'or',
      'and': 'and'
    },
    // Duration units
    durationUnits: {
      'hours': 'hours',
      'minutes': 'minutes',
      'days': 'days',
      'per tire': 'per tire'
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
    },
    // Location keywords
    locationTerms: {
      'rubber supply': 'إمدادات المطاط',
      'via': 'عبر',
      'corridor': 'ممر',
      'County': 'مقاطعة',
      'automated production lines': 'خطوط الإنتاج الآلية',
      'production lines': 'خطوط الإنتاج',
      'curing presses': 'مكابس المعالجة',
      'curing department': 'قسم المعالجة',
      'curing facilities': 'منشآت المعالجة',
      'ISO-certified laboratories': 'مختبرات معتمدة من ISO',
      'inspection laboratories': 'مختبرات الفحص',
      'laboratories': 'مختبرات',
      'verification labs': 'مختبرات التحقق',
      'export compliance labs': 'مختبرات الامتثال للتصدير',
      'export testing': 'اختبار التصدير',
      'testing tracks': 'مسارات الاختبار',
      'plant': 'مصنع',
      'plants': 'مصانع',
      'facility': 'منشأة',
      'facilities': 'منشآت',
      'production facility': 'منشأة الإنتاج',
      'shared': 'مشتركة',
      'regional': 'إقليمية',
      'Regional': 'إقليمية',
      'supply chain': 'سلسلة التوريد',
      'suppliers': 'موردون',
      'approved suppliers': 'موردون معتمدون',
      'logistics corridor': 'ممر لوجستي',
      'Company-owned plantations in': 'مزارع الشركة في',
      'rubber belt': 'حزام المطاط',
      'imports': 'واردات',
      'global QC laboratories': 'مختبرات مراقبة الجودة العالمية',
      'Government-approved': 'معتمد حكومياً',
      'primary': 'أساسي',
      'departments': 'أقسام',
      'warehousing': 'تخزين',
      'Port': 'ميناء',
      'or': 'أو',
      'and': 'و'
    },
    // Duration units
    durationUnits: {
      'hours': 'ساعات',
      'minutes': 'دقائق',
      'days': 'أيام',
      'per tire': 'لكل إطار'
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
    },
    // Location keywords
    locationTerms: {
      'rubber supply': 'تامین لاستیک',
      'via': 'از طریق',
      'corridor': 'کریدور',
      'County': 'شهرستان',
      'automated production lines': 'خطوط تولید خودکار',
      'production lines': 'خطوط تولید',
      'curing presses': 'پرس‌های پخت',
      'curing department': 'بخش پخت',
      'curing facilities': 'تاسیسات پخت',
      'ISO-certified laboratories': 'آزمایشگاه‌های دارای گواهینامه ISO',
      'inspection laboratories': 'آزمایشگاه‌های بازرسی',
      'laboratories': 'آزمایشگاه‌ها',
      'verification labs': 'آزمایشگاه‌های تایید',
      'export compliance labs': 'آزمایشگاه‌های تطابق صادرات',
      'export testing': 'آزمایش صادرات',
      'testing tracks': 'مسیرهای آزمایش',
      'plant': 'کارخانه',
      'plants': 'کارخانه‌ها',
      'facility': 'تاسیسات',
      'facilities': 'تاسیسات',
      'production facility': 'تاسیسات تولید',
      'shared': 'مشترک',
      'regional': 'منطقه‌ای',
      'Regional': 'منطقه‌ای',
      'supply chain': 'زنجیره تامین',
      'suppliers': 'تامین‌کنندگان',
      'approved suppliers': 'تامین‌کنندگان تایید شده',
      'logistics corridor': 'کریدور لجستیک',
      'Company-owned plantations in': 'مزارع متعلق به شرکت در',
      'rubber belt': 'کمربند لاستیک',
      'imports': 'واردات',
      'global QC laboratories': 'آزمایشگاه‌های جهانی کنترل کیفیت',
      'Government-approved': 'تایید شده دولتی',
      'primary': 'اصلی',
      'departments': 'بخش‌ها',
      'warehousing': 'انبارداری',
      'Port': 'بندر',
      'or': 'یا',
      'and': 'و'
    },
    // Duration units
    durationUnits: {
      'hours': 'ساعت',
      'minutes': 'دقیقه',
      'days': 'روز',
      'per tire': 'به ازای هر تایر'
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

    // Helper function to translate location text
    function translateLocation(location, lang) {
      if (lang === 'en') return location;
      
      let translated = location;
      const terms = t.locationTerms;
      
      // Sort terms by length (longest first) to avoid partial replacements
      const sortedTerms = Object.keys(terms).sort((a, b) => b.length - a.length);
      
      for (const term of sortedTerms) {
        const regex = new RegExp(term, 'gi');
        translated = translated.replace(regex, terms[term]);
      }
      
      return translated;
    }

    // Helper function to translate duration text
    function translateDuration(duration, lang) {
      if (lang === 'en' || !duration) return duration;
      
      let translated = duration;
      const units = t.durationUnits;
      
      // Translate duration units while preserving numbers
      for (const unit in units) {
        const regex = new RegExp(unit, 'gi');
        translated = translated.replace(regex, units[unit]);
      }
      
      return translated;
    }

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
          contentEl.className = 'glass rounded-2xl p-4 border border-white/10';

          const translatedStage = t.stages[stage.stage] || stage.stage;
          const translatedLocation = translateLocation(stage.location, lang);
          const translatedDuration = translateDuration(stage.duration, lang);
          
          // Get brand-specific explanation
          const explanation = BRAND_EXPLANATIONS[lang] && 
                             BRAND_EXPLANATIONS[lang][brandName] && 
                             BRAND_EXPLANATIONS[lang][brandName][stage.stage] 
                             ? BRAND_EXPLANATIONS[lang][brandName][stage.stage] 
                             : '';

          let html = `<h3 class="text-xl font-bold mb-2">${translatedStage}</h3>`;
          html += `<p class="timeline-location text-emerald-400 text-sm mb-2">${translatedLocation}</p>`;
          
          // Add explanation if available
          if (explanation) {
            html += `<p class="text-neutral-300 text-sm mb-3 leading-relaxed">${explanation}</p>`;
          }
          
          if (stage.duration) {
            html += `<span class="timeline-duration inline-block px-3 py-1 rounded-full bg-white/10 text-xs text-neutral-200" style="direction:ltr; unicode-bidi:isolate;">${translatedDuration}</span>`;
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
