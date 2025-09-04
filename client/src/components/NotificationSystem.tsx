import { useState, useEffect } from "react";
import { X, Info, CheckCircle, AlertTriangle } from "lucide-react";

interface Notification {
  id: string;
  message: string;
  type: 'info' | 'success' | 'warning';
  duration?: number;
}

interface NotificationSystemProps {
  notifications: Notification[];
  onDismiss: (id: string) => void;
}

export function NotificationSystem({ notifications, onDismiss }: NotificationSystemProps) {
  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'info':
        return <Info className="h-4 w-4 text-primary" />;
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      default:
        return <Info className="h-4 w-4 text-primary" />;
    }
  };

  return (
    <div className="fixed top-20 right-4 z-50 space-y-2" data-testid="notification-container">
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onDismiss={onDismiss}
          getIcon={getIcon}
        />
      ))}
    </div>
  );
}

function NotificationItem({ 
  notification, 
  onDismiss, 
  getIcon 
}: { 
  notification: Notification; 
  onDismiss: (id: string) => void;
  getIcon: (type: Notification['type']) => JSX.Element;
}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onDismiss(notification.id), 300);
    }, notification.duration || 5000);

    return () => clearTimeout(timer);
  }, [notification.id, notification.duration, onDismiss]);

  return (
    <div
      className={`glass-morphism p-4 rounded-lg shadow-lg max-w-sm transform transition-transform duration-300 ${
        isVisible ? 'translate-x-0' : 'translate-x-full'
      }`}
      data-testid={`notification-${notification.id}`}
    >
      <div className="flex items-center space-x-3">
        {getIcon(notification.type)}
        <span className="text-foreground text-sm flex-1" data-testid="notification-message">
          {notification.message}
        </span>
        <button
          onClick={() => onDismiss(notification.id)}
          className="text-muted-foreground hover:text-foreground"
          data-testid="notification-dismiss"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
