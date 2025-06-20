import { useState } from "react";
import "./DashBoard.css";
import ChatBotIcon from "../ChatBot/ChatBotIcon";
import Header from "../Partials/Header";
import Footer from "../Partials/Footer";


function DashBoard() {
  return (
    <div className="dashboard">
      
      <main>
        <table className="purchase-table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Project</th>
              <th>Status</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Indent</td>
              <td>The Drizzle</td>
              <td>Re-check</td>
              <td>3</td>
            </tr>
            <tr>
              <td>Marge Indent</td>
              <td>The Drizzle (Other)</td>
              <td>New</td>
              <td>2</td>
            </tr>
          </tbody>
        </table>
      </main>

      <Footer />
      <ChatBotIcon />
    </div>
  );
}

export default DashBoard;
