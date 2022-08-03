import { toast } from 'react-hot-toast'; // toast notification for react

export default function useToast() {
  // the params are the attributes of the toast
  // this is a normal toast notification
  const normal = ({
    content = 'Je suis un toast',
    icon,
    style,
    className,
    duration,
    position,
  }) => {
    return toast(content, {
      icon: icon,
      className: className,
      style: style,
      duration: duration,
      position: position,
    });
  };

  const success = ({
    text = 'Succès !',
    icon,
    style,
    className,
    duration,
    position,
  }) => {
    return toast.success(text, {
      icon: icon,
      className: className,
      style: style,
      duration: duration,
      position: position,
    });
  };

  const loading = ({
    text = 'Chargement en cours',
    icon,
    style,
    className,
    duration,
    position,
  }) => {
    return toast.loading(text, {
      icon: icon,
      className: className,
      style: style,
      duration: duration,
      position: position,
    });
  };

  const error = ({
    text = 'Une erreur est survenue',
    icon,
    style,
    className,
    duration,
    position,
  }) => {
    return toast.error(text, {
      icon: icon,
      className: className,
      style: style,
      duration: duration,
      position: position,
    });
  };
  // this is  a costum toast
  const custom = ({ content, icon, style, className, duration, position }) => {
    return toast.custom(content, {
      icon: icon,
      className: className,
      style: style,
      duration: duration,
      position: position,
    });
  };

  // this toast is used when there is promise it will change during the loading , the success and the error
  const promise = ({
    promise,
    loadingText = 'Chargement en cours',
    successText = 'Succès !',
    errorText = 'Une erreur est survenue',
    style,
    className,
    duration,
    position,
  }) => {
    // the toast will change when promise is resolved or rejected
    return toast.promise(
      promise,
      {
        loading: loadingText,
        success: successText,
        error: errorText,
      },
      {
        style: style,
        className: className,
        duration: duration,
        position: position,
      }
    );
  };

  // dismiss all toasts
  const dismissAll = () => {
    toast.dismiss();
  };

  // dismiss one toast
  const dismiss = (toastId) => {
    toast.dismiss(toastId);
  };

  return {
    normal,
    success,
    loading,
    error,
    custom,
    promise,
    dismissAll,
    dismiss,
  };
}
