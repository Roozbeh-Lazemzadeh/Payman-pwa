import { useNavigate } from 'react-router-dom';
import { toggle } from '../../store/sidebar/sidebarSlice';
import { useDispatch } from 'react-redux';

interface ItemProps {
  label: string;
  key: string;
  icon: React.ReactNode;
  children?: React.ReactNode;
}

export function getItem({ label, key, icon, children }: ItemProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = () => {
    dispatch(toggle());
    if (key === '4') {
      navigate('/faq');
    } else if (key === '2') {
      navigate('/contact-us');
    } else if (key === '1') {
      navigate('/home');
    }
  };

  return {
    key,
    icon,
    children,
    label,
    onClick: handleClick,
  };
}
