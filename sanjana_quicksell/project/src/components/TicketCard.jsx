function TicketCard({ ticket }) {
  const getPriorityIcon = (priority) => {
    switch(priority) {
      case 4: return '!!!';
      case 3: return '!!';
      case 2: return '!';
      case 1: return '↓';
      default: return '○';
    }
  };

  return (
    <div className="ticket-card">
      <div className="ticket-header">
        <span className="ticket-id">{ticket.id}</span>
        <div className="avatar">{ticket.assignee.charAt(0)}</div>
      </div>
      <h3 className="ticket-title">{ticket.title}</h3>
      <div className="ticket-footer">
        <span className="priority-icon">{getPriorityIcon(ticket.priority)}</span>
        <div className="tag">
          <span className="dot">●</span>
          {ticket.tag[0]}
        </div>
      </div>
    </div>
  );
}