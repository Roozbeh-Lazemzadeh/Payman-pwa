import './style.css';

interface FooterAppProps {
  topSpace: string;
}

const FooterApp: React.FC<FooterAppProps> = ({ topSpace }) => {
  return (
    <div className='footer-wrapper' style={{ marginTop: topSpace }}>
      <img
        className='footer-wrapper_img'
        src='/assets/logo-splash/payman-logo-footer.svg'
        alt='Payman Logo'
      />
      <p>توسعه‌یافته توسط پیمان</p>
    </div>
  );
};

export default FooterApp;
