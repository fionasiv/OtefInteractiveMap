export type EventType = "Military Base" | "Civilian Community" | "Battle" | "Memorial" | "Event Site" | "Rescue Forces" | "Shelter" | "Command Post";

export interface TimelineEvent {
  time: string;
  description: string;
}

export interface LocationData {
  id: string;
  locationName: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  eventType: EventType;
  title: string;
  description: string;
  leadershipFocus: string;
  unitInfo: string;
  mediaAssets: {
    type: "image" | "video";
    url: string;
    caption?: string;
  }[];
  timeline?: TimelineEvent[];
  primaryVideoUrl?: string;
  lessonsLearned: string;
}

export const locations: LocationData[] = [
  {
    "id": "yellow-container",
    "locationName": "מכולת האשפה הצהובה",
    "coordinates": { "lat": 31.39855, "lng": 34.470739 },
    "eventType": "Civilian Community",
    "title": "הישרדות בצל התופת: מכולת האשפה",
    "unitInfo": "מבלי פסטיבל הנובה, כוחות משטרה (ימ\"ס)",
    "description": "במשך ארבע שעות, הסתתרו 17 מבלים ומבלות בתוך מכולת אשפה צהובה. הם ניסו לקרוא לחילוץ בכל דרך אפשרית, כשהם מתכסים בשקיות זבל ושומעים את זוועות הטבח מסביבם. בשעה 11:47, הם התגלו על ידי מחבל שנכנס למכולה וירה לכל עבר, אירוע בו תשעה נרצחו וארבעה נפצעו.",
    "leadershipFocus": "קבלת החלטות בתנאי קיצון: אזרחים הנדרשים לתושייה ולרעות הדדית בסביבה של חוסר ודאות מוחלט, תוך ניסיון לשרוד ולהגן אחד על השני.",
    timeline: [
      { "time": "06:29", "description": "תחילת ירי רקטות נרחב; מאבטחי המסיבה קוראים ל-3,500 המבלים להתפזר[cite: 5, 6, 7]." },
      { "time": "06:55", "description": "דיווחים ראשונים על ירי בכביש 232; המוני מבלים מנסים להימלט דרך הכביש היחיד שמוביל החוצה ונתקלים במארבי מחבלים[cite: 9, 10, 11]." },
      { "time": "08:00", "description": "הגעה ראשונה של כוח מיחידת המסתערבים, ולאחריו יחידות משטרה נוספות[cite: 12]." },
      { "time": "08:30", "description": "מחבלים מגיעים לצומת הכניסה ויורים על כוחות משטרה; מבלים מסתתרים במכולות האשפה[cite: 13, 14, 15]." },
      { "time": "11:47", "description": "מחבל מגלה את המסתתרים במכולה ויורה בהם[cite: 4]." }
    ],
    "primaryVideoUrl": "https://www.youtube.com/watch?v=y4rcNxAkXZw",
    "mediaAssets": [],
    "lessonsLearned": "חשיבות הפעולה המהירה וחתירה למגע של כוחות הביטחון כדי להגן על ריכוזי אזרחים הנמצאים תחת מתקפה."
  },
  {
    "id": "the-ambulance",
    "locationName": "סיפור האמבולנס",
    "coordinates": { "lat": 31.39855, "lng": 34.470739 },
    "eventType": "Rescue Forces",
    "title": "גבורת המחלצים ואובדן באמבולנס",
    "unitInfo": "צוותי רפואה, אזרחים, לוחמי סיירת גבעתי, יחצ\"א וזק\"א",
    "description": "בסביבות 20 מבלים ניסו להסתתר בתוך אמבולנס ומתחתיו. המחבלים ירו לעברם וזרקו רימונים שהדפו חלק מהמבלים החוצה. לאחר מכן, ירו המחבלים טיל RPG שפגע במנוע והעלה את הרכב באש; 18 בני אדם נרצחו בתוכו ובסביבתו. מאוחר יותר, כוחות חילוץ של פיקוד העורף וזק\"א פעלו תחת אש באזור זה לפינוי וזיהוי.",
    "leadershipFocus": "חתירה למגע למען הצלת חיים: לוחמים, כדוגמת אלישע ליבמן מסיירת גבעתי, שהוקפצו והגיעו לשטח לחפש את יקיריהם ולהילחם בתוך חוסר הוודאות, ולצדם כוחות זיהוי חללים שפעלו באומץ תוך כדי לחימה.",
    "timeline": [
      { "time": "09:20", "description": "מחבלים מתקרבים לאמבולנס, משליכים רימונים ויורים RPG, מה שגורם לאמבולנס לעלות באש." },
      { "time": "09:27", "description": "אביה של שני גבאי ז\"ל מגיע לחפש אותה, מבחין באמבולנס הבוער אך ממשיך בחיפושיו לחפ\"ק." },
      { "time": "12:00", "description": "אלישע ליבמן, לוחם שקפץ מביתו, מגיע עם סמח\"ט גבעתי לחפש את אחיו אליקים ז\"ל, בטרם יעבור ללחימה בכפר עזה." },
      { "time": "21:00", "description": "יחצ\"א וזק\"א סורקים את השטח ומפנים חללים תחת תנאי לחימה קשים שמקשים על הזיהוי." }
    ],
    "mediaAssets": [],
    "lessonsLearned": "רוח הלחימה ודבקות במשימה של כוחות רפואה והצלה; ההכרח המבצעי בסריקה ופינוי חללים גם תחת תנאי לחימה מורכבים."
  },
  {
    "id": "small-bar",
    "locationName": "הבר הקטן במתחם מסיבת המאשרום",
    "coordinates": { "lat": 31.398972, "lng": 34.470031 },
    "eventType": "Civilian Community",
    "title": "מוקד המילוט - הבר הקטן",
    "unitInfo": "מבלים במתחם הנובה",
    "description": "אחד ממוקדי ההתרחשות המרכזיים במתחם 'המאשרום', שם התרכזו מבלים רבים עם תחילת המתקפה בניסיון למצוא מחסה.",
    "leadershipFocus": "הבנת זירת האירוע המורכבת בה אזרחים משתמשים בתשתיות ארעיות למחסה.",
    "timeline": [],
    "primaryVideoUrl": "https://youtu.be/BVZLDdPVk50?si=bJKoDLtzRZbXcVqy",
    "mediaAssets": [],
    "lessonsLearned": "הצורך בסריקה מבצעית מדוקדקת של מבנים ארעיים בזירת לחימה חקלאית/אזרחית."
  },
  {
    "id": "police-cp",
    "locationName": "חפ\"ק המשטרה",
    "coordinates": { "lat": 31.397944, "lng": 34.470616 },
    "eventType": "Command Post",
    "title": "קרב ההשהיה של משטרת ישראל",
    "unitInfo": "משטרת ישראל, צוותי רפואה במרפאה",
    "description": "מתחם הפיקוד של המשטרה שהפך לנקודת ריכוז והגנה. במקום מוצג קיר הנצחה ל-20 שוטרים ושוטרות שנהרגו בקרב, כולל צוותי רפואה וטיפול (כמו לירון ברדה וליעם בור) שנרצחו בעת טיפול בפצועים במרפאה.",
    "leadershipFocus": "אחריות המפקד בחזית: שוטרים וצוותי רפואה שניהלו קרב בלימה מול כוחות עדיפים, והקריבו את חייהם כדי לתת זמן לאזרחים להימלט.",
    "timeline": [],
    "mediaAssets": [],
    "lessonsLearned": "עמידה במשימה וגבורה עילאית של כוחות שיטור ורפואה שהיוו את קו ההגנה הראשון; חשיבות החפ\"ק כמוקד לניהול שליטה בשעת חירום."
  },
  {
    "id": "the-shelter",
    "locationName": "החורש (המיגונית)",
    "coordinates": { "lat": 31.399038, "lng": 34.468945 },
    "eventType": "Shelter",
    "title": "המחסה בחורש ובמיגונית",
    "unitInfo": "מבלים במנוסה",
    "description": "אזור החורש והמיגונית הסמוכה, אשר שימשו כנקודת מחסה וניסיון מילוט עבור אזרחים רבים תחת האש.",
    "leadershipFocus": "התמודדות עם חוסר ודאות וקבלת החלטות מהירות של אזרחים תחת אש חיה בשטח פתוח.",
    "timeline": [],
    "mediaAssets": [],
    "lessonsLearned": "חשיבות הכרת השטח ואפשרויות החילוץ מתוך מבני תשתית אזרחיים פריפריאליים תחת התקפה."
  },
  {
    "id": "anemones-memorial",
    "locationName": "כלניות לפני הגשם",
    "coordinates": { "lat": 31.397778, "lng": 34.470001 },
    "eventType": "Memorial",
    "title": "מיצג הזיכרון: כלניות לפני הגשם",
    "unitInfo": "אומני ישראל, משפחות שכולות",
    "description": "מתחם הנצחה מרגש הכולל אלפי כלניות אדומות מחרס, המונחות בצורת מגן דוד. היצירה הוכנה על ידי אומנים מרחבי הארץ כדימוי לפריחת הכלניות החורפית ביער רעים, וכמשל אלגורי לחיים שנגדעו בטרם עת.",
    "leadershipFocus": "רוח צה\"ל והחברה הישראלית: חשיבות ההנצחה והזיכרון כחלק מבניית החוסן הלאומי והמבצעי.",
    "timeline": [],
    "primaryVideoUrl": "https://youtu.be/Uoi-1nZX7P8?si=gZRZXMIQKrDN_YXK",
    "mediaAssets": [],
    "lessonsLearned": "הזיכרון כמנוע לעשייה ולמחויבות ערכית של כל קצין ולוחם בצה\"ל; החיבור העמוק בין צבא ההגנה לישראל לבין העם והאדמה."
  },
  {
    "id": "bathroom-stalls",
    "locationName": "הבנות שהתחבאו בתא שירותים",
    "coordinates": { "lat": 31.39855, "lng": 34.470739 },
    "eventType": "Civilian Community",
    "title": "הסתתרות בתאי השירותים",
    "unitInfo": "מבלות",
    "description": "מוקד בו ניסו מבלות להסתתר בתוך תאי השירותים במתחם מפני המחבלים.",
    "leadershipFocus": "הבנת האינסטינקט האזרחי להישרדות במקומות מסתור מאולתרים.",
    "timeline": [],
    "primaryVideoUrl": "https://www.youtube.com/watch?v=liToR4QqkhQ",
    "mediaAssets": [],
    "lessonsLearned": "המורכבות בטיהור שטחים רוויי אזרחים הנמצאים במקומות מסתור קטנים."
  },
  {
    "id": "main-stage",
    "locationName": "הבמה המרכזית של פסטיבל נובה",
    "coordinates": { "lat": 31.397889, "lng": 34.469658 },
    "eventType": "Event Site",
    "title": "רחבת הריקודים והבמה המרכזית",
    "unitInfo": "מארגני המסיבה, מבלים",
    "description": "הבמה המרכזית של פסטיבל הנובה, משם הוכרז על סיום המסיבה בעקבות המטחים והחלה מנוסת ההמונים.",
    "leadershipFocus": "שליטה וניהול קהל בשעת חירום – הפעולה הראשונית של מארגני האירוע בכיבוי המוזיקה ופתיחת שערי החירום.",
    "timeline": [],
    "primaryVideoUrl": "https://youtu.be/YMlweP86kC4?si=o7zkc3oP-CrAcQ1S",
    "mediaAssets": [],
    "lessonsLearned": "תפקוד בעת מעבר פתאומי משגרה לחירום."
  }
]
