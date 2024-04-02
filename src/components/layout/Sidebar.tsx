import React from "react";
import { Drawer, Menu } from "antd";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { selectSidebar, toggleSidebar } from "../../store/sidebar/sidebarSlice";
import { getItem } from "../helpers";
import { ReactComponent as DashboardIcon } from "../../icons/defaultHome.svg";
import { ReactComponent as ContactIcon } from "../../icons/defaultContact.svg";
import { ReactComponent as ProfileIcon } from "../../icons/defaultProfile.svg";
import { ReactComponent as InfoIcon } from "../../icons/defaultInfoIcon.svg";
import { ReactComponent as BlogIcon } from "../../icons/defaultBlog.svg";
import "./style.css";
import Slider from "../slider/Slider";

const homeSliderArray = [
  { img: "/assets/banner-sidbar/photo101.png" },
  { img: "/assets/banner-sidbar/photo101.png" },
  { img: "/assets/banner-sidbar/photo101.png" },
  { img: "/assets/banner-sidbar/photo101.png" },
  // { img: '/assets/banner-sidbar/photo102.png' },
  // { img: '/assets/banner-sidbar/photo103.png' },
  // { img: '/assets/banner-sidbar/photo104.png' }
];

export const Sidebar: React.FC = () => {
  const dispatch = useAppDispatch();
  const isSidebarOpen = useAppSelector(selectSidebar);

  const items = [
    getItem({
      label: "داشبورد",
      key: "1",
      icon: <DashboardIcon />,
    }),
    getItem({
      label: "تماس با پیمان",
      key: "2",
      icon: <ContactIcon />,
    }),
    getItem({
      label: "حساب کاربری",
      key: "3",
      icon: <ProfileIcon />,
    }),
    getItem({
      label: "پرسش‌های متداول",
      key: "4",
      icon: <InfoIcon />,
    }),
    getItem({
      label: "بلاگ پیمان",
      key: "5",
      icon: <BlogIcon />,
    }),
  ];

  const CustomTitle = () => {
    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="40" height="40" rx="10" fill="#0072FF" />
          <path
            d="M4.05029 17.9821C4.05029 10.987 9.72091 5.31641 16.716 5.31641H35.949C35.949 12.3115 30.2784 17.9821 23.2833 17.9821H4.05029Z"
            fill="white"
          />
          <path
            d="M8.86133 26.4254C8.86133 23.0574 11.5916 20.3271 14.9596 20.3271H24.3416C24.3416 23.6951 21.6113 26.4254 18.2433 26.4254H8.86133Z"
            fill="white"
          />
          <path
            d="M8.86133 34.8698C8.86133 31.5018 11.5916 28.7715 14.9596 28.7715H19.1815C19.1815 32.1395 16.4512 34.8698 13.0832 34.8698H8.86133Z"
            fill="white"
          />
        </svg>
        <span
          style={{
            fontSize: 14,
            fontWeight: 600,
            marginRight: "10px",
          }}
        >
          خوش آمدید به
        </span>
        <svg
          width="35"
          height="18"
          viewBox="0 0 35 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            marginRight: "3px",
            marginTop: "3px",
          }}
        >
          <path
            d="M3.74527 2.04923C3.89745 1.96472 4.0579 1.92246 4.22692 1.92246C4.39622 1.92246 4.55668 1.96472 4.70885 2.04923C4.86931 2.13374 4.98779 2.2605 5.0723 2.42124C5.16509 2.57313 5.21591 2.73387 5.21591 2.91146C5.21591 3.08048 5.17366 3.24093 5.08915 3.39311C4.99607 3.55385 4.86931 3.68061 4.71713 3.76512C4.55668 3.85791 4.39622 3.90016 4.22692 3.90016C4.0579 3.90016 3.88888 3.85791 3.72843 3.76512C3.57625 3.68061 3.45777 3.55385 3.37326 3.39311C3.28047 3.24093 3.23821 3.08048 3.23821 2.91146C3.23821 2.73387 3.28047 2.57313 3.37326 2.42124C3.45777 2.2605 3.58482 2.13374 3.74527 2.04923ZM9.40714 10.0157C9.40714 12.0105 8.38446 13.0078 6.33909 13.0078H3.01752C1.00584 13.0078 0 12.4245 0 10.43V7.14209C0 6.44031 0.32976 5.68001 0.988993 5.68001C1.63966 5.68829 1.96942 6.02633 1.9777 6.70269V10.0411C1.9777 10.6921 2.33287 11.0133 3.03436 11.0133H6.38991C7.06599 11.0133 7.40403 10.6752 7.40403 9.99058L7.42088 2.64565C7.42088 1.9947 7.75064 1.6735 8.41844 1.6735C9.07767 1.6735 9.40714 2.00326 9.40714 2.67106V10.0157Z"
            fill="#0072FF"
          />
          <path
            d="M14.5039 9.22978C14.8337 9.22978 14.9941 9.56782 14.9856 10.2356C14.9856 10.8948 14.8165 11.2246 14.4785 11.2246H13.27C11.2583 11.2246 10.2524 10.2271 10.2524 8.2325V1.05659C10.2524 0.355102 10.5822 -6.67572e-05 11.2414 -6.67572e-05C11.8921 0.00849819 12.2219 0.355103 12.2301 1.03118V8.25791C12.2301 8.90858 12.5853 9.22978 13.2868 9.22978H14.5039Z"
            fill="#0072FF"
          />
          <path
            d="M25.4411 9.23857C25.7709 9.23857 25.9399 9.56833 25.9399 10.2276C25.9482 10.8951 25.7877 11.2334 25.4579 11.2334H21.9165C21.2236 11.2334 20.8938 10.9967 20.9275 10.5233L20.9447 5.57866C20.9447 4.91943 20.6149 4.58996 19.9557 4.58996H18.6118C17.944 4.58996 17.6059 4.91115 17.6059 5.55354V8.19904C17.6059 8.88368 17.944 9.23 18.6118 9.23L19.4318 9.23857C20.0993 9.23857 20.4373 9.56833 20.4373 10.219C20.4373 10.8951 20.1078 11.2334 19.4486 11.2334H13.4644C13.1349 11.2334 12.9742 10.8951 12.9827 10.2276C12.9827 9.56833 13.1435 9.23857 13.473 9.23857H15.7213C15.6451 8.91737 15.6028 8.56249 15.6028 8.16506V5.57866C15.6028 3.58412 16.6087 2.58684 18.6118 2.58684H19.9388C21.9334 2.58684 22.9309 3.58412 22.9309 5.58723V9.23857H25.4411Z"
            fill="#0072FF"
          />
          <path
            d="M31.7207 9.23834C32.0419 9.23834 32.2023 9.5681 32.2023 10.2356C32.1941 10.8948 32.025 11.2246 31.6953 11.2246H29.1343C28.4751 11.2078 28.1453 10.878 28.1539 10.2356C28.1116 10.8948 27.7736 11.2246 27.1312 11.2246H24.4266C24.0968 11.2246 23.9364 10.8948 23.9364 10.2356C23.9278 9.5681 24.0885 9.23834 24.418 9.23834H27.1312V3.58389C27.1312 2.92466 27.4524 2.5949 28.103 2.5949C28.7794 2.5949 29.126 2.93294 29.1343 3.6093L29.1174 9.23834H31.7207Z"
            fill="#0072FF"
          />
          <path
            d="M34.0195 2.57805C34.6705 2.57805 35 2.90781 35 3.57533V10.2188C35 10.8866 34.6705 11.2246 34.0195 11.2246H30.8498C30.5204 11.2246 30.3513 10.8866 30.3428 10.2188C30.3428 9.55954 30.5035 9.22978 30.8247 9.22978H33.0222V3.54992C33.0222 2.89925 33.3517 2.57805 34.0195 2.57805Z"
            fill="#0072FF"
          />
          <path
            d="M30.328 16.1328C30.328 15.5666 30.8182 15.0933 31.3676 15.0933C31.9254 15.0933 32.4074 15.5666 32.4074 16.1328C32.4325 16.6652 31.9086 17.2063 31.3676 17.1723C30.8351 17.2063 30.3026 16.6652 30.328 16.1328Z"
            fill="#0072FF"
          />
          <path
            d="M26.2927 14.7148H24.1711C23.4865 14.698 23.1484 14.3514 23.1484 13.6753C23.1653 12.9738 23.5036 12.6272 24.1711 12.6355H26.2927C26.9942 12.6272 27.3408 12.9738 27.3322 13.6753C27.3408 14.3682 26.9942 14.7148 26.2927 14.7148Z"
            fill="#0072FF"
          />
          <path
            d="M32.4202 14.7148H30.2986C29.6139 14.698 29.2759 14.3514 29.2759 13.6753C29.293 12.9738 29.631 12.6272 30.2986 12.6355H32.4202C33.1216 12.6272 33.4683 12.9738 33.4597 13.6753C33.4683 14.3682 33.1216 14.7148 32.4202 14.7148Z"
            fill="#0072FF"
          />
        </svg>
      </div>
    );
  };
  const customFooter = () => {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontSize: 10,
            color: "rgba(16, 24, 40, 0.2)",
            fontWeight: 500,
            paddingLeft: 5,
          }}
        >
          توسعه‌یافته توسط پیمان
        </span>
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.37534 4.22426C1.6131 2.81969 2.83551 1.75 4.30776 1.75H9.04165C8.80389 3.15457 7.58148 4.22426 6.10923 4.22426H1.37534Z"
            stroke="#0072FF"
          />
          <path
            d="M2.76445 6.53998C2.95214 6.14234 3.35675 5.86719 3.82563 5.86719H5.78754C5.59985 6.26483 5.19524 6.53998 4.72636 6.53998H2.76445Z"
            stroke="#0072FF"
          />
          <path
            d="M2.76445 8.85639C2.95214 8.45874 3.35675 8.18359 3.82563 8.18359H4.3721C4.18441 8.58124 3.7798 8.85639 3.31092 8.85639H2.76445Z"
            stroke="#0072FF"
          />
        </svg>
      </div>
    );
  };

  return (
    <Drawer
      className="custom-sidebar"
      title={CustomTitle()}
      width={300}
      onClose={() => dispatch(toggleSidebar())}
      open={isSidebarOpen}
      closeIcon={false}
      footer={customFooter()}
    >
      <Menu
        style={{ background: "none" }}
        // onClick={handleNavLink}
        mode="inline"
        selectedKeys={[location.pathname]}
        items={items}
        className="custom-sidebar-menu"
      />
      {/* <div
        style={{
          borderBottom: "1px solid rgba(5, 5, 5, 0.06)",
          width: 260,
        }}
      > */}
      <Slider ImgArray={homeSliderArray} />
      {/* </div> */}
      <div
        style={{
          padding: "30px 10px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18.1592 10.1012H8.125"
            stroke="#FF3672"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15.7202 7.6709L18.1602 10.1009L15.7202 12.5309"
            stroke="#FF3672"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M13.6333 6.35866C13.3583 3.37533 12.2416 2.29199 7.79997 2.29199C1.88247 2.29199 1.88247 4.21699 1.88247 10.0003C1.88247 15.7837 1.88247 17.7087 7.79997 17.7087C12.2416 17.7087 13.3583 16.6253 13.6333 13.642"
            stroke="#FF3672"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span style={{ paddingRight: 10, fontWeight: 500 }}>
          خروج از حساب کاربری
        </span>
      </div>
    </Drawer>
  );
};
