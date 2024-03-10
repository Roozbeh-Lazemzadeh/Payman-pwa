interface ItemProps {
  label: string;
  key: string;
  icon: React.ReactNode; // Adjust the type based on the type of icon you expect
  children?: React.ReactNode;
}

export function getItem({ label, key, icon, children }: ItemProps) {
  return {
    key,
    icon,
    children,
    label,
  };
}
