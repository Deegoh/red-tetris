import { Alert } from '@material-tailwind/react';
import { useNotification } from 'src/app/notifications';

export function NotificationsContainer() {
  const { notifications, removeNotif } = useNotification();

  function notifColor(type) {
    switch (type) {
      case 'question':
        return {
          borderColor: 'rgb(240 98 146)',
          backgroundColor: 'rgb(252 228 236)',
          color: 'rgb(240 98 146)',
        };

      case 'info':
        return {
          borderColor: 'rgb(30 136 229)',
          backgroundColor: 'rgb(187 222 251)',
          color: 'rgb(30 136 229)',
        };

      case 'success':
        return {
          borderColor: 'rgb(67 160 71)',
          backgroundColor: 'rgb(200 230 201)',
          color: 'rgb(67 160 71)',
        };

      case 'warning':
        return {
          borderColor: 'rgb(255 143 0)',
          backgroundColor: 'rgb(255 236 179)',
          color: 'rgb(255 143 0)',
        };

      case 'error':
        return {
          borderColor: 'rgb(229 57 53)',
          backgroundColor: 'rgb(255 205 210)',
          color: 'rgb(229 57 53)',
        };
    }
  }

  return (
    <div className='absolute bottom-0 right-0 mb-5 mr-5 z-[99999] space-y-2'>
      {notifications.map((notif) => (
        <Alert
          key={notif.id}
          open={notif.open}
          animate={{
            mount: { x: 0 },
            unmount: { x: 200 },
          }}
          onClose={() => {
            removeNotif(notif.id);
          }}
          className={`rounded-none border-l-4 font-medium`}
          style={{ ...notifColor(notif.type.toLowerCase()) }}
          data-testid='notification'>
          <div className='flex flex-row gap-2'>{notif.text}</div>
        </Alert>
      ))}
    </div>
  );
}
