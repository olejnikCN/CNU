import React, { useEffect, Fragment } from 'react';
import { Button, Container } from 'reactstrap';
import { FaChevronUp } from 'react-icons/fa';

import { Footer } from './Footer';
import { Header } from './Header';

import styles from './Layout.module.css';

export function Layout({ children }) {
  useEffect(() => {
    let mybutton = document.getElementById('backToTopButton');

    window.onscroll = function () {
      scrollFunction();
    };

    function scrollFunction() {
      if (
        document.body.scrollTop > window.innerHeight * 0.5 ||
        document.documentElement.scrollTop > window.innerHeight * 0.5
      ) {
        mybutton.style.display = 'block';
        mybutton.style.position = 'fixed';
        mybutton.style.bottom = '1.25rem';
        mybutton.style.right = '1.25rem';
        mybutton.style.boxShadow =
          '0px 0px 10px 6px rgba(105, 105, 105, 0.596)';
      } else mybutton.style.display = 'none';
    }

    mybutton.addEventListener('click', backToTop);

    function backToTop() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }
  });

  return (
    <Fragment>
      <div className={styles.backwall}>
        <Header />

        <Container className={styles.content}>{children}</Container>

        <Button className="btn btn-dark btn-lg" id="backToTopButton">
          <FaChevronUp className={styles.backToTopButton_icon} />
        </Button>
      </div>

      <Footer />
    </Fragment>
  );
}
