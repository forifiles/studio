import { ShieldCheck } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary/50">
      <div className="container mx-auto py-6 px-4 text-center text-muted-foreground">
        <div className="flex items-center justify-center gap-2 mb-2">
          <ShieldCheck className="w-6 h-6 text-primary" />
          <h3 className="text-xl font-bold font-headline text-primary">Compare Africa</h3>
        </div>
        <p className="text-sm">&copy; {new Date().getFullYear()} Compare Africa. All rights reserved.</p>
        <p className="text-xs mt-2">Your trusted partner in securing your future.</p>
      </div>
    </footer>
  )
}

export default Footer;
