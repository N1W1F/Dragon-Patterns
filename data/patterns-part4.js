// ============================================
// 🐉 DRAGON PATTERNS DATA - Part 4
// Observer, Strategy
// ============================================

Object.assign(window.PATTERNS_DATA, {

  // ============ 9. OBSERVER ============
  observer: {
    id: 'observer',
    name: 'Observer',
    nameAr: 'تنين المراقبين',
    icon: '👁️',
    category: 'Behavioral',
    categoryAr: 'سلوكي',
    color: 'var(--p-observer)',
    tagline: 'اشترك واستقبل إشعارات تلقائياً',
    shortDesc: 'يبلغ عدة كائنات تلقائياً لما يصير تغيير في كائن واحد',

    intro: `<strong>Observer</strong> Subject واحد (publisher) عنده عدة Observers (subscribers). لما يتغير حال الـ Subject، يبلغ كل الـ Observers تلقائياً.
    <br><br>
    <strong>الأركان (مثال الدكتور - Message Subject):</strong>
    <ol style="margin-right: 1.5rem; margin-top: 0.5rem;">
      <li><code>Observer interface</code> فيه <code>update(message)</code></li>
      <li><code>Concrete Observers</code> (Facebook, Email, WhatsApp) - كل واحد ينفذ update</li>
      <li><code>Subject interface</code> فيه <code>subscribe / unsubscribe / notifyUpdate</code></li>
      <li><code>Concrete Subject</code> يحفظ <code>List&lt;Observer&gt;</code> ويبلغهم</li>
    </ol>`,

    classes: [
      {
        name: 'Observer (interface)',
        role: 'Observer Interface',
        roleAr: 'واجهة المراقب',
        desc: 'كل observer ينفذ هذي الواجهة. عنده method واحدة update() اللي تتنادى لما يصير تغيير.',
        methods: [
          {
            name: 'public void update(String m)',
            purpose: 'الـ method اللي راح يستدعيها الـ Subject لما يصير تغيير. كل observer ينفذها بطريقته.',
            code: 'public void update(String m);'
          }
        ],
        fullCode: `package observers;

public interface Observer {
    public void update(String m);
}`
      },
      {
        name: 'FacebookObserver',
        role: 'Concrete Observer',
        roleAr: 'مراقب فعلي - يستقبل التحديثات',
        desc: 'مثال على observer فعلي. ينفذ update() بطريقته (مثلاً ينشر على facebook).',
        methods: [
          {
            name: 'public void update(String message)',
            purpose: 'هنا الـ observer ينفذ ما يبيه لما يستقبل التحديث. كل observer يسوي شي مختلف.',
            code: '@Override\npublic void update(String message) {\n    System.out.println("Facebook Observer :: " + message);\n}'
          }
        ],
        fullCode: `package observers;

public class FacebookObserver implements Observer {
    @Override
    public void update(String message) {
        System.out.println("Facebook Observer :: " + message);
    }
}

public class EmailObserver implements Observer {
    @Override
    public void update(String message) {
        System.out.println("Email Observer :: " + message);
    }
}

public class WhatsappObserver implements Observer {
    @Override
    public void update(String message) {
        System.out.println("Whatsapp Observer :: " + message);
    }
}`
      },
      {
        name: 'Subject (interface)',
        role: 'Subject Interface',
        roleAr: 'واجهة الناشر',
        desc: 'الواجهة اللي تحدد قدرات الـ Subject: الاشتراك، إلغاء الاشتراك، والإشعار.',
        methods: [
          {
            name: 'subscribe(Observer o)',
            purpose: 'يضيف observer للقائمة. الـ Subject راح يبلغه لما يصير تحديث.',
            code: 'public void subscribe(Observer o);'
          },
          {
            name: 'unsubscribe(Observer o)',
            purpose: 'يحذف observer من القائمة. ما راح يستقبل تحديثات بعدها.',
            code: 'public void unsubscribe(Observer o);'
          },
          {
            name: 'notifyUpdate(String m)',
            purpose: 'يبلغ كل الـ observers بالتحديث الجديد. هذا اللي يفعّل update() عند كل واحد.',
            code: 'public void notifyUpdate(String m);'
          }
        ],
        fullCode: `package subjects;

import observers.Observer;

public interface Subject {
    public void subscribe(Observer o);
    public void unsubscribe(Observer o);
    public void notifyUpdate(String m);
}`
      },
      {
        name: 'MessageSubject',
        role: 'Concrete Subject',
        roleAr: '⭐⭐⭐ القلب - الناشر الفعلي',
        desc: 'ينفذ Subject. يحفظ List من Observers ويبلغهم لما يصير تحديث.',
        methods: [
          {
            name: 'private List<Observer> observers',
            purpose: '⭐ القائمة اللي تخزن كل المشتركين. ArrayList مرنة - تكبر وتصغر تلقائياً.',
            code: 'private List<Observer> observers = new ArrayList<>();'
          },
          {
            name: 'public void subscribe(Observer o)',
            purpose: 'يضيف observer للقائمة. observers.add(o) واحد سطر فقط.',
            code: '@Override\npublic void subscribe(Observer o) {\n    observers.add(o);\n}'
          },
          {
            name: 'public void notifyUpdate(String m)',
            purpose: '⭐⭐⭐ القلب الحقيقي. يلف على كل الـ observers ويستدعي update() عند كل واحد.',
            code: '@Override\npublic void notifyUpdate(String m) {\n    for (Observer o : observers) {\n        o.update(m);\n    }\n}'
          }
        ],
        fullCode: `package subjects;

import java.util.ArrayList;
import java.util.List;
import observers.Observer;

public class MessageSubject implements Subject {

    private List<Observer> observers = new ArrayList<>();

    @Override
    public void subscribe(Observer o) {
        observers.add(o);
    }

    @Override
    public void unsubscribe(Observer o) {
        observers.remove(o);
    }

    @Override
    public void notifyUpdate(String m) {
        for (Observer o : observers) {
            o.update(m);
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
        task: 'أكمل الفراغات في MessageSubject.',
        files: [
          {
            name: 'MessageSubject.java',
            status: 'todo',
            starter: `import java.util.ArrayList;
import java.util.List;

public class MessageSubject implements Subject {
    private List<Observer> observers = new ArrayList<>();

    @Override
    public void subscribe(Observer o) {
        observers.___FILL_1___(o);
    }

    @Override
    public void unsubscribe(Observer o) {
        observers.___FILL_2___(o);
    }

    @Override
    public void notifyUpdate(String m) {
        for (Observer o : observers) {
            o.___FILL_3___(m);
        }
    }
}`,
            solution: `import java.util.ArrayList;
import java.util.List;

public class MessageSubject implements Subject {
    private List<Observer> observers = new ArrayList<>();

    @Override
    public void subscribe(Observer o) {
        observers.add(o);
    }

    @Override
    public void unsubscribe(Observer o) {
        observers.remove(o);
    }

    @Override
    public void notifyUpdate(String m) {
        for (Observer o : observers) {
            o.update(m);
        }
    }
}`,
            checks: [
              { type: 'contains', value: 'observers.add', msg: 'subscribe يستخدم add' },
              { type: 'contains', value: 'observers.remove', msg: 'unsubscribe يستخدم remove' },
              { type: 'contains', value: 'o.update', msg: 'notifyUpdate يستدعي o.update' }
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
        task: 'اكتب TwitterObserver و SlackObserver. الـ interface Observer جاهز.',
        files: [
          {
            name: 'Observer.java',
            status: 'ok',
            readonly: true,
            starter: `public interface Observer {
    public void update(String message);
}`
          },
          {
            name: 'TwitterObserver.java',
            status: 'todo',
            starter: `// TODO: ينفذ Observer ويطبع "Twitter Observer :: <message>"`,
            solution: `public class TwitterObserver implements Observer {
    @Override
    public void update(String message) {
        System.out.println("Twitter Observer :: " + message);
    }
}`,
            checks: [
              { type: 'contains', value: 'implements Observer', msg: 'implements Observer' },
              { type: 'contains', value: '@Override', msg: 'استخدم @Override' },
              { type: 'contains', value: 'Twitter Observer', msg: 'اطبع رسالة Twitter Observer' }
            ]
          },
          {
            name: 'SlackObserver.java',
            status: 'todo',
            starter: `// TODO: ينفذ Observer ويطبع "Slack Observer :: <message>"`,
            solution: `public class SlackObserver implements Observer {
    @Override
    public void update(String message) {
        System.out.println("Slack Observer :: " + message);
    }
}`,
            checks: [
              { type: 'contains', value: 'implements Observer', msg: 'implements Observer' },
              { type: 'contains', value: 'Slack Observer', msg: 'اطبع رسالة Slack Observer' }
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
        task: 'اكتب نظام Stock Price كامل: PriceObserver + Stock + StockTracker (concrete).',
        files: [
          {
            name: 'PriceObserver.java',
            status: 'todo',
            starter: `// TODO: interface PriceObserver فيه update(double price)`,
            solution: `public interface PriceObserver {
    void update(double price);
}`,
            checks: [
              { type: 'regex', value: 'interface\\s+PriceObserver', msg: 'interface PriceObserver' },
              { type: 'regex', value: 'update\\s*\\(\\s*double', msg: 'update(double price)' }
            ]
          },
          {
            name: 'Stock.java',
            status: 'todo',
            starter: `// TODO: interface Stock فيه subscribe, unsubscribe, notifyUpdate`,
            solution: `public interface Stock {
    void subscribe(PriceObserver o);
    void unsubscribe(PriceObserver o);
    void notifyUpdate(double price);
}`,
            checks: [
              { type: 'regex', value: 'interface\\s+Stock', msg: 'interface Stock' },
              { type: 'contains', value: 'subscribe', msg: 'method subscribe' },
              { type: 'contains', value: 'unsubscribe', msg: 'method unsubscribe' },
              { type: 'contains', value: 'notifyUpdate', msg: 'method notifyUpdate' }
            ]
          },
          {
            name: 'StockTracker.java',
            status: 'todo',
            starter: `import java.util.ArrayList;
import java.util.List;

// TODO: implements Stock + List<PriceObserver>`,
            solution: `import java.util.ArrayList;
import java.util.List;

public class StockTracker implements Stock {
    private List<PriceObserver> observers = new ArrayList<>();

    @Override
    public void subscribe(PriceObserver o) {
        observers.add(o);
    }

    @Override
    public void unsubscribe(PriceObserver o) {
        observers.remove(o);
    }

    @Override
    public void notifyUpdate(double price) {
        for (PriceObserver o : observers) {
            o.update(price);
        }
    }
}`,
            checks: [
              { type: 'contains', value: 'implements Stock', msg: 'implements Stock' },
              { type: 'regex', value: 'List<PriceObserver>', msg: 'List<PriceObserver>' },
              { type: 'contains', value: 'observers.add', msg: 'subscribe يستخدم add' },
              { type: 'contains', value: 'observers.remove', msg: 'unsubscribe يستخدم remove' },
              { type: 'contains', value: 'o.update(price)', msg: 'notifyUpdate يستدعي o.update(price)' }
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
        task: 'سيناريو اختبار حقيقي 🔥: TweetWatcher - يراقب tweets وله 3 subscribers (Twitter, WhatsApp, Slack). اكتب النظام كامل.',
        files: [
          {
            name: 'Subscriber.java',
            status: 'todo',
            starter: `// TODO: interface Subscriber فيه notify(String tweet)`,
            solution: `public interface Subscriber {
    void update(String tweet);
}`,
            checks: [
              { type: 'regex', value: 'interface\\s+Subscriber', msg: 'interface Subscriber' },
              { type: 'contains', value: 'update', msg: 'method update' }
            ]
          },
          {
            name: 'TwitterSubscriber.java',
            status: 'todo',
            starter: `// TODO: implements Subscriber`,
            solution: `public class TwitterSubscriber implements Subscriber {
    @Override
    public void update(String tweet) {
        System.out.println("Twitter notification: " + tweet);
    }
}`,
            checks: [
              { type: 'contains', value: 'implements Subscriber', msg: 'implements Subscriber' },
              { type: 'contains', value: 'Twitter', msg: 'اطبع Twitter' }
            ]
          },
          {
            name: 'TweetWatcher.java',
            status: 'todo',
            starter: `import java.util.ArrayList;
import java.util.List;

// TODO: TweetWatcher يراقب keyword
// فيه: subscribe / unsubscribe / postTweet(tweet) ينبه الكل`,
            solution: `import java.util.ArrayList;
import java.util.List;

public class TweetWatcher {
    private List<Subscriber> subscribers = new ArrayList<>();
    private String keyword;

    public TweetWatcher(String keyword) {
        this.keyword = keyword;
    }

    public void subscribe(Subscriber s) {
        subscribers.add(s);
    }

    public void unsubscribe(Subscriber s) {
        subscribers.remove(s);
    }

    public void postTweet(String tweet) {
        if (tweet.contains(keyword)) {
            for (Subscriber s : subscribers) {
                s.update(tweet);
            }
        }
    }
}`,
            checks: [
              { type: 'regex', value: 'List<Subscriber>', msg: 'List<Subscriber>' },
              { type: 'regex', value: 'subscribe\\s*\\(\\s*Subscriber', msg: 'subscribe(Subscriber)' },
              { type: 'regex', value: 'unsubscribe\\s*\\(\\s*Subscriber', msg: 'unsubscribe(Subscriber)' },
              { type: 'contains', value: 'subscribers.add', msg: 'استخدم add' },
              { type: 'contains', value: 'subscribers.remove', msg: 'استخدم remove' },
              { type: 'regex', value: 's\\.update|s\\.notify', msg: 'استدعي update/notify على الـ subscriber' }
            ]
          }
        ]
      }
    ]
  },

  // ============ 10. STRATEGY ============
  strategy: {
    id: 'strategy',
    name: 'Strategy',
    nameAr: 'تنين الحيل',
    icon: '⚔️',
    category: 'Behavioral',
    categoryAr: 'سلوكي',
    color: 'var(--p-strategy)',
    tagline: 'بدّل الخوارزمية في وقت التشغيل',
    shortDesc: 'يعرّف عائلة من الخوارزميات ويخليها قابلة للتبديل',

    intro: `<strong>Strategy</strong> بدل ما تكتب if-else طويل لكل طريقة دفع/خوارزمية، تسوي interface وكل طريقة class مستقل. الـ Context يستقبل الـ strategy وقت الاستخدام.
    <br><br>
    <strong>الأركان (مثال الدكتور - Payment):</strong>
    <ol style="margin-right: 1.5rem; margin-top: 0.5rem;">
      <li><code>Strategy interface</code> (Payment) فيه method الخوارزمية</li>
      <li><code>Concrete Strategies</code> (CreditCardPayment, PayPalPayment) كل واحد ينفذ بطريقته</li>
      <li><code>Context</code> (ShoppingCart) يأخذ Strategy كـ parameter في method checkout</li>
    </ol>`,

    classes: [
      {
        name: 'Payment (interface)',
        role: 'Strategy Interface',
        roleAr: 'الواجهة المشتركة للخوارزميات',
        desc: 'الواجهة اللي كل طريقة دفع تنفذها. هذا اللي يخلي الـ Context يستقبل أي طريقة.',
        methods: [
          {
            name: 'void pay(double amount)',
            purpose: 'الـ method الخوارزمية. كل طريقة دفع تنفذها بشكل مختلف.',
            code: 'void pay(double amount);'
          }
        ],
        fullCode: `package paymentsStrategy;

public interface Payment {
    void pay(double amount);
}`
      },
      {
        name: 'CreditCardPayment',
        role: 'Concrete Strategy',
        roleAr: 'خوارزمية فعلية',
        desc: 'طريقة دفع فعلية. تحفظ بيانات البطاقة وتنفذ pay() بطريقتها.',
        methods: [
          {
            name: 'constructor',
            purpose: 'يأخذ بيانات البطاقة (اسم، رقم، CVV) ويحفظها.',
            code: 'public CreditCardPayment(String name, String cardNumber, String cvv) {\n    this.name = name;\n    this.cardNumber = cardNumber;\n    this.cvv = cvv;\n}'
          },
          {
            name: 'public void pay(double amount)',
            purpose: 'ينفذ الدفع بطريقة البطاقة. الكلاينت ما يحتاج يعرف التفاصيل.',
            code: '@Override\npublic void pay(double amount) {\n    System.out.println(amount + " paid with credit card.");\n}'
          }
        ],
        fullCode: `package paymentsStrategy;

public class CreditCardPayment implements Payment {
    private String name;
    private String cardNumber;
    private String cvv;

    public CreditCardPayment(String name, String cardNumber, String cvv) {
        this.name = name;
        this.cardNumber = cardNumber;
        this.cvv = cvv;
    }

    @Override
    public void pay(double amount) {
        System.out.println(amount + " paid with credit card.");
    }
}

public class PayPalPayment implements Payment {
    private String email;

    public PayPalPayment(String email) {
        this.email = email;
    }

    @Override
    public void pay(double amount) {
        System.out.println(amount + " paid using Paypal.");
    }
}`
      },
      {
        name: 'ShoppingCart (Context)',
        role: 'Context',
        roleAr: '⭐⭐⭐ السياق - يستخدم Strategy',
        desc: 'يدير المنتجات ويستقبل Strategy وقت checkout. لاحظ: ما يخزن Strategy بشكل دائم - يأخذها كـ parameter.',
        methods: [
          {
            name: 'public void addItem(Product product)',
            purpose: 'يضيف منتج للسلة.',
            code: 'public void addItem(Product product) {\n    this.products.add(product);\n}'
          },
          {
            name: 'public void checkout(Payment paymentMethod)',
            purpose: '⭐⭐⭐ النقطة المهمة! يستقبل Payment كـ parameter (مو يخزنها). هذا يخلي العميل يقدر يختار طريقة دفع مختلفة في كل عملية.',
            code: 'public void checkout(Payment paymentMethod) {\n    double amount = calculateTotal();\n    paymentMethod.pay(amount);\n}'
          }
        ],
        fullCode: `package shopping;

import paymentsStrategy.Payment;
import java.util.ArrayList;
import java.util.List;

public class ShoppingCart {

    List<Product> products;

    public ShoppingCart() {
        this.products = new ArrayList<Product>();
    }

    public void addItem(Product product) {
        this.products.add(product);
    }

    public double calculateTotal() {
        double sum = 0;
        for (Product product : this.products) {
            sum += product.getPrice();
        }
        return sum;
    }

    public void checkout(Payment paymentMethod) {
        double amount = calculateTotal();
        paymentMethod.pay(amount);
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
        task: 'أكمل الفراغات في PayPalPayment.',
        files: [
          {
            name: 'PayPalPayment.java',
            status: 'todo',
            starter: `public class PayPalPayment ___FILL_1___ Payment {
    private String email;

    public PayPalPayment(String email) {
        this.email = email;
    }

    @Override
    public void pay(double amount) {
        System.out.println(amount + " paid using ___FILL_2___.");
    }
}`,
            solution: `public class PayPalPayment implements Payment {
    private String email;

    public PayPalPayment(String email) {
        this.email = email;
    }

    @Override
    public void pay(double amount) {
        System.out.println(amount + " paid using Paypal.");
    }
}`,
            checks: [
              { type: 'contains', value: 'implements Payment', msg: 'implements Payment' },
              { type: 'contains', value: 'Paypal', msg: 'اطبع Paypal' }
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
        task: 'أكمل ShoppingCart بحيث يستخدم Strategy. الـ Payment interface جاهز.',
        files: [
          {
            name: 'Payment.java',
            status: 'ok',
            readonly: true,
            starter: `public interface Payment {
    void pay(double amount);
}`
          },
          {
            name: 'ShoppingCart.java',
            status: 'todo',
            starter: `import java.util.ArrayList;
import java.util.List;

public class ShoppingCart {
    private List<Double> prices = new ArrayList<>();

    public void addItem(double price) {
        prices.add(price);
    }

    public double calculateTotal() {
        double sum = 0;
        for (double p : prices) sum += p;
        return sum;
    }

    // TODO: method checkout تأخذ Payment وتدفع الـ total
}`,
            solution: `import java.util.ArrayList;
import java.util.List;

public class ShoppingCart {
    private List<Double> prices = new ArrayList<>();

    public void addItem(double price) {
        prices.add(price);
    }

    public double calculateTotal() {
        double sum = 0;
        for (double p : prices) sum += p;
        return sum;
    }

    public void checkout(Payment paymentMethod) {
        double amount = calculateTotal();
        paymentMethod.pay(amount);
    }
}`,
            checks: [
              { type: 'regex', value: 'checkout\\s*\\(\\s*Payment', msg: 'checkout يأخذ Payment كـ parameter' },
              { type: 'contains', value: 'calculateTotal()', msg: 'استخدم calculateTotal' },
              { type: 'regex', value: 'paymentMethod\\.pay|payment\\.pay', msg: 'استدعي pay على الـ payment method' }
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
        task: 'اكتب نظام Sorting Strategy كامل: SortStrategy + BubbleSort + QuickSort + Sorter (context).',
        files: [
          {
            name: 'SortStrategy.java',
            status: 'todo',
            starter: `// TODO: interface SortStrategy فيه int[] sort(int[] arr)`,
            solution: `public interface SortStrategy {
    int[] sort(int[] arr);
}`,
            checks: [
              { type: 'regex', value: 'interface\\s+SortStrategy', msg: 'interface SortStrategy' },
              { type: 'contains', value: 'int[] sort', msg: 'method sort ترجع int[]' }
            ]
          },
          {
            name: 'BubbleSort.java',
            status: 'todo',
            starter: `// TODO: implements SortStrategy`,
            solution: `public class BubbleSort implements SortStrategy {
    @Override
    public int[] sort(int[] arr) {
        System.out.println("Using Bubble Sort");
        return arr;
    }
}`,
            checks: [
              { type: 'contains', value: 'implements SortStrategy', msg: 'implements SortStrategy' },
              { type: 'contains', value: 'Bubble', msg: 'اطبع Bubble Sort' }
            ]
          },
          {
            name: 'QuickSort.java',
            status: 'todo',
            starter: `// TODO: implements SortStrategy`,
            solution: `public class QuickSort implements SortStrategy {
    @Override
    public int[] sort(int[] arr) {
        System.out.println("Using Quick Sort");
        return arr;
    }
}`,
            checks: [
              { type: 'contains', value: 'implements SortStrategy', msg: 'implements SortStrategy' },
              { type: 'contains', value: 'Quick', msg: 'اطبع Quick Sort' }
            ]
          },
          {
            name: 'Sorter.java',
            status: 'todo',
            starter: `// TODO: Sorter (context) فيه method doSort يأخذ array + strategy`,
            solution: `public class Sorter {
    public int[] doSort(int[] arr, SortStrategy strategy) {
        return strategy.sort(arr);
    }
}`,
            checks: [
              { type: 'regex', value: 'doSort\\s*\\(\\s*int\\[\\]\\s+\\w+\\s*,\\s*SortStrategy', msg: 'doSort(int[] arr, SortStrategy)' },
              { type: 'contains', value: 'strategy.sort', msg: 'استدعي strategy.sort' }
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
        task: 'سيناريو اختبار 🔥: Photo Sharing app. اكتب Shareable interface + 4 طرق مشاركة (Bluetooth, Gmail, Messages, Whatsapp) + Photo (context).',
        files: [
          {
            name: 'Shareable.java',
            status: 'todo',
            starter: `// TODO: interface Shareable فيه share(String photo)`,
            solution: `public interface Shareable {
    void share(String photo);
}`,
            checks: [
              { type: 'regex', value: 'interface\\s+Shareable', msg: 'interface Shareable' },
              { type: 'contains', value: 'share', msg: 'method share' }
            ]
          },
          {
            name: 'Bluetooth.java',
            status: 'todo',
            starter: `// TODO: implements Shareable`,
            solution: `public class Bluetooth implements Shareable {
    @Override
    public void share(String photo) {
        System.out.println("Sharing " + photo + " via Bluetooth");
    }
}`,
            checks: [
              { type: 'contains', value: 'implements Shareable', msg: 'implements Shareable' },
              { type: 'contains', value: 'Bluetooth', msg: 'اطبع Bluetooth' }
            ]
          },
          {
            name: 'Whatsapp.java',
            status: 'todo',
            starter: `// TODO: implements Shareable`,
            solution: `public class Whatsapp implements Shareable {
    @Override
    public void share(String photo) {
        System.out.println("Sharing " + photo + " via Whatsapp");
    }
}`,
            checks: [
              { type: 'contains', value: 'implements Shareable', msg: 'implements Shareable' },
              { type: 'contains', value: 'Whatsapp', msg: 'اطبع Whatsapp' }
            ]
          },
          {
            name: 'Photo.java',
            status: 'todo',
            starter: `// TODO: Photo (context) فيه filename + method sharePhoto(Shareable)`,
            solution: `public class Photo {
    private String filename;

    public Photo(String filename) {
        this.filename = filename;
    }

    public void sharePhoto(Shareable sharingMethod) {
        sharingMethod.share(filename);
    }
}`,
            checks: [
              { type: 'regex', value: 'private\\s+String\\s+filename', msg: 'field filename' },
              { type: 'regex', value: 'sharePhoto\\s*\\(\\s*Shareable', msg: 'sharePhoto يأخذ Shareable' },
              { type: 'contains', value: '.share(filename)', msg: 'استدعي share(filename)' }
            ]
          }
        ]
      }
    ]
  }

});

// ترتيب الـ patterns للعرض
window.PATTERN_ORDER = [
  'singleton', 'prototype', 'builder', 'factory', 'adapter',
  'decorator', 'flyweight', 'proxy', 'observer', 'strategy'
];
