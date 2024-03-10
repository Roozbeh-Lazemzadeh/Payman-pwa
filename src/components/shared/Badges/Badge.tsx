import PropTypes from 'prop-types';

interface NumberedBadgeProps {
  number: number;
}

export const NumberedBadge: React.FC<NumberedBadgeProps> = ({ number }) => {
  return (
    <div style={{ marginRight: 25, marginTop: 25 }}>
      <div style={{ position: 'relative' }}>
        <div
          style={{
            position: 'absolute',
            width: 16,
            height: 16,
            backgroundColor: 'rgba(255, 54, 114, 0.2)',
            top: 0,
            right: 0,
            transform: 'translate(50%, -50%)',
            borderRadius: '50%',
          }}
        >
          <div
            style={{
              position: 'absolute',
              width: 9,
              height: 9,
              backgroundColor: 'rgba(255, 54, 114)',
              borderRadius: '50%',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: 9,
              fontWeight: 400,
              color: 'rgba(255, 255, 255, 1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {number}
          </div>
        </div>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            border: '1px solid #CDCDD0',
            borderRadius: '10px',
            padding: '5px',
          }}
        >
          <path
            d="M9.28635 14.9023H3.89258"
            stroke="#0072FF"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.6709 14.9032C12.6709 16.6047 13.2383 17.1713 14.9391 17.1713C16.6398 17.1713 17.2072 16.6047 17.2072 14.9032C17.2072 13.2017 16.6398 12.635 14.9391 12.635C13.2383 12.635 12.6709 13.2017 12.6709 14.9032Z"
            stroke="#0072FF"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M11.8137 6.16187H17.2067"
            stroke="#0072FF"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.4294 6.16074C8.4294 4.45999 7.86198 3.89258 6.16124 3.89258C4.45975 3.89258 3.89233 4.45999 3.89233 6.16074C3.89233 7.86223 4.45975 8.42889 6.16124 8.42889C7.86198 8.42889 8.4294 7.86223 8.4294 6.16074Z"
            stroke="#0072FF"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
};

NumberedBadge.propTypes = {
  number: PropTypes.number.isRequired,
};

export const NotificationBadge: React.FC = () => {
  return (
    <div style={{ marginRight: 25, marginTop: 25 }}>
      <div style={{ position: 'relative' }}>
        <div
          style={{
            position: 'absolute',
            width: 9,
            height: 9,
            backgroundColor: 'rgba(255, 54, 114, 0.2)',
            top: 0,
            right: 0,
            transform: 'translate(50%, -50%)',
            borderRadius: '50%',
          }}
        >
          <div
            style={{
              position: 'absolute',
              width: 5,
              height: 5,
              backgroundColor: 'rgba(255, 54, 114)',
              borderRadius: '50%',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: 9,
              fontWeight: 400,
              color: 'rgba(255, 255, 255, 1)',
            }}
          ></div>
        </div>

        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            border: '1px solid #E9E9E9',
            borderRadius: '10px',
            padding: '5px',
          }}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9.99707 2.09521C6.30183 2.09521 4.69627 5.44125 4.69627 7.65315C4.69627 9.30633 4.93596 8.81982 4.02088 10.8365C2.90342 13.7103 7.39707 14.8849 9.99707 14.8849C12.5963 14.8849 17.0899 13.7103 15.9733 10.8365C15.0582 8.81982 15.2979 9.30633 15.2979 7.65315C15.2979 5.44125 13.6915 2.09521 9.99707 2.09521Z"
            stroke="#101828"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M11.9218 17.0935C10.8432 18.2983 9.16067 18.3126 8.07178 17.0935"
            stroke="#101828"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
};
