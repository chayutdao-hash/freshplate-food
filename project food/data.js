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
  },
  {
    id: 'rec-13',
    title: 'สเต๊กเนื้อสตริปลอยน์ย่างพริกไทยดำกับเห็ดย่างเนยกระเทียม',
    titleEn: 'Grilled Striploin Steak with Garlic Herb Mushrooms',
    category: 'main',
    calories: 480,
    prepTime: 10,
    cookTime: 12,
    difficulty: 'Medium',
    difficultyTh: 'ปานกลาง',
    rating: 4.9,
    reviewsCount: 195,
    tags: ['โปรตีนสูง', 'คีโต', 'คลีน'],
    image: 'images/rec-13.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=80',
    description: 'เนื้อวัวสันนอกออสเตรเลียคัดพิเศษ ย่างระดับมีเดียมแรร์ให้ผิวนอกหอมเกรียม ด้านในนุ่มชุ่มฉ่ำ ทานคู่เห็ดออรินจิและเห็ดแชมปิญองย่างเนยกระเทียมโรสแมรี่ โปรตีนแน่นเต็มอิ่ม',
    baseServings: 2,
    macros: {
      calories: 480,
      protein: 46,
      carbs: 8,
      fat: 28,
      fiber: 4,
      sodium: 430
    },
    ingredients: [
      { name: 'เนื้อวัวสันนอก (Striploin)', amount: 350, unit: 'กรัม', category: 'meat' },
      { name: 'เห็ดออรินจิหั่นชิ้นหนา', amount: 120, unit: 'กรัม', category: 'produce' },
      { name: 'เห็ดแชมปิญองผ่าครึ่ง', amount: 80, unit: 'กรัม', category: 'produce' },
      { name: 'น้ำมันมะกอก Extra Virgin', amount: 1.5, unit: 'ช้อนโต๊ะ', category: 'seasoning' },
      { name: 'เนยสดแท้ชนิดจืด (Grass-fed)', amount: 15, unit: 'กรัม', category: 'seasoning' },
      { name: 'กระเทียมจีนกลีบใหญ่บุบ', amount: 4, unit: 'กลีบ', category: 'produce' },
      { name: 'โรสแมรี่สด', amount: 2, unit: 'ก้าน', category: 'produce' },
      { name: 'เกลือสมุทรหยาบและพริกไทยดำบดสด', amount: 1, unit: 'ช้อนชา', category: 'seasoning' }
    ],
    steps: [
      {
        step: 1,
        title: 'เตรียมเนื้อวัวสเต๊ก',
        text: 'นำเนื้อวัวออกจากตู้เย็นพักไว้ในอุณหภูมิห้อง 15 นาทีก่อนย่าง ซับเนื้อให้แห้ง โรยเกลือสมุทรและพริกไทยดำบดสดให้ทั่วทั้งสองด้าน',
        timerSeconds: 900,
        tip: 'การพักเนื้อให้อยู่ในอุณหภูมิห้องจะช่วยให้เนื้อสุกสม่ำเสมอทั่วชิ้น'
      },
      {
        step: 2,
        title: 'ย่างเนื้อสเต๊ก',
        text: 'ตั้งกระทะเหล็กหล่อไฟแรงจนมีควันบางๆ ทาน้ำมันมะกอก วางชิ้นเนื้อลงย่างด้านละ 2.5 - 3 นาที ใส่เนย กระเทียม และโรสแมรี่ ตักเนยราดบนผิวเนื้อ (Basting) จนสีน้ำตาลทองสวย นำขึ้นพัก 5 นาที',
        timerSeconds: 360,
        tip: 'ต้องพักเนื้อ (Rest) 5 นาทีก่อนหั่น เพื่อให้น้ำเนื้อกระจายตัวกลับสู่ชิ้นเนื้อ ไม่ไหลเยิ้มออกมา'
      },
      {
        step: 3,
        title: 'ผัดเห็ดย่างเนยกระเทียม',
        text: 'ใช้กระทะใบเดิมที่มีน้ำมันเนื้อและเนยหอม ใส่เห็ดออรินจิและเห็ดแชมปิญองลงผัดด้วยไฟกลางจนเห็ดสุกเหลืองหอม หั่นสเต๊กเป็นชิ้นเฉียงจัดเสิร์ฟคู่เห็ดย่าง',
        timerSeconds: 240,
        tip: 'เห็ดจะดูดซับรสชาติความหอมจากเนยและน้ำเนื้อที่ติดกระทะได้อย่างยอดเยี่ยม'
      }
    ]
  },
  {
    id: 'rec-14',
    title: 'ยำเนื้อย่างองุ่นและมิกซ์เบอร์รี่สดสมุนไพร',
    titleEn: 'Thai Spicy Grilled Beef Salad with Fresh Berries',
    category: 'salad',
    calories: 350,
    prepTime: 10,
    cookTime: 6,
    difficulty: 'Easy',
    difficultyTh: 'ง่ายมาก',
    rating: 4.9,
    reviewsCount: 168,
    tags: ['< 15 นาที', 'คลีน', 'โปรตีนสูง'],
    image: 'images/rec-14.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    description: 'เนื้อวัวย่างเตาถ่านสไลซ์พอดีคำ คลุกเคล้าน้ำยำสมุนไพรรสจัดจ้าน เปรี้ยวหวานธรรมชาติจากสตรอว์เบอร์รี บลูเบอร์รีสด และองุ่นไร้เมล็ด หอมสะระแหน่และข้าวคั่ว',
    baseServings: 2,
    macros: {
      calories: 350,
      protein: 34,
      carbs: 20,
      fat: 12,
      fiber: 5,
      sodium: 490
    },
    ingredients: [
      { name: 'เนื้อวัวสันในสไลซ์', amount: 260, unit: 'กรัม', category: 'meat' },
      { name: 'สตรอว์เบอร์รีสดผ่าครึ่ง', amount: 80, unit: 'กรัม', category: 'produce' },
      { name: 'บลูเบอร์รีสด', amount: 50, unit: 'กรัม', category: 'produce' },
      { name: 'องุ่นแดงไร้เมล็ดผ่าครึ่ง', amount: 60, unit: 'กรัม', category: 'produce' },
      { name: 'ผักสลัดมิกซ์และใบสะระแหน่', amount: 100, unit: 'กรัม', category: 'produce' },
      { name: 'หอมแดงแขกซอย', amount: 2, unit: 'หัว', category: 'produce' },
      { name: 'น้ำปลาลดโซเดียม', amount: 1.5, unit: 'ช้อนโต๊ะ', category: 'seasoning' },
      { name: 'น้ำมะนาวคั้นสด', amount: 2, unit: 'ช้อนโต๊ะ', category: 'produce' },
      { name: 'พริกขี้หนูสวนซอย', amount: 4, unit: 'เม็ด', category: 'produce' },
      { name: 'ข้าวคั่วสมุนไพร', amount: 1, unit: 'ช้อนชา', category: 'grains' }
    ],
    steps: [
      {
        step: 1,
        title: 'ย่างเนื้อวัว',
        text: 'โรยเกลือพริกไทยดำบนเนื้อวัวสันในเล็กน้อย ย่างบนกระทะร้อนจัดด้านละ 2 นาที ให้ด้านนอกเกรียมหอมและด้านในยังคงชุ่มฉ่ำชมพู นำขึ้นพักแล้วหั่นเป็นชิ้นพอดีคำ',
        timerSeconds: 240,
        tip: 'ย่างแบบมีเดียมแรร์เพื่อให้เนื้อไม่เหนียวและคงความหวานฉ่ำ'
      },
      {
        step: 2,
        title: 'ปรุงน้ำยำสมุนไพร',
        text: 'ผสมน้ำมะนาวสด น้ำปลาลดโซเดียม และพริกขี้หนูซอย คนให้เข้ากัน ชิมรสให้ได้เปรี้ยวนำเค็มกลมกล่อมตามสไตล์ยำไทย',
        timerSeconds: 60,
        tip: 'ใช้น้ำมะนาวสดแท้เพื่อความหอมสดชื่น'
      },
      {
        step: 3,
        title: 'คลุกเคล้าผลไม้และเสิร์ฟ',
        text: 'ใส่เนื้อวัวย่าง สตรอว์เบอร์รี บลูเบอร์รี องุ่น หอมแดง และใบสะระแหน่ลงในชามผสม ราดน้ำยำและโรยข้าวคั่ว คลุกเบาๆ ตักวางบนผักสลัดพร้อมเสิร์ฟ',
        timerSeconds: 60,
        tip: 'คลุกเคล้าเบามือเพื่อไม่ให้ผลไม้สดช้ำ'
      }
    ]
  },
  {
    id: 'rec-15',
    title: 'โบวล์เห็ดรวม 3 อย่างผัดซอสกระเทียมและข้าวไรซ์เบอร์รี่',
    titleEn: 'Triple Mushroom Teriyaki Riceberry Bowl',
    category: 'bowl',
    calories: 340,
    prepTime: 10,
    cookTime: 8,
    difficulty: 'Easy',
    difficultyTh: 'ง่ายมาก',
    rating: 4.8,
    reviewsCount: 140,
    tags: ['< 15 นาที', 'คลีน', 'มังสวิรัติ', 'งบประหยัด'],
    image: 'images/rec-15.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&w=800&q=80',
    description: 'รวมความอร่อยของเห็ดหอมสด เห็ดชิเมจิ และเห็ดออรินจิ ผัดซอสโชยุยูซุกระเทียมพริกไทย เสิร์ฟบนข้าวไรซ์เบอร์รี่ อะโวคาโด ถั่วแระญี่ปุ่น และไข่ออนเซ็นเยิ้มๆ',
    baseServings: 2,
    macros: {
      calories: 340,
      protein: 18,
      carbs: 46,
      fat: 10,
      fiber: 8,
      sodium: 420
    },
    ingredients: [
      { name: 'เห็ดออรินจิหั่นเต๋า', amount: 100, unit: 'กรัม', category: 'produce' },
      { name: 'เห็ดชิเมจิน้ำตาลตัดโคน', amount: 100, unit: 'กรัม', category: 'produce' },
      { name: 'เห็ดหอมสดหั่นชิ้น', amount: 80, unit: 'กรัม', category: 'produce' },
      { name: 'ข้าวไรซ์เบอร์รี่หุงสุก', amount: 200, unit: 'กรัม', category: 'grains' },
      { name: 'ไข่ออนเซ็น', amount: 2, unit: 'ฟอง', category: 'meat' },
      { name: 'อะโวคาโดหั่นสไลซ์', amount: 0.5, unit: 'ลูก', category: 'produce' },
      { name: 'ถั่วแระญี่ปุ่นแกะเปลือก', amount: 50, unit: 'กรัม', category: 'produce' },
      { name: 'โชยุลดโซเดียมและน้ำมันงา', amount: 1.5, unit: 'ช้อนโต๊ะ', category: 'seasoning' },
      { name: 'งาขาวคั่วและต้นหอมซอย', amount: 1, unit: 'ช้อนโต๊ะ', category: 'produce' }
    ],
    steps: [
      {
        step: 1,
        title: 'ผัดเห็ดสามสหาย',
        text: 'ตั้งกระทะใส่น้ำมันงาเล็กน้อย นำเห็ดออรินจิ เห็ดชิเมจิ และเห็ดหอมสดลงผัดด้วยไฟกลางค่อนข้างแรงจนเห็ดเริ่มสุกหอมและมีสีน้ำตาลทองสวย',
        timerSeconds: 240,
        tip: 'ใช้ไฟแรงผัดเห็ดเร็วๆ จะช่วยให้น้ำในเห็ดไม่ออกมามาก เห็ดจะหอมกรอบ'
      },
      {
        step: 2,
        title: 'ปรุงรสซอสโชยุยูซุ',
        text: 'ราดโชยุลดโซเดียมและพริกไทยดำลงบนเห็ด ผัดคลุกเคล้าให้ซอสเคลือบผิวเห็ดทุกชิ้นอย่างทั่วถึง ปิดไฟยกลง',
        timerSeconds: 60,
        tip: 'ใส่โชยุก่อนปิดไฟเล็กน้อยเพื่อให้กลิ่นหอมไหม้กระทะเบาๆ'
      },
      {
        step: 3,
        title: 'ประกอบโบวล์เพื่อสุขภาพ',
        text: 'ตักข้าวไรซ์เบอร์รี่ใส่ชาม จัดวางเห็ดผัด อะโวคาโดสไลซ์ และถั่วแระญี่ปุ่น ตอกไข่ออนเซ็นตรงกลาง โรยงาขาวคั่วและต้นหอมซอย พร้อมเสิร์ฟ',
        timerSeconds: 0,
        tip: 'คลุกไข่ออนเซ็นกับข้าวไรซ์เบอร์รี่และเห็ดเพื่อรสสัมผัสเนียนนุ่มกลมกล่อม'
      }
    ]
  },
  {
    id: 'rec-16',
    title: 'ซุปครีมเห็ดพอร์โทเบลโลและทรัฟเฟิลสูตรคลีนไร้แป้ง',
    titleEn: 'Clean Portobello & Truffle Mushroom Soup',
    category: 'soup',
    calories: 210,
    prepTime: 12,
    cookTime: 15,
    difficulty: 'Medium',
    difficultyTh: 'ปานกลาง',
    rating: 4.9,
    reviewsCount: 184,
    tags: ['คลีน', 'คีโต', 'มังสวิรัติ'],
    image: 'images/rec-16.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80',
    description: 'ซุปเห็ดพอร์โทเบลโลและเห็ดแชมปิญองเนื้อเนียนละเอียด ปั่นรวมกับดอกกะหล่ำและนมอัลมอนด์ให้ความเข้มข้นแทนแป้งและครีมหนัก ปรุงหอมด้วยน้ำมันเห็ดทรัฟเฟิล',
    baseServings: 2,
    macros: {
      calories: 210,
      protein: 9,
      carbs: 14,
      fat: 12,
      fiber: 6,
      sodium: 380
    },
    ingredients: [
      { name: 'เห็ดพอร์โทเบลโลสดหั่นชิ้น', amount: 200, unit: 'กรัม', category: 'produce' },
      { name: 'เห็ดแชมปิญองสีน้ำตาล', amount: 150, unit: 'กรัม', category: 'produce' },
      { name: 'ดอกกะหล่ำนึ่งสุก (สำหรับเพิ่มความข้น)', amount: 150, unit: 'กรัม', category: 'produce' },
      { name: 'นมอัลมอนด์รสจืดหรือนมโอ๊ต', amount: 250, unit: 'มล.', category: 'grains' },
      { name: 'น้ำซุปผักใส', amount: 300, unit: 'มล.', category: 'seasoning' },
      { name: 'หอมหัวใหญ่สับและกระเทียม', amount: 2, unit: 'ช้อนโต๊ะ', category: 'produce' },
      { name: 'น้ำมันเห็ดทรัฟเฟิลบริสุทธิ์', amount: 1, unit: 'ช้อนชา', category: 'seasoning' },
      { name: 'พาร์สลีย์สดสับและพริกไทยดำ', amount: 1, unit: 'ช้อนชา', category: 'seasoning' }
    ],
    steps: [
      {
        step: 1,
        title: 'ผัดเห็ดและหอมใหญ่',
        text: 'ตั้งหม้อผัดหอมใหญ่และกระเทียมด้วยน้ำมันมะกอกจนหอมใส ใส่เห็ดพอร์โทเบลโลและเห็ดแชมปิญองลงผัดจนเห็ดสุกนิ่ม กลิ่นหอมฟุ้ง (แบ่งชิ้นเห็ดสวยๆ เก็บไว้ตกแต่ง 3-4 ชิ้น)',
        timerSeconds: 300,
        tip: 'ผัดเห็ดให้สุกเกรียมเล็กน้อยจะสร้างความลึกของรสชาติอูมามิ'
      },
      {
        step: 2,
        title: 'ต้มและปั่นเนียน',
        text: 'ใส่ดอกกะหล่ำนึ่ง น้ำซุปผัก และนมอัลมอนด์ลงในหม้อ ต้มเดือด 5 นาที ปิดไฟ ใช้เครื่องปั่นมือถือ (Hand blender) ปั่นจนเนื้อเนียนละเอียดดั่งกำมะหยี่',
        timerSeconds: 360,
        tip: 'ดอกกะหล่ำนึ่งสุกเป็นเคล็ดลับความครีมมี่เนียนนุ่มระดับเชฟโดยไม่ต้องใส่แป้งหรือเฮฟวี่ครีม'
      },
      {
        step: 3,
        title: 'ปรุงรสและแต่งหน้า',
        text: 'ปรุงรสด้วยเกลือและพริกไทยดำ ตักใส่ถ้วยวางเห็ดผัดที่แบ่งไว้ด้านบน หยดน้ำมันทรัฟเฟิลและโรยพาร์สลีย์สับ เสิร์ฟร้อนๆ',
        timerSeconds: 0,
        tip: 'หยดน้ำมันทรัฟเฟิลตอนพร้อมเสิร์ฟทันทีเพื่อคงกลิ่นหอมจรุงใจ'
      }
    ]
  },
  {
    id: 'rec-17',
    title: 'โบวล์ลาบเห็ดรวมเต้าหู้ย่างและผักสดพื้นบ้าน',
    titleEn: 'Spicy Mixed Mushroom Larb & Grilled Tofu Bowl',
    category: 'salad',
    calories: 260,
    prepTime: 10,
    cookTime: 6,
    difficulty: 'Easy',
    difficultyTh: 'ง่ายมาก',
    rating: 4.8,
    reviewsCount: 155,
    tags: ['< 15 นาที', 'คลีน', 'มังสวิรัติ', 'งบประหยัด'],
    image: 'images/rec-17.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&w=800&q=80',
    description: 'เห็ดเข็มทอง เห็ดหูหนูขาว และเห็ดชิเมจิ ลวกสุกกรุบกรอบ คลุกเคล้าเครื่องลาบพริกป่นคั่วเอง ข้าวคั่วหอมกรุ่น มะนาวสด เคียงเต้าหู้ย่างสีเหลืองทองและแตงกวาแช่เย็น',
    baseServings: 2,
    macros: {
      calories: 260,
      protein: 18,
      carbs: 26,
      fat: 8,
      fiber: 7,
      sodium: 440
    },
    ingredients: [
      { name: 'เห็ดชิเมจิขาวและน้ำตาล', amount: 120, unit: 'กรัม', category: 'produce' },
      { name: 'เห็ดเข็มทองล้างสะอาด', amount: 100, unit: 'กรัม', category: 'produce' },
      { name: 'เห็ดหูหนูขาวแช่น้ำหั่นชิ้น', amount: 80, unit: 'กรัม', category: 'produce' },
      { name: 'เต้าหู้ขาวแข็งหั่นเต๋าย่าง', amount: 150, unit: 'กรัม', category: 'meat' },
      { name: 'ข้าวคั่วข้าวเหนียวดำ', amount: 1.5, unit: 'ช้อนโต๊ะ', category: 'grains' },
      { name: 'พริกป่นคั่วละเอียด', amount: 1, unit: 'ช้อนชา', category: 'seasoning' },
      { name: 'น้ำมะนาวสดแท้', amount: 2, unit: 'ช้อนโต๊ะ', category: 'produce' },
      { name: 'ซีอิ๊วขาวลดโซเดียม', amount: 1.5, unit: 'ช้อนโต๊ะ', category: 'seasoning' },
      { name: 'ใบสะระแหน่ ผักชีฝรั่ง และแตงกวา', amount: 60, unit: 'กรัม', category: 'produce' }
    ],
    steps: [
      {
        step: 1,
        title: 'ย่างเต้าหู้และลวกเห็ด',
        text: 'ย่างเต้าหู้หั่นเต๋าบนกระทะจนผิวกรอบทองทุกด้าน พักไว้ จากนั้นต้มน้ำเดือด นำเห็ดทั้งสามชนิดลงลวกสั้นๆ 1-2 นาที ตักสะเด็ดน้ำให้แห้ง',
        timerSeconds: 180,
        tip: 'สะเด็ดน้ำออกจากเห็ดให้แห้งเพื่อไม่ให้น้ำยำเจือจาง'
      },
      {
        step: 2,
        title: 'ปรุงรสลาบเห็ด',
        text: 'ใส่เห็ดลวกลงในชามผสม ปรุงรสด้วยซีอิ๊วขาว น้ำมะนาว พริกป่น และข้าวคั่วหอม คลุกเคล้าให้เข้าเนื้ออย่างรวดเร็ว',
        timerSeconds: 60,
        tip: 'ใส่ข้าวคั่วตอนท้ายสุดก่อนเสิร์ฟเพื่อคงความกรุบกรอบและหอมฉุน'
      },
      {
        step: 3,
        title: 'จัดจานพร้อมเต้าหู้ย่าง',
        text: 'ตักลาบเห็ดใส่ชาม จัดวางเต้าหู้ย่างสีทองรอบๆ โรยใบสะระแหน่และผักชีฝรั่งซอย ทานคู่แตงกวาแช่เย็นสดกรอบ',
        timerSeconds: 0,
        tip: 'ทานคู่ผักสดเพื่อเพิ่มไฟเบอร์และความสดชื่นในทุกคำ'
      }
    ]
  },
  {
    id: 'rec-18',
    title: 'อาซาอิเบอร์รี่สมูทตี้โบวล์ผลไม้สดและเมล็ดเจีย',
    titleEn: 'Superfood Acai Berry & Fresh Fruit Bowl',
    category: 'bowl',
    calories: 290,
    prepTime: 8,
    cookTime: 0,
    difficulty: 'Easy',
    difficultyTh: 'ง่ายมาก',
    rating: 4.9,
    reviewsCount: 220,
    tags: ['< 15 นาที', 'คลีน', 'มังสวิรัติ'],
    image: 'images/rec-18.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=800&q=80',
    description: 'อาซาอิเบอร์รี่ปั่นกับบลูเบอร์รี กล้วยหอมแช่แข็ง และนมอัลมอนด์จนเนื้อเนียนข้นดั่งไอศกรีม ท็อปปิ้งด้วยผลไม้สดแน่นชาม กีวี่ สตรอว์เบอร์รี มะพร้าวอบกรอบ และเมล็ดเจีย',
    baseServings: 2,
    macros: {
      calories: 290,
      protein: 7,
      carbs: 48,
      fat: 8,
      fiber: 11,
      sodium: 35
    },
    ingredients: [
      { name: 'อาซาอิเพียวเร่เข้มข้นแช่แข็ง', amount: 150, unit: 'กรัม', category: 'produce' },
      { name: 'บลูเบอร์รีแช่แข็ง', amount: 80, unit: 'กรัม', category: 'produce' },
      { name: 'กล้วยหอมสุกแช่แข็ง', amount: 1, unit: 'ลูก', category: 'produce' },
      { name: 'นมอัลมอนด์สูตรไม่เติมน้ำตาล', amount: 120, unit: 'มล.', category: 'seasoning' },
      { name: 'สตรอว์เบอร์รีสดหั่นสไลซ์', amount: 50, unit: 'กรัม', category: 'produce' },
      { name: 'กีวี่สดหั่นชิ้น', amount: 1, unit: 'ลูก', category: 'produce' },
      { name: 'เมล็ดเจีย (Chia Seeds)', amount: 1, unit: 'ช้อนโต๊ะ', category: 'grains' },
      { name: 'มะพร้าวอบกรอบสูตรธรรมชาติ', amount: 15, unit: 'กรัม', category: 'grains' }
    ],
    steps: [
      {
        step: 1,
        title: 'ปั่นเบสอาซาอิ',
        text: 'ใส่อาซาอิแช่แข็ง บลูเบอร์รี กล้วยหอมแช่แข็ง และนมอัลมอนด์ลงในโถปั่นความเร็วสูง ใช้ก้านคนช่วยดัน ปั่นจนได้เนื้อเนียนแน่นคล้ายไอศกรีมซอฟต์เสิร์ฟ',
        timerSeconds: 90,
        tip: 'ใส่นมอัลมอนด์ให้น้อยที่สุดเพื่อให้เนื้อเบสข้นพอที่จะรองรับท็อปปิ้งผลไม้สดได้ไม่จม'
      },
      {
        step: 2,
        title: 'เทใส่ชามเย็น',
        text: 'เทสมูทตี้อาซาอิใส่ชามกว้างที่แช่เย็นไว้ ปาดผิวหน้าให้เรียบเสมอกัน',
        timerSeconds: 0,
        tip: 'แช่ชามในตู้เย็น 5 นาทีเพื่อชะลอการละลายของสมูทตี้'
      },
      {
        step: 3,
        title: 'จัดเรียงผลไม้สดและท็อปปิ้ง',
        text: 'เรียงบลูเบอร์รี สตรอว์เบอร์รี กีวี่หั่นชิ้น มะพร้าวอบกรอบ และเมล็ดเจียเป็นแถวสวยงาม เสิร์ฟและรับประทานทันที',
        timerSeconds: 0,
        tip: 'ทานทันทีเพื่อสัมผัสความเย็นสดชื่นและประโยชน์จากสารต้านอนุมูลอิสระสูงสุด'
      }
    ]
  },
  {
    id: 'rec-19',
    title: 'กรีกโยเกิร์ตมิกซ์เบอร์รี่ครันช์และเมล็ดฟักทอง',
    titleEn: 'High-Protein Greek Yogurt Berry Crunch',
    category: 'snack',
    calories: 295,
    prepTime: 5,
    cookTime: 0,
    difficulty: 'Easy',
    difficultyTh: 'ง่ายมาก',
    rating: 4.9,
    reviewsCount: 205,
    tags: ['< 15 นาที', 'คลีน', 'โปรตีนสูง', 'งบประหยัด'],
    image: 'images/rec-19.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80',
    description: 'กรีกโยเกิร์ตเนื้อเนียนแน่นเข้มข้น โปรตีนสูงกว่า 24 กรัมต่อมื้อ ท็อปด้วยสตรอว์เบอร์รี บลูเบอร์รี ราสเบอร์รีสด กราโนล่าอบกรอบ เมล็ดฟักทอง และราดน้ำผึ้งป่าเดือนห้า',
    baseServings: 2,
    macros: {
      calories: 295,
      protein: 24,
      carbs: 32,
      fat: 8,
      fiber: 6,
      sodium: 75
    },
    ingredients: [
      { name: 'กรีกโยเกิร์ตรสธรรมชาติ (ไม่หวาน)', amount: 320, unit: 'กรัม', category: 'meat' },
      { name: 'ราสเบอร์รีสด', amount: 60, unit: 'กรัม', category: 'produce' },
      { name: 'บลูเบอร์รีสด', amount: 60, unit: 'กรัม', category: 'produce' },
      { name: 'สตรอว์เบอร์รีสดหั่นชิ้น', amount: 60, unit: 'กรัม', category: 'produce' },
      { name: 'กราโนล่าข้าวโอ๊ตน้ำตาลต่ำ', amount: 35, unit: 'กรัม', category: 'grains' },
      { name: 'เมล็ดฟักทองอบแห้ง', amount: 1, unit: 'ช้อนโต๊ะ', category: 'grains' },
      { name: 'น้ำผึ้งแท้ดอกไม้ป่า', amount: 1, unit: 'ช้อนชา', category: 'seasoning' }
    ],
    steps: [
      {
        step: 1,
        title: 'ตักกรีกโยเกิร์ตลงชาม',
        text: 'ตักกรีกโยเกิร์ตแท้เนื้อข้นใส่ชาม ใช้หลังช้อนเกลี่ยเบาๆ ให้เป็นคลื่นสวยงาม',
        timerSeconds: 0,
        tip: 'เลือกกรีกโยเกิร์ตที่มีปริมาณน้ำตาลธรรมชาติต่ำและโปรตีนสูง'
      },
      {
        step: 2,
        title: 'แต่งหน้าด้วยเบอร์รี่สด 3 ชนิด',
        text: 'จัดวางราสเบอร์รี สตรอว์เบอร์รี และบลูเบอร์รีสดลงบนหน้าโยเกิร์ต ตามด้วยกราโนล่ากรุบกรอบและเมล็ดฟักทองอบ',
        timerSeconds: 0,
        tip: 'เบอร์รี่สดอุดมไปด้วยวิตามินซีและสารแอนโทไซยานินชะลอวัย'
      },
      {
        step: 3,
        title: 'ราดน้ำผึ้งป่า',
        text: 'หยดน้ำผึ้งป่าแท้เส้นบางๆ เพิ่มความหอมหวานกลมกล่อม พร้อมรับประทานเป็นมื้อเช้าหรือของว่างคลีน',
        timerSeconds: 0,
        tip: 'สามารถพกใส่กล่องไปทานหลังออกกำลังกายเพื่อเติมโปรตีนซ่อมแซมกล้ามเนื้อ'
      }
    ]
  },
  {
    id: 'rec-20',
    title: 'มิกซ์เบอร์รี่สมูทตี้โยเกิร์ตสดดับเบิ้ลโพรไบโอติกส์',
    titleEn: 'Double Berry Yogurt Glow Smoothie',
    category: 'snack',
    calories: 230,
    prepTime: 5,
    cookTime: 0,
    difficulty: 'Easy',
    difficultyTh: 'ง่ายมาก',
    rating: 4.8,
    reviewsCount: 172,
    tags: ['< 15 นาที', 'คลีน', 'โปรตีนสูง', 'งบประหยัด'],
    image: 'images/rec-20.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=800&q=80',
    description: 'สมูทตี้สีม่วงทับทิมสดใส ปั่นจากมิกซ์เบอร์รี่สด กรีกโยเกิร์ตธรรมชาติ กล้วยหอม และนมอัลมอนด์ ได้สารแอนโทไซยานินและโพรไบโอติกส์ช่วยเสริมสร้างลำไส้และผิวพรรณ',
    baseServings: 2,
    macros: {
      calories: 230,
      protein: 16,
      carbs: 34,
      fat: 4,
      fiber: 7,
      sodium: 60
    },
    ingredients: [
      { name: 'มิกซ์เบอร์รี่สดและแช่แข็ง (สตรอว์เบอร์รี, บลูเบอร์รี)', amount: 160, unit: 'กรัม', category: 'produce' },
      { name: 'กรีกโยเกิร์ตธรรมชาติ', amount: 180, unit: 'กรัม', category: 'meat' },
      { name: 'กล้วยหอมสุกแช่แข็ง', amount: 1, unit: 'ลูก', category: 'produce' },
      { name: 'นมอัลมอนด์รสจืด', amount: 150, unit: 'มล.', category: 'seasoning' },
      { name: 'เมล็ดเจียหรือแฟลกซ์บด', amount: 1, unit: 'ช้อนชา', category: 'grains' },
      { name: 'ใบสะระแหน่สดสำหรับตกแต่ง', amount: 2, unit: 'ยอด', category: 'produce' }
    ],
    steps: [
      {
        step: 1,
        title: 'ใส่ส่วนผสมลงโถปั่น',
        text: 'ใส่มิกซ์เบอร์รี่ กรีกโยเกิร์ต กล้วยหอมแช่แข็ง และนมอัลมอนด์ลงในโถปั่นน้ำผลไม้',
        timerSeconds: 30,
        tip: 'กล้วยหอมแช่แข็งช่วยให้เนื้อสมูทตี้เนียนข้นโดยไม่ต้องใส่น้ำแข็งเจือจางรสชาติ'
      },
      {
        step: 2,
        title: 'ปั่นจนเนื้อเนียนละเอียด',
        text: 'เปิดเครื่องปั่นความเร็วสูง 45-60 วินาทีจนส่วนผสมทั้งหมดเนียนเป็นเนื้อครีมสีม่วงสดใส',
        timerSeconds: 60,
        tip: 'หากชอบเนื้อเหลวขึ้นสามารถเติมนมอัลมอนด์เพิ่มได้ตามชอบ'
      },
      {
        step: 3,
        title: 'เทใส่แก้วและตกแต่ง',
        text: 'เทสมูทตี้ใส่แก้วทรงสูง ท็อปด้วยบลูเบอร์รี สตรอว์เบอร์รีสด เมล็ดเจีย และใบสะระแหน่ เสิร์ฟทันทีขณะเย็นฉ่ำ',
        timerSeconds: 0,
        tip: 'ดื่มทันทีเพื่อรับคุณค่าจากวิตามินซีสดและจุลินทรีย์มีชีวิต'
      }
    ]
  },
  {
    id: 'rec-21',
    title: 'โบวล์ผลไม้สดรวมฤดูกาลกับน้ำสลัดโยเกิร์ตฮันนี่เลมอน',
    titleEn: 'Rainbow Fresh Fruit Bowl with Honey Lemon Yogurt',
    category: 'salad',
    calories: 220,
    prepTime: 8,
    cookTime: 0,
    difficulty: 'Easy',
    difficultyTh: 'ง่ายมาก',
    rating: 4.9,
    reviewsCount: 138,
    tags: ['< 15 นาที', 'คลีน', 'มังสวิรัติ', 'งบประหยัด'],
    image: 'images/rec-21.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1519996529931-28324d5a630e?auto=format&fit=crop&w=800&q=80',
    description: 'ความสดชื่นเต็มชามจากผลไม้สดคัดพิเศษ แตงโมฉ่ำ กีวี่ทอง เกรปฟรุต เชอร์รี่ สตรอว์เบอร์รี และบลูเบอร์รี ราดน้ำสลัดกรีกโยเกิร์ตผสมน้ำผึ้งและเลมอน หวานอมเปรี้ยวสดชื่น',
    baseServings: 2,
    macros: {
      calories: 220,
      protein: 8,
      carbs: 42,
      fat: 3,
      fiber: 7,
      sodium: 45
    },
    ingredients: [
      { name: 'แตงโมสดหั่นชิ้นสามเหลี่ยม', amount: 120, unit: 'กรัม', category: 'produce' },
      { name: 'กีวี่สดหั่นลายดอกไม้', amount: 1, unit: 'ลูก', category: 'produce' },
      { name: 'ส้มหรือเกรปฟรุตแกะกลีบ', amount: 80, unit: 'กรัม', category: 'produce' },
      { name: 'สตรอว์เบอร์รีและเชอร์รี่สด', amount: 100, unit: 'กรัม', category: 'produce' },
      { name: 'บลูเบอร์รีสด', amount: 50, unit: 'กรัม', category: 'produce' },
      { name: 'กรีกโยเกิร์ตสำหรับน้ำสลัด', amount: 100, unit: 'กรัม', category: 'meat' },
      { name: 'น้ำผึ้งแท้และน้ำเลมอนคั้นสด', amount: 1.5, unit: 'ช้อนโต๊ะ', category: 'seasoning' }
    ],
    steps: [
      {
        step: 1,
        title: 'หั่นผลไม้สดแช่เย็น',
        text: 'หั่นแตงโม กีวี่ เกรปฟรุต และสตรอว์เบอร์รีเป็นชิ้นพอดีคำ นำไปแช่เย็นในตู้เย็น 10 นาทีเพื่อความสดฉ่ำ',
        timerSeconds: 600,
        tip: 'ผลไม้เย็นๆ จะกรอบหวานชื่นใจและไม่คลายน้ำเร็ว'
      },
      {
        step: 2,
        title: 'ทำน้ำสลัดโยเกิร์ตฮันนี่เลมอน',
        text: 'ผสมกรีกโยเกิร์ต น้ำผึ้งแท้ และน้ำเลมอนสด คนให้เนื้อเนียนเข้ากัน ชิมรสให้ได้หวานละมุนอมเปรี้ยวสดชื่น',
        timerSeconds: 60,
        tip: 'ใช้น้ำผึ้งแท้ช่วยให้น้ำสลัดมีกลิ่นหอมดอกไม้ธรรมชาติ'
      },
      {
        step: 3,
        title: 'จัดเสิร์ฟโบวล์ผลไม้สด',
        text: 'จัดเรียงผลไม้หลากสีสันลงในชามกะลามะพร้าวหรือชามแก้ว เสิร์ฟคู่น้ำสลัดโยเกิร์ต ราดก่อนทานหรือใช้จิ้มทานคู่กัน',
        timerSeconds: 0,
        tip: 'ทานเป็นของว่างยามบ่ายแทนขนมหวาน ได้วิตามินและสารต้านอนุมูลอิสระครบถ้วน'
      }
    ]
  },
  {
    id: 'rec-22',
    title: 'เกาเหลาเนื้อตุ๋นสมุนไพรสดเห็ดนางรมหลวงน้ำใส',
    titleEn: 'Herbal Braised Beef Shank & King Oyster Mushroom Soup',
    category: 'soup',
    calories: 340,
    prepTime: 12,
    cookTime: 20,
    difficulty: 'Medium',
    difficultyTh: 'ปานกลาง',
    rating: 4.9,
    reviewsCount: 245,
    tags: ['โปรตีนสูง', 'คลีน', 'คีโต'],
    image: 'images/rec-22.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=800&q=80',
    description: 'เนื้อวัวน่องลายตุ๋นสมุนไพรจีนและไทยจนเปื่อยนุ่มเคี้ยวเพลิน น้ำซุปใสกลมกล่อมหอมรากผักชี พริกไทยเม็ด อบเชย พร้อมเห็ดนางรมหลวงหั่นหนาและถั่วงอกสดกรอบ อิ่มโปรตีนแน่นไร้แป้ง',
    baseServings: 2,
    macros: {
      calories: 340,
      protein: 42,
      carbs: 10,
      fat: 14,
      fiber: 4,
      sodium: 510
    },
    ingredients: [
      { name: 'เนื้อวัวน่องลายตุ๋นเปื่อย', amount: 280, unit: 'กรัม', category: 'meat' },
      { name: 'เห็ดนางรมหลวงหั่นแว่น', amount: 120, unit: 'กรัม', category: 'produce' },
      { name: 'น้ำซุปกระดูกเนื้อตุ๋นยาจีนใส', amount: 600, unit: 'มล.', category: 'seasoning' },
      { name: 'ถั่วงอกสดและผักบุ้งลวก', amount: 100, unit: 'กรัม', category: 'produce' },
      { name: 'ซีอิ๊วขาวลดโซเดียมสูตรเห็ดหอม', amount: 2, unit: 'ช้อนโต๊ะ', category: 'seasoning' },
      { name: 'กระเทียมเจียวน้ำมันรำข้าว', amount: 1, unit: 'ช้อนชา', category: 'seasoning' },
      { name: 'ขึ้นฉ่ายซอยและต้นหอมผักชี', amount: 2, unit: 'ช้อนโต๊ะ', category: 'produce' },
      { name: 'พริกไทยดำป่น', amount: 0.5, unit: 'ช้อนชา', category: 'seasoning' }
    ],
    steps: [
      {
        step: 1,
        title: 'ต้มน้ำซุปและเห็ดนางรมหลวง',
        text: 'ตั้งหม้อต้มน้ำซุปกระดูกเนื้อเคี่ยวสมุนไพรให้เดือดพล่าน ใส่เห็ดนางรมหลวงหั่นแว่นลงต้ม 3-4 นาทีจนเห็ดสุกนุ่ม ซึมซับรสหวานของน้ำซุป',
        timerSeconds: 240,
        tip: 'เห็ดนางรมหลวงมีความหนึบคล้ายเนื้อสัตว์ เพิ่มสัมผัสเคี้ยวที่สนุก'
      },
      {
        step: 2,
        title: 'ใส่เนื้อวัวตุ๋นเปื่อย',
        text: 'ใส่เนื้อวัวน่องลายที่ตุ๋นเปื่อยแล้วลงไปในหม้อ ปรุงรสด้วยซีอิ๊วขาวสูตรเห็ดหอม เคี่ยวต่อ 2 นาทีให้เนื้อดูดน้ำซุปหอมหวาน',
        timerSeconds: 120,
        tip: 'เนื้อน่องลายมีเอ็นแทรกละเอียด ตุ๋นจนนุ่มละลายในปากแต่ไม่เลี่ยน'
      },
      {
        step: 3,
        title: 'ลวกผักและตักเสิร์ฟ',
        text: 'ลวกถั่วงอกและผักบุ้งใส่ก้นชาม ตักเนื้อตุ๋น เห็ด และน้ำซุปร้อนๆ ราดลงไป โรยขึ้นฉ่าย ต้นหอม พริกไทยดำ และกระเทียมเจียว เสิร์ฟร้อนๆ',
        timerSeconds: 60,
        tip: 'สามารถปรุงพริกป่นน้ำส้มสายชูพริกดองเพิ่มความแซ่บคลีนได้ตามใจชอบ'
      }
    ]
  }
];

// Available Pantry Ingredients for Fridge Filter
const PANTRY_ITEMS = [
  { id: 'pantry-chicken', name: 'อกไก่ / เนื้อไก่', icon: '🍗', category: 'meat', keywords: ['อกไก่', 'เนื้อไก่', 'ไก่'] },
  { id: 'pantry-salmon', name: 'แซลมอน / ปลา', icon: '🐟', category: 'meat', keywords: ['แซลมอน', 'ปลา'] },
  { id: 'pantry-shrimp', name: 'กุ้งสด', icon: '🦐', category: 'meat', keywords: ['กุ้ง'] },
  { id: 'pantry-beef', name: 'เนื้อวัว', icon: '🥩', category: 'meat', keywords: ['เนื้อวัว', 'วัว', 'beef'] },
  { id: 'pantry-egg', name: 'ไข่ไก่', icon: '🥚', category: 'meat', keywords: ['ไข่ไก่', 'ไข่ออนเซ็น', 'ไข่'] },
  { id: 'pantry-tofu', name: 'เต้าหู้', icon: '🧈', category: 'meat', keywords: ['เต้าหู้'] },
  { id: 'pantry-avocado', name: 'อะโวคาโด', icon: '🥑', category: 'produce', keywords: ['อะโวคาโด'] },
  { id: 'pantry-tomato', name: 'มะเขือเทศ', icon: '🍅', category: 'produce', keywords: ['มะเขือเทศ'] },
  { id: 'pantry-mushroom', name: 'เห็ดต่างๆ', icon: '🍄', category: 'produce', keywords: ['เห็ด'] },
  { id: 'pantry-cucumber', name: 'แตงกวา', icon: '🥒', category: 'produce', keywords: ['แตงกวา'] },
  { id: 'pantry-salad', name: 'ผักสลัด / ผักใบเขียว', icon: '🥬', category: 'produce', keywords: ['ผักสลัด', 'ร็อกเก็ต', 'ผักโขม', 'ขึ้นฉ่าย', 'ผักบุ้ง'] },
  { id: 'pantry-basil', name: 'ใบกะเพรา / โหระพา', icon: '🌿', category: 'produce', keywords: ['กะเพรา', 'โหระพา'] },
  { id: 'pantry-rice', name: 'ข้าวกล้อง / ข้าวไรซ์เบอร์รี่', icon: '🍚', category: 'grains', keywords: ['ข้าว', 'ควินัว'] },
  { id: 'pantry-bread', name: 'ขนมปัง / ซาวเออร์โดว์', icon: '🍞', category: 'grains', keywords: ['ขนมปัง', 'ซาวเออร์โดว์', 'โทสต์'] },
  { id: 'pantry-yogurt', name: 'กรีกโยเกิร์ต', icon: '🥛', category: 'meat', keywords: ['โยเกิร์ต', 'yogurt'] },
  { id: 'pantry-berries', name: 'เบอร์รี่ / ผลไม้สด', icon: '🍓', category: 'produce', keywords: ['สตรอว์เบอร์', 'บลูเบอร์', 'ราสเบอร์', 'เบอร์รี่สด', 'มิกซ์เบอร์รี่', 'อาซาอิ', 'กล้วย', 'กีวี่', 'แตงโม', 'องุ่น', 'เกรปฟรุต', 'แก้วมังกร', 'เชอร์รี่สด'] }
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
