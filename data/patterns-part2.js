// ============================================
// 🐉 DRAGON PATTERNS DATA - Part 2
// Builder, Factory, Adapter
// ============================================

Object.assign(window.PATTERNS_DATA, {

  // ============ 3. BUILDER ============
  builder: {
    id: 'builder',
    name: 'Builder',
    nameAr: 'تنين الصياغة',
    icon: '🔨',
    category: 'Creational',
    categoryAr: 'إنشائي',
    color: 'var(--p-builder)',
    tagline: 'ابنِ الكائن المعقد خطوة بخطوة',
    shortDesc: 'يبني كائنات معقدة بخطوات منفصلة بدل constructor طويل',

    intro: `<strong>Builder</strong> لما عندك كائن فيه خصائص كثيرة (إجبارية + اختيارية)، بدل ما تسوي 10 constructors مختلفة، استخدم Builder.
    <br><br>
    <strong>الأركان (أسلوب الدكتور):</strong>
    <ol style="margin-right: 1.5rem; margin-top: 0.5rem;">
      <li>الكلاس الأساسي فيه <code>private constructor</code> يستقبل Builder</li>
      <li><code>public static class Builder</code> ← inner static class (مهم!)</li>
      <li>الـ Builder فيه constructor للـ <strong>required</strong> + methods <code>withX()</code> للـ <strong>optional</strong></li>
      <li>كل <code>withX()</code> ترجع <code>this</code> للـ method chaining</li>
      <li>method <code>build()</code> ترجع الكلاس النهائي</li>
    </ol>
    <br>
    <strong>الاستخدام:</strong><br>
    <code>new Car.Builder("Toyota", "Hilux", 2023).withRadio().withGPS().build();</code>`,

    classes: [
      {
        name: 'Car (Product)',
        role: 'Product Class',
        roleAr: 'الكلاس النهائي اللي يتم بناؤه',
        desc: 'الكلاس الأساسي اللي نبي نبنيه. الـ constructor حقه private ويستقبل Builder فقط.',
        methods: [
          {
            name: 'private Car(Builder builder)',
            purpose: '⭐ private! ما أحد يقدر يسوي new Car() مباشرة. يستقبل الـ Builder وينسخ منه كل القيم. هذا اللي يجبر الكلاينت يستخدم Builder.',
            code: 'private Car(Builder builder) {\n    this.make = builder.make;\n    this.model = builder.model;\n    this.radio = builder.radio;\n}'
          },
          {
            name: 'public static class Builder',
            purpose: '⭐⭐⭐ inner static class اسمها Builder. لاحظ static! لازم تكون static عشان نقدر نسوي new Car.Builder(...) بدون ما نحتاج Car object أولاً.',
            code: 'public static class Builder {\n    // نفس الـ fields\n    public Car build() {\n        return new Car(this);\n    }\n}'
          }
        ],
        fullCode: `public class Car {
    // Required parameters
    private String make;
    private String model;
    private int year;
    // Optional parameters
    private Radio radio;
    private Navigation navigation;
    private HeatedSeats heatedSeats;

    private Car(Builder builder) {
        this.make = builder.make;
        this.model = builder.model;
        this.year = builder.year;
        this.radio = builder.radio;
        this.navigation = builder.navigation;
        this.heatedSeats = builder.heatedSeats;
    }

    public static class Builder {
        private String make;
        private String model;
        private int year;
        private Radio radio;
        private Navigation navigation;
        private HeatedSeats heatedSeats;

        public Builder(String make, String model, int year) {
            this.make = make;
            this.model = model;
            this.year = year;
        }

        public Builder withRadio() {
            this.radio = new Radio();
            return this;
        }

        public Builder withNavigation() {
            this.navigation = new Navigation();
            return this;
        }

        public Builder withHeatedSeats() {
            this.heatedSeats = new HeatedSeats();
            return this;
        }

        public Car build() {
            return new Car(this);
        }
    }
}`
      },
      {
        name: 'Builder (Inner)',
        role: 'Inner Static Class',
        roleAr: 'الكلاس الداخلي اللي يبني الكائن',
        desc: 'الـ Builder نفسه - inner static class داخل Car. فيه نفس الـ fields + constructor للـ required + methods اختيارية.',
        methods: [
          {
            name: 'public Builder(String make, ...)',
            purpose: 'يستقبل الـ required parameters فقط. هذا يضمن إن أي car لازم يكون عنده هذي القيم.',
            code: 'public Builder(String make, String model, int year) {\n    this.make = make;\n    this.model = model;\n    this.year = year;\n}'
          },
          {
            name: 'public Builder withRadio()',
            purpose: '⭐ method اختيارية. لاحظ تنتهي بـ return this; هذا اللي يخلي method chaining شغال: builder.withRadio().withGPS().build()',
            code: 'public Builder withRadio() {\n    this.radio = new Radio();\n    return this;\n}'
          },
          {
            name: 'public Car build()',
            purpose: 'الـ method النهائية. تنشئ Car جديد وتمرر this (الـ Builder الحالي) للـ constructor.',
            code: 'public Car build() {\n    return new Car(this);\n}'
          }
        ],
        fullCode: `// inner static class داخل Car
public static class Builder {
    private String make;
    private String model;
    private int year;
    private Radio radio;
    private Navigation navigation;

    public Builder(String make, String model, int year) {
        this.make = make;
        this.model = model;
        this.year = year;
    }

    public Builder withRadio() {
        this.radio = new Radio();
        return this;
    }

    public Builder withNavigation() {
        this.navigation = new Navigation();
        return this;
    }

    public Car build() {
        return new Car(this);
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
        task: 'أكمل الفراغات في Pizza Builder. الـ structure موجود، تحتاج تكمل return this و build().',
        files: [
          {
            name: 'Pizza.java',
            status: 'todo',
            starter: `public class Pizza {
    private String size;
    private boolean cheese;

    private Pizza(Builder builder) {
        this.size = builder.size;
        this.cheese = builder.cheese;
    }

    public static class Builder {
        private String size;
        private boolean cheese;

        public Builder(String size) {
            this.size = size;
        }

        public Builder withCheese() {
            this.cheese = true;
            return ___FILL_1___;
        }

        public Pizza build() {
            return new Pizza(___FILL_2___);
        }
    }
}`,
            solution: `public class Pizza {
    private String size;
    private boolean cheese;

    private Pizza(Builder builder) {
        this.size = builder.size;
        this.cheese = builder.cheese;
    }

    public static class Builder {
        private String size;
        private boolean cheese;

        public Builder(String size) {
            this.size = size;
        }

        public Builder withCheese() {
            this.cheese = true;
            return this;
        }

        public Pizza build() {
            return new Pizza(this);
        }
    }
}`,
            checks: [
              { type: 'regex', value: 'withCheese\\(\\)[\\s\\S]*?return\\s+this\\s*;', msg: 'withCheese() لازم ترجع this' },
              { type: 'contains', value: 'new Pizza(this)', msg: 'build() لازم ترجع new Pizza(this)' }
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
        task: 'أكمل Burger Builder. أعطيناك الـ fields، تحتاج تكمل: private constructor + Builder constructor + withX methods + build().',
        files: [
          {
            name: 'Burger.java',
            status: 'todo',
            starter: `public class Burger {
    private String bun;
    private String patty;
    private boolean cheese;
    private boolean lettuce;

    // TODO: أكمل private constructor

    public static class Builder {
        private String bun;
        private String patty;
        private boolean cheese;
        private boolean lettuce;

        // TODO: Builder constructor يأخذ bun + patty (required)

        // TODO: withCheese() ترجع Builder

        // TODO: withLettuce() ترجع Builder

        // TODO: build() ترجع Burger
    }
}`,
            solution: `public class Burger {
    private String bun;
    private String patty;
    private boolean cheese;
    private boolean lettuce;

    private Burger(Builder builder) {
        this.bun = builder.bun;
        this.patty = builder.patty;
        this.cheese = builder.cheese;
        this.lettuce = builder.lettuce;
    }

    public static class Builder {
        private String bun;
        private String patty;
        private boolean cheese;
        private boolean lettuce;

        public Builder(String bun, String patty) {
            this.bun = bun;
            this.patty = patty;
        }

        public Builder withCheese() {
            this.cheese = true;
            return this;
        }

        public Builder withLettuce() {
            this.lettuce = true;
            return this;
        }

        public Burger build() {
            return new Burger(this);
        }
    }
}`,
            checks: [
              { type: 'regex', value: 'private\\s+Burger\\s*\\(\\s*Builder', msg: 'لازم private constructor يأخذ Builder' },
              { type: 'regex', value: 'public\\s+Builder\\s*\\(\\s*String\\s+\\w+\\s*,\\s*String\\s+\\w+\\s*\\)', msg: 'Builder constructor يأخذ bun + patty' },
              { type: 'contains', value: 'withCheese', msg: 'لازم method withCheese()' },
              { type: 'contains', value: 'withLettuce', msg: 'لازم method withLettuce()' },
              { type: 'regex', value: 'return\\s+this', msg: 'withX() لازم ترجع this' },
              { type: 'contains', value: 'new Burger(this)', msg: 'build() ترجع new Burger(this)' }
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
        task: 'اكتب Computer Builder كامل: required = cpu, ram | optional = gpu, storage, monitor.',
        files: [
          {
            name: 'Computer.java',
            status: 'todo',
            starter: `// TODO: اكتب الكلاس كامل بنمط Builder
// Required: cpu, ram
// Optional: gpu, storage, monitor`,
            solution: `public class Computer {
    private String cpu;
    private String ram;
    private String gpu;
    private String storage;
    private String monitor;

    private Computer(Builder builder) {
        this.cpu = builder.cpu;
        this.ram = builder.ram;
        this.gpu = builder.gpu;
        this.storage = builder.storage;
        this.monitor = builder.monitor;
    }

    public static class Builder {
        private String cpu;
        private String ram;
        private String gpu;
        private String storage;
        private String monitor;

        public Builder(String cpu, String ram) {
            this.cpu = cpu;
            this.ram = ram;
        }

        public Builder withGPU(String gpu) {
            this.gpu = gpu;
            return this;
        }

        public Builder withStorage(String storage) {
            this.storage = storage;
            return this;
        }

        public Builder withMonitor(String monitor) {
            this.monitor = monitor;
            return this;
        }

        public Computer build() {
            return new Computer(this);
        }
    }
}`,
            checks: [
              { type: 'regex', value: 'private\\s+Computer\\s*\\(\\s*Builder', msg: 'private constructor(Builder)' },
              { type: 'regex', value: 'public\\s+static\\s+class\\s+Builder', msg: 'public static class Builder' },
              { type: 'regex', value: 'Builder\\s*\\(\\s*String\\s+\\w+\\s*,\\s*String\\s+\\w+\\s*\\)', msg: 'Builder constructor: cpu + ram' },
              { type: 'regex', value: 'withGPU|withGpu', msg: 'method withGPU' },
              { type: 'regex', value: 'withStorage', msg: 'method withStorage' },
              { type: 'regex', value: 'withMonitor', msg: 'method withMonitor' },
              { type: 'regex', value: 'return\\s+this', msg: 'withX ترجع this' },
              { type: 'contains', value: 'new Computer(this)', msg: 'build() ترجع new Computer(this)' }
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
        task: 'سيناريو الاختبار الحقيقي 🔥: VirtualMachine بخصائص كثيرة (required: cloudProvider, region, az, imageId | optional: ports, privateIP, tags). الكلاس الحالي فيه constructors متعددة قبيحة (telescoping). حوّله لـ Builder.',
        files: [
          {
            name: 'VirtualMachine.java',
            status: 'todo',
            starter: `public class VirtualMachine {
    // Required
    private String cloudProvider;
    private String region;
    private String az;
    private String imageId;
    // Optional
    private String[] ports;
    private String privateIP;
    private String[] tags;

    // TODO: حوّل constructors المتعددة إلى Builder pattern
    // المطلوب:
    // - private VirtualMachine(Builder builder)
    // - inner static class Builder
    // - Builder constructor: cloudProvider, region, az, imageId
    // - withPorts(String[]) / withPrivateIP(String) / withTags(String[])
    // - build()
}`,
            solution: `public class VirtualMachine {
    private String cloudProvider;
    private String region;
    private String az;
    private String imageId;
    private String[] ports;
    private String privateIP;
    private String[] tags;

    private VirtualMachine(Builder builder) {
        this.cloudProvider = builder.cloudProvider;
        this.region = builder.region;
        this.az = builder.az;
        this.imageId = builder.imageId;
        this.ports = builder.ports;
        this.privateIP = builder.privateIP;
        this.tags = builder.tags;
    }

    public static class Builder {
        private String cloudProvider;
        private String region;
        private String az;
        private String imageId;
        private String[] ports;
        private String privateIP;
        private String[] tags;

        public Builder(String cloudProvider, String region, String az, String imageId) {
            this.cloudProvider = cloudProvider;
            this.region = region;
            this.az = az;
            this.imageId = imageId;
        }

        public Builder withPorts(String[] ports) {
            this.ports = ports;
            return this;
        }

        public Builder withPrivateIP(String privateIP) {
            this.privateIP = privateIP;
            return this;
        }

        public Builder withTags(String[] tags) {
            this.tags = tags;
            return this;
        }

        public VirtualMachine build() {
            return new VirtualMachine(this);
        }
    }
}`,
            checks: [
              { type: 'regex', value: 'private\\s+VirtualMachine\\s*\\(\\s*Builder', msg: 'private VirtualMachine(Builder builder)' },
              { type: 'regex', value: 'public\\s+static\\s+class\\s+Builder', msg: 'public static class Builder' },
              { type: 'contains', value: 'withPorts', msg: 'method withPorts' },
              { type: 'contains', value: 'withPrivateIP', msg: 'method withPrivateIP' },
              { type: 'contains', value: 'withTags', msg: 'method withTags' },
              { type: 'regex', value: 'return\\s+this', msg: 'withX ترجع this' },
              { type: 'contains', value: 'new VirtualMachine(this)', msg: 'build() ترجع new VirtualMachine(this)' }
            ]
          }
        ]
      }
    ]
  },

  // ============ 4. FACTORY ============
  factory: {
    id: 'factory',
    name: 'Factory',
    nameAr: 'تنين الصياغة الذكية',
    icon: '🏭',
    category: 'Creational',
    categoryAr: 'إنشائي',
    color: 'var(--p-factory)',
    tagline: 'مصنع يعطيك المنتج المناسب حسب طلبك',
    shortDesc: 'يخفي إنشاء الكائنات خلف method واحدة تأخذ نوع وترجع كائن',

    intro: `<strong>Factory (الأسلوب المبسط للدكتور)</strong> بدل ما تسوي <code>new Circle()</code> أو <code>new Square()</code> في كل مكان، تسوي class واحد <code>ShapeFactory</code> فيه method <code>getShape(type)</code> ترجع الكائن المناسب.
    <br><br>
    <strong>الأركان:</strong>
    <ol style="margin-right: 1.5rem; margin-top: 0.5rem;">
      <li><code>interface</code> مشترك (مثل Shape)</li>
      <li>عدة <code>concrete classes</code> ينفذون الـ interface (Circle, Square)</li>
      <li><code>Factory class</code> فيها method تأخذ String وترجع object</li>
      <li>الـ method تستخدم <strong>if-else + equalsIgnoreCase</strong> للمقارنة</li>
    </ol>`,

    classes: [
      {
        name: 'Shape (interface)',
        role: 'Product Interface',
        roleAr: 'الـ interface المشترك',
        desc: 'الواجهة المشتركة بين كل المنتجات. الـ Factory ترجع كائن من نوع Shape.',
        methods: [
          {
            name: 'public void draw()',
            purpose: 'method abstract لازم كل subclass ينفذها. هذا اللي يخلي Factory ترجع Shape والكلاينت يستخدمها بدون ما يعرف النوع الفعلي.',
            code: 'public void draw();'
          }
        ],
        fullCode: `public interface Shape {
    public void draw();
}`
      },
      {
        name: 'Circle / Rectangle / Square',
        role: 'Concrete Products',
        roleAr: 'المنتجات الفعلية',
        desc: 'كل واحدة منهم ينفذ Shape بطريقته الخاصة.',
        methods: [
          {
            name: 'public void draw()',
            purpose: 'كل نوع شكل ينفذ draw() بشكل مختلف. الـ Factory ترجع واحد منهم.',
            code: '@Override\npublic void draw() {\n    System.out.println("Drawing a circle.");\n}'
          }
        ],
        fullCode: `public class Circle implements Shape {
    @Override
    public void draw() {
        System.out.println("Drawing a circle.");
    }
}

public class Rectangle implements Shape {
    @Override
    public void draw() {
        System.out.println("Drawing a rectangle.");
    }
}

public class Square implements Shape {
    @Override
    public void draw() {
        System.out.println("Drawing a square.");
    }
}`
      },
      {
        name: 'ShapeFactory',
        role: 'Factory Class',
        roleAr: 'المصنع - يقرر إيش الكائن اللي يرجعه',
        desc: '⭐ القلب الأساسي للنمط! يحتوي method واحدة getShape() تأخذ string وترجع الكائن المناسب.',
        methods: [
          {
            name: 'public Shape getShape(String type)',
            purpose: '⭐⭐⭐ Factory method. تأخذ string وتقارنها بـ equalsIgnoreCase (مهم! غير حساس لحالة الأحرف). كل if يرجع نوع مختلف. هذا اللي يخفي تعقيد الإنشاء عن الكلاينت.',
            code: 'public Shape getShape(String type) {\n    if (type == null) return null;\n    if (type.equalsIgnoreCase("circle"))\n        return new Circle();\n    if (type.equalsIgnoreCase("square"))\n        return new Square();\n    return null;\n}'
          }
        ],
        fullCode: `public class ShapeFactory {

    public Shape getShape(String type) {
        if (type == null || type == "") {
            return null;
        } else if (type.equalsIgnoreCase("rectangle")) {
            return new Rectangle();
        } else if (type.equalsIgnoreCase("circle")) {
            return new Circle();
        } else if (type.equalsIgnoreCase("square")) {
            return new Square();
        }
        System.err.println("Unknown shape type");
        return null;
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
        task: 'أكمل الفراغات في AnimalFactory.',
        files: [
          {
            name: 'AnimalFactory.java',
            status: 'todo',
            starter: `public class AnimalFactory {
    public Animal getAnimal(String type) {
        if (type == null) return null;
        if (type.___FILL_1___("dog")) {
            return new ___FILL_2___();
        }
        if (type.equalsIgnoreCase("cat")) {
            return new Cat();
        }
        return ___FILL_3___;
    }
}`,
            solution: `public class AnimalFactory {
    public Animal getAnimal(String type) {
        if (type == null) return null;
        if (type.equalsIgnoreCase("dog")) {
            return new Dog();
        }
        if (type.equalsIgnoreCase("cat")) {
            return new Cat();
        }
        return null;
    }
}`,
            checks: [
              { type: 'contains', value: 'equalsIgnoreCase', msg: 'استخدم equalsIgnoreCase للمقارنة' },
              { type: 'contains', value: 'new Dog()', msg: 'لازم return new Dog() لما يكون النوع dog' },
              { type: 'regex', value: 'return\\s+null', msg: 'في النهاية return null' }
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
        task: 'أكمل NotificationFactory بحيث يدعم email, sms, push. أعطيناك الـ interface والـ concrete classes جاهزة.',
        files: [
          {
            name: 'Notification.java',
            status: 'ok',
            readonly: true,
            starter: `public interface Notification {
    void send(String msg);
}`
          },
          {
            name: 'NotificationFactory.java',
            status: 'todo',
            starter: `public class NotificationFactory {
    // TODO: method getNotification(String type) ترجع Notification
    // يدعم: "email" -> EmailNotification
    //       "sms"   -> SMSNotification
    //       "push"  -> PushNotification
}`,
            solution: `public class NotificationFactory {
    public Notification getNotification(String type) {
        if (type == null) return null;
        if (type.equalsIgnoreCase("email")) {
            return new EmailNotification();
        }
        if (type.equalsIgnoreCase("sms")) {
            return new SMSNotification();
        }
        if (type.equalsIgnoreCase("push")) {
            return new PushNotification();
        }
        return null;
    }
}`,
            checks: [
              { type: 'regex', value: 'public\\s+Notification\\s+getNotification', msg: 'method getNotification ترجع Notification' },
              { type: 'contains', value: 'equalsIgnoreCase', msg: 'استخدم equalsIgnoreCase' },
              { type: 'contains', value: 'new EmailNotification', msg: 'دعم email' },
              { type: 'contains', value: 'new SMSNotification', msg: 'دعم sms' },
              { type: 'contains', value: 'new PushNotification', msg: 'دعم push' }
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
        task: 'اكتب نظام Vehicle Factory كامل: Vehicle interface + Car + Truck + Bike + VehicleFactory.',
        files: [
          {
            name: 'Vehicle.java',
            status: 'todo',
            starter: `// TODO: interface Vehicle فيه method drive()`,
            solution: `public interface Vehicle {
    void drive();
}`,
            checks: [
              { type: 'regex', value: 'interface\\s+Vehicle', msg: 'لازم interface Vehicle' },
              { type: 'contains', value: 'drive', msg: 'method drive()' }
            ]
          },
          {
            name: 'Car.java',
            status: 'todo',
            starter: `// TODO: class Car implements Vehicle`,
            solution: `public class Car implements Vehicle {
    @Override
    public void drive() {
        System.out.println("Driving a car.");
    }
}`,
            checks: [
              { type: 'contains', value: 'implements Vehicle', msg: 'Car implements Vehicle' },
              { type: 'contains', value: 'drive', msg: 'ينفذ drive' }
            ]
          },
          {
            name: 'VehicleFactory.java',
            status: 'todo',
            starter: `// TODO: VehicleFactory فيها getVehicle(type) تدعم car, truck, bike`,
            solution: `public class VehicleFactory {
    public Vehicle getVehicle(String type) {
        if (type == null) return null;
        if (type.equalsIgnoreCase("car")) {
            return new Car();
        }
        if (type.equalsIgnoreCase("truck")) {
            return new Truck();
        }
        if (type.equalsIgnoreCase("bike")) {
            return new Bike();
        }
        return null;
    }
}`,
            checks: [
              { type: 'regex', value: 'public\\s+Vehicle\\s+getVehicle', msg: 'method getVehicle ترجع Vehicle' },
              { type: 'contains', value: 'equalsIgnoreCase', msg: 'استخدم equalsIgnoreCase' },
              { type: 'contains', value: 'new Car()', msg: 'دعم car' },
              { type: 'contains', value: 'new Truck()', msg: 'دعم truck' },
              { type: 'contains', value: 'new Bike()', msg: 'دعم bike' }
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
        task: 'اكتب PaymentFactory: interface Payment + 4 طرق دفع (CreditCard, PayPal, ApplePay, BankTransfer) + Factory.',
        files: [
          {
            name: 'Payment.java',
            status: 'todo',
            starter: `// TODO: interface Payment فيها processPayment(double amount)`,
            solution: `public interface Payment {
    void processPayment(double amount);
}`,
            checks: [
              { type: 'regex', value: 'interface\\s+Payment', msg: 'interface Payment' },
              { type: 'contains', value: 'processPayment', msg: 'method processPayment' }
            ]
          },
          {
            name: 'CreditCardPayment.java',
            status: 'todo',
            starter: `// TODO: implements Payment`,
            solution: `public class CreditCardPayment implements Payment {
    @Override
    public void processPayment(double amount) {
        System.out.println("Paid " + amount + " with Credit Card");
    }
}`,
            checks: [
              { type: 'contains', value: 'implements Payment', msg: 'implements Payment' },
              { type: 'contains', value: 'processPayment', msg: 'ينفذ processPayment' }
            ]
          },
          {
            name: 'PaymentFactory.java',
            status: 'todo',
            starter: `// TODO: PaymentFactory فيها getPayment(type) تدعم 4 أنواع`,
            solution: `public class PaymentFactory {
    public Payment getPayment(String type) {
        if (type == null) return null;
        if (type.equalsIgnoreCase("creditcard")) {
            return new CreditCardPayment();
        }
        if (type.equalsIgnoreCase("paypal")) {
            return new PayPalPayment();
        }
        if (type.equalsIgnoreCase("applepay")) {
            return new ApplePayPayment();
        }
        if (type.equalsIgnoreCase("banktransfer")) {
            return new BankTransferPayment();
        }
        return null;
    }
}`,
            checks: [
              { type: 'regex', value: 'public\\s+Payment\\s+getPayment', msg: 'getPayment ترجع Payment' },
              { type: 'contains', value: 'equalsIgnoreCase', msg: 'استخدم equalsIgnoreCase' },
              { type: 'contains', value: 'CreditCard', msg: 'دعم CreditCard' },
              { type: 'contains', value: 'PayPal', msg: 'دعم PayPal' },
              { type: 'contains', value: 'ApplePay', msg: 'دعم ApplePay' },
              { type: 'contains', value: 'BankTransfer', msg: 'دعم BankTransfer' }
            ]
          }
        ]
      }
    ]
  },

  // ============ 5. ADAPTER ============
  adapter: {
    id: 'adapter',
    name: 'Adapter',
    nameAr: 'تنين الجسور',
    icon: '🔌',
    category: 'Structural',
    categoryAr: 'تركيبي',
    color: 'var(--p-adapter)',
    tagline: 'يربط بين كائنات بـ interfaces مختلفة',
    shortDesc: 'يحوّل interface كلاس إلى interface ثاني يفهمه الكلاينت',

    intro: `<strong>Adapter</strong> لما عندك كلاس interface حقه ما يتوافق مع كودك، تسوي adapter يـ"يلبس" عليه interface ثاني يفهمه الكود.
    <br><br>
    <strong>الأركان:</strong>
    <ol style="margin-right: 1.5rem; margin-top: 0.5rem;">
      <li><code>Target interface</code> - اللي الكلاينت يفهمه</li>
      <li><code>Adaptee</code> - الكلاس الموجود بـ interface مختلف</li>
      <li><code>Adapter</code> - ينفذ Target ويلف Adaptee + يحول النداءات</li>
    </ol>
    <br>
    <strong>مثال الدكتور:</strong> CityWeather يأخذ اسم مدينة، بس نبي GeoWeather يأخذ lat/lng. الـ Adapter يحول lat/lng → city ثم يستدعي CityWeather.`,

    classes: [
      {
        name: 'GeoWeather (Target)',
        role: 'Target Interface',
        roleAr: 'الـ interface اللي يفهمه الكلاينت',
        desc: 'الـ interface اللي الكود حقي يحتاجها. الكود يريد لaT/lng بس الـ adaptee يأخذ city.',
        methods: [
          {
            name: 'public double getTemp(double lat, double lng)',
            purpose: 'الواجهة المطلوبة - تأخذ lat/lng. هذي اللي الـ Adapter لازم ينفذها.',
            code: 'public double getTemp(double latitude, double longitude);'
          }
        ],
        fullCode: `package weather;

public interface GeoWeather {
    public double getTemp(double latitude, double longitude);
}`
      },
      {
        name: 'CityWeather (Adaptee)',
        role: 'Adaptee Interface',
        roleAr: 'الـ interface غير المتوافق',
        desc: 'الـ interface الموجود من قبل، لكن يأخذ String مو lat/lng. الـ Adapter راح يستخدمه.',
        methods: [
          {
            name: 'public double getTemp(String city)',
            purpose: 'يأخذ اسم مدينة. الـ Adapter راح يحول lat/lng إلى city ثم يستدعي هذي.',
            code: 'public double getTemp(String city);'
          }
        ],
        fullCode: `package weather;

public interface CityWeather {
    public double getTemp(String city);
}

public class YahooCityWeather implements CityWeather {
    @Override
    public double getTemp(String city) {
        // hitting the Yahoo api
        return 40.0;
    }
}`
      },
      {
        name: 'GeoWeatherAdapter',
        role: 'Adapter',
        roleAr: '⭐ القلب - يربط الاثنين',
        desc: 'هذا الـ Adapter. ينفذ Target (GeoWeather) ويحفظ reference للـ Adaptee (CityWeather).',
        methods: [
          {
            name: 'private CityWeather w',
            purpose: '⭐ Field يحفظ الـ Adaptee. هذا الـ wrapping - الـ Adapter "يلف" الـ Adaptee.',
            code: 'private CityWeather w;'
          },
          {
            name: 'public GeoWeatherAdapter(CityWeather w)',
            purpose: 'الـ constructor يستقبل الـ Adaptee ويخزنه. هذي طريقة الحقن (composition).',
            code: 'public GeoWeatherAdapter(CityWeather w) {\n    this.w = w;\n}'
          },
          {
            name: 'public double getTemp(double lat, double lng)',
            purpose: '⭐⭐⭐ هنا التحويل يصير: يحول lat/lng إلى city ثم يستدعي الـ Adaptee. هذا اللي يجعل الـ pattern يشتغل.',
            code: 'public double getTemp(double lat, double lng) {\n    String city = getCity(lat, lng);\n    return w.getTemp(city);\n}'
          }
        ],
        fullCode: `package weather;

public class GeoWeatherAdapter implements GeoWeather {

    private CityWeather w;

    public GeoWeatherAdapter(CityWeather w) {
        this.w = w;
    }

    @Override
    public double getTemp(double lat, double lng) {
        String city = getCity(lat, lng);
        return w.getTemp(city);
    }

    private String getCity(double lat, double lng) {
        return "Jeddah";
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
        task: 'أكمل الفراغات في PowerAdapter.',
        files: [
          {
            name: 'USToEuropeAdapter.java',
            status: 'todo',
            starter: `public class USToEuropeAdapter ___FILL_1___ EuropeanSocket {
    private USPlug usPlug;

    public USToEuropeAdapter(USPlug p) {
        this.usPlug = ___FILL_2___;
    }

    @Override
    public void provideElectricity() {
        usPlug.___FILL_3___();
    }
}`,
            solution: `public class USToEuropeAdapter implements EuropeanSocket {
    private USPlug usPlug;

    public USToEuropeAdapter(USPlug p) {
        this.usPlug = p;
    }

    @Override
    public void provideElectricity() {
        usPlug.connectUS();
    }
}`,
            checks: [
              { type: 'contains', value: 'implements EuropeanSocket', msg: 'الـ Adapter ينفذ الـ Target' },
              { type: 'contains', value: 'this.usPlug = p', msg: 'احفظ p في usPlug' },
              { type: 'contains', value: 'usPlug.connectUS', msg: 'استدعي connectUS من الـ adaptee' }
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
        task: 'اكتب XML to JSON Adapter. عندك XMLDataProvider (adaptee) يرجع XML، تحتاج interface JSONService وadapter.',
        files: [
          {
            name: 'JSONService.java',
            status: 'ok',
            readonly: true,
            starter: `public interface JSONService {
    String getData();
}`
          },
          {
            name: 'XMLDataProvider.java',
            status: 'ok',
            readonly: true,
            starter: `public class XMLDataProvider {
    public String getXMLData() {
        return "<data><name>Ali</name></data>";
    }
}`
          },
          {
            name: 'XMLToJSONAdapter.java',
            status: 'todo',
            starter: `// TODO: Adapter ينفذ JSONService ويلف XMLDataProvider`,
            solution: `public class XMLToJSONAdapter implements JSONService {
    private XMLDataProvider xmlProvider;

    public XMLToJSONAdapter(XMLDataProvider provider) {
        this.xmlProvider = provider;
    }

    @Override
    public String getData() {
        String xml = xmlProvider.getXMLData();
        return convertXMLToJSON(xml);
    }

    private String convertXMLToJSON(String xml) {
        return "{\\"name\\":\\"Ali\\"}";
    }
}`,
            checks: [
              { type: 'contains', value: 'implements JSONService', msg: 'ينفذ JSONService (Target)' },
              { type: 'regex', value: 'private\\s+XMLDataProvider', msg: 'field من نوع XMLDataProvider' },
              { type: 'regex', value: 'XMLToJSONAdapter\\s*\\(\\s*XMLDataProvider', msg: 'constructor يأخذ XMLDataProvider' },
              { type: 'contains', value: 'getXMLData', msg: 'استدعي getXMLData من الـ adaptee' }
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
        task: 'اكتب MediaPlayer Adapter كامل: Target = MediaPlayer.play(filename) | Adaptee = OldMP3Player.playMP3(file).',
        files: [
          {
            name: 'MediaPlayer.java',
            status: 'todo',
            starter: `// TODO: interface فيه play(String filename)`,
            solution: `public interface MediaPlayer {
    void play(String filename);
}`,
            checks: [
              { type: 'regex', value: 'interface\\s+MediaPlayer', msg: 'interface MediaPlayer' },
              { type: 'contains', value: 'play', msg: 'method play' }
            ]
          },
          {
            name: 'OldMP3Player.java',
            status: 'todo',
            starter: `// TODO: class فيه playMP3(String file)`,
            solution: `public class OldMP3Player {
    public void playMP3(String file) {
        System.out.println("Playing MP3: " + file);
    }
}`,
            checks: [
              { type: 'contains', value: 'playMP3', msg: 'method playMP3' }
            ]
          },
          {
            name: 'MP3Adapter.java',
            status: 'todo',
            starter: `// TODO: Adapter ينفذ MediaPlayer ويلف OldMP3Player`,
            solution: `public class MP3Adapter implements MediaPlayer {
    private OldMP3Player oldPlayer;

    public MP3Adapter(OldMP3Player old) {
        this.oldPlayer = old;
    }

    @Override
    public void play(String filename) {
        oldPlayer.playMP3(filename);
    }
}`,
            checks: [
              { type: 'contains', value: 'implements MediaPlayer', msg: 'ينفذ MediaPlayer' },
              { type: 'regex', value: 'private\\s+OldMP3Player', msg: 'field OldMP3Player' },
              { type: 'contains', value: 'oldPlayer.playMP3', msg: 'استدعي playMP3' }
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
        task: 'اكتب نظام Adapter كامل لـ Weather (مثال الدكتور بالضبط): GeoWeather (lat/lng) + CityWeather (city) + Adapter.',
        files: [
          {
            name: 'GeoWeather.java',
            status: 'todo',
            starter: `// TODO: interface GeoWeather`,
            solution: `public interface GeoWeather {
    public double getTemp(double latitude, double longitude);
}`,
            checks: [
              { type: 'regex', value: 'interface\\s+GeoWeather', msg: 'interface GeoWeather' },
              { type: 'contains', value: 'getTemp', msg: 'method getTemp' },
              { type: 'contains', value: 'double', msg: 'parameters من نوع double' }
            ]
          },
          {
            name: 'CityWeather.java',
            status: 'todo',
            starter: `// TODO: interface CityWeather`,
            solution: `public interface CityWeather {
    public double getTemp(String city);
}`,
            checks: [
              { type: 'regex', value: 'interface\\s+CityWeather', msg: 'interface CityWeather' },
              { type: 'contains', value: 'String city', msg: 'يأخذ String city' }
            ]
          },
          {
            name: 'YahooCityWeather.java',
            status: 'todo',
            starter: `// TODO: class implements CityWeather`,
            solution: `public class YahooCityWeather implements CityWeather {
    @Override
    public double getTemp(String city) {
        return 40.0;
    }
}`,
            checks: [
              { type: 'contains', value: 'implements CityWeather', msg: 'implements CityWeather' }
            ]
          },
          {
            name: 'GeoWeatherAdapter.java',
            status: 'todo',
            starter: `// TODO: Adapter يلف CityWeather`,
            solution: `public class GeoWeatherAdapter implements GeoWeather {
    private CityWeather w;

    public GeoWeatherAdapter(CityWeather w) {
        this.w = w;
    }

    @Override
    public double getTemp(double lat, double lng) {
        String city = getCity(lat, lng);
        return w.getTemp(city);
    }

    private String getCity(double lat, double lng) {
        return "Jeddah";
    }
}`,
            checks: [
              { type: 'contains', value: 'implements GeoWeather', msg: 'ينفذ GeoWeather' },
              { type: 'regex', value: 'private\\s+CityWeather', msg: 'field CityWeather' },
              { type: 'regex', value: 'GeoWeatherAdapter\\s*\\(\\s*CityWeather', msg: 'constructor يأخذ CityWeather' },
              { type: 'contains', value: 'w.getTemp', msg: 'استدعي w.getTemp(city)' }
            ]
          }
        ]
      }
    ]
  }

});
