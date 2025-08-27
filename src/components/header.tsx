import { ShieldCheck } from 'lucide-react';

const Header = () => {
  return (
    <header className="py-4 px-4 md:px-8 lg:px-16 bg-background/80 backdrop-blur-sm sticky top-0 z-50 border-b border-border">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-8 h-8 text-primary" />
          <h1 className="text-2xl font-bold font-headline text-primary">AssureView</h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
