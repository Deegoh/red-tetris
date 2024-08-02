import { createContext, useContext, useState, useCallback } from 'react';

// Create a context to hold the notifications
const NotificationContext = createContext(undefined);

// Create a custom hook to use the context
export function useNotification() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      'useNotification must be used within a NotificationProvider'
    );
  }
  return context;
}

// NotificationProvider component
export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);

  // Function to remove a notification by its ID
  const removeNotif = useCallback((id) => {
    setNotifications((old) => {
      const toCloseNotif = old.findIndex((notif) => notif.id === id);

      if (toCloseNotif !== -1) {
        old[toCloseNotif].open = false;
      }
      return [...old];
    });

    setTimeout(() => {
      setNotifications((old) => old.filter((notif) => notif.id !== id));
    }, 200);
  }, []);

  // Function to add a new notification
  const addNotif = useCallback(
    (content, alertType, expires = 7) => {
      const newNotif = {
        id: Math.random().toString(16).slice(2), // You can use a unique identifier like a timestamp
        text: content,
        type: alertType,
        expiring: expires > 0,
        open: true,
      };

      // Add the new notification to the state
      setNotifications((old) => {
        if (old.filter((notif) => notif.expiring).length >= 5) {
          return [
            ...old.filter(
              (notif) => notif.id !== old.find((n) => n.expiring)?.id
            ),
            newNotif,
          ];
        }
        return [...old, newNotif];
      });

      if (expires) {
        setTimeout(() => {
          removeNotif(newNotif.id);
        }, 1000 * expires);
      }
    },
    [removeNotif]
  );

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotif,
        removeNotif,
      }}>
      {children}
    </NotificationContext.Provider>
  );
}
