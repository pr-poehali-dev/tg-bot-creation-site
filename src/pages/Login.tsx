import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      toast({
        title: '✅ Вход выполнен!',
        description: 'Добро пожаловать обратно!',
      });
      sessionStorage.setItem('user_auth', 'true');
      sessionStorage.setItem('user_email', formData.email);
      setIsSubmitting(false);
      navigate('/register');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-6">
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full" 
             style={{
               backgroundImage: `linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px),
                                linear-gradient(hsl(var(--border)) 1px, transparent 1px)`,
               backgroundSize: '50px 50px'
             }}>
        </div>
      </div>

      <Card className="w-full max-w-md bg-card/50 backdrop-blur border-primary/30 relative z-10">
        <CardContent className="p-8">
          <div className="text-center mb-6">
            <Link to="/" className="inline-flex items-center gap-2 mb-4">
              <Icon name="Bot" size={48} className="text-primary" />
              <span className="text-3xl font-bold font-mono">BotCreator</span>
            </Link>
            <h1 className="text-3xl font-bold mb-2">Вход</h1>
            <p className="text-muted-foreground">Войдите в свой аккаунт</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Email</label>
              <Input
                type="email"
                placeholder="ivan@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="bg-background/50"
                autoFocus
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Пароль</label>
              <Input
                type="password"
                placeholder="Введите пароль"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                className="bg-background/50"
              />
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Icon name="Loader2" size={20} className="mr-2 animate-spin" />
                  Вход...
                </>
              ) : (
                <>
                  <Icon name="LogIn" size={20} className="mr-2" />
                  Войти
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Нет аккаунта?{' '}
              <Link to="/signup" className="text-primary hover:underline">
                Зарегистрироваться
              </Link>
            </p>
          </div>

          <div className="mt-6">
            <Button variant="outline" className="w-full" asChild>
              <Link to="/">
                <Icon name="Home" size={20} className="mr-2" />
                На главную
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
