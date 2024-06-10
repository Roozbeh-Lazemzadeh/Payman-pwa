import toast, { Toaster } from 'react-hot-toast';
import './style/style.css';

const handleCopyClick = async (textToCopy: string) => {
  try {
    await navigator.clipboard.writeText(textToCopy);
    if (textToCopy === 'pay.payman.info@gmail.com') {
      toast.success('آدرس ایمیل با موفقیت کپی شد.', {
        icon: null,
        style: {
          borderRadius: '10px',
          background: '#0a0a0a',
          color: '#fff',
          bottom: '12% !important',
        },
      });
    } else {
      toast.success('شماره تماس با موفقیت کپی شد.', {
        icon: null,
        style: {
          borderRadius: '10px',
          background: '#0a0a0a',
          color: '#fff',
        },
      });
    }
    // setTimeout(() => setCopySuccess(''), 2000);
  } catch (error) {
    console.error('Failed to copy', error);
    // setCopySuccess('Failed to copy');
  }
};

function ContactPage() {
  // const [copySuccess, setCopySuccess] = useState('');

  const handleDivClick = (e: {
    currentTarget: {
      querySelector: (arg0: string) => { (): any; new (): any; innerText: any };
    };
  }) => {
    const spanText = e.currentTarget.querySelector('.contact-title').innerText;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    handleCopyClick(spanText);
  };

  return (
    <div className='contact-wrapper'>
      <img className='contact-banner' src='/assets/pics/contact.svg' />
      <div className='contact-details'>
        <div className='contact-detail'>
          <a href='tel:02122989880' className='contact-btn'>
            تماس با پشتیبانی
          </a>
          <div className='contact-left-wrapper' onClick={handleDivClick}>
            <img
              className='contact-left_img'
              src='/assets/pics/copy-icon.svg'
            />
            <span className='contact-title'>۰۲۱-۲۲۹۸۹۸۸۰</span>
          </div>
        </div>
        <div className='contact-detail'>
          <a href='tel:02122989880' className='contact-btn'>
            تماس با پشتیبانی
          </a>
          <div className='contact-left-wrapper' onClick={handleDivClick}>
            <img
              className='contact-left_img'
              src='/assets/pics/copy-icon.svg'
            />
            <span className='contact-title'>۰۲۱-۲۲۹۸۹۸۸۰</span>
          </div>
        </div>
        <div className='contact-detail'>
          <a href='mailto:pay.payman.info@gmail.com' className='contact-btn'>
            ارسال ایمیل
          </a>
          <div className='contact-left-wrapper' onClick={handleDivClick}>
            <img
              className='contact-left_img'
              src='/assets/pics/copy-icon.svg'
            />
            <span className='contact-title'>pay.payman.info@gmail.com</span>
          </div>
        </div>
        <p className='info-login contact'>
          هم‌پیمان‌ عزیز
          <br />
          در هر مرحله استفاده از اپلیکیشن، اگر به کمک و راهنمایی نیاز داشتید،
          همکاران ما در واحد پشتیبانی از ساعت ۹ صبح تا ۱۷ عصر پاسخ‌گوی شما
          خواهند بود.
        </p>
      </div>
      <Toaster containerClassName='toaster-style' position='bottom-center' reverseOrder={false} />
    </div>
  );
}

export default ContactPage;
