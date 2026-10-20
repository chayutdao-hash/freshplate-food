/**
 * Recipe & Meal Planner Data Store
 * FreshPlate / คลังสูตรอาหารและวางแผนมื้ออาหารสุขภาพ
 */

const RECIPES_DATA = [
  {
    id: 'rec-1',
    title: 'แซลมอนโปเกโบวล์และควินัว',
    titleEn: 'Salmon Poke Bowl with Quinoa',
    category: 'bowl',
    calories: 420,
    prepTime: 12,
    cookTime: 0,
    difficulty: 'Easy',
    difficultyTh: 'ง่ายมาก',
    rating: 4.9,
    reviewsCount: 142,
    tags: ['< 15 นาที', 'คลีน', 'โปรตีนสูง', 'สุขภาพดี'],
    image: 'images/rec-1.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    description: 'แซลมอนซาชิมิสดหั่นเต๋า คลุกเคล้าโชยุยูซุ เสิร์ฟบนควินัวและข้าวกล้อง พร้อมอะโวคาโด ถั่วแระญี่ปุ่น สาหร่ายวากาเมะ และงาขาวคั่ว ได้ไขมันดีและโปรตีนเต็มคำ',
    baseServings: 2,
    macros: {
      calories: 420,
      protein: 36,
      carbs: 45,
      fat: 14,
      fiber: 7,
      sodium: 480
    },
    ingredients: [
      { name: 'เนื้อแซลมอนสด (เกรดซาชิมิ)', amount: 200, unit: 'กรัม', category: 'meat' },
      { name: 'ควินัวสุกผสมข้าวกล้อง', amount: 160, unit: 'กรัม', category: 'grains' },
      { name: 'อะโวคาโดสุกหั่นเต๋า', amount: 1, unit: 'ลูก', category: 'produce' },
      { name: 'ถั่วแระญี่ปุ่นต้มสุก (แกะเปลือก)', amount: 60, unit: 'กรัม', category: 'produce' },
      { name: 'แตงกวาญี่ปุ่นหั่นแว่น', amount: 0.5, unit: 'ลูก', category: 'produce' },
      { name: 'โชยุลดโซเดียม', amount: 2, unit: 'ช้อนโต๊ะ', category: 'seasoning' },
      { name: 'น้ำมันงาบริสุทธิ์', amount: 1, unit: 'ช้อนชา', category: 'seasoning' },
      { name: 'น้ำส้มสายชูยูซุหรือมะนาว', amount: 1, unit: 'ช้อนชา', category: 'seasoning' },
      { name: 'งาขาวคั่วและสาหร่ายเส้น', amount: 1, unit: 'ช้อนชา', category: 'seasoning' }
    ],
    steps: [
      {
        step: 1,
        title: 'หมักแซลมอนซาชิมิ',
        text: 'หั่นเนื้อปลาแซลมอนสดเป็นลูกเต๋าขนาด 1.5 ซม. ใส่ชามผสม ปรุงรสด้วยโชยุลดโซเดียม น้ำมันงา และน้ำส้มสายชูยูซุ คลุกเคล้าเบามือ พักไว้ในตู้เย็น 5 นาทีให้รสชาติเข้าเนื้อ',
        timerSeconds: 300,
        tip: 'ใช้แซลมอนสดเกรดซาชิมิที่เย็นจัดเพื่อรสสัมผัสที่ดีที่สุด'
      },
      {
        step: 2,
        title: 'เตรียมฐานโบวล์ควินัว',
        text: 'ตักควินัวและข้าวกล้องอุ่นๆ ใส่ก้นชาม จัดเรียงแตงกวาญี่ปุ่น ถั่วแระญี่ปุ่น และอะโวคาโดเรียงรอบขอบชามอย่างสวยงาม',
        timerSeconds: 0,
        tip: 'จัดสีของผักสลับกันเพื่อความสวยงามน่ารับประทาน'
      },
      {
        step: 3,
        title: 'วางแซลมอนและโรยท็อปปิ้ง',
        text: 'นำแซลมอนที่หมักไว้จัดวางตรงกลาง ราดน้ำหมักที่เหลือเล็กน้อย โรยงาขาวคั่วและสาหร่ายเส้น พร้อมเสิร์ฟทันที',
        timerSeconds: 0,
        tip: 'ทานทันทีเพื่อความสดกรอบของผักและรสชาติที่สดชื่น'
      }
    ]
  },
  {
    id: 'rec-2',
    title: 'อกไก่ย่างสมุนไพรกับสลัดอะโวคาโด',
    titleEn: 'Herb Grilled Chicken with Avocado Salad',
    category: 'salad',
    calories: 360,
    prepTime: 10,
    cookTime: 12,
    difficulty: 'Easy',
    difficultyTh: 'ง่ายมาก',
    rating: 4.8,
    reviewsCount: 98,
    tags: ['< 15 นาที', 'คลีน', 'โปรตีนสูง', 'คีโต', 'งบประหยัด'],
    image: 'images/rec-2.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    description: 'อกไก่นุ่มหมักโรสแมรี่ กระเทียม และพริกไทยดำ ย่างสุกฉ่ำ เสิร์ฟคู่ผักสลัดไฮโดรโปนิกส์ มะเขือเทศราชินี และน้ำสลัดบัลซามิกแบบไลท์ แคลต่ำอิ่มนาน',
    baseServings: 2,
    macros: {
      calories: 360,
      protein: 42,
      carbs: 12,
      fat: 15,
      fiber: 6,
      sodium: 360
    },
    ingredients: [
      { name: 'อกไก่ลอกหนัง', amount: 300, unit: 'กรัม', category: 'meat' },
      { name: 'ผักสลัดมิกซ์ (เรดโอ๊ค, กรีนโอ๊ค)', amount: 150, unit: 'กรัม', category: 'produce' },
      { name: 'มะเขือเทศราชินี', amount: 8, unit: 'ลูก', category: 'produce' },
      { name: 'อะโวคาโดหั่นสไลซ์', amount: 0.5, unit: 'ลูก', category: 'produce' },
      { name: 'น้ำมันมะกอก Extra Virgin', amount: 1.5, unit: 'ช้อนโต๊ะ', category: 'seasoning' },
      { name: 'น้ำส้มสายชูบัลซามิก', amount: 1, unit: 'ช้อนโต๊ะ', category: 'seasoning' },
      { name: 'กระเทียมสับและออริกาโน่แห้ง', amount: 1, unit: 'ช้อนชา', category: 'seasoning' },
      { name: 'เกลือสมุทรและพริกไทยดำบด', amount: 0.5, unit: 'ช้อนชา', category: 'seasoning' }
    ],
    steps: [
      {
        step: 1,
        title: 'หมักอกไก่',
        text: 'ใช้ส้อมจิ้มอกไก่เบาๆ หมักด้วยน้ำมันมะกอก 1/2 ช้อนโต๊ะ กระเทียม ออริกาโน่ เกลือ และพริกไทยดำ คลุกเคล้าให้ทั่ว หมักทิ้งไว้ 5 นาที',
        timerSeconds: 300,
        tip: 'การทุบอกไก่ให้มีความหนาสม่ำเสมอกันจะช่วยให้สุกพร้อมกันและคงความนุ่ม'
      },
      {
        step: 2,
        title: 'ย่างอกไก่บนกระทะ',
        text: 'ตั้งกระทะย่างไฟกลางจนร้อน นำอกไก่ลงย่างด้านละ 5-6 นาทีจนสุกสีเหลืองทองและด้านในฉ่ำ ไม่แห้งกระด้าง',
        timerSeconds: 360,
        tip: 'อย่าย่างนานเกินไปเพราะจะทำให้อกไก่กระด้าง'
      },
      {
        step: 3,
        title: 'คลุกสลัดและจัดจาน',
        text: 'หั่นอกไก่เป็นชิ้นพอดีคำ จัดผักสลัด มะเขือเทศราชินี และอะโวคาโดลงจาน วางอกไก่ด้านบน ราดน้ำสลัดบัลซามิกผสมน้ำมันมะกอกที่เหลือ พร้อมรับประทาน',
        timerSeconds: 0,
        tip: 'ราดน้ำสลัดก่อนทานทันทีเพื่อไม่ให้ผักสลด'
      }
    ]
  },
  {
    id: 'rec-3',
    title: 'โทสต์อะโวคาโดไข่ดาวน้ำและแซลมอนรมควัน',
    titleEn: 'Avocado Sourdough Toast & Poached Egg',
    category: 'snack',
    calories: 340,
    prepTime: 8,
    cookTime: 6,
    difficulty: 'Easy',
    difficultyTh: 'ง่ายมาก',
    rating: 4.9,
    reviewsCount: 175,
    tags: ['< 15 นาที', 'คลีน', 'โปรตีนสูง', 'มังสวิรัติปรับได้'],
    image: 'images/rec-3.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80',
    description: 'ขนมปังซาวเออร์โดว์ปิ้งกรอบนอกนุ่มใน ทาด้วยอะโวคาโดบดปรุงรสเลมอน ท็อปด้วยไข่ดาวน้ำเยิ้มๆ และพริกเกล็ดพริกไทยดำ อาหารเช้าพลังงานสะอาด',
    baseServings: 2,
    macros: {
      calories: 340,
      protein: 19,
      carbs: 32,
      fat: 16,
      fiber: 8,
      sodium: 410
    },
    ingredients: [
      { name: 'ขนมปังซาวเออร์โดว์แผ่นหนา', amount: 2, unit: 'แผ่น', category: 'grains' },
      { name: 'อะโวคาโดสุกบดหยาบ', amount: 1, unit: 'ลูก', category: 'produce' },
      { name: 'ไข่ไก่สดเบอร์ 0', amount: 2, unit: 'ฟอง', category: 'meat' },
      { name: 'น้ำเลมอนคั้นสด', amount: 1, unit: 'ช้อนชา', category: 'produce' },
      { name: 'พริกป่นเกล็ด (Chili Flakes)', amount: 0.5, unit: 'ช้อนชา', category: 'seasoning' },
      { name: 'น้ำส้มสายชู (สำหรับทำไข่ดาวน้ำ)', amount: 1, unit: 'ช้อนโต๊ะ', category: 'seasoning' },
      { name: 'ไมโครกรีนหรือต้นอ่อนทานตะวัน', amount: 20, unit: 'กรัม', category: 'produce' },
      { name: 'เกลือสมุทรหิมาลายัน', amount: 0.25, unit: 'ช้อนชา', category: 'seasoning' }
    ],
    steps: [
      {
        step: 1,
        title: 'ปิ้งขนมปังและเตรียมอะโวคาโด',
        text: 'ปิ้งขนมปังซาวเออร์โดว์ในเครื่องปิ้งหรือกระทะจนผิวกรอบทอง บดอะโวคาโดหยาบๆ ผสมน้ำเลมอนและเกลือเล็กน้อย',
        timerSeconds: 120,
        tip: 'บดอะโวคาโดหยาบจะให้มิติความครีมมี่ที่เคี้ยวเพลิน'
      },
      {
        step: 2,
        title: 'ทำไข่ดาวน้ำ (Poached Egg)',
        text: 'ต้มน้ำในหม้อให้เดือดปุดๆ ใส่น้ำส้มสายชู ใช้ทัพพีคนน้ำวนเป็นน้ำวนเบาๆ ค่อยๆ หย่อนไข่ไก่สดลงตรงกลาง ต้มต่อ 3 นาทีแล้วตักขึ้นสะเด็ดน้ำ',
        timerSeconds: 180,
        tip: 'ไข่สดใหม่ไข่ขาวจะจับตัวแน่น ไม่แตกกระจาย'
      },
      {
        step: 3,
        title: 'ประกอบร่างโทสต์',
        text: 'ทาอะโวคาโดบดลงบนแผ่นขนมปัง วางไข่ดาวน้ำ โรยพริกเกล็ด พริกไทยดำ และไมโครกรีน พร้อมเสิร์ฟ',
        timerSeconds: 0,
        tip: 'กรีดไข่แดงให้เยิ้มก่อนรับประทานเพื่อรสสัมผัสชุ่มฉ่ำ'
      }
    ]
  },
  {
    id: 'rec-4',
    title: 'ต้มยำกุ้งน้ำใสสมุนไพรสดเห็ดรวม',
    titleEn: 'Clear Herbal Tom Yum Soup with Prawns',
    category: 'soup',
    calories: 195,
    prepTime: 10,
    cookTime: 12,
    difficulty: 'Easy',
    difficultyTh: 'ง่ายมาก',
    rating: 4.9,
    reviewsCount: 210,
    tags: ['< 15 นาที', 'คลีน', 'คีโต', 'งบประหยัด', 'โปรตีนสูง'],
    image: 'images/rec-4.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1548943487-a2e4e43b4853?auto=format&fit=crop&w=800&q=80',
    description: 'ต้มยำกุ้งสูตรน้ำใสเพื่อสุขภาพ ไร้นมข้นหวาน อัดแน่นสมุนไพร ข่า ตะไคร้ ใบมะกรูด พริกขี้หนูสวน และเห็ดชิเมจิ แคลอรีต่ำ ซดคล่องคอสดชื่น',
    baseServings: 2,
    macros: {
      calories: 195,
      protein: 26,
      carbs: 8,
      fat: 4,
      fiber: 3,
      sodium: 520
    },
    ingredients: [
      { name: 'กุ้งขาวสด (แกะเปลือกผ่าหลัง)', amount: 250, unit: 'กรัม', category: 'meat' },
      { name: 'เห็ดฟางหรือเห็ดชิเมจิขาว', amount: 150, unit: 'กรัม', category: 'produce' },
      { name: 'น้ำซุปกระดูกผักใส', amount: 500, unit: 'มล.', category: 'seasoning' },
      { name: 'ตะไคร้หั่นท่อนทุบ', amount: 2, unit: 'ต้น', category: 'produce' },
      { name: 'ข่าแก่หั่นแว่น', amount: 5, unit: 'แว่น', category: 'produce' },
      { name: 'ใบมะกรูดฉีก', amount: 4, unit: 'ใบ', category: 'produce' },
      { name: 'พริกขี้หนูบุบ', amount: 5, unit: 'เม็ด', category: 'produce' },
      { name: 'น้ำปลาแท้สูตรลดโซเดียม', amount: 1.5, unit: 'ช้อนโต๊ะ', category: 'seasoning' },
      { name: 'น้ำมะนาวคั้นสด', amount: 2, unit: 'ช้อนโต๊ะ', category: 'produce' },
      { name: 'ผักชีฝรั่งซอย', amount: 1, unit: 'ต้น', category: 'produce' }
    ],
    steps: [
      {
        step: 1,
        title: 'ต้มน้ำซุปสมุนไพร',
        text: 'ตั้งหม้อต้มน้ำซุปให้เดือด ใส่ข่า ตะไคร้ และใบมะกรูดลงต้ม 3-4 นาทีจนมีกลิ่นหอมสมุนไพรโชยออกมา',
        timerSeconds: 240,
        tip: 'ทุบสมุนไพรเบาๆ เพื่อให้น้ำมันหอมระเหยออกมาเต็มที่'
      },
      {
        step: 2,
        title: 'ใส่เห็ดและกุ้ง',
        text: 'ใส่เห็ดชิเมจิลงต้มจนสุก ตามด้วยกุ้งขาวสด ต้มต่อเพียง 2-3 นาทีจนกุ้งเปลี่ยนเป็นสีส้มพอดี ห้ามต้มนานเกินไปเนื้อจะแข็ง',
        timerSeconds: 150,
        tip: 'เมื่อใส่กุ้งแล้วไม่ต้องคนแรงเพื่อไม่ให้น้ำซุปคาว'
      },
      {
        step: 3,
        title: 'ปรุงรสต้มยำ',
        text: 'ปิดไฟเตา ใส่พริกขี้หนูบุบ น้ำปลาลดโซเดียม และน้ำมะนาว คนให้เข้ากัน โรยผักชีฝรั่ง ตักเสิร์ฟร้อนๆ',
        timerSeconds: 0,
        tip: 'บีบน้ำมะนาวหลังปิดไฟเสมอเพื่อไม่ให้น้ำซุปมีรสขม'
      }
    ]
  },
  {
    id: 'rec-5',
    title: 'กะเพราอกไก่สับไข่ดาวน้ำข้าวไรซ์เบอร์รี่',
    titleEn: 'Clean Holy Basil Chicken with Riceberry',
    category: 'main',
    calories: 385,
    prepTime: 8,
    cookTime: 7,
    difficulty: 'Easy',
    difficultyTh: 'ง่ายมาก',
    rating: 4.9,
    reviewsCount: 310,
    tags: ['< 15 นาที', 'คลีน', 'โปรตีนสูง', 'งบประหยัด'],
    image: 'images/rec-5.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80',
    description: 'ผัดกะเพราไทยแท้สูตรคลีน ใช้น้ำเปล่าผัดแทนน้ำมัน อกไก่สับแน่นๆ ปรุงรสด้วยซอสสูตรลดโซเดียม กะเพราใบหนากลิ่นหอมฟุ้ง เสิร์ฟพร้อมข้าวไรซ์เบอร์รี่',
    baseServings: 2,
    macros: {
      calories: 385,
      protein: 38,
      carbs: 42,
      fat: 6,
      fiber: 5,
      sodium: 440
    },
    ingredients: [
      { name: 'อกไก่ลอกหนังบดหยาบ', amount: 300, unit: 'กรัม', category: 'meat' },
      { name: 'ใบกะเพราสดล้างสะอาด', amount: 1, unit: 'ถ้วย', category: 'produce' },
      { name: 'พริกขี้หนูและกระเทียมตำหยาบ', amount: 2, unit: 'ช้อนโต๊ะ', category: 'produce' },
      { name: 'ซอสหอยนางรมลดโซเดียม', amount: 1, unit: 'ช้อนโต๊ะ', category: 'seasoning' },
      { name: 'ซีอิ๊วขาวลดโซเดียม', amount: 1, unit: 'ช้อนโต๊ะ', category: 'seasoning' },
      { name: 'น้ำเปล่าสำหรับผัด', amount: 3, unit: 'ช้อนโต๊ะ', category: 'seasoning' },
      { name: 'ข้าวไรซ์เบอร์รี่หุงสุก', amount: 200, unit: 'กรัม', category: 'grains' },
      { name: 'ไข่ไก่ดาวน้ำ', amount: 2, unit: 'ฟอง', category: 'meat' }
    ],
    steps: [
      {
        step: 1,
        title: 'คั่วพริกกระเทียม',
        text: 'ตั้งกระทะใส่น้ำเปล่า 1 ช้อนโต๊ะ ใส่พริกและกระเทียมที่ตำไว้ลงคั่วด้วยไฟกลางจนหอมฉุน',
        timerSeconds: 90,
        tip: 'ใช้น้ำผัดแทนน้ำมันช่วยลดแคลอรีได้มากกว่า 120 kcal'
      },
      {
        step: 2,
        title: 'ผัดอกไก่สับ',
        text: 'ใส่อกไก่บดลงไปผัด ยีเนื้อไก่ให้กระจายตัว ปรุงรสด้วยซอสหอยนางรมและซีอิ๊วขาว เติมน้ำเล็กน้อย ผัดจนไก่สุกทั่ว',
        timerSeconds: 180,
        tip: 'อย่าผัดนานเกินไปไก่จะแห้ง'
      },
      {
        step: 3,
        title: 'ใส่ใบกะเพรา',
        text: 'เร่งไฟแรง ใส่ใบกะเพราลงไปแล้วผัดเร็วๆ 10-15 วินาทีจนกะเพราสลดแล้วปิดไฟทันที ตักราดข้าวไรซ์เบอร์รี่ โปะด้วยไข่ดาวน้ำ',
        timerSeconds: 30,
        tip: 'ผัดกะเพราเร็วๆ ไฟแรงเพื่อรักษากลิ่นหอมและสีเขียวสด'
      }
    ]
  },
  {
    id: 'rec-6',
    title: 'แซลมอนย่างเทอริยากิหน่อไม้ฝรั่ง',
    titleEn: 'Teriyaki Glazed Salmon & Asparagus',
    category: 'main',
    calories: 460,
    prepTime: 10,
    cookTime: 12,
    difficulty: 'Medium',
    difficultyTh: 'ปานกลาง',
    rating: 4.8,
    reviewsCount: 165,
    tags: ['คลีน', 'โปรตีนสูง', 'คีโต'],
    image: 'images/rec-6.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80',
    description: 'ชิ้นปลาแซลมอนนอร์เวย์ย่างหนังกรอบ เนื้อในนุ่มชุ่มฉ่ำ เคลือบซอสเทอริยากิโฮมเมดไร้น้ำตาลทราย เคียงด้วยหน่อไม้ฝรั่งย่างเนยกระเทียม',
    baseServings: 2,
    macros: {
      calories: 460,
      protein: 38,
      carbs: 18,
      fat: 24,
      fiber: 4,
      sodium: 490
    },
    ingredients: [
      { name: 'สเต๊กปลาแซลมอนติดหนัง', amount: 300, unit: 'กรัม', category: 'meat' },
      { name: 'หน่อไม้ฝรั่งสดตัดโคน', amount: 150, unit: 'กรัม', category: 'produce' },
      { name: 'ซอสเทอริยากิสูตรลดน้ำตาล', amount: 2, unit: 'ช้อนโต๊ะ', category: 'seasoning' },
      { name: 'มิรินญี่ปุ่น', amount: 1, unit: 'ช้อนโต๊ะ', category: 'seasoning' },
      { name: 'น้ำมันมะกอก', amount: 1, unit: 'ช้อนชา', category: 'seasoning' },
      { name: 'กระเทียมสับละเอียด', amount: 1, unit: 'ช้อนชา', category: 'seasoning' },
      { name: 'เกลือและพริกไทยดำบด', amount: 0.5, unit: 'ช้อนชา', category: 'seasoning' }
    ],
    steps: [
      {
        step: 1,
        title: 'เตรียมปลาแซลมอน',
        text: 'ซับเนื้อปลาแซลมอนให้แห้งสนิทด้วยกระดาษอเนกประสงค์ โรยเกลือและพริกไทยดำเบาๆ ทั้งสองด้าน',
        timerSeconds: 60,
        tip: 'ซับหนังปลาให้แห้งสนิทเป็นเคล็ดลับสำคัญในการทำให้หนังกรอบ'
      },
      {
        step: 2,
        title: 'ย่างแซลมอน',
        text: 'ตั้งกระทะไฟกลาง ใส่น้ำมันมะกอก วางแซลมอนเอาด้านหนังลงก่อน กดเบาๆ ให้หนังแนบกระทะ ย่าง 4 นาทีจนหนังกรอบ แล้วกลับด้านย่างต่ออีก 3 นาที',
        timerSeconds: 420,
        tip: 'อย่าย้ายที่แซลมอนบ่อยระหว่างย่างเพื่อให้ผิวกรอบสวย'
      },
      {
        step: 3,
        title: 'ย่างหน่อไม้ฝรั่งและเคลือบซอส',
        text: 'ใส่หน่อไม้ฝรั่งและกระเทียมลงข้างๆ กระทะ ผัดจนสุกกรอบ ทาซอสเทอริยากิบนเนื้อปลา ปิดเตา พัก 2 นาทีพร้อมเสิร์ฟ',
        timerSeconds: 180,
        tip: 'ทาซอสตอนท้ายเพื่อไม่ให้ซอสไหม้กระทะ'
      }
    ]
  },
  {
    id: 'rec-7',
    title: 'กรีกโยเกิร์ตพาร์เฟต์เบอร์รี่รวมกราโนล่า',
    titleEn: 'Greek Yogurt Berry Parfait',
    category: 'snack',
    calories: 280,
    prepTime: 5,
    cookTime: 0,
    difficulty: 'Easy',
    difficultyTh: 'ง่ายมาก',
    rating: 4.9,
    reviewsCount: 188,
    tags: ['< 15 นาที', 'คลีน', 'โปรตีนสูง', 'งบประหยัด'],
    image: 'images/rec-7.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80',
    description: 'กรีกโยเกิร์ตแท้เนื้อแน่นเข้มข้น โปรตีนสูง สลับชั้นด้วยสตรอว์เบอร์รี บลูเบอร์รีสด กราโนล่าอบน้ำผึ้งแท้ และเมล็ดเจีย ของว่างหรือมื้อเช้าสดชื่น',
    baseServings: 2,
    macros: {
      calories: 280,
      protein: 22,
      carbs: 32,
      fat: 7,
      fiber: 6,
      sodium: 85
    },
    ingredients: [
      { name: 'กรีกโยเกิร์ตรสธรรมชาติ (ไม่หวาน)', amount: 300, unit: 'กรัม', category: 'meat' },
      { name: 'สตรอว์เบอร์รีสดหั่นชิ้น', amount: 80, unit: 'กรัม', category: 'produce' },
      { name: 'บลูเบอร์รีสด', amount: 60, unit: 'กรัม', category: 'produce' },
      { name: 'กราโนล่าธัญพืชสูตรน้ำตาลน้อย', amount: 40, unit: 'กรัม', category: 'grains' },
      { name: 'น้ำผึ้งป่าแท้บริสุทธิ์', amount: 1, unit: 'ช้อนชา', category: 'seasoning' },
      { name: 'เมล็ดเจีย (Chia Seeds)', amount: 1, unit: 'ช้อนชา', category: 'grains' }
    ],
    steps: [
      {
        step: 1,
        title: 'จัดชั้นโยเกิร์ต',
        text: 'ตักกรีกโยเกิร์ตใส่แก้วหรือโถใสประมาณ 1/3 ของแก้ว เพื่อเป็นฐานชั้นแรก',
        timerSeconds: 0,
        tip: 'เลือกใช้กรีกโยเกิร์ตแท้ที่มีโปรตีนสูงกว่าโยเกิร์ตทั่วไป 2 เท่า'
      },
      {
        step: 2,
        title: 'สลับชั้นผลไม้และกราโนล่า',
        text: 'ใส่บลูเบอร์รีและสตรอว์เบอร์รีลงไป ตามด้วยกราโนล่ากรุบกรอบ ทำซ้ำอีกชั้นจนเต็มแก้ว',
        timerSeconds: 0,
        tip: 'ใส่กราโนล่าชั้นบนสุดตอนจะทานเพื่อคงความกรอบ'
      },
      {
        step: 3,
        title: 'ราดน้ำผึ้งและโรยเมล็ดเจีย',
        text: 'ราดน้ำผึ้งป่าเส้นบางๆ และโรยเมล็ดเจียด้านบน พร้อมรับประทานสดชื่นทันที',
        timerSeconds: 0,
        tip: 'สามารถแช่ตู้เย็นไว้เป็นมื้อเช้าพร้อมหยิบทานได้รวดเร็ว'
      }
    ]
  },
  {
    id: 'rec-8',
    title: 'สมูทตี้โบวล์แก้วมังกรแดงซูเปอร์ฟู้ด',
    titleEn: 'Pitaya Kiwi Superfood Smoothie Bowl',
    category: 'bowl',
    calories: 250,
    prepTime: 7,
    cookTime: 0,
    difficulty: 'Easy',
    difficultyTh: 'ง่ายมาก',
    rating: 4.7,
    reviewsCount: 89,
    tags: ['< 15 นาที', 'คลีน', 'มังสวิรัติ', 'งบประหยัด'],
    image: 'images/rec-8.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=800&q=80',
    description: 'สมูทตี้เนื้อไอศกรีมจากแก้วมังกรแดงแช่แข็ง กล้วยหอม และนมอัลมอนด์ ท็อปด้วยกีวี่ มะพร้าวอบกรอบ และเมล็ดแฟลกซ์ อุดมสารต้านอนุมูลอิสระ',
    baseServings: 2,
    macros: {
      calories: 250,
      protein: 6,
      carbs: 48,
      fat: 5,
      fiber: 9,
      sodium: 45
    },
    ingredients: [
      { name: 'เนื้อแก้วมังกรแดงแช่แข็ง', amount: 200, unit: 'กรัม', category: 'produce' },
      { name: 'กล้วยหอมสุกแช่แข็ง', amount: 1, unit: 'ลูก', category: 'produce' },
      { name: 'นมอัลมอนด์รสจืด', amount: 100, unit: 'มล.', category: 'seasoning' },
      { name: 'กีวี่หั่นแว่น', amount: 1, unit: 'ลูก', category: 'produce' },
      { name: 'มะพร้าวอบกรอบ (ไม่หวาน)', amount: 15, unit: 'กรัม', category: 'grains' },
      { name: 'เมล็ดแฟลกซ์หรือฟักทอง', amount: 1, unit: 'ช้อนโต๊ะ', category: 'grains' }
    ],
    steps: [
      {
        step: 1,
        title: 'ปั่นสมูทตี้เนื้อเนียน',
        text: 'ใส่แก้วมังกรแดงแช่แข็ง กล้วยหอมแช่แข็ง และนมอัลมอนด์ลงโถปั่นความเร็วสูง ปั่นจนได้เนื้อเนียนข้นคล้ายไอศกรีมซอฟต์เสิร์ฟ',
        timerSeconds: 90,
        tip: 'ใส่นมทีละน้อยเพื่อให้เนื้อสมูทตี้ข้นหนาพอวางผลไม้ท็อปปิ้งได้'
      },
      {
        step: 2,
        title: 'จัดเรียงท็อปปิ้ง',
        text: 'เทสมูทตี้ใส่ชาม เรียงกีวี่หั่นแว่น มะพร้าวอบกรอบ และเมล็ดแฟลกซ์เป็นแถวสวยงาม เสิร์ฟทันทีขณะเย็นจัด',
        timerSeconds: 0,
        tip: 'แช่ชามในช่องฟรีซไว้ก่อน 5 นาทีจะช่วยให้สมูทตี้ละลายช้าลง'
      }
    ]
  },
  {
    id: 'rec-9',
    title: 'ผัดไทยกุ้งสดเต้าหู้ดำเส้นบุก',
    titleEn: 'Keto Pad Thai Shrimp with Shirataki',
    category: 'main',
    calories: 320,
    prepTime: 12,
    cookTime: 10,
    difficulty: 'Medium',
    difficultyTh: 'ปานกลาง',
    rating: 4.8,
    reviewsCount: 145,
    tags: ['คลีน', 'คีโต', 'โปรตีนสูง'],
    image: 'images/rec-9.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=800&q=80',
    description: 'ผัดไทยสูตรคีโตใช้เส้นบุกแคลอรีต่ำ ผัดกับกุ้งสดตัวโต เต้าหู้เหลือง ไชโป๊หวาน และถั่วงอก ซอสมะขามเปียกเคี่ยวสดรสกลมกล่อม ไร้น้ำตาลฟอกขาว',
    baseServings: 2,
    macros: {
      calories: 320,
      protein: 28,
      carbs: 16,
      fat: 14,
      fiber: 8,
      sodium: 580
    },
    ingredients: [
      { name: 'กุ้งขาวสดแกะเปลือก', amount: 200, unit: 'กรัม', category: 'meat' },
      { name: 'เส้นบุกหรือเส้นชิราตากิ', amount: 250, unit: 'กรัม', category: 'grains' },
      { name: 'เต้าหู้เหลืองหั่นเต๋าเล็ก', amount: 80, unit: 'กรัม', category: 'meat' },
      { name: 'ไข่ไก่สด', amount: 2, unit: 'ฟอง', category: 'meat' },
      { name: 'ถั่วงอกสดและกุยช่ายหั่นท่อน', amount: 100, unit: 'กรัม', category: 'produce' },
      { name: 'น้ำมะขามเปียกเข้มข้น', amount: 2, unit: 'ช้อนโต๊ะ', category: 'seasoning' },
      { name: 'น้ำปลาลดโซเดียม', amount: 1.5, unit: 'ช้อนโต๊ะ', category: 'seasoning' },
      { name: 'สารให้ความหวานหล่อฮังก๊วย', amount: 1, unit: 'ช้อนชา', category: 'seasoning' },
      { name: 'ถั่วลิสงคั่วบดหยาบ', amount: 1, unit: 'ช้อนโต๊ะ', category: 'seasoning' }
    ],
    steps: [
      {
        step: 1,
        title: 'ผัดเต้าหู้และกุ้ง',
        text: 'ตั้งกระทะใส่น้ำมันมะพร้าวเล็กน้อย ผัดเต้าหู้เหลืองจนเหลืองหอม ใส่กุ้งลงผัดพอสุก 80% แล้วตักกุ้งขึ้นพักไว้ก่อน',
        timerSeconds: 150,
        tip: 'ตักกุ้งขึ้นพักไว้ก่อนเพื่อไม่ให้กุ้งสุกเกินจนแข็งกระด้าง'
      },
      {
        step: 2,
        title: 'ผัดเส้นบุกและซอสผัดไทย',
        text: 'ใส่เส้นบุกลงกระทะ ปรุงรสด้วยน้ำมะขามเปียก น้ำปลา และสารให้ความหวาน ผัดคลุกเคล้าจนน้ำซอสซึมเข้าเส้น',
        timerSeconds: 180,
        tip: 'ล้างเส้นบุกด้วยน้ำอุ่นผสมน้ำส้มสายชูเล็กน้อยเพื่อดับกลิ่นน้ำดอง'
      },
      {
        step: 3,
        title: 'ใส่ไข่ ถั่วงอก และกุยช่าย',
        text: 'ดันเส้นไปข้างกระทะ ตอกไข่ไก่ลงยีพอสุก ตลบเส้นกลับมา ใส่กุ้งที่พักไว้ ถั่วงอก และกุยช่าย ผัดเร็วๆ ไฟแรง ตักใส่จานโรยถั่วลิสงบดและมะนาวซีก',
        timerSeconds: 120,
        tip: 'ปิดไฟเมื่อผักยังกรอบอยู่'
      }
    ]
  },
  {
    id: 'rec-10',
    title: 'สลัดกุ้งย่างซอสเพสโต้โหระพาไทย',
    titleEn: 'Grilled Prawn Pesto Salad',
    category: 'salad',
    calories: 330,
    prepTime: 10,
    cookTime: 5,
    difficulty: 'Easy',
    difficultyTh: 'ง่ายมาก',
    rating: 4.8,
    reviewsCount: 112,
    tags: ['< 15 นาที', 'คลีน', 'คีโต', 'โปรตีนสูง'],
    image: 'images/rec-10.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1551248429-40975aa4de74?auto=format&fit=crop&w=800&q=80',
    description: 'กุ้งแม่น้ำย่างกระทะหอมกลิ่นควัน คลุกเคล้าซอสเพสโต้โฮมเมดจากใบโหระพาไทยสด น้ำมันมะกอก และวอลนัท ทานคู่ผักร็อกเก็ตและมะเขือเทศเชอร์รี่',
    baseServings: 2,
    macros: {
      calories: 330,
      protein: 30,
      carbs: 9,
      fat: 18,
      fiber: 5,
      sodium: 420
    },
    ingredients: [
      { name: 'กุ้งสดแกะเปลือกไว้หาง', amount: 250, unit: 'กรัม', category: 'meat' },
      { name: 'ผักร็อกเก็ตและเบบี้สปิแนช', amount: 120, unit: 'กรัม', category: 'produce' },
      { name: 'มะเขือเทศเชอร์รี่ผ่าครึ่ง', amount: 10, unit: 'ลูก', category: 'produce' },
      { name: 'ซอสเพสโต้โหระพา', amount: 2, unit: 'ช้อนโต๊ะ', category: 'seasoning' },
      { name: 'น้ำมันมะกอก', amount: 1, unit: 'ช้อนชา', category: 'seasoning' },
      { name: 'ชีสพาร์เมซานขูดสด', amount: 1, unit: 'ช้อนโต๊ะ', category: 'seasoning' },
      { name: 'เกลือและพริกไทยดำ', amount: 0.5, unit: 'ช้อนชา', category: 'seasoning' }
    ],
    steps: [
      {
        step: 1,
        title: 'ย่างกุ้ง',
        text: 'คลุกกุ้งด้วยน้ำมันมะกอก เกลือ และพริกไทย ตั้งกระทะร้อนจัด ย่างกุ้งด้านละ 2 นาทีจนเปลี่ยนเป็นสีส้มสุกหอม',
        timerSeconds: 240,
        tip: 'กระทะต้องร้อนจัดเพื่อให้ผิวกุ้งมีกลิ่นหอมเกรียมเล็กน้อย'
      },
      {
        step: 2,
        title: 'คลุกเคล้าผักและน้ำสลัด',
        text: 'ผสมผักร็อกเก็ต มะเขือเทศเชอร์รี่ และซอสเพสโต้ในชามผสม คลุกเคล้าอย่างเบามือให้ทั่ว',
        timerSeconds: 0,
        tip: 'ซอสเพสโต้มีน้ำมันมะกอกคุณภาพดีช่วยดูดซึมวิตามินจากผัก'
      },
      {
        step: 3,
        title: 'จัดจานเสิร์ฟ',
        text: 'วางสลัดลงในจาน นำกุ้งย่างจัดเรียงด้านบน โรยด้วยชีสพาร์เมซานขูดสด พร้อมเสิร์ฟ',
        timerSeconds: 0,
        tip: 'ทานคู่กับขนมปังโฮลวีตปิ้งเพื่อเพิ่มคาร์โบไฮเดรตเชิงซ้อน'
      }
    ]
  },
  {
    id: 'rec-11',
    title: 'ข้าวหน้าเนื้อกิวด้งไข่ออนเซ็นคลีน',
    titleEn: 'Clean Japanese Beef Bowl with Onsen Egg',
    category: 'main',
    calories: 440,
    prepTime: 10,
    cookTime: 10,
    difficulty: 'Easy',
    difficultyTh: 'ง่ายมาก',
    rating: 4.9,
    reviewsCount: 230,
    tags: ['< 15 นาที', 'โปรตีนสูง', 'คลีน'],
    image: 'images/rec-11.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80',
    description: 'เนื้อสไลซ์นุ่มผัดหอมใหญ่เคี่ยวในน้ำซุปปลาแห้งดาชิและโชยุลดโซเดียม โปะบนข้าวกล้องร้อนๆ และไข่ออนเซ็นเยิ้มๆ รสชาติสไตล์ญี่ปุ่นแท้แต่คลีน',
    baseServings: 2,
    macros: {
      calories: 440,
      protein: 35,
      carbs: 48,
      fat: 12,
      fiber: 4,
      sodium: 520
    },
    ingredients: [
      { name: 'เนื้อสันในวัวสไลซ์บาง', amount: 240, unit: 'กรัม', category: 'meat' },
      { name: 'หอมใหญ่หั่นเสี้ยว', amount: 1, unit: 'หัว', category: 'produce' },
      { name: 'น้ำซุปปลาแห้งดาชิ', amount: 200, unit: 'มล.', category: 'seasoning' },
      { name: 'โชยุลดโซเดียม', amount: 2, unit: 'ช้อนโต๊ะ', category: 'seasoning' },
      { name: 'มิริน', amount: 1, unit: 'ช้อนโต๊ะ', category: 'seasoning' },
      { name: 'ข้าวกล้องญี่ปุ่นหุงสุก', amount: 200, unit: 'กรัม', category: 'grains' },
      { name: 'ไข่ออนเซ็น', amount: 2, unit: 'ฟอง', category: 'meat' },
      { name: 'ต้นหอมญี่ปุ่นซอยและขิงดอง', amount: 2, unit: 'ช้อนโต๊ะ', category: 'produce' }
    ],
    steps: [
      {
        step: 1,
        title: 'เคี่ยวหอมใหญ่ในน้ำซุป',
        text: 'ตั้งหม้อใส่น้ำซุปดาชิ โชยุ และมิริน ใส่หอมใหญ่ลงเคี่ยวด้วยไฟกลาง 5 นาทีจนหอมใสและนุ่มหวาน',
        timerSeconds: 300,
        tip: 'เคี่ยวหอมใหญ่ให้นุ่มใสจะดึงความหวานธรรมชาติออกมาโดยไม่ต้องเติมน้ำตาล'
      },
      {
        step: 2,
        title: 'ลวกเนื้อสไลซ์',
        text: 'ใส่เนื้อวัวสไลซ์ลงไปในน้ำซุปเดือด ใช้ตะเกียบกระจายเนื้อไม่ให้ติดกัน ลวกแค่ 2-3 นาทีจนเนื้อสุกนุ่ม ปิดไฟ',
        timerSeconds: 150,
        tip: 'ห้ามเคี่ยวเนื้อนานเกินไปเพราะเนื้อจะแข็งเหนียว'
      },
      {
        step: 3,
        title: 'จัดชามกิวด้ง',
        text: 'ตักข้าวกล้องใส่ชาม ตักเนื้อและหอมใหญ่พร้อมน้ำซุปราดลงไป ตอกไข่ออนเซ็นตรงกลาง โรยต้นหอมซอย',
        timerSeconds: 0,
        tip: 'คลุกไข่ออนเซ็นกับเนื้อและข้าวก่อนตักทาน'
      }
    ]
  },
  {
    id: 'rec-12',
    title: 'สเต๊กเต้าหู้ย่างเห็ดชิตาเกะซอสเทอริยากิ',
    titleEn: 'Grilled Tofu Steak & Shiitake Mushrooms',
    category: 'main',
    calories: 290,
    prepTime: 10,
    cookTime: 10,
    difficulty: 'Easy',
    difficultyTh: 'ง่ายมาก',
    rating: 4.7,
    reviewsCount: 76,
    tags: ['< 15 นาที', 'คลีน', 'มังสวิรัติ', 'งบประหยัด'],
    image: 'images/rec-12.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1546549032-9571cd6b27df?auto=format&fit=crop&w=800&q=80',
    description: 'เต้าหู้โมเมนเนื้อแน่นย่างกระทะผิวสีเหลืองทอง เคียงเห็ดชิตาเกะสดผัดซอสรสหวานกลมกล่อม โปรตีนจากพืช 100% เหมาะสำหรับวันทานมังสวิรัติ',
    baseServings: 2,
    macros: {
      calories: 290,
      protein: 22,
      carbs: 24,
      fat: 10,
      fiber: 6,
      sodium: 410
    },
    ingredients: [
      { name: 'เต้าหู้ขาวชนิดแข็ง (โมเมน)', amount: 300, unit: 'กรัม', category: 'meat' },
      { name: 'เห็ดชิตาเกะสดหั่นชิ้น', amount: 100, unit: 'กรัม', category: 'produce' },
      { name: 'น้ำมันงา', amount: 1, unit: 'ช้อนชา', category: 'seasoning' },
      { name: 'ซอสเทอริยากิสูตรเจ', amount: 2, unit: 'ช้อนโต๊ะ', category: 'seasoning' },
      { name: 'งาขาวคั่ว', amount: 1, unit: 'ช้อนชา', category: 'seasoning' },
      { name: 'ต้นหอมซอย', amount: 1, unit: 'ต้น', category: 'produce' }
    ],
    steps: [
      {
        step: 1,
        title: 'เตรียมเต้าหู้',
        text: 'หั่นเต้าหู้เป็นชิ้นหนา 2 ซม. ใช้กระดาษอเนกประสงค์ซับน้ำออกให้แห้งสนิทที่สุด',
        timerSeconds: 120,
        tip: 'การซับน้ำออกจะช่วยให้เต้าหู้ย่างแล้วผิวด้านนอกกรอบเหลือง'
      },
      {
        step: 2,
        title: 'ย่างเต้าหู้และเห็ด',
        text: 'ตั้งกระทะทาน้ำมันงาบางๆ ย่างเต้าหู้ด้านละ 4 นาทีจนสีเหลืองทองสวย ใส่เห็ดชิตาเกะลงผัดข้างๆ จนสุกหอม',
        timerSeconds: 360,
        tip: 'ใช้ไฟกลางค่อนไปทางอ่อนเพื่อให้เต้าหู้กรอบนอกนุ่มใน'
      },
      {
        step: 3,
        title: 'ราดซอสและเสิร์ฟ',
        text: 'ราดซอสเทอริยากิลงบนเต้าหู้และเห็ด คลุกเคล้าให้ซอสเคลือบทั่ว ตักใส่จานโรยงาขาวและต้นหอมซอย',
        timerSeconds: 60,
        tip: 'เสิร์ฟร้อนๆ คู่ข้าวกล้องหรือผักลวก'
      }
    ]
  }
];

// Available Pantry Ingredients for Fridge Filter
const PANTRY_ITEMS = [
  { id: 'pantry-chicken', name: 'อกไก่ / เนื้อไก่', icon: '🍗', category: 'meat' },
  { id: 'pantry-salmon', name: 'แซลมอน / ปลา', icon: '🐟', category: 'meat' },
  { id: 'pantry-shrimp', name: 'กุ้งสด', icon: '🦐', category: 'meat' },
  { id: 'pantry-beef', name: 'เนื้อวัว', icon: '🥩', category: 'meat' },
  { id: 'pantry-egg', name: 'ไข่ไก่', icon: '🥚', category: 'meat' },
  { id: 'pantry-tofu', name: 'เต้าหู้', icon: '🧈', category: 'meat' },
  { id: 'pantry-avocado', name: 'อะโวคาโด', icon: '🥑', category: 'produce' },
  { id: 'pantry-tomato', name: 'มะเขือเทศ', icon: '🍅', category: 'produce' },
  { id: 'pantry-mushroom', name: 'เห็ดต่างๆ', icon: '🍄', category: 'produce' },
  { id: 'pantry-cucumber', name: 'แตงกวา', icon: '🥒', category: 'produce' },
  { id: 'pantry-salad', name: 'ผักสลัด / ผักใบเขียว', icon: '🥬', category: 'produce' },
  { id: 'pantry-basil', name: 'ใบกะเพรา / โหระพา', icon: '🌿', category: 'produce' },
  { id: 'pantry-rice', name: 'ข้าวกล้อง / ข้าวไรซ์เบอร์รี่', icon: '🍚', category: 'grains' },
  { id: 'pantry-bread', name: 'ขนมปัง / ซาวเออร์โดว์', icon: '🍞', category: 'grains' },
  { id: 'pantry-yogurt', name: 'กรีกโยเกิร์ต', icon: '🥛', category: 'meat' },
  { id: 'pantry-berries', name: 'เบอร์รี่ / ผลไม้สด', icon: '🍓', category: 'produce' }
];

// Initial Weekly Meal Plan (7 days x 4 meals)
const INITIAL_MEAL_PLAN = {
  monday: {
    breakfast: 'rec-3', // โทสต์อะโวคาโดไข่ดาวน้ำ
    lunch: 'rec-5',     // กะเพราอกไก่สับข้าวไรซ์เบอร์รี่
    dinner: 'rec-1',    // แซลมอนโปเกโบวล์
    snack: 'rec-7'      // กรีกโยเกิร์ตพาร์เฟต์
  },
  tuesday: {
    breakfast: 'rec-7', // กรีกโยเกิร์ต
    lunch: 'rec-2',     // อกไก่ย่างสมุนไพร
    dinner: 'rec-4',    // ต้มยำกุ้งน้ำใส
    snack: 'rec-8'      // สมูทตี้โบวล์
  },
  wednesday: {
    breakfast: 'rec-3',
    lunch: 'rec-11',    // ข้าวหน้าเนื้อกิวด้ง
    dinner: 'rec-6',    // แซลมอนย่างเทอริยากิ
    snack: null
  },
  thursday: {
    breakfast: null,
    lunch: 'rec-9',     // ผัดไทยกุ้งสดเส้นบุก
    dinner: 'rec-2',    // อกไก่ย่าง
    snack: 'rec-7'
  },
  friday: {
    breakfast: 'rec-8',
    lunch: 'rec-5',
    dinner: 'rec-10',   // สลัดกุ้งย่างซอสเพสโต้
    snack: null
  },
  saturday: {
    breakfast: 'rec-3',
    lunch: 'rec-1',
    dinner: 'rec-6',
    snack: 'rec-7'
  },
  sunday: {
    breakfast: 'rec-7',
    lunch: 'rec-12',    // สเต๊กเต้าหู้ย่าง
    dinner: 'rec-4',
    snack: 'rec-8'
  }
};

// Daily Nutrition Target Norms
const DEFAULT_NUTRITION_TARGET = {
  calories: 2000,
  protein: 130, // grams
  carbs: 210,   // grams
  fat: 65,      // grams
  fiber: 30     // grams
};
