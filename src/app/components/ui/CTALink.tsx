// CTA Link component
import Link from 'next/link';
import { ArrowRight } from 'lucide-react'; // Import an icon from lucide-react

// Type for the CtaLink props
interface CtaLinkProps {
  href: string;
  children: React.ReactNode;
  variant?: 'text' | 'button';
  size?: 'sm' | 'md' | 'lg';
  icon?: boolean;
  onClick?: () => void;
}

const CtaLink: React.FC<CtaLinkProps> = ({ 
  href, 
  children, 
  variant = 'text', 
  size = 'md', 
  icon = false,
  onClick 
}) => {
  const sizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };
  
  const variants = {
    text: "text-[#1273EB] font-medium hover:underline",
    button: "bg-[#1273EB] text-white rounded-md hover:bg-[#1273EB]/90 transition-colors"
  };
  
  const padding = variant === 'button' ? 'px-4 py-2' : '';
  
  return (
    <Link 
      href={href} 
      className={`inline-flex items-center ${variants[variant]} ${sizes[size]} ${padding}`}
      onClick={onClick}
    >
      <span>{children}</span>
      {icon && variant === 'text' && <ArrowRight size={14} className="ml-1" />}
    </Link>
  );
};

export default CtaLink;