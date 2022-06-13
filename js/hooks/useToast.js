import {toast} from "react-hot-toast";


export default function useToast() {

    const normal = ({content = "Je suis un toast", icon, style, className, duration, position}) => {
        return toast(content, {
            icon: icon,
            className: className,
            style: style,
            duration: duration,
            position: position
        })
    }

    const success = ({text = "Succès !", icon, style, className, duration, position}) => {
        return toast.success(text, {
            icon: icon,
            className: className,
            style: style,
            duration: duration,
            position: position
        })
    }

    const loading = ({text = "Chargement en cours", icon, style, className, duration, position}) => {
        return toast.loading(text, {
            icon: icon,
            className: className,
            style: style,
            duration: duration,
            position: position
        })
    }

    const error = ({text = "Une erreur est survenue", icon, style, className, duration, position}) => {
        return toast.error(text, {
            icon: icon,
            className: className,
            style: style,
            duration: duration,
            position: position
        })
    }

    const custom = ({content, icon, style, className, duration, position}) => {
        return toast.custom(content, {
            icon: icon,
            className: className,
            style: style,
            duration: duration,
            position: position
        })
    }

    const promise = ({promise, loadingText = "Chargement en cours", successText = "Succès !", errorText = "Une erreur est survenue", style, className, duration, position}) => {
        return toast.promise(promise, {
            loading: loadingText,
            success: successText,
            error: errorText
        }, {
            style: style,
            className: className,
            duration: duration,
            position: position
        })
    }

    const dismissAll = () => {
        toast.dismiss()
    }

    const dismiss = (toastId) => {
        toast.dismiss(toastId)
    }

    return {
        normal,
        success,
        loading,
        error,
        custom,
        promise,
        dismissAll,
        dismiss
    }
}