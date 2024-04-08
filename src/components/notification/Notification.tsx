import React from "react";
import { NotificationItem } from "./NotificationItem";
import { ReactComponent as NotificationIcon } from "../../icons/payman2.svg";
import { ReactComponent as Notification2Icon } from "../../icons/tapsi.svg";

const Notification: React.FC = () => {
  return (
    <div>
      <div>
        <NotificationItem
          icon={<NotificationIcon />}
          text="مدت زمان پیمان شما در اسنپ رو به اتمام است. در صورت تمایل، می‌توانید آن را تمدید کنید."
          date="۲۳ آبان ۱۴۰۲"
          isNew
        />
      </div>
      <div>
        <NotificationItem
          icon={<Notification2Icon />}
          text="پرداخت تپسی شما موفق آمیز نبوده است . پول در طی ۴۸ ساعت به حساب شما برگشت خواهد خورد. "
          date="۲۳ آبان ۱۴۰۲"
        />
      </div>
      <div>
        <NotificationItem
          icon={<Notification2Icon />}
          text="کاربر گرامی یک پرداخت ناموفق با ارور ( پرداخت نا مشخص ) برای شما ثبت شده است شما میتوانید مستندات نوع ارور را از فایل زیر پیگیری کنید . کد پیگیری درخواست شما : LKDE32"
          date="۲۳ آبان ۱۴۰۲"
        />
      </div>
    </div>
  );
};

export default Notification;
