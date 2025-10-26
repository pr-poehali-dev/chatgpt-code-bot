import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

interface Chat {
  id: string;
  title: string;
  timestamp: string;
}

interface SidebarProps {
  chats: Chat[];
  activeChat: string | null;
  onSelectChat: (id: string) => void;
  onNewChat: () => void;
  onOpenProfile: () => void;
}

export const Sidebar = ({ chats, activeChat, onSelectChat, onNewChat, onOpenProfile }: SidebarProps) => {
  return (
    <div className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col h-screen">
      <div className="p-4">
        <Button 
          onClick={onNewChat}
          className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
        >
          <Icon name="Plus" size={16} className="mr-2" />
          Новый чат
        </Button>
      </div>
      
      <Separator className="bg-sidebar-border" />
      
      <ScrollArea className="flex-1 px-2">
        <div className="py-2 space-y-1">
          {chats.map((chat) => (
            <Button
              key={chat.id}
              variant={activeChat === chat.id ? "secondary" : "ghost"}
              className="w-full justify-start text-left h-auto py-3 px-3"
              onClick={() => onSelectChat(chat.id)}
            >
              <div className="flex items-start gap-2 w-full">
                <Icon name="MessageSquare" size={16} className="mt-1 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate text-sm">{chat.title}</div>
                  <div className="text-xs text-muted-foreground">{chat.timestamp}</div>
                </div>
              </div>
            </Button>
          ))}
        </div>
      </ScrollArea>
      
      <Separator className="bg-sidebar-border" />
      
      <div className="p-4">
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={onOpenProfile}
        >
          <Avatar className="h-8 w-8 mr-3">
            <AvatarFallback className="bg-primary text-primary-foreground">
              <Icon name="User" size={16} />
            </AvatarFallback>
          </Avatar>
          <span>Профиль</span>
        </Button>
      </div>
    </div>
  );
};
