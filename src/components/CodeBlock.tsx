import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface CodeBlockProps {
  code: string;
  language: string;
}

export const CodeBlock = ({ code, language }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      toast({
        title: '✓ Код скопирован',
        description: 'Код успешно скопирован в буфер обмена',
        duration: 2000,
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось скопировать код',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="relative group my-4 rounded-lg overflow-hidden border border-border">
      <div className="flex items-center justify-between bg-muted px-4 py-2 border-b border-border">
        <span className="text-xs font-mono text-muted-foreground uppercase">{language}</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="h-8 px-2 hover:bg-accent"
        >
          <Icon name={copied ? 'Check' : 'Copy'} size={14} className="mr-1" />
          <span className="text-xs">{copied ? 'Скопировано' : 'Копировать'}</span>
        </Button>
      </div>
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={{
          margin: 0,
          padding: '1rem',
          background: 'hsl(var(--card))',
          fontSize: '0.875rem',
          lineHeight: '1.5',
        }}
        codeTagProps={{
          style: {
            fontFamily: 'Roboto Mono, monospace',
          }
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};
