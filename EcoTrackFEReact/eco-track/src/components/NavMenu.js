import React from 'react';

const NavMenu = () => {
  return (
    <nav className="nav">
      <input id="menu" type="checkbox" />
      <label htmlFor="menu">Menu</label>
      <ul className="menu">
        <li>
          <a href="#0">
            <span>About</span>
            <i className="fas fa-address-card" aria-hidden="true"></i>
          </a>
        </li>
        <li>
          <a href="#0">
            <span>Projects</span>
            <i className="fas fa-tasks" aria-hidden="true"></i>
          </a>
        </li>
        <li>
          <a href="#0">
            <span>Clients</span>
            <i className="fas fa-users" aria-hidden="true"></i>
          </a>
        </li>
        <li>
          <a href="#0">
          <img src="https://i.ibb.co/0fLnmwN/profile.gif" alt="" style={{ width: "30px", height: "30px" }}
          />
          </a>
        </li>
      </ul>

      {/* Estilos CSS internos */}  
      <style jsx>{`
        :root {
          --white: #ffffff;
          --light-grey: #edf0f1;
          --violet: #32563a;
          --dark-violet: #1f3624;
          --black: #21232a;
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        ul {
          list-style: none;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        body {
          font-family: "Inter", sans-serif;
          background: var(--light-grey);
          color: var(--white);
        }

        /* MAIN STYLES */
        .nav {
          position: fixed;
          bottom: 20px;
          left: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
          background: var(--white);
          padding: 10px;
          border-radius: 50%;
          box-shadow: rgb(50 50 93 / 10%) 0 30px 60px -12px, rgb(0 0 0 / 15%) 0 18px 36px -18px;
        }

        .nav [type="checkbox"] {
          position: absolute;
          left: -9999px;
        }

        .nav [type="checkbox"] + label {
          width: 55px; /* Botón de menú más pequeño */
          height: 55px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          cursor: pointer;
          background: var(--violet);
          border-radius: 50%;
          transition: all 0.2s;
        }

        .nav [type="checkbox"] + label:hover {
          background: var(--dark-violet);
        }

        .menu {
          display: flex;
          flex-direction: row;
          position: absolute;
          bottom: 0;
          left: calc(100% + 10px); /* Se despliegan a la derecha */
        }

        .menu li {
          opacity: 0;
          transition: opacity 0.4s, transform 0.4s;
          transform: translateX(-30px); /* Animación de aparición */
          margin-left: 15px; /* Espaciado adicional entre botones */
        }

        .nav input:checked ~ .menu li {
          opacity: 1;
          transform: translateX(0); /* Los elementos aparecen desde la izquierda */
        }

        .menu li a {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--violet);
        }

        @media (min-width: 769px) {
          .nav {
            display: none; /* Ocultar en pantallas grandes */
          }
        }
      `}</style>
    </nav>
  );
};

export default NavMenu;
