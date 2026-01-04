import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', telegram: '', service: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      toast({
        title: '✅ Заявка отправлена!',
        description: 'Мы свяжемся с вами в ближайшее время через Telegram.',
      });
      setFormData({ name: '', telegram: '', service: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  const services = [
    {
      icon: 'MessageSquare',
      title: 'Бот для предложки ТГК',
      price: '1000₽',
      description: 'Автоматизация публикаций в канале через бота-модератора',
      features: ['Модерация контента', 'Автопостинг', 'Управление через бот']
    },
    {
      icon: 'CreditCard',
      title: 'Бот для оплаты',
      price: 'от 1500₽',
      description: 'Приём платежей через карту/СБП/криптокошелек',
      features: ['Привязка карты', 'СБП интеграция', 'Крипто-платежи']
    },
    {
      icon: 'ShoppingBag',
      title: 'Бот для продажи',
      price: 'от 2000₽',
      description: 'Продажа звёзд, аккаунтов, симок через Telegram',
      features: ['Каталог товаров', 'Автоматизация', 'Статистика продаж']
    },
    {
      icon: 'Code2',
      title: 'Кастомный бот',
      price: 'от 500₽',
      description: 'Создание бота под ваши уникальные задачи',
      features: ['Любая функция', 'Индивидуальный подход', 'Гибкая цена']
    }
  ];

  const portfolio = [
    { name: 'Бот для интернет-магазина', desc: 'Каталог из 500+ товаров с оплатой' },
    { name: 'Бот-модератор канала', desc: 'Автоматическая модерация 10k+ постов' },
    { name: 'Бот для приёма заказов', desc: 'Обработка 200+ заказов в день' }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full" 
             style={{
               backgroundImage: `linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px),
                                linear-gradient(hsl(var(--border)) 1px, transparent 1px)`,
               backgroundSize: '50px 50px'
             }}>
        </div>
      </div>

      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Bot" className="text-primary" size={32} />
            <span className="text-2xl font-bold font-mono">BotCreator</span>
          </div>
          <div className="hidden md:flex gap-8 items-center">
            <a href="#services" className="hover:text-primary transition-colors">Услуги</a>
            <a href="#pricing" className="hover:text-primary transition-colors">Прайс</a>
            <a href="#portfolio" className="hover:text-primary transition-colors">Портфолио</a>
            <Link to="/reviews" className="hover:text-primary transition-colors">Отзывы</Link>
            <a href="https://t.me/sozdaybota" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Канал</a>
            <a href="#contact" className="hover:text-primary transition-colors">Контакты</a>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => setChatOpen(true)} className="animate-glow">
              <Icon name="MessageCircle" size={20} className="mr-2" />
              Консультация
            </Button>
            <Button variant="outline" asChild>
              <Link to="/login">
                <Icon name="LogIn" size={20} className="mr-2" />
                Вход
              </Link>
            </Button>
            <Link to="/admin">
              <Button variant="ghost" size="icon" className="opacity-20 hover:opacity-100">
                <Icon name="Settings" size={20} />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-6 relative">
        <div className="container mx-auto text-center max-w-5xl">
          <div className="inline-block mb-6 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
            <span className="text-primary font-mono text-sm">💻 Создание Telegram ботов</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Автоматизируйте бизнес
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              через Telegram
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 animate-slide-up">
            Разработка ботов для продаж, оплаты, модерации и любых задач.
            <br />
            От 500₽ • <span className="text-primary font-bold">Готово за 1 час - 2 дня</span>
          </p>
          <div className="flex gap-4 justify-center animate-slide-up">
            <Button size="lg" className="text-lg" asChild>
              <Link to="/register">
                <Icon name="CreditCard" size={24} className="mr-2" />
                Заказать с оплатой
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg" asChild>
              <a href="https://t.me/ZAKAZBOTOVADMINS">
                <Icon name="Send" size={24} className="mr-2" />
                Написать в Telegram
              </a>
            </Button>
          </div>
        </div>
        <div className="absolute top-40 left-10 w-72 h-72 bg-primary/20 rounded-full blur-[100px] -z-10"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] -z-10"></div>
      </section>

      <section id="services" className="py-20 px-6 relative">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Наши <span className="text-primary">услуги</span>
          </h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Профессиональная разработка ботов для любых задач
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, idx) => (
              <Card 
                key={idx} 
                className="group hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] bg-card/50 backdrop-blur"
              >
                <CardContent className="p-8">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <Icon name={service.icon as any} size={32} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                      <p className="text-3xl font-bold text-primary font-mono">{service.price}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <Icon name="CheckCircle2" size={16} className="text-secondary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            <span className="text-primary">Прайс</span>-лист
          </h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Прозрачные цены без скрытых платежей
          </p>
          <div className="space-y-4">
            {services.map((service, idx) => (
              <Card key={idx} className="bg-card/80 backdrop-blur hover:border-primary/50 transition-colors">
                <CardContent className="p-6 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-primary/10 rounded">
                      <Icon name={service.icon as any} size={24} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{service.title}</h3>
                      <p className="text-sm text-muted-foreground">{service.description}</p>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-primary font-mono">{service.price}</div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button size="lg" asChild>
              <a href="https://t.me/ZAKAZBOTOVADMINS">
                <Icon name="MessageCircle" size={20} className="mr-2" />
                Обсудить проект
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section id="portfolio" className="py-20 px-6">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Наше <span className="text-primary">портфолио</span>
          </h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Реальные проекты наших клиентов
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {portfolio.map((project, idx) => (
              <Card key={idx} className="group hover:border-primary/50 transition-all hover:shadow-lg bg-card/50 backdrop-blur">
                <CardContent className="p-6">
                  <div className="mb-4 p-4 bg-primary/5 rounded-lg flex items-center justify-center">
                    <Icon name="Bot" size={48} className="text-primary group-hover:animate-pulse" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{project.name}</h3>
                  <p className="text-muted-foreground text-sm">{project.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 px-6 bg-muted/30 relative">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Готовы создать <span className="text-primary">своего бота?</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Оставьте заявку или напишите нам в Telegram
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <Card className="bg-card/50 backdrop-blur border-primary/30">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Icon name="FileText" size={28} className="text-primary" />
                  Оставить заявку
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Ваше имя</label>
                    <Input
                      placeholder="Иван"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="bg-background/50"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Telegram</label>
                    <Input
                      placeholder="@username"
                      value={formData.telegram}
                      onChange={(e) => setFormData({ ...formData, telegram: e.target.value })}
                      required
                      className="bg-background/50"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Тип бота</label>
                    <Input
                      placeholder="Например: Бот для оплаты"
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      required
                      className="bg-background/50"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Описание задачи</label>
                    <Textarea
                      placeholder="Расскажите подробнее о вашем проекте..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      className="bg-background/50 min-h-[100px]"
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Icon name="Loader2" size={20} className="mr-2 animate-spin" />
                        Отправка...
                      </>
                    ) : (
                      <>
                        <Icon name="Send" size={20} className="mr-2" />
                        Отправить заявку
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="bg-card/50 backdrop-blur border-primary/30">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Icon name="MessageCircle" size={28} className="text-secondary" />
                    Или напишите в Telegram
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Свяжитесь с нами напрямую для быстрой консультации
                  </p>
                  <Button size="lg" className="w-full animate-glow" asChild>
                    <a href="https://t.me/ZAKAZBOTOVADMINS">
                      <Icon name="Send" size={24} className="mr-2" />
                      Написать @ZAKAZBOTOVADMINS
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur border-border">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Icon name="Clock" size={24} className="text-primary mt-1" />
                    <div>
                      <h4 className="font-bold mb-1">Быстрый ответ</h4>
                      <p className="text-sm text-muted-foreground">Отвечаем в течение 1 часа</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur border-border">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Icon name="Shield" size={24} className="text-primary mt-1" />
                    <div>
                      <h4 className="font-bold mb-1">Гарантия качества</h4>
                      <p className="text-sm text-muted-foreground">Исправления в течение 30 дней</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-[150px] -z-10"></div>
      </section>

      <footer className="py-8 px-6 border-t border-border">
        <div className="container mx-auto text-center text-muted-foreground">
          <p className="font-mono">© 2024 BotCreator • Создание Telegram ботов</p>
        </div>
      </footer>

      {chatOpen && (
        <div className="fixed bottom-6 right-6 z-50 animate-fade-in">
          <Card className="w-80 shadow-2xl border-primary/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="font-bold">Чат поддержки</span>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setChatOpen(false)}>
                  <Icon name="X" size={20} />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Здравствуйте! Напишите нам в Telegram для консультации по созданию ботов.
              </p>
              <Button className="w-full" asChild>
                <a href="https://t.me/ZAKAZBOTOVADMINS">
                  <Icon name="MessageCircle" size={18} className="mr-2" />
                  Открыть Telegram
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Index;