import {Toaster} from "react-hot-toast";


export default function JeanToaster() {

    return (
        <Toaster
            position="bottom-left"
            toastOptions={{
                style: {
                    fontFamily: "Roboto",
                    borderRadius: "0.3rem",
                    justifyContent: "flex-start !important",
                },

                success: {
                    iconTheme: {
                        primary: '#00DDD0',
                        secondary: '#FFFAEE',
                    },
                },
            }}
        />
    )
}