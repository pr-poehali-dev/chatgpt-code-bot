import { useState, useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-lua';
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

  useEffect(() => {
    Prism.highlightAll();
  }, [code, language]);

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

  const languageClass = `language-${language}`;

  return (
    <div className="relative group my-4 rounded-lg overflow-hidden border border-border bg-[#1d1f21]">
      <div className="flex items-center justify-between bg-[#2d2d2d] px-4 py-2 border-b border-border">
        <span className="text-xs font-mono text-gray-400 uppercase">{language}</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="h-8 px-2 hover:bg-[#3d3d3d] text-gray-300"
        >
          <Icon name={copied ? 'Check' : 'Copy'} size={14} className="mr-1" />
          <span className="text-xs">{copied ? 'Скопировано' : 'Копировать'}</span>
        </Button>
      </div>
      <pre className="!m-0 !p-4 !bg-[#1d1f21] overflow-x-auto">
        <code className={languageClass} style={{ fontFamily: 'Roboto Mono, monospace', fontSize: '0.875rem' }}>
          {code}
        </code>
      </pre>
    </div>
  );
};
