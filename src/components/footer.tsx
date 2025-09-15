import { ShieldCheck, Mail, Phone, MessageCircle, Instagram, Linkedin, Youtube, Twitter, Facebook } from "lucide-react";
import Link from "next/link";

const footerLinks = {
  policy: [
    { name: "Privacy", href: "#" },
    { name: "Fraud Advice", href: "#" },
    { name: "Customer Protection", href: "#" },
    { name: "Dispute Resolution", href: "#" },
    { name: "Terms of use", href: "#" },
    { name: "Cancelations and Refunds", href: "#" },
  ],
  general: [
    { name: "Contact Us", href: "#" },
    { name: "Reviews", href: "#" },
    { name: "Disclaimer", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Fraud Reporting", href: "#" },
  ],
};

const socialLinks = [
  { icon: Instagram, href: "https://www.instagram.com/compareafrica/", 'aria-label': 'Instagram' },
  { icon: Linkedin, href: "https://www.linkedin.com/company/compare-africa/", 'aria-label': 'LinkedIn' },
  { icon: Youtube, href: "#", 'aria-label': 'YouTube' },
  { icon: Twitter, href: "#", 'aria-label': 'Twitter' },
  { icon: Facebook, href: "#", 'aria-label': 'Facebook' },
];

const Footer = () => {
  return (
    <footer className="bg-primary/90 text-primary-foreground">
      <div className="container mx-auto pt-16 pb-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo and Contact Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <ShieldCheck className="w-10 h-10" />
              <h1 className="text-3xl font-bold font-headline">Compare Africa</h1>
            </div>
            <div className="flex space-x-4 mb-8">
              {socialLinks.map((social, index) => (
                <a key={index} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social['aria-label']} className="text-primary-foreground hover:text-accent transition-colors">
                  <social.icon className="w-6 h-6" />
                </a>
              ))}
            </div>
            <div className="space-y-4 max-w-sm">
                <a href="mailto:support@chebe.ng" className="flex items-center gap-4 p-3 border border-primary-foreground/50 rounded-lg hover:bg-primary-foreground/10">
                    <Mail className="w-5 h-5"/>
                    <span>support@chebe.ng</span>
                </a>
                 <a href="https://wa.me/2348044851869" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-3 border border-primary-foreground/50 rounded-lg hover:bg-primary-foreground/10">
                    <MessageCircle className="w-5 h-5"/>
                    <span>+234 804 485 1869</span>
                </a>
                 <a href="tel:+2348044851869" className="flex items-center gap-4 p-3 border border-primary-foreground/50 rounded-lg hover:bg-primary-foreground/10">
                    <Phone className="w-5 h-5"/>
                    <span>+234 804 485 1869</span>
                </a>
            </div>
          </div>

          {/* Policy Links */}
          <div>
            <h3 className="font-headline font-semibold text-lg mb-4">Policy</h3>
            <ul className="space-y-3">
              {footerLinks.policy.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-accent transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* General Links */}
          <div>
            <h3 className="font-headline font-semibold text-lg mb-4">General</h3>
            <ul className="space-y-3">
              {footerLinks.general.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-accent transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-16 pt-6 border-t border-primary-foreground/20 text-center text-sm text-primary-foreground/70">
            <p>POWERED BY COMPARE AFRICA</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
