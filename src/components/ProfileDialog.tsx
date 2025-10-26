import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import Icon from '@/components/ui/icon';

interface ProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ProfileDialog = ({ open, onOpenChange }: ProfileDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Профиль пользователя</DialogTitle>
          <DialogDescription>
            Настройте свой профиль и параметры ассистента
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20 bg-gradient-to-br from-primary to-secondary">
              <AvatarFallback className="bg-transparent text-white text-2xl">
                <Icon name="User" size={32} />
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Label htmlFor="name">Имя пользователя</Label>
              <Input id="name" placeholder="Введите ваше имя" className="mt-1" defaultValue="Пользователь" />
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Поддержка Lua</Label>
                <p className="text-sm text-muted-foreground">Генерация и помощь с кодом Lua</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Поддержка Python</Label>
                <p className="text-sm text-muted-foreground">Генерация и помощь с кодом Python</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Подсветка синтаксиса</Label>
                <p className="text-sm text-muted-foreground">Автоматическое форматирование кода</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Темная тема</Label>
                <p className="text-sm text-muted-foreground">Темное оформление интерфейса</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
