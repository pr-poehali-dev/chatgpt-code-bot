import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export const ChatMessage = ({ role, content, timestamp }: ChatMessageProps) => {
  const isUser = role === 'user';

  return (
    <div className={`flex gap-4 mb-6 animate-fade-in ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <Avatar className="h-8 w-8 mt-1 bg-gradient-to-br from-primary to-secondary flex-shrink-0">
          <AvatarFallback className="bg-transparent text-white">AI</AvatarFallback>
        </Avatar>
      )}
      
      <div className={`flex flex-col max-w-[80%] ${isUser ? 'items-end' : 'items-start'}`}>
        <Card className={`p-4 ${isUser ? 'bg-primary text-primary-foreground' : 'bg-card'}`}>
          <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
            {content}
          </pre>
        </Card>
        <span className="text-xs text-muted-foreground mt-1 px-1">{timestamp}</span>
      </div>
      
      {isUser && (
        <Avatar className="h-8 w-8 mt-1 bg-muted flex-shrink-0">
          <AvatarFallback className="bg-muted">
            <Icon name="User" size={16} className="text-muted-foreground" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};
