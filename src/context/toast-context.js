import React, { createContext, useState, useEffect, useContext } from 'react';

const ToastContext = createContext({
  text: '',
  recipeName: '',
  errorText: '',
  headerText: '',
  headerColor: '',
  icon: '',
  isHidden: true,
  timer: 0,
  toastPropsHandler: (
    text,
    recipeName,
    errorText,
    hText,
    hColor,
    icon,
    isHidden,
    timer,
  ) => {},
});

const ToastContextProvider = props => {
  const [text, setText] = useState('');
  const [recipeName, setRecipeName] = useState('');
  const [errorText, setErrorText] = useState('');
  const [headerText, setHeaderText] = useState('');
  const [headerColor, setHeaderColor] = useState('');
  const [icon, setIcon] = useState('');
  const [isHidden, setIsHidden] = useState(true);
  const [timer, setTimer] = useState(5000);

  useEffect(() => {
    if (timer !== 0 && !isHidden) {
      const id = setTimeout(() => {
        toastPropsHandler(
          text,
          recipeName,
          errorText,
          headerText,
          headerColor,
          icon,
          true,
          0,
        );
      }, timer);

      return () => clearTimeout(id);
    }
  }, [isHidden, timer]);

  const toastPropsHandler = (
    text,
    recipeName,
    errorText,
    hText,
    hColor,
    icon,
    isHidden,
    timer,
  ) => {
    setText(text);
    setRecipeName(recipeName);
    setErrorText(errorText);
    setHeaderColor(hColor);
    setHeaderText(hText);
    setIcon(icon);
    setIsHidden(isHidden);
    setTimer(timer);
  };

  return (
    <ToastContext.Provider
      value={{
        text: text,
        recipeName: recipeName,
        errorText: errorText,
        headerText: headerText,
        headerColor: headerColor,
        icon: icon,
        isHidden: isHidden,
        timer: timer,
        toastPropsHandler: toastPropsHandler,
      }}
    >
      {props.children}
    </ToastContext.Provider>
  );
};

export { ToastContext, ToastContextProvider };
