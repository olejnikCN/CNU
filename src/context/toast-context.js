import React, { createContext, useState } from 'react';

const ToastContext = createContext({
  text: '',
  color: '',
  textColor: '',
  icon: '',
  isHidden: true,
  toastPropsHandler: (text, headerText, headerColor, icon, isHidden) => {},
});

const ToastContextProvider = props => {
  const [text, setText] = useState('');
  const [headerText, setHeaderText] = useState('');
  const [headerColor, setHeaderColor] = useState('');
  const [icon, setIcon] = useState('');
  const [isHidden, setIsHidden] = useState(true);

  const toastPropsHandler = (text, headerText, headerColor, icon, isHidden) => {
    setText(text);
    setHeaderColor(headerColor);
    setHeaderText(headerText);
    setIcon(icon);
    setIsHidden(isHidden);
  };

  return (
    <ToastContext.Provider
      value={{
        text: text,
        headerText: headerText,
        headerColor: headerColor,
        icon: icon,
        isHidden: isHidden,
        toastPropsHandler: toastPropsHandler,
      }}
    >
      {props.children}
    </ToastContext.Provider>
  );
};

export { ToastContext, ToastContextProvider };
