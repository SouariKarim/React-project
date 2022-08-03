// copy to clipboard component

import { CopyToClipboard as CopyToClipboardLib } from 'react-copy-to-clipboard';
import './CopyToClipBoard.scss';
import useToast from '../../hooks/useToast';

export default function CopyToClipBoard({
  toCopy,
  valueClassName = '',
  children,
}) {
  const toast = useToast();

  const afterCopy = () => {
    // render a toast usign the toast component in the root app by invoking the toast custom hook
    toast.success({
      text: 'Copié dans le presse-papiers !',
    });
  };

  return (
    <CopyToClipboardLib text={toCopy} onCopy={afterCopy}>
      <b className={'copy-wrapper ' + valueClassName}>{children}</b>
    </CopyToClipboardLib>
  );
}
