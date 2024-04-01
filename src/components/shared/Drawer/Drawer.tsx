import PropTypes from "prop-types";
import Sheet from "react-modal-sheet";
import { type Dispatch, type SetStateAction, type ReactNode } from "react";
import "./style.css";

interface CustomDrawerProps {
  title: string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
}

export const CustomDrawer: React.FC<CustomDrawerProps> = ({
  isOpen,
  setIsOpen,
  title,
  children,
}) => {
  CustomDrawer.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    setIsOpen: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
  };
  return (
    <>
      <Sheet
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      >
        <Sheet.Container>
          <Sheet.Header>
            <div
              style={{
                display: "flex",
                cursor: "move",
                userSelect: "none",
                direction: "ltr",
                padding: "20px 20px 0px 20px",
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                <path
                  d="M11.9953 7.99561L8.00195 11.9889"
                  stroke="#FF3672"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 11.9943L8 7.99426"
                  stroke="#FF3672"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M2.29175 10.0001C2.29175 15.7809 4.21925 17.7084 10.0001 17.7084C15.7809 17.7084 17.7084 15.7809 17.7084 10.0001C17.7084 4.21925 15.7809 2.29175 10.0001 2.29175C4.21925 2.29175 2.29175 4.21925 2.29175 10.0001Z"
                  stroke="#FF3672"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <svg
                width="73"
                height="4"
                viewBox="0 0 73 4"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ margin: "0 auto" }}
              >
                <rect width="73" height="4" rx="2" fill="#CDCDD0" />
              </svg>
            </div>
            <div
              style={{
                textAlign: "center",
                paddingTop: "20px",
                paddingBottom: "20px",
                color: "rgba(16, 24, 40, 1)",
                fontSize: 18,
                fontWeight: 500,
              }}
            >
              {title}
            </div>
          </Sheet.Header>
          <Sheet.Content>{children}</Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop onTap={() => setIsOpen(false)} />
      </Sheet>
    </>
  );
};
