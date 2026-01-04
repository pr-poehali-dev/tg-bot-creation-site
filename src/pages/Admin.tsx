import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';
import { Link, useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Service {
  id: number;
  icon: string;
  title: string;
  price: string;
  description: string;
  features: string[];
}

interface Portfolio {
  id: number;
  name: string;
  description: string;
  image_url?: string;
}

interface Review {
  id: number;
  author_name: string;
  telegram?: string;
  rating: number;
  text: string;
  created_at: string;
}

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [services, setServices] = useState<Service[]>([]);
  const [portfolio, setPortfolio] = useState<Portfolio[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [editingPortfolio, setEditingPortfolio] = useState<Portfolio | null>(null);
  const [isAddingService, setIsAddingService] = useState(false);
  const [newService, setNewService] = useState<Partial<Service>>({ icon: 'Bot', title: '', price: '', description: '', features: [] });
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const auth = sessionStorage.getItem('admin_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
      loadData();
    }
  }, []);

  const loadData = () => {
    setServices([
      { id: 1, icon: 'MessageSquare', title: 'Бот для предложки ТГК', price: '1000₽', description: 'Автоматизация публикаций в канале через бота-модератора', features: ['Модерация контента', 'Автопостинг', 'Управление через бот'] },
      { id: 2, icon: 'CreditCard', title: 'Бот для оплаты', price: 'от 1500₽', description: 'Приём платежей через карту/СБП/криптокошелек', features: ['Привязка карты', 'СБП интеграция', 'Крипто-платежи'] },
      { id: 3, icon: 'ShoppingBag', title: 'Бот для продажи', price: 'от 2000₽', description: 'Продажа звёзд, аккаунтов, симок через Telegram', features: ['Каталог товаров', 'Автоматизация', 'Статистика продаж'] },
      { id: 4, icon: 'Code2', title: 'Кастомный бот', price: 'от 500₽', description: 'Создание бота под ваши уникальные задачи', features: ['Любая функция', 'Индивидуальный подход', 'Гибкая цена'] }
    ]);
    setPortfolio([
      { id: 1, name: 'Бот для интернет-магазина', description: 'Каталог из 500+ товаров с оплатой' },
      { id: 2, name: 'Бот-модератор канала', description: 'Автоматическая модерация 10k+ постов' },
      { id: 3, name: 'Бот для приёма заказов', description: 'Обработка 200+ заказов в день' }
    ]);
    setReviews([
      { id: 1, author_name: 'Иван П.', telegram: '@ivan_p', rating: 5, text: 'Отличный бот для моего магазина! Сделали за день, всё работает идеально.', created_at: '2024-01-02' },
      { id: 2, author_name: 'Мария К.', rating: 5, text: 'Профессионально и быстро. Бот для приёма платежей работает без нареканий.', created_at: '2024-01-03' }
    ]);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_auth', 'true');
      loadData();
      toast({ title: '✅ Вход выполнен', description: 'Добро пожаловать в админ-панель' });
    } else {
      toast({ title: '❌ Ошибка', description: 'Неверный пароль', variant: 'destructive' });
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('admin_auth');
    navigate('/');
  };

  const handleDeleteReview = (id: number) => {
    setReviews(reviews.filter(r => r.id !== id));
    toast({ title: '✅ Отзыв удалён' });
  };

  const handleSaveService = () => {
    if (editingService) {
      setServices(services.map(s => s.id === editingService.id ? editingService : s));
      toast({ title: '✅ Услуга обновлена' });
      setEditingService(null);
    }
  };

  const handleAddService = () => {
    if (newService.title && newService.price && newService.description) {
      const service: Service = {
        id: services.length + 1,
        icon: newService.icon || 'Bot',
        title: newService.title,
        price: newService.price,
        description: newService.description,
        features: newService.features || []
      };
      setServices([...services, service]);
      toast({ title: '✅ Услуга добавлена' });
      setNewService({ icon: 'Bot', title: '', price: '', description: '', features: [] });
      setIsAddingService(false);
    }
  };

  const handleDeleteService = (id: number) => {
    setServices(services.filter(s => s.id !== id));
    toast({ title: '✅ Услуга удалена' });
  };

  const handleSavePortfolio = () => {
    if (editingPortfolio) {
      setPortfolio(portfolio.map(p => p.id === editingPortfolio.id ? editingPortfolio : p));
      toast({ title: '✅ Проект обновлён' });
      setEditingPortfolio(null);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <Card className="w-full max-w-md bg-card/50 backdrop-blur border-primary/30">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <Icon name="Lock" size={48} className="text-primary mx-auto mb-4" />
              <h1 className="text-3xl font-bold mb-2">Админ-панель</h1>
              <p className="text-muted-foreground">Введите пароль для входа</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-background/50"
                autoFocus
              />
              <Button type="submit" className="w-full">
                <Icon name="LogIn" size={20} className="mr-2" />
                Войти
              </Button>
              <Button type="button" variant="outline" className="w-full" asChild>
                <Link to="/">
                  <Icon name="Home" size={20} className="mr-2" />
                  На главную
                </Link>
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Settings" className="text-primary" size={32} />
            <span className="text-2xl font-bold">Админ-панель</span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link to="/">
                <Icon name="Home" size={20} className="mr-2" />
                На главную
              </Link>
            </Button>
            <Button variant="destructive" onClick={handleLogout}>
              <Icon name="LogOut" size={20} className="mr-2" />
              Выйти
            </Button>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <Tabs defaultValue="services" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="services">Прайс</TabsTrigger>
              <TabsTrigger value="portfolio">Портфолио</TabsTrigger>
              <TabsTrigger value="reviews">Отзывы</TabsTrigger>
            </TabsList>

            <TabsContent value="services">
              <div className="mb-6">
                <Button onClick={() => setIsAddingService(true)} className="w-full">
                  <Icon name="Plus" size={20} className="mr-2" />
                  Добавить новую услугу
                </Button>
              </div>

              {isAddingService && (
                <Card className="bg-primary/5 border-primary/30 mb-4">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4">Новая услуга</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Иконка (lucide icon name)</label>
                        <Input
                          value={newService.icon}
                          onChange={(e) => setNewService({ ...newService, icon: e.target.value })}
                          placeholder="Bot, MessageSquare, CreditCard..."
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Название *</label>
                        <Input
                          value={newService.title}
                          onChange={(e) => setNewService({ ...newService, title: e.target.value })}
                          placeholder="Название услуги"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Цена *</label>
                        <Input
                          value={newService.price}
                          onChange={(e) => setNewService({ ...newService, price: e.target.value })}
                          placeholder="1000₽ или от 1500₽"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Описание *</label>
                        <Textarea
                          value={newService.description}
                          onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                          placeholder="Описание услуги"
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={handleAddService} className="flex-1">
                          <Icon name="Check" size={20} className="mr-2" />
                          Добавить
                        </Button>
                        <Button variant="outline" onClick={() => setIsAddingService(false)} className="flex-1">
                          Отмена
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="space-y-4">
                {services.map((service) => (
                  <Card key={service.id} className="bg-card/50 backdrop-blur">
                    <CardContent className="p-6">
                      {editingService?.id === service.id ? (
                        <div className="space-y-4">
                          <Input
                            value={editingService.title}
                            onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                            placeholder="Название"
                          />
                          <Input
                            value={editingService.price}
                            onChange={(e) => setEditingService({ ...editingService, price: e.target.value })}
                            placeholder="Цена"
                          />
                          <Textarea
                            value={editingService.description}
                            onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                            placeholder="Описание"
                          />
                          <div className="flex gap-2">
                            <Button onClick={handleSaveService}>Сохранить</Button>
                            <Button variant="outline" onClick={() => setEditingService(null)}>Отмена</Button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-xl font-bold mb-1">{service.title}</h3>
                            <p className="text-2xl font-bold text-primary font-mono mb-2">{service.price}</p>
                            <p className="text-sm text-muted-foreground">{service.description}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button onClick={() => setEditingService(service)}>
                              <Icon name="Pencil" size={20} className="mr-2" />
                              Редактировать
                            </Button>
                            <Button variant="destructive" onClick={() => handleDeleteService(service.id)}>
                              <Icon name="Trash2" size={20} />
                            </Button>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="portfolio">
              <div className="grid md:grid-cols-2 gap-4">
                {portfolio.map((project) => (
                  <Card key={project.id} className="bg-card/50 backdrop-blur">
                    <CardContent className="p-6">
                      {editingPortfolio?.id === project.id ? (
                        <div className="space-y-4">
                          <Input
                            value={editingPortfolio.name}
                            onChange={(e) => setEditingPortfolio({ ...editingPortfolio, name: e.target.value })}
                            placeholder="Название"
                          />
                          <Textarea
                            value={editingPortfolio.description}
                            onChange={(e) => setEditingPortfolio({ ...editingPortfolio, description: e.target.value })}
                            placeholder="Описание"
                          />
                          <Input
                            value={editingPortfolio.image_url || ''}
                            onChange={(e) => setEditingPortfolio({ ...editingPortfolio, image_url: e.target.value })}
                            placeholder="URL изображения"
                          />
                          <div className="flex gap-2">
                            <Button onClick={handleSavePortfolio}>Сохранить</Button>
                            <Button variant="outline" onClick={() => setEditingPortfolio(null)}>Отмена</Button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <h3 className="text-xl font-bold mb-2">{project.name}</h3>
                          <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
                          <Button size="sm" onClick={() => setEditingPortfolio(project)}>
                            <Icon name="Pencil" size={16} className="mr-2" />
                            Редактировать
                          </Button>
                        </>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="reviews">
              <div className="space-y-4">
                {reviews.map((review) => (
                  <Card key={review.id} className="bg-card/50 backdrop-blur">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-bold text-lg">{review.author_name}</h3>
                            {review.telegram && (
                              <span className="text-sm text-muted-foreground font-mono">{review.telegram}</span>
                            )}
                            <div className="flex gap-1 ml-auto">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Icon
                                  key={i}
                                  name="Star"
                                  size={16}
                                  className={i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-muted-foreground'}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-muted-foreground text-sm mb-2">{review.text}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(review.created_at).toLocaleDateString('ru-RU')}
                          </p>
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteReview(review.id)}
                          className="ml-4"
                        >
                          <Icon name="Trash2" size={16} className="mr-2" />
                          Удалить
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Admin;