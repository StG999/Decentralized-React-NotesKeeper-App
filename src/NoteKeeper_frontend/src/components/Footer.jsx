import React from "react";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <p>Copyright &#169; {year} | StG999</p>
    </footer>
  );
}

export default Footer;
