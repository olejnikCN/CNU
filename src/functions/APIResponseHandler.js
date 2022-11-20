import React from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

export function APIResponseHandler(response, toastCtx) {
  const code = response.status;
  if (code >= 100 && code < 200) {
    toastCtx.toastPropsHandler(
      `Code: ${code}, Status text: ${response.statusText}, Data: ${response.data}`,
      'Informational',
      'info',
      <FaTimesCircle className="mb-1 me-2" />,
      false,
    );
  } else if (code >= 200 && code < 300) {
    toastCtx.toastPropsHandler(
      'Recept byl úspěšně smazán...',
      'Úspěch!',
      'success',
      <FaCheckCircle className="mb-1 me-2" />,
      false,
    );
  } else if (code >= 300 && code < 400) {
    toastCtx.toastPropsHandler(
      `Code: ${code}, Status text: ${response.statusText}, Data: ${response.data}`,
      'Redirection',
      'warning',
      <FaTimesCircle className="mb-1 me-2" />,
      false,
    );
  } else if (code >= 400 && code < 500) {
    toastCtx.toastPropsHandler(
      `Zkuste zkontrolovat Vaše internetové připojení, chyba není na naší straně.
            Code: ${code}, Status text: ${response.statusText}, Data: ${response.data}`,
      'Něco se nepodařilo!',
      'danger',
      <FaTimesCircle className="mb-1 me-2" />,
      false,
    );
  } else if (code >= 500) {
    toastCtx.toastPropsHandler(
      `Omlouváme se za vyskytnuté problémy, chyba vznikla na naší straně.
            Code: ${code}, Status text: ${response.statusText}, Data: ${response.data}`,
      'Něco se nepodařilo!',
      'danger',
      <FaTimesCircle className="mb-1 me-2" />,
      false,
    );
  } else {
    toastCtx.toastPropsHandler(
      `Zkuste zkontrolovat Vaše internetové připojení, chyba není na naší straně.
      ${response}`,
      'Něco se nepodařilo!',
      'danger',
      <FaTimesCircle className="mb-1 me-2" />,
      false,
    );
  }
}
