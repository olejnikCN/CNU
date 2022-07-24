import { Container } from 'reactstrap';
import { FaChevronUp } from 'react-icons/fa';

import { Footer } from './Footer';
import { Header } from './Header';
import '../styles/Layout.css';
import { useEffect } from 'react';

export function Layout({ children }) {

  useEffect(() => {
    let mybutton = document.getElementById("backToTopButton");

    window.onscroll = function () {
      scrollFunction();
    };

    function scrollFunction() {
      if ( document.body.scrollTop > (window.innerHeight * 0.5) || document.documentElement.scrollTop > (window.innerHeight * 0.5) )
        mybutton.style.display = "block";
      else
        mybutton.style.display = "none";
    }

    mybutton.addEventListener("click", backToTop);

    function backToTop() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }
  });

  return (
    <div>
      <div className='backwall'>
        <Header />

        <Container className="py-4 itemsContainer boxShadow" style={{'minHeight':'calc(100vh - 111px)', 'marginTop': '55px'}}>{children}</Container>

        <button type="button" className="btn btn-dark btn-floating btn-lg buttonShadow" id="backToTopButton">
          <FaChevronUp className='mb-1'/>
        </button>
      </div>

      <Footer className='boxShadow' />
    </div>

  );
}
