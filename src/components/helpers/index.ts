import { useNavigate } from "react-router-dom";
import { toggleSidebar } from "../../store/sidebar/sidebarSlice";
import { useDispatch } from "react-redux";
import { searchedToggle } from "../../store/footer/footerSlice";

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
    // for closing sidebar
    if (key.length === 1) {
      console.log(key.length);
      dispatch(toggleSidebar());
    }

    // for navigating the page
    if (key === "4") {
      navigate("/faq");
    } else if (key === "2") {
      navigate("/contact-us");
    } else if (key === "1") {
      navigate("/home");
    } else if (key === "3") {
      navigate("/profile");
    }

    // for filtering price , date, merchants
    if (key.length === 3) {
      console.log(key);
      dispatch(searchedToggle(key));
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
