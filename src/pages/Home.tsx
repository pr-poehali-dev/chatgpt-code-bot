import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16 mt-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary rounded-2xl mb-6">
            <Icon name="Code" size={40} className="text-white" />
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            AI-ассистент для программирования
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Умный помощник для написания кода на Lua и Python. Получайте помощь, объяснения и готовые решения
          </p>
          <Button onClick={() => navigate('/chat')} size="lg" className="bg-primary text-lg px-8 py-6">
            <Icon name="MessageSquare" size={20} className="mr-2" />
            Начать общение
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <Icon name="Code2" size={24} className="text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Генерация кода</h3>
            <p className="text-muted-foreground">
              Создаю готовые функции и скрипты на Python и Lua по вашему описанию
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <Icon name="MessageCircle" size={24} className="text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Объяснения</h3>
            <p className="text-muted-foreground">
              Разбираю как работает код, объясняю концепции и отвечаю на вопросы
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <Icon name="Bug" size={24} className="text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Исправление ошибок</h3>
            <p className="text-muted-foreground">
              Нахожу и исправляю баги, оптимизирую производительность вашего кода
            </p>
          </Card>
        </div>

        <div className="bg-card rounded-2xl p-8 border border-border">
          <h2 className="text-2xl font-bold mb-6 text-center">Примеры возможностей</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-accent/50 rounded-lg">
              <Icon name="Check" size={20} className="text-primary mt-1" />
              <div>
                <p className="font-medium">Написать функцию сортировки массива на Python</p>
                <p className="text-sm text-muted-foreground">Получите готовый код с комментариями</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-accent/50 rounded-lg">
              <Icon name="Check" size={20} className="text-primary mt-1" />
              <div>
                <p className="font-medium">Объяснить как работают декораторы в Python</p>
                <p className="text-sm text-muted-foreground">Понятное объяснение с примерами</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-accent/50 rounded-lg">
              <Icon name="Check" size={20} className="text-primary mt-1" />
              <div>
                <p className="font-medium">Создать игровой скрипт на Lua для Roblox</p>
                <p className="text-sm text-muted-foreground">Рабочий код для ваших проектов</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
