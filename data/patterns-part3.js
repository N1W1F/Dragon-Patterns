// ============================================
// 🐉 DRAGON PATTERNS DATA - Part 3
// Decorator, Flyweight, Proxy
// ============================================

Object.assign(window.PATTERNS_DATA, {

  // ============ 6. DECORATOR ============
  decorator: {
    id: 'decorator',
    name: 'Decorator',
    nameAr: 'تنين الزينة',
    icon: '🎀',
    category: 'Structural',
    categoryAr: 'تركيبي',
    color: 'var(--p-decorator)',
    tagline: 'لُف الكائن بإضافات بدل ما تورث',
    shortDesc: 'يضيف مسؤوليات جديدة للكائن وقت التشغيل بدون تعديل كلاسه',

    intro: `<strong>Decorator</strong> بدل ما تورث (inheritance) عشان تضيف ميزة، تلف الكائن بـ wrapper يضيف الميزة. تقدر تلف الكائن بعدة decorators فوق بعض.
    <br><br>
    <strong>الأركان (أسلوب الدكتور - مثال Sandwich):</strong>
    <ol style="margin-right: 1.5rem; margin-top: 0.5rem;">
      <li><code>abstract base class</code> (Sandwich) فيه description + cost()</li>
      <li><code>Concrete components</code> (Chicken, Veggie) - الأشياء الأساسية</li>
      <li><code>abstract decorator</code> يـ <strong>extends</strong> الـ abstract base + فيه field من نوع الـ base</li>
      <li><code>Concrete decorators</code> (Mayonnaise, ChipotleSauce) يضيفون سعر/وصف</li>
    </ol>`,

    classes: [
      {
        name: 'Sandwich (abstract)',
        role: 'Component Base',
        roleAr: 'الكلاس الأساسي المشترك',
        desc: 'الكلاس الأب اللي كل الـ sandwiches والـ decorators يورثون منه. هذا يخلي الـ decorator نفسه يقدر يكون "ساندويتش".',
        methods: [
          {
            name: 'String description',
            purpose: 'الوصف اللي يتراكم مع كل decorator. كل decorator يضيف عليه.',
            code: 'String description = "Unknown Sandwich";'
          },
          {
            name: 'public abstract double cost()',
            purpose: 'abstract لأن كل sandwich/decorator يحسب السعر بطريقته. الـ decorator يضيف على cost الأصلي.',
            code: 'public abstract double cost();'
          }
        ],
        fullCode: `public abstract class Sandwich {
    String description = "Unknown Sandwich";

    public String getDescription() {
        return description;
    }

    public abstract double cost();
}`
      },
      {
        name: 'Chicken (Concrete)',
        role: 'Concrete Component',
        roleAr: 'الكائن الأساسي اللي راح يتلف',
        desc: 'الـ sandwich الفعلي. لما تضيف decorators، هذا اللي يكون في القلب.',
        methods: [
          {
            name: 'public Chicken()',
            purpose: 'يضع description = "Chicken Sandwich" ويعطي cost أساسي.',
            code: 'public Chicken() {\n    super.description = "Chicken Sandwich";\n}'
          },
          {
            name: 'public double cost()',
            purpose: 'يرجع السعر الأساسي. الـ decorators راح يضيفون عليه.',
            code: 'public double cost() {\n    return 3.99;\n}'
          }
        ],
        fullCode: `public class Chicken extends Sandwich {

    public Chicken() {
        super.description = "Chicken Sandwich";
    }

    public double cost() {
        return 3.99;
    }
}`
      },
      {
        name: 'CondimentDecorator (abstract)',
        role: 'Decorator Base',
        roleAr: '⭐⭐⭐ القلب - الـ Decorator الأساسي',
        desc: 'يرث Sandwich + يحتوي field من نوع Sandwich. هذا اللي يخلي الـ decorator يقدر يلف أي sandwich (سواء أصلي أو ملفوف).',
        methods: [
          {
            name: 'Sandwich sandwich',
            purpose: '⭐⭐⭐ Field يحفظ الـ sandwich اللي راح نلفه. لاحظ نوعه Sandwich (الأساس) عشان نقدر نلف أي شي يمتد من Sandwich.',
            code: 'Sandwich sandwich;'
          },
          {
            name: 'public abstract String getDescription()',
            purpose: 'abstract عشان كل decorator يضيف وصفه. مثلاً Mayonnaise يضيف ", Mayonnaise".',
            code: 'public abstract String getDescription();'
          }
        ],
        fullCode: `public abstract class CondimentDecorator extends Sandwich {
    Sandwich sandwich;

    public abstract String getDescription();
}`
      },
      {
        name: 'Mayonnaise (Concrete Decorator)',
        role: 'Concrete Decorator',
        roleAr: 'الإضافة الفعلية',
        desc: 'إضافة فعلية. يلف Sandwich + يضيف وصف وسعر.',
        methods: [
          {
            name: 'public Mayonnaise(Sandwich sandwich)',
            purpose: '⭐ يستقبل الـ sandwich اللي راح يلفه ويحفظه في الـ field. هذا الـ Wrapping.',
            code: 'public Mayonnaise(Sandwich sandwich) {\n    this.sandwich = sandwich;\n}'
          },
          {
            name: 'public String getDescription()',
            purpose: 'يرجع وصف الـ sandwich + ", Mayonnaise". هكذا يتراكم الوصف مع كل decorator.',
            code: 'public String getDescription() {\n    return sandwich.getDescription() + ", Mayonnaise";\n}'
          },
          {
            name: 'public double cost()',
            purpose: '⭐⭐⭐ يضيف سعره (0.10) + سعر الـ sandwich اللي تحت. لاحظ + sandwich.cost() - هذا اللي يخلي الأسعار تتراكم.',
            code: 'public double cost() {\n    return 0.10 + sandwich.cost();\n}'
          }
        ],
        fullCode: `public class Mayonnaise extends CondimentDecorator {

    public Mayonnaise(Sandwich sandwich) {
        this.sandwich = sandwich;
    }

    public String getDescription() {
        return sandwich.getDescription() + ", Mayonnaise";
    }

    public double cost() {
        return 0.10 + sandwich.cost();
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
        task: 'أكمل الفراغات في BlueCheese decorator.',
        files: [
          {
            name: 'BlueCheese.java',
            status: 'todo',
            starter: `public class BlueCheese extends CondimentDecorator {

    public BlueCheese(Sandwich sandwich) {
        this.sandwich = ___FILL_1___;
    }

    public String getDescription() {
        return sandwich.getDescription() + ", Blue Cheese";
    }

    public double cost() {
        return 0.50 + sandwich.___FILL_2___();
    }
}`,
            solution: `public class BlueCheese extends CondimentDecorator {

    public BlueCheese(Sandwich sandwich) {
        this.sandwich = sandwich;
    }

    public String getDescription() {
        return sandwich.getDescription() + ", Blue Cheese";
    }

    public double cost() {
        return 0.50 + sandwich.cost();
    }
}`,
            checks: [
              { type: 'contains', value: 'this.sandwich = sandwich', msg: 'احفظ sandwich في this.sandwich' },
              { type: 'contains', value: 'sandwich.cost()', msg: 'لازم تضيف على sandwich.cost()' }
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
        task: 'اكتب Milk decorator لقهوة. الـ base class Beverage جاهز.',
        files: [
          {
            name: 'Beverage.java',
            status: 'ok',
            readonly: true,
            starter: `public abstract class Beverage {
    String description = "Unknown Beverage";
    public String getDescription() { return description; }
    public abstract double cost();
}`
          },
          {
            name: 'CondimentDecorator.java',
            status: 'ok',
            readonly: true,
            starter: `public abstract class CondimentDecorator extends Beverage {
    Beverage beverage;
    public abstract String getDescription();
}`
          },
          {
            name: 'Milk.java',
            status: 'todo',
            starter: `// TODO: Milk extends CondimentDecorator
// يضيف ", Milk" للوصف وسعر 0.10`,
            solution: `public class Milk extends CondimentDecorator {

    public Milk(Beverage beverage) {
        this.beverage = beverage;
    }

    public String getDescription() {
        return beverage.getDescription() + ", Milk";
    }

    public double cost() {
        return 0.10 + beverage.cost();
    }
}`,
            checks: [
              { type: 'contains', value: 'extends CondimentDecorator', msg: 'extends CondimentDecorator' },
              { type: 'regex', value: 'Milk\\s*\\(\\s*Beverage', msg: 'constructor يأخذ Beverage' },
              { type: 'contains', value: 'this.beverage = beverage', msg: 'احفظ beverage' },
              { type: 'contains', value: 'beverage.getDescription()', msg: 'استخدم beverage.getDescription()' },
              { type: 'contains', value: 'beverage.cost()', msg: 'أضف على beverage.cost()' }
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
        task: 'اكتب نظام Pizza Decorator كامل: Pizza (abstract) + Margherita + ToppingDecorator (abstract) + CheeseTopping.',
        files: [
          {
            name: 'Pizza.java',
            status: 'todo',
            starter: `// TODO: abstract Pizza`,
            solution: `public abstract class Pizza {
    String description = "Plain Pizza";

    public String getDescription() {
        return description;
    }

    public abstract double cost();
}`,
            checks: [
              { type: 'contains', value: 'abstract class Pizza', msg: 'Pizza abstract' },
              { type: 'contains', value: 'getDescription', msg: 'method getDescription' },
              { type: 'contains', value: 'abstract double cost', msg: 'abstract cost()' }
            ]
          },
          {
            name: 'Margherita.java',
            status: 'todo',
            starter: `// TODO: Margherita extends Pizza, cost = 20`,
            solution: `public class Margherita extends Pizza {
    public Margherita() {
        description = "Margherita";
    }

    public double cost() {
        return 20.0;
    }
}`,
            checks: [
              { type: 'contains', value: 'extends Pizza', msg: 'extends Pizza' },
              { type: 'contains', value: 'description', msg: 'حدد description' },
              { type: 'contains', value: 'return 20', msg: 'cost يرجع 20' }
            ]
          },
          {
            name: 'ToppingDecorator.java',
            status: 'todo',
            starter: `// TODO: abstract ToppingDecorator extends Pizza`,
            solution: `public abstract class ToppingDecorator extends Pizza {
    Pizza pizza;

    public abstract String getDescription();
}`,
            checks: [
              { type: 'contains', value: 'abstract class ToppingDecorator', msg: 'abstract class' },
              { type: 'contains', value: 'extends Pizza', msg: 'extends Pizza' },
              { type: 'regex', value: 'Pizza\\s+pizza', msg: 'field Pizza pizza' },
              { type: 'contains', value: 'abstract String getDescription', msg: 'abstract getDescription' }
            ]
          },
          {
            name: 'CheeseTopping.java',
            status: 'todo',
            starter: `// TODO: CheeseTopping extends ToppingDecorator, يضيف 5.0`,
            solution: `public class CheeseTopping extends ToppingDecorator {

    public CheeseTopping(Pizza pizza) {
        this.pizza = pizza;
    }

    public String getDescription() {
        return pizza.getDescription() + ", Cheese";
    }

    public double cost() {
        return 5.0 + pizza.cost();
    }
}`,
            checks: [
              { type: 'contains', value: 'extends ToppingDecorator', msg: 'extends ToppingDecorator' },
              { type: 'regex', value: 'CheeseTopping\\s*\\(\\s*Pizza', msg: 'constructor يأخذ Pizza' },
              { type: 'contains', value: 'this.pizza = pizza', msg: 'احفظ pizza' },
              { type: 'contains', value: 'pizza.getDescription()', msg: 'استخدم pizza.getDescription' },
              { type: 'contains', value: 'pizza.cost()', msg: 'أضف على pizza.cost()' }
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
        task: 'سيناريو اختبار: Photo Sharing app. عندك Photo class، تحتاج تضيف "watermark" و "filter" كـ decorators.',
        files: [
          {
            name: 'Photo.java',
            status: 'todo',
            starter: `// TODO: abstract Photo فيه getDescription() و render()`,
            solution: `public abstract class Photo {
    String description = "Photo";

    public String getDescription() {
        return description;
    }

    public abstract void render();
}`,
            checks: [
              { type: 'contains', value: 'abstract class Photo', msg: 'Photo abstract' },
              { type: 'contains', value: 'getDescription', msg: 'getDescription' },
              { type: 'contains', value: 'abstract void render', msg: 'abstract render' }
            ]
          },
          {
            name: 'BasicPhoto.java',
            status: 'todo',
            starter: `// TODO: BasicPhoto extends Photo`,
            solution: `public class BasicPhoto extends Photo {
    public BasicPhoto() {
        description = "Basic Photo";
    }

    public void render() {
        System.out.println("Rendering " + description);
    }
}`,
            checks: [
              { type: 'contains', value: 'extends Photo', msg: 'extends Photo' },
              { type: 'contains', value: 'render', msg: 'ينفذ render' }
            ]
          },
          {
            name: 'PhotoDecorator.java',
            status: 'todo',
            starter: `// TODO: abstract PhotoDecorator`,
            solution: `public abstract class PhotoDecorator extends Photo {
    Photo photo;

    public abstract String getDescription();
}`,
            checks: [
              { type: 'contains', value: 'abstract class PhotoDecorator', msg: 'abstract' },
              { type: 'contains', value: 'extends Photo', msg: 'extends Photo' },
              { type: 'regex', value: 'Photo\\s+photo', msg: 'field Photo photo' }
            ]
          },
          {
            name: 'WatermarkDecorator.java',
            status: 'todo',
            starter: `// TODO: WatermarkDecorator يلف Photo ويضيف "Watermark"`,
            solution: `public class WatermarkDecorator extends PhotoDecorator {

    public WatermarkDecorator(Photo photo) {
        this.photo = photo;
    }

    public String getDescription() {
        return photo.getDescription() + ", Watermark";
    }

    public void render() {
        photo.render();
        System.out.println("Adding watermark");
    }
}`,
            checks: [
              { type: 'contains', value: 'extends PhotoDecorator', msg: 'extends PhotoDecorator' },
              { type: 'regex', value: 'WatermarkDecorator\\s*\\(\\s*Photo', msg: 'constructor(Photo)' },
              { type: 'contains', value: 'this.photo = photo', msg: 'احفظ photo' },
              { type: 'contains', value: 'photo.getDescription()', msg: 'photo.getDescription()' }
            ]
          }
        ]
      }
    ]
  },

  // ============ 7. FLYWEIGHT ============
  flyweight: {
    id: 'flyweight',
    name: 'Flyweight',
    nameAr: 'تنين الذاكرة',
    icon: '🪶',
    category: 'Structural',
    categoryAr: 'تركيبي',
    color: 'var(--p-flyweight)',
    tagline: 'وفّر الذاكرة بمشاركة الحالة المشتركة',
    shortDesc: 'يقلل استهلاك الذاكرة بمشاركة بيانات مشتركة بين عدة كائنات',

    intro: `<strong>Flyweight</strong> لما عندك آلاف الكائنات المتشابهة، بدل ما تحفظ كل بياناتها لكل كائن، تشارك الجزء المشترك (intrinsic) بين الكل.
    <br><br>
    <strong>الأركان (مثال الدكتور - glyph):</strong>
    <ol style="margin-right: 1.5rem; margin-top: 0.5rem;">
      <li><code>Flyweight class</code> (glyph) فيه intrinsic state - الجزء المشترك</li>
      <li><code>Factory</code> فيه <code>HashMap</code> يخزن flyweights الموجودة</li>
      <li>الـ Factory يفحص: لو موجود يرجع نفسه، لو لا ينشئ ويحفظ</li>
    </ol>
    <br>
    <strong>مثال:</strong> 1000 حرف في نص، بس 26 حرف فريد. بدل 1000 object نسوي 26 وكل حرف يشاور على واحد.`,

    classes: [
      {
        name: 'glyph (Flyweight)',
        role: 'Flyweight Class',
        roleAr: 'الكلاس المشترك - يحتوي البيانات المشتركة',
        desc: 'يحتوي الـ intrinsic state (الجزء المشترك). عدة كائنات راح تشاور على نفس الـ glyph.',
        methods: [
          {
            name: 'private char c',
            purpose: '⭐ الـ intrinsic state - البيانات المشتركة. كل glyph يمثل حرف واحد. الحرف "a" نفسه راح يشاور عليه كل الـ "a" في النص.',
            code: 'private char c;'
          },
          {
            name: 'public glyph(char c)',
            purpose: 'الـ constructor يأخذ الحرف. لاحظ: ما نسوي new glyph من برّا - الـ Factory هو اللي ينشئها.',
            code: 'public glyph(char c) {\n    this.c = c;\n}'
          }
        ],
        fullCode: `package flyweightExample;

public class glyph {

    private char c;

    public glyph(char c) {
        this.c = c;
    }

    public String myPosition(int position) {
        return "" + position + " " + this.c + ": " + this;
    }

    public String toString() {
        return "glyph<" + this.c + ">";
    }
}`
      },
      {
        name: 'characterFactory',
        role: 'Flyweight Factory',
        roleAr: '⭐⭐⭐ القلب - يدير الـ flyweights',
        desc: 'يحفظ كل الـ flyweights في HashMap. لما تطلب glyph، يفحص أولاً إذا موجود، يرجعه. لو لا، ينشئ ويحفظ.',
        methods: [
          {
            name: 'private Map<Character, glyph> flyweights',
            purpose: '⭐ الـ HashMap اللي يخزن الـ flyweights. المفتاح Character والقيمة glyph. هذا اللي يضمن إن كل حرف له glyph واحد فقط.',
            code: 'private Map<Character, glyph> flyweights = new HashMap<>();'
          },
          {
            name: 'public glyph getFlyweight(char c)',
            purpose: '⭐⭐⭐ القلب الفعلي. يفحص إذا الحرف موجود في الـ map: لو نعم يرجعه (المشاركة!) لو لا ينشئ جديد ويحفظه.',
            code: 'public glyph getFlyweight(char c) {\n    Character key = Character.valueOf(c);\n    if (flyweights.containsKey(key)) {\n        return flyweights.get(key);\n    } else {\n        glyph g = new glyph(c);\n        flyweights.put(key, g);\n        return g;\n    }\n}'
          }
        ],
        fullCode: `package flyweightExample;

import java.util.Map;
import java.util.HashMap;

public class characterFactory {

    private Map<Character, glyph> flyweights = new HashMap<Character, glyph>();

    public glyph getFlyweight(char c) {
        Character key = Character.valueOf(c);
        if (flyweights.containsKey(key)) {
            return flyweights.get(key);
        } else {
            glyph g = new glyph(c);
            flyweights.put(key, g);
            return g;
        }
    }

    public int numberOfFlyweights() {
        return flyweights.size();
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
        task: 'أكمل الفراغات في characterFactory.',
        files: [
          {
            name: 'characterFactory.java',
            status: 'todo',
            starter: `import java.util.Map;
import java.util.HashMap;

public class characterFactory {
    private Map<Character, glyph> flyweights = new HashMap<>();

    public glyph getFlyweight(char c) {
        Character key = Character.valueOf(c);
        if (flyweights.___FILL_1___(key)) {
            return flyweights.get(key);
        } else {
            glyph g = new glyph(c);
            flyweights.___FILL_2___(key, g);
            return ___FILL_3___;
        }
    }
}`,
            solution: `import java.util.Map;
import java.util.HashMap;

public class characterFactory {
    private Map<Character, glyph> flyweights = new HashMap<>();

    public glyph getFlyweight(char c) {
        Character key = Character.valueOf(c);
        if (flyweights.containsKey(key)) {
            return flyweights.get(key);
        } else {
            glyph g = new glyph(c);
            flyweights.put(key, g);
            return g;
        }
    }
}`,
            checks: [
              { type: 'contains', value: 'containsKey', msg: 'استخدم containsKey للفحص' },
              { type: 'contains', value: 'flyweights.put', msg: 'استخدم put لإضافة جديد' },
              { type: 'regex', value: 'return\\s+g\\s*;', msg: 'ارجع الـ glyph الجديد' }
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
        task: 'اكتب ColorFactory: يحفظ Color objects ويعيد استخدامها.',
        files: [
          {
            name: 'Color.java',
            status: 'ok',
            readonly: true,
            starter: `public class Color {
    private String hex;
    public Color(String hex) { this.hex = hex; }
    public String getHex() { return hex; }
}`
          },
          {
            name: 'ColorFactory.java',
            status: 'todo',
            starter: `import java.util.Map;
import java.util.HashMap;

public class ColorFactory {
    // TODO: HashMap<String, Color> + method getColor(String hex)
}`,
            solution: `import java.util.Map;
import java.util.HashMap;

public class ColorFactory {
    private Map<String, Color> colors = new HashMap<>();

    public Color getColor(String hex) {
        if (colors.containsKey(hex)) {
            return colors.get(hex);
        } else {
            Color c = new Color(hex);
            colors.put(hex, c);
            return c;
        }
    }
}`,
            checks: [
              { type: 'regex', value: 'Map<String,\\s*Color>|HashMap<String,\\s*Color>', msg: 'HashMap<String, Color>' },
              { type: 'contains', value: 'containsKey', msg: 'استخدم containsKey' },
              { type: 'contains', value: 'put', msg: 'استخدم put' },
              { type: 'contains', value: 'new Color', msg: 'أنشئ Color جديد عند الحاجة' }
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
        task: 'اكتب نظام Tree Flyweight كامل: TreeType (flyweight) + TreeFactory.',
        files: [
          {
            name: 'TreeType.java',
            status: 'todo',
            starter: `// TODO: TreeType فيه name و color`,
            solution: `public class TreeType {
    private String name;
    private String color;

    public TreeType(String name, String color) {
        this.name = name;
        this.color = color;
    }

    public void draw(int x, int y) {
        System.out.println("Drawing " + name + " (" + color + ") at " + x + "," + y);
    }
}`,
            checks: [
              { type: 'regex', value: 'private\\s+String\\s+name', msg: 'field name' },
              { type: 'regex', value: 'private\\s+String\\s+color', msg: 'field color' },
              { type: 'regex', value: 'TreeType\\s*\\(\\s*String\\s+\\w+\\s*,\\s*String', msg: 'constructor يأخذ name+color' }
            ]
          },
          {
            name: 'TreeFactory.java',
            status: 'todo',
            starter: `import java.util.Map;
import java.util.HashMap;

// TODO: TreeFactory فيه getTreeType(name, color)
// المفتاح يكون name + "-" + color`,
            solution: `import java.util.Map;
import java.util.HashMap;

public class TreeFactory {
    private Map<String, TreeType> trees = new HashMap<>();

    public TreeType getTreeType(String name, String color) {
        String key = name + "-" + color;
        if (trees.containsKey(key)) {
            return trees.get(key);
        } else {
            TreeType t = new TreeType(name, color);
            trees.put(key, t);
            return t;
        }
    }
}`,
            checks: [
              { type: 'regex', value: 'Map<String,\\s*TreeType>|HashMap<String,\\s*TreeType>', msg: 'HashMap<String, TreeType>' },
              { type: 'contains', value: 'containsKey', msg: 'استخدم containsKey' },
              { type: 'contains', value: 'put', msg: 'استخدم put' },
              { type: 'contains', value: 'new TreeType', msg: 'أنشئ TreeType جديد عند الحاجة' }
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
        task: 'اكتب نظام كامل: Particle (flyweight يحفظ texture+color) + ParticleFactory + Bullet (context فيه x, y).',
        files: [
          {
            name: 'Particle.java',
            status: 'todo',
            starter: `// TODO: Particle (flyweight) فيه texture و color (intrinsic state)`,
            solution: `public class Particle {
    private String texture;
    private String color;

    public Particle(String texture, String color) {
        this.texture = texture;
        this.color = color;
    }

    public void draw(int x, int y) {
        System.out.println("Drawing particle " + texture + " " + color + " at " + x + "," + y);
    }

    public String getTexture() { return texture; }
    public String getColor() { return color; }
}`,
            checks: [
              { type: 'regex', value: 'private\\s+String\\s+texture', msg: 'field texture' },
              { type: 'regex', value: 'private\\s+String\\s+color', msg: 'field color' }
            ]
          },
          {
            name: 'ParticleFactory.java',
            status: 'todo',
            starter: `import java.util.Map;
import java.util.HashMap;

// TODO: ParticleFactory فيه getParticle(texture, color)`,
            solution: `import java.util.Map;
import java.util.HashMap;

public class ParticleFactory {
    private Map<String, Particle> particles = new HashMap<>();

    public Particle getParticle(String texture, String color) {
        String key = texture + "-" + color;
        if (particles.containsKey(key)) {
            return particles.get(key);
        } else {
            Particle p = new Particle(texture, color);
            particles.put(key, p);
            return p;
        }
    }
}`,
            checks: [
              { type: 'contains', value: 'HashMap', msg: 'استخدم HashMap' },
              { type: 'contains', value: 'containsKey', msg: 'check containsKey' },
              { type: 'contains', value: 'new Particle', msg: 'أنشئ Particle جديد عند الحاجة' }
            ]
          },
          {
            name: 'Bullet.java',
            status: 'todo',
            starter: `// TODO: Bullet (context) فيه x, y (extrinsic) + reference للـ Particle`,
            solution: `public class Bullet {
    private int x, y;
    private Particle particle;

    public Bullet(int x, int y, Particle particle) {
        this.x = x;
        this.y = y;
        this.particle = particle;
    }

    public void draw() {
        particle.draw(x, y);
    }
}`,
            checks: [
              { type: 'regex', value: 'private\\s+int\\s+x', msg: 'field int x' },
              { type: 'regex', value: 'private\\s+int\\s+y', msg: 'field int y' },
              { type: 'regex', value: 'private\\s+Particle', msg: 'field Particle' },
              { type: 'contains', value: 'particle.draw', msg: 'استخدم particle.draw(x, y)' }
            ]
          }
        ]
      }
    ]
  },

  // ============ 8. PROXY ============
  proxy: {
    id: 'proxy',
    name: 'Proxy',
    nameAr: 'تنين البوابة',
    icon: '🛡️',
    category: 'Structural',
    categoryAr: 'تركيبي',
    color: 'var(--p-proxy)',
    tagline: 'حارس بين الكلاينت والكائن الحقيقي',
    shortDesc: 'يوفر بديل أو placeholder للكائن للتحكم بالوصول له',

    intro: `<strong>Proxy</strong> كائن وسيط يتحكم بالوصول للكائن الحقيقي. ممكن للتأخير (lazy)، الكاش، أو التحقق من الصلاحيات.
    <br><br>
    <strong>الأركان (مثال الدكتور - Weather):</strong>
    <ol style="margin-right: 1.5rem; margin-top: 0.5rem;">
      <li><code>Service interface</code> (WeatherService)</li>
      <li><code>RealService</code> (RealWeatherService) - العمل الحقيقي</li>
      <li><code>Proxy</code> ينفذ نفس الـ interface + يحفظ reference للـ real + يضيف check قبل التفويض</li>
    </ol>
    <br>
    <strong>الفرق بين Proxy و Decorator:</strong> Proxy يتحكم بالوصول، Decorator يضيف وظائف.`,

    classes: [
      {
        name: 'WeatherService (interface)',
        role: 'Service Interface',
        roleAr: 'الواجهة المشتركة',
        desc: 'الـ interface اللي ينفذه كل من الـ Real والـ Proxy. هذا اللي يخلي الكلاينت ما يفرق بينهم.',
        methods: [
          {
            name: 'String getWeather(String city)',
            purpose: 'الواجهة المشتركة. الكلاينت يستدعي هذي بدون ما يعرف هل اللي شغال proxy أو real.',
            code: 'String getWeather(String city);'
          }
        ],
        fullCode: `public interface WeatherService {
    String getWeather(String city);
}`
      },
      {
        name: 'RealWeatherService',
        role: 'Real Service',
        roleAr: 'الكائن الحقيقي - يسوي الشغل',
        desc: 'يسوي العمل الحقيقي (يضرب API). بطيء وثقيل.',
        methods: [
          {
            name: 'public String getWeather(String city)',
            purpose: 'ينفذ العمل الفعلي - يضرب API ويرجع الطقس. هذا اللي الـ Proxy راح يلفه.',
            code: 'public String getWeather(String city) {\n    // Hitting an API\n    return "The weather for " + city + " is: high: 42";\n}'
          }
        ],
        fullCode: `public class RealWeatherService implements WeatherService {
    @Override
    public String getWeather(String city) {
        return "The weather for " + city + " is: high: 42";
    }
}`
      },
      {
        name: 'WeatherServiceProxy',
        role: 'Proxy',
        roleAr: '⭐⭐⭐ الحارس - يفحص قبل التفويض',
        desc: 'ينفذ نفس الـ interface + يحفظ reference للـ Real + يضيف التحقق من API key قبل التفويض.',
        methods: [
          {
            name: 'private final WeatherService realWeatherService',
            purpose: '⭐ يحفظ reference للـ Real. هذا اللي راح يفوض له الشغل بعد التحقق.',
            code: 'private final WeatherService realWeatherService;\nprivate final String apiKey;'
          },
          {
            name: 'public String getWeather(String city)',
            purpose: '⭐⭐⭐ القلب. أولاً يفحص API key، لو صحيح يفوض للـ Real، لو غلط يرجع null. هذا التحكم بالوصول.',
            code: 'public String getWeather(String city) {\n    if (this.apiKey == SECRET_API_KEY) {\n        return realWeatherService.getWeather(city);\n    }\n    System.err.println("Unauthorized");\n    return null;\n}'
          }
        ],
        fullCode: `public class WeatherServiceProxy implements WeatherService {

    private final WeatherService realWeatherService;
    private final String apiKey;

    private static final String SECRET_API_KEY = "secret-api-key";

    public WeatherServiceProxy(WeatherService realWeatherService, String apiKey) {
        this.realWeatherService = realWeatherService;
        this.apiKey = apiKey;
    }

    @Override
    public String getWeather(String city) {
        if (this.apiKey == SECRET_API_KEY) {
            return realWeatherService.getWeather(city);
        }
        System.err.println("ERROR: Unauthorized. INVALID API KEY.");
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
        task: 'أكمل الفراغات في WeatherServiceProxy.',
        files: [
          {
            name: 'WeatherServiceProxy.java',
            status: 'todo',
            starter: `public class WeatherServiceProxy implements WeatherService {
    private final WeatherService realWeatherService;
    private final String apiKey;
    private static final String SECRET_API_KEY = "secret-api-key";

    public WeatherServiceProxy(WeatherService realWeatherService, String apiKey) {
        this.realWeatherService = ___FILL_1___;
        this.apiKey = apiKey;
    }

    @Override
    public String getWeather(String city) {
        if (this.apiKey == SECRET_API_KEY) {
            return ___FILL_2___.getWeather(city);
        }
        return null;
    }
}`,
            solution: `public class WeatherServiceProxy implements WeatherService {
    private final WeatherService realWeatherService;
    private final String apiKey;
    private static final String SECRET_API_KEY = "secret-api-key";

    public WeatherServiceProxy(WeatherService realWeatherService, String apiKey) {
        this.realWeatherService = realWeatherService;
        this.apiKey = apiKey;
    }

    @Override
    public String getWeather(String city) {
        if (this.apiKey == SECRET_API_KEY) {
            return realWeatherService.getWeather(city);
        }
        return null;
    }
}`,
            checks: [
              { type: 'contains', value: 'this.realWeatherService = realWeatherService', msg: 'احفظ realWeatherService' },
              { type: 'contains', value: 'realWeatherService.getWeather', msg: 'استدعي realWeatherService.getWeather' }
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
        task: 'اكتب Cache Proxy للـ Image: يحفظ الصور في HashMap بدل ما يحملها كل مرة.',
        files: [
          {
            name: 'Image.java',
            status: 'ok',
            readonly: true,
            starter: `public interface Image {
    String load(String name);
}`
          },
          {
            name: 'RealImage.java',
            status: 'ok',
            readonly: true,
            starter: `public class RealImage implements Image {
    @Override
    public String load(String name) {
        System.out.println("Loading " + name + " from disk");
        return name + ".jpg";
    }
}`
          },
          {
            name: 'ImageCacheProxy.java',
            status: 'todo',
            starter: `import java.util.HashMap;
import java.util.Map;

// TODO: ImageCacheProxy ينفذ Image
// إذا الصورة في الـ cache، يرجعها. لو لا، يحملها ويحفظها`,
            solution: `import java.util.HashMap;
import java.util.Map;

public class ImageCacheProxy implements Image {
    private final Image realImage;
    private Map<String, String> cache = new HashMap<>();

    public ImageCacheProxy(Image realImage) {
        this.realImage = realImage;
    }

    @Override
    public String load(String name) {
        if (cache.containsKey(name)) {
            System.out.println("From cache");
            return cache.get(name);
        }
        String result = realImage.load(name);
        cache.put(name, result);
        return result;
    }
}`,
            checks: [
              { type: 'contains', value: 'implements Image', msg: 'implements Image' },
              { type: 'regex', value: 'private\\s+.*Image\\s+realImage', msg: 'field realImage' },
              { type: 'contains', value: 'HashMap', msg: 'استخدم HashMap للـ cache' },
              { type: 'contains', value: 'containsKey', msg: 'افحص containsKey' },
              { type: 'contains', value: 'realImage.load', msg: 'استدعي realImage.load' }
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
        task: 'اكتب نظام Database Access Proxy: يفحص لو user "admin" يسمح بـ DELETE، لو لا يرفض.',
        files: [
          {
            name: 'Database.java',
            status: 'todo',
            starter: `// TODO: interface Database فيه query(String sql)`,
            solution: `public interface Database {
    void query(String sql);
}`,
            checks: [
              { type: 'regex', value: 'interface\\s+Database', msg: 'interface Database' },
              { type: 'contains', value: 'query', msg: 'method query' }
            ]
          },
          {
            name: 'RealDatabase.java',
            status: 'todo',
            starter: `// TODO: implements Database`,
            solution: `public class RealDatabase implements Database {
    @Override
    public void query(String sql) {
        System.out.println("Executing: " + sql);
    }
}`,
            checks: [
              { type: 'contains', value: 'implements Database', msg: 'implements Database' }
            ]
          },
          {
            name: 'DatabaseProxy.java',
            status: 'todo',
            starter: `// TODO: Proxy يفحص الـ role قبل ما يفوض
// لو الـ query تبدأ بـ DELETE ولـ role != "admin" -> رفض`,
            solution: `public class DatabaseProxy implements Database {
    private final Database realDatabase;
    private final String userRole;

    public DatabaseProxy(Database db, String role) {
        this.realDatabase = db;
        this.userRole = role;
    }

    @Override
    public void query(String sql) {
        if (sql.startsWith("DELETE") && !userRole.equals("admin")) {
            System.err.println("ERROR: Only admin can delete.");
            return;
        }
        realDatabase.query(sql);
    }
}`,
            checks: [
              { type: 'contains', value: 'implements Database', msg: 'implements Database' },
              { type: 'regex', value: 'private\\s+.*Database\\s+realDatabase', msg: 'field realDatabase' },
              { type: 'regex', value: 'String\\s+userRole', msg: 'field userRole' },
              { type: 'contains', value: 'startsWith("DELETE")', msg: 'افحص DELETE' },
              { type: 'contains', value: 'realDatabase.query', msg: 'فوّض للـ realDatabase' }
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
        task: 'اكتب YouTubeCacheProxy كامل (مثال الدكتور): إذا الفيديو في الـ cache يرجعه، لو لا ينزله ويحفظه.',
        files: [
          {
            name: 'Video.java',
            status: 'ok',
            readonly: true,
            starter: `public class Video {
    public String id;
    public String title;
    public Video(String id, String title) {
        this.id = id; this.title = title;
    }
}`
          },
          {
            name: 'YouTubeLib.java',
            status: 'todo',
            starter: `// TODO: interface YouTubeLib فيه getVideo(String id) ترجع Video`,
            solution: `public interface YouTubeLib {
    Video getVideo(String id);
}`,
            checks: [
              { type: 'regex', value: 'interface\\s+YouTubeLib', msg: 'interface YouTubeLib' },
              { type: 'contains', value: 'getVideo', msg: 'method getVideo' }
            ]
          },
          {
            name: 'RealYouTubeLib.java',
            status: 'todo',
            starter: `// TODO: implementation حقيقية`,
            solution: `public class RealYouTubeLib implements YouTubeLib {
    @Override
    public Video getVideo(String id) {
        System.out.println("Downloading video " + id);
        return new Video(id, "Title for " + id);
    }
}`,
            checks: [
              { type: 'contains', value: 'implements YouTubeLib', msg: 'implements YouTubeLib' },
              { type: 'contains', value: 'new Video', msg: 'ينشئ Video' }
            ]
          },
          {
            name: 'YouTubeCacheProxy.java',
            status: 'todo',
            starter: `import java.util.HashMap;
// TODO: Proxy يستخدم cache + يفوض للـ real إذا الفيديو مو موجود`,
            solution: `import java.util.HashMap;
import java.util.Map;

public class YouTubeCacheProxy implements YouTubeLib {
    private YouTubeLib youtubeService;
    private Map<String, Video> cache = new HashMap<>();

    public YouTubeCacheProxy() {
        this.youtubeService = new RealYouTubeLib();
    }

    @Override
    public Video getVideo(String id) {
        Video video = cache.get(id);
        if (video == null) {
            video = youtubeService.getVideo(id);
            cache.put(id, video);
        } else {
            System.out.println("Retrieved video '" + id + "' from cache.");
        }
        return video;
    }
}`,
            checks: [
              { type: 'contains', value: 'implements YouTubeLib', msg: 'implements YouTubeLib' },
              { type: 'contains', value: 'HashMap', msg: 'استخدم HashMap' },
              { type: 'contains', value: 'youtubeService.getVideo', msg: 'فوّض للـ real' },
              { type: 'contains', value: 'cache.put', msg: 'احفظ في الـ cache' }
            ]
          }
        ]
      }
    ]
  }

});
