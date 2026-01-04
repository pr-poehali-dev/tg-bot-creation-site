import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';

const Register = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    telegram: '',
    phone: '',
    service: '',
    description: '',
    price: 0
  });
  const [showPayment, setShowPayment] = useState(false);
  const { toast } = useToast();

  const services = [
    { id: 1, icon: 'MessageSquare', title: 'Бот для предложки ТГК', price: 1000, priceStr: '1000₽' },
    { id: 2, icon: 'CreditCard', title: 'Бот для оплаты', price: 1500, priceStr: 'от 1500₽' },
    { id: 3, icon: 'ShoppingBag', title: 'Бот для продажи', price: 2000, priceStr: 'от 2000₽' },
    { id: 4, icon: 'Code2', title: 'Кастомный бот', price: 500, priceStr: 'от 500₽' }
  ];

  const handleServiceSelect = (service: any) => {
    setFormData({ ...formData, service: service.title, price: service.price });
    setStep(2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowPayment(true);
  };

  const generateSBPLink = () => {
    const phone = '79956121320';
    const amount = formData.price;
    const comment = encodeURIComponent(`Заказ: ${formData.service} от ${formData.name}`);
    return `https://qr.nspk.ru/proactive/AD10007KEH2I2S9MHLDDG7AG5BI59CRI?type=02&bank=100000000111&sum=${amount}&cur=RUB&crc=C08D&comment=${comment}`;
  };

  const handlePayment = () => {
    const link = generateSBPLink();
    window.open(link, '_blank');
    
    setTimeout(() => {
      toast({
        title: '✅ Заказ создан!',
        description: 'После оплаты мы свяжемся с вами в течение часа.',
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Icon name="Bot" className="text-primary" size={32} />
            <span className="text-2xl font-bold font-mono">BotCreator</span>
          </Link>
          <Button asChild variant="outline">
            <Link to="/">
              <Icon name="Home" size={20} className="mr-2" />
              На главную
            </Link>
          </Button>
        </div>
      </nav>

      <div className="pt-24 pb-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-primary">Регистрация</span> и заказ бота
            </h1>
            <p className="text-lg text-muted-foreground">
              Выберите услугу, заполните данные и оплатите онлайн
            </p>
          </div>

          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-center mb-6">Шаг 1: Выберите услугу</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {services.map((service) => (
                  <Card
                    key={service.id}
                    className="group hover:border-primary/50 transition-all cursor-pointer bg-card/50 backdrop-blur"
                    onClick={() => handleServiceSelect(service)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-primary/10 rounded-lg">
                          <Icon name={service.icon as any} size={32} className="text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                          <p className="text-2xl font-bold text-primary font-mono">{service.priceStr}</p>
                        </div>
                        <Icon name="ChevronRight" size={24} className="text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {step === 2 && !showPayment && (
            <Card className="bg-card/50 backdrop-blur border-primary/30">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6">Шаг 2: Заполните данные</h2>
                <div className="mb-6 p-4 bg-primary/10 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Выбранная услуга:</p>
                      <p className="text-xl font-bold">{formData.service}</p>
                    </div>
                    <p className="text-3xl font-bold text-primary font-mono">{formData.price}₽</p>
                  </div>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Ваше имя *</label>
                    <Input
                      placeholder="Иван Иванов"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="bg-background/50"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Email *</label>
                    <Input
                      type="email"
                      placeholder="ivan@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="bg-background/50"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Telegram *</label>
                    <Input
                      placeholder="@username"
                      value={formData.telegram}
                      onChange={(e) => setFormData({ ...formData, telegram: e.target.value })}
                      required
                      className="bg-background/50"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Телефон</label>
                    <Input
                      type="tel"
                      placeholder="+7 999 123-45-67"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="bg-background/50"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Описание задачи *</label>
                    <Textarea
                      placeholder="Подробно опишите, какой бот вам нужен..."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      required
                      className="bg-background/50 min-h-[100px]"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1">
                      <Icon name="ChevronLeft" size={20} className="mr-2" />
                      Назад
                    </Button>
                    <Button type="submit" className="flex-1">
                      Перейти к оплате
                      <Icon name="ChevronRight" size={20} className="ml-2" />
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {showPayment && (
            <Card className="bg-card/50 backdrop-blur border-primary/30">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="inline-block p-4 bg-primary/10 rounded-full mb-4">
                    <Icon name="Wallet" size={48} className="text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Шаг 3: Оплата</h2>
                  <p className="text-muted-foreground">Оплатите заказ через Систему Быстрых Платежей</p>
                </div>

                <div className="space-y-6">
                  <div className="p-6 bg-background/50 rounded-lg border border-border">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-muted-foreground">Услуга:</span>
                      <span className="font-bold">{formData.service}</span>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-muted-foreground">Имя:</span>
                      <span className="font-bold">{formData.name}</span>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-muted-foreground">Telegram:</span>
                      <span className="font-bold font-mono">{formData.telegram}</span>
                    </div>
                    <div className="h-px bg-border my-4"></div>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-medium">К оплате:</span>
                      <span className="text-3xl font-bold text-primary font-mono">{formData.price}₽</span>
                    </div>
                  </div>

                  <div className="p-6 bg-primary/5 rounded-lg border border-primary/20">
                    <div className="flex items-start gap-3 mb-4">
                      <Icon name="Info" size={20} className="text-primary mt-1" />
                      <div>
                        <h3 className="font-bold mb-2">Как оплатить через СБП:</h3>
                        <ol className="text-sm text-muted-foreground space-y-1">
                          <li>1. Нажмите кнопку "Оплатить через СБП"</li>
                          <li>2. Выберите свой банк в списке</li>
                          <li>3. Подтвердите платёж в приложении банка</li>
                          <li>4. Мы получим уведомление и свяжемся с вами</li>
                        </ol>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      <Icon name="Phone" size={16} className="inline mr-1" />
                      Получатель: +7 995 612-13-20 (Т-Банк)
                    </p>
                  </div>

                  <Button onClick={handlePayment} className="w-full text-lg h-14 animate-glow">
                    <Icon name="Wallet" size={24} className="mr-2" />
                    Оплатить {formData.price}₽ через СБП
                  </Button>

                  <div className="text-center">
                    <Button variant="ghost" onClick={() => setShowPayment(false)}>
                      <Icon name="ChevronLeft" size={20} className="mr-2" />
                      Вернуться назад
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <footer className="py-8 px-6 border-t border-border">
        <div className="container mx-auto text-center text-muted-foreground">
          <p className="font-mono">© 2024 BotCreator • Создание Telegram ботов</p>
        </div>
      </footer>
    </div>
  );
};

export default Register;
