import TicketCard from './TicketCard';

function KanbanBoard({ tickets, grouping, ordering }) {
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

  const groupTickets = () => {
    let grouped = {};
    
    if (grouping === 'status') {
      grouped = {
        'Todo': [],
        'In Progress': [],
        'Done': [],
        'Canceled': []
      };
      tickets.forEach(ticket => {
        grouped[ticket.status].push(ticket);
      });
    } else if (grouping === 'user') {
      tickets.forEach(ticket => {
        if (!grouped[ticket.assignee]) {
          grouped[ticket.assignee] = [];
        }
        grouped[ticket.assignee].push(ticket);
      });
    } else if (grouping === 'priority') {
      grouped = {
        '4': [],
        '3': [],
        '2': [],
        '1': [],
        '0': []
      };
      tickets.forEach(ticket => {
        grouped[ticket.priority].push(ticket);
      });
    }

    // Sort tickets within each group
    Object.keys(grouped).forEach(key => {
      grouped[key].sort((a, b) => {
        if (ordering === 'priority') {
          return b.priority - a.priority;
        } else {
          return a.title.localeCompare(b.title);
        }
      });
    });

    return grouped;
  };

  const grouped = groupTickets();

  return (
    <div className="kanban-board">
      {Object.entries(grouped).map(([group, tickets]) => (
        <div key={group} className="column">
          <div className="column-header">
            <h2>
              {grouping === 'priority' ? getPriorityLabel(parseInt(group)) : group}
              <span className="count">{tickets.length}</span>
            </h2>
          </div>
          <div className="tickets">
            {tickets.map(ticket => (
              <TicketCard key={ticket.id} ticket={ticket} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}