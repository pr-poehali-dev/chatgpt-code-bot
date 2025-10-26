import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { ChatMessage } from '@/components/ChatMessage';
import { ChatInput } from '@/components/ChatInput';
import { ProfileDialog } from '@/components/ProfileDialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

interface Chat {
  id: string;
  title: string;
  timestamp: string;
  messages: Message[];
}

const mockChats: Chat[] = [
  {
    id: '1',
    title: 'Скрипт для обработки данных',
    timestamp: 'Сегодня, 14:30',
    messages: [
      {
        id: '1',
        role: 'user',
        content: 'Помоги написать скрипт на Python для обработки CSV файла',
        timestamp: '14:30'
      },
      {
        id: '2',
        role: 'assistant',
        content: 'Конечно! Вот пример скрипта на Python для обработки CSV файла:\n\n```python\nimport csv\n\nwith open(\'data.csv\', \'r\', encoding=\'utf-8\') as file:\n    reader = csv.DictReader(file)\n    for row in reader:\n        print(row)\n```\n\nЧто конкретно нужно сделать с данными?',
        timestamp: '14:31'
      }
    ]
  },
  {
    id: '2',
    title: 'Функция на Lua',
    timestamp: 'Вчера, 18:20',
    messages: []
  }
];

const Index = () => {
  const [chats, setChats] = useState<Chat[]>(mockChats);
  const [activeChat, setActiveChat] = useState<string | null>('1');
  const [profileOpen, setProfileOpen] = useState(false);

  const currentChat = chats.find(c => c.id === activeChat);

  const handleNewChat = () => {
    const newChat: Chat = {
      id: String(Date.now()),
      title: 'Новый чат',
      timestamp: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
      messages: []
    };
    setChats([newChat, ...chats]);
    setActiveChat(newChat.id);
  };

  const handleSendMessage = (content: string) => {
    if (!activeChat) return;

    const newMessage: Message = {
      id: String(Date.now()),
      role: 'user',
      content,
      timestamp: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
    };

    setChats(chats.map(chat => {
      if (chat.id === activeChat) {
        const updatedMessages = [...chat.messages, newMessage];
        
        setTimeout(() => {
          const aiResponse: Message = {
            id: String(Date.now() + 1),
            role: 'assistant',
            content: 'Я AI-ассистент для программирования на Lua и Python. Опишите подробнее вашу задачу, и я помогу вам написать код!',
            timestamp: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
          };
          
          setChats(prevChats => prevChats.map(c => 
            c.id === activeChat 
              ? { ...c, messages: [...c.messages, aiResponse] }
              : c
          ));
        }, 1000);

        return {
          ...chat,
          messages: updatedMessages,
          title: chat.messages.length === 0 ? content.slice(0, 30) + (content.length > 30 ? '...' : '') : chat.title
        };
      }
      return chat;
    }));
  };

  return (
    <div className="flex h-screen bg-background dark">
      <Sidebar
        chats={chats}
        activeChat={activeChat}
        onSelectChat={setActiveChat}
        onNewChat={handleNewChat}
        onOpenProfile={() => setProfileOpen(true)}
      />
      
      <div className="flex-1 flex flex-col">
        {currentChat ? (
          <>
            <div className="border-b border-border bg-card px-6 py-4">
              <div className="flex items-center gap-3 max-w-4xl mx-auto">
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <Icon name="Code" size={20} className="text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-semibold">{currentChat.title}</h1>
                  <p className="text-sm text-muted-foreground">AI-ассистент для Lua и Python</p>
                </div>
              </div>
            </div>
            
            <ScrollArea className="flex-1 px-6">
              <div className="max-w-4xl mx-auto py-6">
                {currentChat.messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center">
                    <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-6">
                      <Icon name="Sparkles" size={40} className="text-white" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Начните новый диалог</h2>
                    <p className="text-muted-foreground max-w-md mb-8">
                      Я помогу вам с написанием кода на Lua и Python. Задайте вопрос или опишите задачу!
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
                      <Card className="p-4 hover:bg-accent transition-colors cursor-pointer">
                        <div className="flex items-start gap-3">
                          <Icon name="Code2" size={20} className="text-primary mt-1" />
                          <div>
                            <h3 className="font-medium mb-1">Написать функцию</h3>
                            <p className="text-sm text-muted-foreground">Помогу создать функцию на Python или Lua</p>
                          </div>
                        </div>
                      </Card>
                      <Card className="p-4 hover:bg-accent transition-colors cursor-pointer">
                        <div className="flex items-start gap-3">
                          <Icon name="Bug" size={20} className="text-primary mt-1" />
                          <div>
                            <h3 className="font-medium mb-1">Исправить ошибку</h3>
                            <p className="text-sm text-muted-foreground">Найду и исправлю баги в коде</p>
                          </div>
                        </div>
                      </Card>
                      <Card className="p-4 hover:bg-accent transition-colors cursor-pointer">
                        <div className="flex items-start gap-3">
                          <Icon name="BookOpen" size={20} className="text-primary mt-1" />
                          <div>
                            <h3 className="font-medium mb-1">Объяснить код</h3>
                            <p className="text-sm text-muted-foreground">Разберу как работает ваш скрипт</p>
                          </div>
                        </div>
                      </Card>
                      <Card className="p-4 hover:bg-accent transition-colors cursor-pointer">
                        <div className="flex items-start gap-3">
                          <Icon name="Zap" size={20} className="text-primary mt-1" />
                          <div>
                            <h3 className="font-medium mb-1">Оптимизировать</h3>
                            <p className="text-sm text-muted-foreground">Улучшу производительность кода</p>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </div>
                ) : (
                  currentChat.messages.map(message => (
                    <ChatMessage
                      key={message.id}
                      role={message.role}
                      content={message.content}
                      timestamp={message.timestamp}
                    />
                  ))
                )}
              </div>
            </ScrollArea>
            
            <ChatInput onSendMessage={handleSendMessage} />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <Icon name="MessageSquare" size={48} className="mx-auto mb-4 text-muted-foreground" />
              <h2 className="text-xl font-semibold mb-2">Выберите чат или создайте новый</h2>
              <p className="text-muted-foreground">Начните общение с AI-ассистентом</p>
            </div>
          </div>
        )}
      </div>
      
      <ProfileDialog open={profileOpen} onOpenChange={setProfileOpen} />
    </div>
  );
};

export default Index;