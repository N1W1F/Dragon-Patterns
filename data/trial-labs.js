// ============================================
// 🐉 DRAGON TRIAL - 10 Lab Scenarios for Mock Exam
// Each lab is a complete exam-style question
// ============================================

window.TRIAL_LABS = [

  // ==================== LAB 1: Singleton - ThreadPool ====================
  {
    id: 'lab-singleton-threadpool',
    pattern: 'singleton',
    patternName: 'Singleton',
    title: 'Lab: ThreadPool Manager',
    scenario: `لديك تطبيق ينشئ ThreadPool متعدد عشان معالجة المهام بشكل متوازي. المشكلة: في الكود الحالي، الـ Main ينشئ ThreadPool object مرتين باستخدام <code>new MyThreadPool()</code>، وهذا يهدر الموارد لأن كل ThreadPool عنده 5 threads جديدة.`,
    task: `<strong>المطلوب:</strong> طبق <strong>Singleton</strong> على كلاس MyThreadPool. هذا يضمن وجود pool واحد فقط في التطبيق كله.
    <br><br>
    <strong>الاختبار الموجود (للمرجع):</strong>
    <code>assertEquals(MyThreadPool.getInstance(), MyThreadPool.getInstance())</code>`,
    starterFiles: [
      {
        name: 'MyThreadPool.java',
        status: 'todo',
        starter: `package sa.edu.kau.fcit.cpit252;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class MyThreadPool {
    private ExecutorService executorService;
    private final int THREAD_POOL_SIZE = 5;

    public MyThreadPool() {
        this.executorService = Executors.newFixedThreadPool(THREAD_POOL_SIZE);
    }

    public ExecutorService getThreadPoolExecutor() {
        return this.executorService;
    }
}`,
        solution: `package sa.edu.kau.fcit.cpit252;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class MyThreadPool {
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
          { type: 'regex', value: 'private\\s+static\\s+MyThreadPool\\s+uniqueInstance', msg: 'private static MyThreadPool uniqueInstance' },
          { type: 'regex', value: 'private\\s+MyThreadPool\\s*\\(\\s*\\)', msg: 'private constructor' },
          { type: 'regex', value: 'public\\s+static\\s+MyThreadPool\\s+getInstance', msg: 'public static MyThreadPool getInstance()' },
          { type: 'contains', value: 'uniqueInstance == null', msg: 'check للـ null' },
          { type: 'contains', value: 'new MyThreadPool()', msg: 'أنشئ instance لما يكون null' }
        ]
      },
      {
        name: 'App.java',
        status: 'todo',
        starter: `package sa.edu.kau.fcit.cpit252;

public class App {
    public static void main(String[] args) {
        // TODO: استخدم getInstance() بدل new
        MyThreadPool pool1 = ___;
        MyThreadPool pool2 = ___;
        // Both pool1 and pool2 should be the SAME instance!
    }
}`,
        solution: `package sa.edu.kau.fcit.cpit252;

public class App {
    public static void main(String[] args) {
        MyThreadPool pool1 = MyThreadPool.getInstance();
        MyThreadPool pool2 = MyThreadPool.getInstance();
    }
}`,
        checks: [
          { type: 'contains', value: 'MyThreadPool.getInstance()', msg: 'استخدم getInstance() بدل new' },
          { type: 'not_contains', value: 'new MyThreadPool', msg: '⚠️ لا تستخدم new MyThreadPool() نهائياً' }
        ]
      }
    ],
    solutionSteps: [
      {
        title: '1. تحديد الـ Pattern',
        content: 'الـ assertEquals يطلب إن الـ instance نفسها = signal واضح لـ Singleton. الفكرة: نسخة واحدة فقط في التطبيق.'
      },
      {
        title: '2. إضافة Static Field',
        content: 'أضف <code>private static MyThreadPool uniqueInstance;</code> في الأعلى. هذا الـ field يحفظ النسخة الوحيدة.'
      },
      {
        title: '3. تغيير Constructor لـ private',
        content: 'حول <code>public MyThreadPool()</code> إلى <code>private MyThreadPool()</code>. هذا يمنع <code>new MyThreadPool()</code> من خارج الكلاس.'
      },
      {
        title: '4. إضافة getInstance()',
        content: 'أضف method ساكنة <code>public static MyThreadPool getInstance()</code> تفحص إذا uniqueInstance == null تنشئ نسخة جديدة، وإلا ترجع الموجودة.'
      },
      {
        title: '5. تعديل الـ Main',
        content: 'استبدل <code>new MyThreadPool()</code> بـ <code>MyThreadPool.getInstance()</code>. هذا اللي يضمن نفس النسخة.'
      }
    ]
  },

  // ==================== LAB 2: Builder - VirtualMachine ====================
  {
    id: 'lab-builder-vm',
    pattern: 'builder',
    patternName: 'Builder',
    title: 'Lab: VirtualMachine Configuration',
    scenario: `كلاس VirtualMachine لتطبيق إدارة سحابية. عنده 9 خصائص إجبارية و7 اختيارية. الكود الحالي فيه 8 constructors متعددة (telescoping constructor) قبيحة جداً. ولما تنشئ VM بـ ports و tags بدون optional آخر، تضطر تمرر null أكثر من 5 مرات.`,
    task: `<strong>المطلوب:</strong> طبق <strong>Builder pattern</strong>:
    <br>• <strong>Required:</strong> cloudProvider, region, az, imageId
    <br>• <strong>Optional:</strong> ports, privateIP, tags
    <br><br>
    <strong>الاختبار المطلوب:</strong>
    <pre style="background: rgba(0,0,0,0.3); padding: 0.5rem; border-radius: 4px; font-size: 0.85rem; margin-top: 0.5rem;">VirtualMachine vm = new VirtualMachine.Builder("AWS", "us-east", "az-1", "img-1")
    .withPorts(new String[]{"80", "443"})
    .withTags(new String[]{"prod"})
    .build();</pre>`,
    starterFiles: [
      {
        name: 'VirtualMachine.java',
        status: 'todo',
        starter: `package sa.edu.kau.fcit.cpit252;

public class VirtualMachine {
    private String cloudProvider;
    private String region;
    private String az;
    private String imageId;
    private String[] ports;
    private String privateIP;
    private String[] tags;

    // الـ constructors المتعددة (telescoping) هنا قبيحة!
    // TODO: استبدلها بـ Builder pattern

    // متطلبات:
    // 1) private constructor يأخذ Builder
    // 2) public static class Builder
    // 3) Builder constructor يأخذ الـ 4 required
    // 4) methods withPorts(), withPrivateIP(), withTags() ترجع Builder
    // 5) method build() ترجع VirtualMachine
}`,
        solution: `package sa.edu.kau.fcit.cpit252;

public class VirtualMachine {
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
          { type: 'regex', value: 'private\\s+VirtualMachine\\s*\\(\\s*Builder', msg: 'private VirtualMachine(Builder)' },
          { type: 'regex', value: 'public\\s+static\\s+class\\s+Builder', msg: 'public static class Builder' },
          { type: 'regex', value: 'Builder\\s*\\([^)]*String[^)]*String[^)]*String[^)]*String', msg: 'Builder constructor يأخذ 4 strings (required)' },
          { type: 'contains', value: 'withPorts', msg: 'method withPorts' },
          { type: 'contains', value: 'withPrivateIP', msg: 'method withPrivateIP' },
          { type: 'contains', value: 'withTags', msg: 'method withTags' },
          { type: 'regex', value: 'return\\s+this', msg: 'withX ترجع this' },
          { type: 'contains', value: 'new VirtualMachine(this)', msg: 'build() ترجع new VirtualMachine(this)' }
        ]
      }
    ],
    solutionSteps: [
      {
        title: '1. تحديد الـ Pattern',
        content: 'مؤشرات Builder: خصائص كثيرة + بعضها optional + telescoping constructors قبيحة + الاختبار يستخدم .withX().build() = Builder بدون شك.'
      },
      {
        title: '2. تغيير Constructor للـ Class الأساسي',
        content: 'احذف كل الـ constructors المتعددة. أضف بدالها واحد فقط: <code>private VirtualMachine(Builder builder)</code> يستقبل الـ Builder وينسخ منه القيم.'
      },
      {
        title: '3. إنشاء Inner Static Class',
        content: 'داخل الكلاس، أضف <code>public static class Builder</code>. تذكر: <strong>static</strong> ضرورية!'
      },
      {
        title: '4. Builder Constructor',
        content: 'في الـ Builder، أضف constructor يأخذ الـ 4 required (cloudProvider, region, az, imageId).'
      },
      {
        title: '5. Optional Methods',
        content: 'أضف <code>withPorts()</code>, <code>withPrivateIP()</code>, <code>withTags()</code>. كل واحدة تحفظ القيمة في الـ field وترجع <strong>this</strong> (للـ method chaining).'
      },
      {
        title: '6. Method build()',
        content: 'أضف <code>public VirtualMachine build() { return new VirtualMachine(this); }</code>. هذي اللي تنشئ الكائن النهائي.'
      }
    ]
  },

  // ==================== LAB 3: Strategy - Photo Sharing ====================
  {
    id: 'lab-strategy-photo',
    pattern: 'strategy',
    patternName: 'Strategy',
    title: 'Lab: Photo Sharing App',
    scenario: `تطبيق Photo Sharing فيه كلاس Photo، والمستخدم يقدر يشارك الصور بطرق مختلفة (Bluetooth, Gmail, Messages, Whatsapp). الكود الحالي فيه if-else طويل داخل كلاس Photo يفحص نوع المشاركة، وهذا يكسر مبدأ Open/Closed (لما تضيف طريقة مشاركة جديدة، تعدل كلاس Photo).`,
    task: `<strong>المطلوب:</strong> طبق <strong>Strategy pattern</strong> بحيث:
    <br>• كل طريقة مشاركة في class مستقل
    <br>• Photo (Context) يأخذ Shareable كـ parameter في method <code>sharePhoto()</code>
    <br>• الاستخدام: <code>photo.sharePhoto(new Whatsapp())</code>`,
    starterFiles: [
      {
        name: 'Shareable.java',
        status: 'todo',
        starter: `// TODO: interface فيه method share(String filename)`,
        solution: `public interface Shareable {
    void share(String filename);
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
    public void share(String filename) {
        System.out.println("Sharing " + filename + " via Bluetooth");
    }
}`,
        checks: [
          { type: 'contains', value: 'implements Shareable', msg: 'implements Shareable' },
          { type: 'contains', value: 'Bluetooth', msg: 'اطبع Bluetooth' }
        ]
      },
      {
        name: 'Gmail.java',
        status: 'todo',
        starter: `// TODO: implements Shareable`,
        solution: `public class Gmail implements Shareable {
    @Override
    public void share(String filename) {
        System.out.println("Sharing " + filename + " via Gmail");
    }
}`,
        checks: [
          { type: 'contains', value: 'implements Shareable', msg: 'implements Shareable' },
          { type: 'contains', value: 'Gmail', msg: 'اطبع Gmail' }
        ]
      },
      {
        name: 'Whatsapp.java',
        status: 'todo',
        starter: `// TODO: implements Shareable`,
        solution: `public class Whatsapp implements Shareable {
    @Override
    public void share(String filename) {
        System.out.println("Sharing " + filename + " via Whatsapp");
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
        starter: `// TODO: Photo (context) فيه filename
// method sharePhoto(Shareable) يستدعي share على الـ strategy`,
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
          { type: 'regex', value: 'sharePhoto\\s*\\(\\s*Shareable', msg: 'sharePhoto(Shareable)' },
          { type: 'regex', value: '\\.share\\s*\\(\\s*filename', msg: 'استدعي share(filename)' }
        ]
      }
    ],
    solutionSteps: [
      {
        title: '1. تحديد الـ Pattern',
        content: 'مؤشرات Strategy: عدة طرق لنفس العملية + الاختيار وقت التشغيل + كلاسات مختلفة تنفذ نفس العملية = Strategy.'
      },
      {
        title: '2. إنشاء Strategy Interface',
        content: 'أنشئ <code>interface Shareable</code> فيه method واحدة: <code>void share(String filename)</code>. هذا العقد المشترك.'
      },
      {
        title: '3. Concrete Strategies',
        content: 'لكل طريقة مشاركة، أنشئ class ينفذ Shareable: Bluetooth, Gmail, Messages, Whatsapp. كل واحد ينفذ share() بطريقته.'
      },
      {
        title: '4. Context Class',
        content: 'كلاس Photo (الـ Context) يحفظ filename + يحتوي method <code>sharePhoto(Shareable sharingMethod)</code>. لاحظ: الـ Photo ما يخزن Shareable كـ field، بل يأخذها كـ parameter.'
      },
      {
        title: '5. الاستخدام',
        content: '<code>new Photo("vacation.jpg").sharePhoto(new Whatsapp());</code> - الكلاينت يختار الـ strategy وقت الاستخدام.'
      }
    ]
  },

  // ==================== LAB 4: Observer - TweetWatcher ====================
  {
    id: 'lab-observer-tweet',
    pattern: 'observer',
    patternName: 'Observer',
    title: 'Lab: Tweet Watcher',
    scenario: `تطبيق TweetWatcher يراقب التغريدات اللي تحتوي على keyword معين (مثل "Sale"). لما تجي تغريدة بالـ keyword، التطبيق يبلغ عدة منصات: Twitter, WhatsApp, Slack. التحدي: المنصات تتغير وتزيد مع الوقت، وما نبي نعدل كلاس TweetWatcher كل مرة.`,
    task: `<strong>المطلوب:</strong> طبق <strong>Observer pattern</strong>:
    <br>• interface <code>Subscriber</code> فيه <code>update(String tweet)</code>
    <br>• 3 subscribers: TwitterSubscriber, WhatsappSubscriber, SlackSubscriber
    <br>• TweetWatcher (Subject) يدير المشتركين ويبلغهم
    <br>• <code>postTweet(String)</code> يفحص لو فيه keyword، يبلغ الكل`,
    starterFiles: [
      {
        name: 'Subscriber.java',
        status: 'todo',
        starter: `// TODO: interface Subscriber فيه update(String tweet)`,
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
        name: 'WhatsappSubscriber.java',
        status: 'todo',
        starter: `// TODO: implements Subscriber`,
        solution: `public class WhatsappSubscriber implements Subscriber {
    @Override
    public void update(String tweet) {
        System.out.println("WhatsApp notification: " + tweet);
    }
}`,
        checks: [
          { type: 'contains', value: 'implements Subscriber', msg: 'implements Subscriber' },
          { type: 'contains', value: 'WhatsApp', msg: 'اطبع WhatsApp' }
        ]
      },
      {
        name: 'TweetWatcher.java',
        status: 'todo',
        starter: `import java.util.ArrayList;
import java.util.List;

// TODO: TweetWatcher يحفظ keyword + List<Subscriber>
// methods: subscribe, unsubscribe, postTweet`,
        solution: `import java.util.ArrayList;
import java.util.List;

public class TweetWatcher {
    private String keyword;
    private List<Subscriber> subscribers = new ArrayList<>();

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
          { type: 'regex', value: 'String\\s+keyword', msg: 'field keyword' },
          { type: 'regex', value: 'subscribe\\s*\\(\\s*Subscriber', msg: 'subscribe(Subscriber)' },
          { type: 'regex', value: 'unsubscribe\\s*\\(\\s*Subscriber', msg: 'unsubscribe(Subscriber)' },
          { type: 'contains', value: 'subscribers.add', msg: 'add في subscribe' },
          { type: 'contains', value: 'subscribers.remove', msg: 'remove في unsubscribe' },
          { type: 'contains', value: '.contains(keyword)', msg: 'فحص لو الـ tweet فيه keyword' },
          { type: 'regex', value: 's\\.update\\(', msg: 'استدعي s.update' }
        ]
      }
    ],
    solutionSteps: [
      {
        title: '1. تحديد الـ Pattern',
        content: 'مؤشرات Observer: subscribe/unsubscribe/notify + One-to-many + المشتركين يتغيرون = Observer بدون شك.'
      },
      {
        title: '2. Observer Interface',
        content: 'أنشئ <code>interface Subscriber</code> فيه <code>void update(String tweet)</code>. هذا اللي كل المشتركين ينفذونه.'
      },
      {
        title: '3. Concrete Observers',
        content: 'لكل منصة، أنشئ class ينفذ Subscriber: TwitterSubscriber, WhatsappSubscriber, SlackSubscriber. كل واحد ينفذ update() بطريقته.'
      },
      {
        title: '4. Subject Class',
        content: 'TweetWatcher يحفظ <code>List&lt;Subscriber&gt;</code> + keyword. أضف subscribe (add) و unsubscribe (remove).'
      },
      {
        title: '5. notifyUpdate Logic',
        content: 'في <code>postTweet()</code>، افحص <code>tweet.contains(keyword)</code>. لو نعم، استخدم for loop لاستدعاء <code>s.update(tweet)</code> على كل subscriber.'
      }
    ]
  },

  // ==================== LAB 5: Factory - Notification ====================
  {
    id: 'lab-factory-notification',
    pattern: 'factory',
    patternName: 'Factory',
    title: 'Lab: Notification System',
    scenario: `تطبيق فيه نظام إشعارات يدعم 3 أنواع: Email, SMS, Push. الكود الحالي مليان <code>if-else</code> ويسوي <code>new EmailNotification()</code> في أماكن متفرقة. هذا يصعّب إضافة أنواع جديدة (مثل Slack) ويسبب تكرار.`,
    task: `<strong>المطلوب:</strong> طبق <strong>Factory pattern</strong>:
    <br>• <code>Notification</code> interface فيه <code>send(String msg)</code>
    <br>• Concrete classes: EmailNotification, SMSNotification, PushNotification
    <br>• <code>NotificationFactory</code> فيها <code>getNotification(String type)</code>
    <br><br>
    <strong>الاستخدام:</strong> <code>Notification n = factory.getNotification("email"); n.send("Hello");</code>`,
    starterFiles: [
      {
        name: 'Notification.java',
        status: 'todo',
        starter: `// TODO: interface فيها send(String msg)`,
        solution: `public interface Notification {
    void send(String msg);
}`,
        checks: [
          { type: 'regex', value: 'interface\\s+Notification', msg: 'interface Notification' },
          { type: 'contains', value: 'send', msg: 'method send' }
        ]
      },
      {
        name: 'EmailNotification.java',
        status: 'todo',
        starter: `// TODO: implements Notification`,
        solution: `public class EmailNotification implements Notification {
    @Override
    public void send(String msg) {
        System.out.println("Email: " + msg);
    }
}`,
        checks: [
          { type: 'contains', value: 'implements Notification', msg: 'implements Notification' },
          { type: 'contains', value: 'Email', msg: 'اطبع Email' }
        ]
      },
      {
        name: 'SMSNotification.java',
        status: 'todo',
        starter: `// TODO: implements Notification`,
        solution: `public class SMSNotification implements Notification {
    @Override
    public void send(String msg) {
        System.out.println("SMS: " + msg);
    }
}`,
        checks: [
          { type: 'contains', value: 'implements Notification', msg: 'implements Notification' },
          { type: 'contains', value: 'SMS', msg: 'اطبع SMS' }
        ]
      },
      {
        name: 'PushNotification.java',
        status: 'todo',
        starter: `// TODO: implements Notification`,
        solution: `public class PushNotification implements Notification {
    @Override
    public void send(String msg) {
        System.out.println("Push: " + msg);
    }
}`,
        checks: [
          { type: 'contains', value: 'implements Notification', msg: 'implements Notification' },
          { type: 'contains', value: 'Push', msg: 'اطبع Push' }
        ]
      },
      {
        name: 'NotificationFactory.java',
        status: 'todo',
        starter: `// TODO: getNotification(String type) تدعم: email, sms, push`,
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
          { type: 'regex', value: 'public\\s+Notification\\s+getNotification', msg: 'getNotification ترجع Notification' },
          { type: 'contains', value: 'equalsIgnoreCase', msg: 'استخدم equalsIgnoreCase' },
          { type: 'contains', value: 'new EmailNotification', msg: 'دعم email' },
          { type: 'contains', value: 'new SMSNotification', msg: 'دعم sms' },
          { type: 'contains', value: 'new PushNotification', msg: 'دعم push' }
        ]
      }
    ],
    solutionSteps: [
      {
        title: '1. تحديد الـ Pattern',
        content: 'مؤشرات Factory: عدة أنواع لنفس interface + المستخدم يحدد النوع بـ string + إخفاء التعقيد = Factory.'
      },
      {
        title: '2. Common Interface',
        content: 'أنشئ <code>interface Notification</code> فيه method واحدة <code>send(String msg)</code>. كل الأنواع راح تورث منها.'
      },
      {
        title: '3. Concrete Products',
        content: 'لكل نوع، class مستقل ينفذ Notification: EmailNotification, SMSNotification, PushNotification.'
      },
      {
        title: '4. Factory Class',
        content: 'كلاس <code>NotificationFactory</code> فيه method <code>getNotification(String type)</code>. تستخدم <strong>equalsIgnoreCase</strong> للمقارنة.'
      },
      {
        title: '5. تحقق من null',
        content: 'في بداية getNotification، افحص <code>if (type == null) return null;</code>. وفي النهاية، لو ما طابقت أي شي، ارجع null.'
      }
    ]
  },

  // ==================== LAB 6: Decorator - Coffee Order ====================
  {
    id: 'lab-decorator-coffee',
    pattern: 'decorator',
    patternName: 'Decorator',
    title: 'Lab: Coffee Shop Order System',
    scenario: `مقهى ستار باكس يحتاج نظام لحساب أسعار المشروبات. عنده مشروبات أساسية (Espresso, HouseBlend) وإضافات (Milk, Mocha, Whip). المشكلة: الإضافات تكون عدة فوق بعض، وكل واحدة لها سعر مختلف. ما نبي نسوي class لكل combination محتمل.`,
    task: `<strong>المطلوب:</strong> طبق <strong>Decorator pattern</strong>:
    <br>• <code>Beverage</code> (abstract) فيه description + cost()
    <br>• Concrete drinks: Espresso ($1.99), HouseBlend ($0.89)
    <br>• <code>CondimentDecorator</code> abstract يلف Beverage
    <br>• Decorators: Milk ($0.10), Mocha ($0.20), Whip ($0.10)
    <br><br>
    <strong>الاستخدام:</strong> <code>Beverage b = new Whip(new Mocha(new HouseBlend()));</code>`,
    starterFiles: [
      {
        name: 'Beverage.java',
        status: 'todo',
        starter: `// TODO: abstract Beverage فيه description + abstract cost()`,
        solution: `public abstract class Beverage {
    String description = "Unknown Beverage";

    public String getDescription() {
        return description;
    }

    public abstract double cost();
}`,
        checks: [
          { type: 'contains', value: 'abstract class Beverage', msg: 'abstract class Beverage' },
          { type: 'contains', value: 'getDescription', msg: 'method getDescription' },
          { type: 'contains', value: 'abstract double cost', msg: 'abstract double cost()' }
        ]
      },
      {
        name: 'Espresso.java',
        status: 'todo',
        starter: `// TODO: extends Beverage, cost = 1.99`,
        solution: `public class Espresso extends Beverage {
    public Espresso() {
        super.description = "Espresso";
    }

    public double cost() {
        return 1.99;
    }
}`,
        checks: [
          { type: 'contains', value: 'extends Beverage', msg: 'extends Beverage' },
          { type: 'contains', value: 'Espresso', msg: 'description = Espresso' },
          { type: 'contains', value: '1.99', msg: 'cost 1.99' }
        ]
      },
      {
        name: 'HouseBlend.java',
        status: 'todo',
        starter: `// TODO: extends Beverage, cost = 0.89`,
        solution: `public class HouseBlend extends Beverage {
    public HouseBlend() {
        super.description = "House Blend Coffee";
    }

    public double cost() {
        return 0.89;
    }
}`,
        checks: [
          { type: 'contains', value: 'extends Beverage', msg: 'extends Beverage' },
          { type: 'contains', value: 'House Blend', msg: 'description' },
          { type: 'contains', value: '0.89', msg: 'cost 0.89' }
        ]
      },
      {
        name: 'CondimentDecorator.java',
        status: 'todo',
        starter: `// TODO: abstract CondimentDecorator extends Beverage`,
        solution: `public abstract class CondimentDecorator extends Beverage {
    Beverage beverage;
    public abstract String getDescription();
}`,
        checks: [
          { type: 'contains', value: 'abstract class CondimentDecorator', msg: 'abstract class' },
          { type: 'contains', value: 'extends Beverage', msg: 'extends Beverage' },
          { type: 'regex', value: 'Beverage\\s+beverage', msg: 'field Beverage beverage' },
          { type: 'contains', value: 'abstract String getDescription', msg: 'abstract getDescription' }
        ]
      },
      {
        name: 'Mocha.java',
        status: 'todo',
        starter: `// TODO: Mocha decorator, +0.20`,
        solution: `public class Mocha extends CondimentDecorator {
    public Mocha(Beverage beverage) {
        this.beverage = beverage;
    }

    public String getDescription() {
        return beverage.getDescription() + ", Mocha";
    }

    public double cost() {
        return 0.20 + beverage.cost();
    }
}`,
        checks: [
          { type: 'contains', value: 'extends CondimentDecorator', msg: 'extends CondimentDecorator' },
          { type: 'regex', value: 'Mocha\\s*\\(\\s*Beverage', msg: 'constructor(Beverage)' },
          { type: 'contains', value: 'this.beverage = beverage', msg: 'احفظ beverage' },
          { type: 'contains', value: 'beverage.getDescription()', msg: 'beverage.getDescription' },
          { type: 'contains', value: 'beverage.cost()', msg: '+ beverage.cost()' },
          { type: 'contains', value: '0.20', msg: 'سعر Mocha 0.20' }
        ]
      },
      {
        name: 'Whip.java',
        status: 'todo',
        starter: `// TODO: Whip decorator, +0.10`,
        solution: `public class Whip extends CondimentDecorator {
    public Whip(Beverage beverage) {
        this.beverage = beverage;
    }

    public String getDescription() {
        return beverage.getDescription() + ", Whip";
    }

    public double cost() {
        return 0.10 + beverage.cost();
    }
}`,
        checks: [
          { type: 'contains', value: 'extends CondimentDecorator', msg: 'extends CondimentDecorator' },
          { type: 'contains', value: 'beverage.cost()', msg: '+ beverage.cost()' },
          { type: 'contains', value: '0.10', msg: 'سعر Whip 0.10' }
        ]
      }
    ],
    solutionSteps: [
      {
        title: '1. تحديد الـ Pattern',
        content: 'مؤشرات Decorator: إضافات تتراكم + كل إضافة تزيد على السعر/الوصف + ترتيب الإضافات مهم = Decorator.'
      },
      {
        title: '2. Abstract Base',
        content: 'أنشئ <code>abstract Beverage</code> فيه field <code>description</code> و method <code>cost()</code> abstract.'
      },
      {
        title: '3. Concrete Components',
        content: 'كلاسات المشروبات الأساسية (Espresso, HouseBlend) ترث من Beverage. كل واحد يحدد description و cost.'
      },
      {
        title: '4. Decorator Abstract',
        content: '<strong>المفتاح!</strong> <code>CondimentDecorator</code> يـ <code>extends Beverage</code> (مو implements interface) + يحتوي <code>Beverage beverage</code> field. هذا اللي يخليه يلف أي مشروب.'
      },
      {
        title: '5. Concrete Decorators',
        content: 'كل إضافة (Mocha, Whip) ترث من CondimentDecorator. الـ constructor يأخذ Beverage ويحفظه. cost() ترجع <strong>سعرها + beverage.cost()</strong> (تتراكم!).'
      }
    ]
  },

  // ==================== LAB 7: Adapter - Power Adapter ====================
  {
    id: 'lab-adapter-power',
    pattern: 'adapter',
    patternName: 'Adapter',
    title: 'Lab: Power Outlet Adapter',
    scenario: `تطبيق يحاكي توصيل أجهزة كهربائية. عندنا interface <code>EuropeanSocket</code> (للأجهزة الأوروبية بـ 220V) لكن جهاز قديم من نوع <code>USDevice</code> يستخدم 110V بطريقة مختلفة. نحتاج adapter يخلي USDevice يشتغل مع EuropeanSocket.`,
    task: `<strong>المطلوب:</strong> طبق <strong>Adapter pattern</strong>:
    <br>• Target: <code>EuropeanSocket</code> interface فيه <code>provideElectricity()</code>
    <br>• Adaptee: <code>USDevice</code> class عنده <code>connectUS()</code>
    <br>• Adapter: <code>USToEuropeAdapter</code> ينفذ EuropeanSocket ويلف USDevice`,
    starterFiles: [
      {
        name: 'EuropeanSocket.java',
        status: 'todo',
        starter: `// TODO: interface EuropeanSocket فيه provideElectricity()`,
        solution: `public interface EuropeanSocket {
    void provideElectricity();
}`,
        checks: [
          { type: 'regex', value: 'interface\\s+EuropeanSocket', msg: 'interface EuropeanSocket' },
          { type: 'contains', value: 'provideElectricity', msg: 'method provideElectricity' }
        ]
      },
      {
        name: 'USDevice.java',
        status: 'todo',
        starter: `// TODO: USDevice فيه connectUS() يطبع "US power 110V"`,
        solution: `public class USDevice {
    public void connectUS() {
        System.out.println("US power 110V");
    }
}`,
        checks: [
          { type: 'contains', value: 'connectUS', msg: 'method connectUS' },
          { type: 'contains', value: '110V', msg: 'اطبع 110V' }
        ]
      },
      {
        name: 'USToEuropeAdapter.java',
        status: 'todo',
        starter: `// TODO: Adapter ينفذ EuropeanSocket ويلف USDevice`,
        solution: `public class USToEuropeAdapter implements EuropeanSocket {
    private USDevice usDevice;

    public USToEuropeAdapter(USDevice device) {
        this.usDevice = device;
    }

    @Override
    public void provideElectricity() {
        System.out.println("Converting 220V to 110V...");
        usDevice.connectUS();
    }
}`,
        checks: [
          { type: 'contains', value: 'implements EuropeanSocket', msg: 'implements EuropeanSocket (Target)' },
          { type: 'regex', value: 'private\\s+USDevice', msg: 'field USDevice' },
          { type: 'regex', value: 'USToEuropeAdapter\\s*\\(\\s*USDevice', msg: 'constructor يأخذ USDevice' },
          { type: 'contains', value: 'this.usDevice', msg: 'احفظ usDevice' },
          { type: 'contains', value: 'usDevice.connectUS', msg: 'استدعي connectUS من usDevice' }
        ]
      }
    ],
    solutionSteps: [
      {
        title: '1. تحديد الـ Pattern',
        content: 'مؤشرات Adapter: interface غير متوافق + نريد كائن قديم يشتغل في نظام جديد + توافق interfaces = Adapter.'
      },
      {
        title: '2. Target Interface',
        content: '<code>EuropeanSocket</code> هو الـ Target - اللي الكود الجديد يفهمه. أنشئها بـ method <code>provideElectricity()</code>.'
      },
      {
        title: '3. Adaptee',
        content: '<code>USDevice</code> هو الـ Adaptee - الكلاس الموجود بـ interface مختلف. عنده <code>connectUS()</code>.'
      },
      {
        title: '4. Adapter Class',
        content: 'الـ Adapter <strong>ينفذ Target</strong> (EuropeanSocket) ويحفظ <strong>reference للـ Adaptee</strong> (USDevice) كـ private field.'
      },
      {
        title: '5. Conversion Logic',
        content: 'في <code>provideElectricity()</code>، حول 220V لـ 110V (لو فيه logic للتحويل)، ثم استدعي <code>usDevice.connectUS()</code> (التفويض).'
      }
    ]
  },

  // ==================== LAB 8: Proxy - Database Access ====================
  {
    id: 'lab-proxy-database',
    pattern: 'proxy',
    patternName: 'Proxy',
    title: 'Lab: Database Access Control',
    scenario: `تطبيق يستخدم قاعدة بيانات (Database) عبر method <code>query(String sql)</code>. مشكلة: أي مستخدم يقدر ينفذ <code>DELETE</code> queries حتى لو ما عنده صلاحية! نحتاج طبقة وسيطة تفحص الـ role قبل ما تفوض للقاعدة الفعلية.`,
    task: `<strong>المطلوب:</strong> طبق <strong>Proxy pattern</strong>:
    <br>• <code>Database</code> interface فيه <code>query(String sql)</code>
    <br>• <code>RealDatabase</code> ينفذ الـ queries فعلياً
    <br>• <code>DatabaseProxy</code> يلف RealDatabase ويفحص: لو الـ query تبدأ بـ "DELETE" والـ role != "admin" → ارفض. وإلا فوّض.`,
    starterFiles: [
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
          { type: 'contains', value: 'implements Database', msg: 'implements Database' },
          { type: 'contains', value: 'Executing', msg: 'اطبع Executing' }
        ]
      },
      {
        name: 'DatabaseProxy.java',
        status: 'todo',
        starter: `// TODO: Proxy ينفذ Database
// يحفظ realDatabase + userRole
// لو الـ sql يبدأ بـ "DELETE" والـ role != "admin" -> ارفض
// غير كذا فوّض للـ realDatabase`,
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
          { type: 'contains', value: 'implements Database', msg: 'implements Database (نفس الـ interface)' },
          { type: 'regex', value: 'private\\s+.*Database\\s+realDatabase', msg: 'field realDatabase' },
          { type: 'regex', value: 'String\\s+userRole', msg: 'field userRole' },
          { type: 'contains', value: 'startsWith("DELETE")', msg: 'فحص DELETE' },
          { type: 'regex', value: '!.*userRole\\.equals\\("admin"\\)|!"admin"\\.equals\\(userRole\\)', msg: 'فحص لو الـ role != admin' },
          { type: 'contains', value: 'realDatabase.query', msg: 'فوّض للـ realDatabase' }
        ]
      }
    ],
    solutionSteps: [
      {
        title: '1. تحديد الـ Pattern',
        content: 'مؤشرات Proxy: التحكم بالوصول + طبقة وسيطة + نفس الـ interface + التحقق قبل التفويض = Proxy.'
      },
      {
        title: '2. Common Interface',
        content: 'أنشئ <code>Database</code> interface فيه <code>query(String sql)</code>. هذا اللي ينفذه Real و Proxy.'
      },
      {
        title: '3. Real Service',
        content: '<code>RealDatabase</code> ينفذ Database. <code>query()</code> ينفذ الـ SQL فعلياً.'
      },
      {
        title: '4. Proxy Class',
        content: 'الـ <code>DatabaseProxy</code> <strong>ينفذ نفس الـ interface</strong> + يحفظ reference للـ Real + يحفظ userRole.'
      },
      {
        title: '5. Access Control Logic',
        content: 'في <code>query()</code>: <code>if (sql.startsWith("DELETE") && !userRole.equals("admin"))</code> → اطبع error و return. غير كذا، فوّض للـ <code>realDatabase.query(sql)</code>.'
      }
    ]
  },

  // ==================== LAB 9: Prototype - Game Enemies ====================
  {
    id: 'lab-prototype-enemy',
    pattern: 'prototype',
    patternName: 'Prototype',
    title: 'Lab: Game Enemy Cloning',
    scenario: `لعبة فيها أعداء (Enemies) من أنواع مختلفة (Goblin, Dragon). كل عدو إنشاؤه غالي (يحتاج تحميل textures و sounds). نحتاج نسخ كائنات موجودة بدل بنائها من الصفر.`,
    task: `<strong>المطلوب:</strong> طبق <strong>Prototype pattern</strong>:
    <br>• <code>Enemy</code> abstract class فيه health و damage + <code>clone()</code> abstract
    <br>• <code>Goblin</code> + <code>Dragon</code> ينفذون clone عبر <strong>copy constructor</strong>
    <br>• <code>EnemyCache</code> فيه HashMap يخزن prototypes ويرجع clones`,
    starterFiles: [
      {
        name: 'Enemy.java',
        status: 'todo',
        starter: `// TODO: abstract Enemy فيه health (int) و damage (int) + clone() abstract`,
        solution: `public abstract class Enemy {
    private int health;
    private int damage;

    public Enemy(int health, int damage) {
        this.health = health;
        this.damage = damage;
    }

    public int getHealth() { return health; }
    public int getDamage() { return damage; }

    @Override
    public abstract Enemy clone();
}`,
        checks: [
          { type: 'contains', value: 'abstract class Enemy', msg: 'abstract class' },
          { type: 'regex', value: 'private\\s+int\\s+health', msg: 'field health' },
          { type: 'regex', value: 'private\\s+int\\s+damage', msg: 'field damage' },
          { type: 'regex', value: 'public\\s+abstract\\s+Enemy\\s+clone', msg: 'abstract clone()' }
        ]
      },
      {
        name: 'Goblin.java',
        status: 'todo',
        starter: `// TODO: Goblin extends Enemy فيه weapon (String)`,
        solution: `public class Goblin extends Enemy {
    private String weapon;

    public Goblin(Goblin target) {
        super(target.getHealth(), target.getDamage());
        this.weapon = target.weapon;
    }

    public Goblin(int health, int damage, String weapon) {
        super(health, damage);
        this.weapon = weapon;
    }

    @Override
    public Enemy clone() {
        return new Goblin(this);
    }
}`,
        checks: [
          { type: 'contains', value: 'extends Enemy', msg: 'extends Enemy' },
          { type: 'regex', value: 'Goblin\\s*\\(\\s*Goblin\\s+\\w+\\s*\\)', msg: 'copy constructor Goblin(Goblin)' },
          { type: 'contains', value: 'super(', msg: 'استدعي super' },
          { type: 'contains', value: 'new Goblin(this)', msg: 'clone ترجع new Goblin(this)' }
        ]
      },
      {
        name: 'Dragon.java',
        status: 'todo',
        starter: `// TODO: Dragon extends Enemy فيه firePower (int)`,
        solution: `public class Dragon extends Enemy {
    private int firePower;

    public Dragon(Dragon target) {
        super(target.getHealth(), target.getDamage());
        this.firePower = target.firePower;
    }

    public Dragon(int health, int damage, int firePower) {
        super(health, damage);
        this.firePower = firePower;
    }

    @Override
    public Enemy clone() {
        return new Dragon(this);
    }
}`,
        checks: [
          { type: 'contains', value: 'extends Enemy', msg: 'extends Enemy' },
          { type: 'regex', value: 'Dragon\\s*\\(\\s*Dragon\\s+\\w+\\s*\\)', msg: 'copy constructor Dragon(Dragon)' },
          { type: 'contains', value: 'new Dragon(this)', msg: 'clone ترجع new Dragon(this)' }
        ]
      },
      {
        name: 'EnemyCache.java',
        status: 'todo',
        starter: `import java.util.HashMap;
import java.util.Map;

// TODO: EnemyCache يخزن prototypes + get(key) ترجع clone`,
        solution: `import java.util.HashMap;
import java.util.Map;

public class EnemyCache {
    private Map<String, Enemy> cache = new HashMap<>();

    public EnemyCache() {
        Goblin goblin = new Goblin(50, 10, "Dagger");
        Dragon dragon = new Dragon(500, 50, 100);
        cache.put("goblin", goblin);
        cache.put("dragon", dragon);
    }

    public Enemy get(String key) {
        return cache.get(key).clone();
    }
}`,
        checks: [
          { type: 'contains', value: 'HashMap', msg: 'HashMap' },
          { type: 'contains', value: 'cache.put', msg: 'put prototypes' },
          { type: 'contains', value: '.clone()', msg: 'get() ترجع clone مو الأصل' }
        ]
      }
    ],
    solutionSteps: [
      {
        title: '1. تحديد الـ Pattern',
        content: 'مؤشرات Prototype: نسخ كائنات + بناء غالي + cache من prototypes جاهزة = Prototype.'
      },
      {
        title: '2. Abstract Base',
        content: 'Enemy abstract فيه common fields (health, damage) + <code>abstract Enemy clone()</code>.'
      },
      {
        title: '3. Copy Constructor',
        content: 'في كل subclass (Goblin, Dragon)، أضف <strong>copy constructor</strong> يأخذ نفس النوع: <code>Goblin(Goblin target)</code>. يستدعي super بقيم target ثم ينسخ الـ fields الخاصة.'
      },
      {
        title: '4. clone() Implementation',
        content: 'في كل subclass: <code>public Enemy clone() { return new Goblin(this); }</code>. يستخدم الـ copy constructor.'
      },
      {
        title: '5. Cache',
        content: 'EnemyCache فيه HashMap. الـ constructor يبني prototypes ويضعها في الـ map. <code>get(key)</code> ترجع <strong>clone</strong> مو الأصل!'
      }
    ]
  },

  // ==================== LAB 10: Flyweight - Forest Trees ====================
  {
    id: 'lab-flyweight-forest',
    pattern: 'flyweight',
    patternName: 'Flyweight',
    title: 'Lab: Forest Rendering Engine',
    scenario: `محرك لعبة يرسم غابة فيها 10,000 شجرة! المشكلة: كل شجرة object كامل فيه texture, color, mesh - وهذا يستهلك ذاكرة هائلة. الحل: شارك الـ texture/color بين الأشجار اللي من نفس النوع، واخزن في كل شجرة بس الإحداثيات (x, y).`,
    task: `<strong>المطلوب:</strong> طبق <strong>Flyweight pattern</strong>:
    <br>• <code>TreeType</code> (flyweight) فيه name, color, texture (intrinsic - مشترك)
    <br>• <code>TreeFactory</code> فيه HashMap يدير الـ flyweights
    <br>• <code>Tree</code> (context) فيه x, y + reference للـ TreeType`,
    starterFiles: [
      {
        name: 'TreeType.java',
        status: 'todo',
        starter: `// TODO: TreeType فيه name, color, texture (intrinsic state)`,
        solution: `public class TreeType {
    private String name;
    private String color;
    private String texture;

    public TreeType(String name, String color, String texture) {
        this.name = name;
        this.color = color;
        this.texture = texture;
    }

    public void draw(int x, int y) {
        System.out.println("Drawing " + name + " (" + color + ") at " + x + "," + y);
    }
}`,
        checks: [
          { type: 'regex', value: 'private\\s+String\\s+name', msg: 'field name' },
          { type: 'regex', value: 'private\\s+String\\s+color', msg: 'field color' },
          { type: 'regex', value: 'private\\s+String\\s+texture', msg: 'field texture' },
          { type: 'regex', value: 'TreeType\\s*\\([^)]*String[^)]*String[^)]*String', msg: 'constructor يأخذ 3 strings' },
          { type: 'contains', value: 'draw', msg: 'method draw' }
        ]
      },
      {
        name: 'TreeFactory.java',
        status: 'todo',
        starter: `import java.util.HashMap;
import java.util.Map;

// TODO: TreeFactory يدير الـ flyweights
// المفتاح: name + "-" + color`,
        solution: `import java.util.HashMap;
import java.util.Map;

public class TreeFactory {
    private Map<String, TreeType> treeTypes = new HashMap<>();

    public TreeType getTreeType(String name, String color, String texture) {
        String key = name + "-" + color;
        if (treeTypes.containsKey(key)) {
            return treeTypes.get(key);
        } else {
            TreeType type = new TreeType(name, color, texture);
            treeTypes.put(key, type);
            return type;
        }
    }
}`,
        checks: [
          { type: 'regex', value: 'Map<String,\\s*TreeType>|HashMap<String,\\s*TreeType>', msg: 'HashMap<String, TreeType>' },
          { type: 'contains', value: 'containsKey', msg: 'افحص containsKey' },
          { type: 'contains', value: 'new TreeType', msg: 'أنشئ لما يكون غير موجود' },
          { type: 'contains', value: 'put', msg: 'احفظه بالـ put' }
        ]
      },
      {
        name: 'Tree.java',
        status: 'todo',
        starter: `// TODO: Tree (context) فيه x, y + TreeType type`,
        solution: `public class Tree {
    private int x;
    private int y;
    private TreeType type;

    public Tree(int x, int y, TreeType type) {
        this.x = x;
        this.y = y;
        this.type = type;
    }

    public void draw() {
        type.draw(x, y);
    }
}`,
        checks: [
          { type: 'regex', value: 'private\\s+int\\s+x', msg: 'field int x' },
          { type: 'regex', value: 'private\\s+int\\s+y', msg: 'field int y' },
          { type: 'regex', value: 'private\\s+TreeType', msg: 'field TreeType' },
          { type: 'contains', value: 'type.draw', msg: 'استدعي type.draw(x, y)' }
        ]
      }
    ],
    solutionSteps: [
      {
        title: '1. تحديد الـ Pattern',
        content: 'مؤشرات Flyweight: آلاف الكائنات + بيانات مشتركة + توفير ذاكرة + factory يدير المشاركة = Flyweight.'
      },
      {
        title: '2. تحديد Intrinsic vs Extrinsic',
        content: '<strong>Intrinsic</strong> (مشترك): name, color, texture (نفسها لكل أشجار من نفس النوع). <strong>Extrinsic</strong> (مختلف): x, y (موقع كل شجرة).'
      },
      {
        title: '3. Flyweight Class',
        content: '<code>TreeType</code> يحتوي الـ intrinsic state. method <code>draw(int x, int y)</code> تأخذ الـ extrinsic كـ parameters.'
      },
      {
        title: '4. Factory',
        content: '<code>TreeFactory</code> يحتفظ بـ HashMap. <code>getTreeType()</code>: لو موجود يرجعه، لو لا ينشئ ويحفظ. هذا اللي يضمن المشاركة.'
      },
      {
        title: '5. Context',
        content: '<code>Tree</code> يحفظ x, y (extrinsic) + reference للـ TreeType (المشترك). لما يرسم، يستدعي <code>type.draw(x, y)</code> ويمرر الـ extrinsic.'
      }
    ]
  }
];
