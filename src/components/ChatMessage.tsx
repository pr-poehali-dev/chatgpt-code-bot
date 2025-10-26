import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { CodeBlock } from './CodeBlock';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

const parseContent = (text: string) => {
  const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
  const parts: Array<{ type: 'text' | 'code'; content: string; language?: string }> = [];
  let lastIndex = 0;
  let match;

  while ((match = codeBlockRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ type: 'text', content: text.slice(lastIndex, match.index) });
    }
    parts.push({
      type: 'code',
      content: match[2].trim(),
      language: match[1] || 'python',
    });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push({ type: 'text', content: text.slice(lastIndex) });
  }

  return parts.length > 0 ? parts : [{ type: 'text', content: text }];
};

export const ChatMessage = ({ role, content, timestamp }: ChatMessageProps) => {
  const isUser = role === 'user';
  const contentParts = parseContent(content);

  return (
    <div className={`flex gap-4 mb-6 animate-fade-in ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <Avatar className="h-8 w-8 mt-1 bg-gradient-to-br from-primary to-secondary flex-shrink-0">
          <AvatarFallback className="bg-transparent text-white">AI</AvatarFallback>
        </Avatar>
      )}
      
      <div className={`flex flex-col max-w-[80%] ${isUser ? 'items-end' : 'items-start'}`}>
        <Card className={`${isUser ? 'bg-primary text-primary-foreground p-4' : 'bg-card p-4'} ${contentParts.some(p => p.type === 'code') ? 'p-0' : ''}`}>
          {contentParts.map((part, index) => {
            if (part.type === 'code') {
              return (
                <CodeBlock
                  key={index}
                  code={part.content}
                  language={part.language || 'python'}
                />
              );
            }
            return (
              <pre key={index} className="whitespace-pre-wrap font-sans text-sm leading-relaxed p-4">
                {part.content}
              </pre>
            );
          })}
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