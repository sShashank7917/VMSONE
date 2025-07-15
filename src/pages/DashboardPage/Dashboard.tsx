import { useEffect, useState } from "react";
import "./Dashboard.css";
import { 
  Users, 
  Calendar, 
  Building, 
  Clock, 
  Settings,
  Phone,
  Mail,
  User
} from "lucide-react";
import { DUMMY_VISITORS } from "./constant";

// Define the Visitor interface
export interface Visitor {
  VISITOR_ID: string | number;
  FULL_NAME: string;
  COMPANY: string;
  PHONE: string;
  EMAIL: string;
  HOST: string;
  CATEGORY: string;
  PURPOSE: string;
  CHECK_IN_TIME: string;
}

const Dashboard = () => {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [day, setDay] = useState("");
  // Type the visitors state properly
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const dayStr = now.toLocaleDateString(undefined, { weekday: "long" });
      const dateStr = now.toLocaleDateString();

      setTime(`${hours}:${minutes}`);
      setDate(dateStr);
      setDay(dayStr);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setLoading(true);
    // simulate network delay
    setTimeout(() => {
      setVisitors(DUMMY_VISITORS);
      setLoading(false);
    }, 500);
  }, []);

  const formatDateTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  };

  const getCategoryColor = (category: string): string => {
    switch (category.toLowerCase()) {
      case 'employee':
        return '#4caf50';
      case 'guest':
        return '#ff9800';
      case 'contractor':
        return '#2196f3';
      default:
        return '#9e9e9e';
    }
  };

  const todayVisitors = visitors.filter(visitor => {
    const visitDate = new Date(visitor.CHECK_IN_TIME);
    const today = new Date();
    return visitDate.toDateString() === today.toDateString();
  });

  const uniqueCompanies = [...new Set(visitors.map(v => v.COMPANY))].length;

  return (
    <div className="container">
      <div className="MainHeaderContainer">
        <div className="timeContainer">
          <div className="time">{time}</div>
          <div className="bar"></div>
          <div className="dateContainer">
            <div className="day">{day}</div>
            <div className="date">{date}</div>
          </div>
        </div>

        <div className="logoContainer">
          <img src="/logo-white.png" alt="Logo" className="logo" />
        </div>
      </div>

      <div className="CenterContainer">
        <h2 className="MainText">VMSONE Dashboard</h2>
        
        {/* Summary Cards */}
        <div className="cardsContainer">
          <div className="card">
            <Users size={40} className="cardIcon" />
            <div className="cardText">
              <div className="cardNumber">{visitors.length}</div>
              <div className="cardLabel">Total Visitors</div>
            </div>
          </div>

          <div className="card">
            <Calendar size={40} className="cardIcon" />
            <div className="cardText">
              <div className="cardNumber">{todayVisitors.length}</div>
              <div className="cardLabel">Today's Visitors</div>
            </div>
          </div>

          <div className="card">
            <Building size={40} className="cardIcon" />
            <div className="cardText">
              <div className="cardNumber">{uniqueCompanies}</div>
              <div className="cardLabel">Companies</div>
            </div>
          </div>

          <div className="card">
            <Clock size={40} className="cardIcon" />
            <div className="cardText">
              <div className="cardNumber">{visitors.length}</div>
              <div className="cardLabel">Active Visits</div>
            </div>
          </div>
        </div>

        {/* Visitors Table */}
        <div className="tableContainer">
          <table className="table">
            <thead className="tableHeader">
              <tr>
                <th className="tableHeaderCell">ID</th>
                <th className="tableHeaderCell">Name</th>
                <th className="tableHeaderCell">Company</th>
                <th className="tableHeaderCell">Contact</th>
                <th className="tableHeaderCell">Host</th>
                <th className="tableHeaderCell">Category</th>
                <th className="tableHeaderCell">Purpose</th>
                <th className="tableHeaderCell">Check-in Time</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={8} className="loadingMessage">
                    Loading visitors...
                  </td>
                </tr>
              ) : visitors.length === 0 ? (
                <tr>
                  <td colSpan={8} className="loadingMessage">
                    No visitors found
                  </td>
                </tr>
              ) : (
                visitors.map((visitor) => {
                  const checkIn = formatDateTime(visitor.CHECK_IN_TIME);
                  return (
                    <tr key={visitor.VISITOR_ID} className="tableRow">
                      <td className="tableCell">{visitor.VISITOR_ID}</td>
                      <td className="tableCell">
                        <div className="cellWithIcon">
                          <User size={16} />
                          {visitor.FULL_NAME}
                        </div>
                      </td>
                      <td className="tableCell">
                        <div className="cellWithIcon">
                          <Building size={16} />
                          {visitor.COMPANY}
                        </div>
                      </td>
                      <td className="tableCell">
                        <div className="contactCell">
                          <div className="contactItem">
                            <Phone size={14} />
                            {visitor.PHONE}
                          </div>
                          <div className="contactItem contactEmail">
                            <Mail size={14} />
                            {visitor.EMAIL}
                          </div>
                        </div>
                      </td>
                      <td className="tableCell">{visitor.HOST}</td>
                      <td className="tableCell">
                        <span
                          className="chip"
                          style={{ backgroundColor: getCategoryColor(visitor.CATEGORY) }}
                        >
                          {visitor.CATEGORY}
                        </span>
                      </td>
                      <td className="tableCell">{visitor.PURPOSE}</td>
                      <td className="tableCell">
                        <div className="dateTimeCell">
                          <div className="dateText">{checkIn.date}</div>
                          <div className="timeText">{checkIn.time}</div>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="BottomRightContainer">
        <div className="textContainer">
          <div>Powered By</div>
          <div>VMSONE</div>
        </div>
        <Settings size={20} />
      </div>
    </div>
  );
};

export default Dashboard;