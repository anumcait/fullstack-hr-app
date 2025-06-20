import { useState } from "react";
import { FaTruckFast } from "react-icons/fa6";
import { MdArrowDropDownCircle } from "react-icons/md";
import { VscFiles } from "react-icons/vsc";

const Footer = () => {
  const [footerOpen, setFooterOpen] = useState(false);
  const toggleFooter = () => {
    setFooterOpen(!footerOpen);
  }
  return (
    <footer className={`footer ${footerOpen ? "footer-expanded" : ""}`}>
      <div className="footer-icon" onClick={toggleFooter}>
        {footerOpen ? "🔼 Close Footer" : "🔽 Open Footer"}
      </div>
      <div className={`footer-content ${footerOpen ? "show" : ""}`}>
        <p>Footer content is now visible above.</p>
        <MdArrowDropDownCircle className="footer-icon2" />
        <FaTruckFast className="footer-icon2" />
        <VscFiles className="footer-icon2" />
        <FaTruckFast className="footer-icon2" />
        <VscFiles className="footer-icon2" />

      </div>
    </footer>
  )
}

export default Footer