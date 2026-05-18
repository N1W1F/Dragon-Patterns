// ============================================
// 🐉 DRAGON PATTERNS DATA - Part 1
// Singleton, Prototype, Builder, Factory, Adapter
// ============================================

const PATTERNS_DATA = {

  // ============ 1. SINGLETON ============
  singleton: {
    id: 'singleton',
    name: 'Singleton',
    nameAr: 'التنين الأوحد',
    icon: '🐲',
    category: 'Creational',
    categoryAr: 'إنشائي',
    color: 'var(--p-singleton)',
    tagline: 'تنين واحد فقط يحكم المملكة',
    shortDesc: 'يضمن وجود instance واحد فقط من الكلاس في البرنامج كله',

    intro: `<strong>Singleton</strong> يضمن أن الكلاس فيه <strong>instance واحد فقط</strong> عبر البرنامج كله، ويعطيك نقطة وصول عامة له (global access point).
    <br><br>
    <strong>متى تستخدمه؟</strong> لما تحتاج كائن واحد مشترك بين كل أجزاء البرنامج: مثل اتصال قاعدة بيانات، Logger، إعدادات التطبيق.
    <br><br>
    <strong>الأركان الثلاثة (احفظها):</strong>
    <ol style="margin-right: 1.5rem; margin-top: 0.5rem;">
      <li><code>private static</code> field يحفظ النسخة الوحيدة</li>
      <li><code>private constructor</code> يمنع أي أحد يسوي <code>new</code></li>
      <li><code>public static getInstance()</code> الطريقة الوحيدة للوصول</li>
    </ol>`,

    classes: [
      {
        name: 'DBConnection',
        role: 'Singleton Class',
        roleAr: 'الكلاس الوحيد - يحتوي على كل المنطق',
        desc: 'هذا الكلاس هو نفسه الـ Singleton. يحفظ نسخته الوحيدة بنفسه ويتحكم في إنشائها.',
        methods: [
          {
            name: 'private static DBConnection uniqueInstance',
            purpose: 'حقل ساكن (static) يحفظ النسخة الوحيدة من الكلاس. لما يكون static يصبح مشترك بين كل الكلاس مو لكل object. ولما يكون private، ما أحد يقدر يعدله من برّا.',
            code: 'private static DBConnection uniqueInstance;'
          },
          {
            name: 'private DBConnection()',
            purpose: 'الـ constructor خاص (private)! هذي أهم نقطة. السبب: لو خليناه public، أي أحد يقدر يسوي new DBConnection() ويكسر فكرة الـ Singleton. لما يكون private، الكلاس نفسه فقط يقدر ينشئ النسخ.',
            code: 'private DBConnection() {\n    // initialization code\n}'
          },
          {
            name: 'public static DBConnection getInstance()',
            purpose: 'الطريقة الوحيدة للحصول على النسخة. أول مرة تسوي check إذا uniqueInstance == null، تنشئها. كل المرات اللي بعدها ترجع نفس النسخة. هذا اللي يضمن إن في نسخة وحدة فقط.',
            code: 'public static DBConnection getInstance() {\n    if (uniqueInstance == null) {\n        uniqueInstance = new DBConnection();\n    }\n    return uniqueInstance;\n}'
          }
        ],
        fullCode: `package singletonExample;

public class DBConnection {
    private static DBConnection uniqueInstance;
    
    private int portNumber;
    private String hostName;

    private DBConnection() { }

    public static DBConnection getInstance() {
        if (uniqueInstance == null) {
            uniqueInstance = new DBConnection();
        }
        return uniqueInstance;
    }
}`
      },
      {
        name: 'Main',
        role: 'Client',
        roleAr: 'المستخدم - يثبت إن النسخة وحيدة',
        desc: 'الكلاس اللي يستخدم الـ Singleton ويثبت أن أي طلب جديد يرجع نفس النسخة.',
        methods: [
          {
            name: 'main()',
            purpose: 'ينشئ مرتين instance ويقارنهم بـ ==. لو == ترجع true يعني نفس الـ object في الذاكرة (نجح الـ Singleton). لاحظ: ما نستخدم new، بل getInstance().',
            code: 'DBConnection i1 = DBConnection.getInstance();\nDBConnection i2 = DBConnection.getInstance();\nif (i1 == i2) {\n    System.out.println("ONE single instance...");\n}'
          }
        ],
        fullCode: `package singletonExample;

public class Main {
    public static void main(String[] args) {
        DBConnection instance1 = DBConnection.getInstance();
        DBConnection instance2 = DBConnection.getInstance();
        if (instance1 == instance2) {
            System.out.println("ONE single instance of the class was created.");
        } else {
            System.err.println("Error: Multiple instances were created!");
        }
    }
}`
      }
    ],

    levels: [
      {
        id: 1,
        name: 'Hatchling',
        nameAr: 'بيضة التنين',
        icon: '🥚',
        stars: '⭐',
        task: 'أكمل الفراغات في كلاس Singleton (Logger). الأجزاء الأساسية موجودة، بس تحتاج تكمل 3 فراغات.',
        files: [
          {
            name: 'Logger.java',
            status: 'todo',
            starter: `public class Logger {
    private static Logger uniqueInstance;

    private Logger() { }

    public static Logger ___FILL_1___() {
        if (uniqueInstance == ___FILL_2___) {
            uniqueInstance = new Logger();
        }
        return ___FILL_3___;
    }

    public void log(String msg) {
        System.out.println("[LOG]: " + msg);
    }
}`,
            solution: `public class Logger {
    private static Logger uniqueInstance;

    private Logger() { }

    public static Logger getInstance() {
        if (uniqueInstance == null) {
            uniqueInstance = new Logger();
        }
        return uniqueInstance;
    }

    public void log(String msg) {
        System.out.println("[LOG]: " + msg);
    }
}`,
            checks: [
              { type: 'contains', value: 'getInstance', msg: 'لازم يكون اسم الـ method "getInstance"' },
              { type: 'contains', value: '== null', msg: 'لازم تقارن uniqueInstance بـ null' },
              { type: 'contains', value: 'return uniqueInstance', msg: 'لازم ترجع uniqueInstance' }
            ]
          }
        ]
      },
      {
        id: 2,
        name: 'Fledgling',
        nameAr: 'تنين ناشئ',
        icon: '🐉',
        stars: '⭐⭐',
        task: 'أكمل كلاس Singleton للـ AppSettings. أعطيناك الـ field فقط، تحتاج تكمل: الـ constructor + getInstance + استدعاؤها في Main.',
        files: [
          {
            name: 'AppSettings.java',
            status: 'todo',
            starter: `public class AppSettings {
    private static AppSettings uniqueInstance;
    private String theme = "dark";

    // TODO: أكمل الـ constructor الخاص

    // TODO: أكمل method getInstance()

    public String getTheme() { return theme; }
    public void setTheme(String t) { this.theme = t; }
}`,
            solution: `public class AppSettings {
    private static AppSettings uniqueInstance;
    private String theme = "dark";

    private AppSettings() { }

    public static AppSettings getInstance() {
        if (uniqueInstance == null) {
            uniqueInstance = new AppSettings();
        }
        return uniqueInstance;
    }

    public String getTheme() { return theme; }
    public void setTheme(String t) { this.theme = t; }
}`,
            checks: [
              { type: 'regex', value: 'private\\s+AppSettings\\s*\\(\\s*\\)', msg: 'لازم يكون فيه private constructor' },
              { type: 'regex', value: 'public\\s+static\\s+AppSettings\\s+getInstance', msg: 'لازم تكون getInstance: public static' },
              { type: 'contains', value: 'uniqueInstance == null', msg: 'لازم تفحص null' },
              { type: 'contains', value: 'new AppSettings()', msg: 'لازم تنشئ instance جديد' }
            ]
          },
          {
            name: 'Main.java',
            status: 'todo',
            starter: `public class Main {
    public static void main(String[] args) {
        // TODO: احصل على نسختين من AppSettings وقارنهم
    }
}`,
            solution: `public class Main {
    public static void main(String[] args) {
        AppSettings s1 = AppSettings.getInstance();
        AppSettings s2 = AppSettings.getInstance();
        if (s1 == s2) {
            System.out.println("Same instance!");
        }
    }
}`,
            checks: [
              { type: 'contains', value: 'AppSettings.getInstance()', msg: 'لازم تستدعي AppSettings.getInstance()' },
              { type: 'regex', value: 's1\\s*==\\s*s2|getInstance\\(\\)\\s*==\\s*AppSettings', msg: 'لازم تقارن نسختين بـ ==' }
            ]
          }
        ]
      },
      {
        id: 3,
        name: 'Wyvern',
        nameAr: 'تنين الذهب',
        icon: '🔥',
        stars: '⭐⭐⭐',
        task: 'اكتب كلاس Singleton كامل من الصفر: ConfigManager فيه field "appName" + getter/setter + getInstance().',
        files: [
          {
            name: 'ConfigManager.java',
            status: 'todo',
            starter: `public class ConfigManager {
    // TODO: اكتب الكلاس كامل
    // المطلوب: Singleton فيه appName (String) + getter/setter + getInstance
}`,
            solution: `public class ConfigManager {
    private static ConfigManager uniqueInstance;
    private String appName;

    private ConfigManager() { }

    public static ConfigManager getInstance() {
        if (uniqueInstance == null) {
            uniqueInstance = new ConfigManager();
        }
        return uniqueInstance;
    }

    public String getAppName() { return appName; }
    public void setAppName(String name) { this.appName = name; }
}`,
            checks: [
              { type: 'regex', value: 'private\\s+static\\s+ConfigManager', msg: 'لازم private static field من نوع ConfigManager' },
              { type: 'regex', value: 'private\\s+ConfigManager\\s*\\(\\s*\\)', msg: 'لازم private constructor' },
              { type: 'regex', value: 'public\\s+static\\s+ConfigManager\\s+getInstance', msg: 'لازم public static getInstance()' },
              { type: 'contains', value: 'appName', msg: 'لازم يكون فيه field appName' },
              { type: 'regex', value: 'getAppName|getappname', msg: 'لازم getter للـ appName', flags: 'i' },
              { type: 'regex', value: 'setAppName|setappname', msg: 'لازم setter للـ appName', flags: 'i' }
            ]
          }
        ]
      },
      {
        id: 4,
        name: 'Ancient',
        nameAr: 'التنين الأسطوري',
        icon: '👑',
        stars: '⭐⭐⭐⭐',
        task: 'سيناريو اختبار حقيقي: عندك تطبيق ينشئ ThreadPool مرتين، وهذا يهدر الموارد. حوّل MyThreadPool إلى Singleton، وعدّل الـ Main بحيث يستخدم getInstance() بدل new.',
        files: [
          {
            name: 'MyThreadPool.java',
            status: 'todo',
            starter: `public class MyThreadPool {
    private ExecutorService executorService;
    private final int THREAD_POOL_SIZE = 5;

    public MyThreadPool() {
        this.executorService = Executors.newFixedThreadPool(THREAD_POOL_SIZE);
    }

    public ExecutorService getThreadPoolExecutor() {
        return this.executorService;
    }
}`,
            solution: `public class MyThreadPool {
    private static MyThreadPool uniqueInstance;
    private ExecutorService executorService;
    private final int THREAD_POOL_SIZE = 5;

    private MyThreadPool() {
        this.executorService = Executors.newFixedThreadPool(THREAD_POOL_SIZE);
    }

    public static MyThreadPool getInstance() {
        if (uniqueInstance == null) {
            uniqueInstance = new MyThreadPool();
        }
        return uniqueInstance;
    }

    public ExecutorService getThreadPoolExecutor() {
        return this.executorService;
    }
}`,
            checks: [
              { type: 'regex', value: 'private\\s+static\\s+MyThreadPool', msg: 'لازم private static field' },
              { type: 'regex', value: 'private\\s+MyThreadPool\\s*\\(\\s*\\)', msg: 'الـ constructor لازم يكون private' },
              { type: 'regex', value: 'public\\s+static\\s+MyThreadPool\\s+getInstance', msg: 'لازم public static getInstance()' },
              { type: 'contains', value: 'uniqueInstance == null', msg: 'check للـ null في getInstance' }
            ]
          },
          {
            name: 'App.java',
            status: 'todo',
            starter: `public class App {
    public static void main(String[] args) {
        // TODO: استخدم getInstance() بدل new
        MyThreadPool pool1 = ???;
        MyThreadPool pool2 = ???;
        // submitSomeTasks(pool1, ...);
        // submitSomeTasks(pool2, ...);
    }
}`,
            solution: `public class App {
    public static void main(String[] args) {
        MyThreadPool pool1 = MyThreadPool.getInstance();
        MyThreadPool pool2 = MyThreadPool.getInstance();
        // submitSomeTasks(pool1, ...);
        // submitSomeTasks(pool2, ...);
    }
}`,
            checks: [
              { type: 'contains', value: 'MyThreadPool.getInstance()', msg: 'لازم تستخدم getInstance() بدل new' },
              { type: 'not_contains', value: 'new MyThreadPool', msg: '⚠️ ما تستخدم new MyThreadPool() - استخدم getInstance() فقط' }
            ]
          }
        ]
      }
    ]
  },

  // ============ 2. PROTOTYPE ============
  prototype: {
    id: 'prototype',
    name: 'Prototype',
    nameAr: 'تنين المرايا',
    icon: '🪞',
    category: 'Creational',
    categoryAr: 'إنشائي',
    color: 'var(--p-prototype)',
    tagline: 'انسخ النسخة بدل بنائها من الصفر',
    shortDesc: 'يسمح بنسخ كائنات موجودة دون الحاجة لمعرفة الكلاس الفعلي',

    intro: `<strong>Prototype</strong> يخليك تنسخ كائن (clone) بدل ما تبنيه من الصفر. مفيد لما يكون البناء غالي أو معقد.
    <br><br>
    <strong>الأركان:</strong>
    <ol style="margin-right: 1.5rem; margin-top: 0.5rem;">
      <li><code>abstract clone()</code> method في الكلاس الأساسي</li>
      <li><strong>Copy constructor</strong> في كل subclass يأخذ <code>target</code> من نفس النوع</li>
      <li>كل subclass ينفذ <code>clone()</code> بإرجاع <code>new ClassName(this)</code></li>
      <li>(اختياري) Cache class يخزن prototypes جاهزة</li>
    </ol>`,

    classes: [
      {
        name: 'Vehicle (abstract)',
        role: 'Prototype Base',
        roleAr: 'الكلاس الأساسي - يعرّف clone()',
        desc: 'الكلاس الأب اللي كل المركبات تورث منه. يعرّف clone() كـ abstract.',
        methods: [
          {
            name: 'public Vehicle(String make, String model, int year)',
            purpose: 'الـ constructor العادي - يستخدم لإنشاء مركبة جديدة من الصفر بقيم معطاة.',
            code: 'public Vehicle(String make, String model, int year) {\n    this.make = make;\n    this.model = model;\n    this.year = year;\n}'
          },
          {
            name: 'public abstract Vehicle clone()',
            purpose: 'الـ method الأساسية في Prototype! abstract لأن كل subclass لازم ينفذها بطريقته. كل clone يرجع نسخة من نفس النوع.',
            code: '@Override\npublic abstract Vehicle clone();'
          }
        ],
        fullCode: `public abstract class Vehicle {
    private String make;
    private String model;
    private int year;

    public Vehicle(String make, String model, int year) {
        this.make = make;
        this.model = model;
        this.year = year;
    }

    @Override
    public abstract Vehicle clone();

    public String getMake() { return make; }
    public String getModel() { return model; }
    public int getYear() { return year; }
}`
      },
      {
        name: 'Car',
        role: 'Concrete Prototype',
        roleAr: 'نوع مركبة - ينفذ clone()',
        desc: 'كلاس فعلي يورث Vehicle. لازم يكون فيه: copy constructor + clone() method.',
        methods: [
          {
            name: 'public Car(Car target)',
            purpose: '⭐⭐⭐ الـ COPY CONSTRUCTOR - الجوهرة الذهبية في Prototype. يأخذ Car آخر وينسخ كل قيمه. لاحظ super(target.getMake()...) لازم تستدعي copy constructor الأب أو تنسخ كل properties.',
            code: 'public Car(Car target) {\n    super(target.getMake(), target.getModel(), target.getYear());\n    this.seatingCapacity = target.getSeatingCapacity();\n}'
          },
          {
            name: 'public Vehicle clone()',
            purpose: 'ينفذ clone() عبر استدعاء الـ copy constructor مع this. لاحظ: this تشير للـ Car الحالي اللي بيتنسخ.',
            code: '@Override\npublic Vehicle clone() {\n    return new Car(this);\n}'
          }
        ],
        fullCode: `public class Car extends Vehicle {
    private int seatingCapacity;

    public Car(Car target) {
        super(target.getMake(), target.getModel(), target.getYear());
        this.seatingCapacity = target.getSeatingCapacity();
    }

    public Car(String make, String model, int year, int seatingCapacity) {
        super(make, model, year);
        this.seatingCapacity = seatingCapacity;
    }

    @Override
    public Vehicle clone() {
        return new Car(this);
    }

    public int getSeatingCapacity() { return seatingCapacity; }
}`
      },
      {
        name: 'VehicleCache',
        role: 'Prototype Registry',
        roleAr: 'مخزن النماذج الجاهزة',
        desc: 'يخزن prototypes جاهزة في HashMap. لما تحتاج مركبة، يرجع لك نسخة (clone) منها بدل الأصل.',
        methods: [
          {
            name: 'public VehicleCache()',
            purpose: 'الـ constructor يبني مجموعة prototypes جاهزة ويخزنها في الـ HashMap.',
            code: 'public VehicleCache() {\n    Car car = new Car("Honda", "Accord", 2020, 5);\n    cache.put("2020HondaAccord", car);\n}'
          },
          {
            name: 'public Vehicle get(String key)',
            purpose: '⭐ النقطة المهمة: يرجع cache.get(key).clone() مو cache.get(key)! لأننا ما نبي نعطي الأصل، نبي نسخة منه.',
            code: 'public Vehicle get(String key) {\n    return cache.get(key).clone();\n}'
          }
        ],
        fullCode: `import java.util.HashMap;
import java.util.Map;

public class VehicleCache {
    private Map<String, Vehicle> cache = new HashMap<>();

    public VehicleCache() {
        Car car = new Car("Honda", "Accord", 2020, 5);
        cache.put("2020HondaAccord", car);
    }

    public Vehicle get(String key) {
        return cache.get(key).clone();
    }
}`
      }
    ],

    levels: [
      {
        id: 1,
        name: 'Hatchling',
        nameAr: 'بيضة التنين',
        icon: '🥚',
        stars: '⭐',
        task: 'أكمل الفراغات في Circle.java لينفذ Prototype.',
        files: [
          {
            name: 'Circle.java',
            status: 'todo',
            starter: `public class Circle extends Shape {
    private int radius;

    public Circle(Circle target) {
        super(target.getColor());
        this.radius = ___FILL_1___.radius;
    }

    public Circle(String color, int radius) {
        super(color);
        this.radius = radius;
    }

    @Override
    public Shape clone() {
        return new ___FILL_2___(___FILL_3___);
    }
}`,
            solution: `public class Circle extends Shape {
    private int radius;

    public Circle(Circle target) {
        super(target.getColor());
        this.radius = target.radius;
    }

    public Circle(String color, int radius) {
        super(color);
        this.radius = radius;
    }

    @Override
    public Shape clone() {
        return new Circle(this);
    }
}`,
            checks: [
              { type: 'contains', value: 'target.radius', msg: 'لازم تنسخ من target.radius' },
              { type: 'contains', value: 'new Circle(this)', msg: 'clone() لازم يرجع new Circle(this)' }
            ]
          }
        ]
      },
      {
        id: 2,
        name: 'Fledgling',
        nameAr: 'تنين ناشئ',
        icon: '🐉',
        stars: '⭐⭐',
        task: 'أكمل Rectangle ليتبع Prototype. تحتاج: copy constructor + clone() method.',
        files: [
          {
            name: 'Shape.java',
            status: 'ok',
            readonly: true,
            starter: `public abstract class Shape {
    private String color;
    public Shape(String color) { this.color = color; }
    public String getColor() { return color; }
    public abstract Shape clone();
}`
          },
          {
            name: 'Rectangle.java',
            status: 'todo',
            starter: `public class Rectangle extends Shape {
    private int width;
    private int height;

    // TODO: أضف copy constructor

    public Rectangle(String color, int width, int height) {
        super(color);
        this.width = width;
        this.height = height;
    }

    // TODO: أضف clone() method
}`,
            solution: `public class Rectangle extends Shape {
    private int width;
    private int height;

    public Rectangle(Rectangle target) {
        super(target.getColor());
        this.width = target.width;
        this.height = target.height;
    }

    public Rectangle(String color, int width, int height) {
        super(color);
        this.width = width;
        this.height = height;
    }

    @Override
    public Shape clone() {
        return new Rectangle(this);
    }
}`,
            checks: [
              { type: 'regex', value: 'public\\s+Rectangle\\s*\\(\\s*Rectangle\\s+\\w+\\s*\\)', msg: 'لازم copy constructor: Rectangle(Rectangle target)' },
              { type: 'contains', value: 'super(', msg: 'لازم تستدعي super في copy constructor' },
              { type: 'contains', value: 'new Rectangle(this)', msg: 'clone() لازم يرجع new Rectangle(this)' }
            ]
          }
        ]
      },
      {
        id: 3,
        name: 'Wyvern',
        nameAr: 'تنين الذهب',
        icon: '🔥',
        stars: '⭐⭐⭐',
        task: 'اكتب Document (abstract) + Report (concrete) كاملين بنمط Prototype.',
        files: [
          {
            name: 'Document.java',
            status: 'todo',
            starter: `// TODO: abstract class Document فيه title (String) + getter + clone() abstract`,
            solution: `public abstract class Document {
    private String title;

    public Document(String title) {
        this.title = title;
    }

    public String getTitle() { return title; }

    @Override
    public abstract Document clone();
}`,
            checks: [
              { type: 'contains', value: 'abstract class Document', msg: 'Document لازم abstract' },
              { type: 'contains', value: 'String title', msg: 'لازم field title' },
              { type: 'regex', value: 'public\\s+abstract\\s+Document\\s+clone', msg: 'لازم abstract clone() ترجع Document' }
            ]
          },
          {
            name: 'Report.java',
            status: 'todo',
            starter: `// TODO: Report extends Document فيه content (String)
// أضف: copy constructor + regular constructor + clone()`,
            solution: `public class Report extends Document {
    private String content;

    public Report(Report target) {
        super(target.getTitle());
        this.content = target.content;
    }

    public Report(String title, String content) {
        super(title);
        this.content = content;
    }

    @Override
    public Document clone() {
        return new Report(this);
    }
}`,
            checks: [
              { type: 'contains', value: 'extends Document', msg: 'Report لازم extends Document' },
              { type: 'regex', value: 'public\\s+Report\\s*\\(\\s*Report\\s+\\w+\\s*\\)', msg: 'لازم copy constructor' },
              { type: 'contains', value: 'super(', msg: 'استدعي super في copy constructor' },
              { type: 'contains', value: 'new Report(this)', msg: 'clone() ترجع new Report(this)' }
            ]
          }
        ]
      },
      {
        id: 4,
        name: 'Ancient',
        nameAr: 'التنين الأسطوري',
        icon: '👑',
        stars: '⭐⭐⭐⭐',
        task: 'اكتب نظام Prototype كامل: Animal (abstract) + Dog + AnimalCache فيه prototypes جاهزة.',
        files: [
          {
            name: 'Animal.java',
            status: 'todo',
            starter: `// TODO: abstract Animal فيه name و sound (Strings)`,
            solution: `public abstract class Animal {
    private String name;
    private String sound;

    public Animal(String name, String sound) {
        this.name = name;
        this.sound = sound;
    }

    public String getName() { return name; }
    public String getSound() { return sound; }

    @Override
    public abstract Animal clone();
}`,
            checks: [
              { type: 'contains', value: 'abstract class Animal', msg: 'Animal abstract' },
              { type: 'regex', value: 'public\\s+abstract\\s+Animal\\s+clone', msg: 'abstract clone()' }
            ]
          },
          {
            name: 'Dog.java',
            status: 'todo',
            starter: `// TODO: Dog extends Animal فيه breed (String)`,
            solution: `public class Dog extends Animal {
    private String breed;

    public Dog(Dog target) {
        super(target.getName(), target.getSound());
        this.breed = target.breed;
    }

    public Dog(String name, String sound, String breed) {
        super(name, sound);
        this.breed = breed;
    }

    @Override
    public Animal clone() {
        return new Dog(this);
    }
}`,
            checks: [
              { type: 'contains', value: 'extends Animal', msg: 'Dog extends Animal' },
              { type: 'regex', value: 'Dog\\s*\\(\\s*Dog\\s+\\w+\\s*\\)', msg: 'copy constructor' },
              { type: 'contains', value: 'new Dog(this)', msg: 'clone() ترجع new Dog(this)' }
            ]
          },
          {
            name: 'AnimalCache.java',
            status: 'todo',
            starter: `import java.util.HashMap;
import java.util.Map;

public class AnimalCache {
    // TODO: HashMap + constructor يضيف Dog + method get(key) ترجع clone
}`,
            solution: `import java.util.HashMap;
import java.util.Map;

public class AnimalCache {
    private Map<String, Animal> cache = new HashMap<>();

    public AnimalCache() {
        Dog dog = new Dog("Rex", "Woof", "Labrador");
        cache.put("rex", dog);
    }

    public Animal get(String key) {
        return cache.get(key).clone();
    }
}`,
            checks: [
              { type: 'contains', value: 'HashMap', msg: 'استخدم HashMap' },
              { type: 'contains', value: 'cache.put', msg: 'ضع prototypes في الـ cache' },
              { type: 'contains', value: '.clone()', msg: 'get() ترجع clone مو الأصل' }
            ]
          }
        ]
      }
    ]
  }

};

// نخلي PATTERNS_DATA يضاف عليه باقي الـ patterns من ملفات تانية
window.PATTERNS_DATA = PATTERNS_DATA;
