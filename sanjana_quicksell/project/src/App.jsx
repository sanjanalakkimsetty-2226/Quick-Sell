import { useState } from 'react';
import { tickets } from './data/mockData';
import './App.css';

function App() {
  const [grouping, setGrouping] = useState('status');
  const [ordering, setOrdering] = useState('priority');
  const [isOpen, setIsOpen] = useState(false);

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Todo': return '○';
      case 'In Progress': return '◐';
      case 'Done': return '✓';
      case 'Canceled': return '✕';
      default: return '○';
    }
  };

  const groupTickets = () => {
    const grouped = {};
    
    if (grouping === 'status') {
      grouped['Todo'] = [];
      grouped['In Progress'] = [];
      grouped['Done'] = [];
      grouped['Canceled'] = [];
    }
    
    tickets.forEach(ticket => {
      const key = grouping === 'status' ? ticket.status :
                 grouping === 'user' ? ticket.assignee :
                 ticket.priority.toString();
                 
      if (!grouped[key]) {
        grouped[key] = [];
      }
      grouped[key].push(ticket);
    });

    Object.keys(grouped).forEach(key => {
      grouped[key].sort((a, b) => {
        if (ordering === 'priority') {
          return b.priority - a.priority;
        }
        return a.title.localeCompare(b.title);
      });
    });

    return grouped;
  };

  const getPriorityLabel = (priority) => {
    const labels = {
      4: 'Urgent',
      3: 'High',
      2: 'Medium',
      1: 'Low',
      0: 'No priority'
    };
    return labels[priority];
  };

  const grouped = groupTickets();

  return (
    <div className="app">
      <header>
        <div className="display-button" onClick={() => setIsOpen(!isOpen)}>
          <span>≡</span> Display
          {isOpen && (
            <div className="dropdown">
              <div className="dropdown-item">
                <span>Grouping</span>
                <select value={grouping} onChange={(e) => setGrouping(e.target.value)}>
                  <option value="status">Status</option>
                  <option value="user">User</option>
                  <option value="priority">Priority</option>
                </select>
              </div>
              <div className="dropdown-item">
                <span>Ordering</span>
                <select value={ordering} onChange={(e) => setOrdering(e.target.value)}>
                  <option value="priority">Priority</option>
                  <option value="title">Title</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </header>

      <div className="board">
        {Object.entries(grouped).map(([group, items]) => (
          <div key={group} className="column">
            <div className="column-header">
              <h2>
                <span className={`status-icon ${group.toLowerCase().replace(' ', '')}`}>
                  {grouping === 'status' ? getStatusIcon(group) : ''}
                </span>
                {grouping === 'priority' ? getPriorityLabel(parseInt(group)) : group}
                <span className="count">{items.length}</span>
              </h2>
            </div>
            <div className="tickets">
              {items.map(ticket => (
                <div key={ticket.id} className="ticket">
                  <div className="ticket-header">
                    <span className="ticket-id">{ticket.id}</span>
                    <div className="avatar">{ticket.assignee[0]}</div>
                  </div>
                  <h3 className="ticket-title">{ticket.title}</h3>
                  <div className="ticket-footer">
                    <span className="priority">
                      {ticket.priority === 4 ? '!!!' :
                       ticket.priority === 3 ? '!!' :
                       ticket.priority === 2 ? '!' :
                       ticket.priority === 1 ? '↓' : '○'}
                    </span>
                    <span className="tag">● {ticket.tag}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;