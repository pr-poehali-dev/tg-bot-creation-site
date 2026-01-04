import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';

interface Review {
  id: number;
  author_name: string;
  telegram?: string;
  rating: number;
  text: string;
  created_at: string;
}

const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [formData, setFormData] = useState({ author_name: '', telegram: '', rating: 5, text: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    setReviews([
      { id: 1, author_name: 'Иван П.', telegram: '@ivan_p', rating: 5, text: 'Отличный бот для моего магазина! Сделали за день, всё работает идеально.', created_at: '2024-01-02' },
      { id: 2, author_name: 'Мария К.', rating: 5, text: 'Профессионально и быстро. Бот для приёма платежей работает без нареканий.', created_at: '2024-01-03' },
      { id: 3, author_name: 'Алексей С.', telegram: '@alex_s', rating: 4, text: 'Хорошая работа, всё сделали по ТЗ. Единственное - немного дольше ожидал ответа в поддержке.', created_at: '2024-01-04' }
    ]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      toast({
        title: '✅ Отзыв отправлен!',
        description: 'Спасибо за ваш отзыв! Он появится после модерации.',
      });
      setFormData({ author_name: '', telegram: '', rating: 5, text: '' });
      setIsSubmitting(false);
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
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-primary">Отзывы</span> клиентов
            </h1>
            <p className="text-lg text-muted-foreground">
              Мнения тех, кто уже заказал ботов у нас
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {reviews.map((review) => (
              <Card key={review.id} className="bg-card/50 backdrop-blur border-primary/30 hover:border-primary/50 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-lg">{review.author_name}</h3>
                      {review.telegram && (
                        <p className="text-sm text-muted-foreground font-mono">{review.telegram}</p>
                      )}
                    </div>
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Icon
                          key={i}
                          name={i < review.rating ? 'Star' : 'Star'}
                          size={16}
                          className={i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-muted-foreground'}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">{review.text}</p>
                  <p className="text-xs text-muted-foreground mt-4">
                    {new Date(review.created_at).toLocaleDateString('ru-RU')}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="max-w-2xl mx-auto bg-card/50 backdrop-blur border-primary/30">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Icon name="MessageSquare" size={28} className="text-primary" />
                Оставить отзыв
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Ваше имя *</label>
                  <Input
                    placeholder="Иван Иванов"
                    value={formData.author_name}
                    onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
                    required
                    className="bg-background/50"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Telegram (необязательно)</label>
                  <Input
                    placeholder="@username"
                    value={formData.telegram}
                    onChange={(e) => setFormData({ ...formData, telegram: e.target.value })}
                    className="bg-background/50"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Оценка *</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFormData({ ...formData, rating: star })}
                        className="transition-transform hover:scale-110"
                      >
                        <Icon
                          name="Star"
                          size={32}
                          className={star <= formData.rating ? 'text-yellow-500 fill-yellow-500' : 'text-muted-foreground'}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Ваш отзыв *</label>
                  <Textarea
                    placeholder="Расскажите о вашем опыте работы с нами..."
                    value={formData.text}
                    onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                    required
                    className="bg-background/50 min-h-[120px]"
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
                      Отправить отзыв
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
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

export default Reviews;
