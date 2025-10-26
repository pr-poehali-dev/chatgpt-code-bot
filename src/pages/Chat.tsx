import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useNavigate } from 'react-router-dom';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const getAIResponse = (userMessage: string): string => {
  const lower = userMessage.toLowerCase();
  
  if (lower.includes('привет') || lower.includes('здравствуй')) {
    return 'Привет! Я твой AI-помощник по программированию на Lua и Python. Расскажи, над чем работаешь?';
  }
  
  if (lower.includes('python') && (lower.includes('функци') || lower.includes('напиши'))) {
    return 'Конечно! Вот пример функции на Python:\n\n```python\ndef example_function(param):\n    result = param * 2\n    return result\n\nprint(example_function(5))  # Вывод: 10\n```\n\nОпиши подробнее что должна делать функция, и я напишу точное решение!';
  }
  
  if (lower.includes('lua')) {
    return 'Отлично, работаем с Lua! Это мощный язык для скриптинга. Вот базовый пример:\n\n```lua\nfunction greet(name)\n    print("Привет, " .. name .. "!")\nend\n\ngreet("Игрок")\n```\n\nЧто именно нужно реализовать на Lua?';
  }
  
  if (lower.includes('ошибк') || lower.includes('не работает') || lower.includes('баг')) {
    return 'Понимаю, разберемся с ошибкой! Покажи мне код который не работает, и я помогу найти проблему и исправить её.';
  }
  
  if (lower.includes('как') || lower.includes('что такое') || lower.includes('объясни')) {
    return 'С удовольствием объясню! Я могу рассказать про любые концепции программирования на Python и Lua. Задавай конкретный вопрос, и я дам подробное объяснение с примерами.';
  }
  
  return 'Интересный вопрос! Я помогу тебе с:\n• Написанием кода на Python и Lua\n• Объяснением как работают функции и алгоритмы\n• Исправлением ошибок\n• Оптимизацией производительности\n\nОпиши свою задачу подробнее, и я дам точный ответ!';
};

const Chat = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Привет! 👋 Я AI-ассистент для программирования на Lua и Python. Могу помочь с написанием кода, объяснить концепции или исправить ошибки. О чём хочешь поговорить?',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!input.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
    };

    setMessages([...messages, userMessage]);
    const currentInput = input;
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: getAIResponse(currentInput),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="flex h-screen">
      <div className="w-64 bg-card border-r border-border flex flex-col">
        <div className="p-4 border-b border-border">
          <Button variant="ghost" onClick={() => navigate('/')} className="w-full justify-start mb-2">
            <Icon name="ArrowLeft" size={16} className="mr-2" />
            На главную
          </Button>
          <h2 className="font-semibold text-lg flex items-center gap-2 mt-4">
            <Icon name="Code" size={20} />
            Code Chat
          </h2>
        </div>
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-2">
            <Button variant="secondary" className="w-full justify-start">
              <Icon name="MessageSquare" size={16} className="mr-2" />
              Текущий диалог
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Icon name="Plus" size={16} className="mr-2" />
              Новый чат
            </Button>
          </div>
        </ScrollArea>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="border-b border-border px-6 py-4 bg-card">
          <h1 className="text-xl font-semibold">AI-ассистент для Lua и Python</h1>
          <p className="text-sm text-muted-foreground">Пишу код, объясняю и помогаю с ошибками</p>
        </div>

        <ScrollArea className="flex-1 px-6">
          <div className="max-w-3xl mx-auto py-6 space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-4 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.role === 'assistant' && (
                  <Avatar className="h-8 w-8 bg-primary">
                    <AvatarFallback className="bg-primary text-primary-foreground">AI</AvatarFallback>
                  </Avatar>
                )}
                <Card className={`p-4 max-w-[80%] ${message.role === 'user' ? 'bg-primary text-primary-foreground' : ''}`}>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                </Card>
                {message.role === 'user' && (
                  <Avatar className="h-8 w-8 bg-secondary">
                    <AvatarFallback>
                      <Icon name="User" size={16} />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-4 justify-start">
                <Avatar className="h-8 w-8 bg-primary">
                  <AvatarFallback className="bg-primary text-primary-foreground">AI</AvatarFallback>
                </Avatar>
                <Card className="p-4">
                  <p className="text-sm text-muted-foreground">Печатает...</p>
                </Card>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="border-t border-border p-4 bg-card">
          <div className="max-w-3xl mx-auto flex gap-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Напишите ваш вопрос или опишите задачу..."
              className="min-h-[60px] resize-none"
              disabled={isTyping}
            />
            <Button onClick={handleSend} size="icon" className="h-[60px] w-[60px] bg-primary" disabled={isTyping}>
              <Icon name="Send" size={20} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
