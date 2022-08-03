// this is a toast to display
import { Toaster } from 'react-hot-toast';

// in the used component, this component needs a function witch will take the displayed text and render this toast component

export default function JeanToaster() {
  return (
    <Toaster
      position='bottom-left'
      toastOptions={{
        style: {
          fontFamily: 'Roboto',
          borderRadius: '0.3rem',
          justifyContent: 'flex-start !important',
        },

        success: {
          iconTheme: {
            primary: '#00DDD0',
            secondary: '#FFFAEE',
          },
        },
      }}
    />
  );
}
